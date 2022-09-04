import {
    css,
    lh,
    stringToObj,
    deleteProps,
    selectorAll
} from '../shared/utils'

export default class DReadMore {
    constructor(...args) {
        let el;
        let params;

        if (
            args.length === 1 &&
            args[0].constructor &&
            Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object'
        ) {
            params = args[0];
        } else {
            [el, params] = args;
        }

        if (!params) params = {};
        if (el && !params.el) params.el = el;
        if (!params.el) params.el = '.dreadmore';

        if (params.el && selectorAll(params.el).length > 1) {
            const drms = [];

            selectorAll(params.el).forEach((containerEl) => {
                const newParams = Object.assign({}, params, {
                    el: containerEl
                });
                drms.push(new DReadMore(newParams));
            });

            return drms;
        } else if (typeof params.el === 'string') {
            params.el = document.querySelector(params.el);
        }

        const drm = this;
        let paramsAttrs = stringToObj(params.el.getAttribute('data-drm'));

        drm.params = Object.assign({
            initialExpand: false,
            isInitialExpandWhenUpdate: false,
            moreText: 'Show more',
            lessText: 'Close',
            toggler: null,

            // callbacks
            beforeToggle: function() {},
            afterToggle: function() {}
        }, params, paramsAttrs);

        drm.init();

        return drm;
    }

    calcTags(rows, fontSize) {
        const drm = this;
        const el = drm.params.el;
        let heightDefault = 0;

        let child = undefined;
        let childCSS = undefined;
        let childPrevMarginBottom = 0;
        let childMarginTop = 0;
        let childHeight = 0;
        let childLineHeight = 0;
        let childRows = 0;

        for (let i = 0, j = 0; i < rows && el.childNodes[j]; j++) {
            child = el.childNodes[j];

            if (child.outerHTML) {
                childCSS = css(child);
                childMarginTop = parseFloat(childCSS.marginTop);
                childHeight = parseFloat(css(child).height);
                childLineHeight = lh(child);
                childRows = childHeight / childLineHeight;

                if (i + childRows <= rows) {
                    heightDefault += childHeight / fontSize;
                } else {
                    heightDefault += (rows - i) * childLineHeight / fontSize;
                }

                i += childRows;

                heightDefault += (childMarginTop > childPrevMarginBottom ? childMarginTop : childPrevMarginBottom) / fontSize;

                childPrevMarginBottom = parseFloat(childCSS.marginBottom);
            }
        }

        return [heightDefault, heightDefault * fontSize + parseFloat(css(el.childNodes[el.childNodes.length - 1]).marginBottom)];
    }

    togglerEventListener = (e) => {
        const drm = this;
        const {
            el,
            toggler
        } = drm.params;
        const isExpanded = !drm.isExpanded;

        if (drm.params.beforeToggle && typeof drm.params.beforeToggle === 'function') {
            drm.params.beforeToggle(el, drm.isExpanded);
        }

        drm.isExpanded = isExpanded;

        toggler.forEach(function(item) {
            item.setAttribute('aria-expanded', isExpanded);

            item.innerHTML = isExpanded ? drm.params.lessText : drm.params.moreText;
        });

        el.classList.toggle('active');

        el.style.height = isExpanded ? drm.heightExpanded : drm.heightDefault;

        if (drm.params.afterToggle && typeof drm.params.afterToggle === 'function') {
            drm.params.afterToggle(el, drm.isExpanded);
        }
    }

    getToggler() {
        let drm = this;
        const el = drm.params.el;
        let toggler;

        if (!drm.params.toggler && el.nextElementSibling.hasAttribute('data-drm-toggler')) {
            drm.params.toggler = [el.nextElementSibling];
        } else if (drm.params.toggler) {
            drm.params.toggler = document.querySelectorAll(`[data-drm-toggler="${drm.params.toggler}"]`);
        }

        toggler = drm.params.toggler;

        toggler.forEach(function(item) {
            item.setAttribute('aria-expanded', drm.isExpanded);

            item.addEventListener('click', drm.togglerEventListener);
        });
    }

    update() {
        let drm = this;

        if (!drm || drm.destroyed) return;

        const {
            el,
            toggler
        } = drm.params;

        el.innerHTML = `<div class="${el.classList.value}" style="display: inline-block !important;">${el.innerHTML.trim()}</div>`;

        const rows = parseFloat(css(el).minHeight);
        const height = parseFloat(css(el.childNodes[0]).height);
        const fontSize = parseFloat(css(el).fontSize);
        let lineHeight = lh(el);
        let heightDefault = 0;
        let minHeight = rows * lineHeight;

        el.innerHTML = el.childNodes[0].innerHTML;

        if (el.childNodes[0].tagName) {
            drm.mode = 'tags';
        }

        if (drm.mode === 'tags') {
            [heightDefault, minHeight] = drm.calcTags(rows, fontSize);
        } else {
            heightDefault = minHeight / fontSize;
        }

        if (rows && height > minHeight) {
            drm = Object.assign(drm, {
                heightDefault: `${heightDefault}em`,
                heightExpanded: `${height / fontSize}em`
            });

            el.style.height = drm.params.isInitialExpandWhenUpdate || drm.isExpanded ? drm.heightExpanded : drm.heightDefault;

            toggler.forEach(function(item) {
                if (item.classList.contains('dreadmore--disabled')) {
                    item.classList.remove('dreadmore--disabled');
                }
            });
        } else {
            el.style.height = null;

            toggler.forEach(function(item) {
                item.classList.add('dreadmore--disabled');
            });
        }
    }

    init() {
        let drm = this;
        const el = drm.params.el;

        if (!el) return false;

        if (drm.initialized) return drm;

        drm.isExpanded = drm.params.initialExpand;

        drm.getToggler();

        drm.update();

        drm.initialized = true;

        return drm;
    }

    destroy(deleteInstance = true) {
        const drm = this;

        if (typeof drm.params === 'undefined' || drm.destroyed) {
            return null;
        }

        const {
            el,
            toggler
        } = drm.params;

        drm.initialized = false;

        el.removeAttribute('style');

        toggler.forEach(function(item) {
            item.removeEventListener('click', drm.togglerEventListener);
        });

        if (deleteInstance) {
            deleteProps(drm);
        }

        drm.destroyed = true;

        return null;
    }
}

window.DReadMore = DReadMore;
