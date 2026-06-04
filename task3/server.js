const express = require('express');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Task 3 — Advanced CSS Styling and Responsive Design'
    });
});

app.listen(PORT, () => {
    console.log(`Task 3 server running on http://localhost:${PORT}`);
});
