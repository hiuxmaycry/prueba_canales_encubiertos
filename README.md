# Prueba Canales Encubiertos

### Prueba de canales encubiertos para ocultar información en una imagen.

Para ocultar informacion en una imagen se utilizaron dos scripts en node (version 8.9.0). Primero se debe utilizar el script de ocultar_informacion.js con el siguiente comando:

```sh
$ node ocultar_informacion.js <message> <fileInput> <fileOutput>
```
- message: mensaje a ocultar en la imagen (Ej: HolaCriptografo)
- fileInput: url de la imagen de entrada (Ej: download.bmp)
- fileOutput: url de la imagen de salida modificada con el mensaje oculto (Ej: download_modificado.bmp)

Nota: las imagenes que pueden ser utilizadas son aquellas que sean un mapa de bits, por ejemplo bmp.

Ejemplo:

```sh
$ node ocultar_informacion.js 'Hola criptografo' download.bmp download_modificado.bmp
```
Nota: nota por las dimensiones de la imagen, la longitud del mensaje a ocultar no debe superar los 30 caracteres

Una vez tengamos la imagen de salida, podemos ver el mensaje que lleva oculto a travez del siguiente comando:

```sh
$ node mostrar_informacion.js <fileInput>
```
- fileInput: url de la imagen que fue modificada en paso anterior (Ej: download_modificado.bmp)

Ejemplo:

```sh
$ node mostrar_informacion.js download_modificado.bmp
```
