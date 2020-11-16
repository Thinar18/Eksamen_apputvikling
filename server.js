
const express = require('express');
const dbhandler = require('./db_handler.js');
const app = express(); //server-app

// middleware ------------------------------------
app.use(express.json()); //for extracting json in the request-body
app.use('/', express.static('client')); //for serving client files

app.use(express.static(__dirname + '/public'));




// -----------------------------------------------

// LISTS

// endpoint GET ----------------------------------
app.get('/lists', async function (req, res) {
    
    let lists = await dbhandler.getLists();
    
    res.status(200).json(lists); //send response, sender listen til nettside

});

// endpoint POST ---------------------------------
app.post('/lists', async function (req, res) {

    let listName = req.body.list_name;
    let listPubl = req.body.publ;
    let listComm = req.body.comm;

    let result = await dbhandler.createList(listName, listPubl, listComm, 1);

    res.status(200).json({msg: "You have created a new list"}); //send response    

});

// endpoint DELETE ----------------------------------
app.delete('/lists', async function (req, res) {
    
    let listeid = req.body.id;
    let result = await dbhandler.deleteList(listeid);
    res.status(200).json({msg: "You have deleted the list"}); 

});



// ITEM

// endpoint GET ---------------------------------
app.get('/list_item', async function (req, res) {
    let listid = req.query.listid;
    let items = await dbhandler.getItems(listid);
    res.status(200).json(items); // sender items til nettsiden


});

// endpoint POST ---------------------------------
app.post('/list_item', async function (req, res) {

    let itemName = req.body.item_name;
    let listId = req.body.list_id;
    let result = await dbhandler.createItem(itemName, listId);
    
    res.status(200).json({msg: "You have created a new item"}); //send response    

});

// endpoint DELETE ----------------------------------
app.delete('/list_item', async function (req, res) {
    
    let itemid = req.body.id;
    let result = await dbhandler.deleteItem(itemid);
    res.status(200).json({msg: "You have deleted the list"}); 

});



// start server -----------------------------------
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server listening on port 3000!');
});
