
/*
e-typing-like typing game v1.0 created with passion by Fuma(@fuma_it)
Have fun :)
*/
(function(window, document) {
  const overlay = document.createElement('div');
  overlay.id = 'game-overlay';
  const game = document.getElementById('game-screen');
  const gameTitle = document.getElementById('game-subtitle');
  const button1 = document.getElementById('close-button1');
  const button2 = document.getElementById('open-button');
  const button22 = document.getElementById('open-button2');
  const button23 = document.getElementById('open-button3');
  const button3 = document.getElementById('start-button');
  const button4 = document.getElementById('replay-button');
  const button5 = document.getElementById('close-button2');
  const view1 = document.getElementById('game-view1');
  const gameFunc = document.getElementById('game-func');
  const onBtns = gameFunc.querySelectorAll('.on-btn');
  const offBtns = gameFunc.querySelectorAll('.off-btn');
  const view2 = document.getElementById('game-view2');
  const result = document.getElementById('game-result');
  const mScreen = document.getElementById('miss-type-screen');
  const startMsg = document.getElementById('start-msg');
  const example = document.getElementById('example');
  const kana = document.getElementById('kana');
  const sentence = document.getElementById('sentence');
  const progress = document.getElementById('progress-bar');
  const keyboard = document.getElementById('virtual-keyboard');
  const space = keyboard.querySelector('.key_space');
  const littleLeft = document.getElementById('little-left');
  const ringLeft = document.getElementById('ring-left');
  const middleLeft = document.getElementById('middle-left');
  const indexLeft = document.getElementById('index-left');
  const thumbLeft = document.getElementById('thumb-left');
  const thumbRight = document.getElementById('thumb-right');
  const indexRight = document.getElementById('index-right');
  const middleRight = document.getElementById('middle-right');
  const ringRight = document.getElementById('ring-right');
  const littleRight = document.getElementById('little-right');
  const position = document.getElementById('animate');
  const animatePanel = document.getElementById('animate-panel');
  var position_x = 0;
  var position_x_origin = 0; 
  
  // js-glitterクラスがついた要素を全て取得
  const glitterEls = document.getElementById("js-glitter");
  const allkeyPosition = document.getElementsByClassName('finger');
  const starScore = document.getElementById('star-score');

  const littleLeftLine = ['.key_1' , '.key_q' , '.key_a' , '.key_z'];
  const ringLeftLine = ['.key_2' , '.key_w' , '.key_s' , '.key_x'];
  const middleLeftLine = ['.key_3' , '.key_e' , '.key_d' , '.key_c'];
  const indexLeftLine = ['.key_4' , '.key_r' , '.key_f' , '.key_v','.key_5' , '.key_t' , '.key_g' , '.key_b'];
  const thumbLeftLine = [];

  const thumbRightLine = [];
  const indexRightLine = ['.key_6' , '.key_y' , '.key_h' , '.key_n' , '.key_7' , '.key_u' , '.key_j' , '.key_m'];
  const middleRightLine = ['.key_8' , '.key_i' , '.key_k' , '.key_comma'];
  const ringRightLine = ['.key_9' , '.key_o' , '.key_l' , '.key_period'];
  const littleRightLine = ['.key_0' , '.key_p' , '.key_semicolon' , '.key_slash'];
  var wordJP1 = []; // 表示文章
  var wordJP2 = []; // ひらがな文章
  let wordRs; // ローマ字データ1
  let wordR; // ローマ字データ2
  let record; // タイプした文章の記録
  let recordHTML;
  let recordM = []; // ミスした文章のインデックス
  let weakKeys; // 苦手キー格納用
  let gameData = []; // タイピング結果
  let backup1 = [];
  let backup2 = [];
  let isFirst = true;
  let isOpen = false;
  let startFlag = false;
  let sWait = false;
  let playing = false;
  let nFlag = false;
  let missFlag = false;
  let isStopped = false;
  let moPlay = false;
  let maxNum = 15; // 出題数の上限
  let random = true; // ランダム出題
  let resCmt = true; // 結果画面のコメント
  let flagR = true; // ローマ字表示
  let flagK = true; // かな表示
  let flagG = true; // キーガイド
  let flagW = true; // リアルタイムのWPM
  let flagS = true; // スピードバー
  let flags = [flagR, flagK, flagG, flagW, flagS];
  let ridx, limit, begin, count, idx1, idx2, pattern, temp, correct, miss;
  let over1, over2, over3, left1, left2, left3;

  // ワードセット  
  function wordset(modeNum) { 
    
    if(modeNum == 1){
      // 表示文章
      wordJP1 = ['いふ', 'ふぉー', 'ふぉわいる']; 
      // ひらがな文章
      wordJP2 = ['if', 'for', 'while']; 
    }else if(modeNum == 2){
      // 表示文章
      wordJP1 = ['りんご', 'ばなな', 'おれんじ','りんご', 'ばなな', 'おれんじ']; 
      // ひらがな文章
      wordJP2 = ['apple', 'banana', 'orange','apple', 'banana', 'orange']; 
    }else if(modeNum == 3){
      // 表示文章
      wordJP1 = ['1つの','できる，有能な','午後','再び','年齢，時代','前','すべての','すでに','もまた','いつも','アメリカ合衆国','1つの','～と、そして','怒った','動物','りんご','４月','到着する','～に','８月','おば','オーストラリア','秋','悪い','カバン','ボール','銀行']; 
      // ひらがな文章
      wordJP2 = ['a','able','afternoon','again','age','ago','all','already','also','always','america','an','and','angry','animal','apple','april','arrive','at','august','aunt','australia','autumn','bad','bag','ball','bank']; 
      
    }else{
      
    }
    
  }
 
  //背景セット
  function backgroundSet(modeNum){
    
    const screenback = document.getElementById('game-screen');
    if(modeNum == 1){
      screenback.style.background = 'linear-gradient(25deg, #a7e7ff, #20c2ff)';
    }else if(modeNum == 2){
      screenback.style.background = 'linear-gradient(24deg, #a7b1ff, #2056ff)';
    }else if(modeNum == 3){
      screenback.style.background = 'linear-gradient(24deg, #d0a7ff, #8720ff)';
    }else{
      
    }
    
    
  }
  
  // アイコン
  function icon(modeNum){
    const planeIcon = document.getElementById('icon');

    if(modeNum == 1){
      planeIcon.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 1131.53 379.304" enable-background="new 0 0 1131.53 379.304"xml:space="preserve" class="plane"><polygon fill="#ff6347" points="72.008,0 274.113,140.173 274.113,301.804 390.796,221.102 601.682,367.302 1131.53,0.223  "/><polygon fill="#cc4f39" points="1131.53,0.223 274.113,140.173 274.113,301.804 390.796,221.102   "/></svg>';
      
    }else if(modeNum == 2){
     planeIcon.innerHTML = '<svg width="80px" version="1.1" id="レイヤー_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"y="0px" viewBox="0 0 500 286.8" style="enable-background:new 0 0 500 286.8;" xml:space="preserve"><style type="text/css">.st0{fill:#D9DADA;}.st1{fill:#ECECED;}.st2{fill:#FFFFFF;}.st3{fill:#9C9C9D;}.st4{fill:#B2B2B3;}.st5{fill:#EFEFEF;}.st6{fill:#C6C7C8;}.st7{fill:#717071;}.st8{fill:#4D4D4D;}</style><g><g><g><path class="st0" d="M267.5,215.6c3.1,1.9,2.2,24.3-0.7,26l-16.3,9.3c-2.9,1.7-6.1,0.8-9-0.9l-7.6-4.4c-2.9-1.7-5-23.5-2.1-25.2l16.9-2.6c2.9-1.7,7.7-1.7,10.6,0L267.5,215.6z"/></g><g><path class="st1" d="M266.7,215.1c2.9,1.7,2.9,4.4,0,6.1l-16.3,9.3c-2.9,1.7-6.1,0.8-9-0.9l-7.6-4.4c-2.9-1.7-4.5-3.5-1.6-5.2l16.3-9.3c2.9-1.7,7.7-1.7,10.6,0L266.7,215.1z"/></g><g><path class="st2" d="M232.2,220.2l16.3-9.3c2.9-1.7,7.7-1.7,10.6,0l7.6,4.4c1.4,0.8,2.2,1.9,2.2,3c0-1.1-0.7-2.3-2.2-3.1l-7.6-4.4c-2.9-1.7-7.7-1.7-10.6,0l-16.3,9.3c-1.1,0.7-1.6,1.3-1.6,2C230.6,221.4,231.1,220.8,232.2,220.2z"/></g><g><path class="st3" d="M211.8,212.3c-21-17.1-21-44.7,0-61.8c21-17.1,55-17.1,76,0c21,17.1,21,44.7,0,61.8C266.8,229.4,232.8,229.4,211.8,212.3z"/></g><g><path class="st3" d="M287.8,212.1c-21,17.1-55,17.1-76,0c-10.4-8.5-15.7-19.6-15.7-30.8c0,11.2,5.2,22.5,15.7,31c21,17.1,55,17.1,76,0c10.5-8.6,15.8-19.8,15.7-31C303.5,192.5,298.2,203.6,287.8,212.1z"/></g><g><path class="st4" d="M203.8,202.3c-25.4-20.7-25.4-54.1,0-74.8c25.4-20.7,66.5-20.6,91.9,0c25.4,20.6,25.4,54.1,0,74.8C270.4,222.9,229.2,222.9,203.8,202.3z"/></g><g><path class="st3" d="M83.6,116.6c-8.9-5.1-8.9-13.5,0-18.6c8.9-5.1,23.3-5.1,32.2,0c8.9,5.1,8.9,13.5,0,18.6C106.9,121.8,92.5,121.8,83.6,116.6z"/></g><g><rect x="76.9" y="52.3" class="st3" width="45.5" height="55"/></g><g><path class="st0" d="M83.6,61.6c-8.9-5.1-8.9-13.5,0-18.6c8.9-5.1,23.3-5.1,32.2,0c8.9,5.1,8.9,13.5,0,18.6C106.9,66.7,92.5,66.7,83.6,61.6z"/></g><g><path class="st3" d="M383.8,98c8.9-5.1,23.3-5.1,32.2,0c8.9,5.1,8.9,13.5,0,18.6c-8.9,5.1-23.3,5.1-32.2,0S374.9,103.2,383.8,98z"/></g><g><rect x="377.1" y="52.3" class="st3" width="45.5" height="55"/></g><g><path class="st0" d="M383.8,43c8.9-5.1,23.3-5.1,32.2,0c8.9,5.1,8.9,13.5,0,18.6c-8.9,5.1-23.3,5.1-32.2,0C374.9,56.5,374.9,48.2,383.8,43z"/></g><g><polygon class="st4" points="241.4,147.4 209.2,172.1 100.2,90.1 100.2,79.3 "/></g><g><polygon class="st4" points="209.2,175.8 241.4,200.4 120.4,251.2 100.2,245.6 "/></g><g><polygon class="st4" points="258.3,200.4 290.4,175.8 399.4,245.6 379.3,251.2 "/></g><g><polygon class="st4" points="290.4,172.1 258.3,147.4 399.4,79.3 399.4,90.1 "/></g><g><polygon class="st1" points="241.4,130.5 209.2,149.1 100.2,79.3 120.4,67.6 "/></g><g><polygon class="st1" points="209.2,158.9 241.4,177.5 120.4,240.3 100.2,228.7 "/></g><g><polygon class="st1" points="258.3,177.5 290.4,158.9 399.4,228.7 379.3,240.3 "/></g><g><polygon class="st1" points="290.4,149.1 258.3,130.5 379.3,67.6 399.4,79.3 "/></g><g><path class="st0" d="M198.4,187.3c-28.4-16.4-28.4-43,0-59.4c28.4-16.4,74.5-16.4,102.9,0c28.4,16.4,28.4,43,0,59.4C272.8,203.7,226.8,203.7,198.4,187.3z"/></g><g><path class="st1" d="M198.4,183.7c-28.4-16.4-28.4-43,0-59.4c28.4-16.4,74.5-16.4,102.9,0c28.4,16.4,28.4,43,0,59.4C272.8,200.1,226.8,200.1,198.4,183.7z"/></g><g><path class="st0" d="M301.8,183.1c-28.4,16.4-74.5,16.4-102.9,0c-23.7-13.7-27.6-34.5-11.7-50.5c-16.5,16.1-12.8,37.2,11.2,51.1c28.4,16.4,74.5,16.4,102.9,0c4.7-2.7,8.6-5.7,11.7-8.9C309.9,177.8,306.2,180.5,301.8,183.1z"/></g><g><path class="st0" d="M207.3,178.5c-23.5-13.6-23.5-35.6,0-49.1c23.5-13.6,61.6-13.6,85.1,0c23.5,13.6,23.5,35.6,0,49.1C268.9,192.1,230.8,192.1,207.3,178.5z"/></g><g><rect x="76.9" y="220.6" class="st3" width="45.5" height="55"/></g><g><path class="st3" d="M115.8,283c-8.9,5.1-23.3,5.1-32.2,0c-8.9-5.1-8.9-13.5,0-18.6c8.9-5.1,23.3-5.1,32.2,0C124.7,269.5,124.7,277.8,115.8,283z"/></g><g><path class="st0" d="M115.8,228c-8.9,5.1-23.3,5.1-32.2,0c-8.9-5.1-8.9-13.5,0-18.6c8.9-5.1,23.3-5.1,32.2,0C124.7,214.5,124.7,222.8,115.8,228z"/></g><g><rect x="377.1" y="220.6" class="st3" width="45.5" height="55"/></g><g><path class="st3" d="M416,264.4c8.9,5.1,8.9,13.5,0,18.6c-8.9,5.1-23.3,5.1-32.2,0c-8.9-5.1-8.9-13.5,0-18.6C392.7,259.3,407.1,259.3,416,264.4z"/></g><g><path class="st0" d="M416,209.4c8.9,5.1,8.9,13.5,0,18.6c-8.9,5.1-23.3,5.1-32.2,0c-8.9-5.1-8.9-13.5,0-18.6C392.7,204.2,407.1,204.2,416,209.4z"/></g><g><path class="st5" d="M233.5,235.3c0-2.7,2.2-3.6,4.8-2c2.7,1.5,4.8,4.9,4.8,7.6c0,2.7-2.2,3.6-4.8,2C235.7,241.4,233.5,238,233.5,235.3z"/></g><g><path class="st6" d="M233.4,235.3c0-2.7,2.2-3.6,4.8-2c2.7,1.5,4.8,4.9,4.8,7.6c0,2.7-2.2,3.6-4.8,2C235.5,241.4,233.4,238,233.4,235.3z"/></g><g><path class="st7" d="M235.9,236.8c0-1.3,1-1.7,2.3-1c1.3,0.7,2.3,2.4,2.3,3.6c0,1.3-1,1.7-2.3,1C236.9,239.7,235.9,238,235.9,236.8z"/></g><g><path class="st4" d="M239.1,242.9c-2.7-1.5-4.8-4.9-4.8-7.6c0-1.6,0.8-2.6,2-2.7c-1.7-0.3-2.9,0.8-2.9,2.7c0,2.7,2.2,6.1,4.8,7.6c1.1,0.6,2.1,0.8,2.9,0.7C240.4,243.5,239.8,243.3,239.1,242.9z"/></g></g><g><g><path class="st8" d="M470.7,16.9c-39.1-22.5-102.4-22.6-141.4,0c-39.1,22.5-39.1,59.1,0,81.7c39.1,22.5,102.4,22.5,141.4,0C509.8,76,509.8,39.5,470.7,16.9z M457,90.7c-31.5,18.2-82.6,18.2-114.1,0c-31.5-18.2-31.5-47.7,0-65.9c31.5-18.2,82.6-18.2,114.1,0C488.5,43,488.5,72.5,457,90.7z"/></g><g><path class="st2" d="M388.1,49.6c0-3.8,5.3-25.3,11.9-25.3c6.6,0,11.9,21.5,11.9,25.3c0,3.8-5.3,6.9-11.9,6.9C393.4,56.4,388.1,53.4,388.1,49.6z"/></g></g><g><g><path class="st8" d="M470.7,179.5c-39.1-22.5-102.4-22.6-141.4,0c-39.1,22.5-39.1,59.1,0,81.7c39.1,22.5,102.4,22.5,141.4,0C509.8,238.6,509.8,202.1,470.7,179.5z M457,253.3c-31.5,18.2-82.6,18.2-114.1,0c-31.5-18.2-31.5-47.7,0-65.9c31.5-18.2,82.6-18.2,114.1,0C488.5,205.6,488.5,235.1,457,253.3z"/></g><g><path class="st2" d="M388.1,212.2c0-3.8,5.3-25.3,11.9-25.3c6.6,0,11.9,21.5,11.9,25.3c0,3.8-5.3,6.9-11.9,6.9C393.4,219,388.1,216,388.1,212.2z"/></g></g><g><g><path class="st8" d="M170.7,16.9C131.7-5.6,68.3-5.6,29.3,16.9C-9.8,39.5-9.8,76,29.3,98.6c39.1,22.5,102.4,22.5,141.4,0C209.8,76,209.8,39.5,170.7,16.9z M157,90.7c-31.5,18.2-82.6,18.2-114.1,0C11.5,72.5,11.5,43,43,24.8c31.5-18.2,82.6-18.2,114.1,0C188.5,43,188.5,72.5,157,90.7z"/></g><g><path class="st2" d="M88.1,49.6c0-3.8,5.3-25.3,11.9-25.3c6.6,0,11.9,21.5,11.9,25.3c0,3.8-5.3,6.9-11.9,6.9C93.4,56.4,88.1,53.4,88.1,49.6z"/></g></g><g><g><path class="st8" d="M170.7,179.5c-39.1-22.5-102.4-22.6-141.4,0c-39.1,22.5-39.1,59.1,0,81.7c39.1,22.5,102.4,22.5,141.4,0C209.8,238.6,209.8,202.1,170.7,179.5z M157,253.3c-31.5,18.2-82.6,18.2-114.1,0c-31.5-18.2-31.5-47.7,0-65.9c31.5-18.2,82.6-18.2,114.1,0C188.5,205.6,188.5,235.1,157,253.3z"/></g><g><path class="st2" d="M88.1,212.2c0-3.8,5.3-25.3,11.9-25.3c6.6,0,11.9,21.5,11.9,25.3c0,3.8-5.3,6.9-11.9,6.9C93.4,219,88.1,216,88.1,212.2z"/></g></g></g></svg>';
      
    }else if(modeNum == 3){
      planeIcon.innerHTML ='<svg width="60px" version="1.1" id="レイヤー_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"y="0px" viewBox="0 0 500 409.3" style="enable-background:new 0 0 500 409.3;" xml:space="preserve"><style type="text/css">.st0{fill:#FCF000;}.st1{fill:#FFC800;}.st2{fill:#E7E7E7;}.st3{fill:#EBEBEB;}.st4{fill:#D2D2D2;}.st5{fill:#B4B4B4;}.st6{fill:#FAFAFA;}.st7{fill:#006EDC;}.st8{fill:#0082F0;}.st9{fill:#A6E5F7;}.st10{fill:#B1B1B1;}.st11{fill:#FDF666;}.st12{fill:#FFAFBE;}.st13{fill:#AFD264;}.st14{fill:#EE755E;}</style><g><g><g><path class="st0" d="M184.2,341.5c0,27.2-22,49.2-49.2,49.2c-27.2,0-49.2-22-49.2-49.2c0-27.2,22-49.2,49.2-49.2C162.1,292.3,184.2,314.3,184.2,341.5z"/><ellipse transform="matrix(0.1574 -0.9875 0.9875 0.1574 -29.671 648.2226)" class="st1" cx="365" cy="341.5" rx="49.2" ry="49.2"/></g></g><g><path class="st0" d="M194.1,353.5c0,30.8,25,55.9,55.9,55.9V297.6C219.2,297.6,194.1,322.6,194.1,353.5z"/><path class="st0" d="M250,297.6v111.7c30.9,0,55.9-25,55.9-55.9C305.9,322.6,280.9,297.6,250,297.6z"/></g><polygon class="st2" points="250,190.3 250,190.3 250,190.3 "/><g><g><path class="st3" d="M250,190.3L250,190.3l-9.1-9.1l-9.1-9.1C102.2,177.5,0,238.6,0,286.5c0,4.1,0.8,8.1,2.2,12.1c8.2,22.4,38.7,42.2,83.2,56.3c44,14,101.6,22.5,164.6,22.5l0,0V190.3L250,190.3z"/><path class="st4" d="M268.2,172.1l-9.1,9.1l-9.1,9.1v187.1c63,0,120.6-8.5,164.6-22.5c44.5-14.2,75-34,83.2-56.3c1.5-4,2.2-8,2.2-12.1C500,238.6,397.8,177.5,268.2,172.1z"/></g><path class="st5" d="M497.8,298.6L259.1,181.2l-9.1,9.1l164.6,164.6C459.1,340.8,489.6,321,497.8,298.6z"/><path class="st6" d="M231.8,172.1C102.2,177.5,0,238.6,0,286.5c0,4.1,0.8,8.1,2.2,12.1l238.7-117.4L231.8,172.1z"/><path class="st4" d="M85.4,354.9c44,14,101.6,22.5,164.6,22.5V190.3L85.4,354.9z"/></g><path class="st0" d="M398.4,203.5c-8.6,0-15.6,7-15.6,15.6c0,8.6,7,15.6,15.6,15.6c8.6,0,15.6-7,15.6-15.6C414,210.5,407,203.5,398.4,203.5z"/><path class="st0" d="M101.6,203.5c8.6,0,15.6,7,15.6,15.6c0,8.6-7,15.6-15.6,15.6c-8.6,0-15.6-7-15.6-15.6C86,210.5,93,203.5,101.6,203.5z"/><path class="st7" d="M250,209.8c-84.5,0-152.9-6.2-152.9-27.6v69.7c0,25.2,68.5,45.7,152.9,45.7c84.5,0,152.9-20.5,152.9-45.7v-69.7C402.9,203.6,334.5,209.8,250,209.8z"/><g><path class="st8" d="M96.4,180.7c0,24.1,68.8,43.6,153.6,43.6v-87.1C165.2,137.2,96.4,156.7,96.4,180.7z"/><path class="st8" d="M250,137.2v87.1c84.8,0,153.6-19.5,153.6-43.6C403.6,156.7,334.8,137.2,250,137.2z"/></g><g><path class="st9" d="M250,56.1c-68.1,0-123.4,49.9-123.4,111.6c0,15.1,55.2,33.2,123.4,33.2s123.4-16.1,123.4-33.2C373.4,106,318.1,56.1,250,56.1z"/><g><path class="st10" d="M244.1,29.8v36.6c0,3.3,2.7,5.9,5.9,5.9V23.9C246.7,23.9,244.1,26.5,244.1,29.8z"/><path class="st10" d="M250,23.9v48.4c3.3,0,5.9-2.7,5.9-5.9V29.8C255.9,26.5,253.3,23.9,250,23.9z"/></g></g><path class="st6" d="M201.2,111.6c0,9.6-7.8,17.4-17.4,17.4c-9.6,0-17.4-7.8-17.4-17.4s7.8-17.4,17.4-17.4C193.4,94.2,201.2,102,201.2,111.6z"/><path class="st11" d="M250,238.4c-12.5,0-22.7,10.2-22.7,22.7c0,12.5,10.2,22.7,22.7,22.7c12.5,0,22.7-10.2,22.7-22.7C272.7,248.5,262.5,238.4,250,238.4z"/><path class="st12" d="M358.1,224.6c-12.5,0-22.7,10.2-22.7,22.7c0,12.5,10.2,22.7,22.7,22.7c12.5,0,22.7-10.2,22.7-22.7C380.8,234.7,370.6,224.6,358.1,224.6z"/><path class="st13" d="M141.9,224.6c12.5,0,22.7,10.2,22.7,22.7c0,12.5-10.2,22.7-22.7,22.7c-12.5,0-22.7-10.2-22.7-22.7C119.2,234.7,129.4,224.6,141.9,224.6z"/><path class="st14" d="M250,0c-11.9,0-21.5,9.6-21.5,21.5c0,11.9,9.6,21.5,21.5,21.5c11.9,0,21.5-9.6,21.5-21.5C271.5,9.6,261.9,0,250,0z"/></g></svg>';
    }else{
      
    }
    
  }
  
  // ウィンドウオープン
  function open(e) {
    
    // モード別にゲームタイトルをセット
    if(e.target.value == 1){
      gameTitle.innerText ='ロボ団で使う英単語';
      wordset(1);
      backgroundSet(1);
      icon(1);
    }else if(e.target.value == 2){
      gameTitle.innerText ='ロボ団で使う英単語（ワードブロック）';
      wordset(2);
      backgroundSet(2);
      icon(2);
    }else if(e.target.value == 3){
      gameTitle.innerText ='ロボ団で使う英単語（Python）';
      wordset(3);
      backgroundSet(3);
      icon(3);
    }else{
      
    }
    
    isOpen = true;
    overlay.style.display = 'block';
    // overlay.style.width = document.body.clientWidth + 'px';
    // overlay.style.height = document.body.clientHeight + 'px';
    overlay.style.width = document.body.scrollWidth + 'px';
    overlay.style.height = document.body.scrollHeight + 'px';
    // console.log('scrollHeight:' + document.body.clientHeight);
    game.style.display = 'block';
    glitterEls.style.display = 'none';
    // game.style.top = window.pageYOffset + window.innerHeight / 2 - game.clientHeight / 2 + 'px';
    // game.style.left = window.innerWidth / 2 - game.clientWidth / 2 + 'px';
    
    game.style.top = window.pageYOffset + window.innerHeight / 15 + 'px';
    game.style.left = window.innerWidth / 2 - game.clientWidth / 2 + 'px';
    // console.log('pageYOffset:' + window.pageYOffset);
    // console.log('innerHeight:' + window.innerHeight);
    // console.log('clientHeight:' + game.clientHeight);
    // console.log(game.style.top);
    
    if (isFirst) {
      document.body.appendChild(overlay);
      document.body.appendChild(game);
      document.head.insertAdjacentHTML('beforeend', '<style id="custom-css"></style>');
    } else {
      view1.style.display = 'table-cell';
      view2.style.display = 'none';
      result.style.display = 'none';
    }

    let fData = localStorage.getItem('flags');
    if (fData) {
      fData = JSON.parse(fData);
      for (let i = 0; i < fData.length; i++) {
        if (!fData[i]) onBtns[i].click();
      }
    }

    isFirst = false;
  }
  
  // スタート処理
  function start() {
    view1.style.display = 'none';
    view2.style.display = 'block';
    startMsg.style.display = 'block';
    glitterEls.style.display = 'block';

    startFlag = true;
    sWait = true;
    space.classList.add('active');

    flagR = flags[0];
    flagK = flags[1];
    flagG = flags[2];
    flagW = flags[3];
    flagS = flags[4];
    flags = [flagR, flagK, flagG, flagW, flagS];
    localStorage.setItem('flags', JSON.stringify(flags));
    
  }

  // カウントダウン処理
  function ready() {
    startMsg.style.display = 'none';
    button1.style.display = 'none';
    const count = document.createElement('div');
    count.id = 'countdown';
    startMsg.after(count);
    let readyTime = 3;
    count.innerHTML = readyTime;
    playSound(3);
    const readyTimer = setInterval(() => {
      readyTime--;
      if (readyTime == 0) {
        clearInterval(readyTimer);
        count.remove();
        gameInit();
      }
      count.innerHTML = readyTime;
    }, 1000);
  }

  // ゲーム開始処理
  function gameInit() {
    count = 0;
    idx1 = 0;
    idx2 = 0;
    temp = '';
    correct = 0;
    miss = 0;
    ridx = [];
    record = [];
    recordHTML = '';
    weakKeys = [];
    nFlag = false;
    missFlag = false;
    button1.style.display = 'block';
    
    if (moPlay) {
      let missJP1 = [];
      let missJP2 = [];
      for (let i = 0; i < recordM.length; i++) {
        missJP1.push(wordJP1[recordM[i]]);
        missJP2.push(wordJP2[recordM[i]]);
      }
      if (backup1.length == 0) {
        backup1 = [...wordJP1];
        backup2 = [...wordJP2];
      }
      wordJP1 = missJP1;
      wordJP2 = missJP2;
    } else {
      if (backup1.length > 0) {
        wordJP1 = [...backup1];
        wordJP2 = [...backup2];
        backup1 = [];
        backup2 = [];
      }
    }
    recordM = [];

    let idx;
    let a = [...Array(wordJP2.length).keys()];
    if (random) {
      while (a.length > 0) {
        idx = Math.floor(Math.random() * a.length);
        ridx.push(a[idx]);
        a.splice(idx, 1);
      }
    } else {
      ridx = a;
    }

    wordRs = [];
    for (let i = 0; i < wordJP2.length; i++) {
      wordRs.push(kanaToRoman(wordJP2[i]));
    }
    limit = (maxNum < wordJP2.length) ? maxNum : wordJP2.length;
    playing = true;
    begin = new Date();
    wordSet();

    let style = '';
    if (!flagR) {
      style += '#sentence span:not(.typed) {opacity: 0;}';
    }
    if (!flagK) {
      style += '#kana > div {opacity: 0;}';
    }
    document.getElementById('custom-css').innerHTML = style;

    if (flagW) {
      const cWPM = document.getElementById('current-wpm');
      cWPM.style.display = 'block';
      cWPM.innerHTML = 'タイプスピード: 0.00';
      const id = setInterval(() => {
        let time = new Date() - begin;
        let speed = correct / time * 60 * 1000;
        if (playing) {
          cWPM.innerHTML = 'タイプスピード: ' + speed.toFixed(2);
        } else {
          clearInterval(id);
          cWPM.innerHTML = '';
          cWPM.style.display = 'none';
        }
      }, 100);
    }

    if (flagS) {
      // const speedBar = document.getElementById('speed-bar');
      // const cover = speedBar.querySelector('.cover');
      // speedBar.style.display = 'block';
      // cover.style.transform = 'none';
      const id = setInterval(() => {
        let time = new Date() - begin;
        let speed = correct / time * 60 * 1000;
        if (playing) {
          // let scale = 1 - speed / 700;
          // cover.style.transform = 'scaleX(' + scale + ')';
          //---------------
          charamove(speed);
        } else {
          clearInterval(id);
          // cover.style.transform = 'none';
          // speedBar.style.display = 'none';
        }
      }, 100);
    }
  }
  
  // タイピング文章セット
  function wordSet() {
    if (count == limit) {
      finish();
    } else {
      example.innerHTML = '<div>' + wordJP1[ridx[count]] + '</div>';
      kana.innerHTML = '<div>' + wordJP2[ridx[count]] + '</div>';
      wordR = wordRs[ridx[count]];
      let html;
      html = '<div><span class="typed"></span><span>';
      for (let i = 0; i < wordR.length; i++) {
        html += wordR[i][0];
      }
      html += '</span></div>';
      sentence.innerHTML = html;
      pattern = new Array(wordR.length).fill(0);
      if (count > 0) {
        progress.style.transform = 'scaleX(' + (1 - count / limit) + ')';
      }
      count++;
      selActive();
      
      if(count > 1){
        playSound(4);
        loop_star();
        shuffleNumberCounter(targetWRM);
      }
      
    }
  }
                                                    
  //　キャラクター移動
  function charamove(speed) {

     position_x = speed*1.5;
    position.style.transform = 'translate(' + position_x + 'px,20px)';
  }

  // ゲーム終了
  function finish() {
    let time = new Date() - begin;
    playing = false;

    const active = keyboard.querySelector('.active');
    if (active) active.classList.remove('active');
    
    keyPositionRemove();
    playSound(5);

    view2.style.display = 'none';
    result.style.display = 'block';
    example.innerHTML = '';
    kana.innerHTML = '';
    sentence.innerHTML = '';
    progress.style.transform = 'none';
    glitterEls.style.display = 'none';

    // const resList = document.getElementById('example-list');
    const resData = result.querySelectorAll('.result-data');

    let speed, accuracy, score;
    speed = correct / time * 60 * 1000;
    accuracy = correct / (correct + miss);
    score = isStopped ? '-' : Math.floor(speed * accuracy ** 3);
   

    // let html;
    // html = '<ul>';
    // for (let i = 0; i < limit; i++) {
    //   html += '<li>';
    //   html += '<div class="example">' + wordJP1[ridx[i]] + '</div>';
    //   html += '<div class="sentence">';
    //   wordR = wordRs[ridx[i]];
    //   if (isStopped) {
    //     if (record[i]) {
    //       html += record[i];
    //     } else {
    //       if (!!recordHTML) {
    //         html += recordHTML;
    //         recordHTML = '';
    //         if (missFlag) {
    //           weakKeys.push(wordR[idx1][pattern[idx1]][idx2]);
    //           html += '<span class="miss">' + wordR[idx1][pattern[idx1]][idx2] + '</span>';
    //           missFlag = false;
    //         } else {
    //           html += wordR[idx1][pattern[idx1]][idx2];
    //         }
    //         for (let j = idx2 + 1; j < wordR[idx1][pattern[idx1]].length; j++) {
    //           html += wordR[idx1][pattern[idx1]][j];
    //         }
    //         for (let j = idx1 + 1; j < wordR.length; j++) {
    //           html += wordR[j][0];
    //         }
    //       } else {
    //         if (missFlag) {
    //           weakKeys.push(wordR[0][0][0]);
    //           html += '<span class="miss">' + wordR[0][0][0] + '</span>';
    //           for (let j = 1; j < wordR[0][0].length; j++) {
    //             html += wordR[0][0][j];
    //           }
    //           for (let j = 1; j < wordR.length; j++) {
    //             html += wordR[j][0];
    //           }
    //           missFlag = false;
    //         } else {
    //           for (let j = 0; j < wordR.length; j++) {
    //             html += wordR[j][0];
    //           }
    //         }
    //       }
    //     }
    //   } else {
    //     html += record[i];
    //   }
    //   html += '</div></li>';
    // }
    // html += '</ul>';
    // resList.innerHTML = html;

    // if (gameData.length > 0) {
    //   // html = '<ul>'
    //   // html += '<li><div class="data">' + gameData[0] + '</div></li>';
    //   // html += '<li><div class="data">' + gameData[1] + '</div></li>';
    //   // html += '<li><div class="data">' + gameData[2] + '</div></li>';
    //   // html += '<li><div class="data">' + gameData[3] + '</div></li>';
    //   // html += '<li><div class="data">' + gameData[4] + '</div></li>';
    //   // html += '<li><div class="data">' + gameData[5] + '</div></li>';
    //   // html += '<li><div class="data">' + gameData[6] + '</div></li>';
    //   // html += '<li><div class="data">' + gameData[7] + '</div></li>';
    //   // html += '</ul>';
    //   // html = '<table>'
    //   html += '<tr><td><div class="data">' + gameData[0] + '</div></td>';
    //   html += '<td><div class="data">' + gameData[1] + '</div></td>';
    //   html += '<td><div class="data">' + gameData[2] + '</div></td>';
    //   html += '<td><div class="data">' + gameData[3] + '</div></td></tr>';
    //   html += '<td><div class="data">' + gameData[4] + '</div></td>';
    //   html += '<td><div class="data">' + gameData[5] + '</div></td>';
    //   html += '<td><div class="data">' + gameData[6] + '</div></td>';
    //   html += '<td><div class="data">' + gameData[7] + '</div></td></tr>';
    //   html += '</table>';
    // } else {
    //   html = '<table><tr>'
    //   html += '<td><div class="data">-</div></td>';
    //   html += '<td><div class="data">-</div></td>';
    //   html += '<td><div class="data">-</div></td>';
    //   html += '<td><div class="data">-</div></td>';
    //   html += '<td><div class="data">-</div></td>';
    //   html += '<td><div class="data">-</div></td>';
    //   html += '<td><div class="data">-</div></td>';
    //   html += '<td><div class="data">-</div></td>';
    //   html += '</tr></table>';
    // }
    // resData[1].innerHTML = html;

    // html = '<ul>';
    // html += '<li><div class="title">スコア</div><div class="data">' + score + '</div></li>';
    // html += '<li><div class="title">レベル</div><div class="data">' + getLevel(score) +'</div></li>';
    // html += '<li><div class="title">入力時間</div><div class="data">' + convTime(time) + '</div></li>';
    // html += '<li><div class="title">入力文字数</div><div class="data">' + correct + '</div></li>';
    // html += '<li><div class="title">ミス入力数</div><div class="data">' + miss + '</div></li>';
    // html += '<li><div class="title">WPM</div><div class="data">' + convStr(speed.toFixed(2)) + '</div></li>';
    // html += '<li><div class="title">正確率</div><div class="data">' + convStr((accuracy * 100).toFixed(2)) + '%</div></li>';
    // html += '<li><div class="title">苦手キー</div><div class="data">' + getWeaks(weakKeys) + '</div></li>';
    // html += '</ul>';
    
    html ='<div class="result-summary-container"><div class="result-box"><h3>ほしのかず</h3><div class="inner"><div class="inner-content"><div class="header-menu"><img src="https://robodone-dev.github.io/typing/js_typing_game-master/img/star-yellow.svg"><span>×</span><div class="number">' + targetNum +'</div></div></div></div></div><div class="result-box"><h3>レベル</h3><div class="inner"><div class="inner-content"><span>'+ getLevel(score) + '</span></div></div></div></div>'
    
    
    html += '<table><tr><th>スコア</th><th>入力時間</th><th>入力文字数</th><th>ミス入力数</th><th>タイプスピード</th><th>正確率</th><th>苦手キー</th></tr><tr>';
    html += '<td><d class="data">' + score + '</td>';
    // html += '<td><div class="data">' + getLevel(score) +'</td>';
    html += '<td><div class="data">' + convTime(time) + '</td>';
    html += '<td><div class="data">' + correct + '</td>';
    html += '<td><div class="data">' + miss + '</td>';
    html += '<td><div class="data">' + convStr(speed.toFixed(2)) + '</td>';
    html += '<td><div class="data">' + convStr((accuracy * 100).toFixed(2)) + '%</td>';
    html += '<td><div class="data">' + getWeaks(weakKeys) + '</td>';
    html += '</tr></table>';
    
    
    
    resData[0].innerHTML = html;
    gameData = [score, getLevel(score), convTime(time), correct, miss, convStr(speed.toFixed(2)), convStr((accuracy * 100).toFixed(2)) + '%', getWeaks(weakKeys)];
    // console.log(gameData);
    
    if (resCmt) {
      const resComment = document.getElementById('result-comment');
      const container = resComment.querySelector('.container');
      const comment1 = 'ノーミス達成！おめでとうございます。';
      const comment2 = '惜しい！あと1文字。次はミス0を狙いましょう。';
      const comments = ['日々の練習が結果に繋がります。', '速さよりも正確性のほうがスコアに響きます。'];
      if (!isStopped) {
        if (miss == 0) {
          container.innerHTML = comment1;
        } else if (miss == 1) {
          container.innerHTML = comment2;
        } else {
          let idx = Math.floor(Math.random() * comments.length);
          container.innerHTML = comments[idx];
        }
      } else {
        container.innerHTML = '---';
      }
    }

    isStopped = false;

    const moBtn = document.getElementById('miss-only-button');
    if (recordM.length > 0) {
      if (!moBtn) {
        const button6 = document.createElement('button');
        button6.type = 'button';
        button6.id = 'miss-only-button';
        button6.classList.add('btn');
        button6.innerHTML = 'ミスだけ';
        button6.addEventListener('click', () => {
          moPlay = true;
          sWait = true;
          result.style.display = 'none';
          view2.style.display = 'block';
          startMsg.style.display = 'block';
          space.classList.add('active');
          
           //　スタースコア初期化
          target.innerHTML = 0;
          //キャラ位置初期化
          position.style.transform = 'translate(0px,20px)';
        });
        const btnArea = document.getElementById('btn-area');
        btnArea.appendChild(button6);
      }
    } else {
      if (moBtn) {
        moPlay = false;
        moBtn.remove();
      }
    }
  }

  // かな->ローマ変換
  function kanaToRoman(kana) {
    const romanMap = {
      'あ':['a'], 'い':['i', 'yi'], 'う':['u', 'wu'], 'え':['e'], 'お':['o'],
      'か':['ka', 'ca'], 'き':['ki'], 'く':['ku', 'cu', 'qu'], 'け':['ke'], 'こ':['ko', 'co'],
      'さ':['sa'], 'し':['si', 'shi', 'ci'], 'す':['su'], 'せ':['se', 'ce'], 'そ':['so'],
      'た':['ta'], 'ち':['ti', 'chi'], 'つ':['tu', 'tsu'], 'て':['te'], 'と':['to'],
      'な':['na'], 'に':['ni'], 'ぬ':['nu'], 'ね':['ne'], 'の':['no'],
      'は':['ha'], 'ひ':['hi'], 'ふ':['fu', 'hu'], 'へ':['he'], 'ほ':['ho'],
      'ま':['ma'], 'み':['mi'], 'む':['mu'], 'め':['me'], 'も':['mo'],
      'や':['ya'], 'ゆ':['yu'], 'よ':['yo'],
      'ら':['ra'], 'り':['ri'], 'る':['ru'], 'れ':['re'], 'ろ':['ro'],
      'わ':['wa'], 'ゐ':['wyi'], 'ゑ':['wye'], 'を':['wo'], 'ん':['nn', 'xn', 'n'],
      'が':['ga'], 'ぎ':['gi'], 'ぐ':['gu'], 'げ':['ge'], 'ご':['go'],
      'ざ':['za'], 'じ':['ji', 'zi'], 'ず':['zu'], 'ぜ':['ze'], 'ぞ':['zo'],
      'だ':['da'], 'ぢ':['di'], 'づ':['du'], 'で':['de'], 'ど':['do'],
      'ば':['ba'], 'び':['bi'], 'ぶ':['bu'], 'べ':['be'], 'ぼ':['bo'],
      'ぱ':['pa'], 'ぴ':['pi'], 'ぷ':['pu'], 'ぺ':['pe'], 'ぽ':['po'],
      'うぁ':['wha'], 'うぃ':['whi'], 'うぇ':['whe'], 'うぉ':['who'],
      'きゃ':['kya'], 'きぃ':['kyi'], 'きゅ':['kyu'], 'きぇ':['kye'], 'きょ':['kyo'],
      'くぁ':['qa', 'qwa'], 'くぃ':['qi', 'qwi'], 'くぇ':['qe', 'qwe'], 'くぉ':['qo', 'qwo'], 'くゃ':['qya'], 'くゅ':['qyu'], 'くょ':['qyo'],
      'しゃ':['sya', 'sha'], 'しぃ':['syi'], 'しゅ':['syu', 'shu'], 'しぇ':['sye', 'she'], 'しょ':['syo', 'sho'],
      'つぁ':['tsa'], 'つぃ':['tsi'], 'つぇ':['tse'], 'つぉ':['tso'],
      'ちゃ':['tya', 'cha'], 'ちぃ':['tyi'], 'ちゅ':['tyu', 'chu'], 'ちぇ':['tye', 'che'], 'ちょ':['tyo', 'cho'],
      'てゃ':['tha'], 'てぃ':['thi'], 'てゅ':['thu'], 'てぇ':['the'], 'てょ':['tho'],
      'とぁ':['twa'], 'とぃ':['twi'], 'とぅ':['twu'], 'とぇ':['twe'], 'とぉ':['two'],
      'ひゃ':['hya'], 'ひぃ':['hyi'], 'ひゅ':['hyu'], 'ひぇ':['hye'], 'ひょ':['hyo'],
      'ふぁ':['fa'], 'ふぃ':['fi'], 'ふぇ':['fe'], 'ふぉ':['fo'],
      'にゃ':['nya'], 'にぃ':['nyi'], 'にゅ':['nyu'], 'にぇ':['nye'], 'にょ':['nyo'],
      'みゃ':['mya'], 'みぃ':['myi'], 'みゅ':['myu'], 'みぇ':['mye'], 'みょ':['myo'],
      'りゃ':['rya'], 'りぃ':['ryi'], 'りゅ':['ryu'], 'りぇ':['rye'], 'りょ':['ryo'],
      'ヴぁ':['va'], 'ヴぃ':['vi'], 'ヴ':['vu'], 'ヴぇ':['ve'], 'ヴぉ':['vo'],
      'ぎゃ':['gya'], 'ぎぃ':['gyi'], 'ぎゅ':['gyu'], 'ぎぇ':['gye'], 'ぎょ':['gyo'],
      'ぐぁ':['gwa'], 'ぐぃ':['gwi'], 'ぐぅ':['gwu'], 'ぐぇ':['gwe'], 'ぐぉ':['gwo'],
      'じゃ':['ja', 'zya'], 'じぃ':['jyi', 'zyi'], 'じゅ':['ju', 'zyu'], 'じぇ':['je', 'zye'], 'じょ':['jo', 'zyo'],
      'でゃ':['dha'], 'でぃ':['dhi'], 'でゅ':['dhu'], 'でぇ':['dhe'], 'でょ':['dho'],
      'ぢゃ':['dya'], 'ぢぃ':['dyi'], 'ぢゅ':['dyu'], 'ぢぇ':['dye'], 'ぢょ':['dyo'],
      'びゃ':['bya'], 'びぃ':['byi'], 'びゅ':['byu'], 'びぇ':['bye'], 'びょ':['byo'],
      'ぴゃ':['pya'], 'ぴぃ':['pyi'], 'ぴゅ':['pyu'], 'ぴぇ':['pye'], 'ぴょ':['pyo'],
      'ぁ':['la', 'xa'], 'ぃ':['li', 'xi'], 'ぅ':['lu', 'xu'], 'ぇ':['le', 'xe'], 'ぉ':['lo', 'xo'],
      'ゃ':['lya', 'xya'], 'ゅ':['lyu', 'xyu'], 'ょ':['lyo', 'xyo'], 'っ':['ltu', 'xtu'],
      'ー':['-'], ',':[','], '.':['.'], '、':[','], '。':['.'],
      '・':['/'], '&#12289;':[','], '&#12290;':['.'], '&#12539;':['/']
    };

    let remStr = String(kana), slStr, roman, next;
    let result = [];

    function splice() {
      let oneChar = remStr.slice(0, 1);
      remStr = remStr.slice(1);
      return oneChar;
    }

    function isSmallChar() {
      return !!remStr.slice(0, 1).match(/^[ぁぃぅぇぉゃゅょ]$/);
    }

    while (remStr) {
      slStr = splice();
      next = romanMap[remStr.slice(0, 1)];
      if (slStr == 'っ') {
        if (!remStr || remStr.match(/^[,.]/) || !next || next[0].match(/^[aiueon]/)) {
          roman = [...romanMap[slStr]];
          result.push(roman);
        } else {
          slStr = splice();
          if (isSmallChar()) slStr += splice();
          roman = [...romanMap[slStr].map(str => str.slice(0, 1) + str)];
          result.push(roman);
        }
      } else {
        if (isSmallChar()) slStr += splice();
        if (slStr == '&') {
          slStr += remStr.slice(0, 7);
          remStr = remStr.slice(7);
        }
        roman = romanMap[slStr] ? [...romanMap[slStr]] : [...slStr];
        if (slStr == 'ん') {
          if (!remStr) {
            roman.pop();
          } else {
            if (next[0].match(/^[aiueony]/)) roman.pop();
          }
        }
        result.push(roman);
      }
    }

    return result;
  }

  // 打った部分の色付け
  function colorTyped() {
    let html = '<div><span class="typed">';
    if (idx1 > 0) {
      for (let i = 0; i < idx1; i++) {
        html += wordR[i][pattern[i]];
      }
    }
    for (let i = 0; i <= idx2; i++) {
      html += wordR[idx1][pattern[idx1]][i];
    }
    html += '</span><span>';
    for (let i = idx2 + 1; i < wordR[idx1][pattern[idx1]].length; i++) {
      html += wordR[idx1][pattern[idx1]][i];
    }
    for (let i = idx1 + 1; i < wordR.length; i++) {
      html += wordR[i][pattern[i]];
    }
    html += '</span></div>';
    return html;
  }

  // テキスト移動処理
  function textMove() {
    const textS = document.querySelector('#sentence > div');
    const textE = document.querySelector('#example > div');
    const textK = document.querySelector('#kana > div');
    const textS1 = textS.querySelector('.typed');
    const textS2 = textS.querySelector('span:not(.typed)');
    let remLen = textS2.innerText.length;
    if (idx1 == 0) {
      over1 = textS.clientWidth - 580;
      over2 = textE.clientWidth - 580;
      over3 = textK.clientWidth - 580;
      left1 = 0, left2 = 0, left3 = 0;
    }
    if (textS.clientWidth > 580) {
      if (textS1.getBoundingClientRect().width > 310) {
        let move1 = textS2.getBoundingClientRect().width / remLen;
        left1 += move1;
        textS.style.left = -left1 + 'px';
      }
    }
    if (textE.clientWidth > 580) {
      let move2 = over2 / remLen;
      left2 += move2;
      textE.style.left = -left2 + 'px';
      over2 -= move2;
    }
    if (textK.clientWidth > 580) {
      let move3 = over3 / remLen;
      left3 += move3;
      textK.style.left = -left3 + 'px';
      over3 -= move3;
    }
  }

  // ミス入力処理
  function missed() {
    miss++;
    playSound(1);
    if (recordM.indexOf(ridx[count - 1]) == -1) {
      recordM.push(ridx[count - 1]);
    }
    mScreen.classList.add('missed');
    setTimeout(() => {
      mScreen.classList.remove('missed');
    }, 200);
  }

  // アクティブキー処理
  function selActive() {
    const prevActive = keyboard.querySelector('.active');
    const selector = '.key_' + keyConvert(wordR[idx1][pattern[idx1]][idx2]);
    const target = keyboard.querySelector(selector);
    if (prevActive) {
      prevActive.classList.remove('active');
    }
    if (target && flagG) {
      target.classList.add('active');
      keyPosition(selector);
      
    }
  }
  
  function keyPositionRemove(){
    littleLeft.classList.remove('on');
    ringLeft.classList.remove('on');
    middleLeft.classList.remove('on');
    indexLeft.classList.remove('on');
    thumbLeft.classList.remove('on');
    
    thumbRight.classList.remove('on');
    ringRight.classList.remove('on');
    middleRight.classList.remove('on');
    indexRight.classList.remove('on');
    littleRight.classList.remove('on');
  }
  
  // ポジションガイド
  function keyPosition(selector){
    // console.log(selector);    
    if (littleLeftLine.includes(selector)){
      keyPositionRemove();
      littleLeft.classList.add('on');
    }else if(ringLeftLine.includes(selector)){
      keyPositionRemove();
      ringLeft.classList.add('on');
    }else if(middleLeftLine.includes(selector)){
      keyPositionRemove();
      middleLeft.classList.add('on');
    }else if(indexLeftLine.includes(selector)){
      keyPositionRemove();
      indexLeft.classList.add('on');
    }else if(thumbLeftLine.includes(selector)){
      keyPositionRemove();
      thumbLeft.classList.add('on');
    }else if(thumbRightLine.includes(selector)){
      keyPositionRemove();
      thumbRight.classList.add('on');
    }else if(indexRightLine.includes(selector)){
      keyPositionRemove();
      ringRight.classList.add('on');
    }else if(middleRightLine.includes(selector)){
      keyPositionRemove();
      middleRight.classList.add('on');
    }else if(ringRightLine.includes(selector)){   
      keyPositionRemove();
      indexRight.classList.add('on');
    }else if(littleRightLine.includes(selector)){
      keyPositionRemove();
      littleRight.classList.add('on');
    }else{
    
    }
    
  }

  // 対応キーの変換
  function keyConvert(key) {
    const keyMap = {
      '-':'hyphen', '@':'atmark', ';':'semicolon', ':':'colon', ',':'comma',
      '.':'period', '/':'slash', ' ':'space'
    }

    if (keyMap[key]) {
      return keyMap[key];
    } else {
      return key;
    }
  }

  // タイピングレベル判定
  function getLevel(score) {
    let level;
    if (score == '-') {
      level = '-';
    } else {
      switch (true) {
        case 0 <= score && score <= 21:
          level = 'E-';
          break;
        case 21 < score && score <= 38:
          level = 'E';
          break;
        case 38 < score && score <= 55:
          level = 'E+';
          break;
        case 55 < score && score <= 72:
          level = 'D-';
          break;
        case 72 < score && score <= 89:
          level = 'D';
          break;
        case 89 < score && score <= 106:
          level = 'D+';
          break;
        case 106 < score && score <= 123:
          level = 'C-';
          break;
        case 123 < score && score <= 140:
          level = 'C';
          break;
        case 140 < score && score <= 157:
          level = 'C+';
          break;
        case 157 < score && score <= 174:
          level = 'B-';
          break;
        case 174 < score && score <= 191:
          level = 'B';
          break;
        case 191 < score && score <= 208:
          level = 'B+';
          break;
        case 208 < score && score <= 225:
          level = 'A-';
          break;
        case 225 < score && score <= 242:
          level = 'A';
          break;
        case 242 < score && score <= 259:
          level = 'A+';
          break;
        case 259 < score && score <= 276:
          level = 'S';
          break;
        case 276 < score && score <= 299:
          level = 'Good!';
          break;
        case 299 < score && score <= 324:
          level = 'Fast';
          break;
        case 324 < score && score <= 349:
          level = 'Thunder';
          break;
        case 349 < score && score <= 374:
          level = 'Ninja';
          break;
        case 374 < score && score <= 399:
          level = 'Comet';
          break;
        case 399 < score && score <= 449:
          level = 'Professor';
          break;
        case 449 < score && score <= 499:
          level = 'LaserBeam';
          break;
        case 499 < score && score <= 549:
          level = 'EddieVH';
          break;
        case 549 < score && score <= 599:
          level = 'Meijin';
          break;
        case 599 < score && score <= 649:
          level = 'Rocket';
          break;
        case 649 < score && score <= 699:
          level = 'Tatsujin';
          break;
        case 699 < score && score <= 749:
          level = 'Jedi';
          break;
        case 749 < score && score <= 799:
          level = 'Godhand';
          break;
        case 799 < score:
          level = 'Joker';
          break;
      }
    }
    return level;
  }

  // 苦手キー上位5個を取得
  function getWeaks(keys) {
    let keyData1 = {};
    keys.forEach((key) => {
      if (keyData1[key] != undefined) {
        keyData1[key] += 1;
      } else {
        keyData1[key] = 1;
      }
    });
    let keyData2 = Object.keys(keyData1).map(k => ({key:k, miss:keyData1[k]}));
    keyData2.sort((a, b) => b.miss - a.miss);

    let res = '';
    let max = (keyData2.length < 5) ? keyData2.length : 5;
    for (let i = 0; i < max; i++) {
      if (i != max - 1) {
        res += keyData2[i].key + ' ';
      } else {
        res += keyData2[i].key;
      }
    }
    return res;
  }

  // 入力時間の変換
  function convTime(time) {
    let m, ms, s, res;
    if (time >= 60000) {
      m = Math.floor(time / 60000);
      ms = time - m * 60000;
      s = (ms / 1000).toFixed(2);
      res = m + '分' + s.slice(0, -3) + '秒' + s.slice(-2);
    } else {
      s = (time / 1000).toFixed(2);
      res = s.slice(0, -3) + '秒' + s.slice(-2);
    }
    return res;
  }

  // 文字列データの変換
  function convStr(str) {
    let res;
    if (str == 'NaN') {
      res = '0';
    } else {
      if (str.slice(-2) == '00') {
        res = str.slice(0, -3);
      } else {
        res = str;
      }
    }
    return res;
  }

  // スイッチ処理
  function toggle(idx, flag) {
    if (flag) {
      onBtns[idx].click();
    } else {
      offBtns[idx].click();
    }
  }
  
  // リプレイ処理
  function replay() {
    moPlay = false;
    result.style.display = 'none';
    view2.style.display = 'block';
    startMsg.style.display = 'block';
    glitterEls.style.display = 'block';

    sWait = true;
    space.classList.add('active');
    //　スタースコア初期化
    target.innerHTML = 0;
    //キャラ位置初期化
    position.style.transform = 'translate(0px,20px)';
  }

  // クローズ処理
  function close() {
    isOpen = false;
    startFlag = false;
    playing = false;
    nFlag = false;
    missFlag = false;
    moPlay = false;
    gameData = [];
    
    //　スタースコア初期化
    target.innerHTML = 0;
    //キャラ位置初期化
    position.style.transform = 'translate(0px,20px)';
    
    const active = keyboard.querySelector('.active');
    if (active) active.classList.remove('active');

    view2.style.display = 'none';
    result.style.display = 'none';
    example.innerHTML = '';
    kana.innerHTML = '';
    sentence.innerHTML = '';
    progress.style.transform = 'none';
    overlay.style.display = 'none';
    game.style.display = 'none';
    glitterEls.style.display = 'none';
  }

  // ボタンクリック時 
  button1.addEventListener('click', close);
  button2.addEventListener('click', open);
  button22.addEventListener('click', open);
  button23.addEventListener('click', open);
  button3.addEventListener('click', start);
  button4.addEventListener('click', replay);
  button5.addEventListener('click', close);
  
  for (let i = 0; i < onBtns.length; i++) {
    onBtns[i].addEventListener('click', () => {
      onBtns[i].classList.remove('show');
      offBtns[i].classList.add('show');
      flags[i] = false;
    });
  }
  for (let i = 0; i < offBtns.length; i++) {
    offBtns[i].addEventListener('click', () => {
      offBtns[i].classList.remove('show');
      onBtns[i].classList.add('show');
      flags[i] = true;
    });
  }

  // キー押下時
  window.addEventListener('keydown', (event) => {
    let key = event.key;
    if (isOpen && !startFlag) {
      if (key == ' ') event.preventDefault();
      if (key == 'r') toggle(0, flags[0]);
      if (key == 'k') toggle(1, flags[1]);
      if (key == 'g') toggle(2, flags[2]);
      if (key == 'w') toggle(3, flags[3]);
      if (key == 's') toggle(4, flags[4]);
    }
    if (startFlag) { // ゲーム開始
      if (key == ' ') event.preventDefault();
      if (sWait) { // スペースキー入力待ちの場合
        if (key == ' ') {
          sWait = false;
          space.classList.remove('active');
          ready();
        }
      }
      if (playing) { // プレイ中
        if (key == 'Escape') { // Escを押した場合
          isStopped = true;
          finish();
        } else {
          temp += key;
          if (key == wordR[idx1][pattern[idx1]][idx2]) {
            sentence.innerHTML = colorTyped();
            if (missFlag) {
              recordHTML += '<span class="miss">' + key + '</span>';
              weakKeys.push(key);
              missFlag = false;
            } else {
              recordHTML += key;
              playSound(2);;
            }
            textMove();
            correct++;
            idx2++;
          } else {
            let reg = new RegExp('^' + temp);
            for (let i = 0; i < wordR[idx1].length; i++) {
              if (!!wordR[idx1][i].match(reg)) {
                pattern[idx1] = i;
                break;
              }
            }
            if (key == wordR[idx1][pattern[idx1]][idx2]) {
              sentence.innerHTML = colorTyped();
              if (missFlag) {
                recordHTML += '<span class="miss">' + key + '</span>';
                weakKeys.push(key);
                missFlag = false;
              } else {
                recordHTML += key;
              }
              textMove();
              correct++;
              idx2++;
            } else {
              if (wordR[idx1][pattern[idx1]] == 'nn' && wordR[idx1].length == 3) { // 「ん」の特別措置
                for (let i = 0; i < wordR[idx1 + 1].length; i++) {
                  if (key == wordR[idx1 + 1][i][0]) {
                    pattern[idx1] = 2;
                    pattern[idx1 + 1] = i;
                    nFlag = true;
                    correct++;
                    break;
                  }
                }
                if (!nFlag) {
                  missFlag = true;
                  missed();
                }
              } else {
                missFlag = true;
                temp = temp.slice(0, -1);
                missed();
              }
            }
          }
          if (idx2 == wordR[idx1][pattern[idx1]].length) {
            idx1++;
            if (nFlag) {
              idx2 = 0;
              sentence.innerHTML = colorTyped();
              textspeed();
              if (missFlag) {
                recordHTML += '<span class="miss">' + key + '</span>';
                weakKeys.push(key);
                missFlag = false;
              } else {
                recordHTML += key;
              }
              idx2 = 1;
              nFlag = false;
            } else {
              idx2 = 0;
            }
            temp = '';
          }
          if (idx1 == wordR.length) {
            record.push(recordHTML);
            recordHTML = '';
            idx1 = 0;
            wordSet();
          } else {
            if (!missFlag) selActive();
          }
        }
      }
    }
  });

  // リサイズ時
  window.addEventListener('resize', () => {
    if (isOpen) {
      // overlay.style.width = document.body.clientWidth + 'px';
      // overlay.style.height = document.body.clientHeight + 'px';
      overlay.style.width = document.body.scrollWidth + 'px';
      overlay.style.height = document.body.scrollHeight + 'px';
      game.style.top = window.pageYOffset + window.innerHeight / 2 - game.clientHeight / 2 + 'px';
      game.style.left = window.innerWidth / 2 - game.clientWidth / 2 + 'px';
    }
  });
})(window, document);

    var request;
    var status = 0;
    var stopflag = 0;
    var context;

    const audioTag = document.querySelectorAll('audio');
    const audioSorce = document.querySelectorAll('audio *');
    function playSound(audioNum) {
      request = new XMLHttpRequest();
      // request.open("GET", "https://robodone-dev.github.io/typing/js_typing_game-master/audio/push_norm.mp3", true);
      request.open("GET", audioSorce[audioNum].src, true);
      request.responseType = "arraybuffer";
      request.onload = completeOnLoad;
      request.send();
    }

    function completeOnLoad() {
      // var elem = document.getElementById("btn_push_normal");
      // elem.innerText = "再生中";

      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
      source = context.createBufferSource();

      // オーディオをデコード
      context.decodeAudioData(request.response, function (buf) {
        source.buffer = buf;
        source.loop = false;
        source.connect(context.destination);
        source.start(0);
      });
    }

    function playPause() {
      if (stopflag == 0) {
        context.suspend();
        stopflag = 1;
      } else {
        context.resume();
        stopflag = 0;
      }
    }

