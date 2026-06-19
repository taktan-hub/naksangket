"use strict";

// ข้อมูลบัตรภาพทั้งหมด แยกจากระบบเกมเพื่อแก้ไขได้ง่าย
const ITEMS = [
  { id: "santol", name: "กระท้อน", image: "images/กระท้อน.png", count: 2, countUnit: "ผล", color: "น้ำตาล", shape: "กลม", category: "ผลไม้", observationText: "ในภาพมีกระท้อน 2 ผล มีสีน้ำตาล รูปร่างกลม และเป็นผลไม้" },
  { id: "banana", name: "กล้วยหอม", image: "images/กล้วยหอม.png", count: 3, countUnit: "ผล", color: "เหลือง", shape: "ยาว", category: "ผลไม้", observationText: "ในภาพมีกล้วยหอม 3 ผล มีสีเหลือง รูปร่างยาว และเป็นผลไม้" },
  { id: "cauliflower", name: "กะหล่ำดอก", image: "images/กะหล่ำดอก.png", count: 1, countUnit: "หัว", color: "ขาว", shape: "กลม", category: "ผัก", observationText: "ในภาพมีกะหล่ำดอก 1 หัว มีสีขาว รูปร่างเป็นดอกกลม ๆ และเป็นผัก" },
  { id: "cabbage", name: "กะหล่ำปลี", image: "images/กะหล่ำปลี.png", count: 1, countUnit: "หัว", color: "เขียว", shape: "กลม", category: "ผัก", observationText: "ในภาพมีกะหล่ำปลี 1 หัว มีสีเขียว รูปร่างกลม และเป็นผัก" },
  { id: "carrot", name: "แคร์รอต", image: "images/แคร์รอต.png", count: 2, countUnit: "หัว", color: "ส้ม", shape: "ยาว", category: "ผัก", observationText: "ในภาพมีแคร์รอต 2 หัว มีสีส้ม รูปร่างยาว และเป็นผัก" },
  { id: "cucumber", name: "แตงกวา", image: "images/แตงกวา.png", count: 3, countUnit: "ผล", color: "เขียว", shape: "ยาว", category: "ผัก", observationText: "ในภาพมีแตงกวา 3 ผล มีสีเขียว รูปร่างยาว และเป็นผัก" },
  { id: "watermelon", name: "แตงโม", image: "images/แตงโม.png", count: 1, countUnit: "ผล", color: "เขียว", shape: "กลม", category: "ผลไม้", observationText: "ในภาพมีแตงโม 1 ผล มีสีเขียว รูปร่างกลม และเป็นผลไม้" },
  { id: "chili", name: "พริก", image: "images/พริก.png", count: 4, countUnit: "เม็ด", color: "แดง", shape: "ยาว", category: "ผัก", observationText: "ในภาพมีพริก 4 เม็ด มีสีแดง รูปร่างยาว และเป็นผัก" },
  { id: "tomato", name: "มะเขือเทศ", image: "images/มะเขือเทศ.png", count: 3, countUnit: "ผล", color: "แดง", shape: "กลม", category: "ผัก", observationText: "ในภาพมีมะเขือเทศ 3 ผล มีสีแดง รูปร่างกลม และเป็นผัก" },
  { id: "thai-eggplant", name: "มะเขือเปราะ", image: "images/มะเขือเปราะ.png", count: 3, countUnit: "ผล", color: "เขียว", shape: "กลม", category: "ผัก", observationText: "ในภาพมีมะเขือเปราะ 3 ผล มีสีเขียว รูปร่างกลม และเป็นผัก" },
  { id: "long-eggplant", name: "มะเขือยาว", image: "images/มะเขือยาว.png", count: 3, countUnit: "ผล", color: "ม่วง", shape: "ยาว", category: "ผัก", observationText: "ในภาพมีมะเขือยาว 3 ผล มีสีม่วง รูปร่างยาว และเป็นผัก" },
  { id: "lime", name: "มะนาว", image: "images/มะนาว.png", count: 1, countUnit: "ผล", color: "เขียว", shape: "กลม", category: "ผลไม้", observationText: "ในภาพมีมะนาว 1 ผล มีสีเขียว รูปร่างกลม และเป็นผลไม้" },
  { id: "papaya", name: "มะละกอ", image: "images/มะละกอ.png", count: 2, countUnit: "ผล", color: "ส้ม", shape: "ยาว", category: "ผลไม้", observationText: "ในภาพมีมะละกอ 2 ผล มีสีส้ม รูปร่างยาวรี และเป็นผลไม้" },
  { id: "mangosteen", name: "มังคุด", image: "images/มังคุด.png", count: 4, countUnit: "ผล", color: "ม่วง", shape: "กลม", category: "ผลไม้", observationText: "ในภาพมีมังคุด 4 ผล มีสีม่วง รูปร่างกลม และเป็นผลไม้" },
  { id: "orange", name: "ส้ม", image: "images/ส้ม.png", count: 1, countUnit: "ผล", color: "ส้ม", shape: "กลม", category: "ผลไม้", observationText: "ในภาพมีส้ม 1 ผล มีสีส้ม รูปร่างกลม และเป็นผลไม้" },
  { id: "pear", name: "สาลี่", image: "images/สาลี่.png", count: 3, countUnit: "ผล", color: "เหลือง", shape: "กลม", category: "ผลไม้", observationText: "ในภาพมีสาลี่ 3 ผล มีสีเหลือง รูปร่างค่อนข้างกลม และเป็นผลไม้" },
  { id: "onion", name: "หอมใหญ่", image: "images/หอมใหญ่.png", count: 4, countUnit: "หัว", color: "น้ำตาล", shape: "กลม", category: "ผัก", observationText: "ในภาพมีหอมใหญ่ 4 หัว มีสีน้ำตาล รูปร่างกลม และเป็นผัก" },
  { id: "radish", name: "หัวผักกาดขาว", image: "images/หัวผักกาดขาว.png", count: 2, countUnit: "หัว", color: "ขาว", shape: "ยาว", category: "ผัก", observationText: "ในภาพมีหัวผักกาดขาว 2 หัว มีสีขาว รูปร่างยาว และเป็นผัก" },
  { id: "apple", name: "แอปเปิล", image: "images/แอปเปิล.png", count: 2, countUnit: "ผล", color: "แดง", shape: "กลม", category: "ผลไม้", observationText: "ในภาพมีแอปเปิล 2 ผล มีสีแดง รูปร่างกลม และเป็นผลไม้" },
  { id: "green-apple", name: "แอปเปิลเขียว", image: "images/แอปเปิลเขียว.png", count: 1, countUnit: "ผล", color: "เขียว", shape: "กลม", category: "ผลไม้", observationText: "ในภาพมีแอปเปิลเขียว 1 ผล มีสีเขียว รูปร่างกลม และเป็นผลไม้" }
];

const ITEM_MAP = new Map(ITEMS.map((item) => [item.id, item]));
const ALL_ITEM_IDS = ITEMS.map((item) => item.id);

