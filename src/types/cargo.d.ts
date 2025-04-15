// Cargo related types
export enum ECargoType {
  FCX = "FCX",
  LCL = "LCL",
  FCL = "FCL",
}

export interface ICargoItem {
  id?: string;
  cargo_type: ECargoType;
  number_of_packages: number;
  container_number?: string;
  master_bill_of_lading_number?: string;
  house_bill_of_lading_number?: string;
  created_at?: string;
}

// API Response types
export interface IProcessingError {
  index?: number;
  message: string;
}

export interface IEDIGenerateResponse {
  edi_content: string;
  errors?: IProcessingError[];
}

export interface IEDIDecodeResponse {
  cargo_items: ICargoItem[];
  errors?: IProcessingError[];
}

// API Request types
export interface IGenerateEDIRequest {
  items: ICargoItem[];
}

export interface IDecodeEDIRequest {
  edi_content: string;
}
