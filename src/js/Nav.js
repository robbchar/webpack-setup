export default class Nav {
  constructor (callback) {
    this.nav = $("nav");

    this.nav.on("click", "li", (event) => {
      let element = $(event.target);
      element
        .addClass("active")
        .siblings()
          .removeClass("active");
      callback(element.data("pageName"));
    });

    // call callback for active tab
    callback(this.nav.find("li.active").data("pageName"));
  }
}
