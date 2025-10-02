import React, { useState, useEffect } from 'react';
import "./style.css"


const themes = [
    // Theme 0: Fresh (Green & Blue) - Default
    {
        name: 'Fresh',
        primary: '#4CAF50',
        secondary: '#2196F3',
        background: '#f4f4f9',
        card: '#ffffff',
        text: '#333333',
        header: '#1a1a1a',
        htmlCss: '#E34C26',
        js: '#F0DB4F',
        design: '#FF7043',
        backend: '#388E3C'
    },
    // Theme 1: Deep Ocean (Pro Blue & Gold)
    {
        name: 'Deep Ocean',
        primary: '#008CBA',
        secondary: '#FFC300',
        background: '#e6f3f8',
        card: '#ffffff',
        text: '#36454F',
        header: '#003366',
        htmlCss: '#E37222',
        js: '#4DB6AC',
        design: '#7B1FA2',
        backend: '#6D4C41'
    },
    // Theme 2: Night Mode (Dark & Pink Accent)
    {
        name: 'Night Mode',
        primary: '#E91E63',
        secondary: '#FBC02D',
        background: '#121212',
        card: '#1e1e1e',
        text: '#e0e0e0',
        header: '#ffffff',
        htmlCss: '#9E9E9E',
        js: '#FFEB3B',
        design: '#FF9800',
        backend: '#8BC34A'
    }
];


const getLightenedColor = (hex, factor = 10) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    
    const newR = Math.min(255, r + factor * 2);
    const newG = Math.min(255, g + factor * 2);
    const newB = Math.min(255, b + factor * 2);

    return `#${(1 << 24 | newR << 16 | newG << 8 | newB).toString(16).slice(1)}`;
};


