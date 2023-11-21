<script lang="ts">
  import "../app.postcss";
  import Sidebar from "$lib/Components/Sidebar.Component.svelte";
  import Navbar from "$lib/Components/Navbar.Component.svelte";
  import { page } from '$app/stores';
  import { darkMode } from "$lib/Stores/Darkmode.Store";
  import { onMount } from "svelte";
  $: pathUrl = $page.url.pathname;
  onMount(() => {
    const htmlTag = document.documentElement;
    const classList = htmlTag.classList;

    console.log("Class List ", );
    
    
    if (classList.contains('dark')) {
      darkMode.set(classList[0]);
      console.log("Dark mode is on",classList[0]);
    } else {
      darkMode.set("");
        console.log("Dark mode is off");
    }
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