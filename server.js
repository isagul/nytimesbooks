const express = require('express');
const path = require('path');
const port = process.env.PORT || 1905;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/webpack/build'));

// send the user to index html page inspite of the url
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './webpack/build/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
