# Changes Made - December 16, 2025

## Build System Fixes

### Gulpfile Corruption Fixed
- **Issue**: Gulpfile had severe merge conflicts and syntax errors throughout
- **Fix**: Completely replaced corrupted gulpfile.js with clean version
- **Impact**: Build process now functional, all tasks working correctly

### Binary File Handling
- **Issue**: AVIF and PNG images were being corrupted during gulp copy process (files nearly double in size)
- **Fix**: Added `{encoding: false}` option to `gulp.src()` in `img()` task
- **Result**: All images now copy correctly as binary files without corruption
- **Files affected**: 11 AVIF files and h.png restored to correct file sizes

### Code Quality
- **Removed**: Duplicate `cssmin` constant declaration (was duplicating `cleanCSS`)
- **Improved**: Cleaner, more maintainable gulpfile structure

## HTML Modernization

### Obsolete Meta Tags Removed
- **Removed X-UA-Compatible**: `<meta http-equiv="X-UA-Compatible" content="IE=edge">` from 9 files
  - Reason: Internet Explorer is discontinued, all modern browsers use standards mode by default
  
- **Removed keywords meta tag**: From 8 files
  - Reason: Search engines have ignored this tag since 2009, provides no SEO value
  
- **Files updated**: 
  - index.html
  - RESOURCES.html
  - homeopathy.html
  - faq.html
  - disclaimer.html
  - links.html
  - treatment.html
  - testimonials.html
  - seasonal-advice.html

### Performance & Security Improvements
- **HTTPS**: Updated `http://www.findahomeopath.org/` to `https://` in top.html
- **Layout Shift Prevention**: Added explicit `width="60" height="58"` attributes to logo image
  - Improves Cumulative Layout Shift (CLS) metric

### Font Stack Modernization
- **Before**: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol`
- **After**: `system-ui, sans-serif`
- **Reason**: `system-ui` is now baseline (Chrome 56+, Firefox 92+, Safari 11+, Edge 79+)
- **Benefit**: Simpler, more maintainable code with identical visual result

## CSS Modernization

### Color Syntax Updates
- **Converted all `rgba()` to modern `rgb()` syntax**:
  - Old: `rgba(255,255,255,.1)`
  - New: `rgb(255 255 255 / 0.1)`
  - Benefit: More readable, baseline browser support (2020+)

### Bug Fixes
- **Fixed invalid RGB values**: Changed `rgba(256,256,256,1)` to `rgb(255 255 255)` (2 instances)
  - Location: footer background and .copy span
  
- **Fixed invalid SCSS syntax**: `rgba(#fff,.4)` changed to proper CSS
  - Changed to `text-decoration: underline dotted` (more semantic, baseline support)
  
- **Improved abbr styling**: Using native `text-decoration: underline dotted` instead of border-bottom hack

### Code Quality Improvements
- **Expanded font shorthand**: `font:100%/1.5 'Lato', sans-serif` → explicit properties
  - More readable and maintainable
  
- **Fixed spacing inconsistencies**:
  - Cleaned up clamp() functions: removed extra spaces, normalized formatting
  - Added missing space in linear-gradient: `linear-gradient(#402401, var(--primary))`
  
- **Removed unnecessary zeros**: `0.8200rem` → `0.82rem`, `0.8000vw` → `0.8vw`

### Browser Prefix Cleanup
- **Removed `-webkit-text-size-adjust` prefix** from normalize.css
  - Now using unprefixed `text-size-adjust: 100%`
  - Baseline since Safari 16, iOS 16
  
- **Configured Autoprefixer for baseline browsers only**:
  ```javascript
  autoprefixer({
    overrideBrowserslist: [
      'last 2 Chrome versions',
      'last 2 Firefox versions', 
      'last 2 Safari versions',
      'last 2 Edge versions'
    ]
  })
  ```
  - Prevents unnecessary vendor prefixes for legacy browsers
  - Reduces CSS output size
  - Maintains full baseline browser support

## Files Modified

### Build Configuration (1 file)
- `gulpfile.js` - Complete rewrite + binary encoding fix + autoprefixer config

### HTML Files (10 files)
- `src/index.html`
- `src/RESOURCES.html`
- `src/homeopathy.html`
- `src/faq.html`
- `src/disclaimer.html`
- `src/links.html`
- `src/treatment.html`
- `src/testimonials.html`
- `src/seasonal-advice.html`
- `src/inc/top.html`

### CSS Files (2 files)
- `src/css/style.css`
- `src/css/inc/normalize.css`

## Impact Summary

✅ **Build System**: Fully functional after corruption fix  
✅ **Image Quality**: All images now copy without corruption  
✅ **Code Quality**: Removed obsolete tags, invalid syntax, and duplicate code  
✅ **Modern Standards**: Using baseline CSS and HTML features  
✅ **Performance**: Better CLS score with image dimensions  
✅ **Maintainability**: Cleaner, more readable code  
✅ **File Size**: Smaller CSS output with targeted autoprefixer config  
✅ **Browser Support**: Modern baseline browsers only (2020+)

## No Breaking Changes

All changes maintain compatibility with baseline browsers:
- Chrome 109+
- Firefox 115+ 
- Safari 16.4+
- Edge 109+

No functionality has been removed or altered - only modernization and cleanup.
