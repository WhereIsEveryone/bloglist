const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "Annan blogi",
      author: "Anna Vilen",
      url: "https://annan-blogi.fi",
      likes: 101
    },
    {
      title: "Willen blogi",
      author: "Ville Vilen",
      url: "https://willen-blogi.fi",
      likes: 32
    },
    {
      title: "Kaisan blogi",
      author: "Kaisa Vilen",
      url: "https://kaisan-blogi.com",
      likes: 88
    }
  ]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'https://remove-this-blog.com'})
  const savedBlog = await blog.save()
  await Blog.findByIdAndRemove(savedBlog.id)
  return savedBlog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}