<script lang="ts">
  import "../app.postcss";
  import Sidebar from "$lib/Components/Sidebar.Component.svelte";
  import Navbar from "$lib/Components/Navbar.Component.svelte";
  import { checkDarkMode } from "$lib/Stores/Darkmode.Store";
  import { page } from '$app/stores';
  import { onMount } from "svelte";
  $: pathUrl = $page.url.pathname;
  onMount(() => {
    checkDarkMode();
  });
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