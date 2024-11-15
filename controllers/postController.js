const prisma = require("../prisma/index");

// create a new post
exports.createPost = async (req, res, next)=>{
    try {
        const { slug, title, body,authorId } = req.body;
        if (!slug||!title|| !body) {
            throw new Error("pass all the parameters");
        }
        const result = await prisma.post.create({
            data: {
                slug,
                title,
                body,
                author: { connect: { id: authorId } }
            }
        })
        res.json(result);

        
    } catch (error) {
        throw new Error(error);
    }
}
exports.updatePost = async (req, res, next) => {
    const { id } = req.params;
    const { title, body } = req.body;

    try {
        const result = await prisma.post.update({
            where: {
                id 
            },
            data: {
                title,
                body
            }
        });
        res.status(200).json({
            message: "post updated",
            result
        })

        
        
    } catch (error) {
        throw new Error(error);
    }

}

exports.deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await prisma.post.delete({
            where: {
                id
            }
        });
        res.json(
            result
        );
    }catch (error) {
        res.json({ error: `post with ${req.params.id}  cannot be found` });
        throw new Error(error);
    }
}

exports.getAllPost = async (req, res, next) => {
    try {
        const result = await prisma.post.findMany();
        res.json(result);
        
    } catch (error) {
        res.json({ error: `no post found` });
        throw new Error(error);
    }
}