// Theme management functionality
(function() {
    'use strict';
    
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply theme immediately to prevent flash
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        currentTheme = theme;
        localStorage.setItem('theme', theme);
    }
    
    // Apply saved theme immediately
    applyTheme(currentTheme);
    
    function toggleTheme() {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }
    
    function createToggleButton() {
        // Check if button already exists to prevent duplicates
        if (document.querySelector('.theme-toggle')) {
            return;
        }
        
        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.title = 'Toggle between light and dark mode';
        button.setAttribute('aria-label', 'Toggle theme');
        button.innerHTML = `
            <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
        `;
        
        button.addEventListener('click', toggleTheme);
        
        // Add to header
        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            headerRight.appendChild(button);
        }
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createToggleButton);
    } else {
        createToggleButton();
    }
})();