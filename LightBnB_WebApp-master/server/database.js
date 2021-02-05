const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

//Pg set up
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb',
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const values = [`${email}`];
  const queryString = `
  SELECT * 
  FROM users
  WHERE users.email = $1
  `;
  return pool.query(queryString, values).then((res) => res.rows[0]);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const values = [id];
  const queryString = ` 
  SELECT *
  FROM users
  WHERE users.id = $1
  `;
  return pool.query(queryString, values).then((res) => res.rows);
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const values = [user.name, user.password, user.email];
  const queryString = `
INSERT INTO users(name,password,email)
VALUES($1, $2, $3)
RETURNING *;
 `;
  return pool.query(queryString, values).then((res) => res.rows);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const values = [Number(guest_id), limit];
  const queryString = `SELECT * 
  FROM reservations
  WHERE guest_id = $1
  LIMIT $2
  `;
  return pool.query(queryString, values).then((res) => res.rows);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    !queryParams.length ? (queryString += 'WHERE ') : (queryString += 'AND ');
    queryParams.push(Number(options.owner_id));
    queryString += `owner_id = $${queryParams.length} `;
  }

  if (
    options.minimum_price_per_night > 0 &&
    options.maximum_price_per_night > 0
  ) {
    !queryParams.length ? (queryString += 'WHERE ') : (queryString += 'AND ');
    queryParams.push(Number(options.minimum_price_per_night));
    queryParams.push(Number(options.maximum_price_per_night));
    queryString += `cost_per_night BETWEEN $${queryParams.length - 1}
       AND $${queryParams.length}`;
  }

  if (options.minimum_rating) {
    !queryParams.length ? (queryString += 'WHERE ') : (queryString += 'AND ');
    queryParams.push(Number(options.minimum_rating));
    queryString += `rating >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const values = [
    Number(property.owner_id),
    `${property.title}`,
    `${property.description}`,
    `${property.thumbnail_photo_url}`,
    `${property.cover_photo_url}`,
    Number(property.cost_per_night),
    Number(property.parking_spaces),
    Number(property.number_of_bathrooms),
    Number(property.number_of_bedrooms),
    `${property.country}`,
    `${property.street}`,
    `${property.city}`,
    `${property.province}`,
    `${property.post_code}`,
  ];
  const queryString = `
INSERT INTO properties(
owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,
number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code)
VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
RETURNING *
`;
  return pool.query(queryString, values).then((res) => res.rows);
};
exports.addProperty = addProperty;
