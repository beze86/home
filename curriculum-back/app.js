const express = require('express');
const app = express();
const cors = require('cors');
const mongoConnect = require('./db/db').mongoConnect;
const curriculaRoutes = require('./router');

// use cors
app.use(cors());

// useful for foms
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api/v1', curriculaRoutes);

app.get('/', (req, res, next) => {
    res.send('hello!');
})

mongoConnect(() => {
    app.listen(3000);
})