const temperature = 32; // °C
const windSpeed = 12; // km/h

function calculateWindChill(temp, speed) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);
}

// Check conditions: temp <= 10°C and wind speed > 4.8 km/h
if (temperature <= 10 && windSpeed > 4.8) {
    document.getElementById('windchill').textContent = calculateWindChill(temperature, windSpeed) + "°C";
} else {
    document.getElementById('windchill').textContent = "N/A";
}