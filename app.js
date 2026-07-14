(function () {
  const NS = "http://www.w3.org/2000/svg";
  const wheelGroup = document.getElementById("wheelGroup");
  const hub = document.getElementById("hub");
  const spinBtn = document.getElementById("spinBtn");
  const tabsEl = document.getElementById("tabs");
  const resultCard = document.getElementById("resultCard");
  const resultName = document.getElementById("resultName");
  const resultDesc = document.getElementById("resultDesc");
  const runCard = document.getElementById("runCard");
  const runList = document.getElementById("runList");
  const runProgress = document.getElementById("runProgress");
  const copyRunBtn = document.getElementById("copyRunBtn");
  const resetRunBtn = document.getElementById("resetRunBtn");

  let currentKey = "drop";
  let currentRotation = 0;
  let spinning = false;
  let runMode = false;
  let runIndex = 0;
  let runResults = [];

  // ---------- pestañas ----------
  function buildTabs() {
    tabsEl.innerHTML = "";
    CATEGORY_ORDER.forEach((key) => {
      const cat = CATEGORIES[key];
      const btn = document.createElement("button");
      btn.className = "tab";
      btn.dataset.key = key;
      btn.innerHTML = `<span class="tab-icon">${cat.icon}</span>${cat.label}`;
      btn.style.setProperty("--tab-color", cat.color);
      btn.addEventListener("click", () => selectCategory(key));
      tabsEl.appendChild(btn);
    });
    const runBtn = document.createElement("button");
    runBtn.className = "tab tab-run";
    runBtn.innerHTML = `<span class="tab-icon">🧬</span>Run Completo`;
    runBtn.addEventListener("click", startRun);
    tabsEl.appendChild(runBtn);
  }

  function markActiveTab() {
    [...tabsEl.querySelectorAll(".tab")].forEach((b) => {
      b.classList.toggle("active", b.dataset.key === currentKey && !runMode);
    });
  }

  function selectCategory(key) {
    runMode = false;
    currentKey = key;
    runCard.hidden = true;
    resultCard.hidden = false;
    runProgress.textContent = "";
    markActiveTab();
    buildWheel(CATEGORIES[key]);
    resultName.textContent = "Gira para descubrir tu destino";
    resultDesc.textContent = "Pulsa GIRAR y deja que la ruleta elija por ti.";
  }

  // ---------- construir rueda SVG ----------
  function polar(cx, cy, r, angleDeg) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
  }

  function buildWheel(cat) {
    wheelGroup.innerHTML = "";
    hub.textContent = cat.icon;
    hub.style.setProperty("--hub-color", cat.color);
    const items = cat.items;
    const n = items.length;
    const step = 360 / n;
    const cx = 200, cy = 200, r = 190;

    items.forEach((item, i) => {
      const a0 = i * step, a1 = (i + 1) * step;
      const p0 = polar(cx, cy, r, a0);
      const p1 = polar(cx, cy, r, a1);
      const largeArc = step > 180 ? 1 : 0;
      const path = document.createElementNS(NS, "path");
      path.setAttribute(
        "d",
        `M ${cx} ${cy} L ${p0.x} ${p0.y} A ${r} ${r} 0 ${largeArc} 1 ${p1.x} ${p1.y} Z`
      );
      const fill = item.color || shade(cat.color, i, n);
      path.setAttribute("fill", fill);
      path.setAttribute("stroke", "#0A0E1C");
      path.setAttribute("stroke-width", "1.5");
      wheelGroup.appendChild(path);

      const mid = a0 + step / 2;
      const labelR = n > 10 ? r * 0.66 : r * 0.6;
      const lp = polar(cx, cy, labelR, mid);
      const text = document.createElementNS(NS, "text");
      text.setAttribute("x", lp.x);
      text.setAttribute("y", lp.y);
      let rot = mid;
      if (mid > 90 && mid < 270) rot += 180;
      text.setAttribute(
        "transform",
        `rotate(${rot} ${lp.x} ${lp.y})`
      );
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("class", "wheel-label");
      text.style.fontSize = n > 10 ? "9px" : "11px";
      text.textContent = item.name;
      wheelGroup.appendChild(text);
    });
  }

  function shade(hex, i, n) {
    // ligera variación de luminosidad para que las porciones no sean planas
    const c = hexToHsl(hex);
    const l = Math.max(30, Math.min(70, c.l + (i % 2 === 0 ? -8 : 8) - (i / n) * 6));
    return `hsl(${c.h}, ${c.s}%, ${l}%)`;
  }

  function hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        default: h = (r - g) / d + 4;
      }
      h *= 60;
    }
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  // ---------- girar ----------
  function spin(cat, onDone) {
    if (spinning) return;
    spinning = true;
    spinBtn.disabled = true;

    const n = cat.items.length;
    const step = 360 / n;
    const index = Math.floor(Math.random() * n);
    const center = index * step + step / 2;
    const extraSpins = 6;

    const target = (360 - center + 360) % 360;
    const delta = ((target - (currentRotation % 360)) % 360 + 360) % 360;
    currentRotation += extraSpins * 360 + delta;

    wheelGroup.style.transition = "transform 4.2s cubic-bezier(0.12,0.66,0.1,1)";
    wheelGroup.style.transform = `rotate(${currentRotation}deg)`;

    window.setTimeout(() => {
      spinning = false;
      spinBtn.disabled = false;
      const item = cat.items[index];
      onDone(item, cat);
    }, 4300);
  }

  spinBtn.addEventListener("click", () => {
    if (runMode) return;
    const cat = CATEGORIES[currentKey];
    spin(cat, (item) => {
      resultName.textContent = item.name;
      resultDesc.textContent = item.desc;
    });
  });

  // ---------- modo Run Completo ----------
  function startRun() {
    runMode = true;
    runIndex = 0;
    runResults = [];
    markActiveTab();
    resultCard.hidden = false;
    runCard.hidden = true;
    resultName.textContent = "Preparando tu Run…";
    resultDesc.textContent = "La ruleta girará una vez por cada categoría.";
    window.setTimeout(runNextStep, 600);
  }

  function runNextStep() {
    if (runIndex >= CATEGORY_ORDER.length) {
      finishRun();
      return;
    }
    const key = CATEGORY_ORDER[runIndex];
    const cat = CATEGORIES[key];
    currentKey = key;
    buildWheel(cat);
    runProgress.textContent = `Paso ${runIndex + 1} de ${CATEGORY_ORDER.length}: ${cat.label}`;
    spin(cat, (item) => {
      runResults.push({ label: cat.label, icon: cat.icon, name: item.name, desc: item.desc });
      resultName.textContent = item.name;
      resultDesc.textContent = item.desc;
      runIndex++;
      window.setTimeout(runNextStep, 900);
    });
  }

  function finishRun() {
    runProgress.textContent = "Run completo";
    resultCard.hidden = true;
    runCard.hidden = false;
    runList.innerHTML = "";
    runResults.forEach((r) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="run-icon">${r.icon}</span><div><strong>${r.label}:</strong> ${r.name}<br><small>${r.desc}</small></div>`;
      runList.appendChild(li);
    });
  }

  copyRunBtn.addEventListener("click", async () => {
    const text = runResults
      .map((r) => `${r.label}: ${r.name}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(
        `🏝️ Mi reto Shattered Coast Runner\n${text}`
      );
      copyRunBtn.textContent = "¡Copiado!";
      window.setTimeout(() => (copyRunBtn.textContent = "Copiar reto"), 1500);
    } catch (e) {
      copyRunBtn.textContent = "No se pudo copiar";
    }
  });

  resetRunBtn.addEventListener("click", () => {
    runMode = false;
    selectCategory("drop");
  });

  // ---------- init ----------
  buildTabs();
  selectCategory("drop");
})();
