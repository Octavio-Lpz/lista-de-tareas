Prueba técnica para auxiliar de programador en IPISA
Lista de tareas


---BACKEND
PREREQUISITOS
Python: Preferentemente versión 3.6 o más actual
pip: Generalmente incluido con Python, pero puede instalarse siguiendo las instrucciones en https://pip.pypa.io/en/stable/installation/

Construido con Flask, usando SQLAlchemy (SQLite) para el manejo de la base de datos y Flask-CORS para las peticiones cross-origin.

Es necesario instalar lo siguiente:
Flask == 2.2.2
Flask-SQLAlchemy == 2.5.1
Flask-CORS == 3.0.10 

Para instalar las dependencias, puede utilizarse la instrucción:
pip install -r requirements.txt

La base de datos se inicilizará automáticamente cuando se corre la aplicación por primera vez. Para hacerlo, se debe navegar a la ruta /backend y ejecutar desde la terminal la siguiente instrucción:
python app.py


---FRONTEND
PREREQUISITOS
NodeJS: Preferentemente la última versión. Puede instalarse siguiendo las instrucciones en https://nodejs.org/
Package Manager: Node incluye npm, pero puede utilizarse otra herramienta como Yarn si lo prefiere.

Construido con React, usando Bootstrap para hacerlo responsivo y FontAwesome para estilizarlo.

Para iniciar la aplicación, es necesario: 
- Moverse a la ruta /frontend/task-manager
- Instalar las dependencias necesarioas ejecutando la instrucción npm install
- Comenzar el servidor de desarrollo ejecutando la instrucción npm start


---EXPLICACIÓN DE DECISIONES
Las decisiones que tomé en tanto los elementos usados al construir este proyecto fueron basadas en la familiaridad que tengo con ellas. Por ejemplo, he tenido oportunidad de revisar muchos más proyectos con Flask que con Django, y Bootstrap siempre ha sido la dependencia que uso para responsividad de webapps.
Varias otras cosas son nuevas para mi, y decidí usarlas porque eran compatibles con las tecnologías que yo conozco.