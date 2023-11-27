<script lang="ts">
  import { page } from "$app/stores";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
  import { categoryStore } from "$lib/Stores/Categories.Store";
  import { onMount } from "svelte";

  let filter: GenericListOptions = {
    page: parseInt($page.params.page),
    limit: 7,
    sortField: undefined,
  };

  let pages: number = 0;

  onMount(async () => {
    await categoryStore.getAll(filter);
    pages = $categoryStore.pages as number;
  });
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

<Pagination name="category" {pages} {filter} Store={categoryStore} />
