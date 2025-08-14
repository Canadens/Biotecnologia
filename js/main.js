// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Adicionar classe scrolled ao header quando rolar a página
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Carrossel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        let currentIndex = 0;
        const itemWidth = 100; // 100%
        
        function updateCarousel() {
            inner.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
        }
        
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        });
        
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        });
        
        // Auto-rotate (opcional)
        let interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }, 5000);
        
        carousel.addEventListener('mouseenter', () => clearInterval(interval));
        carousel.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            }, 5000);
        });
    }
    
    // Filtro de produtos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar active ao botão clicado
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            productCards.forEach(card => {
                card.style.display = 'none';
                
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    
                    // Adicionar animação
                    card.style.animation = 'fadeIn 0.5s ease';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 500);
                }
            });
        });
    });
    
    // Animação de scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.highlight-card, .value-card, .team-card, .product-card, .tech-card, .blog-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Definir opacidade inicial e posição para elementos animados
    document.querySelectorAll('.highlight-card, .value-card, .team-card, .product-card, .tech-card, .blog-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});

// Adicionar animação de fadeIn ao CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
