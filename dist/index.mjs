import path from 'path';
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
