// Portfolio JavaScript - Dynamic Content Loading and Interactions

class Portfolio {
    constructor() {
        this.data = null;
        this.particles = [];
        this.init();
    }

    async init() {
        this.showLoadingScreen();
        await this.loadData();
        this.setupEventListeners();
        this.populateContent();
        this.setupAnimations();
        this.createParticles();
        this.createGlowingOrbs();
        this.setupScrollProgress();
        this.hideLoadingScreen();
    }

    // Load data from JSON file
    async loadData() {
        try {
            const response = await fetch('data.json');
            this.data = await response.json();
        } catch (error) {
            console.error('Error loading data:', error);
            // Fallback data if JSON fails to load
            this.data = {
                personal: {
                    name: "Your Name",
                    title: "Full Stack Developer",
                    description: "I create beautiful and functional web applications.",
                    email: "your.email@example.com",
                    phone: "+1 (555) 123-4567",
                    location: "Your City, Country"
                },
                skills: [],
                projects: [],
                socialLinks: []
            };
        }
    }

    // Show loading screen
    showLoadingScreen() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner"></div>
        `;
        document.body.appendChild(loadingOverlay);
    }

    // Hide loading screen
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingOverlay = document.querySelector('.loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => loadingOverlay.remove(), 500);
            }
        }, 1500);
    }

    // Create particle background
    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const duration = Math.random() * 3 + 3;
            const delay = Math.random() * 2;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
            this.particles.push(particle);
        }
    }

    // Create glowing orbs
    createGlowingOrbs() {
        const orbPositions = [
            { top: '10%', left: '5%', size: 200 },
            { top: '60%', right: '10%', size: 150 },
            { bottom: '20%', left: '15%', size: 180 },
            { top: '30%', right: '5%', size: 120 }
        ];

        orbPositions.forEach((pos, index) => {
            const orb = document.createElement('div');
            orb.className = 'glow-orb';
            orb.style.width = `${pos.size}px`;
            orb.style.height = `${pos.size}px`;
            orb.style.animationDelay = `${index * 0.5}s`;
            
            Object.keys(pos).forEach(key => {
                if (key !== 'size') {
                    orb.style[key] = pos[key];
                }
            });
            
            document.body.appendChild(orb);
        });
    }

    // Setup scroll progress indicator
    setupScrollProgress() {
        const scrollProgress = document.createElement('div');
        scrollProgress.className = 'scroll-progress';
        document.body.appendChild(scrollProgress);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = `${scrolled}%`;
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // Enhanced Mobile navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculate offset for fixed navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Contact form will be handled in setupContactForm()

        // Scroll event for navbar background and parallax
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Mouse move for parallax effect
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));

        // Enhanced resize event for responsive adjustments
        window.addEventListener('resize', utils.debounce(this.handleResize.bind(this), 250));
        
        // Touch events for mobile interactions
        this.setupTouchEvents();

        // Intersection Observer for animations
        this.setupIntersectionObserver();

        // Add geometric shapes to sections
        this.addGeometricShapes();
    }

    // Populate content from JSON data
    populateContent() {
        if (!this.data) return;

        // Personal information
        this.updateElement('name', this.data.personal.name);
        this.updateElement('title', this.data.personal.title);
        this.updateElement('description', this.data.personal.description);
        this.updateElement('email', this.data.personal.email);
        this.updateElement('phone', this.data.personal.phone);
        this.updateElement('location', this.data.personal.location);
        this.updateElement('about-description', this.data.personal.about);

        // Update page title
        document.title = `${this.data.personal.name} - Portfolio`;

        // Populate skills
        this.populateSkills();

        // Populate projects
        this.populateProjects();

        // Populate social links
        this.populateSocialLinks();
        
        // Populate certifications
        this.populateCertifications();
        
        // Setup contact form
        this.setupContactForm();
    }
    
    // Setup contact form to send emails directly
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;
        
        // Initialize email service
        this.emailService = new EmailService();
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            const formData = {
                name: document.getElementById('form-name').value.trim(),
                email: document.getElementById('form-email').value.trim(),
                message: document.getElementById('form-message').value.trim()
            };
            
            // Debug logging
            console.log('Form data:', formData);
            
            // Basic validation with specific field checking
            if (!formData.name) {
                this.showNotification('Please enter your name.', 'error');
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                return;
            }
            
            if (!formData.email) {
                this.showNotification('Please enter your email address.', 'error');
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                return;
            }
            
            if (!formData.message) {
                this.showNotification('Please enter your message.', 'error');
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                return;
            }

            if (!this.isValidEmail(formData.email)) {
                this.showNotification('Please enter a valid email address.', 'error');
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                return;
            }
            
            try {
                // Try to send email using EmailJS
                const result = await this.emailService.sendEmail(formData);
                
                if (result.success) {
                    this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    // Fallback to mailto if EmailJS fails
                    this.fallbackToMailto(formData);
                }
            } catch (error) {
                console.error('Email sending failed:', error);
                // Fallback to mailto
                this.fallbackToMailto(formData);
            }
            
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    }
    
    // Fallback to mailto if direct email fails
    fallbackToMailto(formData) {
        const subject = `Portfolio Contact from ${formData.name}`;
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
        const mailtoLink = `mailto:nikhilbhorkade1234@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show fallback message
        this.showNotification('Opening your email client to send the message.', 'info');
    }
    
    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00ffff' : '#ff7730'};
            color: #1a1a2e;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    // Populate certifications section
    populateCertifications() {
        const certificationsGrid = document.getElementById('certifications-grid');
        console.log('Certificates grid element:', certificationsGrid);
        console.log('Certificates data:', this.data.certifications);
        
        if (!certificationsGrid) {
            console.error('Certifications grid element not found');
            return;
        }
        
        if (!this.data.certifications) {
            console.error('No certifications data found');
            // Add a test certificate to see if rendering works
            certificationsGrid.innerHTML = `
                <div class="certificate-card">
                    <div class="certificate-header">
                        <i class="fas fa-certificate certificate-icon"></i>
                        <div class="certificate-info">
                            <h3>Test Certificate</h3>
                            <div class="certificate-issuer">Test Organization</div>
                        </div>
                    </div>
                    <p class="certificate-description">This is a test certificate to verify the section is working.</p>
                    <div class="certificate-skills">
                        <span class="skill-badge">Test</span>
                    </div>
                </div>
            `;
            return;
        }

        certificationsGrid.innerHTML = '';
        
        console.log('Creating certificates, count:', this.data.certifications.length);
        
        this.data.certifications.forEach((cert, index) => {
            console.log('Creating certificate card for:', cert.title);
            
            const certCard = document.createElement('div');
            certCard.className = 'certificate-card fade-in-up';
            certCard.style.animationDelay = `${index * 0.1}s`;
            certCard.innerHTML = `
                <div class="certificate-header">
                    <i class="${cert.icon} certificate-icon"></i>
                    <div class="certificate-info">
                        <h3>${cert.title}</h3>
                        <div class="certificate-issuer">${cert.issuer}</div>
                    </div>
                </div>
                <p class="certificate-description">${cert.description}</p>
                <div class="certificate-skills">
                    ${cert.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                </div>
                <div class="certificate-actions">
                    <button class="cert-btn cert-btn-primary" onclick="portfolio.viewCertificate('${cert.pdfUrl}', '${cert.title}')">
                        <i class="fas fa-eye"></i> View Certificate
                    </button>
                </div>
            `;
            
            certificationsGrid.appendChild(certCard);
            console.log('Certificate card added to grid');
        });
        
        console.log('Certificates population completed. Grid children count:', certificationsGrid.children.length);

        // Create PDF modal if it doesn't exist
        if (!document.getElementById('pdf-modal')) {
            this.createPDFModal();
        }
    }

    // Create PDF modal for viewing certificates
    createPDFModal() {
        const modal = document.createElement('div');
        modal.id = 'pdf-modal';
        modal.className = 'pdf-modal';
        modal.innerHTML = `
            <div class="pdf-modal-content">
                <div class="pdf-modal-header">
                    <h3 class="pdf-modal-title" id="pdf-modal-title">Certificate</h3>
                    <span class="pdf-close" onclick="portfolio.closePDFModal()">&times;</span>
                </div>
                <iframe class="pdf-viewer" id="pdf-viewer" src=""></iframe>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closePDFModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                this.closePDFModal();
            }
        });
    }

    // View certificate in modal
    viewCertificate(pdfUrl, title) {
        console.log('Attempting to view certificate:', title, 'at path:', pdfUrl);
        
        const modal = document.getElementById('pdf-modal');
        const viewer = document.getElementById('pdf-viewer');
        const modalTitle = document.getElementById('pdf-modal-title');
        
        if (!modal || !viewer || !modalTitle) {
            console.error('Modal elements not found');
            alert('Certificate viewer not available. Please refresh the page.');
            return;
        }
        
        modalTitle.textContent = title;
        
        // For local file access, we'll try direct loading first
        // If that fails, show a helpful message
        viewer.style.opacity = '0.5';
        modalTitle.innerHTML = `${title} <span style="font-size: 0.8em; color: #ff7730;">(Loading...)</span>`;
        
        // Try to load the PDF directly
        viewer.src = pdfUrl;
        
        // Set up error handling
        viewer.onerror = () => {
            console.error('Failed to load PDF:', pdfUrl);
            viewer.style.opacity = '1';
            modalTitle.textContent = title;
            viewer.srcdoc = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: Arial, sans-serif; background: #1a1a2e; color: #ffffff; padding: 2rem;">
                    <i class="fas fa-info-circle" style="font-size: 3rem; color: #00ffff; margin-bottom: 1rem;"></i>
                    <h3 style="color: #00ffff; margin-bottom: 1rem;">PDF Viewer Issue</h3>
                    <p style="text-align: center; max-width: 500px; line-height: 1.6; margin-bottom: 2rem;">
                        To view certificates, you need to run this portfolio on a local server. 
                        <br><br>
                        <strong>Quick Fix:</strong>
                        <br>1. Open Command Prompt in your portfolio folder
                        <br>2. Run: <code style="background: rgba(255,255,255,0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">python -m http.server 8000</code>
                        <br>3. Open: <code style="background: rgba(255,255,255,0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">http://localhost:8000</code>
                    </p>
                    <div style="display: flex; gap: 1rem;">
                        <a href="${pdfUrl}" target="_blank" style="
                            padding: 1rem 2rem; 
                            background: linear-gradient(135deg, #00ffff 0%, #ff7730 100%); 
                            color: #1a1a2e; 
                            border: none; 
                            border-radius: 10px; 
                            font-weight: 600; 
                            text-decoration: none;
                        ">Open PDF in New Tab</a>
                        <button onclick="parent.portfolio.closePDFModal()" style="
                            padding: 1rem 2rem; 
                            background: transparent; 
                            color: #00ffff; 
                            border: 2px solid #00ffff; 
                            border-radius: 10px; 
                            font-weight: 600; 
                            cursor: pointer;
                        ">Close</button>
                    </div>
                </div>
            `;
        };
        
        // Set up success handling
        viewer.onload = () => {
            console.log('PDF loaded successfully:', pdfUrl);
            viewer.style.opacity = '1';
            modalTitle.textContent = title;
        };
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close PDF modal
    closePDFModal() {
        const modal = document.getElementById('pdf-modal');
        const viewer = document.getElementById('pdf-viewer');
        
        modal.style.display = 'none';
        viewer.src = '';
        document.body.style.overflow = 'auto';
    }

    // Update element content safely
    updateElement(id, content) {
        const element = document.getElementById(id);
        if (element && content) {
            element.textContent = content;
        }
    }

    // Populate skills section
    populateSkills() {
        const skillsGrid = document.getElementById('skills-grid');
        if (!skillsGrid || !this.data.skills) return;

        skillsGrid.innerHTML = '';
        
        this.data.skills.forEach((skill, index) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card fade-in-up floating';
            skillCard.style.animationDelay = `${index * 0.1}s`;
            skillCard.innerHTML = `
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <h3>${skill.name}</h3>
                <p>${skill.description}</p>
            `;
            
            // Add hover sound effect (visual feedback)
            skillCard.addEventListener('mouseenter', () => {
                skillCard.style.transform = 'translateY(-15px) scale(1.02) rotateY(5deg)';
            });
            
            skillCard.addEventListener('mouseleave', () => {
                skillCard.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            });
            
            skillsGrid.appendChild(skillCard);
        });
    }

    // Populate projects section
    populateProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid || !this.data.projects) return;

        projectsGrid.innerHTML = '';
        
        this.data.projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in-up';
            projectCard.style.animationDelay = `${index * 0.15}s`;
            
            const techTags = project.technologies.map(tech => 
                `<span class="tech-tag">${tech}</span>`
            ).join('');

            projectCard.innerHTML = `
                <div class="project-image">
                    <i class="${project.image}"></i>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${techTags}
                    </div>
                    <div class="project-links">
                        <a href="${project.liveUrl}" class="project-link primary" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        <a href="${project.githubUrl}" class="project-link secondary" target="_blank">
                            <i class="fab fa-github"></i> Code
                        </a>
                    </div>
                </div>
            `;
            
            // Add 3D tilt effect
            projectCard.addEventListener('mousemove', (e) => {
                const rect = projectCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                projectCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
            });
            
            projectCard.addEventListener('mouseleave', () => {
                projectCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
            
            projectsGrid.appendChild(projectCard);
        });
    }

    // Populate social links
    populateSocialLinks() {
        const socialLinks = document.getElementById('social-links');
        if (!socialLinks || !this.data.socialLinks) return;

        socialLinks.innerHTML = '';
        
        this.data.socialLinks.forEach(link => {
            const socialLink = document.createElement('a');
            socialLink.href = link.url;
            socialLink.className = 'social-link';
            socialLink.target = '_blank';
            socialLink.rel = 'noopener noreferrer';
            socialLink.innerHTML = `<i class="${link.icon}"></i>`;
            socialLink.title = link.platform;
            socialLinks.appendChild(socialLink);
        });
    }


    // Email validation
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '5px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Handle scroll events
    handleScroll() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.scrollY;
        
        // Navbar background change
        if (scrolled > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        // Parallax effect for particles
        this.particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.5;
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Parallax effect for glowing orbs
        const orbs = document.querySelectorAll('.glow-orb');
        orbs.forEach((orb, index) => {
            const speed = (index % 2 + 1) * 0.3;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
    
    // Handle mouse move for parallax
    handleMouseMove(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move particles based on mouse position
        this.particles.forEach((particle, index) => {
            const speed = (index % 5 + 1) * 2;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            particle.style.transform += ` translate(${x}px, ${y}px)`;
        });
        
        // Parallax effect for hero elements
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const x = (mouseX - 0.5) * 20;
            const y = (mouseY - 0.5) * 20;
            heroImage.style.transform = `translate(${x}px, ${y}px)`;
        }
    }
    
    // Enhanced window resize handler
    handleResize() {
        // Reposition particles on resize
        this.particles.forEach(particle => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
        });
        
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Adjust hero content layout on orientation change
        this.adjustForOrientation();
    }
    
    // Adjust layout for orientation changes
    adjustForOrientation() {
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth <= 768) {
            if (window.innerHeight < window.innerWidth) {
                // Landscape mode
                hero.style.minHeight = '100vh';
            } else {
                // Portrait mode
                hero.style.minHeight = '100vh';
            }
        }
    }
    
    // Setup touch events for mobile
    setupTouchEvents() {
        // Add touch feedback to interactive elements
        const interactiveElements = document.querySelectorAll('.btn, .skill-card, .project-card, .contact-item, .social-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            }, { passive: true });
        });
        
        // Prevent zoom on double tap for form inputs
        const formInputs = document.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('touchend', (e) => {
                e.preventDefault();
                input.focus();
            });
        });
    }

    // Add geometric shapes to sections
    addGeometricShapes() {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index === 0) return; // Skip hero section
            
            const shapes = [
                { class: 'geometric-shape shape-1', delay: 0 },
                { class: 'geometric-shape shape-2', delay: 2 },
                { class: 'geometric-shape shape-3', delay: 4 }
            ];
            
            shapes.forEach(shape => {
                const shapeEl = document.createElement('div');
                shapeEl.className = shape.class;
                shapeEl.style.animationDelay = `${shape.delay}s`;
                section.appendChild(shapeEl);
            });
        });
    }

    // Setup intersection observer for animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add stagger effect for multiple elements
                    if (entry.target.classList.contains('skill-card') || 
                        entry.target.classList.contains('project-card')) {
                        const siblings = Array.from(entry.target.parentNode.children);
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animationClasses = ['.fade-in-up', '.slide-in-left', '.slide-in-right', '.scale-in', '.bounce-in'];
        animationClasses.forEach(className => {
            document.querySelectorAll(className).forEach(el => {
                el.style.opacity = '0';
                if (className === '.fade-in-up') {
                    el.style.transform = 'translateY(30px)';
                } else if (className === '.slide-in-left') {
                    el.style.transform = 'translateX(-50px)';
                } else if (className === '.slide-in-right') {
                    el.style.transform = 'translateX(50px)';
                } else if (className === '.scale-in') {
                    el.style.transform = 'scale(0.8)';
                }
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(el);
            });
        });
    }

    // Setup animations
    setupAnimations() {
        // Typing animation for hero title
        this.setupTypingAnimation();
        
        // Add robotics experience section
        this.addRoboticsExperience();
        
        // Add glow text effect to section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            title.classList.add('glow-text');
        });
        
        // Add floating animation to profile pic
        const profilePic = document.querySelector('.profile-pic');
        if (profilePic) {
            profilePic.classList.add('floating');
        }
        
        // Add morphing background to hero
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.add('morphing-bg');
        }
        
        // Add interactive hover effects to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.05)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Setup typing animation
    setupTypingAnimation() {
        const titleElement = document.querySelector('.hero-title');
        if (!titleElement) return;

        const originalText = titleElement.innerHTML;
        titleElement.innerHTML = '';
        titleElement.classList.add('typewriter');
        
        let index = 0;
        const typeText = () => {
            if (index < originalText.length) {
                titleElement.innerHTML += originalText.charAt(index);
                index++;
                setTimeout(typeText, 80);
            } else {
                // Remove typewriter cursor after typing is complete
                setTimeout(() => {
                    titleElement.classList.remove('typewriter');
                }, 1000);
            }
        };

        // Start typing animation after loading
        setTimeout(typeText, 2000);
    }
    
    // Add robotics experience section
    addRoboticsExperience() {
        const aboutSection = document.getElementById('about');
        const experienceHTML = `
            <div class="robotics-experience" style="margin-top: 3rem;">
                <h3 style="text-align: center; margin-bottom: 2rem; color: #00ffff; text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);">Robotics Experience</h3>
                <div class="experience-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                    <div class="experience-card glass bounce-in" style="padding: 2rem; border-radius: 20px; background: rgba(26, 26, 46, 0.9); border: 1px solid rgba(0, 255, 255, 0.3); transition: all 0.3s ease;">
                        <div style="text-align: center; margin-bottom: 1rem;">
                            <i class="fas fa-robot" style="font-size: 3rem; color: #00ffff; text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);"></i>
                        </div>
                        <h4 style="color: #00ffff; margin-bottom: 1rem; text-align: center;">Autonomous Systems</h4>
                        <p style="color: #cccccc; text-align: center;">Specialized in developing intelligent robots with autonomous navigation, obstacle avoidance, and real-time decision making capabilities.</p>
                    </div>
                    <div class="experience-card glass bounce-in" style="padding: 2rem; border-radius: 20px; background: rgba(26, 26, 46, 0.9); border: 1px solid rgba(255, 119, 48, 0.3); transition: all 0.3s ease; animation-delay: 0.2s;">
                        <div style="text-align: center; margin-bottom: 1rem;">
                            <i class="fas fa-microchip" style="font-size: 3rem; color: #ff7730; text-shadow: 0 0 10px rgba(255, 119, 48, 0.5);"></i>
                        </div>
                        <h4 style="color: #ff7730; margin-bottom: 1rem; text-align: center;">Embedded Systems</h4>
                        <p style="color: #cccccc; text-align: center;">Expert in integrating sensors, actuators, and control systems for seamless hardware-software interaction in robotic applications.</p>
                    </div>
                </div>
            </div>
        `;
        
        aboutSection.querySelector('.container').insertAdjacentHTML('beforeend', experienceHTML);
    }
    
}

// Utility functions
const utils = {
    // Smooth scroll to element
    scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Initialize portfolio when DOM is loaded
let portfolio;
document.addEventListener('DOMContentLoaded', () => {
    portfolio = new Portfolio();
});

// Simple cursor - no special effects needed

// Add robotics-themed matrix rain effect
class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        document.body.appendChild(this.canvas);
        
        this.chars = '01ROBOTICSAUTOMATION';
        this.drops = [];
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        const columns = Math.floor(this.canvas.width / 20);
        this.drops = Array(columns).fill(1);
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = '15px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.ctx.fillText(text, i * 20, this.drops[i] * 20);
            
            if (this.drops[i] * 20 > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize matrix rain effect
if (window.innerWidth > 768) {
    new MatrixRain();
}

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page is visible, resume animations if needed
        document.querySelectorAll('.paused').forEach(el => {
            el.classList.remove('paused');
        });
    }
});

// Enhanced reveal animations with robotics effects
const revealElements = () => {
    const elements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .bounce-in');
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) translateX(0) scale(1)';
            
            // Add glow effect on reveal
            if (el.classList.contains('skill-card') || el.classList.contains('project-card')) {
                el.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
                setTimeout(() => {
                    el.style.boxShadow = '';
                }, 1000);
            }
        }
    });
};

window.addEventListener('scroll', revealElements);

// Add performance optimizations
const optimizePerformance = () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Throttle scroll events
    let ticking = false;
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                revealElements();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', handleScroll);
};

// Initialize performance optimizations
optimizePerformance();

// Add robotics sound effects (visual feedback)
class RoboticsEffects {
    static addHoverEffects() {
        // Add circuit-like hover effects to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.1)';
                btn.style.borderColor = 'rgba(0, 255, 255, 0.8)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.boxShadow = '';
                btn.style.borderColor = '';
            });
        });
        
        // Add glitch effect to title
        const title = document.querySelector('.hero-title');
        if (title) {
            setInterval(() => {
                if (Math.random() > 0.95) {
                    title.style.textShadow = '2px 0 #00ffff, -2px 0 #ff7730';
                    setTimeout(() => {
                        title.style.textShadow = '';
                    }, 100);
                }
            }, 3000);
        }
    }
}

// Initialize robotics effects
RoboticsEffects.addHoverEffects();

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Portfolio, utils, CursorTrail, MatrixRain, RoboticsEffects };
}
