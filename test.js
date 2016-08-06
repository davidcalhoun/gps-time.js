var chai = require('chai');
var expect = chai.expect;

var sources = [
  {
    name: 'gps-time.js',
    script: require(__dirname + '/gps-time.js'),
  },
  {
    name: 'gps-time-min.js',
    script: require(__dirname + '/gps-time-min.js'),
  }
];

sources.forEach(function(source){
  var gpsTime = source.script;

  describe(source.name, function() {
    it('returns an interface', function() {
      expect(gpsTime).to.be.a('object');
    });

    describe('toUnixMS', function() {
      it('works with a random date in 2016', function() {
        var gpsMS = 1138203697000;
        var unixMS = 1454168480000;

        expect(gpsTime.toUnixMS(gpsMS)).to.equal(unixMS);
      });

      describe('2016 leap second', function() {
        it('works just before', function() {
          var gpsMS = 1167264016000;
          var unixMS = 1483228799000;

          expect(gpsTime.toUnixMS(gpsMS)).to.equal(unixMS);
        });

        it('works during', function() {
          var gpsMS = 1167264017000;
          var unixMS = 1483228799500;

          expect(gpsTime.toUnixMS(gpsMS)).to.equal(unixMS);
        });

        it('works just after', function() {
          var gpsMS = 1167264018000;
          var unixMS = 1483228800000;

          expect(gpsTime.toUnixMS(gpsMS)).to.equal(unixMS);
        });
      });

      describe('2015 leap second', function() {
        it('works just before', function() {
          var gpsMS = 1119744015000;
          var unixMS = 1435708799000;

          expect(gpsTime.toUnixMS(gpsMS)).to.equal(unixMS);
        });

        it('works during', function() {
          var gpsMS = 1119744016000;
          var unixMS = 1435708799500;

          expect(gpsTime.toUnixMS(gpsMS)).to.equal(unixMS);
        });

        it('works just after', function() {
          var gpsMS = 1119744017000;
          var unixMS = 1435708800000;

          expect(gpsTime.toUnixMS(gpsMS)).to.equal(unixMS);
        });
      });

      describe('1981 leap second', function() {
        it('works just before', function() {
          var gpsMS = 46828799000;
          var unixMS = 362793599000;

          expect(gpsTime.toUnixMS(gpsMS)).to.equal(unixMS);
        });

        it('works during', function() {
          var gpsMS = 46828800000;
          var unixMS = 362793599500;

          expect(gpsTime.toUnixMS(gpsMS)).to.equal(unixMS);
        });

        it('works just after', function() {
          var gpsMS = 46828801000;
          var unixMS = 362793600000;

          expect(gpsTime.toUnixMS(gpsMS)).to.equal(unixMS);
        });
      });
    });


    describe('toGPSMS', function() {
      it('works with a random date in 2016', function() {
        var gpsMS = 1138203697000;
        var unixMS = 1454168480000;

        expect(gpsTime.toGPSMS(unixMS)).to.equal(gpsMS);
      });

      describe('2015 leap second', function() {
        it('works just before', function() {
          var gpsMS = 1119744015000;
          var unixMS = 1435708799000;

          expect(gpsTime.toGPSMS(unixMS)).to.equal(gpsMS);
        });

        it('works during', function() {
          var gpsMS = 1119744016000;
          var unixMS = 1435708799500;

          expect(gpsTime.toGPSMS(unixMS)).to.equal(gpsMS);
        });

        it('works just after', function() {
          var gpsMS = 1119744017000;
          var unixMS = 1435708800000;

          expect(gpsTime.toGPSMS(unixMS)).to.equal(gpsMS);
        });
      });

      describe('1981 leap second', function() {
        it('works just before', function() {
          var gpsMS = 46828799000;
          var unixMS = 362793599000;

          expect(gpsTime.toGPSMS(unixMS)).to.equal(gpsMS);
        });

        it('works during', function() {
          var gpsMS = 46828800000;
          var unixMS = 362793599500;

          expect(gpsTime.toGPSMS(unixMS)).to.equal(gpsMS);
        });

        it('works just after', function() {
          var gpsMS = 46828801000;
          var unixMS = 362793600000;

          expect(gpsTime.toGPSMS(unixMS)).to.equal(gpsMS);
        });
      });
    });
  });
});


