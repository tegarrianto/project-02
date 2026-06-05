function bukaKado() {
    // 1. Putar Musik langsung (Wajib nomor satu biar diizinkan sistem Chrome)
    const music = document.getElementById('bg-music');
    music.play().catch(error => console.log("Autoplay musik diblokir browser"));
    
    // 2. Picu animasi kado bergetar membesar (membuka)
    const giftBox = document.querySelector('.gift-box');
    const tapText = document.querySelector('.tap-text');
    giftBox.classList.add('open-box');
    if(tapText) tapText.style.opacity = '0';

    // Ambil titik koordinat tengah layar HP biar letupan bunga pas keluar dari kado
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;

    // 3. JEDA 350ms: Saat kado meliuk membesar, langsung tembak ledakan bunga di depan kado
    setTimeout(() => {
        buatLedakanBunga(startX, startY);
    }, 350);
    
    // 4. JEDA 1800ms: Biarkan ledakan bunga terlihat puas memancar di layar, baru ditarik ke atas
    setTimeout(() => {
        const landing = document.getElementById('landing-page');
        landing.style.transform = 'translateY(-100%)';
        
        // Membersihkan element landing page dari RAM setelah tidak terlihat
        setTimeout(() => {
            landing.style.display = 'none';
        }, 900);
    }, 1800);
    
    // 5. JEDA 2100ms: Munculkan surat utama, musik player, dan hujan kelopak background
    setTimeout(() => {
        document.getElementById('music-player').classList.add('show');
        
        const main = document.getElementById('main-content');
        main.style.opacity = '1';
        
        buatKelopakGugur();
        aktifkanAnimasiScroll();
    }, 2100);
}

// Logika Ledakan Serpihan Bunga Vektor Gede & Nyata (Layer Di Depan)
function buatLedakanBunga(startX, startY) {
    const flowerTemplates = [
        `<svg width="100%" height="100%" viewBox="0 0 24 24"><path fill="#ff6699" d="M12,2 C13,5 18,4 18,7 C18,10 14,11 12,14 C10,11 6,10 6,7 C6,4 11,5 12,2 Z"/><circle cx="12" cy="7" r="1.5" fill="#ffd700"/></svg>`,
        `<svg width="100%" height="100%" viewBox="0 0 24 24"><path fill="#ff80ab" d="M12,4 C14,4 18,6 16,10 C18,11 19,15 16,15 C15,18 10,18 9,15 C5,15 4,11 7,10 C5,6 10,4 12,4 Z"/><circle cx="12" cy="10" r="1.5" fill="#ffd700"/></svg>`,
        `<svg width="100%" height="100%" viewBox="0 0 24 24"><path fill="#ff4081" d="M12,5 L14,9 L19,9 L15,11 L17,16 L12,13 L7,16 L9,11 L5,9 L10,9 Z"/><circle cx="12" cy="10" r="1.5" fill="#fff"/></svg>`,
        `<svg width="100%" height="100%" viewBox="0 0 24 24"><path fill="#ffb3d1" d="M12,3 C15,8 20,10 12,21 C4,10 9,8 12,3 Z"/><circle cx="12" cy="10" r="1.5" fill="#ffd700"/></svg>`
    ];

    const jumlahSerpihan = 25; // Ledakan 25 kuntum sekaligus biar ramai

    for (let i = 0; i < jumlahSerpihan; i++) {
        const particle = document.createElement('div');
        particle.classList.add('burst-flower');
        particle.innerHTML = flowerTemplates[Math.floor(Math.random() * flowerTemplates.length)];
        
        // Letakkan pas di posisi tengah kado
        particle.style.left = (startX - 25) + 'px';
        particle.style.top = (startY - 25) + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 150 + 90; // Dorongan lemparan bunga melebar (90px - 240px)
        
        const targetX = Math.cos(angle) * distance + 'px';
        const targetY = Math.sin(angle) * distance + 'px';
        const rotation = Math.random() * 360 + 180 + 'deg';
        
        particle.style.setProperty('--x', targetX);
        particle.style.setProperty('--y', targetY);
        particle.style.setProperty('--r', rotation);
        
        document.body.appendChild(particle);
        
        setTimeout(() => { particle.remove(); }, 1200);
    }
}

// Pelacak Scroll Halaman Kunci
function aktifkanAnimasiScroll() {
    const mainContent = document.getElementById('main-content');
    const sections = document.querySelectorAll('.scroll-section');

    function cekSesiMasukLayar() {
        const batasPemicu = window.innerHeight * 0.85;
        sections.forEach(sesi => {
            const jarakAtas = sesi.getBoundingClientRect().top;
            if (jarakAtas < batasPemicu) {
                sesi.classList.add('active');
            }
        });
    }

    cekSesiMasukLayar();
    mainContent.addEventListener('scroll', cekSesiMasukLayar);
}

// Efek Hujan Sakura di Background
function buatKelopakGugur() {
    const container = document.getElementById('petals-container');
    setInterval(() => {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 14 + 6 + 'px';
        petal.style.width = size;
        petal.style.height = size;
        petal.style.animationDuration = Math.random() * 3 + 3 + 's';
        if (Math.random() > 0.6) { petal.style.filter = 'blur(1px)'; }
        container.appendChild(petal);
        setTimeout(() => { petal.remove(); }, 6000);
    }, 200);
}

// Klik Bunga Taman Rahasia
function tampilArti(elemen, arti) {
    const display = document.getElementById('flower-meaning');
    display.innerText = arti;
    elemen.style.transform = 'scale(1.3)';
    setTimeout(() => { elemen.style.transform = 'scale(1)'; }, 200);
}
