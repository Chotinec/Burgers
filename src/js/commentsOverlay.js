(function() {
  const sectionModal = document.querySelector("#commentsId");

(function(modal) {
  const template = document.querySelector("#commentsOverlay").innerHTML;
  const overlay = createOverlay(template);

  modal.addEventListener("click", e => {
    e.preventDefault();

    const target = e.target;

    if (target.classList.contains("comment__btn")) {
      const title = target.previousElementSibling.previousElementSibling.textContent;
      const content = target.previousElementSibling.textContent;

      overlay.open();
      overlay.setContent(title, content);
    }
  });
})(sectionModal);

function createOverlay(template) {
  let fragment = document.createElement("div");

  fragment.innerHTML = template;

  const overlayElement = fragment.querySelector(".comments-overlay");
  const title = fragment.querySelector(".comments-overlay__title");
  const text = fragment.querySelector(".comments-overlay__text");
  const closeElement = fragment.querySelector(".comments-overlay__close");
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
    setContent(_title, _text) {
      title.innerHTML = _title;
      text.innerHTML = _text;
    }
  };
}
})()





