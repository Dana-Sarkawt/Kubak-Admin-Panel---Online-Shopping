<script lang="ts">
  import { OrderStatus } from "$lib/Models/Enums/Order-Status.Enum.Model";
  import { ordersStore } from "$lib/Stores/Orders.Store";
  import { onMount } from "svelte";

  export let order_status: number;
  export let orderId: string;

  async function updateOrderStatus(status: number) {
    await ordersStore.updateStatus(orderId, status);
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
      class="bg-yellow-500 text-white font-bold w-full h-12 rounded-lg hover:bg-yellow-600"
      >Delivering...</button
    >
  </div>
{:else if order_status === 3}
  <div class="flex justify-center gap-2">
    <button
      class="bg-green-500 text-white font-bold w-full h-12 rounded-lg hover:bg-green-600"
      >Delivered</button
    >
  </div>
{:else if order_status === -1}
  <div class="flex justify-center gap-2">
    <button
      class="bg-red-500 text-white font-bold w-full h-12 rounded-lg hover:bg-red-600"
      >Canceled Delivery</button
    >
  </div>
{:else}
  <div></div>
{/if}
