/**
 * MIGUEL — PORTFOLIO CORE ENGINE & IRON MAN NANOTECH SYSTEM
 * 
 * Features:
 * - Red Iron Man Pointer & Gauntlet Hand Hover Cursors
 * - Dynamic Iron Man Repulsor HUD Cursor Follower
 * - Low-Glare Stealth Scrolling Nanobot Wave Transition
 * - Organic Undulating Nanobot Swarm Stream Canvas (About -> Skills)
 * - Iron Man Mark-85 Arc Reactor Holographic Blueprint Watermarks
 * - Slightly Greyed-Out Holographic Section Preview HUD
 * - Soft Synthesized Liquid Nanite Flow & Locking SFX
 * - Sticky Side Nav Tracking & Case Study Detail Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initIronManCursor();
  initNanotechAudio();
  initNanotechCanvas();
  initNanobotStreamCanvas();
  initNanotechClickTransitions();
  initNanotechPreviewHUD();
  initSideNavigation();
  initWorkFilters();
  initCaseStudyModal();
  initContactForm();
  initGlobalClock();
});

/* ==========================================================================
   1. IRON MAN CUSTOM CURSOR FOLLOWER & GAUNTLET HAND INTERACTIONS
   "make the cursor red, like iron man, and when hovering like iron man hands"
   ========================================================================== */
