const track = document.querySelector('.project-slider-track');
        const slides = Array.from(track.children);
        const slideWidth = slides[0].getBoundingClientRect().width;
        const slideGap = parseFloat(getComputedStyle(slides[0]).marginRight);
        const totalWidth = (slideWidth + slideGap) * slides.length;

        let currentPosition = 0;
        const moveDistance = 0.5; // Movement distance for smoother effect
        let intervalId;

        function startSlider() {
            intervalId = setInterval(moveSlider, 20); // Adjust speed: smaller interval for smoother scrolling
        }

        function moveSlider() {
            currentPosition -= moveDistance;
            track.style.transform = `translateX(${currentPosition}px)`;

            // Reset position when it reaches the end
            if (Math.abs(currentPosition) >= totalWidth) {
                currentPosition = 0;
                track.style.transition = 'none'; // Disable transition for jump
                track.style.transform = `translateX(${currentPosition}px)`;
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s linear'; // Reapply transition
                }, 50);
            }
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