// การตั้งค่าด่านและเกณฑ์ที่ใช้ตรวจคำตอบ
const LEVELS = [
  {
    id: 1,
    title: "นักสังเกตตัวจิ๋ว",
    description: "แตะบัตรภาพเพื่อสังเกตจำนวน สี รูปร่าง และประเภท",
    type: "observe",
    itemIds: ALL_ITEM_IDS,
    required: ITEMS.length,
    criterion: "การสังเกต",
    summary: "ก่อนจำแนก เราต้องสังเกตจำนวน สี รูปร่าง และประเภทของสิ่งต่าง ๆ ก่อน"
  },
  {
    id: 2,
    title: "จัดกลุ่มตามจำนวน",
    description: "นับสิ่งที่อยู่ในภาพ แล้วจัดลงกลุ่มจำนวน 1 ถึง 4",
    type: "classify",
    criterion: "count",
    itemIds: ALL_ITEM_IDS,
    groups: [1, 2, 3, 4],
    hint: "ลองนับสิ่งที่เห็นในภาพทีละชิ้นนะ",
    summary: "ด่านนี้เราใช้จำนวนเป็นเกณฑ์ในการจำแนก"
  },
  {
    id: 3,
    title: "จัดกลุ่มตามสี",
    description: "สังเกตสีหลักของสิ่งในภาพ แล้วจัดลงกลุ่มสี",
    type: "classify",
    criterion: "color",
    itemIds: ALL_ITEM_IDS,
    groups: ["แดง", "เขียว", "เหลือง", "ส้ม", "ม่วง", "ขาว", "น้ำตาล"],
    hint: "ลองสังเกตสีหลักของสิ่งในภาพอีกครั้งนะ",
    summary: "ด่านนี้เราใช้สีเป็นเกณฑ์ในการจำแนก"
  },
  {
    id: 4,
    title: "จัดกลุ่มตามรูปร่าง",
    description: "สังเกตว่าสิ่งในภาพมีรูปร่างกลมหรือยาว",
    type: "classify",
    criterion: "shape",
    itemIds: ALL_ITEM_IDS,
    groups: ["กลม", "ยาว"],
    hint: "ลองดูว่าสิ่งนี้มีลักษณะกลมหรือยาวนะ",
    summary: "ด่านนี้เราใช้รูปร่างเป็นเกณฑ์ในการจำแนก"
  },
  {
    id: 5,
    title: "Boss Mission: ผู้พิชิตการจำแนก",
    description: "พิชิตภารกิจจำนวน สี รูปร่าง และประเภทให้ครบ",
    type: "boss",
    itemIds: ALL_ITEM_IDS,
    rounds: [
      { criterion: "count", groups: [1, 2, 3, 4], hint: "ลองนับสิ่งที่เห็นในภาพทีละชิ้นนะ" },
      { criterion: "color", groups: ["แดง", "เขียว", "เหลือง", "ส้ม", "ม่วง", "ขาว", "น้ำตาล"], hint: "ลองสังเกตสีหลักของสิ่งในภาพอีกครั้งนะ" },
      { criterion: "shape", groups: ["กลม", "ยาว"], hint: "ลองดูว่าสิ่งนี้มีลักษณะกลมหรือยาวนะ" },
      { criterion: "category", groups: ["ผัก", "ผลไม้"], hint: "ลองคิดดูว่าสิ่งนี้เป็นผักหรือผลไม้นะ" }
    ],
    summary: "สิ่งเดียวกันอาจอยู่คนละกลุ่มเมื่อเปลี่ยนเกณฑ์ เราจึงต้องบอกเกณฑ์ให้ชัดเจน"
  }
];

const CRITERION_LABELS = {
  count: "จำนวน",
  color: "สี",
  shape: "รูปร่าง",
  category: "ประเภท"
};

const ZONE_COLORS = {
  แดง: ["#fff0f1", "#ef7d88"],
  เขียว: ["#f0fff0", "#75bc79"],
  เหลือง: ["#fffbe8", "#e3c646"],
  ส้ม: ["#fff3e5", "#eea04f"],
  ม่วง: ["#f7f0ff", "#9c78ca"],
  ขาว: ["#ffffff", "#aebbc5"],
  น้ำตาล: ["#fff5eb", "#a97952"],
  กลม: ["#ecf8ff", "#6db9dc"],
  ยาว: ["#fff0f6", "#df85aa"],
  ผัก: ["#effff0", "#68aa70"],
  ผลไม้: ["#fff5df", "#e9b858"]
};

const app = document.querySelector("#app");
const toast = document.querySelector("#toast");
const homeButton = document.querySelector("#homeButton");
const soundButton = document.querySelector("#soundButton");
const teacherButton = document.querySelector("#teacherButton");
const teacherDialog = document.querySelector("#teacherDialog");

const SPONSORS = {
  mission: {
    name: "เช่ารถตู้สกลนคร",
    url: "https://เช่ารถตู้สกลนคร.com"
  },
  level: {
    name: "เช่ารถตู้อุดรธานี",
    url: "https://เช่ารถตู้อุดร.com"
  },
  leaderboard: {
    name: "เช่ารถตู้นครพนม",
    url: "https://roadtonakhon.com"
  }
};

const savedProgress = loadProgress();
const state = {
  screen: "home",
  level: null,
  roundIndex: 0,
  score: 0,
  attempts: 0,
  correctPlacements: 0,
  placedIds: new Set(),
  observedIds: new Set(),
  roundScores: [],
  lastReasonItemId: null,
  lastReasonCategory: null,
  playerName: "",
  bossStartedAt: null,
  bossElapsedSeconds: 0,
  timerId: null,
  soundOn: savedProgress.soundOn,
  progress: savedProgress
};

let toastTimer = null;
let audioContext = null;

function loadProgress() {
  const fallback = { unlocked: 1, stars: {}, bestScores: {}, soundOn: true };
  try {
    const saved = JSON.parse(localStorage.getItem("classification-game-progress"));
    return { ...fallback, ...saved };
  } catch {
    return fallback;
  }
}

function saveProgress() {
  localStorage.setItem("classification-game-progress", JSON.stringify(state.progress));
}

function openSponsoredGame(sponsorKey, route) {
  const sponsor = SPONSORS[sponsorKey];
  if (!sponsor) return;
  const gameUrl = new URL(window.location.href);
  gameUrl.hash = route;
  const gameTab = window.open(gameUrl.href, "_blank");
  if (!gameTab) {
    showToast("เบราว์เซอร์บล็อกแท็บใหม่ กรุณาอนุญาต pop-up แล้วลองอีกครั้ง", "hint");
    return;
  }
  gameTab.opener = null;
  window.location.assign(sponsor.url);
}

function loadLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem("classification-boss-leaderboard")) || [];
  } catch {
    return [];
  }
}

