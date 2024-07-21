export interface LogResponse {
  logs: Logs[];
  totalCount: number;
}

export interface Logs {
  id: string;
  timestamp: Date;
  level: string;
  messageTemplate: string;
  renderedMessage: string;
  properties: Properties;
}

export interface Properties {
  executedBy: string;
  requestName: string;
  dateTimeUtc: string;
}
