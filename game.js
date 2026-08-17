/**
 * BRAWL-STICKS: 1v1 & 2v2 Stickman Fighting Game Engine
 * Spectacular Class Signature Moves Rework (v2.4.0)
 */

// ==========================================
// 1. KEY BINDINGS, CLASSES & COSMETICS
// ==========================================
const defaultKeyBindings = {
    p1: { left: 'KeyA', right: 'KeyD', jump: 'KeyW', block: 'KeyS', punch: 'KeyF', kick: 'KeyG', ult: 'KeyH' },
    p2: { left: 'ArrowLeft', right: 'ArrowRight', jump: 'ArrowUp', block: 'ArrowDown', punch: 'KeyJ', kick: 'KeyK', ult: 'KeyL' }
};

let keyBindings = JSON.parse(JSON.stringify(defaultKeyBindings));

let p1Color = '#00f0ff';
let p2Color = '#ff0055';
let p1Class = 'NINJA';
let p2Class = 'BRAWLER';
let p3Class = 'STORM';
let p4Class = 'KNIGHT';
let p1Hat = 'NONE';
let p2Hat = 'NONE';
let selectedArena = 'VOLCANO';

function loadSavedPreferences() {
    try {
        const savedKeys = localStorage.getItem('brawl_sticks_keys');
        if (savedKeys) {
            try { keyBindings = JSON.parse(savedKeys); } catch (e) { keyBindings = JSON.parse(JSON.stringify(defaultKeyBindings)); }
        }

        const savedColors = localStorage.getItem('brawl_sticks_colors');
        if (savedColors) {
            try {
                const parsed = JSON.parse(savedColors);
                if (parsed && typeof parsed.p1 === 'string') p1Color = parsed.p1;
                if (parsed && typeof parsed.p2 === 'string') p2Color = parsed.p2;
            } catch (e) {}
        }

        const savedClasses = localStorage.getItem('brawl_sticks_classes');
        if (savedClasses) {
            try {
                const parsed = JSON.parse(savedClasses);
                if (parsed && typeof parsed.p1 === 'string') p1Class = parsed.p1;
                if (parsed && typeof parsed.p2 === 'string') p2Class = parsed.p2;
                if (parsed && typeof parsed.p3 === 'string') p3Class = parsed.p3;
                if (parsed && typeof parsed.p4 === 'string') p4Class = parsed.p4;
            } catch (e) {}
        }

        const savedHats = localStorage.getItem('brawl_sticks_hats');
        if (savedHats) {
            try {
                const parsed = JSON.parse(savedHats);
                if (parsed && typeof parsed.p1 === 'string') p1Hat = parsed.p1;
                if (parsed && typeof parsed.p2 === 'string') p2Hat = parsed.p2;
            } catch (e) {}
        }

        const savedArena = localStorage.getItem('brawl_sticks_arena');
        if (savedArena) selectedArena = savedArena;
    } catch (err) {}

    if (!p1Color) p1Color = '#00f0ff';
    if (!p2Color) p2Color = '#ff0055';
    if (!p1Class) p1Class = 'NINJA';
    if (!p2Class) p2Class = 'BRAWLER';
    if (!p3Class) p3Class = 'STORM';
    if (!p4Class) p4Class = 'KNIGHT';
    if (!p1Hat) p1Hat = 'NONE';
    if (!p2Hat) p2Hat = 'NONE';
    if (!selectedArena) selectedArena = 'VOLCANO';

    updateRebindButtonText();
    syncUIElements();
    applyHUDColors();
}

function savePreferences() {
    try {
        localStorage.setItem('brawl_sticks_colors', JSON.stringify({ p1: p1Color, p2: p2Color }));
        localStorage.setItem('brawl_sticks_classes', JSON.stringify({ p1: p1Class, p2: p2Class, p3: p3Class, p4: p4Class }));
        localStorage.setItem('brawl_sticks_hats', JSON.stringify({ p1: p1Hat, p2: p2Hat }));
        localStorage.setItem('brawl_sticks_arena', selectedArena);
    } catch (e) {}
    applyHUDColors();
}

function saveKeys() {
    try {
        localStorage.setItem('brawl_sticks_keys', JSON.stringify(keyBindings));
    } catch (e) {}
    updateRebindButtonText();
}

function updateRebindButtonText() {
    document.querySelectorAll('.rebind-btn').forEach(btn => {
        const p = btn.getAttribute('data-player');
        const act = btn.getAttribute('data-action');
        if (keyBindings[p] && keyBindings[p][act]) {
            btn.textContent = keyBindings[p][act];
        }
    });
}

function syncUIElements() {
    document.querySelectorAll('#p1-color-swatches .swatch').forEach(sw => {
        sw.classList.toggle('active', sw.getAttribute('data-color') === p1Color);
    });
    document.querySelectorAll('#p2-color-swatches .swatch').forEach(sw => {
        sw.classList.toggle('active', sw.getAttribute('data-color') === p2Color);
    });

    document.querySelectorAll('#p1-class-list .class-card').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-class') === p1Class);
    });
    document.querySelectorAll('#p2-class-list .class-card').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-class') === p2Class);
    });
    document.querySelectorAll('#p3-class-list .class-card').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-class') === p3Class);
    });
    document.querySelectorAll('#p4-class-list .class-card').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-class') === p4Class);
    });

    document.querySelectorAll('#p1-hat-list .hat-btn').forEach(h => {
        h.classList.toggle('active', h.getAttribute('data-hat') === p1Hat);
    });
    document.querySelectorAll('#p2-hat-list .hat-btn').forEach(h => {
        h.classList.toggle('active', h.getAttribute('data-hat') === p2Hat);
    });

    document.querySelectorAll('#arena-list .arena-card').forEach(ac => {
        ac.classList.toggle('active', ac.getAttribute('data-arena') === selectedArena);
    });

    const p3Group = document.getElementById('p3-class-group');
    const p4Group = document.getElementById('p4-class-group');
    if (p3Group) p3Group.classList.toggle('hidden', selectedMode !== 'TEAM2V2');
    if (p4Group) p4Group.classList.toggle('hidden', selectedMode !== 'TEAM2V2');

    const b1 = document.getElementById('p1-class-badge');
    const b2 = document.getElementById('p2-class-badge');
    if (b1) b1.textContent = p1Class;
    if (b2) b2.textContent = p2Class;
}

function applyHUDColors() {
    const p1Health = document.getElementById('p1-health');
    const p1Special = document.getElementById('p1-special');
    const p1Label = document.getElementById('p1-label');
    if (p1Health) p1Health.style.background = p1Color;
    if (p1Special) p1Special.style.background = p1Color;
    if (p1Label) {
        p1Label.style.color = p1Color;
        p1Label.style.textShadow = `0 0 10px ${p1Color}`;
    }

    const p2Health = document.getElementById('p2-health');
    const p2Special = document.getElementById('p2-special');
    const p2Label = document.getElementById('p2-label');
    if (p2Health) p2Health.style.background = p2Color;
    if (p2Special) p2Special.style.background = p2Color;
    if (p2Label) {
        p2Label.style.color = p2Color;
        p2Label.style.textShadow = `0 0 10px ${p2Color}`;
    }
}

document.querySelectorAll('#p1-color-swatches .swatch').forEach(sw => {
    sw.addEventListener('click', () => { p1Color = sw.getAttribute('data-color') || '#00f0ff'; syncUIElements(); savePreferences(); });
});

document.querySelectorAll('#p2-color-swatches .swatch').forEach(sw => {
    sw.addEventListener('click', () => { p2Color = sw.getAttribute('data-color') || '#ff0055'; syncUIElements(); savePreferences(); });
});

document.querySelectorAll('#p1-class-list .class-card').forEach(c => {
    c.addEventListener('click', () => { p1Class = c.getAttribute('data-class') || 'NINJA'; syncUIElements(); savePreferences(); });
});

document.querySelectorAll('#p2-class-list .class-card').forEach(c => {
    c.addEventListener('click', () => { p2Class = c.getAttribute('data-class') || 'BRAWLER'; syncUIElements(); savePreferences(); });
});

document.querySelectorAll('#p3-class-list .class-card').forEach(c => {
    c.addEventListener('click', () => { p3Class = c.getAttribute('data-class') || 'STORM'; syncUIElements(); savePreferences(); });
});

document.querySelectorAll('#p4-class-list .class-card').forEach(c => {
    c.addEventListener('click', () => { p4Class = c.getAttribute('data-class') || 'KNIGHT'; syncUIElements(); savePreferences(); });
});

document.querySelectorAll('#p1-hat-list .hat-btn').forEach(h => {
    h.addEventListener('click', () => { p1Hat = h.getAttribute('data-hat') || 'NONE'; syncUIElements(); savePreferences(); });
});

document.querySelectorAll('#p2-hat-list .hat-btn').forEach(h => {
    h.addEventListener('click', () => { p2Hat = h.getAttribute('data-hat') || 'NONE'; syncUIElements(); savePreferences(); });
});

document.querySelectorAll('#arena-list .arena-card').forEach(ac => {
    ac.addEventListener('click', () => { selectedArena = ac.getAttribute('data-arena') || 'VOLCANO'; syncUIElements(); savePreferences(); });
});

let waitingForRebind = null;

document.querySelectorAll('.rebind-btn').forEach(btn => {
    const handleRebindStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (waitingForRebind) {
            waitingForRebind.element.classList.remove('waiting');
            updateRebindButtonText();
        }
        const player = btn.getAttribute('data-player');
        const action = btn.getAttribute('data-action');
        waitingForRebind = { player, action, element: btn };
        btn.classList.add('waiting');
        btn.textContent = 'PRESS KEY...';
    };

    btn.addEventListener('click', handleRebindStart);
});

const resetKeysBtn = document.getElementById('btn-reset-keys');
if (resetKeysBtn) {
    resetKeysBtn.addEventListener('click', () => {
        keyBindings = JSON.parse(JSON.stringify(defaultKeyBindings));
        try { localStorage.removeItem('brawl_sticks_keys'); } catch (e) {}
        updateRebindButtonText();
    });
}

