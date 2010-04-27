<?php
    @session_start();
    if(isset($_SESSION['username'])) {
?>


<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Add Device</title>
        
        <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.7.0/build/reset-fonts-grids/reset-fonts-grids.css"> 
        <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.7.0/build/base/base-min.css"> 
        <link rel="stylesheet" type="text/css" href="css/main.css">
        
        <script src="js/jquery-1.4.2.min.js" type="text/javascript"></script>
        <script src="js/jquery.simplemodal.js" type="text/javascript"></script>
		<script src="js/main.js" type="text/javascript"></script>
        <script src="js/add.js" type="text/javascript"></script>
    </head>

    <body>
        <div id="doc4" class="yui-t7"> 
            <div id="hd"><h1>Device Explorer for Life&Brain Labs</h1></div>
            <div id="bd"> 
            	<div class="yui-g">
                    <div class="yui-u first" id="new_device">
                        <div id="buttons_container">
                            <b id="welcome">Welcome</b>
                            <input type="image" src="img/login.png" width="24" height="24" id="login_button" title="Log In"/>
                            <input type="image" src="img/help.png" width="24" height="24" id="help_button" title="Help"/>
                        </div>
                        <h3>New Device</h3><br>                       
                        <form id="new-device-form">
                            <p>Name:</p>
                            <input type="text" name="device-name" class="requiered-input"/>                        
                            <p>Device description:</p>
                            <textarea name="device-description" class="requiered-input" rows=6 cols=60></textarea>                        
                            <p>Device location:</p>
                            <textarea name="device-location"  class="requiered-input" rows=3 cols=60></textarea>  
                            <br>
                            <input type="button" value="Add" id="save-device-button"/>
                            <input type="button" value="Cancel" id="cancel-device-button"/>
                        </form>
                    </div> 
					<div class="yui-u" id="person-in-charge">				
                        <h3>Person in charge</h3>
                        <p>Select Person:
                            <select id="persons">
                                <option id="0">&lt;&lt;New Person&gt;&gt;</option>
                            </select>
                        </p>
                        <form id="new-person-form">
                            <p>Title:<input type="text" name="person-title" /></p>
                            <p>First Name:<input type="text" name="person-first-name" /></p>
                            <p>Last Name:<input type="text" name="person-last-name" /></p>
                            <p>Address:<input type="text" name="person-address" /></p>
                            <p>Phone:<input type="text" name="person-phone" /></p>
                            <p>E-Mail:<input type="text" name="person-email" /></p>                        
                        </form>
                    </div>
                    <div id="basic-modal-content">
                        <h3>How to add new device?</h3>
                        <p>Type</p>
	
                    </div>
                </div>
            </div>
            <div id="ft">
                <p>Made for fun by EZ&trade;</p>
            </div> 
		</div>
    </body>
</html>

<?php 
    } else {
        echo "You are not signed. Back to main page and sign in.";
    }
?>