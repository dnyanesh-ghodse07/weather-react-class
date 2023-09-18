import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import Input from "./components/Input";
import Loading from "./components/Loading";
import "./App.css";
const App = () => {
  const [location, setLocation] = useState("pune");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [locationDetails, setLocationDetails] = useState({});

  const fetchWeather = async () => {
    if (location?.length < 2) {
      setWeather({});
    }
    try {
      setLoading(true);
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();
      if (!geoData.results) throw new Error("Location not found");
      const { latitude, longitude, timezone } = geoData.results.at(0);
      setLocationDetails(geoData.results.at(0));
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData?.daily);
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
      {error && <p>{error.message}</p>}
      <Weather
        weather={weather}
        locationDetails={locationDetails}
        location={location}
      />
    </div>
  );
};

export default App;
