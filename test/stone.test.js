var _ = require('underscore');
var assert = require('assert');
var Stone = require('../lib/model/stone');


describe('Stone', function () {

  describe('toString()', function () {

    it('should returns a string representation of the stone', function () {
      var stone = new Stone({row: 1, col: 2, color: 'black'});
      assert.equal('1:2:black', stone.toString());
    });

  });

  describe('topStone()', function () {

    it('should returns the top stone', function () {
      var stone = new Stone({row: 1, col: 2, color: 'black'});
      assert.equal(0, stone.topStone().get('row'));
      assert.equal(2, stone.topStone().get('col'));
      assert.equal('black', stone.topStone().get('color'));
      assert.equal('white', stone.topStone('white').get('color'));
    });

  });

  describe('rightStone()', function () {

    it('should returns the right stone', function () {
      var stone = new Stone({row: 1, col: 2, color: 'black'});
      assert.equal(1, stone.rightStone().get('row'));
      assert.equal(3, stone.rightStone().get('col'));
      assert.equal('black', stone.rightStone().get('color'));
      assert.equal('white', stone.rightStone('white').get('color'));
    });

  });

  describe('bottomStone()', function () {

    it('should returns the bottom stone', function () {
      var stone = new Stone({row: 1, col: 2, color: 'black'});
      assert.equal(2, stone.bottomStone().get('row'));
      assert.equal(2, stone.bottomStone().get('col'));
      assert.equal('black', stone.bottomStone().get('color'));
      assert.equal('white', stone.bottomStone('white').get('color'));
    });

  });

  describe('leftStone()', function () {

    it('should returns the left stone', function () {
      var stone = new Stone({row: 1, col: 2, color: 'black'});
      assert.equal(1, stone.leftStone().get('row'));
      assert.equal(1, stone.leftStone().get('col'));
      assert.equal('black', stone.leftStone().get('color'));
      assert.equal('white', stone.leftStone('white').get('color'));
    });

  });

  describe('equals()', function () {

    it('should recognize similar stones', function () {
      var stone1 = new Stone({row: 1, col: 2, color: 'black'});
      var stone2 = new Stone({row: 1, col: 2, color: 'black'});

      assert.equal(true, stone1.equals(stone2));
    });

    it('should recognize if 2 stones have differents column', function () {
      var stone1 = new Stone({row: 1, col: 2, color: 'black'});
      var stone2 = new Stone({row: 1, col: 3, color: 'black'});

      assert.equal(false, stone1.equals(stone2));
    });

    it('should recognize if 2 stones have differents row', function () {
      var stone1 = new Stone({row: 1, col: 2, color: 'black'});
      var stone2 = new Stone({row: 0, col: 2, color: 'black'});

      assert.equal(false, stone1.equals(stone2));
    });

    it('should recognize if 2 stones have differents colors', function () {
      var stone1 = new Stone({row: 1, col: 2, color: 'black'});
      var stone2 = new Stone({row: 1, col: 2, color: 'white'});

      assert.equal(false, stone1.equals(stone2));
    });

  });

  describe('liberties()', function () {

    it('should count 4 liberties if in center and no stone is near', function () {
      var stone = new Stone({row: 8, col: 8, color: 'black'});

      assert.equal(4, stone.liberties([], 19).size());
    });

    it('should count 3 liberties if on a wall and no stone is near', function () {
      var stone = new Stone({row: 8, col: 18, color: 'black'});

      assert.equal(3, stone.liberties([], 19).size());
    });

    it('should count 2 liberties if on a corner and no stone is near', function () {
      var stone = new Stone({row: 0, col: 0, color: 'black'});

      assert.equal(2, stone.liberties([], 19).size());
    });


    it('should count 3 liberties if in center and one stone near', function () {
      var stone = new Stone({row: 8, col: 8, color: 'black'});

      assert.equal(3, stone.liberties([{row: 9, col: 8, color: 'white'}], 19).size());
    });

  });

  describe('Collection', function () {

    describe('has()', function () {

      it('should return true when stone is included', function () {
        var col1 = new Stone.Collection([
          {row: 0, col: 0, color: 'black'},
          {row: 1, col: 0, color: 'black'},
        ]);

        assert.equal(true, col1.has({row: 0, col: 0, color: 'black'}));
        assert.equal(false, col1.has({row: 0, col: 0, color: 'white'}));
      });

    });

    describe('hasPos()', function () {

      it('should return true when opposite stone is included', function () {
        var col1 = new Stone.Collection([
          {row: 0, col: 0, color: 'black'},
          {row: 1, col: 0, color: 'black'},
        ]);

        assert.equal(true, col1.hasPos({row: 0, col: 0, color: 'black'}));
        assert.equal(true, col1.hasPos({row: 0, col: 0, color: 'white'}));
      });

    });

    describe('merge()', function () {

      it('should be able to add another collection', function () {
        var col1 = new Stone.Collection([
          {row: 0, col: 0, color: 'black'},
          {row: 1, col: 0, color: 'black'},
        ]);


        var col2 = new Stone.Collection([
          {row: 18, col: 0, color: 'black'},
          {row: 19, col: 0, color: 'black'},
        ]);

        col1.merge(col2);

        assert.equal(4, col1.size());
        assert.equal(true, col2.has({row: 18, col: 0, color: 'black'}));
        assert.equal(true, col2.has({row: 18, col: 0, color: 'black'}));
      });

    });

  });

});