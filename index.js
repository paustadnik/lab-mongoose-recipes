const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.insertMany(data)
    data.forEach((recipe) => {
      console.log(recipe.title)
    })
    // Run your code here, after you have insured that the connection was made
      /* Recipe.create({
      title: 'Lemon pie',
      level: 'Amateur Chef',
      ingredients: ['lemons', 'flour', 'eggs', 'sugar' ],
      cuisine: 'America',
      dishType: 'dessert',
      duration: 45,
      creator: 'Nigella Lawson',
      })
      console.log(recipe) */
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese', duration: 100})
  })
  .then(() => console.log('Recipe updated!'))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
