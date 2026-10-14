// scripts.js
// Data CV: edit konten di sini. Pastikan field sesuai struktur.
const cvs = [
  {
    id: 'sinta',
    name: 'Sinta Nurhandayani',
    role: 'Manajemen Pendidikan',
    theme: 'pink',
    contact: {
      phone: '+62 823-1532-7613',
      email: 'sinnur4107@gmail.com',
      location: 'Jakarta Selatan'
    },
    profile: `Mahasiswi Manajemen Pendidikan yang aktif dalam kepanitiaan, pengabdian masyarakat, dan berbagai kegiatan selama perkuliahan. Memiliki kemampuan komunikasi, adaptasi, dan tanggung jawab. Berkomitmen terus mengembangkan keterampilan dan menambah pengalaman.`,
    education: [
      { period: '2012 - 2013', title: 'RA Ar-Ridho' },
      { period: '2013 - 2019', title: 'MIN 09 Jakarta' },
      { period: '2019 - 2022', title: 'MTsN 32 Jakarta' },
      { period: '2022 - 2025', title: 'MAN 22 Jakarta' },
      { period: '2025 - Sekarang', title: 'UIN Syarif Hidayatullah' }
    ],
    experience: [
      { period: '2019 - 2020', title: 'Anggota Aktif Ekstrakulikuler Saman — MTsN 32 Jakarta' },
      { period: '2022 - 2024', title: 'Anggota Aktif PMR — Bendahara' },
      { period: '2023', title: 'Staf Pelaksana Lomba PMR Tingkat Regional — Timekeeper' },
      { period: '2024 - 2026', title: 'Staf Pelaksana PBak / Divisi Kesehatan' }
    ],
    skills: ['Microsoft Office','Public Speaking','Event Coordination','Manajemen Waktu']
  },
  {
    id: 'raya',
    name: 'Raya Kamila Cb Winata',
    role: 'Pelajar / Organisasi',
    theme: 'lavender',
    contact: {
      phone: '08888794599',
      email: 'rayacbwinata@gmail.com',
      location: 'Jakarta'
    },
    profile: `Ringkasan singkat pengalaman organisasi, lomba, dan pendidikan. Aktif di banyak kegiatan ekstrakurikuler.`,
    education: [
      { period: '2012 - 2013', title: 'TK Miftahul Mu\'in' },
      { period: '2013 - 2019', title: 'SDN 012 Pagi' },
      { period: '2019 - 2022', title: 'MTsN 8 Jakarta Barat' },
      { period: '2022 - 2025', title: 'MAN 12 Jakarta Barat' },
      { period: '2025 - Sekarang', title: 'UIN Syarif Hidayatullah Jakarta' }
    ],
    experience: [
      { period: '2020 - 2022', title: 'Anggota aktif PMR & DrumBand & Paskibra' },
      { period: '2021 - 2022', title: 'Beberapa pengalaman lomba dan kegiatan sekolah' }
    ],
    skills: ['Organisasi','DrumBand','Paskibra','Komunikasi']
  },
  {
    id: 'adib',
    name: 'Adib Heliansyah',
    role: 'Komunikator / Manajemen',
    theme: 'mint',
    contact: {
      phone: '+62 85715575603',
      email: 'adibheliansyah@gmail.com',
      location: 'Gunung Putri, Bekasi'
    },
    profile: `Memiliki pengalaman 3 tahun berorganisasi, kemampuan komunikasi, dan pemimpin tim. Aktif dalam perencanaan acara dan dekorasi.`,
    education: [
      { period: '2025 - Sekarang', title: 'Sarjana — Manajemen Pendidikan | UIN Syarif Hidayatullah' }
    ],
    experience: [
      { period: 'Feb 2023 - Feb 2024', title: 'Berbagai kegiatan kepanitiaan dan event' },
      { period: '2024 - 2025', title: 'Koordinator kegiatan & pelatihan' }
    ],
    skills: ['Leadership','Event Design','Public Speaking','Manajemen Proyek']
  }
];

// Helper: create card html
function makeCard(cv){
  const el = document.createElement('button');
  el.className = 'card';
  el.setAttribute('data-id', cv.id);
  el.setAttribute('aria-label', `Buka CV ${cv.name}`);
  el.innerHTML = `
    <div class="avatar">${cv.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
    <div class="meta">
      <h3>${cv.name}</h3>
      <p>${cv.role}</p>
    </div>
  `;
  el.addEventListener('click', ()=> openCV(cv));
  return el;
}

// Populate cards
const cardsRoot = document.getElementById('cards');
cvs.forEach(cv => cardsRoot.appendChild(makeCard(cv)));

// Modal controls
const modal = document.getElementById('cvModal');
const closeBtn = document.getElementById('closeBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const cvContent = document.getElementById('cvContent');
const printBtn = document.getElementById('printBtn');

closeBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });
printBtn.addEventListener('click', ()=> window.print());

function openCV(cv){
  // Set theme on modal-inner's ancestor for CSS variables
  document.documentElement.setAttribute('data-theme', cv.theme);
  // Build CV HTML
  cvContent.innerHTML = `
    <div class="cv-content-inner" data-theme="${cv.theme}">
      <div class="sidebar">
        <h2>${cv.name}</h2>
        <div class="small">${cv.role}</div>
        <ul class="contact-list">
          <li><span class="label">📞</span> ${cv.contact.phone}</li>
          <li><span class="label">✉️</span> ${cv.contact.email}</li>
          <li><span class="label">📍</span> ${cv.contact.location}</li>
        </ul>
        <div class="section">
          <h3>Profil</h3>
          <p>${cv.profile}</p>
        </div>
        <div class="section">
          <h3>Keterampilan</h3>
          <div class="skills">
            ${cv.skills.map(s => `<span class="skill-badge">${s}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="maincv">
        <div class="hero">
          <div>
            <h1 class="name">${cv.name}</h1>
            <div class="role">${cv.role}</div>
          </div>
        </div>

        <section class="section">
          <h3>Pendidikan</h3>
          <div class="timeline">
            ${cv.education.map(ed => `
              <div class="timeline-item">
                <time>${ed.period}</time>
                <div class="title">${ed.title}</div>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="section">
          <h3>Pengalaman</h3>
          <div class="timeline">
            ${cv.experience.map(exp => `
              <div class="timeline-item">
                <time>${exp.period}</time>
                <div class="title">${exp.title}</div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    </div>
  `;
  // show modal
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
  // focus management
  closeBtn.focus();
}

function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
  // reset theme
  document.documentElement.removeAttribute('data-theme');
}