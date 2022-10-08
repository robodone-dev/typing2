(function (window, document) {
  const overlay = document.createElement('div');
  overlay.id = 'game-overlay';
  const game = document.getElementById('game-screen');
  const gameTitle = document.getElementById('game-title');
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
  const allkeyPosition = document.getElementsByClassName('finger');
  const starScore = document.getElementById('star-score');
  const littleLeftLine = ['.key_1', '.key_q', '.key_a', '.key_z'];
  const ringLeftLine = ['.key_2', '.key_w', '.key_s', '.key_x'];
  const middleLeftLine = ['.key_3', '.key_e', '.key_d', '.key_c'];
  const indexLeftLine = ['.key_4', '.key_r', '.key_f', '.key_v', '.key_5', '.key_t', '.key_g', '.key_b'];
  const thumbLeftLine = [];
  const thumbRightLine = [];
  const indexRightLine = ['.key_6', '.key_y', '.key_h', '.key_n', '.key_7', '.key_u', '.key_j', '.key_m'];
  const middleRightLine = ['.key_8', '.key_i', '.key_k', '.key_comma'];
  const ringRightLine = ['.key_9', '.key_o', '.key_l', '.key_period'];
  const littleRightLine = ['.key_0', '.key_p', '.key_semicolon', '.key_slash'];
  var wordJP1 = [];
  var wordJP2 = [];
  let wordRs;
  let wordR;
  let record;
  let recordHTML;
  let recordM = [];
  let weakKeys;
  let gameData = [];
  let backup1 = [];
  let backup2 = [];
  let isFirst = !0;
  let isOpen = !1;
  let startFlag = !1;
  let sWait = !1;
  let playing = !1;
  let nFlag = !1;
  let missFlag = !1;
  let isStopped = !1;
  let moPlay = !1;
  let maxNum = 10;
  let random = !0;
  let resCmt = !0;
  let flagR = !0;
  let flagK = !0;
  let flagG = !0;
  let flagW = !0;
  let flagS = !0;
  let flags = [flagR, flagK, flagG, flagW, flagS];
  let ridx, limit, begin, count, idx1, idx2, pattern, temp, correct, miss;
  let over1, over2, over3, left1, left2, left3;

  function wordset(modeNum) {
    if (modeNum == 1) {
      wordJP1 = ['いふ', 'ふぉー', 'ふぉわいる'];
      wordJP2 = ['if', 'for', 'while']
    } else if (modeNum == 2) {
      wordJP1 = ['りんご', 'ばなな', 'おれんじ', 'りんご', 'ばなな', 'おれんじ'];
      wordJP2 = ['apple', 'banana', 'orange', 'apple', 'banana', 'orange']
    } else if (modeNum == 3) {
      wordJP1 = ['りんご', 'ばなな', 'おれんじ', 'りんご', 'ばなな', 'おれんじ'];
      wordJP2 = ['apple', 'banana', 'orange', 'apple', 'banana', 'orange']
    } else {}
  } 
  function backgroundSet(modeNum) {
    const screenback = document.getElementById('game-screen');
    if (modeNum == 1) {
      screenback.style.background = 'linear-gradient(25deg, #a7e7ff, #20c2ff)'
    } else if (modeNum == 2) {
      screenback.style.background = 'linear-gradient(24deg, #a7b1ff, #2056ff)'
    } else if (modeNum == 3) {
      screenback.style.background = 'linear-gradient(24deg, #d0a7ff, #8720ff)'
    } else {}
  }

  function icon(modeNum) {
    const planeIcon = document.getElementById('icon');
    if (modeNum == 1) {
      planeIcon.innerHTML = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 1131.53 379.304" enable-background="new 0 0 1131.53 379.304"xml:space="preserve" class="plane"><polygon fill="#ff6347" points="72.008,0 274.113,140.173 274.113,301.804 390.796,221.102 601.682,367.302 1131.53,0.223 "/><polygon fill="#cc4f39" points="1131.53,0.223 274.113,140.173 274.113,301.804 390.796,221.102 "/></svg>'
    } else if (modeNum == 2) {
      planeIcon.innerHTML = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 320 320" xml:space="preserve" class="plane"><g id="XMLID_941_"><path id="XMLID_942_" style="fill:#FFE98F;" d="M273.756,111.238c0-52.6-42.562-95.238-95.056-95.238s-95.052,42.638-95.052,95.238c0,19.74,5.995,38.078,16.263,53.287c-1.481,0.184-3,0.3-4.603,0.3c-51.97,0-88.43-32-88.43-32S0,143.188,0,166.857C0,242.598,61.284,304,136.878,304c75.598,0,136.878-61.402,136.878-137.143c0-9.325-2.216-16.569-6.028-22.212C271.618,134.247,273.756,122.995,273.756,111.238z"/><path id="XMLID_943_" style="fill:#FFDA44;" d="M160,17.847c-43.538,8.705-76.351,47.206-76.351,93.391c0,19.74,5.995,38.078,16.263,53.287c-1.481,0.184-3,0.3-4.603,0.3c-51.97,0-88.43-32-88.43-32S0,143.188,0,166.857C0,242.598,61.284,304,136.878,304c7.882,0,15.605-0.677,23.122-1.958V17.847z"/><path id="XMLID_944_" style="fill:#BE720D;" d="M272.539,95.813L320,126.146l-47.283,30.482C272.717,156.628,242.12,126.289,272.539,95.813z"/><path id="XMLID_945_" style="fill:#FF9811;" d="M320,126.146l-47.461-30.333c-16.646,16.677-15.021,33.314-10.136,44.96C262.4,141.079,320,126.146,320,126.146z"/><circle id="XMLID_946_" style="fill:#003638;" cx="200" cy="105.261" r="10"/><path id="XMLID_947_" style="fill:#FF9811;" d="M139.2,185.878c-10.136,0-19.961,4.877-27.467,8.267c-8.267,3.733-23.467,7.2-36.533,5.867c-17.388-1.775-32.267-8-41.692-15.325c8.283,48.417,49.826,85.95,100.06,87.578c2.01,0,3.667,0.014,5.632,0.014c23.858,0,43.2-19.341,43.2-43.2S163.059,185.878,139.2,185.878z"/></g></svg>'
    } else if (modeNum == 3) {
      planeIcon.innerHTML = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve" class="plane"><polygon style="fill:#FFE98F;" points="341.333,384 426.667,341.333 85.333,341.333 170.667,384 99.556,497.778 256,497.778 412.444,497.778 "/><polygon style="fill:#FFDA44;" points="426.667,341.333 256,341.333 256,497.778 412.444,497.778 341.333,384 "/><rect x="234.667" y="384" style="fill:#FFF8DA;" width="42.667" height="113.778"/><rect x="184.889" y="213.333" style="fill:#1E2E3B;" width="142.222" height="56.889"/><path style="fill:#FF5023;" d="M298.667,56.889c0-23.565-19.102-42.667-42.667-42.667c-23.565,0-42.667,19.102-42.667,42.667c0,15.791,8.583,29.567,21.333,36.945V128h42.667V93.834C290.082,86.455,298.667,72.68,298.667,56.889z"/><path style="fill:#BF3C1A;" d="M256,14.222V128h21.333V93.834c12.749-7.378,21.333-21.154,21.333-36.945C298.667,33.324,279.565,14.222,256,14.222z"/><rect x="85.333" y="341.333" style="fill:#1E2E3B;" width="341.333" height="42.667"/><path style="fill:#BFE4F8;" d="M426.667,277.333H384c0-70.579-57.421-128-128-128s-128,57.421-128,128H85.333c0-94.107,76.56-170.667,170.667-170.667S426.667,183.226,426.667,277.333z"/><g><path style="fill:#93C7EF;" d="M256,106.667v42.667c70.579,0,128,57.421,128,128h42.667C426.667,183.226,350.106,106.667,256,106.667z"/><path style="fill:#93C7EF;" d="M512,298.667c0,23.563,0,56.889,0,56.889H0c0,0,0-33.326,0-56.889l0,0C0,275.103,19.102,256,42.667,256h426.667C492.898,256,512,275.103,512,298.667L512,298.667z"/></g><g><circle style="fill:#FFDA44;" cx="64" cy="305.778" r="21.333"/><circle style="fill:#FFDA44;" cx="160" cy="305.778" r="21.333"/></g><path style="fill:#5A8BB0;" d="M469.333,256H256v99.556h256c0,0,0-33.326,0-56.889C512,275.103,492.898,256,469.333,256z"/><circle style="fill:#FFDA44;" cx="256" cy="305.778" r="21.333"/><g><path style="fill:#FF9811;" d="M256,284.444c11.782,0,21.333,9.552,21.333,21.333c0,11.782-9.552,21.333-21.333,21.333"/><circle style="fill:#FF9811;" cx="352" cy="305.778" r="21.333"/><circle style="fill:#FF9811;" cx="448" cy="305.778" r="21.333"/></g></svg>'
    } else {}
  }

  function open(e) {
    if (e.target.value == 1) {
      gameTitle.innerText = '英単語・ロボ単で出てくる単語';
      wordset(1);
      backgroundSet(1);
      icon(1)
    } else if (e.target.value == 2) {
      gameTitle.innerText = 'ロボ団で使う英単語（ワードブロック）';
      wordset(2);
      backgroundSet(2);
      icon(2)
    } else if (e.target.value == 3) {
      gameTitle.innerText = 'ロボ団で使う英単語（Python）';
      wordset(2);
      backgroundSet(3);
      icon(3)
    } else {}
    isOpen = !0;
    overlay.style.display = 'block';
    // overlay.style.width = document.body.clientWidth + 'px';
    // overlay.style.height = document.body.clientWidth + 'px';
    overlay.style.width = window.innerWidth + 'px';
    overlay.style.height = window.innerHeight + 'px';
    // console.log('open');
    game.style.display = 'block';
    // game.style.top = window.pageYOffset + window.innerHeight / 2 - game.clientHeight / 2 + 'px';
    game.style.top = window.innerHeight / 2 - game.clientHeight / 2 + 'px';
    game.style.left = window.innerWidth / 2 - game.clientWidth / 2 + 'px';
    // console.log('top:' +game.style.top);
    console.log('innerHeight:' +window.innerHeight + '|' +'clientHeight:' +game.clientHeight);
    // console.log('clientHeight:' +game.clientHeight);
    // console.log('left:' + game.style.left);
    // console.log('innerWidth:' +window.innerWidth);
    // console.log('clientWidth:' +game.clientWidth);
    if (isFirst) {
      document.body.appendChild(overlay);
      document.body.appendChild(game);
      document.head.insertAdjacentHTML('beforeend', '<style id="custom-css"></style>')
    } else {
      view1.style.display = 'table-cell';
      view2.style.display = 'none';
      result.style.display = 'none'
    }
    let fData = localStorage.getItem('flags');
    if (fData) {
      fData = JSON.parse(fData);
      for (let i = 0; i < fData.length; i++) {
        if (!fData[i]) onBtns[i].click()
      }
    }
    isFirst = !1
  }

  function start() {
    view1.style.display = 'none';
    view2.style.display = 'block';
    startMsg.style.display = 'block';
    startFlag = !0;
    sWait = !0;
    space.classList.add('active');
    flagR = flags[0];
    flagK = flags[1];
    flagG = flags[2];
    flagW = flags[3];
    flagS = flags[4];
    flags = [flagR, flagK, flagG, flagW, flagS];
    localStorage.setItem('flags', JSON.stringify(flags))
  }

  function ready() {
    startMsg.style.display = 'none';
    const count = document.createElement('div');
    count.id = 'countdown';
    startMsg.after(count);
    let readyTime = 3;
    count.innerHTML = readyTime;
    countdownAudio();
    const readyTimer = setInterval(() => {
      readyTime--;
      if (readyTime == 0) {
        clearInterval(readyTimer);
        count.remove();
        gameInit()
      }
      count.innerHTML = readyTime
    }, 1000)
  }

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
    nFlag = !1;
    missFlag = !1;
    if (moPlay) {
      let missJP1 = [];
      let missJP2 = [];
      for (let i = 0; i < recordM.length; i++) {
        missJP1.push(wordJP1[recordM[i]]);
        missJP2.push(wordJP2[recordM[i]])
      }
      if (backup1.length == 0) {
        backup1 = [...wordJP1];
        backup2 = [...wordJP2]
      }
      wordJP1 = missJP1;
      wordJP2 = missJP2
    } else {
      if (backup1.length > 0) {
        wordJP1 = [...backup1];
        wordJP2 = [...backup2];
        backup1 = [];
        backup2 = []
      }
    }
    recordM = [];
    let idx;
    let a = [...Array(wordJP2.length).keys()];
    if (random) {
      while (a.length > 0) {
        idx = Math.floor(Math.random() * a.length);
        ridx.push(a[idx]);
        a.splice(idx, 1)
      }
    } else {
      ridx = a
    }
    wordRs = [];
    for (let i = 0; i < wordJP2.length; i++) {
      wordRs.push(kanaToRoman(wordJP2[i]))
    }
    limit = (maxNum < wordJP2.length) ? maxNum : wordJP2.length;
    playing = !0;
    begin = new Date();
    wordSet();
    let style = '';
    if (!flagR) {
      style += '#sentence span:not(.typed) {opacity: 0;}'
    }
    if (!flagK) {
      style += '#kana > div {opacity: 0;}'
    }
    document.getElementById('custom-css').innerHTML = style;
    if (flagW) {
      const cWPM = document.getElementById('current-wpm');
      cWPM.style.display = 'block';
      cWPM.innerHTML = 'WPM: 0.00';
      const id = setInterval(() => {
        let time = new Date() - begin;
        let speed = correct / time * 60 * 1000;
        if (playing) {
          cWPM.innerHTML = 'WPM: ' + speed.toFixed(2)
        } else {
          clearInterval(id);
          cWPM.innerHTML = '';
          cWPM.style.display = 'none'
        }
      }, 100)
    }
    if (flagS) {
      const speedBar = document.getElementById('speed-bar');
      const cover = speedBar.querySelector('.cover');
      speedBar.style.display = 'block';
      cover.style.transform = 'none';
      const id = setInterval(() => {
        let time = new Date() - begin;
        let speed = correct / time * 60 * 1000;
        if (playing) {
          let scale = 1 - speed / 700;
          cover.style.transform = 'scaleX(' + scale + ')';
          charamove(speed)
        } else {
          clearInterval(id);
          cover.style.transform = 'none';
          speedBar.style.display = 'none'
        }
      }, 100)
    }
  }

  function wordSet() {
    if (count == limit) {
      finish()
    } else {
      example.innerHTML = '<div>' + wordJP1[ridx[count]] + '</div>';
      kana.innerHTML = '<div>' + wordJP2[ridx[count]] + '</div>';
      wordR = wordRs[ridx[count]];
      let html;
      html = '<div><span class="typed"></span><span>';
      for (let i = 0; i < wordR.length; i++) {
        html += wordR[i][0]
      }
      html += '</span></div>';
      sentence.innerHTML = html;
      pattern = new Array(wordR.length).fill(0);
      if (count > 0) {
        progress.style.transform = 'scaleX(' + (1 - count / limit) + ')'
      }
      count++;
      selActive();
      if (count > 1) {
        nextwordAudio();
        loop_star();
        shuffleNumberCounter(targetWRM)
      }
    }
  }
  var position = document.getElementById('animate');
  var position_x = 0;
  var position_x_origin = 0;

  function charamove(speed) {
    position_x = speed * 1.5;
    position.style.transform = 'translate(' + position_x + 'px,20px)'
  }

  function finish() {
    let time = new Date() - begin;
    playing = !1;
    const active = keyboard.querySelector('.active');
    if (active) active.classList.remove('active');
    keyPositionRemove();
    endAudio();
    view2.style.display = 'none';
    result.style.display = 'block';
    example.innerHTML = '';
    kana.innerHTML = '';
    sentence.innerHTML = '';
    progress.style.transform = 'none';
    const resList = document.getElementById('example-list');
    const resData = result.querySelectorAll('.result-data');
    let speed, accuracy, score;
    speed = correct / time * 60 * 1000;
    accuracy = correct / (correct + miss);
    score = isStopped ? '-' : Math.floor(speed * accuracy ** 3);
    let html;
    html = '<ul>';
    for (let i = 0; i < limit; i++) {
      html += '<li>';
      html += '<div class="example">' + wordJP1[ridx[i]] + '</div>';
      html += '<div class="sentence">';
      wordR = wordRs[ridx[i]];
      if (isStopped) {
        if (record[i]) {
          html += record[i]
        } else {
          if (!!recordHTML) {
            html += recordHTML;
            recordHTML = '';
            if (missFlag) {
              weakKeys.push(wordR[idx1][pattern[idx1]][idx2]);
              html += '<span class="miss">' + wordR[idx1][pattern[idx1]][idx2] + '</span>';
              missFlag = !1
            } else {
              html += wordR[idx1][pattern[idx1]][idx2]
            }
            for (let j = idx2 + 1; j < wordR[idx1][pattern[idx1]].length; j++) {
              html += wordR[idx1][pattern[idx1]][j]
            }
            for (let j = idx1 + 1; j < wordR.length; j++) {
              html += wordR[j][0]
            }
          } else {
            if (missFlag) {
              weakKeys.push(wordR[0][0][0]);
              html += '<span class="miss">' + wordR[0][0][0] + '</span>';
              for (let j = 1; j < wordR[0][0].length; j++) {
                html += wordR[0][0][j]
              }
              for (let j = 1; j < wordR.length; j++) {
                html += wordR[j][0]
              }
              missFlag = !1
            } else {
              for (let j = 0; j < wordR.length; j++) {
                html += wordR[j][0]
              }
            }
          }
        }
      } else {
        html += record[i]
      }
      html += '</div></li>'
    }
    html += '</ul>';
    resList.innerHTML = html;
    if (gameData.length > 0) {
      html = '<ul>'
      html += '<li><div class="data">' + gameData[0] + '</div></li>';
      html += '<li><div class="data">' + gameData[1] + '</div></li>';
      html += '<li><div class="data">' + gameData[2] + '</div></li>';
      html += '<li><div class="data">' + gameData[3] + '</div></li>';
      html += '<li><div class="data">' + gameData[4] + '</div></li>';
      html += '<li><div class="data">' + gameData[5] + '</div></li>';
      html += '<li><div class="data">' + gameData[6] + '</div></li>';
      html += '<li><div class="data">' + gameData[7] + '</div></li>';
      html += '</ul>'
    } else {
      html = '<ul>'
      html += '<li><div class="data">-</div></li>';
      html += '<li><div class="data">-</div></li>';
      html += '<li><div class="data">-</div></li>';
      html += '<li><div class="data">-</div></li>';
      html += '<li><div class="data">-</div></li>';
      html += '<li><div class="data">-</div></li>';
      html += '<li><div class="data">-</div></li>';
      html += '<li><div class="data">-</div></li>';
      html += '</ul>'
    }
    resData[1].innerHTML = html;
    html = '<ul>';
    html += '<li><div class="title">スコア</div><div class="data">' + score + '</div></li>';
    html += '<li><div class="title">レベル</div><div class="data">' + getLevel(score) + '</div></li>';
    html += '<li><div class="title">入力時間</div><div class="data">' + convTime(time) + '</div></li>';
    html += '<li><div class="title">入力文字数</div><div class="data">' + correct + '</div></li>';
    html += '<li><div class="title">ミス入力数</div><div class="data">' + miss + '</div></li>';
    html += '<li><div class="title">WPM</div><div class="data">' + convStr(speed.toFixed(2)) + '</div></li>';
    html += '<li><div class="title">正確率</div><div class="data">' + convStr((accuracy * 100).toFixed(2)) + '%</div></li>';
    html += '<li><div class="title">苦手キー</div><div class="data">' + getWeaks(weakKeys) + '</div></li>';
    html += '</ul>';
    resData[0].innerHTML = html;
    gameData = [score, getLevel(score), convTime(time), correct, miss, convStr(speed.toFixed(2)), convStr((accuracy * 100).toFixed(2)) + '%', getWeaks(weakKeys)];
    if (resCmt) {
      const resComment = document.getElementById('result-comment');
      const container = resComment.querySelector('.container');
      const comment1 = 'ノーミス達成！おめでとうございます。';
      const comment2 = '惜しい！あと1文字。次はミス0を狙いましょう。';
      const comments = ['日々の練習が結果に繋がります。', '速さよりも正確性のほうがスコアに響きます。'];
      if (!isStopped) {
        if (miss == 0) {
          container.innerHTML = comment1
        } else if (miss == 1) {
          container.innerHTML = comment2
        } else {
          let idx = Math.floor(Math.random() * comments.length);
          container.innerHTML = comments[idx]
        }
      } else {
        container.innerHTML = '---'
      }
    }
    console.log('finish'+'|'+'innerHeight:' +window.innerHeight + '|' +'clientHeight:' +game.clientHeight);
    isStopped = !1;
    const moBtn = document.getElementById('miss-only-button');
    if (recordM.length > 0) {
      if (!moBtn) {
        const button6 = document.createElement('button');
        button6.type = 'button';
        button6.id = 'miss-only-button';
        button6.classList.add('btn');
        button6.innerHTML = 'ミスだけ';
        button6.addEventListener('click', () => {
          moPlay = !0;
          sWait = !0;
          result.style.display = 'none';
          view2.style.display = 'block';
          startMsg.style.display = 'block';
          space.classList.add('active');
          target.innerHTML = 0;
          position.style.transform = 'translate(0px,20px)'
        });
        const btnArea = document.getElementById('btn-area');
        btnArea.appendChild(button6)
      }
    } else {
      if (moBtn) {
        moPlay = !1;
        moBtn.remove()
      }
    }
  }

  function kanaToRoman(kana) {
    const romanMap = {
      'あ': ['a'],
      'い': ['i', 'yi'],
      'う': ['u', 'wu'],
      'え': ['e'],
      'お': ['o'],
      'か': ['ka', 'ca'],
      'き': ['ki'],
      'く': ['ku', 'cu', 'qu'],
      'け': ['ke'],
      'こ': ['ko', 'co'],
      'さ': ['sa'],
      'し': ['si', 'shi', 'ci'],
      'す': ['su'],
      'せ': ['se', 'ce'],
      'そ': ['so'],
      'た': ['ta'],
      'ち': ['ti', 'chi'],
      'つ': ['tu', 'tsu'],
      'て': ['te'],
      'と': ['to'],
      'な': ['na'],
      'に': ['ni'],
      'ぬ': ['nu'],
      'ね': ['ne'],
      'の': ['no'],
      'は': ['ha'],
      'ひ': ['hi'],
      'ふ': ['fu', 'hu'],
      'へ': ['he'],
      'ほ': ['ho'],
      'ま': ['ma'],
      'み': ['mi'],
      'む': ['mu'],
      'め': ['me'],
      'も': ['mo'],
      'や': ['ya'],
      'ゆ': ['yu'],
      'よ': ['yo'],
      'ら': ['ra'],
      'り': ['ri'],
      'る': ['ru'],
      'れ': ['re'],
      'ろ': ['ro'],
      'わ': ['wa'],
      'ゐ': ['wyi'],
      'ゑ': ['wye'],
      'を': ['wo'],
      'ん': ['nn', 'xn', 'n'],
      'が': ['ga'],
      'ぎ': ['gi'],
      'ぐ': ['gu'],
      'げ': ['ge'],
      'ご': ['go'],
      'ざ': ['za'],
      'じ': ['ji', 'zi'],
      'ず': ['zu'],
      'ぜ': ['ze'],
      'ぞ': ['zo'],
      'だ': ['da'],
      'ぢ': ['di'],
      'づ': ['du'],
      'で': ['de'],
      'ど': ['do'],
      'ば': ['ba'],
      'び': ['bi'],
      'ぶ': ['bu'],
      'べ': ['be'],
      'ぼ': ['bo'],
      'ぱ': ['pa'],
      'ぴ': ['pi'],
      'ぷ': ['pu'],
      'ぺ': ['pe'],
      'ぽ': ['po'],
      'うぁ': ['wha'],
      'うぃ': ['whi'],
      'うぇ': ['whe'],
      'うぉ': ['who'],
      'きゃ': ['kya'],
      'きぃ': ['kyi'],
      'きゅ': ['kyu'],
      'きぇ': ['kye'],
      'きょ': ['kyo'],
      'くぁ': ['qa', 'qwa'],
      'くぃ': ['qi', 'qwi'],
      'くぇ': ['qe', 'qwe'],
      'くぉ': ['qo', 'qwo'],
      'くゃ': ['qya'],
      'くゅ': ['qyu'],
      'くょ': ['qyo'],
      'しゃ': ['sya', 'sha'],
      'しぃ': ['syi'],
      'しゅ': ['syu', 'shu'],
      'しぇ': ['sye', 'she'],
      'しょ': ['syo', 'sho'],
      'つぁ': ['tsa'],
      'つぃ': ['tsi'],
      'つぇ': ['tse'],
      'つぉ': ['tso'],
      'ちゃ': ['tya', 'cha'],
      'ちぃ': ['tyi'],
      'ちゅ': ['tyu', 'chu'],
      'ちぇ': ['tye', 'che'],
      'ちょ': ['tyo', 'cho'],
      'てゃ': ['tha'],
      'てぃ': ['thi'],
      'てゅ': ['thu'],
      'てぇ': ['the'],
      'てょ': ['tho'],
      'とぁ': ['twa'],
      'とぃ': ['twi'],
      'とぅ': ['twu'],
      'とぇ': ['twe'],
      'とぉ': ['two'],
      'ひゃ': ['hya'],
      'ひぃ': ['hyi'],
      'ひゅ': ['hyu'],
      'ひぇ': ['hye'],
      'ひょ': ['hyo'],
      'ふぁ': ['fa'],
      'ふぃ': ['fi'],
      'ふぇ': ['fe'],
      'ふぉ': ['fo'],
      'にゃ': ['nya'],
      'にぃ': ['nyi'],
      'にゅ': ['nyu'],
      'にぇ': ['nye'],
      'にょ': ['nyo'],
      'みゃ': ['mya'],
      'みぃ': ['myi'],
      'みゅ': ['myu'],
      'みぇ': ['mye'],
      'みょ': ['myo'],
      'りゃ': ['rya'],
      'りぃ': ['ryi'],
      'りゅ': ['ryu'],
      'りぇ': ['rye'],
      'りょ': ['ryo'],
      'ヴぁ': ['va'],
      'ヴぃ': ['vi'],
      'ヴ': ['vu'],
      'ヴぇ': ['ve'],
      'ヴぉ': ['vo'],
      'ぎゃ': ['gya'],
      'ぎぃ': ['gyi'],
      'ぎゅ': ['gyu'],
      'ぎぇ': ['gye'],
      'ぎょ': ['gyo'],
      'ぐぁ': ['gwa'],
      'ぐぃ': ['gwi'],
      'ぐぅ': ['gwu'],
      'ぐぇ': ['gwe'],
      'ぐぉ': ['gwo'],
      'じゃ': ['ja', 'zya'],
      'じぃ': ['jyi', 'zyi'],
      'じゅ': ['ju', 'zyu'],
      'じぇ': ['je', 'zye'],
      'じょ': ['jo', 'zyo'],
      'でゃ': ['dha'],
      'でぃ': ['dhi'],
      'でゅ': ['dhu'],
      'でぇ': ['dhe'],
      'でょ': ['dho'],
      'ぢゃ': ['dya'],
      'ぢぃ': ['dyi'],
      'ぢゅ': ['dyu'],
      'ぢぇ': ['dye'],
      'ぢょ': ['dyo'],
      'びゃ': ['bya'],
      'びぃ': ['byi'],
      'びゅ': ['byu'],
      'びぇ': ['bye'],
      'びょ': ['byo'],
      'ぴゃ': ['pya'],
      'ぴぃ': ['pyi'],
      'ぴゅ': ['pyu'],
      'ぴぇ': ['pye'],
      'ぴょ': ['pyo'],
      'ぁ': ['la', 'xa'],
      'ぃ': ['li', 'xi'],
      'ぅ': ['lu', 'xu'],
      'ぇ': ['le', 'xe'],
      'ぉ': ['lo', 'xo'],
      'ゃ': ['lya', 'xya'],
      'ゅ': ['lyu', 'xyu'],
      'ょ': ['lyo', 'xyo'],
      'っ': ['ltu', 'xtu'],
      'ー': ['-'],
      ',': [','],
      '.': ['.'],
      '、': [','],
      '。': ['.'],
      '・': ['/'],
      '&#12289;': [','],
      '&#12290;': ['.'],
      '&#12539;': ['/']
    };
    let remStr = String(kana),
      slStr, roman, next;
    let result = [];

    function splice() {
      let oneChar = remStr.slice(0, 1);
      remStr = remStr.slice(1);
      return oneChar
    }

    function isSmallChar() {
      return !!remStr.slice(0, 1).match(/^[ぁぃぅぇぉゃゅょ]$/)
    }
    while (remStr) {
      slStr = splice();
      next = romanMap[remStr.slice(0, 1)];
      if (slStr == 'っ') {
        if (!remStr || remStr.match(/^[,.]/) || !next || next[0].match(/^[aiueon]/)) {
          roman = [...romanMap[slStr]];
          result.push(roman)
        } else {
          slStr = splice();
          if (isSmallChar()) slStr += splice();
          roman = [...romanMap[slStr].map(str => str.slice(0, 1) + str)];
          result.push(roman)
        }
      } else {
        if (isSmallChar()) slStr += splice();
        if (slStr == '&') {
          slStr += remStr.slice(0, 7);
          remStr = remStr.slice(7)
        }
        roman = romanMap[slStr] ? [...romanMap[slStr]] : [...slStr];
        if (slStr == 'ん') {
          if (!remStr) {
            roman.pop()
          } else {
            if (next[0].match(/^[aiueony]/)) roman.pop()
          }
        }
        result.push(roman)
      }
    }
    return result
  }

  function colorTyped() {
    let html = '<div><span class="typed">';
    if (idx1 > 0) {
      for (let i = 0; i < idx1; i++) {
        html += wordR[i][pattern[i]]
      }
    }
    for (let i = 0; i <= idx2; i++) {
      html += wordR[idx1][pattern[idx1]][i]
    }
    html += '</span><span>';
    for (let i = idx2 + 1; i < wordR[idx1][pattern[idx1]].length; i++) {
      html += wordR[idx1][pattern[idx1]][i]
    }
    for (let i = idx1 + 1; i < wordR.length; i++) {
      html += wordR[i][pattern[i]]
    }
    html += '</span></div>';
    return html
  }

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
      left1 = 0, left2 = 0, left3 = 0
    }
    if (textS.clientWidth > 580) {
      if (textS1.getBoundingClientRect().width > 310) {
        let move1 = textS2.getBoundingClientRect().width / remLen;
        left1 += move1;
        textS.style.left = -left1 + 'px'
      }
    }
    if (textE.clientWidth > 580) {
      let move2 = over2 / remLen;
      left2 += move2;
      textE.style.left = -left2 + 'px';
      over2 -= move2
    }
    if (textK.clientWidth > 580) {
      let move3 = over3 / remLen;
      left3 += move3;
      textK.style.left = -left3 + 'px';
      over3 -= move3
    }
  }

  function missed() {
    miss++;
    wrongAudio();
    if (recordM.indexOf(ridx[count - 1]) == -1) {
      recordM.push(ridx[count - 1])
    }
    mScreen.classList.add('missed');
    setTimeout(() => {
      mScreen.classList.remove('missed')
    }, 200)
  }

  function selActive() {
    const prevActive = keyboard.querySelector('.active');
    const selector = '.key_' + keyConvert(wordR[idx1][pattern[idx1]][idx2]);
    const target = keyboard.querySelector(selector);
    if (prevActive) {
      prevActive.classList.remove('active')
    }
    if (target && flagG) {
      target.classList.add('active');
      keyPosition(selector)
    }
  }

  function keyPositionRemove() {
    littleLeft.classList.remove('on');
    ringLeft.classList.remove('on');
    middleLeft.classList.remove('on');
    indexLeft.classList.remove('on');
    thumbLeft.classList.remove('on');
    thumbRight.classList.remove('on');
    ringRight.classList.remove('on');
    middleRight.classList.remove('on');
    indexRight.classList.remove('on');
    littleRight.classList.remove('on')
  }

  function keyPosition(selector) {
    // console.log(selector);
    if (littleLeftLine.includes(selector)) {
      keyPositionRemove();
      littleLeft.classList.add('on')
    } else if (ringLeftLine.includes(selector)) {
      keyPositionRemove();
      ringLeft.classList.add('on')
    } else if (middleLeftLine.includes(selector)) {
      keyPositionRemove();
      middleLeft.classList.add('on')
    } else if (indexLeftLine.includes(selector)) {
      keyPositionRemove();
      indexLeft.classList.add('on')
    } else if (thumbLeftLine.includes(selector)) {
      keyPositionRemove();
      thumbLeft.classList.add('on')
    } else if (thumbRightLine.includes(selector)) {
      keyPositionRemove();
      thumbRight.classList.add('on')
    } else if (indexRightLine.includes(selector)) {
      keyPositionRemove();
      ringRight.classList.add('on')
    } else if (middleRightLine.includes(selector)) {
      keyPositionRemove();
      middleRight.classList.add('on')
    } else if (ringRightLine.includes(selector)) {
      keyPositionRemove();
      indexRight.classList.add('on')
    } else if (littleRightLine.includes(selector)) {
      keyPositionRemove();
      littleRight.classList.add('on')
    } else {}
  }

  function keyConvert(key) {
    const keyMap = {
      '-': 'hyphen',
      '@': 'atmark',
      ';': 'semicolon',
      ':': 'colon',
      ',': 'comma',
      '.': 'period',
      '/': 'slash',
      ' ': 'space'
    }
    if (keyMap[key]) {
      return keyMap[key]
    } else {
      return key
    }
  }

  function getLevel(score) {
    let level;
    if (score == '-') {
      level = '-'
    } else {
      switch (!0) {
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
        break
      }
    }
    return level
  }

  function getWeaks(keys) {
    let keyData1 = {};
    keys.forEach((key) => {
      if (keyData1[key] != undefined) {
        keyData1[key] += 1
      } else {
        keyData1[key] = 1
      }
    });
    let keyData2 = Object.keys(keyData1).map(k => ({
      key: k,
      miss: keyData1[k]
    }));
    keyData2.sort((a, b) => b.miss - a.miss);
    let res = '';
    let max = (keyData2.length < 5) ? keyData2.length : 5;
    for (let i = 0; i < max; i++) {
      if (i != max - 1) {
        res += keyData2[i].key + ' '
      } else {
        res += keyData2[i].key
      }
    }
    return res
  }

  function convTime(time) {
    let m, ms, s, res;
    if (time >= 60000) {
      m = Math.floor(time / 60000);
      ms = time - m * 60000;
      s = (ms / 1000).toFixed(2);
      res = m + '分' + s.slice(0, -3) + '秒' + s.slice(-2)
    } else {
      s = (time / 1000).toFixed(2);
      res = s.slice(0, -3) + '秒' + s.slice(-2)
    }
    return res
  }

  function convStr(str) {
    let res;
    if (str == 'NaN') {
      res = '0'
    } else {
      if (str.slice(-2) == '00') {
        res = str.slice(0, -3)
      } else {
        res = str
      }
    }
    return res
  }

  function toggle(idx, flag) {
    if (flag) {
      onBtns[idx].click()
    } else {
      offBtns[idx].click()
    }
  }

  function replay() {
    moPlay = !1;
    result.style.display = 'none';
    view2.style.display = 'block';
    startMsg.style.display = 'block';
    sWait = !0;
    space.classList.add('active');
    target.innerHTML = 0;
    position.style.transform = 'translate(0px,20px)'
  }

  function close() {
    isOpen = !1;
    startFlag = !1;
    playing = !1;
    nFlag = !1;
    missFlag = !1;
    moPlay = !1;
    gameData = [];
    target.innerHTML = 0;
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
    game.style.display = 'none'
    console.log('colse'+'|'+'innerHeight:' +window.innerHeight + '|' +'clientHeight:' +game.clientHeight);
  }
  
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
      flags[i] = !1
    })
  }
  for (let i = 0; i < offBtns.length; i++) {
    offBtns[i].addEventListener('click', () => {
      offBtns[i].classList.remove('show');
      onBtns[i].classList.add('show');
      flags[i] = !0
    })
  }
  window.addEventListener('keydown', (event) => {
    let key = event.key;
    if (isOpen && !startFlag) {
      if (key == ' ') event.preventDefault();
      if (key == 'r') toggle(0, flags[0]);
      if (key == 'k') toggle(1, flags[1]);
      if (key == 'g') toggle(2, flags[2]);
      if (key == 'w') toggle(3, flags[3]);
      if (key == 's') toggle(4, flags[4])
    }
    if (startFlag) {
      if (key == ' ') event.preventDefault();
      if (sWait) {
        if (key == ' ') {
          sWait = !1;
          space.classList.remove('active');
          ready()
        }
      }
      if (playing) {
        if (key == 'Escape') {
          isStopped = !0;
          finish()
        } else {
          temp += key;
          if (key == wordR[idx1][pattern[idx1]][idx2]) {
            sentence.innerHTML = colorTyped();
            if (missFlag) {
              recordHTML += '<span class="miss">' + key + '</span>';
              weakKeys.push(key);
              missFlag = !1
            } else {
              recordHTML += key;
              pushAudio()
            }
            textMove();
            correct++;
            idx2++
          } else {
            let reg = new RegExp('^' + temp);
            for (let i = 0; i < wordR[idx1].length; i++) {
              if (!!wordR[idx1][i].match(reg)) {
                pattern[idx1] = i;
                break
              }
            }
            if (key == wordR[idx1][pattern[idx1]][idx2]) {
              sentence.innerHTML = colorTyped();
              if (missFlag) {
                recordHTML += '<span class="miss">' + key + '</span>';
                weakKeys.push(key);
                missFlag = !1
              } else {
                recordHTML += key
              }
              textMove();
              correct++;
              idx2++
            } else {
              if (wordR[idx1][pattern[idx1]] == 'nn' && wordR[idx1].length == 3) {
                for (let i = 0; i < wordR[idx1 + 1].length; i++) {
                  if (key == wordR[idx1 + 1][i][0]) {
                    pattern[idx1] = 2;
                    pattern[idx1 + 1] = i;
                    nFlag = !0;
                    correct++;
                    break
                  }
                }
                if (!nFlag) {
                  missFlag = !0;
                  missed()
                }
              } else {
                missFlag = !0;
                temp = temp.slice(0, -1);
                missed()
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
                missFlag = !1
              } else {
                recordHTML += key
              }
              idx2 = 1;
              nFlag = !1
            } else {
              idx2 = 0
            }
            temp = ''
          }
          if (idx1 == wordR.length) {
            record.push(recordHTML);
            recordHTML = '';
            idx1 = 0;
            wordSet()
          } else {
            if (!missFlag) selActive()
          }
        }
      }
    }
  });
  window.addEventListener('resize', () => {
    if (isOpen) {
      // overlay.style.width = document.body.clientWidth + 'px';
      // overlay.style.height = document.body.clientHeight + 'px';
      console.log('resize');
      overlay.style.width = window.innerHeight + 'px';
      overlay.style.height = window.innerWidth + 'px';
      game.style.top = window.pageYOffset + window.innerHeight / 2 - game.clientHeight / 2 + 'px';
      game.style.left = window.innerWidth / 2 - game.clientWidth / 2 + 'px'
    }
  })
})(window, document);

