<script lang="ts">
  import OrderStatusButtons from "$lib/Components/OrderStatusButtons.Component.svelte";
  import { Dto } from "$lib/Models/Conversion/Conversion.Model";
  import { Appwrite } from "$lib/Appwrite/Appwrite";
  import { Environment } from "$lib/Env/Environment";
  import { ordersStore } from "$lib/Stores/Orders.Store";
  import { OrderStatus } from "$lib/Models/Enums/Order-Status.Enum.Model";
  import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
  import { itemsBlockerStore } from "$lib/Stores/ItemsBlocker.Store";
  import type { OrderDto } from "$lib/Models/DTO/Order.DTO.Model";
  import type { Order } from "$lib/Models/Entities/Order.Entities.Model";
  import type { LngLat } from "$lib/Models/Common/LngLat.Common.Model";
  import { routingStore } from "$lib/Stores/Routing.Store";
  import { Img, SpeedDial, SpeedDialButton, Spinner } from "flowbite-svelte";
  import { onMount } from "svelte";
  import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
  import { mapTileLayersStore } from "$lib/Stores/MapTileLayers.Store";

  let L: any;
  let map: any;
  let tileLayer: any;
  let items: ItemDto[] = [];
  let totalAmount: number = 0;
  let markers: any[] = [];
  let order_status: number = -2;
  let orderId: string = "";
  let options: GenericListOptions = {
    status: -2,
  };

  let Loading = false;

  onMount(async () => {
    await loadMap();

    await ordersStore.getAll();

    $ordersStore.data.map((order) => {
      const myIcon = L.icon({
        iconUrl: `images/${OrderStatus[order.status]}.png`,
        iconSize: [38, 38],
      });

      markers.push({
        marker: L.marker([order.address?.latitude, order.address?.longitude], {
          icon: myIcon,
        })
          .addTo(map)
          .on("click", function (e: any) {
            getItemsOrder(order);
          }),
        id: order.id
      });
    });

    Appwrite.appwrite.subscribe(
      `databases.${Environment.appwrite_database}.collections.${Environment.appwrite_collection_order}.documents`,
      async (response) => {
        await ordersStore.getAll();
        const orderDto: OrderDto = Dto.ToOrderDto(
          response.payload as Order
        ) as OrderDto;
        addMarkers(orderDto, options.status);
      }
    );
  });

  async function loadMap() {
    // @ts-ignore
    L = await import("leaflet");

    if (map) {
      map.remove();
    }
    map = L.map("map", {
      fullscreenControl: true,
    }).setView([35.5558, 45.4351], 13);

    tileLayer = createTileLayer();
    tileLayer.addTo(map);
  }

  function createTileLayer() {
    const layerLocal = localStorage.getItem("mapLayer");
    if (layerLocal) {
      mapTileLayersStore.set(layerLocal);
    }
    return L.tileLayer($mapTileLayersStore.url, {
      maxZoom: 16,
      minZoom: 13,
    });
  }

  function addMarkers(newOrder: OrderDto, status?: number) {
    if (!newOrder) return;
    const myIcon = L.icon({
      iconUrl: `images/${OrderStatus[newOrder.status]}.png` ?? "",
      iconSize: [38, 38],
    });
    markers.forEach((marker) => {
      if (marker.id == newOrder.id) {
        map.removeLayer(marker.marker);
        markers.splice(markers.indexOf(marker), 1);
      }
    });
    if (status === -2 || newOrder.status === status) {
      markers.push({
        marker: L.marker(
          [newOrder.address?.latitude, newOrder.address?.longitude],
          { icon: myIcon }
        )
          .addTo(map)
          .on("click", function (e: any) {
            getItemsOrder(newOrder);
          }),
        id: newOrder.id,
      });
    }
  }

  function resetZoom() {
    map.setView([35.5558, 45.4351], 13);
  }

  async function getItemsOrder(order: OrderDto) {
    Loading = true;
    order_status = order.status;
    orderId = order.id;

    // TODO: uncomment this when the routing is done
    // let mapData: LngLat[] = Array.isArray($routingStore[0].route)
    //   ? $routingStore[0].route.map((route: LngLat) => {
    //       return route as LngLat;
    //     })
    //   : [];

    // L.polyline(mapData, { color: "#f17f18" }).addTo(map);

    map.setView([order.address?.latitude, order.address?.longitude], 16);
    try {
      const itemsBlocker = await itemsBlockerStore.getAll(order.id);
      items =
        itemsBlocker?.map((item) => {
          return {
            ...item.items,
            quantity: item.quantity,
          } as ItemDto;
        }) ?? [];
      totalAmount = items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      sendNotification(
        order.user!.id,
        order.user!.name ?? "No Name",
        order.status,
        order.user!.fcmToken ?? ""
      );
    } finally {
      Loading = false;
    }
  }

  function sendNotification(
    userId: string,
    name: string,
    status: number,
    fcmToken: string
  ) {
    fetch("/api/firebase/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        name: name,
        status: OrderStatus[status],
        fcmToken: fcmToken,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
        } else {
        }
      })
      .catch((err) => {});
  }

  async function filter(status: number) {
    if (status == options.status) {
      options.status = -2;
      await ordersStore.getAll(options);
      $ordersStore.data.map((order) => {
        addMarkers(order, options.status);
      });
      return;
    }
    options.status = status;
    await ordersStore.getAll(options);
  }

  function changeLayer(layer: string) {
    if ($mapTileLayersStore.name === layer) return;
    // save the state name of the layer in local storage
    localStorage.setItem("mapLayer", layer);
    map.removeLayer(tileLayer);
    mapTileLayersStore.set(layer);
    tileLayer = createTileLayer();
    tileLayer.addTo(map);
  }

  $: {
    if ($ordersStore.data.length > 0) {
      if (options.status != -2) {
        $ordersStore.data.map((order) => {
          addMarkers(order, options.status);
        });
      }
    }
  }
