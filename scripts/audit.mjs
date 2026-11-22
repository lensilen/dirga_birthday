import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const failures = [];
const notes = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const unique = (items, label) => {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item)) failures.push(`${label} duplikat: ${item}`);
    seen.add(item);
  }
};

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

const threads = config.threads || [];
const rawThreadIds = threads.map((thread) => thread.id);
const threadIds = new Set(rawThreadIds);
unique(rawThreadIds, "ID thread");
unique((config.apps || []).map((app) => app.id), "ID aplikasi");
unique((config.dockApps || []).map((app) => app.id), "ID aplikasi dock");
unique((config.photos || []).map((photo) => photo.id), "ID foto");
unique((config.photoAlbums || []).map((album) => album.id), "ID album");
unique((config.notes || []).map((note) => note.title), "Judul Notes");
unique((config.gmail?.emails || []).map((email) => email.id), "ID email");

const validStepTypes = new Set(["mc", "them", "missed_call", "incoming_call", "notification"]);
const triggerIds = [];
for (const [scriptId, script] of Object.entries(config.chatScripts || {})) {
  const target = script.threadId || scriptId;
  assert(threadIds.has(target), `Chat script ${scriptId} mengarah ke thread yang tidak ada: ${target}`);
  assert(/^2026-\d{2}-\d{2}$/.test(script.storyDate), `Tanggal ${scriptId} tidak valid`);
  assert(Array.isArray(script.steps) && script.steps.length > 0, `Chat script ${scriptId} tidak memiliki langkah`);
  for (const [index, step] of (script.steps || []).entries()) {
    assert(validStepTypes.has(step.type), `Tipe langkah ${scriptId}[${index}] tidak valid: ${step.type}`);
    if (!["missed_call", "incoming_call"].includes(step.type)) {
      assert(typeof step.text === "string" && step.text.length > 0, `Teks ${scriptId}[${index}] kosong`);
    }
    assert(Number.isFinite(step.waitBefore) && step.waitBefore >= 0, `waitBefore ${scriptId}[${index}] tidak valid`);
    if (step.type === "notification") {
      assert(threadIds.has(step.threadId), `Notifikasi paralel ${scriptId}[${index}] memakai thread yang tidak ada`);
      assert(Boolean(config.chatScripts?.[step.activateChatScript]), `Notifikasi paralel ${scriptId}[${index}] tidak mengaktifkan script valid`);
    }
  }
  const completion = script.onComplete;
  if (completion?.id) triggerIds.push(completion.id);
  if (completion?.threadId) assert(threadIds.has(completion.threadId), `Trigger ${completion.id} memakai thread yang tidak ada`);
  if (completion?.activateChatScript) assert(Boolean(config.chatScripts?.[completion.activateChatScript]), `Trigger ${completion.id} mengaktifkan script yang tidak ada`);
  for (const event of completion?.calendarEvents || []) {
    assert(/^2026-\d{2}-\d{2}$/.test(event.date), `Tanggal event ${event.id} tidak valid`);
    if (event.trigger) {
      triggerIds.push(event.trigger.id);
      assert(threadIds.has(event.trigger.threadId), `Trigger kalender ${event.trigger.id} memakai thread yang tidak ada`);
      assert(Boolean(config.chatScripts?.[event.trigger.activateChatScript]), `Trigger kalender ${event.trigger.id} tidak mengaktifkan script valid`);
    }
  }
}
unique(triggerIds, "ID trigger cerita");

const petraInitial = threads.find((thread) => thread.id === "petra")?.initialMessages || [];
assert(petraInitial.some((message) => message.text === "Tumben langsung dibales"), "Chat pembuka Petra belum memakai revisi terbaru");
assert(petraInitial.some((message) => message.text === "Warung madura tutup, lo masih kerja"), "Banter pekerja keras Petra belum lengkap");

const birthday = config.chatScripts?.dirga;
assert(birthday?.steps?.some((step) => step.text === "May I ask, Ibu tahu ulang tahun saya dari siapa?"), "Kalimat ulang tahun belum dirapikan");
assert(birthday?.steps?.some((step) => step.text === "If I can ask you anything, that could be dangerous for both of us"), "Grammar dangerous offer belum diperbaiki");
assert(birthday?.steps?.some((step) => step.text === "Just the two of us"), "Ajakan dinner pribadi belum lengkap");

