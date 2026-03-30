// Tab Switching Logic
function switchTab(tabId) {
  // 1. Hide all panels and remove active state from buttons
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  
  // 2. Show selected panel and activate button
  document.getElementById('tab-' + tabId).classList.add('active');
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  
  // 3. Reset scroll and update progress bar
  window.scrollTo({top: 0});
  updateProgress(tabId);
}

// Sensitivity Analysis Slider Logic
function updateSensitivity(val) {
  const a = parseInt(val);
  const r = a === 100 ? 22 : (a === 0 ? 0 : Math.floor(r_base + (a/100)*(22-r_base)));
  
  // Update Labels
  document.getElementById('alpha-lbl').textContent = `α = ${a}`;
  
  // Dynamic UI update for results
  document.getElementById('alpha-res').innerHTML = `
    <div class="stat-grid">
      <div class="stat-card">
        <div class="n">${r}/22</div>
        <div class="l">Pairs redirected</div>
      </div>
      <div class="stat-card">
        <div class="n">${a} m</div>
        <div class="l">Max penalty</div>
      </div>
    </div>
  `;
}

// Scroll-to-Top Visibility
window.addEventListener('scroll', () => {
  const btn = document.getElementById('scrollTop');
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

// Accordion / Worked Example Toggle
document.querySelectorAll('.worked-header').forEach(header => {
  header.addEventListener('click', () => {
    header.classList.toggle('open');
    header.nextElementSibling.classList.toggle('open');
  });
});