import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | historial-cuotas-socios/socio', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:historial-cuotas-socios/socio');
    assert.ok(route);
  });
});
