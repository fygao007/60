(function () {
  const DEFAULT_APPS = [
    { key: 'home', label: '首页' },
    { key: 'task', label: '任务中心' },
    { key: 'personnel', label: '人事服务', apps: [
      { key: 'staff', label: '教职工管理' },
      { key: 'contract', label: '合同管理' }
    ] },
    { key: 'daily', label: '日常管理', apps: [
      { key: 'attendance', label: '考勤管理' },
      { key: 'approval', label: '流程审批' }
    ] },
    { key: 'ai', label: 'AI观察室' },
    { key: 'stats', label: '数据统计' }
  ];

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function escapeSelector(value) {
    if (window.CSS?.escape) return CSS.escape(value);
    return String(value).replace(/["\\]/g, '\\$&');
  }

  function shortLabel(label) {
    const text = String(label || '');
    return text.length > 7 ? `${text.slice(0, 7)}...` : text;
  }

  function normalizeItem(item) {
    return typeof item === 'string' ? { key: item, label: item } : item;
  }

  function normalizeTab(item) {
    const tab = normalizeItem(item);
    return {
      key: tab.key || tab.label,
      label: tab.label || tab.key,
      icon: tab.icon,
      wiseIcon: tab.wiseIcon,
      closable: tab.closable !== false
    };
  }

  function flattenMenu(items) {
    return (items || []).flatMap((raw) => {
      const item = normalizeItem(raw);
      const children = item.children || [];
      if (!children.length) return [{ key: item.key || item.label, label: item.label || item.key, icon: item.icon }];
      return children.map(normalizeItem).map((child) => ({
        key: child.key || child.label,
        label: child.label || child.key,
        parentKey: item.key || item.label,
        parentLabel: item.label || item.key,
        icon: child.icon || item.icon
      }));
    });
  }

  function firstFeature(items) {
    return flattenMenu(items)[0] || null;
  }

  function appGroupActive(group, activeApp) {
    return group.key === activeApp || (group.apps || []).some((item) => item.key === activeApp);
  }

  function renderApps(groups, activeApp) {
    return (groups || DEFAULT_APPS).map((item) => {
      if (item.apps && item.apps.length) {
        return `
          <div class="frame2-app-group${appGroupActive(item, activeApp) ? ' is-active' : ''}" data-app-group="${escapeHtml(item.key)}">
            <button class="frame2-app-trigger" type="button" title="${escapeHtml(item.label)}" aria-haspopup="menu" aria-expanded="false">
              <span>${escapeHtml(shortLabel(item.label))}</span>
              <span class="frame2-app-arrow"><span class="wise-icon" data-wise-icon="chevronDown"></span></span>
            </button>
            <div class="frame2-app-menu" role="menu">
              ${item.apps.map((app) => `
                <button class="frame2-app-option${app.key === activeApp ? ' is-active' : ''}" type="button" role="menuitem" data-app="${escapeHtml(app.key)}" data-app-label="${escapeHtml(app.label)}" title="${escapeHtml(app.label)}">
                  <span>${escapeHtml(shortLabel(app.label))}</span>
                </button>
              `).join('')}
            </div>
          </div>
        `;
      }
      return `
        <button class="frame2-module${item.key === activeApp ? ' is-active' : ''}" type="button" data-app="${escapeHtml(item.key)}" data-app-label="${escapeHtml(item.label)}" title="${escapeHtml(item.label)}">
          <span>${escapeHtml(shortLabel(item.label))}</span>
        </button>
      `;
    }).join('');
  }

  function menuGroupActive(item, activeFeature) {
    return item.key === activeFeature
      || item.label === activeFeature
      || (item.children || []).some((child) => {
        const normalized = normalizeItem(child);
        return normalized.key === activeFeature || normalized.label === activeFeature;
      });
  }

  function renderMenu(items, activeFeature) {
    return (items || []).map(normalizeItem).map((item) => {
      const key = item.key || item.label;
      const label = item.label || item.key;
      if (item.children && item.children.length) {
        const active = menuGroupActive(item, activeFeature);
        const open = item.expanded !== false || active;
        return `
          <div class="frame2-side-group${open ? ' is-open' : ''}${active ? ' is-active' : ''}" data-menu-group="${escapeHtml(key)}">
            <button class="frame2-side-item is-group" type="button" data-menu-toggle="${escapeHtml(key)}" title="${escapeHtml(label)}">
              <span class="frame2-side-icon"><span class="wise-icon" data-wise-icon="${escapeHtml(item.icon || 'chevronRight')}"></span></span>
              <span class="frame2-side-label">${escapeHtml(label)}</span>
              <span class="frame2-side-arrow" aria-hidden="true">${open ? '⌄' : '›'}</span>
            </button>
            <div class="frame2-side-children">
              ${item.children.map(normalizeItem).map((child) => {
                const childKey = child.key || child.label;
                const childLabel = child.label || child.key;
                return `
                  <button class="frame2-side-item is-child${childKey === activeFeature || childLabel === activeFeature ? ' is-active' : ''}" type="button" data-feature="${escapeHtml(childKey)}" data-feature-label="${escapeHtml(childLabel)}" title="${escapeHtml(childLabel)}">
                    <span class="frame2-side-label">${escapeHtml(childLabel)}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }
      return `
        <button class="frame2-side-item${key === activeFeature || label === activeFeature ? ' is-active' : ''}" type="button" data-feature="${escapeHtml(key)}" data-feature-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
          <span class="frame2-side-icon"><span class="wise-icon" data-wise-icon="${escapeHtml(item.icon || 'chevronRight')}"></span></span>
          <span class="frame2-side-label">${escapeHtml(label)}</span>
        </button>
      `;
    }).join('');
  }

  function renderTabs(items, activeFeature) {
    return (items || []).map(normalizeTab).map((item) => `
      <button class="frame2-tab${item.key === activeFeature ? ' is-active' : ''}" type="button" data-tab="${escapeHtml(item.key)}" data-tab-label="${escapeHtml(item.label)}" title="${escapeHtml(item.label)}">
        ${item.icon ? `<span class="frame2-tab-icon"><img src="${escapeHtml(item.icon)}" alt="" /></span>` : ''}
        ${item.wiseIcon ? `<span class="frame2-tab-icon"><span class="wise-icon" data-wise-icon="${escapeHtml(item.wiseIcon)}"></span></span>` : ''}
        <span>${escapeHtml(item.label)}</span>
        ${item.closable ? '<span class="frame2-tab-close" aria-label="关闭页签">×</span>' : ''}
      </button>
    `).join('');
  }

  function renderTopTools(items) {
    const tools = Array.isArray(items) ? items : [
      { key: 'search', label: '搜索', wiseIcon: 'search' },
      { key: 'skin', label: '换肤', wiseIcon: 'skin' },
      { key: 'language', label: '语言', wiseIcon: 'settings' }
    ];
    return tools.map((item) => {
      const icon = item.icon
        ? `<img src="${escapeHtml(item.icon)}" alt="" />`
        : `<span class="wise-icon" data-wise-icon="${escapeHtml(item.wiseIcon || item.key)}"></span>`;
      return `<button class="frame2-tool" type="button" data-tool="${escapeHtml(item.key)}" aria-label="${escapeHtml(item.label || item.key)}" title="${escapeHtml(item.label || item.key)}">${icon}</button>`;
    }).join('');
  }

  function renderSearchResults(results) {
    if (!results.length) return '<div class="frame2-search-empty">暂无匹配结果</div>';
    return results.map((item) => `
      <button class="frame2-search-result" type="button" data-search-type="${escapeHtml(item.type)}" data-search-key="${escapeHtml(item.key)}" data-search-label="${escapeHtml(item.label)}">
        <span class="frame2-search-type">${escapeHtml(item.typeLabel)}</span>
        <span class="frame2-search-label">${escapeHtml(item.label)}</span>
      </button>
    `).join('');
  }

  function buildShell(config, state) {
    const frameworkAssetBase = config.frameworkAssetBase || './framework-2/assets';
    const brandLogo = config.logoSrc || `${frameworkAssetBase}/szpu-logo-red.png`;
    const brandLogoAlt = config.logoAlt || '深圳职业技术大学';
    return `
      <header class="frame2-topbar">
        <div class="frame2-brand">
          <img class="frame2-brand-logo" src="${escapeHtml(brandLogo)}" alt="${escapeHtml(brandLogoAlt)}" />
          <span class="frame2-brand-text">
            <span class="frame2-brand-name">${escapeHtml(config.systemName || '系统框架2')}</span>
            <span class="frame2-brand-sub">${escapeHtml(config.versionLabel || 'Frame 2')}</span>
          </span>
        </div>
        <nav class="frame2-module-tabs" aria-label="应用导航">${renderApps(config.appGroups || DEFAULT_APPS, state.activeApp)}</nav>
        <div class="frame2-tools">
          ${renderTopTools(config.topTools)}
          <div class="frame2-user">
            <button class="frame2-user-trigger" type="button" data-user-trigger aria-haspopup="menu" aria-expanded="false">
              <span class="frame2-user-name">${escapeHtml(config.userName || '人事处管理员')}</span>
              <span class="frame2-user-arrow">⌄</span>
              <span class="frame2-avatar" aria-hidden="true"></span>
            </button>
            <div class="frame2-user-menu" role="menu">
              <button type="button" data-user-action="profile">个人中心</button>
              <button type="button" data-user-action="password">修改密码</button>
              <button type="button" data-user-action="logout">退出登录</button>
            </div>
          </div>
        </div>
        <div class="frame2-search-panel" data-search-panel>
          <div class="frame2-search-box">
            <span class="wise-icon" data-wise-icon="search"></span>
            <input type="search" data-search-input placeholder="搜索应用、菜单或页签" />
          </div>
          <div class="frame2-search-results" data-search-results></div>
        </div>
      </header>
      <div class="frame2-main">
        <aside class="frame2-sidebar">
          <nav class="frame2-menu" aria-label="二级导航">${renderMenu(state.menuItems, state.activeFeature)}</nav>
          <button class="frame2-side-collapse" type="button" aria-label="收起导航">
            <span class="frame2-side-icon"><img src="${escapeHtml(frameworkAssetBase)}/indent-decrease.svg" alt="" /></span>
            <span class="frame2-side-label">收起导航</span>
          </button>
        </aside>
        <main class="frame2-workspace">
          <div class="frame2-tabsbar">
            <div class="frame2-tabs">${renderTabs(state.tabs, state.activeFeature)}</div>
            <button class="frame2-tool" type="button" data-tab-refresh aria-label="刷新当前页签" title="刷新当前页签"><img src="${escapeHtml(frameworkAssetBase)}/tab-refresh.svg" alt="" /></button>
            <button class="frame2-tool" type="button" data-fullscreen aria-label="全屏" title="全屏"><img src="${escapeHtml(frameworkAssetBase)}/tab-fullscreen.svg" alt="" /></button>
          </div>
          <section class="frame2-content-shell">
            <div class="frame2-content"></div>
          </section>
        </main>
      </div>
      <div class="frame2-toast" data-toast></div>
    `;
  }

  function init(config) {
    config = config || {};
    const stage = document.querySelector(config.root || '.frame2-stage');
    if (!stage) return null;
    const businessContent = Array.from(stage.children);

    const defaultMenu = config.secondaryNav?.items || [];
    const state = {
      activeApp: config.activeApp || config.activeModule || (config.appGroups || DEFAULT_APPS)[0]?.key || 'home',
      menuItems: defaultMenu,
      activeFeature: config.activeFeature,
      tabs: (config.tabs || []).map(normalizeTab)
    };
    state.menuItems = config.appMenus?.[state.activeApp] || defaultMenu;
    stage.classList.toggle('is-sidebar-hidden', config.hideSidebar === true || config.sidebar === false);
    const initialFeature = state.activeFeature || firstFeature(state.menuItems)?.key;
    state.activeFeature = initialFeature;
    if (!state.tabs.length && initialFeature) {
      const initial = firstFeature(state.menuItems);
      state.tabs = [{ key: initialFeature, label: initial?.label || initialFeature, closable: false }];
    }

    stage.innerHTML = buildShell(config, state);
    const menu = stage.querySelector('.frame2-menu');
    const tabs = stage.querySelector('.frame2-tabs');
    const searchInput = stage.querySelector('[data-search-input]');
    const searchResults = stage.querySelector('[data-search-results]');
    const content = stage.querySelector('.frame2-content');
    if (content && config.emptyContent !== true) {
      businessContent.forEach((node) => content.appendChild(node));
    }

    function renderDynamic() {
      if (menu) menu.innerHTML = renderMenu(state.menuItems, state.activeFeature);
      if (tabs) tabs.innerHTML = renderTabs(state.tabs, state.activeFeature);
      window.WiseIconRegistry?.renderIcons(stage);
    }

    function updateActiveState() {
      stage.querySelectorAll('[data-feature]').forEach((node) => {
        const active = node.dataset.feature === state.activeFeature || node.dataset.featureLabel === state.activeFeature;
        node.classList.toggle('is-active', active);
        const group = node.closest('.frame2-side-group');
        if (group && active) {
          group.classList.add('is-active', 'is-open');
          const arrow = group.querySelector('.frame2-side-arrow');
          if (arrow) arrow.textContent = '⌄';
        }
      });
      stage.querySelectorAll('.frame2-side-group').forEach((group) => {
        const active = Boolean(group.querySelector('[data-feature].is-active'));
        group.classList.toggle('is-active', active);
      });
      stage.querySelectorAll('[data-tab]').forEach((node) => {
        node.classList.toggle('is-active', node.dataset.tab === state.activeFeature);
      });
    }

    function ensureTab(key, label, closable = true) {
      if (!key) return;
      if (!state.tabs.some((tab) => tab.key === key)) {
        state.tabs.push({ key, label: label || key, closable });
      }
    }

    function activateFeature(key, label) {
      if (!key) return;
      state.activeFeature = key;
      const tabCount = state.tabs.length;
      ensureTab(key, label || key);
      if (state.tabs.length !== tabCount) {
        if (tabs) tabs.innerHTML = renderTabs(state.tabs, state.activeFeature);
        window.WiseIconRegistry?.renderIcons(stage);
      }
      updateActiveState();
      if (typeof config.onFeatureChange === 'function') config.onFeatureChange(key);
    }

    function closeTab(key) {
      const index = state.tabs.findIndex((tab) => tab.key === key);
      if (index < 0 || state.tabs[index].closable === false) return;
      const wasActive = state.activeFeature === key;
      state.tabs.splice(index, 1);
      if (wasActive) {
        const next = state.tabs[index] || state.tabs[index - 1] || null;
        state.activeFeature = next?.key || null;
      }
      renderDynamic();
    }

    function refreshActiveTab() {
      if (typeof config.onTabRefresh === 'function') {
        const result = config.onTabRefresh(state.activeFeature);
        if (result === false) return;
      }
      window.location.reload();
    }

    function activateApp(key, label) {
      state.activeApp = key;
      state.menuItems = config.appMenus?.[key] || defaultMenu;
      const next = firstFeature(state.menuItems);
      if (next) activateFeature(next.key, next.label);
      stage.querySelectorAll('.frame2-module, .frame2-app-option, .frame2-app-group').forEach((item) => item.classList.remove('is-active'));
      stage.querySelectorAll(`[data-app="${escapeSelector(key)}"]`).forEach((node) => node.classList.add('is-active'));
      const group = stage.querySelector(`[data-app="${escapeSelector(key)}"]`)?.closest('.frame2-app-group');
      if (group) group.classList.add('is-active');
      stage.querySelectorAll('.frame2-app-group.is-open').forEach((item) => item.classList.remove('is-open'));
      if (typeof config.onAppChange === 'function') config.onAppChange(key, label);
      if (typeof config.onModuleChange === 'function') config.onModuleChange(key, label);
    }

    function searchItems(query = '') {
      const q = query.trim().toLowerCase();
      const appItems = (config.appGroups || DEFAULT_APPS).flatMap((item) => item.apps || [item]).map((item) => ({
        type: 'app',
        typeLabel: '应用',
        key: item.key,
        label: item.label
      }));
      const menuItems = flattenMenu(state.menuItems).map((item) => ({
        type: 'feature',
        typeLabel: '菜单',
        key: item.key,
        label: item.parentLabel ? `${item.parentLabel} / ${item.label}` : item.label
      }));
      const tabItems = state.tabs.map((item) => ({
        type: 'tab',
        typeLabel: '页签',
        key: item.key,
        label: item.label
      }));
      return [...appItems, ...menuItems, ...tabItems].filter((item) => !q || `${item.label} ${item.key}`.toLowerCase().includes(q)).slice(0, 12);
    }

    function updateSearch() {
      if (!searchResults) return;
      searchResults.innerHTML = renderSearchResults(searchItems(searchInput?.value || ''));
    }

    function toggleSearch(force) {
      const panel = stage.querySelector('[data-search-panel]');
      const open = force ?? !stage.classList.contains('is-search-open');
      stage.classList.toggle('is-search-open', open);
      if (open) {
        updateSearch();
        requestAnimationFrame(() => searchInput?.focus());
      } else {
        if (searchInput) searchInput.value = '';
      }
      panel?.setAttribute('aria-hidden', String(!open));
    }

    function toast(message) {
      const node = stage.querySelector('[data-toast]');
      if (!node) return;
      node.textContent = message;
      stage.classList.add('has-toast');
      clearTimeout(stage.__frame2ToastTimer);
      stage.__frame2ToastTimer = setTimeout(() => stage.classList.remove('has-toast'), 1600);
    }

    stage.addEventListener('click', (event) => {
      const target = event.target;
      const appTrigger = target.closest('.frame2-app-trigger');
      const appNode = target.closest('[data-app]');
      const featureNode = target.closest('[data-feature]');
      const tabNode = target.closest('[data-tab]');
      const closeNode = target.closest('.frame2-tab-close');
      const toolNode = target.closest('[data-tool]');
      const searchResult = target.closest('[data-search-key]');
      const userTrigger = target.closest('[data-user-trigger]');
      const userAction = target.closest('[data-user-action]');

      if (target.closest('.frame2-side-collapse')) {
        stage.classList.toggle('is-side-collapsed');
        return;
      }
      if (target.closest('[data-menu-toggle]')) {
        const group = target.closest('.frame2-side-group');
        group?.classList.toggle('is-open');
        const arrow = group?.querySelector('.frame2-side-arrow');
        if (arrow) arrow.textContent = group.classList.contains('is-open') ? '⌄' : '›';
        return;
      }
      if (closeNode && tabNode) {
        closeTab(tabNode.dataset.tab);
        return;
      }
      if (tabNode) {
        activateFeature(tabNode.dataset.tab, tabNode.dataset.tabLabel);
        return;
      }
      if (featureNode) {
        activateFeature(featureNode.dataset.feature, featureNode.dataset.featureLabel);
        return;
      }
      if (appTrigger) {
        const group = appTrigger.closest('.frame2-app-group');
        const expanded = !group.classList.contains('is-open');
        stage.querySelectorAll('.frame2-app-group.is-open').forEach((item) => item.classList.remove('is-open'));
        group.classList.toggle('is-open', expanded);
        appTrigger.setAttribute('aria-expanded', String(expanded));
        return;
      }
      if (appNode) {
        activateApp(appNode.dataset.app, appNode.dataset.appLabel);
        return;
      }
      if (toolNode) {
        const key = toolNode.dataset.tool;
        if (key === 'search') toggleSearch();
        else toast(toolNode.getAttribute('aria-label') || '操作已触发');
        return;
      }
      if (searchResult) {
        const type = searchResult.dataset.searchType;
        if (type === 'app') activateApp(searchResult.dataset.searchKey, searchResult.dataset.searchLabel);
        else activateFeature(searchResult.dataset.searchKey, searchResult.dataset.searchLabel.split(' / ').pop());
        toggleSearch(false);
        return;
      }
      if (target.closest('[data-tab-refresh]')) {
        refreshActiveTab();
        return;
      }
      if (target.closest('[data-fullscreen]')) {
        stage.classList.toggle('is-workspace-fullscreen');
        return;
      }
      if (userTrigger) {
        const open = !stage.classList.contains('is-user-open');
        stage.classList.toggle('is-user-open', open);
        userTrigger.setAttribute('aria-expanded', String(open));
        return;
      }
      if (userAction) {
        toast(userAction.textContent.trim());
        stage.classList.remove('is-user-open');
      }
    });

    document.addEventListener('click', (event) => {
      if (!stage.contains(event.target)) {
        stage.classList.remove('is-search-open', 'is-user-open');
        stage.querySelectorAll('.frame2-app-group.is-open').forEach((group) => group.classList.remove('is-open'));
      }
    });

    searchInput?.addEventListener('input', updateSearch);
    searchInput?.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') toggleSearch(false);
      if (event.key === 'Enter') stage.querySelector('[data-search-key]')?.click();
    });

    renderDynamic();
    updateSearch();
    return { stage, activateFeature, activateApp, closeTab, refreshActiveTab };
  }

  window.WiseAppShellV2 = { init, DEFAULT_APPS };
})();
