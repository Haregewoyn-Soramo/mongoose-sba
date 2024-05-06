const { create } = require('connect-mongo');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const postSchema = new Schema({
  category: {
    type: "String",
    required: true
  },
  title:{
    type: "String",
    required: true
  },
  description:{
    type: "String",
    required: true
  },
  image:{
    type: "String",
    required: true
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})


const UserSchema = new Schema({
  username:{
    type: "String",
    required: true
  },
  email:{
    type: "String",
    required: true
  },
  password:{
    type: "String",
    required: true
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const accountSchema = new Schema({
  username:{
    type: "String",
    required: true
  },
  email:{
    type: "String",
    required: true
  },
  password:{
    type: "String",
    required: true
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  profile: {
    fullName: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    },
    profileImage: {
      type: String,
      default: '/default-profile-image.jpg'
    }
  },  
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      CreatedAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
})
const account = mongoose.model('account', UserSchema);
const user = mongoose.model('user', UserSchema);
const post = mongoose.model('Post', postSchema);

module.exports = {post, user, account};