// Ganti dengan ID properti Google Analytics Anda
const GA_PROPERTY_ID = 'G-7THNLDPDVK'; // Untuk Universal Analytics
// const GA_PROPERTY_ID = 'G-XXXXXXXXXX'; // Untuk Google Analytics 4

// Fungsi untuk mengambil data dari Google Analytics
async function fetchAnalyticsData() {
    const accessToken = 'G-7THNLDPDVK'; // Ganti dengan token akses Anda
    const response = await fetch(`https://analytics.googleapis.com/v3/data/ga?ids=ga:${GA_PROPERTY_ID}&metrics=ga:users,ga:sessions,ga:pageviews,ga:uniquePageviews&dimensions=ga:date&access_token=${accessToken}`);

    if (!response.ok) {
        console.error('Error fetching data from Google Analytics:', response.statusText);
        return;
    }

    const data = await response.json();
    updateWidgetData(data);
}

// Fungsi untuk memperbarui widget dengan data yang diambil
function updateWidgetData(data) {
    if (data.rows && data.rows.length > 0) {
        // Ambil total data dari response
        const totals = data.rows[0]; // Ambil data hari ini
        const totalVisitor = totals[0]; // Total Visitor
        const totalView = totals[1]; // Total View
        const onlineCount = 0; // Logika untuk online count bisa ditambahkan sesuai kebutuhan
        const todayVisits = totals[2]; // Kunjungan hari ini, jika tersedia
        const uniqueVisitors = totals[3]; // Pengunjung Unik

        // Memperbarui data statistik di widget
        updateStats(totalVisitor, onlineCount, totalView, todayVisits, uniqueVisitors);
    } else {
        console.warn('No data found in Google Analytics response.');
    }
}

// Fungsi untuk memperbarui data statistik
function updateStats(totalVisitor, onlineCount, totalView, todayVisits, uniqueVisitors) {
    document.getElementById('totalVisitor').innerText = totalVisitor || 0;
    document.getElementById('onlineCount').innerText = onlineCount || 0;
    document.getElementById('totalView').innerText = totalView || 0;
    document.getElementById('todayVisits').innerText = todayVisits || 0;
    document.getElementById('uniqueVisitors').innerText = uniqueVisitors || 0;
}

// Mengelola tampilan widget
function toggleWidget() {
    const icon = document.getElementById('infoIcon');
    const widget = document.getElementById('infoWidget');

    if (widget.style.display === 'block') {
        widget.style.display = 'none';
        icon.style.display = 'flex'; // Tampilkan kembali ikon
    } else {
        widget.style.display = 'block';
        icon.style.display = 'none'; // Sembunyikan ikon
        fetchAnalyticsData(); // Ambil data saat widget dibuka
    }
}

// Menyembunyikan widget
function closeWidget() {
    const icon = document.getElementById('infoIcon');
    const widget = document.getElementById('infoWidget');

    widget.style.display = 'none'; // Sembunyikan widget
    icon.style.display = 'flex'; // Tampilkan kembali ikon
}

// Menghitung jumlah pengunjung
//let visitorCount = localStorage.getItem('visitorCount') || 0;
//visitorCount++;
//localStorage.setItem('visitorCount', visitorCount);

// Tampilkan total pengunjung di widget
document.getElementById('totalVisitor').innerText = visitorCount;