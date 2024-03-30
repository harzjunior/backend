document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("commentForm");
  commentForm.addEventListener("submit", submitComment);
});

function submitComment(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const commentData = {
    name: formData.get("commentName"),
    email: formData.get("commentEmail"),
    message: formData.get("commentMessage"),
  };

  // Send comment data to the server
  fetch("/api/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Comment submitted successfully:", data);
      // Optionally, update the UI to show the submitted comment
      // For example, you can append the comment to the page dynamically
    })
    .catch((error) => {
      console.error("Error submitting comment:", error);
      // Optionally, provide feedback to the user about the error
    });
}
