<script lang="ts">
  import { OrderStatus } from "$lib/Models/Enums/Order-Status.Enum.Model";
  import {
    Label,
    Input,
    NavLi,
    NavUl,
    Navbar,
    Modal,
    Img,
  } from "flowbite-svelte";

  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { itemStore } from "$lib/Stores/Items.Store";
  import moment from "moment";
  import { onMount } from "svelte";
  import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
  import { page, updated } from "$app/stores";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  import ReportsLinks from "$lib/Components/ReportsLinks.Component.svelte";
  import { ordersStore } from "$lib/Stores/Orders.Store";
  import { authStore } from "$lib/Stores/Auth.Store";
  import type { AuthDto } from "$lib/Models/DTO/Auth.DTO.Model";
  import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
  import type { OrderDto } from "$lib/Models/DTO/Order.DTO.Model";
  import { itemsBlockerStore } from "$lib/Stores/ItemsBlocker.Store";
  import { Spinner } from 'flowbite-svelte';
  import { fade, fly } from "svelte/transition";
  let loading = true;
  let ModalLoading = true;
  let clickOutsideModal = false;
  let filter: GenericListOptions = {
    page: parseInt($page.params.page),
    limit: 5,
  };

  let orderItems: ItemDto[] = [];

  onMount(async () => {
    try {
      await ordersStore.getAll();
      $ordersStore.data.map(async (order) => {
        return {
          ...order,
          auth: (await authStore.getUser(order.user as string)) as AuthDto,
        };
      });

      console.log($ordersStore.data);
    } finally {
      loading = false;
    }
  });

  async function filterOptions() {
    await ordersStore.getAll();
  }

  async function resetDate() {
    filter.search = "";
    filter.from = "";
    filter.to = "";
    await ordersStore.getAll();
  }

  async function getOrderItems(order: OrderDto) {
    try {
      const itemsBlocker = await itemsBlockerStore.getAll(order.id);
      orderItems =
        itemsBlocker?.map((item) => {
          return {
            ...item.items,
            quantity: item.quantity,
          } as ItemDto;
        }) ?? [];
    } finally {
      ModalLoading = false;
    }
  }
</script>

<ReportsLinks />

<div
  class="container mx-auto h-auto px-12 flex justify-center items-center gap-3 mt-16"
>
  <div class="mb-6">
    <Label for="large-input" class="block mb-2">Search</Label>
    <Input
      bind:value={filter.search}
      id="large-input"
      placeholder="Search for Items"
      class="dark:bg-[#212121]"
    />
  </div>

  <div class="mb-6">
    <Label for="large-input" class="block mb-2">From</Label>
    <Input
      id="large-input"
      bind:value={filter.from}
      type="date"
      class="dark:bg-[#212121]"
    />
  </div>

  <div class="mb-6">
    <Label for="large-input" class="block mb-2">To</Label>
    <Input
      id="large-input"
      type="date"
      class="dark:bg-[#212121] "
      bind:value={filter.to}
    />
  </div>
  <a href="#" on:click={resetDate}>
    <button
      class="bg-white dark:bg-[#212121] dark:hover:bg-[#f17f18] duration-300 ease-in-out dark:text-white text-xs lg:text-lg h-12 p-3 rounded-xl text-center flex justify-center items-center"
      >Reset Date
    </button>
  </a>

  <a href="#" on:click={filterOptions}>
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
    <p
      class="bg-[#636363] w-44 h-8 flex items-center justify-center text-white text-center rounded-t-lg ml-3"
    >
      TOTAL: {$ordersStore.total}
    </p>
    <Table shadow>
      <TableHead class="bg-[#2D2D2D] dark:bg-[#212121] text-white text-center">
        <TableHeadCell>Image</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Status</TableHeadCell>
        <TableHeadCell>Ordered At</TableHeadCell>
        <TableHeadCell>Updated At</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each $ordersStore.data as order}
          <TableBodyRow
            class="text-center dark:bg-[#272727] dark:hover:bg-[#363636] hover:bg-gray-200 cursor-pointer"
            on:click={() => {
              clickOutsideModal = true;
              getOrderItems(order);
            }}
          >
            <TableBodyCell
              tdClass="h-auto w-full flex justify-center items-center"
            >
              <div class="w-full h-24 mt-3 flex justify-center items-center">
                <img
                  src={order.user.imgUrl ?? "/images/user.png"}
                  class="w-12 h-12 flex justify-center items-center object-cover rounded-lg"
                  alt=""
                />
              </div></TableBodyCell
            >

            <TableBodyCell>{order.user.name}</TableBodyCell>
            <TableBodyCell tdClass="flex justify-center items-center">
              <div class="flex w-full h-24 items-center justify-center">
                <div
                  class="h-8 w-20 rounded-lg flex justify-center text-center items-center mb-8 px-2 text-sm
            {order.status === -1
                    ? ' bg-red-600 text-red-200'
                    : order.status === 0
                      ? 'bg-gray-400 text-white'
                      : order.status === 1
                        ? 'bg-blue-600 text-white'
                        : order.status === 2
                          ? 'bg-yellow-600 text-white'
                          : order.status == 3
                            ? 'bg-green-600 text-white'
                            : 'text-gray-400'}
            "
                >
                  {OrderStatus[order.status]}
                </div>
              </div>
            </TableBodyCell>
            <TableBodyCell
              >{moment(order.createdAt).format("DD-MMM-YYYY")}</TableBodyCell
            >

            <TableBodyCell
              >{moment(order.updatedAt).format("DD-MMM-YYYY")}</TableBodyCell
            >
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  {#each $ordersStore.data as order}
    <Modal
      title={order.user.name}
      bind:open={clickOutsideModal}
      autoclose
      outsideclose
      backdropClass="fixed inset-0 z-40 bg-[#212121] bg-opacity-50 dark:bg-opacity-80 backdrop-blur-md"
      bodyClass="bg-[#fff] dark:bg-[#212121] rounded-lg "
      class="bg-[#fff] dark:bg-[#212121] h-auto"
      color="none"
      classDialog="text-black dark:text-white"
    >
      {#if ModalLoading}
        <div class="w-full h-auto flex justify-center mt-12">
          <Spinner />
        </div>
      {:else}
        {#each orderItems as order}
          <div
            class="bg-[#f1f1f1] dark:bg-[#363636] w-full rounded-lg h-24 flex items-start justify-start gap-2 px-2 py-2"
          >
            <Img
              src={order.itemImage}
              alt=""
              class="w-[80px] h-[80px] bg-white dark:bg-[#212121] object-contain p-2 rounded-lg"
            />

            <div
              class="flex flex-col text-ellipsis overflow-hidden truncate cursor-default mt-2"
            >
              <p class="text-[#474747] dark:text-gray-400 font-bold text-sm">
                Name:
                <b class="text-[#1b1b1b] dark:text-gray-50 font-medium text-sm"
                  >{order.name}</b
                >
              </p>
              <p class="text-[#474747] dark:text-gray-400 font-bold text-sm">
                Quantity:
                <b class="text-[#1d1d1d] dark:text-gray-50 font-medium text-sm">
                  {order.quantity}</b
                >
              </p>
              <p class="text-[#474747] dark:text-gray-400 font-bold text-sm">
                Price:
                <b class="text-[#1d1d1d] dark:text-gray-50 font-medium text-sm">
                  {order.price}
                </b>
              </p>
            </div>
          </div>
        {/each}
      {/if}
    </Modal>
  {/each}

  <Pagination
    name="report/items"
    {filter}
    pages={$itemStore.pages}
    Store={itemStore}
  />
{/if}
