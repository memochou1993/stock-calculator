<script lang="ts">
  export let title: string;
</script>

<div class="bg-body-secondary rounded-3">
  <div class="container-fluid p-4">
    <p class="lead">{title}</p>
    <hr />
    <slot />
  </div>
</div>
