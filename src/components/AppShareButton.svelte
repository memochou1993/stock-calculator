<script lang="ts">
  export let url: string;

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (e) {
      //
    }
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: `與你分享好用的${document.title}`,
          url,
        });
      } catch (e) {
        //
      }
    }
  };
</script>

<button type="button" class="btn btn-variant" data-bs-toggle="modal" data-bs-target="#share-modal">
  <div class="d-flex align-items-center">
    <span class="material-symbols-outlined">share</span>
  </div>
</button>

<div class="modal fade" id="share-modal" tabindex="-1" aria-labelledby="share-modal-label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-body-secondary">
      <div class="modal-header">
        <h1 class="modal-title text-variant fs-5" id="share-modal-label">分享</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="form-group mb-0">
          <input type="text" name="url" class="form-control form-control-md mb-3" bind:value={url} readonly />
          <div class="d-grid">
            <button type="button" class="btn btn-block btn-warning" data-bs-dismiss="modal" on:click={copyUrl}>複製網址</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
