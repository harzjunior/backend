document.addEventListener("DOMContentLoaded", () => {
  // Fetch and render contact data initially
  fetchAndRenderContacts();

  // Add event listeners to the buttons
  document
    .getElementById("contactsBtn")
    .addEventListener("click", showContacts);
  document.getElementById("usersBtn").addEventListener("click", showUsers);
});

// Function to fetch and render contacts data
async function fetchAndRenderContacts() {
  try {
    // Check if contacts data is cached in sessionStorage
    let contacts = JSON.parse(sessionStorage.getItem("contacts"));
    if (!contacts) {
      // If contacts data is not cached, fetch it from the server
      const response = await fetch("/api/contact");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      contacts = await response.json();

      // Cache the fetched contacts data in sessionStorage
      sessionStorage.setItem("contacts", JSON.stringify(contacts));
    }
    // Render the contacts table with the fetched data
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

// Function to fetch and render users data
async function fetchAndRenderUsers() {
  try {
    // Check if users data is cached in sessionStorage
    let users = JSON.parse(sessionStorage.getItem("users"));
    if (!users) {
      // If users data is not cached, fetch it from the server
      const response = await fetch("/api/user");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      users = await response.json();

      // Cache the fetched users data in sessionStorage
      sessionStorage.setItem("users", JSON.stringify(users));
    }
    // Render the users table with the fetched data
    renderUsersTable(users);
  } catch (error) {
    console.error(error.message);
    // Provide user feedback if needed
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Failed to fetch users. Please try again later.";
    document.querySelector("#userTable").appendChild(errorMessage);
  }
}

// Function to render contacts table with the provided data
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

// Function to render users table with the provided data
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

// Function to handle displaying contacts data
function showContacts() {
  document.getElementById("contactsSection").style.display = "block";
  document.getElementById("usersSection").style.display = "none";
  // Fetch and render contact data
  fetchAndRenderContacts();
}

// Function to handle displaying users data
function showUsers() {
  document.getElementById("contactsSection").style.display = "none";
  document.getElementById("usersSection").style.display = "block";
  // Fetch and render user data
  fetchAndRenderUsers();
}

// Function to handle logout
function logout() {
  // Clear session storage
  sessionStorage.clear();
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  // Redirect to logout page or any other desired page
  window.location.href = "./address.html";
}

// Initial setup when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Fetch and render contact data initially
  fetchAndRenderContacts();

  // Add event listeners to the buttons
  document
    .getElementById("contactsBtn")
    .addEventListener("click", showContacts);
  document.getElementById("usersBtn").addEventListener("click", showUsers);

  // Add event listener to the logout button
  document.getElementById("logoutBtn").addEventListener("click", logout);

  // You can add additional event listeners or logic here if needed
  // Event listener for a hypothetical "refresh" button
  //  document.getElementById("refreshBtn").addEventListener("click", () => {
  //   // Reload or refresh the data by calling the fetch functions again
  //   fetchAndRenderContacts();
  //   fetchAndRenderUsers();
  //  });
});
