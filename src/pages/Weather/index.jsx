import Form from "../../components/Form/Form";
import Info from "../../components/Info/Info";
import WeatherData from "../../components/WeatherData/WeatherData";
import "./weather.scss";

function Weather() {
  return (
    <div className="wrapper">
      <div className="main">
        <div className="title-block">
          <Info />
        </div>
        <div className="weather-block">
          <Form />
          <WeatherData />
        </div>
      </div>
    </div>
  );
}

export default Weather;
