// Whithout a defined matcher, this one line applies next-auth
// to the entire project
export { default } from "next-auth/middleware";

// Applies next-aut only to matching routes - can be regex
// Ref: https://nextjs.ort/docs/app/building-your-application/routing/middleware#matcher
export const config = {matcher: ["/superhemmelig"]}