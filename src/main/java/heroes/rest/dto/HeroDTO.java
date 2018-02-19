package heroes.rest.dto;

import java.io.Serializable;
import heroes.model.Hero;
import javax.persistence.EntityManager;
import java.util.Set;
import java.util.HashSet;
import heroes.rest.dto.NestedSubHeroDTO;
import heroes.model.SubHero;
import java.util.Iterator;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class HeroDTO implements Serializable {

	private Long id;
	private int version;
	private String name;
	private Set<NestedSubHeroDTO> subheros = new HashSet<NestedSubHeroDTO>();

	public HeroDTO() {
	}

	public HeroDTO(final Hero entity) {
		if (entity != null) {
			this.id = entity.getId();
			this.version = entity.getVersion();
			this.name = entity.getName();
			Iterator<SubHero> iterSubheros = entity.getSubheros().iterator();
			while (iterSubheros.hasNext()) {
				SubHero element = iterSubheros.next();
				this.subheros.add(new NestedSubHeroDTO(element));
			}
		}
	}

	public Hero fromDTO(Hero entity, EntityManager em) {
		if (entity == null) {
			entity = new Hero();
		}
		entity.setVersion(this.version);
		entity.setName(this.name);
		Iterator<SubHero> iterSubheros = entity.getSubheros().iterator();
		while (iterSubheros.hasNext()) {
			boolean found = false;
			SubHero subHero = iterSubheros.next();
			Iterator<NestedSubHeroDTO> iterDtoSubheros = this.getSubheros()
					.iterator();
			while (iterDtoSubheros.hasNext()) {
				NestedSubHeroDTO dtoSubHero = iterDtoSubheros.next();
				if (dtoSubHero.getId().equals(subHero.getId())) {
					found = true;
					break;
				}
			}
			if (found == false) {
				iterSubheros.remove();
			}
		}
		Iterator<NestedSubHeroDTO> iterDtoSubheros = this.getSubheros()
				.iterator();
		while (iterDtoSubheros.hasNext()) {
			boolean found = false;
			NestedSubHeroDTO dtoSubHero = iterDtoSubheros.next();
			iterSubheros = entity.getSubheros().iterator();
			while (iterSubheros.hasNext()) {
				SubHero subHero = iterSubheros.next();
				if (dtoSubHero.getId().equals(subHero.getId())) {
					found = true;
					break;
				}
			}
			if (found == false) {
				Iterator<SubHero> resultIter = em
						.createQuery("SELECT DISTINCT s FROM SubHero s",
								SubHero.class).getResultList().iterator();
				while (resultIter.hasNext()) {
					SubHero result = resultIter.next();
					if (result.getId().equals(dtoSubHero.getId())) {
						entity.getSubheros().add(result);
						break;
					}
				}
			}
		}
		entity = em.merge(entity);
		return entity;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public int getVersion() {
		return this.version;
	}

	public void setVersion(final int version) {
		this.version = version;
	}

	public String getName() {
		return this.name;
	}

	public void setName(final String name) {
		this.name = name;
	}

	public Set<NestedSubHeroDTO> getSubheros() {
		return this.subheros;
	}

	public void setSubheros(final Set<NestedSubHeroDTO> subheros) {
		this.subheros = subheros;
	}
}