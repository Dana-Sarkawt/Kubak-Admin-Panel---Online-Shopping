<script lang="ts">
  import type { Gender } from "$lib/Models/Enums/Gender.Enum.Model";
    import type { CreateAuthRequest } from "$lib/Models/Requests/CreateAuth.Request";
    import { authStore } from "$lib/Stores/Auth.Store";
    import { categoryStore } from "$lib/Stores/Categories.Store";
    import { itemStore } from "$lib/Stores/Items.Store";
    import { Label, Input } from "flowbite-svelte";
    import { MultiSelect } from "flowbite-svelte";
    import { onMount } from "svelte";
   
    let options: CreateAuthRequest = {
        id: "", 
        name: "",
        prefs:{
            birthday: new Date(),
            gender:0,
            image:{
                url: "",
                localUrl: "",
            }
        }
    };
 
 onMount(async () => {
    await authStore.get();
    options = {
        id: $authStore!.id, 
        name: $authStore!.name,
        prefs:{
            birthday: $authStore?.birthday as Date,
            gender:$authStore?.gender as Gender,
            image:{
                url: "",
                localUrl: $authStore!.imgUrl,
            }
        }
    }

    console.log(options);
    
  });


    function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    options.prefs!.image.url = file;
    options.prefs!.image.localUrl = URL.createObjectURL(file);
  }

  async function update(options: CreateAuthRequest) {
    options.id = $authStore?.id ?? "";
    console.log(options);
    await authStore.update(options);
  }
    
  </script>

  
  <div
    class="container mx-auto max-w-2xl flex justify-center items-center flex-col gap-3 mt-44 py-12 rounded-xl bg-white dark:bg-[#212121]"
  >
  <div class="w-60 h-60 bg-[#e9e9e9] dark:bg-[#363636] flex justify-center items-center rounded-lg">
  
    <img
    src={options.prefs?.image.localUrl}
      alt=""
      class="object-cover w-44 h-44 object-center p-1 rounded-xl flex"
    />
  </div>
  
    <input type="file" id="uploadBtn" on:change={handleFileChange} accept=".jpg, .jpeg, .png"/>
    <label for="uploadBtn" class=" bg-[#f0f0f0] dark:bg-[#363636]"
      >Add Image</label
    >
  
    <div class="mb-6 w-4/5 flex justify-center items-start flex-col">
      <Label for="large-input" class="block mb-2">Name</Label>
      <Input
      bind:value={options.name}
        id="large-input"
        size="lg"
        required
        placeholder="Add item"
        class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
      />
  
      <div class="w-full flex flex-col mt-2">
        <Label for="large-input" class="block mb-2">Gender</Label>
      <select name="" id="" class="rounded-lg dark:bg-[#363636] dark:text-white border-gray-300 dark:border-gray-500"> 
        
        <option value="Male">Male</option>
        <option value="Female">Female</option>
 
      </select>
      </div>
      <div class="w-full flex items-center justify-center gap-2 my-3">
  
        <div class="w-full flex flex-col">
          <Label for="large-input" class="block mb-2">Birthday</Label>
          <Input
            id="large-input"
            size="lg"
            required
            type="date"
            class="w-full rounded-xl dark:bg-[#363636] dark:text-white"
          />
        </div>
  
     
      </div>
  
    
    </div>
    <button
    on:click={() => update(options)}
      class="bg-[#f17f18] font-bold text-white py-3 px-8 rounded-xl"
      type="submit">Profile Update</button
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
  