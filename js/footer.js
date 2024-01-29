document.write(`
<footer>
            <div class="bodyCont">
                <div class="dFlex">
                    <div class="smallPart">
                        <a href="/" class="logo">
                            <img
                                src="${path}assets/images/logo.svg"
                                alt="David Shittu"
                            />
                        </a>
                        <p>
                        Let’s create memorable experiences
                        together
                        </p>
                        <div class="expander"></div>
                        <div class="copyright">Soli Deo gloria</div>
                    </div>
                    <div class="largePart">
                        <a href="mailto:davidshittu02@gmail.com?body=Hello%2C%20David" target="_blank" class="eachClickable contact">
                            <span>Contact me</span>
                        </a>
                        <div class="socialLinks">
                            <div class="gridItem">
                                <a
                                    href="https://www.linkedin.com/in/davidshittu/"
                                    target="_blank"
                                    class="eachClickable"
                                >
                                    <div class="iconCont">
                                        <span
                                            class="svgIcon-linkedIn"
                                        ></span>
                                    </div>
                                    <div class="txt">LinkedIn</div>
                                </a>
                            </div>
                            <div class="gridItem">
                                <a
                                    href="https://dribbble.com/SDavid"
                                    target="_blank"
                                    class="eachClickable"
                                >
                                    <div class="iconCont">
                                        <span
                                            class="svgIcon-dribble"
                                        ></span>
                                    </div>
                                    <div class="txt">Dribbble</div>
                                </a>
                            </div>
                            <div class="gridItem">
                                <a
                                    href="https://davidshittu.medium.com/"
                                    target="_blank"
                                    class="eachClickable"
                                >
                                    <div class="iconCont">
                                        <span
                                            class="svgIcon-medium"
                                        ></span>
                                    </div>
                                    <div class="txt">Medium</div>
                                </a>
                            </div>
                            <div class="gridItem">
                                <a
                                    href="https://www.behance.net/sodiqshittu"
                                    target="_blank"
                                    class="eachClickable"
                                >
                                    <div class="iconCont">
                                        <span
                                            class="svgIcon-behance"
                                        ></span>
                                    </div>
                                    <div class="txt">Behance</div>
                                </a>
                            </div>
                            <div class="gridItem">
                                <a
                                    href="https://twitter.com/shittu_david"
                                    target="_blank"
                                    class="eachClickable"
                                >
                                    <div class="iconCont">
                                        <span
                                            class="svgIcon-twitter"
                                        ></span>
                                    </div>
                                    <div class="txt">Twitter</div>
                                </a>
                            </div>
                        </div>
                        <div class="copyright">Soli Deo gloria</div>
                    </div>
                </div>
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
    greenBgs = document.querySelectorAll('.greenBg');
if (page == 'home') {
    innerHScroll = horizontalScroll?.querySelector('#innerHorizontalScroll');
    goodDesignH2 = goodDesign?.querySelector('h2');
    goodDesignH2Adj = goodDesign?.querySelector('h2.adjusted');
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
window.onmousemove = (e) => {
    customCursor.style.cssText = `top: ${e.y}px; left: ${e.x}px;`;
    contrastCursor();
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
    item.onmouseover = () => {
        let color = item.getAttribute('data-color');
        let bg = item.getAttribute('data-bg');
        item.style.color = color;
        menu.style.backgroundColor = bg;
    };
    item.onmouseout = () => {
        item.style.color = '';
        menu.style.backgroundColor = '';
    };
});
scrollTop.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

let initScrollTop = window.scrollY;
let scrollDiff = 0;
toggle.onclick = () => {
    toggle.classList.toggle('opened');
    menu.classList.toggle('opened');
};

const scrlEl = window;
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
    contrastCheck();
    fadeTransition();
    if (page == 'home') {
        scrollCheck(e);
        scrollZoomEffect(e);
    }
});

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
