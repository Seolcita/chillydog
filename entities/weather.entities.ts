export type WeatherData = {
  weather: string;
  weatherId: number;
  description: string;
  temperature: number;
  humidity: number;
  city: string;
};

export enum WeatherType {
  THUNDERSTORM = 'THUNDERSTORM',
  DRIZZLE = 'DRIZZLE',
  RAIN = 'RAIN',
  SNOW = 'SNOW',
  CLEAR = 'CLEAR',
  CLOUD = 'CLOUD',
  OTHERS = 'OTHERS',
}

export interface ConvertTempUnit {
  temp: number;
  unit: string;
}
