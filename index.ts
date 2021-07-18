import mongoose from 'mongoose';

import createApp from './app';

const { DB_URI, PORT } = process.env as {
  DB_URI: string;
  PORT: string;
};

if (typeof DB_URI === 'undefined') {
  process.stderr.write('No parameter process.env.URI\n');
  process.exit(1);
}

if (typeof PORT === 'undefined') {
  process.stderr.write('No parameter process.env.PORT\n');
  process.exit(1);
}

async function start(): Promise<void> {
  try {
    await mongoose.connect(DB_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    createApp().listen(+PORT, () => {
      process.stdout.write(`http://localhost:${PORT}\n`);
    });
  } catch (error) {
    process.stderr.write(`${error}\n`);
    process.exit(1);
  }
}

start();
