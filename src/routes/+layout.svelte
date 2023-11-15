<script>
  import "../app.postcss";
  import Sidebar from "$lib/components/sidebar.svelte";
  import Navbar from "$lib/components/navbar.svelte";
</script>

<Navbar />
<div class="w-4/5 h-auto float-right">
  <slot />
</div>
<Sidebar />
