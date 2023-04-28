const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const storage = require('./middleware/storage')


const app = express();



// Add middleware declarations here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false }));

connectDB();

// Init Middleware
app.use(express.json());


// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/trainings', require('./routes/api/training'));
app.use('/api/internships', require('./routes/api/internship'));
app.use('/api/company', require('./routes/api/company'));
app.use('/api/companyprofile', require('./routes/api/companyprofile'));
app.use('/api/companies', require('./routes/api/companies'));
app.use('/api/events', require('./routes/api/event'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
