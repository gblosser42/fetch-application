const express = require('express');
const _ = require('underscore');
const app = express();
const port = 3000;

const isPyramid = (word) => {
    const alphanumericCheck = word.match(/^[0-9a-zA-Z]*$/);
    if (!alphanumericCheck) {
        return `Non-alphanumeric characters present. ${word} is not a valid word`;
    }
    const characters = {};
    const solution = [];
    for (const char of word) {
        const count = characters[char];
        characters[char] = count ? count + 1 : 1;
    };
    const maxCount = characters[Object.keys(characters).reduce((a, b) => characters[a] > characters[b] ? a : b)];
    const inverted = _.invert(characters);
    if (Object.keys(characters).length === Object.keys(inverted).length) {
        for (let i = 1; i <= maxCount; i++) {
            let check = inverted[i];
            if (!check) {
                return `No character appears ${i} times in the string. Not A Pyramid!`;
            }
            check = i === 1 ? check : check + '\'s';
            if (i === maxCount && maxCount > 1) {
                solution.push(`and ${i} ${check}`);
            } else {
                solution.push(`${i} ${check}`);
            }
        }
        return `${word} Is A Pyramid! <br> It contains ${solution.join(', ')}`;
    } else {
        return 'More than one word has the same frequency. NOT A Pyramid!';
    }
};

app.get('/', (req, res) => {
    let pyramidEvaluation = '';
    if (req.query.word) {
        pyramidEvaluation = isPyramid(req.query.word) + '<br><br>';
    }
    res.send(`<html><body>
    ${pyramidEvaluation}
    <form action="/">
    <input type="text" id="word" name="word">
    <input type="submit" value="Try A New Word!">
  </form></body></html>`)
});

app.listen(port, () => console.log(`Fetch App listening at http://localhost:${port}`));