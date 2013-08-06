var videos = [{
	desc: "Previous",
	width: 550,
	height: 300,
	current: false,
	thumb: "http://img.youtube.com/vi/A7GGHYk0AE4/0.jpg",
	url: "http://www.youtube.com/embed/A7GGHYk0AE4?modestbranding=1;rel=0;controls=1?modestbranding=1;tite=;controls=1",
	details: "This is the detail the previous video."
}, {
	desc: "Current",
	width: 550,
	height: 300,
	current: false,
	thumb: "http://img.youtube.com/vi/A7GGHYk0AE4/1.jpg",
	url: "http://www.youtube.com/embed/A7GGHYk0AE4?modestbranding=1;rel=0;controls=1?modestbranding=1;tite=;controls=1",
	details: "This is the detail the current video."
}, {
	desc: "Next",
	width: 550,
	height: 300,
	current: false,
	thumb: "imgs/placeholder.png",
	url: "http://www.youtube.com/embed/A7GGHYk0AE4?modestbranding=1;rel=0;controls=1?modestbranding=1;tite=;controls=1",
	details: "This is the detail of the next video."
}];

var el,
	playList,
	dots = document.querySelectorAll('#nav li'),
	active = $('.swipeview-active'),
	id = active.attr('data-page-index'),
	page,
	item = videos[id];

playList = new SwipeView('#wrapper', {
	numberOfPages: videos.length,
	hastyPageFlip: true
});

$(window).load(function(e) {
	console.log("loaded");
});



/*   <<<<<<<<<<<<   METHODS   >>>>>>>>>>>>   */

// Load initial data

for (i = 0; i < 3; i++) {
	page = i == 0 ? videos.length - 1 : i - 1;
	el = document.createElement('img');
	el.className = 'loading';
	el.id = page;
	el.src = videos[page].thumb;
	el.width = videos[page].width;
	el.height = videos[page].height;
	el.onload = function() {
		this.className = '';
		updateDescription();
		console.log(videos);
	}
	playList.masterPages[i].appendChild(el);
}

playList.onFlip(function() {
	var el,
		upcoming,
		i;

	for (i = 0; i < 3; i++) {
		upcoming = playList.masterPages[i].dataset.upcomingPageIndex;

		if (upcoming != playList.masterPages[i].dataset.pageIndex) {
			el = playList.masterPages[i].querySelector('img');
			el.className = 'loading';
			el.id = upcoming;
			el.src = videos[upcoming].thumb;
			el.width = videos[upcoming].width;
			el.height = videos[upcoming].height;

		}
	}

	document.querySelector('#nav .selected').className = '';
	dots[playList.pageIndex + 1].className = 'selected';
});

function videoPlayer(item) {
	var id = $('.swipeview-active').attr('data-page-index');
	$('.swipeview-active > img').remove();
	var item = videos[id];

	console.log(item.url);
	el = document.createElement('iframe');
	el.className = '';
	el.src = item.url;
	el.width = item.width;
	el.height = item.height;
	el.onload = function() {
		className = '';
	}
	console.log(el);
	playList.masterPages[id].appendChild(el);
}

function updateDescription() {
	var id = $('.swipeview-active').attr('data-page-index');
	var item = videos[id];
	$('#description').html(item.details);
}

playList.onMoveOut(function(e) {
	console.log("onMoveOut");
	playList.masterPages[playList.currentMasterPage].className =
		playList.masterPages[playList.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');

});

playList.onMoveIn(function(e) {
	console.log("onMoveIn");
	var className = playList.masterPages[playList.currentMasterPage].className;
	/(^|\s)swipeview-active(\s|$)/.test(className) || (playList.masterPages[playList.currentMasterPage].className = !className ? 'swipeview-active' : className + 'swipeview-active');
});

document.addEventListener('touchstart', function(e) {
	console.log('touchstart');
	// var id = $('.swipeview-active').attr('data-page-index');
	// var item = videos[id];
	// if (active && item.current === false) {
	// 	item.current = true;
	// 	console.log(item.desc + " " + item.current);
	// }
}, false);

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
	console.log('touchmove');
}, false);

document.addEventListener('webkitTransitionEnd', function(e) {
	console.log('Animation end');
	var id = $('.swipeview-active').attr('data-page-index');
	var item = videos[id];
	item.current = true;

	console.log('Animation end, ' + item.desc + ' : ' + item.current);

	if (item.current === true) {
		videoPlayer(item);
	}
}, false);