<script lang="ts">
  import "../app.postcss";
  import Sidebar from "$lib/Components/Sidebar.Component.svelte";
  import Navbar from "$lib/Components/Navbar.Component.svelte";
  import { darkMode } from "$lib/Stores/Darkmode.Store";
  import { onMount } from "svelte";

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

<Navbar />
<div class="w-4/5 h-auto float-right">
  <slot />
</div>
<Sidebar />
