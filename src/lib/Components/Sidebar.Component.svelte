<script lang="ts">
  import { page } from "$app/stores";
  import { authStore } from "$lib/Stores/Auth.Store";
  import {
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from "flowbite-svelte";
  import {
    ChartPieSolid,
    GridSolid,
    LayersSolid,
    ImageSolid,
    AddressCardSolid,
    NewspaperSolid,
    DesktopPcSolid,
    ArrowRightFromBracketSolid,
  } from "flowbite-svelte-icons";

  async function SignOut() {
    await authStore.signOut();
  }

  $: activeUrl = $page.url.pathname;




  let activeClass =
    "flex items-center p-2 text-base font-normal text-white bg-[#CB5500] dark:bg-[#5B5B5B] rounded-l-full";
  let nonActiveClass =
    "flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white";
</script>

<div class="w-1/5 h-[100vh] fixed bg-[#f17f18] dark:bg-[#212121]">
  <Sidebar {activeUrl} {activeClass} {nonActiveClass} asideClass="w-full ">
    <SidebarWrapper class="bg-[#f17f18] dark:bg-[#212121] p-0 h-full">
      <SidebarGroup class="h-full " ulClass="h-full pl-3">
        <div class="w-full h-auto flex justify-center items-center pb-5 mt-5">
          <img
            src="/images/kubak-white.png"
            alt=""
            width="50px"
            height="50px"
          />
        </div>

        <div class="w-full h-[90vh] flex justify-between flex-col">
          <div class="w-full flex flex-col">
            <SidebarItem
              label="Dashboard"
              href="/"
              spanClass="md:text-lg lg:text-xl ml-2"
            >
              <svelte:fragment slot="icon">
                <ChartPieSolid
                  class="w-5 h-5 text-white transition duration-75"
                />
              </svelte:fragment>
            </SidebarItem>

            <SidebarItem
              label="Monitoring"
              href="/monitoring"
              spanClass="-lg lg:text-xl ml-2"
            >
              <svelte:fragment slot="icon">
                <DesktopPcSolid
                  class="w-5 h-5 text-white transition duration-75"
                />
              </svelte:fragment>
            </SidebarItem>

            <SidebarItem
              label="Categories"
              href={$page.url.pathname.includes("category/add") ? "/category/add" : `/category/1`}
              spanClass="-lg lg:text-xl ml-2"
            >
              <svelte:fragment slot="icon">
                <GridSolid class="w-5 h-5 text-white transition duration-75" />
              </svelte:fragment>
            </SidebarItem>

            <SidebarItem
              label="Items"
              href={$page.url.pathname.includes("items/add") ? "/items/add" : `/items/1`}
              spanClass="-lg lg:text-xl ml-2"
            >
              <svelte:fragment slot="icon">
                <LayersSolid
                  class="w-5 h-5 text-white transition duration-75"
                />
              </svelte:fragment>
            </SidebarItem>

            <SidebarItem
              label="Cards"
              href="/cards"
              spanClass="-lg lg:text-xl ml-2"
            >
              <svelte:fragment slot="icon">
                <ImageSolid class="w-5 h-5 text-white transition duration-75" />
              </svelte:fragment>
            </SidebarItem>

            <SidebarItem
              label="Users"
              href="/users/1"
              spanClass="-lg lg:text-xl ml-2"
            >
              <svelte:fragment slot="icon">
                <AddressCardSolid
                  class="w-5 h-5 text-white transition duration-75"
                />
              </svelte:fragment>
            </SidebarItem>

            <SidebarItem
              label="Reports"
              href="/report"
              spanClass="-lg lg:text-xl ml-2"
            >
              <svelte:fragment slot="icon">
                <NewspaperSolid
                  class="w-5 h-5 text-white transition duration-75"
                />
              </svelte:fragment>
            </SidebarItem>
          </div>

          <div class="w-full h-auto">
            <SidebarItem
              on:click={SignOut}
              label="Logout"
              spanClass="-lg lg:text-xl ml-2"
            >
              <svelte:fragment slot="icon">
                <ArrowRightFromBracketSolid
                  class="w-5 h-5 text-white transition duration-75"
                />
              </svelte:fragment>
            </SidebarItem>
          </div>
        </div>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</div>
