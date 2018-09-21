angular.module('app').component('heroList', {
  templateUrl: './components/product/product.html',
  controller: HeroListController
});

function HeroDetailController(getProducts) {
  var ctrl = this;

  ctrl.delete = function() {
    ctrl.onDelete({hero: ctrl.hero});
  };

  ctrl.update = function(prop, value) {
    ctrl.onUpdate({hero: ctrl.hero, prop: prop, value: value});
  };
  
  var a = getProducts.data();
  
  console.log(a);
  
}

angular.module('app').component('heroDetail', {
  templateUrl: './components/productDetail/productDetail.html',
  controller: HeroDetailController,
  bindings: {
    hero: '<',
    onDelete: '&',
    onUpdate: '&'
  }
});
