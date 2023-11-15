<script>
      import { DarkMode } from 'flowbite-svelte';
      import { SunSolid, MoonSolid } from 'flowbite-svelte-icons';
let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';
</script>
<div class="w-4/5 h-20 bg-white flex flex-row float-right justify-end items-center">
    <div class="w-3/4 flex justify-center items-center gap-3 mr-12">

        <p class="font-bold">Dana Sarkawt</p>
        <img src="/images/user.jpg" alt="" class="w-16 h-16 rounded-full bg-cover bg-no-repeat bg-center">
    </div>
    <DarkMode class="text-lg mr-5">
        <svelte:fragment slot="lightIcon">
          <SunSolid />
        </svelte:fragment>
        <svelte:fragment slot="darkIcon">
          <MoonSolid />
        </svelte:fragment>
      </DarkMode>
</div>