import links from '../../i18n/en/links'

export default function(url) {
  const link = Object.values(links).find(link => link.url === url)
  return link ? link.text : url
}