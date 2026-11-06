function openLB(el) {
  const src = el.querySelector('img').src;
  document.getElementById('lb-img').src = src;
  const lb = document.getElementById('lb');
  lb.classList.add('open');
}
function closeLB() {
  document.getElementById('lb').classList.remove('open');
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLB();
});
