package com.carrental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carrental.model.Blog;

public interface BlogRepository extends JpaRepository<Blog, Long>, BlogRepositoryCustom {

	@Query("select b from Blog b")
	public List<Blog> getAllArticles();

	public Blog getArticleById(Long id);

}
