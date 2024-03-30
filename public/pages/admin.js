document.addEventListener("DOMContentLoaded", () => {
  // Fetch and render contact data initially
  fetchAndRenderContacts();

  // Add event listeners to the buttons
  document
    .getElementById("contactsBtn")
    .addEventListener("click", showContacts);
  document.getElementById("usersBtn").addEventListener("click", showUsers);
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

async function fetchAndRenderUsers() {
  try {
    const response = await fetch("/api/user");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();
    renderUsersTable(users);
  } catch (error) {
    console.error(error.message);
    // Provide user feedback if needed
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Failed to fetch users. Please try again later.";
    document.querySelector("#userTable").appendChild(errorMessage);
  }
}

function renderContactsTable(contacts) {
  const tbody = document.querySelector("#contactTable tbody");
  if (!tbody) {
    console.error("Contact table body element not found");
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

function renderUsersTable(users) {
  const tbody = document.querySelector("#userTable tbody");
  if (!tbody) {
    console.error("User table body element not found");
    return;
  }
  tbody.innerHTML = ""; // Clear previous content

  users.forEach((user) => {
    const row = document.createElement("tr");
    const createdAt = new Date(user.created_at);
    const date = createdAt.toISOString().split("T")[0];
    const time = createdAt.toLocaleTimeString();
    row.innerHTML = `
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${date} - ${time}</td>
      `;
    tbody.appendChild(row);
  });
}

function showContacts() {
  document.getElementById("contactsSection").style.display = "block";
  document.getElementById("usersSection").style.display = "none";
  // Fetch and render contact data
  fetchAndRenderContacts();
}

function showUsers() {
  document.getElementById("contactsSection").style.display = "none";
  document.getElementById("usersSection").style.display = "block";
  // Fetch and render user data
  fetchAndRenderUsers();
}
