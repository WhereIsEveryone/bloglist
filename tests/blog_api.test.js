const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are right number of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog title is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(contents).toContain(
    'Annan blogi'
  )
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "Annan blogi",
    author: "Anna Vilen",
    url: "https://annan-blogi.fi",
    likes: 101
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const blogsWOid = []
  blogsAtEnd.forEach((blog) => {
    const blogWOid = { title: blog.title, author: blog.author, url: blog.url, likes: blog.likes }
    blogsWOid.push(blogWOid)
  })
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogsWOid).toContainEqual(newBlog)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: "Anna Vilen",
    url: "https://annan-blogi.fi",
    likes: 101
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: "Annan blogi",
    author: "Anna Vilen",
    likes: 101
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual(blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).not.toContain(blogToDelete.title)
})

test('there is an id field in the response', async () => {
  const blogsAtStart = await helper.blogsInDb()
  blogsAtStart.forEach(blog => {
    expect(blog.id).toBeDefined();
  })
})

test('likes defaults to 0 when a blog with undefined likes is added', async () => {
  const newBlog = {
    title: "Kallen blogi",
    author: "Kalle Vilen",
    url: "https://kallen-blogi.fi",
    likes: undefined
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()
  const blogToInspect = blogsAtEnd.find((blog) => blog.title === 'Kallen blogi')
  expect(blogToInspect.likes).toBe(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})