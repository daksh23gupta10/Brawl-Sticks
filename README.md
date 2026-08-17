# ⚔️ Brawl-Sticks 2D: Story Arcade & Arena Brawler (`v3.0.0`)

A fast-paced, high-performance 2D Stickman Fighting Web Game built using **HTML5 Canvas**, **Vanilla JavaScript**, and **Synthesized Web Audio API**. Play solo in **Story Arcade Mode** through a 5-stage tournament ladder ending in a giant **Final Boss Battle**, practice against smart AI, battle a friend locally, or jump into a 4-fighter **2v2 Team Brawl**!

![HTML5 Canvas](https://img.shields.io/badge/Engine-HTML5_Canvas-00f0ff?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/Logic-Vanilla_JS-ffd700?style=for-the-badge)
![Web Audio](https://img.shields.io/badge/Audio-Synthesized_Web_Audio-ff0055?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-v3.0.0-00ff66?style=for-the-badge)

---

## 🌟 Major Features in v3.0.0

### 📜 1. Story Arcade Pre-Match Dialogue Cutscenes
* **Pre-Fight Comic Overlays**: Before each stage in Story Arcade Mode, pre-fight dialogue overlays appear featuring character avatar portraits, speaker titles, and stage taunts:
  * **Stage 1**: `STAGE 1: SHADOW SHINOBI 🥷` -> *"Shadows conceal my blade. Show me your true strength!"*
  * **Stage 2**: `STAGE 2: HEAVY BOXER 🥊` -> *"You think you can take my heavy hooks? Let's brawl!"*
  * **Stage 3**: `STAGE 3: VOLCANIC LORD 🔥` -> *"Magma burns eternal! Fall before the flames of victory!"*
  * **Stage 4**: `STAGE 4: SKY MAGE 🔮` -> *"The winds and celestial skies bow to my spellwork!"*
  * **Stage 5**: `FINAL BOSS: SHADOW OVERLORD 👑` -> *"Fools think they can claim my throne. I am the Overlord of Shadows!"*

---

### ⚡ 2. Perfect Parry & Counter-Attack System
* **Frame-Perfect Counter**: Tapping Block (`S` / `Down Arrow`) initiates a **6-frame (0.1s) Perfect Parry Window**.
* **Zero Damage & Attacker Stun**: Timed blocks take **0 damage**, trigger a bright golden parry shockwave, play a metallic chime (`audio.playParry()`), and **stun the attacker for 24 frames** for a guaranteed counter-strike opportunity!

---

### 🎬 3. Ultimate Move Cinematic Camera Zoom & Letterbox Bars
* **Cinematic Focus**: Activating a Signature Special (`⚡ ULT`) triggers a 30-frame (0.5s) cinematic freeze.
* **1.35x Camera Zoom & Skill Banner**: Zooms in 1.35x on the attacker with top and bottom dark letterbox bars and glowing skill callout text (e.g. `⚡ NINJA: SHADOW HURRICANE SLASH!`).

---

### 🎵 4. Multi-Layer Web Audio Synthwave Music Engine
* **Retro Synth Beats**: Multi-oscillator 80s synthwave basslines, arpeggios, and hi-hat percussion generated procedurally with Web Audio API.
* **Dynamic Low-HP Tempo**: Automatically speeds up tempo when fighters enter low HP for high-intensity climaxes!
* **Toggle Controls**: Toggle **`🎵 MUSIC: ON / OFF`** in both Settings gear modal and Pause menu.

---

### 🏆 5. Single-Player Story Arcade Mode & Final Boss
* **5-Stage Tournament Ladder**: Culminating in **`SHADOW OVERLORD` 👑** (`350 HP`, Crimson Shadow Knight with Crown).
* **Boss Rage Mode**: At 50% HP (<= 175 HP), triggers **BOSS RAGE MODE** with pitch-shifted roar, red/purple shadow aura, +20% movement speed, +40% attack damage, and shockwave bursts!

---

### 🥷 6. 8 Unique Character Classes & Signature Specials (`⚡ ULT`)
Each fighter class has unique max HP, movement speed, jump height, and signature special move:

| Class Icon & Name | Specialty | Signature Special Move (`⚡ ULT`) |
| :--- | :--- | :--- |
| **🥷 NINJA** | High Speed & Agility | **Shadow Teleport Slash**: Instantly teleports behind target for a whirlwind slash |
| **🥊 BRAWLER** | High HP & Tankiness | **Earthbreaker Foot Slam**: Slams ground sending rock debris & launch shockwaves |
| **🔮 WEAVER** | Ranged Energy Attacks | **Supernova Plasma Sphere**: Fires a glowing plasma orb projectile across arena |
| **⚔️ KNIGHT** | Balanced Melee Fighter | **Phantom Blade Execution**: High-speed slide dash extending phantom beam blade |
| **⚡ STORM** | Lightning Ranged Spells | **Lightning Spear Thunder Storm**: Fires high-velocity thunderbolt spear |
| **🏹 HUNTER** | Multi-Arrow Ranged | **Celestial Arrow Volley**: Shoots a 3-arrow spread projectile barrage |
| **🔥 INFERNO** | Heavy Fire Attacks | **Volcanic Flame Pillar**: Erupts a giant fiery pillar with camera shake |
| **☯️ MONK** | Martial Ki Energy | **Dragon Palm Ki Blast**: Releases a concentrated Ki palm blast |

---

### 🌋 7. Interactive 2D Stage Arenas & Stage Hazards
* **🌋 VOLCANIC MAGMA PIT**: Magma floor burn edges and falling fire meteorites.
* **🌆 CYBERPUNK NEON ROOFTOP**: Electric perimeter shock fences (`x <= 40` or `x >= 984`) that zap fighters for damage + shockwaves.
* **⛩️ CELESTIAL SKY DOJO**: Floating sky temple with falling sakura cherry blossom petals.

---

## 🎮 Controls & Keybindings

### Player 1 (Left Side / Blue Team)
* **Move Left / Right**: `A` / `D` (or Left / Right Arrow keys in 1P mode)
* **Jump**: `W` (or Up Arrow key)
* **Block / Slide / Parry**: `S` (or Down Arrow key)
* **Light Punch**: `F` (or Left Mouse Click)
* **Heavy Kick**: `G` (or Right Mouse Click)
* **Signature Special (`⚡ ULT`)**: `H`

### Player 2 (Right Side / Red Team)
* **Move Left / Right**: `Left Arrow` / `Right Arrow`
* **Jump**: `Up Arrow`
* **Block / Slide / Parry**: `Down Arrow`
* **Light Punch**: `J`
* **Heavy Kick**: `K`
* **Signature Special (`⚡ ULT`)**: `L`

### General Shortcuts
* **Pause / Resume Match**: `P` or `ESC` (or click `⏸️ PAUSE` button on HUD)

---

## 📜 Changelog & Version History

### Version 3.0.0 (Latest Release)
* Added Story Arcade dialogue cutscenes, Perfect Parry counter system, Ultimate Move cinematics, and multi-layer synthwave Web Audio music engine.

### Version 2.9.3
* Multi-step menu flow, settings gear modal, dynamic color victory announcements, exit game screen, and tactical combat pacing balance.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
