let peticiona = async () => {
	const result = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
		},
		body: "grant_type=client_credentials",
	});
};

const clientId = "1c8d48768e3440f3a3fe0567235964d7";
const clientSecret = "fa7cbd1290754ce09b3054120d391a70";

const _getToken = async (name_song) => {
	const result = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
		},
		body: "grant_type=client_credentials",
	});

	const data = await result.json();
	console.log("data", data);

	getArtist(data, name_song);

	return data.access_token;
};

let getArtist = async (token, name_song) => {
	console.log("tok", token);

	let options = {
		method: "GET",
		url: "https://api.spotify.com/v1/artist/id/",
		headers: { Authorization: "Bearer " + token },
		json: true,
	};

	const result = await fetch(
		`https://api.spotify.com/v1/search?q=${name_song}&type=album,track`,

		{
			method: "GET",

			headers: { Authorization: "Bearer " + token.access_token },
			json: true,
		}
	);

	const data = await result.json();

	return pinta(data);
};

let pinta = (data) => {
	console.log(data.tracks.items[0].preview_url);
	containerData.innerHTML = "";
	let column = document.createElement("div");

	column.className = "col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mt-3 ";

	column.innerHTML = `

	<div class="card" style="width: 18rem;">
  <img src="${data.tracks.items[0].album.images[1].url}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.tracks.items[0].name}</h5>
    <p class="card-text"></p>
		<audio src="${data.tracks.items[0].preview_url}" controls="controls" type="audio/mpeg" preload="preload">
		</audio>
    <a href="${data.tracks.items[0].preview_url}" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

	 
		`;

	containerData.append(column);
};

let inicializa = () => {
	containerData = document.getElementById("pinta");

	input_song = document.getElementById("idArgs");
	btn_submit = document.getElementById("btnSubmit");
	btn_submit.onclick = () => _getToken(input_song.value);
};

inicializa();
main();
