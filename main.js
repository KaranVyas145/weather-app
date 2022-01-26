window.addEventListener("load", () => {
  let long;
  let lat;
  let key = `67521aab479b5104a4a9037f587854c6`;
  let temperatureDescription = document.querySelector(".temperature-description");
  let weatherIcon =document.querySelector("#icon");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let degreeSection=document.querySelector(".temperature");
  let temperatureUnit=document.querySelector('span');
  console.log(temperatureUnit);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${key}`;
      // console.log(api);
      fetch(api)
        .then((Response) => {
          return Response.json();
        })
        .then((data) => {
          console.log(data.current);
          const { timezone } = data;
          console.log(timezone);
          const { temp } = data.current;
          console.log(temp);
          const { description,icon } = 
          data.current.weather[0];
          console.log(description);
          

          let temperature=(temp - 272.15).toFixed(2);
          // Formula for Celsius 
          let farhenheit= (temperature*(9/5))+32;

          //   set DOM elements from the API
          temperatureDegree.innerText = temperature;
          temperatureDescription.innerText = description.toUpperCase();
          locationTimezone.innerText = timezone;
          weatherIcon.setAttribute('src',`http://openweathermap.org/img/w/${icon}.png`);

          // Change tempeature to C/F 
          degreeSection.addEventListener('click',()=>{
            // console.log(temperatureUnit.innerText);
            if(temperatureUnit.innerText==='C'){
              temperatureUnit.innerText='F';
              temperatureDegree.innerText=farhenheit.toFixed(2);
            }
            else{
              temperatureDegree.innerText=temperature;
              temperatureUnit.innerText='C';
            }
          })

        });
    });
  }
});
