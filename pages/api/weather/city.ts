import { Request, Response } from 'express';

async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return;
  }

  const city = req.body;

  const key = process.env.WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  res.status(200).json({ data });
}
export default handler;
