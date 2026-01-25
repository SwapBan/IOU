const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const FormData = require('form-data');

const app = express();
app.use(cors());


if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  });
  

  const upload = multer({ storage });


app.get('/', (req, res) => {
  res.json({ message: 'Backend is running 🚀' });
});


app.post('/upload', upload.single('photo'), async(req, res) => {
  console.log('File received:', req.file);
  //res.json({ message: 'File uploaded successfully!', file: req.file });
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));
    const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:5002/process";
    const response = await fetch(FASTAPI_URL, {
      method: "POST",
      body: formData,
      headers: formData.getHeaders()
    });
    const data = await response.json();
    res.json(data);
  }
  catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ message: 'Error processing file', error });
  }
});

const PORT = 5001;

app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on port ${PORT}`));