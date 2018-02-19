package heroes.rest.dto;

import java.io.Serializable;
import heroes.model.SubHero;
import javax.persistence.EntityManager;
import heroes.rest.dto.NestedHeroDTO;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class SubHeroDTO implements Serializable {

	private Long id;
	private int version;
	private String name;
	private NestedHeroDTO hero;

	public SubHeroDTO() {
	}

	public SubHeroDTO(final SubHero entity) {
		if (entity != null) {
			this.id = entity.getId();
			this.version = entity.getVersion();
			this.name = entity.getName();
			this.hero = new NestedHeroDTO(entity.getHero());
		}
	}

	public SubHero fromDTO(SubHero entity, EntityManager em) {
		if (entity == null) {
			entity = new SubHero();
		}
		entity.setVersion(this.version);
		entity.setName(this.name);
		if (this.hero != null) {
			entity.setHero(this.hero.fromDTO(entity.getHero(), em));
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

	public NestedHeroDTO getHero() {
		return this.hero;
	}

	public void setHero(final NestedHeroDTO hero) {
		this.hero = hero;
	}
}