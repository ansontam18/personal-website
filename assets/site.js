/* ====================================================================
   Anson Tam — site content + hash router
   Plain JS, no deps. Fast route swap with a short fade-in.
   All copy below is PLACEHOLDER — easy to find & replace.
   python3 -m http.server 8000
   ==================================================================== */

const ROUTES = ["home", "cv", "research", "teaching", "econ101a", "blog", "contact"];
const LABELS = {
  home: "Home", cv: "CV", research: "Research",
  teaching: "Teaching", econ101a: "ECON 101A", blog: "Blog", contact: "Contact",
};

const INTERESTS = ["Macroeconomics", "International Economics", "Behavioral Economics", "Finance"];

/* ---------- page renderers ---------- */

function homeView() {
  return `
  <section class="home">
    <div>
      <p class="eyebrow mono"><span class="tick">●</span>&nbsp; Princeton University · Senior Research Specialist</p>
      <h1>Anson Tam</h1>
      <p class="affiliation mono">International Economics Section · Louis A. Simpson Center for Macroeconomics</p>
      <p class="bio">
        I am a predocteral fellow at Princeton University, researching macroeconomics 
        and international economics. I graduated from UC&nbsp;Berkeley in 2026 with a B.A. in Economics (Honors) 
        and Data Science.
      </p>
      <dl class="meta">
        <dt class="mono">Interests</dt>
        <dd>${INTERESTS.join(" · ")}</dd>
        <dt class="mono">Links</dt>
        <dd class="linkrow">
          <a href="mailto:ansontam@berkeley.edu">Email</a>
          <a href="#cv">CV</a>
          <a href="https://github.com/ansontam18" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/a-tam/" target="_blank" rel="noopener">LinkedIn</a>
        </dd>
      </dl>
    </div>
    <div class="portrait">
      <img src="assets/anson-headshot.jpg" alt="Anson Tam at Sather Gate, UC Berkeley" />
    </div>
  </section>`;
}

function cvView() {
  return `
  <section class="cv-simple">
    <p class="eyebrow mono"><span class="tick">●</span>&nbsp; Curriculum Vitae</p>
    <h1>CV</h1>
    <p class="lede">
      <em style="opacity:.8">Please find my curriculum vitae below.</em></p>
    <a class="btn cv-dl" href="assets/anson-tam-cv.pdf" target="_blank" rel="noopener">
      View CV (PDF)
      <span class="arr">↗</span>
    </a>
    <p class="cv-note mono">Last updated May 2026 · ~120&nbsp;KB</p>
  </section>`;
}

function researchView() {
  const papers = [
    {
      status: "Working paper", live: true,
      title: "Are Inflation Expectations Better Anchored Under Fixed Exchange Rate Regimes? Evidence from Denmark and Sweden",
      authors: "Anson Tam",
      abs: "This paper examines whether inflation expectations are better anchored under fixed exchange rate regimes. The findings suggest that fixed exchange rates alone do not guarantee stronger anchoring of inflation expectations, particularly when shocks are global and countries with floating exchange rates maintain credible monetary institutions.",
      links: [["PDF", "assets/Anson_Tam_Senior_Thesis_Final.pdf"]],
    },
    // {
    //   status: "Work in progress", live: true,
    //   title: "[Title] — behavioral frictions in household portfolio choice",
    //   authors: "solo-authored",
    //   abs: "Placeholder abstract describing a project on how behavioral frictions shape household financial decisions, using administrative panel data.",
    //   links: [["Draft available on request", "#"], ["SSRN", "#"], ["Slides", "#"]],
    // },
    // {
      // status: "Pre-doctoral project", live: false,
      // title: "[Title] — measuring fiscal multipliers across the business cycle",
      // authors: "with [Principal Investigator]",
      // abs: "Placeholder description of a project supporting ongoing faculty research, including data construction and replication work.",
      // links: [["Project page", "#"]],
    // },
  ];

  const cards = papers.map(p => `
    <article class="paper">
      <span class="status ${p.live ? "" : "draft"}"><span class="pip"></span>${p.status}</span>
      <h3>${p.title}</h3>
      <p class="authors">${p.authors.replace(/\bsolo-authored\b/, "<b>solo-authored</b>")}</p>
      <p class="abs">${p.abs}</p>
      <div class="plinks">${p.links.map(([t, h]) => `<a class="tag" href="${h}" target="_blank" rel="noopener">${t}</a>`).join("")}</div>
    </article>`).join("");

  return `
  <div class="page-head">
    <h1>Research</h1>
  <div class="block">
    <div class="section-head"><span class="idx mono">●</span><h2>Papers &amp; projects</h2></div>
    ${cards}
  </div>
  <div class="block">
    <div class="section-head"><span class="idx mono">+</span><h2>Research interests</h2></div>
    <div class="chips"><span class="tick">●</span>&nbsp; ${INTERESTS.join(" · ")}</div>
  </div>`;
}

