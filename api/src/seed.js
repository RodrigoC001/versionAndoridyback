const session = require('supertest-session');
const app = require('app.js');
const db = require('db.js');
const { User, Trip, Skyspot, Origin, Destination, Terminos } = require('models/index.js');
const skyspotsArrayFinal = require('./utils/geoJsonToSeed.js');

const aTrip = {
  name: 'AEP-FTE'
}

const seedTerminos = {
  termsAndPrivacy: `<p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 13.5pt;font-family: Arial;"><strong>Términos, Condiciones y Privacidad </strong></span></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">En AI.RE apoyamos la liberación del conocimiento que generamos para nuestros viajeros, pero buscamos también fuertemente proteger tus datos personales mediante una política de privacidad disponible y abierta.</span></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 12pt;font-family: Arial;"><strong>Nuestro compromiso de privacidad</strong></span></p><p><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">Para disfrutar de AI.RE App tenemos que recopilar y guardar cierta información como tu nombre, ruta de vuelo y dirección de correo electrónico. Esta información no la compartimos con nadie.</span></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">Prometemos que siempre te vamos a  comunicar cómo utilizamos tus datos y que los emplearemos únicamente para enriquecer tus experiencias para explorar la tierra desde el cielo.</span><br></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">Al descargar o utilizar AI.RE App estás aceptando los presentes términos y condiciones.  Recomendamos leerlos y comprenderlos.</span></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">AI.RE App te ofrece ser descargada y utilizada para tu uso personal sin ningún costo. Creemos en las virtudes de la diseminación del conocimiento abierto, y por eso los contenidos de la aplicación en sí misma y los derechos de los autores son libres. Sí te vamos a pedir citar la fuente de la información que vayas a utilizar como una forma de reconocer el trabajo de los colaboradores de AI.RE App. </span></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">AI.RE App pretende ser siempre lo más útil y eficiente posible. Por este motivo, nos reservamos el derecho de efectuar cambios en la aplicación, retirarla o eventualmente aplicar cargos futuros por los servicios ofrecidos; pero para esto te avisaremos antes de hacerlo SIEMPRE. En ningún caso se aplicarán cargos por la aplicación o sus servicios sin notificar con claridad el motivo por el que debe realizar el abono. Es posible que revisemos y/o modifiquemos estos términos periódicamente para cumplir con las legislaciones vigentes. Consultá éstos términos con regularidad para asegurarte de entender los cambios que se aplican en cada momento.</span><br></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 13.5pt;font-family: Arial;"><strong>AI.RE App</strong></span></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">La aplicación AI.RE App almacena y procesa algunos datos personales que facilitan el proceso de generación de contenidos adaptados a tus rutas de vuelo. Es tu responsabilidad mantener seguro tanto tu teléfono móvil como el acceso a tu aplicación. </span></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">Existen algunos casos en los que AI.RE App no se hará responsable por el uso que hagas de la aplicación. </span></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">La descarga de los contenidos relacionados con tu ruta de vuelo -para poder ser utilizados offline una vez arriba del avión- podrá realizarse siempre que estés conectado a una red wifi o a través de tu proveedor de servicios de red móvil. </span></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">La posibilidad de descargar y almacenar las rutas de tus vuelos para que estén disponibles sin conexión, el flight tracker en tiempo real y la función de notificaciones automáticas, requerirán que la aplicación disponga de una conexión a Internet activa. La conexión puede ser mediante Wi-Fi o a través del proveedor de servicios de red móvil, pero AI.RE App no se hará responsable del mal funcionamiento de la aplicación, previa a su utilización en modo offline -una vez descargados los contenidos-, en caso de que no disponga de conexión Wi-Fi o haya superado su límite de uso de datos.</span></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">Recordá que, si utilizas la aplicación fuera de una zona con conexión Wi-Fi, se aplicarán los términos del contrato con tu proveedor de servicios de red móvil. Por consiguiente, el proveedor de servicios móviles podrá aplicar cargos por los datos consumidos durante la conexión al acceder a la aplicación, así como otros cargos de terceros. Si utilizas la aplicación, acepta la responsabilidad en relación con dichos cargos, incluidos los cargos por los datos de roaming si utilizas la aplicación fuera del territorio de origen sin desactivar el roaming de datos. En caso de que no seas vos la persona encargada de pagar los recibos del dispositivo en el que se utiliza la aplicación, nosotros asumiremos que quien lo haga ha recibido tu permiso para utilizar la aplicación.</span></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">A pesar de que confiamos en que los lugares de interés -Sky Spots- y sus ubicaciones son precisos, es posible que la información cambie en algunos momentos. AI.RE no será responsable en caso de que un lugar de interés no pueda encontrarse o en caso de que no esté situado donde indica la aplicación. Sus datos de localización se revisan y calculan periódicamente, pero considerá que la precisión puede variar en ciertos lugares.</span></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">La aplicación te permitirá enviar comentarios por correo electrónico. Todos los comentarios que nos lleguen se tratarán de forma responsable y confidencial. Los comentarios deben estar relacionados con la aplicación para explorar la tierra desde el cielo.  No podremos dar respuesta a las consultas relacionadas con vuelos, reservas u  otros a través de la opción de comentarios de la aplicación.</span></p><p style="text-align:left;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 10pt;font-family: Arial;">Es posible que en algún momento debamos actualizar la aplicación. En estos momentos, la aplicación está disponible para iOS y Android. Existe la posibilidad de que se modifiquen los requisitos necesarios para ambos sistemas (y para cualquier otro sistema adicional para el que se ofrezca la aplicación en el futuro), por lo que deberás descargar las actualizaciones si deseas continuar utilizando AI.RE App, y no podemos garantizar ofrecer siempre las actualizaciones que necesites o que sean compatibles con la versión de iOS/Android instalada en su dispositivo. No obstante, vos podes garantizar que aceptarás las actualizaciones de la aplicación cuando sean ofrecidas. También es posible que dejemos de ofrecerse la aplicación y se interrumpa su uso en cualquier momento sin previo aviso. Nunca se sabe! A menos que se indique lo contrario, tras la terminación: (a) cesarán los derechos y las licencias concedidos mediante los presentes términos; (b) se deberá suspender el uso de la aplicación y, si fuera necesario, eliminarla de tu dispositivo.</span><br></p>`,
  faq: `<p style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;"><strong>¿Cómo usar AI.RE app?</strong>
    </span></p><ol><li style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;">Lo primero que tenés que hacer es seleccionar la ruta que vas a realizar; el origen y el destino. Si no descargaste la ruta con anterioridad, se va descargar automáticamente. Es importante que descargues la ruta antes de comenzar con el vuelo, preferiblemente con acceso a wi-fi. (ver punto X sobre eliminar rutas descargadas).</span></li><li style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;">Una vez seleccionada (y descargada) la ruta, se visualizará un mapa con los skyspots (lugares visibles desde la ventana del avión) de dicha  ruta. La ubicación del avión será mostrada en el mapa según la ubicación del GPS del dispositivo (ver punto X sobre funcionamiento GPS)</span></li><li style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;">Cuando estes volando y la ubicación del GPS te muestre que estas cerca de un skyspot podés apretar en el icono del skyspot para ver el nombre y una foto panorámica, la cual te ayudará a identificarlo. Si están interesado en explorar ese skyspot apretá en el nombre o en la foto, para tener acceso a una historia que junto con fotos y videos, te harán sentir parte del lugar.</span></li><li style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;">Podés volver al mapa para seguir explorando la tierra mientras volás apretando el botón de cerrar, localizado arriba a la derecha.</span></li></ol><br><br><p style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;"><strong>¿Cómo hago para que me funcione el GPS arriba del avión?</strong></span></p><br><p style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;">Es importante que siempre el dispositivo esté en modo avión cuando estas volando. En la mayoría de los dispositivos, el GPS está activo en modo avión. Para chequear si el GPS está prendido, andá a la sección configuración. Un truco para que el GPS agarre bien, es poner el dispositivo lo más cerca de la ventana para poder captar la señal de los satélites.</span><br></p><p style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;"><strong>¿Que es el GPS?</strong></span></p><p style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;">El GPS es un Sistema Global de Navegacion por Satelite que usa la ayuda de varios satélites que están dando vuelta a la tierra. Para calcular la ubicación, el dispositivo receptor debe recibir la señal de por lo menos 4 satélites. Dependiendo del cuanto tarda en llegar la señal en llegar a cada satélite y cierta información del satélite (como su velocidad, ubicación) se consigue la ubicación exacta. El sistema GPS, el cual tienen la mayoria de los dispositivos móviles fue desarrollado por el Departamento de Defensa de los Estados Unidos. Existen otro sistemas, como el GLONASS desarrolla por la Federación Rusa, Galileo desarrollado por la Unión Europeo y Beidou desarrolla por la República Popular de China.</span><br></p><p style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;"><strong>¿Es seguro tener el GPS prendido mientras volás?</strong></span></p><p style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;">Tu dispositivo únicamente recibe señal de GPS de los satelites que estan dando vuelta a la tierra. Por lo tanto no envia ninguna señal como para afectar al sistema de navegacion del avión. Por eso es importante que tengas el dispositivo en modo avión.</span><br></p><p style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;"><strong>¿Como borrar las rutas descargadas?</strong></span></p><p style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;">Para borrar las rutas descargadas, selecciona la opción “mar</span><br></p><br><p style="text-align:left;"><span style="color: rgb(0,0,0);background-color: transparent;font-size: 11pt;font-family: Arial;"><strong>¿Qué información se descarga cuando seleccionó una ruta?</strong></span><strong><br></strong></p>`
}

