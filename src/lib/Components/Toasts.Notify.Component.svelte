<script lang="ts">
  import { ToastMessages } from "$lib/Models/Enums/Toast-Messages.Enum.Model";
  import { toastStore } from "$lib/Stores/Toast.Store";
  import { onMount } from "svelte";

  export let status: number;
  export let name: string;

  onMount(async () => {
    showNotification();
  });

  function showNotification() {
    const toast: HTMLElement | null = document.getElementById(
      "toast"
    ) as HTMLElement | null;
    if (!toast) return;
    if (status === ToastMessages.DEFAULT) return;
    toast.classList.remove("hidden");

    setTimeout(() => {
      toast.classList.add("hidden");
      toastStore.set(ToastMessages.DEFAULT);
    }, 3000);
  }
</script>

{#if status === ToastMessages.DEFAULT}
  <div class="popup" id="toast"></div>
{:else if status === ToastMessages.SUCCESS}
  <div
    id="toast"
    class="hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded"
  >
    {name} updated successfully!
  </div>
{:else if status === ToastMessages.ERROR}
  <div
    id="toast"
    class="hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded"
  >
    {name} Deleted successfully!
  </div>
{:else if status === ToastMessages.CREATE}
  <div
    id="toast"
    class="hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded"
  >
    {name} Added successfully!
  </div>
{:else if status === ToastMessages.WARNING}
  <div
    id="toast"
    class="hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded"
  >
    Warning: your {name} process maybe having a problem
  </div>
{/if}
