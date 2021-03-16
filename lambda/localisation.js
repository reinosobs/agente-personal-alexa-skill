// positive sound for birthday greeting from Alexa Sound Library
// https://developer.amazon.com/docs/custom-skills/ask-soundlibrary.html
// Puedo darte un consejo si estás mal, bien, aburrido o aburrida, enfadado o enfadada, o si tu estado de salud no es bueno.
//'Soy capaz de recordarte cuantos dias quedan para tu cumpleaños, controlar tu límite de gastos mensuales o el tiempo que llevas sin hablar con una persona. Si lo deseas, ' +'también puedes decirme como estás y yo te daré alguno de los consejos que me sé. ¿En qué te puedo ayudar?',
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
            //Mensajes de bienvenida
            NEW_WELCOME_MSG: ' Hola %s. Soy tu agente personal y puedo ayudarte para saber cuantos días quedan para el día de tu cumpleaños, gestionar tu límite de gastos mensuales o, saber el tiempo que llevas '
            + 'sin hablar con una persona. Si lo deseas, también puedes decirme como estás y yo te daré alguno de los consejos que me sé. Si no sabes como empezar prueba a decir Ayuda. ¿En qué deseas que te ayude?',
            WELCOME_MSG: 'Hola de nuevo %s. Soy tu agente personal. ¿en qué puedo ayudarte?. Si necesitas ayuda, di: Ayuda.',//y puedo ayudarte para saber cuantos días quedan para el día de tu cumpleaños, gestionar tu límite de gastos mensuales o, saber el tiempo que llevas sin hablar con %s ¿En qué deseas que te ayude?',
            //Mensajes de la funcionalidad cumpleaños
            REGISTER_MSG: 'Genial. Ya me he aprendido el día de tu cumpleaños',
            SAY_MSG_SGL: NO_BIRTHDAY_SOUND+ ' %s, aun te queda %s día para que cumplas un año más.',
            SAY_MSG: NO_BIRTHDAY_SOUND+ ' %s, aun te quedan %s días para que cumplas un año más.',
            MISSING_MSG: 'Vaya, parece que aún no me has dicho tu fecha de nacimiento. Prueba decir, registra mi fecha de nacimiento',
            OVERWRITE_MSG: 'Si quieres cambiar la fecha puedes decir, registra mi cumpleaños. o decirme directamente una fecha. ',
            GREET_MSG: oeh_SOUND+' ¡FELIZ CUMPLEAÑOS %s!.',
            NO_BIRTHDAY_APL_SGL: 'Queda %s día para tu próximo cumpleaños',
            NO_BIRTHDAY_APL: 'Quedan %s días para tu próximo cumpleaños',
            NO_DATE_BIRTHDAY: "No conozco aun los días que quedan para su cumpleaños. Por favor, diga 'Mi cumpleaños' y podré mostrarle los días que quedan para su cumpleaños",
            //Mensajes de ayuda
            HELP_OFERTA: '  ¿En qué más te puedo ayudar?',
            HELP_MSG: 'Puedo darte algunos consejos, decirte cuánto queda para tu próximo cumpleaños, gestionar tu límite de gastos mensuales y recordarte el tiempo que llevas sin hablar con una persona. Si no sabes como utilizar alguna de mis funcionalidades.'
            +' Di, "ayuda sobre", seguido de la funcionalidad que tengas dudas y tendrá una ayuda mas completa sobre la funcionalidad indicada',
            HELP_CUMPLEAÑOS: 'Di, "Registra mi fecha de nacimiento" para que yo la recuerde y sepa tu día de cumpleaños y la edad que vas a cumplir. Una vez me la haya aprendido,'+
            ' di "Mi cumpleaños" y te felicitaré en caso de que sea tu cumpleaños o te diré los días que quedan para este, en caso de no ser tu cumpleaños. ¿Qué quieres hacer?',
            HELP_GASTOS: 'Di "registra mi límite de gastos" para guardar tu límite de gastos mensuales. Una vez guardado, puedes elegir entre las siguientes opciones.'+
            ' Puedes decir, "cuánto me queda", para saber el límite actual que aún dispones. o decir, "registra un nuevo gasto", para restar una cantidad. '+
            'o bien decir, "registra un nuevo ingreso", para sumar una cantidad. ¿Qué quieres hacer?',
            HELP_TIEMPO: 'Di, "Registra un nuevo nombre" para guardar el nombre de la persona que quieres que te recuerde los días que han pasado desde la última vez que la llamaste.'+
            ' Si ya está registrada, di "cuantos días llevo sin hablar con", seguido del nombre de la persona y te diré los días que han pasado '
            + '. Si a la pregunta, responde Sí, el contador volverá a 0 días, y si responde No, el contador seguirá corriendo. ¿Qué quieres hacer?',
            HELP_CONSEJO: 'Me sé algunos consejos que pueden servirte de ayuda. Puedes decir, "necesito un consejo", o, "dame un consejo ", seguido del estado anímico actual y te daré un consejo acorde a tu estado. Si quieres otro consejo, solo debes de decir "Otro consejo". ¿Qué quieres hacer?',
            //Mensaje de despedida y mensajes base
            GOODBYE_MSG: ['Hasta luego %s! ', 'Adios %s! ', 'Hasta pronto %s! ', 'Nos vemos %s! '],
            REFLECTOR_MSG: 'Acabas de activar %s',
            FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez. ',
            ERROR_MSG: no_SOUND+'. Ha habido un problema. Por favor inténtalo otra vez. ',
            NO_TIMEZONE_MSG: no_SOUND+ ' No he podido determinar tu zona horaria. Verifica la configuración de tu dispositivo e inténtalo otra vez.',
            UNSUPPORTED_DEVICE_MSG: 'Este dispositivo no soporta la operación que estás intentando realizar. ',
            CANCEL_MSG: 'Vale. Lo cancelamos. ',
            //Mensajes de la funcionalidad del límite de gastos
            REGISTER_MONEY_MSG: 'Todavía te quedan %s euros por gastar este mes. ',
            REGISTER_MONEY_MSG_SGL: 'Todavía te queda %s euro por gastar este mes. ',
            TOTAL_MSG: 'Aún te quedan %s euros. ',
            SLG_TOTAL_MSG: 'Aún te queda %s euro. ',
            RED_NUMBERS_MSG: GREETING_SPEECHCON + ' %s, te has gastado todo el dinero que tenias previsto de este mes!. Debes decir, registra mis gastos mensuales para guardar la cantidad de nuevo o si no quieres, dí, salir',
            MISSING_MONEY_MSG: ' Aun no me has dicho tu tope de gastos del mes.  Tienes que decir, registra mis gastos mensuales. ',
            OVERWRITE_MONEY_MSG: 'Si quieres que reste algun gasto que hayas tenido o añada un ingreso a tu límite de gastos, solo debes de decir, "registra un nuevo gasto". o. "registra un nuevo ingreso". También si quieres registrar de nuevo el gasto mensual, di registra mis gastos mensuales',
            //Mensaje para informar la necesidad de permisos
            NAME_PERMISO: 'Hola, la skill mi agente personal necesita tener acceso a su nombre para llamarle por su nombre en futuras ocasiones. Diríjase a su aplicación Alexa, acceda a la configuración de la skill y concédame permisos para conocer su nombre .',
            //Mensajes para la funcionalidad de tiempo sin hablar con alguien
            REGISTRAR_NOMBRE_MSG: 'Aún no me has dicho como es el nombre de la persona que quieres que te recuerde. Por ejemplo, diga, registra el nombre de Alberto',
            NOMBRE_REGISTRADO_MSG: 'Se ha registrado correctamente su nombre. Inicio el contador de días a 0 para que puedas saber los días que han pasado desde la última vez.',
            DIAS_SIN_HABLAR_MSG:'Han pasado %s dias desde la última vez que hablaste con %s. Recuerda que si deseas cambiar el nombre de la persona que desees que te recuerde, solo debes de decir. Registrar un nuevo nombre. ¿Hablaste con %s hoy?',
            NO_MSG: 'Vale. Entonces.',
            LLAMADA_HOY_MSG:'Estupendo!. Me lo apunto entonces.',
            //Mensajes para la funcionalidad de los consejos
            ESTADO_MALO:
            [
                '¿Qué te parece darte un paseo y así tomas un poco el aire?',
                'Escucha un poco de música y desconecta',
                'A mí, para despejarme, me ayuda ponerme una serie que tengo a medias o empezar una nueva, que tenía ganas de empezar. Mi serie favorita es Peaky Blinders, me encanta lo listo que es Tommy',
                'Intenta dormir, descansar un ratito te vendrá bien',
                'Yo creo que te vendría bien viajar a tu lugar favorito',
                'Date un capricho, pide algo para cenar',
                'Date un baño calentito, eso te ayudará',
                'Entonces hoy toca mantita, peli y palomitas',
                'Si pudiera te daba un achuchón',
                'Nada que no arregle una buena canción. En mis momentos malos, la canción Bella Ciao de Steve Aoki me pone súper contenta ',
                'Quizás algo de meditación o de música te hará sentir mejor',
                'Hacer deporte ayuda a despejar la cabeza, quizás podrías intentarlo',
                'Venga, anímate, ¿por qué no juegas un poco?. Prueba la skill de Akinator, es muy bueno leyendo la mente',
                'Recuerda los momentos más bonitos que has vivido, eso te hará sentir mejor',
                'Un chiste puede ayudarte. Se abre el telón y aparece una piedra muy muy pequeña… se cierra el telón. ¿Título de la peli? Rocky'
                
            ],
            ESTADO_BUENO:
            [
                '¡Eso hay que celebrarlo!',
                'Me alegro mucho por ti',
                'Comparte esa alegría con tu gente',
                'Hazte una foto para acordarte de este bonito día',
                '¡Genial! Publícalo en tu muro de Facebook para que lo sepa todo el mundo',
                'Compártelo con esa persona que más cerca está siempre',
                '¡Ponte musica y a bailar!',
                'Me alegro que seas tan feliz'
            ],
            ESTADO_ABURRIDO:
            [ 
                'En la aplicación de Alexa puedes encontrar muchas skills entretenidas',
                'Ponte a jugar a tu videojuego favorito',
                'Creo que dar un paseo te ayudará',
                'Podrías leer un rato',
                'Llama a algún amigo o amiga, seguro que ellos están igual',
                '¿Por qué no empiezas una nueva serie?',
                'Cuídate un poquito, date un baño con un espuma y una copa de vino',
                'Ponte la canción Olé de Camela, eso te animará',
                'Nada que no arregle una buena canción',
                'Quizás algo de meditación o de música te hará sentir mejor',
            ],
            ESTADO_ENFADO:
            [ 
                'Intenta relajarte y pensar con tranquilidad las cosas',
                'Respira e inspira 10 veces seguidas, para calmarte y pensar con claridad que ha pasado',
                'Intenta centrarte en piensar la solución al problema',
                'Si pudiera te daba un achuchón',
                'Escuchar música te ayudará',
                'Todo pasa, lo malo también',
                'Sal de casa y toma aire fresco',
                'Ocupa tu cabeza con otras, por ejemplo, a mi me ayuda hacer deporte',
                'Quizás algo de meditación o de música te hará sentir mejor'
            ],
            ESTADO_ENFERMO:
            [ 
                'Descansa y no te preocupes de nada más, lo más importante eres tú',
                'Tómate algo calentito y te sentirás un poco mejor',
                'Hoy es el día perfecto para ponerte tu película favorita y olvidarte de todo',
                'Hoy sería ideal seguir con la serie que estás viendo mientras descansas',
                'Cuidate mucho, espero que te recuperes pronto',
                'Debes de cuidarte y pronto te recuperarás. Ya lo verás',
                'Haz caso a las indicaciones de tu médico y espero que pronto te encuentres mejor'
            ],
            ESTADO_MIEDO:
            [ 
                'Distingue los miedos amigos de los miedos enemigos',
                'Tú no eres tu miedo',
                'Debes declarar la guerra a los miedos enemigos, que han invadido tu intimidad',
                'Es difícil combatir el miedo solo. Busca buenos aliados para que te ayuden',
                'Confío en ti, tu puedes con todo'
            ]
        }
    }
    

}