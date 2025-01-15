// Ensure GSAP and ScrollTrigger are registered
gsap.registerPlugin(ScrollTrigger);

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // if screensize is less than or equal to 1200
    if (window.innerWidth <= 1200) {
        return;
    }
    // Select the slider container and all slide items
    const serviceSlider = document.querySelector('.js-service-slider');
    const serviceSliderItems = document.querySelectorAll('.js-service-slider .contents');

    // Proceed only if there are items to animate
    if (serviceSliderItems.length > 0) {
        // Add leading zero to .counter-total based on length
        const counterTotal = document.querySelector('.counter-total');
        counterTotal.innerHTML = serviceSliderItems.length < 10 ? `0${serviceSliderItems.length}` : serviceSliderItems.length;

        // Get the .counter element and set its initial value to '01'
        const counter = document.querySelector('.counter');
        counter.innerHTML = '01';

        // Calculate the height of a single slide (assumes all slides have equal height)
        let itemHeight = serviceSliderItems[0].offsetHeight;
        console.log('itemHeight', itemHeight);

        // Add margin-top to the height
        const marginTop = parseInt(window.getComputedStyle(serviceSliderItems[0]).marginTop);
        console.log('marginTop', marginTop);
        itemHeight += marginTop;

        const totalScrollHeight = itemHeight * (serviceSliderItems.length - 1);

        // Initialize scales: all slides to 0.8 except the first one
        gsap.set(serviceSliderItems, { scale: 0.8 });
        gsap.set(serviceSliderItems[0], { scale: 1 });

        // Create a GSAP timeline with ScrollTrigger
        window.serviceTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".c-service-carousel", // Element to pin and trigger animation
                start: "top top", // When the top of .c-service-carousel hits the top of the viewport
                end: () => `+=${totalScrollHeight}`, // Scroll distance equals the total height minus one slide
                scrub: 1, // Links the animation progress to the scrollbar with a 1-second delay
                pin: true, // Pins the .c-service-carousel during the scroll
                // Removed snap to allow smooth transitions
                markers: false, // Set to true to visualize trigger points (useful for debugging)
                anticipatePin: 1, // Helps prevent pin jumping
                onUpdate: self => {
                    setTimeout(() => {
                        updateCounter();
                    }, 250)
                }
            }
        });

        const updateCounter = () => {
            const progress = serviceTl.progress() * serviceSliderItems.length;
            const currentSlide = Math.ceil(progress);
            counter.innerHTML = currentSlide < 10 ? `0${currentSlide}` : currentSlide;
        }

        // Move the container up by the height of one slide with linear easing
        serviceTl.to(serviceSlider, {
            y: `-=${itemHeight * (serviceSliderItems.length - 1)}`,
            duration: 1.5 * (serviceSliderItems.length - 3),
            ease: 'none' // Linear movement for consistent speed
        }, 0); // Position each tween at its respective index

        // Iterate over slides and add movement, scaling, and counter updates to the timeline
        serviceSliderItems.forEach((currentSlide, index) => {
            if (index === 0) return; // Skip the first slide as it's already active

            // Calculate the previous slide index
            const prevIndex = index - 1;
            const prevSlide = serviceSliderItems[prevIndex];

            // Scale up the current slide to 1 with smooth easing
            serviceTl.to(currentSlide, {
                scale: 1,
                duration: 1.5,
                ease: 'power4.inOut' // Smooth scaling
            }, index - 1); // Position each tween at its respective index

            // Scale down the previous slide back to 0.8 with smooth easing
            serviceTl.to(prevSlide, {
                scale: 0.8,
                duration: 1.5,
                ease: 'power4.inOut' // Smooth scaling
            }, index - 1); // Position each tween at its respective index

        });
    }

    // Handle window resize to recalculate heights and update ScrollTrigger
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });

    // Optional: Pause animation on hover
    /*
    const carouselElement = document.querySelector('.c-service-carousel');

    carouselElement.addEventListener('mouseenter', () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.pause());
    });

    carouselElement.addEventListener('mouseleave', () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.resume());
    });
    */
});


//onclick of .js-open-services toggle class active to .c-service-carousel
document.querySelector('.js-open-services')?.addEventListener('click', () => {
    document.querySelector('.c-service-carousel').classList.toggle('active');
    
    //make body overflowy scroll
    document.querySelector('body').classList.toggle('overflowy-hidden');
    
    console.log('clicked');
});