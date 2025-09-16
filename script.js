document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // Leaflet demo map (optional). Centered roughly on Bogotá.
  const mapEl = document.getElementById('map');
  if (mapEl && typeof L !== 'undefined'){
    const map = L.map('map', { scrollWheelZoom:false }).setView([4.711, -74.0721], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([4.711, -74.0721]).addTo(map).bindPopup('Bogotá · Ejemplo de mapa');
  }
});