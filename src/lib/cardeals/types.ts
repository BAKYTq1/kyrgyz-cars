export interface CarSpecs {
  id: number;
  key_info: string;
  transmission: number;
  hybrid: null | string;
  fuel_type: string;
  drive_type: number;
  engine_rendered: string;
}

export interface CarImg {
  img_1?: string;
  img_2?: string;
  img_3?: string;
  img_4?: string;
  img_5?: string;
}

export interface Car {
  id: number;
  name: string;
  name_long: string;
  tag: string;
  lot: string;
  vin: string;
  status: number;
  search_status: string;
  seller: string;
  seller_trusted: boolean;
  loss_type: string;
  primary_damage: string;
  has_video: boolean;
  has_360_view: boolean;
  odometer: number;
  odometer_substr: number;
  odometer_km_substr: number;
  location: string;
  prebid_price: string;
  final_bid: null | number;
  final_bid_formatted: null | string;
  estimated_min: number;
  estimated_max: number;
  start_code: string;
  start_code_color: string;
  specs: CarSpecs;
  img: CarImg;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CarListParams {
  page?: number;
  page_size?: number;
  status?: string;
  search_status?: string;
  loss_type?: string;
  location?: string;
  seller?: string;
  search?: string;
  ordering?: string;
}