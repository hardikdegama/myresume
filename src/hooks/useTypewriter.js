// src/hooks/useTypewriter.js
import { useEffect } from 'react';

export const useTypewriter = (text, elementId, speed = 70) => {
    useEffect(() => {
        const typeTextElement = document.getElementById(elementId);
        if (!typeTextElement || !text) return;

        // Reset for animation
        typeTextElement.textContent = '';
        typeTextElement.style.width = '0';
        typeTextElement.style.animation = `blink-cursor 0.75s step-end infinite`;
        typeTextElement.style.borderRight = `3px solid var(--secondary-color)`;

        let i = 0;
        const type = () => {
            if (i < text.length) {
                typeTextElement.textContent += text.charAt(i);
                i++;
                // Set width dynamically to approximate the typing effect
                typeTextElement.style.width = `${i * 1.5}ch`; 
                setTimeout(type, speed);
            } else {
                // Stop cursor blink animation
                typeTextElement.style.animation = 'none';
                typeTextElement.style.borderRight = 'none';
            }
        };

        // Delay starting the typewriter (matches the original CSS delay for slide-in)
        const timeoutId = setTimeout(type, 1500);

        // Cleanup function for React to clear timeout on unmount
        return () => clearTimeout(timeoutId);
    }, [text, elementId, speed]);
};