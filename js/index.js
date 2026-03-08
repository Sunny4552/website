const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.querySelector('.header');

// Toggle Mobile Navigation
navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
});

// Change Header Background on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for Scroll Animations
const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Stop observing once animated if we only want it to happen once
            // observer.unobserve(entry.target); 
        } else {
            // Optional: remove class to repeat animation on scroll up
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "0px 0px -50px 0px"
});

hiddenElements.forEach((el) => observer.observe(el));

// Optional: Dynamic ambient blobs following cursor slightly
const blob1 = document.querySelector('.blob-1');
const blob2 = document.querySelector('.blob-2');



// Custom Cursor Logic
const customCursor = document.querySelector('.cursor');
const hoverElements = document.querySelectorAll('a, button, .nav__link, .btn, .social-list__link, .chip');


const dots = [];
let mouse = { x: 0, y: 0 };
let cursor = { x: 0, y: 0 }; // Track actual position of the main cursor ring

// Create 10 dots for the trail
for (let i = 0; i < 10; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    dots.push({ el: dot, x: 0, y: 0 });
}

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    const x = e.clientX;
    const y = e.clientY;

    // Subtle parallax effect on blobs
    if (blob1) blob1.style.transform = `translate(${x / window.innerWidth * -30}px, ${y / window.innerHeight * -30}px)`;
    if (blob2) blob2.style.transform = `translate(${x / window.innerWidth * 30}px, ${y / window.innerHeight * 30}px)`;
});

function animateDots() {
    // Smooth delay for main custom cursor ring so it trails the default cursor
    cursor.x += (mouse.x - cursor.x) * 0.1;
    cursor.y += (mouse.y - cursor.y) * 0.1;

    if (customCursor) {
        customCursor.style.left = `${cursor.x}px`;
        customCursor.style.top = `${cursor.y}px`;
    }

    let x = cursor.x;
    let y = cursor.y;

    dots.forEach((dot, index) => {
        dot.el.style.left = x + 'px';
        dot.el.style.top = y + 'px';

        // Scale down the dots as they trail further behind
        dot.el.style.transform = `translate(-50%, -50%) scale(${(dots.length - index) / dots.length})`;

        dot.x = x;
        dot.y = y;

        // Use a lower multiplier (0.15) to create a looser, more spaced out trail
        const nextDot = dots[index + 1] || dots[0];
        x += (nextDot.x - x) * 0.15;
        y += (nextDot.y - y) * 0.15;
    });

    requestAnimationFrame(animateDots);
}

animateDots();

// Add hover effect to interactive elements
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (customCursor) customCursor.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
        if (customCursor) customCursor.classList.remove('hovered');
    });
});
