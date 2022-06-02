fetch(`https://www.hackerrank.com/rest/contests/${window.location.pathname.split('/')[2]}/leaderboard?offset=0&limit=300`).then(res => res.json()).then(result => result.models.reduce((acc, data) => {
acc.push({
name: data.hacker,
score: data.solved_challenges*10,
id: data.hacker_id
});
return acc;
}, [])).then(items => {
const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
const header = Object.keys(items[0])
const csv = [
header.join(','), // header row first
...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
].join('\r\n'); a = document.createElement('a');
a.textContent = 'download';
a.download = "myFileName.csv";
a.href = 'data:text/csv;charset=utf-8,' + escape(csv);
document.body.appendChild(a);
a.click();
});
