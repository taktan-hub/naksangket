# 🎮 นักสังเกตตัวจิ๋ว: ภารกิจจัดกลุ่มผักและผลไม้

## 📋 ข้อมูลโปรเจกต์

**ชื่อ**: นักสังเกตตัวจิ๋ว (Tiny Observer Classification Game)  
**ประเภท**: Educational Game - PWA (Progressive Web Application)  
**เป้าหมาย**: เกมการเรียนรู้วิทยาศาสตร์สำหรับนักเรียน ป.2  
**สถานะ**: ✅ พัฒนาเสร็จ + PWA conversion สำเร็จ

---

## 🎯 จุดประสงค์การเรียนรู้

นักเรียนสามารถ:
- ✅ สังเกตลักษณะของสิ่งต่าง ๆ (จำนวน สี รูปร่าง ประเภท)
- ✅ กำหนดเกณฑ์ในการจำแนกประเภท
- ✅ จำแนกสิ่งต่าง ๆ ตามเกณฑ์ที่กำหนด
- ✅ อธิบายเหตุผลในการจัดกลุ่ม
- ✅ เข้าใจว่าเกณฑ์เดียวกันสามารถให้ผลต่างกันได้

---

## 🎮 Game Structure

### ด่าน 5 ระดับ:

**ด่าน 1: นักสังเกตตัวจิ๋ว** (Observation Level)
- กิจกรรม: แตะบัตรภาพเพื่อสังเกต
- เป้าหมาย: สำรวจทั้ง 20 ภาพ
- เกณฑ์: ไม่มี (เพียงแต่สังเกต)
- คะแนน: +10 ต่อ 1 ภาพ

**ด่าน 2: จัดกลุ่มตามจำนวน** (Count Criterion)
- กิจกรรม: ลากบัตรวางในกลุ่ม 1, 2, 3, 4
- เป้าหมาย: จำแนกถูก 20 ภาพ
- เกณฑ์: จำนวนสิ่งของในภาพ
- คะแนน: +10 ต่อครั้ง

**ด่าน 3: จัดกลุ่มตามสี** (Color Criterion)
- กิจกรรม: ลากบัตรตามสี (แดง เขียว เหลือง ส้ม ม่วง ขาว น้ำตาล)
- เกณฑ์: สีของสิ่งของ
- คะแนน: +10 ต่อครั้ง

**ด่าน 4: จัดกลุ่มตามรูปร่าง** (Shape Criterion)
- กิจกรรม: ลากบัตรตามรูปร่าง (กลม/ยาว)
- เกณฑ์: รูปร่างของสิ่งของ
- คะแนน: +10 ต่อครั้ง

**ด่าน 5: Boss Mission** (Multi-Criterion Boss Level)
- กิจกรรม: ทำ 4 รอบติดต่อกัน (count → color → shape → category)
- เป้าหมาย: ผ่านทั้ง 4 รอบ
- ระบบ: มีการจับเวลา, Leaderboard
- คะแนน: +10 ต่อรอบ + โบนัส

---

## 📊 Data Structure & Game State

### Items Array (js/script.js:4-25)
Every item must have all 9 properties:
```javascript
{
  id: "santol",              // unique identifier, used in game state
  name: "กระท้อน",            // display name (Thai)
  image: "images/กระท้อน.png", // relative path, must exist
  count: 2,                  // number of items in image
  countUnit: "ผล",            // quantity unit (ผล/หัว/เม็ด/etc)
  color: "น้ำตาล",            // must match ZONE_COLORS key
  shape: "กลม",              // either "กลม" or "ยาว"
  category: "ผลไม้",          // either "ผัก" or "ผลไม้"
  observationText: "..."      // 50-60 char Thai text describing the item
}
```
**Critical:** All 20 items must be in `ITEMS[]`. Color must match a key in `ZONE_COLORS{}` (line 98+).

### Levels Config (js/script.js:31-89)
```javascript
// Level 1: Observation (tap to view, no classification)
{ id: 1, type: "observe", required: 20, criterion: "การสังเกต", ... }

// Levels 2-4: Classification (drag & drop by criterion)
{ id: 2, type: "classify", criterion: "count", groups: [1, 2, 3, 4], ... }
{ id: 3, type: "classify", criterion: "color", groups: [7 colors], ... }
{ id: 4, type: "classify", criterion: "shape", groups: ["กลม", "ยาว"], ... }

// Level 5: Boss Mission (4 consecutive rounds)
{ id: 5, type: "boss", rounds: [count, color, shape, category], ... }
```

