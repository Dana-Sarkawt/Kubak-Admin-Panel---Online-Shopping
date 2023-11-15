<script lang="ts">
  import { page } from "$app/stores";
  import {
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper
  } from "flowbite-svelte";

  $: activeUrl = $page.url.pathname;
  let activeClass =
    "flex items-center p-2 text-base font-normal text-white bg-[#CB5500] rounded-l-full";
  let nonActiveClass =
    "flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white";
</script>

<div class="w-1/5 h-[100vh] bg-[#f17f18]">
  <Sidebar {activeUrl} {activeClass} {nonActiveClass} asideClass="w-full ">
    <SidebarWrapper class="bg-[#f17f18] p-0 h-full">
      <SidebarGroup class="h-full" ulClass="h-full">
        <div class="w-full h-auto flex justify-center items-center pb-5 mt-5">
          <img src="/images/kubak.jpg" alt="" width="50px" height="50px" />
        </div>

        <SidebarItem label="Dashboard" href="/" />

        <SidebarItem label="Categories" href="/category" />

        <SidebarItem label="Items" href="/docs/components/alert" />

        <SidebarItem label="Cards" href="/docs/components/sidebar" />

        <SidebarItem label="Users" href="/docs/components/badge" />

        <SidebarItem label="Reports" href="#" />

        <SidebarItem label="Monitoring" href="#" />
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</div>
