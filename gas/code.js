function doGet (request) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
}

function include (filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent()
}

function fetchAllUser () {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('users');
  var range = sheet.getDataRange();
  var values = range.getValues();

  var userProps = [];
  var users = [];
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    if (i === 0) {
      userProps = row;
      continue;
    }

    var user = {};
    for (var j = 0; j < userProps.length; j++) {
      var key = userProps[j]
      user[key] = row[j];
    }
    users.push(user);
  }

  return JSON.stringify(users);
}
