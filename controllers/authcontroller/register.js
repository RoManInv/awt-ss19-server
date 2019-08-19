const userAuth = require('../../models/authmodel/UserauthenticationModel');
const user = require('../../models/usermodel/UserModel');

function register(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    userAuth.findOne({email: email}, (err, result) => {
        if(result) {
            res.header("Access-Control-Allow-Origin", "*")
               .status(400)
               .json({
                    token: '',
                    msg: 'Email Exist'
                });
        } else {
            var newUser = req.body.user;
            const newAuth = new userAuth({'email': email, 'password': password});
            // console.log(newAuth);
            newAuth.save((err, result) => {
                // console.log(result);
                authID = newAuth._id;
                newUser.userAuthenticationId = authID;
                newUser.rank = 0;
                newUser.email = email;
                console.log(newUser);
                newUserSchema = new user(newUser);
                // newUser = new user(newUser);
                newUserSchema.save((err, result) => {
                    if(!err) {
                        res.header("Access-Control-Allow-Origin", "*")
                           .status(200)
                            .json({
                                token: authID,
                                msg: 'Register Success'
                           });
                    } else {
                        userAuth.findByIdAndDelete(newAuth._id, () => {
                            res.header("Access-Control-Allow-Origin", "*")
                               .status(400)
                               .json({
                                    token: '',
                                    err: err,
                                    msg: 'Register Failed'
                            });
                        });
                    }
                })
            });
        }
    })
}

function deregister(req, res) {
    if(req.session.email) {
        user.findOne({email: email}, (err, result) => {
            if(err) {
                res.header("Access-Control-Allow-Origin", "*")
                   .status(400)
                   .json({
                       msg: 'Deregister Failed'
                   });
            } else {
                userAuth.deleteOne({_id: result.userAuthenticationID}, (err, result) => {
                    if(err) {
                        res.header("Access-Control-Allow-Origin", "*")
                           .status(400)
                           .json({
                                msg: 'Deregister Failed'
                            });
                    } else {
                        user.deleteOne({email: req.session.email}, (err, result) => {
                            if(err) {
                                res.header("Access-Control-Allow-Origin", "*")
                                   .status(400)
                                   .json({
                                        msg: 'Deregister Failed'
                                    });
                            } else {
                                req.session.email = '';
                                res.header("Access-Control-Allow-Origin", "*")
                                   .status(200)
                                   .json({
                                        msg: 'Deregister Success'
                                    });
                            }
                        });
                    }
                });
            }
        });
    }
}

module.exports.register = register;
module.exports.deregister = deregister;