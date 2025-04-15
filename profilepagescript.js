const photo = document.querySelector('.about-image');

document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / -25;
  const y = (window.innerHeight / 2 - e.clientY) / 25;

  photo.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

document.addEventListener('mouseleave', () => {
  photo.style.transform = 'rotateY(0deg) rotateX(0deg)';
});