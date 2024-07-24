import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherData } from "../../store/weatherSlice";
import "./Form.scss";

export default function Form() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(fetchWeatherData(city));
  };

  const changeInput = (event) => {
    setCity(event.target.value);
  };

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        value={city}
        onChange={changeInput}
        placeholder="Город"
      />
      <button type="submit">Узнать погоду</button>
    </form>
  );
}
