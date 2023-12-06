<script lang="ts">
  import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
  import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
  import { itemStore } from "$lib/Stores/Items.Store";
  import { itemsBlockerStore } from "$lib/Stores/ItemsBlocker.Store";
  import {
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
      class="w-[30%] h-[300px] 2xl:h-[500px] flex flex-col justify-center items-center bg-white dark:text-white dark:bg-[#212121] rounded-2xl gap-2 px-2"
    >
      <p class="text-lg lg:text-2xl 2xl:text-5xl">Lowest Order</p>

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
          <p class="w-full tex-center">{items.price ?? "0"} IQD</p>
        </div>
      {/each}
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class="text-[#f17f18]">See More</a>
    </div>
    <!--  END LOWEST ORDER CARD  -->
    <div
      class="w-[30%] h-[300px] 2xl:h-[500px] flex flex-col justify-center items-center bg-white dark:bg-[#212121] dark:text-white rounded-2xl gap-2 px-2"
    >
      <p class="text-lg lg:text-2xl 2xl:text-5xl">Most Order</p>

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
          <p class="w-full">{items.price ?? "0"} IQD</p>
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
      class="w-[30%] h-[300px] 2xl:h-[500px] flex flex-col justify-center items-center bg-white dark:bg-[#212121] dark:text-white rounded-2xl gap-2"
    >
      <div class="w-full flex justify-around items-center">
        <p class="text-lg lg:text-2xl 2xl:text-5xl">Order</p>
        <p class="bg-black px-2 py-px rounded-full text-white text-sm">Today</p>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="text-[#f17f18]">See More</a>
      </div>

      <!--  START FIRST ORDER CARD  -->

      <div
        class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl flex justify-around items-center px-3 md:text-[8px] lg:text-lg"
      >
        <img src="/images/rice.png" alt="" class="w-8" />
        <p class="w-1/2 text-center">Rice</p>
        <p class="w-1/2">2000 IQD</p>
      </div>

      <!--  END FIRST ORDER CARD  -->
      <!--  AND DELETE ANOTHER ORDER CARD  -->

      <div
        class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl"
      />

      <div
        class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl"
      />

      <div
        class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl"
      />
    </div>
    <!--  END ORDER CARD  -->
  </div>
</div>
