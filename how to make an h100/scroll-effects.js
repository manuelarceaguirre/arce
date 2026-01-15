/**
 * Stripe Press-style Scroll Effects for H100 Blog
 * Uses Lenis for smooth scrolling and GSAP ScrollTrigger for animations
 */

(function() {
    'use strict';

    // Configuration - snappy and responsive
    const CONFIG = {
        lenisOptions: {
            duration: 0.8,
            easing: (t) => 1 - Math.pow(1 - t, 4), // Snappier ease-out-quart
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.2,
            touchMultiplier: 2,
            infinite: false,
            lerp: 0.1 // More responsive interpolation
        },
        scrollTriggerDefaults: {
            start: 'top 85%',
            once: true
        }
    };

    // State
    let lenis = null;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // ============================================
    // 1. Initialize GSAP ScrollTrigger
    // ============================================
    function initGSAP() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP or ScrollTrigger not loaded');
            return false;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Set defaults - snappy
        gsap.defaults({
            ease: 'power4.out',
            duration: 0.5
        });

        return true;
    }

    // ============================================
    // 2. Initialize Lenis Smooth Scrolling
    // ============================================
    function initLenis() {
        if (prefersReducedMotion || isMobile) {
            document.documentElement.classList.remove('lenis', 'lenis-smooth');
            return;
        }

        if (typeof Lenis === 'undefined') {
            console.warn('Lenis not loaded');
            return;
        }

        lenis = new Lenis(CONFIG.lenisOptions);

        // Connect Lenis to ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis to GSAP ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Add class to html
        document.documentElement.classList.add('lenis', 'lenis-smooth');
    }

    // ============================================
    // 3. Reading Progress Bar
    // ============================================
    function initProgressBar() {
        const progressContainer = document.querySelector('.reading-progress');
        const progressBar = document.querySelector('.reading-progress-bar');

        if (!progressBar || !progressContainer) return;

        // Show progress bar after hero
        ScrollTrigger.create({
            trigger: '.hero-section',
            start: 'bottom 90%',
            onEnter: () => progressContainer.classList.add('visible'),
            onLeaveBack: () => progressContainer.classList.remove('visible')
        });

        // Update progress
        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                progressBar.style.width = `${self.progress * 100}%`;
            }
        });
    }

    // ============================================
    // 4. Sidebar TOC & Scroll Markers
    // ============================================
    function initChapterNav() {
        const chapters = document.querySelectorAll('.chapter[id^="chapter-"]');
        const tocLinks = document.querySelectorAll('.sidebar-toc a');
        const scrollMarkers = document.querySelectorAll('.scroll-marker');

        if (chapters.length === 0) return;

        // Track active chapter
        chapters.forEach((chapter, index) => {
            const sectionNum = index + 1;

            ScrollTrigger.create({
                trigger: chapter,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveSection(sectionNum),
                onEnterBack: () => setActiveSection(sectionNum)
            });
        });

        function setActiveSection(sectionNum) {
            // Update scroll markers
            scrollMarkers.forEach(marker => {
                const markerSection = parseInt(marker.dataset.section);
                marker.classList.toggle('active', markerSection === sectionNum);
            });

            // Update TOC links
            tocLinks.forEach(link => {
                const linkSection = parseInt(link.dataset.section);
                link.classList.toggle('active', linkSection === sectionNum);
            });
        }

        // Smooth scroll on TOC click
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    if (lenis) {
                        lenis.scrollTo(target, { offset: -40, duration: 0.6 });
                    } else {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });

        // Scroll marker clicks
        scrollMarkers.forEach(marker => {
            marker.addEventListener('click', () => {
                const sectionNum = marker.dataset.section;
                const target = document.querySelector(`#chapter-${sectionNum}`);

                if (target) {
                    if (lenis) {
                        lenis.scrollTo(target, { offset: -40, duration: 0.6 });
                    } else {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
            marker.style.cursor = 'pointer';
        });
    }

    // ============================================
    // 5. Hero Animations
    // ============================================
    function initHeroAnimations() {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;

        // Simple fade in for the hero content
        gsap.from('.hero-meta', {
            opacity: 0,
            y: 10,
            duration: 0.4,
            delay: 0.1
        });

        gsap.from('.hero-title', {
            opacity: 0,
            y: 15,
            duration: 0.5,
            delay: 0.2
        });

        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 10,
            duration: 0.4,
            delay: 0.35
        });

        gsap.from('.divider-line', {
            opacity: 0,
            duration: 0.3,
            delay: 0.5
        });
    }

    // ============================================
    // 6. Content Reveal Animations
    // ============================================
    function initContentReveals() {
        // Chapter titles
        gsap.utils.toArray('.chapter-title').forEach(title => {
            ScrollTrigger.create({
                trigger: title,
                start: 'top 80%',
                onEnter: () => title.classList.add('revealed'),
                once: true
            });
        });

        // Fade-in-up elements
        gsap.utils.toArray('.fade-in-up').forEach(element => {
            ScrollTrigger.create({
                trigger: element,
                start: 'top 85%',
                onEnter: () => element.classList.add('revealed'),
                once: true
            });
        });

        // Pull quotes
        gsap.utils.toArray('.pull-quote').forEach(quote => {
            ScrollTrigger.create({
                trigger: quote,
                start: 'top 85%',
                onEnter: () => quote.classList.add('revealed'),
                once: true
            });
        });

        // Data tables
        gsap.utils.toArray('.data-table-container').forEach(table => {
            ScrollTrigger.create({
                trigger: table,
                start: 'top 85%',
                onEnter: () => table.classList.add('revealed'),
                once: true
            });
        });

        // Mermaid containers
        gsap.utils.toArray('.mermaid-container').forEach(container => {
            ScrollTrigger.create({
                trigger: container,
                start: 'top 80%',
                onEnter: () => container.classList.add('revealed'),
                once: true
            });
        });
    }

    // ============================================
    // 7. Supply Chain Flow Animation
    // ============================================
    function initSupplyChainFlow() {
        const flowSteps = document.querySelectorAll('.flow-step');
        if (flowSteps.length === 0) return;

        flowSteps.forEach((step, index) => {
            ScrollTrigger.create({
                trigger: step,
                start: 'top 88%',
                onEnter: () => {
                    setTimeout(() => {
                        step.classList.add('revealed');
                    }, index * 40); // Faster stagger
                },
                once: true
            });
        });
    }

    // ============================================
    // 8. Process Steps Animation
    // ============================================
    function initProcessSteps() {
        const steps = document.querySelectorAll('.process-step');
        if (steps.length === 0) return;

        steps.forEach((step, index) => {
            ScrollTrigger.create({
                trigger: step,
                start: 'top 85%',
                onEnter: () => {
                    setTimeout(() => {
                        step.classList.add('revealed');
                    }, index * 50); // Faster stagger
                },
                once: true
            });
        });
    }

    // ============================================
    // 9. Mermaid Rendering
    // ============================================
    function initMermaid() {
        if (typeof mermaid === 'undefined') {
            console.warn('Mermaid not loaded');
            return;
        }

        // Get current theme
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        mermaid.initialize({
            startOnLoad: false,
            theme: isDark ? 'dark' : 'default',
            themeVariables: {
                primaryColor: '#ff6b00',
                primaryTextColor: isDark ? '#fff' : '#333',
                primaryBorderColor: '#ff6b00',
                lineColor: isDark ? '#666' : '#333',
                secondaryColor: isDark ? '#2a2a2a' : '#f8f9fa',
                tertiaryColor: isDark ? '#333' : '#e9ecef',
                background: isDark ? '#1d2021' : '#fff'
            }
        });

        // Render mermaid diagrams
        setTimeout(async () => {
            const mermaidElements = document.querySelectorAll('.language-mermaid');

            for (const element of mermaidElements) {
                const graphDefinition = element.textContent.trim();
                try {
                    const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
                    const { svg } = await mermaid.render(id, graphDefinition);
                    element.innerHTML = svg;
                    element.classList.remove('language-mermaid');
                    element.classList.add('mermaid-rendered');
                } catch (error) {
                    console.error('Mermaid rendering error:', error);
                }
            }

            // Refresh ScrollTrigger after diagrams render
            ScrollTrigger.refresh();
        }, 500);
    }

    // ============================================
    // 10. Theme Integration
    // ============================================
    function initThemeIntegration() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    // Re-initialize Mermaid with new theme
                    initMermaid();
                    // Refresh ScrollTrigger positions
                    setTimeout(() => ScrollTrigger.refresh(), 100);
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    // ============================================
    // 11. Resize Handler
    // ============================================
    function initResizeHandler() {
        let resizeTimer;
        let lastWidth = window.innerWidth;

        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Only refresh if width changed significantly
                if (Math.abs(window.innerWidth - lastWidth) > 50) {
                    ScrollTrigger.refresh();
                    lastWidth = window.innerWidth;
                }
            }, 250);
        });
    }

    // ============================================
    // 12. Keyboard Navigation
    // ============================================
    function initKeyboardNav() {
        const chapters = document.querySelectorAll('.chapter');
        if (chapters.length === 0) return;

        document.addEventListener('keydown', (e) => {
            // Only if not in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            const scrollAmount = window.innerHeight * 0.8;

            if (e.key === 'ArrowDown' || e.key === 'j') {
                e.preventDefault();
                if (lenis) {
                    lenis.scrollTo(lenis.scroll + scrollAmount, { duration: 0.5 });
                } else {
                    window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                }
            } else if (e.key === 'ArrowUp' || e.key === 'k') {
                e.preventDefault();
                if (lenis) {
                    lenis.scrollTo(lenis.scroll - scrollAmount, { duration: 0.5 });
                } else {
                    window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
                }
            } else if (e.key === 'Home') {
                e.preventDefault();
                if (lenis) {
                    lenis.scrollTo(0, { duration: 0.6 });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } else if (e.key === 'End') {
                e.preventDefault();
                if (lenis) {
                    lenis.scrollTo(document.body.scrollHeight, { duration: 0.6 });
                } else {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }
            }
        });
    }

    // ============================================
    // Initialize Everything
    // ============================================
    function init() {
        // Check for required libraries
        if (!initGSAP()) {
            console.error('Failed to initialize GSAP');
            // Fallback: show all content without animations
            document.querySelectorAll('.fade-in-up, .pull-quote, .chapter-title, .data-table-container, .mermaid-container, .flow-step, .process-step').forEach(el => {
                el.classList.add('revealed');
            });
            return;
        }

        // Initialize components
        initLenis();
        initProgressBar();
        initChapterNav();
        initHeroAnimations();
        initContentReveals();
        initSupplyChainFlow();
        initProcessSteps();
        initMermaid();
        initThemeIntegration();
        initResizeHandler();
        initKeyboardNav();

        // Refresh after all content loads
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });

        // Handle images loading
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
            ScrollTrigger.refresh();
        } else {
            images.forEach(img => {
                if (img.complete) {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        ScrollTrigger.refresh();
                    }
                } else {
                    img.addEventListener('load', () => {
                        loadedImages++;
                        if (loadedImages === totalImages) {
                            ScrollTrigger.refresh();
                        }
                    });
                    img.addEventListener('error', () => {
                        loadedImages++;
                        if (loadedImages === totalImages) {
                            ScrollTrigger.refresh();
                        }
                    });
                }
            });
        }
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose lenis for external access if needed
    window.blogLenis = {
        getInstance: () => lenis,
        scrollTo: (target, options) => {
            if (lenis) {
                lenis.scrollTo(target, options);
            } else if (typeof target === 'number') {
                window.scrollTo({ top: target, behavior: 'smooth' });
            } else {
                document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

})();
