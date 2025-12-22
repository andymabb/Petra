// Quick script to check external links for 404s and broken links
const https = require('https');
const http = require('http');

const links = [
    'https://www.pontbren.com',
    'https://welshschoolofhomeopathy.org.uk/',
    'https://www.homeopathy-soh.org/',
    'https://www.a-r-h.org/',
    'https://www.homoeopathicmedicalassociation.co.uk/',
    'https://www.mirandacastro.com/',
    'https://www.extraordinarymedicine.org/',
    'https://www.facultyofhomeopathy.org/',
    'https://www.homeopathy-ecch.org/',
    'https://www.hri-research.org/',
    'https://www.findahomeopath.org/',
    'https://www.homeopathyactiontrust.org.uk/',
    'https://www.nelsonspharmacy.com/',
    'https://www.sada.org.uk/',
    'https://hpathy.com/cause-symptoms-treatment/fever/',
    'https://www.nhs.uk/conditions/febrile-seizures/',
    'https://patient.info/childrens-health/fever-in-children-high-temperature/febrile-seizure-febrile-convulsion',
    'https://www.facebook.com/petrawood.homeopath',
    'https://www.mirandacastro.com/articles/fever_in_children.html'
];

function checkUrl(url) {
    return new Promise((resolve) => {
        const protocol = url.startsWith('https') ? https : http;
        
        const options = {
            method: 'HEAD',
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        };
        
        const req = protocol.request(url, options, (res) => {
            resolve({
                url,
                status: res.statusCode,
                ok: res.statusCode >= 200 && res.statusCode < 400
            });
        });
        
        req.on('error', (err) => {
            resolve({
                url,
                status: 'ERROR',
                ok: false,
                error: err.message
            });
        });
        
        req.on('timeout', () => {
            req.destroy();
            resolve({
                url,
                status: 'TIMEOUT',
                ok: false,
                error: 'Request timeout'
            });
        });
        
        req.end();
    });
}

async function checkAllLinks() {
    console.log('Checking links...\n');
    
    const results = [];
    for (const link of links) {
        const result = await checkUrl(link);
        results.push(result);
        
        const status = result.ok ? '✓' : '✗';
        const statusCode = result.status === 'ERROR' || result.status === 'TIMEOUT' 
            ? result.status 
            : result.status;
        
        console.log(`${status} [${statusCode}] ${result.url}`);
        if (result.error) {
            console.log(`   Error: ${result.error}`);
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n--- Summary ---');
    const broken = results.filter(r => !r.ok);
    console.log(`Total links: ${results.length}`);
    console.log(`Working: ${results.length - broken.length}`);
    console.log(`Broken: ${broken.length}`);
    
    if (broken.length > 0) {
        console.log('\nBroken links:');
        broken.forEach(link => {
            console.log(`  - ${link.url} (${link.status})`);
        });
    }
}

checkAllLinks().catch(console.error);
