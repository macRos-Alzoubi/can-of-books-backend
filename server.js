'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const modelCollecion = require('./modelCollecion');
require('dotenv').config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});



const getBooksHandler = (req, res) => {
  const email = req.query.email;
  console.log(email);
  modelCollecion.userModel.find({email:email},function(err,resultData){
    if(err) {
      console.log('Error');
    }
    else {
      console.log('in get');
      res.send(resultData[0].books);
    }
  })
};
const postBooksHandler = (req, res) =>{
  console.log('in post');
  const {userEmail, title, description, status} = req.body;
  const newBook = {
    title: title,
    description: description,
    status: status,
  };
  modelCollecion.userModel.find({email: userEmail}, (err, resultData) =>{
    if(err){
      console.log('in error' )
      res.status(500).send(err.message);
      
    }
    else{
      console.log(userEmail);
      console.log('resultData: ' , resultData);
      console.log('resultData.books' , resultData[0].books);
      resultData[0].books.push(newBook);
      resultData[0].save();
      res.send(newBook);
    }
  });
};
const deleteBookHandler =(req,res)=>{
  const id = req.params.id; 
  const {userEmail} = req.query;
  modelCollecion.userModel.find({email: userEmail}, (err, resultData) =>{
    if(err) {
      res.status(500).send('Error',err);
    }
    else {
      const newBooks= resultData[0].books.filter((book,index) => index != id);
      resultData[0].books = newBooks;
      resultData[0].save();
      res.status(200).send(resultData[0].books);
      
    }
  })
};
const updateBookHandler = (req,res) =>{
  const id = req.params.id; 
  const {userEmail , title , description , status} = req.body;
  console.log(userEmail,title , description , status)
  modelCollecion.userModel.findOne({email: userEmail}, (err, resultData) =>{
    if(err) {
      res.status(500).send('Error',err);
    }
    else {
      console.log('in else',resultData)
     resultData.books.splice(id , 1 , {
      title : title,
      description : description,
      status : status
      
     })
      
      resultData.save();
      res.status(200).send(resultData.books);
      
    }
  })
}
app.get('/books', getBooksHandler);
app.post('/books', postBooksHandler);
app.delete('/books/:id',deleteBookHandler);
app.put('/books/:id',updateBookHandler);
app.listen(PORT, () => console.log(`listening on ${PORT}`));
const seedBook = () =>{
  const book1 = new modelCollecion.bookModel({
    title : 'In Search of Lost Time',
      
    description : `Swann's Way, the first part of A la recherche de temps perdu, Marcel Proust's seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work. The narrator recalls his childhood, aided by the famous madeleine; and describes M. Swann's passion for Odette. The work is incomparable. Edmund Wilson said "[Proust] has supplied for the first time in literature an equivalent in the full scale for the new theory of modern physics."`,
    
    status : 'FAVORITE FIVE',
  });
  const user1 = new modelCollecion.userModel({
    email : 'tareq.ha130@yahoo.com',
    books: [book1],
  });
  // const book2 = new modelCollecion.bookModel({
  //   title : 'Ulysses',
    
  //   description : `Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904. The title parallels and alludes to Odysseus (Latinised into Ulysses), the hero of Homer's Odyssey (e.g., the correspondences between Leopold Bloom and Odysseus, Molly Bloom and Penelope, and Stephen Dedalus and Telemachus). Joyce fans worldwide now celebrate June 16 as Bloomsday.`,
    
  //   status : 'TOP FAVORITE BOOK',
    
    
  // });
  // const book3 = new userModel({
  //   title : 'Don Quixote',
    
  //   description : `Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper. He has become obsessed with books of chivalry, and believes their every word to be true, despite the fact that many of the events in them are clearly impossible. Quixano eventually appears to other people to have lost his mind from little sleep and food and because of so much reading.`,
  //   status : 'RECOMENDED TO ME',
  //   email : 'macRos.alzoubi@gmail.com',
  //   img : 'https://d3i5mgdwi2ze58.cloudfront.net/g49rmfq6chb66vfwtka86cc65g4l',
  // });
  // const book4 = new userModel({
  //   title : 'One Hundred Years of Solitude',
    
  //   description : `One of the 20th century's enduring works, One Hundred Years of Solitude is a widely beloved and acclaimed novel known throughout the world, and the ultimate achievement in a Nobel Prize–winning career. The novel tells the story of the rise and fall of the mythical town of Macondo through the history of the Buendía family. It is a rich and brilliant chronicle of life and death, and the tragicomedy of humankind. In the noble, ridiculous, beautiful, and tawdry story of the Buendía family, one sees all of humanity, just as in the history, myths, growth, and decay of Macondo, one sees all of Latin America. Love and lust, war and revolution, riches and poverty, youth and senility — the variety of life, the endlessness of death, the search for peace and truth — these universal themes dominate the novel. Whether he is describing an affair of passion or the voracity of capitalism and the corruption of government, Gabriel García Márquez always writes with the simplicity, ease, andpurity that are the mark of a master. Alternately reverential and comical, One Hundred Years of Solitude weaves the political, personal, and spiritual to bring a new consciousness to storytelling. Translated into dozens of languages, this stunning work is no less than an accounting of the history of the human race.`,
  //   status : 'Top 5',
  //   email : 'tareq.ha130@yahoo.com',
  //   img : 'https://d3i5mgdwi2ze58.cloudfront.net/kxk6iwn543doz8jqbs2sckh2fcot',
  // });
  // const book5 = new bookModel({
  //   title : 'The Great Gatsby',
    
  //   description : `The novel chronicles an era that Fitzgerald himself dubbed the "Jazz Age". Following the shock and chaos of World War I, American society enjoyed unprecedented levels of prosperity during the "roaring" 1920s as the economy soared. At the same time, Prohibition, the ban on the sale and manufacture of alcohol as mandated by the Eighteenth Amendment, made millionaires out of bootleggers and led to an increase in organized crime, for example the Jewish mafia. Although Fitzgerald, like Nick Carraway in his novel, idolized the riches and glamor of the age, he was uncomfortable with the unrestrained materialism and the lack of morality that went with it, a kind of decadence.`,
  //   status : 'Top 5',
  //   email : 'tareq.ha130@yahoo.com',
  //   img : 'https://d3i5mgdwi2ze58.cloudfront.net/r85zaw5fj98tgc0y5rutjbkmowfy',
  // });
  // const book6 = new bookModel({
  //   title : 'Moby Dick',
    
  //   description : `First published in 1851, Melville's masterpiece is, in Elizabeth Hardwick's words, "the greatest novel in American literature." The saga of Captain Ahab and his monomaniacal pursuit of the white whale remains a peerless adventure story but one full of mythic grandeur, poetic majesty, and symbolic power. Filtered through the consciousness of the novel's narrator, Ishmael, Moby-Dick draws us into a universe full of fascinating characters and stories, from the noble cannibal Queequeg to the natural history of whales, while reaching existential depths that excite debate and contemplation to this day.`,
  //   status : 'RECOMENDED TO ME',
  //   email : 'tareq.ha130@yahoo.com',
  //   img : 'https://d3i5mgdwi2ze58.cloudfront.net/jzeie89rkkv1s2q7dwwgiysixnty',
  // });
  book1.save();
  user1.save();
  // book2.save();
  // book3.save();
  // book4.save();
  // book5.save();
  // book6.save();
};
// seedBook();