// ==========================================
// 2. SOUND SYNTHESIZER (Web Audio API)
// ==========================================
class SoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.isMusicOn = true;
        this.musicTimer = null;
        this.stepIndex = 0;
        this.bassNotes = [110, 110, 130.81, 146.83, 110, 110, 164.81, 146.83];
    }

    init() {
        if (!this.ctx) {
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioCtx();
            } catch (e) {}
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMusic() {
        this.isMusicOn = !this.isMusicOn;
        if (!this.isMusicOn) {
            this.stopMusic();
        } else {
            this.startMusic();
        }
        return this.isMusicOn;
    }

    startMusic(isLowHp = false) {
        if (!this.isMusicOn || !this.enabled) return;
        this.stopMusic();
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const tempo = isLowHp ? 140 : 200;
        this.musicTimer = setInterval(() => {
            if (!this.isMusicOn || !this.enabled || (gameState !== 'FIGHT' && gameState !== 'COUNTDOWN')) {
                this.stopMusic();
                return;
            }
            try {
                if (this.ctx.state === 'suspended') this.ctx.resume();
                const now = this.ctx.currentTime;

                // 1. Retro Synth Bassline
                const bassFreq = [110, 110, 130.81, 146.83, 110, 110, 164.81, 146.83][this.stepIndex % 8];
                const bassOsc = this.ctx.createOscillator();
                const bassGain = this.ctx.createGain();
                bassOsc.type = 'sawtooth';
                bassOsc.frequency.setValueAtTime(bassFreq, now);
                bassGain.gain.setValueAtTime(0.12, now);
                bassGain.gain.exponentialRampToValueAtTime(0.005, now + 0.18);
                bassOsc.connect(bassGain);
                bassGain.connect(this.ctx.destination);
                bassOsc.start(now);
                bassOsc.stop(now + 0.18);

                // 2. Synth Arpeggio Lead
                const leadFreq = [440, 523.25, 659.25, 523.25, 587.33, 659.25, 783.99, 659.25][this.stepIndex % 8];
                const leadOsc = this.ctx.createOscillator();
                const leadGain = this.ctx.createGain();
                leadOsc.type = 'square';
                leadOsc.frequency.setValueAtTime(leadFreq, now);
                leadGain.gain.setValueAtTime(0.06, now);
                leadGain.gain.exponentialRampToValueAtTime(0.002, now + 0.14);
                leadOsc.connect(leadGain);
                leadGain.connect(this.ctx.destination);
                leadOsc.start(now);
                leadOsc.stop(now + 0.14);

                // 3. Synth Percussive Hi-Hat
                if (this.stepIndex % 2 === 1) {
                    const bufSize = Math.floor(this.ctx.sampleRate * 0.03);
                    const buffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
                    const d = buffer.getChannelData(0);
                    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
                    const hatNoise = this.ctx.createBufferSource();
                    hatNoise.buffer = buffer;
                    const hatFilter = this.ctx.createBiquadFilter();
                    hatFilter.type = 'highpass';
                    hatFilter.frequency.setValueAtTime(5000, now);
                    const hatGain = this.ctx.createGain();
                    hatGain.gain.setValueAtTime(0.05, now);
                    hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                    hatNoise.connect(hatFilter);
                    hatFilter.connect(hatGain);
                    hatGain.connect(this.ctx.destination);
                    hatNoise.start(now);
                }

                this.stepIndex++;
            } catch (e) {}
        }, tempo);
    }

    stopMusic() {
        if (this.musicTimer) {
            clearInterval(this.musicTimer);
            this.musicTimer = null;
        }
    }

    playParry() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.12);
            gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.18);
        } catch (e) {}
    }

    playPunch() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(180, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.1);
        } catch (e) {}
    }

    playHeavyHit() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(120, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(20, this.ctx.currentTime + 0.25);
            gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.25);
        } catch (e) {}
    }

    playBlock() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch (e) {}
    }

    playSlide() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(110, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.18);
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.18);
        } catch (e) {}
    }

    playJump() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + 0.12);
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.12);
        } catch (e) {}
    }

    playSlash() {
        if (!this.enabled || !this.ctx) return;
        try {
            const bufferSize = this.ctx.sampleRate * 0.1;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(3000, this.ctx.currentTime + 0.1);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            noise.start();
        } catch (e) {}
    }

    playExplosion() {
        if (!this.enabled || !this.ctx) return;
        try {
            const bufferSize = this.ctx.sampleRate * 0.35;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, this.ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.35);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            noise.start();
        } catch (e) {}
    }

    playLaser() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(900, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.2);
        } catch (e) {}
    }

    playAnnouncerChime() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
            osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.1); // E5
            osc.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.2); // G5
            gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.4);
        } catch (e) {}
    }

    playUltimate() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(250, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(700, this.ctx.currentTime + 0.35);
            osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.7);
            gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.7);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.7);
        } catch (e) {}
    }

    playBossRage() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(80, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(320, this.ctx.currentTime + 0.6);
            gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.6);
        } catch (e) {}
    }
}

const audio = new SoundFX();

// ==========================================
// 3. PROJECTILE, SHOCKWAVE & PARTICLE ENGINE
// ==========================================
class DamageText {
    constructor(x, y, text, color) {
        this.x = (typeof x === 'number' && !isNaN(x)) ? x : 0;
        this.y = (typeof y === 'number' && !isNaN(y)) ? y : 0;
        this.text = text || '';
        this.color = color || '#ffffff';
        this.vy = -1.8;
        this.life = 40;
        this.maxLife = 40;
    }

    update() {
        this.y += this.vy;
        this.life--;
    }

