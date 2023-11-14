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

export type RequestStatus = "Submitted" | "In_Progress" | "Completed";
