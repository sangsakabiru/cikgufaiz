// --- SISTEM NAVIGASI SPA ---
function navigateTo(pageId) {
    const pages = document.querySelectorAll('.page, .page-scroll');
    pages.forEach(page => page.classList.remove('active'));

    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// --- LOG MASUK MURID ---
function handleLogin(event) {
    event.preventDefault(); 
    const inputName = document.getElementById('student-name').value.trim();
    const inputClass = document.getElementById('student-class').value.trim();

    sessionStorage.setItem('namaMurid', inputName.toUpperCase());
    sessionStorage.setItem('kelasMurid', inputClass.toUpperCase());

    document.getElementById('user-display').innerText = inputName.toUpperCase();
    navigateTo('page-home');
}

// --- PENGURUSAN PERMAINAN ---
function startGame(gameId) {
    navigateTo('game-' + gameId);
    if(gameId === 1) {
        initGame1();
    }
}

// === LOGIK AKTIVITI 1: DRAG & DROP ===
function initGame1() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZone = document.getElementById('drop-target-g1');

    dragItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    });

    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(itemId);
        
        const placeholder = dropZone.querySelector('.drop-placeholder');
        if(placeholder) placeholder.style.display = 'none';

        dropZone.appendChild(draggedElement);
    });
}

function semakGame1() {
    const dropZone = document.getElementById('drop-target-g1');
    const itemsInZone = dropZone.querySelectorAll('.drag-item');
    
    let betul = 0;
    itemsInZone.forEach(item => {
        if(item.getAttribute('data-valid') === 'true') {
            betul++;
            item.style.background = '#2ecc71';
            item.style.color = 'white';
        } else {
            item.style.background = '#e74c3c';
            item.style.color = 'white';
        }
    });

    alert(`Aktiviti Selesai! Skor anda dihantar.`);
    document.getElementById('game-score-text').innerText = `${betul} / 3`;
    navigateTo('page-result');
}

// === LOGIK AKTIVITI 2: KLIK & ISIH ===
const game2Items = [
    { name: "Botol Plastik", type: "recycle" },
    { name: "Kulit Pisang", type: "organic" },
    { name: "Surat Khabar", type: "recycle" },
    { name: "Sisa Makanan", type: "organic" }
];
let currentG2Index = 0;
let g2Score = 0;

function sortItem(chosenType) {
    const currentItemElement = document.getElementById('current-sort-item');
    const actualType = currentItemElement.getAttribute('data-type');
    
    if(chosenType === actualType) {
        g2Score++;
    }

    const listId = chosenType === 'recycle' ? 'recycle-list' : 'organic-list';
    const listZone = document.getElementById(listId);
    listZone.innerHTML += `<div class="badge-item">${currentItemElement.innerText}</div>`;

    currentG2Index++;
    if(currentG2Index < game2Items.length) {
        currentItemElement.innerText = game2Items[currentG2Index].name;
        currentItemElement.setAttribute('data-type', game2Items[currentG2Index].type);
    } else {
        alert("Aktiviti 2 Selesai!");
        document.getElementById('game-score-text').innerText = `${g2Score} / ${game2Items.length}`;
        navigateTo('page-result');
        currentG2Index = 0;
        g2Score = 0;
    }
}
