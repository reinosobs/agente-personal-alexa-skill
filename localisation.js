// positive sound for birthday greeting from Alexa Sound Library
// https://developer.amazon.com/docs/custom-skills/ask-soundlibrary.html
const POSITIVE_SOUND = `<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02'/>`;
// congratulations greeting (speechcon)
// https://developer.amazon.com/docs/custom-skills/speechcon-reference-interjections-spanish.html
const GREETING_SPEECHCON = `<say-as interpret-as="interjection">felicidades</say-as>`;

module.exports = {
    es: {
        translation: {
            WELCOME_MSG: 'Hola %s. Soy tu agente personal. ¿Qué opcion deseas?: Opción uno, mi cumpleaños. Opción dos, mis gastos. Opción tres, el tiempo sin hablar. y Opción cuatro, mis gustos personales.',
            REGISTER_MSG: '%s Recordaré que tu fecha de cumpleaños es el %s de %s de %s. ',
            SAY_MSG: '%s Te quedan %s días para que cumplas %s años. ',
            NOW_TURN_MSG: 'Hoy cumples {{count}} año! ',
            NOW_TURN_MSG_plural: 'Hoy cumples {{count}} años! ',
            MISSING_MSG: 'Parece que aun no me has dicho tu fecha de cumpleaños. Prueba decir, registra mi cumpleaños. o dime directamente una fecha. ',
            OVERWRITE_MSG: 'Si quieres cambiar la fecha puedes decir, registra mi cumpleaños. o decirme directamente una fecha. ',
            HELP_MSG: 'Esta skill te puede recordar cuantos dias quedan para tu cumpleaños, controlar tus gastos mensuales, el tiempo que llevas sin hablar con una persona o saber sobre tus gustos personales. Dime de las siguientes opciones, cual desea: Opción uno, mi cumpleaños. Opción dos, mis gastos. Opción tres, el tiempo sin hablar. y Opción cuatro, mis gustos personales.',
            GOODBYE_MSG: ['Hasta luego {{name}}! ', 'Adios {{name}}! ', 'Hasta pronto {{name}}! ', 'Nos vemos {{name}}! '],
            REFLECTOR_MSG: 'Acabas de activar {{intent}}',
            FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez. ',
            ERROR_MSG: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez. ',
            NO_TIMEZONE_MSG: 'No he podido determinar tu zona horaria. Verifica la configuración de tu dispositivo e inténtalo otra vez.',
            UNSUPPORTED_DEVICE_MSG: 'Este dispositivo no soporta la operación que estás intentando realizar. ',
            CANCEL_MSG: 'Vale. Lo cancelamos. ',
            GREET_MSG: 'Feliz cumpleaños %s! Hoy cumples %s! ',
            REGISTER_MONEY_MSG: 'Todavía te quedan %s euros por gastar este mes. ',
            TOTAL_MSG: 'Aún te quedan %s euros. ',
            RED_NUMBERS_MSG: GREETING_SPEECHCON + ' %s, te has gastado todo el dinero que tenias previsto de este mes!. Prueba decir, registra mis gastos mensuales o dime directamente la cantidad de dinero. ',
            MISSING_MONEY_MSG: 'Parece que aun no me has dicho tu tope de gastos del mes. Prueba decir, registra mis gastos mensuales o dime directamente la cantidad de dinero. ',
            OVERWRITE_MONEY_MSG: 'Si quieres restar algun gasto que hayas tenido puedes decir por ejemplo, me he gastado 20 euros o si quieres registrar de nuevo el gasto mensual, di registra mis gastos mensuales',
            NAME_PERMISO: 'Hola, la skill mi agente personal necesita tener acceso a su nombre para llamarle por su nombre en futuras ocasiones. Diríjase a su aplicación Alexa, acceda a la configuración de la skill y concédame permisos para conocer su nombre .',
            REPETIR_NOMBRE_MSG: 'Por favor, repita el nombre de la persona que desea que recuerde el tiempo que lleva sin hablar con él o ella',
            NOMBRE_REGISTRADO_MSG: 'Se ha registrado correctamente su nombre',
            DIAS_SIN_HABLAR_MSG:'Han pasado %s dias sin hablar con %s. ¿Hablaste con %s hoy?',
        }
    }
}