import * as http from 'http';
import { EventEmitter } from 'events';

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Interface for the fetched data
interface UserData {
    id: number;
    name: string;
}

// Function to simulate asynchronous task (e.g., fetching data from a database)
function fetchData(callback: (data: UserData) => void): void {
    setTimeout(() => {
        const data: UserData = { id: 1, name: 'John Doe' };
        callback(data);
    }, 1000);
}

// Register a listener for the 'requestData' event
eventEmitter.on('requestData', (res: http.ServerResponse) => {
    // Simulate fetching data asynchronously
    fetchData((data) => {
        // Send the response with the fetched data
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    });
});

// Create a web server
const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === '/data') {
        // Emit the 'requestData' event when '/data' endpoint is hit, passing the response object
        eventEmitter.emit('requestData', res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
