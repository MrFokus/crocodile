import ws from "ws"
import {v4 as uuid} from "uuid"
import * as util from "util";

const rooms = {
    // "KJFK": {
    //     all_players: [],
    //     leader: name,
    //     pause: undefined,
    //     timer: undefined,
    //     round: null,
    //     total_round: total_round,
    //     difficulty: difficulty,
    //     teams: [
    //         red: { score: 0, players: [] },
    //         blue: { score: 0, players: [] },
    //         green: { score: 0, players: [] },
    //         yellow: { score: 0, players: [] }
    //     ],
    // },
}
const colorTeams = ['red', 'blue', 'green', 'yellow', 'brown', 'purple']
const {Server} = ws //забираем сервер из ws

const createLobby = (name, total_round, difficulty) => {
    let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let rs = "";
    let isUnique = false
    while (isUnique === false) {
        while (rs.length < 4) {
            rs += abc[Math.floor(Math.random() * abc.length)];
        }

        if (rooms[rs] !== undefined) {
            rs = '';
        } else {
            rooms[rs] = {
                all_players:{

                },
                leader: name,
                pause: undefined,
                timer: undefined,
                round: null,
                total_round: total_round,
                difficulty: difficulty,
                teams: {},
            }
            for (let i = 0; i < total_round; i++) {
                rooms[rs]['teams'][colorTeams[i]] = {
                    score: 0,
                    players: [],
                }
            }

            isUnique = true
        }

    }
    console.log(rooms[rs]);
    return {
        func: 'onRoute',
        rs
    };

}
const JoinTeam = (lobby, new_team, old_team, user, socket) => {
    if (new_team!=="" || rooms[lobby].teams[new_team].players[user] === undefined) {
        rooms[lobby].teams[new_team].players[user] = {
            socket: socket,
            rounds: [
                {
                    word: '',
                    isEnd: undefined,
                }
            ]
        }

    }
    if (old_team !== '') {
        delete rooms[lobby].teams[old_team].players[user];
    }
    let r = {}
    for (let i = 0; i < Object.keys(rooms[lobby].teams).length; i++) {
        r[colorTeams[i]] = Object.keys(rooms[lobby].teams[colorTeams[i]].players).length;
    }
    //console.log(util.inspect(rooms, {showHidden: false, depth: null, colors: true}))
    console.log(r)
    return {
        r,
        func:"onJoinTeam"
    }

}
const recoveryTeam = (lobby) => {
    let players_teams = {}
    for (let i = 0; i < Object.keys(rooms[lobby].teams).length; i++) {
        players_teams[colorTeams[i]] = Object.keys(rooms[lobby].teams[colorTeams[i]].players).length;
    }
    return {
        players_teams,
        func: "onRecoveryTeam",
    };
}

const wss = new Server({port: 8000}) //создаём сервер на 8000 порту
const messages = [] // хранилище всех сообщений
const clients = {}
let userName='';
let lobby=''
// хранилище индетификаторов клинтов
wss.on("connection", (ws) => { //создаём событие подключения
    const id = uuid(); //генерируем id пользователя(подключения)
    clients[id] = ws;
    //помещаем сокет клиента (не до конца понимаю это)
    console.log(`New client ${id}`);
    //clients[id].send(JSON.stringify(messages)) //для только что подключившихся пользователй посылаем историю сообщений
    ws.on('message', (rawMessage) => { //создвём метод message но не понятно, как обращаться к другим методам, наверное никак
        const content = JSON.parse(rawMessage)//данные с клиента преобразуем в объект

        // console.log(content)
        switch (content.method) {
            case 'createLobby':
                clients[id].send(JSON.stringify(createLobby(content.name, content.total_round, content.difficulty)));
                break
            case 'JoinTeam':
                // console.log(content)
                // console.log(clients[id]);
                let sum = JoinTeam(content.name_lobby, content.new_team, content.old_team, content.user, clients[id]);
                for(let key in rooms[content.name_lobby].all_players) {
                    rooms[content.name_lobby].all_players[key].send(JSON.stringify(sum))
                }
                break;
            case 'recoveryTeam': {
                if(!(content.id_room in rooms)){
                    clients[id].send(JSON.stringify({
                        players_teams:"noLobby",
                        func: "onRecoveryTeam",
                    }))
                    delete clients[id]
                    break
                }
                rooms[content.id_room].all_players[content.name]=ws
                userName=content.name
                lobby=content.id_room;
                console.log(rooms)
                let sum = recoveryTeam(content.id_room)
                rooms[content.id_room].all_players[content.name].send(JSON.stringify(sum))
                break
            }
        }
    })
    ws.on("close", () => { //событие выхода из чата
        console.log(`Client is closed` +rooms[lobby].all_players[userName])
    })
})

