const core = require('@actions/core');
const uuidGenerator = require('./src/generate-uuid');

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