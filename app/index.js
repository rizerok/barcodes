import 'whatwg-fetch';
import 'styles/style.styl';
import animateScrollTo from 'animated-scroll-to';

let scrolled = window.pageYOffset || document.documentElement.scrollTop;
const header = document.querySelector('.header');
const buttonBuyNow = document.querySelector('.header__right .button-simple');
const screen1 = document.querySelector('.screen1');
const screen2 = document.querySelector('.screen2');
const screen3 = document.querySelector('.screen3');
const screen4 = document.querySelector('.screen4');
const navButtons = document.querySelectorAll('.navigation li');
const headerLeft = document.querySelector('.header__left');
const footer = document.querySelector('.screen4__footer');
const form = document.querySelector('.form');
const formClose = document.querySelector('.form__close');
const emailInput = document.querySelector('.form .email');
const learnMore = document.querySelector('.screen3 .button2');
const notification = document.querySelector('.notification');
const notificationCross = document.querySelector('.notification .cross');
const formSuccess = document.querySelector('.form-success');
const formSuccessNumber = document.querySelector('.form-success__number');
const formSuccessEmail = document.querySelector('.form-success__email .email');
const formSuccessButton = document.querySelector('.form-success__buy-again');
const formSuccessClose = document.querySelector('.form-success__close');

const MOBILE_WIDTH = 840;
const MAX_COMMENTS = 6;
const MAX_COMMENTS_MOBILE = 3;
const allComments = [];
let visibleComments = [];
let hiddenComments = [];
document.querySelectorAll('.screen3__comment-socket').forEach((c) => {
    allComments.push(c);
});

if(window.innerWidth >= MOBILE_WIDTH){
    visibleComments = allComments.slice(0,MAX_COMMENTS);
    hiddenComments = allComments.slice(MAX_COMMENTS, allComments.length);
}else{
    visibleComments = allComments.slice(0,MAX_COMMENTS_MOBILE);
    hiddenComments = allComments.slice(MAX_COMMENTS_MOBILE, allComments.length);
}


hiddenComments.forEach((hc) => {
    hc.classList.add('is-hidden');
});

learnMore.addEventListener('click', () => {
    hiddenComments.forEach((hc) => {
        hc.classList.toggle('is-hidden');
    });
    if(learnMore.innerHTML === 'More reviews'){
        learnMore.innerHTML = 'Less reviews';
    }else{
        learnMore.innerHTML = 'More reviews';
    }

});

formClose.addEventListener('click', () => {
    screen1.classList.remove('is-active');
    form.classList.remove('is-active');
});


buttonBuyNow.addEventListener('click', () => {
    if(window.innerWidth >= MOBILE_WIDTH ){
        animateScrollTo(screen1.offsetTop);
    }else{
        screen1.classList.add('is-active');
        form.classList.add('is-active');
    }
    emailInput.focus();
});
headerLeft.addEventListener('click', () => {
    animateScrollTo(screen1.offsetTop);
});
navButtons[0].addEventListener('click', () => {
    animateScrollTo(screen1.offsetTop);
});
navButtons[1].addEventListener('click', () => {
    animateScrollTo(screen2.offsetTop);
});
navButtons[2].addEventListener('click', () => {
    animateScrollTo(screen3.offsetTop);
});
navButtons[3].addEventListener('click', () => {
    animateScrollTo(screen4.offsetTop);
});
navButtons[4].addEventListener('click', () => {
    animateScrollTo(screen4.offsetTop);
});

