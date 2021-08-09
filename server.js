'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bookModel = require('./bookModel');
app.use(cors());


const PORT = process.env.PORT || 3001;
mongoose.connect('mongodb://localhost:27017/book', {useNewUrlParser: true, useUnifiedTopology: true});


const seedBook = () =>{
  const book1 = new bookModel({
    title : 'In Search of Lost Time',
    
    description : `Swann's Way, the first part of A la recherche de temps perdu, Marcel Proust's seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work. The narrator recalls his childhood, aided by the famous madeleine; and describes M. Swann's passion for Odette. The work is incomparable. Edmund Wilson said "[Proust] has supplied for the first time in literature an equivalent in the full scale for the new theory of modern physics."`,
    
    status : 'FAVORITE FIVE',
    email : 'macRos.alzoubi@gmail.com',
    img : 'https://d3i5mgdwi2ze58.cloudfront.net/mnvwp5wfbhobunqz0zvbugosf892',
  });

  const book2 = new bookModel({
    title : 'Ulysses',
    
    description : `Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904. The title parallels and alludes to Odysseus (Latinised into Ulysses), the hero of Homer's Odyssey (e.g., the correspondences between Leopold Bloom and Odysseus, Molly Bloom and Penelope, and Stephen Dedalus and Telemachus). Joyce fans worldwide now celebrate June 16 as Bloomsday.`,
    
    status : 'TOP FAVORITE BOOK',
    email : 'macRos.alzoubi@gmail.com',
    img : 'https://d3i5mgdwi2ze58.cloudfront.net/usuab7s8yuwlcmadwx9woy746lvi',
  });

  const book3 = new bookModel({
    title : 'Don Quixote',
    
    description : `Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper. He has become obsessed with books of chivalry, and believes their every word to be true, despite the fact that many of the events in them are clearly impossible. Quixano eventually appears to other people to have lost his mind from little sleep and food and because of so much reading.`,

    status : 'RECOMENDED TO ME',
    email : 'macRos.alzoubi@gmail.com',
    img : 'https://d3i5mgdwi2ze58.cloudfront.net/g49rmfq6chb66vfwtka86cc65g4l',
  });

  book1.save();
  book2.save();
  book3.save();
};

// title : String,
// description : String,
// status : String,
// email : String

const booksHandler = (req, res) => {
  const email = req.query.email;
  bookModel.find({email:email},function(err,resultData){
    if(err) {
        console.log('Error');
    }
    else {
        console.log(resultData);
        console.log(resultData[0]);
        res.send(resultData[0]);
    }
})
};

app.get('/books',booksHandler);



app.get('/test', (request, response) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
