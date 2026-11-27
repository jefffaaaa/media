const Auth = {
  ACCOUNTS: 'eduest_accounts',
  SESSION: 'eduest_session',
  LEGACY: 'eduest_student_data',

  accounts() {
    try {
      const o = JSON.parse(localStorage.getItem(this.ACCOUNTS));
      return o && typeof o === 'object' && !Array.isArray(o) ? o : {};
    } catch (e) {
      return {};
    }
  },

  studentKey(username) {
    return `${this.LEGACY}_${String(username).toLowerCase()}`;
  },

  register({ nama, kelas, absen, username, password }) {
    const user = String(username || '').trim().toLowerCase();
    if (!String(nama || '').trim()) return { ok: false, error: 'Nama lengkap wajib diisi.' };
    if (!String(kelas || '').trim()) return { ok: false, error: 'Kelas wajib diisi.' };
    if (!/^[a-z0-9._-]{3,20}$/.test(user)) {
      return { ok: false, error: 'Username 3-20 karakter: huruf, angka, titik, garis bawah, atau strip.' };
    }
    if (String(password || '').length < 4) return { ok: false, error: 'Kata sandi minimal 4 karakter.' };
    const all = this.accounts();
    if (all[user]) return { ok: false, error: 'Username sudah dipakai.' };
    all[user] = {
      username: user,
      password: String(password),
      nama: String(nama).trim(),
      kelas: String(kelas).trim(),
      absen: absen ? parseInt(absen, 10) : null,
      createdAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(this.ACCOUNTS, JSON.stringify(all));
    } catch (e) {
      return { ok: false, error: 'Penyimpanan peramban penuh.' };
    }
    return { ok: true };
  },

  login(username, password) {
    const user = String(username || '').trim().toLowerCase();
    const acc = this.accounts()[user];
    if (!acc || acc.password !== String(password)) return { ok: false, error: 'Username atau kata sandi salah.' };
    localStorage.setItem(this.SESSION, user);
    return { ok: true };
  },

  logout() {
    localStorage.removeItem(this.SESSION);
  },

  current() {
    const user = localStorage.getItem(this.SESSION);
    return user && this.accounts()[user] ? user : null;
  },

  account(username) {
    return this.accounts()[String(username || '').toLowerCase()] || null;
  },

  claimLegacy(username, nama, kelas) {
    const same = (a, b) => String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
    try {
      const raw = localStorage.getItem(this.LEGACY);
      const old = raw && JSON.parse(raw);
      if (!old || !same(old.nama, nama) || !same(old.kelas, kelas)) return false;
      localStorage.setItem(this.studentKey(username), raw);
      localStorage.removeItem(this.LEGACY);
      return true;
    } catch (e) {
      return false;
    }
  }
};

if (typeof module !== 'undefined') module.exports = Auth;
