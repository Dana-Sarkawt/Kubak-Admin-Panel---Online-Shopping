<script lang="ts">
  import { Label, Input, NavLi, NavUl, Navbar } from "flowbite-svelte";

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
  import { ListPlaceholder } from 'flowbite-svelte';
  let loading = true; // Loading state variable

  let filter: GenericListOptions = {
    page: parseInt($page.params.page),
    limit: 8,
    sortField: undefined,
  };

  onMount(async () => {
    try {
      await itemStore.getAll(filter);
    } finally {
      loading = false; // Set loading to false once data is loaded or if there's an error
    }
  });
</script>

<ReportsLinks />

{#if loading}
<div class="w-full flex justify-center mt-12">

  <ListPlaceholder class="w-full bg-[#fff]" divClass="mx-16 dark:bg-[#212121] rounded-lg p-2"/>
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
            <TableBodyCell>{moment(item.createdAt).format("DD-MMM-YYYY")}</TableBodyCell>
            <TableBodyCell>{moment(item.updatedAt).format("DD-MMM-YYYY")}</TableBodyCell>
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
