const fs = require('fs');
const path = require('path');

const sourcePath = path.resolve(__dirname, '../../shared/src/data/station_list.json');
const dataDir = path.resolve(__dirname, '../data');
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

const rawData = fs.readFileSync(sourcePath, 'utf8');
const stations = JSON.parse(rawData);

// 1. Write formatted JSON
fs.writeFileSync(path.join(dataDir, 'stations.json'), JSON.stringify(stations, null, 2), 'utf8');

// 2. Write minified JSON
fs.writeFileSync(path.join(dataDir, 'stations.min.json'), JSON.stringify(stations), 'utf8');

// 3. Write CSV
const csvHeaders = 'station_code,station_name,region_code,state_name\n';
const csvRows = stations.map(s => {
  const code = `"${(s.station_code || '').replace(/"/g, '""')}"`;
  const name = `"${(s.station_name || '').replace(/"/g, '""')}"`;
  const region = `"${(s.region_code || '').replace(/"/g, '""')}"`;
  const state = `"${(s.state_name || '').replace(/"/g, '""')}"`;
  return `${code},${name},${region},${state}`;
}).join('\n');

fs.writeFileSync(path.join(dataDir, 'stations.csv'), csvHeaders + csvRows, 'utf8');

// 4. Write CJS module
const cjsContent = `const path = require('path');
const fs = require('fs');

const stationsDataPath = path.resolve(__dirname, '../data/stations.json');
const stations = JSON.parse(fs.readFileSync(stationsDataPath, 'utf8'));
const stationMap = new Map(stations.map(s => [s.station_code.toUpperCase(), s]));

function getAllStations() {
  return stations;
}

function findStationByCode(code) {
  if (!code) return undefined;
  return stationMap.get(code.trim().toUpperCase());
}

function searchStations(query, limit = 10) {
  if (!query) return [];
  const qUpper = query.trim().toUpperCase();
  const qLower = query.trim().toLowerCase();

  const codeStarts = [];
  const nameStarts = [];
  const nameContains = [];
  const stateContains = [];
  const codeContains = [];

  for (const s of stations) {
    if (s.station_code.startsWith(qUpper)) {
      codeStarts.push(s);
      continue;
    }
    const nameLower = s.station_name.toLowerCase();
    if (nameLower.startsWith(qLower)) {
      nameStarts.push(s);
      continue;
    }
    if (nameLower.includes(qLower)) {
      nameContains.push(s);
      continue;
    }
    if (s.state_name && s.state_name.toLowerCase().includes(qLower)) {
      stateContains.push(s);
      continue;
    }
    if (s.station_code.includes(qUpper)) {
      codeContains.push(s);
    }
  }

  const combined = [...codeStarts, ...nameStarts, ...nameContains, ...stateContains, ...codeContains];
  const seen = new Set();
  const result = [];
  for (const item of combined) {
    if (!seen.has(item.station_code)) {
      seen.add(item.station_code);
      result.push(item);
      if (result.length >= limit) break;
    }
  }
  return result;
}

function getStationsByState(stateName) {
  if (!stateName) return [];
  const target = stateName.trim().toLowerCase();
  return stations.filter(s => s.state_name && s.state_name.toLowerCase() === target);
}

function getStationsByZone(zoneCode) {
  if (!zoneCode) return [];
  const target = zoneCode.trim().toUpperCase();
  return stations.filter(s => s.region_code && s.region_code.toUpperCase() === target);
}

module.exports = {
  stations,
  getAllStations,
  findStationByCode,
  searchStations,
  getStationsByState,
  getStationsByZone
};
`;
fs.writeFileSync(path.join(distDir, 'index.js'), cjsContent, 'utf8');

// 5. Write ESM module
const esmContent = `import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stationsDataPath = path.resolve(__dirname, '../data/stations.json');

export const stations = JSON.parse(fs.readFileSync(stationsDataPath, 'utf8'));
const stationMap = new Map(stations.map(s => [s.station_code.toUpperCase(), s]));

export function getAllStations() {
  return stations;
}

export function findStationByCode(code) {
  if (!code) return undefined;
  return stationMap.get(code.trim().toUpperCase());
}

export function searchStations(query, limit = 10) {
  if (!query) return [];
  const qUpper = query.trim().toUpperCase();
  const qLower = query.trim().toLowerCase();

  const codeStarts = [];
  const nameStarts = [];
  const nameContains = [];
  const stateContains = [];
  const codeContains = [];

  for (const s of stations) {
    if (s.station_code.startsWith(qUpper)) {
      codeStarts.push(s);
      continue;
    }
    const nameLower = s.station_name.toLowerCase();
    if (nameLower.startsWith(qLower)) {
      nameStarts.push(s);
      continue;
    }
    if (nameLower.includes(qLower)) {
      nameContains.push(s);
      continue;
    }
    if (s.state_name && s.state_name.toLowerCase().includes(qLower)) {
      stateContains.push(s);
      continue;
    }
    if (s.station_code.includes(qUpper)) {
      codeContains.push(s);
    }
  }

  const combined = [...codeStarts, ...nameStarts, ...nameContains, ...stateContains, ...codeContains];
  const seen = new Set();
  const result = [];
  for (const item of combined) {
    if (!seen.has(item.station_code)) {
      seen.add(item.station_code);
      result.push(item);
      if (result.length >= limit) break;
    }
  }
  return result;
}

export function getStationsByState(stateName) {
  if (!stateName) return [];
  const target = stateName.trim().toLowerCase();
  return stations.filter(s => s.state_name && s.state_name.toLowerCase() === target);
}

export function getStationsByZone(zoneCode) {
  if (!zoneCode) return [];
  const target = zoneCode.trim().toUpperCase();
  return stations.filter(s => s.region_code && s.region_code.toUpperCase() === target);
}

export default stations;
`;
fs.writeFileSync(path.join(distDir, 'index.mjs'), esmContent, 'utf8');

// 6. Write TypeScript types (.d.ts)
const dtsContent = `export interface Station {
  station_code: string;
  station_name: string;
  region_code: string;
  state_name: string;
}

export declare const stations: Station[];
export declare function getAllStations(): Station[];
export declare function findStationByCode(code: string): Station | undefined;
export declare function searchStations(query: string, limit?: number): Station[];
export declare function getStationsByState(stateName: string): Station[];
export declare function getStationsByZone(zoneCode: string): Station[];

export default stations;
`;
fs.writeFileSync(path.join(distDir, 'index.d.ts'), dtsContent, 'utf8');

console.log('Build completed for irctc-station-codes:');
console.log(`- stations.json (${stations.length} records)`);
console.log(`- stations.min.json`);
console.log(`- stations.csv`);
console.log(`- dist/index.js (CJS)`);
console.log(`- dist/index.mjs (ESM)`);
console.log(`- dist/index.d.ts (TypeScript)`);