### Game State Object (js/script.js:130-150)
Persisted to localStorage as `classification-game-progress`:
```javascript
{
  unlocked: 2,                    // highest level unlocked (1-5)
  stars: { "1": 3, "2": 2, ... }, // stars earned per level
  bestScores: { "1": 150, ... },  // best score per level
  soundOn: true,                  // mute toggle
  levelState: {                   // temporary, cleared between levels
    currentLevel: 2,
    correctCount: 18,
    attempts: 20,
    observedItems: ["santol", "banana", ...],
    placedItems: ["santol", "banana", ...],
    errorItems: ["chili"],        // wrong placements for hint feedback
    startTime: 1687234567890
  }
}
```

### Leaderboard Data (js/script.js:1026+)
Persisted to localStorage as `classification-boss-leaderboard`:
```javascript
[
  {
    name: "Team Name",
    stars: 3,
    score: 180,
    seconds: 245,
    playedAt: "2026-06-18T10:30:00Z"
  },
  // ... more entries, kept sorted by score desc
]
```

---

## 🛠️ Architecture & Code Flow

### High-Level Architecture
```
User Input (click/drag/type)
    ↓
Event Handler (handleDrop, handleObserve, etc)
    ↓
Game Logic (validate, score, update state)
    ↓
Update State Object
    ↓
Render UI (renderLevel, renderSummary, etc)
    ↓
Save to localStorage
    ↓
Audio Feedback (playTone)
    ↓
Toast Notification (showToast)
```

### Core Render Pipeline
1. **Home Screen** → `renderHome()` (line 635)
2. **Level Select** → `renderLevelSelect()` (line 690)
3. **Level Screen** → `renderLevel()` (line 750+)
   - Observation level: `renderObservation()`
   - Classification level: `renderClassification()`
   - Boss level: `renderBoss()`
4. **Completion** → `renderSummary()` (line 1010)

Each render function:
- Clears `#app` innerHTML
- Builds DOM with semantic HTML
- Attaches event listeners
- Sets focus/aria attributes

### Drag & Drop Flow (Classification Levels)
```
User mousedown on card
  → beginPointerDrag(event) [line 873]
  → Record item ID, start position
  
User moves pointer
  → dragOver highlights drop zone
  → CSS `:hover` changes zone color
  
User releases on zone
  → handleDrop(itemId, groupValue) [line 781]
  → Validate: getItemByProperty(criterion) === groupValue?
  → If correct: move card, +score, mark placed
  → If wrong: shake animation, play error tone, show hint
  → If all correct: showReasonQuestion()
```

### Level Completion Flow
```
Classification complete (all items placed correctly)
  → showReasonQuestion() [line 920]
  → User types answer or skips
  → completeLevel() [line 960]
  → Calculate stars by error rate [calculateStars()]
  → Save progress to localStorage
  → Check if all levels unlocked
  → Show summary screen
```

### Technology Stack
| Layer | Technology | 용도 |
|-------|-----------|------|
| **Frontend** | HTML5 + CSS3 | Semantic structure, responsive layout |
| **Logic** | Vanilla JS (no framework) | State management, game rules, validation |
| **Storage** | localStorage | Persist progress, scores, leaderboard |
| **Audio** | Web Audio API | playTone() generates 660Hz (correct) / 260Hz (wrong) |
| **Interaction** | Pointer Events API | Touch + mouse drag/drop support |
| **Offline** | Service Worker | Cache HTML/CSS/JS/fonts, images stay fresh |
| **PWA** | manifest.json | Install as app, icon, splash screen |
| **Font** | Itim (Thai) | Playful Thai font loaded from file/ |

---

## 📱 PWA Implementation

### Files Added:
- ✅ `manifest.json` - App metadata, icons, display settings
- ✅ `sw.js` - Service Worker (offline + caching)
- ✅ `index.html` - PWA registration + notification UI
- ✅ `images/app-icon.svg` - Icon template
- ✅ `PWA-SETUP-GUIDE.md` - Complete guide (Thai)

### Caching Strategy:

