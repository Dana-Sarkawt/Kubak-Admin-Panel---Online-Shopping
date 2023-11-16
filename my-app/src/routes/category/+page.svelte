
<script lang="ts">
  let ArrayNumber:number[] =[
    1,2,3,4,5,6,7,8
  ]








  import { page } from '$app/stores';
  import { Pagination, PaginationItem } from 'flowbite-svelte';
  import { ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';

  $: activeUrl = $page.url.searchParams.get('page');
  let pages = [
    { name: 1, href: '/category' },
    { name: 2, href: '/components/pagination?page=7' },
    { name: 3, href: '/components/pagination?page=8' },
    { name: 4, href: '/components/pagination?page=9' },
    { name: 5, href: '/components/pagination?page=10' }
  ];

  $: {
    pages.forEach((page) => {
      let splitUrl = page.href.split('?');
      let queryString = splitUrl.slice(1).join('?');
      const hrefParams = new URLSearchParams(queryString);
      let hrefValue = hrefParams.get('page');
      if (hrefValue === activeUrl) {
        page.active = true;
      } else {
        page.active = false;
      }
    });
    pages = pages;
  }

  const previous = () => {
    alert('Previous btn clicked. Make a call to your server to fetch data.');
  };
  const next = () => {
    alert('Next btn clicked. Make a call to your server to fetch data.');
  };
</script>

<div class="w-full h-auto flex justify-center items-center mt-4">
   <!-- START ADD CATEGORIES  -->
   <div class="md:w-16 md:h-16 lg:w-24 lg:h-24 hover:scale-105 transition-ease-in-out duration-300 bg-[#f17f18] px-5 flex justify-center items-center flex-col rounded-xl mb-3">
    <p class="md:text-4xl lg:text-5xl text-white">+</p>
</div>
<!-- END ADD CATEGORIES  -->
</div>













<div class="w-full  h-auto flex flex-row-reverse    flex-wrap justify-center items-center md:px-12 lg:px-26 xl:px-26 2xl:px-32 gap-3">
  {#each ArrayNumber as array}
  <div class="md:w-28 lg:w-36 md:h-36 lg:h-52 xl:w-60 xl:h-64 2xl:w-80 2xl:h-96 bg-white px-5 flex justify-around items-center flex-col rounded-xl">
      <img src="/images/rice.png" alt="">
      <p class="text-2xl">Rice</p>
  </div>
  {/each}
   
    <!-- <div class="md:w-24 lg:w-36 md:h-28 lg:h-52 xl:w-60 xl:h-56 bg-white px-5 flex justify-around items-center flex-col rounded-xl">
        <img src="/images/rice.png" alt="">
        <p class="text-2xl">Rice</p>
    </div>
    <div class="md:w-24 lg:w-36 md:h-28 lg:h-52 xl:w-60 xl:h-56 bg-white px-5 flex justify-around items-center flex-col rounded-xl">
        <img src="/images/rice.png" alt="">
        <p class="text-2xl">Rice</p>
    </div>
    <div class="md:w-24 lg:w-36 md:h-28 lg:h-52 xl:w-60 xl:h-56 bg-white px-5 flex justify-around items-center flex-col rounded-xl">
        <img src="/images/rice.png" alt="">
        <p class="text-2xl">Rice</p>
    </div>
    <div class="md:w-24 lg:w-36 md:h-28 lg:h-52 xl:w-60 xl:h-56 bg-white px-5 flex justify-around items-center flex-col rounded-xl">
        <img src="/images/rice.png" alt="">
        <p class="text-2xl">Rice</p>
    </div>
    <div class="md:w-24 lg:w-36 md:h-28 lg:h-52 xl:w-60 xl:h-56 bg-white px-5 flex justify-around items-center flex-col rounded-xl">
        <img src="/images/rice.png" alt="">
        <p class="text-2xl">Rice</p>
    </div>
   
    <div class="md:w-24 lg:w-36 md:h-28 lg:h-52 xl:w-60 xl:h-56 bg-white px-5 flex justify-around items-center flex-col rounded-xl">
        <img src="/images/rice.png" alt="">
        <p class="text-2xl">Rice</p>
    </div>

    <div class="md:w-24 lg:w-36 md:h-28 lg:h-52 xl:w-60 xl:h-56 bg-white px-5 flex justify-around items-center flex-col rounded-xl">
        <img src="/images/rice.png" alt="">
        <p class="text-2xl">Rice</p>
    </div> -->

   
   
   
</div>








<div class="w-full flex justify-center items-center mt-8">

  <Pagination {pages} on:previous={previous} on:next={next}
  class="shadow-lg rounded-lg"
  activeClass="bg-gradient-to-b from-[#f17f17] to-[#ffab65] text-white"
  normalClass="text-[#f17f18]"
  icon>
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


