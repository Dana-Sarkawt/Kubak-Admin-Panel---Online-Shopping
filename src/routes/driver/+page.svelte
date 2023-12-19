<script lang="ts">
  import {
    Button,
    Modal,
    Spinner,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { Label, Input } from "flowbite-svelte";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  import { onMount } from "svelte";
  import { itemStore } from "$lib/Stores/Items.Store";
  import { page } from "$app/stores";
  import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
  import Notification from "$lib/Components/Toasts.Notify.Component.svelte";
  import { toastStore } from "$lib/Stores/Toast.Store";
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";
  import { driverStore } from "$lib/Stores/Drivers.Store";
  let filter: GenericListOptions = {
    page: parseInt($page.params.page),
    limit: 8,
  };

  let popupModal: boolean = false;
  let itemId: string = "";
  let pages: number;
  let loading = true;
  onMount(async () => {
    try {
      await driverStore.getAll(filter);
    } finally {
      loading = false;
    }
  });

  $: {
    if ($driverStore) {
      pages = $driverStore.pages as number;
    }
  }

  async function filterOptions() {
    await driverStore.getAll(filter);
  }

  async function resetDate() {
    filter.search = "";
    filter.from = "";
    filter.to = "";
    await driverStore.getAll(filter);
  }

  async function deleteItem(id: string) {
    await driverStore.delete(id);
  }

  let isAscending = true; // Initially set to ascending order

  function toggleSortOrder() {
    isAscending = !isAscending;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
<div
  class="container mx-auto h-auto px-12 flex justify-center items-center gap-3 mt-44"
>
  <div class="mb-6">
    <Label for="large-input" class="block mb-2">Search</Label>
    <Input
      bind:value={filter.search}
      id="large-input"
      placeholder="Search for Items"
      class="dark:bg-[#212121] dark:text-white"
    />
  </div>

  <div class="mb-6">
    <Label for="large-input" class="block mb-2">From</Label>
    <Input
      bind:value={filter.from}
      id="large-input"
      type="date"
      class="dark:bg-[#212121] dark:text-white"
    />
  </div>

  <div class="mb-6">
    <Label for="large-input" class="block mb-2">To</Label>
    <Input
      bind:value={filter.to}
      id="large-input"
      type="date"
      class="dark:bg-[#212121] dark:text-white"
    />
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <a on:click={resetDate} class="cursor-pointer">
    <button
      class="bg-white dark:bg-[#212121] dark:text-white text-xs lg:text-lg h-12 p-3 rounded-xl text-center flex justify-center items-center"
      >Reset Date
    </button>
  </a>

  <div class=" h-auto flex justify-center items-center">
    <button
      class="bg-white dark:bg-[#212121] flex items-center justify-center dark:text-white text-gray-600 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline border dark:border-gray-600"
      on:click={toggleSortOrder}
    >
      {isAscending ? "A-Z" : "Z-A"}
    </button>
  </div>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={filterOptions} class="cursor-pointer">
    <img
      src="/images/search.png"
      alt=""
      class="w-12 bg-[#f17f18] dark:hover:bg-[#f17f18] hover:bg-[#212121] ease-in-out duration-300 dark:bg-[#212121] p-3 rounded-xl"
    />
  </a>

  <a href="/driver/add">
    <button
      class="w-12 h-12 bg-[#f17f18] dark:hover:bg-[#f17f18] hover:bg-[#212121] ease-in-out duration-300 dark:bg-[#212121] p-3 rounded-xl text-white text-2xl flex justify-center items-center"
    >
      +
    </button>
  </a>
</div>

{#if loading}
  <div class="w-full flex justify-center mt-12">
    <Spinner />
  </div>
{:else}
  <div class="container mx-auto px-12 mt-12">
    <Table shadow>
      <TableHead class="bg-[#2D2D2D] dark:bg-[#212121] text-white text-center">
        <TableHeadCell>Image</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Passport Number</TableHeadCell>
        <TableHeadCell>Plate Number</TableHeadCell>
        <TableHeadCell>Bike Model</TableHeadCell>
        <TableHeadCell>Bike Color</TableHeadCell>
        <TableHeadCell>Bike Year</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each $driverStore.data as driver}
          <TableBodyRow class="text-center dark:bg-[#272727]">
            <TableBodyCell class="flex justify-center">
              <img
                src={driver.user?.imgUrl ?? "/images/item.png"}
                alt=""
                class="w-14 h-14 object-contain rounded-lg"
              />
            </TableBodyCell>
            <TableBodyCell>{driver.user?.name}</TableBodyCell>
            <TableBodyCell>{driver.passport?.passportNumber}</TableBodyCell>
            <TableBodyCell>{driver.bikeAnnuity?.plateNumber}</TableBodyCell>
            <TableBodyCell>{driver.bikeAnnuity?.model}</TableBodyCell>
            <TableBodyCell>{driver.bikeAnnuity?.color}</TableBodyCell>
            <TableBodyCell>{driver.bikeAnnuity?.year}</TableBodyCell>
            <TableBodyCell
              tdClass="w-16 h-24 flex gap-2 justify-center items-center mr-4"
              class="flex justify-center items-center"
            >
              <a
                href="/items/edit/{driver.id}"
                class="flex items-center justify-center h-12"
              >
                <div class="flex items-center justify-center h-12">
                  <img
                    src="/images/edit.png"
                    alt=""
                    class="w-12 bg-green-500 hover:bg-green-400 ease-in-out duration-300 p-1 rounded-md"
                  />
                </div>
              </a>

              <!-- svelte-ignore a11y-invalid-attribute -->
              <a
                href="#"
                class="flex items-center justify-center h-12"
                on:click={() => {
                  popupModal = true;
                  itemId = driver.id;
                }}
              >
                <div class="flex items-center justify-center h-12">
                  <img
                    src="/images/trash-bin.png"
                    alt=""
                    class="w-12 bg-red-600 hover:bg-red-500 ease-in-out duration-300 p-1 rounded-md"
                  />
                </div>
              </a>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>
{/if}

<Modal bind:open={popupModal} size="xs" autoclose>
  <div class="text-center">
    <ExclamationCircleOutline
      class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
    />
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Are you sure you want to Delete this Item?
    </h3>
    <Button
      class="me-2 bg-red-500 p-2 w-auto h-10"
      on:click={() => deleteItem(itemId)}>Yes, I'm sure</Button
    >
    <Button color="alternative">No, cancel</Button>
  </div>
</Modal>

<Pagination name="items" {pages} {filter} Store={driverStore} />

<Notification status={$toastStore} name="Item" />
