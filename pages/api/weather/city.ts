async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const city = req.body;

  const key = process.env.WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

  // console.log(url);
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  res.status(200).json({ data });
}
export default handler;
