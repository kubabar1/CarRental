package com.carrental.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.carrental.model.Blog;
import com.carrental.model.Vehicle;

@Repository
public class BlogRepositoryImpl implements BlogRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<Blog> getArticleListForPage(int page, int nb) {
		int idk = ((page - 1) * nb);

		return (List<Blog>) entityManager.createQuery("SELECT b FROM Blog b ORDER BY b.id DESC").setFirstResult(idk)
				.setMaxResults(nb).getResultList();
	}

	@Override
	public List<Blog> getArticleListByTitleForPage(String title, int page, int nb) {
		int idk = ((page - 1) * nb);

		return (List<Blog>) entityManager
				.createQuery("SELECT b FROM Blog b WHERE b.title LIKE :searchKeyword ORDER BY b.id DESC")
				.setFirstResult(idk).setMaxResults(nb).setParameter("searchKeyword", "%" + title + "%").getResultList();
	}

}
