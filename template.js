const fs = require('fs');
const path = require('path');

const templateName = fileName => {
    const extension = fileName.lastIndexOf('.')
    return fileName.substring(0, extension)    
}

module.exports.list = () => {
    const files = fs.readdirSync(path.join(__dirname, 'templates'));
    return files.map(templateName)
}

module.exports.get = (name) => {
    const filePath = path.join(__dirname, 'templates', `${name}.js`)
    return fs.readFileSync(filePath, { encoding: 'UTF8' });
}
