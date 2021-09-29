const path = require('path')
const express = require('express')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Burnett Beckham'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Burnett Beckham'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'For assistance, contact us on 094747242',
        title: 'Help',
        name: 'Burnett Beckham'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'please add an address'
        })
    }else{

     geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
         if(error){
             res.send({ error })
         }
         forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                res.send({ error })
            }
                
            res.send({
                address: req.query.address,
                forecast:  forecastData,
                location:  location
            })
    
         })
     }) 


}})
    
 

app.get('/products', (req, res) => {
    console.log(req.query)
   
    if(!req.query.search){
       return res.send({
           error: 'you must provide a search term'
       })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Burnett Ghartey',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Burnett Ghartey',
        errorMessage: 'Page not found'
     
    })
})

app.listen(port, () => {
    console.log('server running on port ' + port)
})