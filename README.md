<div align="center">

# 🚆 IRCTC Station Codes & Database

**The official, curated, and 100% verified dataset of all 8,607 active Indian Railway stations.**

[![Total Stations](https://img.shields.io/badge/Verified_Stations-8%2C607-00c853?style=for-the-badge&logo=train&logoColor=white)](https://github.com/BhavyanX/irctc-station-codes)
[![State Coverage](https://img.shields.io/badge/State_Coverage-100%25_(0_Nulls)-2979ff?style=for-the-badge&logo=checkmarx&logoColor=white)](https://github.com/BhavyanX/irctc-station-codes)
[![Zone Coverage](https://img.shields.io/badge/Zonal_Mapping-18_Zones_+_Intl-ff9100?style=for-the-badge&logo=target&logoColor=white)](https://github.com/BhavyanX/irctc-station-codes)
[![License: MIT](https://img.shields.io/badge/License-MIT-6c757d?style=for-the-badge)](LICENSE)

<br />

[**Explore Data**](#-data-schema) • [**CDN Access**](#-cdn--direct-access) • [**Installation**](#-quick-start) • [**Code Examples**](#-usage-examples) • [**Comparison**](#-why-this-dataset) • [**Zone Directory**](#-railway-zones-reference)

</div>

---

## 🌟 Highlights

* **100% Zero-Null Guarantee**: Every single station record is mapped to a verified `state_name` and `region_code` (0 missing / null values across all 8,607 entries).
* **Direct IRCTC Synchronization**: Derived from live commercial booking feeds, ensuring parity with the official [IRCTC Portal](https://www.irctc.co.in).
* **Noise-Filtered & Clean**: ~4,500 non-commercial freight sidings, cabin waypoints, and abandoned halts are filtered out to provide lightning-fast, high-precision autocomplete dropdowns.
* **Modern Renamings Included**: Contains recent official railway code renamings such as `VGLJ` (Jhansi / Veerangana Lakshmibai), `MMCT` (Mumbai Central), `BNRS` (Banaras), and `PRYJ` (Prayagraj).
* **Cross-Border Interchanges**: Full support for international passenger routes including Bangladesh Railway (`BR`) stations for *Maitree Express* and *Bandhan Express* (`CHLT`, `KLNB`, `DACT`, `DAKA`, `DHCZ`).
* **Multi-Format Ready**: Available as structured `JSON`, lightweight `min.json`, `CSV` (for Pandas / Excel), and typed `npm` library for TypeScript and Node.js.

---

## 📂 Repository Contents

| File | Size | Format | Description |
| :--- | :--- | :--- | :--- |
| [📁 `data/stations.json`](./data/stations.json) | ~920 KB | Pretty JSON | Full formatted dataset with 4 core attributes |
| [⚡ `data/stations.min.json`](./data/stations.min.json) | ~320 KB | Minified JSON | Ultra-compact payload for web bundle imports & frontends |
| [📊 `data/stations.csv`](./data/stations.csv) | ~340 KB | CSV Table | Ready for Python (Pandas), R, Excel, and Data Science |
| [📦 `dist/index.js`](./dist/index.js) | ~400 KB | CommonJS | Node.js runtime module with fast search & filter helpers |
| [🚀 `dist/index.mjs`](./dist/index.mjs) | ~400 KB | ESM | Modern ES Module export with tree-shaking support |
| [📝 `dist/index.d.ts`](./dist/index.d.ts) | < 1 KB | TypeScript | Complete TypeScript typings (`Station` interface) |

---

## 🌐 CDN & Direct Access

You can directly fetch the verified station dataset in client-side applications without installing any package dependencies:

### jsDelivr CDN (Fast & Cached)
```text
https://cdn.jsdelivr.net/gh/BhavyanX/irctc-station-codes@master/data/stations.min.json
```

### GitHub Raw URL
```text
https://raw.githubusercontent.com/BhavyanX/irctc-station-codes/master/data/stations.json
```

### Quick Browser Fetch Example
```javascript
// Fetch directly in browser or modern Node.js
const res = await fetch('https://cdn.jsdelivr.net/gh/BhavyanX/irctc-station-codes@master/data/stations.min.json');
const stations = await res.json();

console.log(`Loaded ${stations.length} stations!`);
// Output: Loaded 8607 stations!
```

---

## 🚀 Quick Start

### Installation via Package Managers

```bash
# npm
npm install irctc-station-codes

# yarn
yarn add irctc-station-codes

# pnpm
pnpm add irctc-station-codes

# bun
bun add irctc-station-codes
```

---

## 💻 Usage Examples

### 1. JavaScript / Node.js (CommonJS)

```javascript
const {
  findStationByCode,
  searchStations,
  getStationsByState,
  getStationsByZone,
  getAllStations
} = require('irctc-station-codes');

// 🔍 1. Constant-time O(1) Lookup by Station Code (Case-insensitive)
const ndls = findStationByCode('NDLS');
console.log(ndls);
/*
{
  station_code: 'NDLS',
  station_name: 'NEW DELHI',
  region_code: 'NR',
  state_name: 'Delhi'
}
*/

// ⚡ 2. Instant Autocomplete Search (matches code, name, or state)
const results = searchStations('mumbai', 3);
console.log(results);
/*
[
  { station_code: 'MMCT', station_name: 'MUMBAI CENTRAL', region_code: 'WR', state_name: 'Maharashtra' },
  { station_code: 'CSMT', station_name: 'CHHATRAPATI SHIVAJI MAHARAJ TERMINUS', region_code: 'CR', state_name: 'Maharashtra' },
  { station_code: 'BDTS', station_name: 'BANDRA TERMINUS', region_code: 'WR', state_name: 'Maharashtra' }
]
*/

// 🗺️ 3. Filter by Indian State
const keralaStations = getStationsByState('Kerala');
console.log(`Found ${keralaStations.length} stations in Kerala.`);

// 🚆 4. Filter by Railway Zone
const westernRailways = getStationsByZone('WR');
console.log(`Western Railway has ${westernRailways.length} active stations.`);
```

### 2. TypeScript / ES Modules (ESM)

```typescript
import {
  findStationByCode,
  searchStations,
  Station
} from 'irctc-station-codes';

// Type-safe station queries
const station: Station | undefined = findStationByCode('BHC');

if (station) {
  console.log(`${station.station_name} (${station.station_code}) in ${station.state_name} [${station.region_code}]`);
  // Output: BHADRAK (BHC) in Odisha [ECo]
}
```

### 3. Python (Data Science & Pandas)

```python
import pandas as pd

# Load stations CSV
df = pd.read_csv('https://raw.githubusercontent.com/BhavyanX/irctc-station-codes/master/data/stations.csv')

# Top 5 states by total railway stations
state_counts = df['state_name'].value_counts().head(5)
print(state_counts)
# Uttar Pradesh    1002
# Maharashtra       695
# West Bengal       676
# Rajasthan         612
# Gujarat           585

# Find all stations in a specific zone
ecor_stations = df[df['region_code'] == 'ECo']
print(f'East Coast Railway Stations: {len(ecor_stations)}')
```

---

## 📊 Data Schema

Every entry in the database adheres to the following unified schema:

```json
{
  "station_code": "NDLS",
  "station_name": "NEW DELHI",
  "region_code": "NR",
  "state_name": "Delhi"
}
```

### Schema Field Specification:

| Field | Type | Description | Sample Values |
| :--- | :--- | :--- | :--- |
| `station_code` | `string` | Official Indian Railways uppercase alphanumeric station identifier (1–5 chars) | `"NDLS"`, `"MMCT"`, `"VGLJ"`, `"HWH"` |
| `station_name` | `string` | Official English commercial passenger station name | `"NEW DELHI"`, `"MUMBAI CENTRAL"`, `"HOWRAH JN"` |
| `region_code` | `string` | Indian Railways Zonal code or international railway administration | `"NR"`, `"WR"`, `"CR"`, `"SR"`, `"ECo"`, `"BR"` |
| `state_name` | `string` | Official State / Union Territory name or sovereign nation | `"Delhi"`, `"Maharashtra"`, `"West Bengal"`, `"Bangladesh"` |

---

## 🏆 Why this Dataset is Superior

| Quality Metric | Generic Web Scrapes / CRIS Dumps | **`irctc-station-codes` (This Repo)** |
| :--- | :---: | :---: |
| **Total Commercial Stations** | ~13,500 (Polluted with goods sidings) | **8,607 Active Commercial Stations** |
| **State Name Completeness** | ❌ ~30-40% null or unassigned | ✅ **100.0% Complete (0 null values)** |
| **Railway Zone Precision** | ⚠️ Generic state-level approximations | ✅ **Verified Zonal & Divisional mapping** |
| **Dead & Freight Cabins** | ❌ Included (degrades UX & search) | ✅ **Completely Cleaned & Filtered** |
| **Recent Station Renamings** | ❌ Outdated (`BNC`, `JHS`, `MUV`) | ✅ **Up to Date (`MMCT`, `VGLJ`, `BNRS`, etc.)** |
| **Cross-Border Interchange Support** | ❌ Excluded | ✅ **Includes `BR` (Maitree / Bandhan Express)** |
| **Developer Ergonomics** | ⚠️ Raw dump files only | ✅ **TypeScript, CJS, ESM, CSV, Minified JSON, CDN** |

---

## 🏛️ Railway Zones Reference

| Zone Code | Railway Zone Name | Zonal Headquarters | Primary Operational States |
| :--- | :--- | :--- | :--- |
| **`CR`** | Central Railway | Mumbai (CSMT) | Maharashtra, Madhya Pradesh, Karnataka |
| **`WR`** | Western Railway | Mumbai (Churchgate) | Gujarat, Maharashtra, Rajasthan, MP |
| **`NR`** | Northern Railway | New Delhi | Delhi, UP, Punjab, Haryana, J&K, HP, Chandigarh |
| **`NER` / `NE`** | North Eastern Railway | Gorakhpur | Uttar Pradesh, Uttarakhand, Bihar |
| **`NCR` / `NC`** | North Central Railway | Prayagraj | Uttar Pradesh, Madhya Pradesh, Rajasthan, Haryana |
| **`NFR` / `NF`** | Northeast Frontier Railway | Guwahati (Maligaon) | Assam, West Bengal, Bihar, NE States |
| **`NWR` / `NW`** | North Western Railway | Jaipur | Rajasthan, Gujarat, Haryana, Punjab |
| **`SR`** | Southern Railway | Chennai | Tamil Nadu, Kerala, Puducherry, Andhra Pradesh |
| **`SCR` / `SC`** | South Central Railway | Secunderabad | Telangana, Andhra Pradesh, Maharashtra, Karnataka |
| **`SWR` / `SW`** | South Western Railway | Hubballi | Karnataka, Goa, Tamil Nadu, Andhra Pradesh |
| **`ER`** | Eastern Railway | Kolkata (Fairlie Place) | West Bengal, Bihar, Jharkhand |
| **`ECR` / `EC`** | East Central Railway | Hajipur | Bihar, Jharkhand, Uttar Pradesh, MP |
| **`ECoR` / `ECo`** | East Coast Railway | Bhubaneswar | Odisha, Andhra Pradesh, Chhattisgarh |
| **`SER` / `SE`** | South Eastern Railway | Kolkata (Garden Reach) | West Bengal, Jharkhand, Odisha |
| **`SECR` / `SEC`** | South East Central Railway | Bilaspur | Chhattisgarh, Maharashtra, Madhya Pradesh, Odisha |
| **`WCR` / `WC`** | West Central Railway | Jabalpur | Madhya Pradesh, Rajasthan, Uttar Pradesh |
| **`KR`** | Konkan Railway | Navi Mumbai (CBD Belapur) | Maharashtra, Goa, Karnataka |
| **`MR`** | Metro Railway | Kolkata | West Bengal |
| **`BR`** | Bangladesh Railway | Dhaka | Bangladesh *(Cross-border passenger exchange)* |

---

## 📚 API Reference (NPM Package)

### `getAllStations(): Station[]`
Returns the complete immutable array of all 8,607 stations.

### `findStationByCode(stationCode: string): Station | undefined`
Performs an $O(1)$ constant-time lookup for the station record matching the given code (case-insensitive).

### `searchStations(query: string, limit?: number): Station[]`
Performs multi-key prefix and fuzzy search across `station_code`, `station_name`, and `state_name`.
* **`query`**: Search keyword (e.g., `"howrah"`, `"DELHI"`, `"MAHA"`).
* **`limit`** *(optional, default: `10`)*: Maximum number of search results to return.

### `getStationsByState(stateName: string): Station[]`
Returns all stations located within the specified Indian State or Union Territory.

### `getStationsByZone(zoneCode: string): Station[]`
Returns all stations categorized under a specific Railway Zonal Code (e.g. `"WR"`, `"NR"`, `"CR"`).

---

## 🤝 Contributing

Contributions, station data corrections, and zone improvements are warmly welcomed!

1. Fork the Project (`https://github.com/BhavyanX/irctc-station-codes/fork`)
2. Create your Feature Branch (`git checkout -b feature/AddStationUpdate`)
3. Commit your Changes (`git commit -m 'feat: update station details for XXXX'`)
4. Push to the Branch (`git push origin feature/AddStationUpdate`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for full details.

Data aggregated and curated from official public Indian Railways schedules and IRCTC reservation systems.

<div align="center">
<sub>Maintained with ❤️ by <a href="https://github.com/BhavyanX">BhavyanX</a></sub>
</div>
