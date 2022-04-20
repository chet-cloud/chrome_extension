let comments_300main = require('./300main_comments.json')
let followers_300main = require('./300main_followers.json')
let liked_300main = require('./300main_liked.json')
let followers_wpgsymphony = require('./wpgsymphony_followers.json')

let _followers_300main = followers_300main.reduce((context,current)=>{
    context[""+current] = current
    return context
},{})

let _followers_wpgsymphony = followers_wpgsymphony.reduce((context,current)=>{
    context[""+current] = current
    return context
},{})

let _liked_300main = liked_300main.reduce((context,current)=>{
    context[""+current] = current
    return context
},{})

const result = comments_300main.comments
.filter((comment)=>{
    return comment.comment_At.length >0
})
.filter((comment)=>{
    return _followers_300main.hasOwnProperty(comment.comment_author_name)
})
.filter((comment)=>{
    return _followers_wpgsymphony.hasOwnProperty(comment.comment_author_name)
})
.filter((comment)=>{
    return _liked_300main.hasOwnProperty(comment.comment_author_name)
})

const fs = require('fs')
console.log(result)
fs.writeFileSync("./result.json",JSON.stringify(result))


