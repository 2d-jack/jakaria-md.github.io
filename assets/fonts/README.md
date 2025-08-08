# Fonts Directory

This directory is intended for custom font files.

## Recommended Fonts for Retro Pixel Style

### Pixel Fonts
- **Press Start 2P** (already loaded from Google Fonts)
- **VT323** - Monospace pixel font
- **Pixelify Sans** - Modern pixel font
- **Russo One** - Techno-style pixel font

### How to Add Custom Fonts

1. **Download font files** (WOFF2 format recommended)
2. **Place them in this directory**
3. **Add font-face declarations in CSS**:

```css
@font-face {
    font-family: 'CustomPixelFont';
    src: url('../assets/fonts/custom-font.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
```

### Font Formats Supported
- **WOFF2** (recommended) - Modern, compressed format
- **WOFF** - Good compatibility
- **TTF** - TrueType format
- **OTF** - OpenType format

### Performance Tips
- Use WOFF2 format for best performance
- Include `font-display: swap` for better loading
- Subset fonts to include only needed characters
- Use `unicode-range` for optimal loading