const coffee = config.chatScripts?.dirga_coffee_arrival;
assert(coffee?.steps?.some((step) => step.text === "Eight minutes early should be enough time for you to come downstairs, right?"), "Grammar jemput coffee belum diperbaiki");
assert(coffee?.onComplete?.text?.startsWith("I'm sorry, Bu"), "Panggilan mendadak setelah coffee belum menjadi push");
const afterCoffee = config.chatScripts?.dirga_after_coffee;
assert(afterCoffee?.steps?.some((step) => step.text === "Can you keep your next Saturday free?"), "Ajakan Sabtu belum diubah menjadi pagi/umum");
assert(!afterCoffee?.steps?.some((step) => /Saturday evening/i.test(step.text)), "Kata evening masih ada pada ajakan Sabtu");
const secondMeetingEvent = afterCoffee?.onComplete?.calendarEvents?.find((event) => event.id === "second-meeting-dirga-28-nov");
assert(secondMeetingEvent?.time === "10:00 AM", "Calendar pertemuan kedua belum menjadi jam 10 pagi");
assert(secondMeetingEvent?.trigger?.time === "09:47" && secondMeetingEvent?.trigger?.text === "Saya udah sampai", "Trigger jemput pertemuan kedua belum menjadi 09:47");

const secondArrival = config.chatScripts?.dirga_second_meeting_arrival;
assert(secondArrival?.steps?.[0]?.text === "Sebentar, Pak. Ini masih 09.47", "Dialog kedatangan pagi belum sesuai");
assert(secondArrival?.onComplete?.text === "Hey" && secondArrival?.onComplete?.activateChatScript === "dirga_client_meeting", "Push scene meeting client belum tersedia");
const clientMeeting = config.chatScripts?.dirga_client_meeting;
assert(clientMeeting?.steps?.some((step) => step.text === "Kenapa lewat chat, Pak? Kita berhadapan langsung"), "Scene chat saat duduk berhadapan belum tersedia");
assert(clientMeeting?.steps?.some((step) => step.text === "Saya gak mau mengganggu meetingnya"), "Dialog meeting belum dirapikan");
assert(clientMeeting?.steps?.some((step) => step.text?.includes("I hope they don't give you hard times")), "Typo don't pada scene client belum diperbaiki");

const petraReport = config.chatScripts?.petra_second_meeting_report;
const parallelIndex = petraReport?.steps?.findIndex((step) => step.type === "notification" && step.text === "Is that so?") ?? -1;
const petraSendIndex = petraReport?.steps?.findIndex((step) => step.text === "Sialan, iya iya nih gue kirimin") ?? -1;
assert(parallelIndex >= 0 && parallelIndex < petraSendIndex, "Push Dirga belum berjalan paralel sebelum MC selesai chat Petra");
assert(/step\.type === "notification"/.test(appSource), "Runtime notifikasi paralel belum tersedia");
const wrongSend = config.chatScripts?.dirga_wrong_send;
const wrongSendPhoto = wrongSend?.steps?.find((step) => step.type === "mc" && step.imageSrc);
assert(wrongSendPhoto?.text === "Ganteng BANGET gak tuh?" && wrongSendPhoto?.imageSrc?.includes("Dion Windsor"), "Foto salah kirim terbaru belum tersedia");
assert(wrongSend?.onComplete?.text === "Mana fotonyaaa pelittt", "Follow-up Petra setelah salah kirim belum sesuai");
assert(config.chatScripts?.petra_wrong_send?.steps?.some((step) => step.text === "GUE KIRIM KE ORANGNYA LANGSUNG"), "Percakapan panik Petra belum lengkap");

const secondMeetingPhoto = (config.photos || []).find((photo) => photo.src?.includes("Dion Windsor"));
assert(secondMeetingPhoto?.availableAfter === "dirga_after_second_meeting", "Foto Dirga belum muncul di Galeri sebelum salah kirim");
assert(/storyCheckpointReached\(photo\.availableAfter\)/.test(appSource), "Galeri belum memfilter foto berdasarkan progres");
assert(/album\.id === "recents"\s*\? albumPhotos\[0\]/.test(appSource), "Cover Recents belum mengikuti foto terbaru");

