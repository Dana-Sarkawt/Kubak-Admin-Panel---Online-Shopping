<script lang="ts">
  import type { OrderDto } from "$lib/Models/DTO/Order.DTO.Model";
  import { DriverOrderStatus } from "$lib/Models/Enums/DriverOrderStatus.Enum.Model";
  import { OrderStatus } from "$lib/Models/Enums/Order-Status.Enum.Model";
  import type { CreateOrderStatusRequest } from "$lib/Models/Requests/CreateOrderStatus.Request.Model";
  import { orderStatusStore } from "$lib/Stores/OrderStatus.Store";
  import { Button, Img, Modal } from 'flowbite-svelte';
 
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

  let openModal = false;
  let size:any;
   


</script>

{#if openModal === true}
<div class="z-[60000] w-full h-[87vh] bg-black">

  <Modal
   style="background-color:#1a1a1a;" bind:open={openModal} {size} autoclose class="z-[1000]flex justify-center items-center pt-12" backdropClass="bg-black w-full h-[5vh] flex justify-center items-center p-0"
   dialogClass="block h-modal  z-50 w-full flex  p-0" bodyClass=" flex justify-center flex-col items-center p-0">
   <div class="w-auto flex mx-2 gap-1">
    <input type="text" class="w-full rounded-lg dark:bg-[#000] dark:text-white">
    <a href="#" class="w-12 h-12 rounded-lg bg-[#f17f18] flex justify-center items-center">
      <img src="/images/search.png" alt="" class="w-5 h-5 object-contain">
    </a>
   </div>
   <div class="w-52 h-[60vh] bg-black flex flex-col gap-2 px-2 overflow-y-auto overflow-x-hidden justify-center items-center m-0">
    

<div class="w-full h-12 bg-[#1a1a1a] flex mx-2 rounded-lg justify-around flex-row-reverse items-center">
  <p>ahmad</p>
  <Img src="/images/kubak.jpg" class="w-8 h-8 object-cover rounded-full"/>
</div>



   </div>
<div class="w-full h-auto flex justify-center items-center pb-5">

  <button on:click={() => updateOrderStatus(OrderStatus.Accepted)} class="w-full h-auto p-3 mx-2 bg-[#f17f18] text-white rounded-lg font-bold">Accept</button>
</div>
  </Modal>
</div>
{:else}
{#if order_status === 0}
  <div class="flex justify-center gap-2">
    <button
      class="bg-green-500 text-white font-bold w-full h-12 rounded-lg hover:bg-green-600"
      on:click={() => { size = 'xl'; openModal = true; }}>Accept</button
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


{/if}