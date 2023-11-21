<script lang="ts">
  import { darkMode } from "$lib/Stores/Darkmode.Store";
 import { onMount, afterUpdate } from "svelte";

 let map: any;

 onMount(() => {
   // Check if dark mode preference is stored in localStorage
   const storedDarkMode = localStorage.getItem("darkMode");

   // Set the darkMode store value based on localStorage or system preference
   darkMode.set(storedDarkMode || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

   // Load the map initially
   loadMap();

   const link = document.createElement("link");
   link.rel = "stylesheet";
   link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
   link.onload = () => loadMap();

   document.head.appendChild(link);

   return () => {
     map.remove();
     link.parentNode!.removeChild(link);
   };
 });

 afterUpdate(() => {
   // Reload the map when darkMode changes
   loadMap();
 });

 async function loadMap() {
   const L = await import("leaflet");

   // If the map is already initialized, remove it
   if (map) {
     map.remove();
   }

   map = L.map("map").setView([35.5558, 45.4351], 13);

   L.tileLayer(
     `https://tiles.stadiamaps.com/tiles/alidade_smooth${
       $darkMode == "dark" ? "" : "_dark"
     }/{z}/{x}/{y}{r}.png`,
     {
       attribution:
         '&copy; <a href="&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
       maxZoom: 25,
     }
   ).addTo(map);
 }
</script>

<div class="w-full flex justify-end">
 <div
   class="w-60 h-[90vh] rounded-xl my-5 mr-3 flex-col gap-2 opacity-80 absolute flex justify-center items-center z-[5000]"
   id="request-box"
 >
   <div class="bg-black w-full h-1/2 rounded-xl flex">
     <div
       class="bg-gray-700 w-full h-12 rounded-xl flex gap-3 mt-2 mx-2 justify-center items-center"
     >
       <div class="bg-[#009860] w-4 h-4 rounded-full" />
       <div class="bg-white w-4 h-4 rounded-full" />
       <div class="bg-[#F02525] w-4 h-4 rounded-full" />
       <div class="bg-[#5570FF] w-4 h-4 rounded-full" />
       <div class="bg-[#FFC01F] w-4 h-4 rounded-full" />
     </div>
   </div>
   <div class="bg-black w-full h-1/2 rounded-xl" />
 </div>
</div>

<div id="map" class="w-full h-[93.2vh]" />

<style>
 #request-box {
   backdrop-filter: blur(5px);
 }
</style>