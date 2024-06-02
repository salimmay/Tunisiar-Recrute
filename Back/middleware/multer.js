    const multer = require('multer');

    // Set up multer storage
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    // Middleware function to handle file uploads
    const uploadFiles = upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 }
    ]);

    module.exports = uploadFiles;
