const adminMiddleware = async(req, res, next) => {
    try {
        console.log(req.user);
        const adminRole = req.user.isAdmin;
        if(!adminRole)
        {
            return res.status(403).json({error: "Access Denied..."});
        }
        //res.status(200).json({msg: req.user.isAdmin});
        // If user is admin proceed to next middleware..
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = adminMiddleware;