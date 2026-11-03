/**
 * Toast Component - Kalianda Explore
 * Menampilkan notifikasi feedback mengambang
 */

export function setupToastContainer() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
}

export function showToastNotification(message, type = 'success') {
  const container = setupToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      <span style="font-weight: bold; font-size: 1.1rem;">${icon}</span>
      <span>${escapeHTML(message)}</span>
    </div>
    <button style="background: none; border: none; cursor: pointer; color: #999; font-size: 1.2rem; padding: 0 4px;" aria-label="Tutup">×</button>
  `;

  const closeBtn = toast.querySelector('button');
  const removeToast = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  };

  closeBtn.addEventListener('click', removeToast);
  container.appendChild(toast);

  // Auto remove after 4 seconds
  setTimeout(removeToast, 4000);
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
