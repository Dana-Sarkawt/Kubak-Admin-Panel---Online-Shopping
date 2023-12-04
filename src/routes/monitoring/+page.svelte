<script lang="ts">
  import type { Order } from "$lib/Models/Entities/Order.Entities.Model.ts";
  import { Appwrite } from "$lib/Appwrite/Appwrite";
  import { Environment } from "$lib/Env/Environment";
  import { darkMode } from "$lib/Stores/Darkmode.Store";
  import { ordersStore } from "$lib/Stores/Orders.Store";
  import { Badge, Img, Spinner } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { OrderStatus } from "$lib/Models/Enums/Order-Status.Enum.Model";
  import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";

  let L: any;
  let map: any;
  let tileLayer: any;
  let items: ItemDto[] = [];
 





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
      Appwrite.appwrite.subscribe(
        `databases.${Environment.appwrite_database}.collections.${Environment.appwrite_collection_order}.documents`,
        (response) => {
          ordersStore.getAll();

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
  });
    


  
  async function loadMap() {
    // @ts-ignore
    L = await import("leaflet");
    if(map){
      map.remove();
    }
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

  function getItemsOrder(id: string) {
    items = [];
    $ordersStore.data.map((order) => {
      if (order.id === id) {
        items = order.items;
      }
    });
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
        <div class="bg-gray-800 w-4 h-4 rounded-full" />
        <div class="bg-[#F02525] w-4 h-4 rounded-full" />
        <div class="bg-[#5570FF] w-4 h-4 rounded-full" />
        <div class="bg-yellow-600 w-4 h-4 rounded-full" />
      </div>

      {#each $ordersStore.data as order}
        <div
          class="bg-[#363636] rounded-lg h-12 flex justify-between px-2 items-center overflow-y-auto hover:bg-gray-500 cursor-pointer duration-300 ease"
          
          on:click={() => getItemsOrder(order.id)}
        >
          <div class="flex justify-center items-center gap-2 overflow-hidden">
            <img
              src={order.user.imgUrl ?? "images/user.png"}
              alt=""
              class="w-8"
            />
            <p
              class="text-white text-sm text-ellipsis overflow-hidden truncate cursor-default"
              title={order.user.name ?? "No Name"}
            >
              {order.user.name ?? "No Name"}
            </p>
          </div>

          <div
            class="h-8 w-20 rounded-lg flex justify-center items-center px-2 text-sm
          {order.status === -1
              ? ' bg-red-600 text-red-200'
              : order.status === 0
                ? 'bg-gray-800 text-white'
                : order.status === 1
                  ? 'bg-blue-600 text-white'
                  : order.status === 2
                    ? 'bg-yellow-600 text-white'
                    : order.status == 3
                      ? 'bg-green-600 text-white'
                      : 'text-gray-400'}
          "
          >
            {OrderStatus[order.status]}
          </div>
        </div>
      {/each}
    </div>

    <div
      class="bg-black w-full h-1/2 rounded-xl p-2 flex justify-start flex-col gap-2 overflow-y-auto"
    >
      {#each items as item}
        <div
          class="bg-[#363636] w-full rounded-lg h-24 flex items-start justify-start gap-2 px-2 py-2"
        >
          <Img
            src={item.itemImage ?? "images/rice.png"}
            alt=""
            class="w-[80px] h-[80px] bg-[#212121] object-contain p-2 rounded-lg"
          />

          <div
            class="flex flex-col text-ellipsis overflow-hidden truncate cursor-default mt-2"
          >
            <p
              class="text-white font-bold text-sm"
              title={item.name ?? "have not Quantity"}
            >
              <b class="text-gray-400 font-medium text-sm"
                >Name:
              </b>{item.name ?? "no name"}
            </p>
            <p class="text-white font-bold text-sm">
              <b class="text-gray-400 font-medium text-sm"
                >Quantity:
              </b>{item.quantity ?? "have not Quantity"}
            </p>
            <p class="text-white font-bold text-sm">
              <b class="text-gray-400 font-medium text-sm"
                >Price:
              </b>{item.price ?? "have not Price"}
            </p>
          </div>
        </div>
      {/each}

      <div
        class="fixed bottom-0 left-0 w-full h-auto flex flex-col gap-2 justify-center bg-black p-2 rounded-lg"
      >
        <div class="flex justify-center items-center">
          <p class="text-white font-bold text-md">
            <b class="text-gray-400 font-medium text-md">Total Price: </b>40 000
          </p>
        </div>

        <div class="flex justify-center gap-2">
          <button
            class="bg-green-500 text-white font-bold w-full h-12 rounded-lg hover:bg-green-600"
            >Accept</button
          >
          <button class="bg-red-600 w-full text-white font-bold rounded-lg hover:bg-red-700"
            >Reject</button
          >
        </div>
      </div>
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
