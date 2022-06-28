<script>
	import { createEventDispatcher } from "svelte";
	import Icon from "svelte-awesome/components/Icon.svelte";
	import { cloudUpload } from "svelte-awesome/icons";
    const dispatch = createEventDispatcher();

    export let accept = "*";
    export let multiple = false;

    function handleChange(event) {
        dispatch("upload", event.target.files);
    }

    function handleDrop(event) {
        dispatch("upload", event.dataTransfer.files);
    }
</script>

<label
    on:dragenter|preventDefault|stopPropagation
    on:dragover|preventDefault|stopPropagation
    on:drop|preventDefault|stopPropagation={handleDrop}
	class="flex flex-col justify-center items-center w-60 h-28 m-1 shadow-md transition-all duration-500 rounded ring-2 ring-gray-300 hover:ring-blue-300 hover:text-blue-300"
>
	<Icon data={cloudUpload} scale={3.4} />
	<p>Uploader un fichier</p>
    <input type="file" class="hidden" on:change={handleChange} {accept} {multiple} />
</label>
