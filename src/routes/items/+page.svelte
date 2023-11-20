<script>
    // @ts-nocheck

    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
    } from "flowbite-svelte";
    import {Label, Input} from "flowbite-svelte";


    import {page} from '$app/stores';
    import {Pagination} from 'flowbite-svelte';
    import {ChevronLeftOutline, ChevronRightOutline} from 'flowbite-svelte-icons';

    $: activeUrl = $page.url.searchParams.get('page');
    let pages = [
        {name: 1, href: '/items'},
        {name: 2, href: '/components/pagination?page=7'},
        {name: 3, href: '/components/pagination?page=8'},
        {name: 4, href: '/components/pagination?page=9'},
        {name: 5, href: '/components/pagination?page=10'}
    ];

    $: {
        pages.forEach((page) => {
            let splitUrl = page.href.split('?');
            let queryString = splitUrl.slice(1).join('?');
            const hrefParams = new URLSearchParams(queryString);
            let hrefValue = hrefParams.get('page');
            page.active = hrefValue === activeUrl;
        });
        pages = pages;
    }

    const previous = () => {
        alert('Previous btn clicked. Make a call to your server to fetch data.');
    };
    const next = () => {
        alert('Next btn clicked. Make a call to your server to fetch data.');
    };
</script>

<div
        class="container mx-auto h-auto px-12 flex justify-center items-center gap-3 mt-44"
>
  <div class="mb-6">
    <Label for="large-input" class="block mb-2">Search</Label>
    <Input id="large-input" placeholder="Search for Items" class="dark:bg-[#212121] dark:text-white" />
  </div>

  <div class="mb-6">
    <Label for="large-input" class="block mb-2">From</Label>
    <Input id="large-input" type="date" class="dark:bg-[#212121] dark:text-white" />
  </div>

  <div class="mb-6">
    <Label for="large-input" class="block mb-2">To</Label>
    <Input id="large-input" type="date" class="dark:bg-[#212121] dark:text-white"/>
  </div>
  <a href="#">
    <button
      class="bg-white dark:bg-[#212121] dark:text-white text-xs lg:text-lg h-12 p-3 rounded-xl text-center flex justify-center items-center"
      >Reset Date</button
    >
  </a>

  <a href="#">
    <img
      src="/images/search.png"
      alt=""
      class="w-12 bg-[#f17f18] dark:hover:bg-[#f17f18] hover:bg-[#212121] ease-in-out duration-300 dark:bg-[#212121] p-3 rounded-xl"
    />
  </a>

  <a href="/items/add">
    <button class="w-12 h-12 bg-[#f17f18] dark:hover:bg-[#f17f18] hover:bg-[#212121] ease-in-out duration-300 dark:bg-[#212121] p-3 rounded-xl text-white text-2xl  flex justify-center items-center">+</button>
  </a>
</div>

<div class="container mx-auto px-12 mt-12">
  <Table shadow>
    <TableHead class="bg-[#2D2D2D] dark:bg-[#212121] text-white text-center">
      <TableHeadCell>Image</TableHeadCell>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Time</TableHeadCell>
      <TableHeadCell>Quantity</TableHeadCell>
      <TableHeadCell>Cost</TableHeadCell>
      <TableHeadCell>Total</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y ">
      <TableBodyRow class="text-center dark:bg-[#272727]">
        <TableBodyCell class="flex justify-center">
          <img src="/images/rice.png" alt="" class="w-14" />
        </TableBodyCell>
        <TableBodyCell>Rice</TableBodyCell>

                <TableBodyCell>01 April, 2021 | 03:00 PM</TableBodyCell>
                <TableBodyCell>8</TableBodyCell>
                <TableBodyCell>4000IQD</TableBodyCell>
                <TableBodyCell>25000 IQD</TableBodyCell>
            </TableBodyRow>

      <TableBodyRow class="text-center dark:bg-[#272727]">
        <TableBodyCell class="flex justify-center">
          <img src="/images/rice.png" alt="" class="w-14" />
        </TableBodyCell>

                <TableBodyCell>Rice</TableBodyCell>
                <TableBodyCell>01 April, 2021 | 03:00 PM</TableBodyCell>
                <TableBodyCell>3</TableBodyCell>
                <TableBodyCell>4000IQD</TableBodyCell>
                <TableBodyCell>25000 IQD</TableBodyCell>
            </TableBodyRow>

      <TableBodyRow class="text-center dark:bg-[#272727]">
        <TableBodyCell class="flex justify-center ">
          <img src="/images/rice.png" alt="" class="w-14" />
        </TableBodyCell>
        <TableBodyCell>Rice</TableBodyCell>
        <TableBodyCell>01 April, 2021 | 03:00 PM</TableBodyCell>
        <TableBodyCell>4</TableBodyCell>
        <TableBodyCell>4000IQD</TableBodyCell>
        <TableBodyCell>25000 IQD</TableBodyCell>
      </TableBodyRow>
    </TableBody>
  </Table>
</div>


<div class="w-full flex justify-center items-center mt-3">

  <Pagination {pages} on:previous={previous} on:next={next} icon
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

