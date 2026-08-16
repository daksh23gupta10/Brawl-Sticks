# ⚔️ Brawl-Sticks 2D: Story Arcade & Arena Brawler (`v2.9.3`)

A fast-paced, high-performance 2D Stickman Fighting Web Game built using **HTML5 Canvas**, **Vanilla JavaScript**, and **Synthesized Web Audio API**. Play solo in **Story Arcade Mode** through a 5-stage tournament ladder ending in a giant **Final Boss Battle**, practice against smart AI, battle a friend locally, or jump into a 4-fighter **2v2 Team Brawl**!

![HTML5 Canvas](https://img.shields.io/badge/Engine-HTML5_Canvas-00f0ff?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/Logic-Vanilla_JS-ffd700?style=for-the-badge)
![Web Audio](https://img.shields.io/badge/Audio-Synthesized_Web_Audio-ff0055?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-v2.9.3-00ff66?style=for-the-badge)

---

## 🌟 Key Features

### 🏆 1. Single-Player Story Arcade Mode & Final Boss
* **5-Stage Tournament Ladder**:
  * **STAGE 1**: `SHADOW SHINOBI` (`NINJA`) in Sky Dojo
  * **STAGE 2**: `HEAVY BOXER` (`BRAWLER`) in Cyber Rooftop
  * **STAGE 3**: `VOLCANIC LORD` (`INFERNO`) in Volcanic Magma Pit
  * **STAGE 4**: `SKY MAGE` (`WEAVER`) in Celestial Sky Dojo
  * **STAGE 5 (FINAL BOSS)**: **`SHADOW OVERLORD` 👑**
    * **Health**: `350 HP` (Crimson Shadow Knight with Crown)
    * **Boss Rage Mode**: At 50% HP (<= 175 HP), triggers **BOSS RAGE MODE** with pitch-shifted roar, red/purple shadow aura, +20% movement speed, +40% attack damage, and frequent shockwave bursts!

---

### 🥷 2. 8 Unique Character Classes & Signature Specials (`⚡ ULT`)
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

### 🌋 3. Interactive 2D Stage Arenas & Stage Hazards
* **🌋 VOLCANIC MAGMA PIT**: Magma floor burn edges and falling fire meteorites.
* **🌆 CYBERPUNK NEON ROOFTOP**: Electric perimeter shock fences (`x <= 40` or `x >= 984`) that zap fighters for damage + shockwaves.
* **⛩️ CELESTIAL SKY DOJO**: Floating sky temple with falling sakura cherry blossom petals.

---

### 🔊 4. Synthesized Web Audio Sound Engine
Procedurally generated real-time sound effects without external MP3 assets:
* `playPunch()`: Triangle pitch-drop punch impact.
* `playHeavyHit()`: Sawtooth heavy hit crunch with sub-bass thump.
* `playSlash()`: Filtered white noise bandpass sweep for sharp sword cuts.
* `playExplosion()`: Low-pass noise blast for ground slams & meteorite hits.
* `playLaser()`: Pitch-swept laser zap for plasma spheres & celestial arrows.
* `playAnnouncerChime()`: Multi-note ascending chime (`C5` -> `E5` -> `G5`) for round announcements.
* `playBossRage()`: Low pitch-rising sawtooth roar when Final Boss enters Rage Mode.

---

### 🎨 5. Multi-Step Selection Menu & Settings Gear Modal
* **Step 1 Mode Select**: Clean entry cards for Story Arcade, 1v1 Local, 1v1 CPU, and 2v2 Team Brawl.
* **Step 2 Customization**: Choose Fighter Class, Cosmetic Hats (Crown, Shades, Headband, Cowboy, Visor, Tophat), Color Swatches, Stage Arena, and AI Difficulty (Easy, Normal, Hard).
* **⚙️ SETTINGS Modal**: Top-right gear button opens a clean popup for remapping Player 1 & Player 2 controls, audio mute, and touch controls.

---

### 🎨 6. Dynamic Color Victory Announcements
Announcer overlays and GameOver screens dynamically announce the exact color of the winner:
* Player 1 chooses **GOLD** (`#ffd700`) -> Announces: **`GOLD FIGHTER WINS MATCH!`**
* Player 2 chooses **PURPLE** (`#aa00ff`) -> Announces: **`PURPLE FIGHTER WINS MATCH!`**
* Player chooses **GREEN** (`#00ff66`) -> Announces: **`GREEN FIGHTER WINS MATCH!`**

---

### ⚡ 7. Tactical Combat Speed & Anti-Spam AI
* **Balanced Velocities**: Smooth walk speeds (`2.4` px/frame) and lofty jump physics (`gravity: 0.40`).
* **Anti-Spam CPU AI**: AI decision timer (`18 - 45` frames) ensures CPU moves deliberately, blocks strategically, and gives players room to react.

---

## 🎮 Controls & Keybindings

### Player 1 (Left Side / Blue Team)
* **Move Left / Right**: `A` / `D` (or Left / Right Arrow keys in 1P mode)
* **Jump**: `W` (or Up Arrow key)
* **Block / Slide**: `S` (or Down Arrow key)
* **Light Punch**: `F` (or Left Mouse Click)
* **Heavy Kick**: `G` (or Right Mouse Click)
* **Signature Special (`⚡ ULT`)**: `H`

### Player 2 (Right Side / Red Team)
* **Move Left / Right**: `Left Arrow` / `Right Arrow`
* **Jump**: `Up Arrow`
* **Block / Slide**: `Down Arrow`
* **Light Punch**: `J`
* **Heavy Kick**: `K`
* **Signature Special (`⚡ ULT`)**: `L`

### General Shortcuts
* **Pause / Resume Match**: `P` or `ESC` (or click `⏸️ PAUSE` button on HUD)

---

## 📜 Changelog & Version History

### Version 2.9.3 (Latest)
* **GitHub Release**: Story Arcade Mode, Final Boss Overlord, 8 Fighter Classes, Synthesized Sound Engine, Multi-Step Menu, Gear Settings Modal, Dynamic Color Win Announcements, and Tactical Speed Rebalance.

### Version 2.6.4
* Added 3 Interactive 2D Stage Arenas, Combo Counter, 2.0s KO Slow-Mo Camera Zoom, and fixed 2v2 P3/P4 pickers.

### Version 2.3.0
* Added Class Signature Special Moves and In-Game Pause System (`P` / `ESC`).

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