function teachingView() {
  return `
  <div class="page-head">
    <h1>Teaching</h1>
    <p>I have attached helpful resources for classes that I have previously taught.
    As a student, I understand that having material explained in multiple ways, or hearing it a second time, can be helpful.
     Resources here should not replace instruction, please continue going to class.</p>
  </div>

  <div class="block">
    <div class="section-head"><span class="idx mono">●</span><h2>Course</h2></div>
    <a href="#econ101a" class="course feature">
      <p class="term mono">UC Berkeley · Fall 2024 · Spring 2025</p>
      <h3>ECON 101A — Math Intensive Microeconomics</h3>
      <p class="inst">This course introduces students to the main tools and concepts of microeconomics.
      Topics covered include consumer theory, producer theory, equilibrium in a competitive market, monopoly,
       general equilibrium, game theory, and asymmetric information.</p>
      <p class="role-line">GSI →</p>
    </a>
  </div>`;
}

function econ101aView() {
  const BASE = "assets/ECON101A/section_notes/";
  const notes = [
    { n: "Syllabus",    t: "ECON 101A · Spring 2025",                    links: [["ECON_101A_AnsonTam_Syllabus_Spring25.pdf", "PDF"]] },
    { n: "Section 01", t: "Introduction to Math Concepts",    links: [["Section 1.pdf", "PDF"]] },
    { n: "Section 02", t: "Preferences and Utility Functions", links: [["Section 2.pdf", "PDF"], ["Section 2 - Solutions.pdf", "Solutions"]] },
    { n: "Section 03", t: "Utility Functions and Univariate Optimization",           links: [["Section 3.pdf", "PDF"], ["Section 3 - Solutions.pdf", "Solutions"]] },
    { n: "Section 04", t: "Envelope Theorem and Constrained Optimization",            links: [["Section 4.pdf", "PDF"], ["Section 4 - Solutions.pdf", "Solutions"]] },
    { n: "Section 05", t: "Multivariate Optimization",                            links: [["Section 5.pdf", "PDF"], ["Section 5 - Solutions.pdf", "Solutions"]] },
    { n: "Section 06", t: "Utility Maximization and Indirect Utility Functions",                            links: [["Section 6.pdf", "PDF"], ["Section 6 - Solutions.pdf", "Solutions"]] },
    { n: "Section 07", t: "Expenditure Minimization and the Hicksian Demand Function",                            links: [["Section 7.pdf", "PDF"], ["Section 7 - Solutions.pdf", "Solutions"]] },
    { n: "Section 08", t: "Slutsky Equation and the Labor Problem",                            links: [["Section 8.pdf", "PDF"], ["Section 8 - Solutions.pdf", "Solutions"]] },
    { n: "Section 09", t: "Intertemporal Choice",                            links: [["Section 9.pdf", "PDF"], ["Section 9 - Solutions.pdf", "Solutions"]] },
    { n: "Section 10", t: "Production Function and Isoquants",                           links: [["Section 10.pdf", "PDF"], ["Section 10 - Solutions.pdf", "Solutions"]] },
    { n: "Section 11", t: "Two-step Cost Minimization and One Step Profit Maximization",          links: [["Section 11.pdf", "PDF"], ["Section 11 - Solutions.pdf", "Solutions"]] },
    { n: "Section 12", t: "Aggregation and Market Equilibrium",                           links: [["Section 12.pdf", "PDF"], ["Section 12 - Solutions.pdf", "Solutions"]] },
    { n: "Section 13", t: "LR Equilibrium in Competitive Markets and Welfare",        links: [["Section 13.pdf", "PDF"], ["Section 13 - Solutions.pdf", "Solutions"]] },
    { n: "Section 14", t: "General Equilibrium",                           links: [["Section 14.pdf", "PDF"], ["Section 14 - Solutions.pdf", "Solutions"]] },
    { n: "Section 15", t: "Imperfect Competition Profit Maximization",                           links: [["Section 15.pdf", "PDF"], ["Section 15 - Solutions.pdf", "Solutions"]] },
    { n: "Section 17", t: "Game Theory",                           links: [["Section 17.pdf", "PDF"], ["Section 17 - Solutions.pdf", "Solutions"]] },
    { n: "Section 18", t: "Bertrand and Cournot Duopolies",                           links: [["Section 18.pdf", "PDF"], ["Section 18 - Solutions.pdf", "Solutions"]] },
    { n: "Section 19", t: "Dynamic Games and Stackelberg Duopolies",                           links: [["Section 19.pdf", "PDF"], ["Section 19 - Solutions.pdf", "Solutions"]] },
    { n: "Section 20", t: "Asymmetric Information",                           links: [["Section 20.pdf", "PDF"], ["Section 20 - Solutions.pdf", "Solutions"]] },
  ];
  const videos = [
    // ["Walkthrough", "Solving a consumer optimization problem"],
    // ["Review session", "Midterm 1 — worked problems"],
  ];

  const noteRows = notes.map(({ n, t, links }) => `
    <div class="note">
      <div class="n mono">${n}</div>
      <div class="t">${t}</div>
      <div class="note-links">${links.map(([file, label]) =>
        `<a class="tag" href="${BASE}${file}" target="_blank" rel="noopener">${label} ↗</a>`).join("")}
      </div>
    </div>`).join("");
  const videoCards = videos.map(([kind, t]) => `
    <div class="video">
      <div class="video-ph"><span class="play">▶</span><span class="lbl mono">video — 16:9</span></div>
      <p class="vkind mono">${kind}</p>
      <h3>${t}</h3>
    </div>`).join("");

  return `
  <div class="page-head">
    <p class="eyebrow mono"><span class="tick">●</span>&nbsp; <a href="#teaching" style="color:inherit;text-decoration:none;">Teaching</a></p>
    <h1>ECON 101A</h1>
    <p>I have attached section notes and teaching videos for ECON 101A. Some of the videos had audio issues, 
    so I only uploaded the sections with clear audio. I may re-record the remaining sections in the future. 
    If you notice any mistakes, please let me know and I will correct them.</p>
  </div>

  <div class="block">
    <div class="section-head"><span class="idx mono">+</span><h2>Section notes</h2></div>
    <div class="notes-list">${noteRows}</div>
  </div>

  `; /*
  <div class="block">
    <div class="section-head"><span class="idx mono">+</span><h2>Teaching videos</h2></div>
    <div class="videos">${videoCards}</div>
  </div>*/
}

