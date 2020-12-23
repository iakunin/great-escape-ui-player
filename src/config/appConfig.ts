const requireValue = <T>(value: T | null | undefined, name: string): T => {
  if (value === null || value === undefined) {
    throw new Error(`'${name}' is required`);
  }

  return value;
};

const phone = '+7 (929) 605-14-50';

const config = {
  apiUrl: requireValue(process.env.REACT_APP_SERVER_API_URL, 'REACT_APP_SERVER_API_URL'),
  phone: phone,
  phoneNormalized: phone.replaceAll(/[^\d+]/g, ''),
  email: {
    info: 'info@great-escape.ru',
    partners: 'partners@great-escape.ru',
    quality: 'quality@great-escape.ru',
  }
};

export default config;
