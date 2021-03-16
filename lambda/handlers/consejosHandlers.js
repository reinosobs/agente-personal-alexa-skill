const Alexa = require('ask-sdk-core');
const aplTemplates= require('../aplDocuments/aplTemplates.js');

const EstadoAnimicoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EstadoAnimicoIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;

        //const total_money = intent.slots.total_money.value;
        const estado = intent.slots.estado.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        
        sessionAttributes['estado']=estado;
        
        
        let speakOutput;
        
        if (estado === 'mal')
            speakOutput=requestAttributes.t('ESTADO_MALO');
        else if (estado === 'bien')
            speakOutput=requestAttributes.t('ESTADO_BUENO');
        else if (estado === 'aburrido')
            speakOutput=requestAttributes.t('ESTADO_ABURRIDO');
        else if (estado === 'enfadado')
            speakOutput= requestAttributes.t('ESTADO_ENFADO');
        else if (estado === 'enfermo')
            speakOutput= requestAttributes.t('ESTADO_ENFERMO');
        else if (estado === 'miedo')
            speakOutput= requestAttributes.t('ESTADO_MIEDO');
        else
            speakOutput= 'Lo siento, no entiendo como puedo ayudarte. Intentaré aprender mas formas para poderte ayudar en el futuro';
        
        
        return aplTemplates.getAplConsejo(handlerInput,speakOutput);
        
        /*return handlerInput.responseBuilder
            .speak(speakOutput + '. Si desea otro consejo, dí, otro consejo. ¿En qué más puedo ayudarte ?')
            //.withShouldEndSession(true)
            .reprompt(speakOutput)
            .getResponse();*/
    }
    
};

const NuevoConsejoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NuevoConsejoIntent';
        /*return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NuevoConsejoIntent';*/
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        
         //const total_money = intent.slots.total_money.value;
        const estadoAnimico = intent.slots.otro_estado.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        
        sessionAttributes['otro_estado']=estadoAnimico;
        
        
        let speakOutput;
        
        if (estadoAnimico === 'mal')
            speakOutput=requestAttributes.t('ESTADO_MALO');
        else if (estadoAnimico === 'bien')
            speakOutput=requestAttributes.t('ESTADO_BUENO');
        else if (estadoAnimico === 'aburrido')
            speakOutput=requestAttributes.t('ESTADO_ABURRIDO');
        else if (estadoAnimico === 'enfadado')
            speakOutput= requestAttributes.t('ESTADO_ENFADO');
        else if (estadoAnimico === 'enfermo')
            speakOutput= requestAttributes.t('ESTADO_ENFERMO');
        else if (estadoAnimico === 'miedo')
            speakOutput= requestAttributes.t('ESTADO_MIEDO');
        else
            speakOutput= 'Lo siento, no entiendo como puedo ayudarte. Intentare aprender mas formas para poderte ayudar en el futuro';
        
      
        return aplTemplates.getAplConsejo(handlerInput,speakOutput);
        /*return handlerInput.responseBuilder
            .speak(speakOutput + '. Si desea otro consejo, dí, otro consejo. ¿En qué más puedo ayudarte?')
            //.withShouldEndSession(true)
            .reprompt(speakOutput)
            .getResponse();*/
    }
}

module.exports = {
    EstadoAnimicoIntentHandler,
    NuevoConsejoIntentHandler
 
}