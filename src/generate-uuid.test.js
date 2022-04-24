const expect = require('chai').expect;
const generator = require('./generate-uuid');

describe('UUID v5 Generator', () => {

  describe('no namespace', () => {

    function testNamespaceErrorThrown(namespace) {
      try {
        generator.generate(namespace, 'value');
        expect.fail(`Should have thrown an error.`);
      }
      catch (err) {
        expect(err.message).to.contain('namespace value must be specified');
      }
    }

    it('should error on null value', () => {
      testNamespaceErrorThrown(null);
    });

    it('should error on undefined value', () => {
      testNamespaceErrorThrown(undefined);
    });

    it('should error on whitespace only string "   "', () => {
      testNamespaceErrorThrown('   ');
    });
  });


  describe('no value', () => {

    function testValueErrorThrown(value) {
      try {
        generator.generate('test-namespace', value);
        expect.fail(`Should have thrown an error.`);
      }
      catch (err) {
        expect(err.message).to.contain('Value must be specified');
      }
    }

    it('should fail on null value', () => {
      testValueErrorThrown(null);
    });

    it('should fail on undefined value', () => {
      testValueErrorThrown(undefined);
    });

    it('should fail on zero lenght string', () => {
      testValueErrorThrown('');
    });
  });

  describe('supported values', () => {

    const TESTS = [
      {
        namespace: 'bookstore-testing',
        value: 'qa-peter-murray-patch-1',
        expected_uuid: '3ee83601-31ad-563a-9a57-887cf25ff9af',
      },
      {
        namespace: 'bookstore-testing',
        value: 'staging-peter-murray-patch-1',
        expected_uuid: '6c8c703b-30c6-5e41-a39b-8445f01b0fe7',
      },
      {
        namespace: '3ee83601-31ad-563a-9a57-887cf25ff9af',
        value: 'qa-peter-murray-patch-1',
        expected_uuid: 'dd96a8d8-9042-5488-a990-3d4dbbb231a4',
      }
    ];

    TESTS.forEach(test => {
      it(`should process namespace:"${test.namespace}" value:"${test.value}"`, () => {
        const result = generator.generate(test.namespace, test.value);

        expect(result).to.have.property('uuid').to.equal(test.expected_uuid);

        expect(result).to.have.property('uuid_short');
        const uuidShort = result.uuid_short;
        expect(uuidShort).to.have.length(32);
        expect(uuidShort).to.equal(result.uuid.replaceAll('-', ''));

        expect(result).to.have.property('namespace');
      })
    });
  });
});