<script lang="ts">
    import type { CreateItemRequest } from "$lib/Models/Requests/CreateItem.Request";
    import { authStore } from "$lib/Stores/Auth.Store";
    import { categoryStore } from "$lib/Stores/Categories.Store";
    import { itemStore } from "$lib/Stores/Items.Store";
    import { Label, Input } from "flowbite-svelte";
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
    let selected:string[] = [];
  
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
  
    async function create(options: CreateItemRequest) {
      options.userId = $authStore?.id ?? "";
      options.categoryId = selected;
      console.log(options);
      await itemStore.create(options);
    }


    var add_button = 0;
    function addInput(){
        add_button++;
        var newInput = document.createElement('div');
        newInput.innerHTML = "<div class='w-full flex flex-col h-auto'><Label for='large-input' class='block mb-2'>Items</Label><select name='' id='' class='w-full pt-2 rounded-lg h-12  border-gray-300'><option value=''></option></select></div><div class='w-full flex flex-col'><Label for='large-input' class='block mb-2'>Quantity</Label><Input bind:value={options.quantity} id='large-input' size='lg' required type='number' class='w-full rounded-xl dark:bg-[#363636] dark:text-white'/></div>";
        
    }

    function deleteInput(){
        add_button--;
        var newInput = document.createElement('div');
        newInput.innerHTML = "<div class='w-full flex flex-col h-auto'><Label for='large-input' class='block mb-2'>Items</Label><select name='' id='' class='w-full pt-2 rounded-lg h-12  border-gray-300'><option value=''></option></select></div><div class='w-full flex flex-col'><Label for='large-input' class='block mb-2'>Quantity</Label><Input bind:value={options.quantity} id='large-input' size='lg' required type='number' class='w-full rounded-xl dark:bg-[#363636] dark:text-white'/></div>";
        
    }
  </script>
  
  <div class="container mx-auto h-auto">
    <a href="/monitoring">
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
      <Label for="large-input" class="block mb-2">User</Label>
      <select name="" id="" class="w-full pt-2 rounded-lg border-gray-300">

        <option value=""></option>
      </select>
  










      <div class="w-full h-auto flex justify-center items-end  mt-2 gap-2">
     
        <button class="w-24 h-12 flex justify-center items-center text-lg text-white bg-[#f17f18] rounded-lg" on:click={addInput}>+</button>
        
        <div class="w-full flex flex-col h-auto">
            <Label for="large-input" class="block mb-2">Items</Label>
            <select name="" id="" class="w-full pt-2 rounded-lg h-12  border-gray-300">
                <option value=""></option>
            </select>    
        </div>
        
        <div class="w-full flex flex-col">
            <Label for="large-input" class="block mb-2">Quantity</Label>
            <Input
              bind:value={options.quantity}
              id="large-input"
              size="lg"
              required
              type="number"
              class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
            />
        </div>
        
        </div>

      {#if add_button > 0}
      {#each Array(add_button) as _, i}
      <div class="w-full h-auto flex justify-center items-end  mt-2 gap-2">
     
<button class="w-24 h-12 flex justify-center items-center text-lg text-white bg-red-600 rounded-lg" on:click={deleteInput}>-</button>

<div class="w-full flex flex-col h-auto">
    <Label for="large-input" class="block mb-2">Items</Label>
    <select name="" id="" class="w-full pt-2 rounded-lg h-12  border-gray-300">
        <option value=""></option>
    </select>    
</div>

<div class="w-full flex flex-col">
    <Label for="large-input" class="block mb-2">Quantity</Label>
    <Input
      bind:value={options.quantity}
      id="large-input"
      size="lg"
      required
      type="number"
      class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
    />
</div>

</div>
{/each}
{/if}



     
      <Label for="large-input" class="block mb-2 mt-2">Address</Label>
      <select name="" id="" class="w-full pt-2 rounded-lg h-12  border-gray-300">
        <option value=""></option>
    </select>  
      
  
     
    </div>
    <button
      on:click={() => create(options)}
      class="bg-[#f17f18] font-bold text-white py-3 px-8 rounded-xl"
      type="submit">Add Item</button
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
  