(function($){

  var init, data, dataResolved, domReady;

  dataResolved = $.getJSON("data.json").then(function(resp){ data = resp; });
  domReady = $.Deferred()

  var getTemplateFor = function ($el) {
    var elData = $el.data();
    var templateHTML = $("#" + elData.template).html()
    var template = _.template(templateHTML);
    var localVars = { name: elData.template }
    localVars[elData.data] = data[elData.data];
    $el.html(template(localVars));
  }

  var init = function(){

    // Get templates for components
    $("[component]").each(function (idx, el) { getTemplateFor($(el)); });    

  }

  $.when(dataResolved, domReady).done(init);

  $(document).ready(function () { domReady.resolve() });

})(jQuery)
