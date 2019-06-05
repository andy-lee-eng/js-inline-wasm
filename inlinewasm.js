'use strict'
const fs = require('fs')
const path = require('path')
const template = require('./template')

const getOutputFromInput = options => {
    const inputFile = options.input
    const extension = inputFile.lastIndexOf('.')
    const outputFile = `${inputFile.substring(0, extension)}.js`
    return outputFile
}

const getOutput = options => {
    return options.output || getOutputFromInput(options)
}

const checkDirectory = fileName => {
    const dirName = path.dirname(fileName)
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName)
    }
}

module.exports = options => {
    const buff = fs.readFileSync(options.input)
    const base64data = buff.toString('base64')
    
    const templateContent = template.get(options.type)

    const jsContent = templateContent.replace(/\$\{base64data\}/, base64data)
    const outputFile = getOutput(options)

    checkDirectory(outputFile)
    fs.writeFileSync(outputFile, jsContent)

    console.info(`Inlined ${options.input} in ${outputFile}`)
}
