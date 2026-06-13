(function () {
  document.documentElement.style.height = '100%';
  document.body.style.height = '100%';
  document.body.style.margin = '0';
  document.body.style.overflow = 'hidden';

  function normalizeItems(items) {
    return (items || []).map((item) => {
      if (typeof item === 'string') return { key: item, label: item };
      return item;
    });
  }

  function init(config) {
    const input = config || {};
    const activeFeature = input.activeFeature || document.title;
    const menuItems = normalizeItems(input.secondaryNav?.items);
    const menuTitle = input.secondaryNav?.title || '组件库';
    const tabs = [
      {
        key: '功能索引',
        label: '功能索引',
        href: './component-library-index.html',
        closable: false
      }
    ];

    if (activeFeature !== '功能索引') {
      tabs.push({
        key: activeFeature,
        label: activeFeature,
        closable: true
      });
    }

    return window.WiseFramework2.mount({
      root: input.root || '.frame2-stage',
      activeApp: 'component-library',
      activeFeature,
      versionLabel: '组件库',
      frameworkAssetBase: './framework-2/assets',
      frameworkLogoSrc: './framework-2/assets/szpu-emblem.png',
      topTools: [
        { key: 'search', label: '搜索', icon: './framework-2/assets/top-search.svg' },
        { key: 'skin', label: '换肤', icon: './framework-2/assets/top-skin.svg' },
        { key: 'language', label: '中英文', icon: './framework-2/assets/top-language.svg' }
      ],
      appMenus: {
        'component-library': [
          {
            key: 'design-assets',
            label: menuTitle,
            icon: 'home',
            children: menuItems
          }
        ]
      },
      tabs,
      onFeatureChange: input.onFeatureChange
    });
  }

  window.WiseAppShell = Object.freeze({ init });
})();
