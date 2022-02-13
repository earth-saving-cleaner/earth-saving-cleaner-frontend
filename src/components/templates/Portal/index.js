import ReactDOM, { createPortal } from "react-dom";

function Portal({ children }) {
  const $target = document.querySelector("#modal-root");

  return ReactDOM.createPortal(children, $target);
}

export default Portal;
