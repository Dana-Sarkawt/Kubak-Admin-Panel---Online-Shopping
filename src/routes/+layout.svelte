<script lang="ts">
	import { OrdersRepository } from '$lib/Repositories/Implementation/Orders.Repository';
  import "../app.postcss";
  import Sidebar from "$lib/Components/Sidebar.Component.svelte";
  import Navbar from "$lib/Components/Navbar.Component.svelte";
  import { page } from "$app/stores";
  import { darkMode } from "$lib/Stores/Darkmode.Store";
  import { onMount } from "svelte";
  import { authStore } from "$lib/Stores/Auth.Store";
  import { goto } from "$app/navigation";
  import type { CreateOrderRequest } from '$lib/Models/Requests/CreateOrder.Request';

  $: pathUrl = $page.url.pathname;

  const ordersRepository = new OrdersRepository();

  onMount(async () => {
    darkMode.subscribe(() => {
      checkDarkMode();
    });
    await authStore.get();
    if ($authStore && $page.url.pathname === "/login") {
      goto("/");
    }

    const order:CreateOrderRequest = {
      userId: $authStore!.id,
      items: [
        {
          itemId:"6565e81e63a13ad3a10b",
          quantity: 5
        },
        {
          itemId:"6565c3aea1355e24ec82",
          quantity: 3
        }
      ]
    }
    await ordersRepository.createOrder(order);

  });

  async function checkDarkMode() {
    const htmlTag = document.documentElement;
    const classList = htmlTag.classList;
    classList.contains("dark") ? darkMode.set("dark") : darkMode.set("");
  }
</script>

<main class="bg-slate-100 dark:bg-gray-950 w-full h-full">
  {#if pathUrl !== "/login"}
    <Navbar />
    <div class="w-4/5 h-auto float-right">
      <slot />
    </div>
    <Sidebar />
  {:else}
    <div class="w-full h-auto float-right">
      <slot />
    </div>
  {/if}
</main>
