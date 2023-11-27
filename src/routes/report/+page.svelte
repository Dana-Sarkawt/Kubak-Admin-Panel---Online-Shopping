<script lang="ts">
  import { Label, Input, NavLi, NavUl, Navbar } from "flowbite-svelte";
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
      <NavLi href="/report/items/1">Items</NavLi>
      <NavLi href="/report/category/1">Category</NavLi>
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

<!-- <div class="container mx-auto px-12 mt-12">
  <p
    class="bg-[#636363] w-44 h-8 flex items-center justify-center text-white text-center rounded-t-lg ml-3"
  >
    TOTAL: 0
  </p>
  <Table shadow>
    <TableHead class="bg-[#2D2D2D] dark:bg-[#212121] text-white text-center ">
      <TableHeadCell>Image</TableHeadCell>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Created At</TableHeadCell>
      <TableHeadCell>Updated At</TableHeadCell>
    </TableHead>
</Table>

    <div class="h-52 container mx-auto w-full flex justify-center items-center text-center text-white">
      <p class="w-full flex text-center justify-center">No Data Found</p>
          </div>
</div> -->