    draw(ctx) {
        if (!ctx || isNaN(this.x) || isNaN(this.y)) return;
        const alpha = Math.max(0, this.life / this.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font = "900 17px 'Orbitron', sans-serif";
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

// GIANT SUPERNOVA PLASMA ORB PROJECTILE
class Projectile {
    constructor(x, y, vx, damage, owner) {
        this.x = (typeof x === 'number' && !isNaN(x)) ? x : 0;
        this.y = (typeof y === 'number' && !isNaN(y)) ? y : 0;
        this.vx = (typeof vx === 'number' && !isNaN(vx)) ? vx : 12;
        this.damage = (typeof damage === 'number' && !isNaN(damage)) ? damage : 30;
        this.owner = owner;
        this.color = (owner && owner.color) ? owner.color : '#aa00ff';
        this.radius = 26;
        this.active = true;
        this.rotation = 0;
    }

    update() {
        this.x += this.vx;
        this.rotation += 0.2;
        particleSystem.createPlasmaSparkTrail(this.x, this.y, this.color);
        if (this.x < -60 || this.x > 1084 || isNaN(this.x)) this.active = false;
    }

    draw(ctx) {
        if (!ctx || isNaN(this.x) || isNaN(this.y)) return;
        ctx.save();

        // Outer Glowing Plasma Aura
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner White Core
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Rotating Energy Ring
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius + 6, (this.radius + 6) * 0.4, this.rotation, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }
}

class ShockwaveRing {
    constructor(x, y, color, maxRadius = 180) {
        this.x = (typeof x === 'number' && !isNaN(x)) ? x : 0;
        this.y = (typeof y === 'number' && !isNaN(y)) ? y : 0;
        this.color = color || '#ffd700';
        this.radius = 10;
        this.maxRadius = maxRadius;
        this.active = true;
    }

    update() {
        this.radius += 14;
        if (this.radius >= this.maxRadius || isNaN(this.radius)) this.active = false;
    }

    draw(ctx) {
        if (!ctx || isNaN(this.x) || isNaN(this.y) || isNaN(this.radius)) return;
        const alpha = Math.max(0, 1 - (this.radius / this.maxRadius));
        const radX = Math.max(0.1, this.radius);
        const radY = Math.max(0.1, this.radius * 0.35);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 7;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, radX, radY, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

class Particle {
    constructor(x, y, vx, vy, color, size, life) {
        this.x = (typeof x === 'number' && !isNaN(x)) ? x : 0;
        this.y = (typeof y === 'number' && !isNaN(y)) ? y : 0;
        this.vx = (typeof vx === 'number' && !isNaN(vx)) ? vx : 0;
        this.vy = (typeof vy === 'number' && !isNaN(vy)) ? vy : 0;
        this.color = color || '#ffffff';
        this.size = size || 3;
        this.maxLife = life || 20;
        this.life = life || 20;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.15;
        this.life--;
        if (isNaN(this.x) || isNaN(this.y)) this.life = 0;
    }

    draw(ctx) {
        if (!ctx || isNaN(this.x) || isNaN(this.y)) return;
        const alpha = Math.max(0, this.life / this.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.damageTexts = [];
        this.projectiles = [];
        this.shockwaves = [];
    }

    createHitSparks(x, y, color) {
        const px = (typeof x === 'number' && !isNaN(x)) ? x : 0;
        const py = (typeof y === 'number' && !isNaN(y)) ? y : 0;
        for (let i = 0; i < 18; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 9;
            this.particles.push(new Particle(
                px, py,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed - 2,
                color || '#ffffff',
                2.5 + Math.random() * 3.5,
                22 + Math.random() * 15
            ));
        }
    }

    createRockDebris(x, y) {
        const px = (typeof x === 'number' && !isNaN(x)) ? x : 0;
        const py = (typeof y === 'number' && !isNaN(y)) ? y : 0;
        for (let i = 0; i < 24; i++) {
            const angle = -Math.PI / 4 - (Math.random() * Math.PI / 2);
            const speed = 5 + Math.random() * 12;
            this.particles.push(new Particle(
                px + (Math.random() - 0.5) * 40, py,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                Math.random() < 0.5 ? '#ffd700' : '#ff5500',
                4 + Math.random() * 4,
                25 + Math.random() * 20
            ));
        }
    }

    createShadowSmoke(x, y) {
        const px = (typeof x === 'number' && !isNaN(x)) ? x : 0;
        const py = (typeof y === 'number' && !isNaN(y)) ? y : 0;
        for (let i = 0; i < 20; i++) {
            this.particles.push(new Particle(
                px + (Math.random() - 0.5) * 50,
                py + (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 4,
                -Math.random() * 4,
                Math.random() < 0.5 ? '#aa00ff' : '#00f0ff',
                5 + Math.random() * 6,
                25 + Math.random() * 15
            ));
        }
    }

    createPlasmaSparkTrail(x, y, color) {
        for (let i = 0; i < 4; i++) {
            this.particles.push(new Particle(
                x + (Math.random() - 0.5) * 20,
                y + (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3,
                color || '#aa00ff',
                3 + Math.random() * 3,
                12 + Math.random() * 8
            ));
        }
    }

    createDust(x, y) {
        const px = (typeof x === 'number' && !isNaN(x)) ? x : 0;
        const py = (typeof y === 'number' && !isNaN(y)) ? y : 0;
        for (let i = 0; i < 6; i++) {
            this.particles.push(new Particle(
                px + (Math.random() - 0.5) * 30,
                py,
                (Math.random() - 0.5) * 2,
                -Math.random() * 2,
                'rgba(255, 255, 255, 0.4)',
                3 + Math.random() * 3,
                15 + Math.random() * 10
            ));
        }
    }

    createSlideSparks(x, y, facing, color) {
        const px = (typeof x === 'number' && !isNaN(x)) ? x : 0;
        const py = (typeof y === 'number' && !isNaN(y)) ? y : 0;
        const dir = (facing === -1) ? -1 : 1;
        for (let i = 0; i < 3; i++) {
            this.particles.push(new Particle(
                px, py,
                -dir * (3 + Math.random() * 4),
                -Math.random() * 3,
                color || '#ffffff',
                2 + Math.random() * 2,
                10 + Math.random() * 8
            ));
        }
    }

    addDamageText(x, y, text, color) {
        this.damageTexts.push(new DamageText(x, y, text, color));
    }

    addProjectile(p) {
        if (p) this.projectiles.push(p);
    }

    addShockwave(x, y, color, maxRadius = 180) {
        this.shockwaves.push(new ShockwaveRing(x, y, color, maxRadius));
    }

    updateAndDraw(ctx) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update();
            p.draw(ctx);
            if (p.life <= 0) this.particles.splice(i, 1);
        }

        for (let i = this.damageTexts.length - 1; i >= 0; i--) {
            const dt = this.damageTexts[i];
            dt.update();
            dt.draw(ctx);
            if (dt.life <= 0) this.damageTexts.splice(i, 1);
        }

        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const proj = this.projectiles[i];
            proj.update();
            proj.draw(ctx);
            if (!proj.active) this.projectiles.splice(i, 1);
        }

        for (let i = this.shockwaves.length - 1; i >= 0; i--) {
            const sw = this.shockwaves[i];
            sw.update();
            sw.draw(ctx);
            if (!sw.active) this.shockwaves.splice(i, 1);
        }
    }
}

const particleSystem = new ParticleSystem();

// ==========================================
// 4. STICKMAN FIGHTER CLASS
// ==========================================
class Stickman {
    constructor(id, x, y, color, fighterClass, hat, team, isCPU = false) {
        this.id = id;
        this.x = (typeof x === 'number' && !isNaN(x)) ? x : 200;
        this.y = (typeof y === 'number' && !isNaN(y)) ? y : 300;
        this.width = 38;
        this.height = 85;
        this.color = color || '#00f0ff';
        this.fighterClass = fighterClass || 'NINJA';
        this.hat = hat || 'NONE';
        this.team = team || 1;
        this.isCPU = isCPU;

        this.maxHealth = (this.fighterClass === 'BRAWLER') ? 130 : (this.fighterClass === 'KNIGHT') ? 110 : 100;
        this.health = this.maxHealth;

        this.vx = 0;
        this.vy = 0;
        this.speed = 5.0;
        this.jumpForce = -12.8;
        this.gravity = 0.65;
        this.isGrounded = false;
        this.jumpCount = 0;
        this.facing = this.team === 1 ? 1 : -1;

        this.specialMeter = 0;
        this.isBlocking = false;
        this.parryWindowTimer = 0;
        this.parryFlashTimer = 0;
        this.isSliding = false;
        this.slideTimer = 0;
        this.isAttacking = false;
        this.attackType = null;
        this.attackTimer = 0;
        this.stunTimer = 0;
        this.invincibleTimer = 0;

        this.aiDecisionTimer = 0;
        this.animFrame = Math.floor(Math.random() * 100);
    }

    resetPosition(x, y) {
        this.x = (typeof x === 'number' && !isNaN(x)) ? x : 200;
        this.y = (typeof y === 'number' && !isNaN(y)) ? y : 300;
        this.vx = 0;
        this.vy = 0;
        this.health = this.maxHealth;
        this.specialMeter = 0;
        this.isBlocking = false;
        this.isSliding = false;
        this.slideTimer = 0;
        this.isAttacking = false;
        this.attackTimer = 0;
        this.stunTimer = 0;
        this.invincibleTimer = 0;
        this.facing = this.team === 1 ? 1 : -1;
    }

    update(opponents, allies, keys, difficulty, mode, groundY) {
        this.animFrame++;

        if (isNaN(this.x) || !isFinite(this.x)) this.x = 200;
        if (isNaN(this.y) || !isFinite(this.y)) this.y = 300;
        if (isNaN(this.vx) || !isFinite(this.vx)) this.vx = 0;
        if (isNaN(this.vy) || !isFinite(this.vy)) this.vy = 0;
        if (isNaN(this.health) || !isFinite(this.health)) this.health = 100;
        if (isNaN(this.specialMeter) || !isFinite(this.specialMeter)) this.specialMeter = 0;

        if (this.health > 0) {
            this.specialMeter = Math.min(100, this.specialMeter + 0.08);
        }

        if (this.isBoss && this.health <= this.maxHealth * 0.5 && !this.bossRageTriggered) {
            this.bossRageTriggered = true;
            audio.playBossRage();
            triggerCameraShake(24, 18);
            particleSystem.addShockwave(this.x + this.width / 2, this.y + 30, '#ff0033', 200);
            particleSystem.addDamageText(this.x, this.y - 30, '👑 BOSS RAGE MODE ACTIVATED!', '#ff0033');
        }

        // Drastically reduced movement speed & jump physics for ALL fighters (Human & CPU)
        let baseSpeed = 2.4;
        let baseJump = -8.5;

        const speedFactor = (this.fighterClass === 'NINJA') ? 1.12 : (this.fighterClass === 'BRAWLER') ? 0.88 : 1.0;
        this.speed = baseSpeed * speedFactor * (this.bossRageTriggered ? 1.2 : 1.0);
        this.jumpForce = baseJump * (this.fighterClass === 'NINJA' ? 1.08 : 1.0);
        this.gravity = 0.40;

        if (this.bossRageTriggered && Math.random() < 0.3) {
            particleSystem.createShadowSmoke(this.x + (Math.random() - 0.5) * 30, this.y + 30);
        }

        if (this.stunTimer > 0) this.stunTimer--;
        if (this.invincibleTimer > 0) this.invincibleTimer--;
        if (this.parryWindowTimer > 0) this.parryWindowTimer--;
        if (this.parryFlashTimer > 0) this.parryFlashTimer--;

        let target = null;
        let minDist = Infinity;
        if (Array.isArray(opponents)) {
            opponents.forEach(opp => {
                if (opp && opp.health > 0 && typeof opp.x === 'number' && !isNaN(opp.x)) {
                    const dist = Math.hypot(opp.x - this.x, opp.y - this.y);
                    if (dist < minDist) {
                        minDist = dist;
                        target = opp;
                    }
                }
            });
        }

        if (target && !this.isAttacking && !this.isSliding && this.stunTimer === 0) {
            this.facing = (target.x >= this.x) ? 1 : -1;
        }

        if (this.health > 0 && this.stunTimer === 0 && gameState === 'FIGHT') {
            if (this.isCPU) {
                this.updateAI(target, difficulty);
            } else {
                this.handleInputs(keys, mode, target);
            }
        }

        if (this.isSliding) {
            this.slideTimer--;
            this.vx = this.facing * (this.speed * 1.35);
            particleSystem.createSlideSparks(this.x + this.width / 2, groundY, this.facing, this.color);
            if (this.slideTimer <= 0) {
                this.isSliding = false;
            }
        }

        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;

        if (this.y + this.height >= groundY) {
            if (!this.isGrounded) {
                particleSystem.createDust(this.x + this.width / 2, groundY);
            }
            this.y = groundY - this.height;
            this.vy = 0;
            this.isGrounded = true;
            this.jumpCount = 0;
        } else {
            this.isGrounded = false;
        }

        this.vx *= this.isSliding ? 0.90 : 0.78;
        if (this.x < 30) this.x = 30;
        if (this.x + this.width > 1024 - 30) this.x = 1024 - 30 - this.width;

        if (this.isAttacking) {
            this.attackTimer--;
            if (this.attackTimer <= 0) {
                this.isAttacking = false;
                this.attackType = null;
            }
        }
    }

    updateAI(target, difficulty) {
        if (!target) return;
        this.aiDecisionTimer--;
        const dist = Math.abs(target.x - this.x);

        const reactionDelay = difficulty === 'EASY' ? 45 : difficulty === 'NORMAL' ? 30 : 20;
        const blockProbability = difficulty === 'EASY' ? 0.15 : difficulty === 'NORMAL' ? 0.35 : 0.6;

        if (target.isAttacking && dist < 90 && Math.random() < blockProbability) {
            if (this.isGrounded && Math.random() < 0.3) {
                this.isSliding = true;
                this.slideTimer = 18;
                audio.playSlide();
            } else {
                this.isBlocking = true;
            }
            return;
        } else {
            this.isBlocking = false;
        }

        if (this.aiDecisionTimer <= 0) {
            this.aiDecisionTimer = reactionDelay;

            if (this.specialMeter >= 100 && dist < 120 && Math.random() < 0.6) {
                this.executeSignatureSpecial(target, 30);
                this.specialMeter = 0;
                audio.playUltimate();
                return;
            }

            if (dist <= 75) {
                if (!this.isAttacking && !this.isSliding) {
                    const rnd = Math.random();
                    if (rnd < 0.55) {
                        this.startAttack('light', 24, 8);
                        audio.playPunch();
                    } else {
                        this.startAttack('heavy', 36, 16);
                        audio.playPunch();
                    }
                }
            } else {
                const dir = target.x > this.x ? 1 : -1;
                const cpuSpeedFactor = difficulty === 'EASY' ? 0.65 : difficulty === 'NORMAL' ? 0.85 : 1.0;
                this.vx = dir * (this.speed * cpuSpeedFactor);

                if (target.y < this.y - 30 && this.isGrounded && Math.random() < 0.4) {
                    this.vy = this.jumpForce;
                    this.isGrounded = false;
                    audio.playJump();
                }
            }
        }
    }

    handleInputs(keys, mode, target) {
        const pid = this.id === 'p1' ? 'p1' : 'p2';
        const binds = keyBindings[pid] || defaultKeyBindings.p1;

        let leftKey = !!keys[binds.left];
        let rightKey = !!keys[binds.right];
        let jumpKey = !!keys[binds.jump];
        let blockKey = !!keys[binds.block];
        let lightKey = !!keys[binds.punch];
        let heavyKey = !!keys[binds.kick];
        let ultKey = !!keys[binds.ult];

        if (this.id === 'p1') {
            if (mode === 'CPU') {
                leftKey = leftKey || !!keys['ArrowLeft'];
                rightKey = rightKey || !!keys['ArrowRight'];
                jumpKey = jumpKey || !!keys['ArrowUp'];
                blockKey = blockKey || !!keys['ArrowDown'];
            }

            leftKey = leftKey || !!keys['touch_left'];
            rightKey = rightKey || !!keys['touch_right'];
            jumpKey = jumpKey || !!keys['touch_jump'];
            blockKey = blockKey || !!keys['touch_block'] || !!keys['touch_slide'];

            lightKey = lightKey || !!keys['mouse_punch'] || !!keys['touch_punch'];
            heavyKey = heavyKey || !!keys['mouse_kick'] || !!keys['touch_kick'];
            ultKey = ultKey || !!keys['mouse_ult'] || !!keys['touch_ult'];
        }

        if (blockKey && this.isGrounded && !this.isSliding && !this.isAttacking) {
            if (leftKey || rightKey || Math.abs(this.vx) > 1) {
                this.isSliding = true;
                this.slideTimer = 18;
                if (leftKey) this.facing = -1;
                if (rightKey) this.facing = 1;
                audio.playSlide();
            } else {
                if (!this.isBlocking) {
                    this.parryWindowTimer = 6; // 0.1s Perfect Parry Window
                }
                this.isBlocking = true;
            }
        } else if (!blockKey) {
            this.isBlocking = false;
        }

        if (!this.isBlocking && !this.isSliding) {
            if (leftKey) this.vx = -this.speed;
            if (rightKey) this.vx = this.speed;

            if (jumpKey && !keys[`jump_${this.id}`]) {
                if (this.isGrounded || this.jumpCount < 2) {
                    this.vy = this.jumpForce;
                    this.jumpCount++;
                    this.isGrounded = false;
                    keys[`jump_${this.id}`] = true;
                    audio.playJump();
                    particleSystem.createDust(this.x + this.width / 2, this.y + this.height);
                }
            }

            if (lightKey && !this.isAttacking) {
                this.startAttack('light', 24, 8);
                audio.playPunch();
            } else if (heavyKey && !this.isAttacking) {
                this.startAttack('heavy', 36, 16);
                audio.playPunch();
            } else if (ultKey && !this.isAttacking && this.specialMeter >= 100) {
                this.executeSignatureSpecial(target, 35);
                this.specialMeter = 0;
                audio.playUltimate();
            }
        }
    }

    // UNIQUE CLASS SIGNATURE SPECIAL MOVES ENGINE
    executeSignatureSpecial(target, damage) {
        const dmg = (typeof damage === 'number' && !isNaN(damage)) ? damage : 35;
        ultCinematicTimer = 30; // 0.5s freeze & 1.35x zoom!
        ultAttacker = this;
        ultSkillName = `${this.fighterClass} SIGNATURE SPECIAL`;

        if (this.fighterClass === 'NINJA') {
            // NINJA: SHADOW TELEPORT HURRICANE SLASH
            particleSystem.createShadowSmoke(this.x + 20, this.y + 30);
            if (target && typeof target.x === 'number' && !isNaN(target.x)) {
                const targetFacing = (target.facing === -1) ? -1 : 1;
                this.x = target.x - (targetFacing * 50);
                this.facing = (target.x >= this.x) ? 1 : -1;
            }
            this.startAttack('ultimate', 32, dmg);
            audio.playSlash();
            particleSystem.createShadowSmoke(this.x + 20, this.y + 30);
            particleSystem.addShockwave(this.x + this.width / 2, 460, '#aa00ff', 120);
            particleSystem.addDamageText(this.x, this.y - 25, 'SHADOW HURRICANE SLASH!', '#00f0ff');
            triggerCameraShake(12, 10);
        } else if (this.fighterClass === 'BRAWLER') {
            // BRAWLER: EARTHBREAKER FOOT GROUND SLAM
            this.vy = 10;
            this.startAttack('ultimate', 36, dmg);
            audio.playExplosion();
            triggerCameraShake(18, 16);
            particleSystem.addShockwave(this.x + this.width / 2, 460, '#ffd700', 200);
            particleSystem.addShockwave(this.x + this.width / 2, 460, '#ff5500', 140);
            particleSystem.createRockDebris(this.x + this.width / 2, 460);
            particleSystem.addDamageText(this.x, this.y - 25, 'EARTHBREAKER FOOT SLAM!', '#ffd700');
        } else if (this.fighterClass === 'WEAVER') {
            // ENERGY WEAVER: SUPERNOVA PLASMA SPHERE BURST
            this.startAttack('ultimate', 38, dmg);
            audio.playLaser();
            const projVx = this.facing * 9.0;
            particleSystem.addProjectile(new Projectile(this.x + (this.facing * 40), this.y + 30, projVx, dmg, this));
            particleSystem.addShockwave(this.x + (this.facing * 40), this.y + 30, '#aa00ff', 90);
            particleSystem.addDamageText(this.x, this.y - 25, 'SUPERNOVA PLASMA SPHERE!', '#aa00ff');
            triggerCameraShake(10, 8);
        } else if (this.fighterClass === 'KNIGHT') {
            // SHADOW KNIGHT: PHANTOM BLADE GRAND EXECUTION
            this.vx = this.facing * 12;
            this.startAttack('ultimate', 42, dmg);
            audio.playSlash();
            particleSystem.createSlideSparks(this.x, 460, this.facing, '#ff0055');
            particleSystem.createShadowSmoke(this.x, this.y + 30);
            particleSystem.addShockwave(this.x + this.width / 2, 460, '#ff0055', 150);
            particleSystem.addDamageText(this.x, this.y - 25, 'PHANTOM BLADE EXECUTION!', '#ff0055');
            triggerCameraShake(15, 12);
        } else if (this.fighterClass === 'STORM') {
            // STORM WARRIOR: LIGHTNING SPEAR THUNDER STORM
            this.startAttack('ultimate', 40, dmg);
            audio.playLaser();
            const projVx = this.facing * 10.0;
            particleSystem.addProjectile(new Projectile(this.x + (this.facing * 40), this.y + 20, projVx, dmg, this));
            particleSystem.addShockwave(this.x + this.width / 2, 460, '#00aaff', 160);
            particleSystem.addDamageText(this.x, this.y - 25, 'LIGHTNING THUNDER STORM!', '#00aaff');
            triggerCameraShake(14, 11);
        } else if (this.fighterClass === 'HUNTER') {
            // ARCANE HUNTER: CELESTIAL ARROW VOLLEY
            this.startAttack('ultimate', 36, dmg);
            audio.playLaser();
            for (let i = -1; i <= 1; i++) {
                particleSystem.addProjectile(new Projectile(this.x + (this.facing * 30), this.y + 10 + i * 15, this.facing * (9.5 + i * 1.5), dmg * 0.4, this));
            }
            particleSystem.addShockwave(this.x + this.width / 2, this.y + 30, '#00ff66', 100);
            particleSystem.addDamageText(this.x, this.y - 25, 'CELESTIAL ARROW VOLLEY!', '#00ff66');
            triggerCameraShake(10, 8);
        } else if (this.fighterClass === 'INFERNO') {
            // INFERNO BRAWLER: ERUPTING VOLCANIC FLAME PILLAR
            this.startAttack('ultimate', 34, dmg);
            audio.playExplosion();
            triggerCameraShake(16, 14);
            particleSystem.addShockwave(this.x + this.width / 2, 460, '#ff5500', 180);
            particleSystem.createHitSparks(this.x + this.width / 2, 380, '#ff2200');
            particleSystem.addDamageText(this.x, this.y - 25, 'VOLCANIC FLAME PILLAR!', '#ff5500');
        } else if (this.fighterClass === 'MONK') {
            // SPIRIT MONK: DRAGON PALM KI BLAST
            this.startAttack('ultimate', 30, dmg);
            audio.playLaser();
            particleSystem.addShockwave(this.x + (this.facing * 50), this.y + 30, '#38bdf8', 140);
            particleSystem.createHitSparks(this.x + (this.facing * 50), this.y + 30, '#38bdf8');
            particleSystem.addDamageText(this.x, this.y - 25, 'DRAGON PALM KI BLAST!', '#38bdf8');
            triggerCameraShake(12, 10);
        }
    }

    startAttack(type, duration, damage) {
        this.isAttacking = true;
        this.attackType = type;
        this.attackTimer = duration;
        this.currentAttackDamage = (typeof damage === 'number' && !isNaN(damage)) ? damage : 10;
        this.hasHitOpponent = false;
    }

    getHitbox() {
        if (!this.isAttacking || this.hasHitOpponent) return null;
        const reach = (this.attackType === 'light') ? 45 : (this.attackType === 'heavy') ? 70 : 120;
        return {
            x: (this.facing === 1) ? (this.x + this.width) : (this.x - reach),
            y: this.y + 15,
            width: reach,
            height: 45,
            damage: this.currentAttackDamage || 10,
            knockback: (this.attackType === 'light') ? 4 : (this.attackType === 'heavy') ? 10 : 20
        };
    }

    takeDamage(amount, knockback, attackerFacing, attacker = null) {
        if (this.invincibleTimer > 0 || this.health <= 0) return;

        const dmg = (typeof amount === 'number' && !isNaN(amount)) ? amount : 10;
        const kb = (typeof knockback === 'number' && !isNaN(knockback)) ? knockback : 5;
        const face = (attackerFacing === -1) ? -1 : 1;

        if (this.isBlocking && this.parryWindowTimer > 0) {
            // ⚡ PERFECT PARRY TRIGGERED!
            this.parryFlashTimer = 18;
            audio.playParry();
            particleSystem.createHitSparks(this.x + this.width / 2, this.y + 30, '#ffd700');
            particleSystem.addShockwave(this.x + this.width / 2, this.y + 30, '#ffd700', 120);
            particleSystem.addDamageText(this.x, this.y - 25, '⚡ PERFECT PARRY! (0 DMG)', '#ffd700');
            if (attacker) {
                attacker.stunTimer = 24;
                attacker.vx = -face * 6;
            }
            triggerCameraShake(8, 6);
            return;
        }

        if (this.isBlocking || this.isSliding) {
            const damageTaken = dmg * 0.25;
            this.health = Math.max(0, this.health - damageTaken);
            this.vx = face * (kb * 0.4);
            audio.playBlock();
            particleSystem.createHitSparks(this.x + this.width / 2, this.y + 30, '#ffffff');
            particleSystem.addDamageText(this.x, this.y - 15, `-${Math.round(damageTaken)} (75% BLOCK)`, '#ffffff');
            this.specialMeter = Math.min(100, this.specialMeter + 15);
            return;
        }

        this.health = Math.max(0, this.health - dmg);
        this.stunTimer = (dmg > 20) ? 20 : 12;
        this.invincibleTimer = 15;
        this.vx = face * kb;
        this.vy = -3;
        this.specialMeter = Math.min(100, this.specialMeter + 20);

        if (dmg >= 20) {
            audio.playHeavyHit();
            triggerCameraShake(12, 10);
            particleSystem.addDamageText(this.x, this.y - 15, `-${dmg} CRIT!`, '#ffd700');
        } else {
            audio.playPunch();
            triggerCameraShake(5, 5);
            particleSystem.addDamageText(this.x, this.y - 15, `-${dmg}`, this.color);
        }

        particleSystem.createHitSparks(this.x + this.width / 2, this.y + 30, this.color);
    }

    draw(ctx) {
        if (this.health <= 0 || isNaN(this.x) || isNaN(this.y)) return;

        ctx.save();
        ctx.lineWidth = 4;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineCap = 'round';

        if (this.invincibleTimer > 0 && Math.floor(this.animFrame / 3) % 2 === 0) {
            ctx.globalAlpha = 0.4;
        }

        const centerX = this.x + this.width / 2;
        const headY = this.y + 16;
        const shoulderY = headY + 16;
        const hipY = this.y + 55;
        const footY = this.y + this.height;

        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(centerX, footY + 4, 18, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        const drawHat = (hx, hy) => {
            if (isNaN(hx) || isNaN(hy)) return;
            ctx.save();
            if (this.hat === 'CROWN') {
                ctx.fillStyle = '#ffd700';
                ctx.beginPath();
                ctx.moveTo(hx - 12, hy - 12);
                ctx.lineTo(hx - 12, hy - 22);
                ctx.lineTo(hx - 6, hy - 16);
                ctx.lineTo(hx, hy - 25);
                ctx.lineTo(hx + 6, hy - 16);
                ctx.lineTo(hx + 12, hy - 22);
                ctx.lineTo(hx + 12, hy - 12);
                ctx.closePath();
                ctx.fill();
            } else if (this.hat === 'SHADES') {
                ctx.fillStyle = '#000000';
                ctx.fillRect(hx + this.facing * 2 - 8, hy - 2, 16, 5);
            } else if (this.hat === 'BANDANA') {
                ctx.strokeStyle = '#ff0044';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(hx, hy, 14, -Math.PI / 4, Math.PI / 4, this.facing < 0);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(hx - this.facing * 14, hy);
                ctx.lineTo(hx - this.facing * 24, hy + 6);
                ctx.stroke();
            } else if (this.hat === 'COWBOY') {
                ctx.fillStyle = '#8b4513';
                ctx.beginPath();
                ctx.ellipse(hx, hy - 12, 18, 5, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillRect(hx - 9, hy - 20, 18, 9);
            } else if (this.hat === 'VISOR') {
                ctx.fillStyle = '#00f0ff';
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 10;
                ctx.fillRect(hx + this.facing * 4 - 8, hy - 4, 14, 6);
            } else if (this.hat === 'TOPHAT') {
                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(hx - 14, hy - 13, 28, 4);
                ctx.fillRect(hx - 9, hy - 28, 18, 15);
            }
            ctx.restore();
        };

        if (this.isSliding) {
            const slideHeadX = centerX - this.facing * 18;
            const slideHeadY = footY - 22;
            const slideHipX = centerX;
            const slideHipY = footY - 12;

            ctx.shadowColor = this.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(slideHeadX, slideHeadY, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            drawHat(slideHeadX, slideHeadY);

            ctx.beginPath();
            ctx.moveTo(slideHeadX, slideHeadY);
            ctx.lineTo(slideHipX, slideHipY);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(slideHipX, slideHipY);
            ctx.lineTo(centerX + this.facing * 30, footY - 4);
            ctx.moveTo(slideHipX, slideHipY);
            ctx.lineTo(centerX + this.facing * 20, footY - 8);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(slideHipX, slideHipY - 6);
            ctx.lineTo(slideHipX - this.facing * 16, slideHipY - 18);
            ctx.stroke();

            ctx.restore();
            return;
        }

        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(centerX, headY, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        drawHat(centerX, headY);

        ctx.beginPath();
        ctx.moveTo(centerX, headY + 13);
        ctx.lineTo(centerX, hipY);
        ctx.stroke();

        let lLegX = centerX - 12;
        let rLegX = centerX + 12;
        let lFootY = footY;
        let rFootY = footY;

        if (Math.abs(this.vx) > 0.5 && this.isGrounded) {
            const runCycle = Math.sin(this.animFrame * 0.3);
            lLegX = centerX + runCycle * 16;
            rLegX = centerX - runCycle * 16;
        }

        // SPECIAL POSTURE RENDERING FOR ALL CLASS SIGNATURE MOVES
        if (this.isAttacking && this.attackType === 'heavy') {
            rLegX = centerX + this.facing * 56;
            rFootY = shoulderY - 12;

            ctx.save();
            ctx.strokeStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 20;
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.arc(centerX, hipY, 52, -Math.PI / 4, 0, this.facing < 0);
            ctx.stroke();
            ctx.restore();
        } else if (this.isAttacking && this.attackType === 'ultimate') {
            if (this.fighterClass === 'NINJA') {
                // Ninja 360 Whirlwind Low Spin Kick
                lLegX = centerX - this.facing * 35;
                rLegX = centerX + this.facing * 45;
                rFootY = footY - 12;

                ctx.save();
                ctx.strokeStyle = '#00f0ff';
                ctx.shadowColor = '#aa00ff';
                ctx.shadowBlur = 25;
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.arc(centerX, hipY, 48, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            } else if (this.fighterClass === 'BRAWLER') {
                // Brawler Heel Ground Slam Posture
                rLegX = centerX + this.facing * 12;
                rFootY = footY + 6;
                lLegX = centerX - this.facing * 18;

                ctx.save();
                ctx.strokeStyle = '#ffd700';
                ctx.shadowColor = '#ffd700';
                ctx.shadowBlur = 22;
                ctx.lineWidth = 7;
                ctx.beginPath();
                ctx.moveTo(centerX, hipY);
                ctx.lineTo(rLegX, rFootY);
                ctx.stroke();
                ctx.restore();
            } else if (this.fighterClass === 'KNIGHT') {
                // Knight Deep Forward Lunge Stance
                rLegX = centerX + this.facing * 40;
                lLegX = centerX - this.facing * 25;
            }
        }

        ctx.beginPath();
        ctx.moveTo(centerX, hipY);
        ctx.lineTo(lLegX, lFootY);
        ctx.moveTo(centerX, hipY);
        ctx.lineTo(rLegX, rFootY);
        ctx.stroke();

        let lHandX = centerX - 14;
        let lHandY = shoulderY + 16;
        let rHandX = centerX + 14;
        let rHandY = shoulderY + 16;

        if (this.isBlocking) {
            lHandX = centerX + this.facing * 10;
            lHandY = shoulderY - 8;
            rHandX = centerX + this.facing * 18;
            rHandY = shoulderY - 4;

            ctx.save();
            ctx.strokeStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(centerX + this.facing * 16, shoulderY, 24, -Math.PI / 2, Math.PI / 2, this.facing < 0);
            ctx.stroke();
            ctx.restore();
        } else if (this.isAttacking) {
            if (this.attackType === 'light') {
                rHandX = centerX + this.facing * 45;
                rHandY = shoulderY - 4;
            } else if (this.attackType === 'ultimate') {
                if (this.fighterClass === 'WEAVER') {
                    // Weaver Hover Both Hands Charged Blast
                    lHandX = centerX + this.facing * 35;
                    lHandY = shoulderY - 6;
                    rHandX = centerX + this.facing * 45;
                    rHandY = shoulderY - 4;
                } else if (this.fighterClass === 'KNIGHT') {
                    // Knight Giant 140px Crimson Energy Sword Beam
                    rHandX = centerX + this.facing * 50;
                    rHandY = shoulderY - 8;

                    ctx.save();
                    ctx.strokeStyle = '#ff0055';
                    ctx.shadowColor = '#ff0055';
                    ctx.shadowBlur = 30;
                    ctx.lineWidth = 9;
                    ctx.beginPath();
                    ctx.moveTo(rHandX, rHandY);
                    ctx.lineTo(rHandX + this.facing * 140, rHandY - 10);
                    ctx.stroke();

                    // White Core Beam
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(rHandX, rHandY);
                    ctx.lineTo(rHandX + this.facing * 140, rHandY - 10);
                    ctx.stroke();
                    ctx.restore();
                } else if (this.fighterClass === 'NINJA') {
                    rHandX = centerX + this.facing * 40;
                    rHandY = shoulderY - 10;
                }
            }
        }

        ctx.beginPath();
        ctx.moveTo(centerX, shoulderY);
        ctx.lineTo(lHandX, lHandY);
        ctx.moveTo(centerX, shoulderY);
        ctx.lineTo(rHandX, rHandY);
        ctx.stroke();

        ctx.restore();
    }
}

// SMOOTH CHARACTER OVERLAP & BODY PUSH APART
function resolveCharacterOverlaps() {
    if (!Array.isArray(fighters)) return;
    for (let i = 0; i < fighters.length; i++) {
        for (let j = i + 1; j < fighters.length; j++) {
            const f1 = fighters[i];
            const f2 = fighters[j];
            if (!f1 || !f2 || f1.health <= 0 || f2.health <= 0) continue;

            const dx = (f2.x + f2.width / 2) - (f1.x + f1.width / 2);
            const minDistance = (f1.width + f2.width) / 2;
            if (Math.abs(dx) < minDistance) {
                const overlap = minDistance - Math.abs(dx);
                const pushDir = (dx >= 0) ? 1 : -1;
                f1.x -= pushDir * (overlap / 2);
                f2.x += pushDir * (overlap / 2);
                if (f1.x < 30) f1.x = 30;
                if (f2.x + f2.width > 1024 - 30) f2.x = 1024 - 30 - f2.width;
            }
        }
    }
}

// ==========================================
// 5. GAME MANAGER & PAUSE SYSTEM
// ==========================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

const groundY = 460;
const keys = {};
let selectedMode = 'CPU';
let selectedDifficulty = 'NORMAL';
let gameState = 'START';
let matchTime = 60;
let timerInterval = null;
let currentRound = 1;
let team1Wins = 0;
let team2Wins = 0;

let fighters = [];
let shakeTime = 0;
let shakeIntensity = 0;
let slowMoTimer = 0;

function triggerCameraShake(time, intensity) {
    shakeTime = time;
    shakeIntensity = intensity;
}

function togglePause() {
    if (gameState === 'FIGHT') {
        gameState = 'PAUSED';
        const po = document.getElementById('pause-overlay');
        if (po) po.classList.remove('hidden');
    } else if (gameState === 'PAUSED') {
        gameState = 'FIGHT';
        const po = document.getElementById('pause-overlay');
        if (po) po.classList.add('hidden');
    }
}

const pauseTrigger = document.getElementById('btn-pause-trigger');
if (pauseTrigger) {
    pauseTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePause();
    });
}

const btnResume = document.getElementById('btn-resume');
if (btnResume) {
    btnResume.addEventListener('click', () => {
        togglePause();
    });
}

const btnRestart = document.getElementById('btn-restart');
if (btnRestart) {
    btnRestart.addEventListener('click', () => {
        const po = document.getElementById('pause-overlay');
        if (po) po.classList.add('hidden');
        startRound();
    });
}

const btnPauseMenu = document.getElementById('btn-pause-menu');
if (btnPauseMenu) {
    btnPauseMenu.addEventListener('click', () => {
        const po = document.getElementById('pause-overlay');
        const so = document.getElementById('start-overlay');
        if (po) po.classList.add('hidden');
        if (so) so.classList.remove('hidden');
        gameState = 'START';
    });
}

const pauseSoundBtn = document.getElementById('btn-pause-sound');
if (pauseSoundBtn) {
    pauseSoundBtn.addEventListener('click', () => {
        audio.enabled = !audio.enabled;
        pauseSoundBtn.textContent = audio.enabled ? '🔊 SOUND: ON' : 'MUTE SOUND';
    });
}

window.addEventListener('keydown', (e) => {
    if (waitingForRebind) {
        e.preventDefault();
        keyBindings[waitingForRebind.player][waitingForRebind.action] = e.code;
        saveKeys();
        waitingForRebind.element.classList.remove('waiting');
        waitingForRebind = null;
        return;
    }

    if (e.code === 'KeyP' || e.code === 'Escape') {
        togglePause();
        return;
    }

    keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
    if (e.code === keyBindings.p1.jump || e.code === 'ArrowUp') keys['jump_p1'] = false;
    if (e.code === keyBindings.p2.jump || e.code === 'ArrowUp') keys['jump_p2'] = false;
});

window.addEventListener('contextmenu', e => e.preventDefault());

const handleMouseDown = (e) => {
    if (gameState !== 'FIGHT') return;
    if (e.target.closest('#start-overlay') || e.target.closest('#gameover-overlay') || e.target.closest('#pause-overlay')) return;

    if (e.button === 0) {
        keys['mouse_punch'] = true;
        setTimeout(() => { keys['mouse_punch'] = false; }, 100);
    }
    if (e.button === 2) {
        keys['mouse_kick'] = true;
        setTimeout(() => { keys['mouse_kick'] = false; }, 100);
    }
    if (e.button === 1) {
        keys['mouse_ult'] = true;
        setTimeout(() => { keys['mouse_ult'] = false; }, 100);
    }
};

window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mouseup', (e) => {
    if (e.button === 0) keys['mouse_punch'] = false;
    if (e.button === 2) keys['mouse_kick'] = false;
    if (e.button === 1) keys['mouse_ult'] = false;
});

const joystickBase = document.getElementById('joystick-base');
const joystickThumb = document.getElementById('joystick-thumb');
const touchOverlay = document.getElementById('touch-overlay');
let isDraggingJoystick = false;
let joystickCenter = { x: 0, y: 0 };
const maxJoystickRadius = 38;

function updateJoystick(clientPos) {
    if (!joystickThumb) return;
    const dx = clientPos.x - joystickCenter.x;
    const dy = clientPos.y - joystickCenter.y;
    const dist = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    const clampedRadius = Math.min(dist, maxJoystickRadius);
    const thumbX = Math.cos(angle) * clampedRadius;
    const thumbY = Math.sin(angle) * clampedRadius;

    joystickThumb.style.transform = `translate(${thumbX}px, ${thumbY}px)`;

    keys['touch_left'] = dx < -14;
    keys['touch_right'] = dx > 14;
    keys['touch_jump'] = dy < -18;
    keys['touch_block'] = dy > 18;
}

function resetJoystick() {
    isDraggingJoystick = false;
    if (joystickThumb) joystickThumb.style.transform = `translate(0px, 0px)`;
    keys['touch_left'] = false;
    keys['touch_right'] = false;
    keys['touch_jump'] = false;
    keys['touch_block'] = false;
    keys['jump_p1'] = false;
}

if (joystickBase) {
    const startJoystickDrag = (clientX, clientY) => {
        const rect = joystickBase.getBoundingClientRect();
        joystickCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        isDraggingJoystick = true;
        updateJoystick({ x: clientX, y: clientY });
    };

    joystickBase.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startJoystickDrag(e.touches[0].clientX, e.touches[0].clientY);
    });

    joystickBase.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startJoystickDrag(e.clientX, e.clientY);
    });
}

window.addEventListener('mousemove', (e) => {
    if (isDraggingJoystick) {
        updateJoystick({ x: e.clientX, y: e.clientY });
    }
});

window.addEventListener('touchmove', (e) => {
    if (isDraggingJoystick && e.touches.length > 0) {
        updateJoystick({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
});

window.addEventListener('mouseup', () => { if (isDraggingJoystick) resetJoystick(); });
window.addEventListener('touchend', (e) => { if (e.touches.length === 0) resetJoystick(); });

const setupActionButton = (id, keyName) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    const pressAction = (e) => {
        e.preventDefault();
        e.stopPropagation();
        keys[keyName] = true;
        setTimeout(() => { keys[keyName] = false; }, 120);
    };

    const releaseAction = (e) => {
        e.preventDefault();
        keys[keyName] = false;
    };

    btn.addEventListener('mousedown', pressAction);
    btn.addEventListener('mouseup', releaseAction);
    btn.addEventListener('touchstart', pressAction);
    btn.addEventListener('touchend', releaseAction);
};

setupActionButton('tbtn-punch', 'touch_punch');
setupActionButton('tbtn-kick', 'touch_kick');
setupActionButton('tbtn-slide', 'touch_slide');
setupActionButton('tbtn-ult', 'touch_ult');

let touchModeSetting = 'AUTO';
const touchToggleBtn = document.getElementById('btn-touch-toggle');
const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

if (isTouchDevice && touchOverlay) {
    touchOverlay.classList.remove('hidden');
}

if (touchToggleBtn) {
    touchToggleBtn.addEventListener('click', () => {
        if (touchModeSetting === 'AUTO') {
            touchModeSetting = 'ON';
            if (touchOverlay) touchOverlay.classList.remove('hidden');
            touchToggleBtn.textContent = '📱 TOUCH: ALWAYS ON';
        } else if (touchModeSetting === 'ON') {
            touchModeSetting = 'OFF';
            if (touchOverlay) touchOverlay.classList.add('hidden');
            touchToggleBtn.textContent = '📱 TOUCH: OFF';
        } else {
            touchModeSetting = 'AUTO';
            if (isTouchDevice && touchOverlay) touchOverlay.classList.remove('hidden');
            else if (touchOverlay) touchOverlay.classList.add('hidden');
            touchToggleBtn.textContent = '📱 TOUCH: AUTO';
        }
    });
}

const stepModeSelect = document.getElementById('step-mode-select');
const stepSetupMatch = document.getElementById('step-setup-match');
const setupModeTitle = document.getElementById('setup-mode-title');
const btnBackToModes = document.getElementById('btn-back-to-modes');
const btnSettingsToggle = document.getElementById('btn-settings-toggle');
const settingsModal = document.getElementById('settings-modal');
const btnCloseSettings = document.getElementById('btn-close-settings');
const btnExitGame = document.getElementById('btn-exit-game');

document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedMode = card.getAttribute('data-mode') || 'CPU';

        const p2Label = document.getElementById('p2-label');
        const p3Hud = document.getElementById('p3-hud');
        const p4Hud = document.getElementById('p4-hud');

        const p3ClassGroup = document.getElementById('p3-class-group');
        const p4ClassGroup = document.getElementById('p4-class-group');
        const p2ClassGroup = document.getElementById('p2-class-group');

        let modeNameStr = '1 PLAYER vs CPU';

        if (selectedMode === 'ARCADE') {
            modeNameStr = 'STORY ARCADE MODE';
            if (p2Label) p2Label.textContent = 'STAGE OPPONENT';
            if (p3Hud) p3Hud.classList.add('hidden');
            if (p4Hud) p4Hud.classList.add('hidden');
            if (p3ClassGroup) p3ClassGroup.classList.add('hidden');
            if (p4ClassGroup) p4ClassGroup.classList.add('hidden');
            if (p2ClassGroup) p2ClassGroup.classList.add('hidden');
        } else if (selectedMode === 'CPU') {
            modeNameStr = '1 PLAYER vs CPU';
            if (p2Label) p2Label.textContent = 'CPU (ENEMY)';
            if (p3Hud) p3Hud.classList.add('hidden');
            if (p4Hud) p4Hud.classList.add('hidden');
            if (p3ClassGroup) p3ClassGroup.classList.add('hidden');
            if (p4ClassGroup) p4ClassGroup.classList.add('hidden');
            if (p2ClassGroup) p2ClassGroup.classList.remove('hidden');
        } else if (selectedMode === 'LOCAL') {
            modeNameStr = '1v1 LOCAL VERSUS';
            if (p2Label) p2Label.textContent = 'PLAYER 2';
            if (p3Hud) p3Hud.classList.add('hidden');
            if (p4Hud) p4Hud.classList.add('hidden');
            if (p3ClassGroup) p3ClassGroup.classList.add('hidden');
            if (p4ClassGroup) p4ClassGroup.classList.add('hidden');
            if (p2ClassGroup) p2ClassGroup.classList.remove('hidden');
        } else if (selectedMode === 'TEAM2V2') {
            modeNameStr = '2v2 TEAM BRAWL';
            if (p2Label) p2Label.textContent = 'RED TEAM 1';
            if (p3Hud) p3Hud.classList.remove('hidden');
            if (p4Hud) p4Hud.classList.remove('hidden');
            if (p3ClassGroup) p3ClassGroup.classList.remove('hidden');
            if (p4ClassGroup) p4ClassGroup.classList.remove('hidden');
            if (p2ClassGroup) p2ClassGroup.classList.remove('hidden');
        }

        if (setupModeTitle) setupModeTitle.textContent = `MODE: ${modeNameStr}`;

        if (stepModeSelect) stepModeSelect.classList.add('hidden');
        if (stepSetupMatch) stepSetupMatch.classList.remove('hidden');

        syncUIElements();
    });
});

