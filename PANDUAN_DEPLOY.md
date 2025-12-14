# Panduan Deployment Otomatis ke VPS

Halo! Karena saya tidak memiliki akses langsung ke server VPS Anda (demi keamanan), saya telah membuatkan **"Skrip Ajaib"** (`deploy-vps.sh`) yang akan melakukan semua pekerjaan berat untuk Anda.

Berikut adalah langkah-langkah mudah untuk menaikkan website ini ke VPS:

## Langkah 1: Push Kode ke GitHub (Jika belum)
Pastikan kode project ini sudah ada di GitHub agar VPS bisa mengambilnya.
1. Buat repository baru di [GitHub](https://github.com/new).
2. Jalankan perintah berikut di terminal VS Code ini:
   ```bash
   git add .
   git commit -m "Siap deploy"
   git branch -M main
   git remote add origin https://github.com/USERNAME_ANDA/NAMA_REPO.git
   git push -u origin main
   ```
   *(Ganti URL dengan link repository Anda)*

## Langkah 2: Masuk ke VPS
Buka terminal (Command Prompt/Powershell) dan masuk ke VPS Anda:
```bash
ssh root@ALAMAT_IP_VPS_ANDA
```
*(Masukkan password jika diminta)*

## Langkah 3: Jalankan Skrip Otomatis
Setelah masuk di VPS, copy dan paste perintah berikut satu per satu:

1. **Download Skrip Saya:**
   Disini saya asumsikan Anda belum memindahkan file `deploy-vps.sh` ke sana. Cara termudah adalah membuat filenya langsung di VPS:
   ```bash
   nano deploy.sh
   ```
   *(Lalu copy **isi file** `deploy-vps.sh` yang ada di project ini, paste ke layar hitam VPS, lalu tekan `Ctrl+X`, lalu `Y`, lalu `Enter`)*

   **ATAU** cara yang lebih gampang jika Anda sudah push file `deploy-vps.sh` ke GitHub:
   ```bash
   wget https://raw.githubusercontent.com/USERNAME_ANDA/NAMA_REPO/main/deploy-vps.sh
   chmod +x deploy-vps.sh
   ```

2. **Eksekusi Skrip:**
   ```bash
   ./deploy-vps.sh
   ```

## Langkah 4: Ikuti Petunjuk di Layar
Skrip akan bertanya 3 hal:
1. **Domain Name**: Masukkan nama domain (contoh: `sportif18.com`) atau IP Address jika belum punya domain.
2. **Git Repository URL**: Masukkan link repository GitHub Anda.
3. **Database Password**: Masukkan password baru (terserah Anda) untuk database.

## Apa yang dilakukan skrip ini?
- ✅ Mengupdate sistem VPS
- ✅ Menginstall NodeJS, Database, dan Web Server
- ✅ Mendownload kode website Anda
- ✅ Menyiapkan database PostgreSQL secara otomatis
- ✅ build aplikasi Next.js
- ✅ Menjalankan aplikasi 24 jam nonstop
- ✅ Mengatur domain dan SSL (HTTPS) otomatis

Selamat mencoba! Jika ada error, copy error-nya dan kirim ke sini.
