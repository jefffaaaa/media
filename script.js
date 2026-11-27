/**
 * ===================================================================
 * EDUEST - SCRIPT UTAMA
 * Media Pembelajaran Interaktif Siswa SMK Fase E (Kelas X TJKT)
 * Mata Pelajaran: Informatika / Sistem Komputer
 * Fitur: Single Page Application (SPA), Dunia Petualangan 2D Top-Down,
 *        Sistem Nyawa Terbawa, Pembahasan Wajib, Panel Guru Lengkap
 * ===================================================================
 */

'use strict';

// ==========================================
// KONSTANTA ATURAN NYAWA (SISTEM NYAWA BARU)
// ==========================================
const NYAWA_AWAL = 3;
const NYAWA_RESET_GAME_OVER = 3;
const BONUS_NYAWA_NAIK_LEVEL = 3;

// ==========================================
// KUNCI STORAGE & DATA AWAL (DEFAULT)
// ==========================================
const STORAGE_KEYS = {
  LEADERBOARD: 'eduest_leaderboard',
  CONTENT: 'eduest_content_data',
  PIN: 'eduest_teacher_pin',
  SOUND: 'eduest_sound_enabled'
};

const DEFAULT_TEACHER_PIN = '1234';

// 6 Karakter Petualang dengan Atribut & Visual Berbeda
const CHARACTERS = [
  {
    id: 'robo',
    name: 'Robo-Byte',
    emoji: '🤖',
    color: '#3b82f6',
    accent: '#60a5fa',
    desc: 'Android cerdas spesialis pemrosesan data & arsitektur komputer.'
  },
  {
    id: 'fox',
    name: 'Cyber-Fox',
    emoji: '🦊',
    color: '#f97316',
    accent: '#fb923c',
    desc: 'Rubah lincah berkecepatan tinggi, ahli troubleshooting kilat.'
  },
  {
    id: 'mage',
    name: 'Code-Mage',
    emoji: '🧙‍♂️',
    color: '#4a8de8',
    accent: '#9cc4f5',
    desc: 'Penyihir algoritma digital, menguasai sistem operasi & logika.'
  },
  {
    id: 'cat',
    name: 'Pixel-Cat',
    emoji: '🐱',
    color: '#10b981',
    accent: '#34d399',
    desc: 'Kucing teliti pencari bug, ahli hardware & pengkabelan LAN.'
  },
  {
    id: 'astro',
    name: 'Astro-Tech',
    emoji: '🚀',
    color: '#06b6d4',
    accent: '#38bdf8',
    desc: 'Penjelajah komputasi awan, ahli protokol & infrastruktur server.'
  },
  {
    id: 'ninja',
    name: 'Neon-Ninja',
    emoji: '⚡',
    color: '#ef4444',
    accent: '#f87171',
    desc: 'Ninja keamanan jaringan, tangguh menghadapi serangan Boss.'
  }
];

// 5 Bab Materi Lengkap SMK Fase E TJKT
const DEFAULT_CHAPTERS = [
  {
    id: 1,
    title: "Bab 1: Pengertian & Konsep Dasar Hardware & Software",
    content: `Komputer merupakan suatu sistem elektronik yang dirancang untuk menerima data masukan (input), memprosesnya sesuai instruksi tersimpan (process), menyimpannya (storage), dan menghasilkan keluaran berupa informasi yang bermanfaat (output).

Agar sistem komputer dapat beroperasi, dibutuhkan tiga elemen utama:
- **Hardware (Perangkat Keras):** Komponen fisik komputer yang nyata, dapat dilihat, disentuh, dan dialiri arus listrik.
- **Software (Perangkat Lunak):** Kumpulan instruksi atau program digital tak berwujud fisik yang memberitahu hardware apa yang harus dikerjakan.
- **Brainware (Pengguna):** Manusia yang mengoperasikan, memprogram, atau mengelola sistem komputer.

**Perbedaan Pokok Hardware vs Software:**
- Hardware berwujud fisik keras (elektronika, silikon, logam, plastik), sedangkan software berbentuk kode biner digital (0 dan 1).
- Hardware rentan terhadap kerusakan fisik seperti panas berlebih (overheat), korsleting listrik, debu, atau benturan.
- Software rentan terhadap kesalahan logika (*bug* pemrograman), serangan malware/virus, atau korupsi file sistem.
- Hardware tidak berguna sama sekali tanpa software penggerak, begitu pun software tidak dapat berjalan tanpa adanya mesin hardware.`
  },
  {
    id: 2,
    title: "Bab 2: Klasifikasi & Jenis-Jenis Hardware Komputer",
    content: `Dalam bidang Teknik Jaringan Komputer dan Telekomunikasi (TJKT), pemahaman mendalam tentang jenis-jenis perangkat keras sangat krusial saat merakit komputer maupun membangun jaringan.

Hardware diklasifikasikan ke dalam 5 kategori fungsional:

1. **Input Device (Perangkat Masukan):**
Berfungsi memasukkan data dan perintah dari luar ke dalam memori komputer.
- **Keyboard & Mouse:** Pengendali masukan ketikan dan kursor grafis.
- **Scanner & Barcode Reader:** Mengonversi dokumen cetak atau kode baris menjadi sinyal digital.
- **Microphone & Webcam:** Menangkap gelombang suara dan citra video.

2. **Processing Device (Perangkat Pemroses):**
Otak komputasi yang mengeksekusi perhitungan aritmatika dan logika instruksi.
- **CPU (Central Processing Unit):** Terdiri dari ALU (Arithmetic Logic Unit) untuk kalkulasi matematika, CU (Control Unit) untuk pengatur lalu lintas data, dan Register untuk penyimpanan sementara berkecepatan tinggi.
- **Motherboard (Mainboard):** Papan sirkuit utama tempat seluruh komponen (CPU, RAM, GPU, Chipset) terpasang dan saling terhubung.
- **RAM (Random Access Memory):** Memori utama komputer yang bersifat *volatile* (data hilang saat listrik mati).
- **GPU (Graphics Processing Unit):** Kartu pengolah sinyal grafis visual untuk monitor.

3. **Storage Device (Perangkat Penyimpanan):**
Tempat menyimpan sistem operasi, aplikasi, dan file pengguna secara permanen (*non-volatile*).
- **SSD (Solid State Drive):** Memori berbasis chip flash NAND dengan kecepatan baca/tulis tinggi (NVMe PCIe atau SATA).
- **HDD (Hard Disk Drive):** Memori mekanik piringan magnetik berputar, ekonomis untuk kapasitas besar.
- **Flashdisk & MicroSD:** Media penyimpanan portabel berbasis port USB.

4. **Output Device (Perangkat Keluaran):**
Menampilkan atau mengeluarkan hasil pemrosesan data kepada pengguna.
- **Monitor:** Menampilkan visual grafis lewat port HDMI, DisplayPort, atau VGA.
- **Printer & Plotter:** Mencetak data digital ke lembaran kertas/media fisik.
- **Speaker & Headphone:** Mengubah sinyal audio digital menjadi gelombang getaran suara.

5. **Communication / Network Device (Perangkat Jaringan TJKT):**
- **NIC (Network Interface Card / LAN Card):** Pintu penghubung fisik komputer ke jaringan dengan kabel UTP (port RJ-45).
- **Switch & Router:** Pengatur lalu lintas paket data antar komputer dan menghubungkan ke jaringan internet.
- **Access Point (AP):** Pemancar gelombang radio sinyal WiFi nirkabel.`
  },
  {
    id: 3,
    title: "Bab 3: Klasifikasi & Jenis-Jenis Software Komputer",
    content: `Perangkat lunak (Software) adalah nyawa bagi perangkat keras. Berdasarkan fungsi dan peranannya dalam sistem, software dibagi menjadi:

1. **Sistem Operasi (Operating System / OS):**
Software lapisan dasar yang bertugas mengelola seluruh sumber daya hardware (CPU, memori, disk) dan menyediakan antarmuka bagi pengguna serta aplikasi.
- **Windows:** Sistem operasi populer ramah pengguna (GUI) dari Microsoft.
- **Linux (Ubuntu, Debian, CentOS, AlmaLinux):** Sistem operasi berbasis *open-source* yang menjadi standar industri server, keamanan jaringan, dan cloud bagi teknisi TJKT.
- **macOS:** Sistem operasi berbasis Unix eksklusif untuk komputer Apple.
- **Android:** Sistem operasi mobile berbasis kernel Linux.

2. **Utility Software (Program Utilitas):**
Program pendukung yang membantu memelihara, mengoptimalkan, dan mengamankan kinerja sistem operasi.
- **Antivirus & Firewall:** Mendeteksi dan menangkal serangan program jahat (Trojan, Ransomware, Worm).
- **File Compression (7-Zip, WinRAR):** Memampatkan ukuran arsip file data.
- **Disk Management / Defragmenter:** Mengatur partisi dan merapikan alokasi sektor data hard drive.
- **Backup & Recovery Tools:** Mencadangkan citra (*image*) sistem jika terjadi kerusakan fatal.

3. **Device Driver (Driver Perangkat):**
Software penerjemah khusus yang menjembatani komunikasi antara sistem operasi dengan perangkat keras spesifik.
- Contoh: Driver Kartu Grafis Nvidia/AMD, Driver Printer Epson, Driver Chipset Jaringan Realtek.
- Tanpa driver yang tepat, perangkat keras tidak akan dikenali atau tidak dapat berfungsi optimal oleh OS.

4. **Application Software (Software Aplikasi):**
Program yang dirancang khusus untuk membantu tugas spesifik pengguna akhir (*end-user*).
- **Web Browser:** Google Chrome, Mozilla Firefox, Microsoft Edge untuk berselancar di internet.
- **Office Suite:** Microsoft Office, LibreOffice untuk pengolahan dokumen, lembar kerja, dan presentasi.
- **Text Editor / IDE:** Visual Studio Code, Sublime Text untuk pembuatan kode program.

5. **Firmware:**
Software tingkat rendah yang tertanam permanen di dalam chip ROM/Flash motherboard, seperti **BIOS** (Basic Input/Output System) dan **UEFI** (Unified Extensible Firmware Interface) yang bertugas mengeksekusi POST saat komputer pertama kali dinyalakan.`
  },
  {
    id: 4,
    title: "Bab 4: Hubungan Sinergis Hardware & Software",
    content: `Hardware dan Software tidak dapat dipisahkan. Keduanya membentuk simbiosis mutualisme yang saling melengkapi.

**Analogi Kehidupan Nyata:**
- **Analogi Tubuh dan Jiwa/Pikiran:**
  Hardware adalah tubuh fisik manusia (mata, tangan, kaki, otak fisik), sedangkan software adalah pikiran, memori, dan jiwa yang menggerakkan tubuh tersebut. Tubuh tanpa pikiran hanyalah benda mati, dan pikiran tanpa tubuh tidak bisa mewujudkan tindakan nyata.
- **Analogi Pemutar Musik dan Lagu:**
  Hardware adalah pemutar MP3 dan headphone fisik, sedangkan software adalah file rekaman musik digital.

**Siklus Pemrosesan Informasi (Information Processing Cycle):**
1. **Input:** Pengguna menekan tombol keyboard (sinyal elektrik hardware).
2. **Process:** Sistem operasi dan CPU menerjemahkan kode biner ASCII/Unicode instruksi tersebut.
3. **Storage:** Data karakter disimpan di RAM sebelum ditulis ke SSD/HDD.
4. **Output:** Kartu grafis mengirimkan sinyal piksel ke layar monitor untuk menampilkan karakter huruf.

**Proses Booting (Koneksi Hardware dan Firmware):**
Saat tombol power ditekan:
- Power Supply menyalurkan daya listrik stabil ke seluruh motherboard.
- Firmware UEFI/BIOS menjalankan **POST (Power-On Self Test)** untuk memeriksa kondisi RAM, CPU, dan GPU.
- Jika lolos uji POST (biasanya ditandai bunyi beep pendek 1 kali), BIOS mencari **Bootloader** di SSD/HDD dan memuat kernel Sistem Operasi ke dalam RAM.

**Troubleshooting Dasar TJKT:**
- Jika komputer menyala, lampu indikator hidup, kipas berputar kencang namun layar monitor blank hitam: periksa hardware (pemasangan RAM kotor, slot PCIe GPU, atau kabel monitor).
- Jika komputer mendadak mengalami *Blue Screen of Death (BSOD)*: umumnya disebabkan oleh tabrakan driver software yang tidak kompatibel atau bad sector memori RAM.`
  },
  {
    id: 5,
    title: "Bab 5: Rangkuman & Tips Menghadapi Boss Challenge",
    content: `Selamat! Kamu telah mempelajari seluruh pondasi dasar Hardware dan Software sistem komputer Fase E TJKT.

**Rangkuman Inti Materi:**
- **Hardware:** Bersifat fisik (Input, Processing, Storage, Output, Communication).
- **Software:** Bersifat instruksi digital (OS, Utility, Driver, Aplikasi, Firmware).
- **Firmware (BIOS/UEFI):** Software pertama yang dijalankan hardware saat proses booting dan uji kelayakan komponen (POST).
- **Analogi Sistem:** Hardware adalah panggung dan alat musik, software adalah partitur lagu dan konduktornya.

**Tips Strategi Mengalahkan BOSS CHALLENGE di Zona 5:**
1. **Perhatikan Timer Soal:** Level 5 memiliki batas waktu 20 detik per soal. Jangan terburu-buru asal klik, namun jangan melamun terlalu lama!
2. **Kunci Kata Kunci Pertanyaan:** Cermati kata penentu seperti *"Kecuali"*, *"Yang bukan termasuk"*, *"Fungsi utama"*, atau *"Bersifat volatile"*.
3. **Jaga Nyawa Kamu:** Nyawa yang kamu miliki dari zona sebelumnya akan dibawa ke Boss Challenge. Jawaban salah akan mengurangi 1 hati.
4. **Raih Predikat PERFECT:** Jika kamu menjawab seluruh soal tanpa satu pun kesalahan, kamu akan mendapatkan bonus poin +200 dan pemulihan 3 nyawa penuh!

Buktikan kemampuanmu dan jadilah Master Komputer TJKT sejati!`
  }
];

// Nama Baku Setiap Level (1-5) Tanpa Label "(Tanpa Timer)"
const NAMA_LEVEL = {
  1: "Level 1 - Pengenalan Dasar",
  2: "Level 2 - Ragam Hardware",
  3: "Level 3 - Ragam Software",
  4: "Level 4 - Tantangan Waktu (Speed Round)",
  5: "Level 5 - 🔥 BOSS CHALLENGE"
};

// Single Source of Truth Pengaturan Timer Soal
function getWaktuSoal(soal, levelNum) {
  if (!soal) return 0;
  const mode = soal.timerMode || 'level';
  if (mode === 'none') return 0;
  if (mode === 'custom') {
    const sec = parseInt(soal.timerCustomSec);
    return (!isNaN(sec) && sec > 0) ? sec : 0;
  }
  const lvl = levelNum || soal.level || 1;
  const cfg = (typeof state !== 'undefined' && state && state.content && state.content.levelConfigs) 
    ? state.content.levelConfigs[lvl] 
    : DEFAULT_LEVEL_CONFIGS[lvl];
  return (cfg && cfg.timerSec) ? parseInt(cfg.timerSec) : 0;
}

// Konfigurasi Level Default (Level 1-5)
const DEFAULT_LEVEL_CONFIGS = {
  1: { targetQuestions: 5, timerSec: 0, title: NAMA_LEVEL[1], icon: "🌱" },
  2: { targetQuestions: 5, timerSec: 0, title: NAMA_LEVEL[2], icon: "⚙️" },
  3: { targetQuestions: 5, timerSec: 0, title: NAMA_LEVEL[3], icon: "💻" },
  4: { targetQuestions: 5, timerSec: 15, title: NAMA_LEVEL[4], icon: "⚡" },
  5: { targetQuestions: 8, timerSec: 20, title: NAMA_LEVEL[5], icon: "👑" }
};

// Bank Soal Default (Minimal 5 soal per level, Level 5 minimal 8-10 soal)
const DEFAULT_QUESTIONS = [
  // --- LEVEL 1 (Pondasi Dasar) ---
  {
    id: 101,
    level: 1,
    pertanyaan: "Apakah definisi yang paling tepat mengenai Perangkat Keras (Hardware) pada komputer?",
    gambar: "",
    opsi: [
      "Bagian fisik komputer yang dapat dilihat, disentuh, dan dialiri arus listrik",
      "Kumpulan instruksi digital tak berwujud untuk mengolah gambar",
      "Pengguna yang bertugas merakit dan memperbaiki komputer",
      "Kabel jaringan nirkabel penghubung internet"
    ],
    kunci: 0,
    pembahasan: "Hardware adalah komponen fisik nyata dari komputer yang berwujud keras, dapat disentuh secara langsung, dan membutuhkan aliran daya listrik untuk beroperasi."
  },
  {
    id: 102,
    level: 1,
    pertanyaan: "Komponen komputer yang berfungsi memberikan instruksi dan mengatur kerja hardware secara digital disebut...",
    gambar: "",
    opsi: [
      "Hardware (Perangkat Keras)",
      "Software (Perangkat Lunak)",
      "Brainware (Pengguna Komputer)",
      "Firmware Box"
    ],
    kunci: 1,
    pembahasan: "Software (Perangkat Lunak) adalah program atau sekumpulan instruksi digital yang memberi perintah kepada hardware mengenai apa yang harus dikerjakan."
  },
  {
    id: 103,
    level: 1,
    pertanyaan: "Tiga elemen utama yang wajib ada agar suatu sistem komputer dapat bekerja secara utuh adalah...",
    gambar: "",
    opsi: [
      "CPU, GPU, dan Monitor",
      "Windows, Linux, dan macOS",
      "Hardware, Software, dan Brainware",
      "Keyboard, Mouse, dan Printer"
    ],
    kunci: 2,
    pembahasan: "Sistem komputer membutuhkan Hardware (perangkat fisik), Software (program penggerak), dan Brainware (manusia sebagai pengoperasi) agar dapat berfungsi optimal."
  },
  {
    id: 104,
    level: 1,
    pertanyaan: "Manakah di bawah ini yang merupakan perbedaan utama antara Hardware dan Software?",
    gambar: "",
    opsi: [
      "Hardware berbentuk digital biner, Software berbentuk sirkuit tembaga",
      "Hardware dapat disentuh secara fisik, sedangkan Software tidak berwujud fisik",
      "Hardware tidak memerlukan listrik, sedangkan Software memerlukan baterai",
      "Hardware dibuat oleh programmer, Software dibuat oleh teknisi pabrik"
    ],
    kunci: 1,
    pembahasan: "Hardware memiliki wujud fisik (tangible) yang bisa disentuh, sedangkan software berwujud data digital tak berwujud fisik (intangible)."
  },
  {
    id: 105,
    level: 1,
    pertanyaan: "Jika sebuah komputer memiliki spesifikasi hardware canggih namun tidak terinstal software sama sekali, apa yang akan terjadi?",
    gambar: "",
    opsi: [
      "Komputer tetap dapat menjalankan game dengan lancar",
      "Komputer otomatis membuat aplikasi sendiri",
      "Komputer menyala tetapi tidak dapat digunakan menjalankan fungsi apapun",
      "Komputer langsung terhubung ke internet nirkabel"
    ],
    kunci: 2,
    pembahasan: "Tanpa software (terutama sistem operasi), hardware hanyalah tumpukan komponen elektronik pasif yang tidak memiliki instruksi kerja."
  },
  {
    id: 106,
    level: 1,
    pertanyaan: "Kerusakan yang paling umum terjadi pada Hardware akibat panas berlebih (overheat) adalah...",
    gambar: "",
    opsi: [
      "Kompilasi kode program menjadi salah ketik",
      "Komponen fisik meleleh atau terbakar dan mati mendadak",
      "File dokumen teks otomatis terhapus dari cloud",
      "Sistem operasi otomatis berubah menjadi Linux"
    ],
    kunci: 1,
    pembahasan: "Hardware rentan terhadap kerusakan fisik termal (panas tinggi), yang dapat memicu thermal throttling atau bahkan kerusakan permanen pada silikon chip CPU/GPU."
  },

  // --- LEVEL 2 (Ragam Hardware) ---
  {
    id: 201,
    level: 2,
    pertanyaan: "Di bawah ini yang seluruhnya tergolong sebagai Input Device (Perangkat Masukan) adalah...",
    gambar: "",
    opsi: [
      "Monitor, Speaker, dan Printer",
      "Keyboard, Barcode Scanner, dan Microphone",
      "CPU, RAM, dan Harddisk",
      "SSD, Flashdisk, dan Router"
    ],
    kunci: 1,
    pembahasan: "Keyboard, barcode scanner, dan microphone semuanya berfungsi memasukkan data luar (teks, kode optik, suara) ke dalam sistem komputer."
  },
  {
    id: 202,
    level: 2,
    pertanyaan: "Bagian dari CPU yang bertugas melakukan perhitungan matematika (+, -, x, /) dan operasi perbandingan logika adalah...",
    gambar: "",
    opsi: [
      "CU (Control Unit)",
      "ALU (Arithmetic Logic Unit)",
      "Register Cache",
      "Power Supply Unit"
    ],
    kunci: 1,
    pembahasan: "ALU (Arithmetic Logic Unit) adalah subsistem CPU yang secara khusus mengeksekusi kalkulasi aritmatika dan logika perbandingan."
  },
  {
    id: 203,
    level: 2,
    pertanyaan: "Sifat memori RAM yang menyebabkan seluruh data di dalamnya lenyap saat aliran daya listrik terputus disebut...",
    gambar: "",
    opsi: [
      "Non-Volatile",
      "Volatile",
      "Flash Memory",
      "Read Only"
    ],
    kunci: 1,
    pembahasan: "RAM bersifat Volatile, artinya data yang tersimpan di dalamnya membutuhkan pasokan listrik konstan. Jika listrik mati, isi memori RAM langsung terhapus."
  },
  {
    id: 204,
    level: 2,
    pertanyaan: "Sebagai calon teknisi TJKT, perangkat keras yang bertugas sebagai kartu penghubung fisik komputer ke kabel jaringan LAN adalah...",
    gambar: "",
    opsi: [
      "Sound Card",
      "NIC (Network Interface Card)",
      "Capture Card",
      "VGA Card"
    ],
    kunci: 1,
    pembahasan: "NIC (Network Interface Card / LAN Card) menyediakan port RJ-45 fisik untuk menghubungkan komputer ke jaringan komputer lokal (LAN)."
  },
  {
    id: 205,
    level: 2,
    pertanyaan: "Mengapa media penyimpanan jenis SSD (Solid State Drive) jauh lebih cepat dibandingkan HDD konvensional?",
    gambar: "",
    opsi: [
      "Karena SSD menggunakan piringan cakram magnetik berputar sangat cepat",
      "Karena SSD menggunakan chip flash memori semikonduktor tanpa bagian mekanik yang bergerak",
      "Karena SSD hanya dapat menyimpan data bertipe teks",
      "Karena SSD selalu terhubung ke jaringan kabel fiber optik"
    ],
    kunci: 1,
    pembahasan: "SSD tidak memiliki komponen mekanis yang berputar, melainkan menggunakan sel memori flash elektronik sehingga proses baca/tulis data terjadi nyaris instan."
  },
  {
    id: 206,
    level: 2,
    pertanyaan: "Papan sirkuit utama tempat melekatnya prosesor, slot RAM, slot ekspansi PCIe, dan jalur komunikasi bus disebut...",
    gambar: "",
    opsi: [
      "Chassis Casing",
      "Motherboard (Mainboard)",
      "Heatsink Fan",
      "Power Supply Unit (PSU)"
    ],
    kunci: 1,
    pembahasan: "Motherboard adalah papan sirkuit induk yang mengintegrasikan dan menghubungkan seluruh komponen internal komputer."
  },
  {
    id: 207,
    level: 2,
    pertanyaan: "Perangkat keras di bawah ini yang berfungsi memancarkan sinyal gelombang radio nirkabel (Wi-Fi) ke perangkat pengguna adalah...",
    gambar: "",
    opsi: [
      "Access Point (AP)",
      "Unmanaged Switch",
      "Patch Panel",
      "Crimping Tool"
    ],
    kunci: 0,
    pembahasan: "Access Point (AP) bertindak sebagai pemancar dan penerima sinyal nirkabel (Wireless Fidelity) yang memungkinkan gadget terhubung ke jaringan LAN."
  },

  // --- LEVEL 3 (Ragam Software) ---
  {
    id: 301,
    level: 3,
    pertanyaan: "Software lapisan dasar yang berfungsi mengelola seluruh sumber daya hardware dan menjadi jembatan bagi aplikasi disebut...",
    gambar: "",
    opsi: [
      "Operating System (Sistem Operasi)",
      "Software Aplikasi Grafis",
      "Utility Defragmenter",
      "Compiler Bahasa C"
    ],
    kunci: 0,
    pembahasan: "Sistem Operasi (OS) bertindak sebagai pengelola sumber daya perangkat keras (CPU, RAM, storage) dan platform bagi aplikasi lain untuk berjalan."
  },
  {
    id: 302,
    level: 3,
    pertanyaan: "Distribusi sistem operasi berbasis kernel Linux yang sangat populer digunakan untuk server jaringan di bidang TJKT karena kestabilannya adalah...",
    gambar: "",
    opsi: [
      "Debian & Ubuntu Server",
      "Adobe Photoshop",
      "Microsoft PowerPoint",
      "WinRAR Archive"
    ],
    kunci: 0,
    pembahasan: "Debian dan Ubuntu Server adalah sistem operasi berbasis Linux open-source yang menjadi standar industri server dan jaringan bagi teknisi TJKT."
  },
  {
    id: 303,
    level: 3,
    pertanyaan: "Software penerjemah khusus yang menjembatani komunikasi antara sistem operasi dengan perangkat keras tertentu (misal GPU atau printer) disebut...",
    gambar: "",
    opsi: [
      "Device Driver",
      "Web Browser",
      "Database Engine",
      "Antivirus Signature"
    ],
    kunci: 0,
    pembahasan: "Device Driver adalah software perantara yang menerjemahkan instruksi umum sistem operasi menjadi sinyal spesifik yang dipahami perangkat keras bersangkutan."
  },
  {
    id: 304,
    level: 3,
    pertanyaan: "Di bawah ini yang merupakan contoh software kategori Utility (Utilitas) adalah...",
    gambar: "",
    opsi: [
      "Microsoft Windows 11",
      "7-Zip dan Antivirus Windows Defender",
      "Google Chrome",
      "VLC Media Player"
    ],
    kunci: 1,
    pembahasan: "7-Zip (kompresi file) dan Windows Defender (antivirus) tergolong Utility Software karena berfungsi membantu merawat, mengamankan, dan mengoptimalkan sistem."
  },
  {
    id: 305,
    level: 3,
    pertanyaan: "Software tingkat rendah (firmware) yang tertanam permanen di motherboard untuk inisialisasi awal hardware saat booting disebut...",
    gambar: "",
    opsi: [
      "BIOS / UEFI",
      "Linux Kernel",
      "Microsoft Office",
      "DirectX 12"
    ],
    kunci: 0,
    pembahasan: "BIOS (Basic Input/Output System) dan UEFI adalah firmware tertanam yang bertugas menginisialisasi hardware saat pertama kali komputer dinyalakan."
  },
  {
    id: 306,
    level: 3,
    pertanyaan: "Manakah di bawah ini yang tergolong sebagai Software Aplikasi (Application Software)?",
    gambar: "",
    opsi: [
      "Driver Kartu Suara Realtek",
      "Visual Studio Code & Web Browser Firefox",
      "Firmware Chipset Intel",
      "Kernel macOS"
    ],
    kunci: 1,
    pembahasan: "VS Code dan Firefox adalah software aplikasi yang dibuat untuk membantu pengguna akhir mengerjakan tugas tertentu (coding dan browsing)."
  },
  {
    id: 307,
    level: 3,
    pertanyaan: "Salah satu kelebihan utama dari sistem operasi Open-Source seperti Linux dibandingkan sistem operasi Proprietary adalah...",
    gambar: "",
    opsi: [
      "Kode sumbernya dapat dilihat, dimodifikasi, dan didistribusikan secara bebas",
      "Pasti tidak memerlukan memori RAM untuk berjalan",
      "Hanya bisa dipasang di komputer rakitan merek tertentu",
      "Tidak bisa terkena debu fisik hardware"
    ],
    kunci: 0,
    pembahasan: "Open-source berarti kode sumbernya terbuka untuk dipelajari, disesuaikan, dan dikembangkan bersama komunitas global tanpa lisensi berbayar yang mengekang."
  },

  // --- LEVEL 4 (Speed Round - Hubungan Hardware & Software) ---
  {
    id: 401,
    level: 4,
    pertanyaan: "Dalam analogi kehidupan sehari-hari, jika komputer diibaratkan tubuh manusia, maka peran Software paling tepat dianalogikan sebagai...",
    gambar: "",
    opsi: [
      "Pakaian dan sepatu yang dikenakan",
      "Jiwa, pikiran, dan kesadaran yang menggerakkan tubuh",
      "Gelas air minum di atas meja",
      "Lantai tempat manusia berpijak"
    ],
    kunci: 1,
    pembahasan: "Hardware adalah fisik tubuh (mata, tangan, otak fisik), sedangkan software adalah pikiran dan kesadaran yang memberi instruksi bagaimana tubuh bergerak."
  },
  {
    id: 402,
    level: 4,
    pertanyaan: "Proses diagnostik otomatis yang dijalankan BIOS/UEFI saat menyalakan komputer untuk memastikan kondisi hardware prima disebut...",
    gambar: "",
    opsi: [
      "POST (Power-On Self Test)",
      "DNS Lookup",
      "Disk Defragmentation",
      "Data Encryption"
    ],
    kunci: 0,
    pembahasan: "POST (Power-On Self Test) adalah rutinitas firmware untuk memeriksa apakah CPU, RAM, GPU, dan keyboard berfungsi normal sebelum OS dimuat."
  },
  {
    id: 403,
    level: 4,
    pertanyaan: "Urutan 4 tahap dalam Siklus Pemrosesan Informasi (Information Processing Cycle) yang benar adalah...",
    gambar: "",
    opsi: [
      "Output -> Input -> Storage -> Process",
      "Input -> Process -> Storage -> Output",
      "Input -> Storage -> Input -> Output",
      "Process -> Output -> Input -> Storage"
    ],
    kunci: 1,
    pembahasan: "Siklus pengolahan data standar komputer: Data dimasukkan (Input), diolah oleh CPU (Process), disimpan ke disk (Storage), dan disajikan (Output)."
  },
  {
    id: 404,
    level: 4,
    pertanyaan: "Jika printer baru tidak bisa mencetak meski kabel USB sudah terpasang kencang ke komputer, kemungkinan besar penyebab software-nya adalah...",
    gambar: "",
    opsi: [
      "Driver printer belum diinstal atau korup di sistem operasi",
      "Kertas di printer terlalu tipis",
      "Monitor belum dinyalakan",
      "Kabel listrik PLN mati"
    ],
    kunci: 0,
    pembahasan: "Perangkat keras eksternal seperti printer membutuhkan device driver agar sistem operasi dapat mengirimkan perintah cetak dengan bahasa printer tersebut."
  },
  {
    id: 405,
    level: 4,
    pertanyaan: "Pesan kesalahan layar biru fatal di Windows (Blue Screen of Death / BSOD) umumnya disebabkan oleh masalah...",
    gambar: "",
    opsi: [
      "Kabel mouse optik tertekuk sedikit",
      "Konflik driver tingkat rendah atau kerusakan fisik memori RAM",
      "Mengganti wallpaper desktop",
      "Volume speaker terlalu keras"
    ],
    kunci: 1,
    pembahasan: "BSOD terjadi ketika ada kesalahan kernel kritis, paling sering dipicu driver yang tidak stabil (software crash) atau sektor RAM yang cacat (hardware fault)."
  },
  {
    id: 406,
    level: 4,
    pertanyaan: "Apa yang dilakukan sistem operasi saat proses 'Booting' berlangsung?",
    gambar: "",
    opsi: [
      "Menghapus seluruh file data pengguna dari harddisk",
      "Memuat kernel sistem operasi dari penyimpanan permanen (SSD/HDD) ke RAM",
      "Mematikan kipas pendingin CPU agar sunyi",
      "Memformat ulang partisi jaringan"
    ],
    kunci: 1,
    pembahasan: "Booting adalah proses menyalin dan menginisialisasi kernel OS dari storage sekunder (SSD/HDD) ke memori utama (RAM) agar siap menerima perintah user."
  },
  {
    id: 407,
    level: 4,
    pertanyaan: "Sebuah program kompresi file (seperti 7-Zip) memperkecil ukuran file digital. Dalam kasus ini, 7-Zip berinteraksi langsung menghemat kapasitas...",
    gambar: "",
    opsi: [
      "Storage Device (Penyimpanan)",
      "Output Monitor",
      "Port HDMI",
      "Webcam Sensor"
    ],
    kunci: 0,
    pembahasan: "Software utilitas kompresi file memangkas redundansi bit sehingga menghemat ruang pada perangkat penyimpanan (Storage Device) seperti SSD atau harddisk."
  },

  // --- LEVEL 5 (BOSS CHALLENGE - Campuran Komprehensif Seluruh Materi) ---
  {
    id: 501,
    level: 5,
    pertanyaan: "[BOSS 1] Manakah pernyataan yang paling tepat mengenai hubungan sinergis antara Firmware UEFI/BIOS dan Sistem Operasi?",
    gambar: "",
    opsi: [
      "UEFI hanya bekerja saat internet aktif, sedangkan OS bekerja saat offline",
      "UEFI bertindak sebagai firmware awal penguji hardware yang kemudian menyerahkan kendali ke Bootloader OS",
      "OS menghapus UEFI dari motherboard begitu Windows selesai diinstal",
      "UEFI adalah aplikasi pengolah kata di dalam sistem operasi"
    ],
    kunci: 1,
    pembahasan: "UEFI menginisialisasi perangkat keras saat daya pertama kali mengalir, lalu memanggil bootloader untuk menyerahkan kendali sistem ke Sistem Operasi."
  },
  {
    id: 502,
    level: 5,
    pertanyaan: "[BOSS 2] Seorang teknisi TJKT merakit server. Komputer menyala, kipas berputar, tetapi speaker internal mengeluarkan bunyi BEEP panjang berulang dan layar mati. Diagnosa hardware yang paling tepat adalah...",
    gambar: "",
    opsi: [
      "Modul memori RAM belum terpasang sempurna atau kotor pada pin konektornya",
      "Aplikasi browser Firefox belum diperbarui",
      "Kabel mouse optik putus di dalam",
      "File presentasi PowerPoint mengalami bug"
    ],
    kunci: 0,
    pembahasan: "Kode beep berulang dari BIOS saat uji POST merupakan indikator standar kegagalan inisialisasi memori RAM (tidak terdeteksi, kendor, atau rusak)."
  },
  {
    id: 503,
    level: 5,
    pertanyaan: "[BOSS 3] Mengapa komputer membutuhkan penyimpanan Sekunder (seperti SSD/HDD) jika sudah memiliki RAM?",
    gambar: "",
    opsi: [
      "Karena RAM tidak bisa membaca file gambar",
      "Karena RAM bersifat Volatile (hilang saat listrik padam), sedangkan SSD bersifat Non-Volatile (permanen)",
      "Karena SSD lebih murah daripada casing komputer",
      "Karena CPU menolak berkomunikasi dengan RAM"
    ],
    kunci: 1,
    pembahasan: "RAM sangat cepat namun bersifat sementara (volatile). Komputer mutlak memerlukan penyimpanan non-volatile (SSD/HDD) agar file dan sistem operasi tetap tersimpan selamanya."
  },
  {
    id: 504,
    level: 5,
    pertanyaan: "[BOSS 4] Di bidang TJKT, perangkat keras jaringan yang bekerja pada Layer 2 OSI untuk meneruskan frame data berdasarkan alamat MAC Address ke port tujuan spesifik adalah...",
    gambar: "",
    opsi: [
      "Switch",
      "Hub Pasif",
      "Kabel Coaxial",
      "Power Inverter"
    ],
    kunci: 0,
    pembahasan: "Switch adalah hardware jaringan pintar yang membaca MAC Address komputer tujuan untuk meneruskan paket data hanya ke port yang tepat, bukan broadcast membabi-buta seperti Hub."
  },
  {
    id: 505,
    level: 5,
    pertanyaan: "[BOSS 5] Manakah pasangan antara Perangkat Keras dan Perangkat Lunak yang menggambarkan hubungan fungsi yang benar?",
    gambar: "",
    opsi: [
      "Kartu Jaringan (NIC) & Driver LAN Controller",
      "Monitor LCD & Antivirus Scanner",
      "Kabel Power Listrik & Sistem Operasi Linux",
      "Heatsink Fan & Web Browser Chrome"
    ],
    kunci: 0,
    pembahasan: "NIC adalah komponen perangkat keras fisik, dan Driver LAN Controller adalah perangkat lunak pengemudinya agar NIC dapat berkomunikasi dengan sistem operasi."
  },
  {
    id: 506,
    level: 5,
    pertanyaan: "[BOSS 6] Jika sebuah sistem komputer mengalami kelambatan ekstrem saat membuka banyak aplikasi sekaligus (multitasking), tindakan upgrade hardware yang paling berdampak langsung adalah...",
    gambar: "",
    opsi: [
      "Menambah kapasitas memori RAM",
      "Mengganti keyboard dengan lampu RGB",
      "Mengganti kabel monitor HDMI ke VGA",
      "Membeli mouse pad yang lebih lebar"
    ],
    kunci: 0,
    pembahasan: "Saat multitasking, seluruh aplikasi aktif memakan alokasi ruang di RAM. Menambah RAM mencegah sistem melakukan paging berat (thrashing) ke virtual memory storage."
  },
  {
    id: 507,
    level: 5,
    pertanyaan: "[BOSS 7] Mengapa sistem operasi Linux menjadi pilihan utama bagi administrator jaringan dan server di dunia industri TJKT?",
    gambar: "",
    opsi: [
      "Karena Linux memiliki performa stabil, konsumsi resource hemat, keamanan tinggi, dan berbasis open-source",
      "Karena Linux tidak dapat diinstal di komputer berbahan plastik",
      "Karena Linux hanya dapat menampilkan warna hitam putih",
      "Karena Linux otomatis menghapus semua virus hardware"
    ],
    kunci: 0,
    pembahasan: "Linux terkenal sangat stabil (bisa menyala bertahun-tahun tanpa restart), efisien, aman, dan lisensinya open-source sehingga ideal untuk tulang punggung server dunia."
  },
  {
    id: 508,
    level: 5,
    pertanyaan: "[BOSS 8] Manakah kesimpulan akhir yang paling tepat mengenai hakikat Sistem Komputer?",
    gambar: "",
    opsi: [
      "Hardware adalah yang terpenting, software dan brainware tidak begitu dibutuhkan",
      "Hardware, Software, dan Brainware adalah satu kesatuan terintegrasi yang saling melengkapi dan tidak dapat dipisahkan",
      "Komputer masa depan tidak lagi membutuhkan aliran listrik atau perangkat keras",
      "Software dapat berjalan sendiri di udara tanpa bantuan komponen silikon"
    ],
    kunci: 1,
    pembahasan: "Sistem komputer adalah sinergi tritunggal: Hardware sebagai wadah fisik, Software sebagai instruksi pengendali, dan Brainware sebagai pengendali tujuan."
  },
  {
    id: 509,
    level: 5,
    pertanyaan: "[BOSS BONUS 1] Komponen CPU yang bertindak layaknya polisi lalu lintas yang mengatur urutan instruksi dan sinkronisasi sinyal clock adalah...",
    gambar: "",
    opsi: [
      "CU (Control Unit)",
      "ALU (Arithmetic Logic Unit)",
      "SATA Controller",
      "GPU VRAM"
    ],
    kunci: 0,
    pembahasan: "CU (Control Unit) mengatur dan mengendalikan semua lalu lintas perintah, membaca kode instruksi, dan mengoordinasikan seluruh unit di dalam processor."
  },
  {
    id: 510,
    level: 5,
    pertanyaan: "[BOSS BONUS 2] Manakah di bawah ini yang merupakan tindakan perawatan preventif software pada komputer Windows agar tetap prima?",
    gambar: "",
    opsi: [
      "Rutin melakukan update patch keamanan, scanning antivirus, dan membersihkan file temporary",
      "Menyemprotkan air sabun ke soket prosesor",
      "Membuka baut casing setiap 3 jam sekali",
      "Menghapus folder System32"
    ],
    kunci: 0,
    pembahasan: "Pemeliharaan software rutin meliputi pembaruan sistem operasi (security patches), pengecekan malware, dan pembersihan file sampah (cache/temporary)."
  }
];

