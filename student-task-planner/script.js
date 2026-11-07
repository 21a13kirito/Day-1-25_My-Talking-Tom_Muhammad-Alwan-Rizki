// Data tugas disimpan di array, lalu disalin ke localStorage agar tidak hilang saat refresh.
const STORAGE_KEY = "student-task-planner";

function dateFromToday(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved;
  } catch (e) { /* abaikan, pakai data contoh */ }
  return [
    { id: 1, title: "Laporan praktikum Sistem Operasi", due: dateFromToday(2), done: false },
    { id: 2, title: "Tugas Matematika Diskrit", due: dateFromToday(-1), done: false },
    { id: 3, title: "Kuis Algoritma dan Pemrograman", due: dateFromToday(5), done: true },
  ];
}

let tasks = loadTasks();
let currentFilter = "all";

const listEl = document.getElementById("task-list");
const emptyEl = document.getElementById("empty");
const summaryEl = document.getElementById("summary");
const formEl = document.getElementById("task-form");

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch (e) {}
}

function daysLeft(due) {
  const today = new Date(dateFromToday(0));
  return Math.round((new Date(due) - today) / 86400000);
}

function describe(task) {
  if (task.done) return { cls: "completed", text: "Selesai" };
  const n = daysLeft(task.due);
  if (n < 0) return { cls: "late", text: `Terlambat ${-n} hari` };
  if (n === 0) return { cls: "soon", text: "Deadline hari ini" };
  if (n <= 2) return { cls: "soon", text: `${n} hari lagi` };
  return { cls: "", text: `${n} hari lagi` };
}

function formatDate(due) {
  return new Date(due).toLocaleDateString("id-ID", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
}

function render() {
  const visible = tasks
    .filter(t => currentFilter === "all" || (currentFilter === "completed") === t.done)
    .sort((a, b) => a.done - b.done || a.due.localeCompare(b.due));

  listEl.innerHTML = "";
  visible.forEach(task => {
    const state = describe(task);
    const li = document.createElement("li");
    li.className = `task ${state.cls}`;

    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = task.done;
    box.setAttribute("aria-label", `Tandai selesai: ${task.title}`);
    box.addEventListener("change", () => { task.done = box.checked; save(); render(); });

    const info = document.createElement("div");
    info.className = "info";
    const name = document.createElement("span");
    name.className = "name";
    name.textContent = task.title; // textContent mencegah HTML injection
    const meta = document.createElement("span");
    meta.className = "meta";
    meta.textContent = `${formatDate(task.due)} · ${state.text}`;
    info.append(name, meta);

    const del = document.createElement("button");
    del.className = "delete";
    del.textContent = "Hapus";
    del.setAttribute("aria-label", `Hapus tugas: ${task.title}`);
    del.addEventListener("click", () => { tasks = tasks.filter(t => t.id !== task.id); save(); render(); });

    li.append(box, info, del);
    listEl.appendChild(li);
  });

  emptyEl.hidden = visible.length > 0;
  const pending = tasks.filter(t => !t.done).length;
  summaryEl.textContent = `${pending} tugas belum selesai dari ${tasks.length} tugas`;
}

formEl.addEventListener("submit", event => {
  event.preventDefault();
  const title = document.getElementById("title").value.trim();
  const due = document.getElementById("due").value;
  if (!title || !due) return;
  tasks.push({ id: Date.now(), title, due, done: false });
  save();
  formEl.reset();
  render();
});

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === btn));
    render();
  });
});

render();
