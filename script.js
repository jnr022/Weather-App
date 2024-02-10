import React, {
useState,
useEffect } from
"https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import axios from "https://cdn.skypack.dev/axios@0.25.0";

const WeatherApp = () => {
  const [locationInfo, setLocationInfo] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const getLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition(showPosition);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const showPosition = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocationInfo(`Latitude: ${latitude}, Longitude: ${longitude}`);
    getWeatherData(latitude, longitude);
  };

  const getWeatherData = (latitude, longitude) => {
    const apiKey = "67cfd64b58eadbcfb83e5beea87eb6ea";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    axios.
    get(apiUrl).
    then(response => {
      console.log(response.data); // JSON-Antwort anzeigen

      setWeatherData(response.data);
    }).
    catch(error => {
      console.error("Error fetching weather data:", error);
    });
  };

  /* useEffect(() => {
    getLocation();
  }, []);*/

  return /*#__PURE__*/(
    React.createElement("div", { className: "App" }, /*#__PURE__*/
    React.createElement("h1", null, "Weather App"), /*#__PURE__*/
    React.createElement("button", { onClick: getLocation }, "Locate"), /*#__PURE__*/
    React.createElement("p", null, locationInfo),
    weatherData && /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", null, "Current weather in ", weatherData.name), /*#__PURE__*/
    React.createElement("p", null, "Temperature: ", (weatherData.main.temp - 273.15).toFixed(2), "\xB0C"), /*#__PURE__*/
    React.createElement("p", null, "Description: ", weatherData.weather[0].description))));




};

ReactDOM.render( /*#__PURE__*/React.createElement(WeatherApp, null), document.getElementById("root"));