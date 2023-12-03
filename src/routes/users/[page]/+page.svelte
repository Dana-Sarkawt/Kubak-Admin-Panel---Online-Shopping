<script lang="ts">
  import { authStore } from "$lib/Stores/Auth.Store";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Label,
    Input,
    ListPlaceholder,
    Spinner,
  } from "flowbite-svelte";
  import { onMount } from "svelte";
  import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
  import { page } from "$app/stores";
  import type { Store } from "$lib/Models/Response/Store.Response";
  import type { AuthDto } from "$lib/Models/DTO/Auth.DTO.Model";

  let filter: GenericListOptions = {
    page: parseInt($page.params.page),
    limit: 7
  };
  let listUsers: Store<AuthDto> = {
    data: [],
    total: 0,
  };

  let loading = true; 
  onMount(async () => {
    try{listUsers = (await authStore.listUsers(filter)) as Store<AuthDto>;
    }finally{
      loading = false;
    }
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
      class="bg-white dark:bg-[#212121] dark:text-white text-xs lg:text-lg h-12 p-3 rounded-xl text-center flex justify-center items-center dark:hover:bg-[#f17f18] duration-300 ease-in-out"
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





{#if loading}
<div class="w-full flex justify-center mt-12">

  <Spinner />
</div>
{:else}
<div class="container mx-auto px-12 mt-12">
  <Table shadow>
    <TableHead class="bg-[#2D2D2D] text-white text-center dark:bg-[#212121]">
      <TableHeadCell>Image</TableHeadCell>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Roles</TableHeadCell>
      <TableHeadCell>Phone</TableHeadCell>

    </TableHead>
    <TableBody>
      {#each listUsers.data as user}
        <TableBodyRow class="text-center dark:bg-[#272727]">
          <TableBodyCell class="flex justify-center">
            <img src={user.imgUrl ?? "/images/user.png"} alt="" class="w-14 h-14 object-cover object-center rounded-lg" />
          </TableBodyCell>
          <TableBodyCell
            >{user.name.length > 0 ? user.name : "No Name"}</TableBodyCell
          >

          <TableBodyCell
            >{user.roles.length > 0 ? user.roles : "Client"}</TableBodyCell
          >
          <TableBodyCell>{user.phone}</TableBodyCell>

        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>
{/if}