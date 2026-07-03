/**
 * Fungsi Kawalan Navigasi Halaman SPA (Single Page Application)
 * Membuka halaman sasaran dan menyembunyikan halaman lain
 */
function navigateTo(pageId) {
    // Cari semua elemen bercirikan sistem 'page' atau 'page-scroll'
    const pages = document.querySelectorAll('.page, .page-scroll');
    
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Aktifkan halaman yang dipilih
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
        // Skrol automatik ke atas skrin demi keselesaan UI
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.error(`Ralat: ID Halaman "${pageId}" tidak dijumpai.`);
    }
}

/**
 * Menguruskan Log Masuk Pelajar
 * Menyimpan data sesi dalam SessionStorage
 */
function handleLogin(event) {
    // Menghalang bentuk asal tindakan hantar form (elak refresh halaman)
    event.preventDefault(); 
    
    const inputName = document.getElementById('student-name').value.trim();
    const inputClass = document.getElementById('student-class').value.trim();

    if (inputName === "" || inputClass === "") {
        alert("Sila isi nama dan kelas anda!");
        return;
    }

    // Rekod masa mula sesi pembelajaran murid
    const startTime = new Date().toLocaleTimeString();

    // Simpan ke memori pelayar internet sementara (Session Storage)
    sessionStorage.setItem('namaMurid', inputName.toUpperCase());
    sessionStorage.setItem('kelasMurid', inputClass.toUpperCase());
    sessionStorage.setItem('masaMula', startTime);

    // Paparkan nama murid secara dinamik di penjuru atas Menu Utama
    document.getElementById('user-display').innerText = inputName.toUpperCase();

    // Alihkan murid ke Halaman Utama (Home Menu) dengan animasi
    navigateTo('page-home');
}
