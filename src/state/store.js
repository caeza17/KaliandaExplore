/**
 * Store & State Management - Kalianda Explore
 * Mengelola data destinasi, UMKM, autentikasi admin, dan notifikasi toast dengan persistensi localStorage.
 */

import { initialDestinations } from '../data/destinations.js';
import { initialBusinesses } from '../data/businesses.js';

class AppStore {
  constructor() {
    this.STORAGE_KEYS = {
      DESTINATIONS: 'kalianda_destinations_v1',
      BUSINESSES: 'kalianda_businesses_v1',
      ADMIN_AUTH: 'kalianda_admin_auth_v1'
    };

    this.listeners = [];
    this.toastListeners = [];

    // Load or initialize state
    this.destinations = this.loadData(this.STORAGE_KEYS.DESTINATIONS, initialDestinations);
    this.businesses = this.loadData(this.STORAGE_KEYS.BUSINESSES, initialBusinesses);
    this.adminUser = this.loadAuth();
  }

  loadData(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn(`Gagal memuat data dari localStorage untuk ${key}`, e);
    }
    this.saveData(key, fallback);
    return fallback;
  }

  saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Gagal menyimpan data ${key}`, e);
    }
  }

  loadAuth() {
    try {
      const saved = sessionStorage.getItem(this.STORAGE_KEYS.ADMIN_AUTH);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return null;
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => {
      try {
        cb(this.getState());
      } catch (err) {
        console.error('Error in store subscriber:', err);
      }
    });
  }

  onToast(callback) {
    this.toastListeners.push(callback);
    return () => {
      this.toastListeners = this.toastListeners.filter(cb => cb !== callback);
    };
  }

  showToast(message, type = 'success') {
    this.toastListeners.forEach(cb => {
      try {
        cb({ id: Date.now(), message, type });
      } catch (e) {}
    });
  }

  getState() {
    return {
      destinations: this.destinations,
      businesses: this.businesses,
      isAdminLoggedIn: !!this.adminUser,
      adminUser: this.adminUser
    };
  }

  // --- Destinasi Actions ---
  getDestinations(includeInactive = false) {
    if (includeInactive) return this.destinations;
    return this.destinations.filter(d => d.status === 'active');
  }

  getDestinationById(id) {
    return this.destinations.find(d => d.id === id);
  }

  addDestination(destinationData) {
    const newDest = {
      ...destinationData,
      id: 'dest-' + Date.now(),
      status: destinationData.status || 'active',
      isVerified: true
    };
    this.destinations = [newDest, ...this.destinations];
    this.saveData(this.STORAGE_KEYS.DESTINATIONS, this.destinations);
    this.notify();
    this.showToast(`Destinasi "${newDest.name}" berhasil ditambahkan!`);
    return newDest;
  }

  updateDestination(id, updatedFields) {
    const index = this.destinations.findIndex(d => d.id === id);
    if (index === -1) return false;

    this.destinations[index] = {
      ...this.destinations[index],
      ...updatedFields
    };
    this.saveData(this.STORAGE_KEYS.DESTINATIONS, this.destinations);
    this.notify();
    this.showToast(`Destinasi "${this.destinations[index].name}" berhasil diperbarui!`);
    return true;
  }

  deleteDestination(id) {
    const target = this.destinations.find(d => d.id === id);
    const targetName = target ? target.name : 'Destinasi';
    this.destinations = this.destinations.filter(d => d.id !== id);
    this.saveData(this.STORAGE_KEYS.DESTINATIONS, this.destinations);
    this.notify();
    this.showToast(`Destinasi "${targetName}" telah dihapus!`, 'info');
    return true;
  }

  toggleDestinationStatus(id) {
    const item = this.destinations.find(d => d.id === id);
    if (item) {
      item.status = item.status === 'active' ? 'inactive' : 'active';
      this.saveData(this.STORAGE_KEYS.DESTINATIONS, this.destinations);
      this.notify();
      this.showToast(`Status "${item.name}" diubah menjadi ${item.status === 'active' ? 'Aktif' : 'Nonaktif'}.`);
    }
  }

  // --- UMKM Actions ---
  getBusinesses(includeInactive = false) {
    if (includeInactive) return this.businesses;
    return this.businesses.filter(b => b.status === 'active');
  }

  getBusinessById(id) {
    return this.businesses.find(b => b.id === id);
  }

  addBusiness(businessData) {
    const newBiz = {
      ...businessData,
      id: 'umkm-' + Date.now(),
      status: businessData.status || 'active',
      isVerified: true,
      products: businessData.products || []
    };
    this.businesses = [newBiz, ...this.businesses];
    this.saveData(this.STORAGE_KEYS.BUSINESSES, this.businesses);
    this.notify();
    this.showToast(`Profil UMKM "${newBiz.name}" berhasil ditambahkan!`);
    return newBiz;
  }

  updateBusiness(id, updatedFields) {
    const index = this.businesses.findIndex(b => b.id === id);
    if (index === -1) return false;

    this.businesses[index] = {
      ...this.businesses[index],
      ...updatedFields
    };
    this.saveData(this.STORAGE_KEYS.BUSINESSES, this.businesses);
    this.notify();
    this.showToast(`Profil UMKM "${this.businesses[index].name}" berhasil diperbarui!`);
    return true;
  }

  deleteBusiness(id) {
    const target = this.businesses.find(b => b.id === id);
    const targetName = target ? target.name : 'UMKM';
    this.businesses = this.businesses.filter(b => b.id !== id);
    this.saveData(this.STORAGE_KEYS.BUSINESSES, this.businesses);
    this.notify();
    this.showToast(`Profil UMKM "${targetName}" telah dihapus!`, 'info');
    return true;
  }

  toggleBusinessStatus(id) {
    const item = this.businesses.find(b => b.id === id);
    if (item) {
      item.status = item.status === 'active' ? 'inactive' : 'active';
      this.saveData(this.STORAGE_KEYS.BUSINESSES, this.businesses);
      this.notify();
      this.showToast(`Status UMKM "${item.name}" diubah menjadi ${item.status === 'active' ? 'Aktif' : 'Nonaktif'}.`);
    }
  }

  // --- Auth Admin Actions ---
  loginAdmin(emailOrUsername, password) {
    // Default valid credentials for MVP testing
    if (
      (emailOrUsername.trim().toLowerCase() === 'admin' || emailOrUsername.trim().toLowerCase() === 'admin@kaliandaexplore.id') &&
      password === 'admin123'
    ) {
      const user = {
        name: 'Admin Kalianda',
        email: 'admin@kaliandaexplore.id',
        role: 'admin',
        loginTime: new Date().toISOString()
      };
      this.adminUser = user;
      try {
        sessionStorage.setItem(this.STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(user));
      } catch (e) {}
      this.notify();
      this.showToast('Login berhasil! Selamat datang di Dashboard Admin.');
      return { success: true };
    }
    return { success: false, message: 'Username/Email atau Password salah! (Gunakan: admin / admin123)' };
  }

  logoutAdmin() {
    this.adminUser = null;
    try {
      sessionStorage.removeItem(this.STORAGE_KEYS.ADMIN_AUTH);
    } catch (e) {}
    this.notify();
    this.showToast('Anda telah keluar dari sesi Admin.', 'info');
  }

  resetToDefault() {
    this.destinations = [...initialDestinations];
    this.businesses = [...initialBusinesses];
    this.saveData(this.STORAGE_KEYS.DESTINATIONS, this.destinations);
    this.saveData(this.STORAGE_KEYS.BUSINESSES, this.businesses);
    this.notify();
    this.showToast('Data berhasil di-reset ke nilai default bawaan sistem.', 'info');
  }
}

export const store = new AppStore();
