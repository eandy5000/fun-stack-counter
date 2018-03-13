import h from "hyperscript";
import hh from "hyperscript-helpers";
import R from "ramda";

const tags = hh(h);
const { div, button } = tags;

document.addEventListener("DOMContentLoaded", () => {
  // do your setup here
  const initModel = 0;
  const root = document.getElementById("root");
  //view function
  function view(dispatch, model) {
    return div(
      div(`Counter: ${model}`),
      button("+", { onclick: () => dispatch("plus") }),
      button("-", { onclick: () => dispatch("minus") }),
      button("reset", { onclick: () => dispatch("reset") })
    );
  }
  //update function
  function update(msg, model) {
    switch (msg) {
      case "plus":
        return model + 1;
      case "minus":
        return model - 1;
      case "reset":
        return (model = 0);
      default:
        return model;
    }
  }

  //impure app function
  function app(initModel, update, view, node) {
    let model = initModel;
    let currentView = view(dispatch, model);
    node.appendChild(currentView);
    function dispatch(msg) {
      model = update(msg, model);
      const updatedView = view(dispatch, model);
      node.replaceChild(updatedView, currentView);
      currentView = updatedView;
    }
  }

  app(initModel, update, view, root);
});
