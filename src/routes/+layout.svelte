<script lang="ts">
  import "../app.postcss";
  import Sidebar from "$lib/Components/Sidebar.Component.svelte";
  import Navbar from "$lib/Components/Navbar.Component.svelte";
  import { page } from "$app/stores";
  import { darkMode } from "$lib/Stores/Darkmode.Store";
  import { onMount } from "svelte";
  import { authStore } from "$lib/Stores/Auth.Store";
  import { goto } from "$app/navigation";
  import OneSignal from "@nolanx/svelte-onesignal";
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

    await OneSignal.init({
      appId: "fcb163e5-c7b1-4340-8597-ce7d0f757e85",
      allowLocalhostAsSecureOrigin: true,
    });
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
