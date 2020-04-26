const { Router } = require('express');
const postController = require('../controllers/post');

const postRouter = Router();

postRouter.get('/', (req, res) => res.send('Welcome'))

postRouter.post('/posts', postController.createPost);
postRouter.get('/posts', postController.getAllPosts);
postRouter.get('/posts/:postId', postController.getPostById);
postRouter.patch('/posts/:postId', postController.updatePost);
postRouter.delete('/posts/:postId', postController.deletePost);

module.exports = postRouter;