import type { Address } from "$lib/Models/Entities/Address.Entity.Model";
import type { CreateAddressRequest } from "$lib/Models/Requests/CreateAddress.Request";
import type { IAddressRepository } from "$lib/Repositories/Interface/I.Address.Repository";

export class AddressRepository implements IAddressRepository{
    getAddresses(): Promise<AppwriteResponse<Address>> {
        throw new Error("Method not implemented.");
    }
    getAddress(id: string): Promise<Address> {
        throw new Error("Method not implemented.");
    }
    createAddress(address: CreateAddressRequest): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateAddress(address: Address): Promise<Address> {
        throw new Error("Method not implemented.");
    }
    deleteAddress(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}