console.log("hi");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#message-1");
const msgTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  msgTwo.textContent = "Loading...";
  fetch(`/weather?address=${location}`).then((res) => {
    res
      .json()
      .then(
        ({ location, forecastData }) =>
          (msgTwo.textContent = `${location}. ${forecastData}`)
      );
  });
});
