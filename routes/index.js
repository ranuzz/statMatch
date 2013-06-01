
/*
 * GET home page.
 */
var request = require('request');
var countries = [];
var models = require('../models/db.js');

models.createDB('country_name');

function smInsertAPIData(api_url, db, req, res) {
    request({ uri: 'http://api.worldbank.org/countries/?format=json&per_page=250', json: true }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                    console.log('response');
            for (var i = 0; i < body[1].length; i++) {
                db.insert(body[1][i], function (err, body, header) {
                    if (err) {
                        console.log('[db.insert] ', err.message);
                        return;
                    } 
                });
            }
            smCreateView(db,
                         models.dbDesigns[models.dbDesignsDefines["SM_DESIGN_1"]],
                         models.dbViews[models.dbViewsDefines["SM_VIEW_1"]],
                         function () {
                            db.view('countryDetails',
                                    'countryDetails',
                                    function (err, body) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            body.rows.forEach(function (doc) {
                                                countries.push("Name: " + doc.value.name + " Code:" +doc.value.iso2Code)
                                            });
                                            res.render('index', { title: 'statMatch', countryList: countries });
                                        }
                                    });
                          });
        }
    });
}

function smCreateView(db, design_name, view_name, callback_func) {
    db.insert(view_name, design_name, callback_func);
}


function smIndexMain(req, res) {
    smInsertAPIData(null, models.useDB('country_name'), req, res);
}

exports.index = smIndexMain;