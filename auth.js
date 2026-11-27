/* ============================================
   EDUEST AUTH - Supabase, login tetap username
   ============================================ */
const Auth = {
  SESSION: 'eduest_session',
  USER_ID: 'eduest_user_id',
  PROFILE: 'eduest_profile',
  LEGACY: 'eduest_student_data',
  client: null,
  profileData: null,
  userId: null,

  init() {
    if (!window.supabase || !window.EDUEST_SUPABASE_CONFIG) {
      throw new Error('Supabase SDK atau konfigurasi belum dimuat.');
    }
    this.client = window.supabase.createClient(
      window.EDUEST_SUPABASE_CONFIG.url,
      window.EDUEST_SUPABASE_CONFIG.publishableKey,
      { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
    );
    return this.restoreSession();
  },

  async restoreSession() {
    const { data, error } = await this.client.auth.getSession();
    if (error) throw error;
    const session = data.session;
    if (!session) {
      this.clearLocalSession();
      return null;
    }
    this.userId = session.user.id;
    const meta = session.user.user_metadata || {};
    const username = String(meta.username || '').toLowerCase();
    if (!username) {
      await this.logout();
      return null;
    }
    this.profileData = await this.fetchProfile(session.user.id, username, meta);
    localStorage.setItem(this.SESSION, username);
    localStorage.setItem(this.USER_ID, session.user.id);
    localStorage.setItem(this.PROFILE, JSON.stringify(this.profileData));
    return this.profileData;
  },

  internalEmail(username) {
    // Email alias internal. Tidak digunakan untuk menerima email.
    return `${String(username).trim().toLowerCase()}@login.eduest.invalid`;
  },

  async fetchProfile(id, username, meta = {}) {
    const { data, error } = await this.client
      .from('profiles')
      .select('id, username, nama, kelas, absen, role')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    if (data) return data;
    // Profil biasanya dibuat otomatis oleh trigger SQL saat registrasi.
    return {
      id,
      username,
      nama: meta.nama || username,
      kelas: meta.kelas || '',
      absen: meta.absen || null,
      role: 'student'
    };
  },

  async register({ nama, kelas, absen, username, password }) {
    const user = String(username || '').trim().toLowerCase();
    const cleanNama = String(nama || '').trim();
    const cleanKelas = String(kelas || '').trim();
    if (!cleanNama) return { ok: false, error: 'Nama lengkap wajib diisi.' };
    if (!cleanKelas) return { ok: false, error: 'Kelas wajib diisi.' };
    if (!/^[a-z0-9._-]{3,20}$/.test(user)) {
      return { ok: false, error: 'Username 3-20 karakter: huruf, angka, titik, garis bawah, atau strip.' };
    }
    if (String(password || '').length < 8) {
      return { ok: false, error: 'Kata sandi minimal 8 karakter.' };
    }

    const { data, error } = await this.client.auth.signUp({
      email: this.internalEmail(user),
      password: String(password),
      options: {
        data: {
          username: user,
          nama: cleanNama,
          kelas: cleanKelas,
          absen: absen ? String(parseInt(absen, 10)) : ''
        }
      }
    });

    if (error) {
      const msg = /already registered|already been registered|already exists/i.test(error.message)
        ? 'Username sudah digunakan. Silakan pilih username lain.'
        : error.message;
      return { ok: false, error: msg };
    }
    if (!data.session) {
      return {
        ok: false,
        error: 'Akun dibuat, tetapi sesi belum aktif. Nonaktifkan Confirm email di Supabase Authentication sebelum registrasi username digunakan.'
      };
    }

    this.userId = data.user.id;
    this.profileData = await this.fetchProfile(data.user.id, user, data.user.user_metadata || {});
    localStorage.setItem(this.SESSION, user);
    localStorage.setItem(this.USER_ID, data.user.id);
    localStorage.setItem(this.PROFILE, JSON.stringify(this.profileData));
    return { ok: true, profile: this.profileData };
  },

  async login(username, password) {
    const user = String(username || '').trim().toLowerCase();
    if (!/^[a-z0-9._-]{3,20}$/.test(user)) {
      return { ok: false, error: 'Format username tidak valid.' };
    }
    const { data, error } = await this.client.auth.signInWithPassword({
      email: this.internalEmail(user),
      password: String(password || '')
    });
    if (error) return { ok: false, error: 'Username atau kata sandi salah.' };

    this.userId = data.user.id;
    try {
      this.profileData = await this.fetchProfile(data.user.id, user, data.user.user_metadata || {});
    } catch (e) {
      await this.client.auth.signOut();
      return { ok: false, error: 'Tidak dapat memuat profil siswa: ' + e.message };
    }
    localStorage.setItem(this.SESSION, user);
    localStorage.setItem(this.USER_ID, data.user.id);
    localStorage.setItem(this.PROFILE, JSON.stringify(this.profileData));
    return { ok: true, profile: this.profileData };
  },

  async logout() {
    if (this.client) await this.client.auth.signOut();
    this.clearLocalSession();
  },

  clearLocalSession() {
    localStorage.removeItem(this.SESSION);
    localStorage.removeItem(this.USER_ID);
    localStorage.removeItem(this.PROFILE);
    this.userId = null;
    this.profileData = null;
  },

  current() {
    return localStorage.getItem(this.SESSION) || null;
  },

  account(username) {
    if (String(username || '').toLowerCase() !== this.current()) return null;
    if (this.profileData) return this.profileData;
    try { return JSON.parse(localStorage.getItem(this.PROFILE) || 'null'); }
    catch (e) { return null; }
  },

  studentKey(username) {
    return `eduest_student_data_${String(username).toLowerCase()}`;
  },

  async loadProgress() {
    if (!this.userId) return null;
    const { data, error } = await this.client
      .from('student_progress')
      .select('data')
      .eq('user_id', this.userId)
      .maybeSingle();
    if (error) throw error;
    return data ? data.data : null;
  },

  async saveProgress(student) {
    if (!this.userId || !student) return;
    const { error } = await this.client.from('student_progress').upsert({
      user_id: this.userId,
      data: student,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });
    if (error) console.error('Gagal menyimpan progres EDUEST:', error.message);
  },

  claimLegacy(username, nama, kelas) {
    const same = (a, b) => String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();
    try {
      const raw = localStorage.getItem(this.LEGACY);
      const old = raw && JSON.parse(raw);
      if (!old || !same(old.nama, nama) || !same(old.kelas, kelas)) return false;
      localStorage.setItem(this.studentKey(username), raw);
      localStorage.removeItem(this.LEGACY);
      return true;
    } catch (e) { return false; }
  }
};
