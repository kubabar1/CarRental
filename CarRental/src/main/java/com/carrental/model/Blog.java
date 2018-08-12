package com.carrental.model;

import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@Entity
@Table(name = "Blog")
public class Blog implements Serializable {

	@Id
	@Column(name = "ID")
	private Long id;

	@Column(name = "title")
	private String title;

	@Column(name = "articleContent")
	private String articleContent;

	@Column(name = "authorID")
	private Long authorID;

	@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Column(name = "creationDate")
	private LocalDateTime creationDate;

	@Column(name = "photoName")
	private String photoName;

	public Blog() {
		super();
	}

	public Blog(String title, String articleContent, Long authorID, LocalDateTime creationDate, String photoName) {
		super();
		this.title = title;
		this.articleContent = articleContent;
		this.authorID = authorID;
		this.creationDate = creationDate;
		this.photoName = photoName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getArticleContent() {
		return articleContent;
	}

	public void setArticleContent(String articleContent) {
		this.articleContent = articleContent;
	}

	public Long getAuthorID() {
		return authorID;
	}

	public void setAuthorID(Long authorID) {
		this.authorID = authorID;
	}

	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}

	public String getPhotoName() {
		return photoName;
	}

	public void setPhotoName(String photoName) {
		this.photoName = photoName;
	}

	@Override
	public String toString() {
		return "Blog [ID=" + id + ", title=" + title + ", articleContent=" + articleContent + ", authorID=" + authorID
				+ ", creationDate=" + creationDate + ", photoName=" + photoName + "]";
	}

}
