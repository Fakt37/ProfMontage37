window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.nav__menu'),
    menuItem = document.querySelectorAll('.nav__menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('nav__menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('nav__menu_active');
        });
    });

    const slider = tns({
        container: '.example__slider',
        items: 3,
        slideBy: 'page',
        autoplay: false,
        autoplayButton: false,
        controls: false,
        nav: false,
        responsive: {
            320: {
              items: 1
            },
            767: {
                items: 2
            },
            900: {
                items: 3
            }
          }
      });

    document.querySelector('.example__prev').addEventListener('click', function () {
        slider.goTo('prev');
    }); 
    document.querySelector('.example__next').addEventListener('click', function () {
        slider.goTo('next');
    });

    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector);
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
    
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        close.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    function closeModal(selector) {
        document.querySelector(selector).style.display = 'none';
        document.body.style.overflow = '';
    }
    function showModalByTime(selector, time) {
        setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time);
    }

    bindModal('.button_header', '.modal__bell', '.modal__close');
    bindModal('.button_main', '.modal__services', '.modal__services .modal__close');
    bindModal('.button_mini', '.modal__mini', '.modal__mini .modal__close');
    showModalByTime('.modal__bell', 60000);

    //Отправка заявки в Телеграм
    const token = "5196139296:AAHWZw66GaLKQZtr24fxux1Vk_73eFe-WLI",
          chatId = "-762940993",
          urlAPI = `https://api.telegram.org/bot${token}/sendMessage`;


    document.getElementById('telegramFormBell').addEventListener('submit', function(e) {
        e.preventDefault();

        let message = `<b>Заказ звонка!</b>\n`;
            message += `<b>Имя: </b> ${this.name.value}\n`;
            message += `<b>Телефон: </b> ${this.phone.value}`;

        axios.post(urlAPI, {
            chat_id: chatId,
            parse_mode: 'html',
            text: message
        })
        .then((res) => {
            this.name.value = '';
            this.phone.value = '';
            closeModal('.modal__bell');
            showModalByTime('.modal__mini', 1000);
        })
        .catch((err) => {
            console.warn(err);
        })
        .finally(() => {
            console.log('Конец');
        });
    });

    document.getElementById('telegramFormServices').addEventListener('submit', function(e) {
        e.preventDefault();

        let message = `<b>Заказ звонка!</b>\n`;
            message += `<b>Имя: </b> ${this.name.value}\n`;
            message += `<b>Телефон: </b> ${this.phone.value}`;

        axios.post(urlAPI, {
            chat_id: chatId,
            parse_mode: 'html',
            text: message
        })
        .then((res) => {
            this.name.value = '';
            this.phone.value = '';
            closeModal('.modal__services');
            showModalByTime('.modal__mini', 1000);
        })
        .catch((err) => {
            console.warn(err);
        })
        .finally(() => {
            console.log('Конец');
        });
    });

});