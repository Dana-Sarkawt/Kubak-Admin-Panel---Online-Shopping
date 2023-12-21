import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { DriverDto } from "$lib/Models/DTO/Driver.DTO.Model";
import { ToastMessages } from "$lib/Models/Enums/Toast-Messages.Enum.Model";
import type { Store } from "$lib/Models/Response/Store.Response";
import { DriverRepository } from "$lib/Repositories/Implementation/Drivers.Repository";
import { writable } from "svelte/store";
import { toastStore } from "./Toast.Store";
import type { CreateDriverRequest } from "$lib/Models/Requests/CreateDriver.Request.Model";
import { ImageToUrl } from "../../utils/ImageToUrl.Utils";
import type { AuthDto } from "$lib/Models/DTO/Auth.DTO.Model";
import { authStore } from "./Auth.Store";

const driverRepository = new DriverRepository();

const createDriverStore = () => {
  const { subscribe, set, update } = writable<Store<DriverDto>>();
  return {
    subscribe,
    set: (value: Store<DriverDto>) => {
      set(value);
    },
    get: async (id: string) => {
      try {
        if (!id) return;
        let document = await driverRepository.getDriver(id);
        return Dto.ToDriverDto(document);
      } catch (e) {
        console.log(e);
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        let { documents, total } = await driverRepository.getDrivers();

        let dto: DriverDto[] = await Promise.all(
          documents.map(async (document) => {
            const userDto: AuthDto | undefined | null =
              (await authStore.getUser(document.userId)) as
                | AuthDto
                | undefined
                | null;
            return Dto.ToDriverDto(document, userDto) as DriverDto;
          })
        );
        set({
          data: dto,
          total: total,
          pages: Math.ceil(total / (options?.limit ?? 8)),
        });
      } catch (e) {
        console.log(e);
        toastStore.set(ToastMessages.ERROR);
      }
    },
    create: async (driver: CreateDriverRequest) => {
      try {
        if (driver.userId == "") {
          throw new Error("Driver User Id is required");
        }
        if (driver.bikeAnnuity.model == "") {
          throw new Error("Driver Bike Annuity Model is required");
        }
        if (
          (driver.bikeAnnuity.year as number) < 1980 ||
          (driver.bikeAnnuity.year as number) > 2100
        ) {
          throw new Error(
            `Driver Bike Annuity Year Must Be Between 1980 And 2100`
          );
        }
        if (driver.bikeAnnuity.color == "") {
          throw new Error("Driver Bike Annuity Color is required");
        }
        if (driver.bikeAnnuity.plateImage.url == "") {
          throw new Error("Driver Bike Annuity Plate Number is required");
        }
        if (driver.bikeAnnuity.plateNumber == "") {
          throw new Error("Driver Bike Annuity Plate Number is required");
        }
        if (driver.bikeAnnuity.annuityImage.front.url == "") {
          throw new Error("Driver Bike Annuity Front Image is required");
        }
        if (driver.bikeAnnuity.annuityImage.back.url == "") {
          throw new Error("Driver Bike Annuity Back Image is required");
        }
        if (driver.bikeAnnuity.annuityNumber == "") {
          throw new Error("Driver Bike Annuity Number is required");
        }
        if (driver.passport.passportNumber == "") {
          throw new Error("Driver Passport Number is required");
        }
        if (driver.passport.passportImage.url == "") {
          throw new Error("Driver Passport Image is required");
        }
        if (driver.bikeAnnuity.plateImage.url instanceof File) {
          driver.bikeAnnuity.plateImage.url = (await ImageToUrl(
            driver.bikeAnnuity.plateImage.url as File
          )) as string;
        }
        if (driver.bikeAnnuity.annuityImage.front.url instanceof File) {
          driver.bikeAnnuity.annuityImage.front.url = (await ImageToUrl(
            driver.bikeAnnuity.annuityImage.front.url as File
          )) as string;
        }
        if (driver.bikeAnnuity.annuityImage.back.url instanceof File) {
          driver.bikeAnnuity.annuityImage.back.url = (await ImageToUrl(
            driver.bikeAnnuity.annuityImage.back.url as File
          )) as string;
        }
        if (driver.passport.passportImage.url instanceof File) {
          driver.passport.passportImage.url = (await ImageToUrl(
            driver.passport.passportImage.url as File
          )) as string;
        }
        if(driver.labels.length == 0){
          const user = await authStore.getUser(driver.userId);
          if(user?.roles.includes("Driver")){
            driver.labels = user?.roles;
          }else{
            user?.roles.push("Driver");
            driver.labels = user?.roles as string[];
          }
        }
        await driverRepository.createDriver(driver);
        toastStore.set(ToastMessages.SUCCESS);
      } catch (e) {
        console.log(e);
        toastStore.set(ToastMessages.ERROR);
      }
    },
    update: async (driver: CreateDriverRequest) => {
      try {
        const document = await driverRepository.getDriver(driver.id as string);

        if (document === null) {
          throw new Error(
            `Driver not found with the following id:${driver.id}`
          );
        }
        if (driver.bikeAnnuity?.plateNumber == "") {
          driver.bikeAnnuity.plateNumber = document.bikes!.plateNumber;
        }
        if (driver.bikeAnnuity?.color == "") {
          driver.bikeAnnuity.color = document.bikes!.color;
        }
        if (driver.bikeAnnuity?.plateNumber == "") {
          driver.bikeAnnuity.plateNumber = document.bikes!.plateNumber;
        }
        if (driver.passport?.passportNumber == "") {
          driver.passport.passportNumber = document.passportNumber;
        }
        if (driver.bikeAnnuity?.annuityImage.front.url != "") {
          if (driver.bikeAnnuity?.annuityImage.front.url instanceof File) {
            driver.bikeAnnuity.annuityImage.front.url = (await ImageToUrl(
              driver.bikeAnnuity?.annuityImage.front.url as File
            )) as string;
          }
        }
        if (driver.bikeAnnuity?.annuityImage.back.url != "") {
          if (driver.bikeAnnuity?.annuityImage.back.url instanceof File) {
            driver.bikeAnnuity.annuityImage.back.url = (await ImageToUrl(
              driver.bikeAnnuity?.annuityImage.back.url as File
            )) as string;
          }
        }
        if (driver.passport?.passportImage.url != "") {
          if (driver.passport?.passportImage.url instanceof File) {
            driver.passport.passportImage.url = (await ImageToUrl(
              driver.passport?.passportImage.url as File
            )) as string;
          }
        }

        await driverRepository.updateDriver(driver);
        toastStore.set(ToastMessages.SUCCESS);
      } catch (e) {
        console.log("Error :", e);
        toastStore.set(ToastMessages.WARNING);
      }
    },
    delete: async (id: string) => {
      try {
        let document = await driverRepository.getDriver(id);

        if (document === null)
          throw new Error(`Driver not found with the following id:${id}`);

        await driverRepository.deleteDriver(id);

        await driverStore.getAll();

        toastStore.set(ToastMessages.ERROR);
        return "Deleted";
      } catch (e) {
        console.log("Error :", e);
        toastStore.set(ToastMessages.WARNING);
      }
    },
  };
};

export const driverStore = createDriverStore();
