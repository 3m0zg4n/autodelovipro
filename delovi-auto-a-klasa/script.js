// Animated Statistics Counter
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const increment = target / 50; // Animation speed
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current).toLocaleString();
                }, 40);
                
                observer.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
}

// Parts filtering functionality
function setupPartsFiltering() {
    const modelFilter = document.getElementById('modelFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const partsGrid = document.getElementById('partsGrid');
    
    if (!modelFilter || !categoryFilter || !partsGrid) return;
    
    function filterParts() {
        const selectedModel = modelFilter.value;
        const selectedCategory = categoryFilter.value;
        const parts = partsGrid.querySelectorAll('.part-item');
        
        parts.forEach(part => {
            const partModel = part.getAttribute('data-model');
            const partCategory = part.getAttribute('data-category');
            
            const modelMatch = selectedModel === 'all' || partModel.includes(selectedModel);
            const categoryMatch = selectedCategory === 'all' || partCategory === selectedCategory;
            
            if (modelMatch && categoryMatch) {
                part.style.display = 'block';
                part.style.opacity = '1';
                part.style.transform = 'scale(1)';
            } else {
                part.style.display = 'none';
                part.style.opacity = '0';
                part.style.transform = 'scale(0.8)';
            }
        });
        
        // Update results count
        const visibleParts = partsGrid.querySelectorAll('.part-item[style*="display: block"], .part-item:not([style*="display: none"])');
        const resultsText = document.querySelector('.results-count');
        if (resultsText) {
            resultsText.textContent = `Prikazano ${visibleParts.length} delova`;
        }
    }
    
    modelFilter.addEventListener('change', filterParts);
    categoryFilter.addEventListener('change', filterParts);
}

// Order form handling
function setupOrderForms() {
    const orderButtons = document.querySelectorAll('.btn-order');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const partCard = this.closest('.card');
            const partName = partCard.querySelector('.card-title').textContent;
            const partPrice = partCard.querySelector('.price-tag').textContent;
            const partCategory = partCard.querySelector('.badge').textContent;
            
            // Create and show order modal
            showOrderModal(partName, partPrice, partCategory);
        });
    });
}

