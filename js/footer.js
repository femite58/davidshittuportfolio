document.write(`
<footer>
            <div class="bodyCont">
                <div class="dFlex">
                    <div class="smallPart">
                        <a href="/" class="logo">
                            <img
                                src="${path}assets/images/logo_full.svg"
                                alt="David Shittu"
                            />
                        </a>
                    </div>
                    <div class="largePart socialLinks">
                        <div class="eachCol">
                            <a
                                href="https://www.linkedin.com/in/davidshittu/"
                                target="_blank"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://twitter.com/shittu_david"
                                target="_blank"
                            >
                                
                                Twitter
                            </a>
                        </div>
                        <div class="eachCol">
                            <a
                                href="https://dribbble.com/SDavid"
                                target="_blank"
                            >
                                Dribbble
                            </a>
                            <a
                                href="https://www.behance.net/sodiqshittu"
                                target="_blank"
                            >
                                Behance
                            </a>
                        </div>
                        <div class="eachCol">
                            <a
                                href="https://davidshittu.medium.com/"
                                target="_blank"
                            >
                                Blog
                            </a>
                            <a
                                href="https://drive.google.com/file/d/1ByB-HiSNoeXRfFdg33ebhjNqVuQToYgu/view"
                                target="_blank"
                            >
                                Recommendations
                            </a>
                        </div>
                    </div>
                    <div class="btnCont">
                        <a
                        href="mailto:davidshittu02@gmail.com?body=Hello%20David"
                        target="_blank"
                        class="primBtn"
                        >Reach Out</a>
                        <a href="https://drive.google.com/file/d/1t1SvbkPumg9tYamr5i7Mzph5D4bOBYdH/view?usp=sharing"
                        target="_blank" class="borderedBtn">Resume</a>
                    </div>
                </div>
                <div class="copyright"><span class="svgIcon-copyright"></span> ${new Date().getFullYear()}</div>
            </div>
        </footer>
        <div id="scrollTop">
            <span class="svgIcon-arrowUp"></span>
        </div>
        <script src="${path}js/svgIcons.js"></script>
    </body>
</html>
`);
const toggle = document.querySelector('#toggle');
const header = document.querySelector('header');
const scrollTop = document.querySelector('#scrollTop');
const menu = header.querySelector('#menu');
const menuItems = menu.querySelectorAll('.eachMenuItem');
const customCursor = document.querySelector('#customCursor');

const horizontalScroll = document.querySelector('#horizontalScrollNoPad');
let innerHScroll;
const goodDesign = document.querySelector('#goodDesign');
let goodDesignH2,
    goodDesignH2Adj,
    greenBgs = document.querySelectorAll('.greenBg'),
    worksSect,
    works;
if (page == 'home') {
    innerHScroll = horizontalScroll?.querySelector('#innerHorizontalScroll');
    goodDesignH2 = goodDesign?.querySelector('h2');
    goodDesignH2Adj = goodDesign?.querySelector('h2.adjusted');
    worksSect = document.querySelector('#works');
    works = worksSect.querySelectorAll('.eachWork');
}
// onpopstate = (e) => {
//     console.log(e);
// };
menuItems.forEach((m) => {
    m.onclick = (e) => {
        // e.preventDefault();
        // history.pushState({ page: 'about' }, 'Title', 'about');
        menu.classList.remove('opened');
        toggle.classList.remove('opened');
    };
});

// history.scrollRestoration = 'manual';

window.onbeforeunload = (e) => {
    // e.preventDefault();
    window.scrollTo(0, 0);
    // return '';
};

