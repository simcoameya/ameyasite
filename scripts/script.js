(function() {
    'use strict';

    // --- Rotating Words ---
    const words = ['Manufacturing.', 'Pharma.', 'Oil & Gas.', 'Healthcare.', 'Food & Bev.'];
    let wordIdx = 0;
    const el = document.getElementById('rotatingWord');
    if (el) {
        setInterval(function() {
            wordIdx = (wordIdx + 1) % words.length;
            el.style.animation = 'none';
            el.offsetHeight; // trigger reflow
            el.textContent = words[wordIdx];
            el.style.animation = 'wordSwap 0.55s cubic-bezier(.2,.8,.2,1)';
        }, 3000);
    }

    // --- Scroll Progress Bar ---
    var progressBar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = progress + '%';
    });

    // --- Back to Top ---
    var backBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (backBtn) {
            if (window.scrollY > 400) {
                backBtn.classList.add('visible');
            } else {
                backBtn.classList.remove('visible');
            }
        }
    });
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Reveal on Scroll ---
    var reveals = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(function(el) { observer.observe(el); });

    // --- Active Nav Link ---
    var navLinks = document.querySelectorAll('.nav-links a');
    var sections = document.querySelectorAll('section[id], .cta-wrap[id]');
    window.addEventListener('scroll', function() {
        var scrollPos = window.scrollY + 120;
        sections.forEach(function(sec) {
            if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sec.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // --- Industry Tabs ---
    var industryData = [
        {
            pill: 'Calibration',
            title: 'Precision at the heart of the production floor',
            desc: 'Manage instrument calibration, traceability, and audit trails across multiple plants — without slowing down operations.',
            features: [
                'Multi-site instrument registry and scheduling',
                'Digital calibration certificates with full history',
                'ISO 9001 / 17025 ready audit exports',
                'Live dashboards for floor managers'
            ]
        },
        {
            pill: 'Compliance',
            title: 'Regulated industries demand zero-error calibration',
            desc: 'Ensure every instrument is calibrated, every certificate is audit-ready, and every process meets FDA / GMP standards.',
            features: [
                'Automated calibration scheduling with reminders',
                'FDA 21 CFR Part 11 compliant audit trails',
                'NABL-accredited certificate generation',
                'Validation and qualification tracking'
            ]
        },
        {
            pill: 'Integrity',
            title: 'Safety-critical operations need reliable data',
            desc: 'Track instrument health, schedule preventive calibrations, and ensure operational integrity across hazardous environments.',
            features: [
                'Hazardous area equipment tracking',
                'NDT technician qualification management',
                'Pipeline and vessel inspection scheduling',
                'Compliance reporting for safety audits'
            ]
        },
        {
            pill: 'Traceability',
            title: 'From farm to table — every measurement matters',
            desc: 'Maintain complete traceability of all measurement instruments used in food safety and quality assurance.',
            features: [
                'Temperature and weight instrument tracking',
                'HACCP and ISO 22000 compliance support',
                'Automated calibration reminders',
                'Full traceability chain documentation'
            ]
        },
        {
            pill: 'Reliability',
            title: 'Patient safety starts with accurate instruments',
            desc: 'Manage biomedical equipment calibration, maintenance schedules, and regulatory compliance for healthcare facilities.',
            features: [
                'Biomedical equipment lifecycle tracking',
                'Joint Commission / NABH audit readiness',
                'Preventive maintenance scheduling',
                'Real-time equipment status dashboards'
            ]
        }
    ];

    var industryList = document.getElementById('industryList');
    if (industryList) {
        industryList.addEventListener('click', function(e) {
            var btn = e.target.closest('.industry-row');
            if (!btn) return;
            var idx = parseInt(btn.getAttribute('data-index'), 10);
            var data = industryData[idx];
            if (!data) return;

            // Update active
            document.querySelectorAll('.industry-row').forEach(function(r) { r.classList.remove('active'); });
            btn.classList.add('active');

            // Update detail
            document.getElementById('industryPill').textContent = data.pill;
            document.getElementById('industryTitle').textContent = data.title;
            document.getElementById('industryDesc').textContent = data.desc;
            var featuresList = document.getElementById('industryFeatures');
            featuresList.innerHTML = data.features.map(function(f) {
                return '<div class="feature-item"><div class="feature-check">✓</div>' + f + '</div>';
            }).join('');

            // Re-trigger animation
            var panel = document.getElementById('industryDetail');
            panel.style.animation = 'none';
            panel.offsetHeight;
            panel.style.animation = 'panelIn 0.45s cubic-bezier(.2,.7,.2,1)';
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();