// ==========================================
// KELAS AUDIO SYNTHESIZER (WEB AUDIO API)
// Bekerja 100% offline tanpa file eksternal
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem(STORAGE_KEYS.SOUND) === 'false';
    this.lastStepTime = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem(STORAGE_KEYS.SOUND, (!this.muted).toString());
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.15, gainValue = 0.15) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  click() {
    this.playTone(600, 'sine', 0.05, 0.08);
  }

  interact() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    this.playTone(523.25, 'triangle', 0.08, 0.15);
    setTimeout(() => {
      this.playTone(659.25, 'triangle', 0.12, 0.15);
    }, 60);
  }

  step() {
    if (this.muted) return;
    const now = Date.now();
    if (now - this.lastStepTime < 280) return;
    this.lastStepTime = now;
    this.playTone(180, 'sine', 0.03, 0.03);
  }

  gateOpen() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 'triangle', 0.2, 0.2);
      }, i * 90);
    });
  }

  correct() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 'triangle', 0.18, 0.2);
      }, i * 70);
    });
  }

  wrong() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    this.playTone(320, 'sawtooth', 0.22, 0.2);
    setTimeout(() => {
      this.playTone(210, 'sawtooth', 0.35, 0.25);
    }, 120);
  }

  heartLost() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    this.playTone(180, 'square', 0.25, 0.2);
  }

  perfect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const fanfare = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.12 },
      { f: 1046.50, d: 0.4 }
    ];
    let offset = 0;
    fanfare.forEach((n) => {
      setTimeout(() => {
        this.playTone(n.f, 'triangle', n.d, 0.25);
      }, offset);
      offset += n.d * 1000 + 40;
    });
  }

  gameOver() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const notes = [440, 415.3, 392, 349.2];
    notes.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 'sine', 0.35, 0.2);
      }, i * 160);
    });
  }

  tick() {
    this.playTone(880, 'sine', 0.04, 0.08);
  }
}

const sound = new SoundFX();

// ==========================================
// KELAS CANVAS CONFETTI (TANPA DEPENDENCY)
// ==========================================
class ConfettiEffect {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animationId = null;
    this.colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#4a8de8', '#ec4899', '#06b6d4'];

    this.resize = this.resize.bind(this);
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 90) {
    if (!this.canvas || !this.ctx) return;
    this.resize();
    this.particles = [];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height * 0.4 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 16,
        vy: Math.random() * -14 - 4,
        size: Math.random() * 8 + 6,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.animate();
  }

  animate() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let activeParticles = 0;
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.rotation += p.vRot;
      p.opacity -= 0.007;

      if (p.opacity > 0 && p.y < this.canvas.height) {
        activeParticles++;
        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        this.ctx.restore();
      }
    }

    if (activeParticles > 0) {
      this.animationId = requestAnimationFrame(this.animate.bind(this));
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.animationId = null;
    }
  }
}

const confetti = new ConfettiEffect('confetti-canvas');

// ==========================================
// STATE APLIKASI (GAME & DATA MANAGER)
// ==========================================
class AppState {
  constructor() {
    this.student = null;
    this.content = null;
    this.leaderboard = [];
    this.activeChapterId = 1;

    this.loadContent();
    this.loadStudent();
    this.loadLeaderboard();
  }

  // --- KONTEN (MATERI, SOAL, GAMBAR & PENGATURAN GAMEPLAY) ---
  loadContent() {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTENT);
    if (raw) {
      try {
        this.content = JSON.parse(raw);
        if (!this.content.gameplaySettings) {
          this.content.gameplaySettings = {
            questionOrder: 'free',     // 'free' (bebas) atau 'sequential' (berurutan)
            obstacles: 'enabled'       // 'enabled' (aktif) atau 'disabled' (nonaktif)
          };
        }
        if (!Array.isArray(this.content.gambar)) {
          this.content.gambar = [];
        }
      } catch (e) {
        this.content = this.getDefaultContent();
        this.saveContent();
      }
    } else {
      this.content = this.getDefaultContent();
      this.saveContent();
    }
  }

  getDefaultContent() {
    return {
      chapters: JSON.parse(JSON.stringify(DEFAULT_CHAPTERS)),
      levelConfigs: JSON.parse(JSON.stringify(DEFAULT_LEVEL_CONFIGS)),
      questions: JSON.parse(JSON.stringify(DEFAULT_QUESTIONS)),
      gambar: [],
      gameplaySettings: {
        questionOrder: 'free',
        obstacles: 'enabled'
      }
    };
  }

  saveContent() {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(this.content));
    } catch (err) {
      console.warn("Storage quota limit reached in localStorage, saving lightweight content", err);
      try {
        const lightweight = {
          ...this.content,
          gambar: (this.content.gambar || []).map(g => ({
            id: g.id,
            name: g.name,
            size: g.size,
            createdAt: g.createdAt
          }))
        };
        localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(lightweight));
      } catch (e) {}
    }
  }

  restoreDefaultContent() {
    this.content = this.getDefaultContent();
    this.saveContent();
  }

  // --- SISWA (PROFIL & PROGRES DENGAN SISTEM NYAWA BARU) ---
  loadStudent() {
    this.student = null;
    const user = Auth.current();
    const raw = user ? localStorage.getItem(Auth.studentKey(user)) : null;
    if (raw) {
      try {
        this.student = JSON.parse(raw);
        if (!this.student.characterId) this.student.characterId = 'robo';
        // Migrasi aman nyawa: jika belum ada atau null, beri NYAWA_AWAL
        if (this.student.hearts === undefined || this.student.hearts === null) {
          this.student.hearts = NYAWA_AWAL;
        }
        // Riwayat bonus naik level per zona (+3 hanya sekali per level)
        if (!Array.isArray(this.student.bonusLevelsGiven)) {
          this.student.bonusLevelsGiven = [];
        }
        if (!this.student.zoneProgress) this.student.zoneProgress = {};
        if (!this.student.passedLevels) this.student.passedLevels = [];
        if (!this.student.stars) this.student.stars = {};
        if (!this.student.levelScores) this.student.levelScores = {};
        if (this.student.totalPoints === undefined) this.student.totalPoints = 0;
      } catch (e) {
        this.student = null;
      }
    }
  }

  async loadRemoteStudent() {
    if (!Auth.current() || !Auth.userId) return;
    try {
      const remote = await Auth.loadProgress();
      if (remote && typeof remote === 'object') {
        this.student = remote;
        if (!this.student.characterId) this.student.characterId = 'robo';
        if (this.student.hearts === undefined || this.student.hearts === null) this.student.hearts = NYAWA_AWAL;
        if (!Array.isArray(this.student.bonusLevelsGiven)) this.student.bonusLevelsGiven = [];
        if (!this.student.zoneProgress) this.student.zoneProgress = {};
        if (!this.student.passedLevels) this.student.passedLevels = [];
        if (!this.student.stars) this.student.stars = {};
        if (!this.student.levelScores) this.student.levelScores = {};
        if (this.student.totalPoints === undefined) this.student.totalPoints = 0;
        localStorage.setItem(Auth.studentKey(Auth.current()), JSON.stringify(this.student));
      }
    } catch (err) {
      console.error('Gagal memuat progres dari Supabase:', err.message);
    }
  }

  ensureStudent() {
    const user = Auth.current();
    if (!user) return false;
    if (!this.student) this.loadStudent();
    if (!this.student) {
      const acc = Auth.account(user);
      this.initStudent(acc.nama, acc.kelas, acc.absen);
    }
    return !!this.student;
  }

  initStudent(nama, kelas, absen) {
    this.student = {
      nama: nama.trim(),
      kelas: kelas.trim(),
      absen: absen ? parseInt(absen) : null,
      characterId: 'robo',
      hearts: NYAWA_AWAL, // Mulai Level 1 dengan 3 nyawa (tanpa batas maksimal 3)
      bonusLevelsGiven: [], // Level yang sudah menerima bonus +3 nyawa
      passedLevels: [], // misal [1, 2]
      stars: {}, // {1: 3, 2: 2}
      levelScores: {}, // {1: 500, 2: 400}
      totalPoints: 0,
      worldPos: { x: 180, y: 420 }, // Posisi awal di Zona 1 (Tengah lorong y:420)
      currentZone: 1,
      zoneProgress: {}, // Menyimpan sesi per zona agar persist saat refresh
      createdAt: new Date().toISOString()
    };
    this.saveStudent();
    this.syncLeaderboardEntry();
  }

  saveStudent() {
    const user = Auth.current();
    if (this.student && user) {
      localStorage.setItem(Auth.studentKey(user), JSON.stringify(this.student));
      // Simpan ke cloud tanpa menghambat animasi/permainan.
      Auth.saveProgress(this.student);
    }
  }

  resetStudentProgress() {
    if (!this.student) return;
    this.student.hearts = NYAWA_AWAL;
    this.student.bonusLevelsGiven = [];
    this.student.passedLevels = [];
    this.student.stars = {};
    this.student.levelScores = {};
    this.student.totalPoints = 0;
    this.student.worldPos = { x: 180, y: 420 };
    this.student.currentZone = 1;
    this.student.zoneProgress = {};
    this.saveStudent();
    this.syncLeaderboardEntry();
  }

  // --- PAPAN PERINGKAT ---
  loadLeaderboard() {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (raw) {
      try {
        this.leaderboard = JSON.parse(raw);
      } catch (e) {
        this.leaderboard = [];
      }
    } else {
      this.leaderboard = [];
    }
  }

  saveLeaderboard() {
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(this.leaderboard));
  }

  syncLeaderboardEntry() {
    if (!this.student) return;
    this.loadLeaderboard();

    const maxLvl = this.student.passedLevels.length > 0 
      ? Math.max(...this.student.passedLevels) 
      : 0;

    const existingIdx = this.leaderboard.findIndex(
      item => item.nama.toLowerCase() === this.student.nama.toLowerCase() && item.kelas.toLowerCase() === this.student.kelas.toLowerCase()
    );

    const record = {
      nama: this.student.nama,
      kelas: this.student.kelas,
      points: this.student.totalPoints,
      maxLevel: maxLvl,
      updatedAt: new Date().toLocaleDateString('id-ID')
    };

    if (existingIdx >= 0) {
      this.leaderboard[existingIdx] = record;
    } else {
      this.leaderboard.push(record);
    }

    this.leaderboard.sort((a, b) => b.points - a.points);
    this.saveLeaderboard();
  }

  isLevelUnlocked(levelNum) {
    if (levelNum === 1) return true;
    if (!this.student) return false;
    return this.student.passedLevels.includes(levelNum - 1);
  }
}

const state = new AppState();

// ==========================================
// PENYIMPANAN & PENGOLAHAN GAMBAR (INDEXEDDB + MEMORY + KOMPRESI)
// ==========================================
const EduestImageStore = {
  db: null,
  cache: new Map(),

  async init() {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        resolve();
        return;
      }
      const req = indexedDB.open('EduestDB', 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('gambar')) {
          db.createObjectStore('gambar', { keyPath: 'id' });
        }
      };
      req.onsuccess = (e) => {
        this.db = e.target.result;
        this.syncFromDB().then(resolve);
      };
      req.onerror = () => resolve();
    });
  },

  async syncFromDB() {
    if (!this.db) return;
    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction('gambar', 'readonly');
        const store = tx.objectStore('gambar');
        const req = store.getAll();
        req.onsuccess = () => {
          const list = req.result || [];
          list.forEach(item => {
            this.cache.set(item.id, item.dataUrl);
            if (typeof state !== 'undefined' && state && state.content && state.content.gambar) {
              if (!state.content.gambar.some(g => g.id === item.id)) {
                state.content.gambar.push(item);
              }
            }
          });
          resolve();
        };
        req.onerror = () => resolve();
      } catch (e) {
        resolve();
      }
    });
  },

  async saveImage(imgObj) {
    this.cache.set(imgObj.id, imgObj.dataUrl);
    if (typeof state !== 'undefined' && state && state.content) {
      if (!Array.isArray(state.content.gambar)) state.content.gambar = [];
      const idx = state.content.gambar.findIndex(g => g.id === imgObj.id);
      if (idx >= 0) state.content.gambar[idx] = imgObj;
      else state.content.gambar.push(imgObj);
      state.saveContent();
    }
    if (this.db) {
      try {
        const tx = this.db.transaction('gambar', 'readwrite');
        tx.objectStore('gambar').put(imgObj);
      } catch (e) {}
    }
  },

  async getImage(id) {
    if (!id) return '';
    if (this.cache.has(id)) return this.cache.get(id);
    if (typeof state !== 'undefined' && state && state.content && Array.isArray(state.content.gambar)) {
      const found = state.content.gambar.find(g => g.id === id);
      if (found && found.dataUrl) {
        this.cache.set(id, found.dataUrl);
        return found.dataUrl;
      }
    }
    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction('gambar', 'readonly');
          const store = tx.objectStore('gambar');
          const req = store.get(id);
          req.onsuccess = () => {
            if (req.result && req.result.dataUrl) {
              this.cache.set(id, req.result.dataUrl);
              resolve(req.result.dataUrl);
            } else {
              resolve('');
            }
          };
          req.onerror = () => resolve('');
        } catch (e) {
          resolve('');
        }
      });
    }
    return '';
  },

  async getAllImages() {
    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction('gambar', 'readonly');
          const store = tx.objectStore('gambar');
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve(state.content.gambar || []);
        } catch (e) {
          resolve(state.content.gambar || []);
        }
      });
    }
    return (typeof state !== 'undefined' && state && state.content && state.content.gambar) ? state.content.gambar : [];
  },

  async deleteImage(id) {
    this.cache.delete(id);
    if (typeof state !== 'undefined' && state && state.content && Array.isArray(state.content.gambar)) {
      state.content.gambar = state.content.gambar.filter(g => g.id !== id);
      state.saveContent();
    }
    if (this.db) {
      try {
        const tx = this.db.transaction('gambar', 'readwrite');
        tx.objectStore('gambar').delete(id);
      } catch (e) {}
    }
  }
};

// Fungsi Resolve Sumber Gambar (ID gambar lokal atau URL eksternal)
async function resolveImageSrc(srcOrId) {
  if (!srcOrId || typeof srcOrId !== 'string') return '';
  const s = srcOrId.trim();
  if (s === '') return '';
  if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:')) {
    return s;
  }
  return await EduestImageStore.getImage(s);
}

// Fungsi Pemrosesan & Kompresi Berkas Gambar
async function processImageFile(file) {
  if (!file) throw new Error("Tidak ada berkas yang dipilih.");
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Ukuran berkas terlalu besar! Maksimal 10 MB.");
  }

  let imgBitmap;
  if ('createImageBitmap' in window) {
    try {
      imgBitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch (e) {
      imgBitmap = null;
    }
  }

  return new Promise((resolve, reject) => {
    const handleBitmapOrImg = (source, naturalW, naturalH) => {
      const maxW = 900;
      let targetW = naturalW;
      let targetH = naturalH;
      if (targetW > maxW) {
        targetH = Math.round((targetH * maxW) / targetW);
        targetW = maxW;
      }
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(source, 0, 0, targetW, targetH);

      const mimeType = (file.type === 'image/png') ? 'image/png' : 'image/jpeg';
      const quality = (mimeType === 'image/jpeg') ? 0.82 : undefined;
      const dataUrl = canvas.toDataURL(mimeType, quality);

      const id = 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      const imgObj = {
        id,
        name: file.name,
        dataUrl,
        size: Math.round(dataUrl.length * 0.75),
        createdAt: new Date().toISOString()
      };

      EduestImageStore.saveImage(imgObj);
      resolve(imgObj);
    };

    if (imgBitmap) {
      handleBitmapOrImg(imgBitmap, imgBitmap.width, imgBitmap.height);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => handleBitmapOrImg(img, img.naturalWidth, img.naturalHeight);
        img.onerror = () => reject(new Error("Gagal membaca berkas gambar."));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error("Gagal membaca berkas file."));
      reader.readAsDataURL(file);
    }
  });
}

// ===================================================================
// MESIN DUNIA PETUALANGAN 2D TOP-DOWN (HTML5 CANVAS ENGINE)
// 5 Zona Berurutan, Gerbang, Titik Soal Sekuensial, Tabrakan, Joystick
// ===================================================================
class World2DEngine {
  constructor() {
    this.canvas = document.getElementById('world-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.minimapCanvas = document.getElementById('world-minimap-canvas');
    this.minimapCtx = this.minimapCanvas ? this.minimapCanvas.getContext('2d') : null;

    // Dimensi Dunia Penuh (5 Zona Sejajar Horizontal)
    // Zona 1: 0 - 1200 | Zona 2: 1200 - 2400 | Zona 3: 2400 - 3600 | Zona 4: 3600 - 4800 | Zona 5: 4800 - 6000
    this.worldWidth = 6000;
    this.worldHeight = 840;

    // Status Kamera
    this.camera = { x: 0, y: 0 };

    // Karakter Pemain (Hitbox presisi anti-tunneling)
    this.player = {
      x: 180,
      y: 420,
      radius: 16,
      speed: 4.8,
      vx: 0,
      vy: 0,
      facing: 'right', // 'right', 'left', 'up', 'down'
      isMoving: false,
      stepTimer: 0,
      invulnerableTimer: 0
    };

    // Kontrol Input
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      action: false
    };

    this.joystick = {
      active: false,
      startX: 0,
      startY: 0,
      currX: 0,
      currY: 0,
      dx: 0,
      dy: 0,
      maxRadius: 46
    };

    // Data Peta (Zona, Rintangan, Gerbang, Stasiun Soal)
    this.zones = [];
    this.obstacles = [];
    this.gates = [];
    this.stations = [];
    this.particles = [];
    this.sparks = [];

    // State Interaksi
    this.currentZoneIndex = 1;
    this.activeInteractable = null; // stasiun atau gerbang terdekat
    this.isFrozen = false; // beku saat modal soal terbuka
    this.showMinimap = false;
    this.showCompass = true;
    this.animationFrameId = null;

    this.initZonesData();
    this.setupEventListeners();
  }

