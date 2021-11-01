var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

//var VerifyToken = require("../auth/VerifyToken");

// router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const nodemailer = require("nodemailer");


router.post("/sendmail", (req, res) => {
  console.log(req.body.feedback_msg);
  let feedback = req.body.feedback_msg;
  

  /* try {
    sendMail(feedback, info => {
      console.log(`The mail has been sent `);
      console.log(info);
      res.send(info);
    });
  } catch (err) {
    res.status(err.response.status)
    return res.send(err.message);
  } */

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'straygod126@gmail.com',
      pass: 'saikiran1'
    },
    tls: {
      rejectUnauthorized: false,
    }
  });


  let mailOptions = {
    from: '"feedback test" <straygod126@gmail.com>', // sender address
    to: 'saikiran150596@gmail.com', // list of receivers
    subject: "User Feedback Dashboard management", // Subject line
    html: `
            <meta http-equiv="content-type" content="text/html; charset=utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">


            <section class="bdg-sect" id="i4aumf" 
              style="padding-top:100px;
                    padding-bottom:100px;
                    font-family:Helvetica, serif;
                    background-color:#fafafa;">

              <div class="container-width" 
                style="width:90%;
                      max-width:1150px;
                      margin:0 auto;">
                
                  <div class="badge" id="ihx2ah" 
                    style="font-family:Helvetica, serif;
                            background-color:white;
                            margin-bottom:30px;
                            box-shadow:0 2px 2px 0 rgba(0, 0, 0, 0.2);
                            border-radius:3px;
                            font-weight:100;
                            overflow:hidden;
                            text-align:center;">
                    <div class="badge-header" id="ix51oy" 
                      style="background-color:#023047;
                            background-position:left top, center center;
                            background-attachment:scroll, fixed;
                            overflow:hidden;">

                      <div style="width:100%;">
                          <div style="margin: 1em 0;"> 
                            <img src="https://d331tpl5vusgqa.cloudfront.net/wp-content/uploads/2021/09/emails-logo.png" style="">
                          </div>
                          <div style="">
                            <h3 style="color:#ffffff;">Dashboard Management</h3>
                          </div>
                      </div>
                      
                    </div>
                    <div class="badge-body" style="margin:35px 20px;">
                      <div class="badge-name" id="i112j9" 
                        style="font-size:1.4em;
                               margin-bottom:5px;">Feedback from Dashboard Managemanet User
                        <br/>
                         <img src="https://icon-library.com/images/feedback-icon-png/feedback-icon-png-20.jpg" alt="" width="120" style="padding: 5px 0px;">
                      </div>
                     
                      <div class="badge-role" id="inxonh" 
                        style="color:#777;
                              font-size:1em;
                              margin-bottom:25px;">
                        <h2 id="ilma7" 
                          style="Margin:0;
                                line-height:36px;
                                mso-line-height-rule:exactly;
                                font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;
                                font-size:30px;
                                font-style:normal;
                                font-weight:bold;
                                color:#333333;">
                                Hello Evoke UI Team
                        </h2>
                      </div>
                      <div class="badge-desc" id="i59gsk" 
                        style="font-size:0.85rem;
                              line-height:20px;">${feedback}
                      </div>
                    </div>
                    <div class="badge-foot" id="ipm87q" 
                      style="color:#fff;
                            background-color:#023047;
                            padding-top:13px;
                            padding-bottom:13px;">
                      Evoke Technologies Pvt Ltd © All Rights Reserved
                    </div>
                  </div>
                
              </div>
            </section>`
  };


  transporter.sendMail(mailOptions, (error, info) => {
      if(error){ 
           res.json({ 
            Status : false,
            message : error
           })
      }else{ 
           res.json({ 
             Status : true,
             message : 'Success'
           })
      }
      console.log(info); 
      //console.log('Message sent: %s', info.messageId);   
      //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      //res.send('Email has been sent');
  });


});


// main().catch(console.error);

module.exports = router;
