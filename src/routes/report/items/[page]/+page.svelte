<script lang="ts">
  import { Label, Input, Spinner } from "flowbite-svelte";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { itemStore } from "$lib/Stores/Items.Store";
  import moment from "moment";
  import { onMount } from "svelte";
  import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
  import { page } from "$app/stores";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  import ReportsLinks from "$lib/Components/ReportsLinks.Component.svelte";
  let loading = true;

  let filter: GenericListOptions = {
    page: parseInt($page.params.page),
    limit: 5,
  };
  let pages: number;

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

  $: {
    if ($itemStore) {
      pages = $itemStore.pages as number;
      console.log(pages);
    }
  }
</script>

<ReportsLinks />

<div
  class="container mx-auto h-auto px-12 flex justify-center items-center gap-3 mt-16"
>
  <div class="mb-6">
    <Label for="large-input" class="block mb-2">Search</Label>
    <Input
      bind:value={filter.search}
      id="large-input"
      placeholder="Search for Items"
      class="dark:bg-[#212121]"
    />
  </div>

  <div class="mb-6">
    <Label for="large-input" class="block mb-2">From</Label>
    <Input
      id="large-input"
      bind:value={filter.from}
      type="date"
      class="dark:bg-[#212121]"
    />
  </div>

  <div class="mb-6">
    <Label for="large-input" class="block mb-2">To</Label>
    <Input
      id="large-input"
      type="date"
      class="dark:bg-[#212121] "
      bind:value={filter.to}
    />
  </div>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="#" on:click={resetDate}>
    <button
      class="bg-white dark:bg-[#212121] dark:hover:bg-[#f17f18] duration-300 ease-in-out dark:text-white text-xs lg:text-lg h-12 p-3 rounded-xl text-center flex justify-center items-center"
      >Reset Date
    </button>
  </a>

  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="#" on:click={filterOptions}>
    <img
      src="/images/search.png"
      alt=""
      class="w-12 bg-[#f17f18] p-3 rounded-xl dark:bg-[#212121] hover:bg-[#212121] dark:hover:bg-[#f17f18] duration-300 ease-in-out"
    />
  </a>
</div>

{#if loading}
  <div class="w-full flex justify-center mt-12">
    <Spinner />
  </div>
{:else}
  <div class="container mx-auto px-12 mt-12">
    <p
      class="bg-[#636363] w-44 h-8 flex items-center justify-center text-white text-center rounded-t-lg ml-3"
    >
      TOTAL: {$itemStore.total}
    </p>
    <Table shadow>
      <TableHead class="bg-[#2D2D2D] dark:bg-[#212121] text-white text-center">
        <TableHeadCell>Image</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Created At</TableHeadCell>
        <TableHeadCell>Updated At</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each $itemStore.data as item}
          <TableBodyRow class="text-center dark:bg-[#272727]">
            <TableBodyCell class="flex justify-center">
              <img
                src={item.itemImage ?? "/images/item.png"}
                alt=""
                class="w-14 h-14 object-cover object-center rounded-lg"
              />
            </TableBodyCell>
            <TableBodyCell>{item.name}</TableBodyCell>
            <TableBodyCell
              >{moment(item.createdAt).format("DD-MMM-YYYY")}</TableBodyCell
            >
            <TableBodyCell
              >{moment(item.updatedAt).format("DD-MMM-YYYY")}</TableBodyCell
            >
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <Pagination
    name="report/items"
    {filter}
    pages={$itemStore.pages}
    Store={itemStore}
  />
{/if}
