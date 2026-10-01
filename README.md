# 🚂 IRCTC Station Codes & Database

[![Total Stations](https://img.shields.io/badge/Total%20Stations-8%2C607-brightgreen.svg)](#)
[![State Coverage](https://img.shields.io/badge/State%20Coverage-100%25-blue.svg)](#)
[![Zone Coverage](https://img.shields.io/badge/Railway%20Zone%20Coverage-100%25-orange.svg)](#)
[![Data Source](https://img.shields.io/badge/Source-IRCTC%20Official-red.svg)](https://www.irctc.co.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

The most **comprehensive, clean, and 100% verified** database of all **8,607 official Indian Railways (IRCTC) stations**, complete with station codes, names, railway zones, and Indian state mappings.

Synchronized directly with the official [IRCTC](https://www.irctc.co.in) live station data feed.

---

## 📦 What's Included

| File | Description | Format |
| :--- | :--- | :--- |
| [`data/stations.json`](./data/stations.json) | Full, beautifully formatted JSON dataset | JSON |
| [`data/stations.min.json`](./data/stations.min.json) | High-performance minified JSON for frontend / bundle imports | Minified JSON |
| [`data/stations.csv`](./data/stations.csv) | Full station database for Python, Excel, Pandas & Data Science | CSV |
| [`dist/index.js`](./dist/index.js) | CommonJS Node.js module with fast lookup & search utilities | JavaScript |
| [`dist/index.mjs`](./dist/index.mjs) | ESM modern JavaScript module | ES Module |
| [`dist/index.d.ts`](./dist/index.d.ts) | Full TypeScript definitions | TypeScript |

---

## 🚀 Quick Start

### Installation

```bash
npm install irctc-station-codes
```

or with yarn / pnpm:

```bash
yarn add irctc-station-codes
pnpm add irctc-station-codes
```

---

## 💻 Usage

### 1. JavaScript / Node.js (CommonJS)

```javascript
const {
  findStationByCode,
  searchStations,
  getStationsByState,
  getStationsByZone
} = require('irctc-station-codes');

// Lookup station by code
const ndls = findStationByCode('NDLS');
console.log(ndls);
// {
//   station_code: 'NDLS',
//   station_name: 'NEW DELHI',
//   region_code: 'NR',
//   state_name: 'Delhi'
// }

// Search autocomplete by name, code, or state
const results = searchStations('mumbai', 5);
console.log(results);

// Filter by State
const karnatakaStations = getStationsByState('Karnataka');

// Filter by Railway Zone
const westernRailways = getStationsByZone('WR');
```

### 2. TypeScript / ES Modules

```typescript
import {
  findStationByCode,
  searchStations,
  Station
} from 'irctc-station-codes';

const station: Station | undefined = findStationByCode('BHC');
console.log(station?.station_name); // "BHADRAK"
console.log(station?.state_name);    // "Odisha"
console.log(station?.region_code);  // "ECo"
```

### 3. Python (Pandas)

```python
import pandas as pd

# Load from CSV
df = pd.read_csv('data/stations.csv')

# Search for a station
delhi_stations = df[df['state_name'] == 'Delhi']
print(delhi_stations[['station_code', 'station_name']])

# Lookup by station code
station = df[df['station_code'] == 'MMCT'].iloc[0]
print(f"{station['station_name']} ({station['station_code']}) - {station['state_name']}")
# MUMBAI CENTRAL (MMCT) - Maharashtra
```

---

## 📋 Data Schema

Each station record contains 4 properties:

```json
{
  "station_code": "NDLS",
  "station_name": "NEW DELHI",
  "region_code": "NR",
  "state_name": "Delhi"
}
```

### Field Reference:

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `station_code` | `string` | Official Indian Railways uppercase 1–5 character code | `"NDLS"`, `"MMCT"`, `"VGLJ"`, `"VNGP"` |
| `station_name` | `string` | Official Station Name in English | `"NEW DELHI"`, `"MUMBAI CENTRAL"` |
| `region_code` | `string` | Indian Railways Zonal short code | `"NR"`, `"WR"`, `"CR"`, `"SR"`, `"SC"`, `"BR"` |
| `state_name` | `string` | Indian State or Union Territory (or Country for Intl.) | `"Delhi"`, `"Maharashtra"`, `"West Bengal"` |

---

## ✨ Why this Database is Better

| Feature | Legacy CRIS / Raw Datasets | **This Database (`irctc-station-codes`)** |
| :--- | :---: | :---: |
| **Total Stations** | 13,000+ (includes closed sidings) | **8,607 (100% active booking stations)** |
| **Dead / Freight Sidings** | Included (clutters search results) | ❌ **Removed** |
| **State Name Coverage** | ~35% missing (`null`) | ✅ **100.0% Complete (0 null values)** |
| **Railway Zone Coverage** | Incomplete & inconsistent | ✅ **100.0% Complete (All 18 zones mapped)** |
| **New & Renamed Stations** | Missing (`MMCT`, `VGLJ`, `BNRS`, `VNGP`) | ✅ **Included & Verified** |
| **International Routes** | Missing | ✅ **Includes `BR` (Maitree / Bandhan Express)** |

---

## 🗺️ Railway Zones Reference

| Code | Zone Name | Headquarters |
| :--- | :--- | :--- |
| **`CR`** | Central Railway | Mumbai (CSMT) |
| **`WR`** | Western Railway | Mumbai (Churchgate) |
| **`NR`** | Northern Railway | New Delhi |
| **`NER` / `NE`** | North Eastern Railway | Gorakhpur |
| **`NCR` / `NC`** | North Central Railway | Prayagraj |
| **`NFR` / `NF`** | Northeast Frontier Railway | Guwahati (Maligaon) |
| **`NWR` / `NW`** | North Western Railway | Jaipur |
| **`SR`** | Southern Railway | Chennai |
| **`SCR` / `SC`** | South Central Railway | Secunderabad |
| **`SWR` / `SW`** | South Western Railway | Hubballi |
| **`ER`** | Eastern Railway | Kolkata |
| **`ECR` / `EC`** | East Central Railway | Hajipur |
| **`ECoR` / `ECo`** | East Coast Railway | Bhubaneswar |
| **`SER` / `SE`** | South Eastern Railway | Kolkata |
| **`SECR` / `SEC`** | South East Central Railway | Bilaspur |
| **`WCR` / `WC`** | West Central Railway | Jabalpur |
| **`KR`** | Konkan Railway | Navi Mumbai |
| **`MR`** | Metro Railway | Kolkata |
| **`BR`** | Bangladesh Railway *(Cross-border interchange)* | Dhaka |

---

## 🛠️ API Reference

### `getAllStations(): Station[]`
Returns the array of all 8,607 stations.

### `findStationByCode(code: string): Station | undefined`
Performs an $O(1)$ constant-time lookup for any station code (case-insensitive).

### `searchStations(query: string, limit?: number): Station[]`
Performs prefix and fuzzy matching on station code, station name, and state name. Default `limit` is 10.

### `getStationsByState(stateName: string): Station[]`
Filters all stations in a specific Indian state (e.g. `'Maharashtra'`, `'Gujarat'`, `'Tamil Nadu'`).

### `getStationsByZone(zoneCode: string): Station[]`
Filters all stations belonging to a specific Railway Zone (e.g. `'WR'`, `'NR'`, `'CR'`, `'SR'`).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Data is aggregated and curated from official public Indian Railways / IRCTC schedules and open datasets.
