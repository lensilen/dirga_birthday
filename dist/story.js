/*
 * ISI PONSEL — file utama yang nanti kamu edit.
 *
 * Aturan singkat:
 * - 1000 ms = 1 detik.
 * - WhatsApp dipakai untuk percakapan antartokoh.
 * - Messages dipakai untuk SMS operator, OTP, dan promo.
 * - Timeline, branches, percakapan lanjutan, dan missed call dapat ditambah setelah naskah final.
 */

window.STORY_CONFIG = {
  meta: {
    title: "Your Phone",
    owner: "Your Phone",
    subtitle: "",
    dateLabel: "Tuesday, November 17"
  },

  lock: {
    pin: "1117",
    hint: "Swipe up to unlock"
  },

  theme: {
    accent: "#8e8e93",
    accentSoft: "#d1d1d6",
    lockWallpaper: "url('assets/wallpapers/lockscreen.png') center / cover no-repeat",
    homeWallpaper: "url('assets/wallpapers/homescreen.jpg') center / cover no-repeat"
  },

  apps: [
    { id: "calendar", label: "Calendar", iconSrc: "assets/icons/apps/calendar.png" },
    { id: "photos", label: "Photos", iconSrc: "assets/icons/apps/photos.png" },
    { id: "camera", label: "Camera", iconSrc: "assets/icons/apps/camera.png", disabled: true },
    { id: "maps", label: "Maps", iconSrc: "assets/icons/apps/maps.png", disabled: true },
    { id: "whatsapp", label: "WhatsApp", iconSrc: "assets/icons/apps/whatsapp.png", icon: "☏", color: "#25d366" },
    { id: "notes", label: "Notes", iconSrc: "assets/icons/apps/notess.png" },
    { id: "spotify", label: "Spotify", iconSrc: "assets/icons/apps/spotify.png" },
    { id: "instagram", label: "Instagram", iconSrc: "assets/icons/apps/instagram.png" },
    { id: "x", label: "X", iconSrc: "assets/icons/apps/x-custom.png" },
    { id: "gmail", label: "Gmail", iconSrc: "assets/icons/apps/gmail.png" },
    { id: "settings", label: "Settings", iconSrc: "assets/icons/apps/Settings_(iOS).png", disabled: true }
  ],

  dockApps: [
    { id: "phone", label: "Phone", iconSrc: "assets/icons/apps/phone.png" },
    { id: "safari", label: "Safari", iconSrc: "assets/icons/apps/safari.png", disabled: true },
    { id: "messages", label: "Messages", iconSrc: "assets/icons/apps/messages.png", disabled: true }
  ],

  /* WhatsApp — percakapan utama cerita akan dimasukkan di sini. */
  threads: [
    {
      id: "dirga",
      name: "?",
      avatar: "D",
      avatarSrc: "assets/avatars/whatsapp/dirga.jpg",
      color: "#4f5965",
      status: "online",
      initialMessages: []
    },
    {
      id: "petra",
      name: "Petra",
      initialDate: "2026-11-17",
      avatar: "P",
      avatarSrc: "assets/avatars/whatsapp/petra.jpg",
      color: "#8b6f83",
      status: "online",
      initialMessages: [
        { from: "them", text: "Morning, manusia sibuk", time: "07:48" },
        { from: "me", text: "Morninggg", time: "07:49" },
        { from: "them", text: "Lo free Sabtu gak? Ngopi yuk", time: "07:50" },
        { from: "me", text: "Harusnya bisaa, gue cek kerjaan dulu yaa", time: "07:52" },
        { from: "them", text: "Jawaban paling lo banget", time: "07:52" }
      ]
    },
    {
      id: "bintang",
      name: "Bintang Marketing Team",
      initialDate: "2026-11-17",
      avatar: "B",
      avatarSrc: "assets/avatars/whatsapp/bintang.jpg",
      color: "#7c8f83",
      status: "online",
      initialMessages: [
        { from: "them", text: "Kak, PR package sudah sampai", time: "10:18" },
        { from: "them", text: "Tapi jumlahnya belum aku cek semua", time: "10:18" },
        { from: "me", text: "Oke, kabarin sebelum makan siang please", time: "10:20" },
        { from: "them", text: "Siap Kak", time: "10:20" }
      ]
    },
    {
      id: "maria",
      name: "Maria Marketing Team",
      initialDate: "2026-11-17",
      avatar: "M",
      avatarSrc: "assets/avatars/whatsapp/maria.jpg",
      color: "#7b6f93",
      status: "last seen today at 10:02",
      initialMessages: [
        { from: "them", text: "Kak, talent kedua confirm bisa fitting jam 3", time: "09:06" },
        { from: "me", text: "Oke, hold slotnya dulu ya", time: "09:08" },
        { from: "me", text: "Deck finalnya sekalian kirim ke aku", time: "09:09" },
        { from: "them", text: "Siap Kak", time: "09:10" }
      ]
    },
    {
      id: "adelina",
      name: "Adelina Marketing Team",
      initialDate: "2026-11-17",
      avatar: "A",
      avatarSrc: "assets/avatars/whatsapp/adelina.jpg",
      color: "#8e755f",
      status: "online",
      initialMessages: [
        { from: "them", text: "Kak, versi caption yang less jualan udah aku taruh di deck", time: "08:34" },
        { from: "me", text: "Aku cek habis meeting yaa", time: "08:36" },
        { from: "them", text: "Okee Kak", time: "08:36" }
      ]
    },
    {
      id: "satrio",
      name: "Pak Satrio Legal",
      initialDate: "2026-11-15",
      avatar: "S",
      avatarSrc: "assets/avatars/whatsapp/satrio.jpg",
      color: "#67788f",
      status: "last seen today at 09:47",
      dayLabel: "SUNDAY",
      listTime: "Sunday",
      initialMessages: [
        { from: "me", text: "Ulang tahun Pak Dirga kapan ya? Aku takut salah tanggal", time: "09:42" },
        { from: "them", text: "Tanggal 17. Gue cek lagi di kalender kantor ya", time: "09:47" }
      ]
    },
    {
      id: "mama",
      name: "Mama",
      initialDate: "2026-11-17",
      avatar: "M",
      avatarSrc: "assets/avatars/whatsapp/mama.jpg",
      color: "#9a7f74",
      status: "online",
      initialMessages: [
        { from: "them", text: "Jangan lupa makan siang", time: "08:11" },
        { from: "me", text: "Iya Ma, nanti aku telepon", time: "08:16" }
      ]
    }
  ],

  /*
   * Percakapan interaktif.
   * - mc: teks menjadi draft; pemain harus menekan Send.
   * - them: tampil setelah jeda dan indikator mengetik.
   * - missed_call: menjadi kartu missed voice call di dalam chat.
   * Semua waktu menggunakan milidetik: 1000 = 1 detik.
   */
  chatScripts: {
    dirga: {
      storyDate: "2026-11-17",
      onComplete: {
        activateChatOnExit: "petra"
      },
      steps: [
        { type: "mc", text: "Happy birthday, Pak Dirga 🎉 semoga tahun ini less damage control dan lebih banyak tidur", waitBefore: 250 },
        { type: "them", text: "That is a very specific prayer", waitBefore: 1800, typingMs: 1800 },
        { type: "them", text: "Terima kasih, Bu", waitBefore: 600, typingMs: 1000 },
        { type: "mc", text: "Hadiahnya mau apa?", waitBefore: 650 },
        { type: "mc", text: "Anything deh selama masih bisa saya lakuin", waitBefore: 350 },
        { type: "them", text: "Careful, Bu", waitBefore: 2200, typingMs: 1500 },
        { type: "them", text: "That's a dangerous offer", waitBefore: 500, typingMs: 1500 },
        { type: "mc", text: "Ya jangan aneh aneh...", waitBefore: 550 },
        { type: "them", text: "Then I want your time", waitBefore: 2300, typingMs: 2300 },
        { type: "mc", text: "My time...?", waitBefore: 650 },
        { type: "them", text: "Dinner setelah kerja", waitBefore: 1800, typingMs: 1900 },
        { type: "them", text: "No documents, no meetings, no legal advice", waitBefore: 500, typingMs: 1500 },
        { type: "mc", text: "That sounds suspiciously personal", waitBefore: 650 },
        { type: "them", text: "It is", waitBefore: 2400, typingMs: 1100 }
      ]
    },
    petra: {
      storyDate: "2026-11-17",
      active: false,
      onComplete: {
        id: "chapter-3-dirga-home",
        threadId: "dirga",
        notificationTitle: "?",
        text: "Sudah masuk?",
        storyDate: "2026-11-17",
        time: "22:41",
        afterMs: 4000,
        requireAppExit: true,
        activateChatScript: "dirga_after_dinner",
        calendarEvents: [
          { id: "dinner-dirga-17-nov", date: "2026-11-17", title: "Dinner with Pak Dirga", time: "7:30 PM", color: "#ff375f", type: "personal" }
        ]
      },
      steps: [
        { type: "mc", text: "Pet... gue barusan diajak dinner sama Pak Dirga", waitBefore: 4000 },
        { type: "them", text: "HAH???", waitBefore: 1800, typingMs: 900, requireAppExit: true },
        { type: "mc", text: "Iya... katanya hadiah ulang tahun", waitBefore: 500 },
        { type: "them", text: "Gue perlu konteks yang jauh lebih lengkap dari ini", waitBefore: 1600, typingMs: 1400 },
        { type: "mc", text: "Gue juga masih proses ini...", waitBefore: 500 }
      ]
    },
    dirga_after_dinner: {
      threadId: "dirga",
      storyDate: "2026-11-17",
      active: false,
      onComplete: {
        calendarEvents: [
          {
            id: "coffee-dirga-21-nov",
            date: "2026-11-21",
            title: "Coffee with ?",
            time: "4:00 PM",
            color: "#ff375f",
            type: "personal",
            trigger: {
              id: "coffee-dirga-arrival",
              threadId: "dirga",
              notificationTitle: "?",
              text: "I'm downstairs",
              storyDate: "2026-11-21",
              time: "15:52",
              afterMs: 2200,
              blockedViews: ["calendar"],
              activateChatScript: "dirga_coffee_arrival"
            }
          }
        ]
      },
      steps: [
        { type: "mc", text: "Udah... baru masuk", time: "22:41", waitBefore: 450 },
        { type: "them", text: "Good", time: "22:41", waitBefore: 1400, typingMs: 700 },
        { type: "them", text: "Thank you for tonight", time: "22:42", waitBefore: 550, typingMs: 1200 },
        { type: "mc", text: "Sama samaa", time: "22:42", waitBefore: 550 },
        { type: "them", text: "I realized something", time: "22:43", waitBefore: 1900, typingMs: 1300 },
        { type: "mc", text: "Apa?", time: "22:43", waitBefore: 650 },
        { type: "them", text: "Time moves differently outside the office", time: "22:44", waitBefore: 2100, typingMs: 1900 },
        { type: "them", text: "Dinner tadi rasanya terlalu cepat selesai", time: "22:44", waitBefore: 650, typingMs: 1700 },
        { type: "mc", text: "Maksudnya...?", time: "22:45", waitBefore: 650 },
        { type: "them", text: "I don't think one evening was enough", time: "22:45", waitBefore: 2200, typingMs: 1900 },
        { type: "mc", text: "Pak Dirga lagi minta hadiah tambahan ya?", time: "22:46", waitBefore: 650 },
        { type: "them", text: "That depends", time: "22:46", waitBefore: 1700, typingMs: 900 },
        { type: "them", text: "Kalau saya minta waktu kamu lagi, does it still count as a birthday gift?", time: "22:47", waitBefore: 650, typingMs: 2300 },
        { type: "mc", text: "Kalau weekend... mungkin masih bisa", time: "22:48", waitBefore: 750 },
        { type: "them", text: "Saturday, then", time: "22:48", waitBefore: 1700, typingMs: 1000 },
        { type: "mc", text: "Cepet banget mutusinnya", time: "22:49", waitBefore: 650 },
        { type: "them", text: "You said maybe", time: "22:49", waitBefore: 1500, typingMs: 900 },
        { type: "them", text: "Saya memilih dengar bagian yang saya suka", time: "22:50", waitBefore: 500, typingMs: 1700 }
      ]
    },
    dirga_coffee_arrival: {
      threadId: "dirga",
      storyDate: "2026-11-21",
      active: false,
      onComplete: {
        id: "after-coffee-home-check",
        threadId: "dirga",
        notificationTitle: "?",
        text: "Home yet?",
        storyDate: "2026-11-21",
        time: "18:42",
        afterMs: 7000,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_after_coffee"
      },
      steps: [
        { type: "mc", text: "You said four", time: "15:52", waitBefore: 450 },
        { type: "them", text: "It is 3:52", time: "15:52", waitBefore: 1500, typingMs: 900 },
        { type: "mc", text: "Exactly", time: "15:53", waitBefore: 550 },
        { type: "them", text: "Eight minutes is not that early", time: "15:53", waitBefore: 1700, typingMs: 1400 },
        { type: "them", text: "Take your time", time: "15:53", waitBefore: 500, typingMs: 900 }
      ]
    },
    dirga_after_coffee: {
      threadId: "dirga",
      storyDate: "2026-11-21",
      active: false,
      onComplete: {
        id: "home-arrival-follow-up",
        threadId: "dirga",
        notificationTitle: "?",
        text: "Still on the road?",
        storyDate: "2026-11-21",
        time: "19:17",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_home_arrival"
      },
      steps: [
        { type: "mc", text: "Belum... baru jalan", time: "18:42", waitBefore: 550 },
        { type: "them", text: "Alright", time: "18:43", waitBefore: 1500, typingMs: 750 },
        { type: "them", text: "Let me know when you get home", time: "18:43", waitBefore: 550, typingMs: 1500 },
        { type: "mc", text: "I willl", time: "18:44", waitBefore: 650 }
      ]
    },
    dirga_home_arrival: {
      threadId: "dirga",
      storyDate: "2026-11-21",
      onComplete: {
        id: "second-meeting-plan-check",
        threadId: "dirga",
        notificationTitle: "?",
        text: "How attached are you to your Saturday plans?",
        storyDate: "2026-11-26",
        time: "20:14",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_second_meeting_invite"
      },
      active: false,
      steps: [
        { type: "mc", text: "Baru sampeee", time: "19:17", waitBefore: 550 },
        { type: "them", text: "Good", time: "19:18", waitBefore: 1300, typingMs: 650 },
        { type: "them", text: "I was about to call", time: "19:18", waitBefore: 500, typingMs: 1100 },
        { type: "mc", text: "Dramatis banget Pak... saya baru telat ngabarin dikit", time: "19:19", waitBefore: 650 },
        { type: "them", text: "Says the person who promised to text", time: "19:20", waitBefore: 1500, typingMs: 1450 },
        { type: "mc", text: "I remembered eventually... technically", time: "19:20", waitBefore: 600 },
        { type: "them", text: "Barely", time: "19:21", waitBefore: 1200, typingMs: 650 },
        { type: "them", text: "Get some rest", time: "19:21", waitBefore: 450, typingMs: 850 },
        { type: "mc", text: "You too... makasih yaa buat hari ini", time: "19:22", waitBefore: 650 },
        { type: "them", text: "I should be thanking you", time: "19:22", waitBefore: 1500, typingMs: 1150 },
        { type: "them", text: "Today was nice", time: "19:23", waitBefore: 450, typingMs: 900 },
        { type: "mc", text: "Iya... nice banget malah", time: "19:23", waitBefore: 600 },
        { type: "them", text: "That sounded reluctant", time: "19:24", waitBefore: 1350, typingMs: 1050 },
        { type: "mc", text: "Enggaaa, bukan gitu maksudnya", time: "19:24", waitBefore: 550 },
        { type: "them", text: "Good", time: "19:25", waitBefore: 1200, typingMs: 650 },
        { type: "them", text: "Because I was hoping we could do it again", time: "19:25", waitBefore: 500, typingMs: 1700 },
        { type: "mc", text: "Oh...", time: "19:26", waitBefore: 700 },
        { type: "mc", text: "Iya... saya juga mau", time: "19:26", waitBefore: 450 },
        { type: "them", text: "Good, then", time: "19:27", waitBefore: 1600, typingMs: 900 },
        { type: "them", text: "Then don't make plans for next Saturday evening", time: "19:27", waitBefore: 550, typingMs: 1800 },
        { type: "mc", text: "Itu ngajak atau nyuruh sih", time: "19:28", waitBefore: 650 },
        { type: "them", text: "Whichever gets you there", time: "19:29", waitBefore: 1700, typingMs: 1300 }
      ]
    },
    dirga_second_meeting_invite: {
      threadId: "dirga",
      storyDate: "2026-11-26",
      active: false,
      onComplete: {
        id: "second-meeting-arrival",
        threadId: "dirga",
        notificationTitle: "?",
        text: "I'm here",
        storyDate: "2026-11-28",
        time: "17:54",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        blockedViews: ["whatsapp", "thread", "calendar"],
        activateChatScript: "dirga_second_meeting_arrival",
        calendarEvents: [
          { id: "second-meeting-dirga-28-nov", date: "2026-11-28", title: "Dinner with ?", time: "6:00 PM", color: "#ff375f", type: "personal" }
        ]
      },
      steps: [
        { type: "mc", text: "Depends... kenapa?", time: "20:14", waitBefore: 650 },
        { type: "them", text: "I may have found somewhere", time: "20:15", waitBefore: 1700, typingMs: 1400 },
        { type: "them", text: "Saturday, six", time: "20:15", waitBefore: 500, typingMs: 900 },
        { type: "mc", text: "Pak ini ngajak atau ngasih jadwal sih", time: "20:16", waitBefore: 650 },
        { type: "them", text: "Does it matter if you're saying yes?", time: "20:16", waitBefore: 1700, typingMs: 1500 },
        { type: "mc", text: "Yaudah... yes", time: "20:17", waitBefore: 700 },
        { type: "them", text: "Good choice", time: "20:17", waitBefore: 1400, typingMs: 800 },
        { type: "them", text: "I'll pick you up", time: "20:18", waitBefore: 450, typingMs: 1000 }
      ]
    },
    dirga_second_meeting_arrival: {
      threadId: "dirga",
      storyDate: "2026-11-28",
      active: false,
      onComplete: {
        id: "after-second-meeting-home-check",
        threadId: "dirga",
        notificationTitle: "?",
        text: "Home safe?",
        storyDate: "2026-11-28",
        time: "22:36",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_after_second_meeting"
      },
      steps: [
        { type: "mc", text: "Six means six, Pak", time: "17:54", waitBefore: 550 },
        { type: "them", text: "It is 5:54", time: "17:54", waitBefore: 1400, typingMs: 850 },
        { type: "mc", text: "You did this last time", time: "17:55", waitBefore: 600 },
        { type: "them", text: "And you still came down late", time: "17:55", waitBefore: 1600, typingMs: 1300 },
        { type: "mc", text: "Saya baru mau turun...", time: "17:56", waitBefore: 650 },
        { type: "them", text: "Take your time, I'll wait", time: "17:56", waitBefore: 1400, typingMs: 1100 }
      ]
    },
    dirga_after_second_meeting: {
      threadId: "dirga",
      storyDate: "2026-11-28",
      active: false,
      onComplete: {
        id: "second-meeting-petra-checkin",
        threadId: "petra",
        notificationTitle: "Petra",
        text: "Udah kelar jalannya?",
        storyDate: "2026-11-28",
        time: "22:44",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "petra_second_meeting_report"
      },
      steps: [
        { type: "mc", text: "Udah... baru masuk", time: "22:36", waitBefore: 600 },
        { type: "them", text: "That's good", time: "22:37", waitBefore: 1400, typingMs: 750 },
        { type: "them", text: "Thank you for tonight", time: "22:37", waitBefore: 500, typingMs: 1200 },
        { type: "mc", text: "Harusnya saya yang bilang makasih...", time: "22:38", waitBefore: 650 },
        { type: "them", text: "You looked like you needed a night away from work", time: "22:39", waitBefore: 1700, typingMs: 1700 },
        { type: "mc", text: "Kelihatan banget yaa", time: "22:39", waitBefore: 650 },
        { type: "them", text: "Only to me", time: "22:40", waitBefore: 1700, typingMs: 950 },
        { type: "mc", text: "...", time: "22:40", waitBefore: 850 },
        { type: "them", text: "Was that too honest?", time: "22:41", waitBefore: 1800, typingMs: 1250 },
        { type: "mc", text: "Sedikit...", time: "22:41", waitBefore: 700 },
        { type: "them", text: "Do you want me to take it back?", time: "22:42", waitBefore: 1600, typingMs: 1400 },
        { type: "mc", text: "Engga", time: "22:42", waitBefore: 750 },
        { type: "them", text: "Good", time: "22:43", waitBefore: 1500, typingMs: 700 },
        { type: "them", text: "Because I meant it", time: "22:43", waitBefore: 500, typingMs: 1100 }
      ]
    },
    petra_second_meeting_report: {
      threadId: "petra",
      storyDate: "2026-11-28",
      active: false,
      onComplete: {
        id: "wrong-chat-dirga-opening",
        threadId: "dirga",
        notificationTitle: "?",
        text: "Still awake?",
        storyDate: "2026-11-28",
        time: "22:47",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_wrong_send"
      },
      steps: [
        { type: "mc", text: "Udah... baru sampe", time: "22:44", waitBefore: 550 },
        { type: "them", text: "Terus gimanaaa", time: "22:45", waitBefore: 1400, typingMs: 850 },
        { type: "mc", text: "Bentar gue kirim fotonya", time: "22:45", waitBefore: 650 }
      ]
    },
    dirga_wrong_send: {
      threadId: "dirga",
      storyDate: "2026-11-28",
      active: false,
      onComplete: {
        id: "wrong-send-petra-follow-up",
        threadId: "petra",
        notificationTitle: "Petra",
        text: "Mana fotonya woy",
        storyDate: "2026-11-28",
        time: "22:52",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "petra_wrong_send"
      },
      steps: [
        { type: "mc", text: "GANTENG BANGET???", imageSrc: "assets/photos/gallery/Dion Windsor _ The unwanted marriage.jpg", imageAlt: "Photo of Dirga during the second meeting", time: "22:47", waitBefore: 1200 },
        { type: "them", text: "I'm going to assume that wasn't meant for me", time: "22:48", waitBefore: 1900, typingMs: 1700 },
        { type: "mc", text: "...", time: "22:48", waitBefore: 850 },
        { type: "mc", text: "Pak", time: "22:48", waitBefore: 350 },
        { type: "mc", text: "Tolong hapus dari ingatan", time: "22:49", waitBefore: 450 },
        { type: "them", text: "I don't think I can", time: "22:49", waitBefore: 1700, typingMs: 1000 },
        { type: "mc", text: "Itu buat Petra...", time: "22:50", waitBefore: 650 },
        { type: "them", text: "I figured", time: "22:50", waitBefore: 1500, typingMs: 800 },
        { type: "them", text: "For what it's worth", time: "22:50", waitBefore: 450, typingMs: 1000 },
        { type: "them", text: "I was hoping you thought so", time: "22:51", waitBefore: 450, typingMs: 1300 },
        { type: "mc", text: "Saya gak akan buka WhatsApp lagi", time: "22:51", waitBefore: 750 },
        { type: "them", text: "You will", time: "22:51", waitBefore: 1400, typingMs: 700 }
      ]
    },
    petra_wrong_send: {
      threadId: "petra",
      storyDate: "2026-11-28",
      active: false,
      onComplete: {
        id: "late-revision-from-maria",
        threadId: "maria",
        notificationTitle: "Maria Marketing Team",
        text: "Kak, legal copy yang terakhir masih ditunggu malam ini ya",
        storyDate: "2026-11-30",
        time: "20:56",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "maria_late_revision"
      },
      steps: [
        { type: "mc", text: "PET", time: "22:52", waitBefore: 500 },
        { type: "mc", text: "GUE SALAH KIRIM", time: "22:52", waitBefore: 350 },
        { type: "them", text: "KE SIAPA", time: "22:53", waitBefore: 1300, typingMs: 700 },
        { type: "mc", text: "KE ORANGNYA LANGSUNG", time: "22:53", waitBefore: 500 },
        { type: "them", text: "HAHAHAHAHAH", time: "22:54", waitBefore: 1300, typingMs: 800 },
        { type: "mc", text: "GUE SERIUS INI GIMANA", time: "22:54", waitBefore: 550 },
        { type: "them", text: "Yaudah sekalian bilang lo suka", time: "22:55", waitBefore: 1500, typingMs: 1200 },
        { type: "mc", text: "Gue block lo ya", time: "22:55", waitBefore: 650 }
      ]
    },
    maria_late_revision: {
      threadId: "maria",
      storyDate: "2026-11-30",
      active: false,
      onComplete: {
        activateChatOnExit: "dirga_work_night"
      },
      steps: [
        { type: "mc", text: "Okee, aku cek ke Pak Dirga dulu ya", time: "20:56", waitBefore: 600 },
        { type: "them", text: "Siap Kak", time: "20:57", waitBefore: 1400, typingMs: 800 }
      ]
    },
    dirga_work_night: {
      threadId: "dirga",
      storyDate: "2026-11-30",
      active: false,
      onComplete: {
        activateChatOnExit: "dirga_after_work_personal"
      },
      steps: [
        { type: "mc", text: "Pak masih di kantor?", storyDate: "2026-11-30", time: "20:58", waitBefore: 650 },
        { type: "them", text: "Unfortunately", time: "20:58", waitBefore: 1500, typingMs: 850 },
        { type: "mc", text: "Masih lama?", time: "20:59", waitBefore: 600 },
        { type: "them", text: "An hour", time: "20:59", waitBefore: 1400, typingMs: 700 },
        { type: "them", text: "Maybe two", time: "21:00", waitBefore: 450, typingMs: 700 },
        { type: "mc", text: "Saya temenin deh", time: "21:00", waitBefore: 700 },
        { type: "them", text: "You don't have to", time: "21:01", waitBefore: 1700, typingMs: 1100 },
        { type: "mc", text: "I know... tapi saya mau", time: "21:01", waitBefore: 700 },
        { type: "them", text: "Then stay", time: "21:02", waitBefore: 1700, typingMs: 900 }
      ]
    },
    dirga_after_work_personal: {
      threadId: "dirga",
      storyDate: "2026-11-30",
      active: false,
      onComplete: {
        id: "morning-after-work",
        threadId: "dirga",
        notificationTitle: "?",
        text: "Morning",
        storyDate: "2026-12-01",
        time: "08:12",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_morning_check"
      },
      steps: [
        { type: "mc", text: "Makasih tadi, Pak", storyDate: "2026-11-30", time: "23:36", waitBefore: 750 },
        { type: "them", text: "For what?", time: "23:36", waitBefore: 1500, typingMs: 800 },
        { type: "mc", text: "Benerin sepatu saya...", time: "23:37", waitBefore: 700 },
        { type: "them", text: "You can drop the ‘Pak’ when we're outside the office", time: "23:37", waitBefore: 1700, typingMs: 1500 },
        { type: "mc", text: "...Dirga", time: "23:38", waitBefore: 850 },
        { type: "them", text: "Better", time: "23:38", waitBefore: 1400, typingMs: 700 },
        { type: "mc", text: "Ini agak memalukan", time: "23:39", waitBefore: 700 },
        { type: "them", text: "You sent me a photo with ‘GANTENG BANGET’ written under it", time: "23:39", waitBefore: 1700, typingMs: 1800 },
        { type: "them", text: "I think we're past that", time: "23:40", waitBefore: 500, typingMs: 1000 },
        { type: "mc", text: "Please jangan diungkit lagi...", time: "23:40", waitBefore: 750 },
        { type: "them", text: "No promises", time: "23:41", waitBefore: 1500, typingMs: 850 },
        { type: "them", text: "You would've tripped", time: "23:41", waitBefore: 450, typingMs: 1000 },
        { type: "mc", text: "Tetep aja... makasih", time: "23:42", waitBefore: 650 },
        { type: "them", text: "You're welcome", time: "23:42", waitBefore: 1400, typingMs: 850 },
        { type: "them", text: "Next time wear sensible shoes", time: "23:43", waitBefore: 500, typingMs: 1200 },
        { type: "mc", text: "Next time jangan bikin aku nemenin lembur", time: "23:43", waitBefore: 700 },
        { type: "them", text: "You offered", time: "23:44", waitBefore: 1500, typingMs: 750 },
        { type: "mc", text: "I know...", time: "23:44", waitBefore: 650 },
        { type: "them", text: "And you'd do it again", time: "23:45", waitBefore: 1600, typingMs: 1100 },
        { type: "mc", text: "Jangan pede dulu", time: "23:45", waitBefore: 650 },
        { type: "them", text: "Too late", time: "23:46", waitBefore: 1400, typingMs: 750 }
      ]
    },
    dirga_morning_check: {
      threadId: "dirga",
      storyDate: "2026-12-01",
      active: false,
      onComplete: {
        id: "december-meetup-opening",
        threadId: "dirga",
        notificationTitle: "?",
        text: "Done with work?",
        storyDate: "2026-12-05",
        time: "18:08",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_december_meetup",
        calendarEvents: [
          { id: "us-dirga-5-dec", date: "2026-12-05", title: "Us?", time: "6:30 PM", color: "#ff375f", type: "romantic" }
        ]
      },
      steps: [
        { type: "mc", text: "Morning", time: "08:12", waitBefore: 550 },
        { type: "them", text: "How's your ankle?", time: "08:13", waitBefore: 1400, typingMs: 850 },
        { type: "mc", text: "Masih utuh kok", time: "08:13", waitBefore: 600 },
        { type: "them", text: "That's not what I asked", time: "08:14", waitBefore: 1500, typingMs: 1000 },
        { type: "mc", text: "Masih agak sakit dikit", time: "08:14", waitBefore: 650 },
        { type: "them", text: "Ice it after work", time: "08:15", waitBefore: 1400, typingMs: 850 },
        { type: "mc", text: "Siap, Pak", time: "08:15", waitBefore: 600 },
        { type: "them", text: "I thought we settled this last night", time: "08:16", waitBefore: 1600, typingMs: 1200 },
        { type: "mc", text: "Morning, Dirga", time: "08:16", waitBefore: 700 },
        { type: "them", text: "Better", time: "08:17", waitBefore: 1400, typingMs: 700 }
      ]
    },
    dirga_december_meetup: {
      threadId: "dirga",
      storyDate: "2026-12-05",
      active: false,
      onComplete: {
        id: "december-meetup-home-check",
        threadId: "dirga",
        notificationTitle: "?",
        text: "Home?",
        storyDate: "2026-12-05",
        time: "22:14",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_december_clarity"
      },
      steps: [
        { type: "mc", text: "Baru selesai", time: "18:08", waitBefore: 600 },
        { type: "them", text: "Good", time: "18:09", waitBefore: 1400, typingMs: 700 },
        { type: "them", text: "I'm downstairs", time: "18:09", waitBefore: 450, typingMs: 900 },
        { type: "mc", text: "KOK GAK BILANG DULU", time: "18:10", waitBefore: 650 },
        { type: "them", text: "You would've said you were busy", time: "18:10", waitBefore: 1500, typingMs: 1200 },
        { type: "mc", text: "Karena emang sibuk", time: "18:11", waitBefore: 600 },
        { type: "them", text: "And yet you're still coming down", time: "18:11", waitBefore: 1500, typingMs: 1100 }
      ]
    },
    dirga_december_clarity: {
      threadId: "dirga",
      storyDate: "2026-12-05",
      active: false,
      steps: [
        { type: "mc", text: "Udah", time: "22:14", waitBefore: 600 },
        { type: "mc", text: "Dirga", time: "22:15", waitBefore: 450 },
        { type: "them", text: "Yes?", time: "22:15", waitBefore: 1500, typingMs: 700 },
        { type: "mc", text: "Kamu emang selalu sebaik ini ke semua orang?", time: "22:16", waitBefore: 700 },
        { type: "them", text: "No", time: "22:16", waitBefore: 1700, typingMs: 700 },
        { type: "them", text: "I don't remember everyone's coffee order or wait downstairs for everyone", time: "22:17", waitBefore: 500, typingMs: 1900 },
        { type: "them", text: "I've been trying to make this obvious without making you uncomfortable", time: "22:18", waitBefore: 650, typingMs: 2000 },
        { type: "mc", text: "Jadi kamu...", time: "22:18", waitBefore: 800 },
        { type: "them", text: "I'm pursuing you, yes", time: "22:19", waitBefore: 1800, typingMs: 1100 },
        { type: "them", text: "Slowly, if you'll let me", time: "22:19", waitBefore: 500, typingMs: 1100 },
        { type: "mc", text: "Aku gak bilang jangan", time: "22:20", waitBefore: 850 },
        { type: "them", text: "Good", time: "22:20", waitBefore: 1600, typingMs: 700 }
      ]
    }
  },

  /* Messages — hanya SMS layanan, operator, OTP, dan promo. */
  smsThreads: [
    {
      id: "operator",
      name: "Operator",
      sender: "INFO",
      messages: [
        { text: "Sisa kuota internet Anda 2.1 GB dan aktif sampai 20 November 2026.", time: "08:03" }
      ]
    },
    {
      id: "food-promo",
      name: "Food Deals",
      sender: "PROMO",
      messages: [
        { text: "Diskon makan siang hingga 40% hari ini. Syarat dan ketentuan berlaku.", time: "11:12" }
      ]
    },
    {
      id: "delivery",
      name: "Delivery",
      sender: "UPDATE",
      messages: [
        { text: "Pesanan Anda sedang dalam perjalanan. Pastikan nomor telepon dapat dihubungi.", time: "Kemarin" }
      ]
    }
  ],

  /* Gmail — inbox kerja pada awal cerita, sebelum proyek Singapura diketahui MC. */
  gmail: {
    accountName: "Your Phone",
    accountEmail: "lead.marketing@company.co.id",
    profileImage: "assets/wallpapers/icon.jpg",
    emails: [
      {
        id: "legal-copy-tonight",
        sender: "Maria Marketing Team",
        senderEmail: "maria@company.co.id",
        avatar: "M",
        color: "#e8710a",
        subject: "Urgent: final legal copy malam ini",
        snippet: "Versi terakhir masih menunggu pengecekan legal sebelum dikirim",
        time: "8:49 PM",
        unread: true,
        availableAfter: "maria_late_revision",
        body: [
          "Kak,",
          "Final copy untuk teaser sudah aku rapikan sesuai revisi terakhir, tapi versi ini masih menunggu pengecekan legal sebelum dikirim ke agency",
          "Kalau memungkinkan kami butuh clearance malam ini supaya jadwal besok tidak bergeser",
          "Thank you\nMaria"
        ]
      },
      {
        id: "legal-copy-cleared",
        sender: "Dirga Legal",
        senderEmail: "dirga@company.co.id",
        avatar: "D",
        color: "#5f6368",
        subject: "Re: Final teaser copy cleared",
        snippet: "Versi terakhir sudah aman dikirim ke agency",
        time: "10:18 PM",
        unread: false,
        availableAfter: "dirga_work_night",
        body: [
          "Bu,",
          "Final teaser copy sudah selesai saya review dan versi terakhir aman dikirim ke agency",
          "Tidak ada catatan tambahan dari legal",
          "Regards\nDirga"
        ]
      },
      {
        id: "final-kv",
        sender: "Nadia Northstar Agency",
        senderEmail: "nadia@northstar-agency.co.id",
        avatar: "N",
        color: "#4285f4",
        subject: "Re: Final KV campaign lip tint",
        snippet: "Final artwork sudah kami update sesuai catatan terakhir",
        time: "11:38 AM",
        unread: true,
        body: [
          "Hi Bu,",
          "Final artwork untuk campaign lip tint sudah kami update sesuai catatan terakhir, termasuk adjustment pada product shot dan hierarchy headline",
          "Mohon final approval sebelum jam 2 supaya file turunannya bisa langsung kami kerjakan",
          "Thank you,\nNadia"
        ]
      },
      {
        id: "talent-fitting",
        sender: "Raka Talent Management",
        senderEmail: "raka@talentmanagement.id",
        avatar: "R",
        color: "#a142f4",
        subject: "Fitting schedule confirmation",
        snippet: "Talent kedua sudah confirm untuk fitting pukul 15.00",
        time: "10:04 AM",
        unread: true,
        body: [
          "Hi Bu,",
          "Confirming bahwa talent kedua tersedia untuk fitting hari ini pukul 15.00 di studio lantai 8",
          "Wardrobe references dan measurement sheet sudah kami lampirkan di email sebelumnya",
          "Best,\nRaka"
        ]
      },
      {
        id: "legal-release",
        sender: "Dirga Legal",
        senderEmail: "dirga@company.co.id",
        avatar: "D",
        color: "#5f6368",
        subject: "Re: Talent release form revised clauses",
        snippet: "Revisi untuk usage period dan regional rights sudah selesai",
        time: "9:12 AM",
        unread: false,
        body: [
          "Bu,",
          "Revisi untuk usage period dan regional rights sudah selesai saya review",
          "Versi ini aman digunakan setelah agency melengkapi tanggal efektif pada halaman terakhir",
          "Regards,\nDirga"
        ]
      },
      {
        id: "ads-budget",
        sender: "Finance Team",
        senderEmail: "finance@company.co.id",
        avatar: "F",
        color: "#0f9d58",
        subject: "Ads budget approval required today",
        snippet: "Mohon approval budget media sebelum pukul 14.00",
        time: "8:46 AM",
        unread: true,
        body: [
          "Hi Marketing Team,",
          "Mohon approval budget media untuk launch campaign sebelum pukul 14.00 hari ini agar booking placement tidak tertunda",
          "Budget breakdown dapat dilihat pada lampiran terakhir",
          "Finance Team"
        ]
      },
      {
        id: "teaser-copy",
        sender: "Maria Marketing Team",
        senderEmail: "maria@company.co.id",
        avatar: "M",
        color: "#e8710a",
        subject: "Teaser shade baru revised copy",
        snippet: "Copy sudah dibuat lebih subtle dan tidak terlalu jualan",
        time: "8:19 AM",
        unread: false,
        body: [
          "Kak,",
          "Copy teaser shade baru sudah aku revisi supaya lebih subtle dan tidak terlalu jualan",
          "Ada dua opsi opening line di halaman 6, nanti boleh dipilih yang paling cocok",
          "Thank you"
        ]
      },
      {
        id: "embargo",
        sender: "Brand Director Office",
        senderEmail: "brand.director@company.co.id",
        avatar: "B",
        color: "#d93025",
        subject: "Reminder: Launch embargo 18 November",
        snippet: "Tidak ada materi yang boleh dipublikasikan sebelum embargo",
        time: "Yesterday",
        unread: false,
        body: [
          "Dear Team,",
          "This is a reminder bahwa seluruh materi campaign masih berada di bawah embargo sampai 18 November pukul 09.00 WIB",
          "Tidak ada teaser, caption, atau product visual yang boleh dipublikasikan sebelum waktu tersebut",
          "Brand Director Office"
        ]
      }
    ]
  },

  /* Trigger berbasis waktu global dapat ditambahkan di sini untuk bab berikutnya. */
  timeline: [],
  branches: {},
  calls: [],

  calendar: {
    year: 2026,
    initialMonth: 10,
    selectedDate: "2026-11-17",
    events: [
      { date: "2026-01-01", title: "New Year’s Day", time: "all-day", color: "#bf5af2", type: "national" },
      { date: "2026-01-19", title: "Monthly review", time: "10:00 AM", color: "#0a84ff", type: "work" },
      { date: "2026-02-14", title: "Dinner reservation", time: "7:30 PM", color: "#ff375f", type: "romantic" },
      { date: "2026-02-23", title: "Talent fitting", time: "2:00 PM", color: "#0a84ff", type: "work" },
      { date: "2026-03-08", title: "International Women’s Day", time: "all-day", color: "#bf5af2", type: "national" },
      { date: "2026-03-25", title: "Campaign workshop", time: "9:30 AM", color: "#0a84ff", type: "work" },
      { date: "2026-04-21", title: "Hari Kartini", time: "all-day", color: "#bf5af2", type: "national" },
      { date: "2026-04-30", title: "Product shoot", time: "7:00 AM", color: "#0a84ff", type: "work" },
      { date: "2026-05-01", title: "Hari Buruh", time: "all-day", color: "#bf5af2", type: "national" },
      { date: "2026-05-09", title: "Bookstore, 4 PM", time: "4:00 PM", color: "#ff375f", type: "romantic" },
      { date: "2026-05-20", title: "Hari Kebangkitan Nasional", time: "all-day", color: "#bf5af2", type: "national" },
      { date: "2026-06-01", title: "Hari Lahir Pancasila", time: "all-day", color: "#bf5af2", type: "national" },
      { date: "2026-06-18", title: "Teaser review", time: "3:30 PM", color: "#0a84ff", type: "work" },
      { date: "2026-07-07", title: "Monthly review", time: "11:00 AM", color: "#0a84ff", type: "work" },
      { date: "2026-07-18", title: "Dinner reservation", time: "8:00 PM", color: "#ff375f", type: "romantic" },
      { date: "2026-08-17", title: "Hari Kemerdekaan Indonesia", time: "all-day", color: "#bf5af2", type: "national" },
      { date: "2026-08-20", title: "PR package planning", time: "1:00 PM", color: "#0a84ff", type: "work" },
      { date: "2026-09-09", title: "Final KV deadline", time: "5:00 PM", color: "#0a84ff", type: "work" },
      { date: "2026-09-23", title: "Movie night", time: "8:30 PM", color: "#ff375f", type: "romantic" },
      { date: "2026-10-02", title: "Ads budget approval", time: "2:00 PM", color: "#0a84ff", type: "work" },
      { date: "2026-10-28", title: "Hari Sumpah Pemuda", time: "all-day", color: "#bf5af2", type: "national" },
      { date: "2026-11-10", title: "Hari Pahlawan", time: "all-day", color: "#bf5af2", type: "national" },
      { date: "2026-11-17", title: "Birthday Pak Dirga", time: "all-day", color: "#ff9f0a", type: "birthday" },
      { date: "2026-11-18", title: "Shade teaser embargo lifts", time: "10:00 AM", color: "#0a84ff", type: "work" },
      { date: "2026-12-17", title: "Year-end campaign review", time: "1:30 PM", color: "#0a84ff", type: "work" },
      { date: "2026-12-22", title: "Hari Ibu", time: "all-day", color: "#bf5af2", type: "national" },
      { date: "2026-12-25", title: "Christmas Day", time: "all-day", color: "#30d158", type: "national" },
      { date: "2026-12-31", title: "New Year’s Eve", time: "all-day", color: "#bf5af2", type: "national" }
    ]
  },

  photoAlbums: [
    { id: "recents", title: "Recents", coverId: "photo-06" },
    { id: "favorites", title: "Favorites", coverId: "photo-12" },
    { id: "places", title: "Places", coverId: "photo-18" },
    { id: "work", title: "Work", coverId: "photo-03" }
  ],

  photos: [
    { id: "photo-01", title: "17 November 2026", caption: "17 November 2026 · 4:38 PM", src: "assets/photos/gallery/☀️ Morning Walk Aesthetic.jpg", albums: ["places"] },
    { id: "photo-02", title: "29 October 2026", caption: "29 October 2026 · 8:12 AM", src: "assets/photos/gallery/★.jpg", albums: ["favorites"] },
    { id: "photo-03", title: "2 October 2026", caption: "2 October 2026 · 2:21 PM", src: "assets/photos/gallery/1106337464736391030.jpg", albums: ["work"] },
    { id: "photo-05", title: "30 August 2026", caption: "30 August 2026 · 11:46 AM", src: "assets/photos/gallery/63965257205607251.jpg", albums: ["favorites"] },
    { id: "photo-06", title: "7 August 2026", caption: "7 August 2026 · 9:07 PM", src: "assets/photos/gallery/658792251780066463.jpg", albums: [] },
    { id: "photo-07", title: "19 July 2026", caption: "19 July 2026 · 5:29 PM", src: "assets/photos/gallery/735001601709750166.jpg", albums: ["places"] },
    { id: "photo-08", title: "26 June 2026", caption: "26 June 2026 · 1:15 PM", src: "assets/photos/gallery/738801513913038797.jpg", albums: [] },
    { id: "photo-09", title: "11 May 2026", caption: "11 May 2026 · 7:32 AM", src: "assets/photos/gallery/762163936956279261.jpg", albums: ["favorites"] },
    { id: "photo-11", title: "8 March 2026", caption: "8 March 2026 · 3:55 PM", src: "assets/photos/gallery/793196553146792097.jpg", albums: ["work"] },
    { id: "photo-12", title: "14 February 2026", caption: "14 February 2026 · 8:41 PM", src: "assets/photos/gallery/831899362455754011.jpg", albums: ["favorites"] },
    { id: "photo-17", title: "22 November 2025", caption: "22 November 2025 · 4:03 PM", src: "assets/photos/gallery/Office.jpg", albums: ["work"] },
    { id: "photo-18", title: "18 November 2025", caption: "18 November 2025 · 10:36 AM", src: "assets/photos/gallery/when in San Francisco 🧺🌁✨🌙🌿☁ just some….jpg", albums: ["places"] },
    { id: "photo-19", title: "17 November 2026", caption: "17 November 2026 · 8:56 PM", src: "assets/photos/gallery/dinner-17-first.jpg", albums: [], availableAfter: "dirga_after_dinner", availableAfterDate: "2026-11-17" },
    { id: "photo-20", title: "21 November 2026", caption: "21 November 2026 · 5:38 PM", src: "assets/photos/gallery/coffee-date.jpg", albums: [], availableAfter: "dirga_coffee_arrival", availableAfterDate: "2026-11-21" },
    { id: "photo-21", title: "28 November 2026", caption: "28 November 2026 · 8:42 PM", src: "assets/photos/gallery/Dion Windsor _ The unwanted marriage.jpg", albums: [], availableAfter: "dirga_wrong_send", availableAfterDate: "2026-11-28" },
    { id: "photo-22", title: "30 November 2026", caption: "30 November 2026 · 9:34 PM", src: "assets/photos/gallery/alex volkov _ twisted love _ aesthetic _ boy….jpg", albums: [], availableAfter: "dirga_work_night", availableAfterDate: "2026-11-30" },
    { id: "photo-23", title: "30 November 2026", caption: "30 November 2026 · 11:18 PM", src: "assets/photos/gallery/782852347766237811.jpg", albums: [], availableAfter: "dirga_after_work_personal", availableAfterDate: "2026-11-30" }
  ],

  storyChatMedia: [
    {
      id: "dirga-january-photo",
      threadId: "dirga",
      from: "them",
      availableAfterDate: "2027-01-05",
      time: "18:14",
      text: "You asked for proof that I do take breaks",
      imageSrc: "assets/photos/gallery/917467755359088838.jpg",
      imageAlt: "Dirga holding a cup of coffee",
      storyUse: "Dirga sends a casual photo"
    }
  ],

  reservedStoryMedia: [
    {
      id: "final-dinner-photo",
      placement: "gallery_after_scene",
      scene: "final_dinner",
      imageSrc: "assets/photos/gallery/dinner-17-second.jpg"
    }
  ],

  notes: [
    {
      title: "TO DO — SENIN",
      date: "16 November 2026",
      pinned: true,
      body: `☑ Cek final KV campaign lip tint
☑ Follow up talent soal jadwal fitting
☑ Minta revisi caption—jangan terlalu “jualan”
☑ Approve budget ads sebelum jam 2
☑ Brief anak sosmed untuk teaser shade baru
☑ Tanya Bintang stok PR package sudah sampai mana
☑ Bales email agency
☑ Siapin poin presentasi monthly review
☑ Ingatkan tim: jangan post sebelum embargo tanggal 18!!
☐ Pastiin ulang tahun Pak Dirga ke Satrio

Personal:
☑ Bayar listrik + internet
☑ Telepon Mama
☑ Laundry sepulang kantor
☑ Jangan buka laptop lagi setelah jam 10`
    },
    {
      title: "BELANJA",
      date: "15 November 2026",
      body: `☐ Telur
☐ Ayam fillet
☐ Kopi
☐ Tisu toilet

JANGAN BELI LIPSTIK. DI KANTOR SUDAH BANYAK.`
    },
    {
      title: "ide campaign???",
      date: "12 November 2026",
      body: `makeup buat kehidupan sehari-hari?
bukan yang terlalu perfect / full glam terus

mungkin scene:
- touch up di lift
- makeup sambil nunggu ojol
- habis makan lipstiknya masih ada dikit
- mau meeting tapi tadi sempet nangis (?)
- di rumah sendirian tapi tetep pake lip tint

kayak makeup yang nemenin hari-hari biasa
real life tapi jangan jadi terlalu sedih
visualnya jangan kelihatan iklan banget

“for every version of you”
udah pernah dipake brand lain belum???

cari talent yang bukan beauty influencer semua
bahas kamis sama tim kalau masih masuk akal`
    },
    {
      title: "?",
      date: "17 November 2026",
      body: `This is stupid.

I don’t even know why I’m writing this here. It’s not like you’re ever going to read it.

But sometimes you say something completely normal and I keep thinking about it for the rest of the day, which is honestly a little annoying.

I think maybe I—

no. absolutely not.`
    },
    {
      title: "MINGGU DEPAN",
      date: "28 November 2026",
      availableAfter: "dirga_wrong_send",
      body: `☐ Final check teaser copy
☐ Confirm talent fitting
☐ Minta timeline regional campaign
☐ Cek slot presentasi Desember
☐ Jangan ambil meeting sebelum jam 9`
    },
    {
      title: "DESEMBER",
      date: "30 November 2026",
      availableAfter: "dirga_after_work_personal",
      body: `☐ Monthly review
☐ Follow up legal untuk regional project
☐ Cek sisa cuti
☐ Kirim brief year-end campaign
☐ Kosongkan Jumat malam kalau tidak ada revisi`
    }
  ],

  /* Instagram — Home selalu mengambil post terbaru yang terlihat dari setiap profil. */
  instagram: {
    ownerId: "mc",
    stories: ["mc", "maria", "adelina", "bintang", "petra", "dirga", "satrio", "wicaksono"],
    homeProfileIds: ["mc", "maria", "adelina", "bintang", "petra", "dirga"],
    profiles: [
      {
        id: "mc",
        handle: "@mc",
        displayName: "MC",
        avatar: "assets/avatars/instagram/mc.jpg",
        bio: "work, coffee, repeat",
        followers: "1,048",
        following: "684",
        open: true,
        posts: [
          ["mc-post-01.jpg", "needed this.", "12 Oct", 184, []],
          ["mc-post-02.jpg", "weekend well spent", "5 Oct", 231, []],
          ["mc-post-03.jpg", "out of office", "27 Sep", 198, []],
          ["mc-post-04.jpg", "one meeting too many", "19 Sep", 156, []],
          ["mc-post-05.jpg", "still here", "11 Sep", 143, []],
          ["mc-post-06.jpg", "running on deadlines", "2 Sep", 172, []],
          ["mc-post-07.jpg", "noted.", "17 Nov", 207, [
            { author: "petra", text: "dari siapa ini?" },
            { author: "maria", text: "tumben bukan kopi kantor" }
          ]],
          ["mc-post-08.jpg", "tiny coworker", "25 Aug", 265, []],
          ["mc-post-09.jpg", "working from somewhere else", "14 Aug", 149, []]
        ].map(([file, caption, date, likes, comments], index) => ({
          id: `mc-${index + 1}`,
          image: `assets/social/instagram/posts/${file}`,
          caption,
          date,
          likes,
          comments
        }))
      },
      {
        id: "maria",
        handle: "@mariadwinara",
        displayName: "Maria",
        avatar: "assets/avatars/instagram/maria.jpg",
        bio: "always in a good mood",
        followers: "2,347",
        following: "1,186",
        open: true,
        posts: [
          ["maria-post-01.jpg", "slow morning", "10 Nov", 312, []],
          ["maria-post-02.jpg", "lunch ran long", "2 Nov", 286, []],
          ["maria-post-03.jpg", "small things", "24 Oct", 401, []],
          ["maria-post-04.jpg", "comfort watch", "16 Oct", 247, []],
          ["maria-post-05.jpg", "one more cup", "8 Oct", 219, []],
          ["maria-post-06.jpg", "my favorite neighbor", "17 Nov", 438, [
            { author: "mc", text: "akhirnya ketemu lagi" },
            { author: "bintang", text: "karyawan terbaik" }
          ]]
        ].map(([file, caption, date, likes, comments], index) => ({
          id: `maria-${index + 1}`,
          image: `assets/social/instagram/posts/${file}`,
          caption,
          date,
          likes,
          comments
        }))
      },
      {
        id: "adelina",
        handle: "@adelinapramesti",
        displayName: "Adelina Pramesti",
        avatar: "assets/avatars/instagram/adelina.jpg",
        bio: "less talk, more work",
        followers: "1,895",
        following: "536",
        open: true,
        posts: [
          ["adelina-post-01.jpg", "away for a while", "14 Nov", 255, []],
          ["adelina-post-02.jpg", "working, unfortunately", "7 Nov", 208, []],
          ["adelina-post-03.jpg", "quiet morning", "30 Oct", 317, []],
          ["adelina-post-04.jpg", "friday", "21 Oct", 352, []],
          ["adelina-post-05.jpg", "green today", "12 Oct", 289, []],
          ["adelina-post-06.jpg", "coffee first", "17 Nov", 274, [
            { author: "maria", text: "meeting dulu baru kopi" },
            { author: "mc", text: "jangan telat ya" }
          ]]
        ].map(([file, caption, date, likes, comments], index) => ({
          id: `adelina-${index + 1}`,
          image: `assets/social/instagram/posts/${file}`,
          caption,
          date,
          likes,
          comments
        }))
      },
      {
        id: "bintang",
        handle: "@bintangpradipta",
        displayName: "Bintang Pradipta",
        avatar: "assets/avatars/instagram/bintang.jpg",
        bio: "football and everything in between",
        followers: "3,109",
        following: "924",
        open: true,
        posts: [
          ["bintang-post-01.jpg", "cuma lihat-lihat", "16 Nov", 341, [
            { author: "maria", text: "beli berapa?" }
          ]],
          ["bintang-post-02.jpg", "worth the queue", "4 Nov", 306, []],
          ["bintang-post-03.jpg", "rapat warga", "26 Oct", 422, []],
          ["bintang-post-04.jpg", "great start", "18 Oct", 278, []],
          ["bintang-post-05.jpg", "off grid", "3 Oct", 367, []],
          ["bintang-post-06.jpg", "made it", "21 Sep", 391, []]
        ].map(([file, caption, date, likes, comments], index) => ({
          id: `bintang-${index + 1}`,
          image: `assets/social/instagram/posts/${file}`,
          caption,
          date,
          likes,
          comments
        }))
      },
      {
        id: "petra",
        handle: "@petrahalim",
        displayName: "Petra Halim",
        avatar: "assets/avatars/instagram/petra.jpg",
        bio: "mama, work, and everything else",
        followers: "48.7K",
        following: "712",
        open: true,
        posts: [
          ["petra-post-01.jpg", "bath time", "13 Nov", "2,184", []],
          ["petra-post-02.jpg", "slow afternoon", "5 Nov", "1,906", []],
          ["petra-post-03.jpg", "morning view", "28 Oct", "2,352", []],
          ["petra-post-04.jpg", "home lately", "20 Oct", "2,708", []],
          ["petra-post-05.jpg", "my whole heart", "11 Oct", "4,126", []],
          ["petra-post-06.jpg", "fresh for the week", "15 Nov", "2,593", [
            { author: "mc", text: "cantik banget" }
          ]]
        ].map(([file, caption, date, likes, comments], index) => ({
          id: `petra-${index + 1}`,
          image: `assets/social/instagram/posts/${file}`,
          caption,
          date,
          likes,
          comments
        }))
      },
      {
        id: "dirga",
        handle: "@dirgantara.djajadiningrat",
        displayName: "Dirgantara Pamungkas Djajadiningrat",
        avatar: "assets/avatars/instagram/dirga.jpg",
        bio: "Attorney at Law · Jakarta",
        followers: "4,862",
        following: "214",
        open: true,
        posts: [
          ["dirga-post-01.jpg", "Late drive.", "14 Nov", 624, [
            { author: "satrio", text: "Besok tetap masuk, kan?" }
          ]],
          ["dirga-post-02.jpg", "Still awake.", "22 Oct", 577, []],
          ["dirga-post-03.jpg", "Sunday morning.", "4 Oct", 731, []]
        ].map(([file, caption, date, likes, comments], index) => ({
          id: `dirga-${index + 1}`,
          image: `assets/social/instagram/posts/${file}`,
          caption,
          date,
          likes,
          comments
        }))
      },
      {
        id: "satrio",
        handle: "@satrioprawira",
        displayName: "Satrio Prawira",
        avatar: "assets/avatars/instagram/satrio.jpg",
        open: false,
        posts: []
      },
      {
        id: "wicaksono",
        handle: "@wicaksonohadi",
        displayName: "Wicaksono Hadi",
        avatar: "assets/avatars/instagram/wicaksono.jpg",
        open: false,
        posts: []
      }
    ]
  },

  xApp: {
    profile: {
      name: "capek kerja",
      handle: "@janganngintip",
      avatar: "assets/avatars/x/mc-cat.jpg",
      cover: "assets/social/x/headers/mc-header.jpg",
      private: true,
      bio: "kerja, pulang, overthinking, repeat",
      following: 0,
      followers: 0
    },
    posts: [
      {
        time: "5 Dec",
        text: "aku jawab aku gak bilang jangan\n\nself preservation resmi mengundurkan diri",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 3,
        availableAfter: "dirga_december_clarity"
      },
      {
        time: "5 Dec",
        text: "slowly if you'll let me\n\nSIAPA YANG NGAJARIN LAWYER NGOMONG BEGINI",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 4,
        availableAfter: "dirga_december_clarity"
      },
      {
        time: "5 Dec",
        text: "DIA BILANG I'M PURSUING YOU TERUS GUE HARUS GIMANA",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 5,
        availableAfter: "dirga_december_clarity"
      },
      {
        time: "5 Dec",
        text: "dia udah di bawah kantor dan gue bahkan belum sempat pura-pura sibuk",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 2,
        availableAfter: "dirga_december_meetup"
      },
      {
        time: "1 Dec",
        text: "baru jam 8 pagi udah disuruh latihan manggil nama\n\nsantai banget ya hidup orang",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 2,
        availableAfter: "dirga_morning_check"
      },
      {
        time: "30 Nov",
        text: "besok di kantor harus manggil Pak lagi\n\nnormal professional definitely fine",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 3,
        availableAfter: "dirga_after_work_personal"
      },
      {
        time: "30 Nov",
        text: "ternyata nama orang bisa terasa lebih intimate dari seharusnya",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 2,
        availableAfter: "dirga_after_work_personal"
      },
      {
        time: "30 Nov",
        text: "dia bilang drop the Pak terus satu kata ‘better’ berhasil merusak sistem saraf gue",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 4,
        availableAfter: "dirga_after_work_personal"
      },
      {
        time: "30 Nov",
        text: "voluntarily staying late because one specific man is still working... career low point",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 2,
        availableAfter: "dirga_work_night"
      },
      {
        time: "30 Nov",
        text: "saya menawarkan diri untuk lembur\n\nvoluntary conscious no one forced me",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 2,
        availableAfter: "dirga_work_night"
      },
      {
        time: "30 Nov",
        text: "someone take my access card away before I do this again",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 1,
        availableAfter: "dirga_work_night"
      },
      {
        time: "28 Nov",
        text: "GOBLOKKKKKKKKK",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 1,
        availableAfter: "dirga_wrong_send"
      },
      {
        time: "28 Nov",
        text: "ternyata ‘only to me’ bisa bikin orang mendadak lupa cara tidur",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 2,
        availableAfter: "dirga_wrong_send"
      },
      {
        time: "28 Nov",
        text: "second meeting and somehow this is getting less professional",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 3,
        availableAfter: "dirga_wrong_send"
      },
      {
        time: "21 Nov",
        text: "coffee was supposed to wake me up, not make me think about someone all evening",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 2,
        availableAfter: "dirga_coffee_arrival"
      },
      {
        time: "21 Nov",
        text: "ternyata dia jauh lebih bahaya kalau nggak lagi ngomongin kerjaan",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 3,
        availableAfter: "dirga_coffee_arrival"
      },
      {
        time: "21 Nov",
        text: "orang normal nggak datang delapan menit lebih awal terus bilang itu bukan early",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 1,
        availableAfter: "dirga_coffee_arrival"
      },
      {
        time: "21 Nov",
        text: "gue mulai curiga Saturday coffee bukan keputusan yang profesional",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 2,
        availableAfter: "dirga_coffee_arrival"
      },
      {
        time: "17 Nov",
        text: "kalau seseorang minta waktu lo buat hadiah ulang tahun… itu flirting atau gue yang kurang tidur",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 3
      },
      {
        time: "17 Nov",
        text: "being perceived by someone who remembers every tiny thing I said is actually terrifying\n\nvery inconvenient",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 2
      },
      {
        time: "16 Nov",
        text: "gue cuma mau kerja, pulang, mandi, tidur\nkenapa sekarang malah harus mikirin nada chat orang",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 4
      },
      {
        time: "15 Nov",
        text: "quick call apanya yang quick kalau satu jam",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "14 Nov",
        text: "minggu ini hidup gue disponsori kopi kantor dan rasa tanggung jawab yang berlebihan",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "13 Nov",
        text: "ngomong ‘noted’ padahal di dalam hati udah teriak",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "11 Nov",
        text: "satu hal tentang gue: akan bilang santai lalu overthinking sampai jam 2 pagi",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "9 Nov",
        text: "if I say gapapa",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "9 Nov",
        text: "please know that I have prepared a 14-slide presentation about why it is absolutely not gapapa",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "7 Nov",
        text: "love my job\nhate having a job\nsee you again tomorrow",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "4 Nov",
        text: "jam 10 malam masih kepikiran wording caption",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "4 Nov",
        text: "this is a cry for help",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "1 Nov",
        text: "meeting yang bisa jadi email sekarang sudah berkembang menjadi email yang minta meeting",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "28 Oct",
        text: "pengen jadi kucing kantor aja",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "28 Oct",
        text: "tidur di sofa tapi tetap disayang semua divisi",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "20 Oct",
        text: "currently accepting: cuti, makanan gratis, dan validasi bahwa deck gue bagus",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "12 Oct",
        text: "hari ini berhasil tidak marah di depan orang",
        replies: 0,
        reposts: 0,
        likes: 0
      },
      {
        time: "12 Oct",
        text: "professional development 👍",
        replies: 0,
        reposts: 0,
        likes: 0
      }
    ]
  },

  spotify: {
    currentTrack: {
      title: "Apocalypse",
      artist: "Cigarettes After Sex",
      cover: "assets/music/tracks/apocalypse.png",
      link: "https://open.spotify.com/track/1oAwsWBovWRIp7qLMGPIet",
      duration: "4:50"
    },
    tracks: [
      { title: "Come and See Me", artist: "PARTYNEXTDOOR", duration: "3:55", explicit: true, cover: "assets/music/tracks/01-come-and-see-me.png" },
      { title: "Break from Toronto", artist: "PARTYNEXTDOOR", duration: "1:39", explicit: true, cover: "assets/music/tracks/02-break-from-toronto.png" },
      { title: "WILDFLOWER", artist: "Billie Eilish", duration: "4:21", cover: "assets/music/tracks/03-wildflower.png" },
      { title: "This Side of Paradise", artist: "Coyote Theory", duration: "4:02", cover: "assets/music/tracks/04-this-side-of-paradise.png" },
      { title: "Moon River", artist: "Frank Sinatra", duration: "3:19", cover: "assets/music/tracks/05-moon-river.png" },
      { title: "I Don't Wanna Do This Anymore", artist: "XXXTENTACION", duration: "1:28", explicit: true, cover: "assets/music/tracks/06-i-dont-wanna-do-this-anymore.png" },
      { title: "Hometown Glory", artist: "Adele", duration: "3:39", cover: "assets/music/tracks/07-hometown-glory.png" },
      { title: "The Cut That Always Bleeds", artist: "Conan Gray", duration: "3:52", cover: "assets/music/tracks/08-the-cut-that-always-bleeds.png" },
      { title: "Do I Wanna Know?", artist: "Arctic Monkeys", duration: "4:32", cover: "assets/music/tracks/09-do-i-wanna-know.png" },
      { title: "One Of The Girls", artist: "The Weeknd, JENNIE, Lily-Rose Depp", duration: "4:05", explicit: true, cover: "assets/music/tracks/10-one-of-the-girls.png" },
      { title: "You Got It", artist: "Vedo", duration: "3:23", explicit: true, cover: "assets/music/tracks/11-you-got-it.png" },
      { title: "Kiss It Better", artist: "Rihanna", duration: "4:13", explicit: true, cover: "assets/music/tracks/12-kiss-it-better.png" }
    ],
    playlists: [
      {
        id: "karma",
        name: "karma",
        description: "ah udah ah",
        cover: "assets/music/covers/karma.jpg",
        link: "https://open.spotify.com/playlist/5z9oajCI99AvO8r8kTkyHv"
      },
      {
        id: "office-hours",
        name: "office hours",
        description: "ayo jangan ngantuk masih banyak kerjaan",
        cover: "assets/music/covers/office hours icon.jpg",
        link: "https://open.spotify.com/playlist/1MSij3SiJmR2evKLQgygUy"
      }
    ]
  }
};
