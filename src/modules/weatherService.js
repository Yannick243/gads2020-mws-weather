export function fetchWeather(query) {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const apiURL = process.env.OPEN_WEATHER_API_URL;

  return new Promise((resolve, reject) => {
    fetch(`${apiURL}forecast?q=${query}&units=metric&cnt=7&appid=${apiKey}`)
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
  });
}
