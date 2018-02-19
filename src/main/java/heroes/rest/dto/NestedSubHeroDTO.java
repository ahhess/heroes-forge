package heroes.rest.dto;

import java.io.Serializable;
import heroes.model.SubHero;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

public class NestedSubHeroDTO implements Serializable {

	private Long id;
	private int version;
	private String name;

	public NestedSubHeroDTO() {
	}

	public NestedSubHeroDTO(final SubHero entity) {
		if (entity != null) {
			this.id = entity.getId();
			this.version = entity.getVersion();
			this.name = entity.getName();
		}
	}

	public SubHero fromDTO(SubHero entity, EntityManager em) {
		if (entity == null) {
			entity = new SubHero();
		}
		if (this.id != null) {
			TypedQuery<SubHero> findByIdQuery = em.createQuery(
					"SELECT DISTINCT s FROM SubHero s WHERE s.id = :entityId",
					SubHero.class);
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