function initIronManCursor() {
  const cursorFollower = document.getElementById('iron-man-cursor');
  if (!cursorFollower) return;

  let mouseX = -100;
  let mouseY = -100;
  let currentX = -100;
  let currentY = -100;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (currentX === -100) {
      currentX = mouseX;
      currentY = mouseY;
    }
  });

  function renderCursor() {
    currentX += (mouseX - currentX) * 0.28;
    currentY += (mouseY - currentY) * 0.28;
    cursorFollower.style.left = `${currentX}px`;
    cursorFollower.style.top = `${currentY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  const hoverSelector = `
    a, button, [role="button"], input, select, textarea, 
    .btn, .interactive-target, .side-nav-link, .work-filter-btn, 
    .sub-work-card, .talk-item, .open-case-study-btn, .nano-audio-btn,
    .nano-hud-close, .nano-engage-btn, .modal-close-btn, [data-preview]
  `;

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelector)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelector)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  window.addEventListener('pointerdown', () => {
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.6)';
    setTimeout(() => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 180);
  });
}

/* ==========================================================================
   2. WEB AUDIO API — STEALTH LIQUID NANOBOT WAVE SFX
   "put less light and more of like wave and scrolling of nanobots"
   ========================================================================== */
let audioCtx = null;
let audioEnabled = true;

function initNanotechAudio() {
  const toggleBtn = document.getElementById('nano-audio-toggle');
  
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Soft, organic liquid nanobot swarm wave sound (low glare / subtle)
  window.playNanotechSFX = function() {
    if (!audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Gentle liquid nanite wave sweep
      const waveOsc = ctx.createOscillator();
      const waveGain = ctx.createGain();
      const waveFilter = ctx.createBiquadFilter();

      waveFilter.type = 'lowpass';
      waveFilter.frequency.setValueAtTime(350, now);
      waveFilter.frequency.exponentialRampToValueAtTime(1100, now + 0.18);
      waveFilter.frequency.exponentialRampToValueAtTime(450, now + 0.42);

      waveOsc.type = 'triangle';
      waveOsc.frequency.setValueAtTime(180, now);
      waveOsc.frequency.linearRampToValueAtTime(320, now + 0.2);
      waveOsc.frequency.exponentialRampToValueAtTime(95, now + 0.45);

      waveGain.gain.setValueAtTime(0.001, now);
      waveGain.gain.linearRampToValueAtTime(0.06, now + 0.08);
      waveGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      waveOsc.connect(waveFilter);
      waveFilter.connect(waveGain);
      waveGain.connect(ctx.destination);
      waveOsc.start(now);
      waveOsc.stop(now + 0.45);

      // 2. Soft metallic plate alignment chime
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(640, now + 0.06);
      chimeOsc.frequency.exponentialRampToValueAtTime(1280, now + 0.25);

      chimeGain.gain.setValueAtTime(0.001, now + 0.06);
      chimeGain.gain.linearRampToValueAtTime(0.035, now + 0.12);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(now + 0.06);
      chimeOsc.stop(now + 0.38);

    } catch (e) {
      // Audio fallback
    }
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      toggleBtn.classList.toggle('muted', !audioEnabled);
      const label = toggleBtn.querySelector('.audio-label');
      if (label) {
        label.textContent = audioEnabled ? 'Nano SFX: ON' : 'Nano SFX: OFF';
      }
      showToast(audioEnabled ? 'Nanobot Audio Active' : 'Nanobot Audio Muted');
      if (audioEnabled) {
        getAudioContext();
        window.playNanotechSFX();
      }
    });
  }

  document.addEventListener('click', () => {
    if (audioEnabled && !audioCtx) {
      getAudioContext();
    }
  }, { once: true });
}

/* ==========================================================================
   3. CLICK-ACTIVATED SCROLLING NANOBOT WAVE TRANSITION
   "less light and more of like wave and scrolling of nanobots"
   ========================================================================== */
function initNanotechClickTransitions() {
  const overlay = document.getElementById('nanotech-transition-overlay');

  function triggerNanotechTransition(clientX, clientY, onMidpoint) {
    if (!overlay) {
      if (onMidpoint) onMidpoint();
      return;
    }

    const x = clientX !== undefined ? clientX : window.innerWidth / 2;
    const y = clientY !== undefined ? clientY : window.innerHeight / 2;
    overlay.style.setProperty('--click-x', `${x}px`);
    overlay.style.setProperty('--click-y', `${y}px`);

    overlay.classList.add('active');

    // Trigger nanobot swarm wave on both canvas layers
    if (window.pulseNanobotWave) {
      window.pulseNanobotWave();
    }

    if (window.playNanotechSFX) {
      window.playNanotechSFX();
    }

    setTimeout(() => {
      if (onMidpoint) onMidpoint();
    }, 280);

    setTimeout(() => {
      overlay.classList.remove('active');
    }, 750);
  }

  window.triggerNanotechTransition = triggerNanotechTransition;

  // Intercept anchor clicks
  const navTargets = document.querySelectorAll('a[href^="#"], .btn[href^="#"]');

  navTargets.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const targetEl = document.querySelector(href);
      if (!targetEl) return;

      e.preventDefault();

      triggerNanotechTransition(e.clientX, e.clientY, () => {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  });

  const actionButtons = document.querySelectorAll('.btn-nanotech, button[type="submit"]');
  actionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.tagName === 'A' && btn.getAttribute('href')?.startsWith('#')) return;
      triggerNanotechTransition(e.clientX, e.clientY);
    });
  });
}

/* ==========================================================================
   4. DEDICATED ORGANIC NANOBOT STREAM CANVAS (Between About & Skills)
   "in transition from about to skills (or so), put less light and more of like wave and scrolling of nanobots"
   ========================================================================== */
function initNanobotStreamCanvas() {
  const canvas = document.getElementById('nanobot-stream-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight || 120);

  window.addEventListener('resize', () => {
    if (canvas.parentElement) {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }
  });

  // Micro nanobot particle swarm
  const nanobotCount = 120;
  const nanobots = [];

  for (let i = 0; i < nanobotCount; i++) {
    nanobots.push({
      x: Math.random() * width,
      y: Math.random() * height,
      baseY: Math.random() * height,
      vx: (Math.random() * 1.5 + 1.2), // Flowing horizontally in a streaming wave
      size: Math.random() * 2.4 + 1.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.04 + 0.02,
      amplitude: Math.random() * 22 + 10,
      colorType: Math.random() > 0.4 ? 'titanium' : (Math.random() > 0.5 ? 'crimson' : 'cyan')
    });
  }

  let waveBoost = 1;

  window.pulseNanobotWave = function() {
    waveBoost = 2.8;
    setTimeout(() => { waveBoost = 1; }, 800);
  };

  let time = 0;

  function renderNanobotStream() {
    ctx.clearRect(0, 0, width, height);
    time += 0.03 * waveBoost;

    // Draw flowing sinusoidal nanobot wave streams
    for (let i = 0; i < nanobotCount; i++) {
      const b = nanobots[i];
      b.x += b.vx * waveBoost;
      if (b.x > width + 20) {
        b.x = -20;
        b.baseY = Math.random() * height;
      }

      // Sinusoidal wave physics
      b.y = b.baseY + Math.sin(time + b.phase + b.x * 0.008) * b.amplitude;

      ctx.save();
      ctx.translate(b.x, b.y);

      // Draw microscopic hexagonal nanobot platelet
      ctx.beginPath();
      const s = b.size;
      for (let h = 0; h < 6; h++) {
        const angle = (h * Math.PI) / 3;
        const hx = Math.cos(angle) * s;
        const hy = Math.sin(angle) * s;
        if (h === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();

      if (b.colorType === 'cyan') {
        ctx.fillStyle = 'rgba(0, 240, 255, 0.45)';
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
      } else if (b.colorType === 'crimson') {
        ctx.fillStyle = 'rgba(214, 26, 41, 0.35)';
        ctx.strokeStyle = 'rgba(255, 60, 75, 0.7)';
      } else {
        ctx.fillStyle = 'rgba(180, 185, 200, 0.28)';
        ctx.strokeStyle = 'rgba(240, 240, 250, 0.5)';
      }

      ctx.lineWidth = 0.5;
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }

    requestAnimationFrame(renderNanobotStream);
  }

  renderNanobotStream();

  // Trigger swarm pulse when scrolling near seam
  const seamObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.pulseNanobotWave();
      }
    });
  }, { threshold: 0.2 });

  const seamEl = document.getElementById('nanobot-wave-seam');
  if (seamEl) seamObserver.observe(seamEl);
}

/* ==========================================================================
   5. HOLOGRAPHIC NANOTECH PREVIEW HUD (MIGUEL ATELIER)
   "show preview but slightly greyed"
   ========================================================================== */
const previewDatabase = {
  work: {
    target: 'SECTION // 03 REPERTOIRE',
    title: 'FORMA — Urban Rituals AW24',
    desc: 'Cannes Lions Grand Prix 2025. Brutalist plaza multimedia billboard campaign.',
    image: 'assets/work_campaign.jpg',
    coords: '51.5074° N · 0.1278° W',
    sectionId: '#work'
  },
  forma: {
    target: 'CASE STUDY // FORMA AW24',
    title: 'Urban Rituals Campaign',
    desc: 'Global OOH identity, architectural scenography & cinema spot.',
    image: 'assets/work_campaign.jpg',
    coords: 'BERLIN // KREUZBERG ARCHIVE',
    sectionId: '#work'
  },
  kronos: {
    target: 'EXHIBITION // VENICE BIENNALE',
    title: 'KRONOS — Chronometry',
    desc: 'Immersive pavilion examining monolithic stone typologies & light decay.',
    image: 'assets/about_gallery.jpg',
    coords: '45.4387° N · 12.3271° E',
    sectionId: '#work'
  },
  aura: {
    target: 'COMMISSION // TATE MODERN',
    title: 'AURA — Sound & Matter',
    desc: 'Kinetic acoustic installation in the Turbine Hall. 450k visitors.',
    image: 'assets/speaking_stage.jpg',
    coords: '51.5076° N · 0.0994° W',
    sectionId: '#work'
  },
  neobrutal: {
    target: 'PUBLICATION // ARCHITECTURAL DIGEST',
    title: 'NEO-BRUTAL Monograph',
    desc: '480pp hardcover design study examining concrete forms in modern culture.',
    image: 'assets/work_campaign.jpg',
    coords: 'ISBN: 978-3-16-148410-0',
    sectionId: '#work'
  },
  solitude: {
    target: 'CINEMA SERIES // TOKYO & LONDON',
    title: 'SOLITUDE — Monochromatic OOH',
    desc: 'Exploration of human isolation in hyper-dense urban megalopolises.',
    image: 'assets/rdj_portrait.jpg',
    coords: '35.6762° N · 139.6503° E',
    sectionId: '#work'
  },
  about: {
    target: 'BIOGRAPHY // ARCHIVE FILE 01',
    title: 'The Trajectory of Miguel',
    desc: 'Architecture & semiotics at ETSAM Madrid. Communication design at Central Saint Martins.',
    image: 'assets/about_gallery.jpg',
    coords: 'MADRID // LONDON ATELIER',
    sectionId: '#about'
  },
  skills: {
    target: 'DISCIPLINES // MATRIX 02',
    title: 'Creative Direction & Semiotics',
    desc: 'Synthesizing spatial psychology, brand mythology, and high-impact cinematic campaigns.',
    image: 'assets/rdj_portrait.jpg',
    coords: 'CORE DISCIPLINE SUITE',
    sectionId: '#skills'
  },
  education: {
    target: 'ACADEMIC PEDIGREE // 04',
    title: 'Central Saint Martins & ETSAM',
    desc: 'MA Distinction with Dean\'s Honours. 2x D&AD Black Pencils & Cannes Grand Prix.',
    image: 'assets/about_gallery.jpg',
    coords: 'ACADEMIA // DISTINCTION',
    sectionId: '#education'
  },
  writing: {
    target: 'ESSAYS // EYE MAGAZINE #104',
    title: 'Monoliths in the Feed',
    desc: 'Critical inquiry on brutalism in digital visual culture & architectural media.',
    image: 'assets/speaking_stage.jpg',
    coords: 'CRITICAL ESSAY ARCHIVE',
    sectionId: '#writing'
  },
  speaking: {
    target: 'KEYNOTE // MILAN TRIENNALE',
    title: 'The Semiotics of Desire',
    desc: 'Lecture on luxury visual codes operating in ephemeral attention spans.',
    image: 'assets/speaking_stage.jpg',
    coords: '45.4722° N · 9.1725° E',
    sectionId: '#speaking'
  },
  contact: {
    target: 'ATELIER TERMINAL // COMMS 06',
    title: 'Direct Atelier Inquiries',
    desc: 'Initiate commission brief with Miguel ateliers in London & Madrid.',
    image: 'assets/rdj_portrait.jpg',
    coords: 'COMMISSION LINES ACTIVE',
    sectionId: '#contact'
  },
  mail: {
    target: 'DISPATCH // ENCRYPTED COMMS',
    title: 'miguel@atelier-miguel.com',
    desc: 'Direct confidential correspondence for advisory and masterclass inquiries.',
    image: 'assets/rdj_portrait.jpg',
    coords: 'LONDON ATELIER DESK',
    sectionId: '#contact'
  },
  monograph: {
    target: 'DOSSIER // MONOGRAPH 24MB',
    title: 'Complete Career Dossier',
    desc: 'Comprehensive 480pp archive PDF including sketches, briefs & jury citations.',
    image: 'assets/about_gallery.jpg',
    coords: 'HIGH-RES PDF DOWNLOAD',
    sectionId: '#education'
  }
};

function initNanotechPreviewHUD() {
  const hud = document.getElementById('nano-preview-hud');
  const hudImg = document.getElementById('nano-preview-img');
  const hudTarget = document.getElementById('nano-preview-target');
  const hudTitle = document.getElementById('nano-preview-title');
  const hudDesc = document.getElementById('nano-preview-desc');
  const hudCoord = document.querySelector('.nano-coord');
  const hudCloseBtn = document.getElementById('nano-hud-close');
  const hudProceedBtn = document.getElementById('nano-hud-proceed-btn');
  const backdrop = document.getElementById('nanotech-backdrop');

  if (!hud) return;

  let activeSectionId = '#work';

  function openHUD(previewKey, clientX, clientY) {
    const data = previewDatabase[previewKey] || previewDatabase.work;
    activeSectionId = data.sectionId || '#work';

    if (hudTarget) hudTarget.textContent = data.target;
    if (hudTitle) hudTitle.textContent = data.title;
    if (hudDesc) hudDesc.textContent = data.desc;
    if (hudCoord) hudCoord.textContent = `COORDS: ${data.coords}`;
    if (hudImg) {
      hudImg.src = data.image;
      hudImg.alt = data.title;
    }

    const hudWidth = 340;
    const hudHeight = 320;
    const padding = 24;

    let x = (clientX || window.innerWidth / 2) + 20;
    let y = (clientY || window.innerHeight / 2) - 80;

    if (x + hudWidth > window.innerWidth - padding) {
      x = (clientX || window.innerWidth / 2) - hudWidth - 20;
    }
    if (y + hudHeight > window.innerHeight - padding) {
      y = window.innerHeight - hudHeight - padding;
    }
    if (y < padding) y = padding;
    if (x < padding) x = padding;

    hud.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;

    if (backdrop) backdrop.classList.add('active');
    hud.classList.add('active');

    if (window.playNanotechSFX) {
      window.playNanotechSFX();
    }
  }

  function closeHUD() {
    hud.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
  }

  if (hudCloseBtn) hudCloseBtn.addEventListener('click', closeHUD);
  if (backdrop) backdrop.addEventListener('click', closeHUD);

  if (hudProceedBtn) {
    hudProceedBtn.addEventListener('click', (e) => {
      closeHUD();
      const targetEl = document.querySelector(activeSectionId);
      if (targetEl) {
        window.triggerNanotechTransition(e.clientX, e.clientY, () => {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hud.classList.contains('active')) {
      closeHUD();
    }
  });

  document.querySelectorAll('.skill-card, .sub-work-card, .talk-item').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.open-case-study-btn')) return;

      const pKey = card.getAttribute('data-preview');
      if (pKey) {
        e.preventDefault();
        openHUD(pKey, e.clientX, e.clientY);
      }
    });
  });
}

/* ==========================================================================
   6. AMBIENT NANOTECH CANVAS (Global Particle Mesh)
   ========================================================================== */
function initNanotechCanvas() {
  const canvas = document.getElementById('nano-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 42;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.6 + 0.8,
      alpha: Math.random() * 0.35 + 0.12
    });
  }

  let mouseX = -1000;
  let mouseY = -1000;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha * 0.6})`;
      ctx.fill();

      for (let j = i + 1; j < particleCount; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const lineAlpha = (1 - dist / 120) * 0.14;
          ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      const distMouse = Math.sqrt((p.x - mouseX) ** 2 + (p.y - mouseY) ** 2);
      if (distMouse < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - distMouse / 130) * 0.28})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   7. STICKY SIDE NAVIGATION & OBSERVER
   ========================================================================== */
