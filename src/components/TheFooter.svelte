<script lang="ts">
import { GTM } from '$lib/gtm';
</script>

<footer class="text-center my-5 py-3">
  <div>
    &copy; {new Date().getFullYear()}
    <a
      class="text-body text-decoration-none"
      href="https://profile.epoch.tw/"
      on:click={() => {
        GTM.pushEvent('visit_author_profile');
      }}
      rel="noopener noreferrer"
      target="_blank"
    >
      Memo Chou
    </a>
  </div>
</footer>

<style lang="scss">
footer {
  font-size: 0.875rem;
}
</style>
