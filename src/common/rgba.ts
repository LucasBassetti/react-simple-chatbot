interface RGB {
  r: number;
  g: number;
  b: number;
}

const hexToRgb = (hex: unknown): RGB | null => {
  if (typeof hex !== 'string') {
    return null;
  }
  // http://stackoverflow.com/a/5624139
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_match, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
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
 * @param hex color, other css colors (names, rgb(), hsl()...) use color-mix
 * @param alpha
 * @returns the rgba as string
 */
const rgba = (hex: string, alpha = 1): string => {
  const color = hexToRgb(hex);
  if (!color) {
    return `color-mix(in srgb, ${hex} ${alpha * 100}%, transparent)`;
  }
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
};

export default rgba;
