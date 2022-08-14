song_1 = "";
song_2 = "";

rightWrist_song = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;
song_name = "";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    song_name = song_1.isPlaying();
    console.log(song_name);

    song_name_2 = song_2.isPlaying();
    console.log(song_name_2);

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        song_2.stop();
        if(song_name == false)
        {
            song_1.play();
        }
        else{
            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_id").innerHTML = "Song Name : Peter Pan Song";
        }
    }

    if (scoreRightWrist > 0.2) {
        circle(RightWristX,RightWristY,20);
        song_1.stop();
        if(song_name_2 == false)
        {
            song_2.play();
        }
        else{
            console.log("Song Name: Harry Potter Theme Song");
            document.getElementById("song_id").innerHTML = "Song Name : Harry Potter Theme Song";
        }
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if (results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
} 