// Récupère le DOM correspondant à la barre de navigation
const burgerMenu = document.querySelector('nav');

// Récupère le DOM correspondant à la croix de fermeture
const closeBtn = burgerMenu.querySelector('a.close-btn');

// Récupère le DOM correspondant au bouton "burger"
const openBtn = document.querySelector('a.open-btn');

console.log(burgerMenu, closeBtn, openBtn);

openBtn.addEventListener('click', function (e) {
    e.preventDefault(); 

    burgerMenu.classList.add('visible');
});

closeBtn.addEventListener('click', function (e) {
    e.preventDefault(); 

    burgerMenu.classList.remove('visible');
});

burgerMenu.addEventListener('click', function (e) {
    if (e.target.classList.contains('link')) {
        burgerMenu.classList.remove('visible');
    }
});


const header = document.querySelector('header');
const navContainer = document.querySelector('.nav-container');



const headerOptions = {
    threshold: [0.7]
};

const headerObserver = new IntersectionObserver(function(entries, headerObserver) {
    entries.forEach(entry => {
        if (entry.intersectionRatio < 0.7) {
            navContainer.classList.add('scrolled');
        } else {
            navContainer.classList.remove('scrolled');
        }
    });
}, headerOptions);

headerObserver.observe(header);
