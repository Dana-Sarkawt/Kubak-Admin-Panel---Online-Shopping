<script lang="ts">
  import type { CreateDriverRequest } from "$lib/Models/Requests/CreateDriver.Request.Model";
  import { driverStore } from "$lib/Stores/Drivers.Store";
  import { Label, Input, Spinner } from "flowbite-svelte";
  let options: CreateDriverRequest = {
    userId: "",
    onlineStatus: false,
    bikeAnnuity: {
      model: "",
      year: 0,
      color: "",
      plateImage: {
        url: "",
      },
      plateNumber: "",
      annuityImage: {
        front: {
          url: "",
        },
        back: {
          url: "",
        },
      },
      annuityNumber: "",
    },
    passport: {
      passportImage: {
        url: "",
      },
      passportNumber: "",
    },
  };

  function handleFileChange(event: Event, field?: string) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    console.log("field", field);

    switch (field) {
      case "plateImage":
        const file = input.files[0];
        options.bikeAnnuity!.plateImage.url = file;
        options.bikeAnnuity!.plateImage.localUrl = URL.createObjectURL(file);
        break;
      case "annuityImageFront":
        const fileFront = input.files[0];
        options.bikeAnnuity!.annuityImage.front.url = fileFront;
        options.bikeAnnuity!.annuityImage.front.localUrl =
          URL.createObjectURL(fileFront);
        break;
      case "annuityImageBack":
        const fileBack = input.files[0];
        options.bikeAnnuity!.annuityImage.back.url = fileBack;
        options.bikeAnnuity!.annuityImage.back.localUrl =
          URL.createObjectURL(fileBack);
        break;
      case "passportImage":
        const filePassport = input.files[0];
        options.passport!.passportImage.url = filePassport;
        options.passport!.passportImage.localUrl =
          URL.createObjectURL(filePassport);
        break;
    }
  }

  let isLoading = false;
  async function create(options: CreateDriverRequest) {
    isLoading = true;
    try {
      console.log(options);
      // await driverStore.create(options);
    } finally {
      isLoading = false;
    }
  }

  let inputValue = "";

  function handleInputChange(activeEvent: any) {
    inputValue = activeEvent.target.value;
  }
</script>

<div class="container mx-auto h-auto">
  <a href="/driver">
    <button
      class="bg-white dark:bg-[#212121] px-5 py-3 rounded-xl m-3 text-[#f17f18] font-bold"
      >Back</button
    >
  </a>
</div>

<div
  class="container mx-auto max-w-2xl flex justify-center items-center flex-col gap-3 mt-23 py-12 rounded-xl bg-white dark:bg-[#212121]"
