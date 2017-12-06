"use strict";
function $__interopRequire(id) {
  id = require(id);
  return id && id.__esModule && id || {default: id};
}
var _ = $__interopRequire("lodash").default;
var blacklist = {locations: ['nyc2']};
module.exports = function(DOWrapper, DOToken) {
  var api = new DOWrapper(DOToken);
  return Promise.all([promise(api.sizesGetAll.bind(api)).then(transformSizes), promise(api.regionsGetAll.bind(api)).then(transformRegions)]).then(makeProfile);
  function promise(fn) {
    for (var args = [],
        $__1 = 1; $__1 < arguments.length; $__1++)
      args[$__1 - 1] = arguments[$__1];
    return new Promise(function(resolve, reject) {
      fn.apply((void 0), $traceurRuntime.spread(args, [function(error) {
        for (var rest = [],
            $__2 = 1; $__2 < arguments.length; $__2++)
          rest[$__2 - 1] = arguments[$__2];
        if (error)
          reject(error);
        else
          resolve.apply((void 0), $traceurRuntime.spread(rest));
      }]));
    });
  }
  function transformSizes(sizes) {
    return new Promise(function(resolve, reject) {
      resolve(_.transform(sizes.sizes, function(sizes, size) {
        var $__3 = size,
            id = $__3.slug,
            memory = $__3.memory,
            cpus = $__3.vcpus,
            disk = $__3.disk,
            transfer = $__3.transfer,
            price_monthly = $__3.price_monthly,
            price_hourly = $__3.price_hourly,
            locations = $__3.regions;
        sizes[id] = {
          id: id,
          memory: memory,
          cpus: cpus,
          disk: disk,
          transfer: transfer,
          price_monthly: price_monthly,
          price_hourly: price_hourly,
          locations: locations
        };
      }, {}));
    });
  }
  function transformRegions(regions) {
    return new Promise(function(resolve, reject) {
      resolve(_.transform(_.where(regions.regions, {available: true}), function(regions, region) {
        var $__3 = region,
            id = $__3.slug,
            name = $__3.name,
            sizes = $__3.sizes,
            available = $__3.available;
        regions[id] = {
          id: id,
          vicinity: name,
          sizes: sizes
        };
      }, {}));
    });
  }
  function makeProfile(values) {
    var $__4,
        $__5;
    var $__3 = values,
        sizes = ($__4 = $__3[Symbol.iterator](), ($__5 = $__4.next()).done ? void 0 : $__5.value),
        locations = ($__5 = $__4.next()).done ? void 0 : $__5.value;
    return {
      name: 'DigitalOcean',
      sizes: sizes,
      locations: _.omit(locations, blacklist.locations || [])
    };
  }
};

//# sourceMappingURL=index.js.map
