import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const failures = [];
const notes = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function unique(items, label) {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item)) failures.push(`${label} duplikat: ${item}`);
    seen.add(item);
  }
}

const storySource = fs.readFileSync(path.join(dist, "story.js"), "utf8");
const appSource = fs.readFileSync(path.join(dist, "app.js"), "utf8");
const cssSource = fs.readFileSync(path.join(dist, "styles.css"), "utf8");
const htmlSource = fs.readFileSync(path.join(dist, "index.html"), "utf8");

new vm.Script(storySource, { filename: "story.js" });
new vm.Script(appSource, { filename: "app.js" });
const sandbox = { window: {} };
vm.runInNewContext(storySource, sandbox, { filename: "story.js" });
const config = sandbox.window.STORY_CONFIG;
assert(config && typeof config === "object", "STORY_CONFIG tidak terbentuk");
assert((storySource.match(/😭/g) || []).length <= 1, "Emoji menangis masih terlalu sering dipakai");

const threads = config.threads || [];
const rawThreadIds = threads.map((thread) => thread.id);
const threadIds = new Set(rawThreadIds);
unique(rawThreadIds, "ID thread");
unique((config.apps || []).map((app) => app.id), "ID aplikasi");
unique((config.dockApps || []).map((app) => app.id), "ID aplikasi dock");
unique((config.photos || []).map((photo) => photo.id), "ID foto");
unique((config.storyChatMedia || []).map((media) => media.id), "ID media chat cerita");
unique((config.photoAlbums || []).map((album) => album.id), "ID album");
unique((config.notes || []).map((note) => note.title), "Judul Notes");
unique((config.gmail?.emails || []).map((email) => email.id), "ID email");

