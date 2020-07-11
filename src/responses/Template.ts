import { RequestOptions } from "http";

export default class ResponseTemplate {
  links: ResponseLinks = new ResponseLinks();
  success: boolean = true;
  message?: string;
  data?: ResponseData;
  relatedData?: ResponseData;

  constructor(req: RequestOptions) {
    // @ts-ignore
    this.links.self = req.protocol + "://" + req.hostname + req.originalUrl;
  }
}

export class ResponseLinks {
  self?: string;
  next?: string;
  prev?: string;
}

export class ResponseData {
  items?: object[];
  size?: number;
  limit?: number;
}

export function responseSuccess(
  req: RequestOptions,
  message?: string,
  data?: object[]
): ResponseTemplate {
  const response = new ResponseTemplate(req);
  response.message = message;
  response.data = new ResponseData();
  response.data.items = data;
  response.data.size = data?.length;
  return response;
}

export function responseFail(
  req: RequestOptions,
  message: string
): ResponseTemplate {
  const response = new ResponseTemplate(req);
  response.success = false;
  response.message = message;
  return response;
}
