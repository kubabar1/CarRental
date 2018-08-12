package com.carrental.service;

import java.util.List;

import com.carrental.model.Blog;

public interface BlogService {

	public Blog getArticleById(Long id);

	public List<Blog> getArticleListForPage(int page, int nb);

	public List<Blog> getArticleListByTitleForPage(String title, int page, int nb);

}
