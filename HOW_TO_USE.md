# How to Use Vibe Check App

Welcome to the **Vibe Check App**! This application allows you to broadcast your current "vibe" (mood/status) to the decentralized Trac network and check the vibes of other users.

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have the **Pear Runtime** installed.
- **Windows**: `npm install -g pear`
- **Mac/Linux**: `npm install -g pear`

### 2. Run the App
Open your terminal in the project directory and run the following command to start your peer:

```powershell
pear run . --peer-store-name admin --msb-store-name admin-msb --subnet-channel vibe-check-v1 --sc-bridge 1 --sc-bridge-token test --sc-bridge-cli 1
```

*   `--peer-store-name`: Name of your local storage.
*   `--subnet-channel`: The shared network channel (`vibe-check-v1`).
*   `--sc-bridge`: Enables WebSocket bridge for tools.
*   `--sc-bridge-cli 1`: Enables controlling the CLI via WebSocket (required for some tools).

---

## 🎮 Features & Commands

Once the app is running, you can interact with it using the CLI commands.

### 1. Set Your Vibe (Transaction)
Broadcast your current vibe to the network. This updates the contract state.

*   **Simulate (Free)**: Test without spending TNK.
    ```text
    /tx --command '{"op": "set_vibe", "vibe": "Feeling fantastic! 🚀"}' --sim 1
    ```

*   **Broadcast (Real)**: Save permanently (Requires ~0.03 TNK fee).
    ```text
    /tx --command '{"op": "set_vibe", "vibe": "Feeling fantastic! 🚀"}'
    ```

### 2. Get Vibe (Query)
Check the vibe of any user by their Trac address. This is free and reads from your local state replica.

*   **Command**:
    ```text
    /get_vibe --address "<trac_address>"
    ```

*   **Example**:
    ```text
    /get_vibe --address "trac1kqg62pfws0xdlp67vyapavjzzk7wcz3ksn0ky0d5hhaz2h9psmgsklkswz"
    ```

### 3. Check Your Balance
To send real transactions, you need TNK tokens. Check your balance:

*   **Command**:
    ```text
    /msb
    ```

---

## 🧪 Verification Script

We have included a test script `test-vibe.js` to verify that the app and contract are working correctly.

1.  **Ensure the app is running** (see Step 2 above).
2.  **Run the test script** in a separate terminal:
    ```powershell
    node test-vibe.js
    ```
3.  **Expected Output**:
    ```text
    Connected to SC-Bridge
    Authenticated!
    My Address: trac1...
    Sending TX Simulation: ...
    CLI Result: ... "Vibe set for ...: Testing Vibe Check App!"
    ```

---

## 🔧 Technical Details

- **Subnet Channel**: `vibe-check-v1`
- **Contract**: `contract/contract.js` (Logic for storing/retrieving vibes)
- **Protocol**: `contract/protocol.js` (Command mapping for CLI/TX)

Happy Vibing! 🌊
