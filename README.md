github public api\
const request = new XMLHttpRequest();\
request.open('GET', 'apiEndpoint');\
request.send();\
request.addEventListener('load', function () {const data = JSON.parse(this.responseText);});\
const html = `parsedata`\
