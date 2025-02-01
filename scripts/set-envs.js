const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();


const targetPath = 'src/environments/environment.ts';

const envFileContent = `
export const environment = {
  maptiler_key: "${ process.env.maptiler_key }",
  otra: "PRIOPIEDAD",
};
`
mkdirSync('./src/environments', {recursive: true });

writeFileSync( targetPath, envFileContent );

