function css(el) {
    return window.getComputedStyle(el, null)
}

function lh(el) {
    let lineHeight = css(el).lineHeight;

    if (lineHeight !== 'normal') {
        lineHeight = parseFloat(lineHeight);
    } else {
        lineHeight = parseFloat(css(el).fontSize) * 1.25;
    }

    return lineHeight;
}

function deleteProps(obj) {
    const object = obj;

    Object.keys(object).forEach((key) => {
        try {
            object[key] = null;
        } catch (e) {
            // no getter for object
        }
        try {
            delete object[key];
        } catch (e) {
            // something got wrong
        }
    });
}

function selectorAll(selector) {
    if (typeof selector === 'object') {
        return selector;
    }

    return Array.prototype.slice.call(document.querySelectorAll(selector));
}

export {
    css,
    lh,
    deleteProps,
    selectorAll
}
