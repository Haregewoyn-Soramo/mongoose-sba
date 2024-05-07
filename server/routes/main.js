    const express = require('express');
    const router = express.Router();
    const {post, user, account, comment } = require('../models/post');
    const { render } = require('ejs');
    const bcrypt = require('bcrypt')

    router.get('/', async (req, res) =>{
      try{
        const collections = await post.find();
        res.render('home', {collections});
      }catch(error){
        console.log('error msg:',error)
      }
    })
    router.get('/explore', async(req, res) =>{
      try{
        const collections = await post.find();
        res.render('explore', {collections});
      }catch(error){
        console.log('error msg:',error)
      }
    })
    router.get('/explore/:title', async (req, res, next) => {
      try {
        const collection = await post.findOne({ title: req.params.title });
        if (collection) {
          res.json(collection);
          console.log(collection)
        } else {
          res.status(404).json({ error: 'collection not found' });
        }
      } catch (error) {
        next(error);
      }
    });
    router.patch('/explore/:title', async (req, res, next) => {
      try {
        const collection = await post.findOneAndUpdate(
          { title: req.params.title },
          req.body,
          { new: true }
        );
        if (collection) {
          res.json(collection);
          console.log(collection)
        } else {
          res.status(404).json({ error: 'collection not found' });
        }
      } catch (error) {
        next(error);
      }
    });
    router.delete('/explore/:title', async (req, res, next) => {
      try {
        const collection = await post.findOneAndDelete({ title: req.params.title });
        if (collection) {
          res.json(collection);
          console.log(collection)
        } else {
          res.status(404).json({ error: 'collection not found' });
        }
      } catch (error) {
        next(error);
      }
    });





    router.get('/create', (req, res) =>{
      res.render('create')
    })


    router.get('/user', async(req, res)=>{
      try{
      const collections = await user.find();
      res.render('user', {collections});
      }catch(error){
        console.log('error msg:',error)
      }
    })

    router.get('/user/:id', async function(req, res){
      try {
        const userId = req.params.id;
        const userData = await user.findById(userId);
        res.json(userData);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server Error' });
      }
    });
    router.post('/signIn', async function(req, res) {
      try {
        const userEmail = req.body.email
        const login = await user.findOne(userEmail);
        if (login) {
          const passwordMatch = await bcrypt.compare(req.body.password, login.password);
          if (passwordMatch) {
            res.redirect('/explore');
          } else {
            res.redirect('/');
          }
        } else {
          res.redirect('/');
        }
      } catch (error) {
        console.error('Error:', error);
        res.redirect('/');
      }
    });
 

router.get('/signin', (req, res)=>{
  res.render('signIn')
})



































// function inserUserProfile(){
//   user.insertMany([
//     {
//       username: "john_doe",
//       email: "john@example.com",
//       password: "hashedpassword123",
//       CreatedAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       username: "jane_smith",
//       email: "jane@example.com",
//       password: "hashedpassword456",
//       CreatedAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       username: "alex_jones",
//       email: "alex@example.com",
//       password: "hashedpassword789",
//       CreatedAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       username: "emily_williams",
//       email: "emily@example.com",
//       password: "hashedpasswordabc",
//       CreatedAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       username: "michael_brown",
//       email: "michael@example.com",
//       password: "hashedpassworddef",
//       CreatedAt: new Date(),
//       updatedAt: new Date()
//     }
//   ])
//   .then(docs => {
//     console.log("data inserted")
//   })
//   .catch(err => {
//     console.log('not inserted')
//   })
// }
// inserUserProfile()




// function collectionOfItems(){
//   post.insertMany([

//     {
//       category: "Food & Drink",
//       title: "Avocado Toast",
//       description: "Delicious and nutritious avocado slices on top of toasted bread, perfect for breakfast or brunch.",
//       image: "/img/food1.jpeg"
//     },
//     {
//       category: "Food & Drink",
//       title: "Sushi Rolls",
//       description: "Colorful and flavorful sushi rolls with fresh fish, rice, and vegetables, a Japanese culinary delight.",
//       image: "/img/food2.jpeg"
//     },
//     {
//       category: "Food & Drink",
//       title: "Chocolate Cake",
//       description: "Rich and decadent chocolate cake topped with creamy frosting, a dessert lover's dream.",
//       image: "/img/food3.jpeg"
//     },
//     {
//       category: "Food & Drink",
//       title: "Espresso Coffee",
//       description: "Strong and aromatic espresso coffee served in a small cup, perfect for a quick caffeine boost.",
//       image: "/img/food5.jpeg"
//     },
    
