<script lang="ts">
  import { Environment } from "$lib/Env/Environment";
  import OneSignal from "@nolanx/svelte-onesignal";
  import "../app.postcss";
  import Sidebar from "$lib/Components/Sidebar.Component.svelte";
  import Navbar from "$lib/Components/Navbar.Component.svelte";
  import { page } from "$app/stores";
  import { darkMode } from "$lib/Stores/Darkmode.Store";
  import { onMount } from "svelte";
  import { authStore } from "$lib/Stores/Auth.Store";
  import { goto } from "$app/navigation";

  $: pathUrl = $page.url.pathname;

  // let window: any;
  // let OneSignalDeferred: any = [];

  onMount(async () => {
    // OneSignal.init({
    //   appId: Environment.onesignal_app_id,
    //   allowLocalhostAsSecureOrigin: true,
    // });

    darkMode.subscribe(() => {
      checkDarkMode();
    });
    await authStore.get();
    if ($authStore && $page.url.pathname === "/login") {
      goto("/");
    }

    // sendEmail();
  });

  function sendEmail() {
		fetch('/api/onesignal', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
		})
			.then((res) => {
				if (res.status === 200) {
				} else {
				}
			})
			.catch((err) => {});
	}

  async function checkDarkMode() {
    const htmlTag = document.documentElement;
    const classList = htmlTag.classList;
    classList.contains("dark") ? darkMode.set("dark") : darkMode.set("");
  }
</script>

<main class="bg-slate-100 dark:bg-gray-950 w-full h-full">
  {#if pathUrl !== "/login"}
    <Navbar />
    <div class="w-4/5 h-auto float-right">
      <slot />
    </div>
    <Sidebar />
  {:else}
    <div class="w-full h-auto float-right">
      <slot />
    </div>
  {/if}
</main>
