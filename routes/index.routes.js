const router = require("express").Router();

const countriesRoutes = require("./countries.routes")
router.use("/countries", countriesRoutes)

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

const postsRoutes = require("./posts.routes")
router.use("/posts", postsRoutes)

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const usersRoutes = require("./users.routes")
router.use("/users", usersRoutes)

const commentsRoutes = require("./comments.routes")
router.use("/comments", commentsRoutes)

const votesRoutes = require("./votes.routes")
router.use("/votes", votesRoutes)

const chatRoutes = require("./chat.routes")
router.use("/chat", chatRoutes)

module.exports = router;
