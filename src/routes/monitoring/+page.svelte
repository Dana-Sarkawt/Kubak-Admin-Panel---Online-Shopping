<script lang="ts">
  import type { Order } from "$lib/Models/Entities/Order.Entities.Model.ts";
  import { Appwrite } from "$lib/Appwrite/Appwrite";
  import { Environment } from "$lib/Env/Environment";
  import { darkMode } from "$lib/Stores/Darkmode.Store";
  import { ordersStore } from "$lib/Stores/Orders.Store";
  import { Badge } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { OrderStatus } from "$lib/Models/Enums/Order-Status.Enum.Model";

  let L: any;
  let map: any;
  let tileLayer: any;

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

    <div class="bg-black w-full h-1/2 rounded-xl" />
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
