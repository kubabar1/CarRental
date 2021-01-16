package com.carrental.dto;

import com.carrental.validator.PasswordMatches;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Date;

@PasswordMatches
public class UserRegistrationDto implements Serializable {

  @NotNull
  @Size(max = 40)
  private String name;

  @NotNull
  @Size(max = 40)
  private String surname;

  @NotNull
  @Size(min = 6, max = 40)
  private String login;

  @NotNull
  @Size(min = 6, max = 20)
  private String password;

  @NotNull
  @Size(min = 6, max = 20)
  private String passwordMatches;

  @NotNull
  @Email
  @Size(max = 255)
  private String email;

  @NotNull
  @Size(max = 20)
  private String phone;

  @NotNull private Date birthDate;

  @NotNull
  @Size(min = 11, max = 11, message = "Pesel must have 11 digits")
  private String pesel;

  public UserRegistrationDto() {
    super();
  }

  public UserRegistrationDto(
      String name,
      String surname,
      String login,
      String password,
      String passwordMatches,
      String email,
      String phone,
      Date birthDate,
      String pesel) {
    super();
    this.name = name;
    this.surname = surname;
    this.login = login;
    this.password = password;
    this.passwordMatches = passwordMatches;
    this.email = email;
    this.phone = phone;
    this.birthDate = birthDate;
    this.pesel = pesel;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getSurname() {
    return surname;
  }

  public void setSurname(String surname) {
    this.surname = surname;
  }

  public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getPasswordMatches() {
    return passwordMatches;
  }

  public void setPasswordMatches(String passwordMatches) {
    this.passwordMatches = passwordMatches;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public Date getBirthDate() {
    return birthDate;
  }

  public void setBirthDate(Date birthDate) {
    this.birthDate = birthDate;
  }

  public String getPesel() {
    return pesel;
  }

  public void setPesel(String pesel) {
    this.pesel = pesel;
  }

  @Override
  public String toString() {
    return "UserRegistrationDto [name="
        + name
        + ", surname="
        + surname
        + ", login="
        + login
        + ", password="
        + password
        + ", passwordMatches="
        + passwordMatches
        + ", email="
        + email
        + ", phone="
        + phone
        + ", birthDate="
        + birthDate
        + ", pesel="
        + pesel
        + "]";
  }
}
