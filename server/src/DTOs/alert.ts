// Purpose: Interface for notification alerts.

interface AlertDTO {
  _id?: string; // unique identifier from the database
  title: string;
  body: string;
  postDate: Date;
  sender?: string;
}
export default AlertDTO;
