import { Types } from 'mongoose'

export interface Complaint {
  _id?: string;
  title: string;
  description: string;
  photos: string[];
  state: string;
  latitude: number;
  longitude: number;
  observation: string | null;
  typeComplaintId: string;
  personId: string;
}
