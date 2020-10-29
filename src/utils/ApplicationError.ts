export default class ApplicationError extends Error {
    public httpStatusCode:number;
    private originalCode:string;
    private severity:number;
    private additionalMessage:string; //to send in support email

     constructor(code:APP_ERROR_CODES=APP_ERROR_CODES.UNKNOWN_0,additionalMessage='',...params){
         super(...params);
         Object.setPrototypeOf(this, ApplicationError.prototype);

        let _e = APP_ERRORS[code];
        if(_e)
            APP_ERRORS['UNKNOWN_0'];
        
        this.originalCode = code;
        this.additionalMessage = 
        this.message = _e.message;
        this.httpStatusCode = _e.httpStatusCode;
        this.severity = _e.severity;
        this.processExceptionFurtherAsync()
     }

    processExceptionFurtherAsync(){
        //based on severity..can send email to Support team
    }
}
export enum APP_ERROR_CODES {
    UNKNOWN_0='UNKNOWN_0',
    CST_SVC_1='CST_SVC_1',
    STORE_ERR_1='STORE_ERR_1',
}
const APP_ERRORS = {
    [APP_ERROR_CODES.UNKNOWN_0] :{
        message : 'Unknown Exception',
        httpStatusCode : 400,
        severity : 1
    },
    [APP_ERROR_CODES.CST_SVC_1] : {
        message : 'Parent Store Not Found',
        httpStatusCode : 422,
        severity : 2
    },
    [APP_ERROR_CODES.STORE_ERR_1]:{
        message : '',
        httpStatusCode : 422,
        severity : 2
    }
}

