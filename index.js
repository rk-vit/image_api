import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const auth_key = "45305918-8389ed0e887031a171492320f";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views'); 

app.get('/',(req,res)=>{
    res.render('document.ejs');
})

// API Endpoint to fetch an image from Pixabay based on the query parameter 'image'
app.get('/image', async (req, res) => {
    const img = req.query.image;
    if (!img) {
        return res.json({ error: "Please enter a valid text." });
    }

    try {
        const response = await axios.get(`https://pixabay.com/api/?key=${auth_key}&q=${img}`);
        const hits = response.data.hits;

        if (hits.length > 0) {
            const randomImage = hits[Math.floor(Math.random() * hits.length)];
            res.json(randomImage);
        } else {
            res.json({ error: "No images found." });
        }
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
