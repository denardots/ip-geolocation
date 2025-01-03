"use strict";

// Función asíncrona que realiza la petición a la API y obtiene un resultado
const fetchApi = async () => {
  let ip = input.value;
  const url = `https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/?ip=${ip}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '58d09363b9msh8075496aef95f69p127dacjsn8238f27bcc21',
      'x-rapidapi-host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
    }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // Llamamos a la función que mostrará el resultado al usuario
    showResult(result);
  } catch (error) {
    console.error(error);
    results.style.display = "flex";
    results.innerHTML = `<p class="error">Hubo un problema, reintente</p>`;
  };
};

// Función que recibe la respuesta de la API y muestra el resultado al usuario
const showResult = (result) => {
  results.style.display = "flex";
  // Utilizamos la propiedad hasOwnProperty para comprobar si existe la propiedad message que significa que hay un error
  if (result.hasOwnProperty("message")) {
    results.innerHTML = `<p class="error">La dirección IP es incorrecta</p>`;
  } else {
    results.innerHTML = `
      <p>IP: ${result.ip}</p>
      <p>Ciudad: ${result.city}</p>
      <p>Región: ${result.region}</p>
      <p>País: ${result.country}</p>
      <p>Continente: ${result.continent}</p>
      <p>Latitud: ${result.latitude}</p>
      <p>Longitud: ${result.longitude}</p>
      <p>Zona Horaria: ${result.timezone}</p>
    `;
  };
};

const form = document.getElementById("form");
const input = document.getElementById("input");
const results = document.getElementById("results");

// Listener que llama a l función fetch para obtener los resultados
form.addEventListener("submit", event => {
  event.preventDefault();
  fetchApi();
});