function saveLeaderboard(entries) {
  localStorage.setItem("classification-boss-leaderboard", JSON.stringify(entries));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderImage(item, className = "") {
  return `<img class="${className}" src="${item.image}" alt="${item.name}" draggable="false" data-image-path="${item.image}">`;
}

function attachImageFallbacks(container = document) {
  container.querySelectorAll("img[data-image-path]").forEach((image) => {
    image.addEventListener("error", () => {
      const message = document.createElement("div");
      message.className = "image-error";
      message.textContent = `ไม่พบไฟล์ภาพ: ${image.dataset.imagePath}`;
      image.replaceWith(message);
    }, { once: true });
  });
}

function showToast(message, type = "") {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className = `toast show ${type}`.trim();
  toastTimer = window.setTimeout(() => {
    toast.className = "toast";
  }, 2500);
}

function playTone(kind) {
  if (!state.soundOn) return;
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.frequency.value = kind === "correct" ? 660 : 260;
    oscillator.type = "sine";
    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.18);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.18);
  } catch {
    // เกมยังทำงานต่อได้แม้เบราว์เซอร์ไม่รองรับเสียง
  }
}

function updateSoundButton() {
  soundButton.textContent = `เสียง: ${state.soundOn ? "เปิด" : "ปิด"}`;
  soundButton.setAttribute("aria-pressed", String(state.soundOn));
}

function goHome() {
  stopBossTimer();
  state.screen = "home";
  state.level = null;
  renderHome();
}

function showInstallGuide() {
  const dialog = document.createElement("dialog");
  dialog.className = "install-guide-dialog";
  dialog.innerHTML = `
    <form method="dialog">
      <button type="submit" class="dialog-close" aria-label="ปิดคำแนะนำ">✕</button>
      <div class="install-header">
        <img src="images/ios-share-icon-dark.svg" alt="iOS Share Icon" class="install-icon">
        <h2>วิธีติดตั้งเกมใน iPhone/iPad</h2>
      </div>
      <ol class="install-steps">
        <li>
          <strong>แตะปุ่ม Share</strong>
          <p>ปุ่มมีไอคอน:</p>
          <img src="images/ios-share-icon-dark.svg" alt="iOS Share Icon" class="step-icon">
        </li>
        <li>
          <strong>เลื่อนขวา</strong>
          <p>เพื่อหา "Add to Home Screen"</p>
        </li>
        <li>
          <strong>แตะ "Add to Home Screen"</strong>
          <p>จะเห็น dialog ขึ้นมา</p>
        </li>
        <li>
          <strong>แตะ "Add"</strong>
          <p>เกมจะปรากฏที่หน้าจอ! 🎮</p>
        </li>
      </ol>
      <p class="install-tip">💡 หลังจากติดตั้ง เกมจะทำงานได้แม้ไม่มีอินเทอร์เน็ต</p>
      <button type="submit" class="primary-button">ตกลง</button>
    </form>
  `;
  document.body.appendChild(dialog);
  dialog.showModal();
}

function initInstallPrompt() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const installed = window.navigator.standalone === true;
  const hasSeenPrompt = localStorage.getItem("install-prompt-shown");

  if (isIOS && !installed && !hasSeenPrompt) {
    setTimeout(() => {
      showToast("💡 ติดตั้งเกมสบายๆ: แตะ Share → Add to Home Screen", 8000);
      localStorage.setItem("install-prompt-shown", "true");
    }, 1500);
  }
}

function lockLandscapeOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("landscape-primary").catch(() => {
      // Fallback: ไม่สามารถ lock ได้ (เช่นบน browser ธรรมชาติ) ให้ยอมรับ
    });
  }
}

function renderHome() {
  app.innerHTML = `
    <section class="screen hero">
      <div class="hero-copy">
        <span class="eyebrow">เกมวิทยาศาสตร์ ป.2</span>
        <h1>นักสังเกตตัวจิ๋ว:<br>ภารกิจจัดกลุ่มผักและผลไม้</h1>
        <p>สังเกตภาพจริง แล้วฝึกจำแนกด้วยเกณฑ์ <strong>จำนวน สี รูปร่าง และประเภท</strong> พร้อมบอกเหตุผลว่าทำไมจึงจัดไว้ในกลุ่มนั้น</p>
        <div class="hero-actions">
          <div class="sponsored-action">
            <button id="startButton" class="primary-button" type="button">เริ่มภารกิจ</button>
            <small>สนับสนุนโดย ${SPONSORS.mission.name} · แท็บนี้จะแสดงผู้สนับสนุน และเกมจะเปิดต่อในแท็บใหม่</small>
          </div>
          <button id="homeTeacherButton" class="secondary-button" type="button">ดูข้อมูลสำหรับครู</button>
          <button id="installGuideButton" class="secondary-button install-button" type="button"><img src="images/ios-share-icon-dark.svg" alt="" class="button-icon"> ติดตั้งเกมใน iPhone/iPad</button>
        </div>
      </div>
      <div class="hero-image-grid" aria-label="ตัวอย่างบัตรภาพในเกม">
        ${["banana", "tomato", "cucumber", "apple"].map((id) => renderImage(ITEM_MAP.get(id))).join("")}
      </div>
    </section>
  `;
  app.querySelector("#startButton").addEventListener("click", () => {
    openSponsoredGame("mission", "screen=levels");
  });
  app.querySelector("#homeTeacherButton").addEventListener("click", () => teacherDialog.showModal());
  app.querySelector("#installGuideButton").addEventListener("click", showInstallGuide);
  attachImageFallbacks(app);
  app.focus();
}

