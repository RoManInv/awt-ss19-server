require('../../models/config/init');

function getData(req, res) {
    res.status(200)
       .json({
        degree: [{name: 'Bachlor', id: '1'}, {name: 'Master', id: '2'}],
        cat: [{name: 'Software', id: '1'}, {name: 'Newtorks', id: '2'}],
        subject: [{name: 'Advanced Web Technologies', id: '1'}, {name: 'Distributed systems', id: '2'}]
    });
}

module.exports.getData = getData;