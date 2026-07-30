/**
 * BRAWL-STICKS: 1v1 & 2v2 Stickman Fighting Game Engine
 * Fully Crash-Guarded & Hardened Engine (v2.3.2)
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
let p1Hat = 'NONE';
let p2Hat = 'NONE';

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
    } catch (err) {
        console.warn("Storage access restricted:", err);
    }

    // Safety Fallbacks
    if (!p1Color) p1Color = '#00f0ff';
    if (!p2Color) p2Color = '#ff0055';
    if (!p1Class) p1Class = 'NINJA';
    if (!p2Class) p2Class = 'BRAWLER';
    if (!p1Hat) p1Hat = 'NONE';
    if (!p2Hat) p2Hat = 'NONE';

    updateRebindButtonText();
    syncUIElements();
    applyHUDColors();
}

function savePreferences() {
    try {
        localStorage.setItem('brawl_sticks_colors', JSON.stringify({ p1: p1Color, p2: p2Color }));
        localStorage.setItem('brawl_sticks_classes', JSON.stringify({ p1: p1Class, p2: p2Class }));
        localStorage.setItem('brawl_sticks_hats', JSON.stringify({ p1: p1Hat, p2: p2Hat }));
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

    document.querySelectorAll('#p1-hat-list .hat-btn').forEach(h => {
        h.classList.toggle('active', h.getAttribute('data-hat') === p1Hat);
    });
    document.querySelectorAll('#p2-hat-list .hat-btn').forEach(h => {
        h.classList.toggle('active', h.getAttribute('data-hat') === p2Hat);
    });

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

document.querySelectorAll('#p1-hat-list .hat-btn').forEach(h => {
    h.addEventListener('click', () => { p1Hat = h.getAttribute('data-hat') || 'NONE'; syncUIElements(); savePreferences(); });
});

document.querySelectorAll('#p2-hat-list .hat-btn').forEach(h => {
    h.addEventListener('click', () => { p2Hat = h.getAttribute('data-hat') || 'NONE'; syncUIElements(); savePreferences(); });
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
    }

    init() {
        if (!this.ctx) {
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioCtx();
            } catch (e) {}
        }
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

    playUltimate() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.3);
            osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.6);
            gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
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
        this.x = x || 0;
        this.y = y || 0;
        this.text = text || '';
        this.color = color || '#ffffff';
        this.vy = -1.5;
        this.life = 35;
        this.maxLife = 35;
    }

    update() {
        this.y += this.vy;
        this.life--;
    }

    draw(ctx) {
        const alpha = Math.max(0, this.life / this.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font = "900 16px 'Orbitron', sans-serif";
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

class Projectile {
    constructor(x, y, vx, damage, owner) {
        this.x = x || 0;
        this.y = y || 0;
        this.vx = vx || 10;
        this.damage = damage || 20;
        this.owner = owner;
        this.color = (owner && owner.color) ? owner.color : '#00f0ff';
        this.radius = 18;
        this.active = true;
    }

    update() {
        this.x += this.vx;
        particleSystem.createDust(this.x, this.y);
        if (this.x < -50 || this.x > 1074) this.active = false;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class ShockwaveRing {
    constructor(x, y, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.color = color || '#ffd700';
        this.radius = 10;
        this.maxRadius = 160;
        this.active = true;
    }

    update() {
        this.radius += 12;
        if (this.radius >= this.maxRadius) this.active = false;
    }

    draw(ctx) {
        const alpha = Math.max(0, 1 - (this.radius / this.maxRadius));
        const radX = Math.max(0.1, this.radius);
        const radY = Math.max(0.1, this.radius * 0.35);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 6;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, radX, radY, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

class Particle {
    constructor(x, y, vx, vy, color, size, life) {
        this.x = x || 0;
        this.y = y || 0;
        this.vx = vx || 0;
        this.vy = vy || 0;
        this.color = color || '#ffffff';
        this.size = size || 3;
        this.maxLife = life || 20;
        this.life = life || 20;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2;
        this.life--;
    }

    draw(ctx) {
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
        for (let i = 0; i < 16; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 8;
            this.particles.push(new Particle(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed - 2,
                color || '#ffffff',
                2 + Math.random() * 3,
                20 + Math.random() * 15
            ));
        }
    }

    createDust(x, y) {
        for (let i = 0; i < 6; i++) {
            this.particles.push(new Particle(
                x + (Math.random() - 0.5) * 30,
                y,
                (Math.random() - 0.5) * 2,
                -Math.random() * 2,
                'rgba(255, 255, 255, 0.4)',
                3 + Math.random() * 3,
                15 + Math.random() * 10
            ));
        }
    }

    createSlideSparks(x, y, facing, color) {
        const dir = facing || 1;
        for (let i = 0; i < 3; i++) {
            this.particles.push(new Particle(
                x, y,
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

    addShockwave(x, y, color) {
        this.shockwaves.push(new ShockwaveRing(x, y, color));
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
        this.x = x || 0;
        this.y = y || 0;
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
        this.x = x || 0;
        this.y = y || 0;
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

        if (this.health > 0) {
            this.specialMeter = Math.min(100, this.specialMeter + 0.18);
        }

        let baseSpeed = (difficulty === 'EASY') ? 3.8 : (difficulty === 'NORMAL') ? 5.0 : 6.5;
        let baseJump = (difficulty === 'EASY') ? -11.5 : (difficulty === 'NORMAL') ? -12.8 : -14.0;

        const speedFactor = (this.fighterClass === 'NINJA') ? 1.2 : (this.fighterClass === 'BRAWLER') ? 0.85 : 1.0;
        this.speed = baseSpeed * speedFactor;
        this.jumpForce = baseJump * (this.fighterClass === 'NINJA' ? 1.1 : 1.0);

        if (this.stunTimer > 0) this.stunTimer--;
        if (this.invincibleTimer > 0) this.invincibleTimer--;

        let target = null;
        let minDist = Infinity;
        if (Array.isArray(opponents)) {
            opponents.forEach(opp => {
                if (opp && opp.health > 0) {
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

        if (this.health > 0 && this.stunTimer === 0) {
            if (this.isCPU) {
                this.updateAI(target, difficulty);
            } else {
                this.handleInputs(keys, mode, target);
            }
        }

        if (this.isSliding) {
            this.slideTimer--;
            this.vx = this.facing * (this.speed * 1.8);
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

        this.vx *= this.isSliding ? 0.94 : 0.85;
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

        const reactionDelay = difficulty === 'EASY' ? 25 : difficulty === 'NORMAL' ? 12 : 5;
        const blockProbability = difficulty === 'EASY' ? 0.1 : difficulty === 'NORMAL' ? 0.4 : 0.75;

        if (target.isAttacking && dist < 90 && Math.random() < blockProbability) {
            if (this.isGrounded && Math.random() < 0.5) {
                this.isSliding = true;
                this.slideTimer = 14;
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

            if (this.specialMeter >= 100 && dist < 120 && Math.random() < 0.8) {
                this.executeSignatureSpecial(target, 18);
                this.specialMeter = 0;
                audio.playUltimate();
                return;
            }

            if (dist <= 75) {
                if (!this.isAttacking && !this.isSliding) {
                    const rnd = Math.random();
                    if (rnd < 0.5) {
                        this.startAttack('light', 14, 8);
                        audio.playPunch();
                    } else {
                        this.startAttack('heavy', 22, 16);
                        audio.playPunch();
                    }
                }
            } else {
                const dir = target.x > this.x ? 1 : -1;
                const cpuSpeedFactor = difficulty === 'EASY' ? 0.6 : difficulty === 'NORMAL' ? 0.85 : 1.0;
                this.vx = dir * (this.speed * cpuSpeedFactor);

                if (target.y < this.y - 30 && this.isGrounded && Math.random() < 0.6) {
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
                this.slideTimer = 16;
                if (leftKey) this.facing = -1;
                if (rightKey) this.facing = 1;
                audio.playSlide();
            } else {
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
                this.startAttack('light', 14, 8);
                audio.playPunch();
            } else if (heavyKey && !this.isAttacking) {
                this.startAttack('heavy', 22, 16);
                audio.playPunch();
            } else if (ultKey && !this.isAttacking && this.specialMeter >= 100) {
                this.executeSignatureSpecial(target, 35);
                this.specialMeter = 0;
                audio.playUltimate();
            }
        }
    }

    executeSignatureSpecial(target, damage) {
        if (this.fighterClass === 'NINJA') {
            particleSystem.createHitSparks(this.x + 20, this.y + 30, this.color);
            if (target) {
                this.x = target.x - (target.facing * 50);
                this.facing = (target.x >= this.x) ? 1 : -1;
            }
            this.startAttack('ultimate', 30, damage);
            particleSystem.createHitSparks(this.x + 20, this.y + 30, '#ffffff');
            particleSystem.addDamageText(this.x, this.y - 20, 'SHADOW TELEPORT KICK!', this.color);
        } else if (this.fighterClass === 'BRAWLER') {
            this.vy = 8;
            this.startAttack('ultimate', 35, damage);
            triggerCameraShake(16, 14);
            particleSystem.addShockwave(this.x + this.width / 2, 460, this.color);
            particleSystem.createDust(this.x, 460);
            particleSystem.addDamageText(this.x, this.y - 20, 'FOOT GROUND SLAM!', '#ffd700');
        } else if (this.fighterClass === 'WEAVER') {
            this.startAttack('ultimate', 25, damage);
            const projVx = this.facing * 12;
            particleSystem.addProjectile(new Projectile(this.x + (this.facing * 35), this.y + 30, projVx, damage, this));
            particleSystem.addDamageText(this.x, this.y - 20, 'PLASMA ORB BLAST!', '#aa00ff');
        } else if (this.fighterClass === 'KNIGHT') {
            this.vx = this.facing * 18;
            this.startAttack('ultimate', 30, damage);
            particleSystem.createSlideSparks(this.x, 460, this.facing, this.color);
            particleSystem.addDamageText(this.x, this.y - 20, 'PHANTOM BLADE LUNGE!', '#e60000');
        }
    }

    startAttack(type, duration, damage) {
        this.isAttacking = true;
        this.attackType = type;
        this.attackTimer = duration;
        this.currentAttackDamage = damage;
        this.hasHitOpponent = false;
    }

    getHitbox() {
        if (!this.isAttacking || this.hasHitOpponent) return null;
        const reach = (this.attackType === 'light') ? 45 : (this.attackType === 'heavy') ? 70 : 90;
        return {
            x: (this.facing === 1) ? (this.x + this.width) : (this.x - reach),
            y: this.y + 20,
            width: reach,
            height: 35,
            damage: this.currentAttackDamage,
            knockback: (this.attackType === 'light') ? 4 : (this.attackType === 'heavy') ? 10 : 16
        };
    }

    takeDamage(amount, knockback, attackerFacing) {
        if (this.invincibleTimer > 0 || this.health <= 0) return;

        const face = attackerFacing || 1;

        if (this.isBlocking || this.isSliding) {
            const damageTaken = amount * 0.25;
            this.health = Math.max(0, this.health - damageTaken);
            this.vx = face * (knockback * 0.4);
            audio.playBlock();
            particleSystem.createHitSparks(this.x + this.width / 2, this.y + 30, '#ffffff');
            particleSystem.addDamageText(this.x, this.y - 15, `-${Math.round(damageTaken)} (75% BLOCK)`, '#ffffff');
            this.specialMeter = Math.min(100, this.specialMeter + 15);
            return;
        }

        this.health = Math.max(0, this.health - amount);
        this.stunTimer = (amount > 20) ? 20 : 12;
        this.invincibleTimer = 15;
        this.vx = face * knockback;
        this.vy = -3;
        this.specialMeter = Math.min(100, this.specialMeter + 20);

        if (amount >= 20) {
            audio.playHeavyHit();
            triggerCameraShake(12, 10);
            particleSystem.addDamageText(this.x, this.y - 15, `-${amount} CRIT!`, '#ffd700');
        } else {
            audio.playPunch();
            triggerCameraShake(5, 5);
            particleSystem.addDamageText(this.x, this.y - 15, `-${amount}`, this.color);
        }

        particleSystem.createHitSparks(this.x + this.width / 2, this.y + 30, this.color);
    }

    draw(ctx) {
        if (this.health <= 0) return;

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
        const hipY = this.y + 55;
        const footY = this.y + this.height;

        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(centerX, footY + 4, 18, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        const drawHat = (hx, hy) => {
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

        // HEAVY KICK & BRAWLER FOOT SLAM VISUAL RENDERING
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
        } else if (this.isAttacking && this.attackType === 'ultimate' && this.fighterClass === 'BRAWLER') {
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
        }

        ctx.beginPath();
        ctx.moveTo(centerX, hipY);
        ctx.lineTo(lLegX, lFootY);
        ctx.moveTo(centerX, hipY);
        ctx.lineTo(rLegX, rFootY);
        ctx.stroke();

        const shoulderY = headY + 16;
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
            } else if (this.attackType === 'ultimate' && this.fighterClass === 'WEAVER') {
                rHandX = centerX + this.facing * 40;
                rHandY = shoulderY - 4;
            } else if (this.attackType === 'ultimate' && this.fighterClass === 'KNIGHT') {
                rHandX = centerX + this.facing * 50;
                rHandY = shoulderY - 8;

                ctx.save();
                ctx.strokeStyle = '#e60000';
                ctx.shadowColor = '#e60000';
                ctx.shadowBlur = 22;
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.moveTo(rHandX, rHandY);
                ctx.lineTo(rHandX + this.facing * 60, rHandY - 4);
                ctx.stroke();
                ctx.restore();
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

document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedMode = card.getAttribute('data-mode') || 'CPU';

        const p2Label = document.getElementById('p2-label');
        const p3Hud = document.getElementById('p3-hud');
        const p4Hud = document.getElementById('p4-hud');

        if (selectedMode === 'CPU') {
            if (p2Label) p2Label.textContent = 'CPU (ENEMY)';
            if (p3Hud) p3Hud.classList.add('hidden');
            if (p4Hud) p4Hud.classList.add('hidden');
        } else if (selectedMode === 'LOCAL') {
            if (p2Label) p2Label.textContent = 'PLAYER 2';
            if (p3Hud) p3Hud.classList.add('hidden');
            if (p4Hud) p4Hud.classList.add('hidden');
        } else if (selectedMode === 'TEAM2V2') {
            if (p2Label) p2Label.textContent = 'RED TEAM 1';
            if (p3Hud) p3Hud.classList.remove('hidden');
            if (p4Hud) p4Hud.classList.remove('hidden');
        }
    });
});

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

function setupFighters() {
    fighters = [];
    if (selectedMode === 'CPU') {
        fighters.push(new Stickman('p1', 200, 300, p1Color, p1Class, p1Hat, 1, false));
        fighters.push(new Stickman('p2', 750, 300, p2Color, p2Class, p2Hat, 2, true));
    } else if (selectedMode === 'LOCAL') {
        fighters.push(new Stickman('p1', 200, 300, p1Color, p1Class, p1Hat, 1, false));
        fighters.push(new Stickman('p2', 750, 300, p2Color, p2Class, p2Hat, 2, false));
    } else if (selectedMode === 'TEAM2V2') {
        fighters.push(new Stickman('p1', 180, 300, p1Color, p1Class, p1Hat, 1, false));
        fighters.push(new Stickman('p3', 280, 300, p1Color, 'NINJA', 'NONE', 1, true));
        fighters.push(new Stickman('p2', 720, 300, p2Color, p2Class, p2Hat, 2, true));
        fighters.push(new Stickman('p4', 820, 300, p2Color, 'BRAWLER', 'NONE', 2, true));
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
    if (rl) rl.textContent = `ROUND ${currentRound}`;

    const announcerOverlay = document.getElementById('announcer-overlay');
    const announcerText = document.getElementById('announcer-text');

    gameState = 'COUNTDOWN';
    if (announcerOverlay) announcerOverlay.classList.remove('hidden');
    if (announcerText) announcerText.textContent = `ROUND ${currentRound}`;

    setTimeout(() => {
        if (announcerText) announcerText.textContent = 'READY...';
        setTimeout(() => {
            if (announcerText) announcerText.textContent = 'FIGHT!';
            setTimeout(() => {
                if (announcerOverlay) announcerOverlay.classList.add('hidden');
                gameState = 'FIGHT';
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

function handleRoundEnd(reason) {
    if (gameState === 'ROUND_OVER' || gameState === 'MATCH_OVER') return;
    clearInterval(timerInterval);
    gameState = 'ROUND_OVER';
    slowMoTimer = 45;

    const announcerOverlay = document.getElementById('announcer-overlay');
    const announcerText = document.getElementById('announcer-text');
    if (announcerOverlay) announcerOverlay.classList.remove('hidden');

    const team1HealthTotal = fighters.filter(f => f.team === 1).reduce((sum, f) => sum + f.health, 0);
    const team2HealthTotal = fighters.filter(f => f.team === 2).reduce((sum, f) => sum + f.health, 0);

    let roundWinnerTeam = null;
    if (team1HealthTotal > team2HealthTotal) roundWinnerTeam = 1;
    else if (team2HealthTotal > team1HealthTotal) roundWinnerTeam = 2;

    if (announcerText) announcerText.textContent = (reason === 'KO') ? 'K.O.!' : 'TIME OVER!';

    setTimeout(() => {
        if (roundWinnerTeam === 1) {
            team1Wins++;
            if (announcerText) announcerText.textContent = 'BLUE TEAM WINS!';
        } else if (roundWinnerTeam === 2) {
            team2Wins++;
            if (announcerText) announcerText.textContent = 'RED TEAM WINS!';
        } else {
            if (announcerText) announcerText.textContent = 'DRAW!';
        }
        updateScoreDots();

        setTimeout(() => {
            if (team1Wins >= 2 || team2Wins >= 2) {
                handleMatchEnd(team1Wins >= 2 ? 1 : 2);
            } else {
                currentRound++;
                startRound();
            }
        }, 1800);
    }, 1200);
}

function handleMatchEnd(winningTeam) {
    gameState = 'MATCH_OVER';
    const ao = document.getElementById('announcer-overlay');
    if (ao) ao.classList.add('hidden');
    const gameOverOverlay = document.getElementById('gameover-overlay');
    const winnerTitle = document.getElementById('winner-title');

    if (winnerTitle) {
        winnerTitle.textContent = (winningTeam === 1) ? 'BLUE TEAM WINS MATCH!' : 'RED TEAM WINS MATCH!';
        winnerTitle.style.color = (winningTeam === 1) ? p1Color : p2Color;
        winnerTitle.style.textShadow = `0 0 15px ${(winningTeam === 1) ? p1Color : p2Color}`;
    }

    const sr = document.getElementById('stat-rounds');
    if (sr) sr.textContent = `${team1Wins} - ${team2Wins}`;
    if (gameOverOverlay) gameOverOverlay.classList.remove('hidden');
}

function checkCombatCollisions() {
    if (gameState !== 'FIGHT') return;

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
                    defender.takeDamage(proj.damage, 14, proj.vx > 0 ? 1 : -1);
                    particleSystem.createHitSparks(proj.x, proj.y, proj.color);
                    proj.active = false;

                    const teamRemaining = fighters.filter(f => f.team === defender.team && f.health > 0);
                    if (teamRemaining.length === 0) {
                        handleRoundEnd('KO');
                    }
                }
            }
        });
    });
}

function drawArena() {
    if (!ctx) return;
    ctx.fillStyle = '#060812';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    ctx.strokeStyle = p1Color;
    ctx.shadowColor = p1Color;
    ctx.shadowBlur = 15;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(canvas.width, groundY);
    ctx.stroke();

    ctx.fillStyle = 'rgba(10, 15, 30, 0.9)';
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
    ctx.restore();
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

    if (slowMoTimer > 0) {
        slowMoTimer--;
        ctx.scale(1.05, 1.05);
        ctx.translate(-25, -15);
    }

    if (shakeTime > 0) {
        const dx = (Math.random() - 0.5) * shakeIntensity;
        const dy = (Math.random() - 0.5) * shakeIntensity;
        ctx.translate(dx, dy);
        shakeTime--;
    }

    drawArena();

    if (gameState === 'FIGHT' || gameState === 'COUNTDOWN' || gameState === 'ROUND_OVER') {
        fighters.forEach(f => {
            const opponents = fighters.filter(o => o.team !== f.team);
            const allies = fighters.filter(a => a.team === f.team && a.id !== f.id);
            f.update(opponents, allies, keys, selectedDifficulty, selectedMode, groundY);
        });
        checkCombatCollisions();
    }

    particleSystem.updateAndDraw(ctx);
    fighters.forEach(f => f.draw(ctx));

    ctx.restore();
    updateHUD();
    requestAnimationFrame(gameLoop);
}

loadSavedPreferences();
gameLoop();
