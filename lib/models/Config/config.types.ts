import mongoose, { Document, LeanDocument } from 'mongoose';

export interface IConfigGeneric<ID, DATE> {
  _id: ID;
  site: string;
  scope: string[];
  token: string;
  // Test variable for template
  setting?: string;
  createdAt: DATE;
}

export type IConfig = IConfigGeneric<string, string>;
export type IConfigDocument = IConfigGeneric<mongoose.Types.ObjectId, Date> &
  Document;
export type IConfigLean = LeanDocument<IConfigDocument>;

export interface IConfigModel extends mongoose.Model<IConfigDocument> {}
