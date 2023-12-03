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
import { BuildingType } from "$lib/Models/Enums/BuildingType.Enum.Model";

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
      imgUrl: auth.prefs!.image as string,
      roles: auth.labels,
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
        category: categoriesDto,
        createdAt: item.$createdAt as Date,
        updatedAt: item.$updatedAt as Date,
        deletedAt: item.deletedAt as Date | null,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static ToOrderDto(order: Order): OrderDto | null {
    try {
      const itemsDto: ItemDto[] = order.items.map(
        (item) => this.ToItemDto(item) as ItemDto
      );
      const addressDto: AddressDto = this.ToAddressDto(
        order.address
      ) as AddressDto;
      return {
        id: order.$id,
        userId: order.userId,
        status: order.status,
        items: itemsDto,
        address: addressDto,
        totalPrice: order.totalPrice,
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
      return {
        id: address.$id,
        building: address.building,
        buildingType: BuildingType[address.buildingType],
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
}