if (btnBackToModes) {
    btnBackToModes.addEventListener('click', () => {
        if (stepSetupMatch) stepSetupMatch.classList.add('hidden');
        if (stepModeSelect) stepModeSelect.classList.remove('hidden');
    });
}

if (btnSettingsToggle) {
    btnSettingsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        audio.init();
        if (settingsModal) settingsModal.classList.remove('hidden');
    });
}

if (btnCloseSettings) {
    btnCloseSettings.addEventListener('click', () => {
        if (settingsModal) settingsModal.classList.add('hidden');
    });
}

if (btnExitGame) {
    btnExitGame.addEventListener('click', () => {
        const so = document.getElementById('start-overlay');
        const eo = document.getElementById('exit-overlay');
        if (so) so.classList.add('hidden');
        if (eo) eo.classList.remove('hidden');
        try { window.close(); } catch (e) {}
    });
}

const btnReenterGame = document.getElementById('btn-reenter-game');
if (btnReenterGame) {
    btnReenterGame.addEventListener('click', () => {
        const so = document.getElementById('start-overlay');
        const eo = document.getElementById('exit-overlay');
        if (eo) eo.classList.add('hidden');
        if (so) so.classList.remove('hidden');
        const sms = document.getElementById('step-mode-select');
        const ssm = document.getElementById('step-setup-match');
        if (ssm) ssm.classList.add('hidden');
        if (sms) sms.classList.remove('hidden');
    });
}