const App = () => {
    
    const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
    const [activeSection, setActiveSection] = useState('about'); 
    const [typingDisplayText, setTypingDisplayText] = useState('');
    const [formMessage, setFormMessage] = useState('');

    const textToType = 'Frontend Developer';
    const currentTheme = themes[currentThemeIndex];

    
    const rootStyles = {
        '--primary-color': currentTheme.primary,
        '--secondary-color': currentTheme.secondary,
        '--background-color': currentTheme.background,
        '--card-background': currentTheme.card,
        '--text-color': currentTheme.text,
        '--header-color': currentTheme.header,
        '--html-css-color': currentTheme.htmlCss,
        '--javascript-color': currentTheme.js,
        '--design-color': currentTheme.design,
        '--backend-color': currentTheme.backend,
        
        
        '--primary-gradient': `linear-gradient(135deg, ${currentTheme.primary} 0%, ${getLightenedColor(currentTheme.primary)} 100%)`,
        '--secondary-gradient': `linear-gradient(135deg, ${currentTheme.secondary} 0%, ${getLightenedColor(currentTheme.secondary)} 100%)`,
    };

    
    useEffect(() => {
        let i = 0;
        let timeout;
        
        const startTyping = () => {
            function type() {
                if (i < textToType.length) {
                    setTypingDisplayText(prev => prev + textToType.charAt(i));
                    i++;
                    timeout = setTimeout(type, 70); // Typing speed: 70ms
                }
            }
            type();
        };

        const initialDelay = setTimeout(startTyping, 1500);

        return () => {
            clearTimeout(timeout);
            clearTimeout(initialDelay);
        };
    }, []);

    
    useEffect(() => {
        const sections = document.querySelectorAll('.section');
        const navbar = document.querySelector('.navbar');
        
        const handleScroll = () => {
            if (!navbar || sections.length === 0) return;

            const navBarHeight = navbar.offsetHeight;
            let current = 'about'; // Default to 'about'

            sections.forEach(section => {
                const sectionTop = section.offsetTop - navBarHeight;
                
                if (window.scrollY >= sectionTop - 10) { 
                    current = section.getAttribute('id');
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); 

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    
    const handleThemeSwitch = () => {
        setCurrentThemeIndex(prevIndex => (prevIndex + 1) % themes.length);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        const form = e.target;
        const data = new FormData(form);
        
        
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json' 
                }
            });

            if (response.ok) {
                setFormMessage('Message successfully sent! You should receive a confirmation email shortly.'); 
                form.reset();
            } else {
                setFormMessage('Failed to send message. Please check the form and try again.');
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setFormMessage('An error occurred. Please try again later.');
        }

        setTimeout(() => setFormMessage(''), 7000); 
    };
    
    // Typewriter Styling Logic
    const isTypingFinished = typingDisplayText.length === textToType.length;
    const typingStyle = {
        width: isTypingFinished ? 'auto' : `${textToType.length * 1.05}em`, 
        animation: isTypingFinished ? 'none' : 'blink-cursor 0.75s step-end infinite',
        borderRight: isTypingFinished ? 'none' : `3px solid ${currentTheme.secondary}`
    };


    return (
        <div className="resume-container" style={rootStyles}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
            
            
            <header className="navbar">
                <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About Me</a>
                <a href="#education" className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}>Education</a>
                <a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a>
                <a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a>
                <a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}>Services</a>
                <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact Me</a>
                
                
                <button 
                    id="theme-switcher" 
                    className="btn primary-btn btn-transparent" 
                    title={`Currently active: ${currentTheme.name}. Click to switch.`}
                    onClick={handleThemeSwitch}
                >
                    <i className="fas fa-magic"></i> {currentTheme.name} Theme Active
                </button>
            </header>

            
            <section id="about" className="section about-me">
                <div className="container about-content">
                    
                    <div className="profile-area">
                        <img src="/src/profile_photo.jpeg" 
                            alt="Your Professional Photo" 
                            className="profile-picture"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/250x250/4CAF50/ffffff?text=Profile";
                            }}
                        />
                    </div>

                    <div className="bio-area">
                        <h1>Hello, I'm  <p></p> Hardik Degama  </h1>
                        
                        <div className="typing-target-container">
                            <h2 
                                id="typing-text" 
                                className="typing-target"
                                style={typingStyle}
                            >
                                {typingDisplayText}
                            </h2>
                        </div>
                        
                        <p>
                          I have completed my BCA and am currently pursuing an MCA.
                           I have a solid understanding of HTML, CSS, JavaScript, and React.js, along with basic knowledge of Node.js, Express.js, and MongoDB.
                           My goal is to become a skilled MERN stack developer and contribute to building efficient and user-friendly web applications. </p>
                       
                    </div>
                </div>
            </section>

            
            <section id="education" className="section education">
                <div className="container">
                    <h2>My Educational Journey</h2>
                    <div className="timeline">
                        
                        
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>Master of Computer Applications (MCA)</h3>
                                <p className="timeline-institution">[Dr.Subash University (DSU), Junagadh] | **Pursuing** (Expected Graduation: 2027)</p>
                                <p className="timeline-details">Focusing on Advanced Web Technologies, Cloud Computing, and Data Structures.</p>
                            </div>
                        </div>

                        
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>Bachelor of Computer Applications (BCA)</h3>
                                <p className="timeline-institution">[Dr.Subash University (DSU), Junagadh] | [2022] - [2025]</p>
                                <p className="timeline-details">Graduated with  [7.96 GPA]. Core subjects included Data Analysis, C++, and Web Development Basics.</p>
                            </div>
                        </div>

                        
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>Higher Secondary Certificate (HSC) </h3>
                                <p className="timeline-institution">[Shree Premanand Vidhya Mandir, Junagadh] | [2022]</p>
                                <p className="timeline-details">Majored in [Commerce]. Achieved [79.14]% score.</p>
                            </div>
                        </div>

                        
                        <div className="timeline-item">
                            <div className="timeline-content">
                                <h3>Secondary School Certificate (SSC) </h3>
                                <p className="timeline-institution">[Kishor Academy School , Junagadh] | [2020]</p>
                                <p className="timeline-details">Completed foundational schooling. Focused on core subjects and basic computer knowledge. Achieved [59]% score.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            
            
            <section id="skills" className="section skills">
                <div className="container">
                    <h2> My  Technical Skills </h2>
                    <div className="skill-grid">
                        
                        <div className="skill-card html-css">
                            <i className="fab fa-html5"></i>
                            <h3>HTML & CSS</h3>
                            <p>Expert in semantic HTML5, modern CSS (Grid/Flexbox), and preprocessors like SASS.</p>
                        </div>
                        
                        <div className="skill-card javascript">
                            <i className="fab fa-js-square"></i>
                            <h3>JavaScript (ES6+)</h3>
                            <p>Advanced proficiency in vanilla JS, asynchronous programming, and DOM manipulation.</p>
                        </div>
                        
                        <div className="skill-card react-js">
                            <i className="fab fa-react"></i>
                            <h3>React JS</h3>
                            <p>Deep expertise in React ecosystem: Hooks, Context, Redux, and modern UI libraries.</p>
                        </div>
                        
                        <div className="skill-card node-express">
                            <i className="fab fa-node-js"></i>
                            <h3>Node/Express JS</h3>
                            <p>Building robust, scalable REST APIs with Node.js, Express, and middleware management.</p>
                        </div>

                        <div className="skill-card mongodb">
                            <i className="fas fa-database"></i>
                            <h3>MongoDB</h3>
                            <p>NoSQL database modeling, aggregation framework, and Mongoose ORM for efficient data handling.</p>
                        </div>

                        <div className="skill-card design">
                            <i className="fas fa-tools"></i>
                            <h3>Tools & Version Control</h3>
                            <p>Git/GitHub, Webpack/Vite, REST/GraphQL, Figma/Sketch for seamless development.</p>
                        </div>
                    </div>

                    
                    <h2 style={{ marginTop: '80px' }}> My Behavioral Skills </h2>
                    <div className="skill-grid behavioral-skills-grid">
                        
                        <div className="skill-card behavioral-skill">
                            <i className="fas fa-comments"></i>
                            <h3>Good Communication</h3>
                            <p>Ability to articulate complex technical concepts clearly to both technical and non-technical stakeholders.</p>
                        </div>
                        
                        <div className="skill-card behavioral-skill">
                            <i className="fas fa-users-line"></i>
                            <h3>Teamwork</h3>
                            <p>Proven ability to collaborate effectively in Agile/Scrum environments and actively support team goals.</p>
                        </div>
                        
                        <div className="skill-card behavioral-skill">
                            <i className="fas fa-brain"></i>
                            <h3>Fast Learner</h3>
                            <p>Quick to absorb new frameworks, libraries, and coding standards, enabling rapid project transitions.</p>
                        </div>
                        
                        <div className="skill-card behavioral-skill">
                            <i className="fas fa-clock"></i>
                            <h3>Time Management</h3>
                            <p>Excellent organizational skills, ensuring tasks are prioritized, deadlines are met, and scope creep is managed efficiently.</p>
                        </div>

                        <div className="skill-card behavioral-skill">
                            <i className="fas fa-lightbulb"></i>
                            <h3>Problem Solving</h3>
                            <p>Creative and analytical approach to diagnosing complex bugs, optimizing code, and developing robust solutions.</p>
                        </div>
                        
                        <div className="skill-card behavioral-skill">
                            <i className="fas fa-book-open"></i>
                            <h3>Ready to Learn New Things</h3>
                            <p>Genuine curiosity and enthusiasm for exploring emerging technologies and continuous professional development.</p>
                        </div>
                    </div>
                </div>
            </section>

            
            <section id="projects" className="section projects">
                <div className="container">
                    <h2> My Projects</h2>

                    
                    <div className="project-item project-left-photo">
                        <div className="project-image">
                            <img src="/src/Project_1.webp" 
                                alt="Project 1" 
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/4CAF50/ffffff?text=Project+1"; }}
                            />
                        </div>
                        <div className="project-details">
                            <h3>Online Bus Ticket Booking</h3>
                            <p> Front development in this project
                                This project allows users to book bus tickets online. It shows details
                                 like bus routes, seat availability, and fares. Users can enter their
                                 name, choose the date, and select a seat to book. Admin can log in to
                                add new routes and manage bookings. The project is built using PHP,
                                 MySQL, and HTML/CSS.</p> 
                            
                            
                            <p className="project-tech">Tech Stack: HTML,CSS,JAVASCRIPT,PHP,MYSQL</p>
                           
                        </div>
                    </div>

                    
                    <div className="project-item project-right-photo">
                        <div className="project-details">
                            <h3>Online Resume Builder </h3>
                            <p>This project is an online resume builder application developed using React.js for the frontend. 
                              It allows users to add and manage their personal information, education, work experience, and skills through a clean and user-friendly interface. 
                              React's component-based architecture was used to build reusable form sections, and React Hooks managed the application's state efficiently. 
                              Real-time preview functionality was implemented so users could see their resume being built live. 
                              Form validation was added to ensure data accuracy before submission. 
                              The frontend communicates with a backend API to save and retrieve data from a MongoDB database, allowing users to edit their resume later.
                               The design is responsive and mobile-friendly, ensuring accessibility on various devices. Styling was handled using  CSS .
                               Additionally, a PDF generation feature was integrated using jsPDF or html2pdf.js, allowing users to download their resume instantly.</p>
                            <p className="project-tech">Tech Stack: HTML,CSS,JAVASCRIPT,REACT JS, NODE JS, EXPRESS JS,MONGO DB</p>
                            
                        </div>
                        <div className="project-image">
                            <img src="/Project_2.avif" 
                                alt="Project 2" 
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/2196F3/ffffff?text=Project+2"; }}
                            />
                        </div>
                    </div>
                </div>
            </section>
            
          
            <section id="services" className="section services">
                <div className="container">
                    <h2> Services</h2>
                    <div className="service-list">
                        
                        <div className="service-card">
                            <i className="fas fa-globe"></i>
                            <h3>Website Creation</h3>
                            <p>End-to-end development of custom, scalable, and secure single-page applications or marketing websites.</p>
                        </div>
                        
                        <div className="service-card">
                            <i className="fas fa-mobile-alt"></i>
                            <h3>Responsive Development</h3>
                            <p>Building high-performance, mobile-first websites that look and work perfectly on all devices and screen sizes.</p>
                        </div>
                        
                        <div className="service-card">
                            <i className="fas fa-paint-brush"></i>
                            <h3>UX/UI Design & Implementation</h3>
                            <p>Transforming complex ideas into intuitive, aesthetically pleasing, and user-friendly interfaces.</p>
                        </div>

                        
                    </div>
                </div>
            </section>
            
            
            <section id="contact" className="section contact-me">
                <div className="container">
                    <h2> Contact Me</h2>
                    <p>I'm currently available for full-time roles and compelling freelance projects. Let's connect and discuss your next great idea!</p>
                    
                   
                    <form 
                        id="contactForm" 
                        onSubmit={handleFormSubmit}
                        method="POST"
                        action="YOUR_FORMSPREE_ENDPOINT_URL"
                    >
                        
                        <input type="text" name="name" placeholder="Your Name" required />
                        <input type="email" name="_replyto" placeholder="Your Email" required /> 
                        <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
                        
                        <button 
                            type="submit" 
                            className="btn secondary-btn btn-transparent" 
                        >
                            Send Message
                        </button>
                        
                        <p 
                            id="form-message" 
                            style={{ 
                                color: formMessage.includes('Failed') ? 'red' : currentTheme.primary, 
                                marginTop: '15px' 
                            }}
                        >
                            {formMessage}
                        </p>
                    </form>

                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/hardik-degama-b0040225a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank"><i className="fab fa-linkedin"></i></a>
                        <a href="https://github.com/hardikdegama" target="_blank"><i className="fab fa-github"></i></a>
                        <a href="mailto:hardikdegama972@gmail.com" title="Send me an Email">
        <i className="fas fa-envelope"></i>
    </a>
                      
                      </div>
                </div>
            </section>
           
            <footer>
    <div className="footer-content">
        <p>&copy; 2025 **HARDIK DEGAMA**. Crafted with modern HTML, CSS, & React JS.</p>
        <div className="footer-contact">
          
            <a href="mailto:hardikdegama972@gmail.com" title="Email Hardik">
                <i className="fas fa-envelope"></i> hardikdegama972@gmail.com
            </a>
            
            
            <span className="separator">|</span>
            <a href="tel:[96649-53221]" title="Call Hardik">
                <i className="fas fa-phone"></i> [96649-53221]
            </a>
            
        </div>
    </div>
</footer>
        </div>

    );
}

export default App;