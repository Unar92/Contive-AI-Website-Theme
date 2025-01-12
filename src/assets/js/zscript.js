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