const originOne = {
  address: 'Buenos Aires'
}

const destinationOne = {
  address: 'Buenos Aires'
}

const originTwo = {
  address: 'El Calafate, Argentina'
}

const destinationTwo = {
  address: 'El Calafate, Argentina'
}

const originThree = {
  address: 'Paraná, Entre Rios'
}

const destinationThree = {
  address: 'Paraná, Entre Rios'
}

const originFour = {
  address: 'San Miguel de Tucuman, Tucuman'
}

const destinationFour = {
  address: 'San Miguel de Tucuman, Tucuman'
}

const agent = session(app);

const credentials = {
  email: 'valid@email.com',
  password: 'validPassword',
};


const init = db.sync({ force: true })
  .then(() => User.create(credentials))
  .then((newUser) => {
    return agent.post('/auth/login').send(credentials);
  });

const setUp = init.then(() => Trip.create(aTrip))
  .then(()=> skyspotsArrayFinal.map(skyspot => Skyspot.create(skyspot)))
  .then(() => Origin.create(originOne))
  .then(() => Destination.create(destinationOne))
  .then(() => Origin.create(originTwo))
  .then(() => Destination.create(destinationTwo))
  .then(() => Origin.create(originThree))
  .then(() => Destination.create(destinationThree))
  .then(() => Origin.create(originFour))
  .then(() => Destination.create(destinationFour))   
  .then(()=> Trip.create({
    name: 'Test solo con ids',
    originId: 1,
    destinationId: 2}))
  .then(trip => trip.setSkyspots([1,2,3,4,9]))
  .then(()=> Trip.create({
    name: 'Test trip 2',
    originId: 1,
    destinationId: 4}))
  .then(trip => trip.setSkyspots([1,2,3,4]))
  .then(()=> Terminos.create(seedTerminos))

module.exports = setUp;