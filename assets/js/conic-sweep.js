
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".cut-depth-table").forEach(function (wrapper) {
    const table = wrapper.querySelector("table");
    if (!table) return;

    const hideIntersections = wrapper.querySelector(".hide-intersections-toggle");
    const hidePhases = wrapper.querySelector(".hide-phases-toggle");
    const scaleMinus = wrapper.querySelector(".table-scale-minus");
    const scalePlus = wrapper.querySelector(".table-scale-plus");
    const scaleValue = wrapper.querySelector(".table-scale-value");

    table.querySelectorAll("tbody tr").forEach(function (row) {
      const cells = row.querySelectorAll("td");
      const phase = cells[1] ? cells[1].textContent.trim() : "";
      const intersection = cells[2] ? cells[2].textContent.trim() : "";

      row.classList.toggle("phase-row", phase !== "" && phase !== "NA");
      row.classList.toggle("intersection-row", intersection !== "" && intersection !== "NA");
    });

    function updateRowFilters() {
      const intersectionsHidden = hideIntersections && hideIntersections.checked;
      const phasesHidden = hidePhases && hidePhases.checked;

      wrapper.classList.toggle("hide-intersections", intersectionsHidden);
      wrapper.classList.toggle("hide-phases", phasesHidden);

      if (hidePhases) {
        hidePhases.disabled = intersectionsHidden;
        hidePhases.closest("label").classList.toggle("is-disabled", intersectionsHidden);
      }

      if (hideIntersections) {
        hideIntersections.disabled = phasesHidden;
        hideIntersections.closest("label").classList.toggle("is-disabled", phasesHidden);
      }
    }

    if (hideIntersections) {
      hideIntersections.addEventListener("change", function () {
        if (hideIntersections.checked && hidePhases) hidePhases.checked = false;
        updateRowFilters();
      });
    }

    if (hidePhases) {
      hidePhases.addEventListener("change", function () {
        if (hidePhases.checked && hideIntersections) hideIntersections.checked = false;
        updateRowFilters();
      });
    }

    let scale = 0.75;
    const minScale = 0.5;
    const maxScale = 1.8;
    const scaleStep = 0.1;

    function setScale(nextScale) {
      scale = Math.min(maxScale, Math.max(minScale, nextScale));
      wrapper.style.setProperty("--table-scale", scale.toFixed(2));
      if (scaleValue) scaleValue.textContent = `${Math.round(scale * 100)}%`;
    }

    if (scaleMinus) {
      scaleMinus.addEventListener("click", function () {
        setScale(scale - scaleStep);
      });
    }

    if (scalePlus) {
      scalePlus.addEventListener("click", function () {
        setScale(scale + scaleStep);
      });
    }

    updateRowFilters();
    setScale(scale);
  });
});


document.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.matches('.copy-angle')){event.preventDefault();event.target.click();}});
let statusTimer;
document.addEventListener('click',async event=>{
const target=event.target.closest('.copy-angle');if(!target)return;
const text=target.dataset.copy;const status=document.querySelector('.copy-status');
try{await navigator.clipboard.writeText(text);target.classList.add('copied-angle');setTimeout(()=>target.classList.remove('copied-angle'),1200);status.textContent='Angle copied';}
catch{status.textContent='Copy this angle: '+text;}
clearTimeout(statusTimer);statusTimer=setTimeout(()=>status.textContent='',5000);
});
