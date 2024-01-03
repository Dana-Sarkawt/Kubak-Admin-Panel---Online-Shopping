<script lang="ts">
  import type { OrderDto } from "$lib/Models/DTO/Order.DTO.Model";
  import { OrderStatus } from "$lib/Models/Enums/Order-Status.Enum.Model";
  import type { CreateOrderStatusRequest } from "$lib/Models/Requests/CreateOrderStatus.Request.Model";
  import { ordersStore } from "$lib/Stores/Orders.Store";
  export let order_status: number;
  export let order: OrderDto;
  export let destination: string | null;
  let options:CreateOrderStatusRequest;

  async function updateOrderStatus(status: number) {
    options = {
      orderId: order.id,
      driverId: "658bcd1807b9398dec19",
      status: null,
      destination: destination,
    }

    console.log(options);
    // await ordersStore.updateStatus(order.id, status);
  }
</script>

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
