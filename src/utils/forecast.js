const request = require('request')  


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=53688a5d4b30c09637020c160b81a7d1&query='+ latitude + ',' + longitude + '&units=m' 

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!')
        } else if (body.error) {
            callback('Unable to retrieve the specific info from weather services')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. There is a " + body.current.precip + "% chance of rain." + " The real feel is " +body.current.feelslike + " degrees Celsius."
            )
        }
    }
)}

module.exports = forecast