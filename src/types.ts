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

export interface Farm {
  farmname: string;
  owner: string;
  farmdata: FarmRecord[];
}

type FarmWithoutData = Omit<Farm, 'farmdata'>;

export interface FarmOptions extends FarmWithoutData {
  selected: boolean;
}

type FarmRecordWithOmittedAttributes = Omit<FarmRecord, 'datetime' | 'value'>;

export interface FarmStatistics extends FarmRecordWithOmittedAttributes {
  numberofRecords: number;
  month: Date;
  min: number;
  max: number;
  average: number;
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
