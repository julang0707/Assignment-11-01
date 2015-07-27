var url = 'https://api.etsy.com/v2/listings/active.js?api_key=h9oq2yf3twf4ziejn10b717i&keywords=nashville&includes=Images,Shop';
$.ajax(url, {
  dataType: 'jsonp',
  error: function(req, status, err) {
    console.log('something went wrong', status, err);
  },

  success: function(data, textStatus, xhr) {
    buildItemList(data.results);
  }
})
var buildItemList = function(items) {
  var html = items.map(buildItem);

  html.reduce(function(html, item) {
    return html + item;
  });

  var $items = $('.content');
  $items.html(html);
};

var buildItem = function(item) {
  var image = _.first(item.Images);

  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  image = image.url_170x135;

  // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

  var imgUrl = item.url;
  var titleUrl = item.url;
  var title = item.title.substring(0, 34) + '...';
  var shopUrl = item.Shop.url;

  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  var shop = item.Shop.shop_name;
  var price = item.price;
  var currency = item.currency_code;

  // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

  var itemTemplate = $('#list-item').html();
  var itemHtml = _.template(itemTemplate);
  var output = itemHtml(
    {
      image: image,
      imgUrl: imgUrl,
      titleUrl: titleUrl,
      title: title,
      shopUrl: shopUrl,
      shop: shop,
      price: price,
      currency: currency
    }
  );
  return output;
};
