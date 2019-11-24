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
            arrows: true
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
        })
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