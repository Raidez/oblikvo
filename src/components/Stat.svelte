<script>
	export let label;
	export let value;
	export let malus = 0;

	const clipboard = nw.Clipboard.get();

	let was_clicked = false;

	// met dans le presse-papier la commande /roll
	function roll(dices, faces) {
		was_clicked = true;

		let condition = value;
		if (malus > 0) condition = value - malus;
		if (condition < 0) condition = 0;

		let content = `/roll ${dices}d${faces}<${condition} ${label}`;
		clipboard.set(content);
	}

	// affichage pour illustrer le clique
	$: if (was_clicked) {
		setTimeout(() => {
			was_clicked = false;
		}, 500);
	}
</script>

<div
	on:click={() => roll(1, 100)}
	class="border-2 rounded text-center w-28 mx-auto my-2 cursor-pointer transition-all duration-500 {was_clicked
		? 'border-red-300 hover:border-red-300'
		: 'border-gray-700 hover:border-blue-300'}"
>
	<p>{label}</p>
	<p>{value}</p>
</div>
