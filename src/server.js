const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_OKAY = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  { id: 1, title: 'note1', contents: 'contents1' },
  { id: 2, title: 'note2', contents: 'contents2' },
  { id: 3, title: 'note3', contents: 'contents3' },
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  if (req.query.term) {
    const title = [];
    posts.forEach((post, index) => {
      if (
        posts[index].title.includes(req.query.term) ||
        posts[index].contents.includes(req.query.term)
      ) {
        title.push(post);
      }
    });
    res.status(STATUS_OKAY);
    res.json(title);
  } else {
    res.status(STATUS_OKAY);
    res.json(posts);
  }
});

server.post('/posts', (req, res) => {
  if (!req.body.title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You Did Not Include a Title' });
  } else if (!req.body.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You Did Not Include a Title' });
  }
});

module.exports = { posts, server };
