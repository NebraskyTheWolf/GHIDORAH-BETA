const fs = require('node:fs');
const path = require('node:path');

class FileHelper {
    _loadFile(paths, folder, collection) {
        const objectPath = path.join(paths, folder);
        const objectFile = fs.readdirSync(objectPath).filter(file => file.endsWith('.js'));

        for (const file of objectFile) {
            const filePath = path.join(objectPath, file);
            const object = require(filePath);

            if (object.type === "event") {
                if (object.once) {
                    client.once(object.name, (...args) => object.execute(...args));
                } else {
                    client.on(object.name, (...args) => object.execute(...args));
                }
            }
            else if (object.type === "command") {
                client.api.applications(client.user.id).commands.post({
                    data: {
                        name: object.name,
                        description: object.description,
                        //userPermissions: object.userPermissions,
                        options: object.commandOptions,
                    },
                });
                collection.set(object.name, object);
            } else {
                collection.set(object.name, object);
            }
        }
    }
}

module.exports = new FileHelper();