//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");
const { Diets } = require("./src/db");
const { API_KEY, DB_HOST } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=30&addRecipeInformation=true`
  );
  const typesDiets = await response.data.results.map((c) => {
    return c.diets;
  });
  const final = typesDiets.flat();
  await final.forEach((e) => {
    Diets.findOrCreate({
      where: { name: e },
    });
  });
  server.listen(3001 || process.env.PORT, () => {
    console.log(`%s listening at ${DB_HOST}`); // eslint-disable-line no-console
  });
});
