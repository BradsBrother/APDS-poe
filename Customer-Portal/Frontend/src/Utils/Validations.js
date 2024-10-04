// Validation for Email
export const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

// Validation for Password (at least 8 characters, with upper/lowercase letters, numbers, and special characters)
export const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/;
    return passwordPattern.test(password);
};

// Validation for ID Number (Example: 13-digit South African ID number)
export const validateIDNumber = (idNumber) => {
    const idNumberPattern = /^\d{13}$/; // Assuming a 13-digit numeric ID number
    return idNumberPattern.test(idNumber);
};

// Validation for Account Number (Example: 9-12 digit numeric account number)
export const validateAccountNumber = (accountNumber) => {
    const accountNumberPattern = /^\d{9,12}$/; // Assuming a 9 to 12-digit numeric account number
    return accountNumberPattern.test(accountNumber);
};
