document.addEventListener("DOMContentLoaded", () => {
  // Check which page is loaded and fetch/render data accordingly
  if (document.URL.includes("address.html")) {
    fetchAndRenderAddresses();
  } else if (document.URL.includes("city.html")) {
    fetchAndRenderCities();
  } else if (document.URL.includes("country.html")) {
    fetchAndRenderCountries();
  } else if (
    document.URL.endsWith("/") ||
    document.URL === window.location.origin
  ) {
    fetchAndRenderAddresses(); // Fetch and render addresses by default
  }
  displayCountryName();

  // Check if the user is logged in and hide the login button if they are
  const isLoggedIn =
    localStorage.getItem("token") && localStorage.getItem("username");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  if (loginBtn && registerBtn) {
    if (isLoggedIn) {
      loginBtn.style.display = "none";
      registerBtn.style.display = "none";
    } else {
      loginBtn.style.display = "block";
      registerBtn.style.display = "block";
    }
  }
});

// Function to fetch and render addresses
async function fetchAndRenderAddresses() {
  try {
    // Fetch data from address API
    const addressResponse = await fetch("/api/address");
    if (!addressResponse.ok) {
      throw new Error("Failed to fetch addresses");
    }
    const addresses = await addressResponse.json();

    // Fetch data from city API
    const cityResponse = await fetch("/api/city");
    if (!cityResponse.ok) {
      throw new Error("Failed to fetch cities");
    }
    const cities = await cityResponse.json();

    // Fetch data from country API
    const countryResponse = await fetch("/api/country");
    if (!countryResponse.ok) {
      throw new Error("Failed to fetch countries");
    }
    const countries = await countryResponse.json();

    // Select a random country name
    const randomCountryIndex = Math.floor(Math.random() * countries.length);
    const countryName = countries[randomCountryIndex].country_name;

    // Set the country name in local storage
    localStorage.setItem("country", countryName);

    // Render addresses with associated city and country
    renderAddressesTable(addresses, cities, countries);
  } catch (error) {
    console.error(error.message);
    // You can provide user feedback here, such as displaying an error message on the page
  }
}

// Function to display the country name on the page
function displayCountryName() {
  // Retrieve country name from local storage
  const countryName = localStorage.getItem("country");

  // Update the content of the code element with the country name
  const countryDisplay = document.getElementById("countryDisplay");
  if (countryDisplay && countryName) {
    countryDisplay.textContent = countryName;
  }
}

// Function to render addresses on the page
function renderAddressesTable(addresses, cities, countries) {
  const tbody = document.querySelector("#addressTable tbody");
  if (!tbody) {
    console.error("Table body element not found");
    return;
  }
  tbody.innerHTML = ""; // Clear previous content

  addresses.forEach((address) => {
    // Find city and country corresponding to the address
    const city = cities.find((city) => city.city_id === address.city_id);
    const country = countries.find(
      (country) => country.country_id === address.city_id
    );

    // Create table row
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${address.address_id}</td>
          <td>${address.street_address}</td>
          <td>${city ? city.city_name : "N/A"}</td>
          <td>${country ? country.country_name : "N/A"}</td>
        `;
    tbody.appendChild(row);
  });
}

// Function to fetch and render cities
async function fetchAndRenderCities() {
  try {
    const response = await fetch("/api/city");
    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }
    const cities = await response.json();
    renderCitiesTable(cities);
  } catch (error) {
    console.error(error.message);
    // Provide user feedback if needed
  }
}

// Function to render cities on the page
function renderCitiesTable(cities) {
  renderDataTable(cities, "cityTable", (city) => {
    return `<td>${city.city_id}</td><td>${city.city_name}</td>`;
  });
}

// Function to fetch and render countries
async function fetchAndRenderCountries() {
  try {
    const response = await fetch("/api/country");
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    const countries = await response.json();
    renderCountriesTable(countries);
  } catch (error) {
    console.error(error.message);
    // Provide user feedback if needed
  }
}

// Function to render countries on the page
function renderCountriesTable(countries) {
  renderDataTable(countries, "countryTable", (country) => {
    return `<td>${country.country_id}</td><td>${country.country_name}</td>`;
  });
}

// Generic function to render data onto the page in a table format
function renderDataTable(data, targetTable, generateRowContent) {
  const tableBody = document
    .getElementById(targetTable)
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear previous content

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = generateRowContent(item);
    tableBody.appendChild(row);
  });
}
