const container = document.getElementById('laugh-container');
const wrapper = document.querySelector('.glass-card');
const cursor = document.createElement('div');
cursor.id = 'cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    if(cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
    
    const x = (window.innerWidth - e.pageX * 2) / 60;
    const y = (window.innerHeight - e.pageY * 2) / 60;
    if(wrapper) wrapper.style.transform = `translate(${x}px, ${y}px) rotateX(${-y/2}deg) rotateY(${x/2}deg)`;
});

document.addEventListener('mousedown', () => {
    document.body.classList.add('glitch-click');
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    setTimeout(() => {
        document.body.classList.remove('glitch-click');
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
});

const hexTimer = document.getElementById('hex-timer');
const hexChars = "0123456789ABCDEF";

setInterval(() => {
    if(hexTimer) {
        let code = "";
        for(let i=0; i<6; i++) code += hexChars[Math.floor(Math.random()*16)];
        hexTimer.innerText = `UID: 0 // ${code}`;
    }
}, 100);

const phrases = ["AXAXAXA", "AXAXAX", "AXXAXXA", "XAXAXA", "DIE", "WATCHING", "I SEE YOU", "NO ESCAPE", "RUN"];

function spawnLaugh() {
    const el = document.createElement('div');
    let text = phrases[Math.floor(Math.random() * phrases.length)];
    if (text.includes("AX")) {
        const len = Math.floor(Math.random() * 8) + 4;
        text = "";
        for(let i=0; i<len; i++) text += Math.random() > 0.4 ? "A" : "X";
    }
    
    el.innerText = text;
    el.classList.add('laugh-word');

    const size = Math.random() * 3 + 1; 
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const rotation = (Math.random() - 0.5) * 60;
    const duration = Math.random() * 4 + 2; 

    el.style.fontSize = `${size}rem`;
    el.style.left = `${x}vw`;
    el.style.top = `${y}vh`;
    el.style.transform = `rotate(${rotation}deg)`;
    el.style.transition = `all ${duration}s linear, opacity ${duration/2}s ease-in-out`;

    if (Math.random() > 0.92 || text === "DIE" || text === "WATCHING" || text === "I SEE YOU") {
        el.classList.add('red-mode');
        el.style.fontSize = `${size * 1.3}rem`;
        el.style.zIndex = 5;
    }

    container.appendChild(el);

    requestAnimationFrame(() => {
        el.style.opacity = Math.random() * 0.2 + 0.05; 
        if (el.classList.contains('red-mode')) el.style.opacity = 0.6;
        
        const moveX = (Math.random() - 0.5) * 15;
        const moveY = (Math.random() - 0.5) * 15;
        el.style.transform = `translate(${moveX}vw, ${moveY}vh) rotate(${rotation + 10}deg) scale(1.1)`;
    });

    setTimeout(() => {
        el.style.opacity = 0;
        setTimeout(() => el.remove(), 1000);
    }, duration * 1000);
}

setInterval(spawnLaugh, 70);

setInterval(() => {
    if (Math.random() > 0.88) {
        document.body.classList.add('bleeding');
        setTimeout(() => document.body.classList.remove('bleeding'), 300);

        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.innerText = Math.random() > 0.5 ? "DIE" : "AXAXAXA";
                el.classList.add('laugh-word', 'red-mode');
                el.style.fontSize = `${Math.random() * 5 + 3}rem`;
                el.style.left = `${Math.random() * 90}vw`;
                el.style.top = `${Math.random() * 90}vh`;
                el.style.opacity = 0.6;
                el.style.transform = `scale(0.5) rotate(${Math.random()*90-45}deg)`;
                el.style.transition = "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                container.appendChild(el);
                requestAnimationFrame(() => {
                    el.style.transform = `scale(1.3) rotate(${Math.random()*90-45}deg)`;
                    el.style.opacity = 0;
                });
                setTimeout(() => el.remove(), 400);
            }, i * 40);
        }
    }
}, 4000);