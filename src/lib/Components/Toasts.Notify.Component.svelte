<script lang="ts">
  import { toastStore } from "$lib/Stores/Toast.Store";
  import { onMount } from "svelte";

  export let status: number;
  export let name: string;

  onMount(() => {
    showNotification();
  });

  function showNotification() {
    const toast: HTMLElement = document.getElementById("toast") as HTMLElement;
    toast.classList.remove("hidden");

    setTimeout(() => {
      toast.classList.add("hidden");
      toastStore.set(0);
    }, 5000);
  }
</script>

{#if status === 0}
  <div class="popup" id="updatePopup">
    <!-- Your update item form goes here -->
    <!-- <button
    on:click={showNotification}
    class="bg-blue-500 text-white px-4 py-2 rounded">Update {name}</button
  > -->
  </div>
{:else if status === 1}
  <div
    id="toast"
    class="hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded"
  >
    {name} updated successfully!
  </div>
{:else if status === 2}
  <div
    id="toast"
    class="hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded"
  >
    {name} Deleted successfully!
  </div>
{:else if status === 4}
  <div
    id="toast"
    class="hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded"
  >
    Warning: your {name} process maybe having a problem
  </div>
{:else if status === 3}
  <div
    id="toast"
    class="hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded"
  >
    {name} Added successfully!
  </div>
{/if}
