const fs = require('fs');

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {

        res.write('<html>');
        res.write('<head>');
        res.write('<title>Enter  message title</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<form action="/message" method ="POST"><input type="text" name="message"/><Button type="submit">Send</Button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === "/message" && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log('chunk', chunk);
            body.push(chunk);
        })
       return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(`parseBody`, parseBody);
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, () => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
        /**
         * Creating a new file
         */
    }
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Hello nodejs</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<form><input type="text" name="message"/><Button type="submit">Send</Button></form>');
    res.write('</body>');
    res.write('</html>');
}

module.exports = requestHandler;

