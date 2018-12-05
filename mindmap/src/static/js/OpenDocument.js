/**
 * Creates a new OpenDocumentView. This view shows a dialog from which the user
 * can select a mind map from the local storage or a hard disk.
 * 
 * @constructor
 */
mindmaps.OpenDocumentView = function() {
  var self = this;

  // create dialog
  /*backup
  var $dialog = $("#template-open").tmpl().dialog({
    autoOpen : false,
    modal : true,
    zIndex : 5000,
    width : 550,
    close : function() {
      $(this).dialog("destroy");
      $(this).remove();
    }
  });
  backup*/
  var $dialog = $("#template-open").tmpl().dialog({
    autoOpen : false,
    modal : true,
    zIndex : 5000,
    width : 550,
    close : function() {
      $(this).dialog("destroy");
      $(this).remove();
    }
  });


  $dialog.find('#get-data').bind('click', function(e) {
    console.log('something');
    if (self.openJSONFileClicked) {
      self.openJSONFileClicked(e);
    }
  });

  /*jsy
  
  var $openCloudButton = $("#button-open-cloud").button().click(function() {
    if (self.openCloudButtonClicked) {
      self.openCloudButtonClicked();
    }
  });
  jsy*/
  /*backup
  $dialog.find(".file-chooser input").bind("change", function(e) {
    console.log('something');
    if (self.openExernalFileClicked) {
      self.openExernalFileClicked(e);
    }
  });
  backup*/

  //승영코드
  /*
  $(document).on('#get-data', 'click', function(e) {
    console.log('something');
    if (self.openJSONFileClicked) {
      self.openJSONFileClicked(e);
    }
  });
  */
  //승영코드
  

 /*jsy

  var $table = $dialog.find(".localstorage-filelist");
  $table.delegate("a.title", "click", function() {
    if (self.documentClicked) {
      var t = $(this).tmplItem();
      self.documentClicked(t.data);
    }
  }).delegate("a.delete", "click", function() {
    if (self.deleteDocumentClicked) {
      var t = $(this).tmplItem();
      self.deleteDocumentClicked(t.data);
    }
  });
jsy*/
  /**
  * Render list of documents in the local storage
  * 
  * @param {mindmaps.Document[]} docs
  */

  
  this.render = function(docs) {
    // empty list and insert list of documents
    var $list = $(".document-list", $dialog).empty();

    $("#template-open-table-item").tmpl(docs, {
      format : function(date) {
        if (!date) return "";

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
      }
    }).appendTo($list);
  };
  
  /**
  * Shows the dialog.
  * 
  * @param {mindmaps.Document[]} docs
  */
  this.showOpenDialog = function(docs) {
    this.render(docs);
    $dialog.dialog("open");
  };

  /**
  * Hides the dialog.
  */
  this.hideOpenDialog = function() {
    $dialog.dialog("close");
  };
  /*jsy
  this.showCloudError = function(msg) {
    $dialog.find('.cloud-loading').removeClass('loading');
    $dialog.find('.cloud-error').text(msg);
  };

  this.showCloudLoading = function() {
    $dialog.find('.cloud-error').text('');
    $dialog.find('.cloud-loading').addClass('loading');
  };

  this.hideCloudLoading = function() {
    $dialog.find('.cloud-loading').removeClass('loading');
  };

  jsy*/
};

/**
* Creates a new OpenDocumentPresenter. The presenter can load documents from
* the local storage or hard disk.
* 
* @constructor
* @param {mindmaps.EventBus} eventBus
* @param {mindmaps.MindMapModel} mindmapModel
* @param {mindmaps.OpenDocumentView} view
* @param {mindmaps.FilePicker} filePicker
*/
mindmaps.OpenDocumentPresenter = function(eventBus, mindmapModel, view, filePicker) {





  /**
   * Open file via cloud
   */

  /*jsy
  view.openCloudButtonClicked = function(e) {
    mindmaps.Util.trackEvent("Clicks", "cloud-open");
    mindmaps.Util.trackEvent("CloudOpen", "click");

    filePicker.open({
      load: function() {
        view.showCloudLoading();
      },
      cancel: function () {
        view.hideCloudLoading();
        mindmaps.Util.trackEvent("CloudOpen", "cancel");
      },
      success: function() {
        view.hideOpenDialog();
        mindmaps.Util.trackEvent("CloudOpen", "success");
      },
      error: function(msg) {
        view.showCloudError(msg);
        mindmaps.Util.trackEvent("CloudOpen", "error", msg);
      }
    });
  };

  jsy*/

  // http://www.w3.org/TR/FileAPI/#dfn-filereader
  /**
  * View callback: external file has been selected. Try to read and parse a
  * valid mindmaps Document.
  * 
  * @ignore
  */

  /*backup
  view.openExernalFileClicked = function(e) {
    mindmaps.Util.trackEvent("Clicks", "hdd-open");

    var files = e.target.files;
    var file = files[0];

    var reader = new FileReader();
    reader.onload = function() {
      try {
        var doc = mindmaps.Document.fromJSON(reader.result);

      } catch (e) {
        eventBus.publish(mindmaps.Event.NOTIFICATION_ERROR, 'File is not a valid mind map!');
        throw new Error('Error while opening map from hdd', e);
      }
      mindmapModel.setDocument(doc);
      view.hideOpenDialog();
    };

    reader.readAsText(file);
  };
  backup*/

  //승영이의 코드


  view.openJSONFileClicked = function(e) {

   
        $.getJSON('example.json', function (data) {
        
        var doc = mindmaps.Document.fromObject(data);
        mindmapModel.setDocument(doc);
        
      });
    
        
  }
  


//승영이의 코드


  view.openExernalFileClicked = function(e) {
    mindmaps.Util.trackEvent("Clicks", "hdd-open");

    var files = e.target.files;
    var file = files[0];

    var reader = new FileReader();
    reader.onload = function() {
      try {
        var doc = mindmaps.Document.fromJSON(reader.result);

      } catch (e) {
        eventBus.publish(mindmaps.Event.NOTIFICATION_ERROR, 'File is not a valid mind map!');
        throw new Error('Error while opening map from hdd', e);
      }
      mindmapModel.setDocument(doc);
      view.hideOpenDialog();
    };

    reader.readAsText(file);
  };

  /**
  * View callback: A document in the local storage list has been clicked.
  * Load the document and close view.
  * 
  * @ignore
  * @param {mindmaps.Document} doc
  */

  /*jsy
  view.documentClicked = function(doc) {
    mindmaps.Util.trackEvent("Clicks", "localstorage-open");
    
    mindmapModel.setDocument(doc);
    view.hideOpenDialog();
  };
  jsy*/

  /**
  * View callback: The delete link the local storage list has been clicked.
  * Delete the document, and render list again.
  * 
  * @ignore
  * @param {mindmaps.Document} doc
  */

  /*jsy
  view.deleteDocumentClicked = function(doc) {
    // TODO event
    mindmaps.LocalDocumentStorage.deleteDocument(doc);

    // re-render view
    var docs = mindmaps.LocalDocumentStorage.getDocuments();
    view.render(docs);
  };
  jsy*/

  /**
  * Initialize.
  */
 
  this.go = function() {
    var docs = mindmaps.LocalDocumentStorage.getDocuments();
    docs.sort(mindmaps.Document.sortByModifiedDateDescending);
    view.showOpenDialog(docs);
  };
  
};
