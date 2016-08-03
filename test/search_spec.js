import { search } from '../lib/idioms';
import { each }	from 'underscore';
import assert from 'assert';
import fs from 'fs';

const idioms = JSON.parse(
  fs.readFileSync('./lib/idioms.json')
).idioms;

describe('matching underscore', () => {
  it('matches _h', () => {
    const find = '白_起家';
    const result = search(find, idioms).result;

    assert.equal(result.length, 1);

    each(result, (match) => {
      assert.equal(match.length, 4);
      assert.equal(match.indexOf('白'), 0);
    }, result);
  });

  it('matches h_', () => {
    const find = '__起家';
    const result = search(find, idioms).result;

    each(result, (match) => {
      assert.equal(match.length, 4);
      assert.equal(match.indexOf('家'), 3);
    }, result);
  });
});
