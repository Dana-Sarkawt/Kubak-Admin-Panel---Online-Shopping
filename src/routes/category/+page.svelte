<script lang="ts">
  import { page } from "$app/stores";
  import { Pagination, type LinkType } from "flowbite-svelte";
  import {
    ChevronLeftOutline,
    ChevronRightOutline,
  } from "flowbite-svelte-icons";

  $: activeUrl = $page.url.searchParams.get("page");
  let pages:LinkType[] = [
    { name: "1", href: "/category/1", active:true },
    { name: "2", href: "/category/2", active:false },
    { name: "3", href: "/category/3", active:false },
    { name: "4", href: "/category/4", active:false },
    { name: "5", href: "/category/5", active:false },
  ];

  let ArrayNumber: number[] = [1, 2, 3, 4, 5, 6, 7];
  $: {
    pages.forEach((page) => {
      let splitUrl = page.href!.split("?");
      let queryString = splitUrl.slice(1).join("?");
      const hrefParams = new URLSearchParams(queryString);
      let hrefValue = hrefParams.get("page");
      if (hrefValue === activeUrl) {
        page.active = true;
      } else {
        page.active = false;
      }
    });
    pages = pages;
  }

  const previous = () => {
    alert("Previous btn clicked. Make a call to your server to fetch data.");
  };
  const next = () => {
    alert("Next btn clicked. Make a call to your server to fetch data.");
  };
</script>


<div
class="container mx-auto grid grid-cols-4 h-auto  flex-wrap justify-center  my-12 items-center px-12  gap-3"
>



<div
class=" md:w-28 md:h-36  lg:w-44 lg:h-60 bg-[#f17f18] px-5 flex justify-around items-center flex-col rounded-xl"
>
<p class="w-full flex justify-center items-center text-6xl text-white">+</p>

</div>
  {#each ArrayNumber as array}
    <div
      class="md:w-28 md:h-36  lg:w-44 lg:h-60  bg-white px-5 flex justify-around items-center flex-col rounded-xl mb-5"
    >
      <img src="/images/rice.png" alt="" />
      <p class="text-2xl">Rice</p>
    </div>
  {/each}
</div>

<div class="w-full flex justify-center items-center mt-3">
  <Pagination
    {pages}
    on:previous={previous}
    on:next={next}
    class="shadow-lg rounded-lg"
    activeClass="bg-gradient-to-b from-[#f17f17] to-[#ffab65] text-white"
    normalClass="text-[#f17f18]"
    icon
  >
    <svelte:fragment slot="prev">
      <span class="sr-only">Previous</span>
      <ChevronLeftOutline class="w-2.5 h-2.5 text-[#f17f18]" />
    </svelte:fragment>
    <svelte:fragment slot="next">
      <span class="sr-only">Next</span>
      <ChevronRightOutline class="w-2.5 h-2.5 text-[#f17f18]" />
    </svelte:fragment>
  </Pagination>
</div>
