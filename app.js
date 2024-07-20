const express = require('express');
const path = require('path')

const app = express();
const PORT = 3000;

app.get('/*', (req, res) => {
    res.sendFile(path.resolve("frontend", "index.html"))
    res.status(200);
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Listening on port " + PORT)
    else
        console.log("Error occurred", error);
}
);