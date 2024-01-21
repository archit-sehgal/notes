const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const cors = require("cors")
const app = express();
const jwt = require("jsonwebtoken");
const secretKey = "avshsvyhFDWr";

app.use(express.json())
app.use(cors())

// connect to mongodb
mongoose.connect("mongodb+srv://architsehgal19:22d65t4oPCTRyUz7@test.oe4207q.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const noteSchema = new mongoose.Schema({
    title: String,
    desc: String,
    userid: String
});
const adminSchema = new mongoose.Schema({
    adminid: String,
    password: String
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Notes = mongoose.model('Notes', noteSchema);
const Admin = mongoose.model('Admin', adminSchema);
// ------------------------------------------------------------


// routes
app.get("/", (req, res) => {
    res.json({ message: "Server is running on port 3000" })
})

//middleware
const authenticateJwt = (req, res, next) => {
    const authHead = req.headers.authorization;
    if (authHead) {
        const token = authHead.split(" ")[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(401).json({ message: "Un-Authorized" });
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        res.status(403).json({ message: "Forbidden" });
    }
};

//user signup
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const existinguser = await User.findOne({ username: username });
    if (!existinguser) {
        const newuser = new User({
            username: username,
            password: password,
        })
        await newuser.save()
        const token = jwt.sign({ username, password }, secretKey)
        res.json({ message: "User created successfully", token })
    } else {
        res.status(401).json({ error: "User already exist" })
    }
});

//user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const checkuser = await User.findOne({ username: username, password: password });
    if (checkuser) {
        const token = jwt.sign({ username, password }, secretKey);

        res.json({ message: "User logged in", token: token })
    } else {
        res.status(401).json({ message: "User not found" })
    }
});

//user add notes
app.post("/compose", authenticateJwt, async (req, res) => {
    const { title, desc } = req.body;
    const existingNote = await Notes.findOne({ title: title, desc: desc });
    if (existingNote) {
        res.status(401).json({ message: "Note already exists", existingNote })
    } else {
        const newnote = new Notes({
            title: title,
            desc: desc,
            userid: req.user.username
        })
        await newnote.save();
        res.json({ message: "Note added successfully", newnote });
    }
});

//only user own notes
app.post("/notes", authenticateJwt, async (req, res) => {
    try {
        const notes = await Notes.find({ userid: req.user.username });
        res.send(notes);
    } catch (error) {
        res.status(500).send("Error fetching notes");
    }
});

// delete single note (user) //CHECK!?
app.delete("/delnote/:title", authenticateJwt, async (req, res) => {
    const title = req.params.title;

    try {
        const checkNotes = await Notes.findOne({ title: title });

        if (!checkNotes) {
            res.status(404).json({ message: "No note with this title found." });
        } else {
            if (checkNotes.userid === req.user.username || req.user.adminid) {
                await Notes.deleteOne({ title: title });
                res.status(200).json({ message: "Note deleted successfully!" });
                // console.log(checkNotes.userid, req.user.username, req.user.adminid)
            } else {
                res.status(403).json({ message: "You don't have permission to delete this note." });
                // console.log(checkNotes.userid, req.user.username, req.user.adminid)
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
app.post("/editnote/:title", authenticateJwt, async (req, res) => {
    const title = req.params.title;
    const { newtitle, newdesc } = req.body;
    try {
        const checkNote = await Notes.findOne({ title: title });
        if (!checkNote) {
            res.status(404).json({ message: "No note with this title found." });
        } else {
            if (checkNote.userid === req.user.username || req.user.adminid) {
                checkNote.title = newtitle;
                checkNote.desc = newdesc;
                await checkNote.save();
                res.json({ message: "note updated successfully",checknote: checkNote })
            } else {
                res.status(403).json({ message: "You don't have permission to delete this note." });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//admin signup route
app.post("/adminsignup", async (req, res) => {
    const { adminid, password } = req.body;
    const existingadmin = await Admin.findOne({ adminid: adminid });
    if (!existingadmin) {
        const newadmin = new Admin({
            adminid: adminid,
            password: password,
        })
        await newadmin.save()
        const token = jwt.sign({ adminid, password }, secretKey)
        res.json({ message: "Admin created successfully", token })
    } else {
        res.status(401).json({ error: "Admin already exist" })
    }
});

//admin login route
app.post("/adminlogin", async (req, res) => {
    const { adminid, password } = req.body;
    const CheckAdmin = await Admin.findOne({ adminid: adminid, password: password })
    if (!CheckAdmin) {
        res.status(401).json({ message: "Un-Authorized" })
    } else {
        const token = jwt.sign({ adminid, password }, secretKey);
        res.json({ message: "Admin logged in", token: token })
    }
});

//check if admin middlware  
const checkAdminAccess = (req, res, next) => {
    if (req.user.adminid) {
        next();
    } else {
        res.status(403).json({ message: "Forbidden - Admin access required" });
    }
};

//get all notes(admin access required)
app.post("/allnotes", authenticateJwt, checkAdminAccess, async (req, res) => {
    try {
        const notes = await Notes.find({});
        res.status(200).json({ message: "We found some notes", notes })
    } catch (error) {
        res.status(401).json({ message: "Error" });
    }
});
app.post("/allusers", authenticateJwt, checkAdminAccess, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ message: "these are all the registered users", users })
    } catch (error) {
        res.status(401).json({ message: "Error" });
    }
})
// delete any user (admin access required)
app.delete("/deluser/:username", authenticateJwt, checkAdminAccess, async (req, res) => {
    const username = req.params.username;
    try {
        const checkUser = await User.deleteOne({ username: username })
        if (!checkUser) {
            res.status(404).json({ message: "No user found" });
        } else {
            await Notes.deleteMany({ userid: username })
            res.status(200).json({ message: "user deleted successfully!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//server listening route
app.listen(3000, () => {
    console.log("server started on port 3000")
});