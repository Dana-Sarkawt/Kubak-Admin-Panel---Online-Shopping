<script lang="ts">
  import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
  import type { AuthDto } from "$lib/Models/DTO/Auth.DTO.Model";
  import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
  import { OrderStatus } from "$lib/Models/Enums/Order-Status.Enum.Model";
  import { authStore } from "$lib/Stores/Auth.Store";
  import { itemStore } from "$lib/Stores/Items.Store";
  import { itemsBlockerStore } from "$lib/Stores/ItemsBlocker.Store";
  import { ordersStore } from "$lib/Stores/Orders.Store";
  import {
    P,
    Spinner,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import moment from "moment";
  import { onMount } from "svelte";
  const filter: GenericListOptions = {
    page: 1,
    limit: 6,
    sortField: "numberOfSales",
  };

  let lowestItems: ItemDto[] = [];
  let mostItems: ItemDto[] = [];

  let loading = true;
  onMount(async () => {
    try {
      await itemStore.getAll(filter);
      lowestItems = $itemStore.data.slice().reverse().slice(0,4);
      mostItems = $itemStore.data.slice(0,4);
      console.log(lowestItems);
      
    } finally {
      loading = false;
    }
  });



  onMount(async () => {
    try {
      await ordersStore.getAll();
      $ordersStore.data.map(async (order) => {
        return {
          ...order,
          auth: (await authStore.getUser(order.user as string)) as AuthDto,
        }
      });
      
      console.log($ordersStore.data);
      
    } finally {
      loading = false;
    }
  });

  
</script>

<div class="w-full h-auto flex flex-col justify-center items-center gap-2">
  <div class="w-full h-auto flex gap-2 justify-center mt-5">
    <!--  START CATEGORIES CARD  -->
    <div
      class="w-[30%] h-[300px] 2xl:h-[500px] flex flex-col justify-around items-center dark:text-white bg-white dark:bg-[#212121] rounded-2xl"
    >
      <p class="text-lg lg:text-2xl 2xl:text-5xl">Categories</p>
      <img src="/images/categories.png" alt="" class="px-2 w-72" />
    </div>
    <!--  END CATEGORIES CARD  -->
  
    <!--  START LOWEST ORDER CARD  -->
    <div
      class="w-[30%] h-[300px] 2xl:h-[500px] flex flex-col justify-start items-center bg-white dark:text-white dark:bg-[#212121] rounded-2xl gap-2 p-2"
    >
      <p class="text-md lg:text-xl 2xl:text-3xl">Lowest Order Items</p>

      <!--  START FIRST LOWEST ORDER CARD  -->

      {#each lowestItems as items}
        <div
          class="w-full h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] dark:text-white rounded-xl flex justify-center items-center text-center px-2 md:text-[8px] lg:text-lg"
        >
          <img
            src={items.itemImage ?? "/images/item.png"}
            alt=""
            class="w-[30px] h-[30px] 2xl:w-[50px] 2xl:h-[50px] object-contain"
          />
          <p class="w-full text-center">
            {items.name ?? "No Name"}
          </p>
          <p class="w-full tex-center flex justify-center ">{items.price ?? "0"} IQD</p>
        </div>
      {/each}
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class="text-[#f17f18]">See More</a>
    </div>
    <!--  END LOWEST ORDER CARD  -->
    <div
      class="w-[30%] h-[300px] 2xl:h-[500px] flex flex-col justify-start items-center bg-white dark:bg-[#212121] dark:text-white rounded-2xl gap-2 p-2"
    >
      <p class="text-md lg:text-xl 2xl:text-3xl">Most Order Items</p>

      {#each mostItems as items}
        <div
          class="w-full h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] dark:text-white rounded-xl flex justify-center items-center px-3 md:text-[8px] lg:text-lg"
        >
          <img
            src={items.itemImage ?? "/images/rice.png"}
            alt=""
            class="w-[30px] h-[30px] 2xl:w-[50px] 2xl:h-[50px] object-contain"
          />
          <p class="w-full text-center">
            {items.name ?? "No Name"}
          </p>
          <p class="w-full text-center">{items.price ?? "0"} IQD</p>
        </div>
      {/each}
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class="text-[#f17f18]">See More</a>
    </div>
    <!--  END MOST ORDER CARD  -->
  </div>

  <div class="w-full h-auto flex justify-center items-center gap-2">
    <!--  START ITEMS LIST TABLE  -->
    <div
      class="w-[60.6%] h-[300px] 2xl:h-[500px] flex flex-col justify-start items-center bg-white dark:bg-[#212121] dark:text-white rounded-2xl"
    >
      <div class="w-full flex justify-between items-center py-3 px-8">
        <p class="text-lg lg:text-2xl 2xl:text-5xl">Items List</p>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="/items/1" class="text-[#f17f18]">See More</a>
      </div>

      <div
        class="w-full h-auto flex justify-center items-center overflow-x-auto"
      >
        {#if loading}
          <div class="w-full flex justify-center mt-12">
            <Spinner />
          </div>
        {:else}
          <Table divClass="w-full h-full  ">
            <TableHead class="w-full dark:bg-[#363636] dark:text-white">
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Production Date</TableHeadCell>
              <TableHeadCell>Expiration Date</TableHeadCell>
              <TableHeadCell>Price</TableHeadCell>
            </TableHead>
            <TableBody>
              {#each $itemStore.data as item}
                <TableBodyRow class="dark:bg-[#212121]">
                  <TableBodyCell
                    ><img
                      src={item.itemImage ?? "/images/item.png"}
                      alt=""
                      class="w-8"
                    /></TableBodyCell
                  >
                  <TableBodyCell>{item.name}</TableBodyCell>
                  <TableBodyCell
                    >{moment(item.productionDate).format(
                      "DD-MMM-YYYY"
                    )}</TableBodyCell
                  >
                  <TableBodyCell class="text-gray-400"
                    >{moment(item.expiredDate).format(
                      "DD-MMM-YYYY"
                    )}</TableBodyCell
                  >
                  <TableBodyCell>{item.price}</TableBodyCell>
                </TableBodyRow>
              {/each}
            </TableBody>
          </Table>
        {/if}
      </div>
    </div>
  
    <!--  END ITEMS LIST TABLE  -->

    <!--  START ORDER CARD  -->
    <div
      class="w-[30%] h-[300px] 2xl:h-[500px] flex flex-col justify-start pt-3 items-center bg-white dark:bg-[#212121] dark:text-white rounded-2xl gap-2"
    >
      <div class="w-full flex justify-around items-center">
        <p class="text-lg lg:text-2xl 2xl:text-5xl">Order</p>
        <p class="bg-black px-2 py-px rounded-full text-white text-sm">Today</p>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="text-[#f17f18]">See More</a>
      </div>

      <!--  START FIRST ORDER CARD  -->

      {#each $ordersStore.data as order}
      <div
      class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl flex justify-around items-center px-3 md:text-[8px] lg:text-lg"
      >
        <p class="flex justify-center items-center text-center">{order.user.name}</p>
        <div class="w-1/2 text-center flex justify-center items-center">
          <div
          class="h-8 w-20 rounded-lg flex justify-center  text-center items-center px-2 text-sm
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
      
    </div>
    {/each}
      
      <!--  END ORDER CARD  -->
    </div>
</div>
</div>