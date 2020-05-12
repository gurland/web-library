function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var bookMainElement = document.getElementById('reader-book-main');
var fileName = getParameterByName('bookId') + '.zip';
var bookOptions = {
    "options": {
        "keyboard":true,
        "touch":true,
        "url": (window.location.pathname.indexOf('/', 1) > 0 ? window.location.pathname : '/') + "files/" + fileName
    }
};
console.log(bookOptions);
bookMainElement.setAttribute('data-options', JSON.stringify(bookOptions));
