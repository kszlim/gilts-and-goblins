fetch('latest.json', {cache: 'no-cache'}).then(response => {
  if (!response.ok) throw new Error('No build yet');
  return response.json();
}).then(build => {
  document.querySelector('#build-status').textContent = `Latest nightly: ${build.tag} · ${build.date.slice(0, 10)}`;
  for (const link of document.querySelectorAll('[data-asset]')) {
    const asset = build.assets.find(asset => asset.name === link.dataset.asset);
    if (asset) link.href = asset.url;
    else link.remove();
  }
}).catch(() => {
  document.querySelector('#build-status').textContent = 'The first nightly is being prepared. Downloads will appear on the releases page.';
});