const setHeaderState = (scrolled) =>  {
    if(scrolled > 20 && !header.classList.contains('is-moved')){
        header.classList.add('is-moved');
    }
    if(scrolled <= 20 && header.classList.contains('is-moved')){
        header.classList.remove('is-moved');
    }
    if(window.innerHeight + scrolled >= screen4.offsetTop ){
        // if(!buttonBuyNow.classList.contains('is-hidden')){
        //     buttonBuyNow.classList.add('is-hidden');
        // }
        if(footer.classList.contains('is-hidden')){
            footer.classList.remove('is-hidden');
        }
    }
    if(window.innerHeight + scrolled < screen4.offsetTop){
        // if(buttonBuyNow.classList.contains('is-hidden')){
        //     buttonBuyNow.classList.remove('is-hidden');
        // }
        if(!footer.classList.contains('is-hidden')){
            footer.classList.add('is-hidden');
        }
    }
    if(scrolled <= 20 && header.classList.contains('is-moved')){
        header.classList.remove('is-moved');
    }
    const offset = 100;
    if(scrolled  >= screen1.offsetTop && scrolled - offset < screen2.offsetTop && !navButtons[0].classList.contains('is-active')){
        navButtons.forEach((nb) => {
            nb.classList.remove('is-active');
        });
        navButtons[0].classList.add('is-active');
    }
    if(scrolled + offset >= screen2.offsetTop && scrolled - offset < screen3.offsetTop&& !navButtons[1].classList.contains('is-active')){
        navButtons.forEach((nb) => {
            nb.classList.remove('is-active');
        });
        navButtons[1].classList.add('is-active');
    }
    if(scrolled + offset >= screen3.offsetTop && scrolled - offset - 500 < screen4.offsetTop && !navButtons[2].classList.contains('is-active')){
        navButtons.forEach((nb) => {
            nb.classList.remove('is-active');
        });
        navButtons[2].classList.add('is-active');
    }
    if(scrolled  + offset + 500 >= screen4.offsetTop  && !navButtons[3].classList.contains('is-active')){
        navButtons.forEach((nb) => {
            nb.classList.remove('is-active');
        });
        navButtons[3].classList.add('is-active');
    }
};

setHeaderState(scrolled);

window.addEventListener('scroll', () => {
    scrolled = window.pageYOffset || document.documentElement.scrollTop;
    setHeaderState(scrolled);
});


const paymentMethods = [
    'stripe',
    'paypal'
];

const formData = {
    paymentMethod: paymentMethods[0],
    quantity: null,
    email: null,
    promocode: null
};

const paymentMethodsEls = document.querySelectorAll('.payment-method');
const quantityEls = document.querySelectorAll('.quantity');
const totalValue = document.querySelector('.form__total-value');
const buttonTotalValue = document.querySelector('.button__mobile-value');

const setButtonsValue = (els,currentEl) => {
    els.forEach((pm2) => {
        const button2 = pm2.querySelector('.button-number');
        if(pm2===currentEl){
            button2.classList.add('is-active');
        }else{
            button2.classList.remove('is-active');
        }
    });
};

setButtonsValue(paymentMethodsEls,paymentMethodsEls[1]);
setButtonsValue(quantityEls,quantityEls[0]);
formData.quantity = +quantityEls[0].querySelector('.button-number span').textContent;
totalValue.innerHTML = `$${formData.quantity }`;
buttonTotalValue.innerHTML = `$${formData.quantity }`;


const setEvents = (els, fnSetVal, fnValHandled) =>
    els.forEach((pm) => {
        const button = pm.querySelector('.button-number');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            let val = fnSetVal(button);
            //view
            setButtonsValue(els, pm);
            //data
            fnValHandled(val);
        });
    });

setEvents(
    paymentMethodsEls,
    (button) => button.querySelector('svg').getAttribute('data-val'),
    (val) => formData.paymentMethod = val
);
setEvents(
    quantityEls,
    (button) => +button.querySelector('span').textContent,
    (val) => {
        formData.quantity = val;
        totalValue.innerHTML = `$${val}`;
        buttonTotalValue.innerHTML = `$${val}`;
    }
);



const inputStates = [
    'is-error',
    'is-required',
    'is-value'
];

const setInputState = (input, idx) => {
    inputStates.forEach((el) => {
        input.classList.remove(el);
    });
    input.classList.add(inputStates[idx]);
};

emailInput.addEventListener('input', () => {
    if(emailInput.value !== ''){
        setInputState(emailInput, [2]);
    }
});
emailInput.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
        sendForm(e);
    }
});

const highlightInvalid = (input) => {
    setInputState(input, [0]);
};
const highlightRequire = (input) => {
    setInputState(input, [1]);
};

const notificationTimeout = null;

formSuccessButton.addEventListener('click', () => {
    form.classList.remove('is-hidden');
    formSuccess.classList.remove('is-active');
});

formSuccessClose.addEventListener('click', () => {
    form.classList.remove('is-hidden');
    formSuccess.classList.remove('is-active');
    screen1.classList.remove('is-active');
    form.classList.remove('is-active');
});

