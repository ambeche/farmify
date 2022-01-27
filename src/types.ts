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

export type YearOptions = {
  year: number;
  selected: boolean;
};

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

export interface User{
  username: string;
  token: string;
  farms: Pick<Farm, 'farmname'>[];
}
export interface UserCredentialsBase {
  username: string;
}

export interface UserCredentials extends UserCredentialsBase{
  token: string;
}
export interface UserCredentialsInput extends UserCredentialsBase{
  password: string;
}