// Order Modal
function showOrderModal(partName, partPrice, partCategory) {
    const modalHTML = `
        <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="orderModalLabel">
                            <i class="fas fa-shopping-cart"></i> Porudžbina Dela
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="order-summary mb-4 p-3 bg-light rounded">
                            <h6><strong>Izabrani Deo:</strong></h6>
                            <p class="mb-1"><strong>${partName}</strong></p>
                            <p class="mb-1">Kategorija: <span class="badge bg-primary">${partCategory}</span></p>
                            <p class="mb-0 text-primary fs-5"><strong>Cena: ${partPrice}</strong></p>
                        </div>
                        
                        <form id="orderForm">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="customerName" class="form-label">Ime i Prezime *</label>
                                    <input type="text" class="form-control" id="customerName" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="customerPhone" class="form-label">Telefon *</label>
                                    <input type="tel" class="form-control" id="customerPhone" required>
                                </div>
                                <div class="col-12">
                                    <label for="customerEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="customerEmail">
                                </div>
                                <div class="col-md-6">
                                    <label for="carModel" class="form-label">Model Vozila</label>
                                    <select class="form-select" id="carModel">
                                        <option value="">Izaberite model</option>
                                        <option value="A140">Mercedes A140</option>
                                        <option value="A160">Mercedes A160</option>
                                        <option value="A170">Mercedes A170</option>
                                        <option value="A180">Mercedes A180</option>
                                        <option value="A200">Mercedes A200</option>
                                        <option value="A250">Mercedes A250</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="carYear" class="form-label">Godište</label>
                                    <input type="number" class="form-control" id="carYear" min="1997" max="2024" placeholder="2010">
                                </div>
                                <div class="col-12">
                                    <label for="deliveryAddress" class="form-label">Adresa za Dostavu</label>
                                    <textarea class="form-control" id="deliveryAddress" rows="2" placeholder="Unesite adresu za dostavu..."></textarea>
                                </div>
                                <div class="col-12">
                                    <label for="orderNotes" class="form-label">Napomene</label>
                                    <textarea class="form-control" id="orderNotes" rows="3" placeholder="Dodatne informacije o delu ili porudžbini..."></textarea>
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="termsAccept" required>
                                        <label class="form-check-label" for="termsAccept">
                                            Slažem se sa uslovima prodaje i politikom privatnosti *
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <button type="button" class="btn btn-secondary me-md-2" data-bs-dismiss="modal">
                                    <i class="fas fa-times"></i> Otkaži
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-check"></i> Pošalji Porudžbinu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('orderModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('orderModal'));
    modal.show();
    
    // Handle form submission
    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleOrderSubmission(partName, partPrice, partCategory);
        modal.hide();
    });
}

// Handle order submission
function handleOrderSubmission(partName, partPrice, partCategory) {
    const formData = {
        partName: partName,
        partPrice: partPrice,
        partCategory: partCategory,
        customerName: document.getElementById('customerName').value,
        customerPhone: document.getElementById('customerPhone').value,
        customerEmail: document.getElementById('customerEmail').value,
        carModel: document.getElementById('carModel').value,
        carYear: document.getElementById('carYear').value,
        deliveryAddress: document.getElementById('deliveryAddress').value,
        orderNotes: document.getElementById('orderNotes').value
    };
    
    // Here you would normally send the data to your backend
    console.log('Order Data:', formData);
    
    // Show success message
    showSuccessMessage(formData.customerName, formData.partName);
}

// Success message
function showSuccessMessage(customerName, partName) {
    const successHTML = `
        <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title" id="successModalLabel">
                            <i class="fas fa-check-circle"></i> Porudžbina Uspešno Poslata
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="mb-3">
                            <i class="fas fa-check-circle text-success" style="font-size: 3rem;"></i>
                        </div>
                        <h5>Hvala vam, ${customerName}!</h5>
                        <p class="mb-3">Vaša porudžbina za <strong>${partName}</strong> je uspešno poslata.</p>
                        <p class="text-muted">Kontaktiraćemo vas u najkraćem roku radi potvrde i dogovora dostave.</p>
                        
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle"></i>
                            <strong>Šta sledi:</strong><br>
                            1. Pozvaćemo vas za potvrdu<br>
                            2. Proverićemo dostupnost dela<br>
                            3. Dogovorićemo dostavu ili preuzimanje
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">
                            <i class="fas fa-thumbs-up"></i> U redu
                        </button>
                        <a href="tel:+381111234567" class="btn btn-primary">
                            <i class="fas fa-phone"></i> Pozovite Nas
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();
    
    // Clean up modal after hiding
    document.getElementById('successModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Contact form handling
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value
        };
        
        // Here you would send to backend
        console.log('Contact Form Data:', formData);
        
        // Show success message
        showContactSuccessMessage(formData.name);
        contactForm.reset();
    });
}

function showContactSuccessMessage(name) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show mt-3';
    alert.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <strong>Hvala vam, ${name}!</strong> Vaša poruka je uspešno poslata. Kontaktiraćemo vas u najkraćem roku.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.getElementById('contactForm').insertAdjacentElement('afterend', alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Newsletter signup
function setupNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletterEmail').value;
        
        // Here you would send to backend
        console.log('Newsletter signup:', email);
        
        // Show success message
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show mt-2';
        alert.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Uspešno ste se prijavili na newsletter!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        newsletterForm.insertAdjacentElement('afterend', alert);
        newsletterForm.reset();
        
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 3000);
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    animateStats();
    setupPartsFiltering();
    setupOrderForms();
    setupContactForm();
    setupNewsletter();
    setupSmoothScrolling();
    setupLazyLoading();
    
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card, .service-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        cardObserver.observe(card);
    });
    
    // Mobile menu handling
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
            });
        });
    }
});

// Add order button functionality to existing buttons
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-primary') && e.target.closest('.card-footer')) {
        e.preventDefault();
        const button = e.target.closest('.btn-primary');
        button.classList.add('btn-order');
        
        const partCard = button.closest('.card');
        const partName = partCard.querySelector('.card-title').textContent;
        const partPrice = partCard.querySelector('.price-tag').textContent;
        const partCategory = partCard.querySelector('.badge').textContent;
        
        showOrderModal(partName, partPrice, partCategory);
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    
    // Preload critical images
    const criticalImages = [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
        'https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src + '?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
    });
});
