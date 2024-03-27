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

    // Render addresses with associated city and country
    renderAddresses(addresses, cities, countries);
  } catch (error) {
    console.error(error.message);
  }
}

// Function to render addresses on the page
function renderAddresses(addresses, cities, countries) {
  const addressList = document.getElementById("address-list");
  addressList.innerHTML = ""; // Clear previous content

  addresses.forEach((address) => {
    // Find city and country corresponding to the address
    const city = cities.find((city) => city.city_id === address.city_id);
    const country = countries.find(
      (country) => country.country_id === address.city_id
    );

    // Create address card
    const addressCard = createAddressCard(address, city, country);
    addressList.appendChild(addressCard);
  });
}

// Function to create a card for each address
function createAddressCard(address, city, country) {
  const addressCard = document.createElement("div");
  addressCard.classList.add("address-card");

  const streetAddress = document.createElement("p");
  streetAddress.textContent = `Popular Site: ${address.street_address}`;

  const cityElement = document.createElement("p");
  cityElement.textContent = `City: ${city ? city.city_name : "N/A"}`;

  const countryElement = document.createElement("p");
  countryElement.textContent = `Country: ${
    country ? country.country_name : "N/A"
  }`;

  addressCard.appendChild(streetAddress);
  addressCard.appendChild(cityElement);
  addressCard.appendChild(countryElement);

  return addressCard;
}

// Function to fetch and render cities
async function fetchAndRenderCities() {
  try {
    const response = await fetch("/api/city");
    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }
    const cities = await response.json();
    renderCities(cities);
  } catch (error) {
    console.error(error.message);
  }
}

// Function to render cities on the page
function renderCities(cities) {
  const cityList = document.getElementById("city-list");
  cityList.innerHTML = ""; // Clear previous content

  cities.forEach((city) => {
    const cityItem = document.createElement("div");
    cityItem.textContent = city.city_name;
    cityList.appendChild(cityItem);
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
    renderCountries(countries);
  } catch (error) {
    console.error(error.message);
  }
}

//====================city and country==================================
// Function to render countries on the page
function renderCountries(countries) {
  renderData(countries, "countryTable", (country) => {
    return `<td>${country.country_id}</td><td>${country.country_name}</td>`;
  });
}

// Function to render cities on the page
function renderCities(cities) {
  renderData(cities, "cityTable", (city) => {
    return `<td>${city.city_id}</td><td>${city.city_name}</td>`;
  });
}

// Generic function to render data onto the page
function renderData(data, targetTable, generateRowContent) {
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

//=============================css functions===================================
