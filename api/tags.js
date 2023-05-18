const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");
tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  // read the tagname from the params
  const tags = await getAllTags();
  const tagName = req.params.tagName;

  try {
    // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
    const posts = await getPostsByTagName(tagName);

    res.send({ posts });
  } catch ({ name, message }) {
    // forward the name and message to the error handler
    res.send({ name, message });
  }
});

module.exports = tagsRouter;
