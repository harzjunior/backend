// admin.js

document.addEventListener("DOMContentLoaded", () => {
  // Fetch and render contact data
  fetchAndRenderContacts();
});

async function fetchAndRenderContacts() {
  try {
    const response = await fetch("/api/contact");
    if (!response.ok) {
      throw new Error("Failed to fetch contacts");
    }
    const contacts = await response.json();
    renderContactsTable(contacts);
  } catch (error) {
    console.error(error.message);
    // Provide user feedback if needed
    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "Failed to fetch contacts. Please try again later.";
    document.querySelector("#contactTable").appendChild(errorMessage);
  }
}

function renderContactsTable(contacts) {
  const tbody = document.querySelector("#contactTable tbody");
  if (!tbody) {
    console.error("Table body element not found");
    return;
  }
  tbody.innerHTML = ""; // Clear previous content

  contacts.forEach((contact) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.message}</td>
    `;
    tbody.appendChild(row);
  });
}
