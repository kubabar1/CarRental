package com.carrental.repository;

import java.util.List;

import com.carrental.model.Blog;

public interface BlogRepositoryCustom {

	public List<Blog> getArticleListForPage(int page, int nb);

	public List<Blog> getArticleListByTitleForPage(String title, int page, int nb);
}
