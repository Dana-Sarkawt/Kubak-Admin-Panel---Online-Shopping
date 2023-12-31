<script lang="ts">
  import { page } from "$app/stores";
  import Pagination from "$lib/Components/Pagination.Component.svelte";
  import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
  import { categoryStore } from "$lib/Stores/Categories.Store";
  import { onMount } from "svelte";
  import { Button, Modal, Spinner } from "flowbite-svelte";
  import { toastStore } from "$lib/Stores/Toast.Store";
  import Notification from "$lib/Components/Toasts.Notify.Component.svelte";
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";

  let filter: GenericListOptions = {
    page: parseInt($page.params.page),
    limit: 7,
    sortField: undefined,
  };

  let pages: number = 0;
  let popupModal: boolean = false;
  let categoryId: string = "";

  let loading = true;
  onMount(async () => {
    try {
      await categoryStore.getAll(filter);
    } finally {
      loading = false;
    }
  });

  $: {
    if ($categoryStore) {
      pages = $categoryStore.pages as number;
    }
  }

  async function deleteCategory(id: string) {
    await categoryStore.delete(id);
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

  {#if loading}
    <div class="w-full h- flex justify-center mt-12 items-center">
      <Spinner />
    </div>
  {:else}
    {#each $categoryStore.data as category}
      <div
        class="md:w-28 md:h-36 lg:w-44 lg:h-60 2xl:w-64 2xl:h-96 bg-white dark:bg-[#212121] dark:text-white px-2 flex justify-around items-center flex-col rounded-xl  relative top-0 hover:border-[#f17f18] hover:border ease-in-out duration-100 cursor-pointer"
      >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->

        <div
          class="absolute top-0 right-0 z-30 m-2 bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 duration-300 ease-in-out"
          on:click={() => {(popupModal = true); categoryId = category.id;}}
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

        <a
          href="/category/edit/{category.id}"
          class="text-center h-36 flex flex-col justify-center items-center p-2 gap-2"
        >
          <img
            src={category.categoryImage ?? "/images/category.png"}
            alt=""
            class="object-cover object-center  w-auto  h-auto rounded-lg"
          />
          <p class="text-md lg:text-2xl text-center">{category.name ?? "Rice"}</p>
        </a>
      </div>
    {/each}
  {/if}
</div>

<Modal bind:open={popupModal} size="xs" autoclose>
  <div class="text-center">
    <ExclamationCircleOutline
      class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
    />
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      Are you sure you want to Delete this Category?
    </h3>
    <Button
      class="me-2 bg-red-500 p-2 w-auto h-10"
      on:click={() => deleteCategory(categoryId)}>Yes, I'm sure</Button
    >
    <Button color="alternative">No, cancel</Button>
  </div>
</Modal>

<Pagination name="category" {pages} {filter} Store={categoryStore} />

<Notification status={$toastStore} name="Category" />
