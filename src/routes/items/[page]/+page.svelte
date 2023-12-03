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
    limit: 7,
    sortField: undefined,
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
</script>

<div
  class="container mx-auto h-auto px-12 flex justify-center items-center gap-3 mt-44"
>
  <div class="mb-6">
    <Label for="large-input" class="block mb-2">Search</Label>
    <Input
      id="large-input"
      placeholder="Search for Items"
      class="dark:bg-[#212121] dark:text-white"
    />
  </div>

  <div class="mb-6">
    <Label for="large-input" class="block mb-2">From</Label>
    <Input
      id="large-input"
      type="date"
      class="dark:bg-[#212121] dark:text-white"
    />
  </div>

  <div class="mb-6">
    <Label for="large-input" class="block mb-2">To</Label>
    <Input
      id="large-input"
      type="date"
      class="dark:bg-[#212121] dark:text-white"
    />
  </div>
  <a href="#">
    <button
      class="bg-white dark:bg-[#212121] dark:text-white text-xs lg:text-lg h-12 p-3 rounded-xl text-center flex justify-center items-center"
      >Reset Date
    </button>
  </a>

  <a href="#">
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
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>
{/if}
<Pagination name="items" {pages} {filter} Store={itemStore} />
