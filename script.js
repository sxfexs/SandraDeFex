// Año dinámico en footer
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  initHoverPanel();
  initCarousels();
});

// Mostrar/ocultar panel flotante al hover del nombre
function initHoverPanel(){
  const brand = document.getElementById("brand");
  const panel = document.getElementById("hoverPanel");
  if(!brand || !panel) return;

  let overBrand = false, overPanel = false;
  const show = () => panel.classList.add("hover-panel--visible");
  const hide = () => panel.classList.remove("hover-panel--visible");

  brand.addEventListener("mouseenter", () => { overBrand = true; show(); });
  brand.addEventListener("mouseleave", () => { overBrand = false; setTimeout(() => { if(!overBrand && !overPanel) hide(); }, 120); });
  panel.addEventListener("mouseenter", () => { overPanel = true; show(); });
  panel.addEventListener("mouseleave", () => { overPanel = false; setTimeout(() => { if(!overBrand && !overPanel) hide(); }, 120); });
}

// Carruseles con autoplay, botones y swipe
function initCarousels(){
  document.querySelectorAll(".carousel").forEach((c) => {
    const track = c.querySelector(".carousel__track");
    const slides = Array.from(c.querySelectorAll(".carousel__slide"));
    const prev = c.querySelector(".carousel__btn--prev");
    const next = c.querySelector(".carousel__btn--next");
    if (!track || slides.length === 0) return;

    let index = 0;
    let timer = null;
    const N = slides.length;

    const go = (i) => {
      index = (i + N) % N;
      track.style.transform = `translateX(-${index * 100}%)`;
    };

    // Botones (aseguramos que no naveguen)
    prev && prev.addEventListener("click", (e) => { e.preventDefault(); go(index - 1); });
    next && next.addEventListener("click", (e) => { e.preventDefault(); go(index + 1); });

    // Autoplay
    const autoplay = c.dataset.autoplay === "true";
    const interval = Number(c.dataset.interval) || 3500;

    const start = () => {
      if (!autoplay) return;
      stop();
      timer = setInterval(() => go(index + 1), interval);
    };
    const stop = () => {
      if (timer) { clearInterval(timer); timer = null; }
    };

    c.addEventListener("mouseenter", stop);
    c.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

    // Swipe en móvil
    let startX = 0, delta = 0;
    c.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; delta = 0; stop(); }, { passive: true });
    c.addEventListener("touchmove",  (e) => { delta = e.touches[0].clientX - startX; }, { passive: true });
    c.addEventListener("touchend",   () => {
      if (Math.abs(delta) > 40) go(index + (delta < 0 ? 1 : -1));
      delta = 0; start();
    });

    // Inicializa
    go(0);
    start();
  });
}

