import "./charts.scss";

const bars = document.querySelectorAll("[data-count]");

bars.forEach(function(bar) {
  bar.style.height = `${(parseInt(bar.dataset.count) * 100) / 10000}%`;
});
