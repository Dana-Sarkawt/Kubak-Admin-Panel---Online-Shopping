<script lang="ts">
  import { page } from "$app/stores";
  import { Label, Input, NavLi, NavUl, Navbar, Spinner } from "flowbite-svelte";

  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { categoryStore } from "$lib/Stores/Categories.Store";
  import moment from "moment";
  import { onMount } from "svelte";
  import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  import ReportsLinks from "$lib/Components/ReportsLinks.Component.svelte";
  import { ListPlaceholder } from 'flowbite-svelte';
  let filter: GenericListOptions = {
    page: parseInt($page.params.page),
    limit: 5,
    sortField: undefined,
  };
  let pages: number = 0;

  onMount(async () => {
    await categoryStore.getAll(filter);
    pages = $categoryStore.pages as number;
  });

  let loading = true; 
  onMount(async () => {
    try {
      await categoryStore.getAll(filter);
      pages = $categoryStore.pages as number;
    } finally {
      loading = false; 
    }
  });
</script>

<ReportsLinks />
{#if loading}
<div class="w-full flex justify-center mt-12">

  <Spinner />
</div>
{:else}
  <div class="container mx-auto px-12 mt-12">
    <p
      class="bg-[#636363] w-44 h-8 flex items-center justify-center text-white text-center rounded-t-lg ml-3"
    >
      TOTAL: {$categoryStore.total}
    </p>
    <Table shadow>
      <TableHead class="bg-[#2D2D2D] dark:bg-[#212121] text-white text-center">
        <TableHeadCell>Image</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Created At</TableHeadCell>
        <TableHeadCell>Updated At</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each $categoryStore.data as category}
          <TableBodyRow class="text-center dark:bg-[#272727]">
            <TableBodyCell class="flex justify-center">
              <img src={category.categoryImage ?? "/images/rice.png"} alt="" class="w-14 h-14 object-cover object-center rounded-lg" />
            </TableBodyCell>
            <TableBodyCell>{category.name}</TableBodyCell>
  
            <TableBodyCell>{moment(category.createdAt).format("DD-MMM-YYYY")}</TableBodyCell>
            <TableBodyCell>{moment(category.updatedAt).format("DD-MMM-YYYY")}</TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>
  {/if}
  <Pagination name="report/category" {filter} pages={$categoryStore.pages} Store={categoryStore}/>
  
