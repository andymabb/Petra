# Petra Wood - Carmarthen Homeopath Website

A modern, static website for a homeopathy practice in Carmarthenshire, Wales. Built with modern web standards targeting baseline browsers (2020+).

## Features

- 🚀 Static HTML site with no server-side dependencies
- 📅 JavaScript-based seasonal content switching
- 🎨 Modern CSS with custom properties and OKLCH colors
- 🖼️ AVIF image format for optimal performance
- ⚡ Optimized for Lighthouse performance scores
- 📱 Fully responsive design
- ♿ Accessible markup with ARIA attributes

## Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)

## Installation

Install the required dependencies:

```bash
npm install gulp gulp-concat gulp-terser gulp-postcss gulp-clean-css autoprefixer postcss-import gulp-sourcemaps gulp-htmlmin browser-sync gulp-cache-bust gulp-file-include gulp-newer
```

## Build Commands

### Development Server
Start a local development server with live reload on `http://localhost:3002`:

```bash
gulp
```

This will:
- Build all HTML, CSS, and JavaScript files
- Copy images and fonts to `dist/`
- Start BrowserSync server
- Watch for file changes and auto-reload

### Build Only (No Server)
Build the site without starting the server:

```bash
# Build everything
gulp html css js img fonts

# Build specific tasks
gulp html    # Process HTML files with includes
gulp css     # Process and minify CSS
gulp js      # Minify JavaScript
gulp img     # Copy images (incremental with gulp-newer)
gulp fonts   # Copy fonts (incremental with gulp-newer)
```

## Project Structure

```
petra/
├── src/                      # Source files
│   ├── css/
│   │   ├── style.css        # Main stylesheet
│   │   └── inc/
│   │       ├── custom-properties.css  # CSS variables
│   │       ├── normalize.css          # CSS reset
│   │       └── links.css              # Link styles
│   ├── js/
│   │   ├── seasonal-content.js        # Date-based content switching
│   │   ├── active-nav.js              # Navigation state
│   │   └── date.js                    # Footer copyright year
│   ├── inc/
│   │   ├── top.html         # Header include (navigation)
│   │   └── footer.html      # Footer include
│   ├── _seasonal-files/     # Seasonal content HTML files
│   │   ├── back-to-school.html
│   │   ├── cold-season.html
│   │   ├── festive-season.html
│   │   ├── hay-fever.html
│   │   ├── spring-delights.html
│   │   ├── travelling.html
│   │   └── treatment-of-fever.html
│   ├── img/                 # Images (AVIF format)
│   │   ├── aconitum.avif
│   │   ├── arnica.avif
│   │   ├── belladonna.avif
│   │   ├── bg.avif
│   │   ├── gelsemium.avif
│   │   ├── h.avif
│   │   ├── hypericum.avif
│   │   ├── nux-vom.avif
│   │   ├── petra1.avif
│   │   ├── petra2.avif
│   │   ├── petra3.avif
│   │   └── rhus-tox.avif
│   ├── fonts/               # Fonts (WOFF2 only)
│   ├── disclaimer.html
│   ├── faq.html
│   ├── homeopathy.html
│   ├── index.html
│   ├── links.html
│   ├── RESOURCES.html
│   ├── seasonal-advice.html
│   ├── testimonials.html
│   └── treatment.html
├── dist/                    # Built site (generated, not in repo)
├── changes.md              # Detailed changelog
├── check-links.js          # Link validation script
├── gulpfile.js             # Build configuration
└── README.md               # This file
```

## Technology Stack

### Build Tools
- **Gulp** - Task runner and build system
- **gulp-file-include** - Process HTML includes (`@@include`)
- **PostCSS** - CSS processing with import and autoprefixer
- **Terser** - Modern JavaScript minification (ES2020+)
- **BrowserSync** - Development server with live reload
- **gulp-newer** - Incremental file copying

### CSS
- Modern CSS with custom properties (CSS variables)
- OKLCH color space for better color accuracy
- System font stack (`system-ui`)
- No CSS preprocessors (vanilla CSS)
- Autoprefixer targeting last 2 versions of major browsers

### JavaScript
- Vanilla ES6+ JavaScript (no frameworks)
- Modern features preserved (const, let, arrow functions, template literals)
- No transpilation (baseline browser support)
- Progressive enhancement approach

### Images & Fonts
- AVIF image format with PNG fallback for logo
- WOFF2 font format only (Lato)
- Optimized for modern browsers

## Browser Support

Targets **baseline** modern browsers:
- Chrome 109+
- Firefox 115+
- Safari 16.4+
- Edge 109+

No legacy browser support (IE, old Safari, etc.).

## Performance Optimizations

- LCP image preload with `fetchpriority="high"`
- Inline header background style for immediate discovery
- Minified CSS, JS, and HTML
- AVIF images (significantly smaller than JPEG/PNG)
- Incremental builds with `gulp-newer`
- Cache-busting with timestamps

## Seasonal Content

The site displays different seasonal health advice based on the current date:
- Days 1-59: Fever advice
- Days 60-111: Spring health
- Days 112-170: Hay fever
- Days 171-232: Travel health
- Days 233-273: Back to school
- Days 274-324: Cold season
- Days 325-366: Party season

### Testing Seasonal Content
Add `?testDate=YYYY-MM-DD` to any URL to test different date ranges:
```
http://localhost:3002/seasonal-advice.html?testDate=2024-08-15
```

## Deployment

The `dist/` folder contains the complete static site ready for deployment to any web host:

1. Build the site: `gulp html css js img fonts`
2. Upload the entire `dist/` folder to your web server
3. No server-side requirements - works with any static host

Compatible with:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server (Apache, Nginx, etc.)

## Development Notes

- Edit files in `src/` only - never edit `dist/` directly
- The `dist/` folder is regenerated on every build
- HTML includes are processed during build (syntax: `@@include('path/to/file.html')`)
- CSS watch rebuilds HTML automatically (to process includes)
- Images and fonts use incremental copying (only changed files)

## License

Website content © Petra Wood. All rights reserved.

## Recent Changes

See [changes.md](changes.md) for a detailed changelog of recent updates.
