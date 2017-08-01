call ng build --prod
call xcopy dist\*.* ..\dists\wonderword /e /y
call cd ..\dists\wonderword
call git stage *
call git commit -m Rebuilt
call git push
call cd ..\..\ww-fork
call start https://appharbor.com/applications/wonderword