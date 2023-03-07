const fs = require('fs');

// 同步读取上级目录下的所有文件到dir中

const express = require('express');
const app = express()
const marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
        const hljs = require('highlight.js');
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartypants: false,
    xhtml: false
});

app.all('/find_folder1', (Request, Response)=>{
    Response.setHeader('Access-Control-Allow-Origin', '*');
    Response.setHeader('Access-Control-Allow-Headers', '*');
    Response.setHeader('Access-Control-Request-Headers',"");
    Response.setHeader('Access-Control-Request-Method','*');
    const dir = fs.readdirSync('./Document/目录');
    const data = {folders:dir};
    Response.send(JSON.stringify(data));
    // console.log(data)
})
app.all('/find_folder2', (Request, Response)=>{
    Response.setHeader('Access-Control-Allow-Origin', '*');
    Response.setHeader('Access-Control-Allow-Headers', '*');
    Response.setHeader('Access-Control-Request-Headers',"");
    Response.setHeader('Access-Control-Request-Method','*');
    let folder1 = Request.query.folder1;
    const dir = fs.readdirSync('./Document/目录/'+folder1);
    const data = {folders:dir};
    Response.send(JSON.stringify(data));
    // console.log(data)
})
app.all('/get_content', (Request, Response)=>{
    Response.setHeader('Access-Control-Allow-Origin', '*');
    Response.setHeader('Access-Control-Allow-Headers', '*');
    Response.setHeader('Access-Control-Request-Headers',"");
    Response.setHeader('Access-Control-Request-Method','*');
    let folder1 = Request.query.folder1;
    let folder2 = Request.query.folder2;
    let dir
    if (folder1 != "VenusXK"){
        dir = './Document/目录/'+folder1+'/'+folder2
        let content = marked.parse('# '+folder2.split(".md")[0]+fs.readFileSync(dir, 'utf-8'))
        console.log(content)
        const data = {content:content};
        Response.send(JSON.stringify(data));
    }
    else{
        dir = './'+folder1+'/'+folder2
        let content = marked.parse(fs.readFileSync(dir, 'utf-8'))
        console.log(content)
        const data = {content:content};
        Response.send(JSON.stringify(data));
    }
    
})
app.listen(8099, ()=>{
    console.log('8099 running meproject express')
})