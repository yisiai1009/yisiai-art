(function(){
  const cur = document.getElementById('cur');
  const canvas = document.getElementById('trail');
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);

  let mx = -100, my = -100;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
  });

  // trail particles
  const particles = [];
  const colors = ['#fe2c55','#25f4ee','rgba(255,255,255,0.6)'];

  function spawnParticle(){
    particles.push({
      x: mx, y: my,
      vx: (Math.random()-0.5)*1.2,
      vy: (Math.random()-0.5)*1.2 - 0.5,
      r: Math.random()*3 + 1,
      alpha: 0.7,
      color: colors[Math.floor(Math.random()*colors.length)]
    });
  }

  let frame = 0;
  function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,W,H);
    frame++;
    if(frame % 2 === 0) spawnParticle();
    for(let i = particles.length-1; i >= 0; i--){
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.alpha -= 0.03;
      p.r *= 0.97;
      if(p.alpha <= 0){ particles.splice(i,1); continue; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  animate();
})();
