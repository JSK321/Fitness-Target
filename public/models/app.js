// CSS to hide forms
$(".exerciseTypeForm").css("display", "none")
$(".weightExerciseForm").css("display", "none")
$(".cardioExerciseForm").css("display", "none")

// Click Events

// Click event to create new exercise
$(".createBtn").on("click", function(event) {
    event.preventDefault();
    console.log("clicked")
    $(".exerciseTypeForm").css("display", "block")
})

$("#exerciseType").on("click", function(event){
    event.preventDefault();
    console.log($(".exerciseTypeForm option:selected").val())
    if($(".exerciseTypeForm option:selected").val()=== "Weights") {
        $(".weightExerciseForm").css("display", "block")
    } else {
        $(".cardioExerciseForm").css("display", "block")
    }
    $(".exerciseTypeForm").css("display", "none")
})

// Click event to add exercise
$("#weightSubmitBtn").on("click", function (event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/submit",
        dataType: "json",
        data: {
            weightDay: $(".weightExerciseForm option:selected").val(),
            name: $("#name").val(),
            type: $("#type").val(),
            sets: $("#sets").val(),
            reps: $("#reps").val(),
            weightDur: $("#weightDur").val()
        }
    }).then(function (data) {
        console.log("weight added!")
        // displayWeightExercise();
        $("#weightDay").val("");
        $("#name").val("");
        $("#type").val("");
        $("#sets").val("");
        $("#reps").val("");
        $("#weightDur").val("");
        $(".weightExerciseForm").css("display", "none");
        location.reload();
    })
})

$("#cardioSubmitBtn").on("click", function(event){
    event.preventDefault();
    $.ajax({
        type:"POST",
        url:"/submit",
        dataType: "json",
        data: {
            cardioDay: $(".cardioExerciseForm option:selected").val(),
            cardioDur: $("#cardioDur").val(),
            distance: $("#distance").val()
        }
    }).then(function(data){
        console.log("cardio added!")
        // displayCardioExercise();
        $("#cardioDay").val("");
        $("#cardioDur").val("");
        $("#distance").val("");
        $(".cardioExerciseForm").css("display", "none")
        location.reload();
    })
})

function displayWeightExercise() {
    $.getJSON("/weights/", function (data) {
        for (let i = 0; i < data.length; i++) {
            $(".userCards").append(`<div class="weightInput" id="weightCard${i}"></div>`)
            $("#weightCard" + i).append(`<div class="col-md-12" id="weightsCard${i}"></div>`)
            $("#weightsCard" + i).append(`<div class="card fitnessCard"><div class="card-header" id="weightsDay${i}"></div></div>`)
            $("#weightsCard" + i).append(`<ul class="list-group list-group-flush" id="weightExercise${i}"></ul>`)
            $("#weightsDay" + i).append(`<h3><em>${data[i].weightDay}</em></h3>`)
            $("#weightExercise" + i).append(`<li class="list-group-item"><strong>Name of Exercise:</strong> <em>${data[i].name}</em></li>`)
            $("#weightExercise" + i).append(`<li class="list-group-item"><strong>Type of Body Exercise:</strong> <em>${data[i].type}</em></li>`)
            $("#weightExercise" + i).append(`<li class="list-group-item"><strong>Number of Sets:</strong> <em>${data[i].sets} Sets</em></li>`)
            $("#weightExercise" + i).append(`<li class="list-group-item"><strong>Number of Repetitions:</strong>  <em>${data[i].reps} Reps</em></li>`)
            $("#weightExercise" + i).append(`<li class="list-group-item"><strong>Duration of Work-Out:</strong> <em>${data[i].weightDur} Minutes</em></li>`)
        }
    })
}

function displayCardioExercise() {
    $.getJSON("/cardio", function(data) {
        for(let i=0; i<data.length; i++){
            $(".userCards").append(`<div class="userInput" id="cardioCard${i}"></div>`)
            $("#cardioCard" + i).append(`<div class="col-md-12" id="cardiosCard${i}"></div>`)
            $("#cardiosCard" + i).append(`<div class="card fitnessCard"><div class="card-header" id="cardioDay${i}"></div></div>`)
            $("#cardiosCard" + i).append(`<ul class="list-group list-group-flush" id="cardioExercise${i}"></ul>`)
            $("#cardioDay" + i).append(`<h3><em>${data[i].cardioDay}</em></h3>`)
            $("#cardioExercise" + i).append(`<li class="list-group-item"><strong>Duration of Cardio:</strong> <em>${data[i].cardioDur} Minutes</em></li>`)
            $("#cardioExercise" + i).append(`<li class="list-group-item"><strong>Distance Traveled:</strong> <em>${data[i].distance} Miles</em></li>`)
        }
    })
}

displayWeightExercise();
displayCardioExercise();