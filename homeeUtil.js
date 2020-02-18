module.exports = function (RED) {

    const Utils = {
        GetVirtualHomee: 0,
        GetAttributesForProfile: 1
    }

    function HomeeUtil(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function (msg) {
            const util = parseInt(config['util']);

            switch (util) {
                case Utils.GetVirtualHomee:
                    this.sendVirtualHomee();
                    break;
                case Utils.GetAttributesForProfile:
                    this.sendAttributesForProfile(msg)
                    break;
            }
        });

        this.sendVirtualHomee = () => {
            let homee = RED.nodes.getNode(config['virtual-homee']);
            node.send({ payload: { homee } });
        }

        this.sendAttributesForProfile = (msg) => {
            if (msg.payload.all !== undefined) {
                let nodeWithProfile = msg.payload.all.nodes.find((n) => n.profile == config['profile']);
                if (nodeWithProfile !== undefined && nodeWithProfile !== null)
                    node.send({ payload: nodeWithProfile.attributes });
                else
                    node.error("You don't have a device that matches the selected profile.");

            }
        }
    }

    RED.nodes.registerType("homeeUtil", HomeeUtil);
}