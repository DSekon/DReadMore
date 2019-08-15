/*!
 * dReadmore - jQuery plugin
 *
 * Author: DSekon
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://DSekon.ru/dReadmore/
 *
 * Version:  1.0.0
 *
 */

(function ($) {
    function initMinMax($element) {
        var $el = $element.data('dReadmore').target,
            $btn = $el.data('dReadmore').btn,
            heightMin = parseFloat($el.css("min-height")) * parseFloat($el.css("line-height")) / parseFloat($el.css("font-size")),
            heightMax = parseFloat($el.find(".d-readmove_text-wrapp").css("height")) / parseFloat($el.css("font-size"));

        if ($el.data('dReadmore').closeIfChangeWidth) {
            $el.attr("d-readmore-expanded", $el.data('dReadmore').expanded);
        }

        if ($el.attr("d-readmore-expanded") === "true") {
            $btn.html($element.data('dReadmore').lessText);
        } else {
            $btn.html($element.data('dReadmore').moreText);
        }

        if (parseFloat($el.css("min-height"))) {
            $el.css({
                "height": (($el.attr("d-readmore-expanded") === "true") ? heightMax : heightMin) + "em",
                "min-height": "none"
            });

            $btn.css({
                "display": ""
            });
        } else {
            $el.css({
                "height": "",
                "min-height": ""
            });

            $btn.css({
                "display": "none"
            })
        }

        $element.data('dReadmore').heightMin = heightMin;
        $element.data('dReadmore').heightMax = heightMax;
    }

    function resize($el) {
        var currentMaxHeight = parseFloat($el.css("min-height")) * parseFloat($el.css("line-height")) / parseFloat($el.css("font-size")),
            currentHeight = parseFloat($el.find(".d-readmove_text-wrapp").css("height"))

        if ($el.data('dReadmore').heightMin != currentMaxHeight || $el.data('dReadmore').heightMax != currentHeight) {
            initMinMax($el);
        }
    }

    function init($element) {
        $element.attr("id", $element.data('dReadmore').id)
        initMinMax($element);

        var $btn = $element.data('dReadmore').btn;

        $btn.on("click", function () {
            $element.off('transitionend');

            var $el = $("#" + $element.data('dReadmore').id),
                isExpanded = ($el.attr("d-readmore-expanded") === "true");

            if ($element.data('dReadmore').beforeToggle && typeof $element.data('dReadmore').beforeToggle === 'function') {
                $element.data('dReadmore').beforeToggle($element, isExpanded);
            }

            if (!isExpanded) {
                $el.attr("d-readmore-expanded", true).css({
                    "height": $element.data('dReadmore').heightMax + "em"
                });

                $(this).html($element.data('dReadmore').lessText);
            } else {
                $el.attr("d-readmore-expanded", false).css({
                    "height": $element.data('dReadmore').heightMin + "em"
                });

                $(this).html($element.data('dReadmore').moreText);
            }

            $element.on('transitionend', (function () {
                if ($element.data('dReadmore').afterToggle && typeof $element.data('dReadmore').afterToggle === 'function') {
                    $element.data('dReadmore').afterToggle($element, !isExpanded);
                }

                $element.off('transitionend');
            }));
        });

        $(window).on("load resize", function () {
            resize($element);
        });
    }

    var methods = {
        init: function (options) {

            return this.each(function (i) {

                var settings = {
                    id: "d-readmore-" + i,
                    startOpen: false,
                    moreText: "Show more",
                    lessText: "Close",
                    duration: 250,
                    timing: "ease",
                    returnInitialState: false,

                    // callbacks
                    beforeToggle: function () {},
                    afterToggle: function () {}
                };

                if (options) {
                    $.extend(settings, options);
                }

                var $this = $(this),
                    $el = $this,
                    $btn = $this.parent().find(".d-readmore_btn").attr("d-readmore-controls-id", settings.id);

                $this.data('dReadmore', {
                    target: $this,
                    id: settings.id,
                    btn: $btn,
                    expanded: settings.startOpen,
                    moreText: settings.moreText,
                    lessText: settings.lessText,
                    duration: settings.duration,
                    closeIfChangeWidth: settings.closeIfChangeWidth,
                    heightMin: 0,
                    heightMax: 0,
                    beforeToggle: settings.beforeToggle,
                    afterToggle: settings.afterToggle
                }).css({
                    'transition-property': 'height, min-height',
                    'transition-duration': settings.duration + "ms",
                    'transition-timing-function': settings.timing
                }).wrapInner('<div class="d-readmove_text-wrapp"></div>');

                init($this);
            });
        },
        destroy: function () {

            return this.each(function () {

                var $this = $(this),
                    //                    data = $this.data('dReadmore'),
                    $btn = $this.parent().find("." + $this.data('dReadmore').btnClass).removeAttr("d-readmore-controls-id");

                $btn.unbind('click');
                $this.removeData('dReadmore');

                $this.css({
                        'height': '',
                        'transition-property': '',
                        'transition-duration': '',
                        'transition-timing-function': ''
                    }).removeAttr("id")
                    .removeAttr("d-readmore-expanded")
                    .html($this.find(".d-readmove_text-wrapp").html());
            })

        }
    };

    $.fn.dReadmore = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('The method named ' + method + ' does not exist for dReadmore');
        }

    };

})(jQuery);
