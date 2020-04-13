const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');

const localInfo = localStorage.getItem('localInfo');
const objectInfo = JSON.parse(localInfo);

const hashMap = objectInfo || [
  {
    logo: 'A',
    url: 'http://www.acfun.cn',
  },
  {
    logo: 'B',
    url: 'http://www.bilibili.com',
  },
];
const simplifyUrl = (url) => {
  return url
    .replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '');
};

const render = () => {
  $('.siteList').find('li:not(.last)').remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo[0]}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-searchclose"></use>
          </svg>
        </div>
      </div>
  </li>`).insertBefore($lastLi);

    $li.on('click', () => {
      window.open(node.url, '_blank');
    });
    $li.on('click', '.close', (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$('.addButton').on('click', () => {
  let url = window.prompt('请输入你想添加的网址');
  if (url === null) {
    return;
  } else if (url.indexOf('http') !== 0) {
    url = 'http://' + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    logoType: 'text',
    url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem('localInfo', string);
};

$(document).on('keypress', (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    let c = hashMap[i];
    if (c.logo.toLowerCase() === key) {
      window.open(c.url);
    }
  }
});
