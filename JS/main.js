jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offsetOfSunrise = 200,

		offsetOfSunToHeart = 350,

		offsetOfGullDisappear = 900,

		offsetOfHeartDisappear = 900,

		offsetOfLighting = 850,

		offsetOfBlackboard0 = 800,

		offsetOfBlackboard1 = 875,

		offsetOfBlackboard2 = 950,

		offsetOfBlackboard3 = 1025,

		offsetOfDevil = 1000,

		offsetOfHeroWithGirl = 1100,

		offsetOfHeroAlone = 1100,

		offsetOfDevilWithGirl = 1400,

		offsetofGame = 1600;

		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$heart = $('#Heart'),

		$gulls = $('.Gull'),

		$lighting = $('.Lighting'),

		$blackBoard = $('#blackboard')

		$devil = $('#Devil'),

		$devilWithGirl = $('#DevilWithGirl');

		$heroWithGirl = $('#HeroWithGirl');

		$hero = $('#Hero');

		$game = $('#CanvasDiv');



	//hide or show the "back to top" link
	$(window).scroll(function(){

		if( $(this).scrollTop() > offsetOfSunrise) {
			$heart.css({
				position:'fixed',
				top: 100,
			});
		}

		if( $(this).scrollTop() > (offsetOfSunToHeart)) {
			$heart.css('clip-path', 'polygon(50% 0%, 80% 10%, 89% 29%, 79% 49%, 70% 62%, 48% 84%, 28% 73%, 9% 60%, 0 29%, 16% 4%)');
			$heart.css('-webkit-clip-path', 'polygon(50% 0%, 80% 10%, 89% 29%, 79% 49%, 70% 62%, 48% 84%, 28% 73%, 9% 60%, 0 29%, 16% 4%)');
		}

		if( $(this).scrollTop() > (offsetOfHeartDisappear)) {
			$heart.css({
				display:'none',
			});
		}

		if( $(this).scrollTop() > (offsetOfGullDisappear)) { //gull
			$gulls.css({
				opacity:'0',
			});
		}

		if( $(this).scrollTop() < (offsetOfLighting)) {
			$lighting.css({
				opacity:'0',
			});
		}

		if( $(this).scrollTop() < (offsetOfBlackboard0)) {
			$blackBoard.css({
				display:'none',
			});
		}

		if( $(this).scrollTop() > (offsetOfBlackboard0)) {
			$blackBoard.css({
				display:'block',
			});
		}

		if( $(this).scrollTop() > (offsetOfBlackboard1)) {
			$blackBoard.css({
				display:'none',
			});
		}

		if( $(this).scrollTop() > (offsetOfBlackboard2)) {
			$blackBoard.css({
				display:'block',
			});
		}

		if( $(this).scrollTop() > (offsetOfBlackboard3)) {
			$blackBoard.css({
				display:'none',
			});
		}

		if( $(this).scrollTop() < (offsetOfDevil)) {
			$devil.css({
				display:'none',
			});
		}

		if( $(this).scrollTop() < (offsetOfDevilWithGirl)) {
			$devilWithGirl.css({
				display:'none',
			});
		}

		if( $(this).scrollTop() > (offsetOfHeroWithGirl)) {
			$heroWithGirl.css({
				display:'none',
			});
		}

		if( $(this).scrollTop() > (offsetOfHeroAlone)) {
			$hero.css({
				display:'block',
			});
		}

		if( $(this).scrollTop() > (offsetofGame)){
			$game.css({
				display:'block',
			});
		}


	});

	$(window).scroll(function(){

		if( $(this).scrollTop() < offsetOfSunrise) {
			$heart.css({
				position:'absolute',
				top: 300,
			});
		}

		if( $(this).scrollTop() < (offsetOfSunToHeart)) {
			$heart.css('clip-path', 'polygon(50% 25%, 64% 29%, 74% 41%, 74% 56%, 65% 71%, 51% 76%, 35% 70%, 27% 56%, 27% 40%, 37% 29%)');
			$heart.css('polygon(50% 25%, 64% 29%, 74% 41%, 74% 56%, 65% 71%, 51% 76%, 35% 70%, 27% 56%, 27% 40%, 37% 29%)');
		}

		if( $(this).scrollTop() < (offsetOfHeartDisappear)) {
			$heart.css({
				display:'block',
			});
		}

		if( $(this).scrollTop() < (offsetOfGullDisappear)) {//gull
			$gulls.css({
				opacity:'1',
			});
		}

		if( $(this).scrollTop() > (offsetOfLighting)) {
			$lighting.css({
				opacity:'1',
			});
		}

		if( $(this).scrollTop() > (offsetOfDevil)) {
			$devil.css({
				display:'block',
			});
		}

		if( $(this).scrollTop() > (offsetOfDevilWithGirl)) {
			$devilWithGirl.css({
				display:'block',
			});
			$devil.css({
				display:'none',
			});
		}

		if( $(this).scrollTop() < (offsetOfHeroWithGirl)) {
			$heroWithGirl.css({
				display:'block',
			});
		}

		if( $(this).scrollTop() < (offsetOfHeroAlone)) {
			$hero.css({
				display:'none',
			});
		}

		if( $(this).scrollTop() < (offsetofGame)){
			$game.css({
				display:'none',
			});
		}

	});



	//smooth scroll to top
	/*
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
	*/

});