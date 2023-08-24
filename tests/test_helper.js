const Blog = require('../models/blog')

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
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}