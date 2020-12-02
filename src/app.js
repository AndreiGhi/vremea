const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const request = require ('request')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 

//Define paths for Express config
const pubilDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(pubilDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrei Ghi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrei Ghiorghiu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help message!',
        title: 'Help',
        name: 'Andrei Ghiorghiu'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    console.log(address)
    
    if(!address) {
        return res.send({
            error: 'Please proivde an address!'
        })
    }

    geocode(address, (error, {longitude, latitude, location} = { }) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast ( latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
            })
        })
    })

    
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term' 
        })

    }
    console.log(req.query.search)  
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        message: 'Ai stricat pagina tigane! Scrie cu atentie!',
        name: 'Andrei Ghi',
        title: 'Error page'
    })
    
})

app.get('*', (req,res) => {
    res.render('404', {
        message: 'Page not found',
        name: 'Andrei Ghi',
        title: 'Error page'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})