const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      resolve(JSON.parse(body));
    });
  });
};

const validateStudent = ({ name, email, course, year }) => {
  if (!name || !email || !course || !year) {
    return 'All fields are required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }

  if (year < 1 || year > 4) {
    return 'Year must be between 1 and 4';
  }

  return null;
};

module.exports = { getRequestBody, validateStudent };