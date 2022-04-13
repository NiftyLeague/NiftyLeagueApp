export interface DataCardMiddleware {
  name: string;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  avatar: any;
  linkedin: string;
  meet: string;
  skype: string;
  root: boolean;
}

export interface TreeMiddleWare {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any;
}

export interface TreeCardmiddleWare {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any;
}

export interface CardMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any;
}
