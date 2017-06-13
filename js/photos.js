var photoBin = {
  photoIds: [
    '20120613091819',
    '20120613091849',
    '20120614170038',
    '20120614170920',
    '20151011121208',
    '20100129000057',
    '20100203205939',
    '20100203210055',
    '20120711133513',
    '20120711133535',
    '20120711133909',
    '20120711134643',
    '20120711135457',
    '20120713102800',
    '20120721132707',
    '20100211031635',
    '20100221175637',
    '20100221192926',
    '20160913190428',
    '20100226105638',
    '20100226112515',
    '20160914134913',
    '20160914135350',
    '20160914135352',
    '20100305111324',
    '20100305132235',
    '20100331114722',
    '20100331114743',
    '20100331114755',
    '20100331115214',
    '20100402153906',
    '20100612082003',
    '20110126094640',
    '20110126094824',
    '20120817123435',
    '20120817123512',
    '20120817123639',
    '20120820123520',
    '20120820123529',
    '20140320115313',
    '20140404123054',
    '20120831145143',
    '20120831145143-2',
    '20140412110222',
    '20140502155802',
    '20120901163036',
    '20140502160748',
    '20140502161454',
    '20121105160944',
    '20130330110114',
    '20130407182102',
    '20130407182940',
    '20130502193252'
  ],

  photos: [],

  populateBin: function() {
    this.photos = this.photoIds.map(function(photoId) {
      return {
        small: 'img/photography/small/' + photoId + '_s.jpg',
        large: 'img/photography/large/' + photoId + '_l.jpg'
      };
    });
  },

  getRandomPhoto: function() {
    if (this.photos.length > 0) {
      var random = Math.floor(Math.random() * this.photos.length);
      var item = this.photos[random];
      this.photos.splice(random, 1);
      return item;
    }
  },

  getPhotos: function(count) {
    var photos = '';
    var numOfPhotos = count || 6;
    while(numOfPhotos-- > 0) {
      var item = this.getRandomPhoto();
      if (item) {
        photos += '<div class="grid-item grid-sizer">'+
          '<a href="'+item.large+'" data-fancybox="Photography">' +
          '<img src="'+item.small+'"></a></div>';
      }
    }

    return $(photos);
  }

};

photoBin.populateBin();
