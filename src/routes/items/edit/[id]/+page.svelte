<script lang="ts">
  import { page } from "$app/stores";
  import type { CreateItemRequest } from "$lib/Models/Requests/CreateItem.Request.Model";
  import { authStore } from "$lib/Stores/Auth.Store";
  import { categoryStore } from "$lib/Stores/Categories.Store";
  import { itemStore } from "$lib/Stores/Items.Store";
  import { Label, Input } from "flowbite-svelte";
  import { MultiSelect } from "flowbite-svelte";
  import { onMount } from "svelte";
  import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model.js";
  import moment from "moment";

  import { Button, Modal } from "flowbite-svelte";
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";
  import { goto } from "$app/navigation";
  let popupModal = false;
  let options: CreateItemRequest = {
    id: "",
    name: "",
    categoryId: [],
    price: 0,
    quantity: 0,
    productionDate: new Date(),
    expiredDate: new Date(),
    image: {
      url: "",
    },
  };
  let categories: { value: string; name: string }[] = [];
  let selected: string[];

  onMount(async () => {
    const item: ItemDto = (await itemStore.get($page.params.id)) as ItemDto;
    await categoryStore.getAll();

    selected = item.category?.map((category) => {
      return category.id;
    }) as string[];

    categories = $categoryStore.data.map((category) => {
      return {
        value: category.id,
        name: category.name,
      };
    });

    options = {
      id: item.id,
      name: item.name,
      categoryId: selected,
      price: item.price,
      quantity: item.quantity,
      productionDate: moment(item.productionDate).format("YYYY-MM-DD"),
      expiredDate: moment(item.expiredDate).format("YYYY-MM-DD"),
      image: {
        url: "",
        localUrl: item.itemImage,
      }
    };
  });

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    options.image.url = file;
    options.image.localUrl = URL.createObjectURL(file);
  }

  let inputValue = "";

  function handleInputChange(activeEvent: any) {
    inputValue = activeEvent.target.value;
  }

  async function update() {
    console.log(options);
    await itemStore.update(options);
    goto("/items/1");
  }
</script>

<div class="container mx-auto h-auto">
  <a href="/items/1">
    <button
      class="bg-white dark:bg-[#212121] px-5 py-3 rounded-xl m-3 text-[#f17f18] font-bold"
      >Back</button
    >
  </a>
</div>

<div
  class="container mx-auto max-w-2xl flex justify-center items-center flex-col gap-3 mt-23 py-12 rounded-xl bg-white dark:bg-[#212121]"
>
  <div
    class="w-60 h-60 bg-[#e9e9e9] dark:bg-[#363636] flex justify-center items-center rounded-lg"
  >
    <img
      src={options.image.localUrl ?? "/images/addImage.jpg"}
      alt=""
      class="object-contain w-44 h-44 object-center p-1 rounded-xl flex"
    />
  </div>

  <input
    type="file"
    id="uploadBtn"
    on:input={handleInputChange}
    on:change={handleFileChange}
    accept=".jpg, .jpeg, .png"
  />
  <label for="uploadBtn" class=" bg-[#f0f0f0] dark:bg-[#363636]"
    >Add Image</label
  >

  <div class="mb-6 w-4/5 flex justify-center items-start flex-col">
    <Label for="large-input" class="block mb-2">Name</Label>
    <Input
      bind:value={options.name}
      id="large-input"
      size="lg"
      required
      placeholder="Add item"
      class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
    />

    <div class="w-full flex flex-col mt-2">
      <Label for="large-input" class="block mb-2">Category</Label>
      {#if selected}
        <MultiSelect
          class="py-4 on:input={handleInputChange}   dark:bg-[#363636]"
          dropdownClass="dark:bg-[#363636]"
          items={categories}
          bind:value={selected}
        />
      {/if}
    </div>
    <div class="w-full grid grid-cols-2 items-center justify-center gap-2 my-3">
      <div class="w-full flex flex-col">
        <Label for="large-input" class="block mb-2">Price</Label>
        <Input
          bind:value={options.price}
          on:input={handleInputChange}
          id="large-input"
          size="lg"
          required
          type="number"
          class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
        />
      </div>

      <div class="w-full flex flex-col">
        <Label for="large-input" class="block mb-2">Quantity</Label>
        <Input
          bind:value={options.quantity}
          on:input={handleInputChange}
          id="large-input"
          size="lg"
          required
          type="number"
          class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
        />
      </div>
    </div>

    <div class="w-full flex justify-center items-center gap-2 my-2">
      <div class="w-full flex flex-col">
        <Label for="large-input" class="block mb-2">Production Date</Label>
        {#if options.productionDate}
          <Input
            bind:value={options.productionDate}
            id="large-input"
            size="lg"
            required
            type="date"
            class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
          />
        {/if}
      </div>

      <div class="w-full flex flex-col">
        <Label for="large-input" class="block mb-2">Expiration Date</Label>
        <Input
          bind:value={options.expiredDate}
          id="large-input"
          size="lg"
          type="date"
          class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
          required
        />
      </div>
    </div>

    <Label for="large-input" class="block mb-2">Detail</Label>
    <textarea
      bind:value={options.detail}
      name=""
      id=""
      cols="67"
      rows="10"
      class="rounded-xl border-gray-400 dark:bg-[#363636] dark:text-white"
    />
  </div>
  <button
    on:click={() => (popupModal = true)}
    disabled={!options.name ||
      !options.image.localUrl ||
      !options.price ||
      !options.quantity ||
      !options.productionDate ||
      !options.expiredDate}
    class="bg-[#f17f18] font-bold text-white py-3 px-8 rounded-xl"
    type="submit">Update Item</button
  >

  <Modal bind:open={popupModal} size="xs" autoclose>
    <div class="text-center">
      <ExclamationCircleOutline
        class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
      />
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Are you sure you want to Update this Item?
      </h3>
      <Button color="primary" class="me-2" on:click={update}
        >Yes, I'm sure</Button
      >
      <Button color="alternative">No, cancel</Button>
    </div>
  </Modal>
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
