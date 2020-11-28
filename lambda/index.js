const Alexa = require('ask-sdk-core');
const persistence = require('./persistence');
const interceptors = require('./interceptors');
const moment = require('moment-timezone'); // will help us do all the birthday math

// these are the permissions needed to get the first name
const GIVEN_NAME_PERMISSION = ['alexa::profile:given_name:read'];

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
        

        let speechText;
         if(sessionAttributes['name']){
             
            const name = sessionAttributes['name'];
            speechText = requestAttributes.t('WELCOME_MSG',  name,nombre);

         }else{
             return handlerInput.responseBuilder
            .speak(requestAttributes.t('NAME_PERMISO'))
            .getResponse();  
         }

        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
        
    }
};

const RegisterBirthdayIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RegisterBirthdayIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;

        const day = intent.slots.day.value;
        const month = intent.slots.month.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        const monthName = intent.slots.month.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        const year = intent.slots.year.value;
        
        sessionAttributes['day'] = day;
        sessionAttributes['month'] = month;
        sessionAttributes['monthName'] = monthName;
        sessionAttributes['year'] = year;
        
        const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';

        return handlerInput.responseBuilder
            .speak(requestAttributes.t('REGISTER_MSG', name, day, monthName, year))
            .getResponse();
    }
};

const SayBirthdayIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'SayBirthdayIntent';
    },
    async handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();

        const day = sessionAttributes['day'];
        const month = sessionAttributes['month'];
        const year = sessionAttributes['year'];
        const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';
        
        let speechText;
        if(day && month && year){
            const serviceClientFactory = handlerInput.serviceClientFactory;
            const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
    
            // let's try to get the timezone via the UPS API
            // (no permissions required but it might not be set up)
            let timezone;
            try {
                const upsServiceClient = serviceClientFactory.getUpsServiceClient();
                timezone = await upsServiceClient.getSystemTimeZone(deviceId);
            } catch (error) {
                return handlerInput.responseBuilder
                    .speak(requestAttributes.t('NO_TIMEZONE_MSG'))
                    .getResponse();
            }
            console.log('Got timezone: ' + timezone);
            timezone = timezone ? timezone : 'Europe/Paris'; // so it works on the simulator, replace with your time zone
            const today = moment().tz(timezone).startOf('day');
            const wasBorn = moment(`${month}/${day}/${year}`, "MM/DD/YYYY").tz(timezone).startOf('day');
            const nextBirthday = moment(`${month}/${day}/${today.year()}`, "MM/DD/YYYY").tz(timezone).startOf('day');
            if(today.isAfter(nextBirthday)){
                nextBirthday.add('years', 1);
            }
            const age = today.diff(wasBorn, 'years');
            const daysLeft = nextBirthday.startOf('day').diff(today, 'days'); // same days returns 0
            speechText = requestAttributes.t('SAY_MSG', name, daysLeft, age + 1);
            if(daysLeft === 0) {
                speechText = requestAttributes.t('GREET_MSG', name, age);
            }
        } else {
            speechText = requestAttributes.t('MISSING_MSG');
        }
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

const SayMoneyIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'SayMoneyIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        
        const total_money = sessionAttributes['total_money'];

        const name = sessionAttributes['name'] ? sessionAttributes['name'] + '. ' : '';

        let speechText;
        if(total_money){
            speechText = requestAttributes.t('TOTAL_MSG', total_money) + requestAttributes.t('OVERWRITE_MONEY_MSG');
            
            
        } else {
            speechText = requestAttributes.t('MISSING_MONEY_MSG');
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
    
};

const RegisterMoneyMounthIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RegisterMoneyMounthIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        
        const total_money = intent.slots.total_money.value;
        
        sessionAttributes['total_money'] = total_money;
        
        
        const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';
        let speechText;
        if(total_money<=0){
            speechText = requestAttributes.t('RED_NUMBERS_MSG',  name);

        }else{
            speechText = requestAttributes.t('REGISTER_MONEY_MSG', total_money);
        
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();

    }
};

const BuyIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'BuyIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;

        //const total_money = intent.slots.total_money.value;
        const gasto = intent.slots.gasto.value;
        
        
        //var dinero_restante = total_money - gasto;
        sessionAttributes['total_money'] = sessionAttributes['total_money']-gasto;
        sessionAttributes['gasto'] = gasto;
       
        const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';
        
        if(sessionAttributes['total_money'] <= 0){
            const speechText = requestAttributes.t('RED_NUMBERS_MSG',  name);
            return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
        }
            
        const speechText = requestAttributes.t('TOTAL_MSG', sessionAttributes['total_money']);
            
        return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
        
    }
};

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
                .getResponse();
            }
        //console.log('Got timezone: ' + timezone);
        timezone = timezone ? timezone : 'Europe/Paris'; 
        
        
        const nombre = intent.slots.nom_llamada.value;//Cojo el nombre que me ha dado
        
            
        sessionAttributes['nombreLlamada'] = nombre;//Lo guardo en la sesion
        
        sessionAttributes['dias_sin_hablar'] = moment().tz(timezone).startOf('day');//Guardo el dia actual
            
        return handlerInput.responseBuilder//aqui digo que lo he registrado y cierro
                .speak(requestAttributes.t('NOMBRE_REGISTRADO_MSG'))//Informo de que se ha registrado correctamente
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
                .getResponse();
            }
            
        timezone = timezone ? timezone : 'Europe/Paris'; 
        
        const nombre = sessionAttributes['nombreLlamada'];//Cojo el nombre de los atributos de sesion
        
        let speechText= requestAttributes.t('REGISTRAR_NOMBRE_MSG');//En caso de que no este el nombre, se pedira que se registre el nombre
        
        
        if(nombre){//Si el nombre existe, se dirá los dias que llevan
            
            const today=moment().tz(timezone).startOf('day');//dia actual
            
            const diaLlamada = sessionAttributes['dias_sin_hablar'];
            
            const daysLeft = today.startOf('day').diff(diaLlamada, 'days');//dias que han pasado desde el primer dia hasta el actual
            
             speechText = requestAttributes.t(('DIAS_SIN_HABLAR_MSG'), daysLeft,nombre,nombre);
            
        }
        
        return handlerInput.responseBuilder
                    .speak(speechText)
                    .reprompt(speechText)
                    .getResponse();
            
    
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
                .getResponse();
            }
        //console.log('Got timezone: ' + timezone);
        timezone = timezone ? timezone : 'Europe/Paris'; 
      
        sessionAttributes['dias_sin_hablar'] = moment().tz(timezone).startOf('day');//Guardo el dia actual
        
        return handlerInput.responseBuilder
            .speak(requestAttributes.t('LLAMADA_HOY_MSG'))
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
            .speak(requestAttributes.t(('SIN_HABLAR_MSG'),nombre))
          .getResponse();
    }
}
    

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
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('ERROR_MSG');

        console.log(`~~~~ Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        RegisterBirthdayIntentHandler,
        SayBirthdayIntentHandler,
        SayMoneyIntentHandler,
        RegisterMoneyMounthIntentHandler,
        BuyIntentHandler,
        RegisterPersonCallIntentHandler,
        SayDaysWithoutCallIntentHandler,
        YesIntentHandler,
        NoIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
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


