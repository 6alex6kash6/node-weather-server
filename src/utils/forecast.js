const request = require("request");

const forecast = (langitude, latitude, cb) => {
  const url = `https://api.darksky.net/forecast/b695556247f68b98deda5ac9cff98d49/${latitude},${langitude}?units=si&lang=be`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      cb("Unable to connect", undefined);
    } else if (response.body.error) {
      cb(response.body.error, undefined);
    } else {
      const { currently, daily } = response.body;
      const { temperature, precipProbability, windSpeed } = currently;
      const { data } = daily;
      cb(
        undefined,
        `${data[0].summary} Temprature: ${temperature}, Rain probability: ${precipProbability}. Wind speed is: ${windSpeed}`
      );
    }
  });
};

module.exports = forecast;
