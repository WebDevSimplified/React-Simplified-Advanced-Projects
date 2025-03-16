/*
  This function takes in fetch request's `res.headers.get('Link')` value and converts it to an object with each link type as a key and the url as the value. The only value that we care about for this project is the `next` link, which we will use to fetch the next page of data (if it exists).
*/
export function parseLinkHeader(linkHeader) {
  if (!linkHeader) return {}
  const links = linkHeader.split(",")
  const parsedLinks = {}
  links.forEach(link => {
    const url = link.match(/<(.*)>/)[1]
    const rel = link.match(/rel="(.*)"/)[1]
    parsedLinks[rel] = url
  })
  return parsedLinks
}
