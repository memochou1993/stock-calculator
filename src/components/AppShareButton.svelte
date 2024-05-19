<script lang="ts">
  import { delay } from '$lib';
  import type { Modal, Tooltip } from 'bootstrap';
  import { onMount } from 'svelte';
  import AppIcon from './AppIcon.svelte';

  export let url: string;

  let bootstrap: typeof import('bootstrap');

  onMount(async () => {
    bootstrap = await import('bootstrap');
  });

  const copy = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: `與你分享好用的${document.title}`,
          url,
        });
      } catch (err) {
        console.error(err);
      }
      modal.hide();
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      showTooltip(tooltip, '複製成功！');
    } catch (err) {
      console.error(err);
      showTooltip(tooltip, '複製失敗！');
    }
  };

  const showTooltip = async (tooltip: Tooltip, content: string) => {
    tooltip.setContent({ '.tooltip-inner': content });
    tooltip.show();
    await delay(500);
    tooltip.hide();
  };

  $: modal = bootstrap?.Modal.getOrCreateInstance('#modal-share') as Modal;
  $: tooltip = bootstrap?.Tooltip.getOrCreateInstance('#tooltip-share') as Tooltip;
</script>

<button type="button" class="btn btn-variant px-2" data-bs-target="#modal-share" on:click={() => modal.show()}>
  <AppIcon icon="share" />
</button>

<div class="modal fade" id="modal-share" tabindex="-1" aria-labelledby="modal-share-label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-body-secondary">
      <div class="modal-header">
        <h1 class="modal-title text-variant fs-5" id="modal-share-label">分享</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="form-group mb-0">
          <input type="text" name="url" class="form-control form-control-md mb-3" bind:value={url} readonly />
          <div class="d-grid">
            <button
              class="btn btn-block btn-warning"
              data-bs-custom-class="tooltip-variant"
              data-bs-placement="bottom"
              data-bs-toggle="tooltip"
              data-bs-trigger="manual"
              id="tooltip-share"
              on:click={copy}
              title="複製成功！"
              type="button"
            >
              複製網址
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
