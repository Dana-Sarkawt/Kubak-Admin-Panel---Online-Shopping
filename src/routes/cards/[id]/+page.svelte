<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  onMount(async () => {
    console.log($page.params.id);
  });
</script>
