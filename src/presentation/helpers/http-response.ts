import { UnauthorizedError } from "../errors/unauthorized-error";
import { ServerError } from "../errors/server-error";

export class HttpResponse {
  static success(body) {
    return {
      statusCode: 200,
      body,
    };
  }

  static badRequest(error) {
    return {
      statusCode: 400,
      body: error,
    };
  }

  static unauthorizedError() {
    return {
      statusCode: 401,
      body: new UnauthorizedError(),
    };
  }

  static serverError() {
    return {
      statusCode: 500,
      body: new ServerError(),
    };
  }
}
