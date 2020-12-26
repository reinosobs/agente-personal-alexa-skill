// positive sound for birthday greeting from Alexa Sound Library
// https://developer.amazon.com/docs/custom-skills/ask-soundlibrary.html
const POSITIVE_SOUND = `<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02'/>`;
// congratulations greeting (speechcon)
// https://developer.amazon.com/docs/custom-skills/speechcon-reference-interjections-spanish.html
const GREETING_SPEECHCON = `<say-as interpret-as="interjection">vaya vaya</say-as>`;

const NO_BIRTHDAY_SOUND = `<say-as interpret-as="interjection">feliz no-cumpleaños</say-as>`;

const BIRTHDAY_SOUND = `<say-as interpret-as="interjection">felicidades</say-as>`;

const pss_SOUND = `<say-as interpret-as="interjection">pss</say-as>`;

const no_SOUND= `<say-as interpret-as="interjection">oh no</say-as>`;

const oeh_SOUND= `<say-as interpret-as="interjection">oeh oeh oeh oeh</say-as>`;

module.exports = {
    es: {
        translation: {
            WELCOME_MSG: 'Hola %s, ¿qué tal estás?. Soy tu agente personal y puedo ayudarte para saber cuantos días quedan para el día de tu cumpleaños, gestionar tu límite de gastos mensuales o, saber el tiempo que llevas sin hablar con %s ¿En qué deseas que te ayude?',
            REGISTER_MSG: '%s Recordaré que tu fecha de cumpleaños es el %s de %s de %s. ',
            SAY_MSG: NO_BIRTHDAY_SOUND+ ' %s, aun quedan %s días para que cumplas %s años.',
            MISSING_MSG: no_SOUND+ ' Parece que aun no me has dicho tu fecha de cumpleaños. Prueba decir, registra mi cumpleaños',
            OVERWRITE_MSG: 'Si quieres cambiar la fecha puedes decir, registra mi cumpleaños. o decirme directamente una fecha. ',
            HELP_MSG: 'Esta skill te puede recordar cuantos dias quedan para tu cumpleaños, controlar tus gastos mensuales o el tiempo que llevas sin hablar con una persona. Si lo deseas tambien puedes decirme como estas y yo te dare alguno de los consejos que me sé. '+
            ' ¿En qué te puedo ayudar?',
            GOODBYE_MSG: ['Hasta luego %s! ', 'Adios %s! ', 'Hasta pronto %s! ', 'Nos vemos %s! '],
            REFLECTOR_MSG: 'Acabas de activar {{intent}}',
            FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez. ',
            ERROR_MSG: no_SOUND+' Lo siento, ha habido un problema. Por favor inténtalo otra vez. ',
            NO_TIMEZONE_MSG: no_SOUND+ ' No he podido determinar tu zona horaria. Verifica la configuración de tu dispositivo e inténtalo otra vez.',
            UNSUPPORTED_DEVICE_MSG: 'Este dispositivo no soporta la operación que estás intentando realizar. ',
            CANCEL_MSG: 'Vale. Lo cancelamos. ',
            GREET_MSG: BIRTHDAY_SOUND+' %s! Hoy cumples %s años! '+oeh_SOUND,
            REGISTER_MONEY_MSG: 'Todavía te quedan %s euros por gastar este mes. ',
            TOTAL_MSG: 'Aún te quedan %s euros. ',
            RED_NUMBERS_MSG: GREETING_SPEECHCON + ' %s, te has gastado todo el dinero que tenias previsto de este mes!. Debes decir, registra mis gastos mensuales para guardar la cantidad de nuevo o si no quieres, dí, salir',
            MISSING_MONEY_MSG: GREETING_SPEECHCON+ ' Aun no me has dicho tu tope de gastos del mes.  Tienes que decir, registra mis gastos mensuales y yo te guardaré el límite de gastos que quieres. ',
            OVERWRITE_MONEY_MSG: 'Si quieres puedo restar algun gasto que hayas tenido o puedo añadir un ingreso a tu límite de gastos. También si quieres registrar de nuevo el gasto mensual, di registra mis gastos mensuales',
            NAME_PERMISO: 'Hola, la skill mi agente personal necesita tener acceso a su nombre para llamarle por su nombre en futuras ocasiones. Diríjase a su aplicación Alexa, acceda a la configuración de la skill y concédame permisos para conocer su nombre .',
            REPETIR_NOMBRE_MSG: no_SOUND+' aún no me has dicho como es el nombre de la persona que quieres que te recuerde. Por ejemplo, diga el nombre es Enrique',
            NOMBRE_REGISTRADO_MSG: 'Se ha registrado correctamente su nombre. Inicio el contador de días a 0 para que puedas saber los días que han pasado desde la última vez.',
            DIAS_SIN_HABLAR_MSG:'Han pasado %s dias desde la última vez que hablaste con %s. Recuerda que si deseas cambiar el nombre de la persona que desees que te recuerde, solo debes de decir. Registrar un nuevo nombre y decir el nombre nuevo.¿Hablaste con %s hoy?',
            SIN_HABLAR_MSG: 'Vaya, espero que puedas hablar con %s pronto.',
            LLAMADA_HOY_MSG:'Estupendo!. Me lo apunto entonces.',
            ESTADO_MALO:
            [
                'Porque no te das una vuelta y asi te da un poco el aire',
                'Escucha un poco de musica y desconecta',
                'A mi para despejarme, me ayuda ponerme una serie que tengo a medias o empezar una nueva, que tenía ganas de empezar. Mi serie favorita es Peaky Blinders, me encanta lo listo que es John',
                'Intenta dormir, descansar un ratito te vendría bien.',
                'A lo mejor te vendria bien viajar a tu lugar favorito.',
                'De peores hemos salido',
                'Date un capricho, pide algo para cenar',
                'Date un baño calentito, eso te ayudará',
                'Entonces hoy toca mantita, peli y palomitas',
                'Si pudiera te daba un achuchón',
                'Nada que no arregle una buena canción',
              
            ],
            ESTADO_BUENO:
            [
                'Eso hay que celebrarlo! tomate algo por mí',
                'Comparte esa alegria con tu gente',
                'Genial! Publicalo en tu muro de Facebook para que lo sepa todo el mundo',
                'Debes de decirselo a la persona que más te importa',
                oeh_SOUND+'. ',
                'Ponte musica y a bailar!',
                'Hoy te mereces un premio, date un capricho',
                'Si pudiera te daba un achuchón',
                'Nada que no arregle una buena canción',
            ],
            ESTADO_ABURRIDO:
            [ 
                'Ponte a jugar a tu videojuego favorito.',
                'Podrías leer un rato',
                'Llama a algun amigo o amiga, seguro que ellos están igual',
                'Netflix and chill',
                'Cuidate un poquito, date un baño con un espuma y una copa de vino',
                'Ponte la canción Olé de Camela',
                'Nada que no arregle una buena canción',
            ],
            ESTADO_ENFADO:
            [ 
                'Debes de relajarte y pensar bien las cosas.',
                'Respira e inspira 10 veces seguidas, para calmarte y pensar con claridad que ha pasado',
                'No te nubles y piensa en la solución al problema',
                'Si pudiera te daba un achuchón',
                'Nada que no arregle una buena canción',
                'Todo pasa, lo malo también'
            ]
        }
    }
}
