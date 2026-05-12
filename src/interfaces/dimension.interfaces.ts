export interface DimensionFilters {
  code?: string;
  dimension_type_id?: number;
  is_active?: 0 | 1;
}

export interface DimensionType {
  id: number | string;
  name_fi: string;
  name_en?: string;
  name_sv?: string;
  description?: string;
}

export interface Dimension {
  id: number | string;
  code: string;
  dimension_type_id?: number | string;
  name_fi: string;
  name_en?: string;
  name_sv?: string;
  description?: string;
  is_active?: 0 | 1;
  active_after?: string | null;
  DimensionType?: DimensionType;
}

export interface DimensionInput {
  id?: number;
  dimension_type_id: number;
  code: string;
  name_fi: string;
  name_en?: string;
  name_sv?: string;
  description?: string;
  is_active?: 0 | 1;
  active_after?: string;
}

export interface DimensionTypeInput {
  name_fi: string;
  name_en?: string;
  name_sv?: string;
  description?: string;
}
