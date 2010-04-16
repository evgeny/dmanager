<?php
    @session_start();
    if(isset($_SESSION['signed'])) {
?>


<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Device Explorer</title>
        
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
                        <h3>New Device</h3><br>                       
                        <p>Name:</p>
                        <input name="username" type="text" id="device-name" />                        
                        <p>Device description:</p>
                        <textarea id="device-description"  rows=6 cols=60></textarea>                        
                        <p>Device location:</p>
                        <textarea id="device-location"  rows=3 cols=60></textarea>                        
                        <input type="button" value="Add"/>
                        <input type="button" value="Cancel"/>
                    </div> 
					<div class="yui-u" id="person-in-charge">				
                        <h3>Person in charge</h3>
                        <p>Select Person:
                            <select id="persons">
                                <option class="new-person-option">&lt;&lt;New Person&gt;&gt;</option>
                            </select>
                        </p>
                        <dir id="new-person-form">
                            <p>Title:<input type="text" id="title" /></p>
                            <p>First Name:<input type="text" id="first-name" /></p>
                            <p>Last Name:<input type="text" id="last-name" /></p>
                            <p>Address:<input type="text" id="address" /></p>
                            <p>Phone:<input type="text" id="phone" /></p>
                            <p>E-Mail:<input type="text" id="email" /></p>                        
                        </dir>
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