export function initBrushSizeSlider(editor) {
  const slider = document.getElementById("brushSlider");
  const sliderVal = document.getElementById("brushSliderVal");
  sliderVal.innerHTML = slider.value;

  slider.oninput = function () {
    sliderVal.innerHTML = this.value;
    editor.brushSize = this.value;
  };
}

export function initCurveStepSizeSlider(editor) {
  const slider = document.getElementById("stepSlider");
  const sliderVal = document.getElementById("stepSliderVal");
  sliderVal.innerHTML = slider.value;
  slider.disabled = true;

  slider.oninput = function () {
    sliderVal.innerHTML = this.value;
    editor.shapeRef.stepSize = Number(this.value);
  };
}
