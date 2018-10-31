export const isMobile = () => /iphone|ipod|android|ie|blackberry|fennec/i.test(navigator.userAgent);

export const isString = value => typeof value === 'string';
