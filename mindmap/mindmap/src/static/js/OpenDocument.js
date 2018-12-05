/**
 * Creates a new OpenDocumentView. This view shows a dialog from which the user
 * can select a mind map from the local storage or a hard disk.
 * 
 * @constructor
 */

mindmaps.OpenDocumentView = function() {
  var self = this;

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


  $dialog.find('#example1').bind('click', function(e) {
    console.log('something1');
    if (self.openJSONFileClicked_1) {
      self.openJSONFileClicked_1(e);
    }
  });

  $dialog.find('#example2').bind('click', function(e) {
    console.log('something2');
    if (self.openJSONFileClicked_2) {
      self.openJSONFileClicked_2(e);
    }
  });

  $dialog.find('#example1').bind('ready', function(e) {
    console.log('something1');
    if (self.openJSONFileClicked_1) {
      self.openJSONFileClicked_1(e);
    }
  });

  $dialog.find('#example2').bind('ready', function(e) {
    console.log('something');
    if (self.openJSONFileClicked) {
      self.openJSONFileClicked('example2', e);
    }
  });


/*
  $dialog.find('#example2').bind('ready', function(e) {
    console.log('something2');
    if (self.openJSONFileClicked_2) {
      self.openJSONFileClicked_2(e);
    }
  });
*/

/*
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("#example1").addEventListener('click',function (e)
  {
    console.log('something1');
    if (self.openJSONFileClicked_1) {
      self.openJSONFileClicked_1(e);
    }
  }  ); 
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("#example2").addEventListener('click',function (e)
  {
    console.log('something2');
    if (self.openJSONFileClicked_2) {
      self.openJSONFileClicked_2(e);
    }
  }  ); 
});
*/

  /*jsy
  
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

  /**
  * View callback: external file has been selected. Try to read and parse a
  * valid mindmaps Document.
  * 
  * @ignore
  */

  //승영이의 코드

  view.openJSONFileClicked = function(name , e) {

    console.log('openjson');
    var file_path = 'maps/' + name + '.json'
    $.getJSON(file_path, function (data) {
    
    var doc = mindmaps.Document.fromObject(data);
    mindmapModel.setDocument(doc);
    view.hideOpenDialog();
    
  });
}


  view.openJSONFileClicked_1 = function(e) {

        console.log('openjson1');
        $.getJSON('maps/example1.json', function (data) {
        
        var doc = mindmaps.Document.fromObject(data);
        mindmapModel.setDocument(doc);
        view.hideOpenDialog();
        
      });
  }
  
  view.openJSONFileClicked_2 = function(e) {
    console.log('openjson2');
    $.getJSON('maps/example2.json', function (data) {
    
    var doc = mindmaps.Document.fromObject(data);
    mindmapModel.setDocument(doc);
    view.hideOpenDialog();
    
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


  /**
  * View callback: The delete link the local storage list has been clicked.
  * Delete the document, and render list again.
  * 
  * @ignore
  * @param {mindmaps.Document} doc
  */


  /**
  * Initialize.
  */
 
  this.go = function() {
    var docs = mindmaps.LocalDocumentStorage.getDocuments();
    docs.sort(mindmaps.Document.sortByModifiedDateDescending);
    view.showOpenDialog(docs);
  };
  
};





