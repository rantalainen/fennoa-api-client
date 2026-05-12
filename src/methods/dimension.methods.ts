import * as FormData from 'form-data';

import { Helpers } from '../helpers';
import { FennoaApiClient } from '../index';
import { Dimension, DimensionFilters, DimensionInput, DimensionType, DimensionTypeInput } from '../interfaces/dimension.interfaces';
import { Methods } from '../methods';

export class DimensionMethods extends Methods {
  constructor(fennoa: FennoaApiClient) {
    super(fennoa, 'dimension_api');
  }

  /** Fetch all dimensions, optionally filtered by code, dimension type or active state. */
  async getAll(filters?: DimensionFilters): Promise<Dimension[]> {
    const result = await super.request('GET', '', undefined, filters);

    return this.extractDimensions(result.data);
  }

  /** Fetch a single dimension by id. */
  async getById(id: number): Promise<Dimension> {
    const result = await super.request('GET', `${id}`);

    return this.extractDimension(result.data);
  }

  /** Create a new dimension or update an existing one when id is provided. Returns the dimension id. */
  async createDimension(dimension: DimensionInput): Promise<number> {
    const formData = Helpers.convertJsToFormData(dimension);

    return await this.createDimensionByFormData(formData);
  }

  /** Create a new dimension or update an existing one using FORM DATA. Returns the dimension id. */
  async createDimensionByFormData(formData: FormData): Promise<number> {
    const result = await super.request('POST', 'add', formData);

    if (typeof result?.id !== 'number') {
      throw new Error('Fennoa error: Failed to save dimension');
    }

    return result.id;
  }

  /** Create a new dimension type using FORM DATA generated from a JavaScript object. Returns the dimension type id. */
  async createDimensionType(dimensionType: DimensionTypeInput): Promise<number> {
    const formData = Helpers.convertJsToFormData(dimensionType);

    return await this.createDimensionTypeByFormData(formData);
  }

  /** Create a new dimension type using FORM DATA. Returns the dimension type id. */
  async createDimensionTypeByFormData(formData: FormData): Promise<number> {
    const result = await super.request('POST', 'add/type', formData);

    if (typeof result?.id !== 'number') {
      throw new Error('Fennoa error: Failed to create dimension type');
    }

    return result.id;
  }

  /** Fetch all dimension types. */
  async getTypes(): Promise<DimensionType[]> {
    const result = await super.request('GET', 'get/types');

    return this.extractDimensionTypes(result.data);
  }

  /** Fetch a single dimension type by id. */
  async getTypeById(id: number): Promise<DimensionType> {
    const result = await super.request('GET', `get/types/${id}`);

    return this.extractDimensionType(result.data);
  }

  private extractDimensions(data: any): Dimension[] {
    if (data instanceof Array) {
      return data as Dimension[];
    }

    if (data?.Dimension instanceof Array) {
      return data.Dimension as Dimension[];
    }

    if (data?.Dimension) {
      return [this.extractDimension(data)];
    }

    return [];
  }

  private extractDimension(data: any): Dimension {
    if (data?.Dimension) {
      return {
        ...data.Dimension,
        DimensionType: data.DimensionType || data.Dimension?.DimensionType
      } as Dimension;
    }

    return data as Dimension;
  }

  private extractDimensionTypes(data: any): DimensionType[] {
    if (data instanceof Array) {
      return data as DimensionType[];
    }

    if (data?.DimensionType instanceof Array) {
      return data.DimensionType as DimensionType[];
    }

    if (data?.DimensionType) {
      return [data.DimensionType as DimensionType];
    }

    return [];
  }

  private extractDimensionType(data: any): DimensionType {
    if (data?.DimensionType) {
      return data.DimensionType as DimensionType;
    }

    return data as DimensionType;
  }
}
