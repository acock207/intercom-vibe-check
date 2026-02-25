import WebSocket from 'ws';

const ws = new WebSocket('ws://127.0.0.1:49222');

ws.on('open', function open() {
  console.log('Connected to SC-Bridge');
  ws.send(JSON.stringify({ type: 'auth', token: 'test' }));
});

ws.on('message', function incoming(data) {
  const msg = JSON.parse(data);
  // console.log('Received:', msg); 

  if (msg.type === 'auth_ok') {
    console.log('Authenticated!');
    ws.send(JSON.stringify({ type: 'info' }));
  } else if (msg.type === 'info') {
    const address = msg.info.peerTracAddress;
    console.log('My Address:', address);

    // Run /set_vibe simulation
    const txCmd = `/tx --command '{"op": "set_vibe", "vibe": "Testing Vibe Check App!"}' --sim 1`;
    console.log('Sending TX Simulation:', txCmd);
    ws.send(JSON.stringify({ type: 'cli', command: txCmd }));
    
    // Wait for result
    setTimeout(() => {
        ws.close();
        process.exit(0);
    }, 5000);
  } else if (msg.type === 'cli_result') {
      console.log('CLI Result:', JSON.stringify(msg, null, 2));
  }
});

ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
});
