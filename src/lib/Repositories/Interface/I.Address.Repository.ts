import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Address } from "$lib/Models/Entities/Address.Entity.Model";
import type { CreateAddressRequest } from "$lib/Models/Requests/CreateAddress.Request";

export interface IAddressRepository {
  getAddresses(options?:GenericListOptions): Promise<AppwriteResponse<Address>>;
  getAddress(id: string): Promise<Address>;
  createAddress(address: CreateAddressRequest): Promise<void>;
  updateAddress(address: Address): Promise<Address>;
  deleteAddress(id: string): Promise<void>;
}
