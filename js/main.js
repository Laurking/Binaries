$(function(){

	var second=200;
	var listeItems=$("#loading li").length;
	var userAnswer="";
	load=new Loading(second,listeItems);
	var playerturn=-1;
	var counter=0;
	var increment=-1;

	$("#setting").click(function(){$("#load").slideToggle();$("#morePlayers").html("<h3 class=\"morePlayers\"><a href=\"#\">Multi-players</a></h3>")});
	$('#menu_ic').click(function(){$("#navigation").slideToggle();})
	$("#reset").click(function(){reset();})
	$("form").submit(function(event){event.preventDefault();})
	$('button').click(function(event){event.preventDefault()})
	$("#onePlayer").click(function(){multiUsers();})

	$(".morePlayers").click(function(){$(this).parent().html("<h5>How many players: </h5><section id=\"userChoice\"><button class=\"choiceOne\">+2</button><button class=\"choiceTwo\">+3</button><button class=\"choiceThree\">+4</button></section><a id=\"goback\" href=\"#\"><h5>or Go back</h5></a>")});
	$("#morePlayers").on("click","#goback",function(){$("#morePlayers").html("<h3 class=\"morePlayers\"><a href=\"#\">Multi-players</a></h3>")})

	$("#morePlayers").on("click",".morePlayers",function(){
		$(this).parent().html("<h5>How many players: </h5><section id=\"userChoice\"><button class=\"choiceOne\">+2</button><button class=\"choiceTwo\">+3</button><button class=\"choiceThree\">+4</button></section><a id=\"goback\" href=\"#\"><h5>or Go back</h5></a>")
	})

	$("#morePlayers").on("mouseover","#goback",function(){
		$(this).children("h5").css("color","#444");
	})
	$("#morePlayers").on("mouseout","#goback",function(){
		$(this).children("h5").css("color","black");
	})


	$("#morePlayers").on("click",".choiceOne",function(){
		var userInput=userinput();
		userAnswer=getUserAnswer();
		$("#load").slideToggle();
		$("#options h1").show();
		reset();
		$(".bottom input").hide();
		$("#userInfo form").after(getPlayerName(2));
		player=new Player(1,10,userAnswer,userInput,0);
		$("#options #randomBox").html(player.randomNumber());

	})


	$("#morePlayers").on("click",".choiceTwo",function(){
		var userInput=userinput();
		userAnswer=getUserAnswer();
		$("#load").slideToggle();
		$("#options h1").show();
		reset();
		$(".bottom input").hide();
		$("#userInfo form").after(getPlayerName(3));
		player=new Player(1,10,userAnswer,userInput,0);
		$("#options #randomBox").html(player.randomNumber());

	})

	$("#morePlayers").on("click",".choiceThree",function(){
		var userInput=userinput();
		userAnswer=getUserAnswer();
		$("#load").slideToggle();
		$("#options h1").show();
		reset();
		$(".bottom input").hide();
		$("#userInfo form").after(getPlayerName(4));
		player=new Player(1,10,userAnswer,userInput,0);
		$("#options #randomBox").html(player.randomNumber());

	})


	setInterval(function(){
		var item=$("#loading li")[load.forward()];
		$(item).css("background-color","white");
		$(item).siblings().css("background-color","black");
	},load.pause())


	$(".bulbs").click(function(){
		var currentIndex=$(this).index();
		var currentLight=$(this).children("img").attr('src');
		var myAudio=$("audio")[Math.floor(Math.random()*(5-1+1)+1)]
		light=new lightSwitch(currentLight);
		$(this).children("img").attr('src',light.turnAround());
		$(this).children("h3").html(light.getBinary());
		$($(".first nav ul li")[currentIndex]).html(light.getBinary());
		$("#submitAndReset h2").fadeOut();
		$(myAudio).trigger("play");
		console.log($(myAudio).attr("src"))
		
	})

	$("#output").click(function(){
		var userInput=userinput();
		userAnswer=getUserAnswer();
		interaction=new userInteraction(userInput,userAnswer);
		$(".bottom h1").html("Answer: "+interaction.decimalToBinary())
	});

	$("#selfAssessment").click(function(){
		reset();
		$("#userInfo form").after(getPlayerName(1));
		$("#load").slideToggle();
		$(".bottom input").fadeIn();
		$("#options h1").fadeOut();

	});
	
	
	$('input').focus(function(){
		if ($('#userInfo form input').val().length>0) {$(this).val("");}
	})

	$("#validate").click(function(event){
		event.preventDefault();
		var numberofplayers=numberOfPlayer();
		var count=playerCount();
		var newTurn=$($("#userInfo section")[count]);
		var name=$('#userInfo form input').val();
		if ((name.length==0 || name=="Enter a value")) {
			$('#userInfo form input').val("Enter a value");
		}
		else{
			$(newTurn).children(".name").html(name);
			$(newTurn).children(".score").html("Score: ");
			$(newTurn).children(".value").html("0");
			$('#userInfo form input').val("");
		}
		
	})


//audio control buttons selectors

$("#on").click(function(){
	$("audio").each(function(){
		$("audio").prop("muted",false)
	})
})

$("#off").click(function(){
	$("audio").each(function(){
		$("audio").prop("muted",true)
	})
})


	$("#submit").click(function(){
		var userInput=userinput();
		userAnswer=getUserAnswer();
		var numberofplayers=numberOfPlayer();
		var count=playerCount();
		var newTurn=$($("#userInfo section")[count]);
		interaction=new userInteraction(userInput,userAnswer);
		var checkanswer=interaction.checkAnswer();
		$("#submitAndReset h2").fadeIn();
		$("#submitAndReset h2").html(checkanswer);
		$("#submitAndReset h2").css("color",interaction.highlight());
		if (checkanswer=="Correct") {
			var testscore=parseInt($(newTurn).children(".value").html());
			player=new Player(1,10,userAnswer,userInput,testscore);
			$(newTurn).children(".value").html(player.testScore());
			$("#congrats").trigger("play")
		}
		
		$("#options #randomBox").html(player.randomNumber())
		console.log($("#options #randomBox").html());
		$(".bulbs").children("img").attr('src',"img/off_bulb.png");
		userAnswer=interaction.resetUserAnswer();

	})


	function getUserAnswer(){
		$(".first nav ul li").each(function(){
			userAnswer+=$(this).html();
		})
		return userAnswer;
	}
	function counting(){
		counter+=1;
		if (counter>=numberOfPlayers) {
			counter=0;
		};
	}
	function getPlayerName(numberOfPlayers){
		var string="";
		for(var i=0;i<numberOfPlayers;i++){
			string+="<section><h1 class=\"name\"></h1><h1 class=\"score\"></h1><h1 class=\"value\"></h1></section>";
		}
		return string;
	}

	function formatting(userInput){
		var index=0;
		for (var i = 0; i < userInput.length; i++) {
			if (userInput.charAt(i)=="1") {
				index=i;
				break;
			}
		};
		return userInput.substring(index,userInput.length);
	}



	function reset(){
		light=new lightSwitch("img/off_bulb.png");
		binary=new Binary();
		$(".bulbs img").attr("src",light.resetAllLight());
		$(".bulbs h3").html(binary.switchOff())
		$(".first nav ul li").html(binary.switchOff())
		$("#userInfo section").remove();
		$("#morePlayers").html("<h3 class=\"morePlayers\"><a href=\"#\">Multi-players</a></h3>");
		$("#submitAndReset h2").html("");
		$(".bottom input").val('');
		$(".bottom h1").html('');
	}

	function multiUsers(){
		var userInput=userinput();
		userAnswer=getUserAnswer();
		$("#load").slideToggle();
		$("#options h1").show();
		reset();
		$(".bottom input").hide();
		$("#userInfo form").after(getPlayerName(1));
		player=new Player(1,10,userAnswer,userInput,0);
		$("#options #randomBox").html(player.randomNumber());
	}

	function userinput(){
		var userInput=$(".bottom input").val();
		var inputDisplay=$(".bottom input").css("display");
		if (inputDisplay=="none") {
			userInput=$("#options #randomBox").html();
		}
		return userInput;
	}


	$("#background").on('change',function(){
		$(getHtmlId($(this).val())).css("background-color",$("#color").val())
	})
	$("#color").on('change',function(){
		$(getHtmlId($("#background").val())).css("background-color",$("#color").val())
	})

	function getHtmlId(value){
		switch(value){
			case "Header background":return "#headBar";break;
			case "Light bulbs background":return ".bulbs img" ;break;
			case "Output background":return "#middle .first";break;
			case "Footer background":return "footer .foot2";break;
		}
	}

	function numberOfPlayer(){
		return $("#userInfo").children("section").length;
	}


	function playerCount(){
		counter+=1;
		if (counter>=numberOfPlayer()) {
			counter=0;
		};
		return counter;
	}


	function Player(numberOfPlayers,randrange,userAnswer,userInput,score){
		this.numberOfPlayers=numberOfPlayers;
		this.turn=0;
		this.randrange=randrange;
		this.score=score;
		this.gameLevel="Beginner";
		this.interaction=new userInteraction(userInput,userAnswer);

		this.playerTurn=function(){
			this.turn++;
			if (this.turn>=this.numberOfPlayers) {
				this.turn=0;
			}
			return this.turn;
		}
		this.testScore=function(){
			return this.score+10;
		}
		this.randomNumber=function(){

			if (this.score<30) {
				this.randrange=15;
				this.gameLevel="Beginner";
				return Math.floor(Math.random() * (this.randrange - 1 + 1)) + 1;
			}
			else if (this.score>=30 && this.score<70) {
				this.randrange=64;
				this.gameLevel="Medium";
				return Math.floor(Math.random() * (this.randrange - 32 + 32)) + 32;

			}
			else if (this.score>=70 && this.score<=100){
				this.randrange=128;
				this.gameLevel="Advance";
				return Math.floor(Math.random() * (this.randrange - 65 + 65)) + 65;
			}

		}
		this.getLevel=function(){
			return this.gameLevel;
		}


	}



	function userInteraction(userInput,userAnswer){
		this.userInput=userInput;
		this.userAnswer=userAnswer;

		this.validAnswer=function(){
			if (this.userInput=="" || this.userInput==null || this.userInput=="Enter a value") {
				return false;
			}
			return true;
		}
		this.userNotification=function(){
			if (this.validAnswer()==true) {
				return this.userInput;
			}
			return "No value enter"
		}
		this.decimalToBinary=function(){
			if (this.validAnswer()==true) {
				return (parseInt(this.userInput)>>>0).toString(2);
			}
			else{
				return "No value entered";
			}
		}
		this.checkAnswer=function(){
			if (this.validAnswer()) {
				if (this.decimalToBinary()==formatting(this.userAnswer)) {
					return "Correct";
				}
				else{
					return "Incorrect"
				}
			}
			else{
				return "No value Entered";
			}

		}
		this.resetUserAnswer=function(){
			this.userAnswer="";
			return this.userAnswer;
		}
		this.highlight=function(){
			if (this.checkAnswer()=="Correct") {
				return "green";
			};
			return "red";
		}
	}



	function Binary(){
		this.on=1;
		this.off=0;
		this.switchOn=function(){
			return this.on;
		}
		this.switchOff=function(){
			return this.off;
		}
	}

	function lightSwitch(currentLight){
		this.lightOn="img/lit_bulb.png";
		this.lightOff="img/off_bulb.png";
		this.currentLight=currentLight;
		this.bin_number=new Binary();
		this.turnAround=function(){
			if (this.currentLight==this.lightOff) {
				return this.lightOn;
			}
			return this.lightOff;
		}
		this.getBinary=function(){
			if (this.turnAround()==this.lightOff) {
				return this.bin_number.switchOff();
			}
			return this.bin_number.switchOn();
		}
		this.resetAllLight=function(){
			return this.lightOff;
		}
	}

	function Loading(second,length){
		this.second=second;
		this.count=0;
		this.forward=function(){
			this.count++;
			if (this.count>=length) {
				this.count=0;
			}
			return this.count;
		}

		this.pause=function(){
			return this.second;
		}

	}


});






