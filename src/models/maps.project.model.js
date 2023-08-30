const db = require('../config/db.config');
const { createNewProject:createMapProjectQuery, } = require('../database/queries');
const { logger } = require('../utils/logger');

class MapProject {
    constructor(user_id, project_name,pie_arr) {
      this.user_id = user_id;
      this.project_name = project_name;
      this.pie_arr = pie_arr;
    }

    static create(newProject, cb) {
        db.query(createMapProjectQuery, 
            [
                newProject.user_id, 
                newProject.project_name, 
                newProject.pie_arr, 
            ], (err, res) => {
                if (err) {                    
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    user_id: newProject.user_id,
                    project_name: newProject.project_name,
                    pie_arr: newProject.pie_arr,
                });
        });
    }
}

module.exports = MapProject;