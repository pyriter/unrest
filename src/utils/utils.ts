import { APIGatewayProxyEvent } from 'aws-lambda';

export function extractOrigin(
  event: APIGatewayProxyEvent,
): string | undefined {
  return event && event.headers && event.headers.origin
    ? event.headers.origin
    : undefined;
}

export function extractPath(event: APIGatewayProxyEvent): string {
  return event && event.path && event.path.length > 0 ? event.path : '/';
}

export function extractRouteInfo(path: string): string[] {
  return path
    .split('/')
    .filter((v) => v.length > 0)
    .map(decodeURI);
}

export function extractBody(event: APIGatewayProxyEvent): any {
  return event && event.body ? JSON.parse(event.body) : undefined;
}
