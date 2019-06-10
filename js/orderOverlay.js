const modal = document.querySelector("#orderOverlay");

function createOrderOverlay(template) {
  let fragment = document.createElement("div");

  fragment.innerHTML = template;

  const overlayElement = fragment.querySelector(".order-overlay");
  const text = fragment.querySelector(".order-overlay__text");
  const closeElement = fragment.querySelector(".order-overlay__close");
  const body = document.body;

  fragment = null;

  overlayElement.addEventListener("click", e => {
    if (e.target === overlayElement) {
      closeElement.click();
    }
  });

  closeElement.addEventListener("click", () => {
    body.removeChild(overlayElement);
    body.classList.remove("hidden");
  });

  return {
    open() {
      document.body.appendChild(overlayElement);
      body.classList.add("hidden");
    },
    close() {
      closeElement.click();
    },
    setContent( _text) {
      text.innerHTML = _text;
    }
  };
}



