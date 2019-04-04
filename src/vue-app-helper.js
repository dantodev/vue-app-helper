let router = null;

export default {
  install(Vue, config = {}) {
    router = config.router;
    if (!router) {
      throw "vue-app-helper needs vue-router instance.";
    }
  }
};

export function registerApp(name, { routes = [], hooks = {} } = {}) {
  var initialized = false;

  router.addRoutes(
    routes.map(route => {
      if (!route.meta) {
        route.meta = {};
      }
      route.meta.appName = name;
      return route;
    })
  );

  router.beforeEach(async (to, from, next) => {
    let mergedMetaTo = mergeRouteMeta(to);
    let mergedMetaFrom = mergeRouteMeta(from);
    let isEnter =
      mergedMetaFrom.appName !== name && mergedMetaTo.appName === name;
    let isLeave =
      !isEnter &&
      mergedMetaFrom.appName !== name &&
      mergedMetaTo.appName === name;

    if (isEnter && !initialized) {
      if (hooks.initialize instanceof Function) {
        await hooks.initialize();
      }
      initialized = true;
    }

    if (isEnter && hooks.enter instanceof Function) {
      await hooks.enter();
    }

    if (isLeave && hooks.leave instanceof Function) {
      await hooks.leave();
    }

    next();
  });
}

export function makeRoute(path, name, component, meta = {}) {
  return { name, path, component, meta, props: true };
}

export function mergeRouteMeta(meta) {
  if (!meta) {
    meta = {};
  }
  return (meta.matches || []).reduce(
    (result, meta) => ({ ...result, ...meta }),
    {}
  );
}
