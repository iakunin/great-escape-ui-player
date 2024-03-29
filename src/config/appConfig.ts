const requireValue = <T>(value: T | null | undefined, name: string): T => {
  if (value === null || value === undefined) {
    throw new Error(`'${name}' is required`);
  }

  return value;
};

const phone = '+7 (499) 112-40-77';
const domainName = 'great-escape.ru';

const config = {
  apiUrl: requireValue(process.env.REACT_APP_SERVER_API_URL, 'REACT_APP_SERVER_API_URL'),
  baseUrl: 'https://' + domainName,
  phone: {
    pretty: phone,
    normalized: phone.replace(/[^\d+]/g, ''),
  },
  email: {
    info: 'info@' + domainName,
    partners: 'partners@' + domainName,
    quality: 'quality@' + domainName,
  },
  socialLinks: {
    vk: 'https://vk.com/greatescape_project',
    instagram: 'https://instagram.com/greatescape_project',
    facebook: 'https://www.facebook.com/Great-Escape-Project-844307092273179',
  },
  regexp: {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    phone: /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/i,
  },
  reCaptchaKey: requireValue(process.env.REACT_APP_RE_CAPTCHA_KEY, 'REACT_APP_RE_CAPTCHA_KEY'),
};

export default config;