  // Definisi 5 Zona
  initZonesData() {
    this.zones = [
      {
        level: 1,
        name: "Desa Komputer",
        fullName: "Zona 1: Desa Komputer",
        mission: "Pondasi Dasar Hardware & Software Komputer",
        icon: "🌲",
        startX: 0,
        endX: 1200,
        spawnX: 180,
        spawnY: 420,
        bgColor: "#163820",
        pathColor: "#f1f5f9",
        circuitColor: "#38bdf8",
        gateX: 1160,
        gateY: 360,
        gateW: 80,
        gateH: 120
      },
      {
        level: 2,
        name: "Hutan Hardware",
        fullName: "Zona 2: Hutan Hardware",
        mission: "Eksplorasi Ragam Komponen Fisik Komputer",
        icon: "⚙️",
        startX: 1200,
        endX: 2400,
        spawnX: 1320,
        spawnY: 420,
        bgColor: "#042c23",
        pathColor: "#f59e0b",
        circuitColor: "#10b981",
        gateX: 2360,
        gateY: 360,
        gateW: 80,
        gateH: 120
      },
      {
        level: 3,
        name: "Gua Software",
        fullName: "Zona 3: Gua Software",
        mission: "Penjelajahan Sistem Operasi, Utility & Firmware",
        icon: "💻",
        startX: 2400,
        endX: 3600,
        spawnX: 2520,
        spawnY: 420,
        bgColor: "#170f30",
        pathColor: "#a855f7",
        circuitColor: "#c084fc",
        gateX: 3560,
        gateY: 360,
        gateW: 80,
        gateH: 120
      },
      {
        level: 4,
        name: "Jembatan Kilat",
        fullName: "Zona 4: Jembatan Kilat (Speed Round)",
        mission: "Tantangan Waktu: Kolaborasi Sinergis Sistem",
        icon: "⚡",
        startX: 3600,
        endX: 4800,
        spawnX: 3720,
        spawnY: 420,
        bgColor: "#081329",
        pathColor: "#0284c7",
        circuitColor: "#fbbf24",
        gateX: 4760,
        gateY: 360,
        gateW: 80,
        gateH: 120
      },
      {
        level: 5,
        name: "Istana Boss",
        fullName: "Zona 5: Istana Boss (Boss Challenge)",
        mission: "Tuntaskan Pertempuran Akhir Menjadi Master TJKT!",
        icon: "👑",
        startX: 4800,
        endX: 6000,
        spawnX: 4920,
        spawnY: 420,
        bgColor: "#260718",
        pathColor: "#e11d48",
        circuitColor: "#f59e0b",
        finishX: 5800,
        finishY: 420
      }
    ];

    // Bangun Rintangan, Dinding Batas, Sinkronkan Stasiun, dan Validasi Peta
    this.buildMapObstacles();
    this.refreshStations();
    this.validateMap();
  }

  buildMapObstacles() {
    this.obstacles = [];
    this.doors = [];
    this.keysList = [];
    this.boulders = [];
    this.plates = [];
    this.barriers = [];
    this.patrols = [];
    this.heldKeys = 0;

    const wallThickness = 80; // Dinding tebal 2 tile penuh (2 x 40px)

    // ==========================================
    // 1. DINDING BATAS LUAR SELURUH DUNIA (OUTER WORLD BORDERS)
    // Tebal 80px (2 Tile), menutup penuh keliling peta dunia
    // ==========================================
    // Dinding Atas (Penuh dari x:0 sampai x:6000, y:0 sampai y:80)
    this.obstacles.push({ x: 0, y: 0, w: this.worldWidth, h: wallThickness, type: 'outer-wall', label: 'Tembok Utara Dunia' });
    // Dinding Bawah (Penuh dari x:0 sampai x:6000, y:760 sampai y:840)
    this.obstacles.push({ x: 0, y: this.worldHeight - wallThickness, w: this.worldWidth, h: wallThickness, type: 'outer-wall', label: 'Tembok Selatan Dunia' });
    // Dinding Kiri Luar (Zona 1, x:0 sampai x:80, y:0 sampai y:840)
    this.obstacles.push({ x: 0, y: 0, w: wallThickness, h: this.worldHeight, type: 'outer-wall', label: 'Tembok Barat Dunia' });
    // Dinding Kanan Luar (Zona 5, x:5920 sampai x:6000, y:0 sampai y:840)
    this.obstacles.push({ x: this.worldWidth - wallThickness, y: 0, w: wallThickness, h: this.worldHeight, type: 'outer-wall', label: 'Tembok Timur Dunia' });

    // ==========================================
    // 2. DINDING PEMBATAS MASIF ANTAR ZONA (THICK DIVIDER WALLS)
    // Tebal 80px (2 Tile). Setiap pembatas menutup rapat dari y:0 sampai y:840,
    // menyisakan HANYA satu celah lorong gerbang sempit (y:360 sampai y:480, tinggi 120px = 3 tile).
    // ==========================================
    const gateTopY = 360;
    const gateH = 120; // 3 tile = 120px
    const gateBottomY = gateTopY + gateH; // 480

    const dividerXList = [
      { x: 1200, zone: 1, name: "Batas Zona 1 & 2" },
      { x: 2400, zone: 2, name: "Batas Zona 2 & 3" },
      { x: 3600, zone: 3, name: "Batas Zona 3 & 4" },
      { x: 4800, zone: 4, name: "Batas Zona 4 & 5" }
    ];

    for (let div of dividerXList) {
      const wx = div.x - wallThickness / 2; // misal 1200 - 40 = 1160
      // Dinding atas (y:0 -> y:360)
      this.obstacles.push({
        x: wx,
        y: 0,
        w: wallThickness,
        h: gateTopY,
        type: 'divider-wall',
        zoneIndex: div.zone,
        label: `${div.name} (Atas)`
      });
      // Dinding bawah (y:480 -> y:840)
      this.obstacles.push({
        x: wx,
        y: gateBottomY,
        w: wallThickness,
        h: this.worldHeight - gateBottomY,
        type: 'divider-wall',
        zoneIndex: div.zone,
        label: `${div.name} (Bawah)`
      });
    }

    // ==========================================
    // 3. GERBANG ANTAR ZONA (GATES)
    // Tepat di celah pembatas (x: div.x - 40, y: 360, w: 80, h: 120)
    // Saat level belum lulus: SOLID (Collision aktif, pintu tertutup).
    // Saat level lulus: TERBUKA (Bisa dilewati).
    // ==========================================
    this.gates = [
      { id: 1, level: 1, x: 1160, y: gateTopY, w: wallThickness, h: gateH, name: "Gerbang Zona 2" },
      { id: 2, level: 2, x: 2360, y: gateTopY, w: wallThickness, h: gateH, name: "Gerbang Zona 3" },
      { id: 3, level: 3, x: 3560, y: gateTopY, w: wallThickness, h: gateH, name: "Gerbang Zona 4" },
      { id: 4, level: 4, x: 4760, y: gateTopY, w: wallThickness, h: gateH, name: "Gerbang Istana Boss" }
    ];

    // ==========================================
    // 4. RINTANGAN TEMATIK DI DALAM ZONA (BERJARAK DARI DINDING)
    // Margin aman > 60px dari semua dinding keliling & pembatas
    // ==========================================
    // Zona 1: Rumah Komputer & Pepohonan Sirkuit
    this.obstacles.push({ x: 260, y: 150, w: 120, h: 90, type: 'house', label: 'Rumah CPU' });
    this.obstacles.push({ x: 640, y: 160, w: 110, h: 90, type: 'house', label: 'Lab IT' });
    this.obstacles.push({ x: 420, y: 550, w: 90, h: 80, type: 'tree' });
    this.obstacles.push({ x: 820, y: 560, w: 90, h: 80, type: 'tree' });

    // Zona 2: Server Rack Tower & Heatsink Rock
    this.obstacles.push({ x: 1500, y: 170, w: 120, h: 90, type: 'server-rack' });
    this.obstacles.push({ x: 1850, y: 550, w: 110, h: 90, type: 'heatsink' });
    this.obstacles.push({ x: 2050, y: 170, w: 110, h: 90, type: 'server-rack' });

    // Zona 3: Kristal Kode Ungu & Gua Obelisk
    this.obstacles.push({ x: 2700, y: 170, w: 100, h: 90, type: 'crystal' });
    this.obstacles.push({ x: 3050, y: 550, w: 100, h: 90, type: 'crystal' });
    this.obstacles.push({ x: 3280, y: 170, w: 90, h: 90, type: 'monolith' });

    // Zona 4: Generator Listrik Tesla & Jurang Cyber
    this.obstacles.push({ x: 3950, y: 170, w: 100, h: 90, type: 'tesla' });
    this.obstacles.push({ x: 4300, y: 560, w: 110, h: 90, type: 'tesla' });
    this.obstacles.push({ x: 4500, y: 170, w: 90, h: 80, type: 'capacitor' });

    // Zona 5: Patung Boss & Pilar Api Lava
    this.obstacles.push({ x: 5150, y: 170, w: 110, h: 90, type: 'boss-pillar' });
    this.obstacles.push({ x: 5450, y: 560, w: 110, h: 90, type: 'boss-pillar' });
    this.obstacles.push({ x: 5740, y: 220, w: 120, h: 100, type: 'boss-throne' });

    // ==========================================
    // 5. RINTANGAN DINAMIS ZONA (PINTU KUNCI, BATU DORONG, PATROLI)
    // Tidak menempel pada dinding sehingga karakter tidak bisa terjepit
    // ==========================================
    const obstaclesEnabled = !state.content || !state.content.gameplaySettings || state.content.gameplaySettings.obstacles !== 'disabled';

    // 1. Pintu Kunci (Door & Key)
    this.doors = [
      { id: 1, zone: 2, x: 1840, y: 200, w: 24, h: 100, open: !obstaclesEnabled, label: 'Pintu Bersegel' },
      { id: 2, zone: 4, x: 4480, y: 530, w: 24, h: 100, open: !obstaclesEnabled, label: 'Gerbang Kilat' }
    ];
    this.keysList = [
      { id: 1, zone: 2, x: 1420, y: 250, collected: false },
      { id: 2, zone: 4, x: 3850, y: 610, collected: false }
    ];

    // 2. Batu Dorong & Tombol Tekan (Push Boulder & Pressure Plate)
    this.boulders = [
      { id: 1, zone: 1, x: 680, y: 580, initX: 680, initY: 580, radius: 22 },
      { id: 2, zone: 5, x: 5220, y: 280, initX: 5220, initY: 280, radius: 22 }
    ];
    this.plates = [
      { id: 1, zone: 1, x: 780, y: 580, w: 48, h: 48, pressed: !obstaclesEnabled },
      { id: 2, zone: 5, x: 5360, y: 280, w: 48, h: 48, pressed: !obstaclesEnabled }
    ];
    this.barriers = [
      { id: 1, zone: 1, x: 880, y: 530, w: 24, h: 100, open: !obstaclesEnabled, label: 'Pagar Sirkuit' },
      { id: 2, zone: 5, x: 5490, y: 220, w: 24, h: 110, open: !obstaclesEnabled, label: 'Penghalang Lava' }
    ];

    // 3. Robot Patroli Pengawas (Patrol Robot / Virus)
    if (obstaclesEnabled) {
      this.patrols = [
        { id: 1, zone: 3, x: 2900, y: 440, minX: 2750, maxX: 3150, speed: 2.2, dir: 1, radius: 18, name: 'Security-Bot' },
        { id: 2, zone: 4, x: 4100, y: 360, minX: 3950, maxX: 4350, speed: 2.8, dir: 1, radius: 18, name: 'Cyber-Drone' },
        { id: 3, zone: 5, x: 5550, y: 480, minX: 5400, maxX: 5700, speed: 2.4, dir: 1, radius: 20, name: 'Boss-Guardian' }
      ];
    } else {
      this.patrols = [];
    }

    // Partikel Ambien
    this.initAmbientParticles();
  }

  // Reset Posisi Batu Dorong jika tersangkut
  resetBoulders() {
    for (let b of this.boulders) {
      b.x = b.initX;
      b.y = b.initY;
    }
    const obstaclesEnabled = !state.content || !state.content.gameplaySettings || state.content.gameplaySettings.obstacles !== 'disabled';
    for (let p of this.plates) {
      p.pressed = !obstaclesEnabled;
    }
    for (let bar of this.barriers) {
      bar.open = !obstaclesEnabled;
    }
  }

  initAmbientParticles() {
    this.particles = [];
    for (let i = 0; i < 90; i++) {
      this.particles.push({
        x: Math.random() * this.worldWidth,
        y: 100 + Math.random() * (this.worldHeight - 200),
        size: 2 + Math.random() * 4,
        speedX: -0.3 + Math.random() * 0.6,
        speedY: -0.3 + Math.random() * 0.6,
        opacity: 0.3 + Math.random() * 0.5,
        color: ['#38bdf8', '#34d399', '#c084fc', '#f59e0b', '#fb7185'][Math.floor(Math.random() * 5)]
      });
    }
  }

