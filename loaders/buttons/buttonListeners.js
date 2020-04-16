export function initShapeButtons(editor) {
  document.querySelectorAll(".shapeBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      selectShape(e);
      editor.setShape(e.target.id);
    });
  });
}

function selectShape(e) {
  const selectedShape = e.target;
  const buttons = Array.from(document.querySelectorAll(".shapeBtn"));
  const activeBtn = buttons.find((btn) => btn.classList.contains("active"));
  activeBtn.classList.remove("active");
  selectedShape.classList.add("active");

  const slider = document.getElementById("stepSlider");
  slider.disabled = selectedShape.id === "curve" ? false : true;
}

export function initColorButtons(editor) {
  document.querySelectorAll(".color").forEach((color) => {
    color.addEventListener("click", (e) => {
      const colorValue = getSelectedColor(e);
      editor.setColor(colorValue);
    });
  });
}

function getSelectedColor(e) {
  return getComputedStyle(
    document.querySelector(`#${e.target.id}`)
  ).getPropertyValue(`--${e.target.id}-color`);
}
