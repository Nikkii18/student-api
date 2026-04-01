const validateStudent = ({ name, email, course, year }) => {
  if (!name || !email || !course || year === undefined) {
    return 'All fields are required';
  }

  if (typeof name !== 'string' || typeof course !== 'string') {
    return 'Name and course must be strings';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }

  if (!Number.isInteger(year) || year < 1 || year > 4) {
    return 'Year must be an integer between 1 and 4';
  }

  return null;
};