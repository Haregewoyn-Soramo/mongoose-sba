const express = require('express');
const router = express.Router();
const {post, user, account, comment } = require('../models/post');
const { render } = require('ejs');

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

router.get('/explore/:title', async (req, res) => {
  try {
    const collections = await post.find({title: req.params.title});
    res.json(collections);
  } catch (error) {
    console.error('error msg:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/explore', (req, res) => {
  const { category, title, description, image } = req.body;
  const newPost = new post({
    category,
    title,
    description,
    image
  });

  // Save the new post to the database
  newPost.save()
    .then(savedPost => {
      console.log('Post saved successfully:', savedPost);
      res.status(201).json(savedPost);
    })
    .catch(error => {
      console.error('Error saving post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
router.patch('/explore/:title', async (req, res) => {
  const postTitle = req.params.title;
  const { category, title, description, image } = req.body;
  const update = {
    category,
    title,
    description,
    image,
    updatedAt: Date.now()
  };

  try {
    const updatedPost = await post.findOneAndUpdate({ title: postTitle }, update, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    console.log('Post updated successfully:', updatedPost);
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  

  router.delete('/explore/:title', async (req, res) => {
    const postTitle = req.params.title;
    try {
      const deletedPost = await post.findOneAndDelete({ title: postTitle });
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      console.log('Post deleted successfully:', deletedPost);
      res.json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/user', async(req, res) =>{
    try{
      const collections = await user.find();
      res.render('user', {collections});
    }catch(error){
      console.log('error msg:',error)
    }
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