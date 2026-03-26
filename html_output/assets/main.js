/* MSE491 Study Pages — Shared JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCollapsibles();
  initDerivationSteps();
  initSolutionToggles();
  initSidebarToggle();
  initSidebarHighlight();
  initQuizzes();
  initFlashcards();
  initRotationDemos();
  initSectionProgress();
  initConceptChecks();
  initQuickRef();
  initFigureZoom();
  initWhyBoxes();
});

/* ===== THEME TOGGLE ===== */
function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const stored = localStorage.getItem('mse491-theme');
  if (stored === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('mse491-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('mse491-theme', 'dark');
    }
    updateThemeIcon();
  });

  updateThemeIcon();
}

function updateThemeIcon() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  toggle.textContent = isDark ? '\u2600' : '\u263E';
}

/* ===== COLLAPSIBLE SECTIONS ===== */
function initCollapsibles() {
  document.querySelectorAll('.collapsible-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      parent.classList.toggle('open');
    });
  });
}

/* ===== STEP-BY-STEP DERIVATIONS ===== */
function initDerivationSteps() {
  document.querySelectorAll('.derivation-steps').forEach(container => {
    const steps = container.querySelectorAll('.derivation-step');
    const prevBtn = container.querySelector('.step-prev');
    const nextBtn = container.querySelector('.step-next');
    const showAllBtn = container.querySelector('.step-show-all');
    const counter = container.querySelector('.step-counter');
    let current = 0;

    function updateSteps() {
      steps.forEach((step, i) => {
        step.classList.toggle('visible', i <= current);
      });
      if (prevBtn) prevBtn.disabled = current === 0;
      if (nextBtn) nextBtn.disabled = current >= steps.length - 1;
      if (counter) counter.textContent = `Step ${current + 1} of ${steps.length}`;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { if (current > 0) { current--; updateSteps(); } });
    if (nextBtn) nextBtn.addEventListener('click', () => { if (current < steps.length - 1) { current++; updateSteps(); } });
    if (showAllBtn) showAllBtn.addEventListener('click', () => {
      current = steps.length - 1;
      updateSteps();
    });

    updateSteps();
  });
}

/* ===== SHOW/HIDE SOLUTION ===== */
function initSolutionToggles() {
  document.querySelectorAll('.solution-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const isVisible = target.classList.toggle('visible');
      btn.textContent = isVisible ? 'Hide Solution' : 'Show Solution';
    });
  });
}

/* ===== MOBILE SIDEBAR ===== */
function initSidebarToggle() {
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar on click outside (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 900 && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

/* ===== SIDEBAR ACTIVE HIGHLIGHT ===== */
function initSidebarHighlight() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.sidebar a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

/* ================================================================= */
/* ===== INTERACTIVE COMPONENTS                                ===== */
/* ================================================================= */

/* ===== SELF-TEST QUIZZES ===== */
function initQuizzes() {
  document.querySelectorAll('.quiz').forEach(quiz => {
    const options = quiz.querySelectorAll('.quiz-option');
    const feedback = quiz.querySelector('.quiz-feedback');
    let answered = false;

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const isCorrect = opt.dataset.correct === 'true';
        opt.classList.add(isCorrect ? 'correct' : 'incorrect');

        // Disable all options
        options.forEach(o => {
          o.classList.add('disabled');
          // Reveal the correct answer
          if (o.dataset.correct === 'true' && o !== opt) {
            o.classList.add('reveal-correct');
          }
        });

        // Show feedback
        if (feedback) {
          feedback.classList.add('show');
          if (isCorrect) {
            feedback.classList.add('correct');
            feedback.textContent = feedback.dataset.correct || 'Correct!';
          } else {
            feedback.classList.add('incorrect');
            feedback.textContent = feedback.dataset.incorrect || 'Not quite. See the highlighted correct answer above.';
          }
        }

        // Update page quiz score
        updateQuizScore();

        // Re-render math in feedback if needed
        if (typeof renderMathInElement === 'function') {
          renderMathInElement(feedback, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false}
            ],
            throwOnError: false
          });
        }
      });
    });
  });
}

