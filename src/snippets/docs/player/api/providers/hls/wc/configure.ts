player.addEventListener('provider-change', (event) => {
  const provider = event.detail;
  if (provider?.type === 'hls') {
    provider.config = {
      // ...
    };
  }
});
