const connectTomongo = require('./db');
const cors = require('cors');



connectTomongo(); 
const express = require('express')
const app = express()
const port = 5000

//if we want to use "req.body" than we have to use middleware
app.use(cors())
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World! your are tested on thunder client')
// })

//available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook App listening at http://localhost:${port}`);
})
