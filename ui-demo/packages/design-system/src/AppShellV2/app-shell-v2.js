(function () {
  const MODULES = [
    { key: 'home', icon: 'home', label: '首页' },
    { key: 'prepare', icon: 'prepare', label: '准备工作' },
    { key: 'master', icon: 'master', label: '硕士' },
    { key: 'doctor', icon: 'doctor', label: '博士' },
    { key: 'camp', icon: 'camp', label: '夏令营' },
    { key: 'recommend', icon: 'recommend', label: '推免' },
    { key: 'hkmt', icon: 'hkmt', label: '港澳台' },
    { key: 'exam', icon: 'exam', label: '考务管理' }
  ];

  function renderModules(activeModule) {
    return MODULES.map((item) => `
      <button class="frame2-module${item.key === activeModule ? ' is-active' : ''}" type="button" data-module="${item.key}">
        <span class="frame2-module-icon"><span class="wise-icon" data-wise-icon="${item.icon}"></span></span>
        <span>${item.label}</span>
      </button>
    `).join('');
  }

  function renderMenu(items, activeFeature) {
    return (items || []).map((item) => `
      <button class="frame2-side-item${item === activeFeature ? ' is-active' : ''}" type="button" data-feature="${item}">
        <span class="frame2-side-icon"><span class="wise-icon" data-wise-icon="chevronRight"></span></span>
        <span class="frame2-side-label">${item}</span>
      </button>
    `).join('');
  }

  function renderTabs(items, activeFeature) {
    return (items || []).map((item) => `
      <button class="frame2-tab${item === activeFeature ? ' is-active' : ''}" type="button" data-tab="${item}">
        <span>${item}</span><span class="frame2-tab-close">×</span>
      </button>
    `).join('');
  }

  function buildShell(config) {
    const navItems = config.secondaryNav?.items || [];
    return `
      <header class="frame2-topbar">
        <div class="frame2-brand">
          <img src="./assets/icons/金智logo.svg" alt="Wisedu" />
          <span class="frame2-brand-text">
            <span class="frame2-brand-name">${config.systemName || '系统框架2'}</span>
            <span class="frame2-brand-sub">${config.versionLabel || 'Frame 2'}</span>
          </span>
        </div>
        <nav class="frame2-module-tabs" aria-label="主模块">${renderModules(config.activeModule || 'doctor')}</nav>
        <div class="frame2-tools">
          <button class="frame2-tool" type="button" aria-label="搜索"><span class="wise-icon" data-wise-icon="search"></span></button>
          <button class="frame2-tool" type="button" aria-label="刷新"><span class="wise-icon" data-wise-icon="refresh"></span></button>
          <button class="frame2-tool" type="button" aria-label="设置"><span class="wise-icon" data-wise-icon="settings"></span></button>
          <span class="frame2-avatar" aria-hidden="true"></span>
        </div>
      </header>
      <div class="frame2-main">
        <aside class="frame2-sidebar">
          <div class="frame2-side-head">
            <span class="frame2-side-title">${config.secondaryNav?.title || '组件库'}</span>
            <button class="frame2-side-collapse" type="button" aria-label="收起侧栏">‹</button>
          </div>
          <nav class="frame2-menu" aria-label="二级导航">${renderMenu(navItems, config.activeFeature)}</nav>
        </aside>
        <main class="frame2-workspace">
          <div class="frame2-tabsbar">
            <div class="frame2-tabs">${renderTabs(config.tabs || navItems, config.activeFeature)}</div>
            <button class="frame2-tool" type="button" aria-label="新增页签">＋</button>
            <button class="frame2-tool" type="button" aria-label="全屏"><span class="wise-icon" data-wise-icon="fullscreen"></span></button>
          </div>
          <section class="frame2-content-shell">
            <div class="frame2-content"></div>
          </section>
        </main>
      </div>
    `;
  }

  function init(config) {
    config = config || {};
    const stage = document.querySelector(config.root || '.frame2-stage');
    if (!stage) return null;
    const businessContent = Array.from(stage.children);
    stage.innerHTML = buildShell(config);
    const slot = stage.querySelector('.frame2-content');
    businessContent.forEach((node) => slot.appendChild(node));

    const collapse = stage.querySelector('.frame2-side-collapse');
    collapse?.addEventListener('click', () => {
      stage.classList.toggle('is-side-collapsed');
      collapse.textContent = stage.classList.contains('is-side-collapsed') ? '›' : '‹';
    });

    function activateFeature(feature) {
      stage.querySelectorAll('[data-feature]').forEach((node) => node.classList.toggle('is-active', node.dataset.feature === feature));
      stage.querySelectorAll('[data-tab]').forEach((node) => node.classList.toggle('is-active', node.dataset.tab === feature));
      if (typeof config.onFeatureChange === 'function') config.onFeatureChange(feature);
      const title = stage.querySelector('[data-frame2-title]');
      if (title) title.textContent = feature;
    }

    stage.querySelectorAll('[data-feature]').forEach((node) => {
      node.addEventListener('click', () => activateFeature(node.dataset.feature));
    });
    stage.querySelectorAll('[data-tab]').forEach((node) => {
      node.addEventListener('click', (event) => {
        if (event.target.classList.contains('frame2-tab-close')) return;
        activateFeature(node.dataset.tab);
      });
    });
    stage.querySelectorAll('[data-module]').forEach((node) => {
      node.addEventListener('click', () => {
        stage.querySelectorAll('[data-module]').forEach((item) => item.classList.remove('is-active'));
        node.classList.add('is-active');
        if (typeof config.onModuleChange === 'function') config.onModuleChange(node.dataset.module);
      });
    });

    window.WiseIconRegistry?.renderIcons(stage);
    return { stage, activateFeature };
  }

  window.WiseAppShellV2 = { init, MODULES };
})();
