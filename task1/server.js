const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Home Route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'User Registration Form',
        values: {
            username: '',
            email: ''
        },
        errors: []
    });
});

// Form Submission Route
app.post('/submit', (req, res) => {
    const username = (req.body.username || '').trim();
    const email = (req.body.email || '').trim();
    const errors = [];

    if (!username) {
        errors.push('Name is required.');
    }

    if (!email) {
        errors.push('Email is required.');
    }

    if (errors.length > 0) {
        return res.status(400).render('index', {
            title: 'User Registration Form',
            values: { username, email },
            errors
        });
    }

    res.render('result', {
        title: 'Form Submitted',
        username,
        email,
        submittedAt: new Date().toLocaleString()
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
