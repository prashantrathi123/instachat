var express=require('express');
var app=express();
var mysql=require('mysql');
var url = require('url');
var fs = require('fs'); 
const multer = require('multer');
app.use(express.static(__dirname +'/views'));
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('public'));
const upload = multer({
  dest: 'views/uploads/' 
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port:"3306"
 
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
con.query("CREATE DATABASE IF NOT EXISTS instachats", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
con.query("use instachats", function (err, result) {
    if (err) throw err;
    console.log("Database selected");
  });

 });




 


app.get('/',function(req,res){
res.render('signin.ejs');

});


app.get('/signin.html',function(req,res){
res.render('signin.ejs');

});



app.post('/signin',urlencodedParser,upload.array('file',30),function(req,res){
response={
email:req.body.email,
password:req.body.spassword,
fname: req.files.length,
};


var q=response.email;

if(req.files.length==1){
var sqs="SELECT  * FROM userlist WHERE email='"+response.email+"' ORDER BY email LIMIT 1  ";

con.query(sqs,function (errr, resul) {
if (errr) throw errr;

console.log(resul.length);
console.log("checking");
if(resul.length==0){ 
 var createTodos = `create table IF not exists ?? (
                          description text,fpath text,postn text,email text
                      )`;
var value='p'+q;
  con.query(createTodos, value,function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

var createe = `create table IF not exists ?? (
                          useremail text,message text,sr text
                      )`;
var val=q;
  con.query(createe, val,function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
 var sql = "INSERT INTO userlist (email,password,fpath) VALUES ?";
  

  var values=[[response.email,response.password,req.files[0].filename]];
  con.query(sql, [values],function (err, result) {
   if (err) throw err;
   console.log("1 record inserted");
 });
}

});}
console.log(q);
res.redirect('/signin.html');

});


app.post('/login',urlencodedParser,upload.single('file'),function(req,res){
response={
email:req.body.emaill,
password:req.body.password
}
var sqs="SELECT  * FROM userlist WHERE email='"+response.email+"' AND password= '"+response.password+"' ORDER BY email LIMIT 1  ";

con.query(sqs,function (errr, resul) {
if (errr) throw errr;

console.log(resul.length);
console.log("checking");
if(resul.length==1){ 


console.log(response);
var resultt= function(callback){
var crea = `SELECT * FROM ??`;
var val='p'+response.email;
con.query(crea,val , function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};
var timeresult= function(callback){
var crea = `SELECT DISTINCT postn,email FROM ??`;
var val='p'+response.email;
con.query(crea,val , function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};

timeresult(function(req,time){
resultt(function(req,rssst)
{//console.log(rssst);

var vall='p'+response.email;console.log(vall);
console.log(resul[0].fpath);
console.log(time);
res.render( "photogallery.ejs",{thingVar: rssst ,email: vall,uemail:response.email,dp:resul[0].fpath,poststime:time} ); 
});

});
}

else{
res.redirect('/signin.html');}});


});


app.post('/photogallery',urlencodedParser,upload.array('file',30),function(req,res){

response={
email:req.body.uemail,

}
var sqs="SELECT  * FROM userlist WHERE email='"+response.email+"' ORDER BY email LIMIT 1  ";

con.query(sqs,function (errr, resul) {
if (errr) throw errr;

console.log(resul.length);
console.log("checking");
if(resul.length==1){ 


console.log(response);
var resultt= function(callback){
var crea = `SELECT * FROM ??`;
var val='p'+response.email;
con.query(crea,val , function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};
var timeresult= function(callback){
var crea = `SELECT DISTINCT postn,email FROM ??`;
var val='p'+response.email;
con.query(crea,val , function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};

timeresult(function(req,time){
resultt(function(req,rssst)
{//console.log(rssst);

var vall='p'+response.email;console.log(vall);
console.log(resul[0].fpath);
console.log(time);
res.render( "photogallery.ejs",{thingVar: rssst ,email: vall,uemail:response.email,dp:resul[0].fpath,poststime:time} ); 
});

});
}

else{
res.redirect('/signin.html');}});


})









app.post('/wall',urlencodedParser,upload.array('file',30),function(req,res){

 response = {
    uemail:req.body.uemail,
    dp:req.body.dp,
    
   };
console.log(response);

var following=function(callback){
var sql='SELECT * FROM userlist';
con.query(sql,function(err,result,fields){
     if(err) throw err;
      //console.log(result);
      return callback(null,result);
});
}

following(function(req,users){


var followingtable=function(callback){
var tb='p'+users[0].email;console.log(tb);
var alluser="SELECT * FROM "+tb+" ";
for (var i=1;i<users.length;i++)
{
var tbs='p'+users[i].email;
alluser=alluser+"UNION SELECT * FROM "+tbs+"";
}
con.query(alluser,function(err,result,fields){
   if (err) throw err;
   //console.log(result);
    return callback(null,result);
   
});}

var distinctfollowing=function(callback){
var tb='p'+users[0].email;
var alluser="SELECT DISTINCT postn,email FROM "+tb+" ";
for (var i=1;i<users.length;i++)
{
var tbs='p'+users[i].email;
alluser=alluser+"UNION SELECT DISTINCT postn,email FROM "+tbs+"";
}
con.query(alluser,function(err,result,fields){
   if (err) throw err;
   //console.log(result);
    return callback(null,result);
   
});

};

followingtable(function(req,rssst){
distinctfollowing(function(req,distinctrsst){
var vall="p"+response.uemail;
console.log(rssst);
console.log(distinctrsst);
res.render( "followingwall.ejs",{thingVar: rssst ,email: vall,uemail:response.uemail,dp:response.dp,poststime:distinctrsst} );
});

});

})


})

app.post('/photogalleryinsert', urlencodedParser,upload.array('file',30), function (req, res) {
    //Prepare output in JSON format
   response = {
     
      description:req.body.last_name,
      postno:req.body.postno,
      table:req.body.table,
    fname: req.files.length,
    uemail:req.body.uemail,
    dp:req.body.dp,
    time:req.body.time
   };
  

var posst=++response.postno;

if(req.files.length>0){
for(var i=0;i<req.files.length;i++)
{ var sql = "INSERT INTO "+response.table+" (description,fpath,postn,email) VALUES ?";
  
   var val=response.table;
  var values=[[response.description,req.files[i].filename,response.time,response.table]];
  con.query(sql, [values],function (err, result) {
   if (err) throw err;
   console.log("1 record inserted");
 });
 
}}

var resultt= function(callback){
var crea = `SELECT * FROM ??`;
var val=response.table;
con.query(crea,val , function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};

var timeresult= function(callback){
var crea = `SELECT DISTINCT postn,email FROM ??`;
var val=response.table;
con.query(crea,val , function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};

timeresult(function(req,time){
resultt(function(req,rssst)
{//console.log(rssst);

var vall=response.table;console.log(vall);
res.render( "photogallery.ejs",{thingVar: rssst ,email: vall,uemail:response.uemail,dp:response.dp,poststime:time} ); 
});

});



  
})


app.post('/photogallerydel', urlencodedParser,upload.single('file'), function (req, res) {
    //Prepare output in JSON format
   response = {
     // ff:req.path,
     name:req.body.first_name,
     dtable:req.body.dtable,
     uemail:req.body.uemail,
     // description:req.body.last_name,
   // fname: req.body.file,
     dp:req.body.dp
   };
   
  // console.log(response);
var q=response.name;
// fs.unlink(__dirname+'/views/uploads'+'/'+response.fname);

var resultt= function(callback){
var sq = "SELECT * FROM "+response.dtable+" WHERE postn IN (?) ";
var values=[response.name];
con.query(sq, [values],function (err, result, fields,nst) {
    if (err) throw err;
  var  numrow=result.length;
   
 for(var i = 0; i < numrow;i++){
        var st=result[i].name;
         
       // console.log(st);console.log(`<br>`);
  }
return callback(null,result);
  
});
};


resultt(function(req,rssst)
{console.log(rssst[rssst.length-1].postn);
for(var t=0;t<rssst.length;t++)
{
fs.unlink(__dirname+'/views/uploads'+'/'+rssst[t].fpath);
}

//res.render( "advisoryboard.ejs",{thingVar: rssst} ); 

});

 var sql = "DELETE FROM "+response.dtable+" WHERE postn IN (?) ";
//and description='response.description' and fpath='response.fname' " ;
  

  var values=[response.name];
  
  con.query(sql,[values],function (err, result) {
   if (err) throw err;
  // console.log("1 record deleted");
 });


var results= function(callback){
var crea = `SELECT * FROM ??`;
var val=response.dtable;
con.query(crea,val , function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};


var timeresult= function(callback){
var crea = `SELECT DISTINCT postn,email FROM ??`;
var val=response.dtable;
con.query(crea,val , function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};

timeresult(function(req,time){
results(function(req,rssst)
{//console.log(rssst);

var vall=response.dtable;console.log(vall);
res.render( "photogallery.ejs",{thingVar: rssst ,email: vall,uemail:response.uemail,dp:response.dp,poststime:time} ); 
});
 

});


  // res.end(JSON.stringify(response));
})


app.post('/userlist',urlencodedParser,upload.single('file'),function(req,res){
response={
r:req.body.utable,
dp:req.body.dp

}

var results=function(callback){
var sql="SELECT * FROM userlist";
con.query(sql,function(err,result,feilds){
if (err) throw err;
return callback(null,result);
})

};
results(function(req,rsst)
{console.log(rsst);
console.log(response);
res.render("userlist.ejs",{thingvar:rsst,mainemail: response.r,dp:response.dp})
});

});


app.post('/userprofile',urlencodedParser,upload.single('file'),function(req,res){
response={
email:req.body.emaill,
dp:req.body.dp,
mainemail:req.body.m
}
var sqs="SELECT  * FROM userlist WHERE email='"+response.email+"'  ORDER BY email LIMIT 1  ";

con.query(sqs,function (errr, resul) {
if (errr) throw errr;

console.log(resul.length);
console.log("checking");
if(resul.length==1){ 


console.log(response);
var resultt= function(callback){
var crea = `SELECT * FROM ??`;
var val='p'+response.email;
con.query(crea,val , function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};
var timeresult= function(callback){
var crea = `SELECT DISTINCT postn,email FROM ??`;
var val='p'+response.email;
con.query(crea,val , function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};

timeresult(function(req,time){
resultt(function(req,rssst)
{//console.log(rssst);

var vall='p'+response.email;console.log(vall);
console.log(resul[0].fpath);
console.log(time);
res.render( "photogallery1.ejs",{thingVar: rssst ,email: vall,uemail:response.email,dp:resul[0].fpath,poststime:time,maindp:response.dp,mainemail:response.mainemail} ); 
});

});
}

else{
res.redirect('/signin.html');}});


});



app.post('/chatl',urlencodedParser,upload.single('file'),function(req,res){
 response={
r:req.body.uutable,
}

var results=function(callback){
var sql="SELECT * FROM userlist";
con.query(sql,function(err,result,feilds){
if (err) throw err;
return callback(null,result);
});

};
results(function(req,rsst)
{console.log(rsst);
console.log(response.r);
res.render("chat.ejs",{thingVar: rsst,email: response.r});
});

});

app.post('/chat',urlencodedParser,upload.single('file'),function(req,res){
response={
email:req.body.emaill,
useremail:req.body.useremail,
dp:req.body.dp
}
console.log(response);
var resultt= function(callback){
var crea = `SELECT * FROM ??`;
var val=response.useremail;
con.query(crea,val , function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};
resultt(function(req,rssst)
{//console.log(rssst);

var vall=response.email;console.log(vall);
res.render( "pchat.ejs",{thingVar: rssst ,email: vall,usermail:response.useremail,dp:response.dp} ); 
});


});


app.post('/chats',function(req,res){
//console.log(req.query.p1);
var resultt= function(callback){
var crea = `SELECT * FROM ??`;
var val=req.query.p1;
con.query(crea,val, function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};
resultt(function(req,rssst)
{//console.log(rssst);


res.send(rssst);

});
});



app.get('/hint',function(req,res){
//console.log(req.query.p1);

var resultt= function(callback){
var crea = `SELECT email FROM userlist WHERE email LIKE ?`;
var val=req.query.p1+"%";
con.query(crea, val,function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};
resultt(function(req,rssst)
{//console.log(rssst);


res.send(rssst);

});
});








app.post('/chatinsertr',urlencodedParser,upload.single('file'),function(req,res){
response={
message:req.query.message,
email:req.query.email,
useremail:req.query.useremaill,
}

console.log(response);
  var sql = "INSERT INTO "+response.useremail+" (useremail,message,sr) VALUES ?";
  
   
  var values=[[response.email,response.message,'0']];
  con.query(sql, [values],function (err, result) {
   if (err) throw err;
   console.log(values);
   console.log("1 record inserted");
 });
 
  var sqll = "INSERT INTO "+response.email+" (useremail,message,sr) VALUES ?";
  
   
  var valuess=[[response.useremail,response.message,'1']];
  con.query(sqll, [valuess],function (err, result) {
   if (err) throw err;
   console.log(valuess);
   console.log("1 record inserted");
 });

var resultt= function(callback){
var crea = `SELECT * FROM ??`;
var val=response.useremail;
con.query(crea,val , function (err, result, fields,nst) {
    if (err) throw err;

return callback(null,result);
  
});
};
resultt(function(req,rssst)
{//console.log(rssst);

var vall=response.email;console.log(vall);
//res.render( "pchat.ejs",{thingVar: rssst ,email: vall,usermail:response.useremail} ); 
});
});



var server=app.listen(8080,function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