**Cache-First** (รูปภาพ, ฟอนต์):
- ตรวจ cache ก่อน → ถ้าพบ return ทันที
- ถ้าไม่พบ fetch from network → cache → return

**Network-First** (HTML, CSS, JS):
- ลองดึง network ก่อน → ถ้าสำเร็จ cache → return
- ถ้า network ล่ม → ตรวจ cache → return
- ข้อดี: ได้ update ล่าสุด

### Features:
- ✅ Offline support
- ✅ Auto-update detection
- ✅ Install as app
- ✅ Responsive design
- ✅ iOS support (apple-mobile-web-app)

---

## 📂 Project Structure

```
Clasification/
├── 📄 index.html               # Main entry point
├── 📄 manifest.json            # PWA manifest (NEW)
├── 📄 sw.js                    # Service Worker (NEW)
├── 📄 PWA-SETUP-GUIDE.md       # PWA guide (NEW)
├── 📄 claude.md                # This file
│
├── 📁 js/
│   └── 📄 script.js            # Game logic (1098 lines)
│       ├── ITEMS[] - บัตรภาพ 20 ชนิด
│       ├── LEVELS[] - 5 ด่าน
│       ├── State management - game state
│       ├── Rendering functions - UI update
│       ├── Game handlers - drag, drop, click
│       └── Audio & feedback - sound, toast
│
├── 📁 css/
│   └── 📄 style.css            # Styling
│       ├── Color scheme
│       ├── Layout (grid, flexbox)
│       ├── Animations
│       └── Responsive design
│
├── 📁 images/
│   ├── 🖼️ [20 fruit/vegetable PNGs]
│   ├── 🖼️ app-icon.svg         # PWA icon (NEW)
│   ├── 🖼️ icon-192x192.png     # TODO: Convert SVG
│   └── 🖼️ icon-512x512.png     # TODO: Convert SVG
│
├── 📁 font/
│   └── 🔤 Itim-Regular.ttf     # Thai font
│
└── 📄 จำแนกประเภทสิ่งต่าง ๆ ได้อย่างไร.pdf  # Teacher guide
```

---

## 🎨 UI/UX Features

### Screens:
1. **Home** - Hero section with intro
2. **Level Select** - 5 level cards with progress
3. **Observation Level** - Grid of cards to observe
4. **Classification Level** - Drag & drop interface
5. **Level Summary** - Results, stars, leaderboard
6. **Final Review** - 5-level recap

### Interactive Elements:
- 🎯 Draggable cards with pointer events
- 🎵 Audio feedback (correct/wrong sounds)
- 📢 Toast notifications
- ⭐ Star rating system (1-3 stars)
- 🏆 Leaderboard (Boss Mission)
- 🔄 Update notification

### Accessibility:
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard support (reason questions)
- ✅ High contrast colors
- ✅ Focus indicators
- ✅ Screen reader support

---

## 💾 Storage & Progress

### localStorage Keys:
- `classification-game-progress` - Player progress
  ```json
  {
    "unlocked": 2,
    "stars": { "1": 3, "2": 2 },
    "bestScores": { "1": 150, "2": 120 },
    "soundOn": true
  }
  ```

- `classification-boss-leaderboard` - Boss Mission results
  ```json
  [
    {
      "name": "Team Green",
      "stars": 3,
      "score": 180,
      "seconds": 245,
      "playedAt": "2026-06-18T..."
    }
  ]
  ```

---

## 🎯 Game Logic Flow

### Observation Level:
```
1. แสดงกริด 20 บัตรภาพ
2. User แตะบัตร → เปิด dialog
3. Dialog แสดง: ชื่อ, จำนวน, สี, รูปร่าง, ประเภท
4. User กด "สังเกตแล้ว" → + score, mark as observed
5. ทุก 20 ภาพสังเกตได้ → Reason Question
6. ตอบถูก → Level summary
```

### Classification Level:
```
1. แสดง Drop zones ตามเกณฑ์
2. User ลากบัตรจากสรรพคุณ
3. Drop on zone → ตรวจเกณฑ์
4. ถูก → +10 score, move to zone
5. ผิด → flash wrong, hint toast
6. ทั้งหมดถูก → Reason Question
7. ตอบถูก → Next round / Level summary
```

