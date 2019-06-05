#! /usr/bin/env node
'use strict'
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')

const inlinewasm = require('./inlinewasm');
const template = require('./template')

const templateNames = template.list()
    .map(n => n === 'fetch' ? `"fetch" (default)` : `"${n}"`)

const optionDefinitions = [
    { name: 'input', type: String, defaultOption: true, typeLabel: 'file', description: 'The .wasm file to inline' },
    { name: 'output', alias: 'o', type: String, typeLabel: 'file', description: 'The .js file to create' },
    { name: 'type', alias: 't', type: String, typeLabel: 'typeName', defaultValue: 'fetch', description: `The type of JavaScript file to generate - ${templateNames.join(', ')}` },
    { name: 'help', alias: 'h', type: Boolean, description: 'Show this Help page' }
]

const options = commandLineArgs(optionDefinitions)

if (options.help) {
    const sections = [
        {
          header: 'js-inline-wasm',
          content: 'A tool for bundling a WebAssembly .wasm file into a .js ES6 library file with async loading.'
        },
        {
            header: 'Usage',
            content: '$ inlinewasm sample.wasm [--output sample.js] [--type fetch]'
        },
        {
          header: 'Options',
          optionList: optionDefinitions
        }
      ]
    console.log(commandLineUsage(sections))
} else {
    inlinewasm(options)
}