const validStepTypes = new Set(["mc", "them", "missed_call"]);
const triggerIds = [];
for (const [scriptId, script] of Object.entries(config.chatScripts || {})) {
  const target = script.threadId || scriptId;
  assert(threadIds.has(target), `Chat script ${scriptId} mengarah ke thread yang tidak ada: ${target}`);
  assert(Array.isArray(script.steps) && script.steps.length > 0, `Chat script ${scriptId} tidak memiliki langkah`);
  for (const [index, step] of (script.steps || []).entries()) {
    assert(validStepTypes.has(step.type), `Tipe langkah ${scriptId}[${index}] tidak valid: ${step.type}`);
    if (step.type !== "missed_call") assert(typeof step.text === "string" && step.text.length > 0, `Teks ${scriptId}[${index}] kosong`);
    assert(Number.isFinite(step.waitBefore) && step.waitBefore >= 0, `waitBefore ${scriptId}[${index}] tidak valid`);
  }
  const completion = script.onComplete;
  if (completion?.id) triggerIds.push(completion.id);
  if (completion?.threadId) assert(threadIds.has(completion.threadId), `Trigger ${completion.id} memakai thread yang tidak ada`);
  if (completion?.activateChatScript) assert(Boolean(config.chatScripts[completion.activateChatScript]), `Trigger ${completion.id} mengaktifkan script yang tidak ada`);
  for (const event of completion?.calendarEvents || []) {
    assert(/^2026-\d{2}-\d{2}$/.test(event.date), `Tanggal event ${event.id} tidak valid`);
    if (event.trigger) {
      triggerIds.push(event.trigger.id);
      assert(/^2026-\d{2}-\d{2}$/.test(event.trigger.storyDate), `Tanggal cerita trigger kalender ${event.trigger.id} tidak valid`);
      assert(threadIds.has(event.trigger.threadId), `Trigger kalender ${event.trigger.id} memakai thread yang tidak ada`);
      assert(Boolean(config.chatScripts[event.trigger.activateChatScript]), `Trigger kalender ${event.trigger.id} mengaktifkan script yang tidak ada`);
    }
  }
}
unique(triggerIds, "ID trigger cerita");
const gatedXPosts = (config.xApp?.posts || []).filter((post) => post.availableAfter);
assert(gatedXPosts.length >= 4, "Tweet baru setelah coffee belum lengkap");
for (const post of gatedXPosts) {
  assert(Boolean(config.chatScripts?.[post.availableAfter]), `Tweet X memakai fase yang tidak ada: ${post.availableAfter}`);
}
assert(/function storyCheckpointReached\(checkpoint\)/.test(appSource), "Progress cerita belum memiliki pemeriksa checkpoint bersama");
assert(/message\.text === "Take your time"/.test(appSource), "Progress lama tidak dapat membuka tweet setelah coffee");
const gatedPhotos = (config.photos || []).filter((photo) => photo.availableAfter || photo.availableAfterDate);
assert(gatedPhotos.length === 2, "Jumlah foto baru setelah pertemuan tidak sesuai");
assert(gatedPhotos.some((photo) => photo.availableAfter === "dirga_after_dinner" && photo.src?.includes("dinner-17-first")), "Foto setelah dinner belum memiliki trigger");
assert(gatedPhotos.some((photo) => photo.availableAfter === "dirga_after_coffee" && photo.src?.includes("dinner-17-second")), "Foto setelah coffee belum memiliki trigger");
const removedGalleryAssets = ["1140747780608893244", "782852347766237811", "987343918331237220", "alex volkov", "Dion Windsor", "917467755359088838"];
assert(removedGalleryAssets.every((asset) => !(config.photos || []).some((photo) => photo.src?.includes(asset))), "Masih ada foto yang diminta dihapus dalam galeri");
assert((config.storyChatMedia || []).some((media) => media.imageSrc?.includes("917467755359088838") && media.threadId === "dirga"), "Foto Januari belum dipindahkan ke chat Dirga");
assert(/storyCheckpointReached\(photo\.availableAfter\)/.test(appSource), "Galeri belum memfilter foto berdasarkan pertemuan");
assert(/\.sort\(\(first, second\) => photoTimestamp\(second\) - photoTimestamp\(first\)\)/.test(appSource), "Galeri belum diurutkan dari foto paling baru");
assert(/class="wa-message-image"/.test(appSource), "WhatsApp belum mendukung foto di dalam chat");
assert(config.chatScripts?.petra?.onComplete?.storyDate === "2026-11-17", "Trigger setelah dinner tidak memakai tanggal cerita 17 November");
assert(config.chatScripts?.dirga_after_dinner?.onComplete?.calendarEvents?.[0]?.trigger?.storyDate === "2026-11-21", "Trigger coffee tidak memakai tanggal cerita 21 November");
const afterCoffee = config.chatScripts?.dirga_coffee_arrival?.onComplete;
assert(afterCoffee?.text === "Home yet?", "Trigger setelah coffee belum tersedia");
assert(afterCoffee?.afterMs >= 6000 && afterCoffee?.afterMs <= 8000, "Jeda trigger setelah coffee bukan 6–8 detik");
assert(afterCoffee?.requireAppExit === true, "Trigger setelah coffee tidak menunggu pemain keluar WhatsApp");
assert(afterCoffee?.delayAfterExit === true, "Timer setelah coffee tidak dimulai sesudah keluar WhatsApp");
assert(afterCoffee?.activateChatScript === "dirga_after_coffee", "Trigger setelah coffee tidak membuka percakapan lanjutan");
const afterIWill = config.chatScripts?.dirga_after_coffee?.onComplete;
assert(afterIWill?.text === "Still on the road?", "Trigger setelah I will belum memakai follow-up yang berbeda");
assert(afterIWill?.afterMs >= 5000 && afterIWill?.afterMs <= 6000, "Jeda trigger setelah I will bukan 5–6 detik");
assert(afterIWill?.requireAppExit === true && afterIWill?.delayAfterExit === true, "Trigger setelah I will tidak menunggu pemain keluar WhatsApp");
assert(afterIWill?.activateChatScript === "dirga_home_arrival", "Trigger setelah I will tidak membuka percakapan pulang");
assert(/event\.exitDelayStarted = true/.test(appSource), "Runtime belum memulai timer saat WhatsApp ditutup");
assert(/storyDate:\s*"2026-11-17"/.test(appSource), "State awal tidak memiliki tanggal cerita");
assert(!/function currentTime\(\)\s*{\s*return new Date/.test(appSource), "Jam chat masih mengikuti waktu perangkat");

for (const event of config.timeline || []) {
  assert(threadIds.has(event.threadId), `Timeline ${event.id} memakai thread yang tidak ada`);
}

const assetRefs = new Set();
function collectAssets(value) {
  if (typeof value === "string") {
    if (value.startsWith("assets/")) assetRefs.add(value);
    else {
      const match = value.match(/assets\/[^'"`)]+/g);
      for (const item of match || []) assetRefs.add(item);
    }
    return;
  }
  if (Array.isArray(value)) return value.forEach(collectAssets);
  if (value && typeof value === "object") Object.values(value).forEach(collectAssets);
}
collectAssets(config);
for (const source of [cssSource, htmlSource, appSource]) collectAssets(source);
for (const ref of assetRefs) {
  assert(fs.existsSync(path.join(dist, ...ref.split("/"))), `Aset tidak ditemukan: ${ref}`);
}

assert(/<meta name="viewport"/.test(htmlSource), "Meta viewport tidak ada");
assert(/lang="id"/.test(htmlSource), "Bahasa dokumen bukan id");
assert(!/TODO|FIXME|debugger|console\.log/.test(`${storySource}\n${appSource}`), "Kode debug/TODO masih tertinggal");
assert(!/127\.0\.0\.1|localhost/.test(`${storySource}\n${appSource}\n${htmlSource}\n${cssSource}`), "URL lokal tertanam di hasil deploy");
assert(fs.existsSync(path.join(dist, "index.html")), "dist/index.html tidak ada");

notes.push(`${threads.length} thread WhatsApp`);
notes.push(`${Object.keys(config.chatScripts || {}).length} fase chat interaktif`);
notes.push(`${triggerIds.length} trigger cerita`);
notes.push(`${assetRefs.size} referensi aset terverifikasi`);
notes.push(`${(config.photos || []).length} foto dan ${(config.notes || []).length} catatan`);

if (failures.length) {
  console.error("AUDIT GAGAL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("AUDIT LULUS");
notes.forEach((note) => console.log(`- ${note}`));