//     {
//       category: "Travel & Adventure",
//       title: "Mountain Peak",
//       description: "Majestic mountain peak covered in snow, offering breathtaking views and exhilarating hiking opportunities.",
//       image: "/img/travel1.jpeg"
//     },
//     {
//       category: "Travel & Adventure",
//       title: "Tropical Beach",
//       description: "Serene tropical beach with crystal-clear blue waters and palm trees swaying in the gentle breeze, a paradise getaway.",
//       image: "/img/traavel3.jpeg"
//     },
//     {
//       category: "Travel & Adventure",
//       title: "City Skyline",
//       description: "Vibrant city skyline illuminated at night, showcasing modern architecture and bustling urban life.",
//       image: "/img/travel2.jpeg"
//     },
//     {
//       category: "Travel & Adventure",
//       title: "Historic Landmark",
//       description: "Iconic historic landmark with intricate architectural details and a rich cultural heritage, a must-visit destination.",
//       image: "/img/travel4.jpeg"
//     },
  
//     {
//       category: "Fashion & Style",
//       title: "Elegant Dress",
//       description: "Elegant and sophisticated dress with flowing fabric and intricate lace details, perfect for formal occasions.",
//       image: "/img/fashion1.jpeg"
//     },
//     {
//       category: "Fashion & Style",
//       title: "Stylish Accessories",
//       description: "Chic and stylish accessories including statement earrings, a trendy handbag, and oversized sunglasses, perfect for adding flair to any outfit.",
//       image: "/img/fashion2.webp"
//     },
//     {
//       category: "Fashion & Style",
//       title: "Classic Suit",
//       description: "Classic and timeless suit tailored to perfection, exuding confidence and professionalism.",
//       image: "/img/fashion3.jpeg"
//     },
//     {
//       category: "Fashion & Style",
//       title: "Casual Streetwear",
//       description: "Comfortable and stylish streetwear ensemble featuring denim jeans, a graphic t-shirt, and sneakers, perfect for everyday wear.",
//       image: "/img/fashion4.webp"
//     },
  
//     {
//       category: "Home Decor",
//       title: "Cozy Living Room",
//       description: "Cozy and inviting living room with plush sofas, soft throw blankets, and warm lighting, perfect for relaxation and entertainment.",
//       image: "/img/homedeco1.jpeg"
//     },
//     {
//       category: "Home Decor",
//       title: "Minimalist Bedroom",
//       description: "Minimalist bedroom with clean lines, neutral color palette, and sleek furniture, promoting a sense of calm and tranquility.",
//       image: "/img/homedeco2.jpeg"
//     },
//     {
//       category: "Home Decor",
//       title: "Botanical Prints",
//       description: "Botanical prints featuring lush greenery and vibrant flowers, adding a touch of nature to any space.",
//       image: "/img/homedeco3.jpg"
//     },
//     {
//       category: "Home Decor",
//       title: "Vintage Furniture",
//       description: "Vintage-inspired furniture with distressed finishes and ornate details, adding charm and character to any room.",
//       image: "/img/homedeco4.webp"
//     }


//   ])
//   .then(docs => {
//     console.log("data inserted")
//   })
//   .catch(err => {
//     console.log('not inserted')
//   })
// }
// collectionOfItems();

// function userAccount(){
//   account.insertMany([
//     {
//       username: "john_doe",
//       email: "john@example.com",
//       password: "hashedpassword123",
//       profile: {
//         fullName: "John Doe",
//         bio: "Hello, I'm John!",
//         profileImage: "/john_profile_image.jpg"
//       },
//       followers: [],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       username: "jane_smith",
//       email: "jane@example.com",
//       password: "hashedpassword456",
//       profile: {
//         fullName: "Jane Smith",
//         bio: "Travel enthusiast | Nature lover",
//         profileImage: "/jane_profile_image.jpg"
//       },
//       followers: [],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       username: "alex_jones",
//       email: "alex@example.com",
//       password: "hashedpassword789",
//       profile: {
//         fullName: "Alex Jones",
//         bio: "Software Engineer | Tech Enthusiast",
//         profileImage: "/alex_profile_image.jpg"
//       },
//       followers: [],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       username: "emily_williams",
//       email: "emily@example.com",
//       password: "hashedpasswordabc",
//       profile: {
//         fullName: "Emily Williams",
//         bio: "Artist | Creative mind",
//         profileImage: "/emily_profile_image.jpg"
//       },
//       followers: [],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       username: "michael_brown",
//       email: "michael@example.com",
//       password: "hashedpassworddef",
//       profile: {
//         fullName: "Michael Brown",
//         bio: "Fitness enthusiast | Health coach",
//         profileImage: "/michael_profile_image.jpg"
//       },
//       followers: [],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       username: "sarah_adams",
//       email: "sarah@example.com",
//       password: "hashedpasswordghi",
//       profile: {
//         fullName: "Sarah Adams",
//         bio: "Food lover | Recipe developer",
//         profileImage: "/sarah_profile_image.jpg"
//       },
//       followers: [],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     },
//     {
//       username: "chris_evans",
//       email: "chris@example.com",
//       password: "hashedpasswordjkl",
//       profile: {
//         fullName: "Chris Evans",
//         bio: "Actor | Marvel fan",
//         profileImage: "/chris_profile_image.jpg"
//       },
//       followers: [],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     }
//   ])
//   .then(data =>{
//     console.log("the data inserted")
//   })
//   .catch(error =>{
//     console.log('error occured', error)
//   })
// }

// userAccount()






























module.exports = router;