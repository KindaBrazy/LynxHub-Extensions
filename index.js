import {dirname, join} from "node:path";
import {writeFileSync, readFileSync} from "node:fs";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const moduleJsonPath = join(__dirname, 'extensions.json');
const moduleJson = JSON.parse(readFileSync(moduleJsonPath, 'utf8'));

async function fetchJson(url) {
    const response = await fetch(url);
    return await response.json();
}

const containers = [];

for (const moduleUrl of moduleJson) {
    try {
        const container = await fetchJson(moduleUrl);
        containers.push(container);
    } catch (error) {
        console.error(`Error fetching ${moduleUrl}: ${error.message}`);
    }
}

const compiledPath = join(__dirname, '..', 'Compiled', 'container.json');
writeFileSync(compiledPath, JSON.stringify(containers, null, 2));