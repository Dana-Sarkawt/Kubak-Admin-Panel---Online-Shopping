<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
  import { categoryStore } from "$lib/Stores/Categories.Store";
  import { Pagination, type LinkType } from "flowbite-svelte";
  import {
    ChevronLeftOutline,
    ChevronRightOutline,
  } from "flowbite-svelte-icons";
  import { onMount } from "svelte";

  let pageCount: LinkType[] = [];

  let filter: GenericListOptions = {
    page: parseInt($page.params.page),
    limit: 7,
    sortField: undefined,
  };

  onMount(async () => {
    await categoryStore.getAll(filter);
    pagination();
  });

  async function pagination() {
    for (let i = 0; i < $categoryStore.pages!; i++) {
      pageCount[i] = {
        name: i + 1 + "",
        href: `/category/${i + 1}`,
        active: i + 1 === parseInt($page.params.page),
      };
    }
  }

  const previous = async () => {
    if (parseInt($page.params.page) === 1) {
      return;
    }
    goto(`/category/${parseInt($page.params.page) - 1}`);
    filter.page = parseInt($page.params.page) - 1;
    await categoryStore.getAll(filter);
    pagination();
  };

  const next = async () => {
    if (parseInt($page.params.page) === $categoryStore.pages) {
      return;
    }
    goto(`/category/${parseInt($page.params.page) + 1}`);
    filter.page = parseInt($page.params.page) + 1;
    await categoryStore.getAll(filter);
    pagination();
  };

  $:{
    if($page.params.page){
      filter.page = parseInt($page.params.page);
      categoryStore.getAll(filter);
      pagination();
    }
  }
</script>

<div
  class="container mx-auto grid grid-cols-4 h-auto flex-wrap justify-center my-12 items-center px-12 gap-3"
>
  <a href="/category/add">
    <div
      class=" md:w-28 md:h-36 lg:w-44 lg:h-60 2xl:w-64 2xl:h-96 bg-[#f17f18] dark:bg-[#212121] px-5 flex justify-around items-center flex-col rounded-xl hover:bg-[#212121] dark:hover:bg-[#f17f18] ease-in-out duration-300"
    >
      <p class="w-full flex justify-center items-center text-6xl text-white">
        +
      </p>
    </div>
  </a>
  {#each $categoryStore.data as category}
    <div
      class="md:w-28 md:h-36 lg:w-44 lg:h-60 2xl:w-64 2xl:h-96 bg-white dark:bg-[#212121] dark:text-white px-5 flex justify-around items-center flex-col rounded-xl mb-5"
    >
      <img src={category.categoryImage ?? "/images/rice.png"} alt="" />
      <p class="text-2xl">{category.name ?? "Rice"}</p>
    </div>
  {/each}
</div>

<div class="w-full flex justify-center items-center mt-3">
  <Pagination
    pages={pageCount}
    on:previous={previous}
    on:next={next}
    class="shadow-lg rounded-lg"
    activeClass="bg-gradient-to-b from-[#f17f17] to-[#ffab65] text-white"
    normalClass="text-[#f17f18] dark:text-white"
    icon
  >
    <svelte:fragment slot="prev">
      <span class="sr-only">Previous</span>
      <ChevronLeftOutline class="w-2.5 h-2.5 text-[#f17f18] dark:text-white" />
    </svelte:fragment>
    <svelte:fragment slot="next">
      <span class="sr-only">Next</span>
      <ChevronRightOutline class="w-2.5 h-2.5 text-[#f17f18] dark:text-white" />
    </svelte:fragment>
  </Pagination>
</div>
