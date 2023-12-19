import type { CategoryDto } from "$lib/Models/DTO/Category.DTO.Model";
import type { Category } from "$lib/Models/Entities/Category.Entity.Model";
import type { AuthDto } from "$lib/Models/DTO/Auth.DTO.Model";
import type { Auth } from "$lib/Models/Entities/Auth.Entity.Model";
import type { Item } from "$lib/Models/Entities/Item.Entities.Model";
import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
import type { Card } from "$lib/Models/Entities/Card.Entity.Model";
import type { CardDto } from "$lib/Models/DTO/Card.DTO.Model";
import type { Order } from "$lib/Models/Entities/Order.Entities.Model";
import type { OrderDto } from "$lib/Models/DTO/Order.DTO.Model";
import type { Address } from "$lib/Models/Entities/Address.Entity.Model";
import type { AddressDto } from "$lib/Models/DTO/Address.DTO.Model";
import type { ItemsBlocker } from "$lib/Models/Entities/ItemBlocker.Entity.Model";
import type { ItemsBlockerDto } from "$lib/Models/DTO/ItemBlocker.DTO.Model";
import type { DriverDto } from "$lib/Models/DTO/Driver.DTO.Model";
import type { Driver } from "$lib/Models/Entities/Driver.Entity.Model";

export class Dto {
  static ToCardDto(card: Card): CardDto | null {
    if (!card) {
      return null;
    }
    return {
      id: card.$id,
      userId: card.userId,
      webpageUrl: card.webpageUrl as string,
      expirationDate: card.expirationDate,
      cardImage: card.cardImage,
      createdAt: card.$createdAt as Date,
      updatedAt: card.$updatedAt as Date,
      deletedAt: card.deletedAt,
    };
  }
  static ToCategoriesDto(categories: Category): CategoryDto | null {
    try {
      if (!categories) {
        return null;
      }
      return {
        id: categories.$id,
        name: categories.name,
        categoryImage: categories.categoryImage,
        createdAt: categories.$createdAt as Date,
        updatedAt: categories.$updatedAt as Date,
        deletedAt: categories.deletedAt as Date | null,
      };
    } catch (e: any) {
      throw new Error(e);
    }
  }

  static ToAuthDto(auth: Auth): AuthDto {
    return {
      id: auth.$id,
      name: auth.name,
      phone: auth.phone,
      imgUrl: auth.prefs?.image as string,
      roles: auth.labels,
      gender: auth.prefs?.gender as number,
      birthday: auth.prefs?.birthday as string,
      fcmToken: auth.prefs?.fcmToken as string,
    };
  }

  static ToItemDto(item: Item): ItemDto {
    try {
      let categoriesDto: CategoryDto[] = [];
      if (item.category) {
        categoriesDto = item.category.map(
          (category) => this.ToCategoriesDto(category) as CategoryDto
        );
      }
      return {
        id: item.$id,
        name: item.name,
        price: item.price,
        itemImage: item.itemImage,
        productionDate: item.productionDate,
        expiredDate: item.expiredDate,
        quantity: item.quantity,
        detail: item.detail,
        popularity: item.popularity,
        numberOfSales: item.numberOfSales,
        category: categoriesDto,
        createdAt: item.$createdAt as Date,
        updatedAt: item.$updatedAt as Date,
        deletedAt: item.deletedAt as Date | null,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static ToOrderDto(
    order: Order,
    user?: AuthDto | null,
    items?: ItemDto[],
    address?: AddressDto | null
  ): OrderDto | null {
    try {
      let itemsDto: ItemDto[] = [];
      if (order.items) {
        itemsDto = order.items.map((item) => this.ToItemDto(item) as ItemDto);
      }
      if(!user){
        user = null;
      }
      const addressDto: AddressDto | null = this.ToAddressDto(order.address);
      return {
        id: order.$id,
        userId: order.userId,
        user: user as AuthDto,
        status: order.status,
        items: items ?? itemsDto,
        address: address ?? addressDto,
        totalAmount: order.totalAmount,
        createdAt: order.$createdAt as Date,
        updatedAt: order.$updatedAt as Date,
        deletedAt: order.deletedAt as Date | null,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static ToAddressDto(address: Address): AddressDto | null {
    try {
      if (!address) {
        return null;
      }
      return {
        id: address.$id,
        building: address.building,
        buildingType: address.buildingType,
        latitude: address.latitude,
        longitude: address.longitude,
        note: address.note,
        street: address.street,
        deletedAt: address.deletedAt as Date | null,
        userId: address.userId,
        createdAt: address.$createdAt as Date,
        updatedAt: address.$updatedAt as Date,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static ToItemsBlockerDto(
    itemBlocker: ItemsBlocker,
    item?: ItemDto,
    order?: OrderDto
  ): ItemsBlockerDto | null {
    try {
      let itemsDto: ItemDto | null = null;
      let orderDto: OrderDto | null = null;
      if (itemBlocker.items) {
        itemsDto = this.ToItemDto(itemBlocker.items) as ItemDto;
      }
      if (itemBlocker.orders) {
        orderDto = this.ToOrderDto(itemBlocker.orders) as OrderDto;
      }
      if (!itemBlocker) {
        return null;
      }
      return {
        id: itemBlocker.$id,
        quantity: itemBlocker.quantity,
        items: item ?? itemsDto,
        order: order ?? orderDto,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static ToDriverDto(driver: Driver, user?:AuthDto | null): DriverDto | null {
    try {
      if (!driver) {
        return null;
      }
      if(!user){
        user = null;
      }
      return {
        id: driver.$id,
        userId: driver.userId,
        user: user as AuthDto,
        onlineStatus: driver.onlineStatus,
        bikeAnnuity: {
          model: driver.bikeAnnuity!.model,
          year: driver.bikeAnnuity!.year,
          color: driver.bikeAnnuity!.color,
          plateImage: driver.bikeAnnuity!.plateImage as string,
          plateNumber: driver.bikeAnnuity!.plateNumber,
          annuity: {
            image: {
              front: driver.bikeAnnuity!.annuityImageFront as string,
              back: driver.bikeAnnuity!.annuityImageBack as string,
            },
            number: driver.bikeAnnuity!.annuityNumber as string,
          },
        },
        passport: {
          passportNumber: driver.passport!.passportNumber,
          passportImage: driver.passport!.passportImage as string,
        },
        deletedAt: driver.deletedAt as Date | null,
        createdAt: driver.$createdAt as Date,
        updatedAt: driver.$updatedAt as Date,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
