const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');
const {mongo} = require("mongoose");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_DB;

const CodeSnippet = require('./Model/CodeSnippetModel');
const productRoutes = require('./Route/ProductRoute');
const userRoutes = require('./Route/UserRoute');
const blogRoutes = require('./Route/BlogRoute');
const projectRoutes = require('./Route/projectRoute'); // NEW
const snippetRoutes = require('./Route/codeSnippetRoute'); // NEW
const pmRoutes = require('./Route/pmRoute');
const {join} = require("node:path");
const chatRoutes = require('./Route/chatBotRoute');

const app = express();

// Increase body size limits to avoid 413 on larger JSON payloads
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use(cors({
    origin: 'http://localhost:3000', // frontend URL
    credentials: true, // if you need to send cookies or auth headers
}));
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// File Upload Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads/documents';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });


app.use('/api/products', productRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/code', projectRoutes); // NEW - Projects
app.use('/api/code', snippetRoutes); // NEW - Snippets
app.use('/api/v1/pm', pmRoutes);
app.use('/api/v1/chat', chatRoutes);

mongoose.connect(URL).then( () => {
    console.log('MongoDB Connected!...');
    // Drop the problematic text index
    // try {
    //     const indexes = await CodeSnippet.collection.getIndexes();
    //     console.log('Current indexes:', Object.keys(indexes));
    //
    //     // Check if the problematic index exists
    //     if (indexes['title_text_description_text_code_text']) {
    //         await CodeSnippet.collection.dropIndex('title_text_description_text_code_text');
    //         console.log('✅ Successfully dropped problematic text index');
    //     } else {
    //         console.log('✅ Text index does not exist or already dropped');
    //     }
    // } catch (error) {
    //     console.log('⚠️ Could not drop index:', error.message);
    // }


}).catch(err=>{
    console.error((err));
});


app.listen(PORT,() => {
    console.log(`Server started on port: ${PORT}`);
});

module.exports = app;