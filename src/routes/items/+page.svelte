<script lang="ts">
  import moment from "moment";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { Label, Input } from "flowbite-svelte";

  import { page } from "$app/stores";
  import { Pagination } from "flowbite-svelte";
  import {
    ChevronLeftOutline,
    ChevronRightOutline,
  } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { itemStore } from "$lib/Stores/Items.Store";

  $: activeUrl = $page.url.searchParams.get("page");
  let pages = [
    { name: 1, href: "/items" },
    { name: 2, href: "/components/pagination?page=7" },
    { name: 3, href: "/components/pagination?page=8" },
    { name: 4, href: "/components/pagination?page=9" },
    { name: 5, href: "/components/pagination?page=10" },
  ];

  const previous = () => {
    alert("Previous btn clicked. Make a call to your server to fetch data.");
  };
  const next = () => {
    alert("Next btn clicked. Make a call to your server to fetch data.");
  };

  onMount(async () => {
    await itemStore.getAll();
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
            <img src="/images/rice.png" alt="" class="w-14" />
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

<div class="w-full flex justify-center items-center mt-3">
  <Pagination

    on:previous={previous}
    on:next={next}
    icon
    class="shadow-lg rounded-lg"
    activeClass="bg-gradient-to-b from-[#f17f17] to-[#ffab65] text-white"
    normalClass="text-[#f17f18] dark:text-white"
  >
    <svelte:fragment slot="prev">
      <span class="sr-only">Previous</span>
      <ChevronLeftOutline class="w-2.5 h-2.5" />
    </svelte:fragment>
    <svelte:fragment slot="next">
      <span class="sr-only">Next</span>
      <ChevronRightOutline class="w-2.5 h-2.5" />
    </svelte:fragment>
  </Pagination>
</div>