const workNight = config.chatScripts?.dirga_work_night;
assert(workNight?.steps?.some((step) => step.text === "Saya bawain kopinya ya"), "Janji traktir kopi belum dilanjutkan");
assert(workNight?.onComplete?.activateChatOnExit === "dirga_after_work_personal", "Kerja malam belum membuka chat personal");
const personal = config.chatScripts?.dirga_after_work_personal;
assert(personal?.steps?.some((step) => step.text === "Dan mungkin kalau di luar kantor, you don't need to address me as 'Pak'"), "Transisi melepas panggilan Pak belum tersedia");
assert(personal?.steps?.some((step) => step.text === "Lain kali saya belikan sepatu yang lebih nyaman, if you want to"), "Ajakan membeli sepatu belum tersedia");
assert(personal?.onComplete?.storyDate === "2026-12-01" && personal?.onComplete?.text === "You done with your works?", "Outing 1 Desember belum dimulai dengan benar");
assert(personal?.onComplete?.calendarEvents?.some((event) => event.id === "shoe-shopping-dirga-1-dec" && event.date === "2026-12-01"), "Outing beli sepatu belum masuk Calendar 1 Desember");

const outing = config.chatScripts?.dirga_morning_check;
assert(outing?.steps?.some((step) => step.text === "Sure, lantai berapa unit kamu?"), "Dirga belum masuk ke kontrakan MC");
assert(outing?.onComplete?.text === "How's the shoes? Udah dicoba?" && outing?.onComplete?.activateChatScript === "dirga_december_meetup", "Follow-up sepatu setelah mengantar MC belum tersedia");
const confession = config.chatScripts?.dirga_december_meetup;
assert(confession?.steps?.some((step) => step.text === "But I don't wake up early for someone, and I don't let anyone else into my office at night"), "Grammar confession belum diperbaiki");
assert(confession?.steps?.some((step) => step.text === "Yes, saya memang lagi dekatin kamu"), "Pengakuan Dirga belum tersedia");
assert(confession?.steps?.some((step) => step.text === "Don't go too far"), "Penutup confession belum tersedia");
assert(confession?.onComplete?.text === "Ada resto baru nih, kesitu yuk" && confession?.onComplete?.activateChatScript === "petra_december_confession", "Curhat Petra setelah confession belum terhubung");

const petraConfession = config.chatScripts?.petra_december_confession;
assert(petraConfession?.steps?.some((step) => step.text === "Takut rumor jelek soal gue karena deket sama dia, dia orang gede di kantor pet"), "Konflik profesional MC belum dijelaskan ke Petra");
assert(petraConfession?.onComplete?.exitTransition?.storyDate === "2026-12-02", "Hari sunyi setelah confession belum menjadi 2 Desember");
assert(petraConfession?.onComplete?.exitTransition?.armTransition?.storyDate === "2026-12-03", "Rekonsiliasi tengah malam belum menjadi 3 Desember");
const midnight = config.chatScripts?.dirga_midnight_reconciliation;
assert(midnight?.steps?.some((step) => step.text === "Aku bukan siapa-siapa, kenapa kamu bisa suka sama aku?"), "Pertanyaan inti rekonsiliasi belum tersedia");
assert(midnight?.steps?.some((step) => step.type === "incoming_call"), "Incoming phone call belum tersedia");
assert(midnight?.onComplete?.calendarEvents?.some((event) => event.id === "singapore-briefing-8-dec"), "Setup Singapore tidak dipertahankan");

const forbiddenGrammar = [
  "If i can ask you anything than",
  "Eight minutes early to wait you go down with stairs",
  "menggangu meetingnya",
  "I dont waking up early",
  "Sya cuma bertanya",
  "bagain terbaik",
  "do't give you",
  "can;t lie"
];
for (const text of forbiddenGrammar) assert(!`${storySource}\n${appSource}`.includes(text), `Grammar lama masih ada: ${text}`);

const effectiveDialogText = Object.values(config.chatScripts || {})
  .flatMap((script) => (script.steps || []).map((step) => step.text || ""))
  .join("\n");