function pushAudio() {
  document.getElementById('btn_push').currentTime = 0;
  document.getElementById('btn_push').play()
}

function wrongAudio() {
  document.getElementById('btn_wrong').currentTime = 0;
  document.getElementById('btn_wrong').play()
}

function countdownAudio() {
  document.getElementById('countdown03').currentTime = 0;
  document.getElementById('countdown03').play()
}

function nextwordAudio() {
  document.getElementById('next_word').currentTime = 0;
  document.getElementById('next_word').play()
}

function endAudio() {
  document.getElementById('end').currentTime = 0;
  document.getElementById('end').play()
}

function loop_star() {
  for (let step = 0; step < 7; step++) {
    setTimeout(createStar, 100 * step)
  }
}

const el = document.getElementById("js-glitter");
function createStar() {
  const starEl = document.createElement("span");
  starEl.className = "star";
  starEl.style.left = Math.random() * el.clientWidth + "px";
  starEl.style.top = Math.random() * el.clientHeight + "px";
  el.appendChild(starEl);
  setTimeout(() => {
    starEl.remove()
  }, 1000)
};

const target = document.querySelector('.number');
const targetWRM = document.getElementById('current-wpm');
const shuffleNumberCounter = (targetWRM) => {
  var targetNum = Number(targetWRM.textContent.replace("WPM: ", ""));
  targetNum = Math.round(targetNum + Number(target.innerHTML));
  if (!targetNum) {
    return
  }
  let counterData = null
  const speed = 2000 / targetNum;
  let initNum = Number(target.innerHTML);
  const countUp = () => {
    if (Number.isInteger(targetNum)) {
      target.innerHTML = initNum
    } else {
      target.innerHTML = `${initNum}.${Math.floor(Math.random() * 9)}`
    }
    initNum++
    if (initNum > targetNum) {
      target.innerHTML = targetNum;
      clearInterval(counterData);
    }
  }
  counterData = setInterval(countUp, speed);
}