### Boss Mission:
```
1. User ใส่ชื่อและเริ่มจับเวลา
2. รอบที่ 1: จำแนกตามจำนวน
3. รอบที่ 2: จำแนกตามสี
4. รอบที่ 3: จำแนกตามรูปร่าง
5. รอบที่ 4: จำแนกตามประเภท
6. ทั้ง 4 รอบสำเร็จ → Leaderboard entry
7. คำนวณ stars → Show results
```

---

## 🔊 Game Mechanics

### Scoring:
- Observation: +10 points per item
- Classification: +10 points per correct placement
- Reason Question: +10 points if correct
- Attempts: counted but not deducted
- Stars: based on error rate

### Star System:
```
Error Rate ≤ 10% → ⭐⭐⭐ (3 stars)
Error Rate ≤ 30% → ⭐⭐  (2 stars)
Error Rate > 30% → ⭐   (1 star)
```

### Feedback:
- ✅ Correct: Green tone (660 Hz), "ถูกต้อง เก่งมาก", +score
- ❌ Wrong: Low tone (260 Hz), Hint toast, no score
- ℹ️ Info: Yellow toast with guidance

---

## 📋 Key Functions Reference

### Game Flow Functions
| Function | Purpose | Key Line | Notes |
|----------|---------|----------|-------|
| `startLevel(levelId)` | Begin level, init state | 763 | Calls `beginLevel()` then `renderLevel()` |
| `beginLevel(level)` | Initialize level state object | 775 | Sets up empty state, shuffles items |
| `completeLevel(reason)` | End level, save, check unlock | 960 | Awards score, calculates stars, shows summary |
| `nextLevel()` | Advance to next level | 1000 | Increment `unlocked`, call `renderLevelSelect()` |

### Interaction Handlers
| Function | Purpose | Triggered By |
|----------|---------|--------------|
| `handleObserve(itemId)` | Show observation dialog | Tap on observation-level card |
| `handleDrop(itemId, group)` | Validate classification | Drop on drop-zone |
| `handleReasonAnswer(text)` | Process reason text input | Submit reason question |
| `beginPointerDrag(event)` | Start drag tracking | mousedown on card |

### Validation & Scoring
| Function | Purpose | Usage |
|----------|---------|-------|
| `validatePlacement(itemId, group)` | Check if placement is correct | Inside `handleDrop()` |
| `getItemByProperty(criterion, value)` | Find item property value | Validate against ITEMS |
| `calculateStars()` | Compute star rating by error rate | At level completion |
| `markObservationComplete(itemId)` | Increment observation count | In observation level |

### Utility Functions
| Function | Purpose | Returns |
|----------|---------|---------|
| `playTone(kind)` | Play audio feedback | undefined (side effect: audio) |
| `showToast(text, duration)` | Show temporary message | undefined (DOM updated) |
| `saveProgress()` | Persist to localStorage | undefined (state saved) |
| `loadProgress()` | Restore from localStorage | progress object or defaults |

### CSS Styling Organization (css/style.css)
```
Color Scheme:
  - Primary: #78c9ee (light blue)
  - Background: #f8f9fa (light gray)
  - Text: #2c3e50 (dark)
  - Error: #ef7d88 (light red)
  - Success: #75bc79 (light green)

Layout Grid:
  - Cards: `display: grid; gap: 1rem`
  - Drop zones: `display: grid; grid-auto-columns: 1fr`
  - Responsive: `@media (max-width: 768px)` breaks to 2-col

Animations:
  - Card flip: `transform: perspective(1000px) rotateY()`
  - Wrong placement: `.shake` animation 300ms
  - Toast slide: `@keyframes slideIn` 200ms
  - Drag preview: opacity 0.7

Component Classes:
  - `.card` - Draggable item card
  - `.drop-zone` - Classification target area
  - `.button` - Semantic button styling
  - `.dialog` - Modal overlays
  - `.toast` - Temporary notification bar
```

---

## ⚠️ Important Code Patterns & Gotchas

### When Modifying Items
**DO:**
- Add all 9 properties to each item
- Use existing colors from `ZONE_COLORS` (lines 98-110)
- Test in all 5 levels (item appears in each)
- Keep `observationText` under 60 characters
- Use Thai language for everything visible to students

**DON'T:**
- Change item `id` (breaks saved progress)
- Add new colors without updating `ZONE_COLORS`
- Make `count` or `shape` inconsistent with image
- Forget the image file in `images/` folder
- Use emoji or special characters in item IDs

