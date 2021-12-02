const copyTable = (selector : string) => {
    const elTable = document.querySelector(selector);

    let range, sel;

    // Ensure that range and selection are supported by the browsers
    if (document.createRange && window.getSelection) {

        range = document.createRange();
        sel = window.getSelection();
        // unselect any element in the page
        if (sel && elTable) {
            sel.removeAllRanges();
            try {
                range.selectNodeContents(elTable);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(elTable);
                sel.addRange(range);
            }
            document.execCommand('copy');
            sel.removeAllRanges();
        }
    }
}

export {copyTable}