function contrastCursor() {
    let cursBc = customCursor.getBoundingClientRect();
    greenBgs.forEach((g) => {
        let bc = g.getBoundingClientRect();
        let h = +getComputedStyle(
            g,
            g.classList.contains('before') ? ':before' : null
        ).height.replace('px', '');
        if (
            bc.top <= cursBc.top &&
            bc.top + h > cursBc.bottom - cursBc.height * 0.5
        ) {
            customCursor.classList.add('dark');
        } else {
            customCursor.classList.remove('dark');
        }
        if (menu.classList.contains('opened')) {
            customCursor.classList.remove('dark');
        }
    });
}

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
if (page == 'home') {
    initiateHorzScrlEl();
}
window.onresize = () => {
    document.documentElement.style.setProperty(
        '--view-height',
        `${window.innerHeight}px`
    );
    document.documentElement.style.setProperty(
        '--scrollBarW',
        `${window.innerWidth - document.body.clientWidth}px`
    );
    if (page == 'home') {
        initiateHorzScrlEl();
    }
};
menuItems.forEach((item) => {
    // item.onmouseover = () => {
    //     let color = item.getAttribute('data-color');
    //     let bg = item.getAttribute('data-bg');
    //     item.style.color = color;
    //     menu.style.backgroundColor = bg;
    // };
    // item.onmouseout = () => {
    //     item.style.color = '';
    //     menu.style.backgroundColor = '';
    // };
});
scrollTop.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    finalSc = 0;
};
if (page == 'home') {
    setTimeout(() => {
        const loader = document.querySelector('#loader');
        loader.classList.add('done');
        header.querySelector('.rightNav').classList.add('loaded');
    }, 3000);
}
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
        // clearInterval(intv);
        // console.log(e.deltaY);
        // return;
        // cancelAnimationFrame(sndFrame);
        // cancelAnimationFrame(firstFrame);
        e.preventDefault();
        let initSc = window.scrollY;
        // console.log(finalSc, onScfinalSc);
        // if (finalSc != onScfinalSc) {
        //     finalSc = onScfinalSc;
        // }
        finalSc += e.deltaY;
        isWheel = true;
        let maxExt = document.documentElement.scrollHeight - window.innerHeight;

        finalSc = finalSc < 0 ? 0 : finalSc >= maxExt ? maxExt : finalSc;
        easeOut = (t) => {
            return 1 - Math.pow(1 - t, 5);
            // return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
        };
        animate({
            timing: easeOut,
            draw(chng) {
                let extent = finalSc - initSc;
                window.scrollTo({
                    top: initSc + extent * chng,
                });
            },
            duration: 1500,
        });
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
contrastCheck();
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
    // contrastCheck();
    fadeTransition();
    if (page == 'home') {
        // scrollCheck(e);
        // scrollZoomEffect(e);
        workColorTransition();
    } else {
        scrollSpy();
    }

    onScfinalSc = window.scrollY;
    const otherBody = document.querySelector('#otherBody');
    if (otherBody) {
        let bc = otherBody.getBoundingClientRect();
        if (bc.top < (window.innerWidth <= 600 ? 32 : 80)) {
            header.classList.remove('dark');
        } else if (!page.match(/home|nachonacho/)) {
            header.classList.add('dark');
        }
    }
});

function scrollSpy() {
    navLinks.forEach((n) => {
        let par = document.querySelector(n.getAttribute('href'));
        let pbc = par.getBoundingClientRect();
        if (
            pbc.top <= window.innerHeight * 0.3 &&
            (pbc.bottom > window.innerHeight * 0.5 ||
                (pbc.height < window.innerHeight && pbc.bottom > pbc.height))
        ) {
            navLinks.forEach((_n) => _n.classList.remove('active'));
            n.classList.add('active');
            // n.scrollIntoView();
            let nbc = n.getBoundingClientRect();
            if (
                nbc.right > n.parentElement.parentElement.offsetWidth ||
                nbc.left < 15
            ) {
                n.parentElement.parentElement.scrollTo({ left: n.offsetLeft });
            }
        }
    });
}

const workColorTransition = () => {
    works.forEach((w) => {
        let wbc = w.getBoundingClientRect();
        if (
            wbc.top <= window.innerHeight * 0.4 &&
            wbc.bottom > window.innerHeight * 0.4
        ) {
            worksSect.style.backgroundColor = w.getAttribute('data-bg');
        }
    });
};

function contrastCheck() {
    greenBgs.forEach((g) => {
        let h = +getComputedStyle(
            g,
            g.classList.contains('before') ? ':before' : null
        ).height.replace('px', '');
        let bc = g.getBoundingClientRect();
        let hBc = header.getBoundingClientRect();
        let scBc = scrollTop.getBoundingClientRect();
        let cursBc = customCursor.getBoundingClientRect();
        if (bc.top <= scBc.top && bc.top + h > scBc.bottom - scBc.height) {
            scrollTop.classList.add('dark');
        } else {
            scrollTop.classList.remove('dark');
        }
        if (
            bc.top <= hBc.top + hBc.height * 0.5 &&
            bc.top + h > hBc.bottom - hBc.height * 0.5
        ) {
            header.classList.add('dark');
        } else {
            header.classList.remove('dark');
        }
        if (
            bc.top <= cursBc.top &&
            bc.top + h > cursBc.bottom - cursBc.height * 0.5
        ) {
            customCursor.classList.add('dark');
        } else {
            customCursor.classList.remove('dark');
        }
        if (menu.classList.contains('opened')) {
            customCursor.classList.remove('dark');
        }
    });
}

function fadeTransition() {
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
}

function initiateHorzScrlEl() {
    // if (window.innerWidth >= 750) {
    //     const works = horizontalScroll.querySelectorAll('.eachWork');
    //     const added = horizontalScroll.querySelectorAll('.added');
    //     for (let i = 0; i < works.length; i++) {
    //         let div = added.length ? added[i] : document.createElement('div');
    //         if (!added.length) {
    //             div.classList.add('added');
    //         }
    //         div.style.height =
    //             i == works.length - 1
    //                 ? `${
    //                       +getComputedStyle(works[i]).height.replace('px', '') +
    //                       0
    //                   }px`
    //                 : getComputedStyle(works[i]).width;
    //         if (!added.length) {
    //             horizontalScroll.appendChild(div);
    //         }
    //     }
    // }
}

