<script>
  import "../app.postcss";
  import Sidebar from "$lib/Components/Sidebar.Component.svelte";
  import Navbar from "$lib/Components/Navbar.Component.svelte";
</script>

<Navbar />
<div class="w-4/5 h-auto float-right">
  <slot />
</div>
<Sidebar />
