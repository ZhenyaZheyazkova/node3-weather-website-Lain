const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=9bbac39e619695c8faa9a05dc6f9b85b&query=' + encodeURIComponent(address) + '&limit=1'

    request({ url, json: true }, (error, {body}) => {
        console.log(body.error);
        if (body.error) {
            callback(body.error.message + ": " + body.error.context.query.message, "Unable to connect to location services!")
        } else if (body.data && body.data.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
            latitude: body.data[0].latitude,
            longitude: body.data[0].longitude,
            location: body.data[0].name
            })
        
        }
    })
}

module.exports = geocode