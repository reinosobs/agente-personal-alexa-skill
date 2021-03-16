/*const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};*/

const help = require('../aplDocuments/helpRequest');

const HelpCumpleHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AyudaCumple';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('HELP_CUMPLEAÑOS');
        
        if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.2',
                document: help,
                datasources: {
                        launchData: {
                            type: 'object',
                            properties: {
                                headerTitle: "Mi agente personal",
                                mainText: "Puedes decir: \"Registra mi fecha de nacimiento\" o \"Mi cumpleaños\" para usar mi funcionalidad de cumpleaños" ,
                                hintString: "Di: \"Ver opciones\" para volver atrás"
                            },
                        },
                    },
                });
            
        }
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const HelpGastosHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AyudaGastos';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('HELP_GASTOS');

        if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.2',
                document: help,
                datasources: {
                        launchData: {
                            type: 'object',
                            properties: {
                                headerTitle: "Mi agente personal",
                                mainText: "Puedes decir: \"Registra mi límite de gastos\", \"Cuanto me queda\", \"Registra un nuevo gasto\" o \"Registra un nuevo ingreso\" para usar mi funcionalidad del límite de gastos",
                                hintString: "Di: \"Ver opciones\" para volver atrás"
                            },
                        },
                    },
                });
            
        }
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const HelpTiempoHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AyudaTiempo';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('HELP_TIEMPO');

        if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.2',
                document: help,
                datasources: {
                        launchData: {
                            type: 'object',
                            properties: {
                                headerTitle: "Mi agente personal",
                                mainText: "Puedes decir: \"Registra un nuevo nombre\" o \"Cuantos días llevo sin hablar con\" seguido del nombre de la persona para usar mi funcionalidad de tiempo sin hablar",
                                hintString: "Di: \"Ver opciones\" para volver atrás"
                            },
                        },
                    },
                });
            
        }
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const HelpConsejoHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AyudaConsejo';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('HELP_CONSEJO');
        
        if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.2',
                document: help,
                datasources: {
                        launchData: {
                            type: 'object',
                            properties: {
                                headerTitle: "Mi agente personal",
                                mainText: "Puedes decir: \"Necesito un consejo\" o \"Dame un consejo\" y si desea otro consejo diga, \"Otro consejo\" para usar mi funcionalidad de consejos",
                                hintString: "Di: \"Ver opciones\" para volver atrás"
                            },
                        },
                    },
                });
            
        }
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};



module.exports = {
    //HelpIntentHandler,
    HelpCumpleHandler,
    HelpGastosHandler,
    HelpTiempoHandler,
    HelpConsejoHandler
    
};