//prueba imagen 
let fs = require('fs')

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    return fs.readFileSync(file).toString('base64');
    // convert binary data to base64 encoded string
    //return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
}

function convertirEnImpar(num){
	if(num%2==0)
		return (num+1)
	else
		return num
}

function convertirEnPar(num){
	if(num%2!=0)
		return (num+1)
	else
		return num
}

function agregarBit(code,bit){
	if(bit == '0'){
		return convertirEnPar(code)
	} else {
		return convertirEnImpar(code)
	}
}

function esBloqueSaltoDeLinea(contents,i){
	return (contents[i] == 'w' && contents[i+1] == 'f' 
		&& contents[i+2] == 'P' && contents[i+3] == '/')
}

function esSaltoDeLinea(contents,i){
	return (esBloqueSaltoDeLinea(contents,i) || esBloqueSaltoDeLinea(contents,i-1) 
		|| esBloqueSaltoDeLinea(contents,i-2) || esBloqueSaltoDeLinea(contents,i-3))
}

let mensaje = process.argv[2] 
let fileEntrada = process.argv[3]
let fileSalida = process.argv[4]

//Paso todo el mensaje a binario
let contents = base64_encode(fileEntrada)
let mensajeAOcultar = ''
for (let i = 0; i < mensaje.length; i++) {
	mensajeAOcultar += '0' + mensaje[i].charCodeAt(0).toString(2)
}

console.log('-Mensaje a esconder: '+ mensaje)
console.log('')
console.log('-Mensaje que debe ocultarse como binario: ')
console.log(mensajeAOcultar)

let cantidadEncriptada = 0
let cambioEnElMensaje = [] 
for (let i = (100); i < contents.length && cantidadEncriptada <= mensajeAOcultar.length; i+=2) {
	if(esSaltoDeLinea(contents,i)){
		cambioEnElMensaje.push(contents[i])
	} else {
		if(cantidadEncriptada < mensajeAOcultar.length){
			cambioEnElMensaje.push(String.fromCharCode(convertirEnImpar(contents[i].charCodeAt(0))))
			cambioEnElMensaje.push(String.fromCharCode(agregarBit(contents[i+1].charCodeAt(0),mensajeAOcultar[cantidadEncriptada])))
		} else {
			cambioEnElMensaje.push(String.fromCharCode(convertirEnPar(contents[i].charCodeAt(0))))
		}
		cantidadEncriptada++	
	}
}

let mensajeEncriptado = cambioEnElMensaje.reduce((valorAnterior, valorActual) => {
  return valorAnterior + valorActual
})

let contentsCambiado
if(cambioEnElMensaje.length){
	contentsCambiado = contents.slice(0,100)
	contentsCambiado = contentsCambiado.concat(mensajeEncriptado)
	contentsCambiado = contentsCambiado.concat(contents.slice(100+cambioEnElMensaje.length))
} else {
	contentsCambiado = contents
}

base64_decode(contentsCambiado,fileSalida)