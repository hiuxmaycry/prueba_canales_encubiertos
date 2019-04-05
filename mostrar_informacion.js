//prueba imagen 
let fs = require('fs')

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // convert binary data to base64 encoded string
    return fs.readFileSync(file).toString('base64');
}

function esImpar(num){
	return (num%2!=0)
}

function esBloqueSaltoDeLinea(contents,i){
	return (contents[i] == 'w' && contents[i+1] == 'f' 
		&& contents[i+2] == 'P' && contents[i+3] == '/')
}

function esSaltoDeLinea(contents,i){
	return (esBloqueSaltoDeLinea(contents,i) || esBloqueSaltoDeLinea(contents,i-1) 
		|| esBloqueSaltoDeLinea(contents,i-2) || esBloqueSaltoDeLinea(contents,i-3))
}

function binarytoString(str) {
	let arrays = [], size = 8
	str = str.split('')
	while (str.length > 0)
		arrays.push(str.splice(0, size))
	return arrays.map(function (val){
		return String.fromCharCode(parseInt(val.join(''), 2));
		}).join("");
}

let fileEntrada = process.argv[2] 

//levanto el archivo con mensaje oculto
let contents = base64_encode(fileEntrada)

let sigueMensaje = true
let mensaje = ''
for (let i = (100); i < contents.length && sigueMensaje; i+=2) {
	if(!esSaltoDeLinea(contents,i)){
		//Mientras sea un ASCII impar, en el siguiente bit hay parte del mensaje
		if(esImpar(contents[i].charCodeAt(0))){
			mensaje += esImpar(contents[i+1].charCodeAt(0))?'1':'0'
		//Si hay un ASCII par, quiere decir que el mensaje oculto termino
		} else {
			sigueMensaje = false
		}		
	}
}

//Salida del programa
console.log('-Bits que fueron encontrados como mensaje oculto:')
console.log(mensaje)
console.log('')
console.log('-Mensaje oculto en codigo ASCII:')
console.log(binarytoString(mensaje))
