import { initNavigation } from './navigation.js';
import { initComparison } from './comparison.js';
import { initForm } from './form.js';
initNavigation();
initComparison();
initForm();
document.querySelector('#year').textContent = String(new Date().getFullYear());
const motion = matchMedia('(prefers-reduced-motion: reduce)');
if (!motion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach(element => {
    element.classList.add('reveal-pending');
    observer.observe(element);
  });
  motion.addEventListener('change', event => {
    if (!event.matches) return;
    document.querySelectorAll('[data-reveal]').forEach(element => element.classList.add('reveal-visible'));
    observer.disconnect();
  });
}
