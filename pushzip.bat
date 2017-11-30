call ng build --prod
call xcopy dist\*.* ..\dists\wonderword /e /y
call cd ..\dists
call del wonderword.zip
call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('wonderword', 'wonderword.zip'); }"
copy wonderword.zip "C:\Users\Jeff Benson\Dropbox\Public\Wonderword"

REM call git stage *
REM call git commit -m Rebuilt
REM call git push
REM call cd ..\..\ww-fork
REM call start https://appharbor.com/applications/wonderword