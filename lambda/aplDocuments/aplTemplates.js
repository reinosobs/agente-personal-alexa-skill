const moment = require('moment-timezone');

module.exports = {
    
    getAplNoCumpleaños(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        const diasRestantes= sessionAttributes["daysLeft"];
        const name = sessionAttributes['name'];
        
        if(!diasRestantes){
            if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.2',
                    document: require('./funtionRequest'),
                    datasources: {
                        launchData: {
                            type: 'object',
                            properties: {
                                headerTitle: "Mi agente personal",
                                backgroundImage: "https://i.ibb.co/CbV1bsJ/fondo-negro.jpg",
                                mainText: requestAttributes.t('NO_DATE_BIRTHDAY'),
                                colorHandler: "#3498db",
                                hintString: "Diga \"Mi cumpleaños \" tras registrar su fecha de nacimiento",
                            },
                        },
                    },
                });
            }
            return handlerInput.responseBuilder
                .speak(requestAttributes.t('NO_DATE_BIRTHDAY'))
                .reprompt(requestAttributes.t('NO_DATE_BIRTHDAY'))
                .getResponse();
        }else{
            if(diasRestantes===1){
                if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        version: '1.2',
                        document: require('./funtionRequest'),
                        datasources: {
                            launchData: {
                                type: 'object',
                                properties: {
                                    headerTitle: "Mi agente personal",
                                    backgroundImage: "https://i.ibb.co/CbV1bsJ/fondo-negro.jpg",
                                    mainText: requestAttributes.t('NO_BIRTHDAY_APL_SGL', diasRestantes),
                                    colorHandler: "#3498db",
                                    hintString: "Di: \"Ver opciones\" si quiere volver al menú"
                                },
                            },
                        },
                    });
                }
                return handlerInput.responseBuilder
                .speak(requestAttributes.t('SAY_MSG_SGL', name, diasRestantes) + requestAttributes.t('HELP_OFERTA'))
                .reprompt(requestAttributes.t('SAY_MSG_SGL', name, diasRestantes) + requestAttributes.t('HELP_OFERTA'))
                //.withShouldEndSession(true)
                .getResponse();
            }else{
                if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        version: '1.2',
                        document: require('./funtionRequest'),
                        datasources: {
                            launchData: {
                                type: 'object',
                                properties: {
                                    headerTitle: "Mi agente personal",
                                    backgroundImage: "https://i.ibb.co/CbV1bsJ/fondo-negro.jpg",
                                    mainText: requestAttributes.t('NO_BIRTHDAY_APL', diasRestantes),
                                    colorHandler: "#3498db",
                                    hintString: "Di: \"Ver opciones\" si quiere volver al menú"
                                },
                            },
                        },
                    });
                }
                return handlerInput.responseBuilder
                .speak(requestAttributes.t('SAY_MSG', name, diasRestantes) + requestAttributes.t('HELP_OFERTA'))
                .reprompt(requestAttributes.t('SAY_MSG', name, diasRestantes) + requestAttributes.t('HELP_OFERTA'))
                //.withShouldEndSession(true)
                .getResponse();
            }
            
            
        }
    },
    
    getAplCumpleaños(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        const name = sessionAttributes['name'];
        const diasRestantes= sessionAttributes["daysLeft"];
        if(diasRestantes === 0){
            if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.2',
                    document: require('./funtionRequest'),
                    datasources: {
                        launchData: {
                            type: 'object',
                            properties: {
                                headerTitle: "Mi agente personal",
                                backgroundImage: "https://i.ibb.co/7y1Kdzs/fondo-negro-confeti-1.jpg",
                                mainText: "¡FELIZ CUMPLEAÑOS!",
                                hintString: "Di: \"Ver opciones\" si quiere volver al menú",
                                colorHandler: "#3498db"
                                //hintString: requestAttributes.t('HELP_REPROMPT'),
                            },
                        },
                    },
                });
        }
        }
        
        return handlerInput.responseBuilder
            .speak(requestAttributes.t('GREET_MSG',name) + requestAttributes.t('HELP_OFERTA'))
            .reprompt(requestAttributes.t('GREET_MSG',name) + requestAttributes.t('HELP_OFERTA'))
            .getResponse();
    },
    
    getAplLimiteGastos(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        const total_money= sessionAttributes["total_money"];
        
        if(!total_money){
            if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        version: '1.2',
                        document: require('./funtionRequest'),
                        datasources: {
                            launchData: {
                                type: 'object',
                                properties: {
                                    headerTitle: "Mi agente personal",
                                    backgroundImage: "https://i.ibb.co/CbV1bsJ/fondo-negro.jpg",
                                    mainText: requestAttributes.t('MISSING_MONEY_MSG'),
                                    hintString: "Di: \"Ver opciones\" si quiere volver al menú",
                                    colorHandler: "#0D7942"
                                    //hintString: requestAttributes.t('HELP_REPROMPT'),
                                },
                            },
                        },
                    });
            }
            return handlerInput.responseBuilder
                .speak(requestAttributes.t('MISSING_MONEY_MSG'))
                .reprompt(requestAttributes.t('MISSING_MONEY_MSG'))
                //.withShouldEndSession(true)
                .getResponse();
        }
        else{
            if(total_money == 1){
                if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        version: '1.2',
                        document: require('./funtionRequest'),
                        datasources: {
                            launchData: {
                                type: 'object',
                                properties: {
                                    headerTitle: "Mi agente personal",
                                    backgroundImage: "https://i.ibb.co/CbV1bsJ/fondo-negro.jpg",
                                    mainText: requestAttributes.t('SLG_TOTAL_MSG', total_money),
                                    hintString: "Di: \"Ver opciones\" si quiere volver al menú",
                                    colorHandler: "#0D7942"
                                    //hintString: requestAttributes.t('HELP_REPROMPT'),
                                },
                            },
                        },
                    });
                }
            
                return handlerInput.responseBuilder
                    .speak(requestAttributes.t('SLG_TOTAL_MSG', total_money)+ requestAttributes.t('OVERWRITE_MONEY_MSG'))
                    .reprompt(requestAttributes.t('SLG_TOTAL_MSG', total_money)+ requestAttributes.t('OVERWRITE_MONEY_MSG'))
                    //.withShouldEndSession(true)
                    .getResponse();
            }else{
                if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        version: '1.2',
                        document: require('./funtionRequest'),
                        datasources: {
                            launchData: {
                                type: 'object',
                                properties: {
                                    headerTitle: "Mi agente personal",
                                    backgroundImage: "https://i.ibb.co/CbV1bsJ/fondo-negro.jpg",
                                    mainText: requestAttributes.t('TOTAL_MSG', total_money),
                                    hintString: "Di: \"Ver opciones\" si quiere volver al menú",
                                    colorHandler: "#0D7942"
                                    //hintString: requestAttributes.t('HELP_REPROMPT'),
                                },
                            },
                        },
                    });
                }
            
                return handlerInput.responseBuilder
                    .speak(requestAttributes.t('TOTAL_MSG', total_money) + requestAttributes.t('OVERWRITE_MONEY_MSG'))
                    .reprompt(requestAttributes.t('TOTAL_MSG', total_money) + requestAttributes.t('OVERWRITE_MONEY_MSG'))
                    //.withShouldEndSession(true)
                    .getResponse();
                }
            }
            
        
        
    },
    
    async getAplTiempoSinHablar(handlerInput){
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
        
        /*if(!diasSinHablar){
            diasSinHablar= sessionAttributes['total_dias'];
        }*/
        
        const nombre = sessionAttributes['nombreLlamada'];
        
        if(!nombre){
            if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.2',
                    document: require('./funtionRequest'),
                    datasources: {
                        launchData: {
                            type: 'object',
                            properties: {
                                headerTitle: "Mi agente personal",
                                backgroundImage: "https://i.ibb.co/CbV1bsJ/fondo-negro.jpg",
                                mainText: requestAttributes.t('REGISTRAR_NOMBRE_MSG'),
                                hintString: "Di: \"Ver opciones\" si quiere volver al menú",
                                colorHandler: "#e7e61e"
                                //hintString: requestAttributes.t('HELP_REPROMPT'),
                            },
                        },
                    },
                });
            }
            return handlerInput.responseBuilder
            .speak(requestAttributes.t('REGISTRAR_NOMBRE_MSG'))
            .reprompt(requestAttributes.t('REGISTRAR_NOMBRE_MSG'))
            //.withShouldEndSession(true)
            .getResponse();
        }else{
            
            const today=moment().tz(timezone).startOf('day');//dia actual
            
            const diaLlamada = sessionAttributes['dias_sin_hablar'];
            
            const diasSinHablar = today.startOf('day').diff(diaLlamada, 'days');//dias que han pasado desde el primer dia hasta el actual
            
            sessionAttributes['total_dias']=diasSinHablar;
            
            //if(diasSinHablar >= 0){
                if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
                    handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        version: '1.2',
                        document: require('./funtionRequest'),
                        datasources: {
                            launchData: {
                                type: 'object',
                                properties: {
                                    headerTitle: "Mi agente personal",
                                    backgroundImage: "https://i.ibb.co/CbV1bsJ/fondo-negro.jpg",
                                    mainText: "Han pasado "+diasSinHablar+ " días desde la última vez que hablaste con "+nombre,
                                    hintString: "Di: \"Ver opciones\" si quiere volver al menú",
                                    colorHandler: "#e7e61e"
                                    //hintString: requestAttributes.t('HELP_REPROMPT'),
                                },
                            },
                        },
                    });
                }
        
                return handlerInput.responseBuilder
                    .speak(requestAttributes.t(('DIAS_SIN_HABLAR_MSG'), diasSinHablar,nombre,nombre))
                    .reprompt(requestAttributes.t(('DIAS_SIN_HABLAR_MSG'), diasSinHablar,nombre,nombre))
                    //.withShouldEndSession(true)
                    .getResponse(); 
                
            
            
            
        }
        
    },
    
    getAplConsejo(handlerInput, speakOutput){
        if (handlerInput.requestEnvelope.context.System.device.supportedInterfaces['Alexa.Presentation.APL']) {
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.2',
                    document: require('./funtionRequest'),
                    datasources: {
                        launchData: {
                            type: 'object',
                            properties: {
                                headerTitle: "Mi agente personal",
                                backgroundImage: "https://i.ibb.co/CbV1bsJ/fondo-negro.jpg",
                                mainText: speakOutput,
                                hintString: "Di: \"Ver opciones\" si quiere volver al menú",
                                colorHandler: "#f6523e"
                            },
                        },
                    },
                });
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput + '. Si deseas otro consejo, dí, otro consejo. ¿En qué más puedo ayudarte ?')
            .reprompt(speakOutput + '. Si deseas otro consejo, dí, otro consejo. ¿En qué más puedo ayudarte ?')
            //.withShouldEndSession(true)
            .getResponse();
    }
    
    
};