function renderLevelSelect() {
  stopBossTimer();
  state.screen = "levels";
  state.level = null;
  const cards = LEVELS.map((level) => {
    const unlocked = level.id <= state.progress.unlocked;
    const stars = state.progress.stars[level.id] || 0;
    const statusClass = stars ? "completed" : unlocked ? "unlocked" : "locked";
    return `
      <article class="level-card ${statusClass}">
        <span class="level-number">${level.id}</span>
        <span class="level-status">${stars ? "ผ่านแล้ว" : unlocked ? "พร้อมเล่น" : "ยังล็อก"}</span>
        <h3>${level.title}</h3>
        <p>${level.description}</p>
        ${stars ? renderStars(stars) : ""}
        <button class="${unlocked ? "primary-button" : "secondary-button"} level-play" type="button" data-level="${level.id}" ${unlocked ? "" : "disabled"}>
          ${unlocked ? (stars ? "เล่นอีกครั้ง" : "เริ่มด่าน") : "ผ่านด่านก่อนหน้าเพื่อปลดล็อก"}
        </button>
        ${unlocked ? `<small class="sponsor-note">สนับสนุนโดย ${SPONSORS.level.name} · แท็บนี้จะแสดงผู้สนับสนุน และด่านจะเปิดในแท็บใหม่</small>` : ""}
      </article>
    `;
  }).join("");

  const dots = LEVELS.map((_, i) => `<button class="carousel-dot${i === 0 ? " active" : ""}" data-index="${i}" type="button" aria-label="ด่าน ${i + 1}"></button>`).join("");

  app.innerHTML = `
    <section class="screen level-select-screen">
      <div class="section-heading">
        <span class="eyebrow">เลือกภารกิจ</span>
        <h1>เส้นทางนักสังเกต</h1>
        <p>ผ่านแต่ละด่านเพื่อปลดล็อกภารกิจถัดไป</p>
      </div>
      <div class="level-carousel-wrap">
        <button class="carousel-arrow" id="carouselPrev" type="button" aria-label="ด่านก่อนหน้า">&#8249;</button>
        <div class="level-carousel-track" id="levelCarousel">${cards}</div>
        <button class="carousel-arrow" id="carouselNext" type="button" aria-label="ด่านถัดไป">&#8250;</button>
      </div>
      <div class="carousel-dots" id="carouselDots">${dots}</div>
      <div class="game-toolbar">
        <div class="sponsored-action">
          <button id="leaderboardButton" class="primary-button" type="button">ดูอันดับ Boss Mission</button>
          <small>สนับสนุนโดย ${SPONSORS.leaderboard.name} · แท็บนี้จะแสดงผู้สนับสนุน และอันดับจะเปิดในแท็บใหม่</small>
        </div>
        <button id="resetProgressButton" class="danger-button" type="button">ล้างความก้าวหน้า</button>
        <button id="backHomeFromLevels" class="secondary-button" type="button">กลับหน้าแรก</button>
      </div>
    </section>
  `;

  app.querySelectorAll(".level-play").forEach((button) => {
    button.addEventListener("click", () => {
      openSponsoredGame("level", `level=${button.dataset.level}`);
    });
  });
  app.querySelector("#leaderboardButton").addEventListener("click", () => {
    openSponsoredGame("leaderboard", "screen=leaderboard");
  });
  app.querySelector("#resetProgressButton").addEventListener("click", resetProgress);
  app.querySelector("#backHomeFromLevels").addEventListener("click", goHome);

  initCarousel();
  app.focus();
}

function initCarousel() {
  const track = document.getElementById("levelCarousel");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  if (!track) return;

  function getStep() {
    const card = track.querySelector(".level-card");
    if (!card) return 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return card.offsetWidth + gap;
  }

  function scrollByCard(dir) {
    track.scrollBy({ left: dir * getStep(), behavior: "smooth" });
  }

  function updateState() {
    const step = getStep();
    const idx = step > 0 ? Math.round(track.scrollLeft / step) : 0;
    document.querySelectorAll(".carousel-dot").forEach((d, i) => d.classList.toggle("active", i === idx));
    if (prevBtn) prevBtn.disabled = track.scrollLeft <= 1;
    if (nextBtn) nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
  }

  // Arrow buttons
  if (prevBtn) prevBtn.addEventListener("click", () => scrollByCard(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => scrollByCard(1));

  // Dot navigation
  document.querySelectorAll(".carousel-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.dataset.index, 10);
      track.scrollTo({ left: idx * getStep(), behavior: "smooth" });
    });
  });

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  track.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) scrollByCard(diff > 0 ? 1 : -1);
  }, { passive: true });

  // Scroll → update dots & arrows
  track.addEventListener("scroll", updateState, { passive: true });

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (state.screen !== "levels") return;
    if (e.key === "ArrowLeft") scrollByCard(-1);
    if (e.key === "ArrowRight") scrollByCard(1);
  });

  updateState();
}

function showLeaderboardDialog() {
  const dialog = document.createElement("dialog");
  dialog.className = "leaderboard-dialog";
  dialog.innerHTML = `
    <section class="leaderboard-dialog-card">
      <button class="dialog-close" type="button">ปิด</button>
      <span class="eyebrow">การแข่งขันในเครื่องนี้</span>
      <h2>อันดับผู้พิชิต Boss Mission</h2>
      ${renderLeaderboard(20)}
    </section>
  `;
  document.body.appendChild(dialog);
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  dialog.showModal();
}

function resetProgress() {
  const confirmed = window.confirm("ต้องการล้างคะแนน ดาว และด่านที่ปลดล็อกทั้งหมดหรือไม่");
  if (!confirmed) return;
  state.progress = { unlocked: 1, stars: {}, bestScores: {}, soundOn: state.soundOn };
  saveProgress();
  renderLevelSelect();
  showToast("ล้างความก้าวหน้าแล้ว");
}

function startLevel(levelId) {
  const level = LEVELS.find((entry) => entry.id === levelId);
  if (!level || levelId > state.progress.unlocked) return;
  stopBossTimer();
  if (level.type === "boss") {
    showBossRegistration(level);
    return;
  }
  beginLevel(level);
}

function beginLevel(level, playerName = "") {
  state.screen = "game";
  state.level = level;
  state.roundIndex = 0;
  state.score = 0;
  state.attempts = 0;
  state.correctPlacements = 0;
  state.placedIds = new Set();
  state.observedIds = new Set();
  state.roundScores = [];
  state.playerName = playerName;
  state.bossElapsedSeconds = 0;
  state.bossStartedAt = level.type === "boss" ? Date.now() : null;
  if (level.type === "boss") startBossTimer();
  renderCurrentLevel();
}

function showBossRegistration(level) {
  const dialog = document.createElement("dialog");
  dialog.className = "boss-registration-dialog";
  dialog.innerHTML = `
    <form class="boss-registration-card">
      <span class="eyebrow">ด่าน ${level.id}: Boss Mission</span>
      <h2>พร้อมรับภารกิจหรือยัง?</h2>
      <p>กรอกชื่อผู้เล่นหรือชื่อทีม ระบบจะเริ่มจับเวลาเมื่อกดเริ่มภารกิจ</p>
      <label for="bossPlayerName">ชื่อผู้เล่น / ชื่อทีม</label>
      <input id="bossPlayerName" name="playerName" type="text" maxlength="30" autocomplete="off" required placeholder="ตัวอย่าง: ทีมใบไม้สีเขียว">
      <div class="boss-registration-actions">
        <button class="primary-button" type="submit">เริ่มจับเวลาและเล่น</button>
        <button class="secondary-button boss-cancel" type="button">ยกเลิก</button>
      </div>
    </form>
  `;
  document.body.appendChild(dialog);
  dialog.querySelector(".boss-cancel").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  dialog.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = dialog.querySelector("#bossPlayerName").value.trim();
    if (!name) return;
    dialog.close();
    beginLevel(level, name);
  });
  dialog.showModal();
}

function startBossTimer() {
  stopBossTimer();
  state.timerId = window.setInterval(() => {
    if (!state.bossStartedAt) return;
    state.bossElapsedSeconds = Math.floor((Date.now() - state.bossStartedAt) / 1000);
    const timer = document.querySelector("#bossTimer");
    if (timer) timer.textContent = formatTime(state.bossElapsedSeconds);
  }, 1000);
}

