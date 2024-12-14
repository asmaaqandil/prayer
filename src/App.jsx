import React, { useState, useEffect } from "react";
import Prayer from "./component/Prayer";

function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [selectedCity, setSelectedCity] = useState("Cairo");
  const [currentAzan, setCurrentAzan] = useState(null); 
  const cities = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "أسوان", value: "Aswan" },
    { name: "الجيزة", value: "Giza" },
    { name: "الأقصر", value: "Luxor" },
  ];

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=Egypt&method=2`
        );
        const data = await response.json();
        setPrayerTimes(data.data.timings); 
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const playAzan = (azanFile) => {
    if (currentAzan) {
      currentAzan.pause();  
      currentAzan.currentTime = 0;  
    }

    const audio = new Audio(`/sounds/${azanFile}`);
    audio.play();
    setCurrentAzan(audio); 
  };

  
  const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(':');
    const hour12 = hour % 12 || 12; 
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minute} ${ampm}`;
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="top-section">
            <div className="city">
              <h3>المدينة</h3>
              <select onChange={handleCityChange}>
                {cities.map((city, index) => (
                  <option key={index} value={city.value}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="date">
              <h3>التاريخ</h3>
              <h4>{new Date().toLocaleDateString()}</h4>
            </div>
          </div>
          <Prayer
            name="الفجر"
            time={convertTo12HourFormat(prayerTimes.Fajr || "جارٍ التحميل...")}
            playAzan={() => playAzan("azan1.mp3")}
          />
          <Prayer
            name="الظهر"
            time={convertTo12HourFormat(prayerTimes.Dhuhr || "جارٍ التحميل...")}
            playAzan={() => playAzan("azan2.mp3")}
          />
          <Prayer
            name="العصر"
            time={convertTo12HourFormat(prayerTimes.Asr || "جارٍ التحميل...")}
            playAzan={() => playAzan("azan3.mp3")}
          />
          <Prayer
            name="المغرب"
            time={convertTo12HourFormat(prayerTimes.Maghrib || "جارٍ التحميل...")}
            playAzan={() => playAzan("azan4.mp3")}
          />
          <Prayer
            name="العشاء"
            time={convertTo12HourFormat(prayerTimes.Isha || "جارٍ التحميل...")}
            playAzan={() => playAzan("azan5.mp3")}
          />
        </div>
      </section>
    </>
  );
}

export default App;







  
  
   
           


   


      
       







 


       
        
         