function scrollZoomEffect(e) {
    // let gdB = goodDesign.getBoundingClientRect();
    // let gdH2B = goodDesignH2.getBoundingClientRect();
    // startPos = window.innerHeight;
    // endPos =
    //     window.innerHeight -
    //     gdH2B.height -
    //     122 +
    //     (window.innerWidth < 750 ? 100 : 100);
    // endScrl =
    //     (gdB.height -
    //         window.innerHeight -
    //         (window.innerWidth < 750 ? 100 : 100)) *
    //     -1;
    // let topStart = window.innerWidth < 750 ? 200 : 450;
    // let scrlExt = gdB.height - window.innerHeight; // topStart - endScrl;
    // let leftTxt = goodDesign.querySelector('.leftTxt');
    // let rightDivs = goodDesign.querySelectorAll('.rightPart > div');
    // let finalTop, finalTranslY;
    // let scrlSt = window.innerHeight;
    // let endScrlh2 = 92;
    // if (gdB.top <= scrlSt) {
    //     finalTop =
    //         ((gdB.top - endScrlh2) * (startPos - startPos2)) /
    //             (scrlSt - endScrlh2) +
    //         startPos2;
    //     finalTranslY =
    //         ((gdB.top - endScrlh2) * (startPosT - startPosT2)) /
    //             (scrlSt - endScrlh2) +
    //         startPosT2;
    //     goodDesignH2Adj.style.cssText = `top: ${finalTop}px; width: ${gdH2B.width}px; transform: translate(-50%, ${finalTranslY}%) scale(${curSc});`;
    // }
    // if (gdB.top <= topStart) {
    //     if (gdB.top >= endScrl) {
    //         let finalSc =
    //             ((startSc - 1) * (gdB.top - endScrl)) / (topStart - endScrl) +
    //             1;
    //         if (gdB.top <= endScrlh2) {
    //             finalTop =
    //                 ((gdB.top - endScrl) * (startPos2 - endPos)) /
    //                     (endScrlh2 - endScrl) +
    //                 endPos;
    //             finalTranslY =
    //                 ((gdB.top - endScrl) * (startPosT2 - 0)) /
    //                     (endScrlh2 - endScrl) +
    //                 0;
    //         }
    //         goodDesignH2Adj.style.cssText = `top: ${finalTop}px; width: ${gdH2B.width}px; transform: translate(-50%, ${finalTranslY}%) scale(${finalSc});`;
    //         curSc = finalSc;
    //         curTranslY = finalTranslY;
    //         leftTxt.classList.remove('show');
    //         rightDivs.forEach((div) => {
    //             div.classList.remove('show');
    //         });
    //     } else {
    //         goodDesignH2Adj.style.cssText = `position: absolute; bottom: 122px; width: ${gdH2B.width}px; top: unset; transform: translate(-50%, 0px) scale(1);`;
    //         leftTxt.classList.add('show');
    //         rightDivs.forEach((div) => {
    //             div.classList.add('show');
    //         });
    //         // }, 100);
    //     }
    // } else {
    //     if (gdB.top <= scrlSt) {
    //         finalTop =
    //             ((gdB.top - endScrlh2) * (startPos - startPos2)) /
    //                 (scrlSt - endScrlh2) +
    //             startPos2;
    //         finalTranslY =
    //             ((gdB.top - endScrlh2) * (startPosT - startPosT2)) /
    //                 (scrlSt - endScrlh2) +
    //             startPosT2;
    //         goodDesignH2Adj.style.cssText = `top: ${finalTop}px; width: ${gdH2B.width}px; transform: translate(-50%, ${finalTranslY}%) scale(${curSc});`;
    //     } else {
    //         goodDesignH2Adj.style.cssText = '';
    //     }
    // }
}

function scrollCheck(e) {
    // if (window.innerWidth < 750) return;
    // let hs = horizontalScroll.getBoundingClientRect();
    // let top = hs.top;
    // if (top <= horScstickTop) {
    //     let ihsB = innerHScroll.getBoundingClientRect();
    //     if (hs.bottom <= horScstickTop + ihsB.height) {
    //         innerHScroll.classList.remove('stick');
    //         innerHScroll.classList.add('scrollTogether');
    //         innerHScroll.scrollLeft =
    //             innerHScroll.scrollWidth - innerHScroll.clientWidth;
    //     } else {
    //         innerHScroll.classList.add('stick');
    //         innerHScroll.classList.remove('scrollTogether');
    //         innerHScroll.scrollLeft = innerHScroll.scrollLeft + scrollDiff;
    //     }
    // } else {
    //     innerHScroll.classList.remove('stick');
    //     innerHScroll.scrollLeft = 0;
    // }
}
let navLinks = document.querySelectorAll('#otherBody nav .eachLink');
navLinks.forEach((n) => {
    n.onclick = () => {
        cusScrollTo(n.getAttribute('href'), window.innerWidth < 600 ? 140 : 86);
        navLinks.forEach((_n) => _n.classList.remove('active'));
        n.classList.add('active');
    };
});
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

function cusScrollTo(selector, top = 0) {
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
}
