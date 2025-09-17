document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.querySelector('#search-bar .fa-search');
    const allProductCards = document.querySelectorAll('.product-card');
    const allCategorySections = document.querySelectorAll('.product-category-section');
    const noResultsMessage = document.getElementById('no-results-message');

    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
        });
    });

    // Search bar logic
    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        let totalResultsFound = false;

        allCategorySections.forEach(categorySection => {
            let hasResultsInThisCategory = false;
            const productsInThisCategory = categorySection.querySelectorAll('.product-card');
            
            productsInThisCategory.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.product-description')?.textContent.toLowerCase() || ''; 
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.classList.remove('hidden');
                    hasResultsInThisCategory = true;
                    totalResultsFound = true;
                } else {
                    card.classList.add('hidden');
                }
            });

            if (hasResultsInThisCategory) {
                categorySection.classList.remove('hidden');
            } else {
                categorySection.classList.add('hidden');
            }
        });

        if (totalResultsFound) {
            noResultsMessage.classList.add('hidden');
        } else {
            noResultsMessage.classList.remove('hidden');
        }
    };

    if (searchInput) {
        searchInput.addEventListener('keyup', performSearch);
    }
    
    if (searchIcon) {
        searchIcon.addEventListener('click', performSearch);
    }

    // Initialize logic for each product card
    allProductCards.forEach(card => {
        // Carousel Logic
        const carousel = card.querySelector('.image-carousel');
        const images = card.querySelectorAll('.carousel-img');
        const dotsContainer = card.querySelector('.carousel-dots');
        let currentIndex = 0;
        let startX = 0;
        let endX = 0;

        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            images.forEach(() => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dotsContainer.appendChild(dot);
            });
        }

        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.remove('active');
                if (i === index) {
                    img.classList.add('active');
                }
            });
            
            dots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
        }
    
        function showNext() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }
    
        function showPrev() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }
        
        if (images.length > 0) {
            showImage(currentIndex);
        }
    
        if (carousel) {
            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
    
            carousel.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                if (startX > endX + 50) {
                    showPrev();
                } else if (startX < endX - 50) {
                    showNext();
                }
            });
        }
        
        const descriptionBtn = card.querySelector('.description-btn');
        const productDescription = card.querySelector('.product-description');
        if (descriptionBtn && productDescription) {
            descriptionBtn.addEventListener('click', () => {
                productDescription.classList.toggle('show');
                descriptionBtn.classList.toggle('open');
            });
        }
    
        const buyBtn = card.querySelector('.buy-btn');
        const colorCircles = card.querySelectorAll('.color-circle');
    
        colorCircles.forEach(circle => {
            circle.addEventListener('click', () => {
                colorCircles.forEach(c => c.classList.remove('active'));
                circle.classList.add('active');
            });
        });
    
        if (buyBtn) {
            buyBtn.addEventListener('click', (e) => {
                e.preventDefault(); 
                
                if (colorCircles.length > 0) {
                    const selectedColorCircle = card.querySelector('.color-circle.active');
        
                    if (!selectedColorCircle) {
                        alert('دوست خوبم یه رنگ انتخاب کن :)');
                    } else {
                        const productName = card.querySelector('h3').textContent.trim();
                        const colorName = selectedColorCircle.dataset.colorName;
                        const firstImageSrc = card.querySelector('.image-carousel .carousel-img').src;
                        
                        const messageText = `سلام، می‌خواستم این محصول رو سفارش بدم:
نام محصول: ${productName}
رنگ انتخاب شده: ${colorName}
لینک عکس: ${firstImageSrc}`;
                        
                        const phoneNumber = '989046429399';
                        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;
                        
                        window.location.href = whatsappUrl;
                    }
                } else {
                    const productName = card.querySelector('h3').textContent.trim();
                    const firstImageSrc = card.querySelector('.image-carousel .carousel-img').src;

                    const messageText = `سلام، می‌خواستم این محصول رو سفارش بدم:
نام محصول: ${productName}
لینک عکس: ${firstImageSrc}`;
                    
                    const phoneNumber = '989046429399';
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;
                    window.location.href = whatsappUrl;
                }
            });
        }
    });

});

// اضافه کردن قابلیت اسکرول و باز شدن منو برای دکمه "دسته بندی"
    const categoryLink = document.getElementById('category-link');
    const hamburgerButton = document.querySelector('.hamburger-menu');

    if (categoryLink && hamburgerButton) {
        categoryLink.addEventListener('click', (e) => {
            e.preventDefault();
            // اسکرول به بالای صفحه
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // شبیه سازی کلیک روی دکمه همبرگری
            hamburgerButton.click();
        });
    }


const noxBar = document.querySelector('.nox');
    const footer = document.querySelector('.main-footer');

    if (noxBar && footer) {
        window.addEventListener('scroll', () => {
            const footerTop = footer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (footerTop <= windowHeight) {
                // اگر فوتر به پایین صفحه رسید، نوار .nox رو مخفی کن
                noxBar.classList.add('hide-on-footer');
            } else {
                // در غیر این صورت، نوار .nox رو نمایش بده
                noxBar.classList.remove('hide-on-footer');
            }
        });
    }