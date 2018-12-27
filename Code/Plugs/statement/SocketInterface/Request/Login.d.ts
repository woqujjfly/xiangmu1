declare namespace ISocket {
    namespace Request {
        interface Login extends RequestBase {
            Token: string
            OnlineType: number
        }
    }
}