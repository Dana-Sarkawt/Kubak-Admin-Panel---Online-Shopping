import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { DriverDto } from "$lib/Models/DTO/Driver.DTO.Model";
import { ToastMessages } from "$lib/Models/Enums/Toast-Messages.Enum.Model";
import type { Store } from "$lib/Models/Response/Store.Response";
import { DriverRepository } from "$lib/Repositories/Implementation/Drivers.Repository";
import { writable } from "svelte/store";
import { toastStore } from "$lib/Stores/Toast.Store";
import { authStore } from "$lib/Stores/Auth.Store";
import type { CreateDriverRequest } from "$lib/Models/Requests/CreateDriver.Request.Model";
import type { AuthDto } from "$lib/Models/DTO/Auth.DTO.Model";
import { ImageToUrl } from "../../utils/ImageToUrl.Utils";
import { HttpError } from "$lib/Errors/HttpErrors.Error";
import { Errors } from "$lib/Models/Enums/Errors.Enum.Model";
import { errorStore } from "./Errors.Store";

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
        if (!id)
          throw new HttpError(Errors.BadRequest, "Driver Id is required");
        let document = await driverRepository.getDriver(id);
        if (document == null)
          throw new HttpError(Errors.NotFound, "Driver not found");
        if (document.userId == "")
          throw new HttpError(Errors.BadRequest, "Driver User Id is required");
        const userDto: AuthDto = (await authStore.getUser(
          document.userId
        )) as AuthDto;
        return Dto.ToDriverDto(document, userDto);
      } catch (e) {
        if (e instanceof HttpError) errorStore.add(e.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        let { documents, total } = await driverRepository.getDrivers(options);

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
        toastStore.set(ToastMessages.WARNING);
      }
    },
    create: async (driver: CreateDriverRequest) => {
      try {
        if (driver.userId == "") {
          throw new HttpError(Errors.BadRequest, "Driver User Id is required");
        }
        if (driver.bikeAnnuity.model == "") {
          throw new HttpError(
            Errors.BadRequest,
            "Driver Bike Annuity Model is required"
          );
        }
        if (
          (driver.bikeAnnuity.year as number) < 1980 ||
          (driver.bikeAnnuity.year as number) > 2100
        ) {
          throw new HttpError(
            Errors.BadRequest,
            `Driver Bike Annuity Year Must Be Between 1980 And 2100`
          );
        }
        if (driver.bikeAnnuity.color == "") {
          throw new HttpError(
            Errors.BadRequest,
            "Driver Bike Annuity Color is required"
          );
        }
        if (driver.bikeAnnuity.plateImage.url == "") {
          throw new HttpError(
            Errors.BadRequest,
            "Driver Bike Annuity Plate Number is required"
          );
        }
        if (driver.bikeAnnuity.plateNumber == "") {
          throw new HttpError(
            Errors.BadRequest,
            "Driver Bike Annuity Plate Number is required"
          );
        }
        if (driver.bikeAnnuity.annuityImage.front.url == "") {
          throw new HttpError(
            Errors.BadRequest,
            "Driver Bike Annuity Front Image is required"
          );
        }
        if (driver.bikeAnnuity.annuityImage.back.url == "") {
          throw new HttpError(
            Errors.BadRequest,
            "Driver Bike Annuity Back Image is required"
          );
        }
        if (driver.bikeAnnuity.annuityNumber == "") {
          throw new HttpError(
            Errors.BadRequest,
            "Driver Bike Annuity Number is required"
          );
        }
        if (driver.passport.passportNumber == "") {
          throw new HttpError(
            Errors.BadRequest,
            "Driver Passport Number is required"
          );
        }
        if (driver.passport.passportImage.url == "") {
          throw new HttpError(
            Errors.BadRequest,
            "Driver Passport Image is required"
          );
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
        if (driver.labels.length == 0) {
          const user = await authStore.getUser(driver.userId);
          if (user?.roles.includes("Driver")) {
            driver.labels = user?.roles;
          } else {
            user?.roles.push("Driver");
            driver.labels = user?.roles as string[];
          }
        }
        await driverRepository.createDriver(driver);
        toastStore.set(ToastMessages.SUCCESS);
      } catch (e) {
        if (e instanceof HttpError) errorStore.add(e.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
    update: async (driver: CreateDriverRequest) => {
      try {
        const document = await driverRepository.getDriver(driver.id as string);

        if (document === null) {
          throw new HttpError(
            Errors.NotFound,
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
        if (e instanceof HttpError) errorStore.add(e.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
    delete: async (id: string) => {
      try {
        let document = await driverRepository.getDriver(id);

        if (document === null)
          throw new HttpError(
            Errors.NotFound,
            `Driver not found with the following id:${id}`
          );

        await driverRepository.deleteDriver(id);

        await driverStore.getAll();

        toastStore.set(ToastMessages.ERROR);
        return "Deleted";
      } catch (e) {
        if (e instanceof HttpError) errorStore.add(e.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
  };
};

export const driverStore = createDriverStore();
