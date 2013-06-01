
/*
 * DB Handles - nano-couchDB
 */

var nano = require("nano")('http://localhost:5984');

/* ALL Permanent Views */
var dbViewDefines = {
    "SM_VIEW_1": 0
};

var dbViews = [];

dbViews.push({
    "language": "javascript",
    "views": {
        "countryDetails": {
            "map": "function(doc) {\n  emit(doc.name, doc);\n}"
        }
    }
});

/* ALL Permanent Designs */
var dbDesignDefines = {
    "SM_DESIGN_1": 0
};

var dbDesigns = [];

dbDesigns.push('_design/countryDetails');


/* ALL variable exports */
exports.dbViewsDefines = dbViewDefines;
exports.dbViews = dbViews;
exports.dbDesignsDefines = dbDesignDefines;
exports.dbDesigns = dbDesigns;

/* ALL function exports */

exports.createDB = function (name) {
    nano.db.create(name);
};

exports.useDB = function (name) {
    return nano.db.use(name);
};
