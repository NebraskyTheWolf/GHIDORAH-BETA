const { _loadFile } = require('../utils/FileHelper');
const components = __dirname + '/../components';

module.exports = {
    name: 'ready',
    type: 'event',
    once: true,
    async execute() {
        client.user.setStatus('dnd');
        client.user.setActivity(`*Squeaky*`, { type: "LISTENING" });

        _loadFile(components, 'commands', client.commands);
        _loadFile(components, 'buttons', client.buttons);
        _loadFile(components, 'modals', client.modals);
        _loadFile(components, 'tasks', client.tasks);

        client.user.setStatus('online');
    }
}