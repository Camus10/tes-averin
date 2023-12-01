# Tes Seleksi PT Averin Teknologi Informatika

1. Pengembangan Aplikasi:

- Buatlah aplikasi dengan operasi CRUD (Get, Post, Delete, Update) menggunakan bahasa pemrograman yang Anda kuasai (Golang/NestJS/NextJS/NodeJS/Laravel).
- Gunakan database MySQL untuk menyimpan data.

2. Uji Coba API di Postman:

- Pastikan API berhasil diuji menggunakan Postman untuk setiap operasi CRUD.
- Berikan hasil uji coba yang mencakup response code dan body.

3. Langkah-langkah Pengambilan Project:

- Jelaskan cara pengambilan project mulai dari cloning repo GitHub sampai berhasil dirunning agar mempermudah pengujian.
- Jelaskan langkah-langkah tersebut kedalam README.md project kalian.

# Cara Penggunaan

Berikut adalah langkah-langkah untuk meng-clone proyek ini dan menjalankannya di komputer Anda.

1. **Clone Repositori**

   Buat folder untuk project baru lalu buka terminal dan jalankan perintah berikut untuk meng-clone repositori dari GitHub:

   ```bash
   git clone https://github.com/Camus10/tes-averin.git
   cd tes-averin
   ```
    
2. **Konfigurasi Database**

    Database yang digunakan adalah MySQL. Untuk itu pastikan database dan table sudah dibuat.
    ```bash
    CREATE DATABASE crud_app;
    USE crud_app;

    CREATE TABLE data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
    );
    ```
    Tambahkan file .env di lokasi yang sama dengan index.js. Ini akan digunakan untuk akses kredensial ke database. Sesuaikan dengan konfigurasi di lokal masing-masing.
    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=root
    DB_NAME=crud_app
    ```

3. **Install Dependensi**

    Setelah file coding sudah tersedia di lokal, kemudian library modul Node.Js harus diinstall terlebih dahulu

    ```bash
    npm install
    npm start
    ```
    
4. **Pengetesan**

    Aplikasi akan berjalan sesuai konfigurasinya di http://localhost:3000/ dengan dokumentasi API menggunakan Swagger di http://localhost:3000/api-docs/.
    

    Tambahan jika ingin melakukan pengujian unit test bisa dilakukan dengan cara

    ```bash
    npm test
    ```
