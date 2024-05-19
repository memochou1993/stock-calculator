<script lang="ts">
  export let icon: string;
  export let fontSize: number = 24;
</script>

<div class="d-flex align-items-center">
  <span class="material-symbols-outlined" style="font-size: {fontSize}px;">{icon}</span>
</div>
