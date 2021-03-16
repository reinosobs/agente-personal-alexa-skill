function sum(input){//Sumar un nuevo ingreso a mi limite de  gastos
             
 if (toString.call(input) !== "[object Array]")
    return false;
    var total =  0;
    for(var i=0;i<input.length;i++)
    {                  
        if(isNaN(input[i])){
            continue;
        }
            total += Number(input[i]);
        }
    return total;
}

const aplTemplates= require('../aplDocuments/aplTemplates.js');

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
            //speechText = requestAttributes.t('TOTAL_MSG', total_money) + requestAttributes.t('OVERWRITE_MONEY_MSG');
            return aplTemplates.getAplLimiteGastos(handlerInput);
            
        } else {
            //speechText = requestAttributes.t('MISSING_MONEY_MSG');
            return aplTemplates.getAplLimiteGastos(handlerInput);
        }

        /*return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();*/
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
            if(total_money == 1){
                speechText = requestAttributes.t('REGISTER_MONEY_MSG_SGL', total_money) + requestAttributes.t('OVERWRITE_MONEY_MSG');
            }else{
                speechText = requestAttributes.t('REGISTER_MONEY_MSG', total_money) + requestAttributes.t('OVERWRITE_MONEY_MSG');
            }
        }
        
        aplTemplates.getAplLimiteGastos(handlerInput);
        
        return handlerInput.responseBuilder
            .speak(speechText + requestAttributes.t('HELP_OFERTA'))
            .reprompt(speechText + requestAttributes.t('HELP_OFERTA'))
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
        sessionAttributes['gasto'] = gasto;
        
        //var dinero_restante = total_money - gasto;
        sessionAttributes['total_money'] = sessionAttributes['total_money']-gasto;
        
       
        const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';
        
        if(sessionAttributes['total_money'] <= 0){
            const speechText = requestAttributes.t('RED_NUMBERS_MSG',  name);
            return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
        }
            
        /*const speechText = requestAttributes.t('TOTAL_MSG', sessionAttributes['total_money']);
            
        return handlerInput.responseBuilder
        .speak(speechText+ requestAttributes.t('HELP_OFERTA'))
        .reprompt(speechText + requestAttributes.t('HELP_OFERTA'))
        //.withShouldEndSession(true)
        .getResponse();*/
        return aplTemplates.getAplLimiteGastos(handlerInput);
        
    }
};

const IngresoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'IngresoIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const requestAttributes = attributesManager.getRequestAttributes();
        const sessionAttributes = attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;

        //const total_money = intent.slots.total_money.value;
        const ingreso = intent.slots.ingreso.value;
        sessionAttributes['ingreso'] = ingreso;
        
        //var dinero_restante = total_money - gasto;
        sessionAttributes['total_money'] = sum([sessionAttributes['total_money'],ingreso]);
        
       
        const name = sessionAttributes['name'] ? sessionAttributes['name'] : '';
        
        /*if(sessionAttributes['total_money'] <= 0){
            const speechText = requestAttributes.t('RED_NUMBERS_MSG',  name);
            return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
        }*/
            
        /*const speechText = requestAttributes.t('TOTAL_MSG', sessionAttributes['total_money']);
            
        return handlerInput.responseBuilder
        .speak(speechText+ requestAttributes.t('HELP_OFERTA'))
        .reprompt(speechText + requestAttributes.t('HELP_OFERTA'))
        //.withShouldEndSession(true)
        .getResponse();*/
        return aplTemplates.getAplLimiteGastos(handlerInput);
        
    }
};

module.exports = {
    SayMoneyIntentHandler,
    BuyIntentHandler,
    IngresoIntentHandler,
    RegisterMoneyMounthIntentHandler
}