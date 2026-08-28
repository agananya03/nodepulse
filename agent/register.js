console.log('SCRIPT STARTED');
const os = require('os');

function getContainerIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && iface.internal === false) {
                return iface.address;
            }
        }
    }
    return '0.0.0.0';
}

async function register() {
    const hostname = os.hostname();
    const ipAddress = getContainerIp();
    try {
        const res = await fetch('http://backend:4000/nodes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ hostname, ipAddress }) });
        const data = await res.json();
        console.log('Registered:', data);
    } catch (err) {
        console.error('Registration failed:', err.message, err.cause);
    }
}
register();
