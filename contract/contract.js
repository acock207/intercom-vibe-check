import {Contract} from 'trac-peer'

class VibeContract extends Contract {
    constructor(protocol, options = {}) {
        super(protocol, options);

        // Register the setVibe function with a schema
        this.addSchema('setVibe', {
            value: {
                $$strict: true,
                $$type: "object",
                vibe: { type: "string", min: 1, max: 256 }
            }
        });

        // Register helper functions
        this.addFunction('readVibe');
    }

    async setVibe() {
        const vibe = this.value.vibe;
        const address = this.address; // The sender's address

        // Store the vibe
        await this.put('vibe/' + address, vibe);
        
        console.log(`Vibe set for ${address}: ${vibe}`);
    }

    async readVibe() {
        const address = this.value.address;
        const vibe = await this.get('vibe/' + address);
        console.log(`Vibe for ${address}: ${vibe}`);
    }
}

export default VibeContract;
