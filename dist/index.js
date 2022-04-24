require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 610:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { v5: uuidv5, NIL: uuidNIL, validate: uuidValidate } = __nccwpck_require__(7);

module.exports.generate = function (namespace, value) {
  if (!namespace || namespace.trim().length < 1) {
    throw new Error(`A namespace value must be specified, was '${namespace}'`);
  }

  if (!value || value.length === 0) {
    throw new Error(`Value must be specified, was '${value}'`);
  }

  let validatedNamespace = namespace;
  if (!uuidValidate(namespace)) {
    // Conver the provided string into a UUID value for the namespace using the NIL namespace to encode it.
    validatedNamespace = uuidv5(namespace, uuidNIL);
  }

  const uuid = uuidv5(value, validatedNamespace);
  const uuidShort = uuid.replaceAll('-', '');

  return {
    uuid: uuid,
    uuid_short: uuidShort,
    namespace: validatedNamespace,
  };
}

/***/ }),

/***/ 185:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 7:
/***/ ((module) => {

module.exports = eval("require")("uuid");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(185);
const uuidGenerator = __nccwpck_require__(610);

async function run() {
  try {
    const namespace = core.getInput('namespace', { required: true });
    const value = core.getInput('value', { required: true });

    const result = uuidGenerator.generate(namespace, value);

    core.setOutput('uuid', result.uuid);
    core.setOutput('uuid_short', result.uuid_short);
    core.setOutput('namespace_uuid', result.namespace);
  } catch (err) {
    core.setFailed(`Failed to convert to UUID v5, ${err}`);
  }
}

run();
})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map