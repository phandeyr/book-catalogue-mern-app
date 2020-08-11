const Author = require('../models/author_model')

/**
 * Attempts to find the author by name, else creates it
 * @param {String} firstName Author's first name
 * @param {String} lastName Author's last name
 */
async function createAuthor(firstName, lastName) {
  try {
    let author = await Author.findOne({ firstName, lastName })
    if (author == null) {
      author = await new Author({ firstName, lastName }).save()
    }
    return author._id
  } catch(err) {
    console.log(err)
  }
}

/**
 * Find and returns author by id
 * @param {String} id Id of author
 */
async function findAuthor(id) {
  try {
    const author = await Author.findById(id)
    return author
  }
  catch (err) {
    console.log(err)
  }
}

module.exports.createAuthor = createAuthor
module.exports.findAuthor = findAuthor
