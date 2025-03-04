import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from '../models/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const umzug = new Umzug({
  migrations: {
    glob: path.join(__dirname, '[0-9]*.js'),
    pattern: /^\d+[\w-]+\.js$/,
    resolve: ({ path, context }) => {
      const migrationName = path.split('/').pop().replace('.js', '');
      return {
        name: migrationName,
        up: async () => {
          const migration = await import(`file://${path}`);
          return migration.up(context.queryInterface, context.Sequelize);
        },
        down: async () => {
          const migration = await import(`file://${path}`);
          return migration.down(context.queryInterface, context.Sequelize);
        }
      };
    },
  },
  context: {
    queryInterface: sequelize.getQueryInterface(),
    Sequelize: sequelize.Sequelize
  },
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
  dir: __dirname
});

umzug.on('migrating', (event) => {
  console.log('Full migration event:', event);
});

export default umzug; 