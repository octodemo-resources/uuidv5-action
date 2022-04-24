const { v5: uuidv5, NIL: uuidNIL, validate: uuidValidate } = require('uuid');

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