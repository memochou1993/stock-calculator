<script lang="ts">
  import { TheFooter, TheHeader } from '$components';
  import { onMount } from 'svelte';
  import './layout.scss';
  // @ts-expect-error
  import { pwaInfo } from 'virtual:pwa-info';

  const url = import.meta.env.VITE_APP_URL;
  const title = '股票交易計算器｜手續費、損益金額、報酬率計算工具';
  const description = `股票交易計算器，提供股票、股票當沖、指數股票型基金（ETF）交易試算。輸入交易類別、買入價格、賣出價格、交易股數、手續費折扣、最低手續費，可根據不同的成交價格，自動計算出股票成本、股票市值、買入手續費、賣出手續費、證券交易稅、交易成本、損益金額、報酬率。`;
  const keywords = `股票計算機, 當沖計算機, 手續費計算機, 報酬率計算機, 台股交易, 股票交易, 台股試算, 股票試算, 台股計算, 股票計算, 股票, 股票當沖, ETF, 手續費, 報酬率`;

  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';

  onMount(async () => {
    await initBootstrap();
  });

  const initBootstrap = async () => {
    const bootstrap = await import('bootstrap');
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new bootstrap.Tooltip(el));
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach((el) => new bootstrap.Popover(el));
  };
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content="Memo Chou" />
  <meta name="robots" content="index, follow" />
  <meta property="og:site_name" content={title} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={`${url}/cover.png`} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={`${url}/cover.png`} />
  <meta name="twitter:card" content="summary_large_image" />
  {@html webManifest}
</svelte:head>

<div class="app">
  <TheHeader />
  <main class="pt-4 pt-sm-5">
    <slot />
  </main>
  <TheFooter />
</div>