document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedDifficulty = btn.getAttribute('data-diff') || 'NORMAL';
    });
});

const btnStart = document.getElementById('btn-start');
if (btnStart) {
    btnStart.addEventListener('click', () => {
        audio.init();
        const so = document.getElementById('start-overlay');
        if (so) so.classList.add('hidden');
        if (selectedMode === 'ARCADE') arcadeStage = 1;
        startMatch();
    });
}

const btnRematch = document.getElementById('btn-rematch');
if (btnRematch) {
    btnRematch.addEventListener('click', () => {
        const go = document.getElementById('gameover-overlay');
        if (go) go.classList.add('hidden');
        team1Wins = 0;
        team2Wins = 0;
        if (selectedMode === 'ARCADE') arcadeStage = 1;
        updateScoreDots();
        startMatch();
    });
}

const btnMenu = document.getElementById('btn-menu');
if (btnMenu) {
    btnMenu.addEventListener('click', () => {
        const go = document.getElementById('gameover-overlay');
        const so = document.getElementById('start-overlay');
        if (go) go.classList.add('hidden');
        if (so) so.classList.remove('hidden');
        gameState = 'START';
    });
}

const soundToggleBtn = document.getElementById('btn-sound-toggle');
if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
        audio.enabled = !audio.enabled;
        soundToggleBtn.textContent = audio.enabled ? '🔊 SOUND: ON' : 'MUTE SOUND';
    });
}

