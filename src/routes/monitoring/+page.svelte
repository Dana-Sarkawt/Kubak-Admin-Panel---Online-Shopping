<script lang="ts">
    import { onMount } from 'svelte';

    let map:any;

    onMount(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css';
        link.onload = () => loadMap();

        document.head.appendChild(link);

        return () => {
            map.remove();
            link.parentNode!.removeChild(link);
        };
    });

    async function loadMap() {
        const L = await import('leaflet');
        map = L.map('map').setView([35.5558, 45.4351], 13);

        
        L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ', {
            attribution:
                '&copy; <a href="&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 25,
        }).addTo(map);
    }
</script>



<div id="map" class="w-full h-[93.2vh]"/>