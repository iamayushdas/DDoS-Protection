const express = require('express');
const limitter = require('express-rate-limit');

const app = express();

// app.use(limitter({
//     windowMs: 5000,
//     max: 5,
//     message: {
//         code: 429,
//         message: "too many requests"
//     }
//     // message: "maximum request done"
// }))

app.get('/', (req, res) => res.send('Hello from a rate limited app'))

app.get('/api', (req, res) => res.send('only certain limit of request allowed per seconds'))

app.get('/open', (req, res) => res.send('This is an open endpoint'))

const resgisterLimitter = limitter({
    windowMs: 5*60*1000,
    max:2
})

app.get('/register', limitter, (req, res) => res.send('Register page'))
app.post('/register', resgisterLimitter, (req, res) => res.send('ok'))

app.get('/login', (req, res) => res.send('Login page'))
app.post('/login', (req, res) => res.send('ok'))

app.listen(3000, () => console.log('\u{1F680} server on port 3000'))