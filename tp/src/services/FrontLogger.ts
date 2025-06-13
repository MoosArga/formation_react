
export default class FrontLogger {

    constructor() {
    }

    callbackLog(errorMessage: string) {
        console.log('Message sent to server', errorMessage)
        try {
            fetch('http://localhost:8000/error')
        } catch(err) {
            //
            console.debug(err)
        }
    }

}
