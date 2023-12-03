<script lang="ts">
  import { cardStore } from "$lib/Stores/Cards.Store";
  import { Spinner } from "flowbite-svelte";
  import { onMount } from "svelte";

  onMount(async () => {
    await cardStore.getAll();
    console.log($cardStore);
  });

  let loading = true;
  onMount(async () => {
    try {
      await cardStore.getAll();
    } finally {
      loading = false;
    }
  });

  async function deleteCard(id:string) {
    await cardStore.delete(id);
    
  }
</script>

<div
  class="w-full container mx-auto h-auto flex justify-center items-center flex-col gap-3"
>
  <a  href="/cards/add"  class="w-full flex justify-center items-centere mt-5">
    <button
   
      class="w-11/12 h-12 bg-[#f17f18] dark:bg-[#212121] hover:bg-[#212121] dark:hover:bg-[#f17f18] ease-in-out duration-300 p-3 rounded-xl text-white text-2xl flex justify-center items-center"
    >
      +
    </button>
  </a>


  {#if loading}
  <Spinner />
  {:else}
  {#each $cardStore.data as card}
    <div  class="w-11/12 h-[300px] flex justify-end ">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="absolute z-30 m-2 bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 duration-300 ease-in-out"
        on:click={()=>deleteCard(card.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
<a href="/cards/{card.id}" class="w-full">

<img
  src={card.cardImage ?? "/images/addImage.jpg"}
  alt=""
  class="w-full h-[300px] bg-slate-700 rounded-xl object-center object-cover border-black relative z-[-1]"
/>
</a>
    </div>
  {/each}
 
  {/if}
</div>
