const fs = require('fs');
const path = './data/students.json';

let students = [];

// Load data
if (fs.existsSync(path)) {
  students = JSON.parse(fs.readFileSync(path));
}

// Save to file
const saveData = () => {
  fs.writeFileSync(path, JSON.stringify(students, null, 2));
};

const getAll = () => students;

const getById = (id) => students.find(s => s.id === id);

const create = (student) => {
  students.push(student);
  saveData();
  return student;
};

const update = (id, updatedData) => {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return null;

  students[index] = { ...students[index], ...updatedData };
  saveData();
  return students[index];
};

const remove = (id) => {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return false;

  students.splice(index, 1);
  saveData();
  return true;
};

module.exports = { getAll, getById, create, update, remove };