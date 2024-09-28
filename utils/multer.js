const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Directory path where files will be uploaded
const uploadPath = path.join(__dirname, 'uploads');

// Configure Multer with disk storage and dynamic folder creation
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Check if the directory exists; if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    // Set the destination for file uploads
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename with the original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
