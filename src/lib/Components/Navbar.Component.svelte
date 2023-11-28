<script lang="ts">
	import { authStore } from '$lib/Stores/Auth.Store';
  import { darkMode } from "$lib/Stores/Darkmode.Store";
  import { DarkMode } from "flowbite-svelte";
  import { SunSolid, MoonSolid } from "flowbite-svelte-icons";
  let btnClass =
    "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2";
</script>

<div
  class="w-4/5 h-20 bg-white dark:bg-[#252525] flex flex-row float-right justify-end items-center"
>
  <div class="w-3/4 flex justify-center items-center gap-3 mr-12">
    <p class="font-bold dark:text-white">{$authStore?.name??"Your name"}</p>
    <img
      src={ $authStore?.imgUrl || "/images/user.png"}
      alt=""
      class="w-16 h-16 rounded-full object-cover bg-no-repeat object-center"
    />
  </div>
  <DarkMode class="text-lg mr-5">
    <svelte:fragment slot="lightIcon">
      <SunSolid
        on:click={() => {
          darkMode.set("");
        }}
      />
    </svelte:fragment>
    <svelte:fragment slot="darkIcon">
      <MoonSolid
        on:click={() => {
          darkMode.set("dark");
        }}
      />
    </svelte:fragment>
  </DarkMode>
</div>
