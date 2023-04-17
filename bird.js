
// main js
const $gameRule = document.querySelector('.game-rule');
const $rule = document.querySelector('.rule');
const $resultGame = document.querySelector('.result-menu');//230411 결과 숨길래요

//일반 새
const $birdImg =document.createElement('img');
//보너스
const $bonus = document.createElement('img');

const fileName = [1,2,3,4,5,6,7,8,9];
$birdImg.setAttribute('src', `./img/b9.png`);
$birdImg.style.width='100px';

$bonus.setAttribute('src','./img/bonus.png');
$bonus.style.width='100px';

$resultGame.style.display = 'none'; //게임결과 숨기기

$gameRule.addEventListener('click', () => {
    $rule.classList.add('show'); //게임방법 띄우기
});

const $back = document.querySelector('.back');
$back.addEventListener('click', () => {
    $rule.classList.remove('show'); //게임방법 접기
});

const $start = document.querySelector('.start');
const $game = document.querySelector('.game');
$start.addEventListener('click', () => {
    $game.classList.add('play'); //게임시작
    const $mainMenu = document.querySelector('.main-menu');
    $mainMenu.style.display = 'none'; //메인메뉴 숨기기

    let birdX = Math.floor(Math.random()*2250)+100;
    let birdY = Math.floor(Math.random()*750)+100;

    $birdImg.style.position='absolute';
    $birdImg.style.left=birdX+'px';
    $birdImg.style.top=birdY+'px';
    $game.appendChild($birdImg);//맨처음 새 만들기

});

// game score js

//시간에 쓰일 i
let i = 30;//임시로 5초 추후에 바꿀예정
let count = 0; //새 잡은 횟수
const $resultC = document.querySelector('#resultnum');//결과 요소 지정
const $rank = document.querySelector('#rank');//결과에 따른 랭크 지정

function createTime() {
    if(!$game.classList.contains('play')){ 
        return; //플레이 하지 않으면 시간이 가지 않음
    }
    const $time = document.getElementById('time');
    $time.textContent = i; //남은 시간
    i--;
    //보너스 생성시점
    if(i === 25 || i === 20){
        console.log('보너스 생성')
        let bonusX = Math.floor(Math.random()*2250)+100;
        let bonusY = Math.floor(Math.random()*750)+100;
        $bonus.style.display='block';
        $bonus.style.position='absolute';
        $bonus.style.left=bonusX+'px';
        $bonus.style.top=bonusY+'px';
        $bonus.classList.add('bonusMoving');
        $game.appendChild($bonus);
    }
    $getpoint.classList.add('pointMoving');
    // 까마귀 생성
    crawCreate();
    if(i < 0) {
        clearInterval(inter);
        const $resultMenu = document.querySelector('.result-menu');
        $resultMenu.classList.add('show') //결과 화면
        $game.style.display = 'none'; //게임 숨기기
        $resultGame.style.display ='block'; //결과 발표
        $resultC.textContent = count;//결과출력

        if(count > 60){
            $rank.textContent='Master';
        }
        else if(count > 50){
            $rank.textContent='Diamond';
        }
        else if(count > 40){
            $rank.textContent='Platinum';
        }
        else if(count > 30){
            $rank.textContent='Gold';
        }
        else if(count > 20){
            $rank.textContent='Silver';
        }
        else{
            $rank.textContent='Bronze';
        }

    }
    if(i==5 && count >=25 ){
        const $fever = document.createElement('h2');
        $game.appendChild($fever);
        $fever.textContent='FEVER TIME';
        $fever.classList.add('fever');//피버 css 애니메이션주기
        $fever.style.position='absolute';
        $fever.style.transform='translate(-50%,-50%)';
        $fever.style.top='50%';
        $fever.style.left='50%';
        $fever.style.color='red';
        $fever.style.fontSize='30px';
        $fever.style.zIndex='9999';
        console.log('피버타임!');
        
        $birdImg.onclick = function(){
            count++;
            $catch.textContent = count;
            $game.appendChild($getpoint);
            $getpoint.textContent = '+2';
        }
    }
}
const inter = setInterval(createTime, 1000); //인터벌



