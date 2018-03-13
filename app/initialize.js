import h from "hyperscript";
import hh from "hyperscript-helpers";
import R from "ramda";

const tags = hh(h);
const { div, button, h3 } = tags;

document.addEventListener("DOMContentLoaded", () => {
  // do your setup here
  const root = document.getElementById("root");
  const intialState = 0;

  //view function
  function view(dispatch, model) {
    return div({ className: "ma3" }, [
      h3({ className: "pa3 ml3" }, model),
      button({ onclick: dispatch.bind(this, "plus"), className: "pa3" }, "+"),
      button(
        { onclick: dispatch.bind(this, "minus"), className: "pa3 ml2" },
        "-"
      ),
      button(
        { onclick: dispatch.bind(this, "reset"), className: "pa3 ml2" },
        "reset"
      )
    ]);
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
  function app(model, update, view, node) {
    let currentModel = model;
    let currentView = view(dispatch, currentModel);
    node.appendChild(currentView);
    function dispatch(msg) {
      currentModel = update(msg, currentModel);
      const updatedView = view(dispatch, currentModel);
      node.replaceChild(updatedView, currentView);
      currentView = updatedView;
    }
  }

  app(intialState, update, view, root);
});
