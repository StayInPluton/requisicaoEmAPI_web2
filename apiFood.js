const http = require('http');
const https = require('https');

https.get('https://www.themealdb.com/api/json/v1/1/random.php', (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const recipe = JSON.parse(data).meals[0];
      res.write(`<h1>${recipe.strMeal}</h1>`);
      res.write(`<img src="${recipe.strMealThumb}" alt="${recipe.strMeal}"/>`);
      res.write(`<p>${recipe.strInstructions}</p>`);
      res.end();
    });

    server.listen(3000, () => {
      console.log('Server running at http://localhost:3000/');
    });
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});