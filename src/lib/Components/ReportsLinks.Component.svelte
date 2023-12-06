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

