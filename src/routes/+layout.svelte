<script lang="ts">
  import { page } from '$app/stores';
  import { TheFooter, TheHeader } from '$components';
  import { onMount } from 'svelte';
  import './layout.scss';
  // @ts-expect-error
  import { pwaInfo } from 'virtual:pwa-info';

  onMount(async () => {
    const bootstrap = await import('bootstrap');
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new bootstrap.Tooltip(el));
  });

  const title = '台股交易試算器 - 投資成本、損益金額、報酬率計算工具';
  const description = `台股交易試算器提供股票、股票當日沖銷、指數股票型基金（ETF）交易試算。藉由輸入交易類別、交易股數、買入價格、賣出價格、手續費折扣、最低手續費，可根據不同的成交價格，自動計算出股票成本、股票市值、買入手續費、賣出手續費、證券交易稅、交易成本、損益金額、報酬率。`;

  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content="股市, 台股, 股票, 台股交易, 股票交易, 台股試算, 股票試算, 台股計算, 股票計算, 當沖, ETF, 免費, 試算" />
  <meta name="author" content="Memo Chou" />
  <meta name="robots" content="index, follow" />
  <meta name="og:title" content={title} />
  <meta name="og:description" content={description} />
  <meta name="og:type" content="website" />
  <meta name="og:url" content={$page.url.origin} />
  <meta name="og:image" content="{$page.url.origin}/cover.png" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="{$page.url.origin}/cover.png" />
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
