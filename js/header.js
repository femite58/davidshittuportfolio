let path = pPath || '../';
document.write(`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>David Shittu</title>
        <link rel="stylesheet" href="${path}style.css" />
    </head>
    <body>
        <div id="loader">
            <div class="animating">
                LOADING<span>.</span><span>.</span><span>.</span>
            </div>
            <div class="progress">
                <div class="indc"></div>
            </div>
            <div>I am only passionately curious - Albert Einstein</div>
        </div>
        <header>
            <div class="bodyCont">
                <nav>
                    <a href="/" class="logo">
                        <img src="${path}assets/images/logo.svg" alt="David Shittu" />
                    </a>
                    <div class="rightNav">
                        <a href="#" class="borderedBtn">
                            <span>Contact me</span>
                            <span class="svgIcon-boxDiagonalArrow"></span>
                        </a>
                        <div id="toggle">
                            <div class="innerToggle">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div id="menu">
                            <div class="bodyCont">
                                <div class="topHead">
                                    <a href="/" class="logo">
                                        <img
                                            src="${path}assets/images/logo.svg"
                                            alt="David Shittu"
                                        />
                                    </a>
                                </div>
                                <a
                                    href="/"
                                    class="eachMenuItem"
                                    data-color="#7CD434"
                                    data-bg="#010321"
                                >
                                    <span>Home</span>
                                </a>
                                <a
                                    href="${path}about.html"
                                    class="eachMenuItem"
                                    data-color="#E97246"
                                    data-bg="#3D1555"
                                >
                                    <span>About me</span>
                                </a>
                                <a
                                    href="javascript:void(0)"
                                    class="eachMenuItem"
                                    data-color="#FFE604"
                                    data-bg="#1B16AD"
                                >
                                    <span>Works</span>
                                </a>
                                <div>
                                    <span>Don't be shy, say hello :)</span>
                                </div>
                                <div class="contactCont">
                                    <a href="#" class="eachClickable contact">
                                        <span>Contact me</span>
                                        <span
                                            class="svgIcon-boxDiagonalArrow"
                                        ></span>
                                    </a>
                                </div>
                                <div class="socialLinks">
                                    <div class="gridItem">
                                        <a
                                            href="https://www.linkedin.com/in/davidshittu"
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
                                            href="https://www.linkedin.com/in/davidshittu"
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
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>`);
