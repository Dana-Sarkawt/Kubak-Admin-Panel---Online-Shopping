<script lang="ts">
	import { driverStore } from '$lib/Stores/Drivers.Store';
  import type { OrderDto } from "$lib/Models/DTO/Order.DTO.Model";
  import { DriverOrderStatus } from "$lib/Models/Enums/DriverOrderStatus.Enum.Model";
  import { OrderStatus } from "$lib/Models/Enums/Order-Status.Enum.Model";
  import type { CreateOrderStatusRequest } from "$lib/Models/Requests/CreateOrderStatus.Request.Model";
  import { orderStatusStore } from "$lib/Stores/OrderStatus.Store";
  import { Button, Img, Modal } from 'flowbite-svelte';
  import { Select, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { ChevronDownSolid } from 'flowbite-svelte-icons';
  import { onMount } from "svelte";

 
  export let order_status: number;
  export let order: OrderDto;
  export let destination: string | null;
  export let driverId: string | null;
  let options: CreateOrderStatusRequest;

  async function updateOrderStatus(status: number) {
    options = {
      orderId: order.id,
      driverId: driverId as string,
      status: null,
      destination: destination,
    };

    const orderStatus = await orderStatusStore.getOrderStatusByOrderId(
      order.id
    );

    if (orderStatus?.status === DriverOrderStatus[DriverOrderStatus.REJECT]) {
      options.id = orderStatus?.id;
      await orderStatusStore.create(options);
    } else if (orderStatus?.status === null) {
      options.id = orderStatus?.id;
      console.log(options);
      
      await orderStatusStore.update(options);
    }
    // await orderStatusStore.create(options);
  }

onMount(async () => {
  await driverStore.getAll();
});

   


</script>


<div class="flex h-full ">
  <button id="states-button" class="w-full flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 justify-around" type="button">
   <img src="/images/kubak.jpg" alt="" class="w-8 h-8 object-contain rounded-full">
    Select Driver
    
    <ChevronDownSolid class="w-3 h-3 ms-2" />
  </button>
  <Dropdown  class="w-64 h-auto">
    <div class="w-full h-auto flex gap-2 px-2">
      <input type="text" class="rounded-lg">
      <a href="#" class="w-12 h-12 p-2 bg-[#f17f18] rounded-lg">
        <Img src="/images/search.png" alt="" class="w-8 h-8 object-contain rounded-full"/>
      </a>
    </div>

    <div class="w-full h-44 my-5 flex flex-col justify-center items-centers overflow-y-auto">

      {#each $driverStore.data as driver}
        <DropdownItem class="flex items-center justify-start gap-2">
          <img src={driver.user?.imgUrl ?? "/images/kubak.jpg"} alt="" class="w-8 h-8 object-contain rounded-full">
          {driver.user?.name}
        </DropdownItem>
      {/each}
    
    </div>
  </Dropdown>
  
</div>


  

{#if order_status === 0}
  <div class="flex justify-center gap-2">
    <button
      class="bg-green-500 text-white font-bold w-full h-12 rounded-lg hover:bg-green-600"
      on:click={() => updateOrderStatus(OrderStatus.Accepted)}>Accept</button
    >
   
    <button
      class="bg-red-600 w-full text-white font-bold rounded-lg hover:bg-red-700"
      on:click={() => updateOrderStatus(OrderStatus.Failed)}>Reject</button
    >
  </div>
{:else if order_status === 1}
  <div class="flex justify-center gap-2">
    <button
      class="bg-blue-500 text-white font-bold w-full text-sm h-12 rounded-lg hover:bg-blue-600"
      on:click={() => updateOrderStatus(OrderStatus.Delivering)}
      >Prepare for Delivering</button
    >
    <button
      class="bg-red-600 w-full text-white font-bold rounded-lg hover:bg-red-700"
      on:click={() => updateOrderStatus(OrderStatus.Failed)}>Cancel</button
    >
  </div>
{:else if order_status === 2}
  <div class="flex justify-center gap-2">
    <button
      class="bg-yellow-500 text-white font-bold w-full h-12 rounded-lg hover:bg-yellow-600 disabled:bg-yellow-600"
      disabled>Delivering...</button
    >
  </div>
{:else if order_status === 3}
  <div class="flex justify-center gap-2">
    <button
      class="bg-green-500 text-white font-bold w-full h-12 rounded-lg hover:bg-green-600 disabled:bg-green-600"
      disabled>Delivered</button
    >
  </div>
{:else if order_status === -1}
  <div class="flex justify-center gap-2">
    <button
      class="bg-red-500 text-white font-bold w-full h-12 rounded-lg hover:bg-red-600 disabled:bg-red-600"
      disabled>Canceled Delivery</button
    >
  </div>
{:else}
  <div></div>
{/if}


