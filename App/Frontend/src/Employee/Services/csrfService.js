// Function to fetch the CSRF token
// src/Services/csrfService.js
export const getCsrfToken = async () => {
  const response = await fetch("https://localhost:3030/csrf-token", {
      method: "GET",
      credentials: "include"
  });

  const data = await response.json();
  return data.csrfToken;
};
