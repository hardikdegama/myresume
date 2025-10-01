// src/hooks/useThemeSwitcher.js
import { useState, useEffect } from 'react';

// Theme Definitions from original JS
const themes = [
    // Theme 0: Fresh (Green & Blue) - Default
    { name: 'Fresh', primary: '#4CAF50', secondary: '#2196F3', background: '#f4f4f9', card: '#ffffff', text: '#333333', header: '#1a1a1a', htmlCss: '#E34C26', js: '#F0DB4F', design: '#FF7043', backend: '#388E3C' },
    // Theme 1: Deep Ocean
    { name: 'Deep Ocean', primary: '#008CBA', secondary: '#FFC300', background: '#e6f3f8', card: '#ffffff', text: '#36454F', header: '#003366', htmlCss: '#E37222', js: '#4DB6AC', design: '#7B1FA2', backend: '#6D4C41' },
    // Theme 2: Night Mode
    { name: 'Night Mode', primary: '#E91E63', secondary: '#FBC02D', background: '#121212', card: '#1e1e1e', text: '#e0e0e0', header: '#ffffff', htmlCss: '#9E9E9E', js: '#FFEB3B', design: '#FF9800', backend: '#8BC34A' }
];

// Helper function (simplified version of original)
function getLightenedColor(hex) {
    // Logic for gradient color change (can be refined)
    return hex === '#4CAF50' ? '#4cbf52' : hex; 
}

export const useThemeSwitcher = () => {
    const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

    const switchTheme = () => {
        setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
    };

    useEffect(() => {
        const theme = themes[currentThemeIndex];
        const root = document.documentElement;

        // Apply CSS variables
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--background-color', theme.background);
        root.style.setProperty('--card-background', theme.card);
        root.style.setProperty('--text-color', theme.text);
        root.style.setProperty('--header-color', theme.header);
        root.style.setProperty('--html-css-color', theme.htmlCss);
        root.style.setProperty('--javascript-color', theme.js);
        root.style.setProperty('--design-color', theme.design);
        root.style.setProperty('--backend-color', theme.backend);

        // Update button gradients (using a more robust solution in CSS is often better)
        // For direct JS manipulation in React:
        const primaryBtn = document.querySelector('.primary-btn');
        const secondaryBtn = document.querySelector('.secondary-btn');
        if (primaryBtn) primaryBtn.style.backgroundImage = `linear-gradient(135deg, ${theme.primary} 0%, ${getLightenedColor(theme.primary)} 100%)`;
        if (secondaryBtn) secondaryBtn.style.backgroundImage = `linear-gradient(135deg, ${theme.secondary} 0%, ${getLightenedColor(theme.secondary)} 100%)`;

    }, [currentThemeIndex]);

    return { 
        currentTheme: themes[currentThemeIndex], 
        switchTheme 
    };
};