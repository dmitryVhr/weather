import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "fa13c7113b5346e7c1fd829e078ace41";

const initialState = {
  weatherData: {
    temp: null,
    city: null,
    country: null,
    pressure: null,
    sunset: null,
    error: null,
    weather: null,
  },
};

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (city, { rejectWithValue }) => {
    if (!city) {
      return rejectWithValue("Введите название города");
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
    );
    const data = await response.json();

    if (response.status === 404) {
      return rejectWithValue("Название города введено не верно");
    }

    const sunset = data.sys.sunset * 1000;
    const date = new Date(sunset);
    const sunsetDate = `${date.getHours()}:${date.getMinutes()}`;
    const pressure = Math.round(data.main.pressure * 0.750062);
    let weatherDescription = data.weather[0].description;

    if (weatherDescription) {
      weatherDescription =
        weatherDescription.charAt(0).toUpperCase() +
        weatherDescription.slice(1);
    }
    return {
      temp: Math.round(data.main.temp),
      city: data.name,
      country: data.sys.country,
      pressure: pressure,
      sunset: sunsetDate,
      weather: weatherDescription,
      error: null,
    };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    updateWeatherData: (state, action) => {
      Object.assign(state.weatherData, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weatherData = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.weatherData = {
          temp: null,
          city: null,
          country: null,
          pressure: null,
          sunset: null,
          error: action.payload,
        };
      });
  },
});

export const { updateWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
