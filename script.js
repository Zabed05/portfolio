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

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activePage();
            link.classList.add('active');

            setTimeout(() => {
                if (sections[idx]) sections[idx].classList.add('active');
            }, 10);
        }
    });
});

if (logoLink) {
    logoLink.addEventListener('click', () => {
        if (navLinks[0] && !navLinks[0].classList.contains('active')) {
            activePage();
            navLinks[0].classList.add('active');

            setTimeout(() => {
                if (sections[0]) sections[0].classList.add('active');
            }, 10);
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

// ===================================
// DARK / LIGHT MODE TOGGLE CONTROLLER
// ===================================
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
const arrowRight = document.querySelector('.project-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.project-box .navigation .arrow-left');

let index = 0;
const activeProject = () => {
    const imgSlide = document.querySelector('.project .img-slide');
    const projectDetails = document.querySelectorAll('.project-details');

    if (imgSlide) {
        imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
    }

    projectDetails.forEach(details => details.classList.remove('active'));
    if (projectDetails[index]) {
        projectDetails[index].classList.add('active');
    }
};

if (arrowRight && arrowLeft) {
    arrowRight.addEventListener('click', () => {
        if (index < 1) {
            index++;
            arrowLeft.classList.remove('disabled');
        } else {
            index = 2;
            arrowRight.classList.add('disabled');
        }
        activeProject();
    });

    arrowLeft.addEventListener('click', () => {
        if (index > 1) {
            index--;
            arrowRight.classList.remove('disabled');
        } else {
            index = 0;
            arrowLeft.classList.add('disabled');
        }
        activeProject();
    });
}

// SCROLL HIGH-LIGHTING FOR NAV LINKS
window.addEventListener("scroll", () => {
    let currentPos = window.scrollY;

    sections.forEach((sec) => {
        let offsetTop = sec.offsetTop - 150;
        let offsetBottom = offsetTop + sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (currentPos >= offsetTop && currentPos < offsetBottom) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + id) {
                    link.classList.add("active");
                }
            });
        }
    });
});

// SMOOTH RESET TO HOME ON PAGE LOAD
window.addEventListener("load", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// FOOTER YEAR SETUP
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}