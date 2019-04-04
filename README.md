# Prueba Canales Encubiertos

### Prueba de canales encubiertos para ocultar información en una imagen.

Para ocultar informacion en una imagen se utilizaron dos scripts en node (version 8.9.0). Primero se debe utilizar el script de ocultar_informacion.js con el siguiente comando:

```sh
$ node ocultar_informacion.js <menssage> <fileInput> <fileOutput>
```
- message: mensaje a ocultar en la imagen sin espacios (Ej: HolaCriptografo)
- fileInput: url de la imagen de entrada (Ej: download.bmp)
- fileOutput: url de la imagen de salida modificada con el mensaje oculto (Ej: download_modificado.bmp)

Una vez tengamos la imagen de salida, podemos ver el mensaje que lleva oculto a travez del siguiente comando:

```sh
$ node mostrar_informacion.js <fileInput>
```
- fileInput: url de la imagen que fue modificada en paso anterior (Ej: download_modificado.bmp)
