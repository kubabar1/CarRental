# react-bootstrap-carousel

[![Travis](https://api.travis-ci.org/skycloud1030/react-bootstrap-carousel.svg?branch=master)](https://travis-ci.org/skycloud1030/react-bootstrap-carousel)
[![Coverage Status](https://coveralls.io/repos/github/skycloud1030/react-bootstrap-carousel/badge.svg?branch=master)](https://coveralls.io/github/skycloud1030/react-bootstrap-carousel?branch=master)
[![Version](https://img.shields.io/npm/v/react-bootstrap-carousel.svg)](https://www.npmjs.com/package/react-bootstrap-carousel)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Donloads](https://img.shields.io/npm/dm/react-bootstrap-carousel.svg)](https://www.npmjs.com/package/react-bootstrap-carousel)

This project support carousel components built with [React](https://github.com/facebook/react).

## Install

```sh
npm i --save react-bootstrap-carousel
```

## Getting Started

```js
import ReactBootstrapCarousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
```

## Bootstrap@3.3.7 demo

- [preview](https://skycloud1030.github.io/react-bootstrap-carousel/example/demoV3.html)
- [code](https://github.com/skycloud1030/react-bootstrap-carousel/blob/gh-pages/app/demoV3.jsx)

## Bootstrap@4.1 demo

- [preview](https://skycloud1030.github.io/react-bootstrap-carousel/example/demoV4.html)
- [code](https://github.com/skycloud1030/react-bootstrap-carousel/blob/gh-pages/app/demoV4.jsx)

## Properties

| Props              | Type                     | Description                                                                                                 | Default |
| :----------------- | :----------------------- | :---------------------------------------------------------------------------------------------------------- | :------ |
| version            | number                   | Bootstrap version 3 &#124; version 4                                                                        | 3       |
| defaultActiveIndex | number                   |                                                                                                             | 0       |
| slideshowSpeed     | number                   | The amount of time to delay between automatically cycling an item                                           | 7000    |
| animation          | boolean                  | whether to show animation                                                                                   | true    |
| autoplay           | boolean                  | Whether to scroll automatically                                                                             | true    |
| wrap               | boolean                  | Whether the carousel should cycle continuously or have hard stops                                           | true    |
| indicators         | boolean                  | Whether to show the dots at the bottom of the gallery                                                       | true    |
| leftIcon           | ReactNode                |                                                                                                             | -       |
| rightIcon          | ReactNode                |                                                                                                             | -       |
| onSelect           | function(value: number ) | Callback function called after the current index changes                                                    | -       |
| className          | string                   | carousel-fade &#124; ""                                                                                     | -       |
| pauseOnVisibility  | boolean                  | Stop autoplay when [visibilitychange](https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange) | false   |

## Methods

| Name      | Description                                |
| :-------- | :----------------------------------------- |
| slidePrev | Change current slide to previous slide     |
| slideNext | Change current slide to next slide         |
| goToSlide | Change current slide to given slide number |
