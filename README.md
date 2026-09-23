# ⚔️ Brawl-Sticks 2D: Story Arcade & Arena Brawler (`v3.5.0`)

A fast-paced, high-performance 2D Stickman Fighting Web Game built using **HTML5 Canvas**, **Vanilla JavaScript**, and **Synthesized Web Audio API**. Play solo in **Story Arcade Mode** through a 5-stage tournament ladder ending in a giant **Final Boss Battle**, practice against smart AI, battle a friend locally, or jump into a 4-fighter **2v2 Team Brawl**!

![HTML5 Canvas](https://img.shields.io/badge/Engine-HTML5_Canvas-00f0ff?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/Logic-Vanilla_JS-ffd700?style=for-the-badge)
![Web Audio](https://img.shields.io/badge/Audio-Synthesized_Web_Audio-ff0055?style=for-the-badge)
![PWA Ready](https://img.shields.io/badge/PWA-100%25_Offline-00ff66?style=for-the-badge)
![Gamepad](https://img.shields.io/badge/Gamepad-HTML5_API-purple?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-v3.5.0-00ff66?style=for-the-badge)

---

## 🌟 Major Features in v3.5.0

### 🎮 1. HTML5 Gamepad & Controller API Support
* **Plug-and-Play**: Connect Xbox, PlayStation, or generic USB/Bluetooth controllers anytime.
* **Status Badge**: Glowing `🎮 GAMEPAD CONNECTED` status indicator in the top navigation bar.
* **Full Mapping**: Move, jump, light attack, heavy attack, block/parry, evasive dash, cinematic ultimate, and pause directly from your gamepad.

---

### ⚡ 2. Ghost Health (Damage Trail Lag Bar)
* **Fighting Game Polish**: Health bars now feature an underlying golden "ghost trail" (`#ffd700`) that holds and smoothly shrinks over 450ms when damage is taken.
* Works seamlessly across 1v1, Story Arcade, and 2v2 modes.

---

### 📱 3. Progressive Web App (PWA) & 100% Offline Capability
* **Installable**: One-click install via the `INSTALL APP` button or browser install prompt.
* **100% Offline**: Integrated `sw.js` cache-first Service Worker caches all game assets, canvas renderer, styles, and synth sound engine for zero-connection play.
* **Custom App Icon**: Includes 512×512 high-resolution neon vector clash icon and standalone landscape manifest.

---

### 🏆 4. Career Stats & Trophies System with Secret Unlockable Hats
* **Persistent Career Records**: Tracks Matches Played, Matches Won, Win Rate %, Boss Clears, Highest Combo Hits, and Flawless/Perfect Rounds in `localStorage`.
* **Trophy Achievements**:
  * 🩸 **First Blood**: Win your first match.
  * 👑 **Overlord Slayer**: Defeat the Stage 5 Shadow Overlord in Arcade Mode &rarr; **Unlocks Secret Hat: DEMON (Crimson Glowing Horns)**!
  * 🌟 **Untouchable Master**: Win a round without taking any damage &rarr; **Unlocks Secret Hat: HALO (Golden Glowing Halo)**!
  * 🔥 **Combo Legend**: Pull off an 8+ hit combo &rarr; **Unlocks Secret Hat: VALKYRIE (Cyan Winged Helm)**!
* **Showcase Modal**: View career metrics and unlocked trophies by clicking `🏆 TROPHIES` in the top header or pause menu.

---

### 💨 5. Evasive Dash & Hit-Stop Micro-Freeze Impact Frames
* **Evasive Dash**: Press `Shift` (P1), `Numpad 0` (P2), `RB` (Gamepad), or the on-screen `DASH` touch button for 14 frames of invulnerability with fading holographic afterimages.
* **Hit-Stop Impact Frames**: Heavy strikes and projectile collisions briefly freeze the frame for 2–4 micro-frames, delivering crisp, visceral arcade impact before physics resumes.

---

### 📜 6. Story Arcade Pre-Match Dialogue Cutscenes
* **Pre-Fight Comic Overlays**: Pre-fight dialogue overlays featuring character avatar portraits, speaker titles, and stage taunts across all 5 ladder stages.
* **Final Boss: Shadow Overlord**: 350 HP Shadow Overlord with 2-phase Boss Rage Mode at 50% HP.

---

### ⚡ 7. Perfect Parry & Counter-Attack System
* **Frame-Perfect Counter**: Tapping Block initiates a **6-frame (0.1s) Perfect Parry Window**.
* **Zero Damage & Attacker Stun**: Timed blocks take 0 damage, trigger a bright golden shockwave, play a metallic chime, and stun the attacker for 24 frames!

---

### 🎬 8. Ultimate Move Cinematic Camera Zoom
* Activating a Signature Special (`⚡ ULT`) triggers a 30-frame cinematic freeze with 1.35x zoom and glowing letterbox skill banners.

---

### 🎵 9. Multi-Layer Web Audio Synthwave Music Engine
* Multi-oscillator 80s synthwave basslines, arpeggios, and hi-hat percussion generated procedurally in real-time.
* Speeds up tempo dynamically when entering critical low HP!

---

### 🥷 10. 8 Unique Character Classes & Signature Specials (`⚡ ULT`)

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

### 🌋 11. Interactive 2D Stage Arenas & Hazards
* **🌋 VOLCANIC MAGMA PIT**: Magma floor burn edges and falling fire meteorites.
* **🌆 CYBERPUNK NEON ROOFTOP**: Electric perimeter shock fences that zap fighters on contact.
* **⛩️ CELESTIAL SKY DOJO**: Floating sky temple with falling sakura cherry blossom petals.

---

## 🎮 Controls & Keybindings

### Player 1 (Left Side / Blue Team)
* **Move Left / Right**: `A` / `D` (or Left / Right Arrow in 1P mode)
* **Jump**: `W` (or Up Arrow)
* **Block / Slide / Parry**: `S` (or Down Arrow)
* **Evasive Dash**: `Left Shift`
* **Light Punch**: `F` (or Left Mouse Click)
* **Heavy Kick**: `G` (or Right Mouse Click)
* **Signature Special (`⚡ ULT`)**: `H`

### Player 2 (Right Side / Red Team)
* **Move Left / Right**: `Left Arrow` / `Right Arrow`
* **Jump**: `Up Arrow`
* **Block / Slide / Parry**: `Down Arrow`
* **Evasive Dash**: `Numpad 0`
* **Light Punch**: `J`
* **Heavy Kick**: `K`
* **Signature Special (`⚡ ULT`)**: `L`

### 🎮 Gamepad / Controller (Player 1)
* **Move / Crouch**: Left Analog Stick / D-Pad
* **Jump**: `A` / `Cross` (Button 0)
* **Block / Parry**: `B` / `Circle` (Button 1)
* **Light Attack**: `X` / `Square` (Button 2)
* **Heavy Attack**: `Y` / `Triangle` (Button 3)
* **Evasive Dash**: `RB` / `R1` (Button 5)
* **Signature Special (`⚡ ULT`)**: `RT` / `R2` (Button 7)
* **Pause / Resume**: `Start` / `Options` (Button 9)

### General Shortcuts
* **Pause / Resume Match**: `P` or `ESC` (or HUD `⏸️ PAUSE` button)

---

## 📜 Changelog & Version History

### Version 3.5.0 (Latest Release)
* **HTML5 Gamepad API**: Plug-and-play Xbox, PlayStation, USB controller support with auto-mapping.
* **Ghost Health**: Delayed golden damage trail lag bars for fighters.
* **PWA & Offline Mode**: `manifest.json`, high-res SVG app icon, Service Worker cache-first offline capability, and install button.
* **Career & Trophies**: Persistent career record tracking and 4 trophies with 3 secret hats (`DEMON`, `HALO`, `VALKYRIE`).
* **Evasive Dash & Hit-Stop**: Invulnerable dash with fading afterimages and micro-freeze hit-stop impact frames.

### Version 3.0.0
* Added Story Arcade dialogue cutscenes, Perfect Parry counter system, Ultimate Move cinematics, and multi-layer synthwave Web Audio music engine.

### Version 2.9.3
* Multi-step menu flow, settings gear modal, dynamic color victory announcements, exit game screen, and tactical combat pacing balance.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
