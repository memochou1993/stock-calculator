<script>
  import { GTM } from '$lib';
</script>

<footer class="text-center py-5">
  Built with ❤️ by
  <a
    href="https://profile.epoch.tw/"
    on:click={() => {
      GTM.pushEvent('visit_author_profile');
    }}
    rel="noopener noreferrer"
    target="_blank"
  >
    Memo Chou
  </a>
</footer>

<style lang="scss">
  footer {
    font-size: 0.875rem;
  }
</style>
