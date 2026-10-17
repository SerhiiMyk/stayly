/**
 * `jws` is CommonJS and calls `require('stream')`, expecting the legacy
 * Stream constructor. The default ESM external emitted by Rspack is a module
 * namespace, which makes that constructor undefined at runtime.
 */
export default (config) => {
  config.externals = [
    ({ request }, callback) => {
      if (request === 'stream') {
        return callback(null, 'node-commonjs stream');
      }

      callback();
    },
    ...config.externals,
  ];

  return config;
};
