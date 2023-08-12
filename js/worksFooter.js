document.write(`
<a id="endGif" href="../assets/images/giphy.gif" target="_blank">
<img src="../assets/images/giphy.gif" alt="The End" />
</a>
<div id="pageCtrl">
<a href="${prev}" ${prev.match(/https/) ? 'target="_blank"' : ''} class="eachCtrl ${prev ? '' : 'hidden'}">
    <span class="svgIcon-smallArrowLeft"></span>
    <span>Previous</span>
</a>
<a href="${next}" class="eachCtrl ${next ? '' : 'hidden'}">
    <span>Next</span>
    <span class="svgIcon-smallArrowRight"></span>
</a>
</div>`);
