/**
 * Represents a user request.
 */
export interface UserRequest {
  id: string;
  userName: string;
  requestTitle: string;
  description: string;
  adminComment: string;
  requestStatus: RequestStatus;
  dateSubmitted: Date;
  dateCompleted: Date | null;
}

/**
 * Represents the status of a user request.
 * Possible values are "Submitted", "In_Progress", and "Completed".
 */
export type RequestStatus = "Submitted" | "In_Progress" | "Completed";
