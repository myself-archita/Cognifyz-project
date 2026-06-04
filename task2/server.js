const express = require('express');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

const submissions = [];

function renderForm(res, data = {}) {
    res.render('index', {
        title: 'Task 2 Submission Form',
        values: {
            fullName: data.fullName || '',
            email: data.email || '',
            phone: data.phone || '',
            course: data.course || '',
            message: data.message || ''
        },
        errors: data.errors || [],
        totalSubmissions: submissions.length
    });
}

app.get('/', (req, res) => {
    renderForm(res);
});

app.get('/submissions', (req, res) => {
    res.render('submissions', {
        title: 'Stored Submissions',
        submissions
    });
});

app.post('/submit', (req, res) => {
    const fullName = (req.body.fullName || '').trim();
    const email = (req.body.email || '').trim();
    const phone = (req.body.phone || '').trim();
    const course = (req.body.course || '').trim();
    const message = (req.body.message || '').trim();
    const errors = [];

    if (fullName.length < 3) errors.push('Full name must be at least 3 characters.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email address.');
    if (!/^[0-9]{10}$/.test(phone)) errors.push('Phone number must contain exactly 10 digits.');
    if (!course) errors.push('Please choose a course.');
    if (message.length < 10) errors.push('Message must be at least 10 characters.');

    if (errors.length) {
        return res.status(400).render('index', {
            title: 'Task 2 Submission Form',
            values: { fullName, email, phone, course, message },
            errors,
            totalSubmissions: submissions.length
        });
    }

    const entry = {
        fullName,
        email,
        phone,
        course,
        message,
        submittedAt: new Date().toLocaleString()
    };

    submissions.unshift(entry);

    res.render('result', {
        title: 'Submission Received',
        entry,
        totalSubmissions: submissions.length
    });
});

app.listen(PORT, () => {
    console.log(`Task 2 server running on http://localhost:${PORT}`);
});
