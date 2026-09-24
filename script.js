const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

// ACTIVE PAGE NAVIGATION CONTROLLER
const activePage = () => {
    navLinks.forEach(link => link.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));

    if (menuIcon) menuIcon.classList.remove('bx-x');
    if (navbar) navbar.classList.remove('active');
};

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        // Prevent #about, #projects, etc. from appearing in URL
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        activePage();
        link.classList.add('active');

        if (targetSection) {
            targetSection.classList.add('active');

            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();

        activePage();

        if (navLinks[0]) {
            navLinks[0].classList.add('active');
        }

        if (sections[0]) {
            sections[0].classList.add('active');

            sections[0].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// MENU ICON CONTROL (MOBILE NAV TOGGLE)
if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });
}

// DARK / LIGHT MODE TOGGLE CONTROLLER
const themeIcon = document.querySelector('#theme-icon');

if (themeIcon) {
    const setTheme = (isLight) => {
        if (isLight) {
            document.body.classList.add('light-mode');
            themeIcon.classList.remove('bx-moon');
            themeIcon.classList.add('bx-sun');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            themeIcon.classList.remove('bx-sun');
            themeIcon.classList.add('bx-moon');
            localStorage.setItem('theme', 'dark');
        }
    };

    // Check local storage or system color scheme preference on load
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    // Toggle click event
    themeIcon.addEventListener('click', () => {
        const isCurrentlyLight = document.body.classList.contains('light-mode');
        setTheme(!isCurrentlyLight);
    });
}

// PROJECT SECTION (SLIDER CONTROLLER)
const projectImages = document.querySelectorAll('.project-image');
const projectInfo = document.querySelectorAll('.project-info');
const projectArrowRight = document.querySelector('.project-arrow-right');
const projectArrowLeft = document.querySelector('.project-arrow-left');
const projectDots = document.querySelectorAll('.project-dots .dot');
const projectCounter = document.querySelector('.project-counter');
const projectTags = document.querySelector('.project-tags');

const projectTechnologies = [
    ['Python', 'Streamlit', 'Gemini API', 'MySQL'],
    ['HTML5', 'CSS3', 'JavaScript'],
    ['HTML5', 'CSS3', 'JavaScript']
];

let projectIndex = 0;

const updateProjectTags = () => {
    if (!projectTags) return;

    projectTags.innerHTML = '';

    (projectTechnologies[projectIndex] || []).forEach(technology => {
        const tag = document.createElement('span');
        tag.textContent = technology;
        projectTags.appendChild(tag);
    });
};

const updateProject = () => {
    projectImages.forEach((image, index) => {
        image.classList.toggle('active', index === projectIndex);
    });

    projectInfo.forEach((info, index) => {
        info.classList.toggle('active', index === projectIndex);
    });

    projectDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === projectIndex);
    });

    if (projectCounter) {
        const current = String(projectIndex + 1).padStart(2, '0');
        const total = String(projectImages.length).padStart(2, '0');

        projectCounter.textContent = `PROJECT ${current} / ${total}`;
    }

    updateProjectTags();

    projectArrowLeft?.classList.toggle(
        'disabled',
        projectIndex === 0
    );

    projectArrowRight?.classList.toggle(
        'disabled',
        projectIndex === projectImages.length - 1
    );
};

const nextProject = () => {
    if (projectIndex < projectImages.length - 1) {
        projectIndex++;
        updateProject();
    }
};

const previousProject = () => {
    if (projectIndex > 0) {
        projectIndex--;
        updateProject();
    }
};

projectArrowRight?.addEventListener('click', nextProject);
projectArrowLeft?.addEventListener('click', previousProject);

projectDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        projectIndex = index;
        updateProject();
    });
});

// PROJECT KEYBOARD NAVIGATION
document.addEventListener('keydown', event => {
    const projectsSection = document.getElementById('projects');

    if (!projectsSection) return;

    if (event.key === 'ArrowRight') {
        nextProject();
    } else if (event.key === 'ArrowLeft') {
        previousProject();
    }
});

if (projectImages.length > 0 && projectInfo.length > 0) {
    updateProject();
}

// SCROLL NAVIGATION
window.addEventListener('scroll', () => {
    const currentPos = window.scrollY;

    sections.forEach(section => {
        const offsetTop = section.offsetTop - 150;
        const offsetBottom = offsetTop + section.offsetHeight;
        const id = section.getAttribute('id');

        if (currentPos >= offsetTop && currentPos < offsetBottom) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${id}`
                );
            });
        }
    });
});

// RESET HOME ON LOAD
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// FOOTER YEAR
const yearEl = document.getElementById('year');

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}