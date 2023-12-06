<script lang="ts">
  export const order_status: number = 0;
</script>

{#if order_status === 0}
  <div class="flex justify-center gap-2">
    <button
      class="bg-green-500 text-white font-bold w-full h-12 rounded-lg hover:bg-green-600"
      >Accept</button
    >
    <button
      class="bg-red-600 w-full text-white font-bold rounded-lg hover:bg-red-700"
      >Reject</button
    >
  </div>
{:else if order_status === 1}
  <div class="flex justify-center gap-2">
    <button
      class="bg-yellow-500 text-white font-bold w-full h-12 rounded-lg hover:bg-yellow-600"
      >Prepare</button
    >
    <button
      class="bg-red-600 w-full text-white font-bold rounded-lg hover:bg-red-700"
      >Reject</button
    >
  </div>
{/if}
