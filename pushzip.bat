call ng build --prod
call xcopy dist\*.* ..\dists\wonderwordzip /e /y
call cd ..\dists
call del wonderword.zip
call powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('wonderwordzip', 'wonderword.zip'); }"
copy wonderword.zip "C:\Users\Jeff Benson\Dropbox\Public\Wonderword"
