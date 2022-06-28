<script>
	import Progress from "./Progress.svelte";
	import Stat from "./Stat.svelte";

	const default_avatar = "img/avatar.png";

	export let data = {
		avatar: default_avatar,
		name: "",
		job: "",
		persona: "",
		trauma: 0,
		stats: {
			strength: 0,
			agility: 0,
			firearm: 0,
			melee: 0,
			insight: 0,
			stress: 0,
		},
		daylog: "",
		malus: 0
	};
	$: data.malus = data.trauma * 5;

	fetch(data.avatar).catch(error => {
		data.avatar = default_avatar;
		console.log(data.avatar);
	});
</script>

<main class="h-screen">
	<section id="info" class="flex justify-between">
		<div class="flex">
			<figure class="p-2">
				<img
					src={data.avatar}
					alt="avatar"
					class="object-cover h-24 w-24 rounded-full border-2 border-gray-200"
				/>
			</figure>
			<div class="p-4">
				<p>{data.name}</p>
				<p class="text-red-500">{data.job}</p>
				<p class="text-blue-400">{data.persona}</p>
			</div>
		</div>

		<div class="p-4">
			<div>
				<label for="trauma"> Trauma </label>
				<Progress max={6} bind:value={data.trauma} />
			</div>

			<div
				class:text-red-600={data.malus > 0}
				class="grid"
				style="grid-template-columns: 55px 152px 50px"
			>
				<label for="malus"> Malus </label>
				<p class="px-2">{data.malus}%</p>
				<img
					src="img/skull.png"
					alt="skull"
					class="inline-block m-1 mx-2.5 h-8 rounded-full"
				/>
			</div>
		</div>
	</section>

	<section class="grid grid-cols-6">
		<Stat label="Force" value={data.stats.strength} malus={data.malus} />
		<Stat label="Dextérité" value={data.stats.agility} malus={data.malus} />
		<Stat
			label="Arme de corps"
			value={data.stats.melee}
			malus={data.malus}
		/>
		<Stat
			label="Arme à feu"
			value={data.stats.firearm}
			malus={data.malus}
		/>
		<Stat label="Vigilence" value={data.stats.insight} malus={data.malus} />
		<Stat label="Stress" value={data.stats.stress} malus={data.malus} />
	</section>

	<section class="p-3">
		<textarea
			bind:value={data.daylog}
			class="w-full h-72 resize-none p-1 border-2 rounded border-gray-700"
		/>
	</section>
</main>
