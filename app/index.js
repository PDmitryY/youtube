import request from 'superagent';
import _ from 'lodash';
import Carousel from './carousel';

document.body.innerHTML = `<h1>Youtube search</h1>
    <div class="input-form">
        <input id="search-input" type="text" size="40">
        <button id="confirm-input"><i class="fa fa-search" aria-hidden="true"></i></button>
    </div>
    <div class="answers-container">
    </div>`;
let confirm = document.getElementById("confirm-input");

const mobileScreen = window.matchMedia( "(max-width: 600px)" );
const smallScreen = window.matchMedia( "(max-width:900px)" );
const mediaScreen = window.matchMedia( "(min-width:901px) and (max-width:1200px)" );
const largeScreen = window.matchMedia( "(min-width: 1201px)" );

confirm.addEventListener('click', function () {

    document.querySelector('.answers-container').innerHTML = `<div class="button-prev"></div>
        <div class="button-next"></div>
        <div class="slides-container"></div>
        <div class="pagination">
            <a class="paging-prev" href="#">&laquo;</a>
            <a href="#">1</a>
            <a class="active" href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a>
            <a class="paging-next" href="#">&raquo;</a>
        </div>`


    let slide1 = document.createElement('div');
    slide1.classList.add("slide-item", "active");
    let slide2 = document.createElement('div');
    slide2.classList.add("slide-item");
    let slide3 = document.createElement('div');
    slide3.classList.add("slide-item");
    let slide4 = document.createElement('div');
    slide4.classList.add("slide-item");
    let slide5 = document.createElement('div');
    slide5.classList.add("slide-item");
    let slide6 = document.createElement('div');
    slide6.classList.add("slide-item");
    let slide7 = document.createElement('div');
    slide7.classList.add("slide-item");
    let slide8 = document.createElement('div');
    slide8.classList.add("slide-item");
    let slide9 = document.createElement('div');
    slide9.classList.add("slide-item");
    let slide10 = document.createElement('div');
    slide10.classList.add("slide-item");
    let slide11 = document.createElement('div');
    slide11.classList.add("slide-item");
    let slide12 = document.createElement('div');
    slide12.classList.add("slide-item");
    let slide13 = document.createElement('div');
    slide13.classList.add("slide-item");
    let slide14 = document.createElement('div');
    slide14.classList.add("slide-item");
    let slide15 = document.createElement('div');
    slide15.classList.add("slide-item")

    let inputData = document.getElementById("search-input").value;

    request
        .get('https://www.googleapis.com/youtube/v3/search')
        .query({
            q: inputData
        })
        .query({
            key: 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y'
        })
        .query({
            type: 'video'
        })
        .query({
            part: 'snippet'
        })
        .query({
            maxResults: 15
        })
        .end(function (err, res1) {
            if (err || !res1.ok) {
                alert('Oh no! error');
            } else {
                //console.log(' answer ' + JSON.stringify(res1.body, null, 2));
                let answerItems = res1.body.items;
                _.forEach(answerItems, function (item, i) {

                    request
                        .get('https://www.googleapis.com/youtube/v3/videos')
                        .query({
                            id: item.id.videoId
                        })
                        .query({
                            key: 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y'
                        })
                        .query('part=snippet,statistics,contentDetails,player')
                        .end(function (err, res2) {
                            if (err || !res2.ok) {
                                console.log('Oh no! error');
                            } else {

                                let ansversNumber = _.get(res1,'body.items.length');

                                if(!ansversNumber) {
                                    return;
                                }
                                function createAnswer (item) {
                                    let container = document.createElement('div');
                                        container.classList.add("answer-item")
                                        container.innerHTML = `<h3><a href="https://www.youtube.com/watch?v=${item.id.videoId}">${item.snippet.title}</a></h3>
                                            <img src="${item.snippet.thumbnails.medium.url}" alt="preview">
                                            <p><span><i class="fa fa-user-circle" aria-hidden="true"></i></span>${item.snippet.channelTitle}</p>
                                            <p><span><i class="fa fa-calendar" aria-hidden="true"></i></span>${new Date(item.snippet.publishedAt).toISOString().slice(0, 10)}.</p>
                                            <p><span><i class="fa fa-eye" aria-hidden="true"></i></span>${res2.body.items[0].statistics.viewCount}</p>
                                            <p>${item.snippet.description}</p>`;
                                    return container;
                                };
                                function slideFiller (screen) {
                                    if (screen == largeScreen) {
                                        document.querySelector('.slides-container').innerHTML = '';
                                        document.querySelector('.slides-container').appendChild(slide1);
                                        document.querySelector('.slides-container').appendChild(slide2);
                                        document.querySelector('.slides-container').appendChild(slide3);
                                        document.querySelector('.slides-container').appendChild(slide4);
                                        if(i < 4) {
                                            slide1.appendChild(createAnswer(item));
                                        } else if (i >= 4 && i < 8) {
                                            slide2.appendChild(createAnswer(item));
                                        } else if (i >= 8 && i < 12) {
                                            slide3.appendChild(createAnswer(item));
                                        } else {
                                            slide4.appendChild(createAnswer(item));
                                        }
                                    }
                                    if(screen == mediaScreen) {
                                        document.querySelector('.slides-container').innerHTML = '';
                                        document.querySelector('.slides-container').appendChild(slide1);
                                        document.querySelector('.slides-container').appendChild(slide2);
                                        document.querySelector('.slides-container').appendChild(slide3);
                                        document.querySelector('.slides-container').appendChild(slide4);
                                        document.querySelector('.slides-container').appendChild(slide5);
                                        if(i < 3) {
                                            slide1.appendChild(createAnswer(item));
                                        } else if (i >= 3 && i < 6) {
                                            slide2.appendChild(createAnswer(item));
                                        } else if (i >= 6 && i < 9) {
                                            slide3.appendChild(createAnswer(item));
                                        } else if (i >= 9 && i < 12) {
                                            slide4.appendChild(createAnswer(item));
                                        } else {
                                            slide5.appendChild(createAnswer(item));
                                        }
                                    }
                                    if(screen == smallScreen) {
                                        document.querySelector('.slides-container').innerHTML = '';
                                        document.querySelector('.slides-container').appendChild(slide1);
                                        document.querySelector('.slides-container').appendChild(slide2);
                                        document.querySelector('.slides-container').appendChild(slide3);
                                        document.querySelector('.slides-container').appendChild(slide4);
                                        document.querySelector('.slides-container').appendChild(slide5);
                                        document.querySelector('.slides-container').appendChild(slide6);
                                        document.querySelector('.slides-container').appendChild(slide7);
                                        document.querySelector('.slides-container').appendChild(slide8);
                                        if(i < 2) {
                                            slide1.appendChild(createAnswer(item));
                                        } else if (i >= 2 && i < 4) {
                                            slide2.appendChild(createAnswer(item));
                                        } else if (i >= 4 && i < 6) {
                                            slide3.appendChild(createAnswer(item));
                                        } else if (i >= 6 && i < 8) {
                                            slide4.appendChild(createAnswer(item));
                                        } else if (i >= 8 && i < 10) {
                                            slide5.appendChild(createAnswer(item));
                                        } else if (i >= 10 && i < 12) {
                                            slide6.appendChild(createAnswer(item));
                                        } else if (i >= 12 && i < 14) {
                                            slide7.appendChild(createAnswer(item));
                                        } else {
                                            slide8.appendChild(createAnswer(item));
                                        }
                                    }
                                    if(screen == mobileScreen) {
                                        document.querySelector('.slides-container').innerHTML = '';
                                        document.querySelector('.slides-container').appendChild(slide1)
                                        document.querySelector('.slides-container').appendChild(slide2)
                                        document.querySelector('.slides-container').appendChild(slide3)
                                        document.querySelector('.slides-container').appendChild(slide4)
                                        document.querySelector('.slides-container').appendChild(slide5)
                                        document.querySelector('.slides-container').appendChild(slide6)
                                        document.querySelector('.slides-container').appendChild(slide7)
                                        document.querySelector('.slides-container').appendChild(slide8)
                                        document.querySelector('.slides-container').appendChild(slide9)
                                        document.querySelector('.slides-container').appendChild(slide10)
                                        document.querySelector('.slides-container').appendChild(slide11)
                                        document.querySelector('.slides-container').appendChild(slide12)
                                        document.querySelector('.slides-container').appendChild(slide13)
                                        document.querySelector('.slides-container').appendChild(slide14)
                                        document.querySelector('.slides-container').appendChild(slide15)
                                        if(i == 0) slide1.appendChild(createAnswer(item));
                                        if(i == 1) slide2.appendChild(createAnswer(item));
                                        if(i == 2) slide3.appendChild(createAnswer(item));
                                        if(i == 3) slide4.appendChild(createAnswer(item));
                                        if(i == 4) slide5.appendChild(createAnswer(item));
                                        if(i == 5) slide6.appendChild(createAnswer(item));
                                        if(i == 6) slide7.appendChild(createAnswer(item));
                                        if(i == 7) slide8.appendChild(createAnswer(item));
                                        if(i == 8) slide9.appendChild(createAnswer(item));
                                        if(i == 9) slide10.appendChild(createAnswer(item));
                                        if(i == 10) slide11.appendChild(createAnswer(item));
                                        if(i == 11) slide12.appendChild(createAnswer(item));
                                        if(i == 12) slide13.appendChild(createAnswer(item));
                                        if(i == 13) slide14.appendChild(createAnswer(item));
                                        if(i == 14) slide15.appendChild(createAnswer(item));
                                    }
                                }
                                if (largeScreen.matches) {
                                    slideFiller(largeScreen);
                                } else if (mediaScreen.matches) {
                                    slideFiller(mediaScreen);
                                } else if (smallScreen.matches){
                                    slideFiller(smallScreen);
                                } else if (mobileScreen.matches){
                                    slideFiller(mobileScreen);
                                }
                            let carousel = new Carousel();
                            }
                        });
                });
            };
        });
});



