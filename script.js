// PROJECT CONFIGURATION - EDIT THIS SECTION TO ADD/MODIFY PROJECTS
const projectsConfig = {
    categories: [
        {
            id: 'android',
            title: 'Android Development',
            icon: 'fab fa-android',
            projects: [
                {
                    title: 'HireInn - Job Search App',
                    icon: 'fas fa-magnifying-glass',
                    description: "A Job search app integrated with AI agent. Agent will modify the user's resume based on the Job description and answer any job related queries.",
                    technologies: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Google Cloud', 'Python', 'FastAPI'],
                    links: {
                        github: 'https://github.com/yourusername/ecoshop',
                        demo: 'https://your-demo-link.com'
                    }
                }
            ]
        },
        {
            id: 'ml',
            title: 'Machine Learning',
            icon: 'fas fa-brain',
            projects: [
                {
                    title: 'SmartVision - Object Detection System',
                    icon: 'fas fa-eye',
                    description: 'Real-time object detection and classification system using YOLO v8, optimized for edge devices with 95% accuracy on custom datasets.',
                    technologies: ['Python', 'PyTorch', 'OpenCV', 'YOLO v8'],
                    links: {
                        github: 'https://github.com/yourusername/smartvision',
                        demo: 'https://your-demo-link.com'
                    }
                },
                {
                    title: 'SentimentAI - Emotion Analysis',
                    icon: 'fas fa-comments',
                    description: 'Advanced sentiment analysis model for social media monitoring, achieving 92% accuracy using transformer architecture and BERT.',
                    technologies: ['Python', 'Transformers', 'BERT', 'Pandas'],
                    links: {
                        github: 'https://github.com/yourusername/sentimentai',
                        demo: 'https://your-demo-link.com'
                    }
                },
                {
                    title: 'PredictiveAnalytics - Sales Forecasting',
                    icon: 'fas fa-chart-line',
                    description: 'Machine learning pipeline for sales prediction using ensemble methods, time series analysis, and feature engineering for retail businesses.',
                    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Jupyter'],
                    links: {
                        github: 'https://github.com/yourusername/predictiveanalytics',
                        demo: 'https://your-demo-link.com'
                    }
                }
            ]
        }
    ]
};

// Function to render projects dynamically
function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = '';

    projectsConfig.categories.forEach(category => {
        // Create category section
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'project-category';
        categoryDiv.innerHTML = `
            <h3 class="category-title">
                <i class="${category.icon}"></i>
                ${category.title}
            </h3>
            <div class="projects-grid" id="projects-grid-${category.id}">
            </div>
        `;
        
        projectsContainer.appendChild(categoryDiv);
        
        // Get the projects grid for this category
        const projectsGrid = document.getElementById(`projects-grid-${category.id}`);
        
        // Add projects to the grid
        category.projects.forEach((project, index) => {
            const projectCard = createProjectCard(project, index);
            projectsGrid.appendChild(projectCard);
        });
    });

    // Re-initialize animations for new elements
    initializeProjectAnimations();
}

// Function to create a project card element
function createProjectCard(project, index) {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.style.animationDelay = `${index * 0.1}s`;
    
    // Create technologies HTML
    const technologiesHTML = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Create links HTML
    const linksHTML = Object.entries(project.links || {}).map(([type, url]) => {
        const icons = {
            github: 'fab fa-github',
            demo: 'fas fa-external-link-alt',
            live: 'fas fa-globe',
            video: 'fas fa-play',
            article: 'fas fa-article'
        };
        
        const icon = icons[type] || 'fas fa-link';
        const label = type.charAt(0).toUpperCase() + type.slice(1);
        
        return `
            <a href="${url}" class="project-link" target="_blank" rel="noopener noreferrer">
                <i class="${icon}"></i>
                ${label}
            </a>
        `;
    }).join('');
    
    projectCard.innerHTML = `
        <div class="project-header">
            <i class="${project.icon}"></i>
            <h4>${project.title}</h4>
        </div>
        <p class="project-description">
            ${project.description}
        </p>
        <div class="project-tech">
            ${technologiesHTML}
        </div>
        <div class="project-links">
            ${linksHTML}
        </div>
    `;
    
    return projectCard;
}

