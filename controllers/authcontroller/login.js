const userauthModel = require('../../models/authmodel/UserauthenticationModel');
const user = require('../../models/usermodel/UserModel');

function login(req, res) {
    var email = req.body.email;
    userauthModel.findOne({email: email}, (err, result) => {
        if(!result) {
            req.session.email = '';
            res.header("Access-Control-Allow-Origin", "*")
               .status(400)
               .json({
                    token: '', 
                    msg: 'error email or password'
                });
        } else {
            req.session.email = 'email';
            if (result.password == req.body.password) {
                // console.log(result._id);
                res.header("Access-Control-Allow-Origin", "*")
                    .status(200)
                    .json({
                        token: result._id,
                        msg: 'login success'
                    });
                
                
            } else {
                req.session.email = '';
                res.header("Access-Control-Allow-Origin", "*")
                   .status(401)
                   .json({
                       token: '',
                       msg: 'error email or password'
                   });
            }
        }
    })
}

function logout(req, res) {
    /*if (req.method === 'OPTIONS') {
        console.log('!OPTIONS');
        var headers = {};
        // IE8 does not allow domains to be specified, just the *
        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200, headers);
        res.end();
    } else {*/
        req.session.email = '';
        res.header("Access-Control-Allow-Origin", "*")
            .status(200)
            .json({
                msg: 'logout success'
            });
   // }
}

module.exports.login = login;
module.exports.logout = logout;