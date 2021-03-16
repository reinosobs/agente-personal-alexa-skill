const Alexa = require('ask-sdk-core');
const moment = require('moment-timezone');
const aplTemplates= require('../aplDocuments/aplTemplates.js');

const RegisterPersonCallIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RegisterPersonCallIntent';
    },
    async handle(handlerInput) {
        const {attributesManager, serviceClientFactory, requestEnvelope} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const requestAttributes = attributesManager.getRequestAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
        
        let timezone;
            
        try {
            const upsServiceClient = handlerInput.serviceClientFactory.getUpsServiceClient();
            timezone = await upsServiceClient.getSystemTimeZone(deviceId);
        } catch (error) {
            return handlerInput.responseBuilder
                .speak(requestAttributes.t('NO_TIMEZONE_MSG'))
                .withShouldEndSession(true)
                .getResponse();
            }
        //console.log('Got timezone: ' + timezone);
        timezone = timezone ? timezone : 'Europe/Paris'; 
        
        
        const nombre = intent.slots.nom_llamada.value;//Cojo el nombre que me ha dado
        
            
        sessionAttributes['nombreLlamada'] = nombre;//Lo guardo en la sesion
        
        sessionAttributes['dias_sin_hablar'] = moment().tz(timezone).startOf('day');//Guardo el dia actual
        
        sessionAttributes['total_dias']= 0;
        
        const daysLeft = sessionAttributes['total_dias'];
        
        aplTemplates.getAplTiempoSinHablar(handlerInput);
            
        return handlerInput.responseBuilder//aqui digo que lo he registrado y cierro
                .speak(requestAttributes.t('NOMBRE_REGISTRADO_MSG')+ requestAttributes.t('HELP_OFERTA'))//Informo de que se ha registrado correctamente
                .reprompt(requestAttributes.t('NOMBRE_REGISTRADO_MSG') + requestAttributes.t('HELP_OFERTA'))
                //.withShouldEndSession(true)
                .getResponse();
            
       
    }
};

const SayDaysWithoutCallIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'SayDaysWithoutCallIntent';
    },
    async handle(handlerInput) {
        const {attributesManager, serviceClientFactory, requestEnvelope} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const requestAttributes = attributesManager.getRequestAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
        let timezone;
            
        try {
            const upsServiceClient = handlerInput.serviceClientFactory.getUpsServiceClient();
            timezone = await upsServiceClient.getSystemTimeZone(deviceId);
        } catch (error) {
            return handlerInput.responseBuilder
                .speak(requestAttributes.t('NO_TIMEZONE_MSG'))
                .withShouldEndSession(true)
                .getResponse();
            }
            
        timezone = timezone ? timezone : 'Europe/Paris'; 
        
        const nombre = sessionAttributes['nombreLlamada'];//Cojo el nombre de los atributos de sesion
        
        //let speechText= requestAttributes.t('REGISTRAR_NOMBRE_MSG');//En caso de que no este el nombre, se pedira que se registre el nombre
        
        
        if(nombre){//Si el nombre existe, se dirá los dias que llevan
            
            const today=moment().tz(timezone).startOf('day');//dia actual
            
            const diaLlamada = sessionAttributes['dias_sin_hablar'];
            
            const daysLeft = today.startOf('day').diff(diaLlamada, 'days');//dias que han pasado desde el primer dia hasta el actual
            
            sessionAttributes['total_dias']=daysLeft;
            
            //speechText = requestAttributes.t(('DIAS_SIN_HABLAR_MSG'), daysLeft,nombre,nombre);
            return aplTemplates.getAplTiempoSinHablar(handlerInput);
            
        }
        
        /*return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();*/
        
        return aplTemplates.getAplTiempoSinHablar(handlerInput);
        
    } 
    
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
    },
    async handle(handlerInput) {
        const {attributesManager, serviceClientFactory, requestEnvelope} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const requestAttributes = attributesManager.getRequestAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
        
        let timezone;
            
        try {
            const upsServiceClient = handlerInput.serviceClientFactory.getUpsServiceClient();
            timezone = await upsServiceClient.getSystemTimeZone(deviceId);
        } catch (error) {
            return handlerInput.responseBuilder
                .speak(requestAttributes.t('NO_TIMEZONE_MSG'))
                .withShouldEndSession(true)
                .getResponse();
            }
        //console.log('Got timezone: ' + timezone);
        timezone = timezone ? timezone : 'Europe/Paris'; 
      
        sessionAttributes['dias_sin_hablar'] = moment().tz(timezone).startOf('day');//Guardo el dia actual
        
        return handlerInput.responseBuilder
            .speak(requestAttributes.t('LLAMADA_HOY_MSG')+ requestAttributes.t('HELP_OFERTA'))
            .reprompt(requestAttributes.t('LLAMADA_HOY_MSG') + requestAttributes.t('HELP_OFERTA'))
            //.withShouldEndSession(true)
            .getResponse();
    }
}

const NoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
        const {attributesManager, serviceClientFactory, requestEnvelope} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        
        const sessionAttributes = attributesManager.getSessionAttributes();
      
        const nombre = sessionAttributes['nombreLlamada'];
      
        return handlerInput.responseBuilder
            .speak(requestAttributes.t('NO_MSG')+ requestAttributes.t('HELP_OFERTA'))
            .reprompt(requestAttributes.t('NO_MSG') + requestAttributes.t('HELP_OFERTA'))
            //.withShouldEndSession(true)
            .getResponse();
    }
}

module.exports = {
    YesIntentHandler,
    NoIntentHandler,
    RegisterPersonCallIntentHandler,
    SayDaysWithoutCallIntentHandler
}