/////////////////////////////////////////////////////////////////
let p=0; //사진변화위한 제어변수
const $catch = document.querySelector('.catchbirds #num');
const birdMove = function(e){//새를 움직입니다.
    let birdX = Math.floor(Math.random()*2250)+100;
    let birdY = Math.floor(Math.random()*750)+100;

    $birdImg.style.left=birdX+'px';
    $birdImg.style.top=birdY+'px';
    // console.log(birdX)
    // console.log(birdY)
    $birdImg.setAttribute('src', `./img/b${fileName[p]}.png`);
    $game.appendChild($birdImg);
    p++
    console.log(i);
    if(p==9){
        p=0;
    }
    count++;
    // console.log($catch);
    // console.log(count);
    $catch.textContent = count;

    $getpoint.textContent = '+1';
    $getpoint.style.position = 'absolute';
    $getpoint.style.display = 'block';
    $getpoint.style.color = 'black';
    console.log(e.clientX);
    console.log(e.clientY);
    $getpoint.style.left = e.clientX+'px';
    $getpoint.style.top = e.clientY+'px';
    $game.appendChild($getpoint);
    if(i==4){
        $getpoint.style.display='none';
    }
}

$birdImg.addEventListener('click', birdMove); //새 클릭
$bonus.addEventListener('click',function(e){//보너스 클릭
    count+=3;
    $catch.textContent = count;
    $bonus.style.display='none';

    $getpoint.textContent = '+3'; // 보너스 점수
    $getpoint.style.position = 'absolute';
    $getpoint.style.display = 'block';
    $getpoint.style.color = 'black';
    console.log(e.clientX);
    console.log(e.clientY);
    $getpoint.style.left = e.clientX+'px';
    $getpoint.style.top = e.clientY+'px';
    $game.appendChild($getpoint);

    
})

//////////////////////////////////////////////////////////
//result-menu에서의 버튼
const $replay = document.querySelector('#replay')
$replay.onclick=function(){
    location.reload();
}
const $rankList = document.querySelector('#rank-list');
const $rankStd = document.querySelector('#standard');
$rankStd.style.display='none';
$rankList.onclick=function(){
    if($rankStd.classList.contains('standardShow')){
        $rankStd.style.display='none';
        $rankStd.classList.toggle('standardShow');
    }
    else{
        $rankStd.style.display='block';
        $rankStd.classList.toggle('standardShow');
    }
}
// 까마귀 생성 함수
const $craw = document.createElement('img');
function crawCreate() {
    if(i == 20 || i == 10) {
    console.log('까마귀 생성');
    $craw.setAttribute('src','./img/bb.png');
    $craw.style.width = '200px';
    let crawX = Math.floor(Math.random()*2250)+100;
    let crawY = Math.floor(Math.random()*750)+100;
    $craw.style.display = 'block';
    $craw.style.position = 'absolute'
    $craw.style.left=crawX+'px';
    $craw.style.top=crawY+'px';
    $game.appendChild($craw);
    }
    if((i == 17|| i == 7)  & $game.contains($craw)) {
        $craw.style.display = 'none';
    }
}

const $getpoint = document.createElement('h1'); // 보너스 점수 애니메이션
$craw.addEventListener('click', (e) => { // 까마귀 클릭 함수
    console.log('까마귀 클릭');
    $craw.style.display = 'none';
    count--;
    $catch.textContent = count;
    
    $getpoint.textContent = '-1';
    $getpoint.style.position = 'absolute';
    $getpoint.style.display = 'block';
    $getpoint.style.color = 'red';
    console.log(e.clientX);
    console.log(e.clientY);
    $getpoint.style.left = e.clientX+'px';
    $getpoint.style.top = e.clientY+'px';
    $game.appendChild($getpoint);
    
});
