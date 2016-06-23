"use strict";
require("../css/style.css");
import * as main from "./Nav";

const mainElement = $("main");
const nav = new main.Nav((pageName) => {
  switch (pageName) {
    case "one":
      mainElement.text(require("./pageOne.js"));
    break;
    case "two":
      mainElement.text(require("./pageTwo.js"));
    break;
  }
});
