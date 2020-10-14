
const User = require('../../models/User');
const UserSession = require('../../models/UserSession')

// //Sign up 
module.exports = (app) => {

    app.post('/api/account/signup', (req, res, next) => {
        const {body} = req;
        const { firstName,
                lastName,
                password,
                     } = body;
        let { email
                } = body;
        
            if (!firstName) {
            return res.end({
                success: false,
                message: 'Error: Missing first name'
                })
            }

            if (!lastName) {
                return res.end({
                    success: false,
                    message: 'Error: Missing last name'
                })
            }

            if (!email) {
                return res.end({
                    success: false,
                    message: 'Error: Missing Email'
                })
            }

            if (!password) {
                return res.end({
                    success: false,
                    message: 'Error: Missing Password'
                 })
            }
             
            email = email.toLowerCase();
            
            //Verify email doesn't exist already.
            //save

            User.find({
                email: email
            }, (err, previousUsers) => {
                if (err) {
                return res.end({
                    success: false,    
                    message: 'Error: Server Error 1'
                });
            } else if (previousUsers. length > 0) {
                return res.end({
                    success: false,
                    message: 'Error:  Account already exists.'
                }); 
            }

        

            const newUser = new User();
            
            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
            
            newUser.save((err, user) => {
                if(err){
                    return res.end({
                        success: false,
                        message: 'Error: Server Error could not create User'
                    });
                }
                    return res.end({
                    success: true,
                    message: 'User Account has been successfully created'
                    });

            });
            
        });
        
        });
        
    app.post('/api/account/signin', (req, res, next) => {
            const {body} = req;
            const { firstName,
                    lastName,
                    password,
                    isDeleted } = body;
            let { email
                    } = body;
            

            if (!email) {
                return res.end({
                    success: false,
                    message: 'Error: Missing Email'
                })
            }

            if (!password) {
                return res.end({
                    success: false,
                    message: 'Error: Missing Password'
                 })
            }
            email = email.toLowerCase();

            User.find({
                email: email
            }, (err,users) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server Error'
                    })
                }
                if(users.length != 1) {
                    return res.send({
                        success: false,
                        message: 'Error: Invalid Users'
                    })
                }
                const user = users[0]
                if(!user.validPassword(password)){
                    return res.send({
                        success: false,
                        message: 'Error: Invalid User/Pass'
                    })

                }
                //Correct User
                const userSession = new UserSession()
                userSession.userId = user.Id;
                userSession.save((err, doc)=> {
                    if (err) {
                        return res.send({
                            success: false,
                            message: 'Error: Server Error 2'
                        });
                    }
                    return res.send({
                        success: true,
                        message: 'Valid Sign-in',
                        token: doc._id
                    });
                });
            })
        });
    app.get('/api/account/verify', (req, res, next) => {
        //Get the Token
       
    const { query } = req;
    const { token } = query;
    
    //token test

     //Verify the token is unique / not deleted

     UserSession.find({
        _id: token,
        isDeleted: false
     }, (err, sessions) => {
        if(err){
            return res.send({
                success: false,
                message: 'Error: Server Error 3'
            })
        }

        if (sessions.length != 1){
            return res.send ({
                success: false,
                message: 'Error: Invalid Session Instance'
            });
        } else {
            return res.send({
                success: true,
                message: 'Session Instance: Good'
            });
        }
        });
    });
    app.get('/api/account/logout', (req,res,next) => {
 //Get the Token
       
 const { query } = req;
 const { token } = query;
 
 //token test

  //Verify the token is unique / not deleted

  UserSession.findOneandUpdate(
    {
     _id: token,
     isDeleted: false
    }, 

    {
    $set: {isDeleted: true}
    }, 
    
    null, (err) => {
     if(err){
         return res.send({
             success: false,
             message: 'Error: Server Error 3'
         });
     }
         return res.send({
             success: true,
             message: 'Session Instance: Good'
         });
     
     
     
        });
   });  
   // Post expense
   app.post('/api/account/expensetracker', (req, res, next) => {
    const {body} = req;
    let { expenseName,
            expenseDate,
            expenseAmount,
            expenseCategory } = body;
    
    if (!expenseName) {
        return res.end({
            success: false,
            message: 'Error: Missing Expense Name'
        })
    }

    if (!expenseDate) {
        return res.end({
            success: false,
            message: 'Error: Missing Expense Date'
         })
    }

    if (!expenseAmount) {
        return res.end({
            success: false,
            message: 'Error: Missing Expense Amount'
         })
    }

    if (!expenseCategory) {
        return res.end({
            success: false,
            message: 'Error: Missing Expense Category'
         })
    }
  // saving the expense
    const newExpense = new UserSession();
            
    newExpense.expenseName = expenseName;
    newExpense.expenseDate = expenseDate;
    newExpense.expenseAmount = expenseAmount;
    newExpense.expenseCategory = expenseCategory;
    
    newExpense.save((err, user) => {
        if(err){
            return res.end({
                success: false,
                message: 'Error: Server Error could not create Expense'
            });
        }
            return res.end({
            success: true,
            message: 'User Account has been successfully created'
            });

    });
    

});

};