let arcadeStage = 1;
const arcadeStages = [
    { stage: 1, title: 'STAGE 1: SHADOW SHINOBI', class: 'NINJA', arena: 'TEMPLE', color: '#00f0ff', hat: 'BANDANA', hp: 100 },
    { stage: 2, title: 'STAGE 2: HEAVY BOXER', class: 'BRAWLER', arena: 'CYBER', color: '#ffd700', hat: 'VISOR', hp: 120 },
    { stage: 3, title: 'STAGE 3: VOLCANIC LORD', class: 'INFERNO', arena: 'VOLCANO', color: '#ff5500', hat: 'COWBOY', hp: 140 },
    { stage: 4, title: 'STAGE 4: SKY MAGE', class: 'WEAVER', arena: 'TEMPLE', color: '#aa00ff', hat: 'TOPHAT', hp: 150 },
    { stage: 5, title: 'FINAL BOSS: SHADOW OVERLORD 👑', class: 'KNIGHT', arena: 'VOLCANO', color: '#ff0033', hat: 'CROWN', hp: 350, isBoss: true }
];

function getArcadeStageInfo() {
    const idx = Math.max(0, Math.min(arcadeStages.length - 1, (arcadeStage || 1) - 1));
    return arcadeStages[idx] || arcadeStages[0];
}

function setupFighters() {
    fighters = [];
    if (selectedMode === 'ARCADE') {
        const stageInfo = getArcadeStageInfo();
        selectedArena = stageInfo.arena || 'VOLCANO';
        
        fighters.push(new Stickman('p1', 200, 300, p1Color, p1Class, p1Hat, 1, false));
        
        const bossEnemy = new Stickman('p2', 750, 300, stageInfo.color, stageInfo.class, stageInfo.hat, 2, true);
        bossEnemy.maxHealth = stageInfo.hp || 100;
        bossEnemy.health = stageInfo.hp || 100;
        if (stageInfo.isBoss) {
            bossEnemy.isBoss = true;
            bossEnemy.bossRageTriggered = false;
        }
        fighters.push(bossEnemy);

        const p2Label = document.getElementById('p2-label');
        if (p2Label) {
            p2Label.textContent = stageInfo.title;
            p2Label.style.color = stageInfo.color;
            p2Label.style.textShadow = `0 0 12px ${stageInfo.color}`;
        }
    } else if (selectedMode === 'CPU') {
        fighters.push(new Stickman('p1', 200, 300, p1Color, p1Class, p1Hat, 1, false));
        fighters.push(new Stickman('p2', 750, 300, p2Color, p2Class, p2Hat, 2, true));
    } else if (selectedMode === 'LOCAL') {
        fighters.push(new Stickman('p1', 200, 300, p1Color, p1Class, p1Hat, 1, false));
        fighters.push(new Stickman('p2', 750, 300, p2Color, p2Class, p2Hat, 2, false));
    } else if (selectedMode === 'TEAM2V2') {
        fighters.push(new Stickman('p1', 180, 300, p1Color, p1Class, p1Hat, 1, false));
        fighters.push(new Stickman('p3', 280, 300, p1Color, p3Class, 'NONE', 1, true));
        fighters.push(new Stickman('p2', 720, 300, p2Color, p2Class, p2Hat, 2, true));
        fighters.push(new Stickman('p4', 820, 300, p2Color, p4Class, 'NONE', 2, true));
    }
    applyHUDColors();
}

function updateScoreDots() {
    const p1Dots = document.querySelectorAll('#p1-score .dot');
    const p2Dots = document.querySelectorAll('#p2-score .dot');

    p1Dots.forEach((dot, idx) => {
        dot.style.background = idx < team1Wins ? p1Color : 'rgba(255, 255, 255, 0.2)';
        dot.style.boxShadow = idx < team1Wins ? `0 0 10px ${p1Color}` : 'none';
    });

    p2Dots.forEach((dot, idx) => {
        dot.style.background = idx < team2Wins ? p2Color : 'rgba(255, 255, 255, 0.2)';
        dot.style.boxShadow = idx < team2Wins ? `0 0 10px ${p2Color}` : 'none';
    });
}

const btnMusicToggle = document.getElementById('btn-music-toggle');
const btnPauseMusic = document.getElementById('btn-pause-music');

function updateMusicButtons() {
    const txt = audio.isMusicOn ? '🎵 MUSIC: ON' : '🎵 MUSIC: OFF';
    if (btnMusicToggle) btnMusicToggle.textContent = txt;
    if (btnPauseMusic) btnPauseMusic.textContent = txt;
}

if (btnMusicToggle) {
    btnMusicToggle.addEventListener('click', () => {
        audio.toggleMusic();
        updateMusicButtons();
    });
}
if (btnPauseMusic) {
    btnPauseMusic.addEventListener('click', () => {
        audio.toggleMusic();
        updateMusicButtons();
    });
}

let ultCinematicTimer = 0;
let ultAttacker = null;
let ultSkillName = '';

