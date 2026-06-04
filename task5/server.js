const express = require('express');

const app = express();
const PORT = process.env.PORT || 3005;
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const BACKEND_API_BASE = `${API_BASE_URL.replace(/\/$/, '')}/api`;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());

async function proxyApiRequest(req, res, next) {
    try {
        const targetUrl = `${BACKEND_API_BASE}${req.originalUrl.replace(/^\/api/, '')}`;
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                'content-type': req.headers['content-type'] || 'application/json'
            },
            body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body || {})
        });

        const text = await response.text();
        res.status(response.status);

        const contentType = response.headers.get('content-type');
        if (contentType) {
            res.setHeader('content-type', contentType);
        }

        return res.send(text);
    } catch (error) {
        return next(error);
    }
}

app.use('/api', proxyApiRequest);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Task 5 - API Integration and Front-End Interaction',
        apiBaseUrl: API_BASE_URL
    });
});

app.listen(PORT, () => {
    console.log(`Task 5 server running on http://localhost:${PORT}`);
});
