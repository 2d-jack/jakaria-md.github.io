# Images Directory

This directory contains all images and visual assets for the retro pixel website.

## Image Guidelines

### File Formats
- **PNG** - Best for pixel art with transparency
- **JPG** - For photographs (use in gallery)
- **GIF** - For animated pixel art
- **SVG** - For scalable vector graphics

### Image Optimization
- **Pixel art**: Use exact pixel dimensions (no scaling)
- **Photographs**: Compress to 80% quality
- **Icons**: Use 16x16, 32x32, or 64x64 pixels
- **Screenshots**: Use 2x pixel density for crispness

### Folder Structure
```
assets/images/
├── games/           # Game screenshots and icons
├── gallery/         # Photography gallery images
├── icons/           # UI icons and buttons
├── backgrounds/     # Background patterns and textures
└── placeholders/    # Placeholder images
```

### Image Naming Convention
- Use lowercase letters
- Separate words with hyphens
- Include dimensions for pixel art
- Example: `pixel-adventure-32x32.png`

### Placeholder Images
The website currently uses placeholder images from:
- `https://via.placeholder.com/` for demo purposes

Replace these with your actual images:
1. Game screenshots in the Game Dev section
2. Photography images in the gallery
3. Profile or branding images

### Image Protection
All images in the gallery are automatically protected:
- Right-click disabled
- Drag to download prevented
- Context menu blocked
- Custom protection notifications

### Adding New Images

1. **Place image file in appropriate subfolder**
2. **Update HTML references**:
   ```html
   <img src="assets/images/games/your-game.png" alt="Game Description">
   ```
3. **Add protection class if needed**:
   ```html
   <img src="path/to/image.jpg" alt="Description" class="photo">
   ```

### Recommended Image Sizes

#### Game Screenshots
- Desktop: 800x600 pixels
- Tablet: 600x450 pixels
- Mobile: 400x300 pixels

#### Gallery Photos
- Large: 1200x800 pixels
- Medium: 800x600 pixels
- Small: 400x300 pixels

#### Icons and Buttons
- Small: 16x16 pixels
- Medium: 32x32 pixels
- Large: 64x64 pixels

### Performance Tips
- Use WebP format when possible
- Implement lazy loading for large galleries
- Use responsive images with `srcset`
- Compress images without losing quality
- Use CSS sprites for small icons