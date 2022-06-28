<script>
	import Upload from "./components/Upload.svelte";
	import Sheet from "./components/Sheet.svelte";

	let data;

	function handleUpload(event) {
		let file = event.detail[0];
		file.text().then(content => {
			data = JSON.parse(content);
		});
	}
</script>

<main class="h-full">
	{#if !data}
		<!-- si pas de données alors on affiche le composant pour uploader le fichier JSON -->
		<div class="flex justify-center items-center h-full">
			<Upload accept=".json" on:upload={handleUpload} />
		</div>
	{:else}
		<!-- affichage de la fiche de personnage -->
		<Sheet bind:data={data} />
	{/if}
</main>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:root {
		--background-color: #201f20;
		--text-color: #fffaf4;
	}

	html,
	body {
		width: 800px;
		height: 500px;
	}

	main,
	textarea {
		background-color: var(--background-color);
		color: var(--text-color);
	}
</style>
