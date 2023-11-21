<script lang="ts">
  import "../app.postcss";
  import Sidebar from "$lib/Components/Sidebar.Component.svelte";
  import Navbar from "$lib/Components/Navbar.Component.svelte";
  import { page } from "$app/stores";
  import { darkMode } from "$lib/Stores/Darkmode.Store";
  import { onMount } from "svelte";
  $: pathUrl = $page.url.pathname;

  onMount(() => {
    darkMode.subscribe(() => {
      checkDarkMode();
    });
  });

  async function checkDarkMode() {
    const htmlTag = document.documentElement;
    const classList = htmlTag.classList;
    classList.contains("dark") ? darkMode.set("dark") : darkMode.set("");
  }
</script>

<main class="bg-slate-100 dark:bg-gray-950 w-full h-full">
  {#if pathUrl != "/login"}
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
