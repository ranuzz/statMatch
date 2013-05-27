
/*
 * GET home page.
 */
var request = require('request');
var countries = [];

exports.index = function (req, res) {
    if (countries.length) {
        console.log(countries.length);
        res.render('index', { title: 'statMatch', countryList: countries });
    } else {
        request({ uri: 'http://api.worldbank.org/countries/?format=json&per_page=250', json: true }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                for (var i = 0; i < body[1].length; i++) {
                    countries.push(body[1][i]['name']);
                }
            }
            console.log(countries.length);
            res.render('index', { title: 'statMatch', countryList: countries });
        });
    }
};