document.body.addEventListener("click", drop, false);

  function drop(e) {

    playSound(0);
    // document.getElementById('btn_push_normal').currentTime = 0; //連続クリックに対応
    // document.getElementById('btn_push_normal').play(); //クリックしたら音を再生
    
    //座標の取得
    var x = e.pageX;
    var y = e.pageY;

    //しずくになるdivの生成、座標の設定
    var sizuku = document.createElement("div");
    sizuku.style.top = y + "px";
    sizuku.style.left = x + "px";
    document.body.appendChild(sizuku);

    //アニメーションをする className を付ける
    sizuku.className = "sizuku";

    //アニメーションが終わった事を感知してしずくを remove する
    sizuku.addEventListener("animationend", function() {
        this.parentNode.removeChild(this);
    }, false);
  }
  



// マウスホバー時にキラキラを生成
// glitterEls.addEventListener("mouseenter",loop_star);

function loop_star(){
  for (let step = 0; step < 6; step++) {
    setTimeout(createStar,100*step);
  }
  
}

// キラキラを生成する関数
var targetNum = 0;
function createStar() {
  // https://web-dev.tech/front-end/javascript/glittering-effect-on-hover/
  const el = document.getElementById("js-glitter");
  const starEl = document.createElement("span");
  
  starEl.className = "star";
  starEl.style.left = Math.random() * el.clientWidth + "px";
  starEl.style.top = Math.random() * el.clientHeight + "px";
  el.appendChild(starEl);
  

  // 一定時間経つとキラキラを消す
  setTimeout(() => {
    starEl.remove();
  }, 1000);

};

// 参考：https://codepen.io/mismith0227/pen/RwLzGee?editors=1010
const target = document.querySelector('.number');
const targetWRM = document.getElementById('current-wpm');
const shuffleNumberCounter = (targetWRM) => {
  targetNum = Number(targetWRM.textContent.replace("タイプスピード: ", "")) /10;
  var initNum = Number(target.innerHTML);
  // console.log('target_pre:'+targetNum);
  targetNum = Math.round(targetNum + Number(target.innerHTML));
  // targetNum = Math.round(targetNum /10);
  // console.log('target:'+targetNum);
  // console.log('init:'+initNum);
  
  if (!targetNum) {
    return
  }

  var counterData = null
  const speed = 2000 / targetNum;
  
  const countUp = () => {
    if (Number.isInteger(targetNum)) {
      target.innerHTML = initNum;
    } else {
      target.innerHTML = `${initNum}.${Math.floor(Math.random() * 9)}`
    }

    initNum++
    // targetNum = initNum + targetNum;

    if (initNum > targetNum) {
      target.innerHTML = targetNum;
      clearInterval(counterData);
    }
  }
  
  counterData = setInterval(countUp, speed)
}

