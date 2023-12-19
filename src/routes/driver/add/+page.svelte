<script lang="ts">
    import type { CreateItemRequest } from "$lib/Models/Requests/CreateItem.Request";
    import { authStore } from "$lib/Stores/Auth.Store";
    import { categoryStore } from "$lib/Stores/Categories.Store";
    import { itemStore } from "$lib/Stores/Items.Store";
    import { Label, Input, Spinner } from "flowbite-svelte";
    import { MultiSelect } from "flowbite-svelte";
    import { onMount } from "svelte";
    let options: CreateItemRequest = {
      id: null,
      name: "",
      categoryId: [],
      price: 0,
      quantity: 0,
      productionDate: new Date(),
      expiredDate: new Date(),
      image: {
        url: "",
      },
      userId: "",
    };
    let categories: { value: string; name: string }[] = [];
    let selected: string[] = [];
  
    onMount(async () => {
      await categoryStore.getAll();
  
      categories = $categoryStore.data.map((category) => {
        return {
          value: category.id,
          name: category.name,
        };
      });
  
      console.log(categories);
    });
  
    function handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (!input.files || input.files.length === 0) {
        return;
      }
      const file = input.files[0];
      options.image.url = file;
      options.image.localUrl = URL.createObjectURL(file);
    }
  
    let isLoading = false;
    async function create(options: CreateItemRequest) {
      isLoading = true;
      try{
        options.categoryId = selected;
        console.log(options);
        await itemStore.create(options);
      }finally{
        isLoading = false;
      }
    }
  
    let inputValue = "";
  
    function handleInputChange(activEvent: any) {
      inputValue = activEvent.target.value;
    }
  </script>
  
  <div class="container mx-auto h-auto">
    <a href="/driver">
      <button
        class="bg-white dark:bg-[#212121] px-5 py-3 rounded-xl m-3 text-[#f17f18] font-bold"
        >Back</button
      >
    </a>
  </div>
  
  <div
    class="container mx-auto max-w-2xl flex justify-center items-center flex-col gap-3 mt-23 py-12 rounded-xl bg-white dark:bg-[#212121]"
  >
   
  
    <div class="mb-6 w-4/5 flex justify-center items-start flex-col">
      <Label for="large-input" class="block mb-2">Bike Annutiy</Label>
      <Input
        bind:value={options.name}
        id="large-input"
        size="lg"
        required
        placeholder="Bike Annutiy"
        class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
      />

      <div class="w-full h-auto flex gap-4 justify-center items-center mt-4">

          <div
          class="w-60 h-60 bg-[#e9e9e9] dark:bg-[#363636] flex justify-center items-center rounded-lg flex-col"
        >

          <img
            src={options.image.localUrl ?? "/images/item.png"}
            alt=""
            class="object-cover w-44 h-44 object-center p-1 rounded-xl flex"
          />
          <input
          type="file"
          id="uploadBtn"
          on:input={handleInputChange}
          on:change={handleFileChange}
          accept=".jpg, .jpeg, .png"
        />
        <label for="uploadBtn" class=" bg-[#f0f0f0] dark:bg-[#363636]"
          >Add Image</label
        >
        </div>

          <div
          class="w-60 h-60 bg-[#e9e9e9] dark:bg-[#363636] flex justify-center items-center rounded-lg flex-col"
        >
          <img
            src={options.image.localUrl ?? "/images/item.png"}
            alt=""
            class="object-cover w-44 h-44 object-center p-1 rounded-xl flex"
            />
            <input
              type="file"
              id="uploadBtn"
              on:input={handleInputChange}
              on:change={handleFileChange}
              accept=".jpg, .jpeg, .png"
            />
            <label for="uploadBtn" class=" bg-[#f0f0f0] dark:bg-[#363636]"
              >Add Image</label
            >
        </div>
      </div>
  
    
  
      <div class="w-full flex flex-col mt-12">
        <Label for="large-input" class="block mb-2">Passport Number</Label>
        <Input
        bind:value={options.name}
        id="large-input"
        size="lg"
        required
        placeholder="Passport Number"
        class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
      />

        <div class="w-full h-auto flex gap-4 justify-center items-center mt-4">

          
  
            <div
            class="w-60 h-60 bg-[#e9e9e9] dark:bg-[#363636] flex justify-center items-center rounded-lg flex-col"
          >
            <img
              src={options.image.localUrl ?? "/images/item.png"}
              alt=""
              class="object-cover w-44 h-44 object-center p-1 rounded-xl flex"
              />
              <input
                type="file"
                id="uploadBtn"
                on:input={handleInputChange}
                on:change={handleFileChange}
                accept=".jpg, .jpeg, .png"
              />
              <label for="uploadBtn" class=" bg-[#f0f0f0] dark:bg-[#363636]"
                >Add Image</label
              >
          </div>
        </div>
      </div>


      <div class="w-full flex flex-col mt-12">
        <Label for="large-input" class="block mb-2">Plate Number</Label>
        <Input
        bind:value={options.name}
        id="large-input"
        size="lg"
        required
        placeholder="Plate Number"
        class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
      />

        <div class="w-full h-auto flex gap-4 justify-center items-center mt-4">

          
  
            <div
            class="w-60 h-60 bg-[#e9e9e9] dark:bg-[#363636] flex justify-center items-center rounded-lg flex-col"
          >
            <img
              src={options.image.localUrl ?? "/images/item.png"}
              alt=""
              class="object-cover w-44 h-44 object-center p-1 rounded-xl flex"
              />
              <input
                type="file"
                id="uploadBtn"
                on:input={handleInputChange}
                on:change={handleFileChange}
                accept=".jpg, .jpeg, .png"
              />
              <label for="uploadBtn" class=" bg-[#f0f0f0] dark:bg-[#363636]"
                >Add Image</label
              >
          </div>
        </div>
      </div>


    
  
        
  
      
  
     
    </div>
    <button
      on:click={() => create(options)}
      disabled={!options.name || isLoading ||
        !options.image.url ||
        !options.price ||
        !options.quantity ||
        !options.productionDate ||
        !options.expiredDate}
      class="bg-[#f17f18] font-bold text-white py-3 px-8 rounded-xl"
      type="submit">
      {#if isLoading}
      
        <p>
          <Spinner class="me-3" size="4" color="white" />
          Loading
        </p>
        
  
      {:else}
      Add Item
      {/if}
      </button
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
  
    button:disabled {
      opacity: 0.5;
      transition: ease-in-out 0.3s;
    }
  </style>
  