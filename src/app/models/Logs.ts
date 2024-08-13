/**
 * Represents the response object for logs.
 */
export interface LogResponse {
  logs: Logs[];
  totalCount: number;
}

/**
 * Represents a log entry.
 */
export interface Logs {
  id: string;
  timestamp: Date;
  level: string;
  messageTemplate: string;
  renderedMessage: string;
  properties: Properties;
}

/**
 * Represents the properties of a log entry.
 */
export interface Properties {
  executedBy: string;
  requestName: string;
  dateTimeUtc: string;
}
