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
	i,
	dots = document.querySelectorAll('#nav li'),
	active = $('.swipeview-active'),
	id = active.attr('data-page-index'),
	item = videos[id];

playList = new SwipeView('#wrapper', {
	numberOfPages: videos.length,
	hastyPageFlip: true
});

// Load library data and handle current video

$(document).ready(function() {
	console.log("Document loaded");
	loadData();

	setTimeout(function() {
		var id = $('.swipeview-active').attr('data-page-index');
		var item = videos[id];
		item.current = true;

		if (item.current === true) {
			videoPlayer(item);
		}
	}, 10);
});

/*   <<<<<<<<<<<<   METHODS   >>>>>>>>>>>>   */


// Load initial data

function loadData() {
	for (i = 0; i < videos.length; i++) {
		var item = $('div[data-page-index="' + i + '"]');
		if (!item.hasClass('swipeview-active')) {
			console.log(i, item);
			el = document.createElement('img');
			el.className = 'loading';
			el.id = i;
			el.src = videos[i].thumb;
			el.width = videos[i].width;
			el.height = videos[i].height;
			el.onload = function() {
				this.className = '';
			};
			item.html(el);
		} else {
			console.log('ACTIVE', item);
		}
	}
}

// handler to load next view data
playList.onFlip(function() {
	var el,
		upcoming,
		i;

	for (i = 0; i < videos.length; i++) {
		upcoming = playList.masterPages[i].dataset.upcomingPageIndex;

		if (upcoming != playList.masterPages[i].dataset.pageIndex) {
			loadThumb();
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


// load iframe & object url if current equals. 

function videoPlayer(item) {
	var id = $('.swipeview-active').attr('data-page-index');
	$('.swipeview-active > img').remove();
	el = document.createElement('iframe');
	el.className = '';
	el.src = item.url;
	el.width = item.width;
	el.height = item.height;
	el.onload = function(e) {
		className = '';
		updateDescription();
	};
	$('.swipeview-active[data-page-index="' + id + '"]').html(el);
}

// Remove iframe and replace with thumb.

function removeIframe(videos) {
	var iframe = $('div:not(.swipeview-active) > div > iframe');
	var parent = $(iframe).parent();
	var index = parent.attr('data-page-index');
	iframe.remove();
	console.log('removed iframe' + " id : " + index);

	el = document.createElement('img');
	el.src = videos[index].thumb;
	el.width = videos[index].width;
	el.height = videos[index].height;
	parent.html(el);
}

// function to update decription based on active screen

function updateDescription() {
	var id = $('.swipeview-active').attr('data-page-index');
	var item = videos[id];
	$('#videoDescription').html(item.details);
}

// remove .swipeview-active class from div 

playList.onMoveOut(function() {
	playList.masterPages[playList.currentMasterPage].className =
		playList.masterPages[playList.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');

});

// add .swipeview-active class to viewport div

playList.onMoveIn(function() {
	var className = playList.masterPages[playList.currentMasterPage].className;
	/(^|\s)swipeview-active(\s|$)/.test(className) || (playList.masterPages[playList.currentMasterPage].className = !className ? 'swipeview-active' : className + 'swipeview-active');
});


/*   <<<<<<<<<<<<   EVENT LISTENERS   >>>>>>>>>>>>   */



// Standard event listener for SwipeView.js lib

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

// Animation end load iframe.

document.addEventListener('webkitTransitionEnd', function(e) {
	removeIframe(videos);
	var id = $('.swipeview-active').attr('data-page-index');
	var item = videos[id];
	item.current = true;

	console.log('Animation end, ' + item.desc + ' : ' + item.current);

	if (item.current === true) {
		videoPlayer(item);
	}
}, false);