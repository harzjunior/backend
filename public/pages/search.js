document.addEventListener("DOMContentLoaded", () => {
  // Add event listener for search input
  document
    .getElementById("searchInput")
    .addEventListener("input", function (event) {
      const searchTerm = event.target.value.trim().toLowerCase();

      // Fetch address data
      fetch("/api/address")
        .then((response) => response.json())
        .then((addresses) => {
          // Fetch country data
          fetch("/api/country")
            .then((response) => response.json())
            .then((countries) => {
              // Fetch city data
              fetch("/api/city")
                .then((response) => response.json())
                .then((cities) => {
                  renderAddressesTable(
                    addresses,
                    cities,
                    countries,
                    searchTerm
                  );
                });
            });
        })
        .catch((error) =>
          console.error("Error fetching and filtering data:", error)
        );
    });
});

function renderAddressesTable(addresses, cities, countries, searchTerm) {
  const tableBody = document.querySelector("#addressTable tbody");
  if (!tableBody) {
    console.error("Table body element not found");
    return;
  }
  tableBody.innerHTML = ""; // Clear previous content

  addresses.forEach((address) => {
    const city = cities.find((city) => city.city_id === address.city_id);
    const country = countries.find(
      (country) => country.country_id === address.city_id
    );

    if (
      address.street_address.toLowerCase().includes(searchTerm) ||
      (city && city.city_name.toLowerCase().includes(searchTerm)) ||
      (country && country.country_name.toLowerCase().includes(searchTerm))
    ) {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${address.address_id}</td>
          <td>${address.street_address}</td>
          <td>${city ? city.city_name : "N/A"}</td>
          <td>${country ? country.country_name : "N/A"}</td>
        `;
      tableBody.appendChild(row);
    }
  });
}

// Function to handle search
// function search(event) {
//   const searchTerm = event.target.value.trim().toLowerCase();

//   // Fetch data from the server and filter based on the search term
//   fetch("/api/contacts")
//     .then((response) => response.json())
//     .then((data) => {
//       const tableBody = document.querySelector("#contactTable tbody");
//       tableBody.innerHTML = ""; // Clear existing table rows

//       data.forEach((contact) => {
//         // Check if the contact name or email contains the search term
//         if (
//           contact.name.toLowerCase().includes(searchTerm) ||
//           contact.email.toLowerCase().includes(searchTerm)
//         ) {
//           const row = document.createElement("tr");
//           row.innerHTML = `
//            <td>${contact.name}</td>
//            <td>${contact.email}</td>
//            <td>${contact.message}</td>
//        `;
//           tableBody.appendChild(row);
//         }
//       });
//     })
//     .catch((error) =>
//       console.error("Error fetching and filtering data:", error)
//     );
// }