### When Modifying Levels
**DO:**
- Keep level 1 as "observe" (it's foundational)
- Levels 2-4 must be "classify" types
- Keep level 5 as "boss" (multiplayer finale)
- Test each level independently in DevTools
- Update tests for any criterion changes

**DON'T:**
- Reorder level IDs (breaks progress tracking)
- Change `criterion` field type (must match property in ITEMS)
- Add levels without incrementing ID sequentially
- Change drop zone colors arbitrarily (should match item colors)

### When Modifying Scoring
**DO:**
- Keep all per-item points the same (currently +10)
- Multiply bonuses by multiplier in Boss Mission only
- Track changes in comments near scoring logic
- Test star distribution (easy to earn at least 1 star)
- Verify leaderboard still shows meaningful rankings

**DON'T:**
- Mix negative points (no deductions system exists)
- Make final score unpredictable (must be deterministic)
- Forget to update UI text mentioning point values
- Break the formula: `score = (correct - wrong) * 10` assumptions

### Drag & Drop Internals
**Critical:** The drag system uses these HTML attributes:
```html
<div class="card" data-item-id="santol" draggable="true">
<div class="drop-zone" data-group="2">
```
**DO:**
- Always set `data-item-id` on cards (no spaces)
- Always set `data-group` on zones (exact criterion value)
- Use lowercase item IDs in data attributes

**DON'T:**
- Change attribute names (the JS selects by exact name)
- Add spaces in attribute values
- Remove `draggable="true"` from cards
- Add pointer-events: none to parents of draggable elements

### localStorage Persistence
**Critical Keys** (never rename):
- `classification-game-progress` - game state
- `classification-boss-leaderboard` - boss scores

**DO:**
- Use `saveProgress()` after state changes
- Load with `loadProgress()` at game start
- Clear localStorage only for debugging, never in production code
- Test with DevTools → Application → localStorage cleared

**DON'T:**
- Assume localStorage keys won't conflict
- Store sensitive data (it's unencrypted)
- Change key names (users lose progress)
- Access localStorage directly (use helper functions)

### Service Worker Caching
**DO:**
- Keep `sw.js` caching strategy stable
- Test cache invalidation when updating files
- Verify new images are cached properly
- Check manifest.json for correct file references

**DON'T:**
- Manually bust cache with version queries
- Change cache key names (breaks update flow)
- Cache sensitive data or user progress
- Remove network-first strategy for HTML/CSS/JS

---

## 🐛 Known Issues & TODOs

### ⚠️ ต้องทำ (Critical):
- [ ] แปลง SVG → PNG 192x192, 512x512
- [ ] ทดสอบบน actual mobile devices
- [ ] ทดสอบ offline mode อย่างถี่ถ้วน
- [ ] ทดสอบ service worker update flow

### 🔄 ปรับปรุงได้ (Enhancement):
- [ ] Add sound effects library (ทำให้หลากหลาย)
- [ ] Add more levels (6-10 ด่าน)
- [ ] Add difficulty modes (easy/normal/hard)
- [ ] Add achievements/badges system
- [ ] Support multiple languages
- [ ] Add animation particles on correct
- [ ] Add cloud sync (Firebase)

### 📱 Platform-specific:
- [ ] Test iOS PWA installation
- [ ] Test Android Chrome install
- [ ] Test Windows Edge
- [ ] Test Safari offline

---

## 🌐 Deployment Checklist

- [ ] Convert SVG icons to PNG
- [ ] Test all 5 levels thoroughly
- [ ] Test offline functionality
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Verify manifest.json is valid
- [ ] Verify service worker caching
- [ ] Setup HTTPS (GitHub Pages / Netlify)
- [ ] Add to web app stores (optional)
- [ ] Create promotion materials
- [ ] Test teacher mode

---

## 📚 Documentation

### For Players:
- ❓ In-game hints (ดูคำใบ้ button)
- 📖 Teacher mode (โหมดครู)
- 🎯 Learning objectives in dialog

### For Teachers:
- 📄 Teacher guide PDF (เรียบร้อย)
- ❓ 7 suggested questions
- 🎮 Suggested classroom activities
- 📊 How to interpret scores

### For Developers:
- 📝 This claude.md
- 📘 PWA-SETUP-GUIDE.md
- 💬 Well-commented code
- 🔍 Variable names (Thai + English)

---

## 🚀 Development & Testing

### Quick Start
```bash
# Start local server
cd ~/Data/ปีการศึกษา\ 2569/ScienceWithKruTaktan/Clasification
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Testing Common Workflows

**Testing Service Worker & Offline Mode:**
- Open DevTools → Application → Service Workers
- Check "Offline" checkbox to simulate offline mode
- Verify assets load from cache
- Test with network throttling (DevTools → Network → Slow 3G)

**Testing Drag & Drop:**
- Open DevTools → Device Toolbar (Ctrl+Shift+M) for mobile viewport
- Test on actual devices when possible (iPhone, Android)
- Monitor console for errors with `pointer` events
- Verify `handleDrop()` validation logic

**Testing Scoring & Persistence:**
- Open DevTools → Application → localStorage
- Verify `classification-game-progress` and `classification-boss-leaderboard` update
- Clear localStorage and replay to ensure defaults work
- Check star calculation in `calculateStars()` at level end

**Audio Testing:**
- Toggle "เสียง" button to test mute/unmute
- Verify `playTone()` produces correct frequencies:
  - Correct: 660 Hz (high tone)
  - Wrong: 260 Hz (low tone)
- Test on mobile (iOS audio may require user interaction first)

### Debugging Tips

**Game State Issues:**
- Log `window.state` in console to inspect current game state
- `state.currentLevel`, `state.correctCount`, `state.attempts` are key values
- Use `saveProgress()` and reload to test persistence

**Drag & Drop Not Working:**
- Check browser console for `beginPointerDrag()` errors
- Verify `data-item-id` and `data-group` attributes on elements
- Test with `pointer-events: none` on parent elements

**PWA Not Installing:**
- Verify `manifest.json` references actual image files (not placeholders)
- Ensure site is served over HTTPS (or localhost)
- Check DevTools → Application → Manifest for validation errors

**Icons Not Loading:**
- Verify all referenced images exist: `images/*.png`, `images/app-icon.svg`
- Check file paths in `manifest.json` (relative paths, no query strings)
- Convert SVG icons to PNG for better iOS support

### Common Tasks

**Modify Game Items:**
- Edit `ITEMS[]` array in `js/script.js:4-25`
- Each item must have: `id`, `name`, `image`, `count`, `countUnit`, `color`, `shape`, `category`, `observationText`
- Add new images to `images/` folder
- Test all 5 levels after changes

**Adjust Level Difficulty:**
- `LEVELS[]` config: change `required` count, `groups` options
- `calculateStars()`: adjust error rate thresholds (line 996+)
- Test star distribution across skill levels

**Change Scoring System:**
- Search for `+10` in `script.js` to find all score awards
- Change values consistently across all levels
- Update UI text if score formulas change significantly

**Test Reason Questions:**
- Level completion triggers `showReasonQuestion()`
- Reason answers stored in level state (not scored, but logged)
- Modify questions in Teacher Mode dialog section (index.html:33-80)

---

## 📞 Quick Reference

### Important Files:
- **Game Logic**: `js/script.js` (1098 lines)
- **UI Styling**: `css/style.css`
- **PWA Config**: `manifest.json`, `sw.js`
- **Guide**: `PWA-SETUP-GUIDE.md`

### Key Variables:
- `ITEMS` - 20 items with metadata
- `LEVELS` - 5 level configs
- `state` - Current game state
- `SPONSORS` - Ad/redirect config

### Key Events:
- `startLevel()` - Level begin
- `handleDrop()` - Drop validation
- `completeLevel()` - Level end
- `showReasonQuestion()` - Reasoning prompt

---

## 🎓 Onboarding Path for New Contributors

Follow this order when picking up a task:

1. **Understand the Project** (10 min)
   - Read this `claude.md` (you're here!)
   - Skim `PWA-SETUP-GUIDE.md` for context
   
2. **Set Up Locally** (5 min)
   - `python3 -m http.server 8000` in project directory
   - Open http://localhost:8000 in browser
   
3. **Play the Game** (15 min)
   - Complete all 5 levels to understand flow
   - Pay attention to scoring, star calculation, drag-drop feel
   - Test offline with DevTools
   
4. **Read the Code** (20 min)
   - `js/script.js`: Start with `ITEMS[]` and `LEVELS[]` (lines 1-95)
   - Then read `startLevel()` → `renderLevel()` → `handleDrop()` (lines 763-820)
   - Skim the rest: rendering functions, utils, helpers
   
5. **Test Your Changes** (varies)
   - For any task: run local server, test in browser
   - Check console for errors
   - Test on mobile device if modifying touch/drag
   - Verify localStorage persists progress
   - Test offline mode for PWA changes

6. **Common Tasks**
   - **Add item**: Edit `ITEMS[]`, add image, test all 5 levels
   - **Fix bug**: Reproduce in DevTools console, trace state, verify localStorage
   - **Change UI text**: Search file for Thai text, replace consistently
   - **Modify scoring**: Search for `+10` patterns, test star distribution

---

## 📌 Quick Facts

- **No Build Tools** - This is a static HTML/CSS/JS app (no webpack, babel, npm)
- **No Frameworks** - Pure vanilla JavaScript (no React, Vue, etc)
- **No Backend** - Everything runs locally with localStorage
- **No Tests** - Manual testing in browser only
- **Thai Language Only** - All player-facing text is Thai; comments are mixed Thai/English
- **Single File Game Logic** - 1098 lines in `js/script.js` (can be refactored later)
- **PWA Ready** - Can install as app, works offline, caches automatically
- **Mobile First** - Designed for touch, tested on iOS/Android

---

## 📞 File Quick Reference

| File | Purpose | Edit When |
|------|---------|-----------|
| `index.html` | HTML structure, teacher mode | Adding UI elements, teacher questions |
| `js/script.js` | All game logic | 90% of changes go here |
| `css/style.css` | Colors, layout, animations | Visual changes, responsive fixes |
| `manifest.json` | PWA config, icons, app metadata | App name, colors, icon references |
| `sw.js` | Service worker, caching strategy | Offline support, cache updates |
| `claude.md` | This documentation | Keeping docs in sync with code |

---

## 🎯 Starting Your First Task

1. **Bug Fix**: Start at the error message → find related function → check `handleDrop()` or render function
2. **Add Item**: Copy existing item in ITEMS[], add image, test all levels
3. **Change Score**: Search `+10` in script.js, update calculation, test star distribution
4. **UI Polish**: Use DevTools Device Toolbar (Ctrl+Shift+M), adjust CSS for mobile
5. **Performance**: Profile with DevTools → Performance tab, check Service Worker cache hit rate

---

**Last Updated**: 2026-06-20  
**Status**: ✅ PWA Conversion Complete + Mobile/iPad Layout Overhaul Complete  
**Maintenance**: Keep claude.md in sync when modifying ITEMS, LEVELS, or render pipeline

---

## 📒 บันทึกการทำงาน 2026-06-19 → 2026-06-20 (Mobile/iPad Layout Overhaul)

ภารกิจ: ทำให้ทุกหน้า **พอดี viewport ไม่ scroll แนวตั้ง + responsive + friendly** บนมือถือ/iPad (ทดสอบจริงบน iPad Air แนวนอน, Chrome iOS) แล้ว deploy ผ่าน Git → Plesk auto-pull

### 🔑 บทเรียนสำคัญที่สุด (อ่านก่อนแก้เรื่อง scroll/viewport)

1. **iOS ห้ามหยุด scroll ด้วย CSS อย่างเดียว** — `overflow:hidden` / `position:fixed` / `dvh` / `svh` **ไม่พอ** เพราะ iOS Safari/Chrome ถือว่าการเลื่อนเป็น **touch gesture**. ต้องดักด้วย JavaScript:
   - `document.body.dataset.screen = name` (`setScreenClass`, script.js) ทำ flag ให้ scope กฎต่อหน้า
   - `initLevelSelectScrollLock()` (script.js) — ดัก `touchmove` แล้ว `preventDefault()` **เฉพาะตอนปัดแนวตั้ง** (`dy > dx`), ปัดแนวนอนปล่อยให้ carousel ทำงาน + ดัก `wheel` แนวตั้ง (ต้อง `{ passive:false }`)
   - CSS `touch-action: pan-x` บน element ที่ต้องปัดแนวนอน
2. **วัดความสูง viewport จริงด้วย JS ไม่ใช่ `dvh/svh`** — `setAppHeight()` อ่าน `window.visualViewport.height` (พื้นที่จริงหลังหัก address bar) → เก็บใน CSS var `--app-height`, อัปเดตตอน `resize/orientationchange/load/pageshow`. `body`/`html` ใช้ `height: var(--app-height)`
3. **อย่าใช้ magic-number ความสูง header** (`height: calc(100% - 210px)`) — ไม่ responsive, พังกับ Boss ที่ header สูงกว่า. ใช้ **flex column** แทน: header/banner/toolbar = `flex:0 0 auto`, พื้นที่เนื้อหา = `flex:1`
4. **ปัญหา cache เรื้อรัง** — แก้ CSS/JS แล้วเครื่องไม่เห็นของใหม่ เพราะ Service Worker เสิร์ฟไฟล์เก่า. ทุกครั้งที่แก้ CSS/JS ต้อง:
   - bump `CACHE_NAME` + `RUNTIME_CACHE` ใน `sw.js`
   - bump `?v=x.x.x` ต่อท้าย `style.css`/`script.js` ใน `index.html` (เวอร์ชันล่าสุด: **v1.1.11**)
   - ทดสอบใน **Incognito/Private tab** เพื่อเลี่ยง SW เก่า

### ✅ สิ่งที่แก้ไปแล้ว (ตามหน้า)

| หน้า | สิ่งที่ทำ |
|------|-----------|
| **เลือกภารกิจ** (renderLevelSelect) | เปลี่ยนเป็น **horizontal swipe carousel** (`.level-carousel-*`), ล็อก vertical scroll ด้วย gesture lock + `touch-action:pan-x`, heading เหลือบรรทัดเดียว (`.level-select-heading`), ซ่อนสปอนเซอร์ซ้ำบน toolbar |
| **ด่าน 1 สังเกต** | จัดให้พอดีจอ, เก็บ game state ถูกต้อง |
| **ด่าน 2-4 จัดกลุ่ม** | redesign เป็น **2 แถว swipe** (`usesSwipeRows` = count/color/shape → class `swipe-classification`): แถวบน = บัตรรอจัด, แถวล่าง = กลุ่มปลายทาง |
| **ด่าน 4 รูปร่าง (shape)** | shape มี 2 กลุ่ม → `.criterion-shape .zones-grid` เป็น **grid 2 คอลัมน์ เห็นทั้งกลม/ยาวพร้อมกัน** (ไม่ swipe ระหว่าง zone) |
| **การ์ดในกล่องจัดกลุ่ม** | เพิ่ม `touch-action:pan-x` ให้ปัดดูการ์ดที่วางแล้วได้ (การ์ดที่วางแล้ว JS ถอด drag listener ที่ handleDrop:986 จึงปัดได้ปลอดภัย — ตัวการที่บล็อกคือ base `.item-card{touch-action:none}`) |
| **ด่าน 5 Boss** | header สูงกว่า (timer+roundmap) → ย้าย layout เป็น **flex-column base** ที่ `.classification-screen` ใช้ทุกความกว้าง (รวม iPad ≥980px), `game-layout = flex:1` → กล่องไม่โดนตัดครึ่ง |
| **หน้าสรุปผล / Home** | ล็อก viewport, ปุ่มพอดีไม่ต้อง scroll |

### 🧩 จุดอ้างอิงเร็ว (สำหรับงานต่อ)

- **Scroll lock:** `setScreenClass`, `initLevelSelectScrollLock` (js/script.js ~174-201) + CSS `body[data-screen="levels"]` (~204), `--app-height` (`setAppHeight`/`initViewportHeight`)
- **Classification layout:** `renderClassificationLevel` (js/script.js ~795), flag `usesSwipeRows`, CSS `.classification-screen` (flex column base), `.swipe-classification .*`, `.criterion-shape .*`
- **Deploy:** push → GitHub `taktan-hub/naksangket` → Plesk webhook auto-pull (~1-2 นาที) → `krutak.thatnarai.net/science/p2/classification`. Author commit: `Taktan <taktan@tnw.ac.th>`
- หมายเหตุ: งานช่วงท้ายมีบาง commit ทำโดย Codex (ChatGPT) — เห็นใน git log วันที่ 2026-06-19 (commit `e5f9db5` เป็นต้นไป)
