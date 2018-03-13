import h from "hyperscript";
import hh from "hyperscript-helpers";
import R from "ramda";

const tags = hh(h);
const { div, button, h3 } = tags;

document.addEventListener("DOMContentLoaded", () => {
  // do your setup here
  const initalModel = 0;
  const root = document.getElementById("root");
  //view function
  function view(dispatch, model) {
    return div({ className: "ma3" }, [
      h3({ className: "ml3" }, model),
      button({ onclick: () => dispatch("plus") }, "+"),
      button({ onclick: () => dispatch("minus"), className: "ml3" }, "-"),
      button({ onclick: () => dispatch("reset"), className: "ml3" }, "reset")
    ]);
  }
  //update function
  function update(msg, model) {
    switch (msg) {
      case "minus":
        return model - 1;
      case "plus":
        return model + 1;
      case "reset":
        return (model = 0);
      default:
        return model;
    }
  }
  //impure app function
  function app(initalModel, update, view, node) {
    let model = initalModel;
    let currentView = view(dispatch, model);
    node.appendChild(currentView);

    function dispatch(msg) {
      model = update(msg, model);
      const updatedView = view(dispatch, model);
      node.replaceChild(updatedView, currentView);
      currentView = updatedView;
    }
  }

  app(initalModel, update, view, root);
});
