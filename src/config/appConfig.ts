const requireValue = <T>(value: T | null | undefined, name: string): T => {
  if (value === null || value === undefined) {
    throw new Error(`'${name}' is required`);
  }

  return value;
};

const phone = '+7 (929) 605-14-50';

const config = {
  apiUrl: requireValue(process.env.REACT_APP_SERVER_API_URL, 'REACT_APP_SERVER_API_URL'),
  phone: {
    pretty: phone,
    normalized: phone.replaceAll(/[^\d+]/g, ''),
  },
  email: {
    info: 'info@great-escape.ru',
    partners: 'partners@great-escape.ru',
    quality: 'quality@great-escape.ru',
  },
  socialLinks: {
    vk: 'https://vk.com/greatescape_project',
    instagram: 'https://instagram.com/greatescape_project',
    facebook: 'https://www.facebook.com/Great-Escape-Project-844307092273179',
  },
  regexp: {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    phone: /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/i,
  }
};

export default config;
