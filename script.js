// ============================================================
// MOBILE MENU TOGGLE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', !isOpen);

            if (!isOpen) {
                navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
            } else {
                navMenu.style.maxHeight = '0px';
            }
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navMenu.style.maxHeight = '0px';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && !e.target.closest('.mobile-menu-toggle')) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navMenu.style.maxHeight = '0px';
            }
        });
    }
});

// ============================================================
// SMOOTH SCROLL ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================================
// SCROLL ANIMATIONS - INTERSECTION OBSERVER
// ============================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s var(--transition) forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all team cards, driver cards, car cards, stat cards, and achievement items
document.querySelectorAll('.team-card, .driver-card, .car-card, .stat-card, .achievement-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================================
// SECTION TITLE ANIMATIONS
// ============================================================
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            titleObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.section-title').forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'opacity 0.8s var(--transition), transform 0.8s var(--transition)';
    titleObserver.observe(title);
});

// ============================================================
// DYNAMIC STATISTICS COUNTER
// ============================================================
let hasAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(el => {
        const target = parseInt(el.textContent) || 0;
        let current = 0;
        const increment = Math.ceil(target / 60);
        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;

        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(interval);
            } else {
                el.textContent = current.toLocaleString();
            }
        }, stepDuration);
    });
}

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================================================
// ACTIVE NAVIGATION INDICATOR
// ============================================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink();

// ============================================================
// PARALLAX EFFECT FOR HERO
// ============================================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const heroOverlay = document.querySelector('.hero-overlay');

    if (hero && window.scrollY < hero.offsetHeight) {
        const offset = window.scrollY * 0.5;
        hero.style.backgroundPosition = `0 ${offset}px`;

        if (heroOverlay) {
            heroOverlay.style.opacity = Math.max(1 - window.scrollY / hero.offsetHeight, 0);
        }
    }
});

// ============================================================
// CARD HOVER EFFECTS
// ============================================================
const cards = document.querySelectorAll('.team-card, .driver-card, .car-card, .stat-card, .achievement-item');

cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transition = 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ============================================================
// KEYBOARD NAVIGATION
// ============================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle && mobileMenuToggle.getAttribute('aria-expanded') === 'true') {
            mobileMenuToggle.click();
        }
    }

    // Skip to main content on Tab + Alt
    if (e.altKey && e.key === 'M') {
        const mainContent = document.querySelector('main') || document.querySelector('.section');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ============================================================
// PAGE LOAD ANIMATION
// ============================================================
window.addEventListener('load', () => {
    document.body.style.animation = 'none';
});

// ============================================================
// SCROLL TO TOP BUTTON
// ============================================================
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Scroll to top');
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
        color: #000;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        font-weight: 700;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
        } else {
            button.style.opacity = '0';
            button.style.pointerEvents = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('focus', () => {
        button.style.outline = '2px solid var(--primary)';
        button.style.outlineOffset = '2px';
    });

    button.addEventListener('blur', () => {
        button.style.outline = 'none';
    });
};

createScrollToTopButton();

// ============================================================
// PERFORMANCE: LAZY LOAD IMAGES
// ============================================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                if (image.dataset.src) {
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            }
        });
    }, { rootMargin: '50px' });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================================
// ACCESSIBILITY: TRAP FOCUS IN MODALS (IF NEEDED)
// ============================================================
function createAccessibleButton(selector) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => {
        if (!button.hasAttribute('aria-label') && !button.textContent.trim()) {
            button.setAttribute('aria-label', 'Action button');
        }
    });
}

createAccessibleButton('button');

// ============================================================
// SMOOTH REVEAL ANIMATION FOR SECTIONS
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('section-reveal');
    revealObserver.observe(section);
});