function stopBossTimer() {
  if (state.timerId) window.clearInterval(state.timerId);
  state.timerId = null;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function renderCurrentLevel() {
  if (state.level.type === "observe") {
    renderObservationLevel();
  } else {
    renderClassificationLevel();
  }
}

function renderGameHeader(instruction, total, completed) {
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const round = getCurrentRound();
  const roundLabel = state.level.rounds
    ? `รอบ ${state.roundIndex + 1}/${state.level.rounds.length}: ${CRITERION_LABELS[round.criterion]}`
    : `เกณฑ์: ${state.level.criterion === "การสังเกต" ? "การสังเกต" : CRITERION_LABELS[state.level.criterion]}`;
  return `
    <header class="game-header">
      <div class="game-header-identity">
        <span class="criterion-badge">${roundLabel}</span>
        <h1><span>ด่าน ${state.level.id}</span> ${state.level.title}</h1>
      </div>
      <div class="score-box" aria-label="คะแนนและความคืบหน้า">
        ${state.level.type === "boss" ? `<span class="score-chip player-chip">${escapeHtml(state.playerName)}</span><span class="score-chip timer-chip">เวลา <strong id="bossTimer">${formatTime(state.bossElapsedSeconds)}</strong></span>` : ""}
        <span class="score-chip">คะแนน <strong id="scoreValue">${state.score}</strong></span>
        <span class="score-chip">ลอง <strong id="attemptValue">${state.attempts}</strong></span>
        <span class="score-chip progress-chip"><strong id="progressText">${completed}/${total}</strong> สำเร็จ</span>
      </div>
      <div class="progress"><div id="progressBar" class="progress-bar" style="width:${percent}%"></div></div>
      ${state.level.rounds ? renderRoundMap() : ""}
    </header>
  `;
}

function renderRoundMap() {
  return `
    <div class="round-map">
      ${state.level.rounds.map((round, index) => `
        <span class="round-dot ${index <= state.roundIndex ? "active" : ""}">
          ${index + 1}. ${CRITERION_LABELS[round.criterion]}
        </span>
      `).join("")}
    </div>
  `;
}

function renderObservationLevel() {
  const items = state.level.itemIds.map((id) => ITEM_MAP.get(id));
  app.innerHTML = `
    <section class="screen">
      ${renderGameHeader("แตะบัตรภาพทุกใบ แล้วอ่านสิ่งที่สังเกตได้", state.level.required, state.observedIds.size)}
      <div class="instruction-banner"><strong>กิจกรรม:</strong> แตะบัตรภาพทุกใบ เพื่อสังเกตจำนวน สี รูปร่าง และประเภท</div>
      <section class="observation-area">
        <h2>แตะบัตรเพื่อสำรวจ</h2>
        <div class="observation-grid">
          ${items.map((item) => renderObservationCard(item)).join("")}
        </div>
      </section>
      <div class="game-toolbar">
        <button id="observeHintButton" class="secondary-button" type="button">ดูคำใบ้</button>
        <button id="resetLevelButton" class="danger-button" type="button">เริ่มด่านใหม่</button>
        <button id="levelSelectButton" class="secondary-button" type="button">กลับหน้าเลือกด่าน</button>
      </div>
    </section>
  `;

  app.querySelectorAll(".observation-card").forEach((card) => {
    card.addEventListener("click", () => openObservationDialog(card.dataset.itemId));
  });
  app.querySelector("#observeHintButton").addEventListener("click", () => showToast("ลองมองหา 4 อย่าง: จำนวน สี รูปร่าง และประเภท", "hint"));
  attachCommonGameButtons();
  attachImageFallbacks(app);
  app.focus();
}

function renderObservationCard(item) {
  const revealed = state.observedIds.has(item.id);
  return `
    <button class="item-card observation-card ${revealed ? "revealed" : ""}" type="button" data-item-id="${item.id}">
      ${renderImage(item)}
      <span class="item-card-name">${item.name}</span>
      <span class="observation-card-status">${revealed ? "สังเกตแล้ว" : "แตะเพื่อสังเกต"}</span>
    </button>
  `;
}

function openObservationDialog(itemId) {
  const item = ITEM_MAP.get(itemId);
  const alreadyObserved = state.observedIds.has(itemId);
  const dialog = document.createElement("dialog");
  dialog.className = "observation-dialog";
  dialog.innerHTML = `
    <article class="observation-dialog-content">
      <button class="observation-dialog-close" type="button" aria-label="ปิดหน้าต่าง">ปิด</button>
      <div class="observation-dialog-image">
        ${renderImage(item)}
      </div>
      <div class="observation-dialog-details">
        <span class="eyebrow">สิ่งที่สังเกตได้จากภาพ</span>
        <h2>${item.name}</h2>
        <p class="observation-dialog-summary">${item.observationText}</p>
        <dl class="observation-facts">
          <div><dt>จำนวน</dt><dd>${item.count} ${item.countUnit}</dd></div>
          <div><dt>สี</dt><dd>${item.color}</dd></div>
          <div><dt>รูปร่าง</dt><dd>${item.shape}</dd></div>
          <div><dt>ประเภท</dt><dd>${item.category}</dd></div>
        </dl>
        <button class="primary-button observation-confirm" type="button">
          ${alreadyObserved ? "ปิดหน้าต่าง" : "สังเกตแล้ว"}
        </button>
      </div>
    </article>
  `;
  document.body.appendChild(dialog);
  attachImageFallbacks(dialog);

  const closeDialog = () => dialog.close();
  dialog.querySelector(".observation-dialog-close").addEventListener("click", closeDialog);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  dialog.querySelector(".observation-confirm").addEventListener("click", () => {
    if (!alreadyObserved) markObservationComplete(itemId);
    closeDialog();
  });
  dialog.showModal();
}

function markObservationComplete(itemId) {
  state.observedIds.add(itemId);
  state.score += 10;
  playTone("correct");
  const card = app.querySelector(`[data-item-id="${itemId}"]`);
  card.classList.add("revealed", "correct");
  card.querySelector(".observation-card-status").textContent = "สังเกตแล้ว";
  updateHud(state.level.required, state.observedIds.size);
  showToast("สังเกตได้ละเอียดมาก", "success");
  if (state.observedIds.size === state.level.required) {
    window.setTimeout(() => showReasonQuestion(), 650);
  }
}

function renderClassificationLevel() {
  const round = getCurrentRound();
  const criterion = round.criterion;
  const groups = round.groups;
  const items = state.level.itemIds.map((id) => ITEM_MAP.get(id));
  const instruction = `ลากบัตรไปวางตามเกณฑ์ “${CRITERION_LABELS[criterion]}”`;

  app.innerHTML = `
    <section class="screen">
      ${renderGameHeader(instruction, items.length, state.placedIds.size)}
      <div class="instruction-banner"><strong>กิจกรรม:</strong> ลากบัตรไปวางในกลุ่ม โดยใช้ “${CRITERION_LABELS[criterion]}” เป็นเกณฑ์</div>
      <div class="game-layout">
        <section class="card-bank">
          <h2>บัตรที่รอจัดกลุ่ม</h2>
          <div id="cardBank" class="cards-grid">
            ${items.filter((item) => !state.placedIds.has(item.id)).map((item) => renderDraggableCard(item)).join("")}
          </div>
        </section>
        <section class="drop-area">
          <h2>พื้นที่จัดกลุ่ม</h2>
          <div class="zones-grid" data-group-count="${groups.length}">
            ${groups.map((group) => renderDropZone(group, criterion, items)).join("")}
          </div>
        </section>
      </div>
      <div class="game-toolbar">
        <button id="hintButton" class="secondary-button" type="button">ดูคำใบ้</button>
        <button id="resetLevelButton" class="danger-button" type="button">เริ่มด่านใหม่</button>
        <button id="levelSelectButton" class="secondary-button" type="button">กลับหน้าเลือกด่าน</button>
      </div>
    </section>
  `;

  setupDragAndDrop();
  app.querySelector("#hintButton").addEventListener("click", () => showToast(round.hint || state.level.hint, "hint"));
  attachCommonGameButtons();
  attachImageFallbacks(app);
  app.focus();
}

function getCurrentRound() {
  if (state.level.rounds) return state.level.rounds[state.roundIndex];
  return state.level;
}

function renderDraggableCard(item) {
  return `
    <article class="item-card" tabindex="0" role="button" aria-label="ลากบัตร ${item.name} ไปยังกลุ่ม" data-item-id="${item.id}">
      ${renderImage(item)}
      <span class="item-card-name">${item.name}</span>
    </article>
  `;
}

function renderDropZone(group, criterion, items) {
  const key = String(group);
  const colors = ZONE_COLORS[key] || ["#f5f9fc", "#8bb6cc"];
  const label = criterion === "count" ? `จำนวน ${group}` : key;
  const capacity = items.filter((item) => String(item[criterion]) === key).length;
  return `
    <section class="drop-zone" data-group="${key}" data-capacity="${capacity}" style="--zone-color:${colors[0]};--zone-border:${colors[1]}">
      <h3>${label}</h3>
      <div class="zone-items"></div>
    </section>
  `;
}

function setupDragAndDrop() {
  app.querySelectorAll(".item-card[data-item-id]").forEach((card) => {
    card.addEventListener("pointerdown", beginPointerDrag);
    card.addEventListener("keydown", handleCardKeyboard);
  });
}

function handleCardKeyboard(event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  const card = event.currentTarget;
  const groups = [...app.querySelectorAll(".drop-zone")].map((zone) => zone.dataset.group);
  const choice = window.prompt(`เลือกกลุ่มสำหรับ ${ITEM_MAP.get(card.dataset.itemId).name}: ${groups.join(", ")}`);
  if (choice !== null) handleDrop(card.dataset.itemId, String(choice).trim(), card);
}

function beginPointerDrag(event) {
  if (event.button !== undefined && event.button !== 0) return;
  const card = event.currentTarget;
  const origin = card.parentElement;
  const placeholder = document.createElement("div");
  const rect = card.getBoundingClientRect();
  placeholder.style.width = `${rect.width}px`;
  placeholder.style.height = `${rect.height}px`;
  placeholder.dataset.placeholder = "true";
  origin.insertBefore(placeholder, card);

  card.classList.add("dragging");
  card.style.position = "fixed";
  card.style.left = `${rect.left}px`;
  card.style.top = `${rect.top}px`;
  card.style.height = `${rect.height}px`;
  document.body.appendChild(card);
  card.setPointerCapture?.(event.pointerId);

  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;
  let currentZone = null;

  const move = (moveEvent) => {
    card.style.left = `${moveEvent.clientX - offsetX}px`;
    card.style.top = `${moveEvent.clientY - offsetY}px`;
    card.style.pointerEvents = "none";
    const elementBelow = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
    card.style.pointerEvents = "";
    const nextZone = elementBelow?.closest(".drop-zone") || null;
    if (nextZone !== currentZone) {
      currentZone?.classList.remove("drag-over");
      nextZone?.classList.add("drag-over");
      currentZone = nextZone;
    }
  };

  const end = (endEvent) => {
    card.removeEventListener("pointermove", move);
    card.removeEventListener("pointerup", end);
    card.removeEventListener("pointercancel", cancel);
    currentZone?.classList.remove("drag-over");

    card.classList.remove("dragging");
    card.removeAttribute("style");
    placeholder.replaceWith(card);

    if (currentZone) {
      handleDrop(card.dataset.itemId, currentZone.dataset.group, card);
    }
    card.releasePointerCapture?.(endEvent.pointerId);
  };

  const cancel = (cancelEvent) => {
    currentZone = null;
    end(cancelEvent);
  };

  card.addEventListener("pointermove", move);
  card.addEventListener("pointerup", end);
  card.addEventListener("pointercancel", cancel);
}

function handleDrop(itemId, selectedGroup, card) {
  const item = ITEM_MAP.get(itemId);
  const round = getCurrentRound();
  const expected = String(item[round.criterion]);
  state.attempts += 1;

  if (selectedGroup === expected) {
    state.score += 10;
    state.correctPlacements += 1;
    state.placedIds.add(itemId);
    card.classList.add("correct");
    const zone = app.querySelector(`.drop-zone[data-group="${CSS.escape(selectedGroup)}"] .zone-items`);
    zone.appendChild(card);
    card.removeEventListener("pointerdown", beginPointerDrag);
    card.removeAttribute("tabindex");
    card.setAttribute("aria-label", `${item.name} อยู่ในกลุ่ม ${selectedGroup}`);
    playTone("correct");
    showToast("ถูกต้อง เก่งมาก", "success");
    updateHud(state.level.itemIds.length, state.placedIds.size);

    if (state.placedIds.size === state.level.itemIds.length) {
      window.setTimeout(() => finishRound(), 700);
    }
  } else {
    card.classList.add("wrong");
    playTone("wrong");
    showToast(round.hint || state.level.hint, "hint");
    window.setTimeout(() => card.classList.remove("wrong"), 400);
    updateHud(state.level.itemIds.length, state.placedIds.size);
  }
}

function updateHud(total, completed) {
  const scoreValue = app.querySelector("#scoreValue");
  const attemptValue = app.querySelector("#attemptValue");
  const progressBar = app.querySelector("#progressBar");
  const progressText = app.querySelector("#progressText");
  if (scoreValue) scoreValue.textContent = state.score;
  if (attemptValue) attemptValue.textContent = state.attempts;
  if (progressBar) progressBar.style.width = `${Math.round((completed / total) * 100)}%`;
  if (progressText) progressText.textContent = `${completed}/${total}`;
}

function finishRound() {
  const roundScore = {
    score: state.score - state.roundScores.reduce((sum, result) => sum + result.score, 0),
    attempts: state.attempts - state.roundScores.reduce((sum, result) => sum + result.attempts, 0)
  };
  state.roundScores.push(roundScore);

  if (state.level.rounds && state.roundIndex < state.level.rounds.length - 1) {
    state.roundIndex += 1;
    state.placedIds = new Set();
    showToast(`ผ่านรอบ ${state.roundIndex} แล้ว ต่อไปใช้เกณฑ์ ${CRITERION_LABELS[getCurrentRound().criterion]}`, "success");
    window.setTimeout(renderClassificationLevel, 450);
    return;
  }

  showReasonQuestion();
}

function showReasonQuestion() {
  const sample = selectReasonSample();
  const criterion = state.level.type === "observe"
    ? "observation"
    : getCurrentRound().criterion;
  const correctReason = buildReason(sample, criterion);
  const wrongReasons = buildWrongReasons(sample, criterion);
  const options = shuffle([correctReason, ...wrongReasons]).slice(0, 3);

  const dialog = document.createElement("dialog");
  dialog.className = "reason-dialog";
  dialog.innerHTML = `
    <section class="reason-panel">
      <span class="eyebrow">ก่อนจบด่าน</span>
      <h2>คำถามนักคิด</h2>
      <p>${criterion === "observation"
        ? `ข้อใดเป็นสิ่งที่เราสังเกตได้จากภาพ ${sample.name}`
        : `ทำไม ${sample.name} จึงอยู่ใน${getGroupLabel(sample, criterion)}`}</p>
      <div class="reason-options">
        ${options.map((option) => `<button class="reason-option" type="button" data-correct="${option === correctReason}">${option}</button>`).join("")}
      </div>
    </section>
  `;
  document.body.appendChild(dialog);
  dialog.addEventListener("cancel", (event) => event.preventDefault());
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  dialog.querySelectorAll(".reason-option").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.correct === "true") {
        state.score += 10;
        playTone("correct");
        dialog.close();
        completeLevel(correctReason);
      } else {
        state.attempts += 1;
        playTone("wrong");
        showToast("ลองมองหาเหตุผลที่ตรงกับเกณฑ์ของรอบนี้อีกครั้งนะ", "hint");
        button.disabled = true;
      }
    });
  });
  dialog.showModal();
}

