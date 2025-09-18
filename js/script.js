// assets/js/script.js

// Header scroll effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log("Site da SEID carregado com sucesso.");

    // Inicia a biblioteca de animações
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });

    const testimonialSliderElement = document.querySelector('.testimonial-slider');

    if (testimonialSliderElement) {
        const testimonialSlider = new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                }
            }
        });
    }

    // --- Funcionalidade da Máscara de Telefone ---
    const phoneInputs = document.querySelectorAll('.phone-mask');
    const handlePhoneInput = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.substring(0, 11);
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue = '(' + value.substring(0, 2);
        }
        if (value.length > 2) {
            formattedValue += ') ' + value.substring(2, 7);
        }
        if (value.length > 7) {
            formattedValue += '-' + value.substring(7, 11);
        }
        e.target.value = formattedValue;
    };
    phoneInputs.forEach(input => {
        input.addEventListener('input', handlePhoneInput);
    });

    // --- Funcionalidade do Acordeão (FAQ) ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const clickedItem = question.closest('.faq-item');
            document.querySelectorAll('.faq-item.active').forEach(openItem => {
                if (openItem !== clickedItem) {
                    openItem.classList.remove('active');
                }
            });
            clickedItem.classList.toggle('active');
        });
    });

    // --- FUNCIONALIDADE CORRIGIDA PARA A PÁGINA DE SERVIÇOS (VERSÃO 2) ---
    const serviceButtons = document.querySelectorAll('.hero a.cta-button');
    const serviceSections = document.querySelectorAll('main > section.secao-clara[id]');

    // Verifica se estamos na página de serviços (se os elementos existem)
    if (serviceButtons.length > 0 && serviceSections.length > 0) {
        
        // Função para esconder todas as seções de serviço
        function hideAllServices() {
            serviceSections.forEach(section => {
                section.classList.remove('active');
            });
        }

        // Função para mostrar uma seção específica
        function showService(targetId) {
            // Remove o '#' do href para encontrar a seção pelo ID
            const sectionId = targetId.substring(1); 
            const targetSection = document.getElementById(sectionId);

            if (targetSection) {
                hideAllServices(); // Primeiro, esconde todas
                targetSection.classList.add('active'); // Depois, mostra a seção alvo
            }
        }

        // Adiciona um listener de clique a cada botão
        serviceButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Impede que a página role para a âncora

                const targetId = this.getAttribute('href'); 
                showService(targetId);
            });
        });

        // Por padrão, mostra a primeira seção de serviço ao carregar a página
        const firstSectionId = serviceButtons[0].getAttribute('href');
        if (firstSectionId) {
            showService(firstSectionId);
        }
    }
    
    // --- VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        const validator = new JustValidate(contactForm, {
            validateBeforeSubmitting: true,
        });

        validator
            .addField('#form-nome', [
                { rule: 'required', errorMessage: 'O nome é obrigatório' },
                { rule: 'minLength', value: 3, errorMessage: 'O nome precisa ter no mínimo 3 caracteres' }
            ])
            .addField('#form-empresa', [
                { rule: 'required', errorMessage: 'O nome da imobiliária é obrigatório' }
            ])
            .addField('#form-email', [
                { rule: 'required', errorMessage: 'O e-mail é obrigatório' },
                { rule: 'email', errorMessage: 'Por favor, insira um e-mail válido' }
            ])
            .addField('#form-telefone', [
                { rule: 'required', errorMessage: 'O WhatsApp é obrigatório' },
                { rule: 'minLength', value: 14, errorMessage: 'Preencha o telefone completo' }
            ])
            .addField('#form-redes', [
                { rule: 'required', errorMessage: 'Este campo é obrigatório' }
            ])
            .addField('#form-faturamento', [
                { rule: 'required', errorMessage: 'Por favor, selecione uma opção' }
            ])
            .onSuccess((event) => {
                console.log('Formulário válido!', event);
                
                event.preventDefault();
                alert('Diagnóstico solicitado com sucesso! Entraremos em contato em breve.');
            });
    }

    // --- Funcionalidade do Menu Hambúrguer ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });
    }

    // Fecha o menu quando um link é clicado
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            }
        });
    });
});