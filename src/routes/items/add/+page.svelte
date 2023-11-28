<script lang="ts">
  import type { CreateItemRequest } from "$lib/Models/Requests/CreateItem.Request";
  import { authStore } from "$lib/Stores/Auth.Store";
  import { categoryStore } from "$lib/Stores/Categories.Store";
  import { itemStore } from "$lib/Stores/Items.Store";
  import { Label, Input } from "flowbite-svelte";
  import { MultiSelect } from "flowbite-svelte";
  import { onMount } from "svelte";
  let options: CreateItemRequest = {
    id: null,
    name: "",
    categoryId: [],
    price: 0,
    quantity: 0,
    productionDate: new Date(),
    expiredDate: new Date(),
    image: {
      url: "",
    },
    userId: "",
  };
  let categories: { value: string; name: string }[] = [];
  let selected:string[] = [];

  onMount(async () => {
    await categoryStore.getAll();

    categories = $categoryStore.data.map((category) => {
      return {
        value: category.id,
        name: category.name,
      };
    });

    console.log(categories);
    
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

  async function create(options: CreateItemRequest) {
    options.userId = $authStore?.id ?? "";
    options.categoryId = selected;
    console.log(options);
    await itemStore.create(options);
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
<div class="w-60 h-60 bg-[#e9e9e9] dark:bg-[#363636] flex justify-center items-center rounded-lg">

  <img
    src={options.image.localUrl ?? "/images/item.png"}
    alt=""
    class="object-cover w-44 h-44 object-center p-1 rounded-xl flex"
  />
</div>

  <input type="file" id="uploadBtn" on:change={handleFileChange} />
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
      <MultiSelect class="py-4   dark:bg-[#363636]" dropdownClass="dark:bg-[#363636]" items={categories} bind:value={selected}/>
    </div>
    <div class="w-full grid grid-cols-2 items-center justify-center gap-2 my-3">

      <div class="w-full flex flex-col">
        <Label for="large-input" class="block mb-2">Price</Label>
        <Input
          bind:value={options.price}
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
        <Input
          bind:value={options.productionDate}
          id="large-input"
          size="lg"
          required
          type="date"
          class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
        />
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
    on:click={() => create(options)}
    class="bg-[#f17f18] font-bold text-white py-3 px-8 rounded-xl"
    type="submit">Add Item</button
  >
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
</style>
