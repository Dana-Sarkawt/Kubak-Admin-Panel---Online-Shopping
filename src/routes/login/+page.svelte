<script>
	//@ts-ignore
	import SvelteOtp from '@k4ung/svelte-otp';
	import { onMount } from 'svelte';
	import { Avatar } from 'flowbite-svelte';
	import { Button, Modal } from 'flowbite-svelte';
	let defaultModal = false;

	onMount(async () => {
		particlesJS.load('particles-js', '/assets/particles.json');
	});

	let userInput = '';

	$: buttonActive = userInput && userInput.length >= 11;
</script>

<div
	class="flex flex-col  w-full bg-[#e4e4e4] h-screen justify-center items-center"
	id="particles-js"
>
	<div
		class="container mx-auto absolute  md:w-4/6 lg:w-6/12 2xl:w-2/12  gap-3 h-[520px] shadow-2xl py-10 px-5 rounded-xl flex flex-col justify-center items-center bg-gradient-to-r from-[#ffffff81] to-[#bbbbbb60] backdrop-blur-md"
	>
		<Avatar src="/images/kubak.jpg" class="w-[180px] h-[180px] mb-11" />
		<div class="  flex justify-center items-center">
			<!-- svelte-ignore missing-declaration -->
		</div>
		<br
			class=" flex justify-center items-center w-full md:w-4/5 max-w-2xl my-11 rounded-lg px-3 py-5"
		/>
		<div class="flex justify-center items-center w-full h-12 rounded-md gap-px">
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
			on:click={() => (defaultModal = true)}
			id="submit-btn"
			class="w-full">Send</button
		>
	</div>
</div>

<Modal title="verification Your Phone Number" bind:open={defaultModal} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center">phone number</p>
	<div class="w-full flex justify-center">
		<SvelteOtp
			numberOnly
			inputClass="rounded-md bg-gray-200 "
			separatorClass=" text-xl font-bold "
			separator="-"
			inputStyle="width:35px; height:35px; border:2px solid #f17f18; color:#000;"
			wrapperClass="flex justify-center"
			numberOfInputs={6}
		/>
	</div>

	<svelte:fragment slot="footer">
		<div class="w-full flex justify-center">
			<button
				type="submit"
				id="submit-btn"
				class="w-4/6 flex justify-center items-center text-center">Verify</button
			>
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
		background-image: radial-gradient(
				93% 87% at 87% 89%,
				rgba(0, 0, 0, 0.23) 0%,
				transparent 86.18%
			),
			radial-gradient(
				66% 66% at 26% 20%,
				rgba(255, 255, 255, 0.55) 0%,
				rgba(255, 255, 255, 0) 69.79%,
				rgba(255, 255, 255, 0) 100%
			);
		box-shadow: inset -3px -3px 9px rgba(198, 147, 9, 0.25), inset 0px 3px 9px rgb(216, 138, 4),
			inset 0px 1px 1px rgba(255, 255, 255, 0.6), inset 0px -8px 36px rgba(0, 0, 0, 0.3),
			inset 0px 1px 5px rgba(255, 255, 255, 0.6), 2px 19px 31px rgba(0, 0, 0, 0.2);
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
		box-shadow: inset -3px -3px 9px rgba(198, 147, 9, 0.25), inset 0px 3px 9px rgb(255, 255, 255),
			inset 0px 1px 1px rgba(255, 255, 255, 0.6), inset 0px -8px 36px rgba(0, 0, 0, 0.3),
			inset 0px 1px 5px rgba(255, 255, 255, 0.6), 2px 19px 31px rgba(0, 0, 0, 0.2);
		color: #f17f18;
		transition: 0.3s ease-out;
		box-shadow: 0 0 12px #000000;
	}
</style>