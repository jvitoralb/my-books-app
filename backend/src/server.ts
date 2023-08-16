import http from 'node:http';
import app from './app';


const server = http.createServer(app);
const PORT = 3000;


server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}...`);
});