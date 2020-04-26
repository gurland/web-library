const express = require('express')
const app = express()
const port = 80

app.get('/api/v1/test', (req, res) => res.send('API service is running!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))