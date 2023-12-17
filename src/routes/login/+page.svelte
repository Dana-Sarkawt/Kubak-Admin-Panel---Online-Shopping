<script lang="ts">
  //@ts-ignore
  import SvelteOtp from "@k4ung/svelte-otp";
  import { onMount } from "svelte";
  import { Avatar } from "flowbite-svelte";
  import { Button, Modal } from "flowbite-svelte";
  import { phone as PhoneVerify } from "phone";
  import { authStore } from "$lib/Stores/Auth.Store";

  let userId: string;
  let defaultModal: boolean = false;
  let errorMassege: string;
  onMount(async () => {
    particlesJS.load("particles-js", "/assets/particles.json");
  });
  let secret = "";
  let userInput = "";

  $: buttonActive = userInput && userInput.length >= 11;
  $: otpActive = secret && secret.length >= 6;

  async function signIn(phone: string) {
    const verifyPhone = PhoneVerify(phone, { country: "IQ" });
    if (!verifyPhone.isValid) {
      errorMassege = "Error phone number is not valid phone number";
      return;
    }
    userId = (await authStore.signIn(
      verifyPhone.phoneNumber as string
    )) as string;
    defaultModal = true;
  }

  async function otpVerify(id: string, secret: string) {
    await authStore.secret(id, secret);
  }
</script>

<div
  class="flex flex-col w-full bg-[#e4e4e4] h-screen justify-center items-center"
  id="particles-js"
>
  <div
    class="container mx-auto absolute max-w-lg gap-3 h-[520px] shadow-2xl py-10 px-5 rounded-xl flex flex-col justify-center items-center bg-gradient-to-r from-[#ffffff81] to-[#bbbbbb60] backdrop-blur-md"
  >
    <Avatar src="/images/kubak.jpg" class="w-[180px] h-[180px] mb-11" />
    <div class="  flex justify-center items-center">
      <!-- svelte-ignore missing-declaration -->
    </div>
    <br
      class=" flex justify-center items-center w-full md:w-4/5 max-w-2xl my-11 rounded-lg px-3 py-5"
    />
    <div class="flex justify-center items-center w-full h-12 rounded-md gap-2">
      <div
        class="w-[60px] md:w-[90px] flex justify-center items-center gap-2 bg-white rounded-md h-[50px] md:h-[55px]"
      >
        <img src="/images/iraq.png" alt="" class="w-4 md:w-8" />
      </div>
      <input
        type="tel"
        placeholder="Phone Number"
        class="py-3 rounded-md w-full text-center text-md md:text-lg tracking-[.15em]"
        oninput="this.value = this.value.replace(/[^0-9]/g, '')"
        onKeyPress="if(this.value.length==11) return false;"
        required
        bind:value={userInput}
      />
    </div>

    <button
      type="submit"
      disabled={!buttonActive}
      id="submit-btn"
      class="w-full"
      on:click={() => {
        signIn(userInput);
      }}
      >Send
    </button>
  </div>
</div>

<Modal title="Verify Your Phone Number" bind:open={defaultModal} autoclose>
  <p
    class="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center"
  >
    OTP Number
  </p>
  <div class="w-full flex justify-center">
    <SvelteOtp
      numberOnly
      inputClass="rounded-md bg-gray-200 "
      separatorClass=" text-xl font-bold text-black rounded-full"
      separator="-"
      inputStyle="width:35px; height:35px; border:2px solid #f17f18; color:#000;"
      wrapperClass="flex justify-center"
      numberOfInputs={6}
      bind:value={secret}
    />
  </div>

  <svelte:fragment slot="footer">
    <div class="w-full flex justify-center">
      <button
        type="submit"
        id="submit-btn"
        class=" w-4/6 flex justify-center items-center text-center"
        disabled={!otpActive}
        on:click={() => {
          otpVerify(userId, secret);
        }}
        >Verify
      </button>
    </div>
  </svelte:fragment>
</Modal>

<style>
  ::placeholder {
    text-align: center;

    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0;
  }

  @media (max-width: 768px) {
    ::placeholder {
      font-size: 10px;
    }
  }

  input:focus {
    outline: none !important;
    border: 2px solid #f17f18;
  }

  button {
    color: #fff;
    padding: 15px 25px;
    background-color: #f17f18;
    background-image: #f17f18;

    border-radius: 14px;
    font-weight: bold;

    transition: 0.3s ease-out;
    border: 0;

    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    cursor: pointer;
  }

  button:hover {
    background-color: #fff;

    color: #f17f18;
    transition: 0.3s ease-out;
  }

  button:disabled {
    color: #fff;
    background-color: #636363;
    background-image: #636363;
    cursor: pointer;
  }

  #submit-btn:disabled {
    color: #fff;
    background-color: #636363;
    background-image: #636363;
    cursor: pointer;
  }
</style>
