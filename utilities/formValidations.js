export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateUserName = (userName) => {
  return userName.length >= 6;
};

export const validateTitle = (title) => {
  const regex = /^[A-Za-z\s]{20,}$/;
  return regex.test(title);
};

export const validateDescription = (description) => {
  return description.length > 100;
};
