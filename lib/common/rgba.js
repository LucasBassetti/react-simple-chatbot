const hexToRgb = hex => {
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
 * @param {string} hex hex color code
 * @param {number} [alpha=1]
 * @returns {string} the rgba as string
 */
const rgba = (hex, alpha = 1) => {
  const color = hexToRgb(hex);
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
};

export default rgba;
