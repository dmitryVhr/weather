import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import WeatherData from "./WeatherData";
import '@testing-library/jest-dom';

const mockStore = configureStore();
jest.mock("../../store/weatherSlice", () => ({
  fetchWeatherData: jest.fn(),
}));

describe("WeatherData component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      weather: {
        weatherData: {
          temp: 24,
          city: "Москва",
          country: "RU",
          pressure: 761,
          sunset: "21:52",
          weather: "Переменная облачность",
          error: null,
        },
      },
    });

    store.dispatch = jest.fn();
  });
  it("WeatherData component render", () => {
    render(
      <Provider store={store}>
        <WeatherData />
      </Provider>
    );

    expect(screen.getByText(/Погода:/)).toBeInTheDocument();
  });

  it("renders nothing datra", () => {
    store = mockStore({
      weather: {
        weatherData: {},
      },
    });

    render(
      <Provider store={store}>
        <WeatherData />
      </Provider>
    );

    expect(screen.queryByText(/Погода:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Температура:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Местоположение:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Давление:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Закат:/)).not.toBeInTheDocument();
  });
});
