/**
 * app.js - Presentation Layer & DOM Controller
 * Dynamic Client-Side Rendering (CSR), Universal Dynamic Modal, UI States, & Form Handler
 */

class App {
  constructor() {
    this.state = {
      profile: null,
      projects: [],
      services: [],
      activeCategory: 'all',
      orders: []
    };

    this.STORAGE_KEY = 'PPW_WEEK4_ORDERS';
    this.init();
  }

  /**
   * Inisialisasi Aplikasi
   */
  async init() {
    this.loadOrdersFromLocalStorage();
    this.setupEventListeners();
    await this.loadInitialData();
  }

  /**
   * Sanitasi String defensif untuk mencegah DOM-Based Cross-Site Scripting (XSS)
   * @param {string} str 
   */
  escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Memuat Data Awal (Profile, Projects, Services) & Mengelola UI States
   */
  async loadInitialData() {
    this.renderProjectsLoadingState();
    this.renderServicesLoadingState();

    try {
      // Pemanggilan Asinkron Paralel via Promise.all
      const [profileData, projectsData, servicesData] = await Promise.all([
        ApiService.getProfile(),
        ApiService.getProjects(),
        ApiService.getServices()
      ]);

      this.state.profile = profileData;
      this.state.projects = projectsData;
      this.state.services = servicesData;

      // Sukses State: Render ke DOM
      this.renderCategoryFilters();
      this.renderProjects();
      this.renderServicesDropdown();
      this.renderServicesCatalog();
      this.updateOrderBadgeUI();

    } catch (error) {
      console.error('[App Init Error]:', error);
      this.renderProjectsErrorState(error.message);
      this.renderServicesErrorState(error.message);
      this.showToastNotification('Kesalahan Koneksi Data', 'Gagal memuat data dari penyedia JSON API: ' + error.message, 'danger');
    }
  }

