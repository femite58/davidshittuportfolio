document.write(`
<div id="endGif">
<img src="../assets/images/giphy.webp" alt="The End" />
</div>
<div id="pageCtrl">
<a href="${prev}" class="eachCtrl ${prev ? '' : 'hidden'}">
    <span class="svgIcon-smallArrowLeft"></span>
    <span>Previous</span>
</a>
<a href="${next}" class="eachCtrl ${next ? '' : 'hidden'}">
    <span>Next</span>
    <span class="svgIcon-smallArrowRight"></span>
</a>
</div>`);
