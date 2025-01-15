// function to toggle class to c-contact-us is--active when click on .js-contact-open
// function to toggle class to c-contact-us is--active when click on .js-contact-close
document.querySelector('.js-contact-open')?.addEventListener('click', function() {


    //hide .byVismeButton--PYBh3EN and .byVismeButton--PYBh3EN.mobile--dwFnSiL than proceed to next step
    if (document.querySelector('.byVismeButton--PYBh3EN')) {
        document.querySelector('.byVismeButton--PYBh3EN').style.display = 'none';
        console.log('byVismeButton--PYBh3EN hidden');
    }
       
    document.querySelector('.c-contact-us').classList.toggle('is--active');

    //make body overflow-y css hidden
    document.querySelector('body').style.overflow = 'hidden';


});



document.querySelector('.js-contact-close')?.addEventListener('click', function() {
    document.querySelector('.c-contact-us').classList.toggle('is--active');
    document.querySelector('body').style.overflowY = 'scroll';
});


document.addEventListener('DOMContentLoaded', () => {
    const dealSection = document.querySelector('.deal-section');
    const dealText = document.querySelector('.deal-text');
    const dealImage = document.querySelector('.deal-image');
    const ctaButton = document.querySelector('.cta-button');

    gsap.set(dealSection, { autoAlpha: 0, y: 50 });
    gsap.set(dealText, { autoAlpha: 0, x: -50 });
    gsap.set(dealImage, { autoAlpha: 0, x: 50 });
    gsap.set(ctaButton, { autoAlpha: 0, scale: 0.8 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(dealSection, { autoAlpha: 1, y: 0, duration: 0.8 })
      .to(dealText, { autoAlpha: 1, x: 0, duration: 0.8 }, '-=0.4')
      .to(dealImage, { autoAlpha: 1, x: 0, duration: 0.8 }, '-=0.6')
      .to(ctaButton, { autoAlpha: 1, scale: 1, duration: 0.6 });

    // Hover animation for CTA button
    ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, { scale: 1.05, duration: 0.3 });
    });

    ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, { scale: 1, duration: 0.3 });
    });
});



document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal').forEach(function(element) {
        gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });
    });

    // Reveal from down
    gsap.utils.toArray('.reveal-down').forEach(function(element) {
        gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });
    });

    // Reveal from left
    gsap.utils.toArray('.reveal-left').forEach(function(element) {
        gsap.from(element, {
            opacity: 0,
            x: -50,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });
    });

    // Reveal from right
    gsap.utils.toArray('.reveal-right').forEach(function(element) {
        gsap.from(element, {
            opacity: 0,
            x: 50,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });
    });
});