  /**
   * Status UI: Loading Skeleton untuk Kartu Proyek
   */
  renderProjectsLoadingState() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    let skeletonHTML = '';
    for (let i = 0; i < 4; i++) {
      skeletonHTML += `
        <div class="col">
          <div class="card h-100 skeleton-card p-3 shadow-sm">
            <div class="skeleton-box mb-3" style="height: 48px;"></div>
            <div class="skeleton-box mb-2" style="height: 16px; width: 60%;"></div>
            <div class="skeleton-box mb-2" style="height: 14px;"></div>
            <div class="skeleton-box mb-3" style="height: 14px; width: 80%;"></div>
            <div class="skeleton-box mt-auto" style="height: 36px;"></div>
          </div>
        </div>
      `;
    }
    container.innerHTML = skeletonHTML;
  }

  /**
   * Status UI: Loading State untuk Katalog Layanan
   */
  renderServicesLoadingState() {
    const container = document.getElementById('servicesContainer');
    if (!container) return;

    let skeletonHTML = '';
    for (let i = 0; i < 3; i++) {
      skeletonHTML += `
        <div class="col-12 col-md-4">
          <div class="card h-100 skeleton-card p-3 shadow-sm">
            <div class="skeleton-box mb-2" style="height: 24px; width: 50%;"></div>
            <div class="skeleton-box mb-3" style="height: 20px;"></div>
            <div class="skeleton-box mb-2" style="height: 14px;"></div>
            <div class="skeleton-box mb-2" style="height: 14px; width: 90%;"></div>
          </div>
        </div>
      `;
    }
    container.innerHTML = skeletonHTML;
  }

  /**
   * Status UI: Error Fallback Alert untuk Proyek
   */
  renderProjectsErrorState(errorMessage) {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="col-12">
        <div class="error-state-box text-danger">
          <i class="bi bi-exclamation-triangle-fill fs-1 mb-2 d-block text-danger"></i>
          <h4 class="h6 fw-bold">Gagal Memuat Data Portofolio Proyek</h4>
          <p class="small text-secondary mb-3">${this.escapeHTML(errorMessage)}</p>
          <button class="btn btn-sm btn-outline-danger fw-bold" onclick="window.app.loadInitialData()">
            <i class="bi bi-arrow-clockwise me-1"></i> Coba Muat Ulang Data
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Status UI: Error Fallback Alert untuk Layanan
   */
  renderServicesErrorState(errorMessage) {
    const container = document.getElementById('servicesContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger d-flex align-items-center gap-2 mb-0" role="alert">
          <i class="bi bi-exclamation-circle-fill fs-5"></i>
          <div>Gagal memuat katalog layanan: ${this.escapeHTML(errorMessage)}</div>
        </div>
      </div>
    `;
  }

  /**
   * Render Filter Kategori Proyek secara Dinamis
   */
  renderCategoryFilters() {
    const filterContainer = document.getElementById('categoryFilters');
    if (!filterContainer) return;

    // Ambil kategori unik dari data proyek
    const categories = ['all', ...new Set(this.state.projects.map(p => p.category))];

    filterContainer.innerHTML = categories.map(cat => {
      const label = cat === 'all' ? 'Semua Proyek' : cat;
      const activeClass = this.state.activeCategory === cat ? 'active' : '';
      return `
        <button type="button" class="btn category-filter-btn ${activeClass}" data-category="${this.escapeHTML(cat)}">
          ${this.escapeHTML(label)}
        </button>
      `;
    }).join('');

    // Listener Klik Filter Kategori
    filterContainer.querySelectorAll('.category-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.currentTarget.getAttribute('data-category');
        this.state.activeCategory = cat;

        filterContainer.querySelectorAll('.category-filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        this.renderProjects();
      });
    });
  }

  /**
   * Dynamic CSR: Render Kartu Portofolio Proyek (Success & Empty State)
   */
  renderProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    // Filter berdasarkan kategori yang aktif
    const filteredProjects = this.state.activeCategory === 'all'
      ? this.state.projects
      : this.state.projects.filter(p => p.category === this.state.activeCategory);

    // Empty State Handling
    if (filteredProjects.length === 0) {
      container.innerHTML = `
        <div class="col-12">
          <div class="empty-state-box">
            <i class="bi bi-folder-x fs-1 text-muted mb-2 d-block"></i>
            <h4 class="h6 fw-bold text-dark mb-1">Tidak Ada Proyek Ditemukan</h4>
            <p class="small text-muted mb-0">Belum ada proyek dalam kategori "${this.escapeHTML(this.state.activeCategory)}".</p>
          </div>
        </div>
      `;
      return;
    }

    // Success Render State
    container.innerHTML = filteredProjects.map(proj => `
      <div class="col">
        <div class="card h-100 project-card shadow-sm border-0">
          <div class="project-card-header ${this.escapeHTML(proj.headerBgClass || 'bg-primary')} text-white p-3 d-flex justify-content-between align-items-start">
            <div>
              <span class="badge ${this.escapeHTML(proj.badgeClass || 'bg-light text-dark')} fw-bold mb-2">${this.escapeHTML(proj.category)}</span>
              <h3 class="h6 fw-bold mb-0 text-white">${this.escapeHTML(proj.title)}</h3>
            </div>
            <i class="bi ${this.escapeHTML(proj.icon || 'bi-folder')} fs-3 opacity-75"></i>
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <div class="d-flex flex-wrap gap-1 mb-2">
                ${(proj.tags || []).map(tag => `
                  <span class="badge bg-info-subtle text-dark border border-info-subtle">${this.escapeHTML(tag)}</span>
                `).join('')}
              </div>
              <p class="card-text text-secondary small">
                ${this.escapeHTML(proj.shortDescription)}
              </p>
            </div>
            <div class="mt-3 pt-3 border-top border-light-subtle">
              <button type="button" class="btn btn-sm btn-primary w-100 fw-bold btn-open-project-modal" data-id="${this.escapeHTML(proj.id)}">
                <i class="bi bi-eye-fill me-1"></i> Detail Proyek
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach Event Listeners ke Tombol Modal Universal
    container.querySelectorAll('.btn-open-project-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const projectId = e.currentTarget.getAttribute('data-id');
        this.openUniversalProjectModal(projectId);
      });
    });
  }

  /**
   * Universal Dynamic Modal Handler (Tepat 1 Modal di index.html)
   * @param {string} projectId 
   */
  openUniversalProjectModal(projectId) {
    const proj = this.state.projects.find(p => p.id === projectId);
    if (!proj) return;

    const modalTitleEl = document.getElementById('universalProjectModalTitle');
    const modalBodyEl = document.getElementById('universalProjectModalBody');

    if (modalTitleEl) {
      modalTitleEl.innerHTML = `<i class="bi ${this.escapeHTML(proj.icon || 'bi-folder')} me-2"></i> ${this.escapeHTML(proj.title)}`;
    }

    if (modalBodyEl) {
      modalBodyEl.innerHTML = `
        <div class="badge bg-primary-subtle text-primary border border-primary-subtle mb-3 px-3 py-1 rounded-pill fw-semibold">
          Kategori: ${this.escapeHTML(proj.category)}
        </div>
        ${proj.thumbnail ? `
          <div class="mb-3 rounded overflow-hidden shadow-sm" style="max-height: 240px;">
            <img src="${this.escapeHTML(proj.thumbnail)}" class="img-fluid w-100 object-fit-cover" alt="${this.escapeHTML(proj.title)}">
          </div>
        ` : ''}
        <h4 class="h6 fw-bold text-dark mb-2">Deskripsi Proyek</h4>
        <p class="text-secondary small mb-3">
          ${this.escapeHTML(proj.fullDescription || proj.shortDescription)}
        </p>

        ${proj.metrics ? `
          <div class="alert alert-info py-2 px-3 small mb-3">
            <i class="bi bi-graph-up-arrow me-2 text-primary"></i> <strong>Metrik Kinerja:</strong> ${this.escapeHTML(proj.metrics)}
          </div>
        ` : ''}

        ${(proj.features && proj.features.length > 0) ? `
          <h4 class="h6 fw-bold text-dark mb-2">Fitur Utama & Deliverables</h4>
          <ul class="text-secondary small ps-3 mb-3">
            ${proj.features.map(f => `<li>${this.escapeHTML(f)}</li>`).join('')}
          </ul>
        ` : ''}

        ${(proj.techStack && proj.techStack.length > 0) ? `
          <h4 class="h6 fw-bold text-dark mb-2">Teknologi yang Digunakan</h4>
          <div class="d-flex flex-wrap gap-1 mb-3">
            ${proj.techStack.map(t => `<span class="badge bg-light text-dark border">${this.escapeHTML(t)}</span>`).join('')}
          </div>
        ` : ''}

        <div class="d-flex gap-2 pt-2 border-top">
          ${proj.repoUrl ? `
            <a href="${this.escapeHTML(proj.repoUrl)}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-secondary fw-semibold">
              <i class="bi bi-github me-1"></i> Repositori
            </a>
          ` : ''}
          ${proj.demoUrl ? `
            <a href="${this.escapeHTML(proj.demoUrl)}" target="_blank" rel="noopener" class="btn btn-sm btn-primary fw-semibold ms-auto">
              <i class="bi bi-box-arrow-up-right me-1"></i> Live Demo
            </a>
          ` : ''}
        </div>
      `;
    }

    const modalEl = document.getElementById('universalProjectModal');
    if (modalEl && window.bootstrap) {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
      modalInstance.show();
    }
  }

  /**
   * Render Dropdown Opsi Layanan pada Formulir
   */
  renderServicesDropdown() {
    const selectEl = document.getElementById('floatingLayanan');
    if (!selectEl) return;

    selectEl.innerHTML = `
      <option value="" selected disabled>Pilih salah satu layanan...</option>
      ${this.state.services.map((s, index) => `
        <option value="${this.escapeHTML(s.id)}">${index + 1}. ${this.escapeHTML(s.title)} (${this.escapeHTML(s.price)})</option>
      `).join('')}
    `;
  }

  /**
   * Render Kartu Katalog Layanan
   */
  renderServicesCatalog() {
    const container = document.getElementById('servicesContainer');
    if (!container) return;

    container.innerHTML = this.state.services.map(s => `
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card h-100 shadow-sm border-0 p-3 info-surface-card d-flex flex-column service-card-interactive">
          <div class="d-flex align-items-center gap-2 mb-3">
            <div class="metric-icon-box text-primary" style="width: 36px; height: 36px; font-size: 1.1rem;">
              <i class="bi ${this.escapeHTML(s.icon || 'bi-gear')}"></i>
            </div>
            <div>
              <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2 py-1">${this.escapeHTML(s.badge)}</span>
            </div>
          </div>
          <h3 class="h6 fw-bold text-dark mb-1" style="min-height: 40px;">${this.escapeHTML(s.title)}</h3>
          <div class="fw-bold text-primary small mb-3 pb-2 border-bottom">${this.escapeHTML(s.price)}</div>
          <p class="text-secondary small mb-3 lh-sm">${this.escapeHTML(s.description)}</p>
          <ul class="list-unstyled small text-muted mb-0 mt-auto">
            ${(s.features || []).map(f => `
              <li class="mb-2 d-flex align-items-start">
                <i class="bi bi-check-circle-fill text-primary me-2 mt-1" style="font-size: 0.75rem;"></i>
                <span class="lh-sm">${this.escapeHTML(f)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  /**
   * Inisialisasi Listener Event Form & Toast
   */
  setupEventListeners() {
    const form = document.getElementById('serviceInquiryForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Mencegah full page reload

        if (!form.checkValidity()) {
          form.classList.add('was-validated');
          return;
        }

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());
        // Handle multi-checkbox opsi
        payload['opsi'] = formData.getAll('opsi[]');

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Mengirim Permintaan REST...';

        try {
          // Decoupled Asynchronous REST Form Dispatch
          const result = await ApiService.submitServiceOrder(payload);

          // Simpan ke LocalStorage
          this.saveOrderToLocalStorage(result);
          this.updateOrderBadgeUI();

          // Feedback visual Toast
          this.showToastNotification('Sukses!', `Permintaan layanan berhasil diproses oleh REST API. Nomor Tiket: ${result.orderId}`, 'success');

          form.reset();
          form.classList.remove('was-validated');

        } catch (error) {
          console.error('[Form Submit Error]:', error);
          this.showToastNotification('Gagal Dikirim', 'Terjadi kesalahan saat memproses layanan: ' + error.message, 'danger');
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      });
    }
  }

  /**
   * Menyimpan Data Pesanan ke LocalStorage
   * @param {object} orderResult 
   */
  saveOrderToLocalStorage(orderResult) {
    this.state.orders.unshift(orderResult);
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state.orders));
    } catch (e) {
      console.warn('LocalStorage tidak tersedia:', e);
    }
  }

  /**
   * Memuat Data Pesanan dari LocalStorage
   */
  loadOrdersFromLocalStorage() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.state.orders = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Gagal membaca LocalStorage:', e);
      this.state.orders = [];
    }
  }

  /**
   * Memperbarui Badge Jumlah Pesanan Layanan di UI
   */
  updateOrderBadgeUI() {
    const badgeEl = document.getElementById('orderCountBadge');
    if (badgeEl) {
      const count = this.state.orders.length;
      badgeEl.textContent = `${count} Pesanan Tersimpan`;
      if (count > 0) {
        badgeEl.classList.remove('d-none');
      }
    }
  }

  /**
   * Menampilkan Notifikasi Visual Bootstrap Toast Dinamis
   * @param {string} title 
   * @param {string} message 
   * @param {string} type - 'success' | 'danger' | 'warning' | 'info'
   */
  showToastNotification(title, message, type = 'success') {
    const toastContainer = document.getElementById('toastNotificationContainer');
    if (!toastContainer) return;

    const bgHeaderClass = type === 'success' ? 'bg-success text-white' : type === 'danger' ? 'bg-danger text-white' : 'bg-primary text-white';
    const iconClass = type === 'success' ? 'bi-check-circle-fill' : type === 'danger' ? 'bi-exclamation-octagon-fill' : 'bi-info-circle-fill';
    const toastId = 'toast-' + Date.now();

    const toastHTML = `
      <div id="${toastId}" class="toast shadow-lg border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header ${bgHeaderClass}">
          <i class="bi ${iconClass} me-2"></i>
          <strong class="me-auto">${this.escapeHTML(title)}</strong>
          <small class="text-white-50">Baru saja</small>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body bg-white text-dark small">
          ${this.escapeHTML(message)}
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHTML);

    const toastEl = document.getElementById(toastId);
    if (toastEl && window.bootstrap) {
      const toastInstance = new bootstrap.Toast(toastEl, { delay: 5000 });
      toastInstance.show();

      toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
      });
    }
  }
}

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