  // Sinkronisasi Stasiun Soal Dinamis Mengikuti Data Guru & Status Baru
  refreshStations() {
    this.stations = [];

    // Titik Koordinat Tersebar di Peta (Terdistribusi Menyeluruh di Zona)
    const scatteredWaypoints = {
      1: [
        { x: 340, y: 300 }, { x: 500, y: 560 }, { x: 680, y: 320 }, { x: 820, y: 460 }, { x: 940, y: 600 },
        { x: 440, y: 420 }, { x: 620, y: 640 }, { x: 880, y: 280 }, { x: 1040, y: 460 }
      ],
      2: [
        { x: 1380, y: 360 }, { x: 1560, y: 540 }, { x: 1720, y: 360 }, { x: 1960, y: 240 }, { x: 2160, y: 480 },
        { x: 1480, y: 460 }, { x: 1680, y: 620 }, { x: 1880, y: 520 }, { x: 2060, y: 320 }
      ],
      3: [
        { x: 2580, y: 320 }, { x: 2740, y: 560 }, { x: 2920, y: 300 }, { x: 3100, y: 540 }, { x: 3340, y: 400 },
        { x: 2680, y: 460 }, { x: 2860, y: 640 }, { x: 3040, y: 320 }, { x: 3220, y: 580 }
      ],
      4: [
        { x: 3780, y: 340 }, { x: 3960, y: 540 }, { x: 4160, y: 300 }, { x: 4360, y: 480 }, { x: 4560, y: 600 },
        { x: 3880, y: 460 }, { x: 4060, y: 640 }, { x: 4280, y: 320 }, { x: 4620, y: 360 }
      ],
      5: [
        { x: 5040, y: 360 }, { x: 5220, y: 540 }, { x: 5400, y: 380 }, { x: 5580, y: 250 }, { x: 5740, y: 500 },
        { x: 5120, y: 460 }, { x: 5320, y: 620 }, { x: 5500, y: 580 }, { x: 5660, y: 340 }
      ]
    };

    if (!state.student) return; // Belum ada data siswa (kunjungan pertama)

    const isSequentialMode = (state.content?.gameplaySettings?.questionOrder === 'sequential');

    // Bangun stasiun untuk tiap zona 1 - 5
    for (let lvl = 1; lvl <= 5; lvl++) {
      const cfg = state.content.levelConfigs[lvl] || { targetQuestions: 5 };
      const allQ = state.content.questions.filter(q => q.level === lvl);

      if (!state.student.zoneProgress) state.student.zoneProgress = {};
      let session = state.student.zoneProgress[lvl];

      const waypoints = scatteredWaypoints[lvl] || [];

      // Inisialisasi atau migrasi sesi stasiun
      if (!session || !session.stations || session.stations.length === 0) {
        const shuffled = [...allQ].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(cfg.targetQuestions, shuffled.length));

        const initStations = selected.map((q, idx) => {
          const wp = waypoints[idx % waypoints.length];
          return {
            qId: q.id,
            index: idx,
            x: wp.x,
            y: wp.y,
            status: 'unanswered', // 4 status: 'unanswered' (❓), 'wrong' (❌), 'correct' (✅), 'blocked' (🔒)
            mistakes: 0
          };
        });

        session = {
          questionIds: selected.map(q => q.id),
          stations: initStations,
          answeredIndex: 0,
          mistakes: 0,
          earnedScore: 0
        };
        state.student.zoneProgress[lvl] = session;
        state.saveStudent();
      }

      const totalCount = session.stations.length;

      if (totalCount === 0) {
        // Papan Info jika soal kosong
        this.stations.push({
          level: lvl,
          index: 0,
          qNumber: 1,
          x: waypoints[0] ? waypoints[0].x : 200,
          y: waypoints[0] ? waypoints[0].y : 440,
          isEmptyBoard: true,
          status: 'empty'
        });
      } else {
        const isLevelPassed = state.student.passedLevels.includes(lvl);

        // Cari stasiun pertama yang belum selesai jika mode berurutan
        let firstUnfinishedIndex = -1;
        if (isSequentialMode && !isLevelPassed) {
          firstUnfinishedIndex = session.stations.findIndex(s => s.status !== 'correct');
          if (firstUnfinishedIndex === -1) firstUnfinishedIndex = totalCount;
        }

        for (let i = 0; i < totalCount; i++) {
          const stData = session.stations[i];
          let displayStatus = stData.status || 'unanswered';

          if (isLevelPassed) {
            displayStatus = 'correct';
          } else if (isSequentialMode) {
            if (i > firstUnfinishedIndex) {
              displayStatus = 'blocked';
            }
          }

          this.stations.push({
            level: lvl,
            index: i,
            qNumber: i + 1,
            qId: stData.qId,
            x: stData.x,
            y: stData.y,
            isEmptyBoard: false,
            status: displayStatus,
            realStatus: stData.status || 'unanswered',
            mistakes: stData.mistakes || 0
          });
        }
      }
    }
  }

  // Mengatur Event Listener Keyboard, Touch Joystick & Tombol Aksi
  setupEventListeners() {
    // Keyboard Listener
    window.addEventListener('keydown', (e) => {
      // 1. Cek apakah user sedang fokus pada elemen input/textarea/select/contenteditable
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      const isInputFocused = document.activeElement && (
        activeTag === 'INPUT' ||
        activeTag === 'TEXTAREA' ||
        activeTag === 'SELECT' ||
        document.activeElement.isContentEditable
      );
      if (isInputFocused) {
        return;
      }

      // Handle Escape: tutup Lightbox, Pustaka Gambar, Peta Mini, atau Pratinjau
      if (e.key === 'Escape') {
        const lightbox = document.getElementById('modal-image-lightbox');
        if (lightbox && !lightbox.classList.contains('hidden')) {
          UI.closeLightbox();
          e.preventDefault();
          return;
        }
        const imgLib = document.getElementById('modal-image-library');
        if (imgLib && !imgLib.classList.contains('hidden')) {
          TeacherController.closeImageLibrary();
          e.preventDefault();
          return;
        }
        const minimapCard = document.getElementById('world-minimap-card') || document.getElementById('world-minimap-container');
        if (minimapCard && !minimapCard.classList.contains('hidden')) {
          this.toggleMinimap(false);
          e.preventDefault();
          return;
        }
        const previewModal = document.getElementById('modal-preview-question');
        if (previewModal && !previewModal.classList.contains('hidden')) {
          GameController.closePreviewModal();
          e.preventDefault();
          return;
        }
      }

      // 2. Cek apakah modal pratinjau soal terbuka -> tombol E menutupnya
      const previewModal = document.getElementById('modal-preview-question');
      if (previewModal && !previewModal.classList.contains('hidden')) {
        if (e.key.toLowerCase() === 'e') {
          e.preventDefault();
          GameController.closePreviewModal();
          return;
        }
      }

      // 3. Cek apakah layar world sedang aktif
      const worldScreen = document.getElementById('screen-world');
      if (!worldScreen || !worldScreen.classList.contains('active')) {
        return;
      }

      // Toggle Peta Mini dengan tombol 'M' (selama modal kuis tidak sedang terbuka)
      if (e.key.toLowerCase() === 'm') {
        const quizModal = document.getElementById('modal-quiz-panel');
        if (!quizModal || quizModal.classList.contains('hidden')) {
          this.toggleMinimap();
          e.preventDefault();
          return;
        }
      }

      // 4. Jika dunia sedang beku (misal modal soal atau gameover terbuka)
      if (this.isFrozen) return;

      const key = e.key.toLowerCase();
      if (key === 'arrowup' || key === 'w') { this.keys.up = true; e.preventDefault(); }
      if (key === 'arrowdown' || key === 's') { this.keys.down = true; e.preventDefault(); }
      if (key === 'arrowleft' || key === 'a') { this.keys.left = true; e.preventDefault(); }
      if (key === 'arrowright' || key === 'd') { this.keys.right = true; e.preventDefault(); }

      if (key === 'e' || key === ' ') {
        this.triggerAction();
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT' || (document.activeElement && document.activeElement.isContentEditable)) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'arrowup' || key === 'w') this.keys.up = false;
      if (key === 'arrowdown' || key === 's') this.keys.down = false;
      if (key === 'arrowleft' || key === 'a') this.keys.left = false;
      if (key === 'arrowright' || key === 'd') this.keys.right = false;
    });

    // Touch Virtual Joystick
    const joyBase = document.getElementById('virtual-joystick-base');
    const joyThumb = document.getElementById('virtual-joystick-thumb');

    if (joyBase && joyThumb) {
      const handleJoyStart = (e) => {
        if (this.isFrozen) return;
        const touch = e.touches ? e.touches[0] : e;
        const rect = joyBase.getBoundingClientRect();
        this.joystick.active = true;
        this.joystick.startX = rect.left + rect.width / 2;
        this.joystick.startY = rect.top + rect.height / 2;
        this.updateJoyPos(touch.clientX, touch.clientY, joyThumb);
      };

      const handleJoyMove = (e) => {
        if (!this.joystick.active || this.isFrozen) return;
        const touch = e.touches ? e.touches[0] : e;
        this.updateJoyPos(touch.clientX, touch.clientY, joyThumb);
        e.preventDefault();
      };

      const handleJoyEnd = () => {
        this.joystick.active = false;
        this.joystick.dx = 0;
        this.joystick.dy = 0;
        joyThumb.style.transform = 'translate(-50%, -50%)';
      };

      joyBase.addEventListener('pointerdown', handleJoyStart);
      window.addEventListener('pointermove', handleJoyMove, { passive: false });
      window.addEventListener('pointerup', handleJoyEnd);
      window.addEventListener('pointercancel', handleJoyEnd);
    }

    // Touch Action Button (Debounced & touch-safe)
    const actionBtn = document.getElementById('virtual-action-btn');
    if (actionBtn) {
      let lastActionTime = 0;
      const doAction = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        const now = Date.now();
        if (now - lastActionTime < 280) return;
        lastActionTime = now;
        this.triggerAction();
      };
      actionBtn.addEventListener('pointerdown', doAction);
    }

    // Resize Canvas Responsif
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  }

  updateJoyPos(clientX, clientY, thumbEl) {
    const rawDx = clientX - this.joystick.startX;
    const rawDy = clientY - this.joystick.startY;
    const dist = Math.sqrt(rawDx * rawDx + rawDy * rawDy);

    const maxR = this.joystick.maxRadius;
    const clampedDist = Math.min(dist, maxR);
    const angle = Math.atan2(rawDy, rawDx);

    const normX = Math.cos(angle) * (clampedDist / maxR);
    const normY = Math.sin(angle) * (clampedDist / maxR);

    this.joystick.dx = normX;
    this.joystick.dy = normY;

    const posX = Math.cos(angle) * clampedDist;
    const posY = Math.sin(angle) * clampedDist;
    thumbEl.style.transform = `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px))`;
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    if (this.ctx) {
      this.ctx.resetTransform?.();
      this.ctx.scale(dpr, dpr);
    }
  }

  // Mulai Engine Dunia
  start() {
    this.resizeCanvas();
    this.refreshStations();
    this.validateMap();
    this.initMinimapPreference();

    // Pulihkan posisi pemain
    if (state.student && state.student.worldPos) {
      this.player.x = state.student.worldPos.x || 180;
      this.player.y = state.student.worldPos.y || 420;
    } else {
      this.player.x = 180;
      this.player.y = 420;
    }

    // Failsafe: Pastikan karakter tidak berada di luar zona yang sah atau di dalam dinding
    this.enforcePlayerZoneBounds();

    this.isFrozen = false;
    this.currentZoneIndex = this.getZoneByX(this.player.x);
    this.updateHUD();

    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.lastFrameTime = performance.now();
    this.loop = this.loop.bind(this);
    this.animationFrameId = requestAnimationFrame(this.loop);
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  getZoneByX(x) {
    if (x < 1200) return 1;
    if (x < 2400) return 2;
    if (x < 3600) return 3;
    if (x < 4800) return 4;
    return 5;
  }

  // Gameloop 60 FPS (Delta time di-clamp maksimal 0.05s untuk mencegah tunneling saat lag)
  loop(timestamp) {
    const dt = Math.min((timestamp - this.lastFrameTime) / 1000, 0.05);
    this.lastFrameTime = timestamp;

    if (!this.isFrozen) {
      this.update(dt);
    }

    this.render();
    this.renderMinimap();

    this.animationFrameId = requestAnimationFrame(this.loop);
  }

  // Update Fisika, Gerak, Tabrakan, & Kamera
  update(dt) {
    let moveX = 0;
    let moveY = 0;

    // Baca Keyboard
    if (this.keys.up) moveY -= 1;
    if (this.keys.down) moveY += 1;
    if (this.keys.left) moveX -= 1;
    if (this.keys.right) moveX += 1;

    // Normalisasi diagonal
    if (moveX !== 0 && moveY !== 0) {
      moveX *= 0.7071;
      moveY *= 0.7071;
    }

    // Baca Joystick
    if (this.joystick.active) {
      moveX = this.joystick.dx;
      moveY = this.joystick.dy;
    }

    // Tentukan Arah Menghadap
    if (Math.abs(moveX) > 0.1) {
      this.player.facing = moveX > 0 ? 'right' : 'left';
    } else if (Math.abs(moveY) > 0.1) {
      this.player.facing = moveY > 0 ? 'down' : 'up';
    }

    const isMoving = Math.abs(moveX) > 0.05 || Math.abs(moveY) > 0.05;
    this.player.isMoving = isMoving;

    if (isMoving) {
      this.player.stepTimer += dt * 8;
      sound.step();

      const speed = this.player.speed * (this.currentZoneIndex === 4 ? 1.15 : 1);
      const totalDx = moveX * speed;
      const totalDy = moveY * speed;

      // Anti-Tunneling: Bagi gerakan menjadi sub-langkah kecil (maks 4px per iterasi)
      const moveDist = Math.hypot(totalDx, totalDy);
      const maxSubStep = 4;
      const numSteps = Math.max(1, Math.ceil(moveDist / maxSubStep));
      const subDx = totalDx / numSteps;
      const subDy = totalDy / numSteps;

      for (let s = 0; s < numSteps; s++) {
        // Cek dorong batu jika menabrak batu
        for (let b of this.boulders) {
          const distB = Math.hypot((this.player.x + subDx) - b.x, (this.player.y + subDy) - b.y);
          if (distB < this.player.radius + b.radius + 2) {
            const pushAngle = Math.atan2(b.y - this.player.y, b.x - this.player.x);
            const pushDist = Math.hypot(subDx, subDy) * 0.75;
            const nextBx = b.x + Math.cos(pushAngle) * pushDist;
            const nextBy = b.y + Math.sin(pushAngle) * pushDist;
            if (!this.checkBoulderCollision(nextBx, nextBy, b.id)) {
              b.x = nextBx;
              b.y = nextBy;
            }
          }
        }

        // Tabrakan per sumbu secara terpisah (Smooth sliding dinding)
        const nextX = this.player.x + subDx;
        if (!this.checkCollision(nextX, this.player.y)) {
          this.player.x = nextX;
        }
        const nextY = this.player.y + subDy;
        if (!this.checkCollision(this.player.x, nextY)) {
          this.player.y = nextY;
        }
      }

      // Simpan posisi terakhir ke state
      if (state.student) {
        state.student.worldPos = { x: Math.round(this.player.x), y: Math.round(this.player.y) };
      }
    }

    // Proteksi Failsafe Posisi: Pastikan karakter tidak melanggar batas zona atau terjebak dinding
    this.enforcePlayerZoneBounds();

    // 1. Update Aktivasi Tombol Tekan oleh Batu
    for (let i = 0; i < this.plates.length; i++) {
      const p = this.plates[i];
      const bar = this.barriers[i];
      let isPressed = false;
      for (let b of this.boulders) {
        if (b.zone === p.zone && Math.hypot(b.x - (p.x + p.w / 2), b.y - (p.y + p.h / 2)) < 34) {
          isPressed = true;
          break;
        }
      }
      if (isPressed && !p.pressed) {
        sound.correct();
        UI.showToast("Tombol tertekan oleh batu! Penghalang terbuka. 🔘", '🔘');
      }
      p.pressed = isPressed;
      if (bar) bar.open = isPressed;
    }

    // Auto-Reset Batu Tersangkut: Deteksi jika batu terjebak di sudut > 1.2s saat didorong
    for (let b of this.boulders) {
      if (b.zone === this.currentZoneIndex) {
        const associatedPlate = this.plates.find(pl => pl.zone === b.zone && pl.id === b.id);
        const isPlatePressed = associatedPlate && associatedPlate.pressed;

        if (!isPlatePressed) {
          const bL = this.checkBoulderCollision(b.x - 6, b.y, b.id);
          const bR = this.checkBoulderCollision(b.x + 6, b.y, b.id);
          const bU = this.checkBoulderCollision(b.x, b.y - 6, b.id);
          const bD = this.checkBoulderCollision(b.x, b.y + 6, b.id);
          const isTrappedInCorner = (bL || bR) && (bU || bD);
          const distToPlayer = Math.hypot(this.player.x - b.x, this.player.y - b.y);
          const isPlayerTryingToPush = distToPlayer < (this.player.radius + b.radius + 20);

          if (isTrappedInCorner && isPlayerTryingToPush) {
            b.stuckTimer = (b.stuckTimer || 0) + dt;
            if (b.stuckTimer >= 1.2) {
              this.createSparkBurst(b.x, b.y, '#f59e0b');
              b.x = b.initX;
              b.y = b.initY;
              b.stuckTimer = 0;
              this.createSparkBurst(b.initX, b.initY, '#38bdf8');
              sound.click();
              UI.showToast("Batu kembali ke tempat semula 🪨", "🪨");
            }
          } else {
            b.stuckTimer = Math.max(0, (b.stuckTimer || 0) - dt * 2);
          }
        } else {
          b.stuckTimer = 0;
        }
      }
    }

    // 2. Deteksi Pengambilan Kunci (Key Collection)
    for (let k of this.keysList) {
      if (!k.collected && Math.hypot(this.player.x - k.x, this.player.y - k.y) < 36) {
        k.collected = true;
        this.heldKeys++;
        sound.click();
        this.createSparkBurst(k.x, k.y, '#f59e0b');
        UI.showToast("Kunci ditemukan! 🗝️", '🗝️');
        this.updateHUD();
      }
    }

    // 3. Deteksi Pembukaan Pintu dengan Kunci
    for (let d of this.doors) {
      if (!d.open && this.heldKeys > 0) {
        const distD = Math.hypot(this.player.x - (d.x + d.w / 2), this.player.y - (d.y + d.h / 2));
        if (distD < 52) {
          d.open = true;
          this.heldKeys--;
          sound.correct();
          this.createSparkBurst(d.x + d.w / 2, d.y + d.h / 2, '#38bdf8');
          UI.showToast(`${d.label || 'Pintu'} terbuka dengan kunci! 🚪`, '🔓');
          this.updateHUD();
        }
      }
    }

    // 4. Update Robot Patroli (Memantulkan pemain tanpa mengurangi nyawa!)
    for (let patrol of this.patrols) {
      patrol.x += patrol.speed * patrol.dir;
      if (patrol.x > patrol.maxX) {
        patrol.dir = -1;
      } else if (patrol.x < patrol.minX) {
        patrol.dir = 1;
      }

      // Deteksi sentuhan dengan pemain
      const distPatrol = Math.hypot(this.player.x - patrol.x, this.player.y - patrol.y);
      if (distPatrol < this.player.radius + patrol.radius && this.player.invulnerableTimer <= 0) {
        this.player.invulnerableTimer = 1.2;
        // Pantulkan pemain mundur menjauh
        this.player.x -= patrol.dir * 50;
        sound.wrong();
        this.shakeScreen();
        UI.showToast(`Terkena ${patrol.name}! Kamu terpental mundur (Nyawa tidak berkurang).`, '🤖');
      }
    }

    // Update Timer Kekebalan Karakter
    if (this.player.invulnerableTimer > 0) {
      this.player.invulnerableTimer -= dt;
    }

    // Deteksi Perpindahan Zona
    const newZone = this.getZoneByX(this.player.x);
    if (newZone !== this.currentZoneIndex) {
      this.currentZoneIndex = newZone;
      this.onEnterZone(newZone);
    }

    // Deteksi Interaksi Terdekat (Stasiun Soal atau Gerbang)
    this.checkNearbyInteractables();

    // Update Posisi Kamera Mengikuti Pemain
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    const targetCamX = this.player.x - viewW / 2;
    const targetCamY = this.player.y - viewH / 2;

    this.camera.x += (targetCamX - this.camera.x) * 0.12;
    this.camera.y += (targetCamY - this.camera.y) * 0.12;

    // Batasi Kamera di Batas Dunia
    this.camera.x = Math.max(0, Math.min(this.worldWidth - viewW, this.camera.x));
    this.camera.y = Math.max(0, Math.min(this.worldHeight - viewH, this.camera.y));

    // Update Partikel Ambien
    for (let p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 80) p.x = this.worldWidth - 80;
      if (p.x > this.worldWidth - 80) p.x = 80;
      if (p.y < 80) p.y = this.worldHeight - 80;
      if (p.y > this.worldHeight - 80) p.y = 80;
    }

    // Update Percikan Sparks
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life -= dt;
      if (s.life <= 0) this.sparks.splice(i, 1);
    }
  }

  // Uji tabrakan presisi: Lingkaran vs Kotak AABB
  circleIntersectsAABB(cx, cy, r, rx, ry, rw, rh) {
    const closestX = Math.max(rx, Math.min(cx, rx + rw));
    const closestY = Math.max(ry, Math.min(cy, ry + rh));
    const dx = cx - closestX;
    const dy = cy - closestY;
    return (dx * dx + dy * dy) < (r * r);
  }

  // Deteksi Tabrakan Karakter terhadap Kotak Rintangan, Gerbang, Pintu, & Penghalang
  checkCollision(x, y) {
    const r = this.player.radius;

    // 1. Batas luar dunia dan dinding pembatas masif
    for (let obs of this.obstacles) {
      if (this.circleIntersectsAABB(x, y, r, obs.x, obs.y, obs.w, obs.h)) {
        return true;
      }
    }

    // 2. Gerbang Antar Zona (Gerbang solid jika level belum lulus!)
    for (let gate of this.gates) {
      const isPassed = state.student && state.student.passedLevels.includes(gate.level);
      if (!isPassed) {
        if (this.circleIntersectsAABB(x, y, r, gate.x, gate.y, gate.w, gate.h)) {
          return true;
        }
      }
    }

    // 3. Pintu Berkunci (Solid jika belum dibuka)
    for (let d of this.doors) {
      if (!d.open) {
        if (this.circleIntersectsAABB(x, y, r, d.x, d.y, d.w, d.h)) {
          return true;
        }
      }
    }

    // 4. Pagar Penghalang Sirkuit (Solid jika tombol belum ditekan)
    for (let bar of this.barriers) {
      if (!bar.open) {
        if (this.circleIntersectsAABB(x, y, r, bar.x, bar.y, bar.w, bar.h)) {
          return true;
        }
      }
    }

    return false;
  }

  // Deteksi Tabrakan Batu terhadap Dinding/Rintangan
  checkBoulderCollision(bx, by, boulderId) {
    const r = 22;
    for (let obs of this.obstacles) {
      if (this.circleIntersectsAABB(bx, by, r, obs.x, obs.y, obs.w, obs.h)) {
        return true;
      }
    }
    for (let g of this.gates) {
      if (this.circleIntersectsAABB(bx, by, r, g.x, g.y, g.w, g.h)) {
        return true;
      }
    }
    for (let d of this.doors) {
      if (!d.open && this.circleIntersectsAABB(bx, by, r, d.x, d.y, d.w, d.h)) {
        return true;
      }
    }
    for (let bar of this.barriers) {
      if (!bar.open && this.circleIntersectsAABB(bx, by, r, bar.x, bar.y, bar.w, bar.h)) {
        return true;
      }
    }
    for (let other of this.boulders) {
      if (other.id !== boulderId) {
        if (Math.hypot(bx - other.x, by - other.y) < r + other.radius) {
          return true;
        }
      }
    }
    return false;
  }

  // Zona maksimal yang boleh dikunjungi pemain berdasarkan progres kelulusan level
  getAllowedMaxZone() {
    if (!state.student) return 1;
    const passed = state.student.passedLevels || [];
    if (!Array.isArray(passed) || passed.length === 0) return 1;
    return Math.min(5, Math.max(...passed) + 1);
  }

  // Proteksi Failsafe: Pastikan karakter tidak melanggar batas zona atau terjebak dinding
  enforcePlayerZoneBounds() {
    if (!this.zones || this.zones.length === 0) return;
    const maxZone = this.getAllowedMaxZone();
    const currentZ = this.getZoneByX(this.player.x);

    let isViolation = false;

    // 1. Cek jika berada di zona yang belum terbuka
    if (currentZ > maxZone) {
      isViolation = true;
    }
    // 2. Cek jika koordinat di luar batas peta dunia
    if (this.player.x < 80 || this.player.x > this.worldWidth - 80 ||
        this.player.y < 80 || this.player.y > this.worldHeight - 80) {
      isViolation = true;
    }
    // 3. Cek jika terjebak di dalam dinding solid
    if (this.checkCollision(this.player.x, this.player.y)) {
      isViolation = true;
    }

    if (isViolation) {
      const safeZoneNum = Math.min(maxZone, Math.max(1, currentZ > maxZone ? maxZone : currentZ));
      const safeZone = this.zones.find(z => z.level === safeZoneNum) || this.zones[0];
      this.player.x = safeZone.spawnX;
      this.player.y = safeZone.spawnY;
      if (state.student) {
        state.student.worldPos = { x: safeZone.spawnX, y: safeZone.spawnY };
        state.saveStudent();
      }
      console.warn(`[EDUEST Failsafe] Posisi tidak sah terdeteksi (${Math.round(this.player.x)}, ${Math.round(this.player.y)})! Diteleportasi ke spawn Zona ${safeZoneNum} (${safeZone.spawnX}, ${safeZone.spawnY}).`);
    }
  }

  // ==========================================
  // VALIDASI OTOMATIS PETA (BFS FLOOD-FILL ENGINE)
  // Memastikan setiap zona 100% tertutup penuh, terisolasi saat gerbang tertutup,
  // dan seluruh titik soal/kunci dapat dijangkau karakter tanpa hambatan.
  // ==========================================
  validateMap() {
    const tileSize = 40;
    const cols = Math.floor(this.worldWidth / tileSize); // 150
    const rows = Math.floor(this.worldHeight / tileSize); // 21

    const maxRetries = 10;
    let allZonesValid = false;

    for (let retry = 0; retry < maxRetries; retry++) {
      let hasLeak = false;
      let hasUnreachable = false;

      // Periksa masing-masing Zona 1 - 5
      for (let lvl = 1; lvl <= 5; lvl++) {
        const zone = this.zones.find(z => z.level === lvl);
        if (!zone) continue;

        const minCol = Math.floor(zone.startX / tileSize);
        const maxCol = Math.floor(zone.endX / tileSize) - 1;

        // BFS occupancy: true jika solid (dinding atau gerbang tertutup)
        const isSolid = (c, r) => {
          if (c < 0 || c >= cols || r < 0 || r >= rows) return true;
          const wx = c * tileSize + tileSize / 2;
          const wy = r * tileSize + tileSize / 2;
          const testR = 14;

          for (let obs of this.obstacles) {
            if (this.circleIntersectsAABB(wx, wy, testR, obs.x, obs.y, obs.w, obs.h)) {
              return true;
            }
          }
          // Gerbang disimulasikan tertutup untuk menguji isolasi
          for (let g of this.gates) {
            if (this.circleIntersectsAABB(wx, wy, testR, g.x, g.y, g.w, g.h)) {
              return true;
            }
          }
          return false;
        };

        const startC = Math.max(minCol + 1, Math.min(maxCol - 1, Math.floor(zone.spawnX / tileSize)));
        const startR = Math.max(2, Math.min(rows - 3, Math.floor(zone.spawnY / tileSize)));

        const visited = new Uint8Array(cols * rows);
        const queue = [startC + startR * cols];
        visited[startC + startR * cols] = 1;

        let touchesForbidden = false;
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        let head = 0;

        while (head < queue.length) {
          const curr = queue[head++];
          const cc = curr % cols;
          const cr = Math.floor(curr / cols);

          // Cek apakah BFS menjalar ke luar zona atau ke tepi luar dunia
          if (cc < minCol || cc > maxCol || cr <= 1 || cr >= rows - 2) {
            touchesForbidden = true;
            break;
          }

          for (let d of directions) {
            const nc = cc + d[0];
            const nr = cr + d[1];
            if (nc >= minCol && nc <= maxCol && nr >= 0 && nr < rows) {
              const nIdx = nc + nr * cols;
              if (!visited[nIdx] && !isSolid(nc, nr)) {
                visited[nIdx] = 1;
                queue.push(nIdx);
              }
            } else if (nc < minCol || nc > maxCol || nr <= 1 || nr >= rows - 2) {
              // Jika tetangga di luar batas zona dan tidak solid -> kebocoran terdeteksi!
              if (!isSolid(nc, nr)) {
                touchesForbidden = true;
                break;
              }
            }
          }
          if (touchesForbidden) break;
        }

        // a. Cek Isolasi Penuh
        if (touchesForbidden) {
          hasLeak = true;
          console.warn(`[EDUEST MapValidator] Celah kebocoran terdeteksi di Zona ${lvl}! Menjalankan Auto-Seal...`);
          // Auto-seal dinding pembatas
          const divX = zone.endX;
          this.obstacles.push({
            x: divX - 40,
            y: 0,
            w: 80,
            h: this.worldHeight,
            type: 'divider-wall',
            autoSealed: true
          });
          break; // ulangi validasi
        }

        // b. Cek Keterjangkauan Stasiun Soal
        const zoneStations = this.stations.filter(s => s.level === lvl && !s.isEmptyBoard);
        for (let st of zoneStations) {
          const sc = Math.floor(st.x / tileSize);
          const sr = Math.floor(st.y / tileSize);
          let reachable = false;

          for (let ox = -1; ox <= 1 && !reachable; ox++) {
            for (let oy = -1; oy <= 1 && !reachable; oy++) {
              const checkC = sc + ox;
              const checkR = sr + oy;
              if (checkC >= minCol && checkC <= maxCol && checkR >= 0 && checkR < rows) {
                if (visited[checkC + checkR * cols]) reachable = true;
              }
            }
          }

          if (!reachable) {
            hasUnreachable = true;
            let closest = null;
            let minDist = Infinity;
            for (let c = minCol + 2; c <= maxCol - 2; c++) {
              for (let r = 3; r < rows - 3; r++) {
                if (visited[c + r * cols]) {
                  const dist = Math.hypot(c * tileSize + 20 - st.x, r * tileSize + 20 - st.y);
                  if (dist < minDist) {
                    minDist = dist;
                    closest = { x: c * tileSize + 20, y: r * tileSize + 20 };
                  }
                }
              }
            }
            if (closest) {
              console.warn(`[EDUEST MapValidator] Titik soal ${st.qNumber} (Zona ${lvl}) tidak terjangkau. Menggeser ke (${closest.x}, ${closest.y}).`);
              st.x = closest.x;
              st.y = closest.y;
            }
          }
        }

        // c. Cek Kunci
        for (let k of this.keysList.filter(item => item.zone === lvl)) {
          const kc = Math.floor(k.x / tileSize);
          const kr = Math.floor(k.y / tileSize);
          if (!visited[kc + kr * cols]) {
            console.warn(`[EDUEST MapValidator] Kunci ${k.id} di Zona ${lvl} terisolasi. Menggeser ke dekat spawn.`);
            k.x = zone.spawnX + 60;
            k.y = zone.spawnY;
          }
        }
      }

      if (!hasLeak && !hasUnreachable) {
        allZonesValid = true;
        console.log(`✅ [EDUEST MapValidator] Validasi Peta Berhasil (Iterasi ${retry + 1}): Seluruh 5 Zona 100% Tertutup Penuh dan Terjangkau.`);
        break;
      }
    }

    if (!allZonesValid) {
      console.error(`[EDUEST MapValidator] Batas retry tercapai. Mengaktifkan safe fallback layout.`);
      this.applySafeFallbackLayout();
    }
  }

  // Layout Fallback Default yang Terjamin Tertutup Rapat
  applySafeFallbackLayout() {
    this.buildMapObstacles();
    console.log(`[EDUEST MapValidator] Safe fallback layout berhasil diaktifkan.`);
  }

  // Deteksi Objek yang Sedang Dekat dengan Pemain
  checkNearbyInteractables() {
    const interactRadius = 65;
    let found = null;

    // Cek Stasiun Soal
    for (let st of this.stations) {
      const dist = Math.hypot(this.player.x - st.x, this.player.y - st.y);
      if (dist <= interactRadius) {
        found = { type: 'station', data: st, dist };
        break;
      }
    }

    // Cek Gerbang Antar Zona
    if (!found) {
      for (let gate of this.gates) {
        const isPassed = state.student && state.student.passedLevels.includes(gate.level);
        const dist = Math.hypot(this.player.x - (gate.x + gate.w / 2), this.player.y - (gate.y + gate.h / 2));
        if (dist <= 85) {
          found = { type: 'gate', data: gate, isPassed, dist };
          break;
        }
      }
    }

    this.activeInteractable = found;

    // Tampilkan Prompt Layar Interaktif & Aktifkan Tombol Virtual Aksi
    const promptEl = document.getElementById('world-interact-prompt');
    const promptKey = document.getElementById('world-prompt-key');
    const promptText = document.getElementById('world-prompt-text');
    const actionBtn = document.getElementById('virtual-action-btn');
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia('(pointer: coarse)').matches;

    if (actionBtn) {
      if (found) {
        actionBtn.classList.add('active');
      } else {
        actionBtn.classList.remove('active');
      }
    }

    if (found && promptEl && promptText) {
      if (promptKey) {
        promptKey.textContent = isTouch ? 'Ketuk AKSI' : '[E]';
      }

      if (found.type === 'station') {
        const st = found.data;
        if (st.isEmptyBoard) {
          promptText.textContent = "Baca Papan Informasi";
        } else if (st.status === 'correct') {
          promptText.textContent = `Pratinjau Soal ${st.qNumber} (Selesai ✅)`;
        } else if (st.status === 'wrong') {
          promptText.textContent = `Coba Lagi Soal ${st.qNumber} (Salah ❌)`;
        } else if (st.status === 'blocked') {
          promptText.textContent = `Soal ${st.qNumber} (Terkunci 🔒)`;
        } else {
          promptText.textContent = `Jawab Soal ${st.qNumber} (❓)`;
        }
      } else if (found.type === 'gate') {
        const g = found.data;
        promptText.textContent = found.isPassed ? `${g.name} (Terbuka 🔓)` : `${g.name} (Terkunci 🔒)`;
      }
      promptEl.classList.remove('hidden');
    } else if (promptEl) {
      promptEl.classList.add('hidden');
    }
  }

  updateCompass() {
    // Compass & floating direction widget dinonaktifkan sesuai revisi antarmuka bersih
  }

  // Eksekusi Aksi Interaksi (Tekan E / Spasi / Ketuk AKSI)
  triggerAction() {
    if (!this.activeInteractable || this.isFrozen) return;

    sound.interact();

    if (this.activeInteractable.type === 'station') {
      const st = this.activeInteractable.data;
      if (st.isEmptyBoard) {
        UI.showToast("Papan Informasi: Soal untuk level ini belum tersedia di bank soal. Harap hubungi pengajar.", 'ℹ️');
        return;
      }

      // 1. Jika stasiun berstatus BLOCKED (🔒) karena mode urutan berurutan
      if (st.status === 'blocked') {
        sound.wrong();
        this.shakeScreen();
        UI.showToast("Selesaikan soal sebelumnya dulu secara berurutan! 🔒", '🔒');
        return;
      }

      // 2. Jika stasiun berstatus CORRECT (✅) -> Buka Mode Pratinjau Soal (Bebas penalti & bisa dibaca kapan saja)
      if (st.status === 'correct') {
        GameController.openPreviewModal(st);
        return;
      }

      // 3. Jika stasiun berstatus UNANSWERED (❓) atau WRONG (❌) -> Buka Layar Soal 4 Pilihan
      this.openQuestionModal(st);

    } else if (this.activeInteractable.type === 'gate') {
      const gate = this.activeInteractable.data;
      if (!this.activeInteractable.isPassed) {
        sound.wrong();
        this.shakeScreen();
        UI.showToast(`Gerbang terkunci! Selesaikan semua soal di Zona ${gate.level} hingga tuntas (✅) terlebih dahulu.`, '🔒');
      } else {
        UI.showToast(`Gerbang terbuka! Silakan melangkah maju ke Zona ${gate.level + 1}.`, '🔓');
      }
    }
  }

  shakeScreen() {
    const canvas = document.getElementById('world-canvas');
    if (!canvas) return;
    canvas.classList.remove('shake-anim');
    void canvas.offsetWidth;
    canvas.classList.add('shake-anim');
  }

  // Transisi Saat Memasuki Zona Baru
  onEnterZone(zoneLvl) {
    const zoneData = this.zones.find(z => z.level === zoneLvl);
    if (!zoneData) return;

    sound.gateOpen();
    this.resetBoulders();
    this.updateHUD();
  }

  // Membuka Panel Soal Modal di atas Canvas
  openQuestionModal(station) {
    this.isFrozen = true;
    GameController.launchQuestionFromWorld(station.level, station.index, station.qId, station);
  }

  // Dipanggil setelah soal selesai dijawab dan modal ditutup
  onQuestionCompleted(level, index, wasCorrect) {
    this.isFrozen = false;

    // Buat percikan efek partikel
    const st = this.stations.find(s => s.level === level && s.index === index);
    if (st) {
      this.createSparkBurst(st.x, st.y, wasCorrect ? '#10b981' : '#ef4444');
    }

    if (!wasCorrect) {
      this.player.invulnerableTimer = 1.6;
    }

    // Refresh status stasiun soal
    this.refreshStations();
    this.updateHUD();
  }

  createSparkBurst(x, y, color) {
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      this.sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: 3 + Math.random() * 4,
        life: 0.8
      });
    }
  }

  updateHUD() {
    if (!state.student) return;

    const heartsEl = document.getElementById('world-hud-hearts');
    const pointsEl = document.getElementById('world-hud-points');
    const zoneNameEl = document.getElementById('world-hud-zone-name');
    const zoneIconEl = document.getElementById('world-hud-zone-icon');
    const qCounterEl = document.getElementById('world-hud-q-counter');
    const overallCounterEl = document.getElementById('world-hud-overall-counter');
    const progFill = document.getElementById('world-hud-progress-fill');
    const timedBadge = document.getElementById('world-hud-timed-badge');
    const keysPill = document.getElementById('world-hud-keys');
    const keysCountEl = document.getElementById('world-hud-keys-count');

    // Tampilan Nyawa Baru (Akumulasi tanpa batas maksimal 3)
    if (heartsEl) {
      heartsEl.textContent = state.student.hearts;
    }
    if (pointsEl) pointsEl.textContent = state.student.totalPoints.toLocaleString('id-ID');

    // Tampilan Kunci Dipegang
    const hasKeysInZone = this.keysList && this.keysList.some(k => k.zone === this.currentZoneIndex);
    if (keysPill && keysCountEl) {
      if (hasKeysInZone || this.heldKeys > 0) {
        keysPill.classList.remove('hidden');
        keysCountEl.textContent = this.heldKeys;
      } else {
        keysPill.classList.add('hidden');
      }
    }

    const currentZoneData = this.zones.find(z => z.level === this.currentZoneIndex) || this.zones[0];
    if (zoneNameEl) zoneNameEl.textContent = currentZoneData.fullName;
    if (zoneIconEl) zoneIconEl.textContent = currentZoneData.icon;

    // Indikator speed round: HANYA tampil jika zona saat ini memiliki minimal 1 soal bertimer
    const currentZoneQuestions = (state.content && state.content.questions)
      ? state.content.questions.filter(q => q.level === this.currentZoneIndex)
      : [];
    const hasTimedQuestions = currentZoneQuestions.some(q => getWaktuSoal(q, this.currentZoneIndex) > 0);
    if (timedBadge) {
      if (hasTimedQuestions) {
        timedBadge.textContent = "⏱️ Speed Round";
        timedBadge.classList.remove('hidden');
      } else {
        timedBadge.classList.add('hidden');
      }
    }

    // Progres Soal di Zona Aktif (Hanya selesai jika berstatus CORRECT ✅)
    const currentZoneStations = this.stations.filter(s => s.level === this.currentZoneIndex && !s.isEmptyBoard);
    const correctCount = currentZoneStations.filter(s => s.status === 'correct').length;
    const totalCount = currentZoneStations.length;

    if (qCounterEl) qCounterEl.textContent = `Selesai ${correctCount} / ${totalCount}`;
    if (progFill) progFill.style.width = totalCount > 0 ? `${(correctCount / totalCount) * 100}%` : '0%';
    if (overallCounterEl) overallCounterEl.textContent = `Zona ${this.currentZoneIndex}/5`;
  }

  // RENDER GRAFIS KANVAS
  render() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;

    ctx.clearRect(0, 0, viewW, viewH);

    ctx.save();
    ctx.translate(-Math.round(this.camera.x), -Math.round(this.camera.y));

    // 1. Gambar Tanah dan Jalur 5 Zona
    this.renderZonesBackground(ctx);

    // 2. Gambar Jalur Petualangan Antar Zona
    this.renderAdventurePath(ctx);

    // 3. Gambar Tombol Tekan di Tanah (Pressure Plates)
    this.renderPlates(ctx);

    // 4. Gambar Rintangan, Pintu Berkunci, & Pagar Sirkuit
    this.renderObstacles(ctx);

    // 5. Gambar Kunci Koleksi (Keys)
    this.renderKeys(ctx);

    // 6. Gambar Batu Dorong (Boulders)
    this.renderBoulders(ctx);

    // 7. Gambar Robot Patroli
    this.renderPatrols(ctx);

    // 8. Gambar Gerbang Antar Zona
    this.renderGates(ctx);

    // 9. Gambar Stasiun Soal (4 Status: ❓, ❌, ✅, 🔒)
    this.renderStations(ctx);

    // 10. Gambar Partikel Ambien & Percikan
    this.renderParticles(ctx);

    // 11. Gambar Karakter Pemain
    this.renderPlayer(ctx);

    ctx.restore();
  }

  renderZonesBackground(ctx) {
    const camX = this.camera.x;
    const viewW = window.innerWidth;

    for (let z of this.zones) {
      if (z.endX < camX || z.startX > camX + viewW) continue;

      ctx.fillStyle = z.bgColor;
      ctx.fillRect(z.startX, 0, z.endX - z.startX, this.worldHeight);

      // Grid sirkuit halus
      ctx.strokeStyle = z.circuitColor;
      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 1.5;
      const step = 60;
      for (let x = z.startX; x < z.endX; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.worldHeight);
        ctx.stroke();
      }
      for (let y = 0; y < this.worldHeight; y += step) {
        ctx.beginPath();
        ctx.moveTo(z.startX, y);
        ctx.lineTo(z.endX, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
  }

  renderAdventurePath(ctx) {
    ctx.lineWidth = 64;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let z of this.zones) {
      ctx.strokeStyle = z.pathColor;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      // Masuk tepat dari tengah celah gerbang pada y = 420
      ctx.moveTo(z.startX + 40, 420);
      ctx.bezierCurveTo(z.startX + 300, 340, z.startX + 600, 500, z.startX + 900, 380);
      // Menuju tepat ke tengah celah gerbang keluar pada y = 420
      ctx.lineTo(z.endX - 40, 420);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // Render Tombol Tekan di Lantai (Pressure Plates)
  renderPlates(ctx) {
    for (let p of this.plates) {
      ctx.fillStyle = p.pressed ? '#065f46' : '#0f2b39';
      ctx.fillRect(p.x, p.y, p.w, p.h);

      ctx.strokeStyle = p.pressed ? '#10b981' : '#4a8de8';
      ctx.lineWidth = p.pressed ? 3 : 2;
      ctx.strokeRect(p.x, p.y, p.w, p.h);

      ctx.font = '22px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.pressed ? '🔘' : '⭕', p.x + p.w / 2, p.y + p.h / 2 + 7);
    }
  }

  // Render Kunci Tersebar di Peta
  renderKeys(ctx) {
    const time = performance.now() * 0.005;
    const bounce = Math.sin(time * 3) * 4;

    for (let k of this.keysList) {
      if (k.collected) continue;

      ctx.save();
      ctx.translate(k.x, k.y + bounce);

      // Aura emas
      ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🗝️', 0, 8);
      ctx.restore();
    }
  }

  // Render Batu Dorong
  renderBoulders(ctx) {
    for (let b of this.boulders) {
      ctx.save();
      ctx.translate(b.x, b.y);

      // Bayangan batu
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(0, b.radius - 2, b.radius, b.radius * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Badan batu
      const grad = ctx.createRadialGradient(-6, -6, 4, 0, 0, b.radius);
      grad.addColorStop(0, '#94a3b8');
      grad.addColorStop(1, '#334155');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🪨', 0, 6);

      ctx.restore();
    }
  }

  // Render Robot Patroli
  renderPatrols(ctx) {
    for (let patrol of this.patrols) {
      ctx.save();
      ctx.translate(patrol.x, patrol.y);

      // Bayangan patroli
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.ellipse(0, patrol.radius - 2, patrol.radius * 0.9, patrol.radius * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lingkaran sensor patroli
      ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.beginPath();
      ctx.arc(0, 0, patrol.radius + 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '26px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(patrol.zone === 3 ? '🤖' : (patrol.zone === 4 ? '⚡' : '👾'), 0, 8);

      ctx.restore();
    }
  }

  // Render Gerbang Antar Zona (Gerbang tebal berukuran pas dengan celah pembatas)
  renderGates(ctx) {
    const time = performance.now() * 0.004;

    for (let g of this.gates) {
      const isPassed = state.student && state.student.passedLevels.includes(g.level);
      const postH = 22;

      // 1. Pilar Kokoh di Atas & Bawah Celah Gerbang
      ctx.fillStyle = isPassed ? '#064e3b' : '#334155';
      ctx.fillRect(g.x - 6, g.y - postH, g.w + 12, postH);
      ctx.fillRect(g.x - 6, g.y + g.h, g.w + 12, postH);

      ctx.strokeStyle = isPassed ? '#10b981' : '#64748b';
      ctx.lineWidth = 2;
      ctx.strokeRect(g.x - 6, g.y - postH, g.w + 12, postH);
      ctx.strokeRect(g.x - 6, g.y + g.h, g.w + 12, postH);

      // Lampu Suar Indikator di Tiang
      const blink = Math.sin(time * 3) > 0;
      ctx.fillStyle = isPassed ? (blink ? '#34d399' : '#059669') : (blink ? '#ef4444' : '#991b1b');
      ctx.beginPath();
      ctx.arc(g.x + g.w / 2, g.y - postH / 2, 6, 0, Math.PI * 2);
      ctx.arc(g.x + g.w / 2, g.y + g.h + postH / 2, 6, 0, Math.PI * 2);
      ctx.fill();

      if (isPassed) {
        // GERBANG TERBUKA (Portal Neon Hijau Terbuka Bebas)
        ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
        ctx.fillRect(g.x, g.y, g.w, g.h);

        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.strokeRect(g.x, g.y, g.w, g.h);

        // Panah Berjalan Mengalir ke Kanan
        const arrowOffset = (time * 40) % 24;
        ctx.font = 'bold 20px sans-serif';
        ctx.fillStyle = '#34d399';
        ctx.textAlign = 'center';
        ctx.fillText('⏩', g.x + g.w / 2 + (arrowOffset - 12) * 0.4, g.y + g.h / 2 + 7);

        // Label Status Terbuka
        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = '#a7f3d0';
        ctx.fillText('TERBUKA 🔓', g.x + g.w / 2, g.y + g.h / 2 + 32);

      } else {
        // GERBANG TERTUTUP (Barikade Merah Solid & Rapat)
        ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.fillRect(g.x, g.y, g.w, g.h);

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.strokeRect(g.x, g.y, g.w, g.h);

        // Jeruji Besi Vertikal
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 3;
        for (let bx = g.x + 16; bx < g.x + g.w; bx += 16) {
          ctx.beginPath();
          ctx.moveTo(bx, g.y);
          ctx.lineTo(bx, g.y + g.h);
          ctx.stroke();
        }

        // Garis Barikade Silang Hazard
        ctx.strokeStyle = 'rgba(254, 202, 202, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(g.x, g.y);
        ctx.lineTo(g.x + g.w, g.y + g.h);
        ctx.moveTo(g.x + g.w, g.y);
        ctx.lineTo(g.x, g.y + g.h);
        ctx.stroke();

        // Gembok Raksasa Terkunci Berdenyut
        const lockScale = 1 + Math.sin(time * 2.5) * 0.08;
        ctx.save();
        ctx.translate(g.x + g.w / 2, g.y + g.h / 2 - 4);
        ctx.scale(lockScale, lockScale);
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔒', 0, 10);
        ctx.restore();

        // Label Status Terkunci
        ctx.font = 'bold 10px sans-serif';
        ctx.fillStyle = '#fecaca';
        ctx.textAlign = 'center';
        ctx.fillText('TERKUNCI', g.x + g.w / 2, g.y + g.h / 2 + 34);
      }
    }
  }

  // Render Rintangan Tematik, Dinding Luar, dan Dinding Pembatas Tebal
  renderObstacles(ctx) {
    const camX = this.camera.x;
    const viewW = window.innerWidth;

    for (let obs of this.obstacles) {
      if (obs.x + obs.w < camX || obs.x > camX + viewW) continue;

      // 1. DINDING BATAS LUAR SELURUH DUNIA (OUTER WORLD WALL)
      if (obs.type === 'outer-wall') {
        ctx.fillStyle = '#09081a';
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

        // Garis batas luar berbingkai sirkuit
        ctx.strokeStyle = '#272352';
        ctx.lineWidth = 3;
        ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

        // Garis aksen sirkuit tebal
        ctx.strokeStyle = '#2b6fd1';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.4;
        const step = 40;
        if (obs.w > obs.h) {
          for (let sx = obs.x; sx < obs.x + obs.w; sx += step) {
            ctx.beginPath();
            ctx.moveTo(sx, obs.y);
            ctx.lineTo(sx + 20, obs.y + obs.h);
            ctx.stroke();
          }
        } else {
          for (let sy = obs.y; sy < obs.y + obs.h; sy += step) {
            ctx.beginPath();
            ctx.moveTo(obs.x, sy);
            ctx.lineTo(obs.x + obs.w, sy + 20);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;

      // 2. DINDING PEMBATAS MASIF ANTAR ZONA (THICK THEMED DIVIDER WALLS)
      } else if (obs.type === 'divider-wall') {
        const zIdx = obs.zoneIndex || 1;

        if (zIdx === 1) {
          // Zona 1 & 2: Benteng Kayu Sirkuit & Pepohonan Cyber Rapat
          ctx.fillStyle = '#143823';
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          ctx.strokeStyle = '#15803d';
          ctx.lineWidth = 3;
          ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

          // Tekstur tumpukan balok batu alam
          ctx.fillStyle = '#1e3a1e';
          for (let py = obs.y + 12; py < obs.y + obs.h - 12; py += 32) {
            ctx.fillRect(obs.x + 8, py, obs.w - 16, 20);
            ctx.fillStyle = '#10b981';
            ctx.fillRect(obs.x + 12, py + 8, 4, 4); // daun sirkuit
            ctx.fillStyle = '#1e3a1e';
          }

        } else if (zIdx === 2) {
          // Zona 2 & 3: Dinding Server Rack Masif Bertingkat & Heatsink
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 3;
          ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

          // Panel heatsink bergerigi & deretan LED server
          for (let py = obs.y + 16; py < obs.y + obs.h - 12; py += 28) {
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(obs.x + 8, py, obs.w - 16, 18);
            // LED Server
            ctx.fillStyle = '#10b981';
            ctx.fillRect(obs.x + 16, py + 6, 6, 6);
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(obs.x + 30, py + 6, 6, 6);
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(obs.x + 44, py + 6, 6, 6);
          }

        } else if (zIdx === 3) {
          // Zona 3 & 4: Benteng Kristal Kode Obsidian Ungu
          ctx.fillStyle = '#1e1136';
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 3;
          ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

          // Pola kristal kode rune
          for (let py = obs.y + 20; py < obs.y + obs.h - 20; py += 40) {
            ctx.fillStyle = '#3b1764';
            ctx.beginPath();
            ctx.moveTo(obs.x + obs.w / 2, py - 14);
            ctx.lineTo(obs.x + obs.w - 12, py);
            ctx.lineTo(obs.x + obs.w / 2, py + 14);
            ctx.lineTo(obs.x + 12, py);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

        } else {
          // Zona 4 & 5: Generator Kilat Tesla Voltase Tinggi & Rangka Reaktor
          ctx.fillStyle = '#081a36';
          ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 3;
          ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

          // Kumparan tembaga & simbol bahaya voltase
          for (let py = obs.y + 20; py < obs.y + obs.h - 20; py += 36) {
            ctx.fillStyle = '#b45309';
            ctx.fillRect(obs.x + 10, py, obs.w - 20, 16);
            ctx.fillStyle = '#fbbf24';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('⚡', obs.x + obs.w / 2, py + 13);
          }
        }

      // 3. RINTANGAN TEMATIK DI DALAM ZONA
      } else if (obs.type === 'house') {
        ctx.fillStyle = '#1e1a45';
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        ctx.strokeStyle = '#4a8de8';
        ctx.lineWidth = 3;
        ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

        ctx.fillStyle = '#312b73';
        ctx.beginPath();
        ctx.moveTo(obs.x - 10, obs.y);
        ctx.lineTo(obs.x + obs.w / 2, obs.y - 28);
        ctx.lineTo(obs.x + obs.w + 10, obs.y);
        ctx.closePath();
        ctx.fill();

        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = '#38bdf8';
        ctx.textAlign = 'center';
        ctx.fillText(obs.label || 'IT House', obs.x + obs.w / 2, obs.y + obs.h / 2);

      } else if (obs.type === 'server-rack') {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

        for (let ly = obs.y + 16; ly < obs.y + obs.h - 10; ly += 14) {
          ctx.fillStyle = '#10b981';
          ctx.fillRect(obs.x + 10, ly, 6, 6);
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(obs.x + 22, ly, 6, 6);
        }

      } else if (obs.type === 'crystal') {
        ctx.fillStyle = '#6d28d9';
        ctx.beginPath();
        ctx.moveTo(obs.x + obs.w / 2, obs.y);
        ctx.lineTo(obs.x + obs.w, obs.y + obs.h / 2);
        ctx.lineTo(obs.x + obs.w / 2, obs.y + obs.h);
        ctx.lineTo(obs.x, obs.y + obs.h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 3;
        ctx.stroke();

      } else if (obs.type === 'tesla') {
        ctx.fillStyle = '#0369a1';
        ctx.fillRect(obs.x + obs.w / 2 - 12, obs.y, 24, obs.h);
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(obs.x + obs.w / 2, obs.y, 20, 0, Math.PI * 2);
        ctx.fill();

      } else if (obs.type === 'boss-pillar' || obs.type === 'boss-throne') {
        ctx.fillStyle = '#4c0519';
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 3;
        ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
        if (obs.type === 'boss-throne') {
          ctx.font = '32px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('👑', obs.x + obs.w / 2, obs.y + obs.h / 2 + 10);
        }

      } else {
        ctx.fillStyle = '#14532d';
        ctx.beginPath();
        ctx.arc(obs.x + obs.w / 2, obs.y + obs.h / 2, obs.w / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 4. GARIS FINISH / ALTAR KEMENANGAN MASTER TJKT DI UJUNG ZONA 5
    const finishX = 5780;
    const finishY = 380;
    const finishW = 80;
    const finishH = 80;
    if (finishX + finishW >= camX && finishX <= camX + viewW) {
      ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.fillRect(finishX - 10, finishY - 10, finishW + 20, finishH + 20);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.strokeRect(finishX, finishY, finishW, finishH);

      ctx.font = '38px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏆', finishX + finishW / 2, finishY + finishH / 2 + 12);

      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#fde68a';
      ctx.fillText('FINISH', finishX + finishW / 2, finishY + finishH + 16);
    }

    // 2. Gambar Pintu Berkunci (Doors)
    for (let d of this.doors) {
      if (d.open) {
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(d.x, d.y, d.w, d.h);
        ctx.setLineDash([]);
      } else {
        ctx.fillStyle = '#475569';
        ctx.fillRect(d.x, d.y, d.w, d.h);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(d.x, d.y, d.w, d.h);

        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🚪', d.x + d.w / 2, d.y + d.h / 2);
      }
    }

    // 3. Gambar Pagar Penghalang Sirkuit (Barriers)
    for (let bar of this.barriers) {
      if (bar.open) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(bar.x, bar.y, bar.w, bar.h);
        ctx.setLineDash([]);
      } else {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
        ctx.fillRect(bar.x, bar.y, bar.w, bar.h);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.strokeRect(bar.x, bar.y, bar.w, bar.h);

        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⚡', bar.x + bar.w / 2, bar.y + bar.h / 2);
      }
    }
  }

  // Render 4 Status Stasiun Soal: ❓ (Unanswered), ❌ (Wrong), ✅ (Correct), 🔒 (Blocked)
  renderStations(ctx) {
    const time = performance.now() * 0.004;

    for (let st of this.stations) {
      if (st.isEmptyBoard) {
        ctx.fillStyle = '#92400e';
        ctx.fillRect(st.x - 20, st.y - 20, 40, 40);
        ctx.font = '22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('📋', st.x, st.y + 6);
        continue;
      }

      ctx.save();
      ctx.translate(st.x, st.y);

      // 1. STATUS BENAR (✅ Hijau)
      if (st.status === 'correct') {
        ctx.fillStyle = '#065f46';
        ctx.beginPath();
        ctx.arc(0, 0, 23, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('✅', 0, 6);

        // Label nomor soal
        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = '#a7f3d0';
        ctx.fillText(`Soal ${st.qNumber}`, 0, 34);

      // 2. STATUS SALAH (❌ Merah Menyala - Harus Dikerjakan Ulang)
      } else if (st.status === 'wrong') {
        const pulse = 1 + Math.sin(time * 2.5) * 0.08;

        // Aura merah berdenyut
        ctx.fillStyle = 'rgba(239, 68, 68, 0.28)';
        ctx.beginPath();
        ctx.arc(0, 0, 36 * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#7f1d1d';
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('❌', 0, 6);

        // Panah Ulang Melayang
        const bounce = Math.sin(time * 3) * 6;
        ctx.font = '16px sans-serif';
        ctx.fillText('🔁', 0, -32 + bounce);

        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = '#fca5a5';
        ctx.fillText(`Soal ${st.qNumber}`, 0, 34);

      // 3. STATUS BELUM DIKERJAKAN (❓ Kuning Emas Berkilau)
      } else if (st.status === 'unanswered') {
        const pulse = 1 + Math.sin(time * 2) * 0.08;
        const bounce = Math.sin(time * 3) * 7;

        // Aura cahaya kuning
        ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
        ctx.beginPath();
        ctx.arc(0, 0, 36 * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#b45309';
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(st.qNumber, 0, 6);

        // Panah Melayang
        ctx.font = '22px sans-serif';
        ctx.fillText('❓', 0, -34 + bounce);

        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = '#fde68a';
        ctx.fillText(`Soal ${st.qNumber}`, 0, 34);

      // 4. STATUS TERHALANG / TERKUNCI (🔒 Abu-abu Redup)
      } else {
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔒', 0, 5);

        ctx.font = 'bold 10px sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText(`Soal ${st.qNumber}`, 0, 30);
      }

      ctx.restore();
    }
  }

  renderParticles(ctx) {
    for (let p of this.particles) {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    for (let s of this.sparks) {
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  renderPlayer(ctx) {
    const p = this.player;
    ctx.save();
    ctx.translate(p.x, p.y);

    const bob = p.isMoving ? Math.sin(p.stepTimer) * 4 : 0;
    ctx.translate(0, bob);

    if (p.invulnerableTimer > 0) {
      const flash = Math.floor(performance.now() / 80) % 2 === 0;
      if (flash) ctx.globalAlpha = 0.35;
    }

    const charId = (state.student && state.student.characterId) || 'robo';
    const charData = CHARACTERS.find(c => c.id === charId) || CHARACTERS[0];

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(0, 22 - bob, 18, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = charData.color;
    ctx.beginPath();
    ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    const eyeOffsetX = p.facing === 'left' ? -6 : (p.facing === 'right' ? 6 : 0);
    const eyeOffsetY = p.facing === 'up' ? -6 : (p.facing === 'down' ? 6 : 0);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-5 + eyeOffsetX, -2 + eyeOffsetY, 4, 0, Math.PI * 2);
    ctx.arc(5 + eyeOffsetX, -2 + eyeOffsetY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(-5 + eyeOffsetX * 1.3, -2 + eyeOffsetY * 1.3, 2, 0, Math.PI * 2);
    ctx.arc(5 + eyeOffsetX * 1.3, -2 + eyeOffsetY * 1.3, 2, 0, Math.PI * 2);
    ctx.fill();

    if (charId === 'robo') {
      ctx.strokeStyle = charData.accent;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -p.radius);
      ctx.lineTo(0, -p.radius - 8);
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(0, -p.radius - 9, 3.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (charId === 'fox' || charId === 'cat') {
      ctx.fillStyle = charData.color;
      ctx.beginPath();
      ctx.moveTo(-12, -14);
      ctx.lineTo(-6, -26);
      ctx.lineTo(0, -16);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(12, -14);
      ctx.lineTo(6, -26);
      ctx.lineTo(0, -16);
      ctx.fill();
    } else if (charId === 'mage') {
      ctx.fillStyle = '#581c87';
      ctx.beginPath();
      ctx.moveTo(-16, -14);
      ctx.lineTo(0, -32);
      ctx.lineTo(16, -14);
      ctx.closePath();
      ctx.fill();
    } else if (charId === 'ninja') {
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-16, -8, 32, 5);
    }

    const studentName = (state.student && state.student.nama) || 'Petualang';
    ctx.font = 'bold 12px var(--font-family)';
    ctx.textAlign = 'center';

    ctx.fillStyle = 'rgba(15, 12, 38, 0.85)';
    const textW = ctx.measureText(studentName).width;
    ctx.fillRect(-textW / 2 - 8, -p.radius - 24, textW + 16, 18);
    ctx.strokeStyle = charData.color;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-textW / 2 - 8, -p.radius - 24, textW + 16, 18);

    ctx.fillStyle = '#ffffff';
    ctx.fillText(studentName, 0, -p.radius - 11);

    ctx.restore();
  }

  // RENDER PETA MINI (MINIMAP) - Menampilkan 5 Ruangan Tertutup Penuh & Celah Gerbang
  renderMinimap() {
    if (!this.minimapCanvas || !this.minimapCtx) return;
    const mCtx = this.minimapCtx;
    const mW = this.minimapCanvas.width;
    const mH = this.minimapCanvas.height;

    mCtx.clearRect(0, 0, mW, mH);

    const scaleX = mW / this.worldWidth;
    const scaleY = mH / this.worldHeight;

    // 1. Gambar Tanah 5 Zona
    for (let z of this.zones) {
      mCtx.fillStyle = z.bgColor;
      mCtx.fillRect(z.startX * scaleX, 0, (z.endX - z.startX) * scaleX, mH);
    }

    // 2. Gambar Batas Dinding Luar Dunia (Keliling Tebal)
    mCtx.fillStyle = '#0f172a';
    // Dinding Atas & Bawah
    mCtx.fillRect(0, 0, mW, 80 * scaleY);
    mCtx.fillRect(0, mH - 80 * scaleY, mW, 80 * scaleY);
    // Dinding Kiri & Kanan
    mCtx.fillRect(0, 0, 80 * scaleX, mH);
    mCtx.fillRect(mW - 80 * scaleX, 0, 80 * scaleX, mH);

    // 3. Gambar Dinding Pembatas Tebal Antar Zona (Tampak Ruangan Tertutup Penuh)
    const dividerXList = [1200, 2400, 3600, 4800];
    const gateTopY = 360;
    const gateBottomY = 480;

    for (let divX of dividerXList) {
      const dwX = (divX - 40) * scaleX;
      const dwW = 80 * scaleX;

      // Dinding Pembatas Atas (y: 0 -> 360)
      mCtx.fillStyle = '#334155';
      mCtx.fillRect(dwX, 0, dwW, gateTopY * scaleY);

      // Dinding Pembatas Bawah (y: 480 -> 840)
      mCtx.fillRect(dwX, gateBottomY * scaleY, dwW, (this.worldHeight - gateBottomY) * scaleY);

      // Garis kontur pembatas
      mCtx.strokeStyle = '#64748b';
      mCtx.lineWidth = 1;
      mCtx.strokeRect(dwX, 0, dwW, gateTopY * scaleY);
      mCtx.strokeRect(dwX, gateBottomY * scaleY, dwW, (this.worldHeight - gateBottomY) * scaleY);
    }

    // 4. Gambar Celah Gerbang Antar Zona (Merah = Terkunci, Hijau = Terbuka)
    for (let g of this.gates) {
      const isPassed = state.student && state.student.passedLevels.includes(g.level);
      const gwX = g.x * scaleX;
      const gwW = g.w * scaleX;
      const gwY = g.y * scaleY;
      const gwH = g.h * scaleY;

      mCtx.fillStyle = isPassed ? '#10b981' : '#ef4444';
      mCtx.fillRect(gwX, gwY, gwW, gwH);

      mCtx.strokeStyle = isPassed ? '#34d399' : '#fca5a5';
      mCtx.lineWidth = 1;
      mCtx.strokeRect(gwX, gwY, gwW, gwH);
    }

    // 5. Gambar Altar Finish di Zona 5
    mCtx.fillStyle = '#fbbf24';
    mCtx.fillRect(5780 * scaleX, 380 * scaleY, 60 * scaleX, 60 * scaleY);

    // 6. Gambar Stasiun Soal dengan 4 Warna di Minimap
    for (let st of this.stations) {
      if (st.isEmptyBoard) continue;
      if (st.status === 'correct') {
        mCtx.fillStyle = '#10b981'; // Hijau
      } else if (st.status === 'wrong') {
        mCtx.fillStyle = '#ef4444'; // Merah
      } else if (st.status === 'unanswered') {
        mCtx.fillStyle = '#fbbf24'; // Kuning
      } else {
        mCtx.fillStyle = '#64748b'; // Abu-abu
      }

      mCtx.beginPath();
      mCtx.arc(st.x * scaleX, st.y * scaleY, 2.5, 0, Math.PI * 2);
      mCtx.fill();
    }

    // 7. Gambar Titik Pemain (Biru Cerah dengan Ring Putih)
    mCtx.fillStyle = '#38bdf8';
    mCtx.beginPath();
    mCtx.arc(this.player.x * scaleX, this.player.y * scaleY, 4, 0, Math.PI * 2);
    mCtx.fill();
    mCtx.strokeStyle = '#ffffff';
    mCtx.lineWidth = 1.2;
    mCtx.stroke();
  }

  // Buka / Tutup Peta Mini dengan Penyimpanan Preferensi
  toggleMinimap(forceState) {
    const card = document.getElementById('world-minimap-card') || document.getElementById('world-minimap-container');
    if (!card) return;

    let shouldShow;
    if (typeof forceState === 'boolean') {
      shouldShow = forceState;
    } else {
      shouldShow = card.classList.contains('hidden');
    }

    if (shouldShow) {
      card.classList.remove('hidden');
      this.renderMinimap();
    } else {
      card.classList.add('hidden');
    }

    try {
      localStorage.setItem('eduest_minimap_open', shouldShow ? 'true' : 'false');
    } catch (e) {}
  }

  // Inisialisasi Tampilan Peta Mini Saat Memulai Dunia
  initMinimapPreference() {
    const card = document.getElementById('world-minimap-card') || document.getElementById('world-minimap-container');
    if (!card) return;

    const savedPref = localStorage.getItem('eduest_minimap_open');
    if (savedPref === 'true' || (savedPref === null && window.innerWidth >= 1100)) {
      this.toggleMinimap(true);
    } else {
      this.toggleMinimap(false);
    }
  }
}

const world = new World2DEngine();

// ==========================================
// GAME CONTROLLER (GIMKIT STYLE LOGIC - SISTEM NYAWA & SOAL BARU)
// ==========================================
const GameController = {
  activeSession: null,
  currentQuestion: null,
  shuffledOptions: [],
  timerRemaining: 0,
  timerInterval: null,
  isAnsweringAllowed: true,

  // Membuka kuis saat karakter berinteraksi dengan stasiun soal di dunia 2D
  launchQuestionFromWorld(levelNum, stationIndex, questionId, stationObj = null) {
    const qData = state.content.questions.find(q => q.id === questionId);
    if (!qData) {
      UI.showToast("Data soal tidak ditemukan!", '⚠️');
      world.isFrozen = false;
      return;
    }

    const cfg = state.content.levelConfigs[levelNum] || { targetQuestions: 5, timerSec: 0, title: `Level ${levelNum}` };
    const currentZoneStations = world.stations.filter(s => s.level === levelNum && !s.isEmptyBoard);
    const station = stationObj || world.stations.find(s => s.level === levelNum && s.index === stationIndex);

    this.activeSession = {
      levelNum,
      stationIndex,
      totalStations: currentZoneStations.length,
      config: cfg,
      questionData: qData,
      station: station
    };

    // Buka Modal Soal di atas dunia
    const modalQuiz = document.getElementById('modal-quiz-panel');
    if (modalQuiz) modalQuiz.classList.remove('hidden');

    this.loadQuestionData(qData);
  },

  loadQuestionData(qData) {
    this.isAnsweringAllowed = true;
    this.currentQuestion = qData;

    // HUD Header Soal
    const lvlBadge = document.getElementById('quiz-level-label');
    const qNumEl = document.getElementById('quiz-question-num');
    const progFill = document.getElementById('quiz-progress-fill');
    const scoreEl = document.getElementById('quiz-score-display');

    const curIndex = this.activeSession.stationIndex;
    const totalQ = this.activeSession.totalStations;

    if (lvlBadge) lvlBadge.textContent = this.activeSession.config.title;
    if (qNumEl) qNumEl.textContent = `Titik Soal ${curIndex + 1} / ${totalQ}`;
    if (progFill) progFill.style.width = `${((curIndex) / totalQ) * 100}%`;
    if (scoreEl) scoreEl.textContent = `⭐ ${state.student.totalPoints}`;

    this.renderHeartsHUD();

    // Teks Pertanyaan
    const qTextEl = document.getElementById('quiz-question-text');
    if (qTextEl) qTextEl.textContent = qData.pertanyaan;

    // Acak Urutan 4 Pilihan Jawaban
    const originalOptions = qData.opsi.map((opt, origIdx) => ({
      text: opt,
      originalIndex: origIdx
    }));
    this.shuffledOptions = originalOptions.sort(() => 0.5 - Math.random());

    for (let i = 0; i < 4; i++) {
      const optTextEl = document.getElementById(`opt-text-${i}`);
      const btn = document.querySelector(`.quiz-btn[data-index="${i}"]`);
      if (optTextEl && btn) {
        if (this.shuffledOptions[i]) {
          optTextEl.textContent = this.shuffledOptions[i].text;
          btn.style.display = 'flex';
        } else {
          btn.style.display = 'none';
        }
      }
    }

    // Single Source of Truth Timer Soal
    const timerSec = getWaktuSoal(qData, this.activeSession.levelNum);
    this.activeQuestionTimerSec = timerSec;
    this.stopTimer();

    // Gambar Soal Opsional: Hanya muncul jika ada, tanpa border rusak jika kosong/gagal
    const imgWrap = document.getElementById('quiz-image-wrap');
    if (imgWrap) {
      imgWrap.innerHTML = '';
      imgWrap.classList.add('hidden');
    }

    const startTimerCallback = () => {
      this.startQuestionTimer(timerSec);
    };

    if (qData.gambar && qData.gambar.trim() !== '' && imgWrap) {
      resolveImageSrc(qData.gambar).then(resolvedSrc => {
        if (!resolvedSrc) {
          startTimerCallback();
          return;
        }

        const img = document.createElement('img');
        img.className = 'quiz-question-img';
        img.alt = 'Ilustrasi Soal';

        const zoomBtn = document.createElement('button');
        zoomBtn.type = 'button';
        zoomBtn.className = 'btn-zoom-img';
        zoomBtn.innerHTML = '🔍 Perbesar';
        zoomBtn.onclick = (e) => {
          e.stopPropagation();
          UI.openLightbox(resolvedSrc);
        };

        let timerStarted = false;
        const triggerTimerOnce = (isValid) => {
          if (timerStarted) return;
          timerStarted = true;
          if (isValid) {
            imgWrap.classList.remove('hidden');
          } else {
            imgWrap.innerHTML = '';
            imgWrap.classList.add('hidden');
          }
          startTimerCallback();
        };

        img.onload = () => triggerTimerOnce(true);
        img.onerror = () => triggerTimerOnce(false);
        img.src = resolvedSrc;

        imgWrap.appendChild(img);
        imgWrap.appendChild(zoomBtn);
      }).catch(() => {
        startTimerCallback();
      });
    } else {
      startTimerCallback();
    }
  },

  startQuestionTimer(timerSec) {
    this.stopTimer();
    const timerContainer = document.getElementById('quiz-timer-container');

    if (timerSec > 0) {
      if (timerContainer) timerContainer.classList.remove('hidden');
      this.timerRemaining = timerSec;
      this.timerEndTime = Date.now() + timerSec * 1000;
      this.updateTimerDisplay(timerSec, timerSec);

      this.timerInterval = setInterval(() => {
        if (document.hidden) {
          this.timerEndTime += 1000;
          return;
        }

        const now = Date.now();
        const diffMs = this.timerEndTime - now;
        this.timerRemaining = Math.max(0, Math.ceil(diffMs / 1000));
        this.updateTimerDisplay(this.timerRemaining, timerSec);

        if (this.timerRemaining <= 4 && this.timerRemaining > 0) {
          sound.tick();
        }

        if (this.timerRemaining <= 0) {
          this.handleTimeout();
        }
      }, 250);
    } else {
      if (timerContainer) timerContainer.classList.add('hidden');
    }
  },

  updateTimerDisplay(current, total) {
    const textEl = document.getElementById('quiz-timer-countdown');
    const barEl = document.getElementById('quiz-timer-bar-fill');
    const container = document.getElementById('quiz-timer-container');

    if (textEl) textEl.textContent = `${current}s`;
    if (barEl) {
      const pct = Math.max(0, (current / total) * 100);
      barEl.style.width = `${pct}%`;
    }

    if (container) {
      // Warna merah/peringatan HANYA pada detik <= 5
      if (current <= 5) {
        container.classList.add('urgent');
      } else {
        container.classList.remove('urgent');
      }
    }
  },

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    const container = document.getElementById('quiz-timer-container');
    if (container) container.classList.remove('urgent');
  },

  // Tampilan Nyawa HUD di Layar Soal (Mendukung nyawa terakumulasi > 5)
  renderHeartsHUD() {
    const container = document.getElementById('quiz-hearts-display');
    if (!container || !state.student) return;

    const hearts = state.student.hearts;
    if (hearts <= 0) {
      container.innerHTML = '<span class="heart-icon lost">💔 0</span>';
    } else if (hearts <= 5) {
      let html = '';
      for (let h = 1; h <= hearts; h++) {
        html += '<span class="heart-icon">❤️</span>';
      }
      container.innerHTML = html;
    } else {
      container.innerHTML = `<span class="heart-icon">❤️</span> <span style="font-weight:900;font-size:1.1rem;color:#f87171;">x${hearts}</span>`;
    }
  },

  chooseAnswer(displayIndex) {
    if (!this.isAnsweringAllowed || !this.currentQuestion) return;
    this.isAnsweringAllowed = false;
    this.stopTimer();

    const chosenOption = this.shuffledOptions[displayIndex];
    const isCorrect = (chosenOption.originalIndex === this.currentQuestion.kunci);

    if (isCorrect) {
      this.handleCorrectAnswer();
    } else {
      this.handleWrongAnswer(false);
    }
  },

  handleTimeout() {
    if (!this.isAnsweringAllowed) return;
    this.isAnsweringAllowed = false;
    this.stopTimer();
    this.handleWrongAnswer(true);
  },

  // JAWABAN BENAR: +100 poin (atau +50 jika sebelumnya pernah salah pada soal ini)
  handleCorrectAnswer() {
    sound.correct();

    const station = this.activeSession.station;
    const isRetry = station && (station.mistakes > 0);
    let points = isRetry ? 50 : 100;

    // Bonus kecepatan jika soal bertimer
    if (this.activeQuestionTimerSec > 0 && this.timerRemaining > 0) {
      points += Math.min(50, this.timerRemaining * 3);
    }

    // Tandai status stasiun menjadi CORRECT (✅)
    if (station) {
      station.status = 'correct';
    }

    const lvl = this.activeSession.levelNum;
    const session = state.student.zoneProgress[lvl];
    if (session) {
      session.earnedScore = (session.earnedScore || 0) + points;
      if (session.stations && session.stations[this.activeSession.stationIndex]) {
        session.stations[this.activeSession.stationIndex].status = 'correct';
      }
    }
    state.student.totalPoints += points;
    state.saveStudent();
    state.syncLeaderboardEntry();

    this.renderPanelHasil('correct', {
      pointsGain: points,
      isTimeout: false
    });
  },

  // JAWABAN SALAH: Nyawa -1, status stasiun jadi SALAH (❌), dan wajib diulang!
  handleWrongAnswer(isTimeout = false) {
    sound.wrong();
    sound.heartLost();

    const station = this.activeSession.station;
    if (station) {
      station.mistakes = (station.mistakes || 0) + 1;
      station.status = 'wrong'; // Status ❌
    }

    const lvl = this.activeSession.levelNum;
    const session = state.student.zoneProgress[lvl];
    if (session) {
      session.mistakes = (session.mistakes || 0) + 1;
      if (session.stations && session.stations[this.activeSession.stationIndex]) {
        session.stations[this.activeSession.stationIndex].mistakes = (session.stations[this.activeSession.stationIndex].mistakes || 0) + 1;
        session.stations[this.activeSession.stationIndex].status = 'wrong';
      }
    }

    // Pengurangan Nyawa: Setiap percobaan salah / waktu habis = nyawa -1
    state.student.hearts = Math.max(0, state.student.hearts - 1);
    state.saveStudent();

    this.renderHeartsHUD();
    world.updateHUD();

    // Cek apakah nyawa habis (GAME OVER)
    if (state.student.hearts <= 0) {
      this.triggerGameOver();
      return;
    }

    // Buka panel hasil salah (TANPA KUNCI & TANPA PEMBAHASAN)
    this.renderPanelHasil(isTimeout ? 'timeout' : 'wrong', {
      pointsGain: 0,
      isTimeout: isTimeout
    });
  },

  // RENDER SATU PANEL HASIL (BERSIHKAN SELURUH ELEMEN SEBELUM MERENDER SESUAI STATUS)
  renderPanelHasil(status, { pointsGain = 0, isTimeout = false } = {}) {
    const modal = document.getElementById('modal-feedback');
    const card = document.getElementById('feedback-card');
    if (!modal || !card) return;

    // Bersihkan seluruh isi DOM panel hasil
    card.innerHTML = '';

    if (status === 'correct') {
      card.className = 'feedback-card correct';
      const expText = (this.currentQuestion && this.currentQuestion.pembahasan)
        ? escapeHtml(this.currentQuestion.pembahasan)
        : 'Pembahasan materi untuk soal ini.';

      card.innerHTML = `
        <div class="feedback-header">
          <div class="feedback-icon">🎉</div>
          <div class="feedback-title-group">
            <h3 class="feedback-status-title">Benar Sekali! 🎉</h3>
            <div class="feedback-score-gain">+${pointsGain} Poin</div>
          </div>
        </div>
        <div class="feedback-explanation-box">
          <div class="exp-title">
            <span>📖 Pembahasan Materi:</span>
          </div>
          <div class="exp-content">${expText}</div>
        </div>
        <div class="feedback-actions">
          <button id="btn-feedback-continue" class="btn btn-primary btn-3d btn-lg btn-block">
            Lanjut Berpetualang ➡️
          </button>
        </div>
      `;

      const btnContinue = card.querySelector('#btn-feedback-continue');
      if (btnContinue) {
        btnContinue.addEventListener('click', () => {
          sound.click();
          this.continueAfterFeedback();
        });
      }

    } else {
      card.className = 'feedback-card wrong';
      const titleText = isTimeout ? 'Waktu Habis! ❌' : 'Jawaban Salah ❌';
      const iconChar = isTimeout ? '⏰' : '❌';

      card.innerHTML = `
        <div class="feedback-header">
          <div class="feedback-icon">${iconChar}</div>
          <div class="feedback-title-group">
            <h3 class="feedback-status-title">${titleText}</h3>
            <div class="feedback-score-gain" style="color: #f87171;">Nyawa berkurang 1 ❤️ (-1)</div>
          </div>
        </div>
        <div class="feedback-wrong-notice">
          <p>Jawaban kamu belum tepat! ❌ Titik soal ini ditandai merah.</p>
          <p class="feedback-wrong-sub">Kamu dapat mencoba menjawabnya lagi sekarang atau menjelajahi soal lain di zona ini terlebih dahulu.</p>
        </div>
        <div class="feedback-actions-split">
          <button id="btn-feedback-retry" class="btn btn-primary btn-3d btn-lg">
            🔁 Coba Lagi Sekarang
          </button>
          <button id="btn-feedback-other" class="btn btn-secondary btn-3d btn-lg">
            🗺️ Kerjakan Soal Lain Dulu
          </button>
        </div>
      `;

      const btnRetry = card.querySelector('#btn-feedback-retry');
      const btnOther = card.querySelector('#btn-feedback-other');

      if (btnRetry) {
        btnRetry.addEventListener('click', () => {
          sound.click();
          this.retryQuestionImmediately();
        });
      }
      if (btnOther) {
        btnOther.addEventListener('click', () => {
          sound.click();
          this.leaveQuestionForLater();
        });
      }
    }

    modal.classList.remove('hidden');
  },

  showFeedbackModal(options) {
    if (options.isCorrect) {
      this.renderPanelHasil('correct', { pointsGain: options.pointsGain });
    } else {
      this.renderPanelHasil(options.isTimeout ? 'timeout' : 'wrong', { isTimeout: options.isTimeout });
    }
  },

  // Tombol: 🔁 Coba Lagi Sekarang (Setelah Jawaban Salah)
  retryQuestionImmediately() {
    const modal = document.getElementById('modal-feedback');
    if (modal) modal.classList.add('hidden');

    // Langsung buka kembali soal yang sama dengan pilihan diacak ulang
    if (this.currentQuestion) {
      this.loadQuestionData(this.currentQuestion);
    }
  },

  // Tombol: 🗺️ Kerjakan Soal Lain Dulu (Setelah Jawaban Salah)
  leaveQuestionForLater() {
    const modal = document.getElementById('modal-feedback');
    const modalQuiz = document.getElementById('modal-quiz-panel');
    if (modal) modal.classList.add('hidden');
    if (modalQuiz) modalQuiz.classList.add('hidden');

    // Kembalikan siswa ke petualangan dunia; stasiun ditandai merah (❌)
    world.isFrozen = false;
    world.refreshStations();
    world.updateHUD();
    UI.showToast("Titik soal ditandai ❌. Kamu bisa kembali mengerjakannya nanti!", '🗺️');
  },

  // Tombol: Lanjut Berpetualang (Setelah Jawaban Benar)
  continueAfterFeedback() {
    const modal = document.getElementById('modal-feedback');
    const modalQuiz = document.getElementById('modal-quiz-panel');
    if (modal) modal.classList.add('hidden');
    if (modalQuiz) modalQuiz.classList.add('hidden');

    const lvl = this.activeSession.levelNum;
    world.onQuestionCompleted(lvl, this.activeSession.stationIndex, true);

    // CEK KELULUSAN ZONA: Zona HANYA lulus jika SEMUA titik soal berstatus CORRECT (✅)!
    const currentZoneStations = world.stations.filter(s => s.level === lvl && !s.isEmptyBoard);
    const allCompleted = currentZoneStations.length > 0 && currentZoneStations.every(s => s.status === 'correct');

    if (allCompleted) {
      this.finishZone(lvl);
    }
  },

  // MODE PRATINJAU SOAL TERJAWAB (✅ Preview Mode)
  openPreviewModal(station) {
    const qData = state.content.questions.find(q => q.id === station.qId);
    if (!qData) return;

    const modal = document.getElementById('modal-preview-question');
    const qText = document.getElementById('preview-question-text');
    const optList = document.getElementById('preview-options-list');
    const expText = document.getElementById('preview-explanation-text');

    if (!modal) return;

    world.isFrozen = true;
    if (qText) qText.textContent = qData.pertanyaan;

    const optLabels = ['A', 'B', 'C', 'D'];
    if (optList) {
      optList.innerHTML = '';
      qData.opsi.forEach((opt, idx) => {
        const item = document.createElement('div');
        const isKey = (idx === qData.kunci);
        item.className = `preview-opt-item ${isKey ? 'is-correct' : ''}`;
        item.innerHTML = `
          <span><strong>${optLabels[idx]}.</strong> ${escapeHtml(opt)}</span>
          ${isKey ? '<span class="preview-opt-badge">Jawaban Benar ✅</span>' : ''}
        `;
        optList.appendChild(item);
      });
    }

    if (expText) expText.textContent = qData.pembahasan || 'Pembahasan materi untuk soal ini.';
    modal.classList.remove('hidden');
  },

  closePreviewModal() {
    const modal = document.getElementById('modal-preview-question');
    if (modal) modal.classList.add('hidden');
    world.isFrozen = false;
  },

  // Tutup kuis saat kembali ke beranda tanpa penalti
  closeModalsWithoutPenalty() {
    this.stopTimer();
    const modalQuiz = document.getElementById('modal-quiz-panel');
    const modalFeedback = document.getElementById('modal-feedback');
    const modalPreview = document.getElementById('modal-preview-question');
    const modalGameOver = document.getElementById('modal-game-over');

    if (modalQuiz) modalQuiz.classList.add('hidden');
    if (modalFeedback) modalFeedback.classList.add('hidden');
    if (modalPreview) modalPreview.classList.add('hidden');
    if (modalGameOver) modalGameOver.classList.add('hidden');

    world.isFrozen = false;
  },

  // GAME OVER (NYAWA HABIS = 0)
  triggerGameOver() {
    sound.gameOver();
    this.stopTimer();

    const modalQuiz = document.getElementById('modal-quiz-panel');
    const modalFeedback = document.getElementById('modal-feedback');
    if (modalQuiz) modalQuiz.classList.add('hidden');
    if (modalFeedback) modalFeedback.classList.add('hidden');

    const modal = document.getElementById('modal-game-over');
    if (modal) modal.classList.remove('hidden');
  },

  // Ulangi Level saat Game Over (ATURAN REVISI: Nyawa kembali menjadi 3 ❤️, TIDAK dipulihkan ke akumulasi bonus lama)
  retryCurrentLevel() {
    const modal = document.getElementById('modal-game-over');
    if (modal) modal.classList.add('hidden');

    const lvl = world.currentZoneIndex;

    // Konstanta: NYAWA_RESET_GAME_OVER = 3
    state.student.hearts = NYAWA_RESET_GAME_OVER;

    // Reset progres soal pada zona yang sedang dimainkan (semua stasiun kembali ❓)
    const cfg = state.content.levelConfigs[lvl] || { targetQuestions: 5 };
    const allQ = state.content.questions.filter(q => q.level === lvl);
    const shuffled = [...allQ].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(cfg.targetQuestions, shuffled.length));

    // Reset stasiun di zona ini
    delete state.student.zoneProgress[lvl];

    // Kembalikan karakter ke titik awal zona saat ini
    const zoneData = world.zones.find(z => z.level === lvl);
    if (zoneData) {
      world.player.x = zoneData.spawnX;
      world.player.y = zoneData.spawnY;
      state.student.worldPos = { x: zoneData.spawnX, y: zoneData.spawnY };
    }

    // Reset rintangan & kunci di zona ini
    world.resetBoulders();
    world.heldKeys = 0;
    if (world.keysList) {
      world.keysList.filter(k => k.zone === lvl).forEach(k => k.collected = false);
    }
    const obstaclesEnabled = !state.content || !state.content.gameplaySettings || state.content.gameplaySettings.obstacles !== 'disabled';
    if (world.doors) {
      world.doors.filter(d => d.zone === lvl).forEach(d => d.open = !obstaclesEnabled);
    }

    state.saveStudent();
    world.refreshStations();
    world.updateHUD(); // HUD langsung menampilkan 3 nyawa!
    world.isFrozen = false;

    UI.showToast(`Nyawa habis! 💔 Kamu mulai lagi Zona ${lvl} dengan 3 nyawa.`, '🔄');
  },

  // LULUS SATU ZONA (Semua stasiun ✅)
  finishZone(lvl) {
    const session = state.student.zoneProgress[lvl] || {};
    const totalMistakes = session.mistakes || 0;
    const isPerfect = (totalMistakes === 0);

    // Evaluasi Bintang
    let stars = 1;
    if (totalMistakes === 0) stars = 3;
    else if (totalMistakes <= 2) stars = 2;

    // Bonus SEMPURNA (+200 poin, TIDAK mengubah nyawa)
    let perfectBonus = 0;
    if (isPerfect) {
      perfectBonus = 200;
      session.earnedScore = (session.earnedScore || 0) + perfectBonus;
      state.student.totalPoints += perfectBonus;
      sound.perfect();
    } else {
      sound.correct();
    }

    // SISTEM NYAWA BARU: Bonus +3 nyawa terakumulasi HANYA SEKALI saat pertama kali level lulus
    let gotLifeBonus = false;
    if (lvl <= 4 && !state.student.bonusLevelsGiven.includes(lvl)) {
      state.student.hearts += BONUS_NYAWA_NAIK_LEVEL;
      state.student.bonusLevelsGiven.push(lvl);
      gotLifeBonus = true;
    }

    // Catat kelulusan level
    if (!state.student.passedLevels.includes(lvl)) {
      state.student.passedLevels.push(lvl);
    }

    // Simpan bintang & skor tertinggi
    const oldStars = state.student.stars[lvl] || 0;
    if (stars > oldStars) state.student.stars[lvl] = stars;

    const oldScore = state.student.levelScores[lvl] || 0;
    if (session.earnedScore > oldScore) state.student.levelScores[lvl] = session.earnedScore;

    state.saveStudent();
    state.syncLeaderboardEntry();

    confetti.burst(130);
    world.refreshStations();
    world.updateHUD();

    // Buka Layar Hasil Level
    this.showLevelResultModal(lvl, isPerfect, stars, session, gotLifeBonus);
  },

  showLevelResultModal(lvl, isPerfect, stars, session, gotLifeBonus = false) {
    const modal = document.getElementById('modal-level-result');
    if (!modal) return;

    world.isFrozen = true;

    const titleEl = document.getElementById('result-level-title');
    const badgeEl = document.getElementById('result-badge-status');
    const starsContainer = document.getElementById('result-stars-container');
    const perfectBanner = document.getElementById('result-perfect-banner');
    const lifeBonusBanner = document.getElementById('result-life-bonus-banner');
    const accEl = document.getElementById('res-stat-accuracy');
    const heartsEl = document.getElementById('res-stat-hearts');
    const lvlScoreEl = document.getElementById('res-stat-level-score');
    const totalScoreEl = document.getElementById('res-stat-total-score');
    const walkBtn = document.getElementById('btn-result-continue-walk');

    if (titleEl) titleEl.textContent = `Zona ${lvl} Tuntas!`;
    if (badgeEl) badgeEl.textContent = lvl === 5 ? '👑 BOSS DEFEATED!' : 'ZONA LULUS! 🎉';

    if (starsContainer) {
      starsContainer.innerHTML = '';
      for (let s = 1; s <= 3; s++) {
        const star = document.createElement('span');
        star.className = `star-item ${s > stars ? 'star-empty' : ''}`;
        star.textContent = '⭐';
        starsContainer.appendChild(star);
      }
    }

    // Banner Bonus Nyawa +3 (Hanya tampil saat level pertama kali lulus)
    if (lifeBonusBanner) {
      if (gotLifeBonus) lifeBonusBanner.classList.remove('hidden');
      else lifeBonusBanner.classList.add('hidden');
    }

    // Banner Sempurna (+200 poin)
    if (perfectBanner) {
      if (isPerfect) perfectBanner.classList.remove('hidden');
      else perfectBanner.classList.add('hidden');
    }

    const currentZoneStations = world.stations.filter(s => s.level === lvl && !s.isEmptyBoard);
    const correctCount = currentZoneStations.filter(s => s.status === 'correct').length;
    if (accEl) accEl.textContent = `${correctCount}/${currentZoneStations.length}`;
    if (heartsEl) heartsEl.textContent = String(state.student.hearts);
    UI.countUp(lvlScoreEl, session.earnedScore || 0, '+');
    UI.countUp(totalScoreEl, state.student.totalPoints);

    if (walkBtn) {
      if (lvl >= 5) {
        walkBtn.textContent = '🏆 Tamatkan Permainan';
        walkBtn.onclick = () => {
          modal.classList.add('hidden');
          this.showFinalVictory();
        };
      } else {
        walkBtn.textContent = '🚶 Lanjut Berjalan di Dunia ➡️';
        walkBtn.onclick = () => {
          modal.classList.add('hidden');
          world.isFrozen = false;
          UI.showToast(`Gerbang Zona ${lvl + 1} kini telah terbuka! Melangkahlah ke depan.`, '🔓');
        };
      }
    }

    modal.classList.remove('hidden');
  },

  showFinalVictory() {
    const modal = document.getElementById('modal-victory-final');
    if (!modal) return;

    sound.perfect();
    confetti.burst(160);

    const nameEl = document.getElementById('victory-student-name');
    const classEl = document.getElementById('victory-student-class');
    const scoreEl = document.getElementById('victory-final-score');

    if (nameEl && state.student) nameEl.textContent = state.student.nama;
    if (classEl && state.student) classEl.textContent = state.student.kelas;
    if (scoreEl && state.student) scoreEl.textContent = `${state.student.totalPoints.toLocaleString('id-ID')} Poin`;

    modal.classList.remove('hidden');
  }
};

// ==========================================
// RENDERER UI & DOM CONTROLLER
// ==========================================
const UI = {
  openLightbox(src) {
    if (!src) return;
    const modal = document.getElementById('modal-image-lightbox');
    const imgEl = document.getElementById('lightbox-img-element');
    if (!modal || !imgEl) return;
    imgEl.src = src;
    modal.classList.remove('hidden');
  },

  closeLightbox() {
    const modal = document.getElementById('modal-image-lightbox');
    const imgEl = document.getElementById('lightbox-img-element');
    if (modal) modal.classList.add('hidden');
    if (imgEl) imgEl.src = '';
  },

  protectedScreens: ['screen-menu', 'screen-materials', 'screen-world'],

  countUp(el, to, prefix = '', ms = 700) {
    if (!el) return;
    const fmt = n => `${prefix}${Math.round(n).toLocaleString('id-ID')}`;
    if (!to || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = fmt(to);
      return;
    }
    const t0 = performance.now();
    el.textContent = fmt(0);
    const step = t => {
      const k = Math.min(1, (t - t0) / ms);
      el.textContent = fmt(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    setTimeout(() => { el.textContent = fmt(to); }, ms + 50);
  },

  sidebarScreens: ['screen-menu', 'screen-materials', 'screen-leaderboard'],

  updateSidebar(screenId) {
    const on = this.sidebarScreens.includes(screenId) && !!(Auth.current() && state.student);
    document.body.classList.toggle('has-sidebar', on);
    if (!on) return;
    const st = state.student;
    const char = CHARACTERS.find(c => c.id === st.characterId) || CHARACTERS[0];
    document.getElementById('sb-avatar').textContent = char.emoji;
    document.getElementById('sb-name').textContent = st.nama;
    document.getElementById('sb-class').textContent = st.kelas;
    document.querySelectorAll('#sidebar .sb-item').forEach(b => b.classList.toggle('active', b.dataset.nav === screenId));
    if (screenId === 'screen-materials') this.setSbChapters(true);
    this.renderSidebarChapters(screenId === 'screen-materials' ? state.activeChapterId : null);
  },

  // Daftar bab di bawah item Materi; panah di ujung item membuka dan menutupnya
  setSbChapters(open) {
    this.sbChaptersOpen = open;
    document.getElementById('sb-chapters').hidden = !open;
    const t = document.getElementById('sb-toggle');
    t.setAttribute('aria-expanded', String(open));
    t.setAttribute('aria-label', open ? 'Sembunyikan daftar bab' : 'Tampilkan daftar bab');
  },

  renderSidebarChapters(activeId) {
    const box = document.getElementById('sidebar-chapters');
    if (!box || !state.content) return;
    box.innerHTML = '';
    state.content.chapters.forEach(chap => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `sb-chapter ${chap.id === activeId ? 'active' : ''}`;
      btn.title = `Bab ${chap.id}: ${chap.title}`;
      btn.innerHTML = `<b>${chap.id}</b><span>${escapeHtml(chap.title)}</span>`;
      btn.addEventListener('click', () => {
        sound.click();
        this.renderMaterialsScreen(chap.id);
        this.showScreen('screen-materials');
      });
      box.appendChild(btn);
    });
  },

  openAuth(tab = 'login', msg = '') {
    document.querySelectorAll('.auth-tab').forEach(b => b.classList.toggle('active', b.dataset.authTab === tab));
    document.getElementById('form-login').classList.toggle('hidden', tab !== 'login');
    document.getElementById('form-register').classList.toggle('hidden', tab !== 'register');
    const err = document.getElementById('auth-error');
    err.textContent = msg;
    err.classList.toggle('hidden', !msg);
    this.showScreen('screen-auth');
  },

  showScreen(screenId) {
    if (this.protectedScreens.includes(screenId) && !state.ensureStudent()) {
      this.openAuth('login', 'Masuk dulu untuk memulai petualangan.');
      return;
    }
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      window.scrollTo(0, 0);
      this.updateSidebar(screenId);

      // Mulai atau matikan loop dunia 2D
      if (screenId === 'screen-world') {
        world.start();
        document.getElementById('sound-floating-ctrl').style.display = 'none';
      } else {
        world.stop();
        document.getElementById('sound-floating-ctrl').style.display = 'block';
      }
    }
  },

  showToast(message, icon = '💡') {
    const toast = document.getElementById('toast-notification');
    const msgEl = document.getElementById('toast-message');
    const iconEl = document.getElementById('toast-icon');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    if (iconEl) iconEl.textContent = icon;

    toast.classList.remove('hidden');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3200);
  },

  updateSoundIcon() {
    const icons = [document.getElementById('sound-icon'), document.getElementById('btn-world-mute')];
    icons.forEach(el => {
      if (el) el.textContent = sound.isMuted() ? '🔇' : '🔊';
    });
  },

  updateMenuScreen() {
    if (!state.student) return;
    const nameEl = document.getElementById('display-user-name');
    const classEl = document.getElementById('display-user-class');
    const avatarEl = document.getElementById('user-avatar-initial');
    const heartsEl = document.getElementById('display-user-hearts');
    const pointsEl = document.getElementById('display-user-points');
    const progTextEl = document.getElementById('display-levels-progress-text');
    const progFillEl = document.getElementById('display-overall-progress-fill');
    const gameBadgeEl = document.getElementById('menu-game-status-badge');

    if (nameEl) nameEl.textContent = state.student.nama;
    if (classEl) classEl.textContent = state.student.kelas;

    // Tampilkan avatar emoji karakter
    const charData = CHARACTERS.find(c => c.id === state.student.characterId) || CHARACTERS[0];
    if (avatarEl) avatarEl.textContent = charData.emoji;

    if (heartsEl) {
      if (state.student.hearts <= 5) {
        heartsEl.textContent = String(state.student.hearts);
      } else {
        heartsEl.textContent = `❤️ x${state.student.hearts}`;
      }
    }
    if (pointsEl) pointsEl.textContent = state.student.totalPoints.toLocaleString('id-ID');

    const passedCount = state.student.passedLevels.length;
    if (progTextEl) progTextEl.textContent = `${passedCount} dari 5 Level Lulus`;
    if (progFillEl) progFillEl.style.width = `${(passedCount / 5) * 100}%`;

    const nextLevel = Math.min(5, passedCount + 1);
    if (gameBadgeEl) {
      if (passedCount >= 5) {
        gameBadgeEl.textContent = "🏆 Tamat & Selesai";
      } else {
        gameBadgeEl.textContent = `Zona ${nextLevel} Terbuka`;
      }
    }
  },

  parseMarkdownContent(text) {
    if (!text) return '';
    const lines = text.split('\n');
    let html = '';
    let inList = false;

    lines.forEach(line => {
      let trimmed = line.trim();
      if (trimmed === '') {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        return;
      }

      const imgMatch = trimmed.match(/^\[gambar:\s*(.*?)\]$/i);
      if (imgMatch) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        const imgRef = imgMatch[1].trim();
        html += `<div class="material-img-wrap"><img data-img-ref="${escapeHtml(imgRef)}" src="" alt="Ilustrasi Materi" class="material-img-dynamic" loading="lazy" /></div>`;
        return;
      }

      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        const itemContent = trimmed.substring(2);
        html += `<li>${this.formatInline(itemContent)}</li>`;
        return;
      }

      if (inList) {
        html += '</ul>';
        inList = false;
      }

      html += `<p>${this.formatInline(trimmed)}</p>`;
    });

    if (inList) html += '</ul>';
    return html;
  },

  formatInline(str) {
    let res = escapeHtml(str);
    res = res.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return res;
  },

  renderMaterialsScreen(chapterId = 1) {
    state.activeChapterId = chapterId;
    const navContainer = document.getElementById('chapter-tabs-container');
    const badgeEl = document.getElementById('mat-chapter-badge');
    const hintEl = document.getElementById('mat-chapter-level-hint');
    const titleEl = document.getElementById('mat-chapter-title');
    const bodyEl = document.getElementById('mat-chapter-body');

    if (navContainer) {
      navContainer.innerHTML = '';
      state.content.chapters.forEach(chap => {
        const btn = document.createElement('button');
        btn.className = `chapter-tab-pill ${chap.id === chapterId ? 'active' : ''}`;
        btn.textContent = `Bab ${chap.id}`;
        btn.addEventListener('click', () => {
          sound.click();
          this.renderMaterialsScreen(chap.id);
        });
        navContainer.appendChild(btn);
      });
    }

    this.renderSidebarChapters(chapterId);

    const currentChap = state.content.chapters.find(c => c.id === chapterId) || state.content.chapters[0];
    if (badgeEl) badgeEl.textContent = `BAB ${currentChap.id}`;
    if (hintEl) hintEl.textContent = `Materi Persiapan Zona ${currentChap.id}`;
    if (titleEl) titleEl.textContent = currentChap.title;
    if (bodyEl) {
      bodyEl.innerHTML = this.parseMarkdownContent(currentChap.content);

      // Muat seluruh gambar materi secara asinkron (Hapus jika tidak ditemukan atau rusak)
      bodyEl.querySelectorAll('img.material-img-dynamic').forEach(async (img) => {
        const ref = img.getAttribute('data-img-ref');
        const resolved = await resolveImageSrc(ref);
        if (resolved) {
          img.src = resolved;
          img.addEventListener('click', () => UI.openLightbox(resolved));
          img.onerror = () => {
            const parent = img.closest('.material-img-wrap');
            if (parent) parent.remove();
          };
        } else {
          const parent = img.closest('.material-img-wrap');
          if (parent) parent.remove();
        }
      });
    }

    const prevBtn = document.getElementById('btn-mat-prev');
    const nextBtn = document.getElementById('btn-mat-next');
    if (prevBtn) prevBtn.disabled = chapterId <= 1;
    if (nextBtn) nextBtn.disabled = chapterId >= state.content.chapters.length;
  },

  // Render Papan Peringkat
  renderLeaderboardScreen() {
    state.loadLeaderboard();
    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    if (state.leaderboard.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 24px; color: var(--text-muted);">Belum ada data petualang. Jadilah yang pertama!</td></tr>`;
      return;
    }

    state.leaderboard.forEach((entry, idx) => {
      const tr = document.createElement('tr');
      if (state.student && entry.nama.toLowerCase() === state.student.nama.toLowerCase() && entry.kelas.toLowerCase() === state.student.kelas.toLowerCase()) {
        tr.className = 'active-user-row';
      }

      let rankDisplay = `#${idx + 1}`;
      if (idx === 0) rankDisplay = `<span class="rank-badge rank-1">🥇 1</span>`;
      else if (idx === 1) rankDisplay = `<span class="rank-badge rank-2">🥈 2</span>`;
      else if (idx === 2) rankDisplay = `<span class="rank-badge rank-3">🥉 3</span>`;

      tr.innerHTML = `
        <td>${rankDisplay}</td>
        <td><strong>${escapeHtml(entry.nama)}</strong></td>
        <td>${escapeHtml(entry.kelas)}</td>
        <td>${entry.maxLevel > 0 ? (entry.maxLevel >= 5 ? '👑 Tamat' : `Zona ${entry.maxLevel}`) : '-'}</td>
        <td class="lb-score">⭐ ${entry.points.toLocaleString('id-ID')}</td>
      `;
      tbody.appendChild(tr);
    });
  }
};

// ==========================================
// PANEL GURU (TEACHER CMS CONTROLLER)
// ==========================================
const TeacherController = {
  currentEditingLevel: 1,

  getTeacherPIN() {
    return localStorage.getItem(STORAGE_KEYS.PIN) || DEFAULT_TEACHER_PIN;
  },

  setTeacherPIN(newPin) {
    localStorage.setItem(STORAGE_KEYS.PIN, newPin.trim());
  },

  verifyPIN(pin) {
    return pin.trim() === this.getTeacherPIN();
  },

  openPanel() {
    UI.showScreen('screen-teacher');
    this.loadChapterForEdit(1);
    this.loadQuestionsForLevel(1);
    this.loadGameplaySettings();
  },

  loadGameplaySettings() {
    const qOrderSelect = document.getElementById('select-teacher-q-order');
    const obsSelect = document.getElementById('select-teacher-obstacles');
    const settings = state.content.gameplaySettings || { questionOrder: 'free', obstacles: 'enabled' };

    if (qOrderSelect) qOrderSelect.value = settings.questionOrder || 'free';
    if (obsSelect) obsSelect.value = settings.obstacles || 'enabled';
  },

  saveGameplaySettings() {
    const qOrderSelect = document.getElementById('select-teacher-q-order');
    const obsSelect = document.getElementById('select-teacher-obstacles');

    if (!state.content.gameplaySettings) {
      state.content.gameplaySettings = {};
    }

    if (qOrderSelect) state.content.gameplaySettings.questionOrder = qOrderSelect.value;
    if (obsSelect) state.content.gameplaySettings.obstacles = obsSelect.value;

    state.saveContent();
    world.buildMapObstacles();
    world.refreshStations();
    world.validateMap();
    world.updateHUD();

    UI.showToast("Pengaturan Gameplay Petualangan 2D berhasil disimpan! 💾", '💾');
  },

  loadChapterForEdit(chapterId) {
    const chapter = state.content.chapters.find(c => c.id === parseInt(chapterId));
    if (!chapter) return;

    const titleInput = document.getElementById('teacher-chapter-title');
    const contentInput = document.getElementById('teacher-chapter-content');

    if (titleInput) titleInput.value = chapter.title;
    if (contentInput) contentInput.value = chapter.content;

    const previewBox = document.getElementById('materi-preview-box');
    if (previewBox) previewBox.classList.add('hidden');
  },

  saveChapterEdit() {
    const select = document.getElementById('select-teacher-chapter');
    const chapterId = parseInt(select.value);
    const title = document.getElementById('teacher-chapter-title').value.trim();
    const content = document.getElementById('teacher-chapter-content').value.trim();

    if (!title || !content) {
      alert("Judul dan isi materi wajib diisi!");
      return;
    }

    const chapIndex = state.content.chapters.findIndex(c => c.id === chapterId);
    if (chapIndex >= 0) {
      state.content.chapters[chapIndex].title = title;
      state.content.chapters[chapIndex].content = content;
      state.saveContent();
      UI.showToast(`Materi Bab ${chapterId} berhasil disimpan!`, '💾');
    }
  },

  togglePreview() {
    const previewBox = document.getElementById('materi-preview-box');
    const renderedBox = document.getElementById('materi-preview-rendered');
    const content = document.getElementById('teacher-chapter-content').value;

    if (!previewBox || !renderedBox) return;

    if (previewBox.classList.contains('hidden')) {
      renderedBox.innerHTML = UI.parseMarkdownContent(content);
      previewBox.classList.remove('hidden');
    } else {
      previewBox.classList.add('hidden');
    }
  },

  loadQuestionsForLevel(levelNum) {
    this.currentEditingLevel = parseInt(levelNum);
    const bankTitle = document.getElementById('teacher-bank-title');
    const bankCount = document.getElementById('teacher-bank-count');
    const listContainer = document.getElementById('teacher-question-list');
    const targetInput = document.getElementById('input-level-target-questions');
    const timerInput = document.getElementById('input-level-timer-sec');
    const warningEl = document.getElementById('level-warning-msg');

    const config = state.content.levelConfigs[levelNum] || { targetQuestions: 5, timerSec: 0, title: NAMA_LEVEL[levelNum] || `Level ${levelNum}` };
    if (targetInput) targetInput.value = config.targetQuestions || 5;
    if (timerInput) timerInput.value = config.timerSec || 0;

    const questions = state.content.questions.filter(q => q.level === this.currentEditingLevel);

    const levelTitle = NAMA_LEVEL[levelNum] || config.title || `Level ${levelNum}`;
    if (bankTitle) bankTitle.textContent = `Daftar Soal ${levelTitle}`;
    if (bankCount) bankCount.textContent = `${questions.length} Soal Tersedia`;

    if (warningEl) {
      if (questions.length < config.targetQuestions) {
        warningEl.classList.remove('hidden');
        warningEl.textContent = `⚠️ Peringatan: Level ini hanya memiliki ${questions.length} soal di bank soal, sedangkan target yang dimainkan adalah ${config.targetQuestions} soal!`;
      } else {
        warningEl.classList.add('hidden');
      }
    }

    if (!listContainer) return;
    listContainer.innerHTML = '';

    if (questions.length === 0) {
      listContainer.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted); background: #141133; border-radius: var(--radius-md);">Belum ada soal pada level ini. Klik tombol "Tambah Soal Baru" di atas!</div>`;
      return;
    }

    questions.forEach((q, index) => {
      const card = document.createElement('div');
      card.className = 'q-item-card';

      const optLabels = ['A', 'B', 'C', 'D'];
      const optionsHtml = q.opsi.map((opt, i) => {
        const isKey = (i === q.kunci);
        return `<div class="q-opt-pill ${isKey ? 'is-key' : ''}">${optLabels[i]}: ${escapeHtml(opt)} ${isKey ? '✓' : ''}</div>`;
      }).join('');

      // Badge status timer per soal
      const mode = q.timerMode || 'level';
      const actualTimer = getWaktuSoal(q, this.currentEditingLevel);
      let timerBadgeHtml = '';
      if (mode === 'none') {
        timerBadgeHtml = `<span class="badge-timer badge-timer-none" title="Soal ini tanpa batas waktu">♾️ Tanpa Timer</span>`;
      } else if (mode === 'custom') {
        timerBadgeHtml = `<span class="badge-timer badge-timer-custom" title="Waktu khusus soal ini">⏱️ Khusus (${q.timerCustomSec || actualTimer}s)</span>`;
      } else {
        timerBadgeHtml = `<span class="badge-timer badge-timer-level" title="Mengikuti timer bawaan level">⏱️ Ikut Level (${actualTimer}s)</span>`;
      }

      // Indikator gambar jika ada
      const hasImgBadge = (q.gambar && q.gambar.trim() !== '') ? `<span style="display:inline-flex;align-items:center;font-size:0.75rem;padding:2px 6px;border-radius:10px;background:rgba(56,189,248,0.2);color:#38bdf8;margin-left:6px;">🖼️ Ada Gambar</span>` : '';

      card.innerHTML = `
        <div class="q-item-num">${index + 1}</div>
        <div class="q-item-content">
          <div class="q-item-pertanyaan">
            ${escapeHtml(q.pertanyaan)}
            ${timerBadgeHtml}
            ${hasImgBadge}
          </div>
          <div class="q-item-options-preview">${optionsHtml}</div>
          <div class="q-item-pembahasan-snippet"><strong>Pembahasan:</strong> ${escapeHtml(q.pembahasan)}</div>
        </div>
        <div class="q-item-actions">
          <button class="q-btn-sm" data-act="up" title="Geser ke Atas">🔼</button>
          <button class="q-btn-sm" data-act="down" title="Geser ke Bawah">🔽</button>
          <button class="q-btn-sm" data-act="edit" title="Edit Soal">✏️</button>
          <button class="q-btn-sm delete" data-act="delete" title="Hapus Soal">🗑️</button>
        </div>
      `;

      card.querySelector('[data-act="up"]').addEventListener('click', () => this.moveQuestion(q.id, -1));
      card.querySelector('[data-act="down"]').addEventListener('click', () => this.moveQuestion(q.id, 1));
      card.querySelector('[data-act="edit"]').addEventListener('click', () => this.openQuestionEditor(q));
      card.querySelector('[data-act="delete"]').addEventListener('click', () => this.deleteQuestion(q.id));

      listContainer.appendChild(card);
    });
  },

  saveLevelRules() {
    const targetQuestions = parseInt(document.getElementById('input-level-target-questions').value) || 5;
    const timerSec = parseInt(document.getElementById('input-level-timer-sec').value) || 0;

    if (!state.content.levelConfigs[this.currentEditingLevel]) {
      state.content.levelConfigs[this.currentEditingLevel] = {};
    }

    state.content.levelConfigs[this.currentEditingLevel].targetQuestions = targetQuestions;
    state.content.levelConfigs[this.currentEditingLevel].timerSec = timerSec;
    state.saveContent();

    UI.showToast(`Aturan Level ${this.currentEditingLevel} berhasil disimpan!`, '⚙️');
    this.loadQuestionsForLevel(this.currentEditingLevel);
  },

  moveQuestion(qId, direction) {
    const levelQuestions = state.content.questions.filter(q => q.level === this.currentEditingLevel);
    const indexInLevel = levelQuestions.findIndex(q => q.id === qId);

    if (indexInLevel < 0) return;
    const targetIndex = indexInLevel + direction;
    if (targetIndex < 0 || targetIndex >= levelQuestions.length) return;

    const temp = levelQuestions[indexInLevel];
    levelQuestions[indexInLevel] = levelQuestions[targetIndex];
    levelQuestions[targetIndex] = temp;

    const otherQuestions = state.content.questions.filter(q => q.level !== this.currentEditingLevel);
    state.content.questions = [...otherQuestions, ...levelQuestions];
    state.saveContent();

    this.loadQuestionsForLevel(this.currentEditingLevel);
  },

  deleteQuestion(qId) {
    if (!confirm("Apakah Anda yakin ingin menghapus soal ini?")) return;
    state.content.questions = state.content.questions.filter(q => q.id !== qId);
    state.saveContent();
    UI.showToast("Soal berhasil dihapus.", '🗑️');
    this.loadQuestionsForLevel(this.currentEditingLevel);
  },

  async openQuestionEditor(q = null) {
    const modal = document.getElementById('modal-question-editor');
    const titleEl = document.getElementById('q-editor-title');
    const idInput = document.getElementById('q-edit-id');
    const pertInput = document.getElementById('q-edit-pertanyaan');
    const opt0 = document.getElementById('q-edit-opt-0');
    const opt1 = document.getElementById('q-edit-opt-1');
    const opt2 = document.getElementById('q-edit-opt-2');
    const opt3 = document.getElementById('q-edit-opt-3');
    const keySelect = document.getElementById('q-edit-kunci');
    const pembInput = document.getElementById('q-edit-pembahasan');
    const timerModeSelect = document.getElementById('q-edit-timer-mode');
    const timerSecInput = document.getElementById('q-edit-timer-sec');
    const timerSecWrap = document.getElementById('q-edit-timer-sec-wrap');

    if (!modal) return;

    if (q) {
      titleEl.textContent = `Edit Soal (${NAMA_LEVEL[this.currentEditingLevel] || 'Level ' + this.currentEditingLevel})`;
      idInput.value = q.id;
      pertInput.value = q.pertanyaan;
      opt0.value = q.opsi[0] || '';
      opt1.value = q.opsi[1] || '';
      opt2.value = q.opsi[2] || '';
      opt3.value = q.opsi[3] || '';
      keySelect.value = q.kunci;
      pembInput.value = q.pembahasan || '';

      const mode = q.timerMode || 'level';
      if (timerModeSelect) timerModeSelect.value = mode;
      if (timerSecInput) timerSecInput.value = q.timerCustomSec || 15;
      if (timerSecWrap) {
        if (mode === 'custom') timerSecWrap.classList.remove('hidden');
        else timerSecWrap.classList.add('hidden');
      }

      if (q.gambar && q.gambar.trim() !== '') {
        const resolved = await resolveImageSrc(q.gambar);
        this.setQuestionEditorImage(q.gambar, resolved);
      } else {
        this.clearQuestionEditorImage();
      }
    } else {
      titleEl.textContent = `Tambah Soal Baru (${NAMA_LEVEL[this.currentEditingLevel] || 'Level ' + this.currentEditingLevel})`;
      idInput.value = '';
      pertInput.value = '';
      opt0.value = '';
      opt1.value = '';
      opt2.value = '';
      opt3.value = '';
      keySelect.value = '0';
      pembInput.value = '';

      if (timerModeSelect) timerModeSelect.value = 'level';
      if (timerSecInput) timerSecInput.value = 15;
      if (timerSecWrap) timerSecWrap.classList.add('hidden');

      this.clearQuestionEditorImage();
    }

    modal.classList.remove('hidden');
  },

  saveQuestionFromEditor() {
    const idVal = document.getElementById('q-edit-id').value;
    const pertanyaan = document.getElementById('q-edit-pertanyaan').value.trim();
    const gambar = document.getElementById('q-edit-gambar').value.trim();
    const opt0 = document.getElementById('q-edit-opt-0').value.trim();
    const opt1 = document.getElementById('q-edit-opt-1').value.trim();
    const opt2 = document.getElementById('q-edit-opt-2').value.trim();
    const opt3 = document.getElementById('q-edit-opt-3').value.trim();
    const kunci = parseInt(document.getElementById('q-edit-kunci').value);
    const pembahasan = document.getElementById('q-edit-pembahasan').value.trim();

    const timerModeSelect = document.getElementById('q-edit-timer-mode');
    const timerSecInput = document.getElementById('q-edit-timer-sec');
    const timerMode = timerModeSelect ? timerModeSelect.value : 'level';
    const timerCustomSec = timerSecInput ? (parseInt(timerSecInput.value) || 15) : 15;

    if (!pertanyaan || !opt0 || !opt1 || !opt2 || !opt3 || !pembahasan) {
      alert("Harap lengkapi Pertanyaan, seluruh 4 Pilihan Jawaban, dan Pembahasan (wajib)!");
      return;
    }

    if (idVal) {
      const qIndex = state.content.questions.findIndex(q => q.id.toString() === idVal.toString());
      if (qIndex >= 0) {
        state.content.questions[qIndex].pertanyaan = pertanyaan;
        state.content.questions[qIndex].gambar = gambar;
        state.content.questions[qIndex].opsi = [opt0, opt1, opt2, opt3];
        state.content.questions[qIndex].kunci = kunci;
        state.content.questions[qIndex].pembahasan = pembahasan;
        state.content.questions[qIndex].timerMode = timerMode;
        state.content.questions[qIndex].timerCustomSec = timerCustomSec;
      }
    } else {
      const newQuestion = {
        id: Date.now(),
        level: this.currentEditingLevel,
        pertanyaan,
        gambar,
        opsi: [opt0, opt1, opt2, opt3],
        kunci,
        pembahasan,
        timerMode,
        timerCustomSec
      };
      state.content.questions.push(newQuestion);
    }

    state.saveContent();
    document.getElementById('modal-question-editor').classList.add('hidden');
    UI.showToast("Soal berhasil disimpan!", '💾');
    this.loadQuestionsForLevel(this.currentEditingLevel);
  },

  // Pengaturan Berkas & Gambar pada Editor Soal
  setupQuestionEditorImageHandlers() {
    const dropzone = document.getElementById('q-dropzone');
    const fileInput = document.getElementById('q-edit-file');
    const pickBtn = document.getElementById('btn-pick-q-img');
    const removeBtn = document.getElementById('btn-remove-q-img');
    const urlInput = document.getElementById('q-edit-gambar');
    const previewWrap = document.getElementById('q-image-preview-container');
    const previewImg = document.getElementById('q-image-preview-img');

    if (pickBtn && fileInput) {
      pickBtn.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', async (e) => {
        if (e.target.files && e.target.files[0]) {
          try {
            const imgObj = await processImageFile(e.target.files[0]);
            this.setQuestionEditorImage(imgObj.id, imgObj.dataUrl);
            UI.showToast("Gambar soal berhasil diunggah & dioptimasi!", '🖼️');
          } catch (err) {
            alert(err.message);
          }
          fileInput.value = '';
        }
      });
    }

    if (dropzone) {
      ['dragenter', 'dragover'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('dragover');
        });
      });
      ['dragleave', 'drop'].forEach(name => {
        dropzone.addEventListener(name, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('dragover');
        });
      });
      dropzone.addEventListener('drop', async (e) => {
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          const file = e.dataTransfer.files[0];
          if (!file.type.startsWith('image/')) {
            alert("Harap pilih berkas gambar!");
            return;
          }
          try {
            const imgObj = await processImageFile(file);
            this.setQuestionEditorImage(imgObj.id, imgObj.dataUrl);
            UI.showToast("Gambar soal berhasil dimuat dari seret-lepas!", '🖼️');
          } catch (err) {
            alert(err.message);
          }
        }
      });
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        this.clearQuestionEditorImage();
      });
    }

    if (urlInput) {
      urlInput.addEventListener('input', async (e) => {
        const val = e.target.value.trim();
        if (val === '') {
          this.clearQuestionEditorImage(false);
        } else {
          const resolved = await resolveImageSrc(val);
          if (resolved) {
            if (previewImg) previewImg.src = resolved;
            if (previewWrap) previewWrap.classList.remove('hidden');
          } else {
            if (previewWrap) previewWrap.classList.add('hidden');
          }
        }
      });
    }

    // Tempel (Ctrl+V) gambar dari papan klip
    const modalEditor = document.getElementById('modal-question-editor');
    if (modalEditor) {
      modalEditor.addEventListener('paste', async (e) => {
        if (!e.clipboardData || !e.clipboardData.items) return;
        for (let item of e.clipboardData.items) {
          if (item.type && item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file) {
              e.preventDefault();
              try {
                const imgObj = await processImageFile(file);
                this.setQuestionEditorImage(imgObj.id, imgObj.dataUrl);
                UI.showToast("Gambar soal berhasil ditempel dari papan klip (Ctrl+V)!", '📋');
              } catch (err) {
                alert(err.message);
              }
              break;
            }
          }
        }
      });
    }

    // Toggle tampilan durasi kustom
    const timerModeSelect = document.getElementById('q-edit-timer-mode');
    const timerSecWrap = document.getElementById('q-edit-timer-sec-wrap');
    if (timerModeSelect && timerSecWrap) {
      timerModeSelect.addEventListener('change', () => {
        if (timerModeSelect.value === 'custom') {
          timerSecWrap.classList.remove('hidden');
        } else {
          timerSecWrap.classList.add('hidden');
        }
      });
    }
  },

  setQuestionEditorImage(idOrUrl, resolvedDataUrl) {
    const urlInput = document.getElementById('q-edit-gambar');
    const previewWrap = document.getElementById('q-image-preview-container');
    const previewImg = document.getElementById('q-image-preview-img');
    if (urlInput) urlInput.value = idOrUrl;
    if (previewImg) previewImg.src = resolvedDataUrl || idOrUrl;
    if (previewWrap) previewWrap.classList.remove('hidden');
  },

  clearQuestionEditorImage(clearInput = true) {
    const urlInput = document.getElementById('q-edit-gambar');
    const previewWrap = document.getElementById('q-image-preview-container');
    const previewImg = document.getElementById('q-image-preview-img');
    if (clearInput && urlInput) urlInput.value = '';
    if (previewImg) previewImg.src = '';
    if (previewWrap) previewWrap.classList.add('hidden');
  },

  // Pustaka Gambar (Image Library)
  async openImageLibrary() {
    const modal = document.getElementById('modal-image-library');
    if (!modal) return;
    modal.classList.remove('hidden');
    this.renderImageLibraryGrid();
  },

  closeImageLibrary() {
    const modal = document.getElementById('modal-image-library');
    if (modal) modal.classList.add('hidden');
  },

  async renderImageLibraryGrid() {
    const grid = document.getElementById('image-library-grid');
    const countEl = document.getElementById('lib-count-info');
    if (!grid) return;
    grid.innerHTML = '<div style="color:#94a3b8;grid-column:1/-1;text-align:center;padding:20px;">Memuat pustaka gambar...</div>';

    const images = await EduestImageStore.getAllImages();
    if (countEl) countEl.textContent = `${images.length} Gambar Tersimpan`;

    if (images.length === 0) {
      grid.innerHTML = '<div style="color:#94a3b8;grid-column:1/-1;text-align:center;padding:30px;">Belum ada gambar tersimpan. Klik "➕ Unggah Gambar Baru" di atas!</div>';
      return;
    }

    grid.innerHTML = '';
    images.forEach(img => {
      const card = document.createElement('div');
      card.className = 'lib-item-card';
      const sizeKB = Math.round((img.size || 0) / 1024);
      card.innerHTML = `
        <img src="${img.dataUrl}" alt="${escapeHtml(img.name)}" class="lib-item-thumb" />
        <div class="lib-item-name" title="${escapeHtml(img.name)}">${escapeHtml(img.name)}</div>
        <div class="lib-item-meta">${sizeKB} KB &bull; ID: <code>${img.id}</code></div>
        <div class="lib-item-actions">
          <button type="button" class="btn btn-secondary btn-sm" data-act="copy" title="Salin tag kode">📋 Salin</button>
          <button type="button" class="btn btn-primary btn-sm" data-act="insert" title="Sisipkan ke editor materi">➕ Sisip</button>
          <button type="button" class="btn btn-danger btn-sm" data-act="delete" title="Hapus gambar">🗑️</button>
        </div>
      `;

      card.querySelector('[data-act="copy"]').addEventListener('click', () => {
        navigator.clipboard.writeText(`[gambar: ${img.id}]`);
        UI.showToast(`Kode [gambar: ${img.id}] disalin ke papan klip!`, '📋');
      });

      card.querySelector('[data-act="insert"]').addEventListener('click', () => {
        this.insertTextIntoMaterial(`\n[gambar: ${img.id}]\n`);
        this.closeImageLibrary();
        UI.showToast("Gambar berhasil disisipkan ke materi!", '🖼️');
      });

      card.querySelector('[data-act="delete"]').addEventListener('click', async () => {
        if (!confirm(`Hapus gambar "${img.name}" dari pustaka?`)) return;
        await EduestImageStore.deleteImage(img.id);
        UI.showToast("Gambar berhasil dihapus.", '🗑️');
        this.renderImageLibraryGrid();
      });

      card.querySelector('.lib-item-thumb').addEventListener('click', () => {
        UI.openLightbox(img.dataUrl);
      });

      grid.appendChild(card);
    });
  },

  insertTextIntoMaterial(textToInsert) {
    const textarea = document.getElementById('teacher-chapter-content');
    if (!textarea) return;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const val = textarea.value;
    textarea.value = val.substring(0, startPos) + textToInsert + val.substring(endPos);
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = startPos + textToInsert.length;
  },

  exportJSON() {
    const dataToExport = {
      app: "EDUEST",
      version: "2.0-2D-ADVENTURE",
      exportDate: new Date().toISOString(),
      content: state.content
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `eduest_data_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    UI.showToast("Data materi dan soal berhasil diekspor!", '📥');
  },

  importJSON(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.content && Array.isArray(parsed.content.chapters) && Array.isArray(parsed.content.questions)) {
          state.content = parsed.content;

          // Pulihkan gambar ke IndexedDB jika ada
          if (Array.isArray(state.content.gambar)) {
            for (let g of state.content.gambar) {
              await EduestImageStore.saveImage(g);
            }
          }

          state.saveContent();
          UI.showToast("Data materi dan soal berhasil diimpor!", '📤');
          this.loadChapterForEdit(1);
          this.loadQuestionsForLevel(1);
        } else {
          alert("Format file JSON tidak sesuai dengan struktur EDUEST!");
        }
      } catch (err) {
        alert("Gagal membaca file JSON: " + err.message);
      }
    };
    reader.readAsText(file);
  }
};

// ==========================================
// INISIALISASI EVENT LISTENERS
// ==========================================
function initEventListeners() {
  // Audio toggle di menu utama
  const soundBtn = document.getElementById('btn-sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      sound.toggleMute();
      UI.updateSoundIcon();
    });
  }
  UI.updateSoundIcon();

  // Screen 1: Halaman Utama
  const homeStartBtn = document.getElementById('btn-home-start');
  if (homeStartBtn) {
    homeStartBtn.addEventListener('click', () => {
      sound.click();
      if (state.ensureStudent()) {
        UI.updateMenuScreen();
        UI.showScreen('screen-menu');
      } else {
        UI.openAuth('login');
      }
    });
  }

  const homeLeaderboardBtn = document.getElementById('btn-home-leaderboard');
  if (homeLeaderboardBtn) {
    homeLeaderboardBtn.addEventListener('click', () => {
      sound.click();
      UI.renderLeaderboardScreen();
      UI.showScreen('screen-leaderboard');
    });
  }

  // Screen 2: Masuk dan Daftar
  const val = (id) => document.getElementById(id).value;
  const authErr = (msg) => UI.openAuth(document.getElementById('form-register').classList.contains('hidden') ? 'login' : 'register', msg);

  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      sound.click();
      UI.openAuth(tab.dataset.authTab);
    });
  });

  document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    sound.click();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    const r = await Auth.login(val('login-username'), val('login-password'));
    if (submitBtn) submitBtn.disabled = false;
    if (!r.ok) return authErr(r.error);
    state.loadStudent();
    await state.loadRemoteStudent();
    state.ensureStudent();
    e.target.reset();
    UI.updateMenuScreen();
    UI.showScreen('screen-menu');
  });

  // Karakter hanya dipilih di sini, saat daftar; hasilnya jadi avatar di sidebar
  const regGrid = document.getElementById('reg-char-grid');
  let regChar = CHARACTERS[0].id;
  function pickRegChar(id) {
    regChar = id;
    if (!regGrid) return;
    regGrid.querySelectorAll('.reg-char').forEach(b => b.setAttribute('aria-checked', String(b.dataset.id === id)));
    document.getElementById('reg-char-desc').textContent = CHARACTERS.find(c => c.id === id).desc;
  }
  if (regGrid) CHARACTERS.forEach(c => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'reg-char';
    b.dataset.id = c.id;
    b.setAttribute('role', 'radio');
    b.innerHTML = `<span class="reg-char-emoji">${c.emoji}</span><span>${c.name}</span>`;
    b.addEventListener('click', () => { sound.click(); pickRegChar(c.id); });
    regGrid.appendChild(b);
  });
  pickRegChar(regChar);

  document.getElementById('form-register').addEventListener('submit', async (e) => {
    e.preventDefault();
    sound.click();
    const nama = val('reg-nama');
    if (!/^[a-zA-Z0-9\s.'-]{2,50}$/.test(nama.trim())) {
      return authErr('Nama hanya boleh huruf, angka, spasi, titik, petik, atau strip (2-50 karakter).');
    }
    const f = { nama, kelas: val('reg-kelas'), absen: val('reg-absen'), username: val('reg-username'), password: val('reg-password') };
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    const r = await Auth.register(f);
    if (submitBtn) submitBtn.disabled = false;
    if (!r.ok) return authErr(r.error);
    Auth.claimLegacy(f.username, f.nama, f.kelas);
    state.loadStudent();
    await state.loadRemoteStudent();
    state.ensureStudent();
    state.student.characterId = regChar;
    state.saveStudent();
    e.target.reset();
    pickRegChar(CHARACTERS[0].id);
    UI.updateMenuScreen();
    UI.showScreen('screen-menu');
  });

  ['btn-auth-home', 'btn-auth-home-2'].forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
      sound.click();
      UI.showScreen('screen-home');
    });
  });

  document.querySelectorAll('.class-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      sound.click();
      document.getElementById('reg-kelas').value = chip.dataset.val;
    });
  });

  // Sidebar dasbor
  // Game dari sidebar: tampilkan cara bermain dulu, game baru mulai setelah tombol di modal ditekan
  let startGameAfterHowto = false;
  const sbTargets = {
    'screen-menu': () => { UI.updateMenuScreen(); UI.showScreen('screen-menu'); },
    'screen-materials': () => document.getElementById('btn-open-materials').click(),
    'screen-world': () => { startGameAfterHowto = true; document.getElementById('modal-world-tutorial').classList.remove('hidden'); },
    'screen-leaderboard': () => document.getElementById('btn-menu-leaderboard').click()
  };
  document.querySelectorAll('#sidebar .sb-item').forEach(item => {
    item.addEventListener('click', () => {
      sound.click();
      sbTargets[item.dataset.nav]();
    });
  });
  document.getElementById('sb-toggle').addEventListener('click', () => {
    sound.click();
    UI.setSbChapters(!UI.sbChaptersOpen);
  });
  document.getElementById('sb-logout').addEventListener('click', () => document.getElementById('btn-menu-logout').click());

  // Screen 3: Menu Pilihan
  const btnMenuHome = document.getElementById('btn-menu-home');
  if (btnMenuHome) {
    btnMenuHome.addEventListener('click', () => {
      sound.click();
      state.saveStudent();
      UI.showScreen('screen-home');
    });
  }

  const openMaterialsBtn = document.getElementById('btn-open-materials');
  if (openMaterialsBtn) {
    openMaterialsBtn.addEventListener('click', () => {
      sound.click();
      UI.renderMaterialsScreen(1);
      UI.showScreen('screen-materials');
    });
  }

  const openGameMapBtn = document.getElementById('btn-open-gamemap');
  if (openGameMapBtn) {
    openGameMapBtn.addEventListener('click', () => {
      sound.click();
      // Buka Dunia Petualangan 2D
      UI.showScreen('screen-world');
    });
  }

  const menuLeaderboardBtn = document.getElementById('btn-menu-leaderboard');
  if (menuLeaderboardBtn) {
    menuLeaderboardBtn.addEventListener('click', () => {
      sound.click();
      UI.renderLeaderboardScreen();
      UI.showScreen('screen-leaderboard');
    });
  }

  const menuLogoutBtn = document.getElementById('btn-menu-logout');
  if (menuLogoutBtn) {
    menuLogoutBtn.addEventListener('click', async () => {
      sound.click();
      await Auth.logout();
      state.student = null;
      UI.showScreen('screen-home');
    });
  }

  const menuResetProgBtn = document.getElementById('btn-menu-reset-progress');
  if (menuResetProgBtn) {
    menuResetProgBtn.addEventListener('click', () => {
      if (confirm("Apakah kamu yakin ingin mereset progres petualangan? Poin, bintang, dan level yang terbuka akan diulang dari awal.")) {
        sound.click();
        state.resetStudentProgress();
        UI.updateMenuScreen();
        UI.showToast("Progres kamu berhasil direset ke awal.", '🔄');
      }
    });
  }

  // Screen 4: Materi
  const btnMaterialsHome = document.getElementById('btn-materials-home');
  if (btnMaterialsHome) {
    btnMaterialsHome.addEventListener('click', () => {
      sound.click();
      state.saveStudent();
      UI.showScreen('screen-home');
    });
  }
  const matBackBtn = document.getElementById('btn-materials-back');
  if (matBackBtn) {
    matBackBtn.addEventListener('click', () => {
      sound.click();
      UI.updateMenuScreen();
      UI.showScreen('screen-menu');
    });
  }

  const matPlayDirectBtn = document.getElementById('btn-materials-play-direct');
  if (matPlayDirectBtn) {
    matPlayDirectBtn.addEventListener('click', () => {
      sound.click();
      UI.showScreen('screen-world');
    });
  }

  const matPrevBtn = document.getElementById('btn-mat-prev');
  if (matPrevBtn) {
    matPrevBtn.addEventListener('click', () => {
      sound.click();
      if (state.activeChapterId > 1) {
        UI.renderMaterialsScreen(state.activeChapterId - 1);
      }
    });
  }

  const matNextBtn = document.getElementById('btn-mat-next');
  if (matNextBtn) {
    matNextBtn.addEventListener('click', () => {
      sound.click();
      if (state.activeChapterId < state.content.chapters.length) {
        UI.renderMaterialsScreen(state.activeChapterId + 1);
      }
    });
  }

  const matPlayThisBtn = document.getElementById('btn-mat-play-this');
  if (matPlayThisBtn) {
    matPlayThisBtn.addEventListener('click', () => {
      const targetLvl = state.activeChapterId;
      if (!state.isLevelUnlocked(targetLvl)) {
        sound.wrong();
        UI.showToast(`Zona ${targetLvl} masih terkunci! Selesaikan level sebelumnya dulu.`, '🔒');
      } else {
        sound.click();
        const zone = world.zones.find(z => z.level === targetLvl);
        if (zone) {
          world.player.x = zone.spawnX;
          world.player.y = zone.spawnY;
        }
        UI.showScreen('screen-world');
      }
    });
  }

  // Controls HUD di Dunia 2D
  const btnWorldMinimap = document.getElementById('btn-world-minimap');
  const btnCloseMinimap = document.getElementById('btn-close-minimap');

  if (btnWorldMinimap) {
    btnWorldMinimap.addEventListener('click', () => {
      sound.click();
      world.toggleMinimap();
    });
  }
  if (btnCloseMinimap) {
    btnCloseMinimap.addEventListener('click', () => {
      sound.click();
      world.toggleMinimap(false);
    });
  }

  // Lightbox Modal Listeners
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');
  if (btnCloseLightbox) {
    btnCloseLightbox.addEventListener('click', () => {
      sound.click();
      UI.closeLightbox();
    });
  }
  const modalLightbox = document.getElementById('modal-image-lightbox');
  if (modalLightbox) {
    modalLightbox.addEventListener('click', (e) => {
      if (e.target === modalLightbox) {
        UI.closeLightbox();
      }
    });
  }

  // Image Library Modal Listeners
  const btnOpenLib = document.getElementById('btn-open-image-library');
  if (btnOpenLib) {
    btnOpenLib.addEventListener('click', () => {
      sound.click();
      TeacherController.openImageLibrary();
    });
  }
  const btnCloseLib = document.getElementById('btn-close-image-library');
  if (btnCloseLib) {
    btnCloseLib.addEventListener('click', () => {
      sound.click();
      TeacherController.closeImageLibrary();
    });
  }
  const modalImageLib = document.getElementById('modal-image-library');
  if (modalImageLib) {
    modalImageLib.addEventListener('click', (e) => {
      if (e.target === modalImageLib) {
        TeacherController.closeImageLibrary();
      }
    });
  }
  const btnLibUpload = document.getElementById('btn-lib-upload');
  const inputLibFile = document.getElementById('input-lib-file');
  if (btnLibUpload && inputLibFile) {
    btnLibUpload.addEventListener('click', () => inputLibFile.click());
    inputLibFile.addEventListener('change', async (e) => {
      if (e.target.files && e.target.files[0]) {
        try {
          await processImageFile(e.target.files[0]);
          TeacherController.renderImageLibraryGrid();
          UI.showToast("Gambar berhasil diunggah ke pustaka!", '🖼️');
        } catch (err) {
          alert(err.message);
        }
        inputLibFile.value = '';
      }
    });
  }

  // Material Insert Image Button
  const btnInsertMatImg = document.getElementById('btn-insert-material-img');
  const inputMatImgFile = document.getElementById('input-material-img-file');
  if (btnInsertMatImg && inputMatImgFile) {
    btnInsertMatImg.addEventListener('click', () => inputMatImgFile.click());
    inputMatImgFile.addEventListener('change', async (e) => {
      if (e.target.files && e.target.files[0]) {
        try {
          const imgObj = await processImageFile(e.target.files[0]);
          TeacherController.insertTextIntoMaterial(`\n[gambar: ${imgObj.id}]\n`);
          UI.showToast("Gambar berhasil diunggah dan disisipkan!", '🖼️');
        } catch (err) {
          alert(err.message);
        }
        inputMatImgFile.value = '';
      }
    });
  }

  const btnWorldTut = document.getElementById('btn-world-tutorial');
  const modalTut = document.getElementById('modal-world-tutorial');
  const btnCloseTut = document.getElementById('btn-close-tutorial');
  const btnTutOk = document.getElementById('btn-tutorial-ok');

  if (btnWorldTut && modalTut) {
    btnWorldTut.addEventListener('click', () => {
      sound.click();
      modalTut.classList.remove('hidden');
    });
  }
  if (btnCloseTut && modalTut) {
    btnCloseTut.addEventListener('click', () => {
      startGameAfterHowto = false;
      modalTut.classList.add('hidden');
    });
  }
  if (btnTutOk && modalTut) {
    btnTutOk.addEventListener('click', () => {
      sound.click();
      modalTut.classList.add('hidden');
      if (startGameAfterHowto) {
        startGameAfterHowto = false;
        document.getElementById('btn-open-gamemap').click();
      }
    });
  }

  const btnWorldMute = document.getElementById('btn-world-mute');
  if (btnWorldMute) {
    btnWorldMute.addEventListener('click', () => {
      sound.toggleMute();
      UI.updateSoundIcon();
    });
  }

  const btnWorldExit = document.getElementById('btn-world-exit');
  if (btnWorldExit) {
    btnWorldExit.addEventListener('click', () => {
      if (confirm("Kembali ke Menu Utama? Progres petualanganmu tetap tersimpan aman!")) {
        sound.click();
        state.saveStudent();
        UI.updateMenuScreen();
        UI.showScreen('screen-menu');
      }
    });
  }

  // Tombol Beranda di HUD Dunia 2D
  const btnWorldHome = document.getElementById('btn-world-home');
  if (btnWorldHome) {
    btnWorldHome.addEventListener('click', () => {
      sound.click();
      GameController.closeModalsWithoutPenalty();
      if (state.student) {
        state.student.worldPos = { x: Math.round(world.player.x), y: Math.round(world.player.y) };
        state.saveStudent();
      }
      UI.showScreen('screen-home');
      UI.showToast("Kembali ke Beranda. Progres tersimpan! 🏠", '🏠');
    });
  }

  // 4 Tombol Pilihan Soal Gimkit
  document.querySelectorAll('.quiz-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      GameController.chooseAnswer(idx);
    });
  });

  // Modal Pembahasan: Tombol Lanjut (Saat Jawaban Benar)
  const feedbackContinueBtn = document.getElementById('btn-feedback-continue');
  if (feedbackContinueBtn) {
    feedbackContinueBtn.addEventListener('click', () => {
      sound.click();
      GameController.continueAfterFeedback();
    });
  }

  // Modal Feedback: Tombol Coba Lagi Sekarang (Saat Jawaban Salah)
  const feedbackRetryBtn = document.getElementById('btn-feedback-retry');
  if (feedbackRetryBtn) {
    feedbackRetryBtn.addEventListener('click', () => {
      sound.click();
      GameController.retryQuestionImmediately();
    });
  }

  // Modal Feedback: Tombol Kerjakan Soal Lain Dulu (Saat Jawaban Salah)
  const feedbackOtherBtn = document.getElementById('btn-feedback-other');
  if (feedbackOtherBtn) {
    feedbackOtherBtn.addEventListener('click', () => {
      sound.click();
      GameController.leaveQuestionForLater();
    });
  }

  // Modal Pratinjau Soal Terjawab: Tombol Tutup
  const btnClosePreview = document.getElementById('btn-close-preview');
  if (btnClosePreview) {
    btnClosePreview.addEventListener('click', () => {
      sound.click();
      GameController.closePreviewModal();
    });
  }

  // Game Over: Ulangi Level (❤️ x3)
  const gameOverRetryBtn = document.getElementById('btn-gameover-retry');
  if (gameOverRetryBtn) {
    gameOverRetryBtn.addEventListener('click', () => {
      sound.click();
      GameController.retryCurrentLevel();
    });
  }

  // Game Over: Baca Materi Lagi (Kembali ke materi, level diulang dengan 3 nyawa)
  const gameOverMaterialsBtn = document.getElementById('btn-gameover-materials');
  if (gameOverMaterialsBtn) {
    gameOverMaterialsBtn.addEventListener('click', () => {
      sound.click();
      document.getElementById('modal-game-over').classList.add('hidden');
      state.student.hearts = NYAWA_RESET_GAME_OVER;
      delete state.student.zoneProgress[world.currentZoneIndex];

      const zoneData = world.zones.find(z => z.level === world.currentZoneIndex);
      if (zoneData) {
        world.player.x = zoneData.spawnX;
        world.player.y = zoneData.spawnY;
        state.student.worldPos = { x: zoneData.spawnX, y: zoneData.spawnY };
      }
      state.saveStudent();
      world.refreshStations();
      world.updateHUD();
      world.isFrozen = false;

      UI.renderMaterialsScreen(world.currentZoneIndex);
      UI.showScreen('screen-materials');
    });
  }

  // Modal Hasil Level
  const resultRetryBtn = document.getElementById('btn-result-retry');
  if (resultRetryBtn) {
    resultRetryBtn.addEventListener('click', () => {
      sound.click();
      document.getElementById('modal-level-result').classList.add('hidden');
      GameController.retryCurrentLevel();
    });
  }

  const resultToMatBtn = document.getElementById('btn-result-to-materials');
  if (resultToMatBtn) {
    resultToMatBtn.addEventListener('click', () => {
      sound.click();
      document.getElementById('modal-level-result').classList.add('hidden');
      UI.renderMaterialsScreen(world.currentZoneIndex);
      UI.showScreen('screen-materials');
    });
  }

  // Modal Kemenangan Akhir
  const victoryLeaderboardBtn = document.getElementById('btn-victory-leaderboard');
  if (victoryLeaderboardBtn) {
    victoryLeaderboardBtn.addEventListener('click', () => {
      sound.click();
      document.getElementById('modal-victory-final').classList.add('hidden');
      UI.renderLeaderboardScreen();
      UI.showScreen('screen-leaderboard');
    });
  }

  const victoryMenuBtn = document.getElementById('btn-victory-menu');
  if (victoryMenuBtn) {
    victoryMenuBtn.addEventListener('click', () => {
      sound.click();
      document.getElementById('modal-victory-final').classList.add('hidden');
      UI.updateMenuScreen();
      UI.showScreen('screen-menu');
    });
  }

  // Papan Peringkat
  const lbBackBtn = document.getElementById('btn-leaderboard-back');
  if (lbBackBtn) {
    lbBackBtn.addEventListener('click', () => {
      sound.click();
      if (state.student) {
        UI.updateMenuScreen();
        UI.showScreen('screen-menu');
      } else {
        UI.showScreen('screen-home');
      }
    });
  }

  const btnLeaderboardHome = document.getElementById('btn-leaderboard-home');
  if (btnLeaderboardHome) {
    btnLeaderboardHome.addEventListener('click', () => {
      sound.click();
      state.saveStudent();
      UI.showScreen('screen-home');
    });
  }

  // Panel Guru Auth & Tabs
  const openTeacherLoginBtn = document.getElementById('btn-open-teacher-login');
  const teacherPinModal = document.getElementById('modal-teacher-pin');
  const teacherPinInput = document.getElementById('input-teacher-pin');
  const pinErrorMsg = document.getElementById('pin-error-msg');
  const teacherPinSubmitBtn = document.getElementById('btn-teacher-pin-submit');
  const teacherPinCancelBtn = document.getElementById('btn-teacher-pin-cancel');

  if (openTeacherLoginBtn) {
    openTeacherLoginBtn.addEventListener('click', () => {
      sound.click();
      if (teacherPinInput) teacherPinInput.value = '';
      if (pinErrorMsg) pinErrorMsg.classList.add('hidden');
      if (teacherPinModal) teacherPinModal.classList.remove('hidden');
    });
  }

  if (teacherPinCancelBtn) {
    teacherPinCancelBtn.addEventListener('click', () => {
      sound.click();
      if (teacherPinModal) teacherPinModal.classList.add('hidden');
    });
  }

  if (teacherPinSubmitBtn) {
    teacherPinSubmitBtn.addEventListener('click', () => {
      const pin = teacherPinInput.value;
      if (TeacherController.verifyPIN(pin)) {
        sound.click();
        teacherPinModal.classList.add('hidden');
        TeacherController.openPanel();
      } else {
        sound.wrong();
        if (pinErrorMsg) pinErrorMsg.classList.remove('hidden');
      }
    });
  }

  const teacherExitBtn = document.getElementById('btn-teacher-exit');
  if (teacherExitBtn) {
    teacherExitBtn.addEventListener('click', () => {
      sound.click();
      if (state.student) {
        UI.updateMenuScreen();
        UI.showScreen('screen-menu');
      } else {
        UI.showScreen('screen-home');
      }
    });
  }

  document.querySelectorAll('.teacher-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.click();
      document.querySelectorAll('.teacher-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.teacher-tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(btn.dataset.tab);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // Tab 1: Materi
  const teacherChapSelect = document.getElementById('select-teacher-chapter');
  if (teacherChapSelect) {
    teacherChapSelect.addEventListener('change', () => {
      TeacherController.loadChapterForEdit(teacherChapSelect.value);
    });
  }

  const saveChapterBtn = document.getElementById('btn-save-chapter');
  if (saveChapterBtn) {
    saveChapterBtn.addEventListener('click', () => {
      TeacherController.saveChapterEdit();
    });
  }

  const previewToggleBtn = document.getElementById('btn-preview-chapter-toggle');
  if (previewToggleBtn) {
    previewToggleBtn.addEventListener('click', () => {
      TeacherController.togglePreview();
    });
  }

  // Tab 2: Soal
  const teacherLvlSelect = document.getElementById('select-teacher-level');
  if (teacherLvlSelect) {
    teacherLvlSelect.addEventListener('change', () => {
      TeacherController.loadQuestionsForLevel(teacherLvlSelect.value);
    });
  }

  const saveLevelRulesBtn = document.getElementById('btn-save-level-rules');
  if (saveLevelRulesBtn) {
    saveLevelRulesBtn.addEventListener('click', () => {
      TeacherController.saveLevelRules();
    });
  }

  const addQuestionBtn = document.getElementById('btn-add-question');
  if (addQuestionBtn) {
    addQuestionBtn.addEventListener('click', () => {
      TeacherController.openQuestionEditor(null);
    });
  }

  // Modal Editor Soal
  const closeQEditorBtn = document.getElementById('btn-close-q-editor');
  const cancelQEditorBtn = document.getElementById('btn-cancel-q-editor');
  if (closeQEditorBtn) {
    closeQEditorBtn.addEventListener('click', () => {
      document.getElementById('modal-question-editor').classList.add('hidden');
    });
  }
  if (cancelQEditorBtn) {
    cancelQEditorBtn.addEventListener('click', () => {
      document.getElementById('modal-question-editor').classList.add('hidden');
    });
  }

  const formQuestionEditor = document.getElementById('form-question-editor');
  if (formQuestionEditor) {
    formQuestionEditor.addEventListener('submit', (e) => {
      e.preventDefault();
      TeacherController.saveQuestionFromEditor();
    });
  }

  // Tab 3: Backup & Pengaturan
  const exportJsonBtn = document.getElementById('btn-export-json');
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      TeacherController.exportJSON();
    });
  }

  const importJsonInput = document.getElementById('input-import-json');
  if (importJsonInput) {
    importJsonInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        TeacherController.importJSON(e.target.files[0]);
      }
    });
  }

  // Pengaturan Gameplay Petualangan 2D
  const saveGameplayBtn = document.getElementById('btn-save-gameplay-settings');
  if (saveGameplayBtn) {
    saveGameplayBtn.addEventListener('click', () => {
      sound.click();
      TeacherController.saveGameplaySettings();
    });
  }

  const restoreDefaultContentBtn = document.getElementById('btn-restore-default-content');
  if (restoreDefaultContentBtn) {
    restoreDefaultContentBtn.addEventListener('click', () => {
      if (confirm("⚠️ Apakah Anda yakin ingin mengembalikan seluruh materi dan soal ke data bawaan kurikulum TJKT?")) {
        state.restoreDefaultContent();
        TeacherController.loadChapterForEdit(1);
        TeacherController.loadQuestionsForLevel(1);
        UI.showToast("Materi dan bank soal berhasil dikembalikan ke standar awal!", '🔄');
      }
    });
  }

  const resetLbTeacherBtn = document.getElementById('btn-reset-leaderboard-teacher');
  if (resetLbTeacherBtn) {
    resetLbTeacherBtn.addEventListener('click', () => {
      if (confirm("Apakah Anda yakin ingin mengosongkan papan peringkat seluruh siswa?")) {
        state.leaderboard = [];
        state.saveLeaderboard();
        UI.showToast("Papan peringkat berhasil dibersihkan.", '🗑️');
      }
    });
  }

  const changePinSubmitBtn = document.getElementById('btn-change-pin-submit');
  if (changePinSubmitBtn) {
    changePinSubmitBtn.addEventListener('click', () => {
      const newPinInput = document.getElementById('input-new-pin');
      const val = newPinInput ? newPinInput.value.trim() : '';
      if (val.length < 4) {
        alert("PIN minimal terdiri dari 4 karakter!");
        return;
      }
      TeacherController.setTeacherPIN(val);
      newPinInput.value = '';
      UI.showToast("PIN Panel Guru berhasil diperbarui!", '🔑');
    });
  }
}

// Helper: Escape HTML string
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Inisialisasi Aplikasi Saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await Auth.init();
    state.loadStudent();
    await state.loadRemoteStudent();
  } catch (err) {
    console.error('Inisialisasi Supabase EDUEST gagal:', err);
    const msg = document.getElementById('auth-error');
    if (msg) {
      msg.textContent = 'Koneksi layanan akun belum siap. Periksa konfigurasi Supabase dan koneksi internet.';
      msg.classList.remove('hidden');
    }
  }
  await EduestImageStore.init();
  TeacherController.setupQuestionEditorImageHandlers();
  initEventListeners();
});

/* Aksesibilitas: elemen klik non-tombol bisa dipakai lewat keyboard */
document.querySelectorAll('.hub-card, .class-chip').forEach(function (el) {
  el.setAttribute('tabindex', '0');
  el.setAttribute('role', 'button');
  el.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
  });
});

/* Navigasi: Beranda di semua halaman, Cara Bermain, ilustrasi materi */
(function () {
  function on(id, fn) { var b = document.getElementById(id); if (b) b.addEventListener('click', fn); }
  function home() { sound.click(); UI.showScreen('screen-home'); }
  function howto() { sound.click(); document.getElementById('modal-world-tutorial').classList.remove('hidden'); }
  on('btn-teacher-home', home);
  on('btn-home-howto', howto); on('btn-menu-howto', howto);

  var C = ['#d9731a', '#2b6fd1', '#8a5a36', '#1f8f4e'];
  function t(x, y, sz, w, txt) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="sans-serif" font-size="' + sz +
      '" font-weight="' + w + '" fill="#fff">' + txt + '</text>';
  }
  function flow(items, arrows) {
    var n = items.length, gap = 44, bw = Math.floor((680 - (n - 1) * gap) / n);
    var s = '<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' +
      items.map(function (i) { return i[0]; }).join(', ') + '">';
    items.forEach(function (it, i) {
      var x = i * (bw + gap);
      s += '<rect x="' + x + '" y="20" width="' + bw + '" height="110" rx="12" fill="' + C[i % 4] + '"/>' +
        t(x + bw / 2, 68, 20, 700, it[0]) + t(x + bw / 2, 96, 13, 400, it[1]);
      if (arrows && i < n - 1) {
        s += '<path d="M' + (x + bw + 8) + ' 75h28m-8-8l8 8-8 8" stroke="#9cc4f5" stroke-width="3" fill="none" stroke-linecap="round"/>';
      }
    });
    return s + '</svg>';
  }
  function stack(items) {
    var s = '<svg viewBox="0 0 680 ' + (items.length * 62 + 6) + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lapisan sistem komputer">';
    items.forEach(function (it, i) {
      var y = i * 62 + 3;
      s += '<rect x="60" y="' + y + '" width="560" height="52" rx="10" fill="' + C[i % 4] + '"/>' +
        t(340, y + 33, 17, 600, it[0] + ': ' + it[1]);
    });
    return s + '</svg>';
  }
  var ILLUS = {
    1: [flow([['Hardware', 'perangkat fisik'], ['Software', 'program dan instruksi'], ['Brainware', 'pengguna']], false), 'Tiga elemen sistem komputer'],
    2: [flow([['Input', 'keyboard, mouse'], ['Proses', 'CPU, RAM'], ['Output', 'monitor, printer'], ['Storage', 'SSD, HDD']], true), 'Alur kerja hardware komputer'],
    3: [flow([['Sistem', 'OS, driver'], ['Aplikasi', 'Office, browser'], ['Utilitas', 'antivirus, backup']], false), 'Kelompok software'],
    4: [stack([['Pengguna', 'menjalankan aplikasi'], ['Aplikasi', 'dijalankan di atas OS'], ['Sistem operasi', 'mengatur sumber daya'], ['Hardware', 'CPU, RAM, disk']]), 'Hubungan hardware dan software berlapis']
  };

  var orig = UI.renderMaterialsScreen;
  UI.renderMaterialsScreen = function () {
    var r = orig.apply(this, arguments);
    var body = document.getElementById('mat-chapter-body');
    var badge = document.getElementById('mat-chapter-badge');
    var id = badge ? parseInt(badge.textContent.replace(/\D/g, ''), 10) : 0;
    if (body && ILLUS[id] && !body.querySelector('.material-illus, .material-img-wrap')) {
      body.insertAdjacentHTML('afterbegin', '<figure class="material-illus">' + ILLUS[id][0] +
        '<figcaption>' + ILLUS[id][1] + '</figcaption></figure>');
    }
    var chaps = (state.content && state.content.chapters) || [];
    document.querySelectorAll('.chapter-tab-pill').forEach(function (b, i) {
      if (chaps[i]) {
        b.title = chaps[i].title;
        var nm = document.createElement('b'); nm.textContent = 'Bab ' + (i + 1);
        var sub = document.createElement('span'); sub.textContent = chaps[i].title.replace(/^\s*bab\s*\d+\s*[:.-]\s*/i, '');
        b.textContent = ''; b.appendChild(nm); b.appendChild(sub);
      }
    });
    return r;
  };
})();
