<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let max = 1;
	export let value = 0;

	function handleClick(idx) {
		if (idx == 0 && value == 1) {
			value = 0;
		} else {
			value = idx + 1;
		}
		dispatch("change", value);
	}
</script>

{#each Array(max) as num, idx}
	<div
		on:click={() => handleClick(idx)}
		class:bg-black={value >= idx + 1}
		class:bg-white={value < idx + 1}
		class:bg-red-300={value == max}
		class="inline-block w-6 h-6 align-middle mx-1 rounded-full border border-black cursor-pointer"
	/>
{/each}
