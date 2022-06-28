<script>
	import Upload from "./components/Upload.svelte";
	import Sheet from "./components/Sheet.svelte";
	const path = require('path');
	const fs = require('fs');

	let data, filepath;

	function handleUpload(event) {
		let file = event.detail[0];
		filepath = file.path;
		file.text().then(content => {
			data = JSON.parse(content);
			extractAvatar();
		});
		localStorage.setItem("filepath", file.path);
	}

	// on vérifie si on a pas déjà charger un fichier précédemment
	let previous_filepath = localStorage.getItem("filepath");
	if (
		previous_filepath &&
		confirm(`Voulez-vous réutiliser le fichier '${previous_filepath}' ?`)
	) {
		fetch(previous_filepath)
			.then(res => res.json())
			.then(content => {
				data = content;
				extractAvatar();
			});
		filepath = previous_filepath;
	}

	/**
	 * récupération de l'url local de l'avatar
	 */
	function extractAvatar() {
		if (data.avatar) {
			fetch(data.avatar).catch(error => {
				let folder = path.parse(filepath).dir;
				let avatar = path.join(folder, data.avatar);
				data.avatar = avatar;
				console.log(data.avatar);
			});
		}
	}

	// sauvegarde des modifications
	$: if (data) {
		let content = {...data};
		content.avatar = path.parse(content.avatar).base;
		fs.writeFileSync(filepath, JSON.stringify(content, null, 4));
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
