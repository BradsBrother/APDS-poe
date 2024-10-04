export const validateIDNumber = (idNumber) => /^[0-9]{13}$/.test(idNumber);
export const validateAccountNumber = (accountNumber) => /^[0-9]{10,12}$/.test(accountNumber);
export const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password);
export const validateAccNo = (accNo) => /^[0-9]{8,16}$/.test(accNo);
export const validateAmount = (amount) => parseFloat(amount) > 0;
export const validateCurrency = (currency) => ['USD', 'ZAR'].includes(currency);
