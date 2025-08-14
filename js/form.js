document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulário
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                showFormStatus('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showFormStatus('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Simular envio (substituir por Formspree ou outro serviço)
            const formData = new FormData(contactForm);
            
            // Configuração para Formspree
            fetch('https://formspree.io/f/seu-email-aqui', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showFormStatus('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Erro ao enviar mensagem');
                }
            })
            .catch(error => {
                showFormStatus('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.', 'error');
                console.error('Error:', error);
            });
        });
    }
    
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        
        // Esconder a mensagem após 5 segundos
        setTimeout(() => {
            formStatus.style.opacity = '0';
            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.style.opacity = '1';
            }, 500);
        }, 5000);
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