const correctedDialogueTypos = [
  "kalua begitu",
  "APASIH",
  "inimah",
  "Kembali, Pak",
  "hadap hadapan",
  "repot repot",
  "Maybe next time we met",
  "So you asking me out",
  "as compliment",
  "Do you.. always like this",
  "I like that from you",
  "kelaaman",
  "siapa siapa"
];
for (const text of correctedDialogueTypos) assert(!effectiveDialogText.includes(text), `Typo dialog aktif masih ada: ${text}`);
const clientBuCount = (clientMeeting?.steps || []).filter((step) => /\b(?:Bu|Ibu)\b/.test(step.text || "")).length;
assert(clientBuCount <= 2, `Sapaan Bu/Ibu pada scene client masih berlebihan: ${clientBuCount}`);

const callCaptionBlock = appSource.match(/const callCaptions = \[([\s\S]*?)\n  \];/)?.[1] || "";
assert(callCaptionBlock.includes("This document suddenly decided to get complicated"), "Pembuka telepon baru belum tersedia");
assert(callCaptionBlock.includes("So, saya masih ada kesempatan?"), "Pembahasan kesempatan hubungan belum tersedia di telepon");
assert(callCaptionBlock.includes("Let’s remain professional at the office"), "Batas profesional belum dibahas di telepon");
assert(callCaptionBlock.includes("Okay then\\nI promise"), "Janji penutup telepon belum tersedia");
assert(/function advanceCallCaption\(\)/.test(appSource) && /call-caption-next/.test(appSource), "Subtitle telepon manual belum tersedia");
assert(!/function scheduleCallCaption\(\)/.test(appSource), "Subtitle telepon masih berjalan otomatis");
assert(/data-replay-call/.test(appSource) && /call\.replay/.test(appSource), "Replay telepon dari Recents belum tersedia");

