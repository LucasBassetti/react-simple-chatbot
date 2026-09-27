export const isMobile = (): boolean =>
  /iphone|ipod|android|ie|blackberry|fennec/i.test(navigator.userAgent);

export const isString = (value: unknown): value is string => typeof value === 'string';

const ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const randomId = (length = 24): string => {
  let id = '';
  for (let i = 0; i < length; i += 1) {
    id += ID_CHARS.charAt(Math.floor(Math.random() * ID_CHARS.length));
  }
  return id;
};
