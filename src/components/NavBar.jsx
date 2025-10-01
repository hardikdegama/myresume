// src/components/NavBar.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// NOTE: useScrollSpy hook (like the original JS) would set the 'active' class. 
// For simplicity, we assume an activeSection prop is passed.
const NavBar = ({ switchTheme, currentThemeName, activeSection }) => {
    
    // Links data
    const links = [
        { href: "#about", label: "About Me" },
        { href: "#skills", label: "Skills" },
        { href: "#services", label: "Services" },
        { href: "#contact", label: "Contact Me" },
    ];

    return (
        <header className="navbar">
            {links.map(link => (
                <a 
                    key={link.href}
                    href={link.href} 
                    className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                >
                    {link.label}
                </a>
            ))}
            
            <button 
                id="theme-switcher" 
                className="btn primary-btn" 
                title={`Currently active: ${currentThemeName}. Click to switch.`}
                onClick={switchTheme}
            >
                <FontAwesomeIcon icon={faMagic} /> {currentThemeName} Theme Active
            </button>
        </header>
    );
};

NavBar.propTypes = {
    switchTheme: PropTypes.func.isRequired,
    currentThemeName: PropTypes.string.isRequired,
    activeSection: PropTypes.string.isRequired,
};

export default NavBar;