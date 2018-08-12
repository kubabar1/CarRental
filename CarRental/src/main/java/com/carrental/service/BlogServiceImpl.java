package com.carrental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.model.Blog;
import com.carrental.repository.BlogRepository;

@Service("blogService")
@Transactional
public class BlogServiceImpl implements BlogService {

	@Autowired
	private BlogRepository blogRepository;

	@Override
	public Blog getArticleById(Long id) {
		return blogRepository.getArticleById(id);
	}

	@Override
	public List<Blog> getArticleListForPage(int page, int nb) {
		return blogRepository.getArticleListForPage(page, nb);
	}

	@Override
	public List<Blog> getArticleListByTitleForPage(String title, int page, int nb) {
		return blogRepository.getArticleListByTitleForPage(title, page, nb);
	}

}
