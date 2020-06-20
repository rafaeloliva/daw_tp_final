Autor: Rafael Oliva - 2020
# Introducción

Este proyecto es el trabajo final de la materia Desarrollo de Aplicaciones Web (DAW)
de la EspIoT / MIoT 2020 (FIUBA), y consiste en un Sistema Smart Home para control on/off de luces
y persianas en una casa. Mediante los tres botones situados en el frente es posible visualizar
todos los dispositivos, solo las luces o solo las persianas. Cada dispositivo tiene su propio switch on/off.
El sistema se programó
utilizando como base material de la cátedra, con un front-end basado en HTML y CSS (Materialize),
y parte dinámica en Typescript. Para el backend, se consulta a una base de datos MySql utilizando
node-js. A través de la utilización de contenedores Docker y la herramienta Docker-Compose el
sistema puede ponerse en marcha y detenerse con un único par de comandos.

# Correr la aplicación

Para correr la aplicacion es necesario primero clonar el repositorio en la
carpeta local deseada utilizando: 
```sh
git clone https://github.com/rafaeloliva/daw_tp_final
```

y luego ejecutar el siguiente comando con un terminal desde la carpeta seleccionada:
```sh
docker-compose up
```
Esperar que termine de cargar, y luego 
la aplicación podrá verse desde Chrome con http://localhost:8000

Para detener ordenadamente la aplicación, desde otro terminal ejecutar:
```sh
docker-compose down
```

# Contribuir

Para contribuir realizar un pull request con las sugerencias. Dado que se trata de un
proyecto didáctico no se prevé realizar mantenimiento del mismo.

# Licencia

GPL