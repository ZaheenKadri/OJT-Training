// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const router = express.Router();
// router.post("/register", async (req, res) => {
//     const { name, email, password } = req.body;
    
//     if(!name || !email || !password){
//         return res.status(400).json({ msg: "Please fill all fields"});
//     }
// });
// router.post("/register", async (req, res) => {
//     res.send("Register route working!");
// });
// router.post("./register", async (req, res) => {
//     const { name, email, password } = req.body;
//     try{
//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ msg: 'User already exist'});
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(password, salt);
//         user = new User({ name, email, password: hash });
//         await user.save();
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token, user: { id: user._id, name, email } });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });
// router.post('/login', async (req, res) => {
//     const{ email, password } = req.body;
//     try{
//         const user = await User.findOne({ email });
//         if(!user) return res.status(400).json({ msg: 'Invalid credentials'});
//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
//         res.json({ token, user: { id: user._id, name: user.name, email } });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });
// module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please fill all fields" });
    }

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hash });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name,
                email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/auth/login
// @desc    Login user and return token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;