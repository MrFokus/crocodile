import ws from "ws"
import {v4 as uuid} from "uuid"
import * as util from "util";
import pg from 'pg'

const rooms = {
    // "KJFK": {
    //     all_players: [],
    //     leader: name,
    //     pause: undefined,
    //     timer: undefined,
    //     round: null,
    //     total_round: total_round,
    //     difficulty: difficulty,
    //     all_round:null,
    //     team_game:1,
    //     word:null,
    //     index_game_player:null,
    //     all_word:[],
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
const Pool = pg.Pool
const connection = new Pool({
    user: 'german',
    host: 'localhost',
    database: 'crocodile',
    password: '',
    port: 5432,
})

const createLobby = (name, total_round = 3, difficulty) => {
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
                all_players: {},
                leader: name,
                pause: true,
                timer: 300,
                round: 0,
                game: "connection",
                total_round: 3,
                difficulty: difficulty,
                all_round: null,
                team_game: 0,
                word: null,
                index_game_player: 0,
                teams: {},
                all_word: [],
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
const reqBD = async (newArr, difficulty) => {
    let res = await connection.query(`SELECT word FROM "${difficulty}"
    WHERE id in (${newArr});`)
    return await res.rows;
}
const getWord = async (lobby) => {
    let teams = recoveryTeam(lobby).players_teams
    let players = 0
    for (let i = 0; i < +rooms[lobby].total_round; i++) {
        for (let j = 0; j < Object.keys(rooms[lobby].teams).length; j++) {
            players += Object.keys(rooms[lobby].teams[colorTeams[j]].players).length
        }
    }
    let random_start = 1; // От какого генерировать
    let random_end = 145; // До какого генерировать

    let all_cycles = players;

    let array = []

    for (let i = random_start; i <= random_end; i++) {
        array.push(i)
    }
    let newArr = []
    for (let countCycles = 1; countCycles <= all_cycles; countCycles++) {
        newArr.push(array.splice(Math.random() * array.length, 1)[0])
    }
    console.log(newArr);
    let difficulty;
    if (rooms[lobby].difficulty === 1) {
        difficulty = 'EasyWords';
    } else if (rooms[lobby].difficulty === 2) {
        difficulty = 'NormalWords';
    } else if (rooms[lobby].difficulty === 3) {
        difficulty = 'HardWords';
    } else {
        return
    }
    let res = await reqBD(newArr, difficulty)
    await res.forEach(val => {
        rooms[lobby].all_word.push(val.word)
    })
    console.log(res)
    console.log(rooms[lobby].all_word);
    //     .then(r => r.forEach(val=>{
    //     rooms[lobby].all_word.push(val.word)
    // }))

}

const Game = (lobby) => {

    // if(rooms[lobby].team_game===Object.keys( rooms[lobby].teams).length&& rooms[lobby].index_game_player===Object.keys(rooms[lobby].teams[colorTeams[rooms[lobby].team_game]].players).length){
    //     rooms[lobby].index_game_player=0;
    //     rooms[lobby].team_game=0;
    //     Game(lobby)
    // }
    //
    if (Object.keys(rooms[lobby].teams[colorTeams[rooms[lobby].team_game]].players).length === 0 || rooms[lobby].index_game_player === Object.keys(rooms[lobby].teams[colorTeams[rooms[lobby].team_game]].players).length || (rooms[lobby].team_game === (Object.keys(rooms[lobby].teams).length) - 1 && rooms[lobby].index_game_player === Object.keys(rooms[lobby].teams[colorTeams[rooms[lobby].team_game]].players).length)) {
        if (rooms[lobby].round === Object.keys(rooms[lobby].all_players).length * rooms[lobby].total_round) {
            setTimeout(()=>{
                for (let key in rooms[lobby].all_players) {
                    rooms[lobby].all_players[key].send(JSON.stringify({
                        func: 'EndGame',
                        status_game:'end',
                    }))

                }
                rooms[lobby].game = "end";
                delete rooms[lobby]
                console.log(rooms,"end")
            },3000)

            return;
        }
        if (rooms[lobby].team_game === (Object.keys(rooms[lobby].teams).length) - 1) {
            rooms[lobby].index_game_player = 0;
            rooms[lobby].team_game = 0;
        } else {
            rooms[lobby].index_game_player = 0;
            rooms[lobby].team_game++;
        }
        Game(lobby)
    } else {
        rooms[lobby].word = rooms[lobby].all_word[rooms[lobby].round];
        rooms[lobby].all_players[Object.keys(rooms[lobby].teams[colorTeams[rooms[lobby].team_game]].players)[rooms[lobby].index_game_player]].send(JSON.stringify({
            word: rooms[lobby].word.toUpperCase(),
            func: 'onHiddenWord',
        }));
        rooms[lobby].round++;
        rooms[lobby].index_game_player++;
    }


    // if ((Object.keys(rooms[lobby].teams[colorTeams[rooms[lobby].team_game]].players).length !== 0)&&!((rooms[lobby].index_game_player===(Object.keys(rooms[lobby].teams[colorTeams[rooms[lobby].team_game]].players).length))&&(rooms[lobby].team_game===(Object.keys( rooms[lobby].teams).length)-1))) {
    //     // }//Если команда не пустая или индекс игрока не привышает размер массива игроков
    //     rooms[lobby].word=rooms[lobby].all_word[rooms[lobby].round];
    //     rooms[lobby].all_players[Object.keys(rooms[lobby].teams[colorTeams[rooms[lobby].team_game]].players)[rooms[lobby].index_game_player]].send(JSON.stringify({
    //         word: rooms[lobby].word.toUpperCase(),
    //         func: 'onHiddenWord',
    //     }));
    //     rooms[lobby].round++;
    //     rooms[lobby].index_game_player++;
    // }
    // else {
    //     if(rooms[lobby].team_game===(Object.keys( rooms[lobby].teams).length)-1){
    //         rooms[lobby].index_game_player=0;
    //         rooms[lobby].team_game=0;
    //     }
    //     else {
    //         rooms[lobby].index_game_player = 0;
    //         rooms[lobby].team_game++;
    //     }
    //     Game(lobby)
    // }


    //
    //
    // if(rooms[lobby].index_game_player!==Object.keys(rooms[lobby].teams[colorTeams[rooms[lobby].team_game]].players).length|| Object.keys(rooms[lobby].teams[colorTeams[rooms[lobby].team_game]].players).length!==0){
    //     rooms[lobby].round++;
    //     rooms[lobby].word=rooms[lobby].all_word[rooms[lobby].round];
    //     rooms[lobby].index_game_player++;
    //     console.log(rooms[lobby].word);
    //     rooms[lobby].all_players[Object.keys( rooms[lobby].teams[colorTeams[rooms[lobby].team_game]].players)[rooms[lobby].index_game_player-1]].send(JSON.stringify({
    //         word: rooms[lobby].word.toUpperCase(),
    //         func: 'onHiddenWord',
    //     }));
    // }
    // else{
    //     if(rooms[lobby].team_game===Object.keys( rooms[lobby].teams).length){
    //         rooms[lobby].team_game=0
    //     }
    //     rooms[lobby].team_game++;
    //     rooms[lobby].index_game_player=0
    //     Game(lobby)
    // }


}

const JoinTeam = (lobby, new_team, old_team, user) => {
    if (new_team !== "" || rooms[lobby].teams[new_team].players[user] === undefined) {
        rooms[lobby].teams[new_team].players[user] = {
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
        func: "onJoinTeam"
    }

}
const timer = (lobby) => {
    if (rooms[lobby].pause === false) {
        let timerId = setInterval(() => {
            let res = new Date(rooms[lobby].timer * 1000).toISOString().substring(14, 19)
            if(rooms[lobby].pause===true){
                clearInterval(timerId);
                return 0;
            }
            if (rooms[lobby].timer === 0) {
                console.log("Stop")
                for (let key in rooms[lobby].all_players) {
                    rooms[lobby].all_players[key].send(JSON.stringify({
                        func: "onNoAnswer",
                        word: rooms[lobby].word,
                    }))
                }
                clearInterval(timerId);
                setTimeout(()=>{
                    Game(lobby)
                },4000)

                return 0;

            }
            for (let key in rooms[lobby].all_players) {
                if (Object.keys(rooms[lobby].all_players).length !== 0) {
                    rooms[lobby].all_players[key].send(JSON.stringify({
                        func: "onTimer",
                        time: res,
                    }))
                }
            }

            rooms[lobby].timer--;
        }, 1000)
    }

}
// timer();
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
const ScoreTable = (lobby) => {
    let score_table = {}
    for (let i = 0; i < Object.keys(rooms[lobby].teams).length; i++) {
        score_table[colorTeams[i]] = rooms[lobby].teams[colorTeams[i]].score;
    }
    return {
        score_table,
        func: "onScoreTable",
    };
}
const wss = new Server({port: 8000}) //создаём сервер на 8000 порту
const clients = {}
let userName = '';
let lobby = ''
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
                try {
                    clients[id].send(JSON.stringify(createLobby(content.name, content.total_round, content.difficulty)));
                    break
                } catch (e) {
                    console.log("Error in CreateLobby", e)
                    break;
                }
            case 'JoinTeam':
                // console.log(content)
                // console.log(clients[id]);
                try {
                    let sum = JoinTeam(content.name_lobby, content.new_team, content.old_team, content.user);
                    for (let key in rooms[content.name_lobby].all_players) {
                        rooms[content.name_lobby].all_players[key].send(JSON.stringify(sum))
                    }
                    break;
                } catch (e) {
                    console.log("Error in JoinTeam", e)
                    break;
                }

            case 'recoveryTeam':
                try {
                    if (!(content.id_room in rooms)) {
                        clients[id].send(JSON.stringify({
                            players_teams: "noLobby",
                            func: "onRecoveryTeam",
                        }))
                        delete clients[id]
                        break
                    }
                    rooms[content.id_room].all_players[content.name] = ws
                    if (rooms[content.id_room].game === "in_process") {
                        rooms[content.id_room].all_players[content.name].send(JSON.stringify({
                            func: "StartGame",
                        }))
                    } else {

                        userName = content.name
                        lobby = content.id_room;
                        console.log(rooms)
                        let sum = recoveryTeam(content.id_room)
                        rooms[content.id_room].all_players[content.name].send(JSON.stringify(sum))
                    }
                    break
                } catch (e) {
                    console.log("Error in recovery teams", e)
                    break;
                }
            case 'StartGame':
                try {
                    async function SG() {
                        rooms[content.name_lobby].game = "in_process"
                        // rooms[content.name_lobby].timer = 10;
                        await getWord(content.name_lobby);
                        for (let key in rooms[content.name_lobby].all_players) {
                            rooms[content.name_lobby].all_players[key].send(JSON.stringify({
                                func: "StartGame",
                                status_game:'in_process',
                            }))
                        }
                        await Game(content.name_lobby);
                        // await timer(content.name_lobby);
                    }

                    SG();
                    break;
                } catch (e) {
                    console.log("Error in start game", e)
                    break;
                }
            case 'ScoreTable': {
                try {
                    for (let key in rooms[content.name_lobby].all_players) {
                        rooms[content.name_lobby].all_players[key].send(JSON.stringify(ScoreTable(content.name_lobby)))
                    }
                    break;
                } catch (e) {
                    console.log('Score table', e)
                    break;
                }
            }
            case 'Ready': {
                try {
                    rooms[content.name_lobby].timer=10
                    rooms[content.name_lobby].pause = false;
                    timer(content.name_lobby);
                    for (let key in rooms[content.name_lobby].all_players) {
                        rooms[content.name_lobby].all_players[key].send(JSON.stringify({
                            func: "Answer",
                        }))
                    }
                    break;
                } catch (e) {
                    console.log('Score table', e)
                    break;
                }
            }
            case 'GiveUp': {
                try {
                    for (let key in rooms[lobby].all_players) {
                        rooms[lobby].all_players[key].send(JSON.stringify({
                            func: "onNoAnswer",
                            word: rooms[lobby].word,
                        }))
                    }
                        rooms[content.name_lobby].timer = 0;
                        setTimeout(()=>{
                            Game(content.name_lobby);
                        },4000)

                    break;
                } catch (e) {
                    console.log('Score table', e)
                    break;
                }
            }
            case 'Answer': {
                try {
                    if(content.word===rooms[content.name_lobby].word){
                        rooms[content.name_lobby].teams[content.team].score++;
                        for (let key in rooms[content.name_lobby].all_players) {
                            rooms[content.name_lobby].all_players[key].send(JSON.stringify({
                                func: "onRightAnswer",
                                word: rooms[content.name_lobby].word,
                                score_table: ScoreTable(content.name_lobby).score_table
                            }))
                        }
                        rooms[content.name_lobby].pause=true;
                        rooms[content.name_lobby].timer = 0;
                        setTimeout(()=>{
                            Game(content.name_lobby);
                        },4000)


                    }
                    break;

                } catch (e) {
                    console.log('Score table', e)
                    break;
                }
            }
        }
    })
    ws.on("close", () => { //событие выхода из чата
        try {
            console.log(`Client is closed ` + userName + ` in room ` + lobby)
            delete rooms[lobby].all_players[userName]
        } catch (e){
            console.log(e)
        }

    })
})