function selectReasonSample() {
  const availableItems = state.level.itemIds
    .map((id) => ITEM_MAP.get(id))
    .filter((item) => item.id !== state.lastReasonItemId);
  const preferredCategory = state.lastReasonCategory === "ผัก" ? "ผลไม้" : "ผัก";
  const preferredItems = availableItems.filter((item) => item.category === preferredCategory);
  const pool = preferredItems.length ? preferredItems : availableItems;
  const sample = pool[Math.floor(Math.random() * pool.length)] || ITEM_MAP.get(state.level.itemIds[0]);

  state.lastReasonItemId = sample.id;
  state.lastReasonCategory = sample.category;
  return sample;
}

function getGroupLabel(item, criterion) {
  if (criterion === "count") return `กลุ่มจำนวน ${item.count}`;
  if (criterion === "color") return `กลุ่มสี${item.color}`;
  if (criterion === "shape") return `กลุ่มรูปร่าง${item.shape}`;
  return `กลุ่ม${item.category}`;
}

function buildReason(item, criterion) {
  if (criterion === "observation") return item.observationText;
  if (criterion === "count") return `${item.name} อยู่ในกลุ่มจำนวน ${item.count} เพราะในภาพมี ${item.name} ${item.count} ${item.countUnit}`;
  if (criterion === "color") return `${item.name} อยู่ในกลุ่มสี${item.color} เพราะ ${item.name} มีสี${item.color}`;
  if (criterion === "shape") return `${item.name} อยู่ในกลุ่มรูปร่าง${item.shape} เพราะ ${item.name} มีรูปร่าง${item.shape}`;
  return `${item.name} อยู่ในกลุ่ม${item.category} เพราะ ${item.name} เป็น${item.category}`;
}

