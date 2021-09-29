const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c2bcf5ca8f9720ef23caa19a21293c38&query=' + latitude + ',' + -longitude
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect to weather service', undefined)
        }else if(body.error){
            callback('unable to get weather data', undefined)
        }else{
            callback('', `It is currently ${body.current.temperature} degrees out. There is ${body.current.feelslike}% chance of rain. The humidity is ${body.current.humidity} and feelslike is ${body.current.feelslike}`)
        }
    })
}

module.exports = forecast

