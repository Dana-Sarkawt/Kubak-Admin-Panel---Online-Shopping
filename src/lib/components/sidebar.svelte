<script>
// @ts-nocheck



  import { page } from '$app/stores';
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, SidebarBrand } from 'flowbite-svelte';
  import { ChartPieSolid, GridSolid, MailBoxSolid, UserSolid, ArrowRightToBracketSolid, FileEditSolid } from 'flowbite-svelte-icons';

  $: activeUrl = $page.url.pathname;
  let activeClass = 'flex items-center p-2 text-base font-normal text-white bg-[#CB5500] rounded-l-full';
  let nonActiveClass = 'flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white';
</script>




<div class="w-1/5  h-[100vh] bg-[#f17f18]">

  <Sidebar {activeUrl} {activeClass} {nonActiveClass} asideClass="w-full ">
    <SidebarWrapper class="bg-[#f17f18] p-0 h-full">
      <SidebarGroup class="h-full" ulClass="h-full">
        <div class="w-full h-auto flex justify-center items-center pb-5 mt-5">
          <img src="/images/kubak.jpg" alt="" width="50px" height="50px">
        </div>
     
  
        <SidebarItem label="Dashboard" href="/"></SidebarItem>
  
        <SidebarItem label="Categories" href="/category"></SidebarItem>
  
        <SidebarItem label="Items" href="/docs/components/alert"></SidebarItem>
  
        <SidebarItem label="Cards" href="/docs/components/sidebar"></SidebarItem>
  
        <SidebarItem label="Users" href="/docs/components/badge"></SidebarItem>
  
        <SidebarItem label="Reports" href="#"></SidebarItem>
  
        <SidebarItem label="Monitoring" href="#"></SidebarItem>
  
  
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</div>