package com.carrental.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "Comments")
public class Comment implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID")
  private Long id;

  @Column(name = "vehicleID")
  private Long vehicleId;

  @Column(name = "commentContent")
  private String commentContent;

  @Column(name = "login")
  private String login;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Warsaw")
  @Column(name = "creationDate")
  private Timestamp creationDate;

  @Column(name = "rating")
  private Integer rating;

  @JsonIgnore
  @ManyToOne(optional = false)
  @JoinColumn(
      name = "vehicleId",
      referencedColumnName = "ID",
      insertable = false,
      updatable = false)
  private Vehicle vehicle;

  public Comment() {
    super();
  }

  public Comment(
      Long vehicleId, String commentContent, String login, Timestamp creationDate, Integer rating) {
    super();
    this.vehicleId = vehicleId;
    this.commentContent = commentContent;
    this.login = login;
    this.creationDate = creationDate;
    this.rating = rating;
  }

  public Comment(
      Long id,
      Long vehicleId,
      String commentContent,
      String login,
      Timestamp creationDate,
      Integer rating) {
    super();
    this.id = id;
    this.vehicleId = vehicleId;
    this.commentContent = commentContent;
    this.login = login;
    this.creationDate = creationDate;
    this.rating = rating;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCommentContent() {
    return commentContent;
  }

  public void setCommentContent(String commentContent) {
    this.commentContent = commentContent;
  }

  public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public Timestamp getCreationDate() {
    return creationDate;
  }

  public void setCreationDate(Timestamp creationDate) {
    this.creationDate = creationDate;
  }

  public Vehicle getVehicle() {
    return vehicle;
  }

  public void setVehicle(Vehicle vehicle) {
    this.vehicle = vehicle;
  }

  public Long getVehicleId() {
    return vehicleId;
  }

  public void setVehicleId(Long vehicleId) {
    this.vehicleId = vehicleId;
  }

  public Integer getRating() {
    return rating;
  }

  public void setRating(Integer rating) {
    this.rating = rating;
  }

  @Override
  public String toString() {
    return "Comment [id="
        + id
        + ", vehicleId="
        + vehicleId
        + ", commentContent="
        + commentContent
        + ", login="
        + login
        + ", creationDate="
        + creationDate
        + ", rating="
        + rating
        + ", vehicle="
        + vehicle
        + "]";
  }
}