function buildWrongReasons(item, criterion) {
  if (criterion === "observation") {
    return [
      `${item.name} มีกลิ่นหอมและมีราคาถูก`,
      `${item.name} มีน้ำหนักมากและมีรสหวาน`
    ];
  }
  const alternatives = {
    count: [`${item.name} อยู่ในกลุ่มสี${item.color} เพราะมีสี${item.color}`, `${item.name} อยู่ในกลุ่ม${item.category} เพราะเป็น${item.category}`],
    color: [`${item.name} อยู่ในกลุ่มจำนวน ${item.count} เพราะมี ${item.count} ${item.countUnit}`, `${item.name} อยู่ในกลุ่มรูปร่าง${item.shape} เพราะมีรูปร่าง${item.shape}`],
    shape: [`${item.name} อยู่ในกลุ่มสี${item.color} เพราะมีสี${item.color}`, `${item.name} อยู่ในกลุ่ม${item.category} เพราะเป็น${item.category}`],
    category: [`${item.name} อยู่ในกลุ่มจำนวน ${item.count} เพราะมี ${item.count} ${item.countUnit}`, `${item.name} อยู่ในกลุ่มสี${item.color} เพราะมีสี${item.color}`]
  };
  return alternatives[criterion];
}

function completeLevel(reasonExample) {
  const stars = calculateStars();
  const levelId = state.level.id;
  if (state.level.type === "boss") {
    state.bossElapsedSeconds = Math.floor((Date.now() - state.bossStartedAt) / 1000);
    stopBossTimer();
    addBossLeaderboardEntry(stars);
  }
  state.progress.stars[levelId] = Math.max(state.progress.stars[levelId] || 0, stars);
  state.progress.bestScores[levelId] = Math.max(state.progress.bestScores[levelId] || 0, state.score);
  state.progress.unlocked = Math.max(state.progress.unlocked, Math.min(LEVELS.length, levelId + 1));
  saveProgress();
  renderLevelSummary(stars, reasonExample);
}

function addBossLeaderboardEntry(stars) {
  const entries = loadLeaderboard();
  entries.push({
    name: state.playerName,
    stars,
    score: state.score,
    seconds: state.bossElapsedSeconds,
    playedAt: new Date().toISOString()
  });
  entries.sort((a, b) => b.stars - a.stars || b.score - a.score || a.seconds - b.seconds);
  saveLeaderboard(entries.slice(0, 20));
}

