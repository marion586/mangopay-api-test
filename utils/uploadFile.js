const fs = require('fs');
const path = require('path');


 const encodeFileToBase64 = (filePath) => {
    try {
        const fileBuffer = fs.readFileSync(filePath);
        return fileBuffer.toString('base64');
    } catch (err) {
        console.error(`Error reading file: ${filePath}`, err);
        return null;
    }
};


module.exports = {
    encodeFileToBase64
}
