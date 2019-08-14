(function ($) {
    function initMinMax($element) {
        var $el = $element.data('dReadMore').target,
            $btn = $el.data('dReadMore').btn,
            heightMin = parseFloat($el.css("min-height")) * parseFloat($el.css("line-height")) / parseFloat($el.css("font-size")),
            heightMax = parseFloat($el.find(".d-readmove_text-wrapp").css("height")) / parseFloat($el.css("font-size"));

        $el.attr("d-readmore-expanded", $el.data('dReadMore').expanded);

        if ($el.data('dReadMore').expanded) {
            $btn.html($element.data('dReadMore').lessText);
        } else {
            $btn.html($element.data('dReadMore').moreText);
        }

        if (parseFloat($el.css("min-height"))) {
            $el.css({
                "height": ($el.data('dReadMore').expanded ? heightMax : heightMin) + "em",
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

        $element.data('dReadMore').heightMin = heightMin;
        $element.data('dReadMore').heightMax = heightMax;
    }

    function resize($el) {
        var currentMaxHeight = parseFloat($el.css("min-height")) * parseFloat($el.css("line-height")) / parseFloat($el.css("font-size")),
            currentHeight = parseFloat($el.find(".d-readmove_text-wrapp").css("height"))

        $el.css({
            "min-height": "",
        });

        if ($el.data('dReadMore').heightMin != currentMaxHeight || $el.data('dReadMore').heightMax != currentHeight) {
            initMinMax($el);
        } else {
            $el.css({
                "min-height": "none"
            });
        }
    }

    function init($element) {
        $element.attr("id", $element.data('dReadMore').id)
        initMinMax($element);

        var $btn = $element.data('dReadMore').btn;

        $btn.on("click", function () {
            $element.off('transitionend');

            var $el = $("#" + $element.data('dReadMore').id),
                isExpanded = ($el.attr("d-readmore-expanded") === "true");

            if ($element.data('dReadMore').beforeToggle && typeof $element.data('dReadMore').beforeToggle === 'function') {
                $element.data('dReadMore').beforeToggle($element, isExpanded);
            }

            if (!isExpanded) {
                $el.attr("d-readmore-expanded", true).css({
                    "height": $element.data('dReadMore').heightMax + "em"
                });

                $(this).addClass("d-readmore-open").html($element.data('dReadMore').lessText);
            } else {
                $el.attr("d-readmore-expanded", false).css({
                    "height": $element.data('dReadMore').heightMin + "em"
                });

                $(this).removeClass("d-readmore-open").html($element.data('dReadMore').moreText);
            }

            $element.on('transitionend', (function () {
                if ($element.data('dReadMore').afterToggle && typeof $element.data('dReadMore').afterToggle === 'function') {
                    $element.data('dReadMore').afterToggle($element, !isExpanded);
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

                    // callbacks
                    beforeToggle: function () {},
                    afterToggle: function () {}
                };

                if (options) {
                    $.extend(settings, options);
                }

                var $this = $(this),
                    $el = $this,
                    $btn = $this.parent().find(".d-readmore_btn").attr("d-readmore-controls", settings.id);

                $(this).data('dReadMore', {
                    target: $this,
                    id: settings.id,
                    btn: $btn,
                    expanded: settings.startOpen,
                    moreText: settings.moreText,
                    lessText: settings.lessText,
                    duration: settings.duration,
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
                    data = $this.data('dReadMore'),
                    $btn = $this.parent().find(".d-readmore_btn").removeAttr("d-readmore-controls");

                $btn.unbind('click');
                $this.removeData('dReadMore');

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

    $.fn.dReadMore = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('The method named ' + method + ' does not exist for dReadMore');
        }

    };

})(jQuery);

$(".d-readmore").dReadMore();
