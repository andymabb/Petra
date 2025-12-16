document.addEventListener('DOMContentLoaded', function() {
    function basename(path) {
        return path.split('/').filter(Boolean).pop();
    }

    let currentPath = window.location.pathname;
    if (currentPath.startsWith('/')) {
        currentPath = currentPath.substring(1);
    }
    // Remove query string and hash from currentPath
    currentPath = currentPath.split('?')[0].split('#')[0];
    if (currentPath === '') {
        currentPath = 'index.html';
    }
    console.log('Current path:', currentPath);
    const navLinks = document.querySelectorAll('.mainnav a, .subnav a');

    navLinks.forEach(link => {
        let linkHref = link.getAttribute('href');
        // Normalize linkHref by removing any query string or hash
        linkHref = linkHref.split('?')[0].split('#')[0];
        // Remove leading ./ or / from linkHref
        linkHref = linkHref.replace(/^\.?\//, '');
        console.log('Checking link:', linkHref);
        if (basename(linkHref) === basename(currentPath)) {
            console.log('Match found, adding aria-current to:', linkHref);
            link.setAttribute('aria-current', 'page');
        }
    });
});