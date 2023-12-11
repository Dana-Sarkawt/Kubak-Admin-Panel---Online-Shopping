<script lang="ts">
  import "../app.postcss";
  import Sidebar from "$lib/Components/Sidebar.Component.svelte";
  import Navbar from "$lib/Components/Navbar.Component.svelte";
  import { page } from "$app/stores";
  import { darkMode } from "$lib/Stores/Darkmode.Store";
  import { onMount } from "svelte";
  import { authStore } from "$lib/Stores/Auth.Store";
  import { goto } from "$app/navigation";
  import { routingStore } from "$lib/Stores/Routing.Store";
  import type { LngLat } from "$lib/Models/Common/LngLat.Common.Model";
  $: pathUrl = $page.url.pathname;

  // let window: any;
  // let OneSignalDeferred: any = [];

  onMount(async () => {


    darkMode.subscribe(() => {
      checkDarkMode();
    });
    await authStore.get();
    if ($authStore && $page.url.pathname === "/login") {
      goto("/");
    }
    let source:LngLat = {
      lat: 35.553831466871,
      lng: 45.395440757275
    }

    let destination:LngLat = {
      lat: 35.563564144067,
      lng: 45.396189428866
    }

    await routingStore.create(source, destination);
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
