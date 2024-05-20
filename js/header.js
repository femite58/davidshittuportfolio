let path = pPath || '../';
document.write(`
<!-- Google tag (gtag.js) -->
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-TBNYGRHMNN"></script> -->
<script>
  // window.dataLayer = window.dataLayer || [];
  // function gtag(){dataLayer.push(arguments);}
  // gtag('js', new Date());

  // gtag('config', 'G-TBNYGRHMNN');
</script>
        <link rel="preload" as="font" href="${path}assets/fonts/CircularStd-Bold.woff2" crossorigin />
        <link rel="preload" as="font" href="${path}assets/fonts/CircularStd-Black.woff2" crossorigin />
        <link rel="preload" as="font" href="${path}assets/fonts/CircularStd-Book.woff2" crossorigin />
        <link rel="preload" as="font" href="${path}assets/fonts/CircularStd-Medium.woff2" crossorigin />
        <link rel="stylesheet" href="${path}style.css" type="text/css" />
        <link rel="icon" href="${path}assets/images/favicon.png"/>
    </head>
    <body>
    
        <div id="loader" class="${page != 'home' ? 'done' : ''}">
            <div class="animating">
                Loading<span>.</span><span>.</span><span>.</span>
            </div>
            <div class="progress">
                <div class="indc"></div>
            </div>
            <div>I am only passionately curious - Albert Einstein</div>
        </div>
        <header class="${page.match(/bolt|increst/) ? 'dark' : ''}">
            <div class="bodyCont">
                <nav>
                    <a href="/" class="logo">
                        <img src="${path}assets/images/logo.svg" alt="David Shittu" />
                        <img src="${path}assets/images/logo_black.svg" alt="David Shittu" />
                    </a>
                    <div class="rightNav${page == 'home' ? '' : ' loaded'}">
                        <a href="mailto:davidshittu02@gmail.com?body=Hello%20David" target="_blank" class="primBtn">
                            <span>Reach Out</span>
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
                                    data-bg="#1E032A"
                                >
                                    <span>About me</span>
                                </a>
                                <a
                                    href="${path}index.html#works"
                                    class="eachMenuItem"
                                    data-color="#FFE604"
                                    data-bg="#0A0A84"
                                >
                                    <span>Works</span>
                                </a>
                                <div class="socialLinks">
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
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        `);
