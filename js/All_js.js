
//=====スクロールをするとハンバーガーメニューに変化するための設定を関数でまとめる=====//
function FixedAnime() {
  //ヘッダーの高さを取得
  var headerH = $('#header').outerHeight(true);
  var scroll = $(window).scrollTop();
  if (scroll >= headerH) {//ヘッダーの高さ以上までスクロールしたら
    $('.openbtn1').addClass('fadeDown');//.openbtnにfadeDownというクラス名を付与して
    $('#header').addClass('dnone');//#headerにdnoneというクラス名を付与
  } else {//それ以外は
    $('.openbtn1').removeClass('fadeDown');//fadeDownというクラス名を除き
    $('#header').removeClass('dnone');//dnoneというクラス名を除く
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  FixedAnime();//スクロールをするとハンバーガーメニューに変化するための関数を呼ぶ
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  FixedAnime();//スクロールをするとハンバーガーメニューに変化するための関数を呼ぶ
});


//ボタンをクリックした際のアニメーションの設定
$(".openbtn1").click(function () {//ボタンがクリックされたら
  $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
  $("#header").toggleClass('panelactive');//ヘッダーにpanelactiveクラスを付与
});
$("#g-navi li a").click(function () {//ナビゲーションのリンクがクリックされたら
  $(".openbtn1").removeClass('active');//ボタンの activeクラスを除去し
  $("#header").removeClass('panelactive');//ヘッダーのpanelactiveクラスも除去
});


//リンク先のidまでスムーススクロール
//※ページ内リンクを行わない場合は不必要なので削除してください
$('#g-navi li a').click(function () {
  var elmHash = $(this).attr('href');
  var pos = $(elmHash).offset().top - 0;
  $('body,html').animate({ scrollTop: pos }, 1000);
  return false;
});



//====スクロールした際の動きを関数でまとめる===/
function PageTopAnime() {
  var scroll = $(window).scrollTop();
  if (scroll >= 200) {//上から200pxスクロールしたら
    $('#page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
    $('#page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
  } else {
    if ($('#page-top').hasClass('UpMove')) {//すでに#page-topにUpMoveというクラス名がついていたら
      $('#page-top').removeClass('UpMove');//UpMoveというクラス名を除き
      $('#page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
    }
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top a').click(function () {
  $('body,html').animate({
    scrollTop: 0//ページトップまでスクロール
  }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false;//リンク自体の無効化
});

//ニュース欄のスクリプト//
var slider;
var sliderFlag = false;
var breakpoint = 768;//768px以下の場合

function sliderSet() {
  var windowWidth = window.innerWidth;
  if (windowWidth >= breakpoint && !sliderFlag) {//768px以上は1行でスライダー表示
    slider = $('.slider').bxSlider({
      touchEnabled: false,//リンクを有効にするためスライドをマウスでドラッグした際にスライドの切り替えを可能にする機能を無効化
      mode: 'vertical',//縦スライド指定
      controls: false,//前後のコントロールを表示させない。
      auto: 'true',//自動的にスライド
      pager: false//ページ送り無効化
    });
    sliderFlag = true;
  } else if (windowWidth < breakpoint && sliderFlag) {
    slider.destroySlider();//bxSliderのOptionであるdestroySliderを使用してスライダーの動きを除去
    sliderFlag = false;
  }
}

$(window).on('load resize', function () {
  sliderSet();
});

//カレンダースクリプト//

const date = new Date();
const today = date.getDate();
const currentMonth = date.getMonth();

function createCalendar(month) {
  const monthDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let calendarHTML = '<table class="calendar"><thead><tr>';

  for (let i = 0; i < 7; i++) {
    if (i === 0) {
      calendarHTML += `<th class="sun">${monthDays[i]}</th>`;
    } else if (i === 6) {
      calendarHTML += `<th class="sat">${monthDays[i]}</th>`;
    } else {
      calendarHTML += `<th>${monthDays[i]}</th>`;
    }
  }

  calendarHTML += '</tr></thead><tbody>';

  const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();
  const firstDay = new Date(date.getFullYear(), month, 1).getDay();

  const daysInPrevMonth = new Date(date.getFullYear(), month, 0).getDate();

  let dayCount = 1;
  let prevDayCount = daysInPrevMonth - firstDay + 1;

  for (let i = 0; i < 6; i++) {
    calendarHTML += '<tr>';

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        calendarHTML += `<td class="mute">${prevDayCount}</td>`;
        prevDayCount++;
      } else if (dayCount > daysInMonth) {
        let nextMonthDayCount = dayCount - daysInMonth;
        calendarHTML += `<td class="mute">${nextMonthDayCount}</td>`;
        dayCount++;
      } else {
        // 今日の日付にclassを付ける
        if (dayCount === today && month === currentMonth) {
          calendarHTML += `<td class="today">${dayCount}</td>`;
        }
        // 月曜日にclassを付ける
        else if (j === 1) {
          calendarHTML += `<td class="off">${dayCount}</td>`;
        } else {
          calendarHTML += `<td>${dayCount}</td>`;
        }
        dayCount++;
      }
    }

    calendarHTML += '</tr>';

    if (dayCount - daysInMonth > 7) {
      break;
    }
  }

  calendarHTML += '</tbody></table>';

  return calendarHTML;
}

document.getElementById('calendar').innerHTML = "<h2>2024.04</h2>" + createCalendar(currentMonth) + "<h2>2024.05</h2>" + createCalendar(currentMonth + 1);