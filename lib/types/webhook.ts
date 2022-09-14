export interface ISite {
  _id: string;
  name: string;
  displayName: string;
  logo: string;
  notificationEmail?: string;
  geo: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export interface WebhookResponse<T> {
  site: ISite;
  payload: T;
}
