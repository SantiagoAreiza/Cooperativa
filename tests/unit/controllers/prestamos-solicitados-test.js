import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | prestamos-solicitados', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:prestamos-solicitados');
    assert.ok(controller);
  });
});
