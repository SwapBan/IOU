const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

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


app.post('/upload', upload.single('photo'), (req, res) => {
  console.log('File received:', req.file);
  res.json({ message: 'File uploaded successfully!', file: req.file });
});

const PORT = 5001;

app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on port ${PORT}`));