const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    //return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0)
    return blogs.reduce(reducer, 0)
  }

const favoriteBlog = (blogs) => {
  const reducer = (comp, current) => {
    return comp.likes > current.likes ? comp : current
  }
  const favorite = blogs.reduce(reducer)
  const toReturn = { title: favorite.title, author: favorite.author, likes: favorite.likes }
  return toReturn
}

const mostBlogs = (blogs) => {
  const reducer = (comp, current) => {
    const compHasBlogs = (blogs.filter((blog) => blog.author === comp.author)).length
    const currentHasBlogs = (blogs.filter((blog) => blog.author === current.author)).length
    return compHasBlogs > currentHasBlogs ? comp : current
  }
  const busiest = blogs.reduce(reducer)
  const highestCount = (blogs.filter((blog) => blog.author === busiest.author)).length
  const toReturn = { author: busiest.author, blogs: highestCount }
  return toReturn
}

const favoriteBlogger = (blogs) => {
  const reducer = (comp, current) => {
    const compHasLikes = totalLikes(blogs.filter((blog) => blog.author === comp.author))
    const currentHasLikes = totalLikes(blogs.filter((blog) => blog.author === current.author))
    return compHasLikes > currentHasLikes ? comp : current
  }
  const favorite = blogs.reduce(reducer)
  const likes = totalLikes(blogs.filter((blog) => blog.author === favorite.author))
  const toReturn = { author: favorite.author, likes: likes }
  return toReturn
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    favoriteBlogger
}