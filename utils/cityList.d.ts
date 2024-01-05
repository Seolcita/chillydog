declare module './city.list.json' {
  export interface City {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: {
      lon: number;
      lat: number;
    };
  }

  const value: City[];
  export default value;
}
