set PROJECT=%1
set VERSION=%2
set REPO=%3
shift
shift

docker build -t %PROJECT%:latest %PROJECT%\\
docker tag %PROJECT%:latest %REPO%/%PROJECT%:latest
docker tag %PROJECT%:latest %REPO%/%PROJECT%:%VERSION%
docker push %REPO%/%PROJECT%:latest
docker push %REPO%/%PROJECT%:%VERSION%

exit 0