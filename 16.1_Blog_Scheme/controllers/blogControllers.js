import Blog from "../Models/blog.js";
import STATUS_CODE from "../constants/statusCodes.js";

export const createBlogPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.params.id;
    const newPost = await Blog.create({
      title,
      content,
      author: userId,
    });
    res.status(STATUS_CODE.OK);
    const plainPost = newPost.toObject({
      getters: true,
      virtuals: false,
      versionKey: false,
    });
    delete plainPost.id;
    res.send(plainPost);
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST);
    next(error);
  }
};


export const commentOnPost = async( req, res, next) =>{
    try {
        req.user={
            _id: "659549b66397c932217256a3"
        }
        const postId = req.params.id
        const {text} = req.body
        const post = await Blog.findById(postId)
        if(!post){
            res.status(STATUS_CODE.NOT_FOUND)
        }
        const comment = {
            text,
            commenter: req.user
        }
        post.comments.push(comment)
        res.status(STATUS_CODE.OK).send(post)
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST)
        next(error)
    }
}