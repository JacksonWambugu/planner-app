import React, { useEffect, useState } from 'react';

const MyCustomWidget = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data,setdata] = useState(true);


  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLoading(false);
          const geoAPIUrl='https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en'

          fetch(geoAPIUrl)
          .then(res => {
            return res.json()})
          .then(data => {
            setdata(data)
          })
        },

        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    };

    fetchLocation();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="location-widget">

      <div>Country: {data.countryName}</div>
      <div>City: {data.city}</div>
      <div>Latitude: {latitude}</div>
      <div>Longitude: {longitude}</div>

    </div>
  );
};

export default MyCustomWidget;
