const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp')


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () =>{
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6153938ff8a60057220f2a25',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse asperiores harum ab blanditiis doloremque veritatis alias reprehenderit earum animi dolores, vitae est corporis quod molestiae corrupti provident tenetur ipsam impedit.",
            price,
            images:[
                {
                  url: 'https://res.cloudinary.com/jerrycloud/image/upload/v1632966034/YelpCamp/ni46l18htjnu5ubjhvlh.jpg',
                  filename: 'YelpCamp/ni46l18htjnu5ubjhvlh'
                },
                {
                  url: 'https://res.cloudinary.com/jerrycloud/image/upload/v1633052597/YelpCamp/rdtnj5roazxml2w4axbt.jpg',      
                  filename: 'YelpCamp/rdtnj5roazxml2w4axbt'
                }
              ],
            geometry: { 
              type: 'Point', 
              coordinates: [ cities[random1000].longitude, cities[random1000].latitude] 
            }
        });
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});