module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const users = client.guilds.cache.reduce((size, g) => size + g.memberCount, 0);
        const guilds = client.guilds.cache.size;
        const statusArray = [
            {
                type: 'WATCHING',
                content: 'progression being made.',
                status: 'dnd'
            },
            {
                type: 'WATCHING',
                content: `over ${users} members.`,
                status: 'dnd'
            },
            {
                type: 'WATCHING',
                content: `over ${guilds} servers.`,
                status: 'dnd'
            }
        ];


        async function pickPrecense() {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type
                        },
                    ],
                    status: statusArray[option].status
                });
            } catch (error) {
                console.error(error);
            }
        }

        setInterval(pickPrecense, 8 * 1000);
        console.log(`Bot is online.`)
    },
};