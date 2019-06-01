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
    // convert binary data to base64 encoded string
    return fs.readFileSync(file).toString('base64');
}

function stringABase64(code){
	return parseInt(Object.keys(diccionario).find(key => diccionario[key] === code))
}

function esImpar(num){
	let indice = stringABase64(num)
	return (indice%2!=0)
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
		//Mientras sea un ASCII impar, en el siguiente bit hay parte del mensaje
		if(esImpar(contents[i])){
			mensaje += esImpar(contents[i+1])?'1':'0'
		//Si hay un ASCII par, quiere decir que el mensaje oculto termino
		} else {
			sigueMensaje = false
		}		
}

//Salida del programa
console.log('-Bits que fueron encontrados como mensaje oculto:')
console.log(mensaje)
console.log('')
console.log('-Mensaje oculto en codigo ASCII:')
console.log(binarytoString(mensaje))
