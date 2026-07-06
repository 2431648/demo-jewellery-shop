// ==========================================
// 1. DATABASE: JEWELRY PRODUCTS & BEST DESIGNS SLIDES
// ==========================================

// Main product catalog (Filtered by Material and Type)
const jewelryData = [
    { 
        id: 1, 
        title: "Royal Solitaire Ring", 
        material: "gold", 
        type: "ring", 
        quality: "22K Pure BIS Hallmarked Gold, VVS Diamond", 
        desc: "A majestic gold solitaire ring designed to shine gracefully at any luxury setting.", 
        img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600" 
    },
    { 
        id: 2, 
        title: "Classic Sterling Cuff", 
        material: "silver", 
        type: "bracelet", 
        quality: "925 Premium Oxidized Sterling Silver", 
        desc: "Hand-carved premium sterling silver cuff emphasizing minimalist elegant style.", 
        img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600" 
    },
    { 
        id: 3, 
        title: "Emerald Choker Set", 
        material: "artificial", 
        type: "necklace", 
        quality: "Premium Polished Alloy, High Grade Simulated Crystals", 
        desc: "A gorgeous, high-fashion statement necklace displaying deep emerald hues.", 
        img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600" 
    },
    { 
        id: 4, 
        title: "Empress Golden Loop", 
        material: "gold", 
        type: "necklace", 
        quality: "18K Antique Gold Polish with Rubies", 
        desc: "A heavily detailed Tanishq-style heritage look necklace ideal for bridal aesthetics.", 
        img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=600" 
    },
    { 
        id: 5, 
        title: "Aura Silver Droplets", 
        material: "silver", 
        type: "ring", 
        quality: "925 Pure Rhodium-plated Silver", 
        desc: "Sleek layered diamond bands nested onto a pristine liquid silver ring finish.", 
        img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600" 
    },
    { 
        id: 6, 
        title: "Boho Beads Stack", 
        material: "artificial", 
        type: "bracelet", 
        quality: "Durable Thread, Non-tarnish Brass accents", 
        desc: "A playful luxury casual design item tailored perfectly for statement styling.", 
        img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=600" 
    }
];

// Premium images used for the automatic Hero background slideshow
const backgroundSliderImages = [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1920"
];

// Global Tracking States for current active filters
const grid = document.getElementById('jewelry-grid');
let currentMaterial = 'all';
let currentType = 'all';


// ==========================================
// 2. ENGINE: HERO BACKGROUND CAROUSEL SLIDER
// ==========================================
function initHeroSlider() {
    const carouselContainer = document.getElementById('hero-carousel');
    if (!carouselContainer) return;
    
    // Inject images into the background wrapper dynamically
    backgroundSliderImages.forEach((imgUrl, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        imgElement.alt = "Luxury Background Slide";
        // Make the first image active instantly, others stay hidden via opacity
        imgElement.className = `carousel-img ${index === 0 ? 'active' : ''}`;
        carouselContainer.appendChild(imgElement);
    });

    let activeSlideIndex = 0;
    const slides = carouselContainer.getElementsByClassName('carousel-img');

    // Automatically cross-fade slides every 5 seconds (5000ms)
    setInterval(() => {
        if (slides.length === 0) return;
        slides[activeSlideIndex].classList.remove('active');
        activeSlideIndex = (activeSlideIndex + 1) % slides.length;
        slides[activeSlideIndex].classList.add('active');
    }, 5000);
}


