<script lang="ts">
  import { page } from "$app/stores";
  import { Navbar, NavUl, NavLi, Input, Label } from "flowbite-svelte";
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
      <NavLi
        href="/report/items/1"
        class={$page.url.pathname === `/report/items/${$page.params.page}`
          ? "bg-[#f17f18] text-white dark:bg-[#f17f18]"
          : ""}>Items</NavLi
      >
      <NavLi
        href="/report/category/1"
        class={$page.url.pathname === `/report/category/${$page.params.page}`
          ? "bg-[#f17f18] text-white dark:bg-[#f17f18]"
          : ""}>Category</NavLi
      >
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
