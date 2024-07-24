import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Form from "./Form";
import { fetchWeatherData } from "../../store/weatherSlice";
import '@testing-library/jest-dom'; // Импорт для расширенных матчеров

const mockStore = configureStore();
jest.mock("../../store/weatherSlice", () => ({
  fetchWeatherData: jest.fn(),
}));

describe("Form component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it("render component Form", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Город/)).toBeInTheDocument();
    expect(screen.getByText(/Узнать погоду/)).toBeInTheDocument();
  });

  it("updates the input value on change", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Город/);
    fireEvent.change(input, { target: { value: "Москва" } });

    expect(input.value).toBe("Москва");
  });

  it("dispatch form", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Город/);
    const button = screen.getByText(/Узнать погоду/);

    fireEvent.change(input, { target: { value: "Москва" } });
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(fetchWeatherData("Москва"));
  });
});