function blogView() {
  const posts = [
    // ["May 2026", "What a predoc actually does, day to day",
    //   "Notes from my first months at Princeton — what the work looks like, and what I wish I'd known before starting."],
    // ["Mar 2026", "Reading list: international macro for newcomers",
    //   "A short, opinionated path into the literature, from foundational papers to recent work."],
    // ["Jan 2026", "Cleaning panel data without losing your mind",
    //   "A few habits and tools that have saved me hours when wrangling messy economic datasets."],
  ];
  const rows = posts.map(([d, t, e]) => `
    <a class="post" href="#blog">
      <div class="date">${d}</div>
      <div>
        <h3>${t}</h3>
        <p>${e}</p>
      </div>
      <div class="arrow">→</div>
    </a>`).join("");

  return `
  <div class="page-head">
    <h1>Blog</h1>
    <p><em style="opacity:.6">I don't have plans to maintain a blog at the moment but I may add posts in the future.</em></p>
  </div>
  <div class="posts">${rows}</div>`;
}

function contactView() {
  return `
  <section class="contact">
    <div>
      <h1>Contact</h1>
      <p class="lede">Happy to talk about anything. The best way to reach me is email.</p>
      <a class="big-mail" href="mailto:ansontam@berkeley.edu">ansontam@berkeley.edu</a>
    </div>
    <div style="padding-top:8px">
      <dl>
        <dt class="mono">Office</dt><dd>[TBD]<br/>Julis Romo Rabinowitz Building<br/>Princeton University</dd>
        <dt class="mono">GitHub</dt><dd><a href="https://github.com/ansontam18" target="_blank" rel="noopener">@ansontam18 →</a></dd>
        <dt class="mono">LinkedIn</dt><dd><a href="https://www.linkedin.com/in/a-tam/" target="_blank" rel="noopener">in/a-tam →</a></dd>
        <dt class="mono">CV</dt><dd><a href="#cv">Download PDF →</a></dd>
      </dl>
    </div>
  </section>`;
}

const VIEWS = {
  home: homeView, cv: cvView, research: researchView,
  teaching: teachingView, econ101a: econ101aView, blog: blogView, contact: contactView,
};

/* ---------- router ---------- */

function currentRoute() {
  const h = (location.hash || "#home").slice(1);
  return ROUTES.includes(h) ? h : "home";
}

function render() {
  const route = currentRoute();
  const root = document.getElementById("view");

  // build
  root.innerHTML = VIEWS[route]();
  root.classList.remove("enter");
  void root.offsetWidth;      // reflow to restart animation
  root.classList.add("enter");
  // drop the class once done so an idle view rests at its base (visible) state
  clearTimeout(render._t);
  render._t = setTimeout(() => root.classList.remove("enter"), 420);

  // active tab
  document.querySelectorAll("nav.tabs a").forEach(a => {
    const isActive = a.dataset.route === route ||
      (a.dataset.route === "teaching" && route === "econ101a");
    a.classList.toggle("active", isActive);
  });

  // title + scroll + close mobile nav
  document.title = `Anson Tam — ${LABELS[route]}`;
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  document.querySelector("nav.tabs").classList.remove("open");
}

function buildNav() {
  const nav = document.querySelector("nav.tabs");
  nav.innerHTML = ROUTES.filter(r => r !== "econ101a").map(r => {
    if (r === "teaching") {
      return `<div class="nav-item">
        <a href="#${r}" data-route="${r}">${LABELS[r]}</a>
        <div class="nav-dropdown">
          <a href="#econ101a" data-route="econ101a">ECON 101A</a>
        </div>
      </div>`;
    }
    return `<a href="#${r}" data-route="${r}">${LABELS[r]}</a>`;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  buildNav();
  render();
  window.addEventListener("hashchange", render);
  document.querySelector(".nav-toggle").addEventListener("click", () => {
    document.querySelector("nav.tabs").classList.toggle("open");
  });
});