</script>

<div class="w-full flex justify-end">
  <div
    class="w-60 h-[90vh] rounded-xl my-5 mr-3 flex-col gap-2 opacity-80 absolute flex justify-center items-center z-[5000]"
    id="request-box"
  >
    <div class="w-full h-auto flex gap-2">
      <button
        class="w-16 h-12 bg-gray-500 flex rounded-lg items-center justify-center"
        on:click={resetZoom}
      >
        <img src="/images/reset-map.png" alt="" class="w-7 h-7 object-cover" />
      </button>
      <a href="/monitoring/order" class="w-full">
        <div
          class="w-full h-12 bg-[#f17f18] hover:bg-[#212121] duration-300 ease flex justify-center items-center text-2xl text-white rounded-lg"
        >
          +
        </div>
      </a>
    </div>

    <div class="bg-black w-full h-1/2 rounded-xl flex flex-col gap-2 px-2">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="bg-[#363636] w-full h-12 rounded-xl flex gap-3 mt-2 justify-center items-center"
      >
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="{options.status == OrderStatus.Delivered
            ? 'bg-green-700 border-2 border-[#fff]'
            : 'bg-[#009860]'} w-4 h-4 rounded-full cursor-pointer hover:bg-green-700"
          on:click={() => filter(OrderStatus.Delivered)}
        />
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="{options.status == OrderStatus.Pending
            ? 'bg-gray-500  border-2 border-[#fff]'
            : 'bg-gray-400'} bg-gray-400 w-4 h-4 rounded-full cursor-pointer hover:bg-gray-500"
          on:click={() => filter(OrderStatus.Pending)}
        />
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="{options.status == OrderStatus.Failed
            ? 'bg-red-800  border-2 border-[#fff]'
            : 'bg-[#F02525]'} bg-[#F02525] w-4 h-4 rounded-full cursor-pointer hover:bg-red-800"
          on:click={() => filter(OrderStatus.Failed)}
        />
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="{options.status == OrderStatus.Accepted
            ? 'bg-blue-800  border-2 border-[#fff]'
            : 'bg-[#5570FF]'} bg-[#5570FF] w-4 h-4 rounded-full cursor-pointer hover:bg-blue-800"
          on:click={() => filter(OrderStatus.Accepted)}
        />
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="{options.status == OrderStatus.Delivering
            ? 'bg-yellow-800  border-2 border-[#fff]'
            : 'bg-yellow-600'} bg-yellow-600 w-4 h-4 rounded-full cursor-pointer hover:bg-yellow-800"
          on:click={() => filter(OrderStatus.Delivering)}
        />
      </div>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->

      {#each $ordersStore.data as order}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="bg-[#363636] rounded-lg h-12 flex justify-between px-2 items-center overflow-y-auto hover:bg-gray-500 cursor-pointer duration-300 ease"
          on:click={() => getItemsOrder(order)}
        >
          <div class="flex justify-center items-center gap-2 overflow-hidden">
            <img
              src={order.user?.imgUrl ?? "images/user.png"}
              alt=""
              class="w-8"
            />
            <p
              class="text-white text-sm text-ellipsis overflow-hidden truncate cursor-default"
              title={order.user?.name ?? "No Name"}
            >
              {order.user?.name ?? "No Name"}
            </p>
          </div>

          <div
            class="h-8 w-20 rounded-lg flex justify-center items-center px-2 text-sm
          {order.status === -1
              ? ' bg-red-600 text-red-200'
              : order.status === 0
                ? 'bg-gray-400 text-white'
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
      {#if Loading}
        <div class="w-full h-auto flex justify-center mt-12">
          <Spinner />
        </div>
      {:else}
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
      {/if}

      <div
        class="fixed bottom-0 left-0 w-full h-auto flex flex-col gap-2 justify-center bg-black p-2 rounded-lg"
      >
        <div class="flex justify-center items-center">
          <p class="text-white font-bold text-md">
            <b class="text-gray-400 font-medium text-md"
              >Total Price:
            </b>{totalAmount ?? "0"} IQD
          </p>
        </div>
        <OrderStatusButtons {order_status} {orderId} />
      </div>
    </div>
  </div>
</div>

{#if typeof window !== "undefined"}
  <div
    id="map"
    class="w-full h-[93.2vh] relative flex justify-start items-center"
  >
    <SpeedDial
      tooltip="right"
      pill={false}
      class="absolute start-2 top-2 right bottom  mx-12 my-[0.35rem] z-[410] w-14 h-14"
    >
      <SpeedDialButton
        name="Dark"
        on:click={() => changeLayer(Environment.mapbox_style_dark)}
      >
        <img
          src="images/{Environment.mapbox_style_dark}.png"
          alt=""
          class="{$mapTileLayersStore.name === Environment.mapbox_style_dark
            ? 'border-2 border-orange-400'
            : 'border'} rounded-md"
        />
      </SpeedDialButton>
      <SpeedDialButton
        name="Satellite"
        on:click={() => changeLayer(Environment.mapbox_style_satellite_streets)}
      >
        <img
          src="images/{Environment.mapbox_style_satellite_streets}.png"
          alt=""
          class="{$mapTileLayersStore.name ===
          Environment.mapbox_style_satellite_streets
            ? 'border-2 border-orange-400'
            : 'border'} rounded-md"
        />
      </SpeedDialButton>
      <SpeedDialButton
        name="Streets"
        on:click={() => changeLayer(Environment.mapbox_style_streets)}
      >
        <img
          src="images/{Environment.mapbox_style_streets}.png"
          alt=""
          class="{$mapTileLayersStore.name === Environment.mapbox_style_streets
            ? 'border-2 border-orange-400'
            : 'border'} rounded-md"
        />
      </SpeedDialButton>
    </SpeedDial>
  </div>
{/if}

<style>
  #request-box {
    backdrop-filter: blur(5px);
  }
</style>
