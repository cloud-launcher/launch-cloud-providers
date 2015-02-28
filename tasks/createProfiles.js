import fs from 'fs';
import promise from 'promise-callback';

module.exports = (gulp) => {
  gulp.task('createDOProfile', ['runtime'], () => {
    const createProfile = require('../.dist/providers/digitalocean');

    return createProfile(new require('do-wrapper'), process.env.DO_TOKEN)
      .then(
        profile => promise(fs.writeFile,
                            './profiles/digitalocean.json',
                            JSON.stringify(profile, null, '  ')),
        error => console.log('Error creating digitalocean profile', error.stack));
  });
};