function initSideNavigation() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.side-nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href').replace('#', '');
          if (href === activeId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   8. WORK FILTER ENGINE
   ========================================================================== */
function initWorkFilters() {
  const filterBtns = document.querySelectorAll('.work-filter-btn');
  const workCards = document.querySelectorAll('.sub-work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (window.triggerNanotechTransition) {
        window.triggerNanotechTransition(e.clientX, e.clientY);
      }

      const filterValue = btn.getAttribute('data-filter');

      workCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   9. CASE STUDY DETAIL MODAL SYSTEM
   ========================================================================== */
const projectData = {
  forma: {
    title: 'FORMA — Urban Rituals AW24',
    client: 'FORMA Luxury House',
    year: '2025/2026',
    role: 'Creative Direction, Campaign Architecture, Scenography',
    awards: 'Cannes Lions Grand Prix 2025, D&AD Black Pencil',
    image: 'assets/work_campaign.jpg',
    brief: 'Redefine modern couture presentation in monumental architectural spaces. Executed across brutalist plazas in London and Berlin, merging raw concrete geometry with razor-sharp tailoring directed by Miguel.',
    deliverables: ['Global Outdoor Billboard System', 'Cinema Spot & Sound Design', 'Hardcover Monograph 350pp', 'Exclusive London Runway Scenography']
  },
  kronos: {
    title: 'KRONOS — The Chronometry of Space',
    client: 'Venice Biennale of Architecture',
    year: '2024',
    role: 'Curatorial Direction, Typographic Identity, Spatial Soundscape',
    awards: 'ADC Europe Gold Cube',
    image: 'assets/about_gallery.jpg',
    brief: 'An immersive architectural pavilion investigating temporal decay and structural permanence. Featuring monolithic stone typologies and laser-calibrated shadow projections.',
    deliverables: ['Exhibition Identity & Catalogue', 'Spatial Audio Experience', 'Lighting Choreography']
  },
  aura: {
    title: 'AURA — Sound & Matter',
    client: 'Tate Modern Cultural Commission',
    year: '2023',
    role: 'Experiential Direction & Kinetic Sculptures',
    awards: 'Design Week Awards Best In Show',
    image: 'assets/speaking_stage.jpg',
    brief: 'A six-month kinetic installation exploring human acoustic vibration against industrial cast iron. Attracted over 450,000 visitors in the Turbine Hall.',
    deliverables: ['Interactive Kinetic Installation', 'Acoustic Engineering Direction', 'Documentary Featurette']
  }
};

function initCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const triggerBtns = document.querySelectorAll('.open-case-study-btn');

  if (!modal) return;

  function openModal(projectId, clientX, clientY) {
    const data = projectData[projectId] || projectData.forma;
    
    document.getElementById('modal-project-title').textContent = data.title;
    document.getElementById('modal-project-client').textContent = data.client;
    document.getElementById('modal-project-year').textContent = data.year;
    document.getElementById('modal-project-role').textContent = data.role;
    document.getElementById('modal-project-awards').textContent = data.awards;
    document.getElementById('modal-project-brief').textContent = data.brief;
    
    const deliverablesList = document.getElementById('modal-project-deliverables');
    deliverablesList.innerHTML = '';
    data.deliverables.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      deliverablesList.appendChild(li);
    });

    const img = document.getElementById('modal-project-image');
    if (img) img.src = data.image;

    if (window.triggerNanotechTransition) {
      window.triggerNanotechTransition(clientX, clientY, () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    } else {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = btn.getAttribute('data-project-id');
      openModal(pid, e.clientX, e.clientY);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   10. CONTACT FORM & LIVE DISPATCH
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('commission-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('client-name');
    const name = nameInput ? nameInput.value.trim() : 'Inquirer';
    
    if (window.triggerNanotechTransition) {
      window.triggerNanotechTransition(e.clientX, e.clientY);
    }

    showToast(`Brief received, ${name}. Direct comms opened with Miguel Atelier.`);
    form.reset();
  });

  const mailBtn = document.getElementById('quick-mail-btn');
  if (mailBtn) {
    mailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        if (window.triggerNanotechTransition) {
          window.triggerNanotechTransition(e.clientX, e.clientY, () => {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            const nameField = document.getElementById('client-name');
            if (nameField) nameField.focus();
          });
        } else {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}

/* ==========================================================================
   11. GLOBAL TIMEZONE CLOCK
   ========================================================================== */
function initGlobalClock() {
  const clockElement = document.getElementById('live-city-clock');
  if (!clockElement) return;

  function updateTime() {
    const now = new Date();
    const options = {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeStr = now.toLocaleTimeString('en-GB', options);
    clockElement.textContent = `LONDON ${timeStr} BST · MIGUEL ATELIER ACTIVE`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* ==========================================================================
   12. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
