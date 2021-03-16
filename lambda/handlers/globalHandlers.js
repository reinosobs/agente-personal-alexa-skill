// Los permisos que necesito para obtener el nombre del usuario
const GIVEN_NAME_PERMISSION = ['alexa::profile:given_name:read'];

const launch = require('../aplDocuments/launchRequest');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const {attributesManager, serviceClientFactory, requestEnvelope} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();

        if(!sessionAttributes['name']){
            // let's try to get the given name via the Customer Profile API
            // don't forget to enable this permission in your skill configuratiuon (Build tab -> Permissions)
            // or you'll get a SessionEnndedRequest with an ERROR of type INVALID_RESPONSE
            try {
                const {permissions} = requestEnvelope.context.System.user;
                if(!permissions)
                    throw { statusCode: 401, message: 'No permissions available' }; // there are zero permissions, no point in intializing the API
                const upsServiceClient = serviceClientFactory.getUpsServiceClient();
                const profileName = await upsServiceClient.getProfileGivenName();
                if (profileName) { // the user might not have set the name
                  //save to session and persisten attributes
                  sessionAttributes['name'] = profileName;
                }

            } catch (error) {
                console.log(JSON.stringify(error));
                if (error.statusCode === 401 || error.statusCode === 403) {
                    // the user needs to enable the permissions for given name, let's send a silent permissions card.
                  handlerInput.responseBuilder.withAskForPermissionsConsentCard(GIVEN_NAME_PERMISSION);
                }
            }
        }
        
        const nombre = sessionAttributes['nombreLlamada'] ? sessionAttributes['nombreLlamada']+'. ' : '';//Cojo el nombre de los atributos de sesion
        
        
        let speechText;//frase para usuario antiguo
        let speechText_New;//frase para un nuevo usuario
        if(sessionAttributes['name']){
             
            const name = sessionAttributes['name'];
            speechText = requestAttributes.t('WELCOME_MSG',  name,nombre);
            speechText_New = requestAttributes.t('NEW_WELCOME_MSG',  name);
            
        }else{
             return handlerInput.responseBuilder
            .speak(requestAttributes.t('NAME_PERMISO'))
            .withShouldEndSession(true)
            .getResponse();  
        }
        
        
        if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.2',
                document: launch,
                datasources: {
                        launchData: {
                            type: 'object',
                            properties: {
                                headerTitle: "Mi agente personal",
                            },
                        },
                    },
                });
            
        }
      
        
        
        if(sessionAttributes['nombreLlamada'] ||  sessionAttributes['estado'] || sessionAttributes['total_money'] || sessionAttributes['day']){//Si el usuario tiene algun dato guardado, significa que no es nuevo
             return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
            
        }else{//Si el usuario no tiene ningun dato guardado sobre él, significa que es nuevo
            
            return handlerInput.responseBuilder
            .speak(speechText_New)
            .reprompt(speechText)
            .getResponse();
        }
    }
};

const VolverAtrasHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'VolverAtrasIntent')
    },
    async handle(handlerInput) {
        
        
        if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.2',
                document: launch,
                datasources: {
                        launchData: {
                            type: 'object',
                            properties: {
                                headerTitle: "Mi agente personal",
                            },
                        },
                    },
                });
            
        }

            
        return handlerInput.responseBuilder
            .speak("¿En qué te puedo ayudar?. Recuerda, puedes decir, Ayuda, si no sabes como continuar")
            .reprompt("¿En qué te puedo ayudar?. Recuerda, puedes decir, Ayuda, si no sabes como continuar")
            .getResponse();

    }
};



const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('ERROR_MSG');

        console.log(`Error stack: ${error.stack}`);

        console.log(`~~~~ Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const HelpIntentHandler = {
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
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();

        const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';

        const speechText = requestAttributes.t('GOODBYE_MSG', name);

        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('FALLBACK_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = requestAttributes.t('REFLECTOR_MSG', intentName);

        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


module.exports = {
    LaunchRequestHandler,
    ErrorHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler,
    VolverAtrasHandler
    //TouchIntentHandler
};