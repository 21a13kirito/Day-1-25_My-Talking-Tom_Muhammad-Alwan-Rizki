# Dokumentasi Day 1 — From AI to GitHub

## 1. Rangkuman Materi

### Prompt Engineering
Prompt adalah instruksi yang kita berikan ke model AI (bisa pertanyaan, kata kunci, instruksi panjang, atau potongan kode). Prompt engineering adalah cara merancang instruksi supaya jawaban AI tepat, relevan, dan layak dipakai.

- **Context is key**: "Create student task planner" jauh kalah hasilnya dibanding prompt yang menjelaskan tujuan, kebutuhan, dan batasan.
- **Struktur prompt yang baik**: Role, Task, Context, Format.
- **Taktik**: pakai kata kerja aksi, tentukan panjang/format output, sebutkan target audiens, sertakan fakta/data, rujuk dokumen tertentu, dan jelaskan istilah penting.
- **Keuntungan**: performa AI meningkat, bias/respons ofensif berkurang, hasil lebih terkontrol dan dapat diprediksi, pengalaman pengguna lebih baik.

### Git dan GitHub
- **Git**: version control system terdistribusi untuk melacak siapa, kapan, dan apa yang berubah di file (dibuat Linus Torvalds, 2005), bekerja secara lokal.
- **GitHub**: platform berbasis web untuk menyimpan repository Git secara online dan berkolaborasi.
- **Alur kerja Git**: Working Directory → Staging Area (`git add`) → Repository/.git directory (`git commit`).

### Perintah Penting
```bash
git init                       # mulai repo baru
git add .                      # pindahkan file ke staging area
git commit -m "pesan"          # simpan ke repository
git remote add origin <url>    # hubungkan ke GitHub
git push origin main           # kirim ke GitHub
git pull origin main           # ambil & gabungkan perubahan
git clone "url"                # salin repo dari GitHub
```

### Setup
1. Install Git, cek dengan `git --version`.
2. Atur identitas: `git config --global user.name` dan `user.email`.
3. Install VS Code, cek dengan `code --version`.
4. Buat SSH key (`ssh-keygen -t ed25519`), tambahkan ke GitHub, tes dengan `ssh -T git@github.com`.

### Praktik: Student Task Planner
Alurnya: tulis prompt ke AI untuk membuat web app sederhana → `git init` → commit & push ke GitHub → ubah sesuatu → commit & push lagi.

## 2. Poin Penting / Hal Baru yang Dipelajari
- Prompt yang spesifik (role, task, context, format, batasan) membuat hasil AI jauh lebih berguna.
- Prompt yang bagus juga meminta AI memverifikasi hasilnya, bukan sekadar mengaku "sudah jalan".
- Git dan GitHub itu berbeda: Git alatnya (lokal), GitHub tempat menyimpannya (online).
- Staging area memberi kontrol: kita memilih perubahan mana yang masuk ke commit berikutnya.
- Ed25519 adalah skema tanda tangan kurva eliptik (Curve25519) yang aman dan cepat, cocok untuk SSH key.

## 3. Pendapat Pribadi tentang Day 1 Proyek Workshop
Menurut saya, Day 1 ini bermanfaat karena menggabungkan dua hal yang sekarang sangat dibutuhkan, memakai AI dengan benar dan mengelola hasil kerja dengan Git/GitHub. Contoh prompt dengan konteks vs tanpa konteks membuat saya sadar bahwa kualitas hasil AI sangat bergantung pada kualitas instruksi kita. Bagian Git juga terasa relevan untuk bidang keamanan siber, karena riwayat perubahan dan autentikasi SSH adalah praktik dasar yang rapi dan aman. Sesi praktiknya juga sudah bagus karena membantu peserta yang baru mengenal terminal.