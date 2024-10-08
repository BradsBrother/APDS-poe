// Function to fetch the CSRF token
export const getCsrfToken = async () => {
    const response = await fetch('https://localhost:3030/csrf-token', {
      method: 'GET',
      credentials: 'include'  // Include cookies in the request
    });
    const data = await response.json();
    return data.csrfToken;
};