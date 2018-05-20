import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | historial-cuotas', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:historial-cuotas');
    assert.ok(route);
  });
});
