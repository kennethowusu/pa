
const verificationEmailLinkTemplate = (name,amount)=>{


  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="telephone=no" name="format-detection">
<title></title>
<!--[if (mso 16)]>
<style type="text/css">
a {text-decoration: none;}
</style>
<![endif]-->
<!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
</head>

<body>
<div class="es-wrapper-color">
<!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#f6f6f6"></v:fill>
</v:background>
<![endif]-->
<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr>
    <td class="esd-email-paddings" valign="top">
        <table class="esd-footer-popover es-content" cellspacing="0" cellpadding="0" align="center">
            <tbody>
                <tr>
                    <td class="esd-stripe" align="center">
                        <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="transparent" align="center" style="background-color: transparent;">
                            <tbody>
                                <tr>
                                    <td class="es-p20t es-p20r es-p20l esd-structure" align="left">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-container-frame" width="560" valign="top" align="center">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" class="esd-block-image"><a target="_blank"><img class="adapt-img" src="https://fnrifd.stripocdn.email/content/guids/CABINET_62143c790b89f6a37ad055b5dcfcb3b5/images/92421577580772441.jpg" alt style="display: block;" width="341"></a></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                        <table cellpadding="0" cellspacing="0" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" class="esd-block-text">
                                                                        <p style="font-size: 21px;"><strong>New Withdrawal Request</strong><br></p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                        <table cellpadding="0" cellspacing="0" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" class="esd-block-text">
                                                                        <p><strong>${name} </strong>has requested an amount  of&nbsp;</p>
                                                                        <p><strong>$${amount}</strong></p>
                                                                        <p><br></p>
                                                                        <p><br></p>
                                                                        <p><br></p>
                                                                        <p><br></p>
                                                                        <p><br></p>
                                                                        <p><br></p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
                                        <table cellpadding="0" cellspacing="0" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" class="esd-empty-container" style="display: none;"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>
</tbody>
</table>
</div>
</body>

</html>
  `
}

module.exports = verificationEmailLinkTemplate;
