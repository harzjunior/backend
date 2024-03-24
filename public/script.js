document.addEventListener("DOMContentLoaded", () => {
  fetchAddresses();
});

// Function to fetch addresses from the backend
const fetchAddresses = async () => {
  try {
    const response = await fetch("/api/address");
    if (!response.ok) {
      throw new Error("Failed to fetch addresses");
    }
    const addresses = await response.json();
    displayAddresses(addresses);
  } catch (error) {
    console.error(error.message);
  }
};

// Function to display addresses on the page
const displayAddresses = (addresses) => {
  const addressList = document.getElementById("address-list");
  addressList.innerHTML = ""; // Clear previous content

  addresses.forEach((address) => {
    const addressCard = createAddressCard(address);
    addressList.appendChild(addressCard);
  });
};

// Function to create a card for each address
const createAddressCard = (address) => {
  const addressCard = document.createElement("div");
  addressCard.classList.add("address-card");

  const streetAddress = document.createElement("p");
  streetAddress.textContent = address.street_address;

  const city = document.createElement("p");
  city.textContent = `City: ${address.city_name}`;

  addressCard.appendChild(streetAddress);
  addressCard.appendChild(city);

  return addressCard;
};

// Fetch data from server and render on respective pages

// Function to fetch and render addresses
async function fetchAndRenderAddresses() {
  const response = await fetch("/api/address");
  const addresses = await response.json();
  const addressList = document.getElementById("addressList");
  addressList.innerHTML = addresses
    .map((address) => `<div>${address.addressField}</div>`)
    .join("");
}

// Function to fetch and render cities
async function fetchAndRenderCities() {
  const response = await fetch("/api/city");
  const cities = await response.json();
  const cityList = document.getElementById("cityList");
  cityList.innerHTML = cities
    .map((city) => `<div>${city.cityName}</div>`)
    .join("");
}

// Function to fetch and render countries
async function fetchAndRenderCountries() {
  const response = await fetch("/api/country");
  const countries = await response.json();
  const countryList = document.getElementById("countryList");
  countryList.innerHTML = countries
    .map((country) => `<div>${country.countryName}</div>`)
    .join("");
}

// Call fetch functions when respective pages are loaded
if (document.URL.includes("address.html")) {
  fetchAndRenderAddresses();
} else if (document.URL.includes("city.html")) {
  fetchAndRenderCities();
} else if (document.URL.includes("country.html")) {
  fetchAndRenderCountries();
}
