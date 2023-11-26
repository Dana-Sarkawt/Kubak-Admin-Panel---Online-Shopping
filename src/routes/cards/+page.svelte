<script lang="ts">
  import { cardStore } from "$lib/Stores/Cards.Store";
  import { onMount } from "svelte";

    onMount(async()=>{
        await cardStore.getAll();

        console.log($cardStore);
        
    })
</script>

<div
  class="w-full container mx-auto h-auto flex justify-center items-center flex-col gap-3"
>
  <a href="/cards/add" class="w-full flex justify-center items-centere mt-5">
    <button
      class="w-11/12 h-12 bg-[#f17f18] dark:bg-[#212121] hover:bg-[#212121] dark:hover:bg-[#f17f18] ease-in-out duration-300 p-3 rounded-xl text-white text-2xl flex justify-center items-center"
    >
      +
    </button>
  </a>

  {#each $cardStore.data as card}
  <img
    src={card.cardImage ?? "/images/addImage.jpg"}
    alt=""
    class="w-11/12 h-[300px] bg-slate-700 rounded-xl object-center object-cover border-black"
  />
  {/each}
  <!-- <img
    src="images/wallpaper.jpg"
    alt=""
    class="w-11/12 h-[300px] bg-slate-700 rounded-xl object-center object-cover border-black"
  />
  <img
    src="images/wallpaper.jpg"
    alt=""
    class="w-11/12 h-[300px] bg-slate-700 rounded-xl object-center object-cover border-black"
  /> -->
</div>
