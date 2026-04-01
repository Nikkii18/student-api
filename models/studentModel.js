const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/students.json');

// Ensure file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

// Read data
const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Write data
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const getAll = () => readData();

const getById = (id) => readData().find(s => s.id === id);

const create = (student) => {
  const students = readData();
  students.push(student);
  writeData(students);
  return student;
};

const update = (id, updatedData) => {
  const students = readData();
  const index = students.findIndex(s => s.id === id);

  if (index === -1) return null;

  students[index] = { ...students[index], ...updatedData };
  writeData(students);
  return students[index];
};

const remove = (id) => {
  const students = readData();
  const index = students.findIndex(s => s.id === id);

  if (index === -1) return false;

  students.splice(index, 1);
  writeData(students);
  return true;
};

module.exports = { getAll, getById, create, update, remove };