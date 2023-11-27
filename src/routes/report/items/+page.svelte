<script lang="ts">
    import { page } from "$app/stores";
    import {
      Pagination,
      Label,
      Input,
      NavLi,
      NavUl,
      Navbar,
    } from "flowbite-svelte";
    import {
      ChevronLeftOutline,
      ChevronRightOutline,
    } from "flowbite-svelte-icons";
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
  
    onMount(async () => {
      await itemStore.getAll();
    });
  
  
    const previous = () => {
      alert("Previous btn clicked. Make a call to your server to fetch data.");
    };
    const next = () => {
      alert("Next btn clicked. Make a call to your server to fetch data.");
    };
  </script>
  
  <div
    class="flex justify-center items-center w-full h-24 gap-2 overflow-y-hidden mt-44 px-3"
  >
    <Navbar
      class="bg-[#f5f5f5] dark:bg-[#363636] flex justify-center items-center w-full"
    >
      <NavUl
        divClass="flex justify-center items-center w-full duration-300 ease-in-out"
        ulClass="flex justify-center items-center w-full gap-3"
        activeClass="bg-[#f17f18] w-44 h-12 font-bold text-center rounded-full text-white flex justify-center items-center"
        nonActiveClass="bg-gray-300 dark:bg-[#212121] dark:text-white font-bold w-44 h-12 text-center rounded-full text-black flex justify-center items-center"
      >
        <NavLi href="/raport/items" class="bg-[#f17f18] text-white dark:bg-[#f17f18]">Items</NavLi>
        <NavLi href="/raport/category">Category</NavLi>
        <NavLi href="#">Orders</NavLi>
      </NavUl>
    </Navbar>
  </div>
  
  <div
    class="container mx-auto h-auto px-12 flex justify-center items-center gap-3 mt-16"
  >
    <div class="mb-6">
      <Label for="large-input" class="block mb-2">Search</Label>
      <Input
        id="large-input"
        placeholder="Search for Items"
        class="dark:bg-[#212121]"
      />
    </div>
  
    <div class="mb-6">
      <Label for="large-input" class="block mb-2">From</Label>
      <Input id="large-input" type="date" class="dark:bg-[#212121]" />
    </div>
  
    <div class="mb-6">
      <Label for="large-input" class="block mb-2">To</Label>
      <Input id="large-input" type="date" class="dark:bg-[#212121]" />
    </div>
    <a href="#">
      <button
        class="bg-white dark:bg-[#212121] dark:hover:bg-[#f17f18] duration-300 ease-in-out dark:text-white text-xs lg:text-lg h-12 p-3 rounded-xl text-center flex justify-center items-center"
        >Reset Date
      </button>
    </a>
  
    <a href="#">
      <img
        src="/images/search.png"
        alt=""
        class="w-12 bg-[#f17f18] p-3 rounded-xl dark:bg-[#212121] hover:bg-[#212121] dark:hover:bg-[#f17f18] duration-300 ease-in-out"
      />
    </a>
  </div>
  
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
              <img src={item.itemImage ?? "/images/rice.png"} alt="" class="w-14" />
            </TableBodyCell>
            <TableBodyCell>{item.name}</TableBodyCell>
  
            <TableBodyCell>{moment(item.createdAt).format("DD-MMM-YYYY")}</TableBodyCell>
            <TableBodyCell>{moment(item.updatedAt).format("DD-MMM-YYYY")}</TableBodyCell>
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
  