<script lang="ts">
  import type { Order } from "$lib/Models/Entities/Order.Entities.Model.ts";
  import { Appwrite } from "$lib/Appwrite/Appwrite";
  import { Environment } from "$lib/Env/Environment";
  import { darkMode } from "$lib/Stores/Darkmode.Store";
  import { ordersStore } from "$lib/Stores/Orders.Store";
  import { Badge, Img } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { OrderStatus } from "$lib/Models/Enums/Order-Status.Enum.Model";
  import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";

  let L: any;
  let map: any;
  let tileLayer: any;
  let items:ItemDto[] = [];

  onMount(async () => {
    await loadMap();
    await ordersStore.getAll();
    darkMode.subscribe((value) => {
      if (map) {
        map.removeLayer(tileLayer);
        tileLayer = createTileLayer(value);
        tileLayer.addTo(map);
      }

      $ordersStore.data.map((order) => {
        let marker = L.marker([
          order.address?.latitude,
          order.address?.longitude,
        ]);
        marker.addTo(map);
      });

      items = $ordersStore.data[0].items;

      Appwrite.appwrite.subscribe(
        `databases.${Environment.appwrite_database}.collections.${Environment.appwrite_collection_order}.documents`,
        (response) => {
          ordersStore.getAll();
          // $ordersStore.data.map((order) => {
          //   let marker = L.marker([
          //     order.address?.latitude,
          //     order.address?.longitude,
          //   ]);
          //   marker.addTo(map);
          // });

          const payload: Order = response.payload as Order;

          let marker = L.marker([
            payload.address.latitude,
            payload.address.longitude,
          ]);
          marker.addTo(map);
          console.log("Response: ", response.payload);
        }
      );
    });

    // console.log("Orders: ", $ordersStore);
  });

  async function loadMap() {
    // @ts-ignore
    L = await import("leaflet");

    map = L.map("map", {
      fullscreenControl: true,
    }).setView([35.5558, 45.4351], 13);

    tileLayer = createTileLayer($darkMode);
    tileLayer.addTo(map);
  }

  function createTileLayer(darkMode: string) {
    return L.tileLayer(
      `https://tiles.stadiamaps.com/tiles/alidade_smooth${
        darkMode == "dark" ? "_dark" : ""
      }/{z}/{x}/{y}{r}.png`,
      {
        maxZoom: 25,
        attribution:
          '© <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> © <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
  }
</script>

<div class="w-full flex justify-end">
  <div
    class="w-60 h-[90vh] rounded-xl my-5 mr-3 flex-col gap-2 opacity-80 absolute flex justify-center items-center z-[5000]"
    id="request-box"
  >
    <div class="w-full h-auto fle">
      <a href="/monitoring/order">
        <div
          class="w-full h-12 bg-[#f17f18] hover:bg-[#212121] duration-300 ease flex justify-center items-center text-2xl text-white rounded-lg"
        >
          +
        </div>
      </a>
    </div>

    <div class="bg-black w-full h-1/2 rounded-xl flex flex-col gap-2 px-2">
      <div
        class="bg-[#363636] w-full h-12 rounded-xl flex gap-3 mt-2 justify-center items-center"
      >
        <div class="bg-[#009860] w-4 h-4 rounded-full" />
        <div class="bg-white w-4 h-4 rounded-full" />
        <div class="bg-[#F02525] w-4 h-4 rounded-full" />
        <div class="bg-[#5570FF] w-4 h-4 rounded-full" />
        <div class="bg-[#FFC01F] w-4 h-4 rounded-full" />
      </div>

      {#each $ordersStore.data as order}
        <div
          class="bg-[#363636] rounded-lg h-12 flex justify-between px-2 items-center overflow-y-auto"
        >
          <div class="flex justify-center items-center gap-2 overflow-hidden">
            <img src="images/user.png" alt="" class="w-8" />
            <p
              class="text-white text-sm text-ellipsis overflow-hidden truncate cursor-default"
              title="muhammed salah"
            >
              muhammed salah
            </p>
          </div>
          <Badge large class="bg-blue-600 text-white text-xs"
            >{OrderStatus[order.status]}</Badge
          >
        </div>
      {/each}
    </div>
    











    <div class="bg-black w-full h-1/2 rounded-xl p-2 flex justify-between flex-col gap-2 overflow-y-auto">
      <div class="bg-[#363636] w-full rounded-lg h-24 flex items-center justify-start gap-2 px-2 py-2">
        <Img src="images/rice.png" alt="" class="w-16 bg-[#212121] object-cover p-2 rounded-lg"/>

      <div>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Name: </b>Rice</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Quantity: </b>5</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Price: </b>40 000</p>

      </div>
         
      
      </div>











      <div class="bg-[#363636] w-full rounded-lg h-24 flex items-center justify-start gap-2 px-2">
        <Img src="images/rice.png" alt="" class="w-16 bg-[#212121] object-cover p-2 rounded-lg"/>

      <div>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Name: </b>Rice</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Quantity: </b>5</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Price: </b>40 000</p>

      </div>
         
      
      </div>












      <div class="bg-[#363636] w-full rounded-lg h-24 flex items-center justify-start gap-2 px-2">
        <Img src="images/rice.png" alt="" class="w-16 bg-[#212121] object-cover p-2 rounded-lg"/>

      <div>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Name: </b>Rice</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Quantity: </b>5</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Price: </b>40 000</p>

      </div>
         
      
      </div>














      <div class="bg-[#363636] w-full rounded-lg h-24 flex items-center justify-start gap-2 px-2">
        <Img src="images/rice.png" alt="" class="w-16 bg-[#212121] object-cover p-2 rounded-lg"/>

      <div>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Name: </b>Rice</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Quantity: </b>5</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Price: </b>40 000</p>

      </div>
         
      
      </div>












      <div class="bg-[#363636] w-full rounded-lg h-24 flex items-center justify-start gap-2 px-2">
        <Img src="images/rice.png" alt="" class="w-16 bg-[#212121] object-cover p-2 rounded-lg"/>

      <div>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Name: </b>Rice</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Quantity: </b>5</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Price: </b>40 000</p>

      </div>
         
      
      </div>








      <div class="bg-[#363636] w-full rounded-lg h-24 flex items-center justify-start gap-2 px-2">
        <Img src="images/rice.png" alt="" class="w-16 bg-[#212121] object-cover p-2 rounded-lg"/>

      <div>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Name: </b>Rice</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Quantity: </b>5</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Price: </b>40 000</p>

      </div>
         
      
      </div>























      
      <div class="bg-[#363636] w-full rounded-lg h-24 flex items-center justify-start gap-2 px-2">
        <Img src="images/rice.png" alt="" class="w-16 bg-[#212121] object-cover p-2 rounded-lg"/>

      <div>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Name: </b>Rice</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Quantity: </b>5</p>
        <p class="text-white font-bold text-sm"><b class="text-gray-400 font-medium text-sm">Price: </b>40 000</p>

      </div>
         
      
      </div>




        




      <div class="fixed bottom-0 left-0 w-full h-auto flex flex-col gap-2 justify-center bg-black p-2 rounded-lg">

        <div class="flex justify-center items-center">

          <p class="text-white font-bold text-md"><b class="text-gray-400 font-medium text-md">Total Price: </b>40 000</p>
        </div>


        <div class="flex justify-center gap-2">

          <button class="bg-green-500  text-white font-bold w-full h-12 rounded-lg">Accept</button>
          <button class="bg-red-600   w-full text-white font-bold rounded-lg">Reject</button>
        </div>


      </div>
<<<<<<< HEAD
=======
      {/each}

      <div class="relative w-full h-auto flex flex-row gap-2 ">

        <button class="bg-green-500 text-white font-bold w-full h-12 rounded-lg">Accept</button>
        <button class="bg-red-600 w-full text-white font-bold rounded-lg">Reject</button>
      </div>

     
>>>>>>> 72e46daa102139aa40bd33caf72b6fef5e8b01d4
    </div>

        
      </div>


   

</div>

{#if typeof window !== "undefined"}
  <div id="map" class="w-full h-[93.2vh]" />
{/if}

<style>
  #request-box {
    backdrop-filter: blur(5px);
  }
</style>
