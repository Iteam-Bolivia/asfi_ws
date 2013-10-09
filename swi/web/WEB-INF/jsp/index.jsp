<!doctype html>  
<html lang="es">

    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <link rel="stylesheet" href="css/layout.css" type="text/css" />
        <title>WSI</title>
    </head>

    <body>

        <div id="countdown_container">

            <h1>SWI - Servicios de Informaci&oacute;n Institucionales</h1>

            <div id="countdown_timer"></div><!-- Countdown values -->

            <div id="countdown_clock">

                <canvas id="circular_countdown_days" width="160" height="160">5</canvas>
                <canvas id="circular_countdown_hours" width="160" height="160">5</canvas>
                <canvas id="circular_countdown_minutes" width="160" height="160">5</canvas>
                <canvas id="circular_countdown_seconds" width="160" height="160">5</canvas>

            </div>

        </div>
        <p>
            Project date: 9-9-2013<br/>
            Client: UIF - ASFI<br/>
            Team: John Castillo, Miguel Guzman
        </p>
            
        <script src="js/jquery.js"></script>
        <script>
            $(document).ready(function($) {
                $('#countdown_clock').circularCountdown({
                    strokeDaysBackgroundColor: 'rgba(101,127,129,0.06)',
                    strokeDaysColor: 'rgba(101,127,129,0.3)',
                    strokeHoursBackgroundColor: 'rgba(101,127,129,0.06)',
                    strokeHoursColor: 'rgba(101,127,129,0.3)',
                    strokeMinutesBackgroundColor: 'rgba(101,127,129,0.06)',
                    strokeMinutesColor: 'rgba(101,127,129,0.3)',
                    strokeSecondsBackgroundColor: 'rgba(101,127,129,0.06)',
                    strokeSecondsColor: 'rgba(101,127,129,0.3)',
                    strokeWidth: 17,
                    strokeBackgroundWidth: 17,
                    countdownEasing: 'easeOutBounce',
                    countdownTickSpeed: 'slow',
                    backgroundShadowColor: 'rgba(0,0,0,0.2)',
                    backgroundShadowBlur: 0,
                    strokeShadowColor: 'rgba(0,0,0,0.2)',
                    strokeShadowBlur: 0
                });
            });
        </script>
    </body>
</html>
