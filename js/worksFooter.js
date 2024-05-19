document.write(`
<a id="endGif" href="../assets/images/giphy.gif" target="_blank">
<img src="../assets/images/giphy.gif" alt="The End" />
</a>
<div id="pageCtrl">
<a href="${prev?.url}" ${
    prev?.url?.match(/https/) ? 'target="_blank"' : ''
} class="eachCtrl ${prev?.url ? '' : 'hidden'}">
    <div class="iconCont">
        <span class="svgIcon-smallArrowLeft"></span>
    </div>
    <div class="txtPart">
        <div class="dir">Previous</div>
        <div class="pageTitle">${prev?.txt}</div>
    </div>
</a>
<a href="${next?.url}" class="eachCtrl ${next?.url ? '' : 'hidden'}">
    <div class="txtPart">
        <div class="dir">Next</div>
        <div class="pageTitle">${next?.txt}</div>
    </div>
    <div class="iconCont">
        <span class="svgIcon-smallArrowRight"></span>
    </div>
</a>
</div>`);
