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
unique((config.reservedStoryMedia || []).map((media) => media.id), "ID media cerita cadangan");
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
assert(gatedPhotos.length === 5, "Jumlah foto baru setelah pertemuan tidak sesuai");
assert(gatedPhotos.some((photo) => photo.availableAfter === "dirga_after_dinner" && photo.src?.includes("dinner-17-first")), "Foto setelah dinner belum memiliki trigger");
assert(gatedPhotos.some((photo) => photo.availableAfter === "dirga_coffee_arrival" && photo.src?.includes("coffee-date")), "Foto coffee date belum memiliki trigger");
assert(gatedPhotos.some((photo) => photo.availableAfter === "dirga_wrong_send" && photo.src?.includes("Dion Windsor")), "Foto pertemuan kedua belum memiliki trigger salah kirim");
assert(gatedPhotos.some((photo) => photo.availableAfter === "dirga_work_night" && photo.src?.includes("alex volkov")), "Foto temani Dirga kerja belum memiliki trigger");
assert(gatedPhotos.some((photo) => photo.availableAfter === "dirga_after_work_personal" && photo.src?.includes("782852347766237811")), "Foto momen personal belum memiliki trigger");
const removedGalleryAssets = ["1140747780608893244", "987343918331237220", "917467755359088838"];
assert(removedGalleryAssets.every((asset) => !(config.photos || []).some((photo) => photo.src?.includes(asset))), "Masih ada foto yang diminta dihapus dalam galeri");
assert((config.storyChatMedia || []).some((media) => media.imageSrc?.includes("917467755359088838") && media.threadId === "dirga"), "Foto Januari belum dipindahkan ke chat Dirga");
const reservedMedia = config.reservedStoryMedia || [];
assert(reservedMedia.some((media) => media.scene === "final_dinner" && media.imageSrc?.includes("dinner-17-second")), "Foto dinner terakhir belum disiapkan");
assert(/storyCheckpointReached\(photo\.availableAfter\)/.test(appSource), "Galeri belum memfilter foto berdasarkan pertemuan");
assert(/\.sort\(\(first, second\) => photoTimestamp\(second\) - photoTimestamp\(first\)\)/.test(appSource), "Galeri belum diurutkan dari foto paling baru");
assert(/album\.id === "recents"\s*\? albumPhotos\[0\]/.test(appSource), "Cover Recents belum mengikuti foto terbaru yang terbuka");
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
const secondMeetingPlan = config.chatScripts?.dirga_home_arrival?.onComplete;
assert(secondMeetingPlan?.text === "How attached are you to your Saturday plans?", "Trigger rencana pertemuan kedua belum tersedia");
assert(secondMeetingPlan?.storyDate === "2026-11-26", "Tanggal trigger rencana pertemuan kedua tidak sesuai");
assert(secondMeetingPlan?.afterMs >= 5000 && secondMeetingPlan?.afterMs <= 6000, "Jeda menuju rencana pertemuan kedua bukan 5–6 detik");
assert(secondMeetingPlan?.requireAppExit === true && secondMeetingPlan?.delayAfterExit === true, "Trigger pertemuan kedua tidak menunggu pemain keluar WhatsApp");
assert(secondMeetingPlan?.activateChatScript === "dirga_second_meeting_invite", "Trigger tidak membuka ajakan pertemuan kedua");
const secondMeetingArrival = config.chatScripts?.dirga_second_meeting_invite?.onComplete;
assert(secondMeetingArrival?.storyDate === "2026-11-28" && secondMeetingArrival?.text === "I'm here", "Trigger hari pertemuan kedua belum benar");
assert(secondMeetingArrival?.afterMs >= 5000 && secondMeetingArrival?.afterMs <= 6000, "Jeda menuju hari pertemuan kedua bukan 5–6 detik");
assert(secondMeetingArrival?.calendarEvents?.some((event) => event.id === "second-meeting-dirga-28-nov"), "Pertemuan kedua belum masuk Calendar");
const afterSecondMeeting = config.chatScripts?.dirga_second_meeting_arrival?.onComplete;
assert(afterSecondMeeting?.text === "Home safe?" && afterSecondMeeting?.activateChatScript === "dirga_after_second_meeting", "Follow-up setelah pertemuan kedua belum tersedia");
assert(afterSecondMeeting?.afterMs >= 5000 && afterSecondMeeting?.afterMs <= 6000, "Jeda follow-up pertemuan kedua bukan 5–6 detik");
const petraCheckin = config.chatScripts?.dirga_after_second_meeting?.onComplete;
assert(petraCheckin?.text === "Udah kelar jalannya?" && petraCheckin?.threadId === "petra", "Petra belum menghubungi MC sebelum adegan salah kirim");
assert(petraCheckin?.afterMs >= 5000 && petraCheckin?.afterMs <= 6000, "Jeda check-in Petra bukan 5–6 detik");
assert(petraCheckin?.activateChatScript === "petra_second_meeting_report", "Check-in Petra belum membuka laporan pertemuan kedua");
const petraReport = config.chatScripts?.petra_second_meeting_report;
assert(petraReport?.steps?.some((step) => step.text === "Bentar gue kirim fotonya"), "MC belum memberi konteks pengiriman foto kepada Petra");
assert(petraReport?.onComplete?.text === "Still awake?" && petraReport?.onComplete?.threadId === "dirga", "Trigger masuk ke chat Dirga belum tersedia");
assert(petraReport?.onComplete?.afterMs >= 5000 && petraReport?.onComplete?.afterMs <= 6000, "Jeda menuju chat Dirga bukan 5–6 detik");
assert(petraReport?.onComplete?.activateChatScript === "dirga_wrong_send", "Trigger tidak membuka adegan salah kirim ke Dirga");
const wrongSendScript = config.chatScripts?.dirga_wrong_send;
const wrongSendPhoto = wrongSendScript?.steps?.find((step) => step.type === "mc" && step.imageSrc);
assert(wrongSendPhoto?.text === "GANTENG BANGET???" && wrongSendPhoto?.imageSrc?.includes("Dion Windsor"), "Foto salah kirim ke Dirga belum tersedia");
assert(wrongSendScript?.onComplete?.text === "Mana fotonya woy" && wrongSendScript?.onComplete?.threadId === "petra", "Trigger Petra setelah salah kirim belum tersedia");
assert(wrongSendScript?.onComplete?.afterMs >= 5000 && wrongSendScript?.onComplete?.afterMs <= 6000, "Jeda notifikasi Petra bukan 5–6 detik");
assert(wrongSendScript?.onComplete?.activateChatScript === "petra_wrong_send", "Trigger salah kirim tidak membuka chat Petra");
assert(config.chatScripts?.petra_wrong_send?.steps?.some((step) => step.text === "KE ORANGNYA LANGSUNG"), "Percakapan panik dengan Petra belum lengkap");
const lateRevision = config.chatScripts?.petra_wrong_send?.onComplete;
assert(lateRevision?.text === "Kak, legal copy yang terakhir masih ditunggu malam ini ya" && lateRevision?.threadId === "maria", "Trigger kerja malam dari Maria belum tersedia");
assert(lateRevision?.storyDate === "2026-11-30" && lateRevision?.afterMs >= 5000 && lateRevision?.afterMs <= 6000, "Tanggal atau jeda revisi malam tidak sesuai");
assert(lateRevision?.activateChatScript === "maria_late_revision", "Trigger revisi malam tidak membuka chat Maria");
assert(config.chatScripts?.maria_late_revision?.onComplete?.activateChatOnExit === "dirga_work_night", "Chat Maria belum menyiapkan draft untuk Dirga");
const workNight = config.chatScripts?.dirga_work_night;
assert(workNight?.steps?.[0]?.text === "Pak masih di kantor?" && workNight?.steps?.[0]?.type === "mc", "MC belum memulai chat temani Dirga kerja");
assert(workNight?.steps?.some((step) => step.text === "I know... tapi aku mau"), "Ajakan menemani Dirga kerja belum lengkap");
assert(workNight?.onComplete?.activateChatOnExit === "dirga_after_work_personal", "Bab kerja malam belum membuka chat momen personal");
const personalChat = config.chatScripts?.dirga_after_work_personal;
assert(personalChat?.steps?.[0]?.text === "Makasih tadi, Pak", "Chat setelah momen sepatu belum dimulai oleh MC");
assert(personalChat?.steps?.some((step) => step.text === "For what?"), "Respons Dirga tentang ucapan terima kasih belum tersedia");
assert(personalChat?.steps?.some((step) => step.text === "Benerin sepatu saya..."), "MC belum menyebut momen sepatu di chat");
assert(config.xApp?.posts?.some((post) => post.availableAfter === "dirga_work_night" && post.text?.includes("voluntarily staying late")), "Tweet setelah menemani Dirga kerja belum tersedia");
assert((config.xApp?.posts || []).filter((post) => post.availableAfter === "dirga_wrong_send").length >= 2, "Tweet setelah salah kirim belum lengkap");
assert(config.xApp?.posts?.some((post) => post.text === "GOBLOKKKKKKKKK" && post.time === "28 Nov" && post.availableAfter === "dirga_wrong_send"), "Tweet spontan setelah salah kirim belum tersedia");
assert(/storyRevision:\s*3/.test(appSource) && /extendedScriptId = "dirga_home_arrival"/.test(appSource) && /reorderedScripts/.test(appSource), "Progress lama belum dimigrasikan ke urutan Petra lebih dulu");
assert(/imageSrc:\s*step\.imageSrc/.test(appSource) && /wa-draft-image/.test(appSource), "Composer WhatsApp belum mendukung draft foto interaktif");
assert(/wa-preview-draft/.test(appSource) && /scriptedDraft\.text/.test(appSource), "Daftar WhatsApp belum menampilkan draft chat MC");
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
