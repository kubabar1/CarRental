package com.carrental.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = {"/profile"})
public class ProfileController {

  @RequestMapping(method = RequestMethod.GET)
  public String profile() {
    return "profile";
  }
}
