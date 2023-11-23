<script lang="ts">
  import type { CategoryDto } from "$lib/Models/DTO/Category.DTO.Model";
  import type { CreateItemRequest } from "$lib/Models/Requests/CreateItem.Request";
  import { categoryStore } from "$lib/Stores/Categories.Store";
  import { itemStore } from "$lib/Stores/Items.Store";
  import { Label, Input } from "flowbite-svelte";

  let options: CreateItemRequest = {
    id: null,
    name: "",
    category: "",
    price: 0,
    quantity: 0,
    productionDate: new Date(),
    expireDate: new Date(),
    image: {
      url: "",
    },
    userId: "",
  };

  function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) {
            return;
        }
        const file = input.files[0];
        options.image.url = file;
        options.image.localUrl = URL.createObjectURL(file);
    }



  


  function create(options: CreateItemRequest): any {
    throw new Error("Function not implemented.");
  }
</script>

<div class="container mx-auto h-auto">
  <a href="/items">
    <button
      class="bg-white dark:bg-[#212121] px-5 py-3 rounded-xl m-3 text-[#f17f18] font-bold"
      >Back</button
    >
  </a>
</div>

<div
  class="container mx-auto max-w-2xl flex justify-center items-center flex-col gap-3 mt-32 py-12 rounded-xl bg-white dark:bg-[#212121]"
>
  <img

    src="/images/rice.png"
    alt=""
    class="w-44 h-44 object-cover p-5 rounded-xl flex bg-[#B0AFAF] dark:bg-[#363636]"
  />

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
      placeholder="Add item"
      class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
    />

    <div class="w-full grid grid-cols-3 items-center justify-center gap-2 my-3">
      <div class="w-full flex flex-col">
        <Label for="large-input" class="block mb-2">Category</Label>
        <select
          bind:value={options.category}
          name="category"
          id=""
          class="rounded-xl dark:bg-[#363636] dark:text-white h-12"
        >
          <option value="Crop">Crop</option>
        </select>
      </div>

      <div class="w-full flex flex-col">
        <Label for="large-input" class="block mb-2">Price</Label>
        <Input
          bind:value={options.price}
          id="large-input"
          size="lg"
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
          type="date"
          class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
        />
      </div>

      <div class="w-full flex flex-col">
        <Label for="large-input" class="block mb-2">Expiration Date</Label>
        <Input
          bind:value={options.expireDate}
          id="large-input"
          size="lg"
          type="date"
          class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
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
  on:click={()=> create(options)}
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
