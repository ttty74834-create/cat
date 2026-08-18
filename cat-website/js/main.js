// ========================================
// Cat Website - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Preloader.init();
    CustomCursor.init();
    Navigation.init();
    ProgressBar.init();
    HeroSlider.init();
    Carousel.init();
    BreedsGrid.init();
    Gallery.init();
    StatsCounter.init();
    InteractiveGames.init();
    ContactForm.init();
    Lightbox.init();
    Modal.init();
    BackToTop.init();
    ScrollAnimations.init();
});

// ========================================
// Preloader Module
// ========================================
const Preloader = {
    init() {
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 1500);
        });
    }
};

// ========================================
// Custom Cursor Module
// ========================================
const CustomCursor = {
    cursor: null,
    follower: null,
    
    init() {
        if (window.matchMedia('(pointer: fine)').matches) {
            this.cursor = document.getElementById('cursor');
            this.follower = document.getElementById('cursorFollower');
            
            document.addEventListener('mousemove', (e) => {
                this.moveCursor(e.clientX, e.clientY);
            });
            
            // Add hover effect on interactive elements
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, .cat-card, .breed-card, .gallery-item');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    this.cursor.classList.add('hover');
                    this.follower.classList.add('hover');
                });
                el.addEventListener('mouseleave', () => {
                    this.cursor.classList.remove('hover');
                    this.follower.classList.remove('hover');
                });
            });
        } else {
            // Hide custom cursor on touch devices
            this.cursor?.remove();
            this.follower?.remove();
        }
    },
    
    moveCursor(x, y) {
        if (this.cursor && this.follower) {
            this.cursor.style.left = x + 'px';
            this.cursor.style.top = y + 'px';
            
            setTimeout(() => {
                this.follower.style.left = x + 'px';
                this.follower.style.top = y + 'px';
            }, 50);
        }
    }
};

// ========================================
// Navigation Module
// ========================================
const Navigation = {
    navbar: null,
    navToggle: null,
    navMenu: null,
    navLinks: null,
    
    init() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        this.navToggle?.addEventListener('click', () => {
            this.navToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });
        
        // Close mobile menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navToggle?.classList.remove('active');
                this.navMenu?.classList.remove('active');
                
                // Update active link
                this.navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }
};

// ========================================
// Progress Bar Module
// ========================================
const ProgressBar = {
    progressBar: null,
    
    init() {
        this.progressBar = document.getElementById('progressBar');
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            this.progressBar.style.width = scrollPercent + '%';
        });
    }
};

// ========================================
// Hero Slider Module
// ========================================
const HeroSlider = {
    slides: [],
    currentSlide: 0,
    interval: null,
    
    init() {
        this.slides = document.querySelectorAll('.hero-slider .slide');
        if (this.slides.length > 0) {
            this.startAutoPlay();
            this.initTypingEffect();
        }
    },
    
    startAutoPlay() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    },
    
    nextSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    },
    
    initTypingEffect() {
        const title = document.querySelector('.hero-title');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            let i = 0;
            
            const typeWriter = () => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 500);
        }
    }
};

// ========================================
// Carousel Module
// ========================================
const Carousel = {
    track: null,
    slides: [],
    dots: [],
    currentIndex: 0,
    autoPlayInterval: null,
    
    init() {
        this.track = document.getElementById('track');
        if (!this.track) return;
        
        this.slides = Array.from(this.track.children);
        this.createDots();
        this.updateCarousel();
        this.startAutoPlay();
        this.bindEvents();
    },
    
    createDots() {
        const dotsContainer = document.getElementById('carouselDots');
        if (!dotsContainer) return;
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    },
    
    updateCarousel() {
        if (!this.track) return;
        
        const slideWidth = this.slides[0].getBoundingClientRect().width;
        this.track.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    },
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoPlay();
    },
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
    },
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
    },
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    },
    
    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.startAutoPlay();
    },
    
    bindEvents() {
        document.getElementById('prevBtn')?.addEventListener('click', () => {
            this.prevSlide();
        });
        
        document.getElementById('nextBtn')?.addEventListener('click', () => {
            this.nextSlide();
        });
        
        // Pause on hover
        const container = document.querySelector('.carousel-container');
        container?.addEventListener('mouseenter', () => {
            clearInterval(this.autoPlayInterval);
        });
        
        container?.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }
};

