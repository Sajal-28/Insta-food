const SESSION_ROLE_KEY = 'insta-zomato-session-role';
const SESSION_PARTNER_ID_KEY = 'insta-zomato-food-partner-id';

export function setSessionRole(role, options = {}) {
  localStorage.setItem(SESSION_ROLE_KEY, role);

  if (options.foodPartnerId) {
    localStorage.setItem(SESSION_PARTNER_ID_KEY, options.foodPartnerId);
  } else if (role !== 'foodPartner') {
    localStorage.removeItem(SESSION_PARTNER_ID_KEY);
  }
}

export function getSessionRole() {
  return localStorage.getItem(SESSION_ROLE_KEY);
}

export function getFoodPartnerId() {
  return localStorage.getItem(SESSION_PARTNER_ID_KEY);
}

export function isUserSession() {
  return getSessionRole() === 'user';
}

export function isFoodPartnerSession() {
  return getSessionRole() === 'foodPartner';
}

export function clearSessionRole() {
  localStorage.removeItem(SESSION_ROLE_KEY);
  localStorage.removeItem(SESSION_PARTNER_ID_KEY);
}