const arcadeDialogues = {
    1: { speaker: "STAGE 1: SHADOW SHINOBI 🥷", avatar: "🥷", text: '"Shadows conceal my blade. Show me your true strength!"' },
    2: { speaker: "STAGE 2: HEAVY BOXER 🥊", avatar: "🥊", text: '"You think you can take my heavy hooks? Let\'s brawl!"' },
    3: { speaker: "STAGE 3: VOLCANIC LORD 🔥", avatar: "🔥", text: '"Magma burns eternal! Fall before the flames of victory!"' },
    4: { speaker: "STAGE 4: SKY MAGE 🔮", avatar: "🔮", text: '"The winds and celestial skies bow to my spellwork!"' },
    5: { speaker: "STAGE 5: SHADOW OVERLORD 👑", avatar: "👑", text: '"Fools think they can claim my throne. I am the Overlord of Shadows!"' }
};

function triggerArcadeDialogue(stageNum, callback) {
    const dialogueOverlay = document.getElementById('dialogue-overlay');
    const dialogueSpeaker = document.getElementById('dialogue-speaker');
    const dialogueAvatar = document.getElementById('dialogue-avatar');
    const dialogueText = document.getElementById('dialogue-text');
    const btnContinue = document.getElementById('btn-continue-dialogue');

    const info = arcadeDialogues[stageNum] || arcadeDialogues[1];
    if (dialogueSpeaker) dialogueSpeaker.textContent = info.speaker;
    if (dialogueAvatar) dialogueAvatar.textContent = info.avatar;
    if (dialogueText) dialogueText.textContent = info.text;

    if (dialogueOverlay) dialogueOverlay.classList.remove('hidden');

    const handleContinue = (e) => {
        if (e) e.stopPropagation();
        if (dialogueOverlay) dialogueOverlay.classList.add('hidden');
        if (btnContinue) btnContinue.removeEventListener('click', handleContinue);
        window.removeEventListener('keydown', handleSpaceKey);
        callback();
    };

    const handleSpaceKey = (e) => {
        if (e.code === 'Space' || e.code === 'Enter') {
            handleContinue();
        }
    };

    if (btnContinue) btnContinue.addEventListener('click', handleContinue);
    window.addEventListener('keydown', handleSpaceKey);
}

function startMatch() {
    currentRound = 1;
    team1Wins = 0;
    team2Wins = 0;
    updateScoreDots();
    startRound();
}

function startRound() {
    setupFighters();
    matchTime = 60;
    const mt = document.getElementById('match-timer');
    const rl = document.getElementById('round-label');
    if (mt) mt.textContent = matchTime;
    
    const stageInfo = getArcadeStageInfo();
    if (selectedMode === 'ARCADE') {
        if (rl) rl.textContent = stageInfo.title;
        triggerArcadeDialogue(arcadeStage, () => {
            runCountdown(stageInfo);
        });
    } else {
        if (rl) rl.textContent = `ROUND ${currentRound}`;
        runCountdown(stageInfo);
    }
}

function runCountdown(stageInfo) {
    const announcerOverlay = document.getElementById('announcer-overlay');
    const announcerText = document.getElementById('announcer-text');

    gameState = 'COUNTDOWN';
    if (announcerOverlay) announcerOverlay.classList.remove('hidden');
    if (announcerText) announcerText.textContent = (selectedMode === 'ARCADE') ? stageInfo.title : `ROUND ${currentRound}`;
    audio.playAnnouncerChime();

    setTimeout(() => {
        if (announcerText) announcerText.textContent = 'READY...';
        setTimeout(() => {
            if (announcerText) announcerText.textContent = 'FIGHT!';
            setTimeout(() => {
                if (announcerOverlay) announcerOverlay.classList.add('hidden');
                gameState = 'FIGHT';
                audio.startMusic();
                startTimer();
            }, 600);
        }, 800);
    }, 1000);
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (gameState === 'FIGHT') {
            matchTime--;
            const mt = document.getElementById('match-timer');
            if (mt) mt.textContent = matchTime;
            if (matchTime <= 0) {
                handleRoundEnd('TIMEOUT');
            }
        }
    }, 1000);
}

let koZoomX = 512;
let koZoomY = 300;

function getColorName(hex) {
    if (!hex) return 'PLAYER';
    const h = hex.toLowerCase();
    if (h === '#00f0ff') return 'CYAN';
    if (h === '#ff0055' || h === '#e60000') return 'RED';
    if (h === '#00ff66') return 'GREEN';
    if (h === '#ffd700') return 'GOLD';
    if (h === '#aa00ff') return 'PURPLE';
    if (h === '#ff6600') return 'ORANGE';
    if (h === '#ff00aa') return 'PINK';
    if (h === '#ffffff') return 'WHITE';
    if (h === '#00f5c4') return 'TEAL';
    return 'FIGHTER';
}

function handleRoundEnd(reason, defender = null) {
    if (gameState === 'ROUND_OVER' || gameState === 'MATCH_OVER') return;
    clearInterval(timerInterval);
    gameState = 'ROUND_OVER';

    if (reason === 'KO') {
        slowMoTimer = 120; // 2.0 Seconds of dramatic 0.33x slow-motion KO time dilation
        if (defender && typeof defender.x === 'number') {
            koZoomX = defender.x + defender.width / 2;
            koZoomY = defender.y + 30;
        } else {
            koZoomX = 512;
            koZoomY = 300;
        }
        triggerCameraShake(24, 18);
        audio.playHeavyHit();
    } else {
        slowMoTimer = 0;
    }

    const announcerOverlay = document.getElementById('announcer-overlay');
    const announcerText = document.getElementById('announcer-text');
    if (announcerOverlay) announcerOverlay.classList.remove('hidden');

    const team1HealthTotal = fighters.filter(f => f.team === 1).reduce((sum, f) => sum + f.health, 0);
    const team2HealthTotal = fighters.filter(f => f.team === 2).reduce((sum, f) => sum + f.health, 0);

    let roundWinnerTeam = null;
    if (team1HealthTotal > team2HealthTotal) roundWinnerTeam = 1;
    else if (team2HealthTotal > team1HealthTotal) roundWinnerTeam = 2;

    if (announcerText) announcerText.textContent = (reason === 'KO') ? 'K.O.!' : 'TIME OVER!';

    const p1ColorName = getColorName(p1Color);
    const p2ColorName = getColorName(p2Color);

    setTimeout(() => {
        if (roundWinnerTeam === 1) {
            team1Wins++;
            if (announcerText) announcerText.textContent = (selectedMode === 'ARCADE') ? 'STAGE CLEARED!' : `${p1ColorName} FIGHTER WINS!`;
        } else if (roundWinnerTeam === 2) {
            team2Wins++;
            if (announcerText) announcerText.textContent = (selectedMode === 'ARCADE') ? 'DEFEATED!' : `${p2ColorName} FIGHTER WINS!`;
        } else {
            if (announcerText) announcerText.textContent = 'DRAW!';
        }
        updateScoreDots();

        setTimeout(() => {
            if (selectedMode === 'ARCADE') {
                if (roundWinnerTeam === 1) {
                    if (arcadeStage < 5) {
                        arcadeStage++;
                        startMatch();
                    } else {
                        handleMatchEnd(1);
                    }
                } else {
                    handleMatchEnd(2);
                }
            } else {
                if (team1Wins >= 2 || team2Wins >= 2) {
                    handleMatchEnd(team1Wins >= 2 ? 1 : 2);
                } else {
                    currentRound++;
                    startRound();
                }
            }
        }, 1800);
    }, 1400);
}

function handleMatchEnd(winningTeam) {
    gameState = 'MATCH_OVER';
    const ao = document.getElementById('announcer-overlay');
    if (ao) ao.classList.add('hidden');
    const gameOverOverlay = document.getElementById('gameover-overlay');
    const winnerTitle = document.getElementById('winner-title');

    const stageInfo = getArcadeStageInfo();
    const p1ColorName = getColorName(p1Color);
    const p2ColorName = getColorName(p2Color);

    if (winnerTitle) {
        if (selectedMode === 'ARCADE') {
            if (winningTeam === 1) {
                winnerTitle.textContent = '🏆 STORY ARCADE CHAMPION! YOU DEFEATED SHADOW OVERLORD!';
                winnerTitle.style.color = '#ffd700';
                winnerTitle.style.textShadow = '0 0 20px #ffd700';
            } else {
                winnerTitle.textContent = `DEFEATED ON ${stageInfo.title}`;
                winnerTitle.style.color = '#ff0055';
                winnerTitle.style.textShadow = '0 0 15px #ff0055';
            }
        } else {
            const winColorName = (winningTeam === 1) ? p1ColorName : p2ColorName;
            const winColorHex = (winningTeam === 1) ? p1Color : p2Color;
            winnerTitle.textContent = `${winColorName} FIGHTER WINS MATCH!`;
            winnerTitle.style.color = winColorHex;
            winnerTitle.style.textShadow = `0 0 15px ${winColorHex}`;
        }
    }

    const sr = document.getElementById('stat-rounds');
    if (sr) sr.textContent = (selectedMode === 'ARCADE') ? `Stage ${arcadeStage} / 5` : `${team1Wins} - ${team2Wins}`;
    if (gameOverOverlay) gameOverOverlay.classList.remove('hidden');
}

function checkCombatCollisions() {
    if (gameState !== 'FIGHT') return;

    resolveCharacterOverlaps();

    fighters.forEach(attacker => {
        if (!attacker || attacker.health <= 0) return;
        const hb = attacker.getHitbox();
        if (hb) {
            fighters.forEach(defender => {
                if (defender && defender.team !== attacker.team && defender.health > 0) {
                    if (hb.x < defender.x + defender.width &&
                        hb.x + hb.width > defender.x &&
                        hb.y < defender.y + defender.height &&
                        hb.y + hb.height > defender.y) {

                        defender.takeDamage(hb.damage, hb.knockback, attacker.facing);
                        attacker.hasHitOpponent = true;

                        const meterGain = (attacker.attackType === 'light') ? 25 : 35;
                        attacker.specialMeter = Math.min(100, attacker.specialMeter + meterGain);

                        const teamRemaining = fighters.filter(f => f.team === defender.team && f.health > 0);
                        if (teamRemaining.length === 0) {
                            handleRoundEnd('KO', defender);
                        }
                    }
                }
            });
        }
    });

    particleSystem.projectiles.forEach(proj => {
        if (!proj || !proj.active || !proj.owner) return;
        fighters.forEach(defender => {
            if (defender && defender.team !== proj.owner.team && defender.health > 0) {
                const dist = Math.hypot(defender.x + defender.width / 2 - proj.x, defender.y + 30 - proj.y);
                if (dist < proj.radius + 20) {
                    defender.takeDamage(proj.damage, 18, proj.vx > 0 ? 1 : -1);
                    particleSystem.createHitSparks(proj.x, proj.y, proj.color);
                    particleSystem.addShockwave(proj.x, proj.y, proj.color, 120);
                    proj.active = false;

                    const teamRemaining = fighters.filter(f => f.team === defender.team && f.health > 0);
                    if (teamRemaining.length === 0) {
                        handleRoundEnd('KO', defender);
                    }
                }
            }
        });
    });
}

// 🏟️ INTERACTIVE 2D STAGE ARENA & HAZARDS ENGINE
let arenaMeteorites = [];
let arenaSakuraPetals = [];
let arenaTimer = 0;

