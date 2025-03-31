const svgIconEls = document.querySelectorAll('[class="svgIcon"]');
const savedSvgs = {};
(async () => {
    for (let svgEl of svgIconEls) {
        const src = svgEl.getAttribute('data-src');
        svgEl.innerHTML = savedSvgs[src] || (await (await fetch(src)).text());
    }
})();
