"use strict";
require("../css/style.css");
import Nav from "./Nav";

const mainElement = $("main");
const nav = new Nav((pageName) => {
  switch (pageName) {
    case "one":
      mainElement.text(require("./pageOne.js"));
    break;
    case "two":
      mainElement.text(require("./pageTwo.js"));
    break;
  }
});
