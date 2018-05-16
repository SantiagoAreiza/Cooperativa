import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | insertar-ahorro', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:insertar-ahorro');
    assert.ok(route);
  });
});
