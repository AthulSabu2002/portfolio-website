const track = document.querySelector('.project-slider-track');
const slides = Array.from(track.children);
const slideWidth = slides[0].getBoundingClientRect().width;
const slideGap = parseFloat(getComputedStyle(slides[0]).marginRight);

// Clone all slides for a truly infinite effect
slides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
});

const totalSlides = track.children.length;
const totalWidth = (slideWidth + slideGap) * totalSlides;

let currentPosition = 0;
const moveDistance = 0.5; // Movement distance for smoother effect
let intervalId;

// Set initial position
track.style.transform = `translateX(${currentPosition}px)`;

function startSlider() {
    intervalId = setInterval(moveSlider, 20); // Adjust speed: smaller interval for smoother scrolling
}

function moveSlider() {
    currentPosition -= moveDistance;
    
    // If we've scrolled past half of the total width, reset to create the infinite effect
    if (Math.abs(currentPosition) >= totalWidth / 2) {
        currentPosition += totalWidth / 2;
    }
    
    track.style.transform = `translateX(${currentPosition}px)`;
}

function stopSlider() {
    clearInterval(intervalId);
}

function resumeSlider() {
    startSlider();
}

// Start slider initially
startSlider();

// Event listeners for pausing and resuming on hover
document.querySelectorAll('.project-slide').forEach(slide => {
    slide.addEventListener('mouseover', stopSlider);
    slide.addEventListener('mouseout', resumeSlider);
});