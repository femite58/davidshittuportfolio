document.write(`
<a id="endGif" href="../assets/images/giphy.gif" target="_blank">
<img src="../assets/images/giphy.gif" alt="The End" />
</a>
<div id="pageCtrl">
<a href="${prev?.url}" ${
    prev?.url?.match(/https/) ? 'target="_blank"' : ''
} class="eachCtrl ${prev?.url ? '' : 'hidden'}">
    <div class="imgCont">
        <img src="${prev?.img}"/>
    </div>
    <div class="txtPart" style="background-color: ${prev?.bg};">
        <div class="action">
            <span class="svgIcon-smallArrowLeft"></span>
            <span>Previous</span>
        </div>
        <div class="pageTitle">${prev?.txt}</div>
    </div>
</a>
<a href="${next?.url}" class="eachCtrl ${next?.url ? '' : 'hidden'}">
    <div class="imgCont">
        <img src="${next?.img}"/>
    </div>
    <div class="txtPart" style="background-color: ${next?.bg};">
        <div class="action">
            <span>Next</span>
            <span class="svgIcon-smallArrowRight"></span>
        </div>
        <div class="pageTitle">${next?.txt}</div>
    </div>
</a>
</div>`);
