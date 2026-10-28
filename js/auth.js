/**
 * The Solaire Residences — Resident Portal & Authentication Engine
 * Supports seamless login with ANY email and password, VIP persona switching,
 * profile persistence in localStorage, and synchronization across all pages.
 */

const SolaireAuth = (function () {
  const STORAGE_KEY_EMAIL = 'solaire_user_email';
  const STORAGE_KEY_NAME = 'solaire_user_name';
  const STORAGE_KEY_TIER = 'solaire_user_tier';
  const STORAGE_KEY_UNIT = 'solaire_user_unit';

  // Default VIP fallback persona if not yet logged in
  const DEFAULT_GUEST = {
    email: 'vip.resident@thesolaire-dubai.ae',
    name: 'Lord Alexander Sterling',
    tier: 'The Sky Penthouse Crown',
    unit: 'Penthouse 4801'
  };

  function getLoggedInUser() {
    const email = localStorage.getItem(STORAGE_KEY_EMAIL);
    if (!email) {
      return null;
    }
    return {
      email: email,
      name: localStorage.getItem(STORAGE_KEY_NAME) || deriveNameFromEmail(email),
      tier: localStorage.getItem(STORAGE_KEY_TIER) || 'The Sky Penthouse Crown',
      unit: localStorage.getItem(STORAGE_KEY_UNIT) || 'Penthouse 4801'
    };
  }

  function deriveNameFromEmail(email) {
    if (!email) return 'VIP Resident';
    const username = email.split('@')[0];
    return username
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function login(email, password, name, tier) {
    const cleanEmail = (email || '').trim();
    if (!cleanEmail) {
      throw new Error('Please provide an email address.');
    }

    const userName = name || deriveNameFromEmail(cleanEmail);
    const userTier = tier || 'The Sky Penthouse Crown';
    const userUnit = userTier.includes('Penthouse')
      ? 'Penthouse 4801'
      : userTier.includes('Celestial')
      ? 'Suite 3004'
      : userTier.includes('Haven')
      ? 'Residence 1602'
      : 'Atelier 0601';

    localStorage.setItem(STORAGE_KEY_EMAIL, cleanEmail);
    localStorage.setItem(STORAGE_KEY_NAME, userName);
    localStorage.setItem(STORAGE_KEY_TIER, userTier);
    localStorage.setItem(STORAGE_KEY_UNIT, userUnit);

    return {
      email: cleanEmail,
      name: userName,
      tier: userTier,
      unit: userUnit
    };
  }

  function signup(name, email, password, tier) {
    return login(email, password, name, tier);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY_EMAIL);
    localStorage.removeItem(STORAGE_KEY_NAME);
    localStorage.removeItem(STORAGE_KEY_TIER);
    localStorage.removeItem(STORAGE_KEY_UNIT);
  }

  function isLoggedIn() {
    return !!localStorage.getItem(STORAGE_KEY_EMAIL);
  }

  // Update headers across any public page to reflect login status
  function syncNavigationHeader() {
    const user = getLoggedInUser();
    const portalBtns = document.querySelectorAll('.portal-auth-btn');
    const portalTexts = document.querySelectorAll('.portal-user-text');

    if (user) {
      portalBtns.forEach((btn) => {
        btn.setAttribute('href', 'dashboard.html');
        btn.setAttribute('title', `Logged in as ${user.email}`);
        btn.classList.add('border-bronze', 'bg-bronze/10');
      });
      portalTexts.forEach((el) => {
        el.textContent = 'Resident Console';
      });
    } else {
      portalBtns.forEach((btn) => {
        btn.setAttribute('href', 'login.html');
        btn.classList.remove('border-bronze', 'bg-bronze/10');
      });
      portalTexts.forEach((el) => {
        el.textContent = 'Resident Portal';
      });
    }
  }

  return {
    getLoggedInUser,
    login,
    signup,
    logout,
    isLoggedIn,
    syncNavigationHeader,
    DEFAULT_GUEST
  };
})();

// Auto-run header sync when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    SolaireAuth.syncNavigationHeader();
  });
}

