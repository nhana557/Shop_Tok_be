import dotenv from 'dotenv';
import app from './app.js';

const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 20) {
	console.log('Please upgrade your node.js version at least 20 or greater. 👌\n ');
	process.exit();
}

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

// Start our app!
app.set('port', process.env.PORT || 8001);
const server = app.listen(app.get('port'), () => {
	console.log(`Express running → On PORT : ${server.address().port}`);
});