assert(/storyRevision:\s*16/.test(appSource), "Versi progres cerita belum dinaikkan ke 16");
assert(/if \(\(saved\.storyRevision \|\| 0\) < 14\)/.test(appSource) && /const revisedOrder = \[/.test(appSource), "Progress lama belum dimigrasikan ke naskah pengganti");
assert(/if \(\(saved\.storyRevision \|\| 0\) < 14\) \{\s*const dirgaLanguageMigrations/.test(appSource), "Migrasi dialog lama masih dapat mengubah naskah baru");
assert(/if \(\(saved\.storyRevision \|\| 0\) < 15\)/.test(appSource) && /const dialogueCorrections = new Map/.test(appSource), "Koreksi dialog belum dimigrasikan ke progres lama");
assert(/if \(\(saved\.storyRevision \|\| 0\) < 16\)/.test(appSource), "Arc Singapore belum dimigrasikan ke progres lama");
assert(/const nextScriptId = revisedOrder\[completedCount\] \|\| null/.test(appSource), "Migrasi progres lama belum mengaktifkan fase berikutnya");
assert(/loaded\.storyCalendarEvents\.push\(\{ \.\.\.event \}\)/.test(appSource), "Migrasi progres lama belum memulihkan event Calendar");
assert(/formatWhatsAppDay\(message\.storyDate/.test(appSource), "WhatsApp belum memisahkan percakapan berdasarkan hari");
assert(/event\.exitDelayStarted = true/.test(appSource), "Timer notifikasi belum dimulai setelah keluar WhatsApp");
assert(/imageSrc:\s*step\.imageSrc/.test(appSource) && /wa-draft-image/.test(appSource), "Draft foto WhatsApp belum tersedia");
assert(/function renderIncomingCall\(\)/.test(appSource) && /function finishActiveCall\(\)/.test(appSource), "Layar panggilan belum tersedia");
assert(!/WhatsApp Audio/.test(appSource), "Panggilan masih ditampilkan sebagai WhatsApp Audio");
assert(/iphone-live-caption/.test(appSource) && /iphone-live-caption/.test(cssSource), "Tampilan subtitle telepon belum tersedia");
assert(/class="wa-message-image"/.test(appSource), "WhatsApp belum mendukung foto di chat");

const gatedXPosts = (config.xApp?.posts || []).filter((post) => post.availableAfter);
for (const post of gatedXPosts) assert(Boolean(config.chatScripts?.[post.availableAfter]), `Tweet X memakai fase yang tidak ada: ${post.availableAfter}`);
assert((config.gmail?.emails || []).some((email) => email.id === "legal-copy-tonight" && email.availableAfter === "maria_late_revision"), "Email revisi malam belum terhubung");
assert((config.notes || []).some((note) => note.title === "MINGGU DEPAN" && note.availableAfter === "dirga_wrong_send"), "Notes setelah salah kirim belum terhubung");

const removedGalleryAssets = ["1140747780608893244", "987343918331237220", "917467755359088838"];
assert(removedGalleryAssets.every((asset) => !(config.photos || []).some((photo) => photo.src?.includes(asset))), "Foto yang diminta dihapus masih masuk Galeri");
assert(!(config.storyChatMedia || []).some((media) => media.id === "dirga-january-photo"), "Foto kopi lama masih terduplikasi sebagai media terjadwal");

const singaporeOpening = config.chatScripts?.dirga_midnight_reconciliation?.onComplete;
assert(singaporeOpening?.text === "Morning. Kamu sudah siap?" && singaporeOpening?.activateChatScript === "dirga_singapore_pickup", "Arc Singapore belum tersambung dari rekonsiliasi");
assert(singaporeOpening?.storyDate === "2026-12-08" && singaporeOpening?.time === "07:05", "Pembuka Singapore belum memakai timeline 8 Desember");
assert(["whatsapp", "thread", "phone"].every((view) => singaporeOpening?.blockedViews?.includes(view)), "Push Singapore belum menunggu user keluar dari WhatsApp dan Phone Recents");
const singaporeCoffeeOpening = config.chatScripts?.dirga_singapore_after_dinner?.onComplete;
assert(singaporeCoffeeOpening?.text === "You don't come downstairs? Aku order kopi for you", "Push kopi Singapore belum sesuai revisi");
assert(singaporeCoffeeOpening?.imageSrc?.includes("917467755359088838"), "Foto kopi belum terpasang pada push Dirga");
assert(/imageSrc:\s*event\.imageSrc/.test(appSource) && /imageAlt:\s*event\.imageAlt/.test(appSource), "Foto dari push notification belum diteruskan ke bubble WhatsApp");

const singaporeCoffee = config.chatScripts?.dirga_singapore_coffee;
assert(singaporeCoffee?.steps?.[0]?.text === "Ini sogokan biar aku gak telat?", "Balasan pertama scene kopi belum sesuai");
assert(singaporeCoffee?.steps?.some((step) => step.text === "Preventive measure"), "Preventive measure scene kopi hilang");
assert(singaporeCoffee?.steps?.some((step) => step.text === "DIRGA 😁😁😁"), "Reaksi MC pada scene kopi belum sesuai");
assert(!singaporeCoffee?.steps?.some((step) => ["Turun", "Aku udah pesanin kopi kamu", "Morningg"].includes(step.text)), "Dialog yang sudah dihapus masih ada di scene kopi Singapore");
const singaporePresentation = config.chatScripts?.dirga_singapore_presentation;
assert(!singaporePresentation?.steps?.some((step) => step.text === "Occupational hazard"), "Occupational hazard belum dihapus dari scene presentasi");

const secretCoffee = config.chatScripts?.dirga_secret_coffee;
assert(!secretCoffee?.steps?.some((step) => ["Fair question", "DIRGA"].includes(step.text)), "Dialog yang dihapus masih ada di scene hubungan rahasia");
assert(config.chatScripts?.bintang_final_review?.onComplete?.activateChatScript === "maria_final_review", "Update final review Bintang belum tersambung ke Maria");
assert(config.chatScripts?.maria_final_review?.onComplete?.activateChatScript === "adelina_final_review", "Update final review Maria belum tersambung ke Adelina");
assert(config.chatScripts?.adelina_final_review?.onComplete?.activateChatScript === "dirga_final_review", "Update final review Adelina belum tersambung ke Dirga");
assert(!threads.some((thread) => /group/i.test(thread.id || "")), "Final review tidak boleh dibuat sebagai grup baru");

const newArcScripts = [
  "dirga_singapore_pickup", "dirga_singapore_briefing", "petra_singapore_checkin",
  "dirga_singapore_hotel", "dirga_singapore_after_dinner", "dirga_singapore_coffee",
  "dirga_singapore_presentation", "dirga_singapore_evening_invite", "dirga_singapore_personal_evening",
  "bintang_singapore_rumor", "dirga_singapore_rumor", "dirga_singapore_return",
  "dirga_office_return", "petra_official_news", "dirga_first_official_date", "dirga_first_date_checkin",
  "bintang_secret_coffee", "dirga_secret_coffee", "dirga_secret_distance", "dirga_secret_rules",
  "dirga_secret_meeting", "maria_serious_rumor", "dirga_serious_rumor", "petra_rumor_support",
  "bintang_final_review", "maria_final_review", "adelina_final_review", "dirga_final_review",
  "dirga_story_resolution", "dirga_story_epilogue"
];
newArcScripts.forEach((scriptId) => assert(Boolean(config.chatScripts?.[scriptId]), `Fase baru belum tersedia: ${scriptId}`));
for (const scriptId of newArcScripts) {
  const completion = config.chatScripts?.[scriptId]?.onComplete;
  if (completion?.text) {
    assert(completion.afterMs === 5500, `Jeda push ${scriptId} bukan 5,5 detik`);
    assert(completion.requireAppExit === true && completion.delayAfterExit === true, `Push ${scriptId} belum menunggu user keluar WhatsApp`);
  }
}

const finalPhoto = (config.photos || []).find((photo) => photo.id === "photo-24");
assert(finalPhoto?.src?.includes("dinner-17-second") && finalPhoto?.availableAfter === "dirga_story_epilogue", "Foto dinner penutup belum mengikuti epilog");
assert((config.xApp?.posts || []).some((post) => post.availableAfter === "dirga_story_epilogue" && post.text === "ternyata ngasih waktu ke seseorang gak selalu berarti kehilangan waktu sendiri"), "Tweet penutup belum tersedia");
assert(config.chatScripts?.dirga_story_resolution?.steps?.some((step) => step.text === "Still my favorite gift"), "Motif hadiah waktu belum kembali di resolusi");
assert(config.chatScripts?.dirga_story_epilogue?.steps?.some((step) => step.text === "The best gifts arrive late"), "Penutup epilog belum tersedia");

const expectedCalendarEvents = [
  "singapore-briefing-8-dec", "flight-singapore-8-dec", "singapore-dinner-8-dec",
  "regional-presentation-9-dec", "singapore-evening-9-dec", "flight-home-10-dec",
  "first-official-date-11-dec", "campaign-final-review-18-dec", "marketing-team-lunch-18-dec",
  "final-dinner-19-dec"
];
const storyCalendarIds = Object.values(config.chatScripts || {}).flatMap((script) => script.onComplete?.calendarEvents || []).map((event) => event.id);
expectedCalendarEvents.forEach((eventId) => assert(storyCalendarIds.includes(eventId), `Calendar event belum tersedia: ${eventId}`));

const assetRefs = new Set();
function collectAssets(value) {
  if (typeof value === "string") {
    if (value.startsWith("assets/")) assetRefs.add(value);
    else for (const item of value.match(/assets\/[^'"`)]+/g) || []) assetRefs.add(item);
    return;
  }
  if (Array.isArray(value)) return value.forEach(collectAssets);
  if (value && typeof value === "object") Object.values(value).forEach(collectAssets);
}
collectAssets(config);
for (const source of [cssSource, htmlSource, appSource]) collectAssets(source);
for (const ref of assetRefs) assert(fs.existsSync(path.join(dist, ...ref.split("/"))), `Aset tidak ditemukan: ${ref}`);

assert(/<meta name="viewport"/.test(htmlSource), "Meta viewport tidak ada");
assert(/lang="id"/.test(htmlSource), "Bahasa dokumen bukan id");
assert(!/TODO|FIXME|debugger|console\.log/.test(`${storySource}\n${appSource}`), "Kode debug/TODO masih tertinggal");
assert(!/127\.0\.0\.1|localhost/.test(`${storySource}\n${appSource}\n${htmlSource}\n${cssSource}`), "URL lokal tertanam di hasil deploy");

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
