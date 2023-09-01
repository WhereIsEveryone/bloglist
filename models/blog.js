const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
      type: String,
      minlength: 1,
      required: true,
      bsonType: [ "string" ]
    },
    author: {
      type: String,
      minlength: 1,
      required: true,
      bsonType: [ "string" ]
    },
    url: {
        type: String,
        minlength: 11,
        required: true,
        bsonType: [ "string" ]
    },
    likes: {
        type: Number,
        default: 0 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  })

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)