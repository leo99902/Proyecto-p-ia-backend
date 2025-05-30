'use strict'

// Determina si alguno de los valores recibidos son de tipo object
module.exports = (valuesArray) => valuesArray.some(value => String(value) === '[object Object]');