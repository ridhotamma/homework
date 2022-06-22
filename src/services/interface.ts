export enum PROJECT_STATUS {
  INCOMPLETE = "INCOMPLETE",
  SHOOTING = "SHOOTING",
  EDITING = "EDITING",
  FEEDBACK = "FEEDBACK",
  COMPLETED = "COMPLETED",
}

export enum PROJECT_TYPE {
  TESTIMONIAL = "TESTIMONIAL",
  EDUCATIONAL = "EDUCATIONAL",
  TRAINING = "TRAINING",
  RECREATIONAL = "RECREATIONAL",
}

export interface IResponseData {
  name?: string;
  status?: PROJECT_STATUS;
  type?: PROJECT_TYPE;
  createdOn?: Date;
  archived?: string;
}
