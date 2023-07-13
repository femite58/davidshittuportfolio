let path = pPath || '../';
document.write(`
        <link rel="stylesheet" href="${path}style.css" />
        <link rel="icon" href="${path}assets/images/favicon.png"/>
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
                        <a href="mailto:davidshittu02@gmail.com?body=Hello%2C%20David" target="_blank" class="borderedBtn">
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
                                    data-color="#18FF04"
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
                                    href="${path}index.html#horizontalScroll"
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
                                    <a href="mailto:davidshittu02@gmail.com?body=Hello%2C%20David" target="_blank" class="eachClickable contact">
                                        <span>Contact me</span>
                                        <span
                                            class="svgIcon-boxDiagonalArrow"
                                        ></span>
                                    </a>
                                </div>
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
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        <span id="customCursor" class="svgIcon-customCursor"></span>`);
