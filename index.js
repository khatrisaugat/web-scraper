const PORT = 8000
const express = require('express');
const cheerio = require('cheerio')
const axios = require('axios')

const app = express()

const url = `https://www.tufohss.edu.np/index.php/notices/`
axios(url)
    .then(response => {
        const html = response.data;
        // console.log(html)
        const exactHtml = cheerio.load(html);
        let dataInarr = []
        exactHtml('tr', html).each(function () {
            const title = exactHtml(this).text().replace('\n', " ").split('\n')
            const link = exactHtml(this).find('a').attr('href')
            dataInarr.push({
                title: title[0],
                date: title[1],
                link
            })
        })
        dataInarr = dataInarr.filter(function (value, index, arr) {
            if (value.link !== undefined) {
                return value
            }
        })
        console.log(dataInarr)
        app.get('/bcatunotices', (req, res) => {
            res.json(dataInarr);
        })
    })
    .catch(err => console.log(err))

app.listen(PORT, () => console.log(`App running on port ${PORT}`))