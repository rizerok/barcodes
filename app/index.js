import 'styles/style.styl';
console.log('Hello World1');

let scrolled = window.pageYOffset || document.documentElement.scrollTop;
const header = document.querySelector('.header');

const setHeaderState = (scrolled) =>  {
    if(scrolled > 20 && !header.classList.contains('is-moved')){
        header.classList.add('is-moved');
    }
    if(scrolled <=20 && header.classList.contains('is-moved')){
        header.classList.remove('is-moved');
    }
};

setHeaderState(scrolled);

window.addEventListener('scroll', () => {
    scrolled = window.pageYOffset || document.documentElement.scrollTop;
    setHeaderState(scrolled);
});