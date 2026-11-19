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

const validStepTypes = new Set(["mc", "them", "missed_call", "incoming_call"]);
const triggerIds = [];
for (const [scriptId, script] of Object.entries(config.chatScripts || {})) {
  const target = script.threadId || scriptId;
  assert(threadIds.has(target), `Chat script ${scriptId} mengarah ke thread yang tidak ada: ${target}`);
  assert(Array.isArray(script.steps) && script.steps.length > 0, `Chat script ${scriptId} tidak memiliki langkah`);
  for (const [index, step] of (script.steps || []).entries()) {
    assert(validStepTypes.has(step.type), `Tipe langkah ${scriptId}[${index}] tidak valid: ${step.type}`);
    if (!["missed_call", "incoming_call"].includes(step.type)) assert(typeof step.text === "string" && step.text.length > 0, `Teks ${scriptId}[${index}] kosong`);
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
assert(workNight?.steps?.some((step) => step.text === "I know... tapi saya mau"), "Ajakan menemani Dirga kerja belum lengkap");
assert(workNight?.onComplete?.activateChatOnExit === "dirga_after_work_personal", "Bab kerja malam belum membuka chat momen personal");
const personalChat = config.chatScripts?.dirga_after_work_personal;
assert(personalChat?.steps?.[0]?.text === "Makasih tadi, Pak", "Chat setelah momen sepatu belum dimulai oleh MC");
assert(personalChat?.steps?.some((step) => step.text === "For what?"), "Respons Dirga tentang ucapan terima kasih belum tersedia");
assert(personalChat?.steps?.some((step) => step.text === "Benerin sepatu saya..."), "MC belum menyebut momen sepatu di chat");
const dropPakIndex = personalChat?.steps?.findIndex((step) => step.text === "You can drop the ‘Pak’ when we're outside the office");
const photoCallbackIndex = personalChat?.steps?.findIndex((step) => step.text === "You sent me a photo with ‘GANTENG BANGET’ written under it");
assert(dropPakIndex >= 0 && photoCallbackIndex > dropPakIndex, "Dirga belum meminta MC melepas panggilan Pak sebelum mengungkit foto");
assert(personalChat?.steps?.some((step) => step.type === "mc" && step.text === "...Dirga"), "MC belum mencoba memanggil Dirga tanpa Pak");
const morningCheck = config.chatScripts?.dirga_morning_check;
assert(personalChat?.onComplete?.text === "Morning" && personalChat?.onComplete?.storyDate === "2026-12-01", "Trigger morning check belum tersedia");
assert(personalChat?.onComplete?.afterMs >= 5000 && personalChat?.onComplete?.afterMs <= 6000, "Jeda menuju morning check bukan 5–6 detik");
assert(morningCheck?.steps?.[0]?.text === "Morning(?)", "Balasan pertama MC pada morning check masih terlalu kaku");
assert(morningCheck?.steps?.some((step) => step.text === "Tumben Bapak pagi-pagi?"), "MC belum menyinggung kebiasaan tidur Dirga");
assert(morningCheck?.steps?.some((step) => step.text === "Believe me, I don't like it either"), "Dirga belum menanggapi soal bangun pagi");
const morningApologyIndex = morningCheck?.steps?.findIndex((step) => step.text === "Maaf, belum kebiasa");
const morningNameIndex = morningCheck?.steps?.findIndex((step) => step.text === "Siap... Dirga");
const morningBetterIndex = morningCheck?.steps?.findIndex((step) => step.text === "Better");
assert(morningApologyIndex >= 0 && morningNameIndex > morningApologyIndex && morningBetterIndex > morningNameIndex, "Transisi panggilan Dirga pada morning check belum natural");
const decemberMeetup = config.chatScripts?.dirga_december_meetup;
assert(morningCheck?.onComplete?.text === "Done with work?" && morningCheck?.onComplete?.storyDate === "2026-12-05", "Trigger pertemuan 5 Desember belum tersedia");
assert(morningCheck?.onComplete?.calendarEvents?.some((event) => event.title === "Us?" && event.date === "2026-12-05"), "Event Us? belum muncul melalui alur cerita");
assert(decemberMeetup?.steps?.some((step) => step.text === "KOK GAK BILANG DULU"), "Respons CAPS LOCK MC belum tersedia");
const decemberClarity = config.chatScripts?.dirga_december_clarity;
assert(decemberMeetup?.onComplete?.text === "Kamu udah di rumah?" && decemberMeetup?.onComplete?.activateChatScript === "dirga_december_clarity", "Trigger confession setelah pertemuan belum tersedia");
assert(decemberClarity?.steps?.some((step) => step.text === "Yes, I'm pursuing you"), "Pengakuan Dirga belum tersedia");
assert(decemberClarity?.steps?.some((step) => step.text === "Aku cuma belum terbiasa"), "Respons MC setelah pengakuan belum tersedia");
assert(decemberClarity?.steps?.some((step) => step.text?.includes("worth staying for")), "Alasan personal Dirga saat confession belum tersedia");
assert(decemberClarity?.onComplete?.activateChatScript === "petra_december_confession", "Confession belum membuka curhat dengan Petra");
assert(config.chatScripts?.petra_december_confession?.onComplete?.exitTransition?.storyDate === "2026-12-06", "Hari sunyi setelah confession belum tersedia");
assert(config.chatScripts?.petra_december_confession?.onComplete?.exitTransition?.armTransition?.activateChatScript === "dirga_midnight_reconciliation", "Keluar dari X belum membuka rekonsiliasi tengah malam");
const midnightReconciliation = config.chatScripts?.dirga_midnight_reconciliation;
assert(midnightReconciliation?.steps?.some((step) => step.text === "I never said no"), "MC belum membuka kembali kemungkinan hubungan");
assert(midnightReconciliation?.steps?.some((step) => step.type === "incoming_call"), "Panggilan WhatsApp setelah chat tengah malam belum tersedia");
const warmDirgaScripts = new Set(["dirga_after_work_personal", "dirga_morning_check", "dirga_december_meetup", "dirga_december_clarity", "dirga_midnight_reconciliation"]);
for (const [scriptId, script] of Object.entries(config.chatScripts || {})) {
  if ((script.threadId || scriptId) !== "dirga") continue;
  const mcSteps = (script.steps || []).filter((step) => step.type === "mc");
  if (scriptId === "dirga_after_work_personal") {
    const formalSteps = (script.steps || []).slice(0, dropPakIndex + 1).filter((step) => step.type === "mc");
    assert(formalSteps.every((step) => !/\baku\b/i.test(step.text)), "MC memakai aku sebelum Dirga meminta panggilan Pak dilepas");
    assert((script.steps || []).slice(dropPakIndex + 1).some((step) => step.type === "mc" && /\baku\b/i.test(step.text)), "MC belum beralih ke aku setelah hubungan menghangat");
  } else if (!warmDirgaScripts.has(scriptId)) {
    assert(mcSteps.every((step) => !/\baku\b/i.test(step.text)), `MC memakai aku terlalu awal pada fase ${scriptId}`);
  }
}
assert(/"Iya\.\.\. aku juga mau": "Iya\.\.\. saya juga mau"/.test(appSource) && /"Next time jangan bikin saya nemenin lembur": "Next time jangan bikin aku nemenin lembur"/.test(appSource), "Pesan tersimpan belum dimigrasikan mengikuti perubahan saya ke aku");
assert(/message\.text === "I'm downstairs" && messages\[index \+ 1\]\?\.text === "KOK GAK BILANG DULU"/.test(appSource), "Jam pertemuan 5 Desember pada progress lama belum diperbaiki");
assert(config.xApp?.posts?.some((post) => post.availableAfter === "dirga_work_night" && post.text?.includes("voluntarily staying late")), "Tweet setelah menemani Dirga kerja belum tersedia");
assert((config.xApp?.posts || []).filter((post) => post.availableAfter === "dirga_work_night").length >= 3, "Tweet fase lembur belum cukup natural");
assert((config.xApp?.posts || []).filter((post) => post.availableAfter === "dirga_after_work_personal").length >= 3, "Tweet fase chat warm belum cukup natural");
assert((config.xApp?.posts || []).filter((post) => post.availableAfter === "dirga_december_clarity").length >= 3, "Tweet setelah confession belum cukup heboh");
assert((config.xApp?.posts || []).filter((post) => post.availableAfter === "petra_december_confession" && post.availableAfterDate === "2026-12-06").length >= 5, "Tweet pada hari sunyi belum lengkap");
assert((config.calendar?.events || []).every((event) => event.title !== "Us?"), "Event Us? masih muncul sebelum trigger cerita");
assert((config.gmail?.emails || []).some((email) => email.id === "legal-copy-tonight" && email.availableAfter === "maria_late_revision"), "Email revisi malam belum terhubung ke cerita");
assert((config.gmail?.emails || []).some((email) => email.id === "legal-copy-cleared" && email.availableAfter === "dirga_work_night"), "Email clearance legal belum terhubung ke cerita");
assert((config.notes || []).some((note) => note.title === "MINGGU DEPAN" && note.availableAfter === "dirga_wrong_send"), "Notes rencana setelah pertemuan kedua belum tersedia");
assert((config.notes || []).some((note) => note.title === "DESEMBER" && note.availableAfter === "dirga_after_work_personal"), "Notes rencana Desember belum tersedia");
assert(/const visibleNotes = config\.notes[\s\S]*storyCheckpointReached\(item\.note\.availableAfter\)/.test(appSource), "Notes belum difilter berdasarkan checkpoint cerita");
assert(/const emails = \(gmail\?\.emails \|\| \[\]\)\.filter\(\(email\) => storyCheckpointReached\(email\.availableAfter\)/.test(appSource), "Gmail belum difilter berdasarkan checkpoint cerita");
assert((config.xApp?.posts || []).filter((post) => post.availableAfter === "dirga_wrong_send").length >= 2, "Tweet setelah salah kirim belum lengkap");
assert(config.xApp?.posts?.some((post) => post.text === "GOBLOKKKKKKKKK" && post.time === "28 Nov" && post.availableAfter === "dirga_wrong_send"), "Tweet spontan setelah salah kirim belum tersedia");
assert(Object.values(config.chatScripts || {}).every((script) => /^2026-\d{2}-\d{2}$/.test(script.storyDate)), "Setiap fase WhatsApp harus memiliki tanggal cerita");
assert(/formatWhatsAppDay\(message\.storyDate/.test(appSource), "WhatsApp belum memisahkan percakapan berdasarkan hari");
assert(/homeProfileIds[\s\S]*visibleInstagramPosts\(profile\)\[0\]/.test(appSource), "Home Instagram belum mengambil post terbaru tiap profil");
assert(/storyDateReached\(postDate\)/.test(appSource), "X belum mengikuti tanggal cerita");
assert(/storyRevision:\s*9/.test(appSource) && /extendedScriptId = "dirga_home_arrival"/.test(appSource) && /reorderedScripts/.test(appSource) && /personalScriptId = "dirga_after_work_personal"/.test(appSource) && /redateThread\("dirga"/.test(appSource) && /goodCountByDate/.test(appSource) && /morningWasComplete/.test(appSource) && /replacedClarityTexts/.test(appSource), "Progress lama belum dimigrasikan ke struktur cerita terbaru");
assert(/function applyPendingViewTransitions\(previousView\)/.test(appSource), "Transisi hari sunyi berbasis keluar aplikasi belum tersedia");
assert(/function renderIncomingCall\(\)/.test(appSource) && /function finishActiveCall\(\)/.test(appSource), "Layar panggilan WhatsApp belum tersedia");
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
