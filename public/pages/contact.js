// Handle user registration
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const contactName = document.getElementById("contactName").value;
    const contactEmail = document.getElementById("contactEmail").value;
    const contactMessage = document.getElementById("contactMessage").value;

    // Send a POST request to register the user
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contactName,
        contactEmail,
        contactMessage,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Server error: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        // Clear the form fields
        document.getElementById("contactForm").reset();
        console.log(data); // Log the response for debugging
        alert("Submitted successfully!");
        // Redirect to the home page
        window.location.href = "../";
      })
      .catch((error) => console.error("Error submitting:", error.message));
  });
