// Set tanggal target (1 Januari tahun depan)
const newYearDate = new Date(new Date().getFullYear() + 1, 0, 1);

// Update countdown setiap detik
const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = newYearDate - now;

    // Perhitungan waktu
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Tampilkan hasil
    document.getElementById('days').innerText = formatTime(days);
    document.getElementById('hours').innerText = formatTime(hours);
    document.getElementById('minutes').innerText = formatTime(minutes);
    document.getElementById('seconds').innerText = formatTime(seconds);

    // Jika hitung mundur selesai, tampilkan confetti
    if (distance < 0) {
        clearInterval(countdown);
        document.querySelector('.countdown').style.display = 'none';
        document.querySelector('h1').innerText = 'Selamat Tahun Baru!';
        startConfetti();
    }
}, 1000);

// Format waktu dengan menambahkan 0 di depan jika kurang dari 10
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Animasi Bintang
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;
        const x = Math.random() * window.innerWidth;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

createStars();

// Confetti Effect
function startConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];

    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.radius = Math.random() * 10 + 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.speed = Math.random() * 3 + 2;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.opacity = 1;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.radius / 2, -this.radius / 2, this.radius, this.radius);
            ctx.restore();
        }

        update() {
            this.y += this.speed;
            this.rotation += this.rotationSpeed;
            if (this.y > canvas.height + this.radius) {
                this.y = -this.radius;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    function init() {
        for (let i = 0; i < 150; i++) {
            confettiPieces.push(new Confetti());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach(confetti => {
            confetti.draw();
            confetti.update();
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
