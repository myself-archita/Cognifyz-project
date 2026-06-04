const express = require('express');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Task 4 — Complex Form Validation and Dynamic DOM Manipulation'
    });
});

app.listen(PORT, () => {
    console.log(`Task 4 server running on http://localhost:${PORT}`);
});
