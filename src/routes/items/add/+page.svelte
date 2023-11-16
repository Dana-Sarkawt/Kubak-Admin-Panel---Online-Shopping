<script>
// @ts-nocheck

    import { Label, Input } from 'flowbite-svelte';


</script>
  
<div class="container mx-auto h-auto">
  <a href="/items">

    <button class="bg-white px-5 py-3 rounded-xl m-3 text-[#f17f18] font-bold">Back</button>
  </a>
</div>

  <div class="container mx-auto max-w-2xl  flex justify-center items-center flex-col gap-3 mt-32 py-12 rounded-xl  bg-white ">
  
      
      <img src="/images/rice.png" alt="" class="w-44 h-44 bg-cover p-5 rounded-xl flex bg-[#B0AFAF]">
      
   

    <input type="file" id="uploadBtn">
      <label for="uploadBtn">Add Image</label>


      <div class="mb-6 w-4/5 flex justify-center items-start flex-col">
        <Label for="large-input" class="block mb-2">Name</Label>
      <Input id="large-input" size="lg" placeholder="Add item" class="w-full rounded-xl" />

<div class="w-full grid grid-cols-2 items-center justify-center gap-2 my-3">

    <div class="w-full flex flex-col">

        <Label for="large-input" class="block mb-2">Category</Label>
        <select name="category" id="" class="rounded-xl border-gray-400 h-12">
          <option value="Crop">Crop</option>
        </select>
    </div>

<div class="w-full flex flex-col">

    <Label for="large-input" class="block mb-2">Price</Label>
  <Input id="large-input" size="lg" type="number"  class="w-full rounded-xl" />
</div>







</div>
      <Label for="large-input" class="block mb-2">Detail</Label>
     <textarea name="" id="" cols="67" rows="10" class="rounded-xl border-gray-400"></textarea>

    </div>
    <button class="bg-[#f17f18] font-bold text-white py-3 px-8 rounded-xl" type="submit">Add Item</button>
   
  </div>

  


  <style>
  input[type="file"] {
    display: none;
  }

  
  label{
    display: inline-block;
    color: #f17f18;
    background-color: #F5F5F5;
    text-align: center;
    padding: 5px;
    border-radius: 8px;
    cursor: pointer;
  }
  </style>