import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Address } from "$lib/Models/Entities/Address.Entity.Model";
import type { CreateAddressRequest } from "$lib/Models/Requests/CreateAddress.Request";
import type { IAddressRepository } from "$lib/Repositories/Interface/I.Address.Repository";
import { ID } from "appwrite";

export class AddressRepository implements IAddressRepository {
  async getAddresses(
    options?: GenericListOptions
  ): Promise<AppwriteResponse<Address>> {
    const { documents, total } = (await Appwrite.databases.listDocuments(
      Environment.appwrite_database,
      Environment.appwrite_collection_address
    )) as AppwriteResponse<Address>;

    return { documents, total };
  }
  async getAddress(id: string): Promise<Address> {
    const address = (await Appwrite.databases.getDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_address,
      id
    )) as Address;
    return address;
  }
  async createAddress(address: CreateAddressRequest): Promise<void> {
    await Appwrite.databases.createDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_address,
      ID.unique(),
      address
    );
  }
  async updateAddress(address: Address): Promise<Address> {
    const addressResult = (await Appwrite.databases.updateDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_address,
      address.$id,
      address
    )) as Address;

    return addressResult;
  }
  async deleteAddress(id: string): Promise<void> {
    await Appwrite.databases.updateDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_address,
      id,
      {
        deletedAt: new Date(),
      }
    );
  }
}