// Function to add a new project programmatically
function addProject(categoryId, projectData) {
    const category = projectsConfig.categories.find(cat => cat.id === categoryId);
    if (category) {
        category.projects.push(projectData);
        renderProjects(); // Re-render to show the new project
    } else {
        console.error(`Category with id "${categoryId}" not found`);
    }
}

// Function to add a new category
function addCategory(categoryData) {
    projectsConfig.categories.push(categoryData);
    renderProjects(); // Re-render to show the new category
}

// Function to update a project
function updateProject(categoryId, projectIndex, updatedData) {
    const category = projectsConfig.categories.find(cat => cat.id === categoryId);
    if (category && category.projects[projectIndex]) {
        category.projects[projectIndex] = { ...category.projects[projectIndex], ...updatedData };
        renderProjects(); // Re-render to show the updates
    } else {
        console.error(`Project not found in category "${categoryId}" at index ${projectIndex}`);
    }
}

// Function to remove a project
function removeProject(categoryId, projectIndex) {
    const category = projectsConfig.categories.find(cat => cat.id === categoryId);
    if (category && category.projects[projectIndex]) {
        category.projects.splice(projectIndex, 1);
        renderProjects(); // Re-render to reflect the removal
    } else {
        console.error(`Project not found in category "${categoryId}" at index ${projectIndex}`);
    }
}

// Initialize project animations
function initializeProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Set initial animation state
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Mouse interactions
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    renderProjects(); // Render projects first
    initializeNavigation();
    initializeScrollAnimations();
    initializeTypingEffect();
    initializeParticleBackground();
    initializeIntersectionObserver();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    });
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to section function for buttons
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Typing effect for hero section
function initializeTypingEffect() {
    const phrases = [
        "An Android Developer",
        "An ML Engineer", 
        "A Problem Solver",
        "A Tech Enthusiast"
    ];
    
    const subtitleElement = document.querySelector('.hero-subtitle');
    if (!subtitleElement) return;
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentPhrase = '';
    
    function typeWriter() {
        const fullPhrase = `Who Am I? ${phrases[phraseIndex]} `;
        
        if (isDeleting) {
            currentPhrase = fullPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentPhrase = fullPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        subtitleElement.textContent = currentPhrase;
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === fullPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 12) { // Keep "A passionate "
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 300;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Scroll animations using Intersection Observer
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animations for child elements
                const children = entry.target.querySelectorAll('.skill-category, .project-card, .contact-item, .social-link');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .contact-item, .social-link');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Scroll animations for various elements
function initializeScrollAnimations() {
    // Parallax effect for floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        floatingCards.forEach((card, index) => {
            const speed = parallaxSpeed * (index + 1);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Skill bars animation (if you want to add progress bars later)
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.opacity = '1';
            }
        });
    });

    skillItems.forEach((item, index) => {
        item.style.transform = 'translateX(-20px)';
        item.style.opacity = '0';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        skillObserver.observe(item);
    });
}

// Particle background effect
function initializeParticleBackground() {
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    // Particle system
    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#60a5fa';
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particle1, i) => {
            particles.slice(i + 1).forEach(particle2 => {
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle1.x, particle1.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.strokeStyle = `rgba(96, 165, 250, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Project card interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Contact form handling (if you add a form later)
function handleContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add form submission logic here
        const formData = new FormData(this);
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 2000);
        }, 1000);
    });
}

// Theme toggle functionality (optional feature)
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle?.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        // Store theme preference
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Add any scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger entrance animations
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Initialize entrance animations
document.addEventListener('DOMContentLoaded', function() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
});

// Export functions for potential use in other scripts
window.portfolioFunctions = {
    scrollToSection,
    debounce,
    addProject,
    addCategory,
    updateProject,
    removeProject,
    renderProjects,
    projectsConfig
};