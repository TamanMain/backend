export default class ResponseTemplate {
  links: ResponseLinks = new ResponseLinks();
  success: boolean = true;
  message?: string;
  data?: ResponseData;
  relatedData?: ResponseData;
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
