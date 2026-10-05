export function initComparison() {
  const range = document.querySelector('#comparison-range');
  const comparison = range.closest('.comparison');
  const update = () => {
    comparison.style.setProperty('--position', `${range.value}%`);
    range.setAttribute('aria-valuetext', `${range.value}% widoku przed czyszczeniem`);
  };
  range.addEventListener('input', update);
  update();
}
