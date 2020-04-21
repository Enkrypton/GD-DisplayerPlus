function generate(){
	//Retrieve beatmapID
	var url = document.getElementById("beatmap").value;
	var slicedURL = url.toString().split("/");
	var beatmapID = slicedURL.pop();
	
	var key = document.getElementById("api").value;
	
	//Generate API Call
	var apiCall =  "";
	apiCall = apiCall.concat("https://osu.ppy.sh/api/get_beatmaps?k=", key, "&b=", beatmapID);
	
	//JSON Spaghet
	$.getJSON(apiCall, function(data) {
		var bbcode = "";
		
		//fetch diff icon based on SR
		var easy = "[img]https://i.ppy.sh/e04f0284d80f408496c3ab151c71902be9978cbd/68747470733a2f2f6f73752e7070792e73682f68656c702f77696b692f7368617265642f646966662f656173792d732e706e67[/img]";
		var normal = "[img]https://i.ppy.sh/d87f06527a3514beb5d361a0e7f2f76cd7dbd4ae/68747470733a2f2f6f73752e7070792e73682f68656c702f77696b692f7368617265642f646966662f6e6f726d616c2d732e706e67[/img]";
		var hard = "[img]https://i.ppy.sh/f8460f6be7fe5cc4fa65a783212345a96aadb926/68747470733a2f2f6f73752e7070792e73682f68656c702f77696b692f7368617265642f646966662f686172642d732e706e67[/img]";
		var insane = "[img]https://i.ppy.sh/cbe62f5fb1a4589728117720394bdc81d701829c/68747470733a2f2f6f73752e7070792e73682f68656c702f77696b692f7368617265642f646966662f696e73616e652d732e706e67[/img]";
		var extra = "[img]https://i.ppy.sh/e0cbf837e957cd122375e6e27549f6cf9eefc9a7/68747470733a2f2f6f73752e7070792e73682f68656c702f77696b692f7368617265642f646966662f6578706572742d732e706e67[/img]";
		var black = "[img]https://i.ppy.sh/babf781af20497855751bd881de9f45332e5b205/68747470733a2f2f6f73752e7070792e73682f68656c702f77696b692f7368617265642f646966662f657870657274706c75732d732e706e67[/img]";
		
		var sr = data[0].difficultyrating;
		
		if (sr <= 1.99){
			bbcode = bbcode.concat(bbcode,easy);
		}
		else if (2.00 <= sr && sr <= 2.69){
			bbcode = bbcode.concat(bbcode,normal);
		}
		else if (2.7 <= sr && sr <= 3.99){
			bbcode = bbcode.concat(bbcode,hard);
		}
		else if (4 <= sr && sr <= 5.29){
			bbcode = bbcode.concat(bbcode,insane);
		}
		else if (5.3 <= sr && sr <= 6.49){
			bbcode = bbcode.concat(bbcode,extra);
		}
		else if (6.5 <= sr){
			bbcode = bbcode.concat(bbcode,black);
		}
		//fetch artist - title
		var artist = data[0].artist;
		var title = data[0].title;
		bbcode = bbcode.concat(" [url=",url,"]"," ",artist, " - ",title);
		//fetch diff name
		var diff = data[0].version;
		bbcode = bbcode.concat(" [",diff, "] ","[/url] ");
		//fetch ranked status
		var rank = "([img]https://i.ppy.sh/0ded164fcfa1e4ad4ce967c951eaba0dbb418435/68747470733a2f2f6f73752e7070792e73682f68656c702f77696b692f7368617265642f7374617475732f6c6f7665642e706e67[/img]) ";
		var ranked = data[0].approved;
		if (ranked == 1){
			bbcode = bbcode.concat(" ",rank);
		}
		//fetch creator
		var mapper = data[0].creator; 
		bbcode = bbcode.concat("by ","[profile]", mapper,"[/profile]");
      
        document.getElementById('bbcode').value = bbcode;
    });
	
}

document.getElementById("copyButton").onclick = async function() {
	var copyText = document.getElementById("bbcode");

	copyText.select();
	copyText.setSelectionRange(0, 99999);
	document.execCommand("copy");
	alert("Copied to clipboard");
};