const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    company VARCHAR(50) NULL,
    url VARCHAR(50) NULL,
    tax_number VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role TINYINT UNSIGNED NOT NULL DEFAULT 0,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP)
`;

const createTableMapProject = `
CREATE TABLE IF NOT EXISTS map_projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    project_name VARCHAR(50) NOT NULL,
    pie_arr INT ARRAY[],
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP)`;
const createTablePieDetail = `
CREATE TABLE IF NOT EXISTS pies_detail (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pie_towername VARCHAR(50) NOT NULL,
    pie_latitude VARCHAR(50) NOT NULL,
    pie_longitude VARCHAR(50) NOT NULL,
    pie_rotate VARCHAR(50) NOT NULL,
    pie_radius VARCHAR(50) NOT NULL,
    pie_items JSON,
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP)`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
`;
const createNewProject = `
INSERT INTO map_projects VALUES(null, ?, ?, ?, NOW(), NOW())
`;
const createNewPie = `
INSERT INTO pies_detail VALUES(null, ?, ?, ?, ?, ?, ?, NOW(), NOW())
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;
const findUserById = `SELECT * FROM users WHERE id = ?`;

module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createTableMapProject,
    createTablePieDetail,
    createNewUser,
    findUserByEmail,
    findUserById,
    createNewProject,
    createNewPie,
};
