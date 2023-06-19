document.write(`
<footer>
            <div class="bodyCont">
                <div class="dFlex">
                    <div class="smallPart">
                        <a href="#" class="logo">
                            <img
                                src="${path}assets/images/logo.svg"
                                alt="David Shittu"
                            />
                        </a>
                        <p>
                            Let’s create unforgettable beautiful experiences
                            together
                        </p>
                        <div class="expander"></div>
                        <div class="copyright">Soli Deo gloria</div>
                    </div>
                    <div class="largePart">
                        <a href="#" class="eachClickable contact">
                            <span>Contact me</span>
                            <span class="svgIcon-boxDiagonalArrow"></span>
                        </a>
                        <div class="socialLinks">
                            <div class="gridItem">
                                <a href="#" class="eachClickable">
                                    <div class="iconCont">
                                        <span class="svgIcon-linkedIn"></span>
                                    </div>
                                    <div class="txt">LinkedIn</div>
                                </a>
                            </div>
                            <div class="gridItem">
                                <a href="#" class="eachClickable">
                                    <div class="iconCont">
                                        <span class="svgIcon-behance"></span>
                                    </div>
                                    <div class="txt">Behance</div>
                                </a>
                            </div>
                            <div class="gridItem">
                                <a href="#" class="eachClickable">
                                    <div class="iconCont">
                                        <span class="svgIcon-dribble"></span>
                                    </div>
                                    <div class="txt">Dribbble</div>
                                </a>
                            </div>
                            <div class="gridItem">
                                <a href="#" class="eachClickable">
                                    <div class="iconCont">
                                        <span class="svgIcon-medium"></span>
                                    </div>
                                    <div class="txt">Medium</div>
                                </a>
                            </div>
                            <div class="gridItem">
                                <a href="#" class="eachClickable">
                                    <div class="iconCont">
                                        <span class="svgIcon-twitter"></span>
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
console.log(page);
const toggle = document.querySelector('#toggle');
const header = document.querySelector('header');
const scrollTop = document.querySelector('#scrollTop');
const menu = header.querySelector('#menu');
const menuItems = menu.querySelectorAll('.eachMenuItem');

const horizontalScroll = document.querySelector('#horizontalScrollNoPad');
let innerHScroll;
const goodDesign = document.querySelector('#goodDesign');
let goodDesignH2;
if (page == 'home') {
    innerHScroll = horizontalScroll?.querySelector('#innerHorizontalScroll');
    goodDesignH2 = goodDesign?.querySelector('h2');
}

let horScstickTop = window.innerHeight <= 625 ? 100 : 120;

let startPos = window.innerWidth < 750 ? -840 : -2000;
let endScrl = window.innerWidth < 750 ? 0 : -500;
let startSc = 0.5;
let curSc = startSc;
let curTranslY = startPos;
let timer;

const fadeUp = document.querySelectorAll('.fadeUp');
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
    initiateHorzScrlEl();
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
window.onload = () => {
    setTimeout(() => {
        const loader = document.querySelector('#loader');
        loader.classList.add('done');
        header.querySelector('.rightNav').classList.add('loaded');
    }, 3000);
};

let initScrollTop = window.scrollY;
let scrollDiff = 0;
toggle.onclick = () => {
    toggle.classList.toggle('opened');
    menu.classList.toggle('opened');
};

const scrlEl = window;
scrlEl.addEventListener('scroll', (e) => {
    scrollDiff = scrlEl.scrollY - initScrollTop;
    initScrollTop = scrlEl.scrollY;
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
    fadeTransition();
    if (page == 'home') {
        scrollCheck(e);
        scrollZoomEffect(e);
    }
});

function fadeTransition() {
    for (let el of fadeUp) {
        let eachBc = el.getBoundingClientRect();
        console.log(eachBc.top);
        if (eachBc.top <= 400) {
            el.classList.add('show');
        } else {
            el.classList.remove('show');
        }
    }
}

function initiateHorzScrlEl() {
    startPos = window.innerWidth < 750 ? -840 : -2000;
    endScrl = window.innerWidth < 750 ? 0 : -500;
    if (window.innerWidth >= 750) {
        const works = horizontalScroll.querySelectorAll('.eachWork');
        const added = horizontalScroll.querySelectorAll('.added');
        for (let i = 0; i < works.length; i++) {
            let div = added.length ? added[i] : document.createElement('div');
            if (!added.length) {
                div.classList.add('added');
            }
            div.style.height =
                i == works.length - 1
                    ? `${
                          +getComputedStyle(works[i]).height.replace('px', '') +
                          0
                      }px`
                    : getComputedStyle(works[i]).width;
            if (!added.length) {
                horizontalScroll.appendChild(div);
            }
        }
    }
}

function scrollZoomEffect(e) {
    startPos = window.innerWidth < 750 ? -840 : -2000;
    endScrl = window.innerWidth < 750 ? 0 : -500;
    let gdB = goodDesign.getBoundingClientRect();
    let topStart = window.innerWidth < 750 ? 200 : 450;
    let scrlExt = topStart - endScrl;
    let leftTxt = goodDesign.querySelector('.leftTxt');
    let rightDivs = goodDesign.querySelectorAll('.rightPart > div');
    const bodyCont = goodDesign.querySelector('.bodyCont');
    let topCheck = window.innerWidth < 750 ? 300 : 600;
    if (gdB.top <= topCheck) {
        bodyCont.classList.add('show');
    } else {
        bodyCont.classList.remove('show');
    }
    if (timer) {
        clearTimeout(timer);
    }
    if (gdB.top <= topStart) {
        if (gdB.top >= endScrl) {
            let scaleDiff = ((scrollDiff * (1 - startSc)) / scrlExt) * 1;
            let transDiff = ((scrollDiff * startPos * -1) / scrlExt) * 1;
            let finalSc = curSc + scaleDiff;
            let finalTranslY = curTranslY + transDiff;
            console.log(finalTranslY);
            finalSc = finalSc > 1 ? 1 : finalSc < startSc ? startSc : finalSc;
            finalTranslY =
                finalTranslY < startPos
                    ? startPos
                    : finalTranslY > 0
                    ? 0
                    : finalTranslY;
            goodDesignH2.style.transform = `scale(${finalSc}) translate(0, ${finalTranslY}px)`;
            curSc = finalSc;
            curTranslY = finalTranslY;
            leftTxt.classList.remove('show');
            rightDivs.forEach((div) => {
                div.classList.remove('show');
            });
        } else {
            goodDesignH2.style.transform = `scale(1) translate(0, 0px)`;
            leftTxt.classList.add('show');
            timer = setTimeout(() => {
                rightDivs.forEach((div) => {
                    div.classList.add('show');
                });
            }, 100);
        }
    } else {
        goodDesignH2.style.transform = `scale(${startSc}) translate(0, ${startPos}px)`;
    }
}

function scrollCheck(e) {
    if (window.innerWidth < 750) return;
    let hs = horizontalScroll.getBoundingClientRect();
    let top = hs.top;
    if (top <= horScstickTop) {
        let ihsB = innerHScroll.getBoundingClientRect();
        if (hs.bottom <= horScstickTop + ihsB.height) {
            innerHScroll.classList.remove('stick');
            innerHScroll.classList.add('scrollTogether');
            innerHScroll.scrollLeft =
                innerHScroll.scrollWidth - innerHScroll.clientWidth;
        } else {
            innerHScroll.classList.add('stick');
            innerHScroll.classList.remove('scrollTogether');
            innerHScroll.scrollLeft = innerHScroll.scrollLeft + scrollDiff;
        }
    } else {
        innerHScroll.classList.remove('stick');
        innerHScroll.scrollLeft = 0;
    }
}
