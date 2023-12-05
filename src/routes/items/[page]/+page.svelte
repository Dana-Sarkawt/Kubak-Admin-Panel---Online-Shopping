<script lang="ts">
  import moment from "moment";
  import {
  Spinner,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { Label, Input } from "flowbite-svelte";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  import { onMount } from "svelte";
  import { itemStore } from "$lib/Stores/Items.Store";
  import { page } from "$app/stores";
  import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";

  let filter: GenericListOptions = {
    page: parseInt($page.params.page),
    limit: 7
  };

  let pages: number;
  let loading = true; 
  onMount(async () => {
    try {
      await itemStore.getAll(filter);
    } finally {
      loading = false;
    }
  });

  async function filterOptions() {
    await itemStore.getAll(filter);
  }

  async function resetDate() {
    filter.search = "";
    filter.from = "";
    filter.to = "";
    await itemStore.getAll(filter);
  }

  async function deleteItem(id:string) {

await itemStore.delete(id);
}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
<div
  class="container mx-auto h-auto px-12 flex justify-center items-center gap-3 mt-44"
>
  <div class="mb-6">
    <Label for="large-input" class="block mb-2">Search</Label>
    <Input
      bind:value={filter.search}
      id="large-input"
      placeholder="Search for Items"
      class="dark:bg-[#212121] dark:text-white"
    />
  </div>

  <div class="mb-6">
    <Label for="large-input" class="block mb-2">From</Label>
    <Input
      bind:value={filter.from}
      id="large-input"
      type="date"
      class="dark:bg-[#212121] dark:text-white"
    />
  </div>

  <div class="mb-6">
    <Label for="large-input" class="block mb-2">To</Label>
    <Input
      bind:value={filter.to}
      id="large-input"
      type="date"
      class="dark:bg-[#212121] dark:text-white"
    />
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <a on:click={resetDate} class="cursor-pointer">
    <button
      class="bg-white dark:bg-[#212121] dark:text-white text-xs lg:text-lg h-12 p-3 rounded-xl text-center flex justify-center items-center"
      >Reset Date
    </button>
  </a>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={filterOptions} class="cursor-pointer">
    <img
      src="/images/search.png"
      alt=""
      class="w-12 bg-[#f17f18] dark:hover:bg-[#f17f18] hover:bg-[#212121] ease-in-out duration-300 dark:bg-[#212121] p-3 rounded-xl"
    />
  </a>

  <a href="/items/add">
    <button
      class="w-12 h-12 bg-[#f17f18] dark:hover:bg-[#f17f18] hover:bg-[#212121] ease-in-out duration-300 dark:bg-[#212121] p-3 rounded-xl text-white text-2xl flex justify-center items-center"
    >
      +
    </button>
  </a>
</div>




{#if loading}
<div class="w-full flex justify-center mt-12">

  <Spinner />
</div>
{:else}
<div class="container mx-auto px-12 mt-12">
  <Table shadow>
    <TableHead class="bg-[#2D2D2D] dark:bg-[#212121] text-white text-center">
      <TableHeadCell>Image</TableHeadCell>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Production Date</TableHeadCell>
      <TableHeadCell>Expiration Date</TableHeadCell>
      <TableHeadCell>Quantity</TableHeadCell>
      <TableHeadCell>Cost</TableHeadCell>
      <TableHeadCell></TableHeadCell>
    </TableHead>
    <TableBody>
      {#each $itemStore.data as item}
        <TableBodyRow class="text-center dark:bg-[#272727]">
          <TableBodyCell class="flex justify-center">
            <img src={item.itemImage??"/images/item.png"} alt="" class="w-14" />
          </TableBodyCell>
          <TableBodyCell>{item.name}</TableBodyCell>

          <TableBodyCell
            >{moment(item.productionDate).format("DD-MMM-YYYY")}</TableBodyCell
          >
          <TableBodyCell
            >{moment(item.expiredDate).format("DD-MMM-YYYY")}</TableBodyCell
          >
          <TableBodyCell>{item.quantity}</TableBodyCell>
          <TableBodyCell>{item.price}</TableBodyCell>
          <TableBodyCell tdClass="w-16 h-24 flex gap-2 justify-center items-center mr-4" class="flex justify-center items-center">
            <a href="/items/edit/{item.id}" class="flex items-center justify-center h-12">
              <div class="flex items-center justify-center h-12">
                <img
                  src="/images/edit.png"
                  alt=""
                  class="w-12 bg-green-500  hover:bg-green-400 ease-in-out duration-300  p-1 rounded-md "
                />
              </div>
            </a>

            <a href="#" class="flex items-center justify-center h-12" on:click={()=>deleteItem(item.id)}>
              <div class="flex items-center justify-center h-12">
                <img
                  src="/images/trash-bin.png"
                  alt=""
                  class="w-12 bg-red-600  hover:bg-red-500 ease-in-out duration-300  p-1 rounded-md"
                />
              </div>
            </a>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>
{/if}
<Pagination name="items" {pages} {filter} Store={itemStore} />
