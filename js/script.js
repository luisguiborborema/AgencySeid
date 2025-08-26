// assets/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("Site da SEID carregado com sucesso.");

    // --- Funcionalidade da Máscara de Telefone ---
    const phoneInputs = document.querySelectorAll('.phone-mask');
    const handlePhoneInput = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
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

    // --- NOVO CÓDIGO: Funcionalidade da Página de Serviços ---
    const serviceLinks = document.querySelectorAll('.service-link');
    const serviceDetails = document.querySelectorAll('.service-detail');

    // Verifica se os elementos da página de serviços existem antes de adicionar os eventos
    // Isso evita erros em outras páginas que não têm esses elementos.
    if (serviceLinks.length > 0 && serviceDetails.length > 0) {
        
        serviceLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                // Previne o comportamento padrão do link
                event.preventDefault();

                // Pega o valor do atributo 'data-service' do link clicado
                const serviceId = this.dataset.service;

                // Remove a classe 'active' de todos os links
                serviceLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                // Adiciona a classe 'active' apenas no link que foi clicado
                this.classList.add('active');
                
                // Esconde todos os painéis de detalhes
                serviceDetails.forEach(detail => {
                    detail.classList.remove('active');
                });

                // Mostra o painel de detalhe correto
                const activeDetailPanel = document.getElementById(serviceId);
                if (activeDetailPanel) {
                    activeDetailPanel.classList.add('active');
                }
            });
        });
    }
});