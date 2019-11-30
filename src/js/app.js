import { detectBrowser } from './_helpers';
import '@fancyapps/fancybox/dist/jquery.fancybox.min'
import 'slick-carousel/slick/slick.min'

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


    };

    static initializeModules() {
        $('input[type="tel"]').on('keypress', e => {if (e.keyCode < 48 || e.keyCode > 57) return false;} );

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


            if($wrap.hasClass('inform-section--hidden-text')) {
                $wrap.removeClass('inform-section--hidden-text');
                // $text.slideDown(500);
                $this.text(textClose);
            }else {
                $wrap.addClass('inform-section--hidden-text');
                // $text.slideUp(500);
                $this.text(textOpen);
            }
        });

        $('.menu-open-js').on('click', function () {
            const $ths = $(this);
            const $elements = $('.hide-in-mobile');

            if($ths.hasClass('active')) {
                $ths.removeClass('active');
                $elements.slideUp(500);
            }else {
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

            }else {

                $wrapper.addClass('active');

                $text.slideDown(500);
            }

        });

        $('.scroll-to-js').on('click', function (e) {
            e.preventDefault();

            const $this = $(this);

            const href = $this.attr('href').replace('#', '');

            const $element = $(href);

            console.log(1);

            if($element.length > 0) {

                $('html, body').animate(
                    {scrollTop: $element.offset().top},
                    1000
                );

            }

        });

        $('form').on('submit', function (e) {
            e.preventDefault();
            let ths = $(this),
                test = true,
                thsInputs = ths.find('input');


            thsInputs.each(function () {
                let thsInput = $(this),
                    thsInputType = thsInput.attr('type'),
                    thsInputVal =  thsInput.val(),
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
                            if ( inputTest == false ) {
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
            if ( test ) {
                let form_data = ths.serialize();
                $.ajax({
                    url: ths.attr('action'),
                    type: 'POST',
                    data: form_data,
                    success: function(r) {
                        $.fancybox.close();
                        $.fancybox.open($('#modal_thanks'));
                        ths.trigger('reset');
                        setTimeout(()=>{
                            $.fancybox.close();
                        }, 3000);
                    },
                    error:  function(xhr, str){
                        console.log('Возникла ошибка: ' + xhr.responseCode);
                    }
                });
            }

        });
    };

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