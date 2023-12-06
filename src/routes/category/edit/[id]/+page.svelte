<script lang="ts">
    import { goto } from "$app/navigation";
  import type { CategoryDto } from "$lib/Models/DTO/Category.DTO.Model";
    import type { CreateCategoryRequest } from "$lib/Models/Requests/CreateCategory.Request";
    import { categoryStore } from "$lib/Stores/Categories.Store";
    import { Label, Input } from "flowbite-svelte";
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  
    let options: CreateCategoryRequest = {
      id: "",
      name: "",
      image: {
        url: "",
      },
      userId: "",
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
  
    async function create() {
      options.userId = "6559e81344d4547079c9";
      await categoryStore.create(options);
      goto("/category/1");
    }



    let inputValue = "";

  function handleInputChange(activEvent: any) {
    inputValue = activEvent.target.value;
  }

 
  onMount(async () => {
    const category: CategoryDto = (await categoryStore.get($page.params.id)) as CategoryDto;
    options = {
      id: category.id,
      name: category.name,
      image: {
        url: "",
        localUrl: category.categoryImage,
      },
        userId: "",
      
    };
  

    console.log(options);
  });
  
  </script>
  <div class="container mx-auto h-auto">
    <a href="/category/1">
      <button
        class="bg-white dark:bg-[#212121] px-5 py-3 rounded-xl m-3 text-[#f17f18] font-bold"
        >Back
      </button>
    </a>
  </div>
  
  <div
    class="container mx-auto max-w-2xl flex justify-center items-center flex-col gap-3 mt-44 py-12 rounded-xl bg-white dark:bg-[#212121]"
  >
    <div
      class="w-60 h-60 bg-[#e9e9e9] dark:bg-[#363636] flex justify-center items-center rounded-lg"
    >
      <img
        src={options.image.localUrl ?? "/images/category.png"}
        alt=""
        class="object-cover w-44 h-44 object-center p-1 rounded-xl flex"
      />
    </div>
  
    <input type="file" id="uploadBtn" on:change={handleFileChange}  />
    <label
      for="uploadBtn"
      class="font-bold hover:bg-gray-800 bg-[#f0f0f0] text-[#f17f18] dark:bg-[#363636] hover:text-white transition-all"
      >Add Image</label
    >
  
    <div class="mb-6 w-4/5 flex justify-center items-start flex-col">
      <Label for="large-input" class="block mb-2 ">Name</Label>
      <Input
      bind:value={options.name}
        id="large-input"
        size="lg"
        placeholder="Category Name"
        class="w-full  rounded-xl flex justify-center items-center text-center dark:bg-[#363636] dark:text-white"
        
      />
    </div>
    <button
      class="bg-[#f17f18] font-bold text-white py-3 px-8 rounded-xl duration-300"
      type="submit"
      on:click={create}
     
      >Update Category
    </button>
  </div>
  
  <style>
    input[type="file"] {
      display: none;
    }
  
    label {
      display: inline-block;
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
  