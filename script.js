const usernameEl = document.querySelector('.username');
const baseUsername = usernameEl && (usernameEl.getAttribute('data-text') || usernameEl.textContent || '').toString();
const glitchChars = '!@#$%&+?/_';

function runUsernameGlitch() {
    if (!usernameEl || !baseUsername) return;

    let frame = 0;
    const totalFrames = 10;

    const interval = setInterval(() => {
        const output = baseUsername
            .split('')
            .map((ch) => {
                if (ch === ' ') return ch;
                if (frame >= totalFrames - 1) return ch;
                return Math.random() < 0.35
                    ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
                    : ch;
            })
            .join('');

        usernameEl.textContent = output;
        frame += 1;

        if (frame >= totalFrames) {
            clearInterval(interval);
            usernameEl.textContent = baseUsername;
        }
    }, 55);
}

setInterval(() => {
    if (Math.random() < 0.7) {
        runUsernameGlitch();
    }
}, 3500);

const statusTextEl = document.querySelector('.status-text');

if (statusTextEl) {
    const fullStatus = (statusTextEl.dataset.text || '').toString();
    let index = 0;

    const typeInterval = setInterval(() => {
        index += 1;

        if (index >= fullStatus.length) {
            statusTextEl.textContent = fullStatus;
            clearInterval(typeInterval);
            return;
        }

        statusTextEl.textContent = fullStatus.slice(0, index);
    }, 45);
}