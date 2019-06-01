//prueba imagen
let fs = require('fs')

const diccionario = {
	0:	'A',
	1:	'B',
	2:	'C',
	3:	'D',
	4:	'E',
	5:	'F',
	6:	'G',
	7:	'H',
	8:	'I',
	9:	'J',
	10:	'K',
	11:	'L',
	12:	'M',
	13:	'N',
	14:	'O',
	15:	'P',
	16:	'Q',
	17:	'R',
	18:	'S',
	19:	'T',
	20:	'U',
	21:	'V',
	22:	'W',
	23:	'X',
	24:	'Y',
	25:	'Z',
	26:	'a',
	27:	'b',
	28:	'c',
	29:	'd',
	30:	'e',
	31:	'f',
	32:	'g',
	33:	'h',
	34:	'i',
	35:	'j',
	36:	'k',
	37:	'l',
	38:	'm',
	39:	'n',
	40:	'o',
	41:	'p',
	42:	'q',
	43:	'r',
	44:	's',
	45:	't',
	46:	'u',
	47:	'v',
	48:	'w',
	49:	'x',
	50:	'y',
	51:	'z',
	52:	'0',
	53:	'1',
	54:	'2',
	55:	'3',
	56:	'4',
	57:	'5',
	58:	'6',
	59:	'7',
	60:	'8',
	61:	'9',
	62:	'+',
	63:	'/'
}

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    return fs.readFileSync(file).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    let bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
}

function convertirEnImpar(num){
	if(num%2==0){
			return (num+1)
	} else {
		return num
	}
}

function convertirEnPar(num){
	if(num%2!=0){
		if(num>=64)
			return 0
		else
			return (num+1)
	} else {
		return num
	}
}

function convertir(code,bit){
	if(bit == '0'){
		return convertirEnPar(code)
	} else {
		return convertirEnImpar(code)
	}
}

function stringABase64(code){
	return parseInt(Object.keys(diccionario).find(key => diccionario[key] === code))
}

function base64AString(code){
	return diccionario[code]
}

function agregarBitPar(code){
	let indice = stringABase64(code)
	let nuevoIndice = convertirEnPar(indice)
	return base64AString(nuevoIndice)
}

function agregarBitImpar(code){
	let indice = stringABase64(code)
	let nuevoIndice = convertirEnImpar(indice)
	return base64AString(nuevoIndice)
}

function agregarBit(code,bit){
	let indice = stringABase64(code)
	let nuevoIndice = convertir(indice,bit)
	return base64AString(nuevoIndice)
}

let mensaje = process.argv[2]
let fileEntrada = process.argv[3]
let fileSalida = process.argv[4]

//Paso todo el mensaje a binario
let contents = base64_encode(fileEntrada)
let mensajeAOcultar = ''
for (let i = 0; i < mensaje.length; i++) {
	mensajeAOcultar += mensaje[i].charCodeAt(0).toString(2).padStart(8, '0');
}

console.log('-Mensaje a esconder: '+ mensaje)
console.log('')
console.log('-Mensaje que debe ocultarse como binario: ')
console.log(mensajeAOcultar)

let cantidadEncriptada = 0
let cambioEnElMensaje = []
for (let i = (100); i < contents.length && cantidadEncriptada <= mensajeAOcultar.length; i+=2) {
		if(cantidadEncriptada < mensajeAOcultar.length){
			cambioEnElMensaje.push(agregarBitImpar(contents[i]))
			cambioEnElMensaje.push(agregarBit(contents[i+1],mensajeAOcultar[cantidadEncriptada]))
		} else {
			cambioEnElMensaje.push(agregarBitPar(contents[i]))
		}
		cantidadEncriptada++
}

let mensajeEncriptado = cambioEnElMensaje.reduce((valorAnterior, valorActual) => {
  return valorAnterior + valorActual
})

let contentsCambiado
if(cambioEnElMensaje.length){
	contentsCambiado = contents.slice(0,100)
	contentsCambiado = contentsCambiado.concat(mensajeEncriptado)
	contentsCambiado = contentsCambiado.concat(contents.slice(100+mensajeEncriptado.length))
} else {
	contentsCambiado = contents
}

base64_decode(contentsCambiado,fileSalida)