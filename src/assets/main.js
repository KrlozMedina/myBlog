const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCwr2Oy0BSvLWbukMAi_Nk7g&part=snippet%2Cid&order=date&maxResults=4';

const content = null || document.getElementById('content')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '22dab2bc01msh2310900cbcea451p119d45jsna7f9a371b8e2',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlAPI) {
    const res = await fetch(urlAPI, options);
    const data = await res.json();
    return data;
}

(async () => {
    try {
        const videos = await fetchData(API);
        console.log(videos)
        let view = `
            ${videos.items.map(video => `
                <div class="group relative">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full" />
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <a href="https://www.youtube.com/watch?v=${video.id.videoId}">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                            </a>
                        ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            `).slice(0, 4).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.error(error);
    }
})();