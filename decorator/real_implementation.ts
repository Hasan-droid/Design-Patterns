/* eslint-disable @typescript-eslint/no-explicit-any */

//any is used to ease of use

//component
interface ServerRequest {
  handleRequest(request: any): void;
}

//Concrete Component
class BaseServer implements ServerRequest {
  handleRequest(request: any): void {
    console.log("handle server request", request);
  }
}

//Decorator
abstract class Decorator implements ServerRequest {
  constructor(protected request: ServerRequest) {}

  abstract handleRequest(request: any): void;
}

class LoggingMiddleWare extends Decorator {
  constructor(protected serverRequest: ServerRequest) {
    super(serverRequest);
  }

  handleRequest(request: any): void {
    console.log(`logging Request`, request);
    this.serverRequest.handleRequest(request);
  }
}

class Authentication extends Decorator {
  constructor(protected serverRequest: ServerRequest) {
    super(serverRequest);
  }

  handleRequest(request: any): void {
    if (request.isAuthenticated) {
      console.log("Request Authenticated");
      this.request.handleRequest(request);
    } else {
      console.log("Request is NOT Authenticated");
    }
  }
}

const request = { body: "Hasan", isAuthenticated: false };
let server = new BaseServer();
server = new Authentication(server);
server = new LoggingMiddleWare(server);
server.handleRequest(request);
