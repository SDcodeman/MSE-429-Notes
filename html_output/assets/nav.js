/* MSE491 Study Pages — Shared Navigation Data */
/* Every HTML page includes this to render the sidebar consistently */

const NAV_DATA = {
  chapters: [
    { href: "MSE429_Chapter_2.html", title: "Ch 2: Spatial Descriptions & Transforms", course: "MSE429" },
    { href: "MSE492_Chapter_3.html", title: "Ch 3: Manipulator Kinematics (DH)", course: "MSE492" },
    { href: "MSE492_Chapter_4.html", title: "Ch 4: Inverse Kinematics", course: "MSE492" },
    { href: "MSE492_Chapter_5.html", title: "Ch 5: Jacobians & Velocities", course: "MSE492" },
    { href: "MSE492_Chapter_6.html", title: "Ch 6: Manipulator Dynamics", course: "MSE492" },
    { href: "MSE492_Chapter_7.html", title: "Ch 7: Trajectory Generation", course: "MSE492" },
    { href: "MSE492_Chapter_8.html", title: "Ch 8: Manipulator Design", course: "MSE492" },
  ],
  tutorials: [
    { href: "MSE429_Tutorial_1.html", title: "Tutorial 1", course: "MSE429" },
    { href: "MSE429_Tutorial_3.html", title: "Tutorial 3", course: "MSE429" },
    { href: "MSE429_Tutorial_4.html", title: "Tutorial 4", course: "MSE429" },
    { href: "MSE429_Tutorial_5.html", title: "Tutorial 5", course: "MSE429" },
    { href: "MSE429_Tutorial_6.html", title: "Tutorial 6", course: "MSE429" },
  ],
  assessments: [
    { href: "MSE429_Assignment_1.html", title: "Assignment 1", course: "MSE429" },
    { href: "MSE429_Assignment_2.html", title: "Assignment 2", course: "MSE429" },
    { href: "MSE429_Assignment_3.html", title: "Assignment 3", course: "MSE429" },
    { href: "MSE429_Midterm_1.html", title: "Midterm 1", course: "MSE429" },
  ]
};

/* Ordered list for prev/next navigation */
const PAGE_ORDER = [
  ...NAV_DATA.chapters.map(c => c.href),
  ...NAV_DATA.tutorials.map(t => t.href),
  ...NAV_DATA.assessments.map(a => a.href),
];

function renderSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  let html = '<h2>MSE 429/492</h2>';

  html += '<div class="sidebar-section"><h3>Chapters</h3>';
  NAV_DATA.chapters.forEach(c => { html += `<a href="${c.href}">${c.title}</a>`; });
  html += '</div>';

  html += '<div class="sidebar-section"><h3>Tutorials</h3>';
  NAV_DATA.tutorials.forEach(t => { html += `<a href="${t.href}">${t.title}</a>`; });
  html += '</div>';

  html += '<div class="sidebar-section"><h3>Assessments</h3>';
  NAV_DATA.assessments.forEach(a => { html += `<a href="${a.href}">${a.title}</a>`; });
  html += '</div>';

  sidebar.innerHTML = html;
}

function renderPageNav() {
  const nav = document.querySelector('.page-nav');
  if (!nav) return;

  const current = window.location.pathname.split('/').pop();
  const idx = PAGE_ORDER.indexOf(current);

  let html = '';
  if (idx > 0) {
    html += `<a href="${PAGE_ORDER[idx - 1]}">&larr; Previous</a>`;
  } else {
    html += '<span></span>';
  }
  if (idx < PAGE_ORDER.length - 1 && idx >= 0) {
    html += `<a href="${PAGE_ORDER[idx + 1]}">Next &rarr;</a>`;
  } else {
    html += '<span></span>';
  }
  nav.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderPageNav();
});
