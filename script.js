// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

// Update navbar style on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.9)';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.background = 'var(--gray)';
        navbar.style.padding = '1rem 0';
    }
});

// Responsive adjustments
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});

// Weather API integration
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const currentConditionsDiv = document.getElementById('current-conditions');
const forecastDataDiv = document.getElementById('forecast-data');
const locationInput = document.getElementById('location-input');
const getWeatherButton = document.getElementById('get-weather');

getWeatherButton.addEventListener('click', () => {
    const location = locationInput.value;
    fetchWeatherData(location);
});

function fetchWeatherData(location) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
        });
}

function displayCurrentWeather(data) {
    const { main, weather, name } = data;
    currentConditionsDiv.innerHTML = `
        <h3>${name}</h3>
        <p>Temperature: ${main.temp} °C</p>
        <p>Conditions: ${weather[0].description}</p>
    `;
}

function displayForecast(data) {
    forecastDataDiv.innerHTML = '';
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const { main, weather } = item;
        forecastDataDiv.innerHTML += `
            <div class="forecast-card">
                <h4>${date}</h4>
                <p>Temperature: ${main.temp} °C</p>
                <p>Conditions: ${weather[0].description}</p>
            </div>
        `;
    });
}
