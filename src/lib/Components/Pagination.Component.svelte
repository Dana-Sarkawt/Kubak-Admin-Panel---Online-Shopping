<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
  import { Pagination, type LinkType } from "flowbite-svelte";
  import {
    ChevronLeftOutline,
    ChevronRightOutline,
  } from "flowbite-svelte-icons";

  export let Store: any;
  export let pages: number = 1;
  export let name: string;
  let pageCount: LinkType[] = [];
  export let filter: GenericListOptions;

  $: {
    if ($page.params.page) {
      filter.page = parseInt($page.params.page ?? 1);
      fetchData();
    }
  }

  async function fetchData() {
    await Store.getAll(filter);
    updatePageCount();
  }

  function updatePageCount() {
    pageCount = Array.from({ length: pages }, (_, i) => ({
      name: (i + 1).toString(),
      href: `/${name}/${i + 1}`,
      active: i + 1 === parseInt($page.params.page),
    }));
  }

  const previous = async () => {
    if (parseInt($page.params.page) === 1) {
      return;
    }
    filter.page = parseInt($page.params.page) - 1;
    goto(`/${name}/${filter.page}`);
    fetchData();
  };

  const next = async () => {
    if (parseInt($page.params.page) === $Store.pages) {
      return;
    }
    filter.page = parseInt($page.params.page) + 1;
    goto(`/${name}/${filter.page}`);
    fetchData();
  };
</script>
{#if pages > 1}
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
{/if}
