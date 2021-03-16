const Alexa = require('ask-sdk-core');
const persistence = require('./persistence');
const interceptors = require('./interceptors');
const moment = require('moment-timezone'); // will help us do all the birthday math

const GlobalHandlers= require('./handlers/globalHandlers.js');
const ConsejosHandlers = require('./handlers/consejosHandlers.js');
const MoneyHandlers = require('./handlers/moneyHandlers.js');
const BirthdayHandlers = require('./handlers/birthdayHandlers.js');
const CallHandlers= require('./handlers/callHandlers.js');
const AyudasHandlers = require('./handlers/ayudasHandlers.js');

const AplTemplates = require('./aplDocuments/aplTemplates.js');


const TouchIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
        && handlerInput.requestEnvelope.request.arguments.length > 0
        && handlerInput.requestEnvelope.request.arguments[0] === "cumple"
        || handlerInput.requestEnvelope.request.arguments[0] === "límite"
        || handlerInput.requestEnvelope.request.arguments[0] === "tiempo"
        || handlerInput.requestEnvelope.request.arguments[0] === "consejo";
    },
    async handle(handlerInput) {
        const {request} = handlerInput.requestEnvelope;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        
        let funcion = request.arguments[0];
        console.log('Touch event arguments: ' + JSON.stringify(funcion));
        
        if(request.arguments[0] === "cumple"){
            const day = sessionAttributes['day'];
            const month = sessionAttributes['month'];
            const year = sessionAttributes['year'];
            
            if(day && month && year){
                const serviceClientFactory = handlerInput.serviceClientFactory;
                const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
        
                let timezone;
                try {
                    const upsServiceClient = serviceClientFactory.getUpsServiceClient();
                    timezone = await upsServiceClient.getSystemTimeZone(deviceId);
                } catch (error) {
                    return handlerInput.responseBuilder
                        .speak(requestAttributes.t('NO_TIMEZONE_MSG'))
                        .withShouldEndSession(true)
                        .getResponse();
                }
                console.log('Got timezone: ' + timezone);
                timezone = timezone ? timezone : 'Europe/Paris'; // so it works on the simulator, replace with your time zone
                const today = moment().tz(timezone).startOf('day');
                const nextBirthday = moment(`${month}/${day}/${today.year()}`, "MM/DD/YYYY").tz(timezone).startOf('day');
                const days = nextBirthday.startOf('day').diff(today, 'days'); // same days returns 0
                sessionAttributes['daysLeft'] = days;
                if(days===0){
                    return AplTemplates.getAplCumpleaños(handlerInput);
                }else{
                    return AplTemplates.getAplNoCumpleaños(handlerInput);
                }
            
            }
        }
        else if (request.arguments[0] === "límite"){
            return AplTemplates.getAplLimiteGastos(handlerInput);
        }
        else if (request.arguments[0] === "tiempo"){
            //const diasSinHablar = sessionAttributes['total_dias'];
            return AplTemplates.getAplTiempoSinHablar(handlerInput);
        }
        else if (request.arguments[0] === "consejo"){
            //const estado=sessionAttributes['estado'];
            //return AplTemplates.getAplConsejo(handlerInput, estado);
            return handlerInput.responseBuilder
            .speak('¿Como te sientes?')
            //.withShouldEndSession(true)
            .getResponse();
        }
        
         return 0;
        }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        GlobalHandlers.LaunchRequestHandler,
        BirthdayHandlers.RegisterBirthdayIntentHandler,
        BirthdayHandlers.SayBirthdayIntentHandler,
        MoneyHandlers.SayMoneyIntentHandler,
        MoneyHandlers.RegisterMoneyMounthIntentHandler,
        MoneyHandlers.IngresoIntentHandler,
        MoneyHandlers.BuyIntentHandler,
        CallHandlers.RegisterPersonCallIntentHandler,
        CallHandlers.SayDaysWithoutCallIntentHandler,
        CallHandlers.YesIntentHandler,
        CallHandlers.NoIntentHandler,
        ConsejosHandlers.EstadoAnimicoIntentHandler,
        ConsejosHandlers.NuevoConsejoIntentHandler,
        AyudasHandlers.HelpCumpleHandler,
        AyudasHandlers.HelpGastosHandler,
        AyudasHandlers.HelpTiempoHandler,
        AyudasHandlers.HelpConsejoHandler,
        GlobalHandlers.VolverAtrasHandler,
        GlobalHandlers.HelpIntentHandler,
        GlobalHandlers.CancelAndStopIntentHandler,
        GlobalHandlers.FallbackIntentHandler,
        GlobalHandlers.SessionEndedRequestHandler,
        GlobalHandlers.IntentReflectorHandler,
        TouchIntentHandler)
    .addErrorHandlers(
            GlobalHandlers.ErrorHandler)
    .addRequestInterceptors(
            interceptors.LocalizationRequestInterceptor,
            interceptors.LoggingRequestInterceptor,
            interceptors.LoadAttributesRequestInterceptor)
    .addResponseInterceptors(
            interceptors.LoggingResponseInterceptor,
            interceptors.SaveAttributesResponseInterceptor)
    .withPersistenceAdapter(persistence.getPersistenceAdapter())
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();
