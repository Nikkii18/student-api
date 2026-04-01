const model = require('../models/studentModel');
const { getRequestBody, validateStudent } = require('../utils/helpers');

const generateId = () => Date.now().toString();

const getStudents = (req, res, query) => {
  let students = model.getAll();

  // Filtering
  if (query.year) {
    students = students.filter(s => s.year == query.year);
  }

  // Pagination
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || students.length;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = students.slice(start, end);

  res.writeHead(200);
  res.end(JSON.stringify({ success: true, data: paginated }));
};

const getStudentById = (req, res, id) => {
  const student = model.getById(id);

  if (!student) {
    res.writeHead(404);
    return res.end(JSON.stringify({
      success: false,
      message: 'Student not found'
    }));
  }

  res.writeHead(200);
  res.end(JSON.stringify({ success: true, data: student }));
};

const createStudent = async (req, res) => {
  try {
    const body = await getRequestBody(req);

    const error = validateStudent(body);
    if (error) {
      res.writeHead(400);
      return res.end(JSON.stringify({ success: false, message: error }));
    }

    const newStudent = {
      id: generateId(),
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    model.create(newStudent);

    res.writeHead(201);
    res.end(JSON.stringify({ success: true, data: newStudent }));
  } catch {
    res.writeHead(400);
    res.end(JSON.stringify({ success: false, message: 'Invalid JSON' }));
  }
};

const updateStudent = async (req, res, id) => {
  try {
    const body = await getRequestBody(req);

    const error = validateStudent(body);
    if (error) {
      res.writeHead(400);
      return res.end(JSON.stringify({ success: false, message: error }));
    }

    body.updatedAt = new Date();

    const updated = model.update(id, body);

    if (!updated) {
      res.writeHead(404);
      return res.end(JSON.stringify({
        success: false,
        message: 'Student not found'
      }));
    }

    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data: updated }));
  } catch {
    res.writeHead(400);
    res.end(JSON.stringify({ success: false, message: 'Invalid JSON' }));
  }
};

const deleteStudent = (req, res, id) => {
  const deleted = model.remove(id);

  if (!deleted) {
    res.writeHead(404);
    return res.end(JSON.stringify({
      success: false,
      message: 'Student not found'
    }));
  }

  res.writeHead(200);
  res.end(JSON.stringify({
    success: true,
    message: 'Student deleted successfully'
  }));
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};