// ==========================================
// 3. ENGINE: DYNAMIC SHOWCASE GRID CARDS
// ==========================================
function renderCards() {
    if (!grid) return;
    grid.innerHTML = "";
    
    // Check item matching parameters against user selections
    const filtered = jewelryData.filter(item => {
        const matchMat = currentMaterial === 'all' || item.material === currentMaterial;
        const matchType = currentType === 'all' || item.type === currentType;
        return matchMat && matchType;
    });

    // Empty State Scenario Handling
    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500 tracking-wide text-sm">No exquisite designs match your exact combination selection.</div>`;
        return;
    }

    // Build Cards Layout with dynamic staggering fade-in delay
    filtered.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = "glass-card group cursor-pointer overflow-hidden transition-all duration-500 transform opacity-0 translate-y-4";
        card.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
        
        card.innerHTML = `
            <div class="relative overflow-hidden h-80 bg-neutral-900">
                <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60"></div>
                <span class="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md border border-amber-400/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    ${item.material}
                </span>
            </div>
            <div class="p-6">
                <span class="text-[10px] text-amber-400/60 uppercase tracking-widest block mb-1 font-medium">${item.type}</span>
                <h3 class="serif-font text-lg font-medium text-stone-200 tracking-wide mb-2 group-hover:text-amber-400 transition-colors">${item.title}</h3>
                <p class="text-xs text-gray-400 line-clamp-2 font-light leading-relaxed mb-4">${item.desc}</p>
                <div class="text-[11px] font-mono text-gray-500 border-t border-neutral-800/60 pt-3 flex items-center justify-between">
                    <span>View Details</span>
                    <span class="text-amber-400 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </div>
        `;
        // Listen for card click to display specific quality details popup modal
        card.addEventListener('click', () => openModal(item));
        grid.appendChild(card);
    });
}


// ==========================================
// 4. LISTENERS: FILTER BUTTON CONTROLLERS
// ==========================================

// Material Filtering Management Action (Gold / Silver / Artificial)
const materialFilters = document.getElementById('material-filters');
if (materialFilters) {
    materialFilters.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;
        
        // Reset classes for all buttons in this section
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.className = "filter-btn px-5 py-2 text-xs uppercase tracking-wider font-semibold border border-neutral-800 text-gray-400 hover:text-amber-400 transition-all duration-300";
        });
        
        // Set active button styles
        e.target.className = "filter-btn active-btn px-5 py-2 text-xs uppercase tracking-wider font-semibold border border-amber-400 bg-amber-400 text-neutral-950 transition-all duration-300";
        
        currentMaterial = e.target.getAttribute('data-filter');
        renderCards();
    });
}

// Type Category Filtering Management Action (Rings / Necklaces / Bracelets)
const typeFilters = document.getElementById('type-filters');
if (typeFilters) {
    typeFilters.addEventListener('click', (e) => {
        if (!e.target.classList.contains('type-btn')) return;
        
        // Reset styles for all type buttons
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.className = "type-btn text-gray-400 hover:text-amber-400 border-b-2 border-transparent px-3 py-1 text-xs uppercase tracking-widest font-medium transition-colors";
        });
        
        // Set active type look
        e.target.className = "type-btn text-amber-400 border-b-2 border-amber-400 px-3 py-1 text-xs uppercase tracking-widest font-medium";
        
        currentType = e.target.getAttribute('data-type');
        renderCards();
    });
}


// ==========================================
// 5. INTERACTION: PRODUCT POPUP DETAIL MODAL
// ==========================================
const modal = document.getElementById('detail-modal');
const modalContent = document.getElementById('modal-content');

function openModal(item) {
    if (!modal || !modalContent) return;
    
    document.getElementById('modal-img').src = item.img;
    document.getElementById('modal-tag').innerText = `${item.material} • ${item.type}`;
    document.getElementById('modal-title').innerText = item.title;
    document.getElementById('modal-desc').innerText = item.desc;
    document.getElementById('modal-quality').innerText = item.quality;

    // Show modal container via smooth CSS transitions
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');
}

function closeModal() {
    if (!modal || !modalContent) return;
    
    // Hide modal smoothly
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
}

// Attach close click events
const closeModalBtn = document.getElementById('close-modal');
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (e) => { 
        if (e.target === modal) closeModal(); 
    });
}


// ==========================================
// 6. INITIALIZATION CORE RUNNER
// ==========================================
// Boots up both the presentation data grid and the background loop slider together
renderCards();
initHeroSlider();