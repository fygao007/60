(function () {
  const DEFAULT_APPS = [
    { key: 'portal', icon: 'home', label: '门户' },
    { key: 'admission', label: '招生应用', apps: [
      { key: 'prepare', icon: 'prepare', label: '准备工作' },
      { key: 'master', icon: 'master', label: '硕士招生' },
      { key: 'doctor', icon: 'doctor', label: '博士招生' },
      { key: 'camp', icon: 'camp', label: '夏令营' }
    ] },
    { key: 'recommend', icon: 'recommend', label: '推免管理' },
    { key: 'student', label: '学生服务', apps: [
      { key: 'hkmt', icon: 'hkmt', label: '港澳台' },
      { key: 'exam', icon: 'exam', label: '考务管理' }
    ] }
  ];

  function shortLabel(label) {
    const text = String(label || '');
    return text.length > 7 ? `${text.slice(0, 7)}...` : text;
  }

  function appGroupActive(group, activeApp) {
    return group.key === activeApp || (group.apps || []).some((item) => item.key === activeApp);
  }

  function renderApps(groups, activeApp) {
    return (groups || DEFAULT_APPS).map((item) => {
      if (item.apps && item.apps.length) {
        return `
          <div class="frame2-app-group${appGroupActive(item, activeApp) ? ' is-active' : ''}" data-app-group="${item.key}">
            <button class="frame2-app-trigger" type="button" title="${item.label}" aria-haspopup="menu" aria-expanded="false">
              <span>${shortLabel(item.label)}</span>
              <span class="frame2-app-arrow">⌄</span>
            </button>
            <div class="frame2-app-menu" role="menu">
              ${item.apps.map((app) => `
                <button class="frame2-app-option${app.key === activeApp ? ' is-active' : ''}" type="button" role="menuitem" data-app="${app.key}" title="${app.label}">
                  <span>${shortLabel(app.label)}</span>
                </button>
              `).join('')}
            </div>
          </div>
        `;
      }
      return `
        <button class="frame2-module${item.key === activeApp ? ' is-active' : ''}" type="button" data-app="${item.key}" title="${item.label}">
          <span>${shortLabel(item.label)}</span>
        </button>
      `;
    }).join('');
  }

  function normalizeMenuItem(item) {
    return typeof item === 'string' ? { key: item, label: item, icon: 'chevronRight' } : item;
  }

  function renderMenu(items, activeFeature) {
    return (items || []).map(normalizeMenuItem).map((item) => `
      <button class="frame2-side-item${item.key === activeFeature || item.label === activeFeature ? ' is-active' : ''}" type="button" data-feature="${item.key || item.label}">
        <span class="frame2-side-icon"><span class="wise-icon" data-wise-icon="${item.icon || 'chevronRight'}"></span></span>
        <span class="frame2-side-label">${item.label}</span>
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
    const activeApp = config.activeApp || config.activeModule || 'doctor';
    const assetBase = config.assetBase || './assets';
    return `
      <header class="frame2-topbar">
        <div class="frame2-brand">
          <img src="${assetBase}/icons/金智logo.svg" alt="Wisedu" />
          <span class="frame2-brand-text">
            <span class="frame2-brand-name">${config.systemName || '系统框架2'}</span>
            <span class="frame2-brand-sub">${config.versionLabel || 'Frame 2'}</span>
          </span>
        </div>
        <nav class="frame2-module-tabs" aria-label="应用导航">${renderApps(config.appGroups || DEFAULT_APPS, activeApp)}</nav>
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
    stage.querySelectorAll('.frame2-app-trigger').forEach((node) => {
      node.addEventListener('click', () => {
        const group = node.closest('.frame2-app-group');
        const expanded = group.classList.toggle('is-open');
        node.setAttribute('aria-expanded', String(expanded));
      });
    });
    stage.querySelectorAll('[data-app]').forEach((node) => {
      node.addEventListener('click', () => {
        stage.querySelectorAll('.frame2-module, .frame2-app-option, .frame2-app-group').forEach((item) => item.classList.remove('is-active'));
        node.classList.add('is-active');
        const group = node.closest('.frame2-app-group');
        if (group) {
          group.classList.add('is-active');
          group.classList.remove('is-open');
          group.querySelector('.frame2-app-trigger')?.setAttribute('aria-expanded', 'false');
        }
        if (typeof config.onAppChange === 'function') config.onAppChange(node.dataset.app);
        if (typeof config.onModuleChange === 'function') config.onModuleChange(node.dataset.app);
      });
    });
    document.addEventListener('click', (event) => {
      if (stage.contains(event.target)) {
        const openGroup = event.target.closest('.frame2-app-group');
        stage.querySelectorAll('.frame2-app-group.is-open').forEach((group) => {
          if (group === openGroup) return;
          group.classList.remove('is-open');
          group.querySelector('.frame2-app-trigger')?.setAttribute('aria-expanded', 'false');
        });
      }
    });

    window.WiseIconRegistry?.renderIcons(stage);
    return { stage, activateFeature };
  }

  window.WiseAppShellV2 = { init, DEFAULT_APPS };
})();
