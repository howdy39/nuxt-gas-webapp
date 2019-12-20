function doGet (request) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
}

function include (filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent()
}

function fetchAllUser () {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('users')
  const range = sheet.getDataRange()
  const values = range.getValues()

  let userProps = []
  const users = []
  for (let i = 0; i < values.length; i++) {
    const row = values[i]
    if (i === 0) {
      userProps = row
      continue
    }

    const user = {}
    for (let j = 0; j < userProps.length; j++) {
      const key = userProps[j]
      user[key] = row[j]
    }
    users.push(user)
  }

  return JSON.stringify(users)
}
