const moment = require('moment-timezone'); // will help us do all the birthday math
const aplTemplates= require('../aplDocuments/aplTemplates.js');

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
            .speak(requestAttributes.t('REGISTER_MSG', name, day, monthName, year) + requestAttributes.t('HELP_OFERTA'))
            .reprompt(requestAttributes.t('REGISTER_MSG', name, day, monthName, year) + requestAttributes.t('HELP_OFERTA'))
            //.withShouldEndSession(true)
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
                    .withShouldEndSession(true)
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
            sessionAttributes['daysLeft'] = daysLeft;
            speechText = requestAttributes.t('SAY_MSG', name, daysLeft);
            if(daysLeft === 0) {
                //speechText = requestAttributes.t('GREET_MSG', name, age);
                return aplTemplates.getAplCumpleaños(handlerInput);
                /*return handlerInput.responseBuilder
                    .speak(speechText)
                    .withShouldEndSession(true)
                    .getResponse();*/
            }
        } else {
            speechText = requestAttributes.t('MISSING_MSG');
            return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
            
        }
        
        return aplTemplates.getAplNoCumpleaños(handlerInput);
        
        /*return handlerInput.responseBuilder
            .speak(speechText + requestAttributes.t('HELP_OFERTA'))
            .reprompt(speechText + requestAttributes.t('HELP_OFERTA'))
            //.withShouldEndSession(true)
            .getResponse();*/
            
    }
};

module.exports = {
    RegisterBirthdayIntentHandler,
    SayBirthdayIntentHandler
}