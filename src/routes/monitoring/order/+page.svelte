<script lang="ts">
  import type { AuthDto } from "$lib/Models/DTO/Auth.DTO.Model";
  import type { CreateOrderRequest } from "$lib/Models/Requests/CreateOrder.Request";
  import { addressStore } from "$lib/Stores/Address.Store";

  import { authStore } from "$lib/Stores/Auth.Store";
  import { itemStore } from "$lib/Stores/Items.Store";
  import { ordersStore } from "$lib/Stores/Orders.Store";
  import { Label, Input } from "flowbite-svelte";
  import { onMount } from "svelte";
  let options: CreateOrderRequest = {
    id: null,
    items: [{
      itemId: "",
      quantity: 0,
    }],
    userId: "",
    addressId: "",
  };

  let listUsers: AuthDto[] = [];

  onMount(async () => {
    listUsers = (await authStore.listUsers())?.data as AuthDto[];
    await itemStore.getAll();
    await addressStore.getAll();
  });

  async function create(options: CreateOrderRequest) {
    options.userId = $authStore?.id ?? "";
    await ordersStore.create(options);
  }

  var add_button = 0;
  function addInput() {
    add_button++;
    if (add_button == 5) {
      add_button = 4;
    }
    var newInput = document.createElement("div");
    newInput.innerHTML =
      "<div class='w-full flex flex-col h-auto'><Label for='large-input' class='block mb-2'>Items</Label><select name='' id='' class='w-full pt-2 rounded-lg h-12  border-gray-300'><option value=''></option></select></div><div class='w-full flex flex-col'><Label for='large-input' class='block mb-2'>Quantity</Label><Input bind:value={options.quantity} id='large-input' size='lg' required type='number' class='w-full rounded-xl dark:bg-[#363636] dark:text-white'/></div>";
  }

  function deleteInput() {
    add_button--;
    var newInput = document.createElement("div");
    newInput.innerHTML =
      "<div class='w-full flex flex-col h-auto'><Label for='large-input' class='block mb-2'>Items</Label><select name='' id='' class='w-full pt-2 rounded-lg h-12  border-gray-300'><option value=''></option></select></div><div class='w-full flex flex-col'><Label for='large-input' class='block mb-2'>Quantity</Label><Input bind:value={options.quantity} id='large-input' size='lg' required type='number' class='w-full rounded-xl dark:bg-[#363636] dark:text-white'/></div>";
  }
</script>

<div class="container mx-auto h-auto">
  <a href="/monitoring">
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
    <Label for="large-input" class="block mb-2">User</Label>
    <select
      name=""
      id=""
      class="w-full pt-2 rounded-lg dark:bg-[#2c2c2c] dark:border-[#3b3b3b] dark:text-white border-gray-300" bind:value={options.userId}
    >
      {#each listUsers as user}
        <option value={user.id}
          >{user.name.length > 0 ? user.name : "No Name"}</option
        >
      {/each}
    </select>

    <div class="w-full h-auto flex justify-center items-end mt-2 gap-2">
      <button
        class="w-28 h-12 flex justify-center items-center text-lg text-white bg-[#f17f18] rounded-lg"
        on:click={addInput}>+</button
      >

      <div class="w-full flex flex-col h-auto">
        <Label for="large-input" class="block mb-2">Items</Label>
        <select
          name=""
          id=""
          class="w-full pt-2 rounded-lg h-12 border-gray-300 dark:bg-[#2c2c2c] dark:border-[#3b3b3b] dark:text-white"
          bind:value={options.items[0].itemId}
        >
          {#each $itemStore.data as item}
            <option value={item.id}>{item.name}</option>
          {/each}
        </select>
      </div>

      <div class="w-full flex flex-col">
        <Label for="large-input" class="block mb-2">Quantity</Label>
        <Input
          id="large-input"
          size="lg"
          required
          type="number"
          class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
          bind:value={options.items[0].quantity}
        />
      </div>
    </div>

    {#if add_button > 0}
      {#each Array(add_button) as _, index}
        <div class="w-full h-auto flex justify-center items-end mt-2 gap-2">
          <button
            class="w-28 h-12 flex justify-center items-center text-lg font-bold text-white bg-red-600 rounded-lg"
            on:click={deleteInput}>-</button
          >

          <div class="w-full flex flex-col h-auto">
            <Label for="large-input" class="block mb-2">Items</Label>
            <select
              name=""
              id=""
              class="w-full pt-2 rounded-lg h-12 border-gray-300 dark:bg-[#2c2c2c] dark:border-[#3b3b3b] dark:text-white"
              bind:value={options.items[index + 1].itemId}
            >
              {#each $itemStore.data as item}
                <option value={item.id}>{item.name}</option>
              {/each}
            </select>
          </div>

          <div class="w-full flex flex-col">
            <Label for="large-input" class="block mb-2">Quantity</Label>
            <Input
              id="large-input"
              size="lg"
              required
              type="number"
              class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
              bind:value={options.items[index + 1].quantity}
            />
          </div>
        </div>
      {/each}
    {/if}

    <Label for="large-input" class="block mb-2 mt-2">Address</Label>
    <select
      name=""
      id=""
      class="w-full pt-2 rounded-lg h-12 border-gray-300 dark:bg-[#2c2c2c] dark:border-[#3b3b3b] dark:text-white"
    >
      {#if $addressStore}
        {#each $addressStore.data as address}
          <option value={address.id}
            >{address.street} / {address.building} / {address.buildingType}</option
          >
        {/each}
      {/if}
    </select>
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
