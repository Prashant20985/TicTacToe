
const url = 'http://localhost:8080';
let gameId;
let stompClient;
let playerType;

function connectToSocket(gameId) {
    console.log("connecting...")
    let socket = new SockJS(url +"/gameplay");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame){
        console.log("Connected to Frame" + frame);
        stompClient.subscribe("/topic/game-progress/"+ gameId , function (response){
            let data = JSON.parse(response.body);
            console.log(data);
            displayResponse(data);
        })
    })

}

function createGame() {
    let login = document.getElementById("login").value;
    if(login==null || login===''){
        alert("Please enter login");
    }
    else {
        $.ajax({
            url:url+"/game/start",
            type : 'POST',
            dataType: "json",
            contentType:"application/json",
            data: JSON.stringify({
                "login": login
            }),
            success : function (data){
                gameId = data.gameId;
                playerType = 'X';
                reset();
                connectToSocket(gameId);
                alert("You Created a game, Game Id is" + data.gameId);
                gameOn = true;
            },
            error : function (error){
                console.log(error);
            }

        })
    }
}

function connectToRandom(){
    let login = document.getElementById("login").value;
    if(login==null || login===''){
        alert("Please enter login");
    }
    else {
        $.ajax({
            url:url+"/game/connect/random",
            type : 'POST',
            dataType: "json",
            contentType:"application/json",
            data: JSON.stringify({
                "login": login
            }),
            success : function (data){
                gameId = data.gameId;
                playerType = 'O';
                reset();
                connectToSocket(gameId);
                alert("You're playing with: " + data.player1.login);
            },
            error : function (error){
                console.log(error);
            }

        })
    }

}

function connectToSpecificGame() {
    let login = document.getElementById("login").value;
    if(login==null || login===''){
        alert("Please enter login");
    }
    else {
        let gameId = document.getElementById("game_id");
        if(login==null || login===''){
            alert("Please enter login");
        }
        $.ajax({
            url:url+"/game/connect",
            type : 'POST',
            dataType: "json",
            contentType:"application/json",
            data: JSON.stringify({
                "player": {
                    "login": login
                },
                "gameId": gameId
            }),
            success : function (data){
                gameId = data.gameId;
                playerType = 'O';
                reset();
                connectToSocket(gameId);
                alert("You're playing with: " + data.player1.login);
            },
            error : function (error){
                console.log(error);
            }

        })
    }
}
