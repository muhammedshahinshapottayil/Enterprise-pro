const validateEmail = (value: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(value) || "Invalid email address";
};
const validatePassword = (value: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return (
    passwordRegex.test(value) ||
    "Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
  );
};

export { validateEmail, validatePassword };
