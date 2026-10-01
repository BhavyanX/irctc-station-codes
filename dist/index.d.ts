export interface Station {
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
