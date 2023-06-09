import url from 'node:url';
import querystring from 'node:querystring'

export type EIPHeader = {
  [key: string]: string | Project[] | string[];
};

export function formatMeta(meta: string): EIPHeader {
  const metaObj: EIPHeader = {};

  meta.split('\n').forEach((item) => {
    if (item && item.includes(': ')) {
      let tmpItem = item.replace(': ', '----');
      const [k, v] = tmpItem.split('----');
      metaObj[k] = v.replaceAll('"', '');
    }
  });

  return metaObj;
}

type Project = {
  title: string;
  link: string;
  imgSrc: string;
  alt: string;
};

export function formatComEIP(str: string): EIPHeader {
  let meta, con;
  const metaObj: EIPHeader = {};
  if (str.includes('---')) {
    [, meta, ...con] = str.split('---');
  } else {
    con = str;
  }
  if (meta) {
    Object.assign(metaObj, formatMeta(meta));
  }

  con
    .toString()
    .trim()
    .split('## ')
    .forEach((item) => {
      if (!item) {
        return;
      }

      let [k, ...v] = item.split('\n\n');
      k = k.trim().toLowerCase();
      let vStr = v.join(k === 'chatgpt4' ? '<br /><br />' : '').trim();

      if (vStr.startsWith('- ') && ['extended resources', 'projects'].includes(k)) {
        let tmpArr: Project[] = [];
        vStr.split('- ').forEach((line: string | undefined) => {
          if (line) {
            const imgRegex = /!\[(.+?)\]\((.+?)\)/;
            const linkRegex = /\[(.+?)\]\((.+?)\)/;
            const imgMatch = line.match(imgRegex);
            const linkMath = line.match(linkRegex);

            tmpArr.push({
              title: linkMath ? linkMath[1] : '',
              link: linkMath ? linkMath[2] : '',
              imgSrc: imgMatch ? imgMatch[2] : '',
              alt: imgMatch ? imgMatch[1] : '',
            });
          }
        });
        metaObj[k] = tmpArr;
      } else {
        metaObj[k] = vStr;
      }

      if (k === 'videos' && vStr && vStr.startsWith('- ')) {
        const vIds: string[] = [];
        vStr.split('- ').forEach((line: string | undefined) => {
          if (line) {
            const vUrlQuery = url.parse(line).query;
            if (vUrlQuery) {
              let queryV = querystring.parse(vUrlQuery).v;
              queryV && vIds.push(queryV as string)
            }
          }
        })
        metaObj[k] = vIds;
      }
    });

  return metaObj;
}
