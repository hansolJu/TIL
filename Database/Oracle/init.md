Oracle version: O12cR2S

OS: Red Hat

vi .bash_profile
--> charset -> ko_KR UTF-8

cd script
sqlpuls /nolog
conn ~
startup
conn ~
@login
