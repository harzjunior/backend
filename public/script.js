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