function draw2DArena(ctx) {
    if (!ctx) return;
    arenaTimer++;

    if (selectedArena === 'VOLCANO') {
        // 🌋 VOLCANIC MAGMA PIT ARENA
        ctx.fillStyle = '#0f0303';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Volcanic Sky Glow
        const bgGrad = ctx.createLinearGradient(0, 0, 0, groundY);
        bgGrad.addColorStop(0, '#1c0505');
        bgGrad.addColorStop(1, '#470b04');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, groundY);

        // Pulsing Lava Ground Base
        ctx.fillStyle = '#170c0c';
        ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

        // Magma Edge Sea
        ctx.fillStyle = '#ff3300';
        ctx.shadowColor = '#ff2200';
        ctx.shadowBlur = 20;
        ctx.fillRect(0, groundY + 10, 90, canvas.height - groundY - 10);
        ctx.fillRect(934, groundY + 10, 90, canvas.height - groundY - 10);

        // Glowing Center Runic Compass Circle
        ctx.strokeStyle = '#ff4400';
        ctx.shadowColor = '#ff3300';
        ctx.shadowBlur = 20;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(512, groundY, 180, 25, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Falling Fire Meteorite Hazard Spawns
        if (arenaTimer % 280 === 0 && gameState === 'FIGHT') {
            const mx = 120 + Math.random() * 784;
            arenaMeteorites.push({ x: mx, y: -40, vx: (Math.random() - 0.5) * 3, vy: 7 + Math.random() * 4, radius: 18 });
        }

        // Draw & Update Meteorites
        for (let i = arenaMeteorites.length - 1; i >= 0; i--) {
            const m = arenaMeteorites[i];
            m.x += m.vx;
            m.y += m.vy;

            ctx.save();
            ctx.fillStyle = '#ff3300';
            ctx.shadowColor = '#ff3300';
            ctx.shadowBlur = 25;
            ctx.beginPath();
            ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            if (m.y >= groundY - 10) {
                particleSystem.addShockwave(m.x, groundY, '#ff3300', 140);
                particleSystem.createHitSparks(m.x, groundY, '#ff5500');
                triggerCameraShake(12, 10);

                // Meteorite Impact Damage to nearby fighters
                fighters.forEach(f => {
                    if (f && f.health > 0 && Math.abs(f.x + f.width / 2 - m.x) < 70) {
                        f.takeDamage(15, 12, f.x > m.x ? 1 : -1);
                        particleSystem.addDamageText(f.x, f.y - 20, 'METEOR STRIKE!', '#ff3300');
                    }
                });

                arenaMeteorites.splice(i, 1);
            }
        }

    } else if (selectedArena === 'CYBER') {
        // 🌆 CYBERPUNK NEON ROOFTOP ARENA
        ctx.fillStyle = '#030511';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Cyber Skyline Skyscrapers
        ctx.fillStyle = '#091026';
        for (let i = 0; i < 18; i++) {
            const bx = i * 60;
            const bh = 140 + Math.sin(i * 2.5) * 80;
            ctx.fillRect(bx, groundY - bh, 48, bh);
        }

        // Neon Grid Floor
        ctx.fillStyle = '#0a1024';
        ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

        ctx.strokeStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 15;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(canvas.width, groundY);
        ctx.stroke();

        // Electric Barrier Fences (Left & Right Perimeter Shock Hazards)
        for (let xPos of [40, 984]) {
            ctx.strokeStyle = (Math.floor(arenaTimer / 4) % 2 === 0) ? '#00f0ff' : '#ff00aa';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 25;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(xPos, 120);
            ctx.lineTo(xPos, groundY);
            ctx.stroke();

            // Check Electric Barrier Hazard Collisions
            fighters.forEach(f => {
                if (f && f.health > 0 && Math.abs(f.x + f.width / 2 - xPos) < 25) {
                    const knockDir = (xPos < 500) ? 1 : -1;
                    f.takeDamage(10, 14, knockDir);
                    particleSystem.createHitSparks(f.x + f.width / 2, f.y + 30, '#00f0ff');
                    particleSystem.addShockwave(f.x + f.width / 2, f.y + 30, '#00f0ff', 90);
                    particleSystem.addDamageText(f.x, f.y - 20, 'ELECTRIC SHOCK!', '#00f0ff');
                }
            });
        }

    } else {
        // ⛩️ CELESTIAL SKY DOJO ARENA
        const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
        skyGrad.addColorStop(0, '#74abdd');
        skyGrad.addColorStop(1, '#e6f2fc');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // White Marble Floor Base
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

        ctx.strokeStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 15;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(canvas.width, groundY);
        ctx.stroke();

        // Floating Sakura Petals
        if (arenaTimer % 15 === 0 && arenaSakuraPetals.length < 35) {
            arenaSakuraPetals.push({ x: Math.random() * canvas.width, y: -10, vx: 1 + Math.random() * 2, vy: 1 + Math.random() * 1.5 });
        }

        ctx.fillStyle = '#fda4af';
        for (let i = arenaSakuraPetals.length - 1; i >= 0; i--) {
            const p = arenaSakuraPetals[i];
            p.x += p.vx;
            p.y += p.vy;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
            if (p.y > canvas.height || p.x > canvas.width) arenaSakuraPetals.splice(i, 1);
        }
    }
}

function checkCombatCollisions() {
    if (gameState !== 'FIGHT') return;

    resolveCharacterOverlaps();

    fighters.forEach(attacker => {
        if (!attacker || attacker.health <= 0) return;
        const hb = attacker.getHitbox();
        if (hb) {
            fighters.forEach(defender => {
                if (defender && defender.team !== attacker.team && defender.health > 0) {
                    if (hb.x < defender.x + defender.width &&
                        hb.x + hb.width > defender.x &&
                        hb.y < defender.y + defender.height &&
                        hb.y + hb.height > defender.y) {

                        defender.takeDamage(hb.damage, hb.knockback, attacker.facing);
                        attacker.hasHitOpponent = true;

                        // COMBO COUNTER TRACKING
                        attacker.comboHits = (attacker.comboHits || 0) + 1;
                        attacker.comboDamage = (attacker.comboDamage || 0) + hb.damage;
                        attacker.comboTimer = 75;

                        let comboText = `${attacker.comboHits} HITS!`;
                        if (attacker.comboHits === 3) comboText = "3 HITS - RAGE COMBO!";
                        else if (attacker.comboHits === 5) comboText = "5 HITS - UNSTOPPABLE!";
                        else if (attacker.comboHits === 8) comboText = "8 HITS - SUPER CANCEL!";
                        else if (attacker.comboHits >= 10) comboText = `${attacker.comboHits} HITS - GODLIKE!`;

                        particleSystem.addDamageText(attacker.x, attacker.y - 40, comboText, attacker.color);

                        const meterGain = (attacker.attackType === 'light') ? 25 : 35;
                        attacker.specialMeter = Math.min(100, attacker.specialMeter + meterGain);

                        const teamRemaining = fighters.filter(f => f.team === defender.team && f.health > 0);
                        if (teamRemaining.length === 0) {
                            slowMoTimer = 60;
                            handleRoundEnd('KO');
                        }
                    }
                }
            });
        }
    });

    particleSystem.projectiles.forEach(proj => {
        if (!proj || !proj.active || !proj.owner) return;
        fighters.forEach(defender => {
            if (defender && defender.team !== proj.owner.team && defender.health > 0) {
                const dist = Math.hypot(defender.x + defender.width / 2 - proj.x, defender.y + 30 - proj.y);
                if (dist < proj.radius + 20) {
                    defender.takeDamage(proj.damage, 18, proj.vx > 0 ? 1 : -1);
                    particleSystem.createHitSparks(proj.x, proj.y, proj.color);
                    particleSystem.addShockwave(proj.x, proj.y, proj.color, 120);
                    proj.active = false;

                    const teamRemaining = fighters.filter(f => f.team === defender.team && f.health > 0);
                    if (teamRemaining.length === 0) {
                        slowMoTimer = 60;
                        handleRoundEnd('KO');
                    }
                }
            }
        });
    });
}

function updateHUD() {
    const p1 = fighters.find(f => f.id === 'p1');
    const p2 = fighters.find(f => f.id === 'p2');
    const p3 = fighters.find(f => f.id === 'p3');
    const p4 = fighters.find(f => f.id === 'p4');

    if (p1) {
        const p1h = document.getElementById('p1-health');
        const p1s = document.getElementById('p1-special');
        if (p1h) p1h.style.width = `${Math.max(0, (p1.health / p1.maxHealth) * 100)}%`;
        if (p1s) p1s.style.width = `${p1.specialMeter}%`;
    }
    if (p2) {
        const p2h = document.getElementById('p2-health');
        const p2s = document.getElementById('p2-special');
        if (p2h) p2h.style.width = `${Math.max(0, (p2.health / p2.maxHealth) * 100)}%`;
        if (p2s) p2s.style.width = `${p2.specialMeter}%`;
    }
    if (p3) {
        const p3h = document.getElementById('p3-health');
        if (p3h) p3h.style.width = `${Math.max(0, (p3.health / p3.maxHealth) * 100)}%`;
    }
    if (p4) {
        const p4h = document.getElementById('p4-health');
        if (p4h) p4h.style.width = `${Math.max(0, (p4.health / p4.maxHealth) * 100)}%`;
    }
}

function gameLoop() {
    if (!ctx) return;
    ctx.save();

    let isPhysicsStep = true;
    if (ultCinematicTimer > 0) {
        ultCinematicTimer--;
        isPhysicsStep = false;

        const zoom = 1.35;
        const focusX = (ultAttacker && typeof ultAttacker.x === 'number') ? ultAttacker.x + ultAttacker.width / 2 : canvas.width / 2;
        const focusY = (ultAttacker && typeof ultAttacker.y === 'number') ? ultAttacker.y + 30 : 300;

        ctx.translate(focusX, focusY);
        ctx.scale(zoom, zoom);
        ctx.translate(-focusX, -focusY);
    } else if (slowMoTimer > 0) {
        slowMoTimer--;
        isPhysicsStep = (slowMoTimer % 3 === 0);

        const zoom = 1.35;
        const focusX = (typeof koZoomX === 'number' && !isNaN(koZoomX)) ? koZoomX : canvas.width / 2;
        const focusY = (typeof koZoomY === 'number' && !isNaN(koZoomY)) ? koZoomY : 300;

        ctx.translate(focusX, focusY);
        ctx.scale(zoom, zoom);
        ctx.translate(-focusX, -focusY);
    }

    if (shakeTime > 0) {
        const dx = (Math.random() - 0.5) * shakeIntensity;
        const dy = (Math.random() - 0.5) * shakeIntensity;
        ctx.translate(dx, dy);
        shakeTime--;
    }

    draw2DArena(ctx);

    if (gameState === 'FIGHT' || gameState === 'ROUND_OVER') {
        if (isPhysicsStep) {
            fighters.forEach(f => {
                const opponents = fighters.filter(o => o.team !== f.team);
                const allies = fighters.filter(a => a.team === f.team && a.id !== f.id);
                f.update(opponents, allies, keys, selectedDifficulty, selectedMode, groundY);
            });
            checkCombatCollisions();
        }
    } else if (gameState === 'COUNTDOWN') {
        // Lock fighters in starting positions facing each other during countdown
        fighters.forEach(f => {
            f.vx = 0;
            f.vy = 0;
            f.isAttacking = false;
            f.isBlocking = false;
            f.isSliding = false;
            f.y = groundY - f.height;
            const opp = fighters.find(o => o.team !== f.team);
            if (opp) f.facing = (opp.x >= f.x) ? 1 : -1;
        });
    }

    particleSystem.updateAndDraw(ctx);
    fighters.forEach(f => f.draw(ctx));

    if (ultCinematicTimer > 0 && ultAttacker) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, 35);
        ctx.fillRect(0, canvas.height - 35, canvas.width, 35);

        ctx.font = '900 18px "Orbitron", sans-serif';
        ctx.fillStyle = '#ffd700';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 15;
        ctx.textAlign = 'center';
        ctx.fillText(`⚡ ${ultAttacker.fighterClass}: ${ultSkillName}`, canvas.width / 2, 24);
    }

    ctx.restore();
    updateHUD();
    requestAnimationFrame(gameLoop);
}

loadSavedPreferences();
gameLoop();
