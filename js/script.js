'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');


///////////////////////////////////////
// Modal window

const openModal = function(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});


///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function(e) {
    e.preventDefault();
    section1.scrollIntoView({ behavior: 'smooth' });
});


///////////////////////////////////////
// Page navigation

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }


});

///////////////////////////////////////
// Tabbed component
tabsContainer.addEventListener('click', function(e) {
    e.preventDefault();
    const clicked = e.target.closest('.operations__tab');

    // Guard clause 
    if (!clicked) return;

    // Active tab
    tabs.forEach(t => t.classList
        .remove('operations__tab--active'));

    clicked.classList
        .add('operations__tab--active');


    // Activate content area
    // console.log(clicked.dataset.tab); // data-* in HTML
    tabsContent.forEach(c => c.classList
        .remove('operations__content--active'));

    document.querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');

});

///////////////////////////////////////
// Menu fade animation
const handleHover = function(e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
}

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


///////////////////////////////////////
// Sticky navigation : NOT EFFICIENT!!!
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function() {
//     if (window.scrollY > initialCoords.top)
//         nav.classList.add('sticky');
//     else nav.classList.remove('sticky');
// });

// Sticky navigation: Intersection Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);


///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(function(section) {
    section.classList.add('section--hidden');
    sectionObserver.observe(section);
});


/////////////////////////////////////
// LECTURES
/////////////////////////////////////

/* // Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');
console.log(allSection);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));


// Creating and inserting elements

// header.insertAdjacentHTML('beforeend', `
// <div class="cookie-message">We use cookied for improved functionality and analytics.
// <button class="btn btn--close-cookie">Got it!</button>
// </div>`);
// //////////////////////////////////////////////////

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML = 'We use cookied for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message)


// Delete elements
document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function() {
        message.remove();
    });


`//------------------------------------------
// Style
message.style.backgroundColor = '#37383d';
message.style.width = '105%';

console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).color);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', '#5ec576');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('a');
logo.classList.remove('b');
logo.classList.toggle('c');
logo.classList.contains('d'); // not includes

//DON'T USE
// logo.className = 'jonas'; 


//------------------------------------------
btnScrollTo.addEventListener('click', function(e) {
    e.preventDefault();

        const s1coords = section1.getBoundingClientRect();
        console.log(s1coords);
        console.log(e.target.getBoundingClientRect());
        console.log('Current scroll (X,Y)', window.pageXOffset, window.pageYOffset);
        console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

        // Scrolling
        window.scrollTo(
            s1coords.left + window.pageXOffset,
            s1coords.top + window.pageYOffset
        );

        window.scrollTo({
            left: s1coords.left + window.pageXOffset,
            top: s1coords.top + window.pageYOffset,
            behavior: 'smooth'
        });

    });

    const h1 = document.querySelector('h1');
    
    const alerth1 = function(e) {
        alert('addEventListener: Great! You are reading the heading');
    
        h1.removeEventListener('mouseenter', alerth1);
    };
    
    h1.addEventListener('mouseenter', alerth1);
    
    // h1.onmouseenter = function(e) {
    //     alert('onmouseenter: Great! You are reading the heading');
    // };
    
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    
    const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
    
    console.log(randomColor());
    console.log(randomColor());
    console.log(randomColor());
    
    document.querySelector('.nav__link').addEventListener('click', function(){
    
    })  


//------------------------------------------
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';


// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el) {
    if (el !== h1) el.style.transform = 'scale(0.5)';
}) 


// Page Navigation old-version
document.querySelectorAll('.nav__link').forEach(function(el) {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    });
}); */