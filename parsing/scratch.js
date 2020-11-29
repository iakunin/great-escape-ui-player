// import quests from json-file
let quests = [];

let json = quests
    .map(i => $($.parseHTML(i.content)))
    .map(i => (
            {
                questName: i.find('.quest_tile_name_link').text(),
                companyName: ((text, pattern) => text.slice(text.indexOf(pattern) + pattern.length))
                (i.find('.quest_tile_name_link').attr('title'), ' от '),
                metro: i.find('.subway').text().substring(3),
                link: 'https://mir-kvestov.ru' + i.find('.quest_tile_name_link').attr('href')
            }
        )
    );


let fields = Object.keys(json[0]);
let replacer = function (key, value) {
    return value === null ? '' : value
};
let csv = json.map(function (row) {
    return fields.map(function (fieldName) {
        return JSON.stringify(row[fieldName], replacer)
    }).join(',')
})
csv.unshift(fields.join(',')) // add header column
csv = csv.join('\r\n');
console.log(csv);
