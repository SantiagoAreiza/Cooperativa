import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | iniciar-sesion', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:iniciar-sesion');
    assert.ok(route);
  });
});
