const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWxpYWtzYW5kcmthc2hldXNraSIsImEiOiJja3J2bDgxdWgwN3E0Mm9ucW0zNDFyZTI5In0.y_Oke1bq0MGbZadQDCg8ng&limit=1`;

  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect", undefined);
    } else if (res.body.features.length === 0) {
      callback("Invalid data passed", undefined);
    } else {
      const { features } = res.body;
      const { center, place_name: location } = features[0];
      const [longitude, latitude] = center;
      callback(undefined, { longitude, latitude, location });
    }
  });
};

module.exports = geocode;
