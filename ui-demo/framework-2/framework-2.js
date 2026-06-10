(function () {
  const VERSION = '2.0.0';

  const RULES = Object.freeze({
    topbarHeight: 52,
    tabsbarHeight: 40,
    sidebarWidth: 256,
    collapsedSidebarWidth: 56,
    workspaceInset: 12,
    cardGap: 12,
    maxAppsPerRow: 5
  });

  const DEFAULT_CONFIG = Object.freeze({
    root: '.frame2-stage',
    systemName: '智慧人事一体化服务系统',
    userName: '金晓智',
    roleName: '教职工',
    frameworkAssetBase: './assets',
    activeApp: 'home',
    activeFeature: 'home',
    pinHomeTab: true,
    hideSidebar: false,
    topTools: [
      { key: 'search', label: '搜索', icon: './assets/top-search.svg' },
      { key: 'skin', label: '换肤', icon: './assets/top-skin.svg' },
      { key: 'language', label: '中英文', icon: './assets/top-language.svg' }
    ],
    appGroups: [
      { key: 'home', label: '首页', href: './staff-portal-homepage.html' }
    ],
    secondaryNav: { items: [] },
    tabs: [
      { key: 'home', label: '首页', wiseIcon: 'homeOutline', closable: false }
    ]
  });

  function copyList(value, fallback) {
    return Array.isArray(value) ? value.slice() : fallback.slice();
  }

  function normalizeConfig(overrides) {
    const input = overrides || {};
    const config = {
      ...DEFAULT_CONFIG,
      ...input,
      topTools: copyList(input.topTools, DEFAULT_CONFIG.topTools),
      appGroups: copyList(input.appGroups, DEFAULT_CONFIG.appGroups),
      tabs: copyList(input.tabs, DEFAULT_CONFIG.tabs),
      secondaryNav: input.secondaryNav || DEFAULT_CONFIG.secondaryNav
    };

    if (input.roleProfiles && !input.roles) {
      config.roles = Object.keys(input.roleProfiles);
    }

    if (config.hideSidebar === 'auto') {
      delete config.hideSidebar;
    }

    return config;
  }

  function validateConfig(config) {
    const errors = [];
    const warnings = [];
    const keys = new Set();

    if (!config.systemName) errors.push('systemName 不能为空');
    if (!Array.isArray(config.appGroups) || !config.appGroups.length) {
      errors.push('appGroups 至少需要一个应用或应用分组');
    }

    (config.appGroups || []).forEach((group) => {
      if (!group?.key || !group?.label) errors.push('每个应用分组必须包含 key 和 label');
      const items = group?.apps || [group];
      items.forEach((app) => {
        if (!app?.key || !app?.label) errors.push('每个应用必须包含 key 和 label');
        if (app?.key && keys.has(app.key)) warnings.push(`应用 key 重复：${app.key}`);
        if (app?.key) keys.add(app.key);
      });
    });

    if (config.roleProfiles) {
      Object.entries(config.roleProfiles).forEach(([role, profile]) => {
        if (!Array.isArray(profile?.appGroups) || !profile.appGroups.length) {
          errors.push(`角色“${role}”未配置 appGroups`);
        }
      });
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  function mount(overrides) {
    if (!window.WiseAppShellV2?.init) {
      throw new Error('框架2加载失败：请先引入 AppShellV2/app-shell-v2.js');
    }

    const config = normalizeConfig(overrides);
    const result = validateConfig(config);
    if (!result.valid) {
      throw new Error(`框架2配置错误：${result.errors.join('；')}`);
    }
    if (result.warnings.length && window.console) {
      console.warn('[Framework2]', ...result.warnings);
    }

    const instance = window.WiseAppShellV2.init(config);
    if (instance?.stage) {
      instance.stage.dataset.framework = '2';
      instance.stage.dataset.frameworkVersion = VERSION;
    }
    return instance;
  }

  window.WiseFramework2 = Object.freeze({
    VERSION,
    RULES,
    DEFAULT_CONFIG,
    normalizeConfig,
    validateConfig,
    mount
  });
})();
