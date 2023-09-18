import React, { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Loading from "./components/Loading";
import Weather from "./components/Weather";

const App1 = () => {
  const [location, setLocation] = useState("pune");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [locationDetails, setLocationDetails] = useState({});
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (location.length < 2) {
      setWeather({});
    }

    try {
      setLoading(true);
      //   get location data (latitude,longitude)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) throw new Error("Location not found");

      const { longitude, latitude, timezone } = geoData?.results.at(0);
      setLocationDetails(geoData?.results.at(0));
      //   get weather data for city using longitude, latitude & timezone
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();

      setWeather(weatherData?.daily);
      setLoading(false);
      setError("");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [location]);

  return (
    <div className="main">
      <Input location={location} setLocation={setLocation} />
      {loading && <Loading />}
      <Weather
        weather={weather}
        locationDetails={locationDetails}
        location={location}
      />
    </div>
  );
};

export default App1;
