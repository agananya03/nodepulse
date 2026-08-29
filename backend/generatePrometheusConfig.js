const fs = require('fs');
const path = require('path');

async function generatePrometheusConfig(prisma) {
    const nodes = await prisma.node.findMany();

    const targets = [...new Set(nodes.map(n => `${n.ipAddress}:9100`))];

    const yamlContent = `global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'nodes'
    static_configs:
      - targets: [${targets.map(t => `'${t}'`).join(', ')}]
`;

    const filePath = path.join(__dirname, 'infra', 'prometheus.yml');
    fs.writeFileSync(filePath, yamlContent);
    console.log('Updated prometheus.yml with targets:', targets);
}

module.exports = generatePrometheusConfig;