(function() {
  'use strict';
  var m = require('mithril')
  var Equals = require('../index').equals
  var Chai = require('chai');
  var expect = Chai.expect;

  describe('Check Object Equality', function() {
    it('with regular values', function() {
      var a = 'hello';
      var b = 'hello';
      var c = 'world';

      expect(Equals(a, b)).to.equal(true);
      expect(Equals(a, c)).to.not.equal(true);
    })

    it('with regular objects', function() {
      var obj1 = { name: 'Kelleigh', color: 'Pink' };
      var obj2 = { name: 'Kelleigh', color: 'Pink' };
      var obj3 = { name: 'Maroney', color: 'Purple' };

      expect(Equals(obj1, obj2)).to.equal(true);
      expect(Equals(obj1, obj3)).to.not.equal(true);
    });

    it('with objects with mismatching keys', function() {
      var obj1 = { name: 'Kelleigh', color: 'Pink' };
      var obj2 = { name: 'Kelleigh', animal: 'Cat' };

      expect(Equals(obj1, obj2)).to.not.equal(true);
    });

    it('with arrays/nested objects', function() {
      var obj1 = {
        name: 'Kelleigh',
        color: 'Pink',
        pets: [{
          name: 'Cami',
          type: 'Cat'
        }, {
          name: 'Cara',
          type: 'Cat'
        }]
      };
      var obj2 = {
        name: 'Kelleigh',
        color: 'Pink',
        pets: [{
          name: 'Cami',
          type: 'Cat'
        }, {
          name: 'Cara',
          type: 'Cat'
        }]
      };

      expect(Equals(obj1, obj2)).to.equal(true);
    });

    it('with simple mithril properties', function() {
      var obj1 = m.prop('hello');
      var obj2 = m.prop('hello');

      expect(Equals(obj1, obj2)).to.equal(true);
    });

    it('with crazy objects', function() {
      var obj1 = {
        name: 'Kelleigh',
        color: 'Pink',
        pets: [{
          name: 'Cami',
          type: 'Cat'
        }, {
          name: 'Cara',
          type: 'Cat'
        }],
        mithril: [m.prop('Derp'), {
          derp: m.prop('Derp')
        }]
      };
      var obj2 = {
        name: 'Kelleigh',
        color: 'Pink',
        pets: [{
          name: 'Cami',
          type: 'Cat'
        }, {
          name: 'Cara',
          type: 'Cat'
        }],
        mithril: [m.prop('Derp'), {
          derp: m.prop('Derp')
        }]
      };

      expect(Equals(obj1, obj2)).to.equal(true);
    });

  });
})();
