import React from 'react';
import WeatherData from "./WeatherData";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "../../assets/scss/main.scss";

const mockStore = configureStore();

export default {
  title: "WeatherData",
  component: WeatherData,
  argTypes: {
    temp: { control: 'number' },
    city: { control: 'text' },
    country: { control: 'text' },
    pressure: { control: 'number' },
    sunset: { control: 'text' },
    weather: { control: 'text' },
  },
};

const Template = (args) => {
  const store = mockStore({
    weather: {
      weatherData: {
        ...args,
        error: null,
      },
    },
  });

  return (
    <Provider store={store}>
      <WeatherData />
    </Provider>
  );
};

export const Default = Template.bind({});
Default.args = {
  temp: 24,
  city: "Москва",
  country: "RU",
  pressure: 761,
  sunset: "21:52",
  weather: "Переменная облачность",
};
