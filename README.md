# ⚔️ Brawl-Sticks (1v1 & 2v2 Stickman Fighting Game)

A fast-paced, high-performance 2D Stickman Fighting Web Game built using HTML5 Canvas, Vanilla JavaScript, and Web Audio API. Play solo against smart AI, battle a friend locally, or jump into a 4-fighter 2v2 Team Brawl!

---

## 🎮 Game Modes

1. **🤖 1 Player vs CPU (Single Player)**
   * Fight solo against a computer-controlled AI stickman.
   * Supports 3 difficulty levels: **Easy**, **Normal**, and **Hard**.
   * P1 can control using **Arrow Keys** or **WASD** seamlessly.

2. **⚔️ 1v1 Local Multiplayer**
   * Battle a friend on 1 keyboard in real-time.

3. **🔥 2v2 Team Brawl (4-Fighter Arena)**
   * Team Blue (Player 1 + CPU Teammate) vs Team Red (2 CPU Enemies).
   * 4 stickmen fighting simultaneously with dedicated health bar tracking.

---

## ⚙️ Custom Key Remapping & Controls

Click any action button on the start menu to rebind controls to any key on your keyboard! Preferences automatically save to `localStorage`.

### Default Controls:
* **Player 1 (Blue Stickman)**:
  * `A` / `D` (or `←` / `→`) : Move Left / Right
  * `W` (or `↑`) : Jump / Double Jump
  * `S` (or `↓`) : Block Shield & **Ground Slide** (75% Damage Mitigation)
  * `F` : Light Punch
  * `G` : Heavy Kick
  * `H` : Ultimate Special (Requires 100% Special Meter)

* **Player 2 (Red Stickman)**:
  * `←` / `→` : Move Left / Right
  * `↑` : Jump / Double Jump
  * `↓` : Block Shield & **Ground Slide** (75% Damage Mitigation)
  * `J` : Light Punch
  * `K` : Heavy Kick
  * `L` : Ultimate Special (Requires 100% Special Meter)

---

## 📜 Updates & Changelog

### Version 1.4.0
* **75% Damage Mitigation on Block**: Blocking attacks now reduces incoming damage by exactly 75% (taking 25% damage).
* **Ground Slide Mechanic**: Pressing `S` or `Down Arrow` while moving initiates a high-speed low-profile Ground Slide with slide audio and spark particle trail.
* 75% damage mitigation applies while sliding.

### Version 1.3.0
* Added **Interactive Key Remapping UI** allowing users to click and assign custom keys for any action.
* Added `localStorage` persistence for custom keybindings.
* Added **Dual Arrow / WASD movement** for Player 1 in Single Player mode.
* Added `Reset Keys` button to restore defaults.

### Version 1.2.0
* Added **Single Player vs CPU Mode** with intelligent AI behavior.
* Added **AI Difficulty Selector** (Easy, Normal, Hard).
* Added **2v2 Team Brawl Mode** featuring 4 fighters on screen simultaneously.

### Version 1.0.0
* Initial Prototype release of **Brawl-Sticks** 1v1 Local fighting game.
