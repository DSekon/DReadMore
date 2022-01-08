import {
    css,
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
        if (!params.el) params.el = '.d-readmore';

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

        drm.params = Object.assign({
            initialExpand: false,
            isInitialExpandWhenUpdate: false,
            moreText: 'Show more',
            lessText: 'Close',
            toggler: null,

            // callbacks
            beforeToggle: function() {},
            afterToggle: function() {}
        }, params);

        drm.init();

        return drm;
    }

    togglerEventListener = (e) => {
        const drm = this;
        const { el, toggler } = drm.params;
        const isExpanded = !drm.isExpanded;

        if (drm.params.beforeToggle && typeof drm.params.beforeToggle === 'function') {
            drm.params.beforeToggle(el, drm.isExpanded);
        }

        drm.isExpanded = isExpanded;

        toggler.setAttribute('aria-expanded', isExpanded);
        el.classList.toggle('active')

        toggler.innerHTML = isExpanded ? drm.params.lessText : drm.params.moreText;
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
            drm.params.toggler = el.nextElementSibling;
        }

        toggler = drm.params.toggler;

        toggler.setAttribute('aria-expanded', drm.isExpanded)

        toggler.addEventListener('click', drm.togglerEventListener);
    }

    update() {
        let drm = this;

        if (!drm || drm.destroyed) return;

        const { el, toggler } = drm.params;

        const minHeight = parseFloat(css(el).minHeight);
        const height = parseFloat(css(el.childNodes[0]).height);
        const fontSize = parseFloat(css(el).fontSize);
        let lineHeight = css(el).lineHeight;

        if (lineHeight !== 'normal') {
            lineHeight = parseFloat(lineHeight);
        } else {
            lineHeight = fontSize * 1.25;
        }

        if (minHeight && height > minHeight * lineHeight) {
            drm = Object.assign(drm, {
                heightDefault: `${minHeight * lineHeight / fontSize}em`,
                heightExpanded: `${height / fontSize}em`
            });

            el.style.height = drm.params.isInitialExpandWhenUpdate || drm.isExpanded ? drm.heightExpanded : drm.heightDefault;

            if (toggler.classList.contains('d-readmore--disabled')) {
                toggler.classList.remove('d-readmore--disabled');
            }
        } else {
            el.style.height = null;
            toggler.classList.add('d-readmore--disabled');
        }
    }

    init() {
        let drm = this;
        const el = drm.params.el;

        if (drm.initialized) return drm;

        el.innerHTML = `<div>${el.innerHTML.trim()}</div>`;

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
        el.innerHTML = el.childNodes[0].innerHTML;
        toggler.removeEventListener('click', drm.togglerEventListener);

        if (deleteInstance) {
            deleteProps(drm);
        }

        drm.destroyed = true;

        return null;
    }
}

window.DReadMore = DReadMore;
