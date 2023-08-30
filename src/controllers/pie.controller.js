const PieDetail = require('../models/pie.detail.model');
const MapProject = require('../models/maps.project.model');
const { _db } = require('../helpers/db_helper');

exports.save = async (req, res) => {
  const { user_id, project_name, pies } = req.body;
  var pie_arr = [];
  var len = pies.length;
  var cnt = 0;
  if (isNaN(user_id) || user_id === null || user_id === '') {
    res.status(500).send({
      status: "error",
      message: "Oops! Please log in again!"
    });
  }

  pies.forEach(async pie => {
    const pieDtail = new PieDetail(pie.towerName || '', pie.latitude, pie.longitude, pie.rotate, pie.radius, JSON.stringify(pie.items));
    PieDetail.create(pieDtail, (err, data) => {
      if (err) {
        res.status(500).send({
          status: "error",
          message: err.message
        });
      } else {
        pie_arr.push(data.id);
        cnt++;
        if (cnt === len) {
          const map_project = new MapProject(user_id, project_name, JSON.stringify(pie_arr));
          MapProject.create(map_project, (err, data) => {
            if (err) {
              res.status(500).send({
                status: "error",
                message: err.message
              });
            } else {
              res.status(201).send({
                status: "success",
                data: {
                  data
                }
              });
            }
          })
        }
      }
    })
  });
};

exports.getProjectById = async (req, res) => {
  let { user_id, pro_id } = req.params;
  _db('SELECT * FROM map_projects WHERE id = ? AND user_id = ?', [pro_id, user_id], (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.send({
          status: 'error',
          message: 'No matching data found'
        });
        return;
      }
      res.status(500).send({
        status: 'error',
        message: err.message
      });
      return;
    }

    if (data) {
      let pie_arr = JSON.parse(data[0].pie_arr);
      var pies = [];
      for (let i = 0; i < pie_arr.length; i++) {
        _db('SELECT id, pie_towername, pie_latitude, pie_longitude, pie_rotate, pie_radius, pie_items FROM pies_detail WHERE id = ?', pie_arr[i], (err, data) => {
          if (data) {
            pies.push({
              towerName: data[0].pie_towername,
              latitude: data[0].pie_latitude,
              longitude: data[0].pie_longitude,
              rotate: data[0].pie_rotate,
              radius: data[0].pie_radius,
              items: JSON.parse(data[0].pie_items)
            });
            if (i == pie_arr.length - 1) {
              res.send({
                status: 'success',
                data: pies
              })
            }
          }
        })
      }
    }
  })
}

exports.getProjectList = async (req, res) => {
  let { user_id } = req.params;
  _db('SELECT id, user_id, project_name FROM map_projects WHERE user_id = ?', user_id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.send({
          status: 'error',
          message: 'No matching data found'
        });
        return;
      }
      res.status(500).send({
        status: 'error',
        message: err.message
      });
      return;
    }

    if (data) {
      res.send({
        status: "success",
        data: data
      })
    }
  })
}
