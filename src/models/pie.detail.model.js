const db = require('../config/db.config');
const { createNewPie: createNewPieQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class PieDetail {
  constructor(pie_towername, pie_latitude, pie_longitude, pie_rotate, pie_radius, pie_items) {
    this.pie_towername = pie_towername;
    this.pie_latitude = pie_latitude;
    this.pie_longitude = pie_longitude;
    this.pie_rotate = pie_rotate;
    this.pie_radius = pie_radius;
    this.pie_items = pie_items;
  }

  static create(newPie, cb) {
    db.query(createNewPieQuery,
      [
        newPie.pie_towername,
        newPie.pie_latitude,
        newPie.pie_longitude,
        newPie.pie_rotate,
        newPie.pie_radius,
        newPie.pie_items,
      ], (err, res) => {
        if (err) {
          logger.error(err.message);
          cb(err, null);
          return;
        }
        cb(null, {
          id: res.insertId,
          pie_towername: newPie.pie_towername,
          pie_latitude: newPie.pie_latitude,
          pie_longitude: newPie.pie_longitude,
          pie_rotate: newPie.pie_rotate,
          pie_radius: newPie.pie_radius,
          pie_items: newPie.pie_items,
        });
      });
  }
}

module.exports = PieDetail;