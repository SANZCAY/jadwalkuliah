// Fungsi untuk mengupdate jam secara real-time
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById("clock").textContent = timeString;
}

// Fungsi untuk menampilkan kalender
function showCalendar() {
    const calendar = document.getElementById("calendar");
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const monthName = monthNames[currentMonth];

    let calendarHTML = `<h2>${monthName} ${currentYear}</h2><table>`;
    calendarHTML += "<tr><th>Minggu</th><th>Senin</th><th>Selasa</th><th>Rabu</th><th>Kamis</th><th>Jumat</th><th>Sabtu</th></tr>";

    let day = 1;
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();

    for (let i = 0; i < 6; i++) {
        calendarHTML += "<tr>";
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                calendarHTML += "<td></td>";
            } else if (day <= daysInMonth) {
                if (day === currentDay) {
                    calendarHTML += `<td class="today">${day}</td>`;
                } else {
                    calendarHTML += `<td>${day}</td>`;
                }
                day++;
            } else {
                calendarHTML += "<td></td>";
            }
        }
        calendarHTML += "</tr>";
    }

    calendarHTML += "</table>";
    calendar.innerHTML = calendarHTML;
}

// Event listener untuk menu Dashboard
document.getElementById("dashboard").addEventListener("click", function() {
    // Menampilkan konten Dashboard
    document.querySelector(".dashboard-left").style.display = "block";
    document.querySelector(".dashboard-right").style.display = "block";

    // Menyembunyikan konten Biodata dan Jadwal
    document.querySelector(".biodata").style.display = "none";
    document.querySelector(".jadwal").style.display = "none";
});

// Event listener untuk menu Biodata
document.getElementById("biodata").addEventListener("click", function() {
    // Menyembunyikan konten Dashboard dan Jadwal
    document.querySelector(".dashboard-left").style.display = "none";
    document.querySelector(".dashboard-right").style.display = "none";
    document.querySelector(".jadwal").style.display = "none";

    // Menampilkan konten Biodata
    document.querySelector(".biodata").style.display = "block";
});

// Event listener untuk menu Jadwal
document.getElementById("jadwal").addEventListener("click", function() {
    // Menyembunyikan konten Dashboard dan Biodata
    document.querySelector(".dashboard-left").style.display = "none";
    document.querySelector(".dashboard-right").style.display = "none";
    document.querySelector(".biodata").style.display = "none";

    // Menampilkan konten Jadwal
    document.querySelector(".jadwal").style.display = "block";
});
    
// Update jam dan kalender setiap detik
setInterval(updateClock, 1000);
showCalendar();

// Fungsi untuk menampilkan jadwal kuliah berdasarkan hari
function tampilkanJadwalHari(hari) {
    // Ambil tabel jadwal
    const tabelJadwal = document.querySelector('#jadwal-table');
    
    // Dapatkan semua baris dalam tabel jadwal
    const semuaBaris = tabelJadwal.querySelectorAll('tbody tr');

    // Dapatkan tabel jadwal di menu Dashboard
    const dashboardJadwalTable = document.querySelector('#dashboard-jadwal-table');
    const tbody = dashboardJadwalTable.querySelector('tbody');

    // Hapus semua baris yang ada dalam tabel jadwal di menu Dashboard
    tbody.innerHTML = "";

    // Loop melalui semua baris dan tambahkan jadwal ke tabel di menu Dashboard
    for (const baris of semuaBaris) {
        const kolomHari = baris.querySelector('td:nth-child(1)').textContent;

        // Jika kolomHari cocok dengan hari yang dipilih
        if (kolomHari === hari) {
            const kolomMataKuliah = baris.querySelector('td:nth-child(2)').textContent;
            const kolomWaktu = baris.querySelector('td:nth-child(3)').textContent;

            // Buat sebuah baris baru dalam tabel di menu Dashboard
            const newRow = document.createElement('tr');
            const hariCell = document.createElement('td');
            hariCell.textContent = kolomHari;
            const mataKuliahCell = document.createElement('td');
            mataKuliahCell.textContent = kolomMataKuliah;
            const waktuCell = document.createElement('td');
            waktuCell.textContent = kolomWaktu;

            // Tambahkan sel-sel ke dalam baris baru
            newRow.appendChild(hariCell);
            newRow.appendChild(mataKuliahCell);
            newRow.appendChild(waktuCell);

            // Tambahkan baris baru ke dalam tabel di menu Dashboard
            tbody.appendChild(newRow);
        }
    }
}

// ... Kode JavaScript sebelumnya ...

// Inisialisasi menu Dashboard
const dashboardMenu = document.querySelector('#dashboard');
dashboardMenu.addEventListener('click', function () {
    // Dapatkan tanggal hari ini
    const today = new Date();
    const options = { weekday: 'long' }; // Format hari dalam bahasa Inggris
    const hariIni = today.toLocaleDateString('en-US', options).toLowerCase(); // Ubah ke huruf kecil

    // Ganti konten menu Dashboard dengan jadwal kuliah berdasarkan hari ini
    tampilkanJadwalHari(hariIni);
});

// Fungsi untuk menampilkan jadwal kuliah berdasarkan hari
function tampilkanJadwalHari(hari) {
    // Ambil tabel jadwal
    const tabelJadwal = document.querySelector('#jadwal-table');

    // Dapatkan semua baris dalam tabel jadwal
    const semuaBaris = tabelJadwal.querySelectorAll('tbody tr');

    // Dapatkan tabel jadwal di menu Dashboard
    const dashboardJadwalTable = document.querySelector('#dashboard-jadwal-table');
    const tbody = dashboardJadwalTable.querySelector('tbody');

    // Hapus semua baris yang ada dalam tabel jadwal di menu Dashboard
    tbody.innerHTML = "";

    // Loop melalui semua baris dan tambahkan jadwal ke tabel di menu Dashboard
    for (const baris of semuaBaris) {
        const kolomHari = baris.querySelector('td:nth-child(1)').textContent.trim().toLowerCase(); // Ubah ke huruf kecil

        // Jika kolomHari cocok dengan hari yang dipilih
        if (kolomHari === hari) {
            const kolomMataKuliah = baris.querySelector('td:nth-child(2)').textContent;
            const kolomWaktu = baris.querySelector('td:nth-child(3)').textContent;

            // Buat sebuah baris baru dalam tabel di menu Dashboard
            const newRow = document.createElement('tr');
            const hariCell = document.createElement('td');
            hariCell.textContent = kolomHari;
            const mataKuliahCell = document.createElement('td');
            mataKuliahCell.textContent = kolomMataKuliah;
            const waktuCell = document.createElement('td');
            waktuCell.textContent = kolomWaktu;

            // Tambahkan sel-sel ke dalam baris baru
            newRow.appendChild(hariCell);
            newRow.appendChild(mataKuliahCell);
            newRow.appendChild(waktuCell);

            // Tambahkan baris baru ke dalam tabel di menu Dashboard
            tbody.appendChild(newRow);
        }
    }
}