function updateQuizScore() {
  const scoreEl = document.querySelector('.quiz-score');
  if (!scoreEl) return;
  const total = document.querySelectorAll('.quiz').length;
  const answered = document.querySelectorAll('.quiz-option.correct').length +
                   document.querySelectorAll('.quiz-option.incorrect').length;
  const correct = document.querySelectorAll('.quiz-option.correct').length;
  // Only count unique quizzes answered
  const quizzesAnswered = document.querySelectorAll('.quiz-feedback.show').length;
  const quizzesCorrect = document.querySelectorAll('.quiz-feedback.correct').length;
  scoreEl.textContent = `Quiz Score: ${quizzesCorrect} / ${quizzesAnswered} answered (${total} total)`;
}

/* ===== FLASHCARD DECKS ===== */
function initFlashcards() {
  document.querySelectorAll('.flashcard-deck').forEach(deck => {
    const cards = deck.querySelectorAll('.flashcard');
    const prevBtn = deck.querySelector('.flashcard-prev');
    const nextBtn = deck.querySelector('.flashcard-next');
    const counter = deck.querySelector('.flashcard-counter');
    const shuffleBtn = deck.querySelector('.flashcard-shuffle');
    let currentIndex = 0;
    let order = Array.from({length: cards.length}, (_, i) => i);

    function showCard(index) {
      cards.forEach((card, i) => {
        card.style.display = order[i] === order[index] ? 'block' : 'none';
        card.classList.remove('flipped');
      });
      // Actually we need to show based on order
      cards.forEach(c => { c.style.display = 'none'; c.classList.remove('flipped'); });
      cards[order[index]].style.display = 'block';
      if (counter) counter.textContent = `${index + 1} / ${cards.length}`;
      if (prevBtn) prevBtn.disabled = index === 0;
      if (nextBtn) nextBtn.disabled = index >= cards.length - 1;
    }

    // Click card to flip
    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) { currentIndex--; showCard(currentIndex); }
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
      if (currentIndex < cards.length - 1) { currentIndex++; showCard(currentIndex); }
    });

    if (shuffleBtn) shuffleBtn.addEventListener('click', () => {
      // Fisher-Yates shuffle
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      currentIndex = 0;
      showCard(currentIndex);
    });

    // Keyboard navigation when deck is focused/hovered
    deck.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; showCard(currentIndex); }
      if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) { currentIndex++; showCard(currentIndex); }
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        cards[order[currentIndex]].classList.toggle('flipped');
      }
    });
    deck.setAttribute('tabindex', '0');

    if (cards.length > 0) showCard(0);
  });
}

