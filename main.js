var url = 'https://api.etsy.com/v2/listings/active.js?api_key=h9oq2yf3twf4ziejn10b717i&keywords=nashville&includes=Images,Shop';


$.ajax(url,{
  dataType: 'jsonp',
  error: function( req, status, err ) {
    console.log( 'something went wrong', status, err );
  },
  success: function(data, textStatus, xhr) {
    buildItemList(data.results);
  }
})
var buildItemList = function(items){
  var html = items.map(buildItem);

  html.reduce(function(html, item){
    return html + item;
  });

  var $items = $('.content');
  $items.html(html);
};

var buildItem = function(item){
  var image = _.first(item.Images);
      image = image.url_570xN;

  var imgUrl = item.url;
  var title = item.title.substring(0,37) + '...';
  var shop = item.Shop.shop_name;
  var price = item.price;
  var currency= item.currency_code;

  var itemTemplate = $('#list-item').html();
  var itemHtml = _.template(itemTemplate);
  var output = itemHtml(
    {
      image: image,
      imgUrl: imgUrl,
      title: title,
      shop: shop,
      price: price,
      currency: currency,
    }
  );
  return output;
};
