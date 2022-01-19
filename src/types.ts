export enum MetricType {
  PH = 'pH',
  Temperature = 'temperature',
  Rainfall = 'rainFall',
}

export interface FarmRecord {
  farmname: string;
  datetime?: Date;
  metrictype: MetricType;
  value: number;
}

export interface QueryParameters {
  month?: number;
  year?: number;
  limit?: number;
  offset?: number;
  page?: number;
  metrictype?: MetricType;
  farmname?: string;
}
