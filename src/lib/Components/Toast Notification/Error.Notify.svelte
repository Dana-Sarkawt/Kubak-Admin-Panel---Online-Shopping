<script>
    import { Toast } from 'flowbite-svelte';
    import { CheckCircleSolid, ExclamationCircleSolid, FireOutline, CloseCircleSolid } from 'flowbite-svelte-icons';
  </script>
  
<Toast color="red">
    <svelte:fragment slot="icon">
      <CloseCircleSolid class="w-5 h-5" />
      <span class="sr-only">Error icon</span>
    </svelte:fragment>
    Item has been deleted.
  </Toast>