const sendForm = (e) => {
    e.preventDefault();
    formData.email = emailInput.value;
    if(formData.email === ''){
        emailInput.focus();
        highlightRequire(emailInput);
        return;
    }
    if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formData.email)){
        emailInput.focus();
        highlightInvalid(emailInput);
        return;
    }
    //=============URL=================
    fetch('/addr',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => {
        if(resp.ok){
            //const data = resp.json();
            let data = {
                number:23001,
                email: 'samplemail@yahoo.com'
            };
            form.classList.add('is-hidden');
            formSuccess.classList.add('is-active');
            formSuccessNumber.innerHTML = `#${data.number}`;
            formSuccessEmail.innerHTML = data.email;
        }else{
            notification.classList.add('is-active');
            clearTimeout(notificationTimeout);
            setTimeout(() => notification.classList.remove('is-active'), 4000);
        }
    });
};

notificationCross.addEventListener('click', () => {
    clearTimeout(notificationTimeout);
    notification.classList.remove('is-active');
});

const sendButton = document.querySelector('.form__bottom-right button');
sendButton.addEventListener('click',sendForm);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomDate(start, end) {
    return new Date(start + Math.random() * (end - start));
}

class CustomerLine{
    constructor(){
        this.line = [];
        this.container = document.querySelector('.customer-line');
        this.quantityVariants = [
            5,10,50,250,500,1000
        ];
        this.currentCustomerId = localStorage.getItem('currentCustomerId') || getRandomInt(200, 1500);
        this.adding = this.adding.bind(this);
    }
    setOpacity(){  
        const width = document.querySelector('.customer-line').offsetWidth;
        const idx = Math.floor(width / 160);
        for(let i = 0; i <= this.line.length-idx; i++){
            this.line[i].style.opacity = '0.2'; 
        }
    }
    adding(){
        const randMinutes = getRandomInt(1, 5);
        const delay = randMinutes * 15000;
        setTimeout(this.adding,delay);
        if(window.innerWidth >= MOBILE_WIDTH ){
            this.add();
        }
    }
    addingWithoutTimeout(quantity){
        const MAX_DATE = (new Date()).getTime();
        let maxDate = MAX_DATE;
        let  minDate = (new Date()).getTime() - (60000 * quantity * 2);
        let date = new Date(minDate);
        for(let i = 0; i < quantity; i++){
            if(window.innerWidth >= MOBILE_WIDTH ){
                this.addWithoutAnimation(date);
            }
            let rand = getRandomInt(3, 6) * 60000;
            minDate = date.getTime();
            maxDate = date.getTime() + rand <= MAX_DATE
                ? date.getTime() + rand
                : MAX_DATE;
            date = randomDate(minDate, maxDate);
        }
    }
    add(){
        const randQuantity = this.quantityVariants[getRandomInt(0, 5)];
        const item = document.createElement('div');
        item.classList.add('customer-line__item','customer-line__item_appear');
        item.style.transform = `translateX(0px)`;
        const data = new Date();
        const minutes = data.getMinutes().toString().length === 1? '0' + data.getMinutes() : data.getMinutes();
        const customer = this.createCustomer(randQuantity, `${data.getHours()}:${minutes}`, this.currentCustomerId++);
        item.innerHTML = customer;
        if(this.line.length < 14){
            this.line.push(item);
        }else{
            let r = this.line.shift();
            r.parentNode.removeChild(r);
            this.line.push(item);
        }
        let tr =  ()=>{
            item.removeEventListener('transitionend',tr);
            for(let i = 0; i < this.line.length; i++){
                this.line[i].style.transform = `translateX(${(this.line.length - i) * 160}px)`;
            }
        };
        item.addEventListener('transitionend',tr);
        this.container.appendChild(item);
        requestAnimationFrame(()=>{
            requestAnimationFrame(()=>{
                item.classList.remove('customer-line__item_appear');
            });
        });
        this.setOpacity();
    }
    addWithoutAnimation(date){
        const randQuantity = this.quantityVariants[getRandomInt(0, 5)];
        const item = document.createElement('div');
        item.classList.add('customer-line__item');
        const data = date;
        const minutes = data.getMinutes().toString().length === 1? '0' + data.getMinutes() : data.getMinutes();
        const customer = this.createCustomer(randQuantity, `${data.getHours()}:${minutes}`, this.currentCustomerId++);
        item.innerHTML = customer;
        if(this.line.length < 14){
            this.line.push(item);
        }else{
            let r = this.line.shift();
            r.parentNode.removeChild(r);
            this.line.push(item);
        }
        for(let i = 0; i < this.line.length; i++){
            this.line[i].style.transform = `translateX(${(this.line.length - i) * 160}px)`;
        }
        this.container.appendChild(item);
    }
    createCustomer(quantity, time, id){
        return `
            <div class="customer-line__item-image">
                <svg width="37px" height="30px" viewBox="0 0 37 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="invoice/default" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-10.000000, -10.000000)">
                        <g id="item">
                            <g id="upc-codes" transform="translate(10.000000, 6.000000)">
                                <g id="ups" transform="translate(0.000000, 4.000000)">
                                    <rect id="substrate" fill="#FFFFFF" x="0" y="0" width="37" height="30" rx="4"></rect>
                                    <path d="M6,6 L9,6 L9,24 L6,24 L6,6 Z M19,6 L22,6 L22,24 L19,24 L19,6 Z M28,6 L31,6 L31,24 L28,24 L28,6 Z M11,6 L13,6 L13,24 L11,24 L11,6 Z M15,6 L17,6 L17,24 L15,24 L15,6 Z M24,6 L26,6 L26,24 L24,24 L24,6 Z" id="stripes" fill="#5970A0"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                <div class="customer-line__count">${quantity}</div>
            </div>
            <div class="customer-line__item-text">
                <div class="customer-line__item-time">${time}</div>
                <div class="customer-line__item-id">#${id}</div>
            </div>
        `;
    }
}

