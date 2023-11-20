<script lang="ts">
  // @ts-nocheck

  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
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
      class="w-[30%] h-[300px] 2xl:h-[500px] flex flex-col justify-center items-center bg-white dark:text-white dark:bg-[#212121] rounded-2xl gap-2"
    >
      <p class="text-lg lg:text-2xl 2xl:text-5xl">Lowest Order</p>

      <!--  START FIRST LOWEST ORDER CARD  -->

      <div
        class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl flex justify-center items-center px-3 md:text-[8px] lg:text-lg"
      >
        <img src="/images/rice.png" alt="" class="w-8" />
        <p class="w-1/2 text-center">Rice</p>
        <p class="w-1/2">2000 IQD</p>
      </div>

      <!--  END FIRST LOWEST ORDER CARD  -->
      <!--  AND DELETE ANOTHER LOWEST ORDER CARD  -->

      <div class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl" />

      <div class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl" />

      <div class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl" />

      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class="text-[#f17f18]">See More</a>
    </div>
    <!--  END LOWEST ORDER CARD  -->

    <!--  START MOST ORDER CARD  -->
    <div
      class="w-[30%] h-[300px] 2xl:h-[500px] flex flex-col justify-center items-center bg-white dark:bg-[#212121] dark:text-white rounded-2xl gap-2"
    >
      <p class="text-lg lg:text-2xl 2xl:text-5xl">Lowest Order</p>

      <!--  START FIRST MOST ORDER CARD  -->

      <div
        class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] dark:text-white rounded-xl flex justify-center items-center px-3 md:text-[8px] lg:text-lg"
      >
        <img src="/images/rice.png" alt="" class="w-8" />
        <p class="w-1/2 text-center">Rice</p>
        <p class="w-1/2">2000 IQD</p>
      </div>

      <!--  END FIRST MOST ORDER CARD  -->
      <!--  AND DELETE ANOTHER MOST ORDER CARD  -->

      <div class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl" />

      <div class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl" />

      <div class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl" />

      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class="text-[#f17f18]">See More</a>
    </div>
    <!--  END MOST ORDER CARD  -->
  </div>

  <div class="w-full h-auto flex justify-center items-center gap-2">
    <!--  START ITEMS LIST TABLE  -->
    <div
      class="w-[60.6%] h-[300px] 2xl:h-[500px] flex flex-col justify-center items-center bg-white dark:bg-[#212121] dark:text-white rounded-2xl"
    >
      <div class="w-full flex justify-between items-center py-3 px-8">
        <p class="text-lg lg:text-2xl 2xl:text-5xl">Items List</p>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="text-[#f17f18]">See More</a>
      </div>

      <div
        class="w-full height-auto flex justify-center items-center overflow-x-auto"
      >
        <Table divClass="w-full h-full  ">
          <TableHead class="w-full dark:bg-[#363636] dark:text-white">
            <TableHeadCell >Image</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Quantity</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Total Price</TableHeadCell>
          </TableHead>
          <TableBody class="divide-y">
            <TableBodyRow class="dark:bg-[#212121]">
              <TableBodyCell
                ><img
                  src="/images/rice.png"
                  alt=""
                  class="w-8"
                /></TableBodyCell
              >
              <TableBodyCell>Rice</TableBodyCell>
              <TableBodyCell>2</TableBodyCell>
              <TableBodyCell class="text-gray-400">07 Sep 2023</TableBodyCell>
              <TableBodyCell>4000 IQD</TableBodyCell>
            </TableBodyRow >

            <TableBodyRow class="dark:bg-[#212121]">
              <TableBodyCell
                ><img
                  src="/images/rice.png"
                  alt=""
                  class="w-8"
                /></TableBodyCell
              >
              <TableBodyCell>Rice</TableBodyCell>
              <TableBodyCell>1</TableBodyCell>
              <TableBodyCell class="text-gray-400">07 Sep 2023</TableBodyCell>
              <TableBodyCell>4000 IQD</TableBodyCell>
            </TableBodyRow>

            <TableBodyRow class="dark:bg-[#212121]">
              <TableBodyCell
                ><img
                  src="/images/rice.png"
                  alt=""
                  class="w-8"
                /></TableBodyCell
              >
              <TableBodyCell>Rice</TableBodyCell>
              <TableBodyCell>7</TableBodyCell>
              <TableBodyCell class="text-gray-400">07 Sep 2023</TableBodyCell>
              <TableBodyCell>4000 IQD</TableBodyCell>
            </TableBodyRow>
          </TableBody>
        </Table>
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

      <div class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl" />

      <div class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl" />

      <div class="w-11/12 h-12 2xl:h-20 bg-[#e8e8e8] dark:bg-[#363636] rounded-xl" />
    </div>
    <!--  END ORDER CARD  -->
  </div>
</div>
