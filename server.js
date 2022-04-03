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

app.get('/exportmp4', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/public/exportmp4.html'));
});

// app.get('/exportsvg', function (req, res, next) {
//     res.sendFile(path.join(__dirname + '/public/exportsvg.html'));
// });

app.get('/export', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/public/export.html'));
});

app.get('/collabrequest', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/public/collabrequest.html'));
});

app.get('/xscollection', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/public/xscollection.html'));
});

app.get('/trait', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/public/trait.html'));
});



// const { BlobServiceClient } = require("@azure/storage-blob");
// const connStr = "DefaultEndpointsProtocol=https;AccountName=karenku123;AccountKey=MOLnov+KlWGhDHbRpVMiH8w1xozgchZy4gRWovwGJ3XEEhL+MApLUtid5K1ArtuT+OIQv3zV4qeEHVpME4fu3w==;EndpointSuffix=core.windows.net";
// const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

// app.get('/download/svg/:file', function(req, res) {
//     var fileName = req.params.file;
//     containerName = 'nowhere';
//     blobServiceClient.getBlobProperties(
//         containerName,
//         fileName,
//         function(err, properties, status) {
//             if (err) {
//                 res.send(502, "Error fetching file: %s", err.message);
//             } else if (!status.isSuccessful) {
//                 res.send(404, "The file %s does not exist", fileName);
//             } else {
//                 res.header('Content-Type', properties.contentType);
//                 blobService.createReadStream(containerName, fileName).pipe(res);
//                 res.send("downloadfile");
//             }
//         });
// });


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

app.post('/api/fomo', function (req, res) {

    let address = req.body.address;
 
    if (address.length > 0) {
        sql.connect(db, function (err) {
            if (err) {
                console.log(err);
            }
            var request = new sql.Request();
            request.input('address', sql.VarChar(128), address);
                   request.query("declare @seq as int = ( select id from dbo.NOWHERE_FOMO where address= @address);if @seq > 0 select @seq as id else INSERT dbo.NOWHERE_FOMO (Address) OUTPUT Inserted.id VALUES (@address);", function (err, result) {

                if (err) {
                    console.log(err);
                    res.send(err);
                }
                let rowseq = result.recordset[0].id;
                sql.close();
                res.send(`Your wallet address has been saved for the FOMO list!`);

            }); // request.query
        }); // sql.conn
    } // errors.length
}); //post
