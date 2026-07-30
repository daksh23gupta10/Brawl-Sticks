# ⚔️ Brawl-Sticks (1v1 & 2v2 Stickman Fighting Game)

A fast-paced, high-performance 2D Stickman Fighting Web Game built using HTML5 Canvas, Vanilla JavaScript, and Web Audio API. Play solo against smart AI, battle a friend locally, or jump into a 4-fighter 2v2 Team Brawl! Now fully playable on **Desktops (Keyboard & Mouse)** and **Mobile Phones / Tablets (Touch Joystick)**!

---

## 📱 Mobile & Mouse Controls

### Mouse Attacks (Desktop):
* **Left-Click:** Light Punch
* **Right-Click:** Heavy Kick
* **Middle-Click:** Ultimate Special Attack

### Virtual Touch Controls (Mobile Phones & Tablets):
* **Virtual Joystick (Bottom Left):** Drag left/right to move, drag up to jump, drag down to block/slide.
* **Touch Action Buttons (Bottom Right):**
  * `🥊 PUNCH` (Cyan button)
  * `🦵 KICK` (Magenta button)
  * `🛡️ SLIDE` (Yellow button)
  * `⚡ ULT` (Gold Ultimate button)

---

## 🎮 Game Modes

1. **🤖 1 Player vs CPU (Single Player)**
   * Fight solo against a computer-controlled AI stickman.
   * Supports 3 difficulty levels: **Easy**, **Normal**, and **Hard**.
   * P1 can control using **Arrow Keys**, **WASD**, **Mouse**, or **Touch Joystick**.

2. **⚔️ 1v1 Local Multiplayer**
   * Battle a friend on 1 keyboard in real-time.

3. **🔥 2v2 Team Brawl (4-Fighter Arena)**
   * Team Blue (Player 1 + CPU Teammate) vs Team Red (2 CPU Enemies).
   * 4 stickmen fighting simultaneously with dedicated health bar tracking.

---

## 📜 Updates & Changelog

### Version 1.5.0
* **Mouse Click Attacks**: Left-click to punch, Right-click to kick. Disabled right-click context menu over canvas.
* **Virtual Touch Joystick**: Added smooth analog touch joystick on bottom-left for mobile movement/jump/crouch.
* **Touch Action Buttons**: Added ergonomic action buttons on bottom-right for Punch, Kick, Slide, and Ultimate.
* **Responsive Mobile Styling**: Full viewport scaling and touch-action optimizations.

### Version 1.4.0
* **75% Damage Mitigation on Block**: Reduced incoming damage by 75% when blocking or sliding.
* **Ground Slide Mechanic**: Pressing `S` or `Down Arrow` while moving initiates a high-speed Ground Slide.

### Version 1.3.0
* Added **Interactive Key Remapping UI** with `localStorage` persistence.
* Added **Dual Arrow / WASD movement** for Player 1 in Single Player mode.

### Version 1.2.0
* Added **Single Player vs CPU Mode** (Easy, Normal, Hard AI).
* Added **2v2 Team Brawl Mode** featuring 4 fighters on screen simultaneously.

### Version 1.0.0
* Initial Prototype release of **Brawl-Sticks**.
