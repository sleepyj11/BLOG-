(function () {
  const app = document.getElementById("app");
  const totalWeeks = Math.ceil(BLOG.requiredHours / BLOG.hoursPerWeek);
  const byWeek = {};
  POSTS.forEach((p) => (byWeek[p.week] = p));

  /* ---------- helpers ---------- */
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function weekRange(n) {
    const [y, m, d] = BLOG.startDate.split("-").map(Number);
    const start = new Date(y, m - 1, d + (n - 1) * 7);
    const end = new Date(y, m - 1, d + (n - 1) * 7 + 4); // Mon–Fri
    const f = (dt, withYear) =>
      dt.toLocaleDateString("en-US", { month: "short", day: "numeric", ...(withYear && { year: "numeric" }) });
    return `${f(start)} – ${f(end, true)}`;
  }

  const hoursDone = () => POSTS.reduce((sum, p) => sum + (Number(p.hours) || 0), 0);

  const list = (items) =>
    items && items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "<p>—</p>";

  /* ---------- home page ---------- */
  function renderHome() {
    const done = Math.min(hoursDone(), BLOG.requiredHours);
    const pct = Math.round((done / BLOG.requiredHours) * 100);
    const remaining = BLOG.requiredHours - done;

    let cards = "";
    for (let n = 1; n <= totalWeeks; n++) {
      const p = byWeek[n];
      const num = `<div class="week-num"><small>Week</small><span>${n}</span></div>`;
      if (p) {
        cards += `
          <a class="week-card" href="#/week/${n}">
            ${num}
            <div class="week-body">
              <h3>${esc(p.title)}</h3>
              <div class="date">${weekRange(n)}</div>
              <p>${esc(p.summary)}</p>
            </div>
            <span class="badge">${esc(p.hours)} hrs</span>
          </a>`;
      } else {
        cards += `
          <div class="week-card upcoming">
            ${num}
            <div class="week-body">
              <h3>Upcoming</h3>
              <div class="date">${weekRange(n)}</div>
            </div>
            <span class="badge muted">Not yet written</span>
          </div>`;
      }
    }

    app.innerHTML = `
      <section class="hero">
        <div class="eyebrow">${esc(BLOG.role)} · ${esc(BLOG.company)}</div>
        <h1>${esc(BLOG.title)}</h1>
        <p>${esc(BLOG.subtitle)} — written by ${esc(BLOG.author)}, one week at a time.</p>
      </section>

      <section class="progress-card">
        <div class="stats">
          <div><div class="stat-num">${done}</div><div class="stat-label">Hours rendered</div></div>
          <div><div class="stat-num">${remaining}</div><div class="stat-label">Hours remaining</div></div>
          <div><div class="stat-num">${POSTS.length}/${totalWeeks}</div><div class="stat-label">Weeks logged</div></div>
          <div><div class="stat-num">${pct}%</div><div class="stat-label">Complete</div></div>
        </div>
        <div class="bar"><div class="bar-fill" style="width:0%"></div></div>
        <div class="bar-caption"><span>0 hrs</span><span>${BLOG.requiredHours} hrs</span></div>
      </section>

      <h2 class="section-title">Weekly Entries</h2>
      <section class="weeks">${cards}</section>`;

    requestAnimationFrame(() => (app.querySelector(".bar-fill").style.width = pct + "%"));
  }

  /* ---------- single week page ---------- */
  function renderWeek(n) {
    const p = byWeek[n];
    if (!p) return renderHome();

    let cumulative = 0;
    POSTS.filter((x) => x.week <= n).forEach((x) => (cumulative += Number(x.hours) || 0));

    const written = POSTS.map((x) => x.week).sort((a, b) => a - b);
    const i = written.indexOf(n);
    const prev = written[i - 1];
    const next = written[i + 1];

    const photos = p.photos && p.photos.length
      ? `<h2>Photos</h2><div class="photos">${p.photos.map((src) => `<img src="${esc(src)}" alt="Week ${n} photo" loading="lazy">`).join("")}</div>`
      : "";

    app.innerHTML = `
      <article class="post">
        <a class="back" href="#/">← All weeks</a>
        <div class="eyebrow" style="margin-top:20px">Week ${n} of ${totalWeeks}</div>
        <h1>${esc(p.title)}</h1>
        <div class="post-meta">
          <span>${weekRange(n)}</span>
          <span class="badge">${esc(p.hours)} hrs this week</span>
          <span class="badge muted">${cumulative} / ${BLOG.requiredHours} hrs total</span>
        </div>

        <p class="lead">${esc(p.summary)}</p>

        <h2>What I did</h2>${list(p.tasks)}
        <h2>What I learned</h2>${list(p.learnings)}
        <h2>Challenges</h2>${list(p.challenges)}
        <h2>Reflection</h2><p>${esc(p.reflection)}</p>
        ${photos}

        <nav class="post-nav">
          ${prev ? `<a href="#/week/${prev}">← Week ${prev}</a>` : "<span></span>"}
          ${next ? `<a href="#/week/${next}">Week ${next} →</a>` : "<span></span>"}
        </nav>
      </article>`;
  }

  /* ---------- router ---------- */
  function route() {
    const m = location.hash.match(/^#\/week\/(\d+)/);
    m ? renderWeek(Number(m[1])) : renderHome();
    window.scrollTo(0, 0);
  }

  /* ---------- theme ---------- */
  const root = document.documentElement;
  let theme = null;
  try { theme = localStorage.getItem("theme"); } catch (e) {}
  if (!theme) theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  root.dataset.theme = theme;
  document.getElementById("themeToggle").onclick = () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  };

  /* ---------- init ---------- */
  document.title = BLOG.title;
  document.getElementById("brand").textContent = BLOG.title;
  document.getElementById("footer").textContent =
    `© ${new Date().getFullYear()} ${BLOG.author} · ${BLOG.requiredHours}-hour OJT journal`;
  window.addEventListener("hashchange", route);
  route();
})();
