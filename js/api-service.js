/**
 * ApiService - Data Access Layer (DAL)
 * Pemanggilan HTTP Fetch & Defensive Error Handling untuk Decoupled Multi-Tier Architecture
 */
const ApiService = {
  /**
   * Generik helper untuk Fetch API dengan error handling defensif
   * @param {string} url 
   * @param {object} options 
   */
  async fetchData(url, options = {}) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText || 'Gagal memuat data'}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(`[API Network Error - ${url}]:`, err);
      throw err;
    }
  },

  /**
   * Mengambil data profil pengembang dari profile.json
   */
  async getProfile() {
    return await this.fetchData('./data/profile.json');
  },

  /**
   * Mengambil data koleksi portofolio proyek dari projects.json
   */
  async getProjects() {
    return await this.fetchData('./data/projects.json');
  },

  /**
   * Mengambil data katalog paket layanan dari services.json
   */
  async getServices() {
    return await this.fetchData('./data/services.json');
  },

  /**
   * Mengirimkan formulir pemesanan layanan secara asinkron (Decoupled REST Form Dispatching)
   * Simulasi REST API Endpoint HTTP POST
   * @param {object} payload - DTO Data Formulir
   */
  async submitServiceOrder(payload) {
    // Simulasi latensi jaringan (1000ms)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulasi validasi server-side DTO
    if (!payload.nama || !payload.email || !payload.pesan) {
      throw new Error('Data payload tidak lengkap! Nama, email, dan pesan wajib diisi.');
    }

    return {
      status: 201,
      statusText: 'Created',
      success: true,
      message: 'Permintaan layanan berhasil diproses oleh API.',
      orderId: 'ORD-' + Date.now().toString(36).toUpperCase(),
      data: payload,
      timestamp: new Date().toISOString()
    };
  }
};

window.ApiService = ApiService;
