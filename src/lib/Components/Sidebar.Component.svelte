<script>
// @ts-nocheck



  import { page } from '$app/stores';
  import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, SidebarBrand } from 'flowbite-svelte';
  import { ChartPieSolid, GridSolid, MailBoxSolid, UserSolid, ArrowRightToBracketSolid, FileEditSolid, LayersSolid, ImageSolid, AddressCardSolid, NewspaperSolid, DesktopPcSolid, TableSolid, TableColumnSolid, TabletSolid, WindowSolid } from 'flowbite-svelte-icons';

  $: activeUrl = $page.url.pathname;
  let activeClass = 'flex items-center p-2 text-base font-normal text-white bg-[#CB5500] rounded-l-full';
  let nonActiveClass = 'flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white';
</script>




<div class="w-1/5  h-[100vh] bg-[#f17f18]">

  <Sidebar {activeUrl} {activeClass} {nonActiveClass} asideClass="w-full ">
    <SidebarWrapper class="bg-[#f17f18] p-0 h-full">
      <SidebarGroup class="h-full " ulClass="h-full pl-3">
        <div class="w-full h-auto flex justify-center items-center pb-5 mt-5">
          <img src="/images/kubak.jpg" alt="" width="50px" height="50px">
        </div>
    
        <SidebarItem label="Dashboard" href="/" spanClass="md:text-lg lg:text-xl ml-2">
          <svelte:fragment slot="icon">
            <ChartPieSolid class="w-5 h-5 text-white transition duration-75" />
          </svelte:fragment>
        </SidebarItem>
  
        <SidebarItem label="Categories" href="/category" spanClass="-lg lg:text-xl ml-2">
          <svelte:fragment slot="icon">
            <GridSolid class="w-5 h-5 text-white transition duration-75" />
          </svelte:fragment>
        </SidebarItem>
  
        <SidebarItem label="Items" href="/items" spanClass="-lg lg:text-xl ml-2">
          <svelte:fragment slot="icon">
            <LayersSolid class="w-5 h-5 text-white transition duration-75" />
          </svelte:fragment>
        </SidebarItem>
  
        <SidebarItem label="Cards" href="/docs/components/sidebar"  spanClass="-lg lg:text-xl ml-2">
          <svelte:fragment slot="icon">
            <ImageSolid class="w-5 h-5 text-white transition duration-75" />
          </svelte:fragment>
        </SidebarItem>
  
        <SidebarItem label="Users" href="/docs/components/badge" spanClass="-lg lg:text-xl ml-2">
          <svelte:fragment slot="icon">
            <AddressCardSolid class="w-5 h-5 text-white transition duration-75" />
          </svelte:fragment>
        </SidebarItem>
  
        <SidebarItem label="Reports" href="#" spanClass="-lg lg:text-xl ml-2">
          <svelte:fragment slot="icon">
            <NewspaperSolid class="w-5 h-5 text-white transition duration-75" />
          </svelte:fragment>

        </SidebarItem>
  
        <SidebarItem label="Monitoring" href="#" spanClass="-lg lg:text-xl ml-2">

          <svelte:fragment slot="icon">
            <DesktopPcSolid class="w-5 h-5 text-white transition duration-75" />
          </svelte:fragment>
        </SidebarItem>
  
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</div>