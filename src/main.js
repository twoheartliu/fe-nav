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
  hashMap.forEach((node) => {
    const $li = $(`<li>
    <a href=${node.url}>
      <div class="site">
        <div class="logo">${node.logo[0]}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
      </div>
    </a>
  </li>`).insertBefore($lastLi);
  });
};
render();

$('.addButton').on('click', () => {
  let url = window.prompt('请输入你想添加的网址');
  if (url.indexOf('http') !== 0) {
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
