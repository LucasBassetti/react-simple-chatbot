const hexToRgb = hex => {
  if (typeof hex !== 'string') {
    return null;
  }
  // http://stackoverflow.com/a/5624139
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

/**
 * Transform hex+alpha to rgba
 * @param {string} hex color, other css colors (names, rgb(), hsl()...) use color-mix
 * @param {number} [alpha=1]
 * @returns {string} the rgba as string
 */
const rgba = (hex, alpha = 1) => {
  const color = hexToRgb(hex);
  if (!color) {
    return `color-mix(in srgb, ${hex} ${alpha * 100}%, transparent)`;
  }
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
};

export default rgba;
