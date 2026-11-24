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
    hint: "Tap to unlock"
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
        { from: "them", text: "Siap, Kak", time: "10:20" }
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
        { from: "them", text: "Siap, Kak", time: "09:10" }
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
        { from: "them", text: "Okee, Kak", time: "08:36" }
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
        { type: "them", text: "Oke, good", time: "22:41", waitBefore: 1400, typingMs: 700 },
        { type: "them", text: "Makasih buat malam ini", time: "22:42", waitBefore: 550, typingMs: 1200 },
        { type: "mc", text: "Sama samaa", time: "22:42", waitBefore: 550 },
        { type: "them", text: "I realized something", time: "22:43", waitBefore: 1900, typingMs: 1300 },
        { type: "mc", text: "Apa?", time: "22:43", waitBefore: 650 },
        { type: "them", text: "Waktu rasanya jalan beda kalau kita di luar kantor", time: "22:44", waitBefore: 2100, typingMs: 1900 },
        { type: "them", text: "Dinner tadi rasanya terlalu cepat selesai", time: "22:44", waitBefore: 650, typingMs: 1700 },
        { type: "mc", text: "Maksudnya...?", time: "22:45", waitBefore: 650 },
        { type: "them", text: "I don't think one evening was enough", time: "22:45", waitBefore: 2200, typingMs: 1900 },
        { type: "mc", text: "Pak Dirga lagi minta hadiah tambahan ya?", time: "22:46", waitBefore: 650 },
        { type: "them", text: "That depends", time: "22:46", waitBefore: 1700, typingMs: 900 },
        { type: "them", text: "Kalau saya minta waktu kamu lagi, does it still count as a birthday gift?", time: "22:47", waitBefore: 650, typingMs: 2300 },
        { type: "mc", text: "Kalau weekend... mungkin masih bisa", time: "22:48", waitBefore: 750 },
        { type: "them", text: "Saturday, then", time: "22:48", waitBefore: 1700, typingMs: 1000 },
        { type: "mc", text: "Cepet banget mutusinnya", time: "22:49", waitBefore: 650 },
        { type: "them", text: "Kamu bilang mungkin", time: "22:49", waitBefore: 1500, typingMs: 900 },
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
        text: "Mobilnya udah jalan?",
        storyDate: "2026-11-21",
        time: "18:42",
        afterMs: 7000,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_after_coffee"
      },
      steps: [
        { type: "mc", text: "You said four", time: "15:52", waitBefore: 450 },
        { type: "them", text: "It's only 3:52", time: "15:52", waitBefore: 1500, typingMs: 900 },
        { type: "mc", text: "Exactly", time: "15:53", waitBefore: 550 },
        { type: "them", text: "Delapan menit lebih awal itu bukan terlalu pagi", time: "15:53", waitBefore: 1700, typingMs: 1400 },
        { type: "them", text: "Santai aja", time: "15:53", waitBefore: 500, typingMs: 900 }
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
        text: "Masih di jalan?",
        storyDate: "2026-11-21",
        time: "19:17",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_home_arrival"
      },
      steps: [
        { type: "mc", text: "Baru banget... ini udah jalan", time: "18:42", waitBefore: 550 },
        { type: "them", text: "Good", time: "18:43", waitBefore: 1500, typingMs: 750 },
        { type: "them", text: "Harusnya saya yang nganter kamu pulang", time: "18:43", waitBefore: 550, typingMs: 1500 },
        { type: "mc", text: "Pak kan masih ada meeting lagi", time: "18:44", waitBefore: 650 },
        { type: "them", text: "Unfortunately", time: "18:44", waitBefore: 1500, typingMs: 850 },
        { type: "them", text: "Kabari saya kalau udah sampai, ya?", time: "18:44", waitBefore: 500, typingMs: 1300 },
        { type: "mc", text: "I willl", time: "18:45", waitBefore: 650 }
      ]
    },
    dirga_home_arrival: {
      threadId: "dirga",
      storyDate: "2026-11-21",
      onComplete: {
        id: "second-meeting-plan-check",
        threadId: "dirga",
        notificationTitle: "?",
        text: "Tempat buat Sabtu udah ketemu",
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
        { type: "them", text: "Syukurlah", time: "19:18", waitBefore: 1300, typingMs: 650 },
        { type: "them", text: "Tadi saya hampir nelepon", time: "19:18", waitBefore: 500, typingMs: 1100 },
        { type: "mc", text: "Dramatis banget Pak... saya baru telat ngabarin dikit", time: "19:19", waitBefore: 650 },
        { type: "them", text: "Says the person who promised to text", time: "19:20", waitBefore: 1500, typingMs: 1450 },
        { type: "mc", text: "I remembered eventually... technically", time: "19:20", waitBefore: 600 },
        { type: "them", text: "Nyaris", time: "19:21", waitBefore: 1200, typingMs: 650 },
        { type: "them", text: "Istirahat dulu", time: "19:21", waitBefore: 450, typingMs: 850 },
        { type: "mc", text: "You too... makasih yaa buat hari ini", time: "19:22", waitBefore: 650 },
        { type: "them", text: "Harusnya saya yang bilang makasih", time: "19:22", waitBefore: 1500, typingMs: 1150 },
        { type: "them", text: "Hari ini enak", time: "19:23", waitBefore: 450, typingMs: 900 },
        { type: "mc", text: "Iya... nice banget malah", time: "19:23", waitBefore: 600 },
        { type: "them", text: "That sounded reluctant", time: "19:24", waitBefore: 1350, typingMs: 1050 },
        { type: "mc", text: "Enggaaa, bukan gitu maksudnya", time: "19:24", waitBefore: 550 },
        { type: "them", text: "Now that's the answer I wanted", time: "19:25", waitBefore: 1200, typingMs: 650 },
        { type: "them", text: "Karena saya berharap kita bisa begini lagi", time: "19:25", waitBefore: 500, typingMs: 1700 },
        { type: "mc", text: "Oh...", time: "19:26", waitBefore: 700 },
        { type: "mc", text: "Iya... saya juga mau", time: "19:26", waitBefore: 450 },
        { type: "them", text: "Kalau begitu, bagus", time: "19:27", waitBefore: 1600, typingMs: 900 },
        { type: "them", text: "Then keep next Saturday evening free", time: "19:27", waitBefore: 550, typingMs: 1800 },
        { type: "mc", text: "Itu ngajak atau nyuruh sih", time: "19:28", waitBefore: 650 },
        { type: "them", text: "Yang penting kamu datang", time: "19:29", waitBefore: 1700, typingMs: 1300 }
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
        text: "Saya udah sampai",
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
        { type: "mc", text: "Oh jadi Sabtu kemarin serius?", time: "20:14", waitBefore: 650 },
        { type: "them", text: "Saya kira itu sudah cukup jelas", time: "20:15", waitBefore: 1700, typingMs: 1500 },
        { type: "mc", text: "Saya tau... cuma gak nyangka langsung disiapin", time: "20:15", waitBefore: 650 },
        { type: "them", text: "Sabtu, jam enam", time: "20:16", waitBefore: 1500, typingMs: 900 },
        { type: "mc", text: "Tempatnya di mana?", time: "20:16", waitBefore: 650 },
        { type: "them", text: "It's a surprise", time: "20:17", waitBefore: 1500, typingMs: 950 },
        { type: "mc", text: "Pak, ini agak mencurigakan", time: "20:17", waitBefore: 650 },
        { type: "them", text: "Trust me", time: "20:18", waitBefore: 1500, typingMs: 1200 },
        { type: "mc", text: "...", time: "20:18", waitBefore: 650 },
        { type: "them", text: "I'll pick you up", time: "20:19", waitBefore: 1400, typingMs: 1000 },
        { type: "mc", text: "Saya bisa berangkat sendiri kok", time: "20:19", waitBefore: 650 },
        { type: "them", text: "Saya tau", time: "20:20", waitBefore: 1300, typingMs: 700 },
        { type: "them", text: "Biar saya pastikan kamu gak telat lagi", time: "20:20", waitBefore: 450, typingMs: 1100 },
        { type: "mc", text: "Kamu masih inget itu?", time: "20:21", waitBefore: 650 },
        { type: "them", text: "Unfortunately, yes", time: "20:21", waitBefore: 1400, typingMs: 850 }
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
        text: "Udah sampai rumah?",
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
        { type: "them", text: "Dan kamu tetap turun telat", time: "17:55", waitBefore: 1600, typingMs: 1300 },
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
        { type: "them", text: "Oke, aman", time: "22:37", waitBefore: 1400, typingMs: 750 },
        { type: "them", text: "Makasih buat malam ini", time: "22:37", waitBefore: 500, typingMs: 1200 },
        { type: "mc", text: "Harusnya saya yang bilang makasih...", time: "22:38", waitBefore: 650 },
        { type: "them", text: "You really looked like you needed a break from work", time: "22:39", waitBefore: 1700, typingMs: 1700 },
        { type: "mc", text: "Kelihatan banget yaa", time: "22:39", waitBefore: 650 },
        { type: "them", text: "Only to me", time: "22:40", waitBefore: 1700, typingMs: 950 },
        { type: "mc", text: "...", time: "22:40", waitBefore: 850 },
        { type: "them", text: "Terlalu jujur?", time: "22:41", waitBefore: 1800, typingMs: 1250 },
        { type: "mc", text: "Sedikit...", time: "22:41", waitBefore: 700 },
        { type: "them", text: "Do you want me to take it back?", time: "22:42", waitBefore: 1600, typingMs: 1400 },
        { type: "mc", text: "Engga", time: "22:42", waitBefore: 750 },
        { type: "them", text: "Good", time: "22:43", waitBefore: 1500, typingMs: 700 },
        { type: "them", text: "Karena saya serius", time: "22:43", waitBefore: 500, typingMs: 1100 }
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
        text: "Masih bangun?",
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
        { type: "them", text: "I'm going to pretend that wasn't meant for me", time: "22:48", waitBefore: 1900, typingMs: 1700 },
        { type: "mc", text: "...", time: "22:48", waitBefore: 850 },
        { type: "mc", text: "Pak", time: "22:48", waitBefore: 350 },
        { type: "mc", text: "Tolong hapus dari ingatan", time: "22:49", waitBefore: 450 },
        { type: "them", text: "Kayaknya gak bisa", time: "22:49", waitBefore: 1700, typingMs: 1000 },
        { type: "mc", text: "Harusnya bukan ke sini...", time: "22:50", waitBefore: 650 },
        { type: "them", text: "Sudah saya duga", time: "22:50", waitBefore: 1500, typingMs: 800 },
        { type: "them", text: "For what it's worth", time: "22:50", waitBefore: 450, typingMs: 1000 },
        { type: "them", text: "Saya memang berharap kamu mikir begitu", time: "22:51", waitBefore: 450, typingMs: 1300 },
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
        { type: "them", text: "Siap, Kak", time: "20:57", waitBefore: 1400, typingMs: 800 }
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
        { type: "them", text: "Sekitar satu jam", time: "20:59", waitBefore: 1400, typingMs: 700 },
        { type: "them", text: "Mungkin dua", time: "21:00", waitBefore: 450, typingMs: 700 },
        { type: "mc", text: "Saya temenin deh", time: "21:00", waitBefore: 700 },
        { type: "them", text: "You don't have to", time: "21:01", waitBefore: 1700, typingMs: 1100 },
        { type: "mc", text: "I know... tapi saya mau", time: "21:01", waitBefore: 700 },
        { type: "them", text: "Kalau begitu, temani saya", time: "21:02", waitBefore: 1700, typingMs: 900 }
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
        { type: "them", text: "Di luar kantor, kamu gak perlu panggil saya ‘Pak’", time: "23:37", waitBefore: 1700, typingMs: 1500 },
        { type: "mc", text: "...Dirga", time: "23:38", waitBefore: 850 },
        { type: "them", text: "Nah, lebih baik", time: "23:38", waitBefore: 1400, typingMs: 700 },
        { type: "mc", text: "Ini agak memalukan", time: "23:39", waitBefore: 700 },
        { type: "them", text: "Kamu kirim foto dengan tulisan ‘GANTENG BANGET’ di bawahnya", time: "23:39", waitBefore: 1700, typingMs: 1800 },
        { type: "them", text: "Kayaknya kita sudah lewat fase itu", time: "23:40", waitBefore: 500, typingMs: 1000 },
        { type: "mc", text: "Please jangan diungkit lagi...", time: "23:40", waitBefore: 750 },
        { type: "them", text: "No promises", time: "23:41", waitBefore: 1500, typingMs: 850 },
        { type: "them", text: "Kamu bisa jatuh", time: "23:41", waitBefore: 450, typingMs: 1000 },
        { type: "mc", text: "Tetep aja... makasih", time: "23:42", waitBefore: 650 },
        { type: "them", text: "You're welcome", time: "23:42", waitBefore: 1400, typingMs: 850 },
        { type: "them", text: "Lain kali pakai sepatu yang masuk akal", time: "23:43", waitBefore: 500, typingMs: 1200 },
        { type: "mc", text: "Next time jangan bikin aku nemenin lembur", time: "23:43", waitBefore: 700 },
        { type: "them", text: "You offered", time: "23:44", waitBefore: 1500, typingMs: 750 },
        { type: "mc", text: "I know...", time: "23:44", waitBefore: 650 },
        { type: "them", text: "Dan kamu bakal melakukannya lagi", time: "23:45", waitBefore: 1600, typingMs: 1100 },
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
        text: "Kerjaannya udah selesai?",
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
        { type: "mc", text: "Morning(?)", time: "08:12", waitBefore: 550 },
        { type: "mc", text: "Tumben Bapak pagi-pagi?", time: "08:13", waitBefore: 400 },
        { type: "them", text: "Percaya deh, saya juga gak suka bangun sepagi ini", time: "08:13", waitBefore: 1500, typingMs: 1100 },
        { type: "them", text: "Gimana pergelangan kakimu?", time: "08:14", waitBefore: 450, typingMs: 850 },
        { type: "mc", text: "Masih agak sakit dikit, tapi aman kokk", time: "08:14", waitBefore: 650 },
        { type: "them", text: "Kompres es habis kerja", time: "08:15", waitBefore: 1400, typingMs: 850 },
        { type: "mc", text: "Siap, Pak", time: "08:15", waitBefore: 600 },
        { type: "them", text: "I thought we settled this last night", time: "08:16", waitBefore: 1600, typingMs: 1200 },
        { type: "mc", text: "Maaf, belum kebiasa", time: "08:16", waitBefore: 650 },
        { type: "mc", text: "Siap... Dirga", time: "08:17", waitBefore: 450 },
        { type: "them", text: "Nah, lebih baik", time: "08:17", waitBefore: 1400, typingMs: 700 }
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
        text: "Kamu udah di rumah?",
        storyDate: "2026-12-05",
        time: "22:14",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_december_clarity"
      },
      steps: [
        { type: "mc", text: "Baru selesai", time: "18:08", waitBefore: 600 },
        { type: "them", text: "Pas banget", time: "18:09", waitBefore: 1400, typingMs: 700 },
        { type: "them", text: "I'm downstairs", time: "18:09", waitBefore: 450, typingMs: 900 },
        { type: "mc", text: "KOK GAK BILANG DULU", time: "18:10", waitBefore: 650 },
        { type: "them", text: "Kamu pasti bilang lagi sibuk", time: "18:10", waitBefore: 1500, typingMs: 1200 },
        { type: "mc", text: "Karena emang sibuk", time: "18:11", waitBefore: 600 },
        { type: "them", text: "And yet you're still coming down", time: "18:11", waitBefore: 1500, typingMs: 1100 }
      ]
    },
    dirga_december_clarity: {
      threadId: "dirga",
      storyDate: "2026-12-05",
      active: false,
      onComplete: {
        id: "december-petra-confession-check",
        threadId: "petra",
        notificationTitle: "Petra",
        text: "Lo ke mana? Kok ilang",
        storyDate: "2026-12-05",
        time: "22:43",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "petra_december_confession"
      },
      steps: [
        { type: "mc", text: "Udaahh, Dirga", time: "22:14", waitBefore: 600 },
        { type: "them", text: "Syukurlah", time: "22:15", waitBefore: 1500, typingMs: 750 },
        { type: "them", text: "Tadi saya malah buka laptop lagi", time: "22:16", waitBefore: 650, typingMs: 1300 },
        { type: "them", text: "Tujuh belas komentar di dokumen yang katanya sudah final", time: "22:16", waitBefore: 450, typingMs: 1750 },
        { type: "mc", text: "Sounds like a you problem wkwk", time: "22:17", waitBefore: 700 },
        { type: "them", text: "Cruel", time: "22:17", waitBefore: 1500, typingMs: 650 },
        { type: "mc", text: "Dirga", time: "22:18", waitBefore: 700 },
        { type: "mc", text: "Boleh tanya sesuatu?", time: "22:18", waitBefore: 450 },
        { type: "them", text: "Oh", time: "22:19", waitBefore: 1600, typingMs: 500 },
        { type: "them", text: "Wah, ini pasti serius", time: "22:19", waitBefore: 400, typingMs: 850 },
        { type: "them", text: "Biasanya kamu langsung tanya, baru minta maaf belakangan", time: "22:20", waitBefore: 450, typingMs: 1300 },
        { type: "mc", text: "Yes, this is serious", time: "22:20", waitBefore: 750 },
        { type: "mc", text: "Kamu selalu begini ke semua orang?", time: "22:21", waitBefore: 550 },
        { type: "them", text: "No, I'm not", time: "22:21", waitBefore: 1700, typingMs: 800 },
        { type: "mc", text: "Maksudnya no?", time: "22:22", waitBefore: 700 },
        { type: "them", text: "Saya gak hafal pesanan kopi semua orang", time: "22:22", waitBefore: 1500, typingMs: 1200 },
        { type: "them", text: "I don't wait downstairs for everyone", time: "22:23", waitBefore: 450, typingMs: 1100 },
        { type: "them", text: "Dan saya gak bangun pagi buat nanyain pergelangan kaki semua orang", time: "22:23", waitBefore: 450, typingMs: 1500 },
        { type: "them", text: "Saya berusaha bikin ini kelihatan tanpa bikin kamu gak nyaman", time: "22:24", waitBefore: 550, typingMs: 1850 },
        { type: "mc", text: "Dirga... don't", time: "22:24", waitBefore: 800 },
        { type: "them", text: "Yes", time: "22:25", waitBefore: 1800, typingMs: 600 },
        { type: "them", text: "Yes, saya memang lagi mendekati kamu", time: "22:25", waitBefore: 400, typingMs: 1000 },
        { type: "them", text: "Biar saya jalanin ini dengan benar", time: "22:26", waitBefore: 500, typingMs: 1250 },
        { type: "them", text: "Most people meet my last name before they meet me", time: "22:27", waitBefore: 600, typingMs: 1500 },
        { type: "them", text: "Atau jabatan saya. Atau apa yang mereka kira bisa mereka dapat kalau dekat dengan saya", time: "22:27", waitBefore: 500, typingMs: 1750 },
        { type: "them", text: "Kamu gak pernah begitu", time: "22:28", waitBefore: 650, typingMs: 750 },
        { type: "them", text: "Sama kamu, saya gak perlu kelihatan hebat dulu supaya merasa cukup", time: "22:29", waitBefore: 550, typingMs: 2000 },
        { type: "them", text: "Maaf kalau cara saya bikin kamu ngerasa terburu-buru atau gak nyaman", time: "22:30", waitBefore: 700, typingMs: 1600 },
        { type: "mc", text: "I'm sorry", time: "22:31", waitBefore: 900 },
        { type: "mc", text: "Aku cuma belum terbiasa", time: "22:31", waitBefore: 450 },
        { type: "them", text: "It's okay", time: "22:32", waitBefore: 1700, typingMs: 700 },
        { type: "them", text: "Kamu gak harus jawab malam ini", time: "22:32", waitBefore: 450, typingMs: 1200 },
        { type: "them", text: "I'll give you space", time: "22:33", waitBefore: 550, typingMs: 950 }
      ]
    },
    petra_december_confession: {
      threadId: "petra",
      storyDate: "2026-12-05",
      active: false,
      onComplete: {
        exitTransition: {
          id: "december-silent-day",
          fromViews: ["whatsapp", "thread"],
          storyDate: "2026-12-06",
          storyTime: "09:18",
          armTransition: {
            id: "december-midnight-after-x",
            fromViews: ["x"],
            storyDate: "2026-12-07",
            storyTime: "00:12",
            activateChatScript: "dirga_midnight_reconciliation"
          }
        }
      },
      steps: [
        { type: "mc", text: "PET", time: "22:43", waitBefore: 650 },
        { type: "mc", text: "DIRGA BARUSAN CONFESS KE GUE", time: "22:43", waitBefore: 400 },
        { type: "them", text: "WHAT", time: "22:44", waitBefore: 1500, typingMs: 550 },
        { type: "them", text: "TERUS LO JAWAB APA", time: "22:44", waitBefore: 350, typingMs: 750 },
        { type: "mc", text: "Gue bilang aku belum terbiasa", time: "22:45", waitBefore: 700 },
        { type: "them", text: "Lo suka dia gak", time: "22:45", waitBefore: 1450, typingMs: 850 },
        { type: "mc", text: "Kayaknya iya", time: "22:46", waitBefore: 800 },
        { type: "them", text: "Itu bukan kayaknya", time: "22:46", waitBefore: 1450, typingMs: 850 },
        { type: "mc", text: "Gue lagi panik jangan ceramah", time: "22:47", waitBefore: 650 },
        { type: "them", text: "Yaudah", time: "22:47", waitBefore: 1350, typingMs: 600 },
        { type: "them", text: "Tapi jangan bikin dia mundur cuma karena lo takut", time: "22:48", waitBefore: 450, typingMs: 1250 }
      ]
    },
    dirga_midnight_reconciliation: {
      threadId: "dirga",
      storyDate: "2026-12-07",
      active: false,
      onComplete: {
        calendarEvents: [
          { id: "singapore-briefing-8-dec", date: "2026-12-08", title: "Regional project briefing", time: "9:00 AM", color: "#0a84ff", type: "work" }
        ]
      },
      steps: [
        { type: "mc", text: "Masih bangun?", time: "00:12", waitBefore: 700 },
        { type: "them", text: "Masih bangun", time: "00:13", waitBefore: 1600, typingMs: 750 },
        { type: "them", text: "Saya kira kamu mau saya menjauh", time: "00:13", waitBefore: 500, typingMs: 1300 },
        { type: "mc", text: "Aku pikir aku butuh jarak", time: "00:14", waitBefore: 800 },
        { type: "mc", text: "Ternyata aku gak suka kamu beneran ngejauh", time: "00:14", waitBefore: 500 },
        { type: "mc", text: "Maaf soal kemarin, aku cuma kaget", time: "00:15", waitBefore: 500 },
        { type: "them", text: "You don't have to apologize", time: "00:15", waitBefore: 1700, typingMs: 1000 },
        { type: "them", text: "Saya yang bikin kamu gak nyaman", time: "00:16", waitBefore: 450, typingMs: 1300 },
        { type: "mc", text: "It's not like I rejected you", time: "00:16", waitBefore: 800 },
        { type: "them", text: "?", time: "00:17", waitBefore: 1800, typingMs: 450 },
        { type: "them", text: "Jadi masih ada kesempatan?", time: "00:17", waitBefore: 500, typingMs: 950 },
        { type: "mc", text: "I never said no", time: "00:18", waitBefore: 850 },
        { type: "them", text: "You're right", time: "00:18", waitBefore: 1600, typingMs: 700 },
        { type: "them", text: "Harusnya dari awal saya sadar", time: "00:19", waitBefore: 450, typingMs: 850 },
        { type: "them", text: "I was too busy expecting the worst", time: "00:19", waitBefore: 500, typingMs: 1100 },
        { type: "them", text: "Udah tengah malam. Istirahat", time: "00:20", waitBefore: 600, typingMs: 1200 },
        { type: "mc", text: "Kenapa kamu gak ngomong begitu ke diri sendiri", time: "00:20", waitBefore: 750 },
        { type: "them", text: "Masih ada setumpuk dokumen buat besok", time: "00:21", waitBefore: 1500, typingMs: 1350 },
        { type: "mc", text: "Aku temenin, mau?", time: "00:21", waitBefore: 700 },
        { type: "them", text: "No. Just sleep", time: "00:22", waitBefore: 1500, typingMs: 750 },
        { type: "them", text: "Besok ikut mobil saya aja", time: "00:22", waitBefore: 450, typingMs: 950 },
        { type: "them", text: "Kita berangkat bareng", time: "00:23", waitBefore: 450, typingMs: 900 },
        { type: "mc", text: "Then aku temenin kamu sekarang", time: "00:23", waitBefore: 750 },
        { type: "mc", text: "Besok aku masih bisa tidur di mobil kamu", time: "00:24", waitBefore: 450 },
        { type: "them", text: "Keras kepala seperti biasa", time: "00:24", waitBefore: 1500, typingMs: 850 },
        { type: "them", text: "Do whatever you want", time: "00:25", waitBefore: 450, typingMs: 900 },
        { type: "mc", text: "Telepon mau?", time: "00:25", waitBefore: 800 },
        { type: "incoming_call", time: "00:26", waitBefore: 1400, afterCallStoryDate: "2026-12-08", afterCallStoryTime: "07:05" }
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
    { id: "favorites", title: "Favorites", coverId: "photo-02" },
    { id: "places", title: "Places", coverId: "photo-01" },
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
    { id: "photo-21", title: "28 November 2026", caption: "28 November 2026 · 8:42 PM", src: "assets/photos/gallery/Dion Windsor _ The unwanted marriage.jpg", albums: [], availableAfter: "dirga_second_meeting_arrival", availableAfterDate: "2026-11-28" },
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
        time: "6 Dec",
        text: "gue kangen dia gangguin gue. this is a new low",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 3,
        availableAfter: "petra_december_confession",
        availableAfterDate: "2026-12-06"
      },
      {
        time: "6 Dec",
        text: "kantor ini kenapa punya terlalu banyak lorong buat papasan",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 4,
        availableAfter: "petra_december_confession",
        availableAfterDate: "2026-12-06"
      },
      {
        time: "6 Dec",
        text: "ternyata dikasih waktu buat mikir malah kepikiran terus",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 5,
        availableAfter: "petra_december_confession",
        availableAfterDate: "2026-12-06"
      },
      {
        time: "6 Dec",
        text: "professional development: pura-pura sibuk supaya gak eye contact sama orang yang confess ke lo",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 4,
        availableAfter: "petra_december_confession",
        availableAfterDate: "2026-12-06"
      },
      {
        time: "6 Dec",
        text: "dia bilang akan kasih gue space TERUS KENAPA SEKARANG BENERAN NGASIH SPACE",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 6,
        availableAfter: "petra_december_confession",
        availableAfterDate: "2026-12-06"
      },
      {
        time: "5 Dec",
        text: "dia bilang with you i don't have to be impressive to be worth staying for\n\nGUE MAU NANGIS TAPI BESOK TETEP KERJA",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 5,
        availableAfter: "dirga_december_clarity"
      },
      {
        time: "5 Dec",
        text: "DIA BILANG YES I'M PURSUING YOU TERUS OTAK GUE RESMI BERHENTI",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 5,
        availableAfter: "dirga_december_clarity"
      },
      {
        time: "5 Dec",
        text: "aku belum jawab apa-apa tapi dia malah minta maaf karena takut bikin gue uncomfortable\n\nHOW AM I SUPPOSED TO BE NORMAL ABOUT THIS",
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 6,
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

/* Revisi dialog utama — menggantikan seluruh percakapan Dirga dan Petra. */
(() => {
  const config = window.STORY_CONFIG;
  const mc = (text, time, waitBefore = 600, extra = {}) => ({ type: "mc", text, time, waitBefore, ...extra });
  const them = (text, time, waitBefore = 1400, typingMs = 1000, extra = {}) => ({ type: "them", text, time, waitBefore, typingMs, ...extra });
  const notify = (threadId, text, time, activateChatScript, waitBefore = 900) => ({
    type: "notification",
    threadId,
    notificationTitle: threadId === "dirga" ? "?" : "Petra",
    text,
    storyDate: "2026-11-28",
    time,
    waitBefore,
    activateChatScript
  });

  const petra = config.threads.find((thread) => thread.id === "petra");
  petra.initialMessages = [
    { from: "them", text: "Morning, manusia sibuk", time: "07:48" },
    { from: "me", text: "Morninggg", time: "07:49" },
    { from: "them", text: "Tumben langsung dibales", time: "07:49" },
    { from: "them", text: "Lo free Sabtu gak? Ngopi yuk", time: "07:50" },
    { from: "me", text: "Harusnya bisaa, gue cek kerjaan dulu yaa", time: "07:51" },
    { from: "them", text: "Sabtu tuh weekend, seriusan lo masih kerja?", time: "07:52" },
    { from: "me", text: "Heh gue mah pekerja keras ya", time: "07:53" },
    { from: "them", text: "Warung madura tutup, lo masih kerja", time: "07:54" },
    { from: "me", text: "In this economy, kita gak bisa ngopi itu kalo gue gak kerja keras", time: "07:55" },
    { from: "them", text: "Iya sih", time: "07:55" },
    { from: "me", text: "Gue kabarin nanti ya", time: "07:56" },
    { from: "them", text: "Jawaban paling lo banget", time: "07:57" }
  ];

  const revisedChats = {
    dirga: {
      storyDate: "2026-11-17",
      onComplete: { activateChatOnExit: "petra" },
      steps: [
        mc("Happy birthday, Pak Dirga 🎉 semoga tahun ini less damage control dan lebih banyak tidur", "10:26", 250),
        them("That is a very specific prayer", "10:27", 1800, 1600),
        them("Terima kasih, Bu", "10:27", 500, 900),
        them("May I ask, Ibu tahu ulang tahun saya dari siapa?", "10:28", 500, 1500),
        mc("Saya tanya Satrio tadi", "10:28"),
        mc("Ada request hadiah tertentu, Pak? Hitung-hitung sudah banyak bantuin tim saya tempo hari", "10:29", 450),
        mc("Anything deh selama masih masuk akal", "10:29", 400),
        them("Oh, right, Satrio ya", "10:30", 1700, 1000),
        them("Careful, Bu", "10:30", 500, 900),
        them("That's a dangerous offer", "10:31", 500, 1200),
        mc("Why dangerous?", "10:31"),
        them("If I can ask you anything, that could be dangerous for both of us", "10:32", 1800, 1900),
        them("Saya ada satu request", "10:32", 500, 1000),
        them("I want your time", "10:33", 500, 1000),
        mc("My time...?", "10:33"),
        them("Dinner setelah kerja", "10:34", 1700, 1200),
        them("Just the two of us", "10:34", 450, 900),
        mc("That sounds suspiciously personal", "10:35"),
        them("It is. The choice is yours", "10:35", 1700, 1200),
        mc("Okay, nanti ketemu di lobby ya", "10:36"),
        them("Okay, okay. I'll wait", "10:36", 1400, 900)
      ]
    },

    petra: {
      threadId: "petra",
      storyDate: "2026-11-17",
      active: false,
      onComplete: {
        id: "chapter-3-dirga-home",
        threadId: "dirga",
        notificationTitle: "?",
        text: "Sudah masuk ke rumah, Bu?",
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
        mc("Pet percaya gak gue barusan diajak dinner sama Pak Dirga", "10:40", 700),
        mc("Ketik 1 kalo gak percaya", "10:40", 400),
        them("HAH???", "10:41", 1500, 700),
        them("111111111111", "10:41", 350, 650),
        them("Kronologinya?", "10:42", 350, 800),
        mc("Katanya hadiah ulang tahun sih", "10:42"),
        them("Jangan bilang lo yang nawarin minta hadiah apa?", "10:43", 1400, 1100),
        mc("Emang gue seketebak itu ya", "10:43"),
        them("Iya kalo lo mau tau", "10:44", 1300, 800),
        them("Kabarin gue pokoknya kalo udah kejadian", "10:44", 400, 1100),
        mc("Iya iya, ini aja gue masih proses loh beneran apa engga", "10:45"),
        them("Hati-hati lo ya", "10:45", 1300, 700),
        mc("Sama Dirga?", "10:46"),
        them("Iya saran aja sih gue, soalnya cowok kayak dia itu sulit ditebak", "10:46", 1400, 1400),
        mc("Noted, Bu", "10:47"),
        them("Sialan lo wkwk", "10:47", 1200, 700)
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
        mc("Udah, Pak", "22:41", 450),
        mc("Ini baru masuk", "22:41", 350),
        them("Oke, good", "22:42", 1400, 700),
        them("Thank you ya sudah meluangkan waktunya. You really know how to talk and make the atmosphere better", "22:42", 500, 2200),
        mc("Terima kasih kembali, Pak", "22:43"),
        mc("Saya suka banget tempat dan makanannya", "22:43", 400),
        them("Glad to know", "22:44", 1500, 850),
        them("By the way, I realized something", "22:44", 450, 1200),
        them("Waktu rasanya jalan beda kalau kita di luar kantor", "22:45", 500, 1600),
        them("Dinner tadi, everything moved so fast, didn't it?", "22:45", 500, 1600),
        mc("Maksudnya?", "22:46"),
        them("I don't think one evening was enough", "22:46", 1800, 1500),
        mc("Pak Dirga lagi minta hadiah tambahan ya?", "22:47"),
        them("That depends", "22:47", 1600, 850),
        them("Kalau saya minta waktu kamu lagi, does it still count as a birthday gift?", "22:48", 500, 2100),
        mc("Kalau weekend, mungkin masih bisa", "22:49"),
        them("Saturday, then", "22:49", 1500, 900),
        mc("Serius, Pak?", "22:50"),
        them("Only if you want it", "22:50", 1500, 1000),
        mc("Saya gak bisa nolak sih", "22:51"),
        them("That's what I want to hear", "22:51", 1500, 1000),
        them("I'll pick you up by 4", "22:52", 450, 900),
        mc("Okayy, see you on Saturday", "22:52"),
        them("See you", "22:52", 1300, 750)
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
        text: "I'm sorry, Bu. Saya gak bisa antar pulang karena panggilan mendadak",
        storyDate: "2026-11-21",
        time: "18:42",
        afterMs: 7000,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_after_coffee"
      },
      steps: [
        mc("You said four", "15:52", 450),
        them("Eight minutes early should be enough time for you to come downstairs, right?", "15:52", 1500, 1500),
        mc("Iyaa, saya langsung lari supaya kurang dari 8 menit", "15:53"),
        them("Take your time, santai aja", "15:53", 1500, 1100)
      ]
    },

    dirga_after_coffee: {
      threadId: "dirga",
      storyDate: "2026-11-21",
      active: false,
      onComplete: {
        calendarEvents: [
          {
            id: "second-meeting-dirga-28-nov",
            date: "2026-11-28",
            title: "Work date with ?",
            time: "10:00 AM",
            color: "#ff375f",
            type: "personal",
            trigger: {
              id: "second-meeting-arrival",
              threadId: "dirga",
              notificationTitle: "?",
              text: "Saya udah sampai",
              storyDate: "2026-11-28",
              time: "09:47",
              afterMs: 5500,
              blockedViews: ["whatsapp", "thread", "calendar"],
              activateChatScript: "dirga_second_meeting_arrival"
            }
          }
        ]
      },
      steps: [
        mc("It's okay pakk", "18:42", 550),
        them("Sudah aman? Sudah masuk rumah?", "19:17", 1700, 1300),
        mc("Udah, Pak. Terima kasih juga udah dipesankan taksi tadi", "19:17"),
        them("Good", "19:18", 1400, 700),
        them("No, seharusnya saya yang antar Ibu pulang. Saya harus pastikan Ibu sampai dengan selamat", "19:18", 500, 2000),
        them("Karena saya yang ajak pergi awalnya", "19:19", 450, 1100),
        mc("Gapapa, Pak. Saya udah gede, bisa jaga diri. Lagipula kerjaan lebih penting", "19:19"),
        them("That's not entirely true", "19:20", 1500, 950),
        them("Terima kasih untuk pengertiannya", "19:20", 450, 1100),
        them("Take a rest and have a nice weekend", "19:21", 450, 1200),
        mc("You too, Pak. Makasih juga udah diajak ngopi hari ini", "19:21"),
        mc("Semangat meetingnya yaa", "19:22", 400),
        them("Harusnya saya yang bilang makasih", "19:22", 1500, 1100),
        them("Today was nice until duty called", "19:23", 450, 1000),
        mc("Nice banget malah", "19:23"),
        them("Is that sarcasm?", "19:24", 1400, 900),
        mc("Enggaaa, bukan gitu maksudnya, Pak", "19:24"),
        mc("Beneran nice lohh", "19:25", 350),
        them("Now that's the answer I wanted", "19:25", 1300, 900),
        them("Karena saya berharap kita bisa begini lagi", "19:26", 450, 1500),
        mc("Oh", "19:26"),
        mc("Saya juga mau sih, Pak", "19:27", 350),
        them("Alright", "19:27", 1400, 750),
        them("Can you keep your next Saturday free?", "19:28", 450, 1300),
        mc("Saya sih bisa, Pak. How about Bapak?", "19:28"),
        them("Maybe I'll bring my devices untuk jaga-jaga seperti tadi, jadi saya bisa langsung ikut meeting online", "19:29", 1500, 2000),
        mc("Bawa aja, Pak. Saya juga bawa", "19:30"),
        mc("Kita WFC bareng yaa", "19:30", 350),
        them("Sounds interesting", "19:31", 1400, 850),
        mc("Ya kaann", "19:31"),
        them("See you then", "19:32", 1300, 800),
        mc("See you juga, Pak", "19:32")
      ]
    },

    dirga_second_meeting_arrival: {
      threadId: "dirga",
      storyDate: "2026-11-28",
      active: false,
      onComplete: {
        id: "client-meeting-chat",
        threadId: "dirga",
        notificationTitle: "?",
        text: "Hey",
        storyDate: "2026-11-28",
        time: "11:14",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_client_meeting"
      },
      steps: [
        mc("Sebentar, Pak. Ini masih 09.47", "09:47", 550),
        them("Yes, 13 minutes early", "09:48", 1400, 850),
        mc("You did this last time", "09:48"),
        them("Dan Ibu tetap turun telat", "09:49", 1500, 1100),
        mc("Hehe maaf, Pak. Saya segera turun", "09:49"),
        them("Take your time, I'll wait", "09:50", 1400, 1000)
      ]
    },

    dirga_client_meeting: {
      threadId: "dirga",
      storyDate: "2026-11-28",
      active: false,
      onComplete: {
        id: "after-second-meeting-home-check",
        threadId: "dirga",
        notificationTitle: "?",
        text: "Sudah aman, Bu?",
        storyDate: "2026-11-28",
        time: "18:30",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_after_second_meeting"
      },
      steps: [
        them("Bukannya Ibu sedang meeting dengan client?", "11:14", 1100, 1000),
        mc("Kenapa lewat chat, Pak? Kita berhadapan langsung", "11:15"),
        them("Saya gak mau mengganggu meetingnya", "11:15", 1400, 1100),
        them("May I suggest something?", "11:16", 450, 900),
        mc("Boleh dongg, memangnya ada apa, Pak?", "11:16"),
        them("Smile more, Bu", "11:17", 1400, 850),
        mc("Eh, iya, Pak", "11:17"),
        them("Supaya client-nya juga lebih senang dan merasa disambut", "11:18", 1400, 1500),
        them("That's right. Just like that", "11:18", 450, 1100),
        them("It looks good on you", "11:19", 450, 900),
        mc("Thank you sarannya, Pak", "11:19"),
        them("Walaupun mereka demandnya banyak, I hope they don't give you hard times ya", "11:20", 1400, 1600),
        them("Mau saya pesankan additional snack juga?", "11:21", 450, 1300),
        mc("Gak perlu, Pak. Saya pesan sendiri ajaa, nanti merepotkan", "11:21"),
        them("No problem, biar sekalian aja", "11:22", 1400, 1100),
        mc("Kalau begitu samain aja sama pesanan Bapak", "11:22"),
        them("Noted", "11:23", 1300, 700)
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
        text: "WOii",
        storyDate: "2026-11-28",
        time: "18:44",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "petra_second_meeting_report"
      },
      steps: [
        mc("Udah, Pak. Makasih banyak ya", "18:30", 600),
        mc("Jadinya Bapak yang temani saya meeting", "18:30", 350),
        them("Fine with me. Saya juga sudah mengerjakan beberapa task tadi", "18:31", 1500, 1500),
        them("Anyway, you really looked like you needed a break from work", "18:32", 500, 1500),
        mc("Ah enggak, Pak. Normal ini mah", "18:32"),
        mc("Saya kan pekerja keras, Pak, hehe", "18:33", 350),
        them("That's true, but your face can't lie to me", "18:33", 1500, 1300),
        mc("Kelihatan banget yaa? Maaf ya, Pak", "18:34"),
        them("I should be the one saying sorry karena udah ambil jatah istirahat Ibu di weekend begini", "18:35", 1500, 1700),
        mc("Jangan gitu, Pak. Padahal Bapak satu-satunya yang bikin mood saya naik walau weekend tetap kerja", "18:36")
      ]
    },

    petra_second_meeting_report: {
      threadId: "petra",
      storyDate: "2026-11-28",
      active: false,
      steps: [
        them("Udah kelar jalannya?", "18:44", 900, 800),
        mc("Udah nih wkwk baru sampe rumah abis dianterin", "18:45"),
        them("Terus gimana, gimana?", "18:45", 1300, 850),
        mc("Seru lahh, kapan lagi kerja berhadapan sama cowok ganteng", "18:46"),
        them("WKWKW anjir lo", "18:46", 1200, 700),
        them("Ada fotonya gak?", "18:47", 350, 700),
        mc("Konsumsi pribadi ah", "18:47"),
        them("Ini pelit apa posesif nih", "18:48", 1200, 850),
        notify("dirga", "Is that so?", "18:48", "dirga_wrong_send", 650),
        mc("Sialan, iya iya nih gue kirimin", "18:49")
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
        text: "Mana fotonyaaa pelittt",
        storyDate: "2026-11-28",
        time: "18:55",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "petra_wrong_send"
      },
      steps: [
        mc("Ganteng BANGET gak tuh?", "18:49", 850, { imageSrc: "assets/photos/gallery/Dion Windsor _ The unwanted marriage.jpg", imageAlt: "Photo of Dirga during the second meeting" }),
        them("...", "18:50", 1500, 550),
        them("I'm going to pretend that wasn't meant for me", "18:50", 400, 1500),
        mc("Pak", "18:51"),
        mc("Tolong hapus dari ingatan", "18:51", 350),
        them("I'll try", "18:52", 1500, 850),
        them("But for what it's worth", "18:52", 400, 1000),
        them("Saya memang berharap kamu mikir begitu", "18:53", 400, 1200),
        mc("Maaf, Pak", "18:53"),
        them("Don't be. Just stay who you really are", "18:54", 1400, 1300),
        mc("Besok saya traktir kopi ya, Pak", "18:54"),
        them("Tidak perlu repot-repot", "18:55", 1400, 950),
        mc("Pak, tolong. Saya maksa", "18:55"),
        them("Baik kalau begitu. Saya tunggu kopinya besok", "18:56", 1400, 1300)
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
        mc("PET", "18:55", 500),
        mc("GUE SALAH KIRIM", "18:55", 350),
        them("Kan, pelit sih", "18:56", 1200, 700),
        mc("DENGERIN DULU", "18:56"),
        mc("GUE KIRIM KE ORANGNYA LANGSUNG", "18:57", 350),
        them("DEMI APA SIH WKWK", "18:57", 1300, 750),
        them("Sekalian aja bilang lo suka", "18:58", 350, 950),
        mc("ARGHHH ADA ADA AJAA", "18:58"),
        them("Cinta beneran bikin buta ya", "18:59", 1300, 850),
        mc("Gue block ya lo", "18:59"),
        them("EH JANGAN DONGG", "19:00", 1200, 700),
        them("Trus gimana?", "19:00", 350, 650),
        mc("Gue sogok kopi sih, walau gak akan mengubah apa pun juga", "19:01"),
        mc("At least gue udah usaha", "19:01", 350),
        them("Reaksi dia gimana?", "19:02", 1300, 800),
        mc("Dia malah bilang, \"Saya memang berharap kamu mikir begitu\"", "19:02"),
        them("Tinggal tunggu tanggal aja ini mah", "19:03", 1300, 900)
      ]
    },

    dirga_work_night: {
      threadId: "dirga",
      storyDate: "2026-11-30",
      active: false,
      onComplete: { activateChatOnExit: "dirga_after_work_personal" },
      steps: [
        mc("Pak masih di kantor?", "20:58", 650),
        them("Unfortunately", "20:58", 1500, 850),
        mc("Masih lama?", "20:59"),
        them("Sekitar satu jam", "20:59", 1400, 700),
        them("Maybe two", "21:00", 400, 700),
        mc("Saya bawain kopinya ya", "21:00"),
        mc("Sekalian saya temenin", "21:00", 350),
        them("You don't have to", "21:01", 1500, 1000),
        mc("I know... tapi saya mau", "21:01"),
        them("Okay then, just come to my office ya", "21:02", 1500, 1200),
        them("You know where it is", "21:02", 400, 850),
        mc("OTW, Pak", "21:03")
      ]
    },

    dirga_after_work_personal: {
      threadId: "dirga",
      storyDate: "2026-11-30",
      active: false,
      onComplete: {
        id: "december-outing-opening",
        threadId: "dirga",
        notificationTitle: "?",
        text: "You done with your works?",
        storyDate: "2026-12-01",
        time: "09:00",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_morning_check",
        calendarEvents: [
          { id: "shoe-shopping-dirga-1-dec", date: "2026-12-01", title: "Shoe shopping with ?", time: "10:00 AM", color: "#ff375f", type: "romantic" }
        ]
      },
      steps: [
        mc("Makasih buat tadi, Pak", "23:36", 700),
        them("It's okay, sekarang sudah aman?", "23:36", 1500, 1000),
        them("Dan mungkin kalau di luar kantor, you don't need to address me as 'Pak'", "23:37", 450, 1600),
        mc("Tapi, Pak", "23:37"),
        them("You can start now", "23:38", 1400, 900),
        mc("Oke, Dirga?", "23:38"),
        them("Nah, much better", "23:39", 1400, 800),
        mc("Jadi sedikit canggung", "23:39"),
        them("Kamu kirim foto dengan tulisan ‘Ganteng BANGET’. Well, I guess we passed that phase", "23:40", 1500, 1700),
        mc("Please jangan diungkit lagi", "23:40"),
        them("No promises", "23:41", 1400, 800),
        mc("Dirga 😭😭", "23:41"),
        them("Lain kali saya belikan sepatu yang lebih nyaman, if you want to", "23:42", 1500, 1500),
        mc("Jangann, aku bisa beli sendiri kok", "23:42"),
        them("I know, but I want to", "23:43", 1400, 900),
        mc("Maybe next time we meet", "23:43"),
        them("Besok kita juga ketemu lagi at the office", "23:44", 1400, 1100),
        mc("Maksudnya di luar office dirgaa", "23:44"),
        them("So, are you asking me out? Offer accepted", "23:45", 1500, 1200),
        mc("EH GAK GITUU", "23:45"),
        them("Can't be cancelled", "23:46", 1400, 850),
        mc("Yaa boleh, Sabtu yaa", "23:46"),
        them("Okay, I'll pick you up at 10", "23:47", 1400, 900),
        mc("Okay, okay", "23:47"),
        them("See you", "23:48", 1300, 700)
      ]
    },

    dirga_morning_check: {
      threadId: "dirga",
      storyDate: "2026-12-01",
      active: false,
      onComplete: {
        id: "shoe-fit-check",
        threadId: "dirga",
        notificationTitle: "?",
        text: "How's the shoes? Udah dicoba?",
        storyDate: "2026-12-01",
        time: "18:42",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "dirga_december_meetup"
      },
      steps: [
        mc("Baru selesai", "09:00", 600),
        them("Pas banget", "09:01", 1400, 700),
        them("I'm downstairs", "09:01", 400, 850),
        mc("Ini masih jam 9, Dirga", "09:02"),
        them("Yes, it is", "09:02", 1400, 750),
        mc("Masuk aja dulu, daripada nunggu di mobil", "09:03"),
        them("Sure, lantai berapa unit kamu?", "09:03", 1400, 1000),
        mc("Kontrakan cuma tiga lantai, Pak. Saya di lantai tiga ya", "09:04"),
        them("Right, I'm sorry. On my way", "09:04", 1400, 900),
        mc("Okaayy, yang dekat tangga yaa", "09:05")
      ]
    },

    dirga_december_meetup: {
      threadId: "dirga",
      storyDate: "2026-12-01",
      active: false,
      onComplete: {
        id: "december-petra-confession-check",
        threadId: "petra",
        notificationTitle: "Petra",
        text: "Ada resto baru nih, kesitu yuk",
        storyDate: "2026-12-01",
        time: "19:05",
        afterMs: 5500,
        requireAppExit: true,
        delayAfterExit: true,
        activateChatScript: "petra_december_confession"
      },
      steps: [
        mc("Udaahh, Dirga. Bagus banget", "18:42", 600),
        mc("Harus diakui selera kamu bagus", "18:43", 350),
        them("Thanks, I'll take that as a compliment", "18:43", 1400, 950),
        mc("Dirga", "18:44"),
        mc("Boleh tanya sesuatu?", "18:44", 400),
        them("Oh", "18:45", 1500, 500),
        them("This must be serious", "18:45", 350, 850),
        them("Biasanya kamu langsung tanya, baru minta maaf belakangan", "18:46", 400, 1300),
        mc("Yes, it is", "18:46"),
        mc("Are you always like this with other people?", "18:47", 350),
        mc("I know you're kind and genuine, but...", "18:47", 350),
        them("No, I'm not", "18:48", 1600, 800),
        mc("Maksudnya no?", "18:48"),
        them("I do pay attention to every little detail, and I always greet everyone I know at the office", "18:49", 1500, 1900),
        them("But I don't wake up early for someone, and I don't let anyone else into my office at night", "18:50", 450, 1900),
        them("Saya berusaha bikin ini obvious without making you feel uncomfortable", "18:51", 450, 1600),
        mc("Dirga, don't", "18:51"),
        them("Yes", "18:52", 1600, 600),
        them("Yes, saya memang lagi dekatin kamu", "18:52", 350, 1000),
        them("Most people meet my last name before they meet me", "18:53", 450, 1400),
        them("Atau jabatan saya. Atau apa yang mereka kira bisa mereka dapat kalau dekat dengan saya", "18:54", 450, 1700),
        them("Kamu gak pernah begitu", "18:55", 450, 750),
        them("Sama kamu, saya gak perlu kelihatan hebat dulu supaya merasa cukup", "18:55", 450, 1800),
        them("I like that about you", "18:56", 450, 900),
        them("I'm sorry kalau cara saya bikin kamu ngerasa terburu-buru atau gak nyaman", "18:57", 500, 1600),
        mc("Dirga, don't be sorry", "18:57"),
        mc("Aku cuma belum terbiasa, I need time", "18:58", 350),
        them("Yes, take as much time as you need", "18:58", 1500, 1100),
        them("I'll give you space", "18:59", 400, 900),
        them("Just", "18:59", 450, 500),
        them("Don't go too far", "19:00", 450, 900)
      ]
    },

    petra_december_confession: {
      threadId: "petra",
      storyDate: "2026-12-01",
      active: false,
      onComplete: {
        exitTransition: {
          id: "december-silent-day",
          fromViews: ["whatsapp", "thread"],
          storyDate: "2026-12-02",
          storyTime: "09:18",
          armTransition: {
            id: "december-midnight-after-x",
            fromViews: ["x"],
            storyDate: "2026-12-03",
            storyTime: "00:12",
            activateChatScript: "dirga_midnight_reconciliation"
          }
        }
      },
      steps: [
        mc("Gue harus gimana pet", "19:05", 650),
        them("Nah loh kenapa lo", "19:06", 1400, 750),
        mc("Dirga pet", "19:06"),
        mc("Dia ngaku lagi deketin gue", "19:06", 350),
        them("KAN apa gue bilang", "19:07", 1400, 850),
        them("Pura-pura gak tahu aja gue", "19:07", 350, 850),
        mc("Takut beneran deh gue", "19:08"),
        them("Lo bilang apa emang", "19:08", 1300, 750),
        mc("Gue bilang butuh waktu", "19:09"),
        them("Yaudah, sekarang lo gimanaa?", "19:09", 1300, 900),
        them("Lo suka dia gak?", "19:10", 350, 750),
        mc("Kayaknya iya? Gue nyaman sama dia, tapi gue takut", "19:10"),
        them("Takut apa sihh sayangg", "19:11", 1300, 850),
        mc("Takut rumor jelek soal gue karena deket sama dia, dia orang gede di kantor pet", "19:11"),
        mc("Nanti kalo ngaruh ke kerjaan gimana?", "19:12", 350),
        them("Eh, lo berdua udah sama-sama gede, bukan remaja labil lagi", "19:12", 1500, 1300),
        them("Kerja udah tahunan sampai punya jabatan bagus, tahu dong gimana caranya profesional?", "19:13", 400, 1500),
        them("Gue percaya lo bisa kok tetep jalanin semuanya tanpa ada yang berubah", "19:14", 400, 1300),
        them("Yaa berubah mungkin bisa ciuman di kantor", "19:14", 400, 1100),
        mc("KOK GITU LO", "19:15"),
        them("BENER GAK TAPI", "19:15", 1200, 700),
        mc("GAK BAKALAN LAH YANG BENER AJA", "19:16"),
        them("Gue pegang omongan lo ya", "19:16", 1300, 850),
        them("Tapi ingat, jangan kelamaan", "19:17", 350, 850),
        them("Jangan bikin dia mundur cuma karena lo takut", "19:17", 350, 1100),
        mc("Gue harus gimana?", "19:18"),
        them("Coba aja lo ke kantor besok, pasti lo hindarin dia kan", "19:18", 1400, 1300),
        them("Nah, gunakan waktu itu buat tanya ke diri lo sendiri", "19:19", 350, 1200),
        mc("Oke, mari kita lihat besok", "19:19"),
        them("Nah gitu dong baru temen gue! Yok semangat yok bisaa!", "19:20", 1300, 1200),
        mc("Huhu, yok bisa yokk", "19:20")
      ]
    },

    dirga_midnight_reconciliation: {
      threadId: "dirga",
      storyDate: "2026-12-03",
      active: false,
      onComplete: {
        calendarEvents: [
          { id: "singapore-briefing-8-dec", date: "2026-12-08", title: "Regional project briefing", time: "9:00 AM", color: "#0a84ff", type: "work" }
        ]
      },
      steps: [
        mc("You awake?", "00:12", 700),
        them("Why?", "00:13", 1500, 600),
        them("Saya kira kamu mau saya menjauh", "00:13", 450, 1200),
        mc("Aku cuma bilang aku butuh waktu", "00:14"),
        mc("Dan ternyata aku gak suka", "00:14", 350),
        them("Gak suka?", "00:15", 1400, 700),
        mc("Aku gak suka kalo kamu menjauh gitu", "00:15"),
        mc("Maaf soal kemarin, aku kaget dan bingung", "00:16", 350),
        mc("Aku bukan siapa-siapa, kenapa kamu bisa suka sama aku?", "00:16", 350),
        them("You don't have to apologize", "00:17", 1600, 1000),
        them("Saya yang bikin kamu gak nyaman. Soal kenapa saya bisa suka, saya lebih suka bicarakan langsung", "00:18", 450, 1900),
        them("By the way, ini udah tengah malam. You should go to bed", "00:18", 450, 1400),
        mc("Kenapa kamu gak ngomong begitu ke diri sendiri", "00:19"),
        them("I have a few documents to read", "00:19", 1500, 1000),
        mc("Aku temenin, mau?", "00:20"),
        them("No, kamu tidur aja", "00:20", 1400, 800),
        mc("Telponan sama kamu lebih menarik", "00:21"),
        them("Stubborn", "00:21", 1400, 650),
        them("Alright, whatever you want", "00:22", 400, 900),
        { type: "incoming_call", time: "00:23", waitBefore: 1400, afterCallStoryDate: "2026-12-08", afterCallStoryTime: "07:05" }
      ]
    }
  };

  Object.assign(config.chatScripts, revisedChats);
  ["dirga_home_arrival", "dirga_second_meeting_invite", "dirga_december_clarity"].forEach((scriptId) => {
    delete config.chatScripts[scriptId];
  });

  const secondMeetingPhoto = config.photos.find((photo) => photo.src?.includes("Dion Windsor"));
  if (secondMeetingPhoto) secondMeetingPhoto.availableAfter = "dirga_after_second_meeting";
  (config.xApp?.posts || []).forEach((post) => {
    if (post.availableAfter === "dirga_december_clarity") post.availableAfter = "dirga_december_meetup";
    if (post.availableAfterDate === "2026-12-06") post.availableAfterDate = "2026-12-02";
  });
})();

/* Pastikan revisi break menjadi ending aktif setelah seluruh arc dimuat. */
(() => {
  const config = window.STORY_CONFIG;
  const mc = (text, time, waitBefore = 500, extra = {}) => ({ type: "mc", text, time, waitBefore, ...extra });
  const them = (text, time, waitBefore = 1400, typingMs = 1000, extra = {}) => ({ type: "them", text, time, waitBefore, typingMs, ...extra });
  const next = (id, threadId, text, storyDate, time, activateChatScript, extra = {}) => ({
    id,
    threadId,
    notificationTitle: threadId === "dirga" ? "?" : config.threads.find((thread) => thread.id === threadId)?.name,
    text,
    storyDate,
    time,
    afterMs: 5500,
    requireAppExit: true,
    delayAfterExit: true,
    activateChatScript,
    ...extra
  });

  config.chatScripts.dirga_story_resolution = {
    threadId: "dirga",
    storyDate: "2026-12-18",
    active: false,
    onComplete: next("story-final-lunch", "dirga", "I'm downstairs", "2026-12-19", "12:05", "dirga_story_epilogue", {
      calendarEvents: [
        { id: "final-lunch-19-dec", date: "2026-12-19", title: "Lunch with Dirga", time: "12:30 PM", color: "#ff375f", type: "personal" }
      ]
    }),
    steps: [
      mc("Aku sudah mikir soal kita", "19:30"),
      them("Should I be worried?", "19:31", 1300, 700),
      mc("Sedikit", "19:31"),
      them("Go on", "19:32", 1100, 550),
      mc("Aku masih mau hubungan kita tetap private", "19:32"),
      mc("Tapi aku gak mau terus-terusan bohong atau pura-pura gak kenal kamu", "19:33", 350),
      them("I agree", "19:33", 1200, 600),
      mc("Kita gak perlu ngumumin ke semua orang", "19:34"),
      mc("Tapi kalau ada yang tanya, aku gak mau merasa malu", "19:34", 350),
      them("You should never feel ashamed of us", "19:35", 1300, 750),
      mc("Kamu juga jangan terlalu protektif", "19:35"),
      them("I'll try", "19:36", 1100, 550),
      mc("Try harder", "19:36"),
      them("Yes, ma'am", "19:37", 1100, 550),
      mc("Jangan mulai", "19:37"),
      them("One question", "19:38", 1200, 600),
      mc("Apa?", "19:38"),
      them("Kalau campaign-nya berhasil, kamu dapat hadiah apa?", "19:39", 1300, 850),
      mc("Belum kepikiran", "19:39"),
      them("May I ask for something?", "19:40", 1200, 700),
      mc("Balik lagi ke sini?", "19:40"),
      them("I want your time", "19:41", 1300, 650),
      mc("You already have it", "19:41"),
      them("Still my favorite gift", "19:42", 1200, 700),
      mc("Lunch besok?", "19:42"),
      them("Just the two of us?", "19:43", 1200, 650),
      mc("Just the two of us", "19:43"),
      them("Then it's a date", "19:44", 1200, 650)
    ]
  };

  config.chatScripts.dirga_story_epilogue = {
    threadId: "dirga",
    storyDate: "2026-12-19",
    active: false,
    onComplete: next("lunch-exposed", "maria", "Kak, jangan panik ya", "2026-12-19", "14:18", "maria_lunch_exposed"),
    steps: [
      mc("Kamu terlalu cepat", "12:05"),
      them("I'm exactly on time", "12:06", 1200, 650),
      mc("Kamu bawa apa?", "12:06"),
      them("Come downstairs and see", "12:07", 1300, 750),
      mc("Dirga jangan bilang...", "12:07"),
      them("It's just flowers", "12:08", 1200, 650),
      mc("JUST FLOWERS KATANYA", "12:08"),
      them("I wanted to do this properly", "12:09", 1300, 800),
      mc("Kita kan masih rahasia", "12:09"),
      them("We're outside the office", "12:10", 1200, 650),
      mc("Kalau ada yang lihat?", "12:10"),
      them("Then they'll see me taking my girlfriend to lunch", "12:11", 1400, 900),
      mc("Kamu nekat banget", "12:11"),
      them("For you? Yes", "12:12", 1200, 600)
    ]
  };
})();

/* Revisi ending: lunch dengan bunga, hubungan terbongkar, lalu break. */
(() => {
  const config = window.STORY_CONFIG;
  const mc = (text, time, waitBefore = 500, extra = {}) => ({ type: "mc", text, time, waitBefore, ...extra });
  const them = (text, time, waitBefore = 1400, typingMs = 1000, extra = {}) => ({ type: "them", text, time, waitBefore, typingMs, ...extra });
  const next = (id, threadId, text, storyDate, time, activateChatScript, extra = {}) => ({
    id,
    threadId,
    notificationTitle: threadId === "dirga" ? "?" : config.threads.find((thread) => thread.id === threadId)?.name,
    text,
    storyDate,
    time,
    afterMs: 5500,
    requireAppExit: true,
    delayAfterExit: true,
    activateChatScript,
    ...extra
  });

  config.chatScripts.dirga_story_resolution = {
    threadId: "dirga",
    storyDate: "2026-12-18",
    active: false,
    onComplete: next("story-final-lunch", "dirga", "I'm downstairs", "2026-12-19", "12:05", "dirga_story_epilogue", {
      calendarEvents: [
        { id: "final-lunch-19-dec", date: "2026-12-19", title: "Lunch with Dirga", time: "12:30 PM", color: "#ff375f", type: "personal" }
      ]
    }),
    steps: [
      mc("Aku sudah mikir soal kita", "19:30"),
      them("Should I be worried?", "19:31", 1300, 700),
      mc("Sedikit", "19:31"),
      them("Go on", "19:32", 1100, 550),
      mc("Aku masih mau hubungan kita tetap private", "19:32"),
      mc("Tapi aku gak mau terus-terusan bohong atau pura-pura gak kenal kamu", "19:33", 350),
      them("I agree", "19:33", 1200, 600),
      mc("Kita gak perlu ngumumin ke semua orang", "19:34"),
      mc("Tapi kalau ada yang tanya, aku gak mau merasa malu", "19:34", 350),
      them("You should never feel ashamed of us", "19:35", 1300, 750),
      mc("Kamu juga jangan terlalu protektif", "19:35"),
      them("I'll try", "19:36", 1100, 550),
      mc("Try harder", "19:36"),
      them("Yes, ma'am", "19:37", 1100, 550),
      mc("Jangan mulai", "19:37"),
      them("One question", "19:38", 1200, 600),
      mc("Apa?", "19:38"),
      them("Kalau campaign-nya berhasil, kamu dapat hadiah apa?", "19:39", 1300, 850),
      mc("Belum kepikiran", "19:39"),
      them("May I ask for something?", "19:40", 1200, 700),
      mc("Balik lagi ke sini?", "19:40"),
      them("I want your time", "19:41", 1300, 650),
      mc("You already have it", "19:41"),
      them("Still my favorite gift", "19:42", 1200, 700),
      mc("Lunch besok?", "19:42"),
      them("Just the two of us?", "19:43", 1200, 650),
      mc("Just the two of us", "19:43"),
      them("Then it's a date", "19:44", 1200, 650)
    ]
  };

  config.chatScripts.dirga_story_epilogue = {
    threadId: "dirga",
    storyDate: "2026-12-19",
    active: false,
    onComplete: next("lunch-exposed", "maria", "Kak, jangan panik ya", "2026-12-19", "14:18", "maria_lunch_exposed"),
    steps: [
      mc("Kamu terlalu cepat", "12:05"),
      them("I'm exactly on time", "12:06", 1200, 650),
      mc("Kamu bawa apa?", "12:06"),
      them("Come downstairs and see", "12:07", 1300, 750),
      mc("Dirga jangan bilang...", "12:07"),
      them("It's just flowers", "12:08", 1200, 650),
      mc("JUST FLOWERS KATANYA", "12:08"),
      them("I wanted to do this properly", "12:09", 1300, 800),
      mc("Kita kan masih rahasia", "12:09"),
      them("We're outside the office", "12:10", 1200, 650),
      mc("Kalau ada yang lihat?", "12:10"),
      them("Then they'll see me taking my girlfriend to lunch", "12:11", 1400, 900),
      mc("Kamu nekat banget", "12:11"),
      them("For you? Yes", "12:12", 1200, 600)
    ]
  };

  config.chatScripts.maria_lunch_exposed = {
    threadId: "maria",
    storyDate: "2026-12-19",
    active: false,
    onComplete: { activateChatOnExit: "dirga_break_request" },
    steps: [
      mc("Kenapa?", "14:18"),
      them("Ada yang foto Kakak sama Pak Dirga waktu lunch", "14:19", 1400, 900),
      them("Buketnya kelihatan jelas", "14:19", 350, 700),
      mc("Siapa yang punya fotonya?", "14:20"),
      them("Aku gak tahu awalnya dari siapa", "14:20", 1300, 750),
      them("Tapi Brand Director sudah lihat", "14:21", 350, 700),
      mc("Aku baru aja diminta ke ruangannya", "14:21"),
      them("Kak...", "14:22", 1200, 550),
      mc("Aku masuk dulu", "14:22"),
      mc("Aku baru keluar", "15:04", 1100),
      them("Gimana, Kak?", "15:04", 1300, 650),
      mc("Mereka bilang final review itu gak bersih", "15:05"),
      mc("Katanya aku manfaatin hubungan pribadi supaya campaign-nya lolos", "15:05", 350),
      them("Itu gak bener, Kak", "15:06", 1300, 700),
      mc("Mereka gak peduli benar atau enggak", "15:06"),
      mc("Buket tadi aja dibawa-bawa seolah itu barang bukti", "15:07", 350),
      them("Kakak sekarang di mana?", "15:07", 1200, 650),
      mc("Aku mau pulang", "15:08"),
      them("Mau aku temenin?", "15:08", 1200, 650),
      mc("Gak usah, Mar", "15:09"),
      mc("Aku perlu sendiri dulu", "15:09", 350)
    ]
  };

  config.chatScripts.dirga_break_request = {
    threadId: "dirga",
    storyDate: "2026-12-19",
    active: false,
    steps: [
      mc("Aku mau kita break dulu", "15:14"),
      them("What happened?", "15:15", 1500, 650),
      mc("Tadi aku dipanggil karena ada yang lihat kita waktu lunch", "15:15"),
      mc("Mereka bilang campaign aku lolos karena kamu", "15:16", 350),
      them("That's not true, and you know that", "15:16", 1400, 850),
      mc("Aku tahu", "15:17"),
      mc("Tapi mereka gak peduli", "15:17", 350),
      mc("Aku perlu hilang dulu dari semua ini", "15:18", 350),
      them("Don't disappear", "15:18", 1500, 650),
      them("Let me come over. Kita bicarakan ini pelan-pelan", "15:19", 350, 1000),
      mc("Please don't", "15:19"),
      them("You didn't get that campaign because of me", "15:20", 1400, 850),
      them("Kamu dapat itu karena kamu kerja lebih keras dari siapa pun di ruangan itu", "15:20", 350, 1100),
      them("Aku bahkan minta orang lain ikut review supaya keputusan akhirnya tetap objektif", "15:21", 350, 1200),
      mc("Aku gak bisa denger ini sekarang", "15:21"),
      them("Then don't decide everything tonight", "15:22", 1400, 850),
      mc("Aku udah terlalu capek", "15:22"),
      them("You can be tired", "15:23", 1300, 650),
      them("Tapi jangan hukum diri kamu untuk sesuatu yang gak kamu lakukan", "15:23", 350, 1000),
      mc("Dirga, please", "15:24"),
      them("Okay", "15:24", 1400, 500),
      them("I won't push", "15:25", 350, 600),
      them("But I need you to know I don't believe a word they said about you", "15:25", 350, 1100),
      them("And I'm still here whenever you're ready", "15:26", 350, 900),
      mc("Aku gak tahu kapan", "15:26"),
      them("I'll wait", "15:27", 1300, 550),
      mc("Jangan", "15:27"),
      them("I can't promise that", "15:28", 1300, 650),
      mc("Aku matiin HP dulu", "15:28"),
      them("Please let Petra know you're safe", "15:29", 1400, 750),
      mc("I will", "15:29"),
      them("Take care of yourself", "15:30", 1300, 700),
      them("Please", "15:30", 350, 500)
    ]
  };

  config.photos = (config.photos || []).filter((photo) => !["photo-24", "photo-25", "photo-26", "photo-27"].includes(photo.id));
  config.photos.push(
    {
      id: "photo-25",
      title: "8 December 2026",
      caption: "8 December 2026 · 1:05 PM",
      src: "assets/photos/gallery/Airport vibes.jpg",
      albums: ["places"],
      availableAfter: "petra_singapore_checkin",
      availableAfterDate: "2026-12-08"
    },
    {
      id: "photo-26",
      title: "8 December 2026",
      caption: "8 December 2026 · 8:44 PM",
      src: "assets/photos/gallery/download (27).jpg",
      albums: [],
      availableAfter: "dirga_singapore_after_dinner",
      availableAfterDate: "2026-12-08"
    },
    {
      id: "photo-27",
      title: "9 December 2026",
      caption: "9 December 2026 · 9:26 AM",
      src: "assets/photos/gallery/download (28).jpg",
      albums: ["work"],
      availableAfter: "dirga_singapore_presentation",
      availableAfterDate: "2026-12-09"
    },
    {
      id: "photo-24",
      title: "19 December 2026",
      caption: "19 December 2026 · 12:58 PM",
      src: "assets/photos/gallery/download (29).jpg",
      albums: ["favorites"],
      availableAfter: "dirga_story_epilogue",
      availableAfterDate: "2026-12-19"
    }
  );

  (config.xApp?.posts || []).forEach((post) => {
    if (post.availableAfter === "dirga_december_meetup") {
      post.time = "1 Dec";
      post.availableAfterDate = "2026-12-01";
    }
    if (post.availableAfter === "petra_december_confession") {
      post.time = "2 Dec";
      post.availableAfterDate = "2026-12-02";
    }
  });

  config.xApp.posts = (config.xApp?.posts || []).filter((post) => (
    post.text !== "ternyata ngasih waktu ke seseorang gak selalu berarti kehilangan waktu sendiri"
  ));
  const xPost = (time, text, availableAfter, availableAfterDate, views = 1) => ({
    time,
    text,
    replies: 0,
    reposts: 0,
    likes: 0,
    views,
    availableAfter,
    availableAfterDate
  });
  config.xApp.posts.unshift(
    xPost("19 Dec", "i need to disappear before i start hating everything i worked for", "dirga_break_request", "2026-12-19", 2),
    xPost("19 Dec", "ternyata orang bisa mengubah satu buket bunga jadi barang bukti", "maria_lunch_exposed", "2026-12-19", 3),
    xPost("19 Dec", "dia bawa bunga ke lunch. subtlety has officially left the building", "dirga_story_epilogue", "2026-12-19", 2),
    xPost("18 Dec", "hari ini gue menang dan ternyata rasanya tetap pahit kalau harus terus membuktikan diri", "dirga_final_review", "2026-12-18", 4),
    xPost("18 Dec", "FINAL REVIEW LOLOS. i would like to thank caffeine, spite, and my team", "adelina_final_review", "2026-12-18", 5),
    xPost("16 Dec", "i know what i did to earn this. kenapa sekarang gue yang harus ikut ragu", "dirga_serious_rumor", "2026-12-16", 4),
    xPost("16 Dec", "orang-orang lebih gampang percaya gue dibantu cowok daripada percaya gue emang jago kerja", "maria_serious_rumor", "2026-12-16", 6),
    xPost("15 Dec", "bikin relationship rules sama lawyer adalah kesalahan karena dia benar-benar bikin pasal", "dirga_secret_rules", "2026-12-15", 3),
    xPost("14 Dec", "professional at work apparently means pretending you don't know your own boyfriend. hated it", "dirga_secret_distance", "2026-12-14", 4),
    xPost("14 Dec", "secret relationship day three: hampir ketahuan gara-gara pesanan kopi", "bintang_secret_coffee", "2026-12-14", 3),
    xPost("11 Dec", "good night boyfriend diketik sekali efeknya orang minta diulang terus", "dirga_first_date_checkin", "2026-12-11", 3),
    xPost("11 Dec", "pacaran sama orang kantor ternyata paginya tetap dipanggil Bu", "dirga_office_return", "2026-12-11", 2),
    xPost("10 Dec", "officially trying this. secretly. what could possibly go wrong", "dirga_singapore_rumor", "2026-12-10", 4),
    xPost("9 Dec", "someone said he was protecting the project then admitted he was protecting me too. normal", "dirga_singapore_presentation", "2026-12-09", 3),
    xPost("9 Dec", "dibawain kopi di negara orang ternyata tetap efektif bikin salting", "dirga_singapore_coffee", "2026-12-09", 2),
    xPost("8 Dec", "koper gue diangkatin, kopi gue diinget, profesionalisme gue ditinggal di jakarta", "dirga_singapore_hotel", "2026-12-08", 3),
    xPost("8 Dec", "business trip katanya tapi satu orang malah ngotot jemput gue dari rumah", "petra_singapore_checkin", "2026-12-08", 2)
  );
  window.__BREAK_ENDING__ = {
    resolution: config.chatScripts.dirga_story_resolution,
    epilogue: config.chatScripts.dirga_story_epilogue
  };
})();

/* Singapore, hubungan rahasia, dan penutup cerita utama. */
(() => {
  const config = window.STORY_CONFIG;
  const mc = (text, time, waitBefore = 500, extra = {}) => ({ type: "mc", text, time, waitBefore, ...extra });
  const them = (text, time, waitBefore = 1400, typingMs = 1000, extra = {}) => ({ type: "them", text, time, waitBefore, typingMs, ...extra });
  const next = (id, threadId, text, storyDate, time, activateChatScript, extra = {}) => ({
    id,
    threadId,
    notificationTitle: threadId === "dirga" ? "?" : config.threads.find((thread) => thread.id === threadId)?.name,
    text,
    storyDate,
    time,
    afterMs: 5500,
    requireAppExit: true,
    delayAfterExit: true,
    activateChatScript,
    ...extra
  });

  Object.assign(config.chatScripts, {
    dirga_singapore_pickup: {
      threadId: "dirga",
      storyDate: "2026-12-08",
      active: false,
      onComplete: next("singapore-briefing-chat", "dirga", "Stop looking at the slides like they personally offended you", "2026-12-08", "09:15", "dirga_singapore_briefing"),
      steps: [
        mc("Morningg", "07:05"),
        mc("Secara fisik iya", "07:06", 350),
        mc("Secara mental belum", "07:06", 350),
        them("Good enough", "07:07", 1300, 700),
        them("Aku sampai sekitar sepuluh menit lagi", "07:07", 400, 1000),
        mc("Loh, bukannya ketemu di airport?", "07:08"),
        them("I changed the plan", "07:08", 1400, 800),
        them("Aku jemput", "07:08", 350, 650),
        mc("Dirga, koper aku berat loh", "07:09"),
        them("That's exactly why I'm picking you up", "07:09", 1400, 1100),
        mc("Oke ini masuk akal sih", "07:10"),
        them("Finally", "07:10", 1200, 600),
        mc("Jangan seneng dulu, aku masih nyari charger", "07:10"),
        them("Take your time", "07:11", 1300, 700),
        them("Tapi jangan lebih dari sepuluh menit", "07:11", 350, 900),
        mc("Bos legalnya mulai muncul ya", "07:12"),
        them("Only because someone needs supervision", "07:12", 1300, 1000)
      ]
    },

    dirga_singapore_briefing: {
      threadId: "dirga",
      storyDate: "2026-12-08",
      active: false,
      onComplete: next("singapore-petra-checkin", "petra", "Udah berangkat?", "2026-12-08", "10:40", "petra_singapore_checkin"),
      steps: [
        mc("Mereka memang nyebelin", "09:15"),
        them("Smile a little", "09:16", 1300, 700),
        them("Client-nya mulai lihat ke arah kamu", "09:16", 350, 900),
        mc("Kamu juga duduk di depan aku, ngapain lewat chat?", "09:17"),
        them("So I don't interrupt you", "09:17", 1400, 900),
        mc("You are interrupting me", "09:18"),
        them("And yet you're still replying", "09:18", 1300, 900),
        mc("Nyebelin", "09:18"),
        them("You're doing great, by the way", "09:19", 1400, 1000),
        mc("Jangan muji dulu, masih ada sesi Q&A", "09:19"),
        them("I know", "09:20", 1200, 550),
        them("Aku tetap impressed", "09:20", 350, 750)
      ]
    },

    petra_singapore_checkin: {
      threadId: "petra",
      storyDate: "2026-12-08",
      active: false,
      onComplete: next("singapore-hotel-checkin", "dirga", "Room okay?", "2026-12-08", "17:45", "dirga_singapore_hotel", {
        calendarEvents: [
          { id: "flight-singapore-8-dec", date: "2026-12-08", title: "Flight to Singapore", time: "1:20 PM", color: "#ff9f0a", type: "travel" }
        ]
      }),
      steps: [
        mc("Udah", "10:40"),
        mc("Gue di airport sama Dirga", "10:40", 350),
        them("KALIAN NGAPAIN", "10:41", 1300, 750),
        mc("Kerja, please", "10:41"),
        them("Kerja pakai dijemput segala?", "10:42", 1300, 900),
        mc("Koper gue berat", "10:42"),
        them("Itu alasan dia atau alasan lo?", "10:43", 1300, 950),
        mc("Gue mute ya", "10:43"),
        them("Jangan dulu", "10:44", 1100, 600),
        them("Foto orangnya", "10:44", 350, 650),
        mc("Gak ada", "10:44"),
        them("Bohong banget", "10:45", 1200, 700),
        mc("Gue lagi berusaha profesional", "10:45"),
        them("Profesional sambil salting ya", "10:46", 1300, 850)
      ]
    },

    dirga_singapore_hotel: {
      threadId: "dirga",
      storyDate: "2026-12-08",
      active: false,
      onComplete: next("singapore-after-dinner", "dirga", "You're back in your room?", "2026-12-08", "22:48", "dirga_singapore_after_dinner", {
        calendarEvents: [
          { id: "singapore-dinner-8-dec", date: "2026-12-08", title: "Dinner with Dirga", time: "8:00 PM", color: "#ff375f", type: "personal" }
        ]
      }),
      steps: [
        mc("Udaaah", "17:45"),
        mc("Bagus banget malah", "17:45", 350),
        them("Good", "17:46", 1200, 600),
        them("Rest for a while", "17:46", 350, 700),
        mc("Kamu sendiri?", "17:47"),
        them("Still reviewing tomorrow's documents", "17:47", 1400, 1000),
        mc("Of course", "17:47"),
        them("That sounded judgmental", "17:48", 1300, 800),
        mc("Concerned", "17:48"),
        them("I like that better", "17:49", 1200, 700),
        them("Dinner at eight?", "17:49", 350, 800),
        mc("Ini ajakan kerja atau pribadi?", "17:50"),
        them("Personal", "17:50", 1300, 650),
        them("Tapi kamu boleh bawa deck kalau itu bikin kamu merasa lebih aman", "17:51", 350, 1100),
        mc("Gak lucu", "17:51"),
        them("7:50 di lobby", "17:52", 1200, 700),
        mc("Katanya jam delapan", "17:52"),
        them("I know how long it takes you to come downstairs", "17:53", 1300, 1000),
        mc("DIRGAAA", "17:53"),
        them("See you at eight", "17:54", 1200, 700)
      ]
    },

    dirga_singapore_after_dinner: {
      threadId: "dirga",
      storyDate: "2026-12-08",
      active: false,
      onComplete: next("singapore-morning-coffee", "dirga", "You don't come downstairs? Aku order kopi for you", "2026-12-09", "07:20", "dirga_singapore_coffee", {
        imageSrc: "assets/photos/gallery/917467755359088838.jpg",
        imageAlt: "Dirga holding a cup of coffee",
        calendarEvents: [
          { id: "regional-presentation-9-dec", date: "2026-12-09", title: "Regional presentation", time: "10:00 AM", color: "#0a84ff", type: "work" }
        ]
      }),
      steps: [
        mc("Udaah", "22:48"),
        them("I had a good time tonight", "22:49", 1300, 850),
        mc("Aku juga", "22:49"),
        them("Even with all the client drama?", "22:50", 1300, 900),
        mc("Especially after it", "22:50"),
        them("About what we talked about before", "22:51", 1400, 950),
        mc("Dirga", "22:51"),
        them("Yes?", "22:52", 1100, 550),
        mc("Aku masih takut", "22:52"),
        mc("Tapi aku juga gak mau kamu mundur", "22:52", 350),
        them("I won't", "22:53", 1300, 600),
        them("Aku akan berjalan sepelan mungkin, following your pace", "22:53", 350, 1000),
        mc("What if I ask you not to be too slow?", "22:54"),
        them("Then I'll be at your door in five minutes", "22:54", 1400, 1000),
        mc("JANGAN SEKARANG", "22:55"),
        them("I know", "22:55", 1100, 550),
        them("Get some sleep. Besok hari yang panjang", "22:56", 350, 900),
        mc("Good night, Dirga", "22:56"),
        them("Good night", "22:57", 1200, 600),
        them("And thank you for giving me a chance", "22:57", 350, 850)
      ]
    },

    dirga_singapore_coffee: {
      threadId: "dirga",
      storyDate: "2026-12-09",
      active: false,
      onComplete: next("singapore-presentation-finished", "dirga", "You did well today", "2026-12-09", "15:40", "dirga_singapore_presentation"),
      steps: [
        mc("Ini sogokan biar aku gak telat?", "07:20"),
        them("Preventive measure", "07:21", 1300, 700),
        mc("DIRGA 😁😁😁", "07:21"),
        mc("Makasih kopinya", "07:21", 350),
        them("You're welcome", "07:22", 1200, 650),
        them("Ten minutes?", "07:22", 350, 600),
        mc("Fifteen", "07:22"),
        them("Twelve. Final offer", "07:23", 1200, 750),
        mc("Deal", "07:23")
      ]
    },

    dirga_singapore_presentation: {
      threadId: "dirga",
      storyDate: "2026-12-09",
      active: false,
      onComplete: next("singapore-evening-invite", "dirga", "Are you tired?", "2026-12-09", "18:30", "dirga_singapore_evening_invite"),
      steps: [
        mc("Aku hampir mati waktu mereka tanya angka kuartal tiga", "15:40"),
        them("You answered perfectly", "15:41", 1300, 800),
        mc("Karena ada yang bisik-bisik jawabannya dari sebelah", "15:41"),
        them("I merely confirmed what you already knew", "15:42", 1400, 1000),
        mc("Sok bijak", "15:42"),
        mc("Tadi kamu serem banget ke client", "15:42", 350),
        them("They were wasting your time", "15:43", 1300, 850),
        mc("Jadi kamu belain aku?", "15:43"),
        them("I was protecting the project", "15:44", 1300, 850),
        mc("Liar", "15:44"),
        them("Fine", "15:45", 1100, 500),
        them("I was protecting you too", "15:45", 350, 750),
        mc("Oh", "15:45"),
        them("Don't make it awkward now", "15:46", 1200, 800),
        mc("Kamu yang bikin aku salting", "15:46"),
        them("I can live with that", "15:47", 1200, 700)
      ]
    },

    dirga_singapore_evening_invite: {
      threadId: "dirga",
      storyDate: "2026-12-09",
      active: false,
      onComplete: next("singapore-personal-evening", "dirga", "You're back in your room?", "2026-12-09", "22:15", "dirga_singapore_personal_evening", {
        calendarEvents: [
          { id: "singapore-evening-9-dec", date: "2026-12-09", title: "Evening with Dirga", time: "7:30 PM", color: "#ff375f", type: "personal" }
        ]
      }),
      steps: [
        mc("A little", "18:30"),
        them("Aku nemu tempat yang mungkin kamu suka", "18:31", 1300, 900),
        mc("Lagi-lagi tempat rahasia?", "18:31"),
        them("Trust me", "18:32", 1200, 600),
        mc("Itu kalimat orang mencurigakan", "18:32"),
        them("And yet you keep saying yes", "18:33", 1300, 800),
        mc("Karena selera kamu annoyingly good", "18:33"),
        them("Twenty minutes. Meet me in the lobby", "18:34", 1300, 900),
        mc("Ini ajakan atau perintah?", "18:34"),
        them("A carefully worded invitation", "18:35", 1200, 750),
        mc("Yaudah iya", "18:35")
      ]
    },

    dirga_singapore_personal_evening: {
      threadId: "dirga",
      storyDate: "2026-12-09",
      active: false,
      onComplete: next("singapore-rumor-bintang", "bintang", "Kak, maaf mau tanya sesuatu", "2026-12-10", "09:15", "bintang_singapore_rumor"),
      steps: [
        mc("Udaah", "22:15"),
        mc("Tempatnya bagus banget", "22:15", 350),
        them("The place or the company?", "22:16", 1300, 800),
        mc("Jangan mulai", "22:16"),
        them("It was a genuine question", "22:17", 1200, 750),
        mc("Dua-duanya", "22:17"),
        them("Good answer", "22:18", 1100, 500),
        them("I wish we had more time here", "22:18", 350, 850),
        mc("Kita masih punya besok", "22:19"),
        them("I know", "22:19", 1100, 500),
        them("Aku cuma mulai terbiasa punya kamu di dekat aku", "22:20", 350, 900),
        mc("Jangan ngomong gitu sembarangan", "22:20"),
        them("I don't say things I don't mean", "22:21", 1300, 850),
        mc("That's the problem", "22:21"),
        them("Is it really a problem?", "22:22", 1200, 750),
        mc("Not anymore, I think", "22:22"),
        them("I'll take that", "22:23", 1200, 650)
      ]
    },

    bintang_singapore_rumor: {
      threadId: "bintang",
      storyDate: "2026-12-10",
      active: false,
      onComplete: { activateChatOnExit: "dirga_singapore_rumor" },
      steps: [
        mc("Tanya ajaa", "09:15"),
        them("Tadi ada yang bilang Kakak berangkat ke Singapore bareng Pak Dirga", "09:16", 1300, 1000),
        mc("Siapa yang bilang?", "09:16"),
        them("Katanya ada anak finance yang lihat di airport", "09:17", 1300, 900),
        them("Aku gak bilang apa-apa kok, Kak", "09:17", 350, 750),
        mc("Oke, makasih udah kabarin", "09:18"),
        them("Aman, Kak", "09:18", 1100, 600)
      ]
    },

    dirga_singapore_rumor: {
      threadId: "dirga",
      storyDate: "2026-12-10",
      active: false,
      onComplete: next("singapore-return-flight", "dirga", "Where are you?", "2026-12-10", "16:25", "dirga_singapore_return", {
        calendarEvents: [
          { id: "flight-home-10-dec", date: "2026-12-10", title: "Flight home", time: "6:00 PM", color: "#ff9f0a", type: "travel" }
        ]
      }),
      steps: [
        mc("Dirga", "09:20"),
        them("That sounds serious", "09:20", 1300, 750),
        mc("Ada yang mulai nanya soal kita", "09:21"),
        them("Who?", "09:21", 1200, 550),
        mc("Anak kantor katanya lihat kita di airport", "09:22"),
        them("Are you okay?", "09:22", 1300, 700),
        mc("Aku gak tahu", "09:23"),
        them("Aku di lobby", "09:23", 1200, 650),
        mc("Hah?", "09:23"),
        them("Turun kalau kamu mau ngobrol", "09:24", 1200, 750),
        them("If not, I'll wait here", "09:24", 350, 750),
        mc("Kasih aku lima menit", "09:25"),
        mc("Aku gak mau sembunyi dari kamu", "10:08", 900),
        them("You don't have to", "10:09", 1300, 700),
        mc("Tapi kalau di kantor aku masih belum siap", "10:09"),
        them("Then nothing changes at the office", "10:10", 1300, 850),
        them("We remain professional", "10:10", 350, 700),
        them("Tapi di luar itu, aku tetap ingin punya kesempatan buat jadi milik kamu", "10:11", 350, 1100),
        mc("That was unfairly convincing", "10:11"),
        them("Is that a yes?", "10:12", 1200, 650),
        mc("Itu artinya jangan bikin aku menyesal", "10:12"),
        them("I won't", "10:13", 1200, 600),
        mc("Jangan janji soal sesuatu yang gak bisa kamu kontrol", "10:13"),
        them("Fair", "10:14", 1100, 500),
        them("Then I'll promise something I can control", "10:14", 350, 850),
        them("Aku akan selalu jujur sama kamu", "10:15", 350, 750),
        mc("Okay", "10:15"),
        them("Okay as in?", "10:16", 1200, 650),
        mc("YES, DIRGA", "10:16"),
        them("Finally", "10:17", 1200, 600),
        mc("Jangan sombong dulu", "10:17"),
        them("Too late", "10:18", 1100, 550)
      ]
    },

    dirga_singapore_return: {
      threadId: "dirga",
      storyDate: "2026-12-10",
      active: false,
      onComplete: next("office-return-formal", "dirga", "Selamat pagi, Bu", "2026-12-11", "09:12", "dirga_office_return"),
      steps: [
        mc("Lagi beli oleh-oleh", "16:25"),
        them("Boarding starts in twenty minutes", "16:26", 1300, 800),
        mc("Aku tahuu", "16:26"),
        them("You said that fifteen minutes ago", "16:27", 1300, 850),
        mc("Tenang, aku tahu jalan pulang", "16:27"),
        them("That's not reassuring", "16:28", 1200, 750),
        them("Share your location", "16:28", 350, 650),
        mc("DIRGA PLEASE", "16:29"),
        them("Five minutes, atau aku cari kamu", "16:29", 1200, 750),
        mc("Iyaa ini lagi jalan", "16:30"),
        them("Good", "16:30", 1100, 500),
        mc("Jangan good-good, aku bukan anak kecil", "16:31"),
        them("Then stop disappearing like one", "16:31", 1200, 800),
        mc("Aku cuma beli oleh-oleh", "16:32"),
        them("Aku juga mau", "16:32", 1100, 600),
        mc("Kamu mau apa?", "16:32"),
        them("You", "16:33", 1200, 500),
        mc("GAK LUCU", "16:33"),
        them("I wasn't joking", "16:34", 1200, 650)
      ]
    },

    dirga_office_return: {
      threadId: "dirga",
      storyDate: "2026-12-11",
      active: false,
      onComplete: next("petra-official-news", "petra", "Lo udah balik?", "2026-12-11", "12:30", "petra_official_news"),
      steps: [
        them("Saya sudah kirim revisi kontraknya lewat email", "09:12", 350, 850),
        mc("Baik, Pak. Nanti saya cek", "09:13"),
        them("Please review it before lunch", "09:13", 1200, 700),
        mc("Siap, Pak Dirga", "09:14"),
        them("You're enjoying this, aren't you?", "09:14", 1300, 800),
        mc("Enjoying what, Pak?", "09:15"),
        them("Calling me Pak after everything that happened in Singapore", "09:15", 1300, 900),
        mc("Kita sedang profesional", "09:16"),
        them("You're impossible", "09:16", 1200, 650),
        mc("See you di meeting, Pak", "09:17"),
        them("After work", "09:17", 1200, 600),
        them("Don't make any plans", "09:17", 350, 650),
        mc("Itu perintah?", "09:18"),
        them("A carefully worded invitation", "09:18", 1200, 750),
        mc("Katanya profesional", "09:19"),
        them("Jam kerja berakhir pukul lima", "09:19", 1200, 700)
      ]
    },

    petra_official_news: {
      threadId: "petra",
      storyDate: "2026-12-11",
      active: false,
      onComplete: next("first-post-trip-date", "dirga", "I'm downstairs", "2026-12-11", "17:40", "dirga_first_official_date", {
        calendarEvents: [
          { id: "first-official-date-11-dec", date: "2026-12-11", title: "Dinner with Dirga", time: "7:00 PM", color: "#ff375f", type: "personal" }
        ]
      }),
      steps: [
        mc("Udaah", "12:30"),
        them("Oleh-oleh gue mana", "12:31", 1200, 650),
        mc("Gue punya kabar lebih penting", "12:31"),
        them("LO JADIAN?", "12:32", 1300, 700),
        mc("Kok langsung kesimpulannya ke situ?", "12:32"),
        them("Karena gue kenal lo", "12:33", 1200, 650),
        them("Jadi bener?", "12:33", 350, 600),
        mc("Kita coba jalanin", "12:34"),
        them("GUE UDAH TAU DARI INSIDEN GANTENG BANGET", "12:34", 1300, 900),
        mc("Jangan diungkit lagi", "12:35"),
        them("Gimana gue bisa lupa", "12:35", 1200, 700),
        them("Lo kirim foto cowoknya langsung ke orangnya", "12:35", 350, 750),
        mc("Gue block beneran ya", "12:36"),
        them("Selamat yaa, akhirnya", "12:36", 1200, 700),
        mc("Makasih, Pet", "12:37"),
        them("Tapi gue tetap mau oleh-oleh", "12:37", 1100, 650)
      ]
    },

    dirga_first_official_date: {
      threadId: "dirga",
      storyDate: "2026-12-11",
      active: false,
      onComplete: next("first-date-checkin", "dirga", "One question", "2026-12-11", "22:35", "dirga_first_date_checkin"),
      steps: [
        mc("Kamu gak bilang mau langsung jemput", "17:40"),
        them("I told you not to make plans", "17:41", 1300, 800),
        mc("Itu bukan berarti langsung datang", "17:41"),
        them("Too late", "17:42", 1200, 600),
        mc("Aku belum ganti baju", "17:42"),
        them("Take your time", "17:43", 1200, 650),
        mc("Sejak kapan kamu sabar?", "17:43"),
        them("Since you", "17:44", 1300, 600),
        mc("Cheesy banget", "17:44"),
        them("Still true", "17:45", 1100, 550),
        mc("Sepuluh menit", "17:45"),
        them("Make it fifteen", "17:46", 1100, 600),
        mc("Tumben", "17:46"),
        them("Aku sedang berusaha jadi boyfriend yang pengertian", "17:47", 1300, 850),
        mc("Jangan pede dulu", "17:47"),
        them("You haven't denied it", "17:48", 1200, 700)
      ]
    },

    dirga_first_date_checkin: {
      threadId: "dirga",
      storyDate: "2026-12-11",
      active: false,
      onComplete: next("secret-coffee-bintang", "bintang", "Kak, ini kopinya dari Pak Dirga?", "2026-12-14", "09:20", "bintang_secret_coffee"),
      steps: [
        mc("Serius banget?", "22:35"),
        them("Are you happy?", "22:36", 1300, 700),
        mc("About what?", "22:36"),
        them("About us", "22:37", 1200, 600),
        mc("I am", "22:37"),
        mc("Takutnya masih ada, tapi aku seneng", "22:37", 350),
        them("That's enough for me", "22:38", 1300, 750),
        mc("Kamu sendiri?", "22:38"),
        them("More than I expected to be", "22:39", 1300, 800),
        mc("Good", "22:39"),
        them("That's all?", "22:40", 1100, 600),
        mc("Good night, boyfriend", "22:40"),
        them("...", "22:41", 1300, 500),
        them("Say that again", "22:41", 350, 650),
        mc("Good night, Dirga", "22:42"),
        them("Cruel", "22:42", 1100, 550),
        mc("Tidur sana", "22:42"),
        them("Good night, girlfriend", "22:43", 1100, 650)
      ]
    },

    bintang_secret_coffee: {
      threadId: "bintang",
      storyDate: "2026-12-14",
      active: false,
      onComplete: { activateChatOnExit: "dirga_secret_coffee" },
      steps: [
        mc("Hah?", "09:20"),
        them("Tadi beliau yang titip ke aku", "09:21", 1200, 700),
        them("Pesanannya juga sama persis kayak punya Kakak", "09:21", 350, 850),
        mc("Oh, mungkin beliau ingat waktu meeting kemarin", "09:22"),
        them("Pak Dirga hafal pesanan kopi Kakak?", "09:22", 1200, 800),
        mc("Kayaknya kebetulan aja", "09:23"),
        them("Ooh, oke, Kak", "09:23", 1100, 600)
      ]
    },

    dirga_secret_coffee: {
      threadId: "dirga",
      storyDate: "2026-12-14",
      active: false,
      onComplete: {
        exitTransition: {
          id: "secret-distance-later",
          fromViews: ["whatsapp", "thread"],
          storyDate: "2026-12-14",
          storyTime: "17:45",
          activateChatScript: "dirga_secret_distance"
        }
      },
      steps: [
        mc("Kamu hampir bikin kita ketahuan", "09:25"),
        them("Because of coffee?", "09:25", 1300, 700),
        mc("Bintang nanya kenapa kamu tahu pesanan aku", "09:26"),
        them("Next time aku pura-pura gak tahu", "09:26", 1300, 800),
        mc("Jangan gitu juga", "09:27"),
        them("Secret relationships are complicated", "09:27", 1200, 750),
        mc("Baru sadar?", "09:28"),
        them("No", "09:28", 1100, 500),
        them("Still worth it, though", "09:28", 350, 650),
        mc("Untung jawabannya benar", "09:29"),
        them("I know my girlfriend", "09:29", 1200, 650)
      ]
    },

    dirga_secret_distance: {
      threadId: "dirga",
      storyDate: "2026-12-14",
      active: false,
      onComplete: next("secret-rules", "dirga", "We need rules", "2026-12-14", "19:10", "dirga_secret_rules"),
      steps: [
        mc("Kamu marah sama aku?", "17:45"),
        them("No. Why would you think that?", "17:46", 1300, 800),
        mc("Dari pagi kamu kayak gak kenal aku", "17:46"),
        them("I was trying to be careful", "17:47", 1300, 750),
        mc("Careful bukan berarti harus pura-pura asing", "17:47"),
        them("You're right", "17:48", 1200, 600),
        them("Aku terlalu berlebihan", "17:48", 350, 650),
        mc("Aku ngerti kita harus profesional", "17:49"),
        mc("Tapi aku gak mau ngerasa kamu malu punya hubungan sama aku", "17:49", 350),
        them("Never", "17:50", 1300, 550),
        them("Jangan pernah berpikir begitu", "17:50", 350, 700),
        them("Aku cuma takut satu kesalahan dari aku malah jadi beban buat kamu", "17:51", 350, 900),
        mc("Then don't disappear", "17:51"),
        them("I won't", "17:52", 1200, 600),
        them("Come downstairs", "17:52", 350, 650),
        mc("Sekarang?", "17:53"),
        them("Aku mau minta maaf dengan benar", "17:53", 1200, 750),
        mc("Kasih aku lima menit", "17:54"),
        them("Take your time. Aku tunggu", "17:54", 1200, 700)
      ]
    },

    dirga_secret_rules: {
      threadId: "dirga",
      storyDate: "2026-12-14",
      active: false,
      onComplete: next("secret-meeting-tease", "dirga", "You haven't looked at me for twenty minutes", "2026-12-15", "10:20", "dirga_secret_meeting"),
      steps: [
        mc("Romantis banget", "19:10"),
        them("I'm serious", "19:11", 1200, 600),
        mc("Oke, Pak Legal. Sebutkan peraturannya", "19:11"),
        them("Pertama, no special treatment at the office", "19:12", 1300, 800),
        mc("Setuju", "19:12"),
        them("No personal calls during working hours unless it's important", "19:13", 1300, 900),
        mc("Setuju", "19:13"),
        them("Jangan sengaja lembur sendirian cuma supaya bisa pulang sama aku", "19:14", 1300, 900),
        mc("Itu terlalu spesifik", "19:14"),
        them("Because you've done it twice", "19:15", 1200, 700),
        mc("Allegedly", "19:15"),
        them("And no calling me Pak outside the office", "19:16", 1200, 750),
        mc("Yang itu opsional", "19:16"),
        them("Non-negotiable", "19:17", 1200, 650),
        mc("Giliran aku", "19:17"),
        them("Go ahead", "19:18", 1100, 550),
        mc("Jangan pura-pura gak kenal aku lagi", "19:18"),
        them("Agreed", "19:19", 1100, 550),
        mc("Kita masih boleh makan siang bareng kalau sama tim", "19:19"),
        them("Agreed", "19:20", 1100, 550),
        mc("Jangan kirim hadiah ke kantor", "19:20"),
        them("That one is difficult", "19:21", 1200, 700),
        mc("Dirga", "19:21"),
        them("Fine", "19:22", 1100, 500),
        them("Anything else?", "19:22", 350, 600),
        mc("Kalau cuma kita berdua, gak ada aturan", "19:23"),
        them("That sounds dangerous", "19:23", 1200, 700),
        mc("Katanya still worth it", "19:24"),
        them("It is", "19:24", 1100, 550)
      ]
    },

    dirga_secret_meeting: {
      threadId: "dirga",
      storyDate: "2026-12-15",
      active: false,
      onComplete: next("serious-rumor-maria", "maria", "Kak, maaf ganggu", "2026-12-16", "14:15", "maria_serious_rumor"),
      steps: [
        mc("Kita lagi meeting", "10:20"),
        them("I noticed", "10:21", 1200, 550),
        mc("Katanya harus profesional", "10:21"),
        them("I'm starting to regret the rules", "10:22", 1200, 750),
        mc("Baru satu hari", "10:22"),
        them("Exactly", "10:23", 1100, 500),
        mc("Fokus ke presentasi", "10:23"),
        them("I am", "10:24", 1100, 500),
        mc("Slide-nya di depan", "10:24"),
        them("I wasn't talking about the slide", "10:25", 1300, 750),
        mc("DIRGAAA", "10:25"),
        them("Don't smile", "10:26", 1200, 600),
        them("Bintang mulai lihat ke arah kamu", "10:26", 350, 700),
        mc("INI SALAH SIAPA", "10:27"),
        them("Yours", "10:27", 1100, 500),
        mc("Kok aku?", "10:27"),
        them("You're too easy to tease", "10:28", 1200, 650),
        them("Dinner tonight?", "17:05", 1500, 700),
        mc("Kita baru bikin aturan", "17:05"),
        them("Working hours are over", "17:06", 1200, 650),
        mc("Cepat banget hitungannya", "17:06"),
        them("I'm a lawyer", "17:07", 1200, 550),
        them("Details matter", "17:07", 350, 600),
        mc("Jam berapa?", "17:08"),
        them("Seven", "17:08", 1100, 500),
        mc("Jemput aku?", "17:08"),
        them("Always", "17:09", 1100, 550)
      ]
    },

    maria_serious_rumor: {
      threadId: "maria",
      storyDate: "2026-12-16",
      active: false,
      onComplete: { activateChatOnExit: "dirga_serious_rumor" },
      steps: [
        mc("Gapapa, ada apa?", "14:15"),
        them("Aku dengar sesuatu dari tim finance", "14:16", 1200, 750),
        them("Mereka bilang approval legal campaign kita cepat karena Kakak dekat sama Pak Dirga", "14:16", 350, 1000),
        mc("Siapa yang bilang?", "14:17"),
        them("Aku gak tahu awalnya dari siapa", "14:17", 1200, 700),
        them("Tapi beberapa orang sudah bahas", "14:18", 350, 700),
        them("Aku tahu itu gak benar, Kak", "14:18", 350, 700),
        mc("Makasih udah kasih tahu", "14:19"),
        them("Kakak gapapa?", "14:19", 1100, 600),
        mc("Gapapa kok", "14:20"),
        mc("Tolong jangan bahas ke yang lain dulu ya", "14:20", 350),
        them("Siap, Kak", "14:21", 1100, 600)
      ]
    },

    dirga_serious_rumor: {
      threadId: "dirga",
      storyDate: "2026-12-16",
      active: false,
      onComplete: {
        exitTransition: {
          id: "rumor-petra-evening",
          fromViews: ["whatsapp", "thread"],
          storyDate: "2026-12-16",
          storyTime: "20:30",
          activateChatScript: "petra_rumor_support"
        }
      },
      steps: [
        mc("Kamu udah tahu soal rumor kantor?", "14:24"),
        them("Yes", "14:24", 1200, 500),
        mc("Sejak kapan?", "14:25"),
        them("This afternoon", "14:25", 1200, 600),
        mc("Kenapa kamu gak bilang?", "14:26"),
        them("Aku sedang cari tahu dari mana asalnya", "14:26", 1300, 800),
        mc("Tanpa bilang ke aku?", "14:27"),
        them("I didn't want you to worry before I had the facts", "14:27", 1400, 900),
        mc("Tapi ini tentang aku juga", "14:28"),
        them("You're right", "14:28", 1200, 600),
        mc("Orang-orang jadi mikir kerjaan aku lolos karena kamu", "14:29"),
        them("I know that isn't true", "14:29", 1300, 750),
        mc("Kamu tahu, tapi mereka enggak", "14:30"),
        them("Aku bisa mundur dari project ini", "14:30", 1300, 750),
        mc("Jangan", "14:31"),
        mc("Itu malah bikin rumornya kelihatan benar", "14:31", 350),
        them("Then tell me what you need", "14:32", 1300, 750),
        mc("Jangan selesaikan semuanya sendirian", "14:32"),
        mc("Talk to me first", "14:32", 350),
        them("Okay", "14:33", 1200, 500),
        them("We'll handle it together", "14:33", 350, 650)
      ]
    },

    petra_rumor_support: {
      threadId: "petra",
      storyDate: "2026-12-16",
      active: false,
      onComplete: next("final-review-bintang", "bintang", "KAK", "2026-12-18", "10:04", "bintang_final_review", {
        calendarEvents: [
          { id: "campaign-final-review-18-dec", date: "2026-12-18", title: "Campaign final review", time: "10:00 AM", color: "#0a84ff", type: "work" },
          { id: "marketing-team-lunch-18-dec", date: "2026-12-18", title: "Team lunch", time: "12:30 PM", color: "#30d158", type: "work" }
        ]
      }),
      steps: [
        mc("Pet", "20:30"),
        them("Kenapa?", "20:31", 1100, 550),
        mc("Rumor soal gue sama Dirga mulai nyebar", "20:31"),
        them("Rumor apaan?", "20:32", 1200, 600),
        mc("Katanya campaign gue gampang lolos karena deket sama dia", "20:32"),
        them("Najis banget mulut orang", "20:33", 1300, 700),
        mc("Gue tahu kerjaan gue bagus", "20:33"),
        mc("Tapi sekarang gue jadi mempertanyakan semuanya", "20:34", 350),
        them("Jangan", "20:34", 1100, 500),
        them("Lo kerja sampai lupa makan, kurang tidur, dan hampir nangis gara-gara revisi", "20:35", 350, 900),
        them("Jangan kasih semua hasil kerja itu ke orang yang cuma bisa ngomong", "20:35", 350, 900),
        mc("Tapi kalau ini ngaruh ke tim gimana?", "20:36"),
        them("Hadapi, jangan mundur", "20:36", 1200, 650),
        them("Buktiin campaign itu berhasil karena lo dan tim lo", "20:37", 350, 750),
        mc("Tumben bijak", "20:37"),
        them("Gue screenshot ya", "20:38", 1100, 550),
        mc("Jangan aneh-aneh", "20:38")
      ]
    },

    bintang_final_review: {
      threadId: "bintang",
      storyDate: "2026-12-18",
      active: false,
      onComplete: next("final-review-maria", "maria", "Kak, hasil testing caption juga bagus banget", "2026-12-18", "10:12", "maria_final_review"),
      steps: [
        them("FINAL REVIEW-NYA LOLOS", "10:04", 350, 700),
        mc("SERIUS?", "10:05"),
        them("SERIUS", "10:05", 1100, 550),
        them("Gak ada revisi tambahan", "10:05", 350, 650),
        mc("Akhirnyaaa", "10:06"),
        mc("Good job banget", "10:06", 350),
        mc("Nanti makan siang aku traktir, kabarin yang lain ya", "10:07", 350),
        them("SIAP, KAK", "10:07", 1100, 550),
        them("Aku screenshot dulu sebagai bukti", "10:08", 350, 650)
      ]
    },

    maria_final_review: {
      threadId: "maria",
      storyDate: "2026-12-18",
      active: false,
      onComplete: next("final-review-adelina", "adelina", "Kak, engagement teaser-nya lewat target", "2026-12-18", "10:20", "adelina_final_review"),
      steps: [
        them("Responsnya lebih natural dibanding versi sebelumnya", "10:12", 350, 750),
        mc("Aku udah dengar kabar final review dari Bintang", "10:13"),
        mc("Good job yaa, revisi kemarin ternyata worth it", "10:13", 350),
        them("Makasih, Kak", "10:14", 1100, 550),
        them("Berarti aman lanjut sesuai jadwal ya?", "10:14", 350, 650),
        mc("Aman", "10:15"),
        mc("Tinggal monitor respons setelah naik nanti", "10:15", 350),
        them("Siap, Kak", "10:16", 1100, 550)
      ]
    },

    adelina_final_review: {
      threadId: "adelina",
      storyDate: "2026-12-18",
      active: false,
      onComplete: next("final-review-dirga", "dirga", "Congratulations, Bu", "2026-12-18", "10:30", "dirga_final_review"),
      steps: [
        mc("Niceee", "10:20"),
        them("Komennya juga lebih positif dari perkiraan", "10:21", 1200, 700),
        mc("Good job ya", "10:21"),
        mc("Bintang udah bilang soal makan siang?", "10:22", 350),
        them("UDAH KAK", "10:22", 1100, 550),
        them("Itu informasi pertama yang dia sampaikan", "10:23", 350, 650),
        mc("Tentu saja 😭", "10:23")
      ]
    },

    dirga_final_review: {
      threadId: "dirga",
      storyDate: "2026-12-18",
      active: false,
      onComplete: {
        exitTransition: {
          id: "story-resolution-evening",
          fromViews: ["whatsapp", "thread"],
          storyDate: "2026-12-18",
          storyTime: "19:30",
          activateChatScript: "dirga_story_resolution"
        }
      },
      steps: [
        them("Campaign-nya sudah lolos final review", "10:30", 350, 700),
        mc("Thank you, Pak", "10:31"),
        mc("Terima kasih juga sudah membantu proses legalnya", "10:31", 350),
        them("Your team did an excellent job", "10:32", 1200, 750),
        mc("Saya sampaikan ke mereka", "10:32"),
        them("Now, can I talk to my girlfriend?", "10:35", 1500, 800),
        mc("Tergantung", "10:35"),
        them("I'm proud of you", "10:36", 1200, 650),
        mc("Karena campaign-nya atau karena aku berhasil gak ngamuk di kantor?", "10:36"),
        them("Both", "10:37", 1100, 500),
        mc("Kamu gak bantu approval-nya diam-diam, kan?", "10:37"),
        them("No", "10:38", 1100, 500),
        them("Aku bahkan meminta satu orang lain ikut review supaya prosesnya tetap objektif", "10:38", 350, 900),
        mc("Kenapa gak bilang?", "10:39"),
        them("Because this is your achievement", "10:39", 1200, 750),
        them("I didn't want my name anywhere near it", "10:40", 350, 750),
        mc("Thank you", "10:40"),
        them("You did this yourself", "10:41", 1200, 650),
        mc("Jangan bikin aku nangis di kantor", "10:41"),
        them("Save it for after work", "10:42", 1200, 650)
      ]
    },

    dirga_story_resolution: {
      threadId: "dirga",
      storyDate: "2026-12-18",
      active: false,
      onComplete: next("story-epilogue", "dirga", "You're home?", "2026-12-19", "22:15", "dirga_story_epilogue", {
        calendarEvents: [
          { id: "final-dinner-19-dec", date: "2026-12-19", title: "Dinner with Dirga", time: "7:00 PM", color: "#ff375f", type: "personal" }
        ]
      }),
      steps: [
        mc("Aku sudah mikir soal kita", "19:30"),
        them("Should I be worried?", "19:31", 1300, 700),
        mc("Sedikit", "19:31"),
        them("Go on", "19:32", 1100, 550),
        mc("Aku masih mau hubungan kita tetap private", "19:32"),
        mc("Tapi aku gak mau terus-terusan bohong atau pura-pura gak kenal kamu", "19:33", 350),
        them("I agree", "19:33", 1200, 600),
        mc("Kita gak perlu ngumumin ke semua orang", "19:34"),
        mc("Tapi kalau ada yang tanya, aku gak mau merasa malu", "19:34", 350),
        them("You should never feel ashamed of us", "19:35", 1300, 750),
        mc("Kamu juga jangan terlalu protektif", "19:35"),
        them("I'll try", "19:36", 1100, 550),
        mc("Try harder", "19:36"),
        them("Yes, ma'am", "19:37", 1100, 550),
        mc("Jangan mulai", "19:37"),
        them("One question", "19:38", 1200, 600),
        mc("Apa?", "19:38"),
        them("Kalau campaign-nya berhasil, kamu dapat hadiah apa?", "19:39", 1300, 850),
        mc("Belum kepikiran", "19:39"),
        them("May I ask for something?", "19:40", 1200, 700),
        mc("Balik lagi ke sini?", "19:40"),
        them("I want your time", "19:41", 1300, 650),
        mc("You already have it", "19:41"),
        them("Still my favorite gift", "19:42", 1200, 700),
        mc("Dinner besok?", "19:42"),
        them("Just the two of us?", "19:43", 1200, 650),
        mc("Just the two of us", "19:43"),
        them("Then it's a date", "19:44", 1200, 650)
      ]
    },

    dirga_story_epilogue: {
      threadId: "dirga",
      storyDate: "2026-12-19",
      active: false,
      steps: [
        mc("Udaah", "22:15"),
        them("Thank you for tonight", "22:16", 1200, 700),
        mc("Waktuku buat kamu", "22:16"),
        them("Finally", "22:17", 1200, 600),
        mc("Padahal dari kemarin-kemarin juga udah", "22:17"),
        them("I know", "22:18", 1100, 500),
        them("Tapi sekarang kamu memberikannya tanpa ragu", "22:18", 350, 750),
        mc("Jangan bikin aku malu sendiri", "22:19"),
        them("Too late", "22:19", 1100, 550),
        them("Happy birthday to me, apparently", "22:20", 350, 700),
        mc("Ulang tahun kamu udah lewat", "22:20"),
        them("The best gifts arrive late", "22:21", 1200, 650)
      ]
    }
  });

  config.chatScripts.dirga_midnight_reconciliation.onComplete = next(
    "singapore-pickup-opening",
    "dirga",
    "Morning. Kamu sudah siap?",
    "2026-12-08",
    "07:05",
    "dirga_singapore_pickup",
    {
      blockedViews: ["whatsapp", "thread", "phone"],
      calendarEvents: [
        { id: "singapore-briefing-8-dec", date: "2026-12-08", title: "Regional project briefing", time: "9:00 AM", color: "#0a84ff", type: "work" }
      ]
    }
  );

  config.storyChatMedia = (config.storyChatMedia || []).filter((media) => media.id !== "dirga-january-photo");
  if (!(config.photos || []).some((photo) => photo.id === "photo-24")) {
    config.photos.push({
      id: "photo-24",
      title: "19 December 2026",
      caption: "19 December 2026 · 8:42 PM",
      src: "assets/photos/gallery/dinner-17-second.jpg",
      albums: ["favorites"],
      availableAfter: "dirga_story_epilogue",
      availableAfterDate: "2026-12-19"
    });
  }
  if (!(config.xApp?.posts || []).some((post) => post.availableAfter === "dirga_story_epilogue")) {
    config.xApp.posts.unshift({
      time: "19 Dec",
      text: "ternyata ngasih waktu ke seseorang gak selalu berarti kehilangan waktu sendiri",
      replies: 0,
      reposts: 0,
      likes: 0,
      views: 1,
      availableAfter: "dirga_story_epilogue"
    });
  }
})();

(() => {
  const revisedEnding = window.__BREAK_ENDING__;
  if (!revisedEnding) return;
  window.STORY_CONFIG.chatScripts.dirga_story_resolution = revisedEnding.resolution;
  window.STORY_CONFIG.chatScripts.dirga_story_epilogue = revisedEnding.epilogue;
  delete window.__BREAK_ENDING__;
})();

(() => {
  const replacements = new Map([
    [
      "dia bilang with you i don't have to be impressive to be worth staying for\n\nGUE MAU NANGIS TAPI BESOK TETEP KERJA",
      "dia bilang sama gue dia gak perlu kelihatan hebat dulu supaya merasa cukup\n\nGUE MAU NANGIS TAPI BESOK TETEP KERJA"
    ],
    [
      "DIA BILANG YES I'M PURSUING YOU TERUS OTAK GUE RESMI BERHENTI",
      "DIA BILANG ‘YES, SAYA MEMANG LAGI DEKATIN KAMU’ TERUS OTAK GUE RESMI BERHENTI"
    ],
    [
      "dia udah di bawah kantor dan gue bahkan belum sempat pura-pura sibuk",
      "dia bilang jangan pergi terlalu jauh dan sekarang gue yang bingung harus sejauh apa"
    ],
    [
      "baru jam 8 pagi udah disuruh latihan manggil nama\n\nsantai banget ya hidup orang",
      "jam 9 pagi orangnya udah di bawah kontrakan. kalender gue kalah sama niat dia"
    ],
    [
      "ternyata ‘only to me’ bisa bikin orang mendadak lupa cara tidur",
      "ternyata ‘saya memang berharap kamu mikir begitu’ bisa bikin orang mendadak lupa cara tidur"
    ]
  ]);
  (window.STORY_CONFIG.xApp?.posts || []).forEach((post) => {
    if (replacements.has(post.text)) post.text = replacements.get(post.text);
  });
})();

/* Revisi dialog dan timeline konten 24 November. */
(() => {
  const config = window.STORY_CONFIG;
  if (!config) return;
  const mc = (text, time, waitBefore = 350) => ({ type: "mc", text, time, waitBefore });
  const them = (text, time, waitBefore = 1200, typingMs = 800) => ({ type: "them", text, time, waitBefore, typingMs });

  config.chatScripts.dirga_work_night.steps = [
    mc("Pak masih di kantor?", "20:58"),
    them("Unfortunately", "20:58"),
    mc("Masih lama?", "20:59"),
    them("Sekitar satu jam", "20:59"),
    them("Maybe two", "21:00", 350, 650),
    mc("Saya mau cek beberapa dokumen yang mungkin masih ada di Bapak", "21:00"),
    mc("Sekalian saya bawain kopi ya", "21:01"),
    mc("Janji yang kemarin", "21:01"),
    them("You don't have to", "21:02"),
    mc("But I want to", "21:02"),
    them("Saya bisa bantu cek dokumennya sekarang dan kirim ke kamu", "21:03"),
    mc("Saya mau temenin Bapak lembur", "21:03"),
    mc("Saya yang mau, Bapak nggak bisa nolak", "21:04"),
    them("...", "21:04", 900, 900),
    them("Okay then, just come to my office", "21:05"),
    them("You know where it is", "21:05", 350, 650),
    mc("OTW, Pak", "21:06")
  ];

  const personalSteps = config.chatScripts.dirga_after_work_personal.steps;
  personalSteps.find((step) => step.text === "Jangann, aku bisa beli sendiri kok").text = "Jangann, saya bisa beli sendiri kok";
  personalSteps.find((step) => step.text === "I know, but I want to").text = "Sure, but I want to";

  const morningSteps = config.chatScripts.dirga_morning_check.steps;
  morningSteps.find((step) => step.text === "Pas banget").type = "mc";
  morningSteps.find((step) => step.text === "Kontrakan cuma tiga lantai, Pak. Saya di lantai tiga ya").text = "Kontrakan cuma tiga lantai, Dirga. Saya di lantai tiga ya";

  config.chatScripts.dirga_singapore_evening_invite.steps.find((step) => step.text === "Itu kalimat orang mencurigakan").text = "Suspicious";
  config.chatScripts.dirga_office_return.steps.find((step) => step.text === "A carefully worded invitation").text = "Not for you";
  config.chatScripts.dirga_secret_distance.steps.find((step) => step.text === "Aku cuma takut satu kesalahan dari aku malah jadi beban buat kamu").text = "I’m just afraid that a single mistake on my part might end up becoming a burden for you";

  const seriousRumorSteps = config.chatScripts.dirga_serious_rumor.steps;
  seriousRumorSteps.find((step) => step.text === "I know that isn't true").text = "You know that isn't true";
  seriousRumorSteps.find((step) => step.text === "Kamu tahu, tapi mereka enggak").text = "Aku tahu tapi mereka enggak";
  config.chatScripts.adelina_final_review.steps.find((step) => step.text === "Tentu saja 😭").text = "😭";

  const removedResolutionLines = new Set([
    "One question",
    "Apa?",
    "Kalau campaign-nya berhasil, kamu dapat hadiah apa?",
    "Belum kepikiran"
  ]);
  config.chatScripts.dirga_story_resolution.steps = config.chatScripts.dirga_story_resolution.steps
    .filter((step) => !removedResolutionLines.has(step.text));
  config.chatScripts.dirga_break_request.steps = config.chatScripts.dirga_break_request.steps
    .filter((step) => step.text !== "Aku bahkan minta orang lain ikut review supaya keputusan akhirnya tetap objektif");

  config.chatScripts.dirga_singapore_coffee.steps = [
    mc("Kamu foto kopinya niat atau nggak sih?", "07:20"),
    them("Why? You like it?", "07:21"),
    mc("Diajarin siapa?", "07:21"),
    them("Otodidak", "07:21", 350, 650),
    mc("Jadi ini cara biar aku gak telat?", "07:22"),
    them("Preventive measure", "07:22"),
    mc("DIRGA 😁😁😁", "07:22"),
    mc("Makasih kopinya", "07:23"),
    them("You're welcome", "07:23"),
    them("Ten minutes?", "07:24", 350, 650),
    mc("Fifteen", "07:24"),
    them("Twelve. Final offer", "07:24"),
    mc("Deal", "07:25")
  ];

  const posts = config.xApp?.posts || [];
  const splitPost = (text, replacements) => {
    const index = posts.findIndex((post) => post.text === text);
    if (index < 0) return;
    const original = posts[index];
    posts.splice(index, 1, ...replacements.map((replacement, offset) => ({
      ...original,
      text: replacement,
      views: offset === 0 ? original.views : 1
    })));
  };

  splitPost(
    "aku belum jawab apa-apa tapi dia malah minta maaf karena takut bikin gue uncomfortable\n\nHOW AM I SUPPOSED TO BE NORMAL ABOUT THIS",
    [
      "gue belum jawab apa-apa tapi dia malah minta maaf karena takut bikin gue uncomfortable",
      "HOW AM I SUPPOSED TO BE NORMAL ABOUT THIS"
    ]
  );
  splitPost(
    "saya menawarkan diri untuk lembur\n\nvoluntary conscious no one forced me",
    [
      "Saya mau temenin Bapak lembur",
      "voluntary conscious no one forced me"
    ]
  );
  splitPost(
    "gue cuma mau kerja, pulang, mandi, tidur\nkenapa sekarang malah harus mikirin nada chat orang",
    [
      "gue cuma mau kerja, pulang, mandi, tidur",
      "kenapa sekarang malah harus mikirin nada chat orang"
    ]
  );

  config.xApp.posts = posts
    .filter((post) => post.text !== "orang normal nggak datang delapan menit lebih awal terus bilang itu bukan early")
    .map((post) => post.text === "being perceived by someone who remembers every tiny thing I said is actually terrifying\n\nvery inconvenient"
      ? { ...post, text: "being perceived by someone who remembers every tiny thing I said is actually terrifying" }
      : post);
})();
