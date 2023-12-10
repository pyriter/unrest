import { Headers, Response } from './response';
import { StatusType } from './statusType';

export class ResponseBuilder {
  private statusCode?: StatusType;
  private body?: string | object | undefined | number | boolean;
  private headers: Headers = {};

  withStatusCode(value: number): ResponseBuilder {
    this.statusCode = value;
    return this;
  }

  withBody(value: string | object | undefined | number | boolean): ResponseBuilder {
    if (typeof value === 'object') {
      this.body = JSON.stringify(value);
    } else {
      this.body = value;
    }
    return this;
  }

  withHeader(key: string, value: string): ResponseBuilder {
    if (key !== undefined) {
      if (value !== undefined) {
        this.headers[key] = value;
      }
    } else {
      throw new Error('key must be defined');
    }
    return this;
  }

  build(): Response {
    if (this.statusCode == null) {
      throw new Error('statusCode must be defined');
    }
    return new Response({
      statusCode: this.statusCode,
      body: this.body,
      headers: this.headers,
    });
  }
}