/* ===== INTERACTIVE ROTATION DEMO ===== */
function initRotationDemos() {
  document.querySelectorAll('.rotation-demo').forEach(demo => {
    const canvas = demo.querySelector('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h) * 0.35;

    const thetaSlider = demo.querySelector('.theta-slider');
    const thetaValue = demo.querySelector('.theta-value');
    const matrixDisplay = demo.querySelector('.rotation-matrix-display');
    const presetBtns = demo.querySelectorAll('.rotation-preset-btn');

    function draw(thetaDeg) {
      const theta = thetaDeg * Math.PI / 180;
      const ct = Math.cos(theta);
      const st = Math.sin(theta);

      ctx.clearRect(0, 0, w, h);

      // Background grid
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 1;
      for (let i = -5; i <= 5; i++) {
        // Vertical
        ctx.beginPath();
        ctx.moveTo(cx + i * scale / 2.5, 0);
        ctx.lineTo(cx + i * scale / 2.5, h);
        ctx.stroke();
        // Horizontal
        ctx.beginPath();
        ctx.moveTo(0, cy + i * scale / 2.5);
        ctx.lineTo(w, cy + i * scale / 2.5);
        ctx.stroke();
      }

      // Original axes (grey, dashed)
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = isDark ? '#475569' : '#94a3b8';
      ctx.lineWidth = 1.5;
      // X-axis original
      drawArrow(ctx, cx, cy, cx + scale, cy);
      // Y-axis original
      drawArrow(ctx, cx, cy, cx, cy - scale);
      ctx.setLineDash([]);

      // Axis labels for original
      ctx.fillStyle = isDark ? '#475569' : '#94a3b8';
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText('X', cx + scale + 5, cy + 4);
      ctx.fillText('Y', cx - 4, cy - scale - 8);

      // Rotated X-axis (blue)
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2.5;
      drawArrow(ctx, cx, cy, cx + ct * scale, cy - st * scale);
      ctx.fillStyle = '#2563eb';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.fillText("X'", cx + ct * scale + 5, cy - st * scale + 4);

      // Rotated Y-axis (red)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      drawArrow(ctx, cx, cy, cx + (-st) * scale, cy - ct * scale);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.fillText("Y'", cx + (-st) * scale + 5, cy - ct * scale + 4);

      // Angle arc
      ctx.strokeStyle = isDark ? '#60a5fa' : '#2563eb';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 0.25, -theta, 0, theta > 0);
      ctx.stroke();

      // Theta label
      if (Math.abs(thetaDeg) > 5) {
        const labelAngle = -theta / 2;
        ctx.fillStyle = isDark ? '#60a5fa' : '#2563eb';
        ctx.font = 'bold 13px Inter, sans-serif';
        ctx.fillText('\u03B8=' + thetaDeg + '\u00B0',
          cx + Math.cos(labelAngle) * scale * 0.35,
          cy + Math.sin(labelAngle) * scale * 0.35 + 4);
      }

      // Sample point
      const px = 0.7, py = 0.3; // Original point in unit coords
      // Original point (hollow circle)
      const origX = cx + px * scale;
      const origY = cy - py * scale;
      ctx.beginPath();
      ctx.arc(origX, origY, 5, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? '#475569' : '#94a3b8';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = isDark ? '#1e293b' : '#ffffff';
      ctx.fill();

      // Rotated point (solid circle)
      const rpx = ct * px - st * py;
      const rpy = st * px + ct * py;
      const rotX = cx + rpx * scale;
      const rotY = cy - rpy * scale;
      ctx.beginPath();
      ctx.arc(rotX, rotY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      // Dashed line from original to rotated point
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(origX, origY);
      ctx.lineTo(rotX, rotY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Point labels
      ctx.font = '11px Inter, sans-serif';
      ctx.fillStyle = isDark ? '#94a3b8' : '#555';
      ctx.fillText(`P(${px}, ${py})`, origX + 8, origY - 8);
      ctx.fillStyle = '#10b981';
      ctx.fillText(`P'(${rpx.toFixed(2)}, ${rpy.toFixed(2)})`, rotX + 8, rotY - 8);

      // Update matrix display
      if (matrixDisplay) {
        matrixDisplay.textContent =
          `R(\u03B8) = [ ${ct.toFixed(4)}  ${(-st).toFixed(4)} ]\n` +
          `       [ ${st.toFixed(4)}   ${ct.toFixed(4)} ]`;
      }
    }

    function drawArrow(ctx, x1, y1, x2, y2) {
      const headLen = 8;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();
    }

    if (thetaSlider) {
      thetaSlider.addEventListener('input', () => {
        const val = parseInt(thetaSlider.value);
        if (thetaValue) thetaValue.textContent = val + '\u00B0';
        draw(val);
      });
    }

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.dataset.angle);
        if (thetaSlider) thetaSlider.value = val;
        if (thetaValue) thetaValue.textContent = val + '\u00B0';
        draw(val);
      });
    });

    // Initial draw
    draw(parseInt(thetaSlider?.value || 0));

    // Redraw on theme change
    const observer = new MutationObserver(() => {
      draw(parseInt(thetaSlider?.value || 0));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  });
}

