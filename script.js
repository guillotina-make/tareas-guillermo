// script.js
document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'b97576fafdbe832c7f84aec385b4a739'; // Clave API proporcionada
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

    const fetchButton = document.getElementById("fetchButton");
    const cityInput = document.getElementById("cityInput");
    const dataContainer = document.getElementById("data");

    fetchButton.addEventListener("click", function() {
        const city = cityInput.value.trim();

        if (city) {
            const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=es`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('La respuesta de la API no fue satisfactoria.');
                    }
                    return response.json();
                })
                .then(data => {
                    dataContainer.innerHTML = formatData(data);
                })
                .catch(error => {
                    console.error("Error al consumir la API:", error);
                    dataContainer.innerHTML = "<p>Hubo un error al obtener los datos.</p>";
                });
        } else {
            dataContainer.innerHTML = "<p>Por favor ingresa el nombre de una ciudad.</p>";
        }
    });

    function formatData(data) {
        const { name, main, weather, wind } = data;
        const temperature = main.temp;
        const feelsLike = main.feels_like;
        const humidity = main.humidity;
        const weatherDescription = weather[0].description;
        const windSpeed = wind.speed;

        return `
            <h2>${name}</h2>
            <p>Temperatura: ${temperature}°C</p>
            <p>Sensación térmica: ${feelsLike}°C</p>
            <p>Humedad: ${humidity}%</p>
            <p>Clima: ${weatherDescription}</p>
            <p>Velocidad del viento: ${windSpeed} m/s</p>
        `;
    }
});
