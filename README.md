Prueba técnica para auxiliar de programador en IPISA
Lista de tareas


---INSTRUCCIONES PARA EJECUTAR
1- Para comenzar, se debe clonar el repositorio con la instrucción:
git clone https://github.com/Octavio-Lpz/lista-de-tareas

2- Luego, moverse a la ruta que contiene /lista-de-tareas

3- Después, iniciar un entorno virtual con las intrucción:
python -m venv venv

4- Para activar el entorno virtual es necesario ejecutar la instrucción:
source venv/Scripts/activate (Git Bash)

5- Después, moverse a la ruta /lista-de-tareas/backend y ejecutar la instrucción:
pip install -r requirements.txt

6- Dentro del entrono virtual del backend, ejecutar la instrucción:
python app.py

7- Moverse a la ruta /lista-de-tareas/frontend/task-manager. Desde allí ejecutar la instrucción:
npm install

8- Dentro de esa misma ruta, ejecutar la instrucción:
npm start


---BACKEND
PREREQUISITOS
Python: Preferentemente versión 3.6 o más actual
pip: Generalmente incluido con Python, pero puede instalarse siguiendo las instrucciones en https://pip.pypa.io/en/stable/installation/

Construido con Flask, usando SQLAlchemy (SQLite) para el manejo de la base de datos y Flask-CORS para las peticiones cross-origin.

Es necesario instalar lo siguiente:
Flask==3.0.3
Flask-SQLAlchemy==3.1.1
Flask-CORS==5.0.0
SQLAlchemy==2.0.35
Werkzeug==3.0.4
blinker==1.8.2
certifi==2024.8.30
click==8.1.7
colorama==0.4.6
distlib==0.3.9
filelock==3.16.1
greenlet==3.1.1
itsdangerous==2.2.0
Jinja2==3.1.4
MarkupSafe==3.0.1
packaging==24.1
pipenv==2024.1.0
platformdirs==4.3.6
typing_extensions==4.12.2
virtualenv==20.26.6


Para instalar las dependencias, puede utilizarse la instrucción:
pip install -r requirements.txt

La base de datos se inicilizará automáticamente cuando se corre la aplicación por primera vez. Para hacerlo, se debe navegar a la ruta /backend y ejecutar desde la terminal la siguiente instrucción:
python app.py


---FRONTEND
PREREQUISITOS
NodeJS: Preferentemente la última versión. Puede instalarse siguiendo las instrucciones en https://nodejs.org/
Package Manager: Node incluye npm, pero puede utilizarse otra herramienta como Yarn si se prefiere.

Construido con React, usando Bootstrap para hacerlo responsivo y FontAwesome para estilizarlo.

Para iniciar la aplicación, es necesario: 
- Moverse a la ruta /frontend/task-manager
- Instalar las dependencias necesarioas ejecutando la instrucción npm install
- Comenzar el servidor de desarrollo ejecutando la instrucción npm start


---EXPLICACIÓN DE DECISIONES
Las decisiones que tomé en tanto los elementos usados al construir este proyecto fueron basadas en la familiaridad que tengo con ellas. Por ejemplo, he tenido oportunidad de revisar muchos más proyectos con Flask que con Django, y Bootstrap siempre ha sido la dependencia que uso para responsividad de webapps.
Varias otras cosas son nuevas para mi, y decidí usarlas porque eran compatibles con las tecnologías que yo conozco.