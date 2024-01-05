declare module './city.list.json' {
  export interface City {
    id: string;
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
