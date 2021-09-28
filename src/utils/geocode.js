

const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib25lZ2hhcnRleSIsImEiOiJja3Rwc2FhcnYwNDl6MnBrZ29sOG1odHlsIn0.fHU4Pla7DuswFvzAy5XkQQ&limit=1'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('unable to connect to location service', undefined)
        }else if(body.features.length == 0){
            callback('unable to find results for location', undefined)
        }else{
            callback('', {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode