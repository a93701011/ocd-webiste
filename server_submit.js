const express = require('express');
const path = require('path');
const sql = require('mssql');
var bodyParser = require('body-parser');
var db = require('./config/db');
var app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser());
app.use(express.static(path.join(__dirname, '/public')));

// app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/cheyuwuxnobody', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/public/cheyuwuxnobody.html'));
});

app.get('/exportgif', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/public/exportgif.html'));
});

app.get('/collabrequest', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/public/collabrequest.html'));
});

app.get('/xscollection', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/public/xscollection.html'));
});

// app.post('/api/submit', function (req, res) {

//     let address = req.body.address;
//     let twitter = req.body.twitter;
//     let discord = req.body.discord;
 
//     let errors = [];
//     errors = validate(address, twitter, discord)
//     if (errors.length === 0) {
//         sql.connect(db, function (err) {
//             if (err) {
//                 console.log(err);
//             }
//             var request = new sql.Request();
//             request.input('address', sql.VarChar(128), address);
//             request.input('twitter', sql.VarChar(128), twitter);
//             request.input('discord', sql.VarChar(128), discord);
//             request.query("declare @seq as int = ( select id from dbo.OCD_WL_NEW where address= @address);if @seq > 0 select @seq as id else INSERT dbo.OCD_WL_NEW (Address, Twitter, Discord) OUTPUT Inserted.id VALUES (@address, @twitter, @discord);", function (err, result) {

//                 if (err) {
//                     console.log(err);
//                     res.send(err);
//                 }
//                 let rowseq = result.recordset[0].id;
//                 sql.close();
//                 res.send(`${address} Thank You, if you would like to double-check if we have your submission, feel free to use the " I just want to double-check :) " button below. We understand sometimes we make typos, or we have submit one too many presale lists, or fell into a 10 second coma. Whatever the reason, we hear you want to double-check, and yes, it never hurts!`);

//             }); // request.query
//         }); // sql.conn
//     } // errors.length
// }); //post

// app.post('/api/query', function (req, res) {
//     let address = req.body.address;
//     sql.connect(db, function (err) {
//         if (err) {
//             console.log(err);
//         }

//         var request = new sql.Request();
//         request.input('address', sql.VarChar(128), address);
//         request.query("declare @seq as int = (select id from dbo.OCD_WL_NEW where address=@address);if @seq>0 select @seq as id else select 0 as id; INSERT dbo.[OCD_WL_DOUBLECHECK] (Address) VALUES (@address)", function (err, result1) {
//             if (err) {
//                 console.log(err);
//                 res.send('');
//             }

//             let rowseq = result1.recordset[0].id;
//             // console.log(rowseq);
//             if (rowseq > 0 ) {
//                 res.send(`Yep! We got you!`);
//             } else {
//                 res.send(`Hmm...seems you may want to enter your info in the Presale Submit area!`);
//             }
//             sql.close();
//         }); // request.query
//     }); // sql.conn
// }); // get 

function validate(address, twitter, discord) {
    let errors = [];
    if (address.length == 0) {
        errors.push("Address Is Null.");
    }
    if (address.length > 50) {
        errors.push("Address Length Cannot Exceed 50 Characters.");
    }

    if (twitter.length === 0 & discord.length === 0) {
        errors.push("Input At Least One Twitter Or Discord Handle");
    }
    return errors;
}

app.post('/api/collabrequest', function (req, res) {

    let name = req.body.name;
    let account = req.body.account;
    let website = req.body.website;
    let proposal = req.body.proposal;

    let errors = [];
    errors = validatecollab(name, account, website)
    if (errors.length === 0) {
        sql.connect(db, function (err) {
            if (err) {
                console.log(err);
            }
            var request = new sql.Request();
            request.input('name', sql.VarChar(128), name);
            request.input('account', sql.VarChar(128), account);
            request.input('website', sql.VarChar(128), website);
            request.input('proposal', sql.VarChar(1280), proposal);
            request.query("INSERT dbo.OCD_COLLABS (Name, Account, Website, Proposal) VALUES (@name, @account, @website, @proposal);", function (err, result) {

                if (err) {
                    console.log(err);
                    res.send(err);
                }
                // var rowsCount = result.rowsAffected;
                sql.close();
                res.send(`${name} Thank You, your Submission to go Nowhere has been received`);

            }); // request.query
        }); // sql.conn
    } // errors.length
}); //post

function validatecollab(name, account, website) {
    let errors = [];
    if (name.length == 0) {
        errors.push("Address Is Null.");
    }
    if (account.length === 0 & website.length === 0) {
        errors.push("Input At Least One Twitter Or Discord Handle");
    }

    return errors;
}