// ========================================
// Breeds Grid Module
// ========================================
const BreedsGrid = {
    breedsData: [
        { name: '英国短毛猫', english: 'British Shorthair', origin: '英国', lifespan: '12-17 年', weight: '4-8 kg', friendliness: 5, image: 'images/breed1.jpg', category: 'shorthair' },
        { name: '布偶猫', english: 'Ragdoll', origin: '美国', lifespan: '12-15 年', weight: '5-10 kg', friendliness: 5, image: 'images/breed2.jpg', category: 'longhair' },
        { name: '缅因猫', english: 'Maine Coon', origin: '美国', lifespan: '12-15 年', weight: '6-11 kg', friendliness: 4, image: 'images/breed3.jpg', category: 'longhair large' },
        { name: '暹罗猫', english: 'Siamese', origin: '泰国', lifespan: '15-20 年', weight: '3-5 kg', friendliness: 5, image: 'images/breed4.jpg', category: 'shorthair small' },
        { name: '波斯猫', english: 'Persian', origin: '伊朗', lifespan: '12-17 年', weight: '3-7 kg', friendliness: 4, image: 'images/breed5.jpg', category: 'longhair' },
        { name: '美国短毛猫', english: 'American Shorthair', origin: '美国', lifespan: '15-20 年', weight: '4-7 kg', friendliness: 5, image: 'images/breed6.jpg', category: 'shorthair' },
        { name: '苏格兰折耳猫', english: 'Scottish Fold', origin: '苏格兰', lifespan: '11-14 年', weight: '3-6 kg', friendliness: 4, image: 'images/breed7.jpg', category: 'shorthair small' },
        { name: '斯芬克斯猫', english: 'Sphynx', origin: '加拿大', lifespan: '12-14 年', weight: '3-5 kg', friendliness: 5, image: 'images/breed8.jpg', category: 'small' },
        { name: '孟加拉猫', english: 'Bengal', origin: '美国', lifespan: '12-16 年', weight: '4-7 kg', friendliness: 4, image: 'images/breed1.jpg', category: 'shorthair' },
        { name: '俄罗斯蓝猫', english: 'Russian Blue', origin: '俄罗斯', lifespan: '15-20 年', weight: '3-6 kg', friendliness: 3, image: 'images/breed2.jpg', category: 'shorthair small' },
        { name: '挪威森林猫', english: 'Norwegian Forest', origin: '挪威', lifespan: '14-16 年', weight: '5-9 kg', friendliness: 4, image: 'images/breed3.jpg', category: 'longhair large' },
        { name: '阿比西尼亚猫', english: 'Abyssinian', origin: '埃塞俄比亚', lifespan: '12-15 年', weight: '3-5 kg', friendliness: 5, image: 'images/breed4.jpg', category: 'shorthair small' }
    ],
    
    grid: null,
    searchInput: null,
    filterButtons: null,
    
    init() {
        this.grid = document.getElementById('breedsGrid');
        this.searchInput = document.getElementById('breedSearch');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        if (!this.grid) return;
        
        this.renderBreeds(this.breedsData);
        this.bindEvents();
    },
    
    renderBreeds(breeds) {
        this.grid.innerHTML = breeds.map(breed => `
            <div class="breed-card fade-in" data-category="${breed.category}">
                <img src="${breed.image}" alt="${breed.name}" loading="lazy">
                <div class="breed-info">
                    <h3 class="breed-name">${breed.name}</h3>
                    <p class="breed-origin"><i class="fas fa-globe-asia"></i> ${breed.origin}</p>
                    <div class="breed-stats">
                        <div class="stat">
                            <div class="stat-value">${breed.lifespan.split('-')[0]}-${breed.lifespan.split('-')[1]}</div>
                            <div class="stat-label">寿命 (年)</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${breed.weight}</div>
                            <div class="stat-label">体重</div>
                        </div>
                    </div>
                    <div class="rating">
                        ${this.renderStars(breed.friendliness)}
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click event for modal
        this.grid.querySelectorAll('.breed-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                Modal.show(breeds[index]);
            });
        });
    },
    
    renderStars(count) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<i class="fas fa-star star ${i <= count ? '' : 'empty'}"></i>`;
        }
        return stars;
    },
    
    bindEvents() {
        // Search functionality
        this.searchInput?.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = this.breedsData.filter(breed => 
                breed.name.toLowerCase().includes(searchTerm) ||
                breed.english.toLowerCase().includes(searchTerm)
            );
            this.renderBreeds(filtered);
        });
        
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                if (filter === 'all') {
                    this.renderBreeds(this.breedsData);
                } else {
                    const filtered = this.breedsData.filter(breed => 
                        breed.category.includes(filter)
                    );
                    this.renderBreeds(filtered);
                }
            });
        });
    }
};

