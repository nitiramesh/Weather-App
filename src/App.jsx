import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cityName, setCityName] = useState("Bengaluru");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, [cityName]);

  const fetchWeatherData = () => {
    setLoading(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=bb7f90de724a41ca70af868d33fb089b&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          setError(false);
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCityName(e.target.value);
      setInputText("");
    }
  };

  return (
    <div className="bg_img">
      <TextField
        variant="filled"
        label="Search location"
        className="input"
        value={inputText}
        error={error}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleSearch}
      />
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error occurred while fetching data.</h1>
      ) : (
        <>
          <h1 className="city">{data.name}</h1>
          <div className="group">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              alt=""
            />
            <h1>{data.weather[0].main}</h1>
          </div>
          <h1 className="temp">{data.main.temp.toFixed()} °C</h1>

          <div className="box_container">
            <div className="box">
              <p>Humidity</p>
              <h1>{data.main.humidity.toFixed()}%</h1>
            </div>

            <div className="box">
              <p>Wind</p>
              <h1>{data.wind.speed.toFixed()} km/h</h1>
            </div>

            <div className="box">
              <p>Feels Like</p>
              <h1>{data.main.feels_like.toFixed()} °C</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