>
  <div class="mb-6 w-4/5 flex justify-center items-start flex-col">
    <Label for="large-input" class="block mb-2">Bike Annuity</Label>
    <Input
      bind:value={options.bikeAnnuity.annuityNumber}
      id="large-input"
      size="lg"
      required
      placeholder="Bike Annuity"
      class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
    />

    <Label class="w-full mt-5 font-bold text-center">
      Add Bike Annuity Images</Label
    >
    <div class="w-full h-auto flex gap-4 justify-center items-center mt-4">
      <div
        class="w-60 h-60 bg-[#e9e9e9] dark:bg-[#363636] flex justify-center items-center rounded-lg flex-col"
      >
        <img
          src={options.bikeAnnuity.annuityImage.front.localUrl ??
            "/images/item.png"}
          alt=""
          class="object-cover w-44 h-44 object-center p-1 rounded-xl flex"
        />
        <input
          type="file"
          id="uploadBtnAnnuityFront"
          on:input={handleInputChange}
          on:change={(event) => handleFileChange(event, "annuityImageFront")}
          accept=".jpg, .jpeg, .png"
        />
        <label
          for="uploadBtnAnnuityFront"
          class=" bg-[#f0f0f0] dark:bg-[#363636]">Add Front Image</label
        >
      </div>

      <div
        class="w-60 h-60 bg-[#e9e9e9] dark:bg-[#363636] flex justify-center items-center rounded-lg flex-col"
      >
        <img
          src={options.bikeAnnuity.annuityImage.back.localUrl ??
            "/images/item.png"}
          alt=""
          class="object-cover w-44 h-44 object-center p-1 rounded-xl flex"
        />
        <input
          type="file"
          id="uploadBtnAnnuityBack"
          on:input={handleInputChange}
          on:change={(event) => handleFileChange(event, "annuityImageBack")}
          accept=".jpg, .jpeg, .png"
        />
        <label
          for="uploadBtnAnnuityBack"
          class=" bg-[#f0f0f0] dark:bg-[#363636]">Add Back Image</label
        >
      </div>
    </div>

    <div class="w-full flex flex-col mt-12">
      <Label for="large-input" class="block mb-2">Passport Number</Label>
      <Input
        bind:value={options.passport.passportNumber}
        id="large-input"
        size="lg"
        required
        placeholder="Passport Number"
        class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
      />

      <div class="w-full h-auto flex gap-4 justify-center items-center mt-4">
        <div
          class="w-full h-60 bg-[#e9e9e9] dark:bg-[#363636] flex justify-center items-center rounded-lg flex-col"
        >
          <img
            src={options.passport.passportImage.localUrl ?? "/images/item.png"}
            alt=""
            class="object-contain w-full h-44 object-center p-1 rounded-xl flex"
          />
          <input
            type="file"
            id="uploadBtnPassport"
            on:input={handleInputChange}
            on:change={(event) => handleFileChange(event, "passportImage")}
            accept=".jpg, .jpeg, .png"
          />
          <label for="uploadBtnPassport" class=" bg-[#f0f0f0] dark:bg-[#363636]"
            >Add Image</label
          >
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col mt-12">
      <Label for="large-input" class="block mb-2">Plate Number</Label>
      <Input
        bind:value={options.bikeAnnuity.plateNumber}
        id="large-input"
        size="lg"
        required
        placeholder="Plate Number"
        class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
      />

      <div class="w-full h-auto flex gap-4 justify-center items-center mt-4">
        <div
          class="w-full h-60 bg-[#e9e9e9] dark:bg-[#363636] flex justify-center items-center rounded-lg flex-col"
        >
          <img
            src={options.bikeAnnuity.plateImage.localUrl ?? "/images/item.png"}
            alt=""
            class="object-contain w-full h-44 object-center p-1 rounded-xl flex"
          />
          <input
            type="file"
            id="uploadBtnPlateNumber"
            on:input={handleInputChange}
            on:change={(event) => handleFileChange(event, "plateImage")}
            accept=".jpg, .jpeg, .png"
          />
          <label
            for="uploadBtnPlateNumber"
            class=" bg-[#f0f0f0] dark:bg-[#363636]">Add Image</label
          >
        </div>
      </div>
    </div>
  </div>
  <button
    on:click={() => create(options)}
    disabled={!options.bikeAnnuity?.model ||
      isLoading ||
      !options.bikeAnnuity?.year ||
      !options.bikeAnnuity?.color ||
      !options.bikeAnnuity?.plateImage.url ||
      !options.bikeAnnuity?.plateNumber ||
      !options.bikeAnnuity?.annuityImage.front.url ||
      !options.bikeAnnuity?.annuityImage.back.url ||
      !options.bikeAnnuity?.annuityNumber ||
      !options.passport?.passportImage.url ||
      !options.passport?.passportNumber}
    class="bg-[#f17f18] font-bold text-white py-3 px-8 rounded-xl"
    type="submit"
  >
    {#if isLoading}
      <p>
        <Spinner class="me-3" size="4" color="white" />
        Loading
      </p>
    {:else}
      Add Driver
    {/if}
  </button>
</div>

<style>
  input[type="file"] {
    display: none;
  }

  label {
    display: inline-block;
    color: #f17f18;
    background-color: #f5f5f5;
    text-align: center;
    padding: 5px;
    border-radius: 8px;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.5;
    transition: ease-in-out 0.3s;
  }
</style>