// ========================================
// Gallery Module
// ========================================
const Gallery = {
    images: [
        { src: 'images/gallery1.jpg', caption: '好奇的小猫咪', category: 'kitten' },
        { src: 'images/gallery2.jpg', caption: '慵懒午后', category: 'sleeping' },
        { src: 'images/gallery3.jpg', caption: '调皮时刻', category: 'funny' },
        { src: 'images/gallery4.jpg', caption: '优雅公主', category: 'portrait' },
        { src: 'images/gallery5.jpg', caption: '黑夜精灵', category: 'portrait' },
        { src: 'images/gallery6.jpg', caption: '玩耍时间', category: 'playing' },
        { src: 'images/gallery7.jpg', caption: '萌萌哒', category: 'kitten' },
        { src: 'images/gallery8.jpg', caption: '搞笑表情', category: 'funny' },
        { src: 'images/cat1.jpg', caption: '深度睡眠', category: 'sleeping' },
        { src: 'images/cat2.jpg', caption: '探索者', category: 'playing' },
        { src: 'images/cat3.jpg', caption: '小奶猫', category: 'kitten' },
        { src: 'images/breed1.jpg', caption: '高贵气质', category: 'portrait' }
    ],
    
    masonry: null,
    filters: null,
    currentCategory: 'all',
    
    init() {
        this.masonry = document.getElementById('galleryMasonry');
        this.filters = document.querySelectorAll('.gallery-filter');
        
        if (!this.masonry) return;
        
        this.renderGallery(this.images);
        this.bindEvents();
    },
    
    renderGallery(images) {
        this.masonry.innerHTML = images.map((image, index) => `
            <div class="gallery-item fade-in" data-category="${image.category}">
                <img src="${image.src}" alt="${image.caption}" loading="lazy">
                <div class="gallery-overlay">
                    <p class="gallery-caption">${image.caption}</p>
                    <div class="gallery-actions">
                        <button class="gallery-action like-btn" data-index="${index}">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="gallery-action view-btn" data-index="${index}">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        this.bindGalleryEvents();
    },
    
    bindGalleryEvents() {
        // Like buttons
        this.masonry.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                btn.classList.toggle('liked');
                const icon = btn.querySelector('i');
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
            });
        });
        
        // View buttons (lightbox)
        this.masonry.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.dataset.index);
                Lightbox.open(this.images, index);
            });
        });
        
        // Click on image to open lightbox
        this.masonry.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                Lightbox.open(this.images, index);
            });
        });
    },
    
    bindEvents() {
        this.filters.forEach(filter => {
            filter.addEventListener('click', () => {
                this.filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                this.currentCategory = filter.dataset.category;
                
                if (this.currentCategory === 'all') {
                    this.renderGallery(this.images);
                } else {
                    const filtered = this.images.filter(img => img.category === this.currentCategory);
                    this.renderGallery(filtered);
                }
            });
        });
    }
};

// ========================================
// Stats Counter Module
// ========================================
const StatsCounter = {
    counters: null,
    animated: false,
    
    init() {
        this.counters = document.querySelectorAll('.stat-number');
        if (this.counters.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateCounters();
                    this.animated = true;
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => observer.observe(counter));
    },
    
    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
};

// ========================================
// Interactive Games Module
// ========================================
const InteractiveGames = {
    init() {
        this.initSoundButtons();
        this.initNameGenerator();
        this.initAgeConverter();
    },
    
    initSoundButtons() {
        const soundBtns = document.querySelectorAll('.sound-btn');
        const sounds = {
            meow: 'https://www.soundjay.com/cat/sounds/cat-meow-01.mp3',
            purr: 'https://www.soundjay.com/cat/sounds/cat-purr-01.mp3',
            hiss: 'https://www.soundjay.com/cat/sounds/cat-hiss-01.mp3'
        };
        
        soundBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const soundType = btn.dataset.sound;
                const audio = new Audio(sounds[soundType]);
                audio.play();
                
                // Visual feedback
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 200);
            });
        });
    },
    
    initNameGenerator() {
        const generateBtn = document.getElementById('generateName');
        const nameInput = document.getElementById('nameInput');
        const resultDiv = document.getElementById('generatedName');
        
        const catNames = ['小咪', '球球', '花花', '喵喵', '团团', '圆圆', '豆豆', '毛毛', '可可', '乐乐', '奇奇', '妙妙', '糖糖', '果果', '布丁', '奶茶', '咖啡', '奶昔', '雪球', '小黑'];
        
        generateBtn?.addEventListener('click', () => {
            const features = nameInput.value.trim();
            let suggestedName;
            
            if (features.includes('白') || features.includes('雪')) {
                suggestedName = '雪球 ❄️';
            } else if (features.includes('黑') || features.includes('夜')) {
                suggestedName = '小夜 🌙';
            } else if (features.includes('橘') || features.includes('黄')) {
                suggestedName = '橘子酱 🍊';
            } else if (features.includes('活泼') || features.includes('皮')) {
                suggestedName = '皮皮 ⚡';
            } else if (features.includes('安静') || features.includes('温')) {
                suggestedName = '暖暖 ☀️';
            } else {
                suggestedName = catNames[Math.floor(Math.random() * catNames.length)] + ' ✨';
            }
            
            resultDiv.textContent = `推荐名字：${suggestedName}`;
            resultDiv.style.animation = 'pulse 0.5s ease';
        });
    },
    
    initAgeConverter() {
        const convertBtn = document.getElementById('convertAge');
        const catAgeInput = document.getElementById('catAge');
        const humanAgeDiv = document.getElementById('humanAge');
        
        convertBtn?.addEventListener('click', () => {
            const catAge = parseFloat(catAgeInput.value);
            
            if (isNaN(catAge) || catAge < 0) {
                humanAgeDiv.textContent = '请输入有效的年龄';
                return;
            }
            
            let humanAge;
            if (catAge <= 1) {
                humanAge = catAge * 15;
            } else if (catAge <= 2) {
                humanAge = 15 + (catAge - 1) * 9;
            } else {
                humanAge = 24 + (catAge - 2) * 4;
            }
            
            humanAgeDiv.textContent = `相当于人类 ${Math.round(humanAge)} 岁 👶`;
            humanAgeDiv.style.animation = 'pulse 0.5s ease';
        });
    }
};

// ========================================
// Contact Form Module
// ========================================
const ContactForm = {
    form: null,
    successMessage: null,
    
    init() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('formSuccess');
        
        this.form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
    },
    
    submitForm() {
        // Simulate form submission
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>发送消息</span><i class="fas fa-paper-plane"></i>';
            this.successMessage.classList.add('show');
            this.form.reset();
            
            setTimeout(() => {
                this.successMessage.classList.remove('show');
            }, 5000);
        }, 1500);
    }
};

// ========================================
// Lightbox Module
// ========================================
const Lightbox = {
    lightbox: null,
    image: null,
    caption: null,
    images: [],
    currentIndex: 0,
    
    init() {
        this.lightbox = document.getElementById('lightbox');
        this.image = document.getElementById('lightboxImage');
        this.caption = document.getElementById('lightboxCaption');
        
        if (!this.lightbox) return;
        
        this.bindEvents();
    },
    
    open(images, index) {
        this.images = images;
        this.currentIndex = index;
        this.showImage(index);
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    },
    
    showImage(index) {
        this.image.src = this.images[index].src;
        this.caption.textContent = this.images[index].caption;
    },
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(this.currentIndex);
    },
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(this.currentIndex);
    },
    
    bindEvents() {
        document.getElementById('lightboxClose')?.addEventListener('click', () => this.close());
        document.getElementById('lightboxNext')?.addEventListener('click', () => this.next());
        document.getElementById('lightboxPrev')?.addEventListener('click', () => this.prev());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'ArrowLeft') this.prev();
        });
        
        // Click outside to close
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.close();
        });
    }
};

// ========================================
// Modal Module
// ========================================
const Modal = {
    modal: null,
    modalBody: null,
    
    init() {
        this.modal = document.getElementById('breedModal');
        this.modalBody = document.getElementById('modalBody');
        
        if (!this.modal) return;
        
        document.getElementById('modalClose')?.addEventListener('click', () => this.close());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    },
    
    show(breed) {
        this.modalBody.innerHTML = `
            <img src="${breed.image}" alt="${breed.name}" style="width: 100%; border-radius: 16px; margin-bottom: 1rem;">
            <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 0.5rem;">${breed.name}</h2>
            <p style="color: var(--color-text-light); margin-bottom: 1rem;"><em>${breed.english}</em></p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                <span style="background: var(--color-cream); padding: 0.5rem 1rem; border-radius: 8px;">
                    <i class="fas fa-globe-asia" style="color: var(--color-coral);"></i> 起源：${breed.origin}
                </span>
                <span style="background: var(--color-cream); padding: 0.5rem 1rem; border-radius: 8px;">
                    <i class="fas fa-clock" style="color: var(--color-coral);"></i> 寿命：${breed.lifespan}
                </span>
                <span style="background: var(--color-cream); padding: 0.5rem 1rem; border-radius: 8px;">
                    <i class="fas fa-weight" style="color: var(--color-coral);"></i> 体重：${breed.weight}
                </span>
            </div>
            <p style="line-height: 1.8; color: var(--color-text-light);">
                ${breed.name}是一种来自${breed.origin}的猫咪品种。它们以其独特的性格和外表而闻名，
                友好度评分为${breed.friendliness}星（满分 5 星）。${breed.name}通常寿命在${breed.lifespan}之间，
                成年体重约为${breed.weight}。
            </p>
        `;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

// ========================================
// Back To Top Module
// ========================================
const BackToTop = {
    button: null,
    
    init() {
        this.button = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                this.button?.classList.add('visible');
            } else {
                this.button?.classList.remove('visible');
            }
        });
        
        this.button?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

// ========================================
// Scroll Animations Module
// ========================================
const ScrollAnimations = {
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
        
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }
};

// Update current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();
