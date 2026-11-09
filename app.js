// Code Adapted from CS 340 Professor Curry Lectures

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 3000;

// Handlebars Setup
const { engine } = require('express-handlebars'); 
app.engine('.hbs', engine({ extname: '.hbs' ,
    helpers:{
        json: function(context){
            return JSON.stringify(context);
        }
    }
})); 

app.set('view engine', '.hbs'); 

// Active character object
let currentCharacter = {name: 'Dan', gender:'male', gold: 200, health: 100};
// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
// Render the home.hbs file
app.get('/', async function (req, res) {
    try {
        res.render('home'); 
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});
// Render the gamehome.hbs file
app.get('/gamehome', async function (req, res) {
    try {
        // if rerouted after action button give success or fail popup else null
        const pop_up = req.query.msg || null;
        res.render('gamehome', {
            character: currentCharacter, 
            pop_up: pop_up
        }); 
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});
// Render the store.hbs file
app.get('/store', async function (req, res) {
    try {
        res.render('store'); 
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});
// Render the explore.hbs file
app.get('/explore', async function (req, res) {
    try {
        res.render('explore'); 
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});
// Render the help.hbs file
app.get('/help', async function (req, res) {
    try {
        res.render('help'); 
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});
app.get('/create', async function (req, res) {
    try {
        res.render('create'); 
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

// POST
app.post('/create/new', async function (req, res) {
    try {
        res.redirect('/create'); 
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});
app.post('/gamehome/continue', async function (req, res) {
    try {
        res.redirect('/gamehome'); 
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});
// explore and sell interactions
app.post('/gamehome/explore', async function (req, res) {
    try {
        // currently auto fight and lose 10 hp
        const injuryCost = 10;
        currentCharacter.health -= injuryCost;
        const result_message = encodeURIComponent("You lost 10 hp, but gained new items!");
        res.redirect(`/gamehome?msg=${result_message}`); 
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});
app.post('/gamehome/sell', async function (req, res) {
    try {
        // currently auto sell one item for 20
        const defaultItem = 20;
        currentCharacter.gold += defaultItem;
        const result_message = encodeURIComponent("You sold an item and got 20 gold!");
        res.redirect(`/gamehome?msg=${result_message}`); 
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});
// create new charatcer
app.post('/create/character', async function (req, res) {
    try {
        const {name,gender} = req.body;
        currentCharacter ={
            name: name,
            gender: gender,
            gold: 200,
            health: 100
        };
        console.log("Name and Gender now:", {name,gender});
        res.redirect('/gamehome'); 
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});
// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' +
            PORT +
            '; press Ctrl-C to terminate.'
    );
});