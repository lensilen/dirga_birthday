(function () {
  "use strict";

  const config = window.STORY_CONFIG;
  if (!config) throw new Error("STORY_CONFIG tidak ditemukan. Periksa story.js.");

  const STORAGE_KEY = "your-phone-story-v9";
  const screen = document.querySelector("#screen");
  const homeButton = document.querySelector("#home-button");
  const toastRegion = document.querySelector("#toast-region");
  const statusTime = document.querySelector("#status-time");
  const demoPin = document.querySelector("#demo-pin");
  const previewMode = new URLSearchParams(window.location.search).get("preview");

  const seededCallHistory = () => ([
    { id: "call-mama-1", threadId: "mama", name: "Mama", label: "mobile", dateLabel: "Yesterday", time: "20:14", outgoing: true },
    { id: "call-petra-1", threadId: "petra", name: "Petra", label: "mobile", dateLabel: "Sunday", time: "22:56" },
    { id: "call-satrio-1", threadId: "satrio", name: "Pak Satrio Legal", label: "work", dateLabel: "Friday", time: "09:42", outgoing: true },
    { id: "call-office-1", name: "021 5098 4400", label: "Jakarta, Indonesia", dateLabel: "Thursday", time: "16:38", missed: true },
    { id: "call-bintang-1", threadId: "bintang", name: "Bintang Marketing Team", label: "work", dateLabel: "16 Nov", time: "10:20" },
    { id: "call-mama-2", threadId: "mama", name: "Mama", label: "mobile", dateLabel: "15 Nov", time: "08:16", missed: true }
  ]);
  const callCaptions = [
    { speaker: "Dirga", text: "You actually called", duration: 2500 },
    { speaker: "You", text: "Kan aku yang nawarin", duration: 2400 },
    { speaker: "Dirga", text: "I thought you might change your mind", duration: 3000 },
    { speaker: "You", text: "Aku juga mikir begitu", duration: 2500 },
    { speaker: "Dirga", text: "About the call?", duration: 2300 },
    { speaker: "You", text: "About keeping my distance", duration: 2800 },
    { speaker: "Dirga", text: "I'm glad you didn't", duration: 3200 },
    { speaker: "You", text: "Kamu masih kerja?", duration: 2400 },
    { speaker: "Dirga", text: "Unfortunately, yes. A contract decided midnight is the perfect time to become complicated", duration: 4200 },
    { speaker: "You", text: "Kerjaan legal selalu seseru ini?", duration: 2800 },
    { speaker: "Dirga", text: "Only when people ignore my emails for three days and suddenly discover urgency", duration: 4200 },
    { speaker: "You", text: "Jadi basically kamu dibayar buat baca masalah orang?", duration: 3300 },
    { speaker: "Dirga", text: "And prevent them from creating new ones", duration: 2900 },
    { speaker: "Dirga", text: "How was your day?", duration: 2500 },
    { speaker: "You", text: "Balik serius?", duration: 2100 },
    { speaker: "Dirga", text: "I'm asking about your day", duration: 2500 },
    { speaker: "You", text: "Ini one on one atau teleponan sih?", duration: 2900 },
    { speaker: "Dirga", text: "[laughs] Can't it be both?", duration: 2900 },
    { speaker: "You", text: "Curang", duration: 1900 },
    { speaker: "Dirga", text: "Occupational hazard", duration: 2400 },
    { speaker: "You", text: "Hari aku biasa aja... sampai ada orang ngajak telepon tengah malam", duration: 3800 },
    { speaker: "Dirga", text: "Sounds like the best part of your day", duration: 3000 },
    { speaker: "You", text: "Pede banget", duration: 2100 },
    { speaker: "Dirga", text: "Only with you", duration: 2600 },
    { speaker: "You", text: "That was smooth", duration: 2300 },
    { speaker: "Dirga", text: "I've had time to think about what I'd say if you called", duration: 3800 },
    { speaker: "You", text: "Dan yang kepilih itu?", duration: 2400 },
    { speaker: "Dirga", text: "No. The better ones might make you hang up", duration: 3400 },
    { speaker: "You", text: "Coba satu", duration: 2100 },
    { speaker: "Dirga", text: "I like hearing your voice when you're trying not to smile", duration: 4000 },
    { speaker: "You", text: "Siapa yang senyum", duration: 2300 },
    { speaker: "Dirga", text: "You. Right now", duration: 2500 },
    { speaker: "You", text: "Sok tau", duration: 2100 },
    { speaker: "Dirga", text: "Then stay on the phone and prove me wrong", duration: 4000 }
  ];

  const defaultState = () => ({
    storyRevision: 11,
    unlocked: false,
    pinVisible: false,
    view: "lock",
    pinInput: "",
    storyDate: "2026-11-17",
    storyTime: "10:26",
    activeThreadId: config.threads[0]?.id || null,
    messages: Object.fromEntries(config.threads.map((thread) => [thread.id, thread.initialMessages.map((message) => ({
      ...message,
      storyDate: message.storyDate || thread.initialDate || "2026-11-17"
    }))])),
    unread: {},
    chatProgress: Object.fromEntries(Object.keys(config.chatScripts || {}).map((threadId) => [threadId, 0])),
    activeChatScripts: Object.entries(config.chatScripts || {}).filter(([, script]) => script.active !== false).map(([threadId]) => threadId),
    pendingChatActivations: [],
    completedChats: [],
    pendingNotifications: [],
    pendingViewTransitions: [],
    storyCalendarEvents: [],
    deliveredEvents: [],
    callHistory: seededCallHistory(),
    activeCall: null,
    currentNode: null,
    ending: null,
    startedAt: null,
    activePhotoId: null,
    activeAlbumId: "recents",
    activeNoteIndex: null,
    calendarMonth: config.calendar?.initialMonth ?? 0,
    selectedDate: config.calendar?.selectedDate || "2026-01-01",
    activeSmsId: null,
    activeEmailId: null,
    activeInstagramProfileId: "mc",
    activeInstagramPostId: null,
    instagramBackView: "instagram",
    placeholderApp: null
  });

  let state = loadState();
  if (previewMode === "incoming-call") {
    state = {
      ...defaultState(),
      unlocked: true,
      view: "incoming-call",
      storyDate: "2026-12-07",
      storyTime: "00:26",
      activeThreadId: "dirga",
      activeCall: {
        threadId: "dirga",
        scriptId: "dirga_midnight_reconciliation",
        stepIndex: 27,
        time: "00:26",
        storyDate: "2026-12-07",
        afterCallStoryDate: "2026-12-08",
        afterCallStoryTime: "07:05",
        connected: false,
        startedAt: null
      }
    };
  }
  let timers = [];
  const chatRuntime = {
    scheduled: new Set(),
    typing: new Set(),
    draftReady: new Set()
  };
  const storyRuntime = {
    scheduledNotifications: new Set()
  };
  const callRuntime = {
    durationTimer: null
  };

  document.documentElement.style.setProperty("--accent", config.theme.accent);
  document.documentElement.style.setProperty("--accent-soft", config.theme.accentSoft);
  document.documentElement.style.setProperty("--lock-wallpaper", config.theme.lockWallpaper);
  document.documentElement.style.setProperty("--home-wallpaper", config.theme.homeWallpaper);
  document.title = config.meta.title;
  if (demoPin) demoPin.textContent = config.lock.pin;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved) return defaultState();
      const fresh = defaultState();
      const loaded = {
        ...fresh,
        ...saved,
        messages: { ...fresh.messages, ...(saved.messages || {}) },
        chatProgress: { ...fresh.chatProgress, ...(saved.chatProgress || {}) },
        view: saved.unlocked ? "home" : "lock",
        pinVisible: false,
        pinInput: ""
      };
      if ((saved.storyRevision || 0) < 1) {
        const extendedScriptId = "dirga_home_arrival";
        const extendedProgress = loaded.chatProgress?.[extendedScriptId] || 0;
        const extendedLength = config.chatScripts?.[extendedScriptId]?.steps?.length || 0;
        if (extendedProgress < extendedLength) {
          loaded.completedChats = (loaded.completedChats || []).filter((scriptId) => scriptId !== extendedScriptId);
          if (!loaded.activeChatScripts.includes(extendedScriptId)) loaded.activeChatScripts.push(extendedScriptId);
        }
        loaded.storyRevision = 1;
      }
      if ((saved.storyRevision || 0) < 2) {
        const extendedScriptId = "dirga_after_second_meeting";
        const extendedProgress = loaded.chatProgress?.[extendedScriptId] || 0;
        const extendedLength = config.chatScripts?.[extendedScriptId]?.steps?.length || 0;
        if (extendedProgress < extendedLength) {
          loaded.completedChats = (loaded.completedChats || []).filter((scriptId) => scriptId !== extendedScriptId);
          if (!loaded.activeChatScripts.includes(extendedScriptId)) loaded.activeChatScripts.push(extendedScriptId);
        }
        loaded.storyRevision = 2;
      }
      if ((saved.storyRevision || 0) < 3) {
        const oldWrongSendTexts = new Set([
          "GANTENG BANGET???",
          "I'm going to assume that wasn't meant for me",
          "Pak",
          "Tolong hapus dari ingatan",
          "I don't think I can",
          "Itu buat Petra...",
          "I figured",
          "For what it's worth",
          "I was hoping you thought so",
          "Aku gak akan buka WhatsApp lagi",
          "You will"
        ]);
        const oldPetraWrongSendTexts = new Set([
          "Mana fotonya woy",
          "PET",
          "GUE SALAH KIRIM",
          "KE SIAPA",
          "KE ORANGNYA LANGSUNG",
          "HAHAHAHAHAH",
          "GUE SERIUS INI GIMANA",
          "Yaudah sekalian bilang lo suka",
          "Gue block lo ya"
        ]);
        const hadOldWrongSend = (loaded.messages?.dirga || []).some((message) => oldWrongSendTexts.has(message.text))
          || (loaded.messages?.petra || []).some((message) => oldPetraWrongSendTexts.has(message.text));
        loaded.messages.dirga = (loaded.messages?.dirga || []).filter((message) => !oldWrongSendTexts.has(message.text) && !(message.text === "..." && ["22:45", "22:48"].includes(message.time)));
        loaded.messages.petra = (loaded.messages?.petra || []).filter((message) => !oldPetraWrongSendTexts.has(message.text));
        loaded.chatProgress.dirga_after_second_meeting = Math.min(loaded.chatProgress?.dirga_after_second_meeting || 0, config.chatScripts?.dirga_after_second_meeting?.steps?.length || 0);
        ["petra_second_meeting_report", "dirga_wrong_send", "petra_wrong_send"].forEach((scriptId) => {
          loaded.chatProgress[scriptId] = 0;
        });
        const reorderedScripts = new Set(["dirga_after_second_meeting", "petra_second_meeting_report", "dirga_wrong_send", "petra_wrong_send"]);
        loaded.completedChats = (loaded.completedChats || []).filter((scriptId) => !reorderedScripts.has(scriptId));
        loaded.activeChatScripts = (loaded.activeChatScripts || []).filter((scriptId) => !["petra_second_meeting_report", "dirga_wrong_send", "petra_wrong_send"].includes(scriptId));
        if (!loaded.activeChatScripts.includes("dirga_after_second_meeting")) loaded.activeChatScripts.push("dirga_after_second_meeting");
        const reorderedEvents = new Set(["second-meeting-petra-checkin", "wrong-chat-dirga-opening", "wrong-send-petra-follow-up"]);
        loaded.pendingNotifications = (loaded.pendingNotifications || []).filter((event) => !reorderedEvents.has(event.id));
        loaded.deliveredEvents = (loaded.deliveredEvents || []).filter((eventId) => !reorderedEvents.has(eventId));
        if (hadOldWrongSend) {
          loaded.storyDate = "2026-11-28";
          loaded.storyTime = "22:43";
          loaded.calendarMonth = 10;
          loaded.selectedDate = "2026-11-28";
        }
        loaded.storyRevision = 3;
      }
      if ((saved.storyRevision || 0) < 4) {
        const personalScriptId = "dirga_after_work_personal";
        const hadPersonalProgress = (loaded.chatProgress?.[personalScriptId] || 0) > 0 || (loaded.completedChats || []).includes(personalScriptId);
        if (hadPersonalProgress) {
          const oldPersonalTexts = new Set([
            "Makasih tadi, Pak",
            "For what?",
            "Benerin sepatu saya...",
            "You would've tripped",
            "Tetep aja... makasih",
            "You're welcome",
            "Next time wear sensible shoes",
            "Next time jangan bikin saya nemenin lembur",
            "You offered",
            "I know...",
            "And you'd do it again",
            "Jangan pede dulu",
            "Too late"
          ]);
          loaded.messages.dirga = (loaded.messages?.dirga || []).filter((message) => !(String(message.time || "").startsWith("23:") && oldPersonalTexts.has(message.text)));
          loaded.chatProgress[personalScriptId] = 0;
          loaded.completedChats = (loaded.completedChats || []).filter((scriptId) => scriptId !== personalScriptId);
          if (!loaded.activeChatScripts.includes(personalScriptId)) loaded.activeChatScripts.push(personalScriptId);
          loaded.pendingChatActivations = (loaded.pendingChatActivations || []).filter((scriptId) => scriptId !== personalScriptId);
          loaded.storyDate = "2026-11-30";
          loaded.storyTime = "23:36";
          loaded.calendarMonth = 10;
          loaded.selectedDate = "2026-11-30";
        }
        loaded.storyRevision = 4;
      }
      if ((saved.storyRevision || 0) < 5) {
        const datedMessageKeys = new Map();
        const ambiguousMessageKeys = new Set();
        const rememberMessageDate = (text, time, date) => {
          if (!text || !date) return;
          const key = `${text}\u0000${time || ""}`;
          if (datedMessageKeys.has(key) && datedMessageKeys.get(key) !== date) ambiguousMessageKeys.add(key);
          else datedMessageKeys.set(key, date);
        };
        Object.entries(config.chatScripts || {}).forEach(([scriptId, script]) => {
          const date = script.storyDate;
          (script.steps || []).forEach((step) => rememberMessageDate(step.text, step.time, step.storyDate || date));
          const completion = script.onComplete;
          if (completion?.text) rememberMessageDate(completion.text, completion.time, completion.storyDate || date);
        });
        config.threads.forEach((thread) => {
          (loaded.messages?.[thread.id] || []).forEach((message) => {
            if (message.storyDate) return;
            const key = `${message.text || ""}\u0000${message.time || ""}`;
            message.storyDate = !ambiguousMessageKeys.has(key) && datedMessageKeys.get(key)
              ? datedMessageKeys.get(key)
              : thread.initialDate || "2026-11-17";
          });
        });
        loaded.storyRevision = 5;
      }
      if ((saved.storyRevision || 0) < 6) {
        const redateThread = (threadId, initialDate, transitions = {}) => {
          let activeDate = initialDate;
          (loaded.messages?.[threadId] || []).forEach((message) => {
            if (transitions[message.text]) activeDate = transitions[message.text];
            else if (message.storyDate && message.storyDate > activeDate) activeDate = message.storyDate;
            message.storyDate = activeDate;
          });
        };
        redateThread("dirga", "2026-11-17", {
          "I'm downstairs": "2026-11-21",
          "How attached are you to your Saturday plans?": "2026-11-26",
          "I'm here": "2026-11-28",
          "Pak masih di kantor?": "2026-11-30"
        });
        redateThread("petra", "2026-11-17", {
          "Udah kelar jalannya?": "2026-11-28"
        });
        redateThread("maria", "2026-11-17", {
          "Kak, legal copy yang terakhir masih ditunggu malam ini ya": "2026-11-30"
        });
        redateThread("bintang", "2026-11-17");
        redateThread("adelina", "2026-11-17");
        redateThread("mama", "2026-11-17");
        redateThread("satrio", "2026-11-15");
        loaded.storyRevision = 6;
      }
      if ((saved.storyRevision || 0) < 7) {
        const goodCountByDate = {};
        (loaded.messages?.dirga || []).forEach((message) => {
          if (message.text === "Udah... baru masuk") {
            if (message.storyDate === "2026-11-17") message.time = "22:41";
            if (message.storyDate === "2026-11-28") message.time = "22:36";
          }
          if (message.text === "Thank you for tonight") {
            if (message.storyDate === "2026-11-17") message.time = "22:42";
            if (message.storyDate === "2026-11-28") message.time = "22:37";
          }
          if (message.text === "Good") {
            goodCountByDate[message.storyDate] = (goodCountByDate[message.storyDate] || 0) + 1;
            if (message.storyDate === "2026-11-17") message.time = "22:41";
            if (message.storyDate === "2026-11-21") message.time = goodCountByDate[message.storyDate] === 1 ? "19:18" : "19:25";
            if (message.storyDate === "2026-11-28") message.time = "22:43";
          }
        });
        loaded.storyRevision = 7;
      }
      if ((saved.storyRevision || 0) < 8) {
        const morningScript = config.chatScripts?.dirga_morning_check;
        const morningProgress = loaded.chatProgress?.dirga_morning_check || 0;
        const morningWasComplete = (loaded.completedChats || []).includes("dirga_morning_check") || morningProgress >= 10;
        const firstMorningIndex = (loaded.messages?.dirga || []).findIndex((message) => message.storyDate === "2026-12-01");
        if (firstMorningIndex >= 0 || morningProgress > 0) {
          const messages = loaded.messages?.dirga || [];
          const insertionIndex = firstMorningIndex >= 0 ? firstMorningIndex : messages.length;
          const beforeMorning = messages.slice(0, insertionIndex);
          const afterMorning = messages.slice(insertionIndex).filter((message) => message.storyDate !== "2026-12-01");
          const revisedMorning = [{ from: "them", text: "Morning", time: "08:12", storyDate: "2026-12-01" }];
          if (morningWasComplete) {
            revisedMorning.push(...(morningScript?.steps || []).map((step) => ({
              from: step.type === "mc" ? "me" : "them",
              text: step.text,
              time: step.time,
              storyDate: "2026-12-01"
            })));
            loaded.chatProgress.dirga_morning_check = morningScript?.steps?.length || 0;
          } else {
            loaded.chatProgress.dirga_morning_check = 0;
            loaded.completedChats = (loaded.completedChats || []).filter((scriptId) => scriptId !== "dirga_morning_check");
            if (!loaded.activeChatScripts.includes("dirga_morning_check")) loaded.activeChatScripts.push("dirga_morning_check");
            loaded.pendingNotifications = (loaded.pendingNotifications || []).filter((event) => event.id !== "december-meetup-opening");
            loaded.deliveredEvents = (loaded.deliveredEvents || []).filter((eventId) => eventId !== "december-meetup-opening");
            loaded.storyCalendarEvents = (loaded.storyCalendarEvents || []).filter((event) => event.id !== "us-dirga-5-dec");
          }
          loaded.messages.dirga = [...beforeMorning, ...revisedMorning, ...afterMorning];
        }
        loaded.storyRevision = 8;
      }
      if ((saved.storyRevision || 0) < 9) {
        const replacedClarityTexts = new Set([
          "Home?",
          "Udah",
          "Dirga",
          "Yes?",
          "Kamu emang selalu sebaik ini ke semua orang?",
          "No",
          "I don't remember everyone's coffee order or wait downstairs for everyone",
          "I've been trying to make this obvious without making you uncomfortable",
          "Jadi kamu...",
          "I'm pursuing you, yes",
          "Slowly, if you'll let me",
          "Aku gak bilang jangan",
          "Good"
        ]);
        const hadOldClarity = (loaded.messages?.dirga || []).some((message) => (
          message.storyDate === "2026-12-05"
          && replacedClarityTexts.has(message.text)
          && String(message.time || "") >= "22:14"
        )) || (loaded.chatProgress?.dirga_december_clarity || 0) > 0;
        loaded.messages.dirga = (loaded.messages?.dirga || []).filter((message) => !(
          message.storyDate === "2026-12-05"
          && replacedClarityTexts.has(message.text)
          && String(message.time || "") >= "22:14"
        ));
        ["dirga_december_clarity", "petra_december_confession", "dirga_midnight_reconciliation"].forEach((scriptId) => {
          loaded.chatProgress[scriptId] = 0;
        });
        const revisedScripts = new Set(["dirga_december_clarity", "petra_december_confession", "dirga_midnight_reconciliation"]);
        loaded.completedChats = (loaded.completedChats || []).filter((scriptId) => !revisedScripts.has(scriptId));
        loaded.activeChatScripts = (loaded.activeChatScripts || []).filter((scriptId) => !revisedScripts.has(scriptId));
        loaded.pendingChatActivations = (loaded.pendingChatActivations || []).filter((scriptId) => !revisedScripts.has(scriptId));
        const revisedEvents = new Set(["december-meetup-home-check", "december-petra-confession-check"]);
        loaded.pendingNotifications = (loaded.pendingNotifications || []).filter((event) => !revisedEvents.has(event.id));
        loaded.deliveredEvents = (loaded.deliveredEvents || []).filter((eventId) => !revisedEvents.has(eventId));
        loaded.pendingViewTransitions = [];
        loaded.activeCall = null;
        loaded.storyCalendarEvents = (loaded.storyCalendarEvents || []).filter((event) => event.id !== "singapore-briefing-8-dec");
        if (hadOldClarity) {
          loaded.storyDate = "2026-12-05";
          loaded.storyTime = "18:11";
          loaded.calendarMonth = 11;
          loaded.selectedDate = "2026-12-05";
        }
        loaded.storyRevision = 9;
      }
      if ((saved.storyRevision || 0) < 10) {
        Object.keys(loaded.messages || {}).forEach((threadId) => {
          loaded.messages[threadId] = (loaded.messages[threadId] || []).filter((message) => message.type !== "voice_call");
        });
        loaded.storyRevision = 10;
      }
      if ((saved.storyRevision || 0) < 11) {
        const existingCalls = loaded.callHistory || [];
        const existingIds = new Set(existingCalls.map((call) => call.id).filter(Boolean));
        loaded.callHistory = [
          ...existingCalls,
          ...seededCallHistory().filter((call) => !existingIds.has(call.id))
        ];
        loaded.storyRevision = 11;
      }
      const messageTextMigrations = {
        "Harusnya bisaa, gue cek kerjaan dulu ya 😭": "Harusnya bisaa, gue cek kerjaan dulu yaa",
        "Ya jangan aneh aneh 😭": "Ya jangan aneh aneh...",
        "Pet... gue barusan diajak dinner sama Pak Dirga 😭": "Pet... gue barusan diajak dinner sama Pak Dirga",
        "Gue juga masih proses 😭": "Gue juga masih proses ini...",
        "Belum, baru jalan": "Belum... baru jalan",
        "I will": "I willl",
        "Dramatis banget Pak, baru juga jalan": "Dramatis banget Pak... saya baru telat ngabarin dikit",
        "Dramatis banget Pak... aku baru telat ngabarin dikit": "Dramatis banget Pak... saya baru telat ngabarin dikit",
        "Iya... aku juga mau": "Iya... saya juga mau",
        "Aku baru mau turun...": "Saya baru mau turun...",
        "Harusnya aku yang bilang makasih...": "Harusnya saya yang bilang makasih...",
        "Aku gak akan buka WhatsApp lagi": "Saya gak akan buka WhatsApp lagi",
        "Aku temenin deh": "Saya temenin deh",
        "I know... tapi aku mau": "I know... tapi saya mau",
        "Next time jangan bikin saya nemenin lembur": "Next time jangan bikin aku nemenin lembur",
        "I remembered eventually 😭": "I remembered eventually... technically",
        "You too... makasih buat hari ini": "You too... makasih yaa buat hari ini",
        "Iya... nice": "Iya... nice banget malah",
        "Enggaaa 😭": "Enggaaa, bukan gitu maksudnya"
      };
      Object.values(loaded.messages || {}).flat().forEach((message) => {
        if (messageTextMigrations[message.text]) message.text = messageTextMigrations[message.text];
        if (message.storyDate === "2026-12-05" && message.text === "I'm downstairs") message.time = "18:09";
      });
      let downstairsCount = 0;
      (loaded.messages?.dirga || []).forEach((message) => {
        if (message.text === "I'm downstairs") downstairsCount += 1;
        if (message.text === "I'm downstairs" && downstairsCount >= 2) {
          message.storyDate = "2026-12-05";
          message.time = "18:09";
        }
      });
      const petraMessages = loaded.messages?.petra || [];
      petraMessages.forEach((message) => {
        if (message.text === "Lo mau ngopi sore gak?") message.text = "Lo free Sabtu gak? Ngopi yuk";
        if (message.text === "Gue liat kerjaan dulu yaa 😭") message.text = "Harusnya bisaa, gue cek kerjaan dulu ya 😭";
      });
      const satrioMessages = loaded.messages?.satrio || [];
      satrioMessages.forEach((message) => {
        if (message.text === "Jumat, nanti gue cek lagi di kalender kantor") message.text = "Tanggal 17. Gue cek lagi di kalender kantor ya";
      });
      (loaded.storyCalendarEvents || []).forEach((event) => {
        if (event.id === "dinner-dirga-17-nov") event.title = "Dinner with Pak Dirga";
        if (event.id === "coffee-dirga-21-nov") event.title = "Coffee with ?";
      });
      const dirgaStoryTimes = {
        "Sudah masuk?": "22:41",
        "Sama samaa": "22:42",
        "I realized something": "22:43",
        "Apa?": "22:43",
        "Time moves differently outside the office": "22:44",
        "Dinner tadi rasanya terlalu cepat selesai": "22:44",
        "Maksudnya...?": "22:45",
        "I don't think one evening was enough": "22:45",
        "Pak Dirga lagi minta hadiah tambahan ya?": "22:46",
        "That depends": "22:46",
        "Kalau saya minta waktu kamu lagi, does it still count as a birthday gift?": "22:47",
        "Kalau weekend... mungkin masih bisa": "22:48",
        "Saturday, then": "22:48",
        "Cepet banget mutusinnya": "22:49",
        "You said maybe": "22:49",
        "Saya memilih dengar bagian yang saya suka": "22:50",
        "I'm downstairs": "15:52",
        "You said four": "15:52",
        "It is 3:52": "15:52",
        "Exactly": "15:53",
        "Eight minutes is not that early": "15:53",
        "Take your time": "15:53",
        "Home yet?": "18:42",
        "Belum... baru jalan": "18:42",
        "Alright": "18:43",
        "Let me know when you get home": "18:43",
        "I willl": "18:44",
        "Still on the road?": "19:17",
        "Baru sampeee": "19:17",
        "I was about to call": "19:18",
        "Says the person who promised to text": "19:20",
        "I remembered eventually... technically": "19:20",
        "Barely": "19:21",
        "Get some rest": "19:21",
        "You too... makasih yaa buat hari ini": "19:22",
        "I should be thanking you": "19:22",
        "Today was nice": "19:23",
        "Iya... nice banget malah": "19:23",
        "That sounded reluctant": "19:24",
        "Enggaaa, bukan gitu maksudnya": "19:24",
        "Because I was hoping we could do it again": "19:25"
      };
      (loaded.messages?.dirga || []).forEach((message) => {
        if (message.text === "You home yet or should I start worrying") message.text = "Still on the road?";
        if (message.storyDate === "2026-12-05" && message.text === "I'm downstairs") message.time = "18:09";
        else if (dirgaStoryTimes[message.text]) message.time = dirgaStoryTimes[message.text];
      });
      (loaded.pendingNotifications || []).forEach((event) => {
        if (event.id === "chapter-3-dirga-home") event.time = "22:41";
        if (event.id === "coffee-dirga-arrival") event.time = "15:52";
        if (event.id === "after-coffee-home-check") event.time = "18:42";
        if (event.id === "home-arrival-follow-up") event.time = "19:17";
      });
      if (!Object.prototype.hasOwnProperty.call(saved, "storyDate") || !Object.prototype.hasOwnProperty.call(saved, "storyTime")) {
        const dirgaMessages = loaded.messages?.dirga || [];
        const hasCoffeeScene = loaded.deliveredEvents?.includes("coffee-dirga-arrival")
          || (loaded.chatProgress?.dirga_coffee_arrival || 0) > 0
          || loaded.completedChats?.includes("dirga_coffee_arrival")
          || dirgaMessages.some((message) => ["I'm downstairs", "You said four", "It is 3:52", "Exactly", "Eight minutes is not that early", "Take your time"].includes(message.text));
        const hasDinnerScene = loaded.deliveredEvents?.includes("chapter-3-dirga-home")
          || (loaded.chatProgress?.dirga_after_dinner || 0) > 0
          || loaded.completedChats?.includes("dirga_after_dinner")
          || dirgaMessages.some((message) => ["Sudah masuk?", "Udah... baru masuk", "Good", "Thank you for tonight", "Saya memilih dengar bagian yang saya suka"].includes(message.text));

        if (hasCoffeeScene) {
          loaded.storyDate = "2026-11-21";
          loaded.storyTime = dirgaMessages.some((message) => ["Exactly", "Eight minutes is not that early", "Take your time"].includes(message.text)) ? "15:53" : "15:52";
        } else if (hasDinnerScene) {
          loaded.storyDate = "2026-11-17";
          const dinnerTimes = dirgaMessages
            .map((message) => dirgaStoryTimes[message.text])
            .filter((time) => time?.startsWith("22:"));
          loaded.storyTime = dinnerTimes.sort().at(-1) || "22:41";
        } else {
          loaded.storyDate = "2026-11-17";
          loaded.storyTime = "10:26";
        }
        loaded.calendarMonth = Number(loaded.storyDate.slice(5, 7)) - 1;
        loaded.selectedDate = loaded.storyDate;
      }
      return loaded;
    } catch (_) {
      return defaultState();
    }
  }

  function saveState() {
    if (previewMode) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, pinInput: "", view: state.unlocked ? state.view : "lock" }));
  }

  function resetStory() {
    clearTimers();
    clearCallDurationTimer();
    chatRuntime.scheduled.clear();
    chatRuntime.typing.clear();
    chatRuntime.draftReady.clear();
    storyRuntime.scheduledNotifications.clear();
    localStorage.removeItem(STORAGE_KEY);
    state = defaultState();
    render();
  }

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function updateClock() {
    statusTime.textContent = normalizeStoryTime(state.storyTime);
    const lockClock = document.querySelector("#lock-clock");
    if (lockClock) lockClock.textContent = statusTime.textContent;
    const lockDate = document.querySelector("#lock-date");
    if (lockDate) lockDate.textContent = formatStoryDate();
  }

  function normalizeStoryTime(value) {
    const match = String(value || "").match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return "10:26";
    return `${String(Math.min(23, Number(match[1]))).padStart(2, "0")}:${String(Math.min(59, Number(match[2]))).padStart(2, "0")}`;
  }

  function storyDateObject(date = state.storyDate, time = state.storyTime) {
    const safeDate = /^\d{4}-\d{2}-\d{2}$/.test(String(date)) ? date : "2026-11-17";
    return new Date(`${safeDate}T${normalizeStoryTime(time)}:00`);
  }

  function formatStoryDate() {
    return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(storyDateObject());
  }

  function storyCalendarParts() {
    const date = storyDateObject();
    return {
      weekday: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date),
      month: new Intl.DateTimeFormat("en-US", { month: "short" }).format(date),
      day: date.getDate()
    };
  }

  function setStoryClock(date, time, options = {}) {
    const nextDate = /^\d{4}-\d{2}-\d{2}$/.test(String(date)) ? date : state.storyDate;
    const dateChanged = nextDate !== state.storyDate;
    state.storyDate = nextDate;
    state.storyTime = normalizeStoryTime(time || state.storyTime);
    if (dateChanged && options.syncCalendar !== false) {
      state.calendarMonth = Number(nextDate.slice(5, 7)) - 1;
      state.selectedDate = nextDate;
    }
    updateClock();
  }

  function advanceStoryMinutes(minutes = 1) {
    const date = storyDateObject();
    date.setMinutes(date.getMinutes() + Math.max(0, Number(minutes) || 0));
    const nextDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const nextTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    setStoryClock(nextDate, nextTime);
  }

  function timeForStoryStep(step) {
    if (step.storyDate || step.time) {
      setStoryClock(step.storyDate || state.storyDate, step.time || state.storyTime);
    } else {
      advanceStoryMinutes(step.advanceMinutes ?? 1);
    }
    return state.storyTime;
  }

  function storyCheckpointReached(checkpoint) {
    if (!checkpoint) return true;
    if ((state.completedChats || []).includes(checkpoint)) return true;
    if (checkpoint === "dirga_coffee_arrival") {
      return (state.messages?.dirga || []).some((message) => message.text === "Take your time");
    }
    return false;
  }

  function storyDateReached(date) {
    return !date || String(state.storyDate || "") >= String(date);
  }

  function reconcileStoryChatMedia() {
    let changed = false;
    (config.storyChatMedia || []).forEach((media) => {
      if (state.deliveredEvents.includes(media.id) || !storyDateReached(media.availableAfterDate) || !storyCheckpointReached(media.availableAfter)) return;
      if (!state.messages[media.threadId]) state.messages[media.threadId] = [];
      state.messages[media.threadId].push({
        from: media.from || "them",
        text: media.text || "Photo",
        time: media.time || state.storyTime,
        imageSrc: media.imageSrc,
        imageAlt: media.imageAlt || "Photo"
      });
      state.deliveredEvents.push(media.id);
      if (!(state.view === "thread" && state.activeThreadId === media.threadId)) {
        state.unread[media.threadId] = (state.unread[media.threadId] || 0) + 1;
      }
      changed = true;
    });
    if (changed) saveState();
  }

  function updateDeviceScale() {
    if (!window.matchMedia("(max-width: 760px)").matches) {
      document.documentElement.style.setProperty("--device-scale", "1");
      return;
    }
    const horizontalRoom = Math.max(240, window.innerWidth - 24);
    const verticalRoom = Math.max(480, window.innerHeight - 24);
    const scale = Math.min(1, horizontalRoom / 390, verticalRoom / 844);
    document.documentElement.style.setProperty("--device-scale", String(scale));
  }

  function render() {
    reconcileStoryChatMedia();
    document.body.dataset.view = state.view;
    if (!state.unlocked || state.view === "lock") renderLock();
    else if (state.view === "home") renderHome();
    else if (state.view === "whatsapp") renderWhatsApp();
    else if (state.view === "messages") renderMessages();
    else if (state.view === "sms-thread") renderSmsThread();
    else if (state.view === "thread") renderThread();
    else if (state.view === "photos") renderPhotos();
    else if (state.view === "album") renderAlbum();
    else if (state.view === "photo") renderPhoto();
    else if (state.view === "calendar") renderCalendar();
    else if (state.view === "notes") renderNotes();
    else if (state.view === "note") renderNote();
    else if (state.view === "spotify") renderSpotify();
    else if (state.view === "instagram") renderInstagram();
    else if (state.view === "instagram-profile") renderInstagramProfile();
    else if (state.view === "instagram-post") renderInstagramPost();
    else if (state.view === "x") renderX();
    else if (state.view === "gmail") renderGmail();
    else if (state.view === "gmail-email") renderGmailEmail();
    else if (state.view === "phone") renderPhone();
    else if (state.view === "incoming-call") renderIncomingCall();
    else if (state.view === "placeholder") renderPlaceholder();
    else if (state.view === "settings") renderSettings();
    updateClock();
    if (state.unlocked) {
      queueMicrotask(() => {
        resumeChatScripts();
        schedulePendingNotifications();
      });
    }
  }

  function renderLock() {
    const filled = state.pinInput.length;
    screen.innerHTML = `
      <section class="view lock-screen" aria-label="Lock Screen">
        <div class="lock-screen__shade"></div>
        <p class="lock-screen__date" id="lock-date">${escapeHtml(formatStoryDate())}</p>
        <time class="lock-screen__time" id="lock-clock">${statusTime.textContent}</time>
        ${state.pinVisible ? pinPanel(filled) : `
          <button class="unlock-button" id="unlock-button" type="button">
            ${escapeHtml(config.lock.hint)}
          </button>`}
      </section>`;

    const showPin = () => {
      state.pinVisible = true;
      state.pinInput = "";
      render();
    };

    document.querySelector("#unlock-button")?.addEventListener("click", showPin);

    const lockScreen = document.querySelector(".lock-screen");
    let swipeStartY = null;
    lockScreen?.addEventListener("pointerdown", (event) => {
      swipeStartY = event.clientY;
    });
    lockScreen?.addEventListener("pointerup", (event) => {
      if (swipeStartY !== null && swipeStartY - event.clientY > 36) showPin();
      swipeStartY = null;
    });

    document.querySelectorAll("[data-pin]").forEach((button) => {
      button.addEventListener("click", () => enterPin(button.dataset.pin));
    });
    document.querySelector("#pin-delete")?.addEventListener("click", deletePin);
  }

  function pinPanel(filled) {
    const digits = [1,2,3,4,5,6,7,8,9,0];
    return `
      <div class="pin-panel" aria-label="Masukkan PIN">
        <h2>Masukkan PIN</h2>
        <div class="pin-dots" aria-label="${filled} dari ${config.lock.pin.length} digit terisi">
          ${Array.from({ length: config.lock.pin.length }, (_, index) => `<span class="${index < filled ? "is-filled" : ""}"></span>`).join("")}
        </div>
        <div class="pin-grid">
          ${digits.map((digit) => `<button type="button" data-pin="${digit}" aria-label="Angka ${digit}"><strong>${digit}</strong></button>`).join("")}
        </div>
        <button class="pin-delete" id="pin-delete" type="button">${filled ? "Hapus" : "Batal"}</button>
      </div>`;
  }

  function enterPin(digit) {
    if (state.pinInput.length >= config.lock.pin.length) return;
    state.pinInput += digit;
    if (state.pinInput.length === config.lock.pin.length) {
      if (state.pinInput === config.lock.pin) {
        state.unlocked = true;
        state.pinVisible = false;
        state.view = "home";
        state.startedAt = Date.now();
        state.pinInput = "";
        saveState();
        render();
        scheduleTimeline();
      } else {
        syncPinPanel();
        const dots = document.querySelector(".pin-dots");
        dots?.classList.add("is-wrong");
        timers.push(setTimeout(() => {
          state.pinInput = "";
          dots?.classList.remove("is-wrong");
          syncPinPanel();
        }, 520));
      }
    } else syncPinPanel();
  }

  function deletePin() {
    if (!state.pinInput) {
      state.pinVisible = false;
      renderLock();
      return;
    }
    state.pinInput = state.pinInput.slice(0, -1);
    syncPinPanel();
  }

  function syncPinPanel() {
    const dots = document.querySelector(".pin-dots");
    if (!dots) return;
    [...dots.children].forEach((dot, index) => dot.classList.toggle("is-filled", index < state.pinInput.length));
    dots.setAttribute("aria-label", `${state.pinInput.length} dari ${config.lock.pin.length} digit terisi`);
    const deleteButton = document.querySelector("#pin-delete");
    if (deleteButton) deleteButton.textContent = state.pinInput ? "Hapus" : "Batal";
  }

  function renderHome() {
    const unreadTotal = Object.values(state.unread).reduce((sum, value) => sum + value, 0);
    const storyCalendar = storyCalendarParts();
    screen.innerHTML = `
      <section class="view home-screen" aria-label="Home Screen">
        <div class="home-widgets" aria-label="Home screen widgets">
          <button class="home-widget" type="button" data-app="calendar" aria-label="Buka Calendar">
            <span class="widget-card calendar-widget">
              <span class="calendar-widget__heading"><b>${escapeHtml(storyCalendar.weekday)}</b><em>${escapeHtml(storyCalendar.month)}</em></span>
              <strong>${storyCalendar.day}</strong>
            </span>
            <small>Calendar</small>
          </button>
          <button class="home-widget" type="button" data-app="weather" aria-label="Buka Weather">
            <span class="widget-card weather-widget">
              <span class="weather-widget__top"><i aria-hidden="true">☁</i><strong>27°</strong><em>☀<br>H:29°<br>L:24°</em></span>
              <span class="weather-widget__copy">Mostly Cloudy<br>Feels Like<br><b>29°</b></span>
            </span>
            <small>Weather</small>
          </button>
        </div>
        <div class="app-grid">
          ${config.apps.map((app) => appIconMarkup(app, app.id === "whatsapp" ? unreadTotal : 0)).join("")}
        </div>
        <div class="dock">
          ${config.dockApps.map((app) => appIconMarkup(app, 0, true)).join("")}
        </div>
      </section>`;

    document.querySelectorAll("[data-app]").forEach((button) => {
      button.addEventListener("click", () => openApp(button.dataset.app));
    });
    bindAppIconFallbacks();
  }

  function appIconMarkup(app, badge = 0, docked = false) {
    const visual = app.iconSrc
      ? `<span class="app-icon__fallback">${escapeHtml(app.icon || "•")}</span><img class="app-icon__image" src="${escapeAttribute(app.iconSrc)}" alt="">`
      : `<span>${escapeHtml(app.icon || "•")}</span>`;
    return `<button class="app-icon ${docked ? "app-icon--docked" : ""} ${app.disabled ? "is-disabled" : ""}" type="button" data-app="${app.id}" aria-label="${app.disabled ? escapeHtml(app.label) : `Buka ${escapeHtml(app.label)}`}"${app.disabled ? " disabled" : ""}>
      <span class="app-icon__tile" style="--app-color:${escapeAttribute(app.color || "#1c1c1e")}">${visual}</span>
      ${badge ? `<b class="badge">${badge}</b>` : ""}
      ${docked ? "" : `<small>${escapeHtml(app.label)}</small>`}
    </button>`;
  }

  function bindAppIconFallbacks() {
    document.querySelectorAll(".app-icon__image").forEach((image) => {
      const showFallback = () => image.classList.add("is-missing");
      if (image.complete && !image.naturalWidth) showFallback();
      image.addEventListener("error", showFallback, { once: true });
    });
  }

  function appHeader(title, backTo = "home") {
    return `<header class="app-header"><button type="button" data-back="${backTo}" aria-label="Kembali">‹</button><h2>${escapeHtml(title)}</h2><span></span></header>`;
  }

  function bindBackButtons() {
    document.querySelectorAll("[data-back]").forEach((button) => {
      button.addEventListener("click", () => {
        const previousView = state.view;
        state.view = button.dataset.back;
        if (!["whatsapp", "thread"].includes(state.view)) activatePendingChatsAfterWhatsAppExit(previousView);
        saveState();
        render();
      });
    });
  }

  function openApp(appId) {
    const directViews = ["calendar", "whatsapp", "messages", "photos", "notes", "spotify", "instagram", "x", "gmail", "phone", "settings"];
    if (directViews.includes(appId)) {
      state.view = appId;
    } else {
      state.placeholderApp = appId;
      state.view = "placeholder";
    }
    saveState();
    render();
  }

  function renderMessages() {
    screen.innerHTML = `
      <section class="view app-view messages-list sms-list">
        ${appHeader("Messages")}
        <div class="app-title"><p>SMS</p><h1>Messages</h1></div>
        <div class="thread-list">
          ${config.smsThreads.map((thread) => {
            const last = thread.messages[thread.messages.length - 1];
            return `<button type="button" class="thread-row" data-sms="${thread.id}">
              <span class="avatar sms-avatar">${escapeHtml(thread.sender.slice(0, 1))}</span>
              <span class="thread-row__copy"><strong>${escapeHtml(thread.name)}</strong><small>${escapeHtml(last?.text || "")}</small></span>
              <span class="thread-row__meta"><time>${escapeHtml(last?.time || "")}</time></span>
            </button>`;
          }).join("")}
        </div>
      </section>`;
    bindBackButtons();
    document.querySelectorAll("[data-sms]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeSmsId = button.dataset.sms;
        state.view = "sms-thread";
        saveState();
        render();
      });
    });
  }

  function renderSmsThread() {
    const thread = config.smsThreads.find((item) => item.id === state.activeSmsId) || config.smsThreads[0];
    screen.innerHTML = `
      <section class="view app-view sms-thread-view">
        ${appHeader(thread.name, "messages")}
        <div class="sms-thread-copy">
          <div class="sms-sender"><span>${escapeHtml(thread.sender.slice(0, 1))}</span><strong>${escapeHtml(thread.name)}</strong><small>${escapeHtml(thread.sender)}</small></div>
          ${thread.messages.map((message) => `<div class="sms-service-bubble"><p>${escapeHtml(message.text)}</p><time>${escapeHtml(message.time)}</time></div>`).join("")}
          <p class="sms-notice">Pesan layanan. Balasan tidak tersedia.</p>
        </div>
      </section>`;
    bindBackButtons();
  }

  function renderWhatsApp() {
    screen.innerHTML = `
      <section class="view app-view whatsapp-list wa-list-view">
        <header class="wa-list-header">
          <div class="wa-list-actions">
            <button type="button" disabled aria-label="More options">•••</button>
            <span>
              <button type="button" disabled aria-label="Camera">
                <svg viewBox="0 0 24 20" aria-hidden="true"><rect x="1.5" y="4" width="21" height="14.5" rx="4"></rect><path d="M7.5 4l1.8-2.5h5.4L16.5 4"></path><circle cx="12" cy="11" r="4"></circle></svg>
              </button>
              <button class="wa-new-chat" type="button" disabled aria-label="New chat">
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12"></path></svg>
              </button>
            </span>
          </div>
          <h1>Chats</h1>
          <div class="wa-search" aria-label="Search chats"><i></i><span>Ask Meta AI or Search</span></div>
          <div class="wa-filter-row" aria-label="Chat filters">
            <button class="is-active" type="button" disabled>All</button>
            <button type="button" disabled>Unread</button>
            <button type="button" disabled>Favorites</button>
            <button type="button" disabled>Groups</button>
          </div>
        </header>
        <div class="wa-list-scroll">
          <div class="wa-archived"><span>□</span><strong>Archived</strong></div>
          <div class="thread-list wa-thread-list">
          ${config.threads.map((thread) => {
            const messages = state.messages[thread.id] || [];
            const last = messages[messages.length - 1];
            const unread = state.unread[thread.id] || 0;
            const scriptedDraft = getChatScriptStep(thread.id);
            const hasDraft = scriptedDraft?.type === "mc";
            return `<button type="button" class="thread-row" data-thread="${thread.id}">
              ${contactAvatarMarkup(thread)}
              <span class="thread-row__copy"><strong>${escapeHtml(thread.name)}</strong><small>${hasDraft ? `<i class="wa-preview-draft">Draft</i>${escapeHtml(scriptedDraft.text)}` : `${last?.from === "me" ? `<i class="wa-preview-check">✓✓</i>` : ""}${escapeHtml(last?.type === "missed_call" ? "Missed voice call" : (last?.text || "Belum ada pesan"))}`}</small></span>
              <span class="thread-row__meta"><time>${escapeHtml(thread.listTime || last?.time || "")}</time>${unread ? `<b>${unread}</b>` : ""}</span>
            </button>`;
          }).join("")}
          </div>
          <p class="wa-encryption"><span class="wa-encryption-lock" aria-hidden="true"><svg viewBox="0 0 14 16"><path d="M4 7V5a3 3 0 0 1 6 0v2"></path><rect x="2" y="7" width="10" height="8" rx="2"></rect><circle cx="7" cy="11" r="1"></circle></svg></span><span>Your personal messages are <strong>end-to-end encrypted</strong></span></p>
        </div>
        <nav class="wa-tabbar" aria-label="WhatsApp tabs">
          <button type="button" disabled><span>${waTabIcon("updates")}</span><small>Updates</small></button>
          <button type="button" disabled><span>${waTabIcon("calls")}</span><small>Calls</small></button>
          <button type="button" disabled><span>${waTabIcon("communities")}</span><small>Communities</small></button>
          <button class="is-active" type="button" disabled><span>${waTabIcon("chats")}</span><small>Chats</small></button>
          <button type="button" disabled><span>${waTabIcon("settings")}</span><small>Settings</small></button>
        </nav>
      </section>`;
    bindContactAvatarFallbacks();
    document.querySelectorAll("[data-thread]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeThreadId = button.dataset.thread;
        state.unread[state.activeThreadId] = 0;
        state.view = "thread";
        saveState();
        render();
      });
    });
  }

  function renderThread() {
    const thread = getThread(state.activeThreadId);
    if (!thread) {
      state.view = "whatsapp";
      render();
      return;
    }
    const messages = state.messages[thread.id] || [];
    const node = state.currentNode ? config.branches[state.currentNode] : null;
    const scriptStep = getChatScriptStep(thread.id);
    const draftReady = scriptStep?.type === "mc" && chatRuntime.draftReady.has(thread.id);
    const mediaDraftReady = draftReady && Boolean(scriptStep.imageSrc);
    const isTyping = chatRuntime.typing.has(thread.id);
    screen.innerHTML = `
      <section class="view app-view chat-view wa-chat-view">
        <header class="wa-chat-header">
          <button class="wa-back" type="button" data-back="whatsapp" aria-label="Kembali ke WhatsApp">‹</button>
          <div class="wa-contact">
            ${contactAvatarMarkup(thread)}
            <span><strong>${escapeHtml(thread.name)}</strong>${isTyping ? `<small class="is-typing">typing…</small>` : ""}</span>
          </div>
          <div class="wa-header-actions" aria-label="Tindakan panggilan">
            <button type="button" aria-label="Video call">
              <svg viewBox="0 0 28 22" aria-hidden="true"><rect x="1" y="3" width="18" height="16" rx="4"></rect><path d="M19 8l7-4v14l-7-4z"></path></svg>
            </button>
            <button type="button" aria-label="Voice call">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2l4 5-3 3c2 4 4 6 8 8l3-3 4 4c-1 3-3 4-6 3C9 20 4 15 2 7 1 4 3 2 7 2z"></path></svg>
            </button>
          </div>
        </header>
        <div class="chat-messages" id="chat-messages">
          ${messages.map((message, index) => `${index === 0 || messages[index - 1]?.storyDate !== message.storyDate
            ? `<p class="day-divider">${escapeHtml(formatWhatsAppDay(message.storyDate, thread.dayLabel))}</p>`
            : ""}${message.type === "missed_call" ? `
            <div class="wa-call-event" role="status" aria-label="Missed voice call from ${escapeAttribute(thread.name)}">
              <span class="wa-call-event__icon">☎</span>
              <span><strong>Missed voice call</strong><small>${escapeHtml(message.time || currentTime())}</small></span>
            </div>` : message.type === "voice_call" ? `
            <div class="wa-call-event wa-call-event--answered" role="status" aria-label="WhatsApp voice call with ${escapeAttribute(thread.name)}">
              <span class="wa-call-event__icon">☎</span>
              <span><strong>Voice call</strong><small>${escapeHtml(message.time || currentTime())}</small></span>
            </div>` : `
            <div class="bubble-row bubble-row--${message.from}">
              <div class="wa-bubble ${message.imageSrc ? "wa-bubble--image" : ""}">
                ${message.imageSrc ? `<img class="wa-message-image" src="${escapeAttribute(message.imageSrc)}" alt="${escapeAttribute(message.imageAlt || "Photo")}">` : ""}
                ${message.text ? `<span class="wa-message-text">${escapeHtml(message.text).replaceAll("\n", "<br>")}</span>` : ""}
                <span class="wa-message-meta"><time>${escapeHtml(message.time || currentTime())}</time>${message.from === "me" ? `<b aria-label="Dibaca">✓✓</b>` : ""}</span>
              </div>
            </div>`}`).join("")}
          ${isTyping ? `<div class="bubble-row bubble-row--them"><div class="wa-bubble wa-typing-bubble" aria-label="${escapeAttribute(thread.name)} sedang mengetik"><i></i><i></i><i></i></div></div>` : ""}
          ${state.ending ? `<div class="ending-card"><span>ENDING</span><strong>${escapeHtml(state.ending)}</strong><small>Cerita tersimpan di perangkat ini.</small></div>` : ""}
        </div>
        <div class="wa-bottom">
          ${node && node.choices?.length && !state.ending ? `
            <div class="choice-dock">
              <p>${escapeHtml(node.prompt || "Pilih balasan")}</p>
              <div class="choice-list">${node.choices.map((choice, index) => `<button type="button" data-choice="${index}">${escapeHtml(choice.label)}</button>`).join("")}</div>
            </div>` : ""}
          <div class="wa-composer ${draftReady ? "wa-composer--draft" : ""} ${mediaDraftReady ? "wa-composer--media" : ""}">
            <button class="wa-plus" type="button" aria-label="Tambahkan lampiran">＋</button>
            <div class="wa-input ${draftReady ? "is-draft" : ""} ${mediaDraftReady ? "has-media" : ""}" aria-label="Message">${mediaDraftReady ? `<img class="wa-draft-image" src="${escapeAttribute(scriptStep.imageSrc)}" alt="${escapeAttribute(scriptStep.imageAlt || "Photo")}">` : ""}<span>${escapeHtml(draftReady ? scriptStep.text : "Message")}</span><i class="wa-sticker-icon" aria-hidden="true"></i></div>
            ${draftReady ? `
              <button class="wa-send" id="wa-send" type="button" aria-label="Send message"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 4.5 16.5 10 4.5 15.5 6.8 10Z"></path></svg></button>` : `
              <button class="wa-camera" type="button" aria-label="Camera">
                <svg viewBox="0 0 26 22" aria-hidden="true"><rect x="1" y="4" width="24" height="17" rx="5"></rect><path d="M8 4l2-3h6l2 3"></path><circle cx="13" cy="12.5" r="5"></circle></svg>
              </button>
              <button class="wa-mic" type="button" aria-label="Voice message">
                <svg viewBox="0 0 22 26" aria-hidden="true"><rect x="6" y="1" width="10" height="16" rx="5"></rect><path d="M2 12c0 12 18 12 18 0M11 22v3M6 25h10"></path></svg>
              </button>`}
          </div>
        </div>
      </section>`;
    bindBackButtons();
    bindContactAvatarFallbacks();
    document.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => chooseReply(Number(button.dataset.choice)));
    });
    document.querySelector("#wa-send")?.addEventListener("click", () => sendScriptedMessage(thread.id));
    requestAnimationFrame(() => {
      const list = document.querySelector("#chat-messages");
      if (list) list.scrollTop = list.scrollHeight;
      runChatScriptStep(thread.id);
    });
  }

  function formatWhatsAppDay(date, fallback = "TODAY") {
    if (!date) return fallback;
    if (date === state.storyDate) return "TODAY";
    const value = storyDateObject(date, "12:00");
    if (Number.isNaN(value.getTime())) return fallback;
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(value).toUpperCase();
  }

  function chatScriptTarget(scriptId) {
    return config.chatScripts?.[scriptId]?.threadId || scriptId;
  }

  function getActiveChatScriptId(threadId) {
    return state.activeChatScripts.find((scriptId) => {
      const script = config.chatScripts?.[scriptId];
      if (!script || chatScriptTarget(scriptId) !== threadId) return false;
      return Boolean(script.steps?.[state.chatProgress?.[scriptId] || 0]);
    }) || null;
  }

  function getChatScriptStep(threadId) {
    const scriptId = getActiveChatScriptId(threadId);
    if (!scriptId) return null;
    return config.chatScripts[scriptId]?.steps?.[state.chatProgress?.[scriptId] || 0] || null;
  }

  function advanceChatScript(threadId) {
    const scriptId = getActiveChatScriptId(threadId);
    if (!scriptId) return;
    state.chatProgress[scriptId] = (state.chatProgress[scriptId] || 0) + 1;
    chatRuntime.scheduled.delete(threadId);
    chatRuntime.typing.delete(threadId);
    chatRuntime.draftReady.delete(threadId);
    saveState();
    queueChatCompletion(scriptId);
  }

  function queueChatCompletion(scriptId) {
    const script = config.chatScripts?.[scriptId];
    if (script?.steps?.[state.chatProgress?.[scriptId] || 0] || state.completedChats.includes(scriptId)) return;
    state.completedChats.push(scriptId);
    const completion = script?.onComplete;
    ensureChatCompletionEffects(scriptId, completion);
    saveState();
    schedulePendingNotifications();
  }

  function ensureChatCompletionEffects(scriptId, completion) {
    if (!completion) return false;
    let changed = false;
    if (completion.activateChatOnExit && !state.activeChatScripts.includes(completion.activateChatOnExit) && !state.pendingChatActivations.includes(completion.activateChatOnExit)) {
      state.pendingChatActivations.push(completion.activateChatOnExit);
      changed = true;
    }
    if (completion.exitTransition
      && !state.deliveredEvents.includes(completion.exitTransition.id)
      && !(state.pendingViewTransitions || []).some((transition) => transition.id === completion.exitTransition.id)) {
      state.pendingViewTransitions.push({ ...completion.exitTransition });
      changed = true;
    }
    (completion.calendarEvents || []).forEach((event) => {
      const savedEvent = (state.storyCalendarEvents || []).find((item) => item.id === event.id);
      if (savedEvent) {
        const before = JSON.stringify(savedEvent);
        Object.assign(savedEvent, event);
        if (JSON.stringify(savedEvent) !== before) changed = true;
      } else {
        state.storyCalendarEvents.push({ ...event });
        changed = true;
      }
    });
    const id = completion.id || `${scriptId}-complete`;
    if (completion.activateChatScript && state.deliveredEvents.includes(id) && !state.activeChatScripts.includes(completion.activateChatScript) && !state.completedChats.includes(completion.activateChatScript)) {
      state.activeChatScripts.push(completion.activateChatScript);
      changed = true;
    }
    const queuedEvent = state.pendingNotifications.find((event) => event.id === id);
    if (queuedEvent) {
      Object.assign(queuedEvent, completion, { id, dueAt: queuedEvent.dueAt || Date.now() + Math.max(250, completion.afterMs || 0) });
      changed = true;
    } else if (completion.threadId && completion.text && !state.deliveredEvents.includes(id)) {
      state.pendingNotifications.push({
        ...completion,
        id,
        dueAt: Date.now() + Math.max(250, completion.afterMs || 0)
      });
      changed = true;
    }
    return changed;
  }

  function reconcileCompletedChatTriggers() {
    let changed = false;
    Object.entries(config.chatScripts || {}).forEach(([scriptId, script]) => {
      const progress = state.chatProgress?.[scriptId] || 0;
      if (progress < (script.steps?.length || 0)) return;
      if (!state.completedChats.includes(scriptId)) {
        state.completedChats.push(scriptId);
        changed = true;
      }
      if (ensureChatCompletionEffects(scriptId, script.onComplete)) changed = true;
    });
    if (changed) saveState();
  }

  function triggerMessageExists(trigger) {
    return Boolean((state.messages?.[trigger.threadId] || []).some((message) => (
      message.from === "them" && message.text === trigger.text
    )));
  }

  function repairDeliveredTrigger(trigger) {
    if (!trigger?.id || !trigger.threadId || !trigger.text || !state.deliveredEvents.includes(trigger.id)) return false;
    let changed = false;

    // Older builds could save an event as delivered before its WhatsApp message
    // and follow-up script were committed. Put only that interrupted event back
    // into the queue; existing messages are never duplicated.
    if (!triggerMessageExists(trigger)) {
      state.deliveredEvents = state.deliveredEvents.filter((id) => id !== trigger.id);
      state.pendingNotifications = state.pendingNotifications.filter((event) => event.id !== trigger.id);
      storyRuntime.scheduledNotifications.delete(trigger.id);
      return true;
    }

    if (trigger.activateChatScript
      && !state.activeChatScripts.includes(trigger.activateChatScript)
      && !state.completedChats.includes(trigger.activateChatScript)) {
      state.activeChatScripts.push(trigger.activateChatScript);
      changed = true;
    }
    return changed;
  }

  function repairStoryTriggers() {
    let changed = false;
    Object.entries(config.chatScripts || {}).forEach(([scriptId, script]) => {
      if (!state.completedChats.includes(scriptId)) return;
      if (repairDeliveredTrigger({ ...script.onComplete, id: script.onComplete?.id || `${scriptId}-complete` })) changed = true;
    });
    (state.storyCalendarEvents || []).forEach((event) => {
      if (repairDeliveredTrigger(event.trigger)) changed = true;
    });
    if (changed) saveState();
    return changed;
  }

  function resumeChatScripts() {
    const threadIds = [...new Set(state.activeChatScripts.map(chatScriptTarget))];
    threadIds.forEach((threadId) => {
      const step = getChatScriptStep(threadId);
      if (step && step.type !== "mc") runChatScriptStep(threadId);
    });
  }

  function activatePendingChatsAfterWhatsAppExit(previousView) {
    reconcileCompletedChatTriggers();
    if (["whatsapp", "thread"].includes(previousView) && state.pendingChatActivations.length) {
      state.pendingChatActivations.forEach((threadId) => {
        if (!state.activeChatScripts.includes(threadId)) state.activeChatScripts.push(threadId);
      });
      state.pendingChatActivations = [];
      saveState();
    }
    applyPendingViewTransitions(previousView);
  }

  function applyPendingViewTransitions(previousView) {
    const transitions = state.pendingViewTransitions || [];
    const matching = transitions.filter((transition) => (transition.fromViews || []).includes(previousView));
    if (!matching.length) return false;
    state.pendingViewTransitions = transitions.filter((transition) => !matching.includes(transition));
    matching.forEach((transition) => {
      if (!state.deliveredEvents.includes(transition.id)) state.deliveredEvents.push(transition.id);
      setStoryClock(transition.storyDate || state.storyDate, transition.storyTime || state.storyTime);
      if (transition.activateChatScript
        && !state.activeChatScripts.includes(transition.activateChatScript)
        && !state.completedChats.includes(transition.activateChatScript)) {
        state.activeChatScripts.push(transition.activateChatScript);
      }
      if (transition.armTransition
        && !state.deliveredEvents.includes(transition.armTransition.id)
        && !state.pendingViewTransitions.some((item) => item.id === transition.armTransition.id)) {
        state.pendingViewTransitions.push({ ...transition.armTransition });
      }
    });
    saveState();
    return true;
  }

  function schedulePendingNotifications() {
    (state.pendingNotifications || []).forEach((event) => {
      if (state.deliveredEvents.includes(event.id) || storyRuntime.scheduledNotifications.has(event.id)) return;
      if (notificationIsBlocked(event)) return;
      if (event.delayAfterExit && !event.exitDelayStarted) {
        event.exitDelayStarted = true;
        event.dueAt = Date.now() + Math.max(250, event.afterMs || 0);
        saveState();
      }
      storyRuntime.scheduledNotifications.add(event.id);
      timers.push(setTimeout(() => deliverPendingNotification(event.id), Math.max(80, event.dueAt - Date.now())));
    });
  }

  function deliverPendingNotification(eventId) {
    storyRuntime.scheduledNotifications.delete(eventId);
    const index = state.pendingNotifications.findIndex((event) => event.id === eventId);
    if (index < 0 || state.deliveredEvents.includes(eventId)) return;
    if (notificationIsBlocked(state.pendingNotifications[index])) return;
    const [event] = state.pendingNotifications.splice(index, 1);
    state.deliveredEvents.push(eventId);
    setStoryClock(event.storyDate || state.storyDate, event.time || state.storyTime);
    if (event.activateChatScript && !state.activeChatScripts.includes(event.activateChatScript) && !state.completedChats.includes(event.activateChatScript)) {
      state.activeChatScripts.push(event.activateChatScript);
    }
    const isOpen = state.view === "thread" && state.activeThreadId === event.threadId;
    addMessage(event.threadId, {
      from: "them",
      text: event.text,
      time: state.storyTime
    }, !isOpen);
    if (!isOpen) showToast(event);
    if (isOpen || ["home", "whatsapp", "thread"].includes(state.view)) render();
  }

  function notificationIsBlocked(event) {
    const blockedViews = event.blockedViews || (event.requireAppExit ? ["whatsapp", "thread"] : []);
    return blockedViews.includes(state.view);
  }

  function queueCalendarTriggers() {
    let changed = false;
    (state.storyCalendarEvents || []).forEach((calendarEvent) => {
      const trigger = calendarEvent.trigger;
      if (!trigger) return;
      if (state.deliveredEvents.includes(trigger.id)) {
        if (trigger.activateChatScript
          && triggerMessageExists(trigger)
          && !state.activeChatScripts.includes(trigger.activateChatScript)
          && !state.completedChats.includes(trigger.activateChatScript)) {
          state.activeChatScripts.push(trigger.activateChatScript);
          changed = true;
        }
        return;
      }
      const queuedTrigger = state.pendingNotifications.find((event) => event.id === trigger.id);
      if (queuedTrigger) {
        const before = JSON.stringify(queuedTrigger);
        Object.assign(queuedTrigger, trigger, {
          dueAt: queuedTrigger.dueAt || Date.now() + Math.max(250, trigger.afterMs || 0)
        });
        if (JSON.stringify(queuedTrigger) !== before) changed = true;
        return;
      }
      state.pendingNotifications.push({
        ...trigger,
        dueAt: Date.now() + Math.max(250, trigger.afterMs || 0)
      });
      changed = true;
    });
    if (changed) saveState();
  }

  function sendScriptedMessage(threadId) {
    const step = getChatScriptStep(threadId);
    if (step?.type !== "mc" || !chatRuntime.draftReady.has(threadId)) return;
    addMessage(threadId, {
      from: "me",
      text: step.text,
      time: timeForStoryStep(step),
      imageSrc: step.imageSrc,
      imageAlt: step.imageAlt
    }, false);
    advanceChatScript(threadId);
    render();
  }

  function waTabIcon(name) {
    if (name === "updates") return `<svg viewBox="0 0 28 28" aria-hidden="true"><path d="M20.6 7.2A9.2 9.2 0 0 0 6.5 8.4M4.7 11.2A9.2 9.2 0 0 0 18.8 22M21.5 19.6A9.2 9.2 0 0 0 23.2 10"></path><circle cx="14" cy="14" r="5.4"></circle><circle class="wa-updates-dot" cx="23" cy="5" r="2.5"></circle></svg>`;
    if (name === "calls") return `<svg viewBox="0 0 28 28" aria-hidden="true"><path d="M8.3 3.8l3 5.4-2.2 2.2c1.7 3.6 4.1 6 7.7 7.7l2.2-2.2 5.4 3c.4.2.6.7.4 1.1-.8 2.2-2.9 3.6-5.3 3.3C11.1 23.2 4.8 16.9 3.7 8.5 3.4 6.1 4.8 4 7 3.2c.5-.1 1 .1 1.3.6z"></path></svg>`;
    if (name === "communities") return `<svg viewBox="0 0 32 28" aria-hidden="true"><circle cx="16" cy="7" r="3.5"></circle><circle cx="6.5" cy="10" r="3"></circle><circle cx="25.5" cy="10" r="3"></circle><path d="M9.5 23v-2.1c0-4 2.6-6.7 6.5-6.7s6.5 2.7 6.5 6.7V23H9.5zM1.5 22v-1.6c0-3.1 2-5.3 5-5.3 1.3 0 2.4.4 3.3 1.1M30.5 22v-1.6c0-3.1-2-5.3-5-5.3-1.3 0-2.4.4-3.3 1.1"></path></svg>`;
    if (name === "chats") return `<svg viewBox="0 0 30 28" aria-hidden="true"><path class="wa-chat-back" d="M16.8 6.2c5.8 0 10.2 3.6 10.2 8.2 0 2.6-1.4 4.8-3.7 6.3l.7 3.4-3.9-1.8c-1 .2-2.1.4-3.3.4-5.8 0-10.2-3.6-10.2-8.2s4.4-8.3 10.2-8.3z"></path><path class="wa-chat-front" d="M12.2 3.1C6.4 3.1 2 6.7 2 11.3c0 2.5 1.4 4.8 3.7 6.3L5 21l3.9-1.8c1 .3 2.1.4 3.3.4 5.8 0 10.2-3.6 10.2-8.2S18 3.1 12.2 3.1z"></path></svg>`;
    return `<svg viewBox="0 0 28 28" aria-hidden="true"><path d="M11.8 2.8h4.4l.7 3a9.6 9.6 0 0 1 2.1.9l2.6-1.6 3.1 3.1-1.6 2.6c.4.7.7 1.4.9 2.2l3 .7v4.4l-3 .7a9 9 0 0 1-.9 2.1l1.6 2.6-3.1 3.1L19 25a9.6 9.6 0 0 1-2.1.9l-.7 3h-4.4l-.7-3A9.6 9.6 0 0 1 9 25l-2.6 1.6-3.1-3.1 1.6-2.6a9.6 9.6 0 0 1-.9-2.1l-3-.7v-4.4l3-.7c.2-.8.5-1.5.9-2.2L3.3 8.2l3.1-3.1L9 6.7a9.6 9.6 0 0 1 2.1-.9l.7-3z"></path><circle cx="14" cy="15.9" r="4.3"></circle></svg>`;
  }

  function runChatScriptStep(threadId) {
    const step = getChatScriptStep(threadId);
    if (!step || chatRuntime.scheduled.has(threadId)) return;
    if (step.requireAppExit && ["whatsapp", "thread"].includes(state.view)) return;

    if (step.type === "mc") {
      if (chatRuntime.draftReady.has(threadId)) return;
      chatRuntime.scheduled.add(threadId);
      timers.push(setTimeout(() => {
        chatRuntime.scheduled.delete(threadId);
        chatRuntime.draftReady.add(threadId);
        if (state.view === "thread" && state.activeThreadId === threadId) render();
      }, Math.max(80, step.waitBefore || 0)));
      return;
    }

    if (step.type === "them") {
      chatRuntime.scheduled.add(threadId);
      timers.push(setTimeout(() => {
        chatRuntime.typing.add(threadId);
        if (state.view === "thread" && state.activeThreadId === threadId) render();
        timers.push(setTimeout(() => {
          const isOpen = state.view === "thread" && state.activeThreadId === threadId;
          addMessage(threadId, { from: "them", text: step.text, time: timeForStoryStep(step) }, !isOpen);
          advanceChatScript(threadId);
          if (!isOpen) showToast({ threadId, text: step.text, notificationTitle: getThread(threadId)?.name });
          if (isOpen || ["home", "whatsapp"].includes(state.view)) render();
          else runChatScriptStep(threadId);
        }, Math.max(350, step.typingMs || 1200)));
      }, Math.max(80, step.waitBefore || 0)));
      return;
    }

    if (step.type === "missed_call") {
      chatRuntime.scheduled.add(threadId);
      timers.push(setTimeout(() => {
        const isOpen = state.view === "thread" && state.activeThreadId === threadId;
        addMessage(threadId, { from: "system", type: "missed_call", text: "Missed voice call", time: timeForStoryStep(step) }, !isOpen);
        advanceChatScript(threadId);
        if (!isOpen) showToast({ threadId, text: "Missed voice call", notificationTitle: getThread(threadId)?.name });
        if (isOpen || ["home", "whatsapp"].includes(state.view)) render();
        else runChatScriptStep(threadId);
      }, Math.max(80, step.waitBefore || 0)));
      return;
    }

    if (step.type === "incoming_call") {
      const scriptId = getActiveChatScriptId(threadId);
      chatRuntime.scheduled.add(threadId);
      timers.push(setTimeout(() => {
        chatRuntime.scheduled.delete(threadId);
        state.activeCall = {
          threadId,
          scriptId,
          stepIndex: state.chatProgress?.[scriptId] || 0,
          time: timeForStoryStep(step),
          storyDate: step.storyDate || state.storyDate,
          afterCallStoryDate: step.afterCallStoryDate,
          afterCallStoryTime: step.afterCallStoryTime,
          connected: false,
          startedAt: null
        };
        state.view = "incoming-call";
        saveState();
        render();
      }, Math.max(80, step.waitBefore || 0)));
    }
  }

  function chooseReply(choiceIndex) {
    const node = config.branches[state.currentNode];
    const choice = node?.choices?.[choiceIndex];
    if (!choice) return;
    const threadId = state.activeThreadId;
    addMessage(threadId, { from: "me", text: choice.reply, time: currentTime() }, false);
    state.currentNode = null;
    saveState();
    render();

    let delay = 650;
    choice.responses.forEach((text, index) => {
      timers.push(setTimeout(() => {
        addMessage(threadId, { from: "them", text, time: currentTime() }, state.view !== "thread");
        if (state.view === "thread") render();
        if (index === choice.responses.length - 1) {
          state.currentNode = choice.next;
          if (choice.ending) state.ending = choice.ending;
          saveState();
          if (state.view === "thread") render();
        }
      }, delay));
      delay += 900 + Math.min(text.length * 18, 900);
    });
  }

  function renderCalendar() {
    const calendar = config.calendar;
    const calendarEvents = [...calendar.events, ...(state.storyCalendarEvents || [])];
    const year = calendar.year;
    const month = Math.max(0, Math.min(11, state.calendarMonth));
    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(year, month, 1));
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();
    const cells = [];

    for (let index = 0; index < 42; index += 1) {
      const dayNumber = index - firstWeekday + 1;
      let displayDay = dayNumber;
      let currentMonth = true;
      if (dayNumber < 1) {
        displayDay = daysInPreviousMonth + dayNumber;
        currentMonth = false;
      } else if (dayNumber > daysInMonth) {
        displayDay = dayNumber - daysInMonth;
        currentMonth = false;
      }
      const dateKey = currentMonth ? `${year}-${String(month + 1).padStart(2, "0")}-${String(displayDay).padStart(2, "0")}` : "";
      const events = dateKey ? calendarEvents.filter((event) => event.date === dateKey) : [];
      const selected = dateKey === state.selectedDate;
      const today = dateKey === state.storyDate;
      cells.push(`<button type="button" class="calendar-day ${currentMonth ? "" : "is-outside"} ${selected ? "is-selected" : ""} ${today ? "is-today" : ""}" ${dateKey ? `data-calendar-date="${dateKey}"` : "disabled"}>
        <span>${displayDay}</span>
        ${events.length ? `<i>${events.slice(0, 3).map((event) => `<b style="--event-color:${escapeAttribute(event.color)}"></b>`).join("")}</i>` : ""}
      </button>`);
    }

    const selectedEvents = calendarEvents.filter((event) => event.date === state.selectedDate);
    const selectedDate = new Date(`${state.selectedDate}T12:00:00`);
    const selectedLabel = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(selectedDate);

    screen.innerHTML = `
      <section class="view app-view calendar-view">
        <header class="calendar-topbar">
          <button type="button" data-back="home" class="calendar-year-back">‹ <span>${year}</span></button>
          <div><button type="button" aria-label="List view">▤</button><button type="button" aria-label="Search">⌕</button><button type="button" aria-label="Add event">＋</button></div>
        </header>
        <div class="calendar-scroll">
          <div class="calendar-month-title"><button type="button" data-month-step="-1" ${month === 0 ? "disabled" : ""}>‹</button><h1>${monthName}</h1><button type="button" data-month-step="1" ${month === 11 ? "disabled" : ""}>›</button></div>
          <div class="calendar-weekdays">${["S","M","T","W","T","F","S"].map((day) => `<span>${day}</span>`).join("")}</div>
          <div class="calendar-grid">${cells.join("")}</div>
          <section class="calendar-events">
            <h2>${escapeHtml(selectedLabel)}</h2>
            ${selectedEvents.length ? selectedEvents.map((event) => `<article style="--event-color:${escapeAttribute(event.color)}"><span></span><div><strong>${escapeHtml(event.title)}</strong><small>${escapeHtml(event.type)}</small></div><time>${escapeHtml(event.time)}</time></article>`).join("") : `<div class="calendar-no-events">No Events</div>`}
          </section>
        </div>
        <footer class="calendar-bottom"><button type="button" id="calendar-today">Today</button><button type="button">Calendars</button><button type="button">Inbox</button></footer>
      </section>`;

    bindBackButtons();
    document.querySelectorAll("[data-calendar-date]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedDate = button.dataset.calendarDate;
        saveState();
        render();
      });
    });
    document.querySelectorAll("[data-month-step]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextMonth = Math.max(0, Math.min(11, state.calendarMonth + Number(button.dataset.monthStep)));
        state.calendarMonth = nextMonth;
        const eventInMonth = calendarEvents.find((event) => Number(event.date.slice(5, 7)) === nextMonth + 1);
        state.selectedDate = eventInMonth?.date || `${year}-${String(nextMonth + 1).padStart(2, "0")}-01`;
        saveState();
        render();
      });
    });
    document.querySelector("#calendar-today")?.addEventListener("click", () => {
      state.calendarMonth = Number(state.storyDate.slice(5, 7)) - 1;
      state.selectedDate = state.storyDate;
      saveState();
      render();
    });
    queueCalendarTriggers();
  }

  function renderPhotos() {
    const albumCards = config.photoAlbums.map((album) => {
      const albumPhotos = getAlbumPhotos(album.id);
      const cover = album.id === "recents"
        ? albumPhotos[0]
        : albumPhotos.find((photo) => photo.id === album.coverId) || albumPhotos[0] || config.photos[0];
      const count = albumPhotos.length;
      return `<button type="button" class="album-card" data-album="${album.id}" aria-label="Buka album ${escapeHtml(album.title)}">
        <span class="album-cover">${photoVisual(cover)}${album.id === "favorites" ? `<b aria-hidden="true">♥</b>` : ""}</span>
        <strong>${escapeHtml(album.title)}</strong>
        <small>${count}</small>
      </button>`;
    }).join("");
    screen.innerHTML = `
      <section class="view app-view photos-view photos-albums-view">
        <div class="photos-topbar"><span aria-hidden="true"></span><button type="button" aria-label="More options">•••</button></div>
        <div class="photos-scroll">
          <h1>Albums</h1>
          <div class="albums-heading"><h2>My Albums</h2><button type="button">See All</button></div>
          <div class="album-grid">${albumCards}</div>
          <div class="albums-heading people-heading"><h2>People &amp; Places</h2><button type="button">See All</button></div>
          <div class="people-placeholder"><span>◎</span><div><strong>People &amp; Places</strong><small>Photos collected across one year</small></div></div>
        </div>
        ${photosTabBar("albums")}
      </section>`;
    bindBackButtons();
    document.querySelectorAll("[data-album]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeAlbumId = button.dataset.album;
        state.view = "album";
        saveState();
        render();
      });
    });
    bindPhotoTabs();
  }

  function renderAlbum() {
    const album = config.photoAlbums.find((item) => item.id === state.activeAlbumId) || config.photoAlbums[0];
    const photos = getAlbumPhotos(album.id);
    const groups = groupPhotosByMonth(photos);
    screen.innerHTML = `
      <section class="view app-view photos-view photo-album-view">
        ${appHeader(album.title, "photos")}
        <div class="album-scroll">
          <div class="album-title-row"><div><h1>${escapeHtml(album.title)}</h1></div><button type="button">•••</button></div>
          ${groups.map(([label, items]) => `
            <section class="photo-month">
              <h2>${escapeHtml(label)}</h2>
              <div class="photo-grid">
                ${items.map((photo) => `<button type="button" data-photo="${photo.id}" aria-label="Buka ${escapeHtml(photo.caption)}">${photoVisual(photo)}${photo.albums?.includes("favorites") ? `<b aria-hidden="true">♥</b>` : ""}</button>`).join("")}
              </div>
            </section>`).join("")}
        </div>
        ${photosTabBar("library")}
      </section>`;
    bindBackButtons();
    document.querySelectorAll("[data-photo]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activePhotoId = button.dataset.photo;
        state.view = "photo";
        saveState();
        render();
      });
    });
    bindPhotoTabs();
  }

  function getAlbumPhotos(albumId) {
    const visiblePhotos = config.photos
      .filter((photo) => storyCheckpointReached(photo.availableAfter) && storyDateReached(photo.availableAfterDate))
      .sort((first, second) => photoTimestamp(second) - photoTimestamp(first));
    if (albumId === "recents") return visiblePhotos;
    return visiblePhotos.filter((photo) => photo.albums?.includes(albumId));
  }

  function photoTimestamp(photo) {
    const [dateText, timeText = "12:00 PM"] = String(photo.caption || "").split(" · ");
    const timestamp = Date.parse(`${dateText} ${timeText}`);
    return Number.isNaN(timestamp) ? 0 : timestamp;
  }

  function groupPhotosByMonth(photos) {
    const groups = new Map();
    photos.forEach((photo) => {
      const dateText = photo.caption.split(" · ")[0];
      const date = new Date(dateText);
      const label = Number.isNaN(date.getTime())
        ? dateText
        : new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
      if (!groups.has(label)) groups.set(label, []);
      groups.get(label).push(photo);
    });
    return [...groups.entries()];
  }

  function photosTabBar(active) {
    return `<nav class="photos-tabbar" aria-label="Photos tabs">
      <button type="button" data-photo-tab="library" class="${active === "library" ? "is-active" : ""}"><span>${photosTabIcon("library")}</span><small>Library</small></button>
      <button type="button" disabled aria-disabled="true"><span>${photosTabIcon("for-you")}</span><small>For You</small></button>
      <button type="button" data-photo-tab="albums" class="${active === "albums" ? "is-active" : ""}"><span>${photosTabIcon("albums")}</span><small>Albums</small></button>
      <button type="button" disabled aria-disabled="true"><span>${photosTabIcon("search")}</span><small>Search</small></button>
    </nav>`;
  }

  function photosTabIcon(name) {
    if (name === "library") return `<svg viewBox="0 0 28 25" aria-hidden="true"><rect x="5" y="5" width="18" height="16" rx="1.8"></rect><path d="M8 17l4-4 3 3 3-3 2 2.5"></path><circle cx="18.5" cy="9.5" r="1.35"></circle><path class="icon-layer" d="M8 2.5h15.5A2.5 2.5 0 0 1 26 5v13"></path></svg>`;
    if (name === "for-you") return `<svg viewBox="0 0 28 25" aria-hidden="true"><rect x="5" y="3" width="18" height="19" rx="2"></rect><path class="icon-heart" d="M14 17.5s-5-2.9-5-6.4c0-2.7 3.5-3.5 5-1.2 1.5-2.3 5-1.5 5 1.2 0 3.5-5 6.4-5 6.4z"></path><path class="icon-line" d="M8.5 6.8h5"></path></svg>`;
    if (name === "albums") return `<svg viewBox="0 0 28 25" aria-hidden="true"><rect class="album-top" x="5" y="3" width="18" height="16" rx="1.8"></rect><path class="album-layer" d="M7 22h14M6 20.5h16"></path></svg>`;
    return `<svg viewBox="0 0 28 25" aria-hidden="true"><circle cx="12.5" cy="10.5" r="6.2"></circle><path d="M17 15l5.3 5.3"></path></svg>`;
  }

  function bindPhotoTabs() {
    document.querySelectorAll("[data-photo-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        const tab = button.dataset.photoTab;
        if (tab === "albums") state.view = "photos";
        else if (tab === "library") {
          state.activeAlbumId = "recents";
          state.view = "album";
        } else {
          state.placeholderApp = `Photos · ${button.querySelector("small")?.textContent || ""}`;
          state.view = "placeholder";
        }
        saveState();
        render();
      });
    });
  }

  function photoVisual(photo, large = false) {
    const className = large ? "photo-visual photo-visual--large" : "photo-visual";
    if (photo.src) return `<img class="${className}" src="${escapeAttribute(photo.src)}" alt="${escapeAttribute(photo.title)}">`;
    return `<span class="${className} photo-placeholder" style="--photo-color:${photo.color}"><i>✦</i></span>`;
  }

  function renderPhoto() {
    const photo = config.photos.find((item) => item.id === state.activePhotoId) || config.photos[0];
    screen.innerHTML = `
      <section class="view app-view photo-detail">
        ${appHeader("Photos", "album")}
        ${photoVisual(photo, true)}
        <div class="photo-detail__copy"><h1>${escapeHtml(photo.title)}</h1><p>${escapeHtml(photo.caption)}</p></div>
      </section>`;
    bindBackButtons();
  }

  function renderNotes() {
    const visibleNotes = config.notes
      .map((note, index) => ({ note, index }))
      .filter((item) => storyCheckpointReached(item.note.availableAfter) && storyDateReached(item.note.availableAfterDate));
    const pinned = visibleNotes.filter((item) => item.note.pinned);
    const today = visibleNotes.filter((item) => item.note.date === "17 November 2026" && !item.note.pinned);
    const earlier = visibleNotes.filter((item) => !item.note.pinned && item.note.date !== "17 November 2026");
    screen.innerHTML = `
      <section class="view app-view notes-view ios-notes-list">
        <header class="notes-list-nav">
          <button class="notes-round-button notes-back-button" type="button" data-back="home" aria-label="Back to home"><span>‹</span></button>
          <button class="notes-round-button notes-more-button" type="button" aria-label="More options"><span>•••</span></button>
        </header>
        <div class="notes-scroll">
          <h1>Notes</h1>
          <p class="notes-count">${visibleNotes.length} Notes</p>
          ${pinned.length ? `<section class="notes-section"><div class="notes-section-title"><h2>Pinned</h2></div><div class="notes-card">${pinned.map(noteListRow).join("")}</div></section>` : ""}
          ${today.length ? `<section class="notes-section"><div class="notes-section-title"><h2>Today</h2></div><div class="notes-card">${today.map(noteListRow).join("")}</div></section>` : ""}
          ${earlier.length ? `<section class="notes-section"><div class="notes-section-title"><h2>Previous 7 Days</h2></div><div class="notes-card">${earlier.map(noteListRow).join("")}</div></section>` : ""}
        </div>
        <footer class="notes-bottom">
          <div class="notes-search"><span class="notes-search-icon" aria-hidden="true"></span><em>Search</em><span class="notes-mic-icon" aria-hidden="true"></span></div>
          <button class="notes-compose-button" type="button" aria-label="New note"><span class="notes-compose-icon" aria-hidden="true"></span></button>
        </footer>
      </section>`;
    bindBackButtons();
    document.querySelectorAll("[data-note]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeNoteIndex = Number(button.dataset.note);
        state.view = "note";
        render();
      });
    });
  }

  function noteListRow({ note, index }) {
    const lines = note.body.split("\n").map((line) => line.trim()).filter(Boolean);
    const preview = lines[0]?.replace(/^[☑☐]\s*/, "") || "No additional text";
    return `<button type="button" class="notes-row" data-note="${index}">
      <strong>${escapeHtml(note.title)}</strong>
      <span>${escapeHtml(noteListDate(note.date))}</span>
      <small>${escapeHtml(preview)}</small><i aria-hidden="true">›</i>
    </button>`;
  }

  function noteListDate(date) {
    if (date === "17 November 2026") return "Today";
    if (date === "16 November 2026") return "Yesterday";
    const days = { "15 November 2026": "Sunday", "12 November 2026": "Thursday" };
    return days[date] || date;
  }

  function renderNote() {
    const note = config.notes[state.activeNoteIndex] || config.notes[0];
    screen.innerHTML = `
      <section class="view app-view note-detail ios-note-detail">
        <header class="notes-detail-nav">
          <button class="note-back-link" type="button" data-back="notes"><span>‹</span> Notes</button>
          <div>
            <button class="note-collaborate" type="button" aria-label="Collaborate"><span aria-hidden="true">♧</span></button>
            <button class="note-share" type="button" aria-label="Share"><span aria-hidden="true">⇧</span></button>
            <button class="note-detail-more" type="button" aria-label="More options"><span aria-hidden="true">•••</span></button>
          </div>
        </header>
        <article><h1>${escapeHtml(note.title)}</h1><div class="note-body">${noteBodyHtml(note.body)}</div></article>
        <footer class="note-toolbar">
          <button type="button" aria-label="Delete note"><span class="toolbar-trash" aria-hidden="true"></span></button>
          <button type="button" aria-label="Checklist"><span class="toolbar-check" aria-hidden="true">✓</span></button>
          <button type="button" aria-label="Add photo"><span class="toolbar-camera" aria-hidden="true"></span></button>
          <button type="button" aria-label="Markup"><span class="toolbar-markup" aria-hidden="true"></span></button>
          <button type="button" aria-label="Compose note"><span class="notes-compose-icon" aria-hidden="true"></span></button>
        </footer>
      </section>`;
    bindBackButtons();
  }

  function noteBodyHtml(body) {
    let indentedChecklist = false;
    return body.split("\n").map((rawLine) => {
      const line = rawLine.trim();
      if (!line) {
        indentedChecklist = false;
        return `<span class="note-spacer" aria-hidden="true"></span>`;
      }
      if (line.endsWith(":")) {
        indentedChecklist = true;
        return `<h2>${escapeHtml(line)}</h2>`;
      }
      if (line.startsWith("☑ ")) return `<div class="checklist-item is-done${indentedChecklist ? " is-indented" : ""}"><span>✓</span><p>${escapeHtml(line.slice(2))}</p></div>`;
      if (line.startsWith("☐ ")) return `<div class="checklist-item${indentedChecklist ? " is-indented" : ""}"><span></span><p>${escapeHtml(line.slice(2))}</p></div>`;
      if (line.startsWith("- ")) return `<p class="note-bullet">${escapeHtml(line.slice(2))}</p>`;
      return `<p>${escapeHtml(line)}</p>`;
    }).join("");
  }

  function gmailIcon(name) {
    const icons = {
      menu: `<path d="M4 7h24M4 16h24M4 25h24"/>`,
      mail: `<rect x="3.5" y="6" width="25" height="20" rx="2.5"/><path d="m5 8 11 9 11-9"/>`,
      chat: `<path d="M5 5.5h22v17H13l-6.5 5v-5H5z"/>`,
      meet: `<rect x="3.5" y="7" width="17" height="18" rx="3"/><path d="m20.5 13 8-4v14l-8-4z"/>`,
      compose: `<path d="M7 25h5l14-14-5-5L7 20v5zM18.5 8.5l5 5"/>`,
      back: `<path d="m20 5-11 11 11 11"/>`,
      archive: `<path d="M5 8h22v19H5zM3 4h26v5H3zM12 15h8"/>`,
      trash: `<path d="M7 9h18M12 9V5h8v4M10 9l1 19h10l1-19M14 14v9M18 14v9"/>`,
      unread: `<rect x="3.5" y="6" width="25" height="20" rx="2.5"/><path d="m5 8 11 9 11-9"/>`,
      more: `<circle cx="7" cy="16" r="1.7" fill="currentColor" stroke="none"/><circle cx="16" cy="16" r="1.7" fill="currentColor" stroke="none"/><circle cx="25" cy="16" r="1.7" fill="currentColor" stroke="none"/>`,
      star: `<path d="m16 3.5 3.8 7.7 8.5 1.2-6.1 6 1.4 8.4-7.6-4-7.6 4 1.4-8.4-6.1-6 8.5-1.2z"/>`
    };
    return `<svg class="gmail-svg gmail-svg--${name}" viewBox="0 0 32 32" aria-hidden="true">${icons[name] || ""}</svg>`;
  }

  function renderGmail() {
    const gmail = config.gmail;
    const emails = (gmail?.emails || []).filter((email) => storyCheckpointReached(email.availableAfter) && storyDateReached(email.availableAfterDate));
    const unreadCount = emails.filter((email) => email.unread).length;
    screen.innerHTML = `
      <section class="view app-view gmail-view gmail-inbox-view">
        <header class="gmail-topbar">
          <button class="gmail-menu-button" type="button" aria-label="Menu" disabled>${gmailIcon("menu")}</button>
          <div class="gmail-search-pill"><span>Search in mail</span></div>
          <img class="gmail-profile-photo" src="${escapeAttribute(gmail.profileImage)}" alt="${escapeAttribute(gmail.accountName)}">
        </header>
        <div class="gmail-list-scroll">
          <p class="gmail-label">Inbox</p>
          <div class="gmail-email-list">
            ${emails.map((email) => `
              <button class="gmail-email-row ${email.unread ? "is-unread" : ""}" type="button" data-email="${escapeAttribute(email.id)}">
                <span class="gmail-sender-avatar" style="--gmail-avatar:${escapeAttribute(email.color)}">${escapeHtml(email.avatar)}</span>
                <span class="gmail-email-copy">
                  <strong>${escapeHtml(email.sender)}</strong>
                  <b>${escapeHtml(email.subject)}</b>
                  <small>${escapeHtml(email.snippet)}</small>
                </span>
                <span class="gmail-email-meta">
                  <span><time>${escapeHtml(email.time)}</time>${email.unread ? `<i class="gmail-unread-dot" aria-hidden="true"></i>` : ""}</span>
                  ${gmailIcon("star")}
                </span>
              </button>`).join("")}
          </div>
        </div>
        <button class="gmail-compose" type="button" disabled aria-label="Compose">${gmailIcon("compose")}<span>Compose</span></button>
        <nav class="gmail-bottom-nav" aria-label="Gmail navigation">
          <button class="is-active" type="button" disabled aria-label="Mail"><span class="gmail-nav-icon">${gmailIcon("mail")}${unreadCount ? `<b>${unreadCount}</b>` : ""}</span></button>
          <button type="button" disabled aria-label="Chat"><span class="gmail-nav-icon">${gmailIcon("chat")}</span></button>
          <button type="button" disabled aria-label="Meet"><span class="gmail-nav-icon">${gmailIcon("meet")}</span></button>
        </nav>
      </section>`;
    document.querySelectorAll("[data-email]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeEmailId = button.dataset.email;
        state.view = "gmail-email";
        saveState();
        render();
      });
    });
  }

  function renderGmailEmail() {
    const gmail = config.gmail;
    const visibleEmails = (gmail?.emails || []).filter((item) => storyCheckpointReached(item.availableAfter) && storyDateReached(item.availableAfterDate));
    const email = visibleEmails.find((item) => item.id === state.activeEmailId) || visibleEmails[0];
    if (!email) {
      state.view = "gmail";
      render();
      return;
    }
    screen.innerHTML = `
      <section class="view app-view gmail-view gmail-detail-view">
        <header class="gmail-detail-toolbar">
          <button type="button" data-back="gmail" aria-label="Back to inbox">${gmailIcon("back")}</button>
          <span></span>
          <button type="button" disabled aria-label="Archive">${gmailIcon("archive")}</button>
          <button type="button" disabled aria-label="Delete">${gmailIcon("trash")}</button>
          <button type="button" disabled aria-label="Mark unread">${gmailIcon("unread")}</button>
          <button type="button" disabled aria-label="More options">${gmailIcon("more")}</button>
        </header>
        <article class="gmail-message-scroll">
          <div class="gmail-subject-row"><h1>${escapeHtml(email.subject)}</h1><span>Inbox</span>${gmailIcon("star")}</div>
          <div class="gmail-message-sender">
            <span class="gmail-sender-avatar" style="--gmail-avatar:${escapeAttribute(email.color)}">${escapeHtml(email.avatar)}</span>
            <span><strong>${escapeHtml(email.sender)}</strong><small>${escapeHtml(email.time)} · to me</small></span>
            <i>⌔</i>
          </div>
          <div class="gmail-message-body">
            ${email.body.map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll("\n", "<br>")}</p>`).join("")}
          </div>
        </article>
        <footer class="gmail-reply-actions">
          <button type="button" disabled>↩ Reply</button>
          <button type="button" disabled>⇉ Reply all</button>
          <button type="button" disabled>→ Forward</button>
        </footer>
      </section>`;
    bindBackButtons();
  }

  function igIcon(name) {
    const icons = {
      home: `<path d="m3 11 9-8 9 8v10h-6v-6H9v6H3V11Z"/>`,
      search: `<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>`,
      plus: `<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 7v10M7 12h10"/>`,
      reels: `<rect x="3" y="3" width="18" height="18" rx="5"/><path d="m7 3 4 5M14 3l4 5M3 8h18M10 12l5 3-5 3v-6Z"/>`,
      heart: `<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>`,
      comment: `<path d="M20.5 11.5a8.5 8.5 0 0 1-9 8.5 9.5 9.5 0 0 1-4.1-.9L3 20.5l1.4-4.1A8.5 8.5 0 1 1 20.5 11.5Z"/>`,
      send: `<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="m22 2-11 11"/>`,
      repost: `<path d="M18.5 7.8A7.5 7.5 0 0 0 5.6 5.4L3.5 7.8M3.5 3.8v4h4M5.5 16.2a7.5 7.5 0 0 0 12.9 2.4l2.1-2.4M20.5 20.2v-4h-4"/>`,
      bookmark: `<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"/>`,
      grid: `<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>`,
      user: `<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="9" r="3"/><path d="M6.5 20c.7-4 2.5-6 5.5-6s4.8 2 5.5 6"/>`,
      threads: `<path d="M18.8 8.5C18.2 4.6 15.8 2.4 12 2.4c-5.7 0-9 3.7-9 9.7 0 6.1 3.4 9.6 9.2 9.6 5.2 0 8.8-2.8 8.8-7 0-3.7-2.8-6-6.9-6-3.8 0-6.3 1.9-6.3 4.7 0 2.4 1.8 4 4.5 4 3.7 0 6.4-3 6.4-7.2 0-1.8-.4-3.2-1.1-4.3M17.2 12c-.8-.4-1.8-.7-3-.7-2.1 0-3.5.9-3.5 2.3 0 1.1.8 1.8 2.1 1.8 2.3 0 4-1.8 4.4-3.4Z"/>`,
      menu: `<path d="M4 7h16M4 12h16M4 17h16"/>`,
      chevron: `<path d="m8 10 4 4 4-4"/>`
    };
    return `<svg class="ig-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ""}</svg>`;
  }

  function instagramUsername(profile) {
    return String(profile?.handle || "").replace(/^@/, "");
  }

  function getInstagramProfile(id) {
    return config.instagram?.profiles?.find((profile) => profile.id === id) || null;
  }

  function getInstagramPost(postId) {
    for (const profile of config.instagram?.profiles || []) {
      const post = profile.posts?.find((item) => item.id === postId);
      if (post) return { profile, post };
    }
    return null;
  }

  function instagramPostDate(post) {
    if (post.availableAfterDate) return post.availableAfterDate;
    const parsed = new Date(`${post.date || post.time || "1 Jan"} 2026`);
    if (Number.isNaN(parsed.getTime())) return "2026-01-01";
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function visibleInstagramPosts(profile) {
    return (profile?.posts || [])
      .filter((post) => storyDateReached(instagramPostDate(post)) && storyCheckpointReached(post.availableAfter))
      .sort((first, second) => instagramPostDate(second).localeCompare(instagramPostDate(first)));
  }

  function instagramAvatar(profile, className = "", ring = false) {
    return `<span class="ig-avatar ${ring ? "has-ring" : ""} ${className}"><img src="${escapeAttribute(profile.avatar)}" alt=""></span>`;
  }

  function instagramProfileTrigger(profile, contents, className = "") {
    if (!profile.open) return `<span class="${className}">${contents}</span>`;
    return `<button class="${className}" type="button" data-ig-profile="${escapeAttribute(profile.id)}">${contents}</button>`;
  }

  function instagramPostCard(profile, post, returnView = "instagram") {
    const comments = post.comments || [];
    return `<article class="ig-post-card">
      <header class="ig-post-header">
        ${instagramProfileTrigger(profile, `${instagramAvatar(profile, "ig-post-avatar", true)}<span><strong>${escapeHtml(instagramUsername(profile))}</strong><small>Original audio</small></span>`, "ig-post-account")}
        <button class="ig-more" type="button" disabled aria-label="More options">${igIcon("menu")}</button>
      </header>
      <button class="ig-post-image-button" type="button" data-ig-post="${escapeAttribute(post.id)}" data-ig-return="${escapeAttribute(returnView)}" aria-label="Buka post ${escapeAttribute(instagramUsername(profile))}">
        <img class="ig-post-image" src="${escapeAttribute(post.image)}" alt="Post ${escapeAttribute(instagramUsername(profile))}">
      </button>
      <div class="ig-post-actions">
        <span>${igIcon("heart")}</span><span>${igIcon("comment")}</span><span>${igIcon("repost")}</span><span>${igIcon("send")}</span><i></i><span>${igIcon("bookmark")}</span>
      </div>
      <div class="ig-post-copy">
        <strong>${escapeHtml(post.likes)} likes</strong>
        <p><b>${escapeHtml(instagramUsername(profile))}</b> ${escapeHtml(post.caption)}</p>
        ${comments.map((comment) => {
          const author = getInstagramProfile(comment.author);
          return `<p class="ig-comment"><b>${escapeHtml(instagramUsername(author) || comment.author)}</b> ${escapeHtml(comment.text)}</p>`;
        }).join("")}
        <time>${escapeHtml(post.date)}</time>
      </div>
    </article>`;
  }

  function instagramBottomNav(active = "home") {
    const owner = getInstagramProfile(config.instagram?.ownerId || "mc");
    return `<nav class="ig-bottom-nav" aria-label="Instagram navigation">
      <button class="${active === "home" ? "is-active" : ""}" type="button" data-back="instagram" aria-label="Home">${igIcon("home")}</button>
      <button type="button" disabled aria-label="Reels">${igIcon("reels")}</button>
      <button class="ig-nav-messages" type="button" disabled aria-label="Messages">${igIcon("send")}<b>1</b></button>
      <button type="button" disabled aria-label="Search">${igIcon("search")}</button>
      <button class="ig-nav-profile ${active === "profile" ? "is-active" : ""}" type="button" data-ig-profile="${escapeAttribute(owner.id)}" aria-label="Your profile">${instagramAvatar(owner, "ig-nav-avatar")}</button>
    </nav>`;
  }

  function renderInstagram() {
    const instagram = config.instagram || {};
    const storyProfiles = (instagram.stories || []).map(getInstagramProfile).filter(Boolean);
    const homePosts = (instagram.homeProfileIds || [])
      .map(getInstagramProfile)
      .filter(Boolean)
      .map((profile) => ({ profile, post: visibleInstagramPosts(profile)[0] }))
      .filter(({ post }) => Boolean(post))
      .sort((first, second) => instagramPostDate(second.post).localeCompare(instagramPostDate(first.post)));
    screen.innerHTML = `
      <section class="view app-view instagram-view ig-home-view">
        <header class="ig-main-header">
          <button type="button" disabled aria-label="Create">${igIcon("plus")}</button>
          <button class="ig-logo" type="button" disabled>Instagram</button>
          <button class="ig-header-heart" type="button" disabled aria-label="Notifications">${igIcon("heart")}<i></i></button>
        </header>
        <div class="ig-scroll">
          <div class="ig-stories" aria-label="Stories">
            ${storyProfiles.map((profile) => `<button class="ig-story" type="button" disabled aria-label="Story ${escapeAttribute(instagramUsername(profile))}"><span class="ig-story-image">${instagramAvatar(profile, "ig-story-avatar", profile.id !== instagram.ownerId)}${profile.id === instagram.ownerId ? `<i class="ig-story-add">+</i>` : ""}</span><small>${escapeHtml(profile.id === instagram.ownerId ? "Your story" : instagramUsername(profile))}</small></button>`).join("")}
          </div>
          <div class="ig-feed">${homePosts.map(({ profile, post }) => instagramPostCard(profile, post, "instagram")).join("")}</div>
        </div>
        ${instagramBottomNav("home")}
      </section>`;
    bindBackButtons();
    bindInstagramNavigation();
  }

  function renderInstagramProfile() {
    const profile = getInstagramProfile(state.activeInstagramProfileId) || getInstagramProfile(config.instagram?.ownerId || "mc");
    if (!profile?.open) {
      state.view = "instagram";
      render();
      return;
    }
    const isOwner = profile.id === config.instagram?.ownerId;
    const visiblePosts = visibleInstagramPosts(profile);
    screen.innerHTML = `
      <section class="view app-view instagram-view ig-profile-view">
        <header class="ig-profile-header ${isOwner ? "is-owner" : ""}">
          ${isOwner ? `<button type="button" disabled aria-label="Create">${igIcon("plus")}</button>` : `<button type="button" data-back="instagram" aria-label="Back">‹</button>`}
          <strong>${escapeHtml(instagramUsername(profile))}${isOwner ? igIcon("chevron") : ""}</strong>
          <span class="ig-profile-header-actions">${isOwner ? `<button type="button" disabled aria-label="Threads">${igIcon("threads")}</button>` : ""}<button type="button" disabled aria-label="Menu">${igIcon("menu")}</button></span>
        </header>
        <div class="ig-profile-scroll">
          <section class="ig-profile-summary">
            <span class="ig-profile-avatar-wrap">${instagramAvatar(profile, "ig-profile-avatar")}${isOwner ? `<i class="ig-profile-note">busy, as usual</i><b class="ig-profile-add">+</b>` : ""}</span>
            <div class="ig-profile-stats"><span><b>${visiblePosts.length}</b><small>posts</small></span><span><b>${escapeHtml(profile.followers)}</b><small>followers</small></span><span><b>${escapeHtml(profile.following)}</b><small>following</small></span></div>
            <div class="ig-profile-bio"><strong>${escapeHtml(profile.displayName)}</strong><p>${escapeHtml(profile.bio || "")}</p></div>
            <div class="ig-profile-actions">${isOwner ? `<button type="button" disabled>Edit profile</button><button type="button" disabled>Share profile</button><button class="ig-add-person" type="button" disabled>${igIcon("user")}</button>` : `<button type="button" disabled>Following</button><button type="button" disabled>Message</button>`}</div>
          </section>
          <div class="ig-profile-tabs"><span class="is-active">${igIcon("grid")}</span><span>${igIcon("reels")}</span><span>${igIcon("repost")}</span><span>${igIcon("user")}</span></div>
          <div class="ig-profile-grid">
            ${visiblePosts.map((post) => `<button type="button" data-ig-post="${escapeAttribute(post.id)}" data-ig-return="instagram-profile" aria-label="Buka post"><img src="${escapeAttribute(post.image)}" alt=""></button>`).join("")}
          </div>
        </div>
        ${instagramBottomNav(isOwner ? "profile" : "")}
      </section>`;
    bindBackButtons();
    bindInstagramNavigation();
  }

  function renderInstagramPost() {
    const result = getInstagramPost(state.activeInstagramPostId);
    if (!result) {
      state.view = state.instagramBackView || "instagram";
      render();
      return;
    }
    screen.innerHTML = `
      <section class="view app-view instagram-view ig-detail-view">
        <header class="ig-profile-header"><button type="button" data-back="${escapeAttribute(state.instagramBackView || "instagram")}" aria-label="Back">‹</button><strong>Post</strong><span></span></header>
        <div class="ig-detail-scroll">${instagramPostCard(result.profile, result.post, state.instagramBackView || "instagram")}</div>
        ${instagramBottomNav("")}
      </section>`;
    bindBackButtons();
    bindInstagramNavigation();
  }

  function bindInstagramNavigation() {
    document.querySelectorAll("[data-ig-profile]").forEach((button) => {
      button.addEventListener("click", () => {
        const profile = getInstagramProfile(button.dataset.igProfile);
        if (!profile?.open) return;
        state.activeInstagramProfileId = profile.id;
        state.view = "instagram-profile";
        saveState();
        render();
      });
    });
    document.querySelectorAll("[data-ig-post]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeInstagramPostId = button.dataset.igPost;
        state.instagramBackView = button.dataset.igReturn || "instagram";
        state.view = "instagram-post";
        saveState();
        render();
      });
    });
  }

  function xIcon(name) {
    const icons = {
      home: `<path d="M3 11.2 12 3l9 8.2V21h-6v-6H9v6H3v-9.8Z"/>`,
      search: `<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>`,
      community: `<circle cx="8" cy="8" r="3"/><circle cx="17" cy="7" r="2.5"/><path d="M2.5 20v-2c0-3.4 2.1-5.5 5.5-5.5s5.5 2.1 5.5 5.5v2M14 13c.7-.5 1.7-.8 3-.8 3 0 4.8 1.9 4.8 4.8v2"/>`,
      bell: `<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM9.5 21h5"/>`,
      mail: `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>`,
      settings: `<circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>`,
      reply: `<path d="M20.5 11.5a8.5 8.5 0 0 1-9 8.5 9.5 9.5 0 0 1-4.1-.9L3 20.5l1.4-4.1A8.5 8.5 0 1 1 20.5 11.5Z"/>`,
      repost: `<path d="m17 3 4 4-4 4M21 7H8a4 4 0 0 0-4 4v1M7 21l-4-4 4-4M3 17h13a4 4 0 0 0 4-4v-1"/>`,
      like: `<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>`,
      views: `<path d="M4 20V10M8 20V5M12 20v-7M16 20V8M20 20V3"/>`,
      bookmark: `<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"/>`,
      share: `<path d="M12 16V3M7 8l5-5 5 5M5 13v8h14v-8"/>`,
      lock: `<rect x="6" y="10" width="12" height="10" rx="2" class="is-filled"/><path d="M8.5 10V7a3.5 3.5 0 0 1 7 0v3"/>`
    };
    return `<svg class="x-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ""}</svg>`;
  }

  function renderX() {
    const x = config.xApp || {};
    const profile = x.profile || {};
    const posts = (x.posts || []).filter((post) => {
      const postDate = post.availableAfterDate || instagramPostDate(post);
      return storyDateReached(postDate) && storyCheckpointReached(post.availableAfter);
    });
    screen.innerHTML = `
      <section class="view app-view x-view">
        <div class="x-profile-scroll">
          <header class="x-profile-topbar">
            <button class="x-profile-back" type="button" data-back="home" aria-label="Kembali ke Home">‹</button>
            <div><button type="button" disabled aria-label="Search">${xIcon("search")}</button><button type="button" disabled aria-label="More options">•••</button></div>
          </header>
          <div class="x-profile-cover"${profile.cover ? ` style="background-image:linear-gradient(rgba(0,0,0,.04),rgba(0,0,0,.04)),url('${escapeAttribute(profile.cover)}')"` : ""}></div>
          <section class="x-profile-card">
            <img class="x-profile-avatar" src="${escapeAttribute(profile.avatar || "assets/avatars/x/mc-cat.jpg")}" alt="Foto profil kucing">
            <div class="x-profile-quick-actions">
              <button type="button" disabled aria-label="Share profile">Share</button>
              <button type="button" disabled>Edit profile</button>
            </div>
            <h1>${escapeHtml(profile.name || "capek kerja")} ${profile.private ? `<span class="x-profile-lock">${xIcon("lock")}</span>` : ""}</h1>
            <p class="x-profile-handle">${escapeHtml(profile.handle || "@janganngintip")}</p>
            ${profile.bio ? `<p class="x-profile-bio">${escapeHtml(profile.bio)}</p>` : ""}
            <p class="x-profile-counts"><span><b>${Number(profile.following || 0)}</b> Following</span><span><b>${Number(profile.followers || 0)}</b> Followers</span></p>
          </section>
          <nav class="x-profile-tabs" aria-label="Profile tabs">
            <button class="is-active" type="button" disabled>Posts</button>
            <button type="button" disabled>Replies</button>
            <button type="button" disabled>Highlights</button>
            <button type="button" disabled>Media</button>
          </nav>
          <div class="x-profile-posts">
            ${posts.map((post) => `
              <article class="x-post">
                <img class="x-post-avatar" src="${escapeAttribute(profile.avatar || "assets/avatars/x/mc-cat.jpg")}" alt="">
                <div class="x-post-content">
                  <div class="x-post-meta"><strong>${escapeHtml(profile.name || "capek kerja")}</strong>${profile.private ? `<span class="x-private">${xIcon("lock")}</span>` : ""}<small>${escapeHtml(profile.handle || "@janganngintip")} · ${escapeHtml(post.time)}</small><i>•••</i></div>
                  <p class="x-post-text">${escapeHtml(post.text).replaceAll("\n", "<br>")}</p>
                  <div class="x-post-actions">
                    <span>${xIcon("reply")}<small>${post.replies || ""}</small></span>
                    <span>${xIcon("repost")}<small>${post.reposts || ""}</small></span>
                    <span>${xIcon("like")}<small>${post.likes || ""}</small></span>
                    <span>${xIcon("views")}<small>${post.views || ""}</small></span>
                    <span>${xIcon("bookmark")}</span>
                    <span>${xIcon("share")}</span>
                  </div>
                </div>
              </article>`).join("")}
          </div>
        </div>
        <button class="x-compose" type="button" disabled aria-label="Compose post">＋</button>
      </section>`;
    bindBackButtons();
  }

  function spotifyIcon(name) {
    const icons = {
      heart: `<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>`,
      download: `<path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M5 21h14"/>`,
      more: `<circle class="is-filled" cx="5" cy="12" r="1.5"/><circle class="is-filled" cx="12" cy="12" r="1.5"/><circle class="is-filled" cx="19" cy="12" r="1.5"/>`,
      shuffle: `<path d="M16 3h5v5M4 20 20 4M4 4l5 5M15 15l6 6M16 21h5v-5"/>`,
      play: `<path class="is-filled" d="M8 5.5v13l11-6.5L8 5.5Z"/>`,
      device: `<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>`,
      pause: `<path d="M8 5v14M16 5v14"/>`,
      home: `<path d="m3 11 9-8 9 8v10h-6v-6H9v6H3V11Z"/>`,
      search: `<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>`,
      library: `<rect x="3" y="4" width="4" height="16" rx="1"/><rect x="10" y="4" width="4" height="16" rx="1"/><path d="m17 5 4-1v16l-4 1V5Z"/>`,
      plus: `<path d="M12 4v16M4 12h16"/>`
    };
    return `<svg class="spotify-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ""}</svg>`;
  }

  function renderSpotify() {
    const spotify = config.spotify;
    const track = spotify.currentTrack;
    const playlist = spotify.playlists.find((item) => item.id === "karma") || spotify.playlists[0];
    const playlistTracks = spotify.tracks?.length ? spotify.tracks : [track];
    screen.innerHTML = `
      <section class="view app-view spotify-view spotify-playlist-view">
        <header class="spotify-playlist-nav"><button type="button" data-back="home" aria-label="Kembali ke Home">‹</button><button type="button" aria-label="More options" disabled>${spotifyIcon("more")}</button></header>
        <div class="spotify-playlist-scroll">
          <img class="spotify-playlist-cover" src="${escapeAttribute(playlist.cover)}" alt="Cover playlist ${escapeAttribute(playlist.name)}">
          <h1>${escapeHtml(playlist.name)}</h1>
          <p class="spotify-playlist-description">${escapeHtml(playlist.description)}</p>
          <p class="spotify-playlist-owner"><span>Y</span> Your Phone · ${playlistTracks.length} songs</p>
          <div class="spotify-playlist-actions"><button type="button" aria-label="Saved" disabled>${spotifyIcon("heart")}</button><button type="button" aria-label="Download" disabled>${spotifyIcon("download")}</button><button type="button" aria-label="More options" disabled>${spotifyIcon("more")}</button><i></i><button type="button" aria-label="Shuffle" disabled>${spotifyIcon("shuffle")}</button><button class="spotify-play" type="button" aria-label="Play" disabled>${spotifyIcon("play")}</button></div>
          <div class="spotify-filter-chips"><button type="button" disabled>Most played</button><button type="button" disabled>Recently played</button></div>
          <h2>Most played</h2>
          <div class="spotify-track-list">
            ${playlistTracks.map((item, index) => `
              <div class="spotify-track-row">
                <b class="spotify-track-number">${index + 1}</b>
                <span class="spotify-track-art" style="--track-hue:${(index * 37 + 12) % 360}">${item.cover ? `<img src="${escapeAttribute(item.cover)}" alt="Cover ${escapeAttribute(item.title)}">` : `<i>${escapeHtml(item.title.slice(0, 1))}</i>`}</span>
                <span class="spotify-track-copy"><strong>${escapeHtml(item.title)}</strong><small>${item.explicit ? `<b class="spotify-explicit">E</b>` : ""}${escapeHtml(item.artist)}</small></span>
                <time>${escapeHtml(item.duration || "")}</time>
                <button type="button" aria-label="More options for ${escapeAttribute(item.title)}" disabled>${spotifyIcon("more")}</button>
              </div>`).join("")}
          </div>
        </div>
        <div class="spotify-mini-player"><img src="${escapeAttribute(track.cover)}" alt=""><span><strong>${escapeHtml(track.title)}</strong><small>${escapeHtml(track.artist)}</small></span><span class="spotify-device-icon">${spotifyIcon("device")}</span><button type="button" aria-label="Pause" disabled>${spotifyIcon("pause")}</button></div>
        <nav class="spotify-bottom-nav"><button type="button" disabled><span>${spotifyIcon("home")}</span><small>Home</small></button><button type="button" disabled><span>${spotifyIcon("search")}</span><small>Search</small></button><button class="is-active" type="button" disabled><span>${spotifyIcon("library")}</span><small>Your Library</small></button><button type="button" disabled><span>${spotifyIcon("plus")}</span><small>Create</small></button></nav>
      </section>`;
    bindBackButtons();
  }

  function phoneIcon(name) {
    const icons = {
      star: `<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>`,
      clock: `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l-3 2"/>`,
      contact: `<circle cx="12" cy="8" r="3.5"/><path d="M5 21v-2c0-4 2.7-6.5 7-6.5s7 2.5 7 6.5v2"/>`,
      keypad: `<circle cx="7" cy="6" r="1.3"/><circle cx="12" cy="6" r="1.3"/><circle cx="17" cy="6" r="1.3"/><circle cx="7" cy="11" r="1.3"/><circle cx="12" cy="11" r="1.3"/><circle cx="17" cy="11" r="1.3"/><circle cx="7" cy="16" r="1.3"/><circle cx="12" cy="16" r="1.3"/><circle cx="17" cy="16" r="1.3"/><circle cx="12" cy="21" r="1.3"/>`,
      voicemail: `<circle cx="7" cy="12" r="4"/><circle cx="17" cy="12" r="4"/><path d="M7 16h10"/>`
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ""}</svg>`;
  }

  function renderPhone() {
    const calls = state.callHistory || [];
    screen.innerHTML = `
      <section class="view app-view phone-view">
        <header class="phone-recents-header">
          <div class="phone-segmented"><button class="is-active" type="button" disabled>All</button><button type="button" disabled>Missed</button></div>
          <button class="phone-edit" type="button" disabled>Edit</button>
          <h1>Recents</h1>
        </header>
        ${calls.length ? `<div class="phone-recents">${calls.map((call, index) => {
          const replayable = call.threadId === "dirga";
          const tag = replayable ? "button" : "div";
          return `
          <${tag} class="phone-recent-row ${replayable ? "is-replayable" : ""}" ${replayable ? `type="button" data-replay-call="${index}" aria-label="Call ${escapeAttribute(call.name || getThread(call.threadId)?.name || "?")} again"` : ""}>
            <span class="phone-call-copy"><strong class="${call.missed ? "is-missed" : ""}">${escapeHtml(call.name || getThread(call.threadId)?.name || "Unknown")}</strong><small>${call.outgoing ? `<i aria-hidden="true">↗</i>` : call.missed ? `<i aria-hidden="true">↙</i>` : ""}${escapeHtml(call.label || "mobile")}</small></span>
            <time>${escapeHtml(call.dateLabel || call.time || "")}</time>
            <span class="phone-info" aria-hidden="true">ⓘ</span>
          </${tag}>`;
        }).join("")}</div>` : `<div class="empty-state"><span>☎</span><strong>No Recent Calls</strong><p>Panggilan cerita akan muncul di sini setelah dilakukan.</p></div>`}
        <nav class="phone-bottom-nav" aria-label="Phone tabs">
          <button type="button" disabled><span>${phoneIcon("star")}</span><small>Favorites</small></button>
          <button class="is-active" type="button" disabled><span>${phoneIcon("clock")}</span><small>Recents</small></button>
          <button type="button" disabled><span>${phoneIcon("contact")}</span><small>Contacts</small></button>
          <button type="button" disabled><span>${phoneIcon("keypad")}</span><small>Keypad</small></button>
          <button type="button" disabled><span>${phoneIcon("voicemail")}</span><small>Voicemail</small></button>
        </nav>
      </section>`;
    document.querySelectorAll("[data-replay-call]").forEach((button) => {
      button.addEventListener("click", () => {
        const call = calls[Number(button.dataset.replayCall)];
        if (!call || call.threadId !== "dirga") return;
        state.activeCall = {
          threadId: "dirga",
          time: state.storyTime,
          storyDate: state.storyDate,
          connected: false,
          startedAt: null,
          captionIndex: 0,
          replay: true
        };
        state.view = "incoming-call";
        saveState();
        render();
      });
    });
  }

  function renderIncomingCall() {
    const call = state.activeCall;
    if (!call) {
      state.view = "home";
      render();
      return;
    }
    const thread = getThread(call.threadId);
    const caption = call.connected && Number.isInteger(call.captionIndex) ? callCaptions[call.captionIndex] : null;
    screen.innerHTML = `
      <section class="view wa-incoming-call ${call.connected ? "is-connected" : ""}" aria-label="${call.connected ? "Call connected" : "Incoming call"}">
        <div class="wa-incoming-call__wash"></div>
        <div class="wa-incoming-call__identity">
          <p id="iphone-call-status">${call.connected ? escapeHtml(formatCallDuration(call.startedAt)) : "mobile"}</p>
          <h1>${escapeHtml(thread?.name || "?")}</h1>
        </div>
        ${call.connected ? `
          <button class="iphone-call-info" type="button" disabled aria-label="Call information"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 10.5v6M12 7.5h.01"/></svg></button>
          ${caption ? `<button class="iphone-live-caption" id="call-caption-next" type="button" aria-label="Next subtitle" aria-live="polite"><span><small>${escapeHtml(caption.speaker)}</small><em>tap</em></span><p>${escapeHtml(caption.text)}</p></button>` : ""}
          <div class="iphone-connected-controls">
            <button type="button" disabled aria-label="Speaker"><span><svg viewBox="0 0 32 32" aria-hidden="true"><path class="is-filled" d="M5 13h5l7-6v18l-7-6H5Z"/><path d="M21 11c2.8 2.7 2.8 7.3 0 10M24.5 7.5c4.8 4.7 4.8 12.3 0 17"/></svg></span><small>Speaker</small></button>
            <button type="button" disabled aria-label="FaceTime"><span><svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="8" width="16" height="16" rx="3"/><path class="is-filled" d="m21 13 7-4v14l-7-4Z"/></svg></span><small>FaceTime</small></button>
            <button type="button" disabled aria-label="Mute"><span><svg viewBox="0 0 32 32" aria-hidden="true"><rect x="12" y="5" width="8" height="14" rx="4"/><path d="M8.5 15.5A7.5 7.5 0 0 0 22 20M16 24v4M11 28h10M5 5l22 22"/></svg></span><small>Mute</small></button>
            <button type="button" disabled aria-label="Add person"><span><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="14" cy="12" r="5"/><path d="M5 26c.7-5 4-8 9-8 2.3 0 4.2.6 5.7 1.8M25 17v9M20.5 21.5h9"/></svg></span><small>Add</small></button>
            <button class="iphone-call-control--end" id="wa-call-end" type="button" aria-label="End call"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path class="is-filled" d="M12 9c-1.6 0-3.15.25-4.6.7v3.1c0 .4-.25.75-.6.9-.85.4-1.65.9-2.35 1.5-.2.18-.45.3-.75.3s-.55-.1-.75-.3L.3 12.55c-.2-.2-.3-.45-.3-.75s.1-.55.3-.75C3.55 8.15 7.65 6.5 12 6.5s8.45 1.65 11.7 4.55c.2.2.3.45.3.75s-.1.55-.3.75l-2.65 2.65c-.2.2-.45.3-.75.3s-.55-.12-.75-.3c-.7-.6-1.5-1.1-2.35-1.5-.35-.15-.6-.5-.6-.9V9.7C15.15 9.25 13.6 9 12 9Z"/></svg></span><small>End</small></button>
            <button type="button" disabled aria-label="Keypad"><span><svg viewBox="0 0 32 32" aria-hidden="true"><circle class="is-filled" cx="9" cy="8" r="2.2"/><circle class="is-filled" cx="16" cy="8" r="2.2"/><circle class="is-filled" cx="23" cy="8" r="2.2"/><circle class="is-filled" cx="9" cy="15" r="2.2"/><circle class="is-filled" cx="16" cy="15" r="2.2"/><circle class="is-filled" cx="23" cy="15" r="2.2"/><circle class="is-filled" cx="9" cy="22" r="2.2"/><circle class="is-filled" cx="16" cy="22" r="2.2"/><circle class="is-filled" cx="23" cy="22" r="2.2"/></svg></span><small>Keypad</small></button>
          </div>
          ` : `
          <div class="iphone-call-secondary">
            <button type="button" disabled><span><svg viewBox="0 0 24 24" aria-hidden="true"><path class="is-filled" d="M4 4.5h16a2 2 0 0 1 2 2v8.8a2 2 0 0 1-2 2H10l-5.3 3.2.9-3.2H4a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z"/></svg></span><small>Message</small></button>
            <button type="button" disabled><span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6.5" cy="11.5" r="4"/><circle cx="17.5" cy="11.5" r="4"/><path d="M6.5 15.5h11"/></svg></span><small>Voicemail</small></button>
          </div>
          <div class="iphone-call-actions">
            <button class="iphone-call-decline" type="button" disabled aria-label="Decline call"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9c-1.6 0-3.15.25-4.6.7v3.1c0 .4-.25.75-.6.9-.85.4-1.65.9-2.35 1.5-.2.18-.45.3-.75.3s-.55-.1-.75-.3L.3 12.55c-.2-.2-.3-.45-.3-.75s.1-.55.3-.75C3.55 8.15 7.65 6.5 12 6.5s8.45 1.65 11.7 4.55c.2.2.3.45.3.75s-.1.55-.3.75l-2.65 2.65c-.2.2-.45.3-.75.3s-.55-.12-.75-.3c-.7-.6-1.5-1.1-2.35-1.5-.35-.15-.6-.5-.6-.9V9.7C15.15 9.25 13.6 9 12 9Z"/></svg></span><small>Decline</small></button>
            <button class="wa-call-answer" id="wa-call-answer" type="button" aria-label="Accept call"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"/></svg></span><small>Accept</small></button>
          </div>`}
      </section>`;
    document.querySelector("#wa-call-answer")?.addEventListener("click", () => {
      state.activeCall.connected = true;
      state.activeCall.startedAt = Date.now();
      state.activeCall.captionIndex = 0;
      saveState();
      render();
    });
    document.querySelector("#call-caption-next")?.addEventListener("click", advanceCallCaption);
    document.querySelector("#wa-call-end")?.addEventListener("click", finishActiveCall);
    if (call.connected) {
      scheduleCallDuration();
    } else {
      clearCallDurationTimer();
    }
  }

  function formatCallDuration(startedAt) {
    const elapsedSeconds = Math.max(0, Math.floor((Date.now() - (Number(startedAt) || Date.now())) / 1000));
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;
    return hours > 0
      ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function clearCallDurationTimer() {
    if (callRuntime.durationTimer) clearInterval(callRuntime.durationTimer);
    callRuntime.durationTimer = null;
  }

  function scheduleCallDuration() {
    clearCallDurationTimer();
    const updateDuration = () => {
      const label = document.querySelector("#iphone-call-status");
      if (label && state.activeCall?.connected) label.textContent = formatCallDuration(state.activeCall.startedAt);
    };
    updateDuration();
    callRuntime.durationTimer = setInterval(updateDuration, 1000);
  }

  function advanceCallCaption() {
    const call = state.activeCall;
    if (!call?.connected || !Number.isInteger(call.captionIndex) || call.captionIndex >= callCaptions.length - 1) return;
    call.captionIndex += 1;
    saveState();
    render();
  }

  function finishActiveCall() {
    const call = state.activeCall;
    if (!call?.connected) return;
    if (call.replay) {
      state.activeCall = null;
      clearCallDurationTimer();
      state.view = "phone";
      saveState();
      render();
      return;
    }
    state.callHistory.unshift({
      id: "call-dirga-story",
      threadId: call.threadId,
      name: getThread(call.threadId)?.name || "?",
      label: "mobile",
      time: call.time,
      dateLabel: "Today"
    });
    state.activeCall = null;
    clearCallDurationTimer();
    state.activeThreadId = call.threadId;
    state.view = "thread";
    advanceChatScript(call.threadId);
    if (call.afterCallStoryDate || call.afterCallStoryTime) {
      setStoryClock(call.afterCallStoryDate || state.storyDate, call.afterCallStoryTime || state.storyTime);
    }
    saveState();
    render();
  }

  function renderPlaceholder() {
    const app = [...config.apps, ...config.dockApps].find((item) => item.id === state.placeholderApp);
    const label = app?.label || (state.placeholderApp === "weather" ? "Weather" : state.placeholderApp) || "App";
    screen.innerHTML = `
      <section class="view app-view placeholder-view">
        ${appHeader(label)}
        <div class="empty-state"><span>○</span><strong>${escapeHtml(label)}</strong><p>Kerangka aplikasi sudah tersedia. Kontennya akan diisi setelah bahan ceritamu siap.</p></div>
      </section>`;
    bindBackButtons();
  }

  function renderSettings() {
    screen.innerHTML = `
      <section class="view app-view settings-view">
        ${appHeader("Pengaturan")}
        <div class="app-title"><p>YOUR PHONE</p><h1>Settings</h1></div>
        <div class="profile-card"><img src="assets/wallpapers/icon.jpg" alt="Profile"><div><strong>${escapeHtml(config.meta.owner)}</strong><small>Local story profile</small></div></div>
        <div class="settings-group">
          <div><span>PIN demo</span><strong>${escapeHtml(config.lock.pin)}</strong></div>
          <div><span>Theme</span><strong>Dark · Neutral</strong></div>
          <div><span>Storage</span><strong>Local browser</strong></div>
        </div>
        <button class="danger-button" id="reset-story" type="button">Reset seluruh cerita</button>
        <p class="settings-help">Edit konten di <code>story.js</code>, lalu refresh halaman.</p>
      </section>`;
    bindBackButtons();
    document.querySelector("#reset-story").addEventListener("click", resetStory);
  }

  function scheduleTimeline() {
    clearTimers();
    if (!state.unlocked || state.ending) return;
    if (!state.startedAt) state.startedAt = Date.now();
    const elapsed = Date.now() - state.startedAt;
    config.timeline.forEach((event) => {
      if (state.deliveredEvents.includes(event.id)) return;
      timers.push(setTimeout(() => deliverEvent(event), Math.max(80, event.afterMs - elapsed)));
    });
    saveState();
  }

  function deliverEvent(event) {
    if (state.deliveredEvents.includes(event.id)) return;
    state.deliveredEvents.push(event.id);
    addMessage(event.threadId, { from: "them", text: event.text, time: currentTime() }, state.view !== "thread" || state.activeThreadId !== event.threadId);
    if (event.activateNode) state.currentNode = event.activateNode;
    saveState();
    showToast(event);
    if (["home", "messages", "thread"].includes(state.view)) render();
  }

  function showToast(event) {
    const thread = getThread(event.threadId);
    const toast = document.createElement("button");
    toast.type = "button";
    toast.className = "notification-toast";
    toast.innerHTML = `${contactAvatarMarkup(thread || { avatar: "!", color: config.theme.accent })}<span><strong>${escapeHtml(event.notificationTitle || thread?.name || "Pesan")}</strong><small>${escapeHtml(event.text)}</small></span>`;
    toast.addEventListener("click", () => {
      state.activeThreadId = event.threadId;
      state.unread[event.threadId] = 0;
      state.view = "thread";
      toast.remove();
      saveState();
      render();
    });
    toastRegion.replaceChildren(toast);
    bindContactAvatarFallbacks();
    timers.push(setTimeout(() => toast.remove(), 5000));
  }

  function addMessage(threadId, message, markUnread) {
    if (!state.messages[threadId]) state.messages[threadId] = [];
    state.messages[threadId].push({ ...message, storyDate: message.storyDate || state.storyDate });
    if (markUnread && message.from === "them") state.unread[threadId] = (state.unread[threadId] || 0) + 1;
    saveState();
  }

  function getThread(id) {
    return config.threads.find((thread) => thread.id === id);
  }

  function contactAvatarMarkup(thread) {
    const initial = escapeHtml(thread?.avatar || "!");
    const color = escapeAttribute(thread?.color || config.theme.accent);
    const image = thread?.avatarSrc
      ? `<img class="contact-avatar-image" src="${escapeAttribute(thread.avatarSrc)}" alt="">`
      : "";
    return `<span class="avatar" style="--avatar-color:${color}"><span class="avatar__initial">${initial}</span>${image}</span>`;
  }

  function bindContactAvatarFallbacks() {
    document.querySelectorAll(".contact-avatar-image").forEach((image) => {
      const showInitial = () => image.classList.add("is-missing");
      if (image.complete && !image.naturalWidth) showInitial();
      image.addEventListener("error", showInitial, { once: true });
    });
  }

  function currentTime() {
    return state.storyTime;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }

  homeButton.addEventListener("click", () => {
    if (!state.unlocked || state.view === "incoming-call") return;
    const previousView = state.view;
    state.view = "home";
    activatePendingChatsAfterWhatsAppExit(previousView);
    saveState();
    render();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.unlocked && state.view !== "incoming-call") {
      const previousView = state.view;
      state.view = "home";
      activatePendingChatsAfterWhatsAppExit(previousView);
      saveState();
      render();
    }
    if (state.unlocked || state.view !== "lock" || !state.pinVisible) return;
    if (/^\d$/.test(event.key)) enterPin(event.key);
    if (event.key === "Backspace") deletePin();
  });

  window.addEventListener("resize", updateDeviceScale, { passive: true });
  window.addEventListener("orientationchange", updateDeviceScale, { passive: true });
  updateDeviceScale();
  reconcileCompletedChatTriggers();
  if (repairStoryTriggers()) reconcileCompletedChatTriggers();
  render();
  if (state.unlocked) scheduleTimeline();
})();