function renderLeaderboard(limit = 10) {
  const entries = loadLeaderboard().slice(0, limit);
  if (!entries.length) return `<p class="leaderboard-empty">ยังไม่มีผู้พิชิต Boss Mission</p>`;
  return `
    <div class="leaderboard-table-wrap">
      <table class="leaderboard-table">
        <thead><tr><th>อันดับ</th><th>ผู้เล่น/ทีม</th><th>ดาว</th><th>คะแนน</th><th>เวลา</th></tr></thead>
        <tbody>
          ${entries.map((entry, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${escapeHtml(entry.name)}</td>
              <td>${entry.stars}</td>
              <td>${entry.score}</td>
              <td>${formatTime(entry.seconds)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function calculateStars() {
  const correctTotal = state.level.type === "observe"
    ? state.level.required + 1
    : state.correctPlacements + 1;
  const errorCount = Math.max(0, state.attempts - state.correctPlacements);
  const errorRate = errorCount / Math.max(1, correctTotal);
  if (errorRate <= 0.1) return 3;
  if (errorRate <= 0.3) return 2;
  return 1;
}

function renderLevelSummary(stars, reasonExample) {
  const isFinal = state.level.id === LEVELS.length;
  const criterionText = state.level.type === "observe"
    ? "การสังเกต"
    : state.level.rounds
      ? state.level.rounds.map((round) => CRITERION_LABELS[round.criterion]).join(", ")
      : CRITERION_LABELS[state.level.criterion];
  app.innerHTML = `
    <section class="screen summary-wrap">
      <article class="summary-card">
        <span class="eyebrow">ผ่านด่าน ${state.level.id} แล้ว</span>
        <h1>${stars === 3 ? "ยอดเยี่ยมมาก นักสังเกตตัวจิ๋ว!" : stars === 2 ? "เก่งมาก หนูใช้เกณฑ์ได้ถูกต้อง" : "สำเร็จแล้ว ฝึกอีกนิดจะคล่องขึ้น"}</h1>
        ${renderStars(stars)}
        <p class="big-score">คะแนน ${state.score}</p>
        ${state.level.type === "boss" ? `
          <p class="boss-result-line"><strong>${escapeHtml(state.playerName)}</strong> ใช้เวลา ${formatTime(state.bossElapsedSeconds)}</p>
          <section class="leaderboard-panel">
            <h2>อันดับผู้พิชิต Boss Mission</h2>
            ${renderLeaderboard()}
          </section>
        ` : ""}
        <div class="learning-summary">
          <strong>ด่านนี้ใช้เกณฑ์อะไร?</strong><br>
          ${criterionText}<br><br>
          <strong>สิ่งที่เรียนรู้</strong><br>
          ${state.level.summary}
        </div>
        <p class="reason-example"><strong>ตัวอย่างการอธิบายเหตุผล:</strong><br>${reasonExample}</p>
        <div class="action-row">
          ${isFinal
            ? `<button id="finalReviewButton" class="primary-button" type="button">ดูสรุปใหญ่ท้ายเกม</button>`
            : `<button id="nextLevelButton" class="primary-button" type="button">ไปด่านถัดไป</button>`}
          <button id="replayButton" class="secondary-button" type="button">เล่นด่านนี้อีกครั้ง</button>
          <button id="summaryLevelsButton" class="secondary-button" type="button">หน้าเลือกด่าน</button>
        </div>
      </article>
    </section>
  `;
  if (isFinal) {
    app.querySelector("#finalReviewButton").addEventListener("click", renderFinalReview);
  } else {
    app.querySelector("#nextLevelButton").addEventListener("click", () => startLevel(state.level.id + 1));
  }
  app.querySelector("#replayButton").addEventListener("click", () => startLevel(state.level.id));
  app.querySelector("#summaryLevelsButton").addEventListener("click", renderLevelSelect);
  app.focus();
}

function renderFinalReview() {
  const examples = ["banana", "carrot", "tomato", "watermelon"].map((id) => ITEM_MAP.get(id));
  const totalStars = Object.values(state.progress.stars).reduce((sum, stars) => sum + stars, 0);
  app.innerHTML = `
    <section class="screen summary-wrap">
      <article class="summary-card">
        <span class="eyebrow">ภารกิจครบทั้ง 5 ด่าน</span>
        <h1>วันนี้หนูเรียนรู้อะไรบ้าง?</h1>
        <p class="big-score">สะสมดาวทั้งหมด ${totalStars} จาก 15 ดวง</p>
        <ul class="review-list">
          <li>การจำแนกประเภทต้องเริ่มจากการสังเกต</li>
          <li>เกณฑ์คือสิ่งที่ใช้ในการแบ่งกลุ่ม</li>
          <li>เราสามารถใช้จำนวน สี รูปร่าง หรือประเภทเป็นเกณฑ์ได้</li>
          <li>เมื่อใช้เกณฑ์ต่างกัน ผลการจัดกลุ่มอาจต่างกัน</li>
          <li>เราควรอธิบายเหตุผลของการจัดกลุ่มได้</li>
        </ul>
        <div class="learning-summary">
          <strong>ตัวอย่างภาพชุดเดียวกัน มองได้หลายลักษณะ</strong>
          <table class="comparison-table">
            <thead><tr><th>ภาพ</th><th>จำนวน</th><th>สี</th><th>รูปร่าง</th><th>ประเภท</th></tr></thead>
            <tbody>
              ${examples.map((item) => `<tr><td>${item.name}</td><td>${item.count}</td><td>${item.color}</td><td>${item.shape}</td><td>${item.category}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>
        <p class="reason-example">สิ่งเดียวกันสามารถอยู่คนละกลุ่มได้เมื่อเราเปลี่ยนเกณฑ์ การจำแนกจึงต้องเริ่มจากการสังเกต และบอกให้ชัดว่าใช้เกณฑ์อะไร</p>
        <div class="action-row">
          <button id="reviewLevelsButton" class="primary-button" type="button">กลับหน้าเลือกด่าน</button>
          <button id="reviewHomeButton" class="secondary-button" type="button">กลับหน้าแรก</button>
        </div>
      </article>
    </section>
  `;
  app.querySelector("#reviewLevelsButton").addEventListener("click", renderLevelSelect);
  app.querySelector("#reviewHomeButton").addEventListener("click", goHome);
  app.focus();
}

function renderStars(count) {
  return `<div class="star-row" aria-label="ได้รับ ${count} ดาว">${[1, 2, 3].map((index) => `<span class="star ${index <= count ? "earned" : ""}" aria-hidden="true"></span>`).join("")}</div>`;
}

function attachCommonGameButtons() {
  app.querySelector("#resetLevelButton").addEventListener("click", () => startLevel(state.level.id));
  app.querySelector("#levelSelectButton").addEventListener("click", renderLevelSelect);
}

function shuffle(values) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function handleLaunchRoute() {
  const route = window.location.hash.slice(1);
  if (!route) {
    renderHome();
    return;
  }

  const params = new URLSearchParams(route);
  const levelId = Number(params.get("level"));
  const screen = params.get("screen");
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);

  if (levelId && LEVELS.some((level) => level.id === levelId)) {
    startLevel(levelId);
    return;
  }

  if (screen === "leaderboard") {
    renderLevelSelect();
    showLeaderboardDialog();
    return;
  }

  if (screen === "levels") {
    renderLevelSelect();
    return;
  }

  renderHome();
}

homeButton.addEventListener("click", goHome);
soundButton.addEventListener("click", () => {
  state.soundOn = !state.soundOn;
  state.progress.soundOn = state.soundOn;
  saveProgress();
  updateSoundButton();
  if (state.soundOn) playTone("correct");
});
teacherButton.addEventListener("click", () => teacherDialog.showModal());

updateSoundButton();
lockLandscapeOrientation();
initInstallPrompt();
handleLaunchRoute();
