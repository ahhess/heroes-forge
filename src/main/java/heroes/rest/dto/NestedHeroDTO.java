package heroes.rest.dto;

import java.io.Serializable;
import heroes.model.Hero;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

public class NestedHeroDTO implements Serializable {

	private Long id;
	private int version;
	private String name;

	public NestedHeroDTO() {
	}

	public NestedHeroDTO(final Hero entity) {
		if (entity != null) {
			this.id = entity.getId();
			this.version = entity.getVersion();
			this.name = entity.getName();
		}
	}

	public Hero fromDTO(Hero entity, EntityManager em) {
		if (entity == null) {
			entity = new Hero();
		}
		if (this.id != null) {
			TypedQuery<Hero> findByIdQuery = em.createQuery(
					"SELECT DISTINCT h FROM Hero h WHERE h.id = :entityId",
					Hero.class);
			findByIdQuery.setParameter("entityId", this.id);
			try {
				entity = findByIdQuery.getSingleResult();
			} catch (javax.persistence.NoResultException nre) {
				entity = null;
			}
			return entity;
		}
		entity.setVersion(this.version);
		entity.setName(this.name);
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
}