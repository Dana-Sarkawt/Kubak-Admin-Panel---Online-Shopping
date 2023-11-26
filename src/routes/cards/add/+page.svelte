<script lang="ts">
  import { Label, Input } from "flowbite-svelte";
  import type { CreateCardRequest } from "$lib/Models/Requests/CreateCard.Request";
  import { authStore } from "$lib/Stores/Auth.Store";
  import { cardStore } from "$lib/Stores/Cards.Store";
  let options: CreateCardRequest = {
    id:null,
    webpageUrl: "",
    image: {
      url: "",
    },
    userId: "",
    expirationDate: new Date(),
  };

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    options.image.url = file;
    options.image.localUrl = URL.createObjectURL(file);
  }

  async function create(options: CreateCardRequest) {
      options.userId = $authStore?.id as string;
      await cardStore.create(options);
  }
</script>

<div class="container mx-auto h-auto">
  <a href="/cards">
    <button
      class="bg-white dark:bg-[#212121] px-5 py-3 rounded-xl m-3 text-[#f17f18] font-bold"
      >Back</button
    >
  </a>
</div>

<div
  class="container mx-auto max-w-2xl flex justify-center items-center flex-col gap-3 mt-32 py-12 rounded-xl bg-white dark:bg-[#212121]"
>
  <img
    src={options.image.localUrl ?? "/images/addImage.jpg"}
    alt=""
    class="w-11/12 h-60 object-cover object-center rounded-xl flex bg-[#B0AFAF]"
  />

  <input type="file" id="uploadBtn" on:change={handleFileChange} />
  <label for="uploadBtn" class="dark:bg-[#363636]">Add Image</label>

  <div class="mb-6 w-4/5 flex justify-center items-start flex-col">
    <Label for="large-input" class="block mb-2">Webpage URL</Label>
    <Input
      bind:value={options.webpageUrl}
      id="large-input"
      size="lg"
      placeholder="Webpage URL"
      class="w-full rounded-xl mb-3 dark:bg-[#363636]"
    />
    <Label for="large-input" class="block mb-2">Expiration Date</Label>
    <Input
      bind:value={options.expirationDate}
      id="large-input"
      type="date"
      size="lg"
      placeholder="Expiration Date"
      class="w-full rounded-xl dark:bg-[#363636]"
    />
  </div>
  <button
    class="bg-[#f17f18] font-bold text-white py-3 px-8 rounded-xl"
    type="submit" on:click={()=>create(options)}>Add Card</button
  >
</div>

<style>
  input[type="file"] {
    display: none;
  }

  label {
    display: inline-block;
    color: #f17f18;
    background-color: #f5f5f5;
    text-align: center;
    padding: 5px;
    border-radius: 8px;
    cursor: pointer;
  }
</style>
