var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(require('path').join(__dirname + "/views/canvas.html"));
});

const all_players = {}; // { id : Player() }
const match_queue = []; // queue for waiting for game

class Player {
  
  constructor(socket, name, id) {
    this.socket = socket;
    this.id = id;
    this.name = name;
  }

  //generates a unique id
  static generate_id() {
    let possible_id = (Math.random()*0xFFFFFF<<0).toString(16);
    while( Object.keys(all_players).indexOf(possible_id) != -1)
      possible_id = (Math.random() *0xFFFFFF<<0).toString(16);
    return possible_id;
  }

  //gets a player ID given a socket
  static get_id_by_socket(socket) {
    for( const [id, play] of Object.entries(all_players)) {
      if(play.sock == socket)
        return id;
    }
    return "GGGGGG";
  }

  //returns player socket
  get sock() {
    return this.socket;
  }

  //returns opponent id
  get_opponent() {
    return this.opponent; 
  }

  //matches player with opponent of given ID
  match_opponent(id) {
    this.opponent = id;
    console.log(this.id + " is now matched with " + id);
  }

}

io.on('connection', function(socket){
    console.log('a user connected');

    //fired up whenever the player moves
    socket.on('information', (info)=> {
      const _player = all_players[Player.get_id_by_socket(socket)];
      //relay player info to its opponent
      console.log(info);
      all_players[_player.get_opponent()].sock.emit('information',info);
    });

    socket.on('register', (name)=> {
      //expects a name from the user
      //registers the new user into the queue and player list
      const _id = Player.generate_id();
      all_players[_id] = new Player(socket, name, _id);

      //matches them with a player or puts them in queue
      if( match_queue.length <= 0) {
        match_queue.push(_id);
      } else {
        const _opponent_id = match_queue.shift();
        all_players[_id].match_opponent(_opponent_id);
        all_players[_opponent_id].match_opponent(_id);
      }
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

app.use("/",express.static('public'));
