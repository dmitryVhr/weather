import { useSelector } from "react-redux";
import "./WeatherData.scss";

export default function WeatherData() {
  const weatherData = useSelector((state) => state.weather.weatherData);

  return (
    <div className="infoWeath">
      {weatherData.city && (
        <div>
          <p>{`Погода: ${weatherData.weather}`}</p>
          <p>{`Температура: ${weatherData.temp} ℃`}</p>
          <p>{`Местоположение: ${weatherData.city}, ${weatherData.country}`}</p>
          <p>{`Давление: ${weatherData.pressure} мм рт. ст.`}</p>
          <p>{`Закат: ${weatherData.sunset}`}</p>
        </div>
      )}
      {weatherData.error && <p className="error">{weatherData.error}</p>}
    </div>
  );
}
