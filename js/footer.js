const toggle = document.querySelector('#toggle');
const header = document.querySelector('header');
const menu = document.getElementById('menu');
const scrollTop = document.querySelector('#scrollTop');
const modal = document.getElementById('modal');
const modalClose = modal.getElementsByClassName('modalClose');
const modalOpeners = document.getElementsByClassName('openModal');
const modalImg = modal.getElementsByTagName('img')[1];

Array.from(modalClose).forEach((el) => {
    el.onclick = () => {
        modal.classList.remove('showModal');
        document.documentElement.style.overflow = '';
    };
});
Array.from(modalOpeners).forEach((el) => {
    el.onclick = () => {
        modalImg.src = el.src;
        modalImg.classList[el.src.match(/\.svg$/i) ? 'add' : 'remove'](
            'fullWidth'
        );
        modalImg.setAttribute('alt', el.getAttribute('alt'));
        modal.classList.add('showModal');
        document.documentElement.style.overflow = 'hidden';
    };
});

const fadeTransition = () => {
    for (let el of fadeUp) {
        let eachBc = el.getBoundingClientRect();
        let topAnim =
            el.getAttribute('data-topAnim') || window.innerHeight * 0.8; //450;
        if (eachBc.top <= topAnim) {
            el.classList.add('show');
        } else {
            el.classList.remove('show');
        }
    }
};

const scroll = ({ timingFunc, update, duration }) => {
    let now = performance.now();
    requestAnimationFrame(function animate(time) {
        let prog = (performance.now() - now) / duration;
        prog = prog > 1 ? 1 : prog;
        let movement = timingFunc(prog);
        update(movement);
        if (prog < 1) {
            requestAnimationFrame(animate);
        }
    });
};

const cusScrollTo = (selector, top = 0) => {
    let to = document.querySelector(`${selector}`);
    let bc = to.getBoundingClientRect();
    let diff = bc.top > top ? bc.top - top : top - bc.top;
    let initScrl = document.scrollingElement.scrollTop;
    let dir = bc.top > top ? 1 : -1;
    finalSc = initScrl + dir * diff;
    scroll({
        timingFunc: (t) => 1 - Math.pow(1 - t, 5),
        update: (movement) => {
            document.scrollingElement.scrollTo({
                top: initScrl + dir * diff * movement,
                behavior: 'instant',
            });
        },
        duration: 1000,
    });
};

window.scrollTo(0, 0);
window.onload = (e) => {
    // e.preventDefault();
    // return '';
};

let horScstickTop = window.innerHeight <= 625 ? 100 : 120;

let startPos = window.innerHeight;
let startPosT = 0;
let startPos2 = window.innerHeight / 2;
let startPosT2 = -50;
let endScrl2 = 0;
let endPos = 0;
let endPosT = 0;
let endScrl = window.innerWidth < 750 ? 0 : -500;
let startSc = 0.5;
let curSc = startSc;
let curTranslY = startPos;
let timer;

const fadeUp = document.querySelectorAll('.fadeAnim');
fadeTransition();

document.documentElement.style.setProperty(
    '--view-height',
    `${window.innerHeight}px`
);
document.documentElement.style.setProperty(
    '--scrollBarW',
    `${window.innerWidth - document.body.clientWidth}px`
);

const removeWorksFadeAnim = () => {
    if (window.innerWidth <= 600) {
        document
            .querySelectorAll('#works .fadeAnim')
            .forEach((el) => el.classList.remove('fadeAnim'));
    }
};

window.onresize = () => {
    document.documentElement.style.setProperty(
        '--view-height',
        `${window.innerHeight}px`
    );
    document.documentElement.style.setProperty(
        '--scrollBarW',
        `${window.innerWidth - document.body.clientWidth}px`
    );
};
scrollTop.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    finalSc = 0;
};
// if (page == 'home') {
//     setTimeout(() => {
//         const loader = document.querySelector('#loader');
//         loader.classList.add('done');
//         header.querySelector('.rightNav').classList.add('loaded');
//     }, 3000);
// }
// window.onload = () => {
// };

stopAnim = false;
animating = false;
let firstFrame;
let sndFrame;
let intv;

function animate({ timing, draw, duration }) {
    clearInterval(intv);
    let start = performance.now();
    // console.log('start', start);
    intv = setInterval(() => {
        let timeFraction = (performance.now() - start) / duration;
        // console.log(timeFraction, performance.now(), start);
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current animation state
        let progress = timing(timeFraction);

        draw(progress); // draw it
        // cancelAnimationFrame(sndFrame);
        if (timeFraction < 1) {
            // sndFrame = requestAnimationFrame(animate2);
        } else {
            clearInterval(intv);
        }
    });
    // setTimeout(() => {
    //     clearInterval(intv);
    // }, duration);
    return;

    firstFrame = requestAnimationFrame(function animate2(time) {
        // timeFraction goes from 0 to 1
        // cancelAnimationFrame(firstFrame);
        let timeFraction = (performance.now() - start) / duration;
        // console.log(timeFraction, performance.now(), start, time);
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current animation state
        let progress = timing(timeFraction);

        draw(progress); // draw it
        cancelAnimationFrame(sndFrame);
        if (timeFraction < 1) {
            sndFrame = requestAnimationFrame(animate2);
        } else {
            isWheel = false;
        }
    });
}

finalSc = 0;

window.addEventListener(
    'wheel',
    (e) => {
        // e.preventDefault();
        // let initSc = window.scrollY;
        // finalSc += e.deltaY;
        // isWheel = true;
        // let maxExt = document.documentElement.scrollHeight - window.innerHeight;
        // finalSc = finalSc < 0 ? 0 : finalSc >= maxExt ? maxExt : finalSc;
        // easeOut = (t) => {
        //     return 1 - Math.pow(1 - t, 5);
        //     // return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
        // };
        // animate({
        //     timing: easeOut,
        //     draw(chng) {
        //         let extent = finalSc - initSc;
        //         window.scrollTo({
        //             top: initSc + extent * chng,
        //         });
        //     },
        //     duration: 1500,
        // });
    },
    { passive: false }
);

let initScrollTop = window.scrollY;
let scrollDiff = 0;
toggle.onclick = () => {
    toggle.classList.toggle('opened');
    menu.classList.toggle('opened');
};

const scrlEl = window;
let scrolTimeout;
let isWheel = false;
let onScfinalSc = 0;
// contrastCheck();
scrlEl.addEventListener('scroll', (e) => {
    scrollDiff = scrlEl.scrollY - initScrollTop;
    initScrollTop = scrlEl.scrollY;
    // console.log('scrollTop');
    if (scrlEl.scrollY > 500) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
    if (scrlEl.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    if (page === 'home') {
        const works = document.querySelector('#works');
        worksBc = works.getBoundingClientRect();
        const headerBc = header.getBoundingClientRect();
        if (worksBc.top <= headerBc.height / 2) {
            header.classList.remove('transparent');
        } else {
            header.classList.add('transparent');
        }
    }
    fadeTransition();
});
