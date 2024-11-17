const express = require('express');
require('dotenv').config();
const { expressjwt } = require('express-jwt');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const authRoutes = require('./routes/auth.routes');  
const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret);  

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// JWT middleware
app.use(expressjwt({
    secret: process.env.JWT_SECRET, 
    algorithms: ['HS256'],
}).unless({
    path: ['/api/auth', '/api/public'], // Public routes without authentication
}));


// CORS configuration
app.use(cors());  // Allow all origins or customize as needed

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);  // Exit process with failure
  }
};

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api', authRoutes); 

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
