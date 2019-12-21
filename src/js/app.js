import { detectBrowser } from './_helpers';
import '@fancyapps/fancybox/dist/jquery.fancybox.min'
import 'slick-carousel/slick/slick.min'
import 'jquery.maskedinput/src/jquery.maskedinput';
import './_initMap';

class Application {
    constructor() {
        Application.init();
    }

    static initializePlugins() {
        $('.fancybox').fancybox();
        $('.reviews-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            responsive: [
                {
                    breakpoint: 405,
                    settings: {
                        arrows: false,
                    }
                },
            ]
        });
        $('.fancybox--text').on('click', function (e) {
            e.preventDefault();

            const $this = $(this);
            const $modal = $this.attr('href');

            const text = $this.closest('form').find('.forecast__textarea').val();

            $($modal).find('.text-js').val(text);

            $.fancybox.open($($modal));
        });

        $('.cases-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            adaptiveHeight: true,
            prevArrow: $('.cases-slider__button--left'),
            nextArrow: $('.cases-slider__button--right'),
            responsive: [
                {
                    // breakpoint: 405,
                    // settings: {
                    //     arrows: false,
                    // }
                },
            ]
        });

        $('input[type="tel"]').mask("+7(999) 999-9999");

    };

    static initializeModules() {

        $('a[href="#"]').on('click', e => e.preventDefault());

        $('input[type="tel"]').on('keypress', e => {
            if (e.keyCode < 48 || e.keyCode > 57) return false;
        });

        $('.forecast-form').on('submit', function (e) {
            e.preventDefault();
            $(this).find('.fancybox--text').trigger('click');
        });

        $('.inform-section__button').on('click', function (e) {
            e.preventDefault();
            const $this = $(this);
            const $wrap = $this.closest('.inform-section');
            const $text = $wrap.find('.inform-section__text');

            const textOpen = $this.attr('data-open');
            const textClose = $this.attr('data-close');


            if ($wrap.hasClass('inform-section--hidden-text')) {
                $wrap.removeClass('inform-section--hidden-text');
                // $text.slideDown(500);
                $this.text(textClose);
            } else {
                $wrap.addClass('inform-section--hidden-text');
                // $text.slideUp(500);
                $this.text(textOpen);
            }
        });

        $('.menu-open-js').on('click', function () {
            const $ths = $(this);
            const $elements = $('.hide-in-mobile');

            if ($ths.hasClass('active')) {
                $ths.removeClass('active');
                $elements.slideUp(500);
            } else {
                $ths.addClass('active');
                $elements.slideDown(500);
            }
        });

        $('.questions-accordeon__title').on('click', function (e) {
            e.preventDefault();

            const $elements = $('.questions-accordeon__item');

            const $ths = $(this);

            const $wrapper = $ths.closest('.questions-accordeon__item');

            const $text = $wrapper.find('.questions-accordeon__text');

            const is_active = $wrapper.hasClass('active');

            $elements.not($wrapper).removeClass('active');
            $elements.not($wrapper).find('.questions-accordeon__text').slideUp(500);

            if (is_active) {

                $wrapper.removeClass('active');

                $text.slideUp(500);

            } else {

                $wrapper.addClass('active');

                $text.slideDown(500);
            }

        });

        $('.scroll-to-js').on('click', function (e) {
            e.preventDefault();

            const $this = $(this);

            const href = $this.attr('href');

            const $element = $(href);

            if ($element.length > 0) {

                $('html, body').animate(
                    {scrollTop: $element.offset().top},
                    1000
                );

            } else {
                window.location.href = home_url + '/' + href;
            }

        });

        $('form').on('submit', function (e) {
            e.preventDefault();
            let ths = $(this),
                test = true,
                thsInputs = ths.find('input');

            const $consent = ths.find('input[name="policy"][type="checkbox"]');

            const has_consent = $consent.length > 0;

            if (has_consent) {

                if (!$consent.prop('checked')) {

                    $consent.addClass('error');

                    return false;

                }

            }

            thsInputs.each(function () {
                let thsInput = $(this),
                    thsInputType = thsInput.attr('type'),
                    thsInputVal = thsInput.val(),
                    inputReg = new RegExp(thsInput.data('reg')),
                    inputTest = inputReg.test(thsInputVal);


                if (thsInput.attr('required')) {
                    if (thsInputVal.length <= 0) {
                        test = false;
                        thsInput.addClass('error');
                        thsInput.focus();
                    } else {
                        thsInput.removeClass('error');
                        if (thsInput.data('reg')) {
                            if (inputTest == false) {
                                test = false;
                                thsInput.addClass('error');
                                thsInput.focus();
                            } else {
                                thsInput.removeClass('error');
                            }
                        }

                    }
                }
            });
            if (test) {
                let form_data = ths.serialize();
                $.ajax({
                    url: ths.attr('action'),
                    type: 'POST',
                    data: form_data,
                    success: function (r) {
                        $.fancybox.close();
                        $.fancybox.open($('#modal_thanks'));
                        ths.trigger('reset');
                        setTimeout(() => {
                            $.fancybox.close();
                        }, 3000);
                    },
                    error: function (xhr, str) {
                        console.log('Возникла ошибка: ' + xhr.responseCode);
                    }
                });
            }

        });

        $('.text blockquote').append('<span></span>');

        $('.facts-additionally__text a.more').on('click', function (e) {
            e.preventDefault();
            const $this = $(this);
            $this.hide();

            $this.closest('.facts-additionally__text').find('.hidden-text').slideDown(500);
        });

        (() => {
            const $textarea = $('.forecast__textarea');

            if ($textarea.length > 0) {
                $textarea.each(function () {
                    const $t = $(this);
                    const p = $t.attr('placeholder');
                    if (p.length > 0) {
                        const arr = p.split("");
                        const arrL = arr.length;
                        let i = 0;

                        let pause = 0;

                        $t.attr('placeholder', '');
                        const interval = setInterval(() => {
                            let newP = $t.attr('placeholder') + arr[i];
                            $t.attr('placeholder', newP);
                            if (i >= arrL) {
                                if (pause < 20) {
                                    $t.attr('placeholder', p);
                                    pause++;
                                } else {
                                    $t.attr('placeholder', '');
                                    i = 0;
                                    pause = 0;
                                }
                            } else {
                                i++;
                            }
                        }, 50);

                    }
                });
            }
        })();

        (() => {

            const $a = $('.questions-accordeon--faq-page');

            if ($a.length > 0) {
                const hash = window.location.hash;
                const $elem = $(hash);

                if ($elem.length > 0) {
                    $elem.addClass('active');
                    $elem.find('.questions-accordeon__text').slideDown(500);
                }
            }

        })();

        $('.show-text-js').on('click', function (e) {
            e.preventDefault();

            $(this).closest('.show-text').find('.hidden-text-js').toggleClass('active');

            $(this).hide();

        });

        $('.get-help-tabs__item').on('click', function (e) {
            e.preventDefault();

            const $t = $(this);

            const id = $t.attr('data-id');

            const $wrappper = $t.closest('.get-help-tabs');

            $('.get-help-tabs__item').removeClass('active');

            $t.addClass('active');

            $wrappper.find('.get-help-tabs__content').removeClass('active');

            $wrappper.find(`.get-help-tabs__content[data-id="${id}"]`).addClass('active');

        });

    }

    static detectBrowser() {
        document.body.setAttribute('data-browser', detectBrowser());
    }

    static init() {
        this.detectBrowser();
        this.initializePlugins();
        this.initializeModules();
    }
};

const App = new Application();