const customerLine = new CustomerLine();
customerLine.addingWithoutTimeout(14);
customerLine.adding();


const faqItems = document.querySelectorAll('.screen4__faq-item');


const toggleFaqItems = (el, forciblyClose) => {
    const block = el.querySelector('.screen4__faq-item-content');
    const text = el.querySelector('.screen4__faq-item-text');
    const blockStyle = window.getComputedStyle(block);
    if(blockStyle.getPropertyValue('height')==='0px' && !forciblyClose){
        const height = text.offsetHeight;
        block.style.height = `${height}px`;
        el.classList.add('is-open');
    }else{
        block.style.height = '0px';
        el.classList.remove('is-open');
    }
};



faqItems.forEach((el) => {
    const top = el.querySelector('.screen4__faq-item-top');
    top.addEventListener('click', () => {
        //if(window.innerWidth < MOBILE_WIDTH ){
        faqItems.forEach((el) => {
            toggleFaqItems(el,true);
        });
        //}
        toggleFaqItems(el);
    });
});

//if(window.innerWidth >= MOBILE_WIDTH ){
// window.addEventListener('load', () => {
//     faqItems.forEach((el) => {
//         toggleFaqItems(el);
//     });
// });
// }else{
//     toggleFaqItems(faqItems[2]);
// }

toggleFaqItems(faqItems[2]);

const promocode = document.querySelector('.form__promocode-button span');
const tooltip = document.querySelector('.tooltip');
const tooltipButton = tooltip.querySelector('.tooltip__visual-state');
const tooltipInput = tooltip.querySelector('.tooltip__input');

const applyPromocode = () => {
    formData.promocode = tooltipInput.value.trim().toUpperCase();
    promocode.innerHTML = formData.promocode;
    if(formData.promocode === ''){
        formData.promocode = null;
        promocode.innerHTML = 'Enter promocode';
    }
};

tooltipButton.addEventListener('click', (e) => {
    e.preventDefault();
    applyPromocode();
});

tooltipInput.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
        applyPromocode();
    }
});
tooltipInput.addEventListener('input', (e) => {
    if(tooltipInput.value.length > 22){
        tooltipInput.value = tooltipInput.value.slice(0,20);
    }
});

promocode.addEventListener('click', () => {
    tooltip.classList.toggle('is-showed');
    tooltipInput.focus();
    const fn = (e) => {
        if(e.target !== tooltip && !tooltip.contains(e.target) && e.target !== promocode || e.target === tooltipButton){
            tooltip.classList.remove('is-showed');
            window.removeEventListener('click', fn);
        }
    };
    setTimeout(()=>window.addEventListener('click', fn));
});

const copyTextareaBtn = document.querySelector('.popup-review__copy-email');

copyTextareaBtn.addEventListener('click', () => {
    const copyTextarea = document.querySelector('.popup-review__email input');
    copyTextarea.select();
    const clone = copyTextarea.cloneNode();
    document.execCommand('copy');
    const parent = copyTextarea.parentNode;
    parent.removeChild(copyTextarea);
    parent.appendChild(clone);
});

const button3 = document.querySelector('.button3');
const popupReview = document.querySelector('.popup-review');
const popupReviewCross = document.querySelector('.popup-review__cross');

button3.addEventListener('click', () => {
    popupReview.classList.add('is-show');
});
popupReviewCross.addEventListener('click', () => {
    popupReview.classList.remove('is-show');
});

