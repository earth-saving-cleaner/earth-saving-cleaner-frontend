import { useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

function creacteWrapperAndAppendToBody(wrapperId) {
  const wrapperEl = document.createElement("div");
  wrapperEl.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperEl);
  return wrapperEl;
}

function Portal({ children, wrapperId = "portalWrapper" }) {
  const [wrapperEl, setWrapperEl] = useState(null);

  useLayoutEffect(() => {
    let ele = document.getElementById(wrapperId);
    let defaultCreated = false;

    if (!ele) {
      defaultCreated = true;
      ele = creacteWrapperAndAppendToBody(wrapperId);
    }
    setWrapperEl(ele);

    return () => {
      if (defaultCreated && ele.parentNode) {
        ele.parentNode.removeChild(ele);
      }
    };
  }, [wrapperId]);

  if (wrapperEl === null) return null;

  return createPortal(children, wrapperEl);
}

export default Portal;