/* ===== SECTION PROGRESS TRACKING ===== */
function initSectionProgress() {
  const progressContainer = document.querySelector('.progress-bar-container');
  if (!progressContainer) return;

  const pageId = window.location.pathname.split('/').pop().replace('.html', '');
  const storageKey = `mse491-progress-${pageId}`;
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');

  const progressFill = progressContainer.querySelector('.progress-bar-fill');
  const progressLabel = progressContainer.querySelector('.progress-bar-label');

  // Auto-inject section check buttons on h2[id] elements or problem callouts
  let trackables = document.querySelectorAll('main h2[id]');

  // If no h2[id] elements found (tutorials/assignments), track problem callouts instead
  if (trackables.length === 0) {
    trackables = document.querySelectorAll('main .callout-example');
  }

  trackables.forEach((el, idx) => {
    const sectionId = el.id || el.querySelector('.callout-label')?.textContent.trim().replace(/\s+/g, '-').toLowerCase() || `section-${idx}`;
    const check = document.createElement('button');
    check.className = 'section-check';
    check.dataset.section = sectionId;
    check.title = 'Mark as completed';
    if (saved[sectionId]) check.classList.add('checked');

    // Insert into heading or after callout-label
    const label = el.querySelector('.callout-label');
    if (el.tagName === 'H2') {
      el.appendChild(check);
    } else if (label) {
      label.style.display = 'inline';
      label.parentNode.insertBefore(check, label.nextSibling);
    }

    check.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isChecked = check.classList.toggle('checked');
      saved[sectionId] = isChecked;
      localStorage.setItem(storageKey, JSON.stringify(saved));
      updateProgress();
    });
  });

  function updateProgress() {
    const total = trackables.length;
    const done = Object.values(saved).filter(v => v).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressLabel) progressLabel.textContent = `${done}/${total} completed (${pct}%)`;
  }

  updateProgress();
}

/* ===== CONCEPT CONFIDENCE CHECKS ===== */
function initConceptChecks() {
  const pageId = window.location.pathname.split('/').pop().replace('.html', '');
  const storageKey = `mse491-confidence-${pageId}`;
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');

  document.querySelectorAll('.concept-check').forEach(check => {
    const concept = check.dataset.concept;
    const btns = check.querySelectorAll('.confidence-btn');

    // Restore saved state
    if (saved[concept]) {
      btns.forEach(b => {
        if (b.dataset.level === saved[concept]) {
          b.classList.add('active-' + b.dataset.level);
        }
      });
    }

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Clear all
        btns.forEach(b => b.className = 'confidence-btn');
        // Set active
        btn.classList.add('active-' + btn.dataset.level);
        saved[concept] = btn.dataset.level;
        localStorage.setItem(storageKey, JSON.stringify(saved));
      });
    });
  });
}

/* ===== QUICK REFERENCE PANEL ===== */
function initQuickRef() {
  const toggle = document.querySelector('.quick-ref-toggle');
  const panel = document.querySelector('.quick-ref-panel');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
    toggle.textContent = panel.classList.contains('open') ? '\u2715' : '\u03A3';
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !toggle.contains(e.target)) {
      panel.classList.remove('open');
      toggle.textContent = '\u03A3';
    }
  });
}

/* ===== WHY? EXPANDABLE BOXES ===== */
function initWhyBoxes() {
  document.querySelectorAll('.why-box').forEach(box => {
    const toggle = box.querySelector('.why-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      box.classList.toggle('open');
    });
  });
}

/* ===== FIGURE CLICK-TO-ZOOM ===== */
function initFigureZoom() {
  document.querySelectorAll('.figure img').forEach(img => {
    img.addEventListener('click', () => {
      if (img.classList.contains('zoomed')) {
        img.classList.remove('zoomed');
      } else {
        // Close any other zoomed images
        document.querySelectorAll('.figure img.zoomed').forEach(z => z.classList.remove('zoomed'));
        img.classList.add('zoomed');
      }
    });
  });

  // Close zoomed image on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.figure img.zoomed').forEach(z => z.classList.remove('zoomed'));
    }
  });
}
