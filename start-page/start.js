class DestaquesCarrossel {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.slides = this.container.querySelectorAll('.destaque');
        this.indicators = this.container.querySelectorAll('.indicador');
        this.prevBtn = this.container.querySelector('.destaque-anterior');
        this.nextBtn = this.container.querySelector('.destaque-proximo');
        this.currentIndex = 0;
        this.intervalId = null;
        this.autoPlayDelay = 5000; // 5 segundos
        
        this.init();
    }
    
    init() {
        // Mostrar o primeiro slide
        this.showSlide(this.currentIndex);
        
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Autoplay
        this.startAutoPlay();
        
        // Pausar autoplay quando o mouse estiver sobre o carrossel
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    showSlide(index) {
        // Esconder todos os slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(ind => ind.classList.remove('active'));
        
        // Mostrar o slide atual
        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');
        this.currentIndex = index;
    }
    
    nextSlide() {
        const newIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(newIndex);
    }
    
    prevSlide() {
        const newIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(newIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoPlay() {
        this.stopAutoPlay(); // Garantir que não há múltiplos intervalos
        this.intervalId = setInterval(() => this.nextSlide(), this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// Inicializar o carrossel quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new DestaquesCarrossel('.destaques-container');
});
