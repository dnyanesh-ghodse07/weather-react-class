import React from "react";
import Day from "./Day";

const Weather = ({ weather, locationDetails }) => {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  const { name, admin1, country_code } = locationDetails;

  function convertToFlag(countryCode) {
    const codePoints = countryCode
      ?.toUpperCase()
      ?.split("")
      ?.map((char) => 127397 + char?.charCodeAt());
    return codePoints && String?.fromCodePoint(...codePoints);
  }

  return (
    <div className="weather">
      <h2 className="location-name">
        {name} {convertToFlag(country_code)}
      </h2>
      <ul className="weather-list">
        {dates?.map((date, i) => (
          <Day
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
};

export default Weather;