// ============================================================
// DRIVER BADGE DROPDOWN - TEAM SECTION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const driverBadges = document.querySelectorAll('.driver-badge');

    driverBadges.forEach(badge => {
        badge.addEventListener('click', (e) => {
            e.stopPropagation();

            const teamCard = badge.closest('.team-card');
            const dropdown = teamCard.querySelector('.driver-dropdown');

            // Close other dropdowns in different teams
            document.querySelectorAll('.team-card .driver-dropdown.active').forEach(activeDropdown => {
                if (activeDropdown !== dropdown) {
                    activeDropdown.classList.remove('active');
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');

            if (dropdown.classList.contains('active')) {
                // Get driver data from badge
                const driverName = badge.dataset.name;
                const driverImage = badge.dataset.image;
                const driverWins = badge.dataset.wins;
                const driverPoles = badge.dataset.poles;
                const driverChampionships = badge.dataset.championships;
                const aggr = badge.dataset.aggr || 80;
                const tyre = badge.dataset.tyre || 80;
                const wet = badge.dataset.wet || 80;

                // Get driver initials for fallback
                const initials = driverName.split(' ').map(n => n[0]).join('');

                // Check if we have a valid image
                const hasImage = driverImage && driverImage.trim() !== '';

                // Build dropdown content
                const imageHTML = hasImage
                    ? `<div class="dropdown-image-container">
                           <img src="${driverImage}" alt="${driverName}" class="dropdown-image" 
                           onerror="this.src='https://via.placeholder.com/300x180/000/00f2ff?text=${initials}';">
                           <div class="hologram-overlay"></div>
                       </div>`
                    : `<div class="dropdown-image-fallback">${initials}</div>`;

                const dropdownHTML = `
                    <div class="dropdown-content">
                        ${imageHTML}
                        <div class="dropdown-info">
                            <h4>${driverName}</h4>
                            <div class="dna-radar-container">
                                <div class="dna-stat">
                                    <div class="dna-label"><span>AGGR (AGGRESSION)</span><span>${aggr}%</span></div>
                                    <div class="dna-bar-bg"><div class="dna-bar-fill" style="width: 0%;" data-w="${aggr}"></div></div>
                                </div>
                                <div class="dna-stat">
                                    <div class="dna-label"><span>TYRE (MANAGEMENT)</span><span>${tyre}%</span></div>
                                    <div class="dna-bar-bg"><div class="dna-bar-fill" style="width: 0%;" data-w="${tyre}"></div></div>
                                </div>
                                <div class="dna-stat">
                                    <div class="dna-label"><span>WET (WEATHER SKILL)</span><span>${wet}%</span></div>
                                    <div class="dna-bar-bg"><div class="dna-bar-fill" style="width: 0%;" data-w="${wet}"></div></div>
                                </div>
                            </div>
                            <div class="dropdown-stats-grid">
                                <div class="mini-stat">
                                    <span class="mini-stat-label">WINS</span>
                                    <span class="mini-stat-value">${driverWins}</span>
                                </div>
                                <div class="mini-stat">
                                    <span class="mini-stat-label">POLES</span>
                                    <span class="mini-stat-value">${driverPoles}</span>
                                </div>
                                <div class="mini-stat">
                                    <span class="mini-stat-label">TITLES</span>
                                    <span class="mini-stat-value">${driverChampionships}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                dropdown.innerHTML = dropdownHTML;

                // Animate bars after a short delay
                setTimeout(() => {
                    dropdown.querySelectorAll('.dna-bar-fill').forEach(bar => {
                        bar.style.width = bar.dataset.w + '%';
                    });
                }, 100);
            } else {
                dropdown.innerHTML = '';
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.team-card')) {
            document.querySelectorAll('.driver-dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
                dropdown.innerHTML = '';
            });
        }
    });
});



// ============================================================
// CONSOLE EASTER EGG
// ============================================================
console.log(
    '%c🏁 FORMULA 1 RACING PORTAL 🏁',
    'font-size: 20px; font-weight: bold; color: #e8003d;'
);
console.log(
    '%c' +
    'Welcome to the F1 Racing Portal!\n' +
    'Explore the world of Formula 1 racing with information about teams, drivers, and legendary achievements.\n' +
    'Built with HTML5, CSS3, and Vanilla JavaScript.',
    'font-size: 12px; color: #b0b9c0;'
);

// ============================================================
// INITIALIZE COMPONENTS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Start Countdown
    initCountdown();
});

// ============================================================
// LIVE COUNTDOWN TIMER
// ============================================================
function initCountdown() {
    const countDownDate = new Date("Mar 15, 2026 05:00:00").getTime();
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("mins");
    const secsEl = document.getElementById("secs");

    if (!daysEl) return;

    function updateTimer() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            daysEl.parentElement.parentElement.innerHTML = "<h3 style='color: var(--primary)'>RACE LIVE!</h3>";
            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerHTML = d.toString().padStart(2, '0');
        hoursEl.innerHTML = h.toString().padStart(2, '0');
        minsEl.innerHTML = m.toString().padStart(2, '0');
        if (secsEl) secsEl.innerHTML = s.toString().padStart(2, '0');
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

// ============================================================
// FAN ID GENERATOR LOGIC
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const fanNameInput = document.getElementById('fanName');
    const displayFanName = document.getElementById('displayFanName');
    const displayFanTeam = document.getElementById('displayFanTeam');
    const paddockPass = document.getElementById('paddockPass');
    const passAvatar = document.getElementById('passAvatar');
    const passTeamLogo = document.getElementById('passTeamLogo').querySelector('img');
    const teamOptions = document.querySelectorAll('input[name="fanTeam"]');
    const generateBtn = document.getElementById('generatePassBtn');

    if (!fanNameInput) return;

    // Team Data Mapping
    const teamData = {
        'Ferrari': { color: '#e8003d', logo: 'https://logos-world.net/wp-content/uploads/2020/07/Ferrari-Scuderia-Logo-700x394.png', fullName: 'Scuderia Ferrari' },
        'Red Bull': { color: '#1e3050', logo: 'https://images.seeklogo.com/logo-png/62/2/oracle-red-bull-racing-logo-png_seeklogo-622849.png', fullName: 'Red Bull Racing' },
        'Mercedes': { color: '#00d4be', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg/1280px-Mercedes_AMG_Petronas_F1_Logo.svg.png', fullName: 'Mercedes-AMG F1' },
        'McLaren': { color: '#ff8700', logo: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRtn8E6_TwI_QsqH86VlhiOk8VDTDtJRvotL9CXryKU0PB47H5XjLZK1tI3ZgP_', fullName: 'McLaren Racing' },
        'Audi': { color: '#C3002F', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1200px-Audi-Logo_2016.svg.png', fullName: 'Audi F1 Team' },
        'Aston Martin': { color: '#006f62', logo: 'https://upload.wikimedia.org/wikipedia/de/thumb/b/bf/Logo_Aston_Martin_F1_Team.jpg/500px-Logo_Aston_Martin_F1_Team.jpg', fullName: 'Aston Martin F1' },
        'Cadillac': { color: '#D4AF37', logo: 'https://gmauthority.com/blog/wp-content/uploads/2025/05/Cadillac-F1-Team-logo-reval-001.jpg', fullName: 'Cadillac F1 Team' },
        'Williams': { color: '#00A0DE', logo: 'https://tse3.mm.bing.net/th/id/OIP.3DHRQ9kX-cCzc3NH5NVcPAHaHa?pid=Api&P=0&h=180', fullName: 'Williams Racing' }
    };

    // Update Name
    fanNameInput.addEventListener('input', (e) => {
        const name = e.target.value.trim();
        displayFanName.textContent = name || 'CHAMPION';

        // Update Initials
        if (name) {
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 3);
            passAvatar.textContent = initials;
        } else {
            passAvatar.textContent = 'FP';
        }
    });

    // Update Team
    teamOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            const team = e.target.value;
            const data = teamData[team];

            if (data) {
                // Apply team branding
                paddockPass.style.setProperty('--pass-color', data.color);
                displayFanTeam.textContent = data.fullName;
                passTeamLogo.src = data.logo;
                passAvatar.style.borderColor = data.color;
                passAvatar.style.color = data.color;
            }
        });
    });

    // Generate Button Effect
    generateBtn.addEventListener('click', () => {
        // Simple "Flash" effect to simulate generation
        paddockPass.style.transform = 'scale(1.05) rotateY(10deg)';
        generateBtn.textContent = 'Pass Claimed!';
        generateBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';

        setTimeout(() => {
            paddockPass.style.transform = 'scale(1) rotateY(0)';
        }, 300);

        // In a real app, you could use html2canvas here to let the user download it
        console.log('Fan ID Generated for:', displayFanName.textContent);
    });
});

// ============================================================
// RACE ENGINEER ASSISTANT (PIT WALL AI)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const engineerBtn = document.getElementById('engineerBtn');
    const engineerBubble = document.getElementById('engineerBubble');
    const engineerMessage = document.getElementById('engineerMessage');
    const radioWaves = document.querySelector('.radio-waves');

    if (!engineerBtn) return;

    const synth = window.speechSynthesis;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;
    let isListening = false;
    let bubbleTimeout;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            isListening = true;
            engineerBtn.classList.add('listening');
            engineerBubble.classList.add('listening-pulse');
            updateBubble("Listening for your command... Mode Push!");
            if (radioWaves) radioWaves.classList.add('active');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            handleVoiceCommand(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopListening();
            if (event.error === 'not-allowed') {
                speak("Pit Wall AI here. I can't hear you because microphone access was denied. Please check your browser's security settings to enable telemetry.");
            } else {
                speak("I didn't quite catch that. Telemetry interference? Please try your command again.");
            }
        };

        recognition.onend = () => {
            stopListening();
        };
    }

    const commands = {
        greetings: ['hello', 'hi', 'hey', 'engineer', 'morning', 'afternoon'],
        teams: ['teams', 'show teams', 'who are the teams', 'racing teams'],
        standings: ['standings', 'leaderboard', 'who is leading', 'points', 'championship'],
        schedule: ['schedule', 'calendar', 'races', 'next race'],
        cars: ['cars', 'show me the cars', 'machinery'],
        stats: ['statistics', 'stats', 'data', 'history'],
        fanPass: ['fan pass', 'fan id', 'paddock pass'],
        merch: ['merch', 'store', 'shop', 'merchandise'],
        funny: ['tyres are gone', 'leave me alone', 'hammer time', 'box box'],
        identity: ['who are you', 'what are you', 'tell me about yourself'],
        drivers: ['hamilton', 'verstappen', 'leclerc', 'norris', 'alonso', 'russell', 'piastri', 'sainz'],
        weather: ['weather', 'conditions', 'track temperature', 'is it raining'],
        scan: ['scan', 'analyze', 'system scan', 'check the car'],
        help: ['help', 'what can i say', 'commands'],
        best: ['best', 'greatest', 'goat', 'legend', 'fastest']
    };

    function handleVoiceCommand(transcript) {
        console.log('Command received:', transcript);
        updateBubble(`" ${transcript} "`);

        // Greeting
        if (commands.greetings.some(cmd => transcript.includes(cmd))) {
            speak("Hello! I am your AI Race Engineer. I'm monitoring the telemetry and ready for your commands. How can I assist you on the pit wall today?");
            return;
        }

        // Identity
        if (commands.identity.some(cmd => transcript.includes(cmd))) {
            speak("I am PIT WALL AI, your virtual race engineer. I can help you navigate the season, check standings, or find information about your favorite teams.");
            return;
        }

        // Teams
        if (commands.teams.some(cmd => transcript.includes(cmd))) {
            scrollToSection('teams');
            speak("Navigating to the 2026 grid. We have ten world-class teams competing this season, including the much-anticipated entry of Audi and Cadillac.");
            return;
        }

        // Standings
        if (commands.standings.some(cmd => transcript.includes(cmd))) {
            scrollToSection('standings');
            speak("Opening the championship pulse. Charles Leclerc is currently leading the pack with forty-two points, followed closely by Max Verstappen.");
            return;
        }

        // Schedule
        if (commands.schedule.some(cmd => transcript.includes(cmd))) {
            scrollToSection('schedule');
            speak("The 2026 calendar is packed with twenty-four races. Up next is the Australian Grand Prix at Albert Park. Lights out in Melbourne is just around the corner.");
            return;
        }

        // Cars
        if (commands.cars.some(cmd => transcript.includes(cmd))) {
            scrollToSection('cars');
            speak("Viewing the 2026 technical marvels. These cars feature active aerodynamics and a 50/50 power split between electric and combustion.");
            return;
        }

        // Stats
        if (commands.stats.some(cmd => transcript.includes(cmd))) {
            scrollToSection('stats');
            speak("Analyzing the historical data. From Monaco's tight corners to Monza's temple of speed, the numbers tell a story of seventy-six years of excellence.");
            return;
        }

        // Fan Pass
        if (commands.fanPass.some(cmd => transcript.includes(cmd))) {
            scrollToSection('fan-id');
            speak("Accessing the Paddock Pass generator. You can create your customized official F1 ID here and represent your favorite team.");
            return;
        }

        // Merch (if there is such a section)
        if (commands.merch.some(cmd => transcript.includes(cmd))) {
            scrollToSection('merch');
            speak("Opening the F1 Store. Get ready to gear up for the 2026 season with the latest team collections.");
            return;
        }

        // Funny / Easter Eggs
        if (transcript.includes('tyres are gone') || transcript.includes('tires are gone')) {
            speak("Copy that. But we checked the data, and your pace is still green. Stay out, stay out!");
            return;
        }
        if (transcript.includes('leave me alone')) {
            speak("Understood. Radio silence for the next sector. I know what I'm doing.");
            return;
        }
        if (transcript.includes('hammer time')) {
            speak("Acknowledged. It's hammer time! Box, box, box for fresh rubber. Let's send it!");
            return;
        }
        if (transcript.includes('box box')) {
            speak("Confirming box. Box this lap. Confirm, box box box!");
            return;
        }

        // Weather
        if (commands.weather.some(cmd => transcript.includes(cmd))) {
            const temps = Math.floor(Math.random() * (35 - 20) + 20);
            const trackTemps = temps + Math.floor(Math.random() * 10);
            speak(`Track conditions are optimal. Ambient temperature is ${temps} degrees Celsius, track surface is at ${trackTemps} degrees. Zero percent chance of rain for the next twenty minutes.`);
            return;
        }

        // System Scan
        if (commands.scan.some(cmd => transcript.includes(cmd))) {
            scrollToSection('cars');
            speak("Initiating full chassis and aero scan. Telemetry is showing nominal values. All systems are green.");
            triggerCarScan();
            return;
        }

        // Help
        if (commands.help.some(cmd => transcript.includes(cmd))) {
            speak("You can ask me about teams, standings, race schedules, car technical specs, or track weather. You can also ask about specific drivers like Hamilton or Leclerc.");
            return;
        }

        // Best / Greatest Racer
        if (commands.best.some(cmd => transcript.includes(cmd)) && (transcript.includes('racer') || transcript.includes('driver'))) {
            speak("That is the ultimate debate. While Lewis Hamilton and Michael Schumacher hold the record for seven championships, many experts point to Ayrton Senna's pure speed or Max Verstappen's current dominance. In 2026, Charles Leclerc is certainly making his case for the throne.");
            return;
        }

        // Individual Drivers
        if (transcript.includes('hamilton')) {
            scrollToSection('teams');
            speak("Lewis Hamilton. Seven-time world champion. He's currently pushing the Ferrari project to its limits for the 2026 season.");
            return;
        }
        if (transcript.includes('verstappen')) {
            scrollToSection('teams');
            speak("Max Verstappen. The Dutchman continues to be the benchmark for pure speed at Red Bull Racing.");
            return;
        }
        if (transcript.includes('leclerc')) {
            scrollToSection('teams');
            speak("Charles Leclerc. Ferrari's golden boy and our current championship leader. His qualifying pace remains unmatched.");
            return;
        }

        // Generic Info about F1
        if (transcript.includes('rules') || transcript.includes('regulations')) {
            speak("The 2026 regulations introduced active aerodynamics and power units with a 50/50 split between electric and combustion power, aiming for carbon neutrality.");
            return;
        }

        if (transcript.includes('founder') || transcript.includes('started')) {
            speak("Formula 1 as we know it started in 1950. The FIA, led by figures like Antonio Brivio and others, established the first World Championship. The first race washeld at Silverstone.");
            return;
        }

        if (transcript.includes('fastest car')) {
            speak("Historically, the 2020 Mercedes W11 is considered the fastest F1 car ever in terms of raw lap time. However, the 2026 machinery uses advanced active aero to achieve incredible speeds while being more sustainable.");
            return;
        }

        if (transcript.includes('how many races')) {
            speak("The 2026 season features a record-breaking twenty-four races, spanning from Melbourne in March to Abu Dhabi in December.");
            return;
        }

        // Fallback
        speak("I've analyzed your request, but I don't have a direct telemetry link for that command yet. Ask me about teams, standings, or say 'System Scan'.");
    }

    function triggerCarScan() {
        const carCards = document.querySelectorAll('.car-card');
        carCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('scanning-active');
                setTimeout(() => card.classList.remove('scanning-active'), 3000);
            }, index * 400);
        });
    }

    function speak(text) {
        // Voice Synthesis
        if (synth.speaking) synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 0.85;
        utterance.rate = 1.05;

        const voices = synth.getVoices();
        const engVoice = voices.find(v => v.name.includes('Google US English Male')) ||
            voices.find(v => v.name.includes('Male')) ||
            voices[0];
        if (engVoice) utterance.voice = engVoice;

        utterance.onstart = () => {
            updateBubble(text);
            if (radioWaves) radioWaves.classList.add('active');
        };

        utterance.onend = () => {
            if (!isListening && radioWaves) radioWaves.classList.remove('active');

            // Auto-hide bubble after reading is DONE
            const hideTimeout = 3000;
            clearTimeout(bubbleTimeout);
            bubbleTimeout = setTimeout(() => {
                if (!synth.speaking && !isListening) {
                    engineerBubble.classList.remove('show');
                }
            }, hideTimeout);
        };

        synth.speak(utterance);
    }

    function updateBubble(text) {
        engineerMessage.textContent = text;
        engineerBubble.classList.add('show');
    }

    function stopListening() {
        isListening = false;
        engineerBtn.classList.remove('listening');
        engineerBubble.classList.remove('listening-pulse');
        if (radioWaves) radioWaves.classList.remove('active');
        if (recognition) recognition.stop();
    }

    function scrollToSection(id) {
        const section = document.getElementById(id);
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: section.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    }

    // Toggle Listening
    engineerBtn.addEventListener('click', () => {
        if (!SpeechRecognition) {
            const randomQuotes = [
                "Copy that, we're monitoring the telemetry.",
                "Box this lap, box box box!",
                "The gap to the car behind is 2.5 seconds.",
                "Tyre temperatures are looking good. Keep it up."
            ];
            speak("Apologies, but your browser doesn't support live voice commands. I'll give you periodic updates instead: " + randomQuotes[Math.floor(Math.random() * randomQuotes.length)]);
            return;
        }

        if (isListening) {
            stopListening();
        } else {
            try {
                if (synth.speaking) synth.cancel(); // Stop speaking if we're starting to listen
                recognition.start();
            } catch (e) {
                console.warn('Recognition failed to start:', e);
                stopListening();
            }
        }
    });

    // Text Input Support
    const engineerInput = document.getElementById('engineerInput');
    const sendEngineerBtn = document.getElementById('sendEngineerBtn');

    if (engineerInput && sendEngineerBtn) {
        const submitQuery = () => {
            const query = engineerInput.value.trim();
            if (query) {
                handleVoiceCommand(query.toLowerCase());
                engineerInput.value = '';
            }
        };

        sendEngineerBtn.addEventListener('click', submitQuery);
        engineerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') submitQuery();
        });

        // Show bubble on input focus
        engineerInput.addEventListener('focus', () => {
            engineerBubble.classList.add('show');
            clearTimeout(bubbleTimeout);
        });
    }

    // Initialize Telemetry
    initTelemetryDashboard();

    // Handle voice list loading (for speak function)
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = synth.getVoices;
    }
});

// ============================================================
// PIT WALL TELEMETRY SIMULATION
// ============================================================
function initTelemetryDashboard() {
    const gearEl = document.getElementById('liveGear');
    const speedEl = document.getElementById('liveSpeed');
    const rpmEl = document.getElementById('liveRPM');
    const gDot = document.getElementById('gDot');
    const gValue = document.getElementById('liveG');
    const rpmMask = document.getElementById('rpmMask');
    const tyreEls = [
        document.getElementById('tyreFL'),
        document.getElementById('tyreFR'),
        document.getElementById('tyreRL'),
        document.getElementById('tyreRR')
    ];

    if (!gearEl) return;

    let state = {
        gear: 7,
        speed: 290,
        rpm: 11000,
        gX: 0,
        gY: 0,
        ers: 82,
        tyres: [98, 95, 102, 101]
    };

    function update() {
        // Simulate Speed & RPM
        if (state.speed > 320) {
            state.speed -= 2; // Decelerate if too fast
        } else {
            state.speed += Math.random() * 2 - 0.5;
        }

        // Logic for Gear Shifting
        if (state.speed > 300 && state.gear < 8) state.gear = 8;
        if (state.speed < 280 && state.gear > 7) state.gear = 7;
        if (state.speed < 240 && state.gear > 6) state.gear = 6;

        state.rpm = 8000 + (state.speed % 40) * 150 + Math.random() * 100;

        // G-Force oscillation
        state.gX = Math.sin(Date.now() / 500) * 30 + (Math.random() * 10 - 5);
        state.gY = Math.cos(Date.now() / 700) * 20 + (Math.random() * 10 - 5);

        // Update ERS
        state.ers = 70 + Math.sin(Date.now() / 2000) * 10;

        // Apply to DOM
        gearEl.textContent = state.gear;
        speedEl.textContent = Math.floor(state.speed);
        rpmEl.textContent = Math.floor(state.rpm).toLocaleString();

        // G-Dot position
        gDot.style.transform = `translate(calc(-50% + ${state.gX}px), calc(-50% + ${state.gY}px))`;
        gValue.textContent = (Math.abs(state.gX / 10) + 1.5).toFixed(1) + 'G';

        // RPM Mask (0% to 100% width)
        const rpmPercent = ((state.rpm - 8000) / 4000) * 100;
        rpmMask.style.width = Math.max(0, 100 - rpmPercent) + '%';

        // Tyre Temps
        tyreEls.forEach((el, i) => {
            if (el) {
                const noise = Math.random() * 0.4 - 0.2;
                state.tyres[i] += noise;
                el.textContent = Math.floor(state.tyres[i]);

                // Color coding
                if (state.tyres[i] > 105) el.style.color = 'var(--primary)';
                else if (state.tyres[i] < 90) el.style.color = '#3b82f6';
                else el.style.color = '#fff';
            }
        });

        // Update ERS Bar
        const ersBar = document.getElementById('ersProgress');
        if (ersBar) ersBar.style.width = state.ers + '%';

        requestAnimationFrame(update);
    }

    initBiometricHUD();
}

