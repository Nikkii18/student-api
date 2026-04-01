const http = require('http');
const url = require('url');

const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('./controllers/studentController');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;

  res.setHeader('Content-Type', 'application/json');

  // ROUTES
  if (path === '/students' && method === 'GET') {
    return getStudents(req, res, parsedUrl.query);
  }

  if (path === '/students' && method === 'POST') {
    return createStudent(req, res);
  }

  if (path.match(/^\/students\/\w+/)) {
    const id = path.split('/')[2];

    if (method === 'GET') return getStudentById(req, res, id);
    if (method === 'PUT') return updateStudent(req, res, id);
    if (method === 'DELETE') return deleteStudent(req, res, id);
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({
    success: false,
    message: 'Route not found'
  }));
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});