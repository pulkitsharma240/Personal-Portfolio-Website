    // Mobile menu functionality
        document.addEventListener('DOMContentLoaded', function() {
            const menuBtn = document.getElementById('menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (menuBtn && mobileMenu) {
                menuBtn.addEventListener('click', function() {
                    mobileMenu.classList.toggle('active');
                });
            }
            
            // Close mobile menu when a nav link is clicked
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                    }
                });
            });
            
            // Resume download functionality
            const resumeLinks = document.querySelectorAll('#download-resume, #download-resume-card');
            resumeLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const Link = document.createElement('a');
                    Link.href = 'assets/resume/Pulkit_Resume.pdf';
                    Link.download = 'Pulkit_Sharma_Resume.pdf';
                    Link.click();
                });
            });
            // Initialize the Three.js background
            initThreeJsBackground();
            
            // Initialize particles.js
            initParticles();
            
            // Animate skill bars on scroll
            animateSkillBars();
            // Form submission using mailto
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function (e) {
                e.preventDefault(); // Stop default submission

                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();

                // Validate fields
                if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
                }

                const mailtoLink = `mailto:pulkitsharma2823@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;

                window.location.href = mailtoLink;
                });
            }
        });
        
        // Three.js background animation
        function initThreeJsBackground() {
            const canvas = document.getElementById('bg-canvas');
            const renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: true,
                alpha: true
            });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 30;
            
            // Create stars
            const starGeometry = new THREE.BufferGeometry();
            const starMaterial = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 0.1
            });
            
            const starVertices = [];
            for (let i = 0; i < 10000; i++) {
                const x = (Math.random() - 0.5) * 2000;
                const y = (Math.random() - 0.5) * 2000;
                const z = -Math.random() * 2000;
                starVertices.push(x, y, z);
            }
            
            starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
            const stars = new THREE.Points(starGeometry, starMaterial);
            scene.add(stars);
            
            // Add light
            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);
            
            // Mouse movement effect
            let mouseX = 0;
            let mouseY = 0;
            let targetX = 0;
            let targetY = 0;
            
            const windowHalfX = window.innerWidth / 2;
            const windowHalfY = window.innerHeight / 2;
            
            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX - windowHalfX);
                mouseY = (event.clientY - windowHalfY);
            });
            
            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                
                targetX = mouseX * 0.001;
                targetY = mouseY * 0.001;
                
                stars.rotation.y += 0.0005;
                stars.rotation.x += 0.0002;
                
                // Smooth camera rotation based on mouse position
                camera.rotation.y += (targetX - camera.rotation.y) * 0.01;
                camera.rotation.x += (targetY - camera.rotation.x) * 0.01;
                
                renderer.render(scene, camera);
            }
            
            animate();
        }
        
        // Initialize particles.js
        function initParticles() {
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 80, density: { enable: true, value_area: 800 } },
                        color: { value: '#8b5cf6' },
                        shape: { type: 'circle' },
                        opacity: { value: 0.5, random: true },
                        size: { value: 3, random: true },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#8b5cf6',
                            opacity: 0.2,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 1,
                            direction: 'none',
                            random: true,
                            straight: false,
                            out_mode: 'out',
                            bounce: false
                        }
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: {
                            onhover: { enable: true, mode: 'grab' },
                            onclick: { enable: true, mode: 'push' },
                            resize: true
                        },
                        modes: {
                            grab: { distance: 140, line_linked: { opacity: 0.5 } },
                            push: { particles_nb: 4 }
                        }
                    },
                    retina_detect: true
                });
            }
        }
        
        // Animate skill bars on scroll
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            function checkScroll() {
                skillBars.forEach(bar => {
                    const elementTop = bar.getBoundingClientRect().top;
                    const parentPercentage = bar.parentElement.previousElementSibling.querySelector('span').textContent;
                    const percentage = parseFloat(parentPercentage);
                    
                    if (elementTop < window.innerHeight) {
                        bar.style.width = percentage + '%';
                    }
                });
            }
            
            // Initial check
            checkScroll();
            
            // Check on scroll
            window.addEventListener('scroll', checkScroll);
        }
        