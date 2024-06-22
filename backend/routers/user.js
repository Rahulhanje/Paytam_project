const express = require("express");
const { user, Account } = require("../db");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { authMiddleware } = require("./middleware");
const { JWT_secret } = require("./config"); // Assuming JWT_secret is being exported from config

const router = express.Router();

// Use body-parser to parse JSON bodies
router.use(express.json());

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

console.log("I am above signup");
router.post("/signup", async (req, res) => {
    console.log("I am inside signup");
    const parseResult = signupSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }
    const { username, password, firstName, lastName } = req.body;
    const existuser = await user.findOne({ username });
    if (existuser) {
        return res.json({
            message: "User already exists"
        });
    }
    const dbuser = await user.create({
        username,
        password,
        firstName,
        lastName
    });

    const userId = dbuser._id;
    // Creating new account
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({
        userId
    }, JWT_secret);
    res.status(200).json({
        message: "User Created",
        token
    });
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});
router.post("/signin", async (req, res) => {
    const parseResult = signinBody.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            message: "Incorrect Inputs"
        });
    }
    const { username, password } = req.body;
    const userRecord = await user.findOne({
        username,
        password
    });
    if (userRecord) {
        const token = jwt.sign({
            userId: userRecord._id
        }, JWT_secret);
        res.json({
            token
        });
        return;
    }
    res.status(400).json({
        message: "Error while logging in"
    });
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});
router.put("/", authMiddleware, async (req, res) => {
    const parseResult = updateBody.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            message: "Error while updating information"
        });
    }
    await user.updateOne({ _id: req.userId }, req.body);
    res.json({
        message: "Updated successfully"
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await user.find({
        $or: [{
            firstName: {
                $regex: filter,
                $options: "i"
            }
        }, {
            lastName: {
                $regex: filter,
                $options: "i"
            }
        }]
    });
    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }))
    });
});

module.exports = router;
