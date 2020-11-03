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
    $(".createBtn").css("display", "none")
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
            $(".weightCards").append(`<div class="weightInput" id="weightCard${i}"></div>`)
            $("#weightCard" + i).append(`<div class="" id="weightsCard${i}"></div>`)
            $("#weightsCard" + i).append(`<div class="card weightFitnessCard"><div class="card-header" id="weightsDay${i}"></div></div>`)
            $("#weightsCard" + i).append(`<ul class="list-group list-group-flush" id="weightExercise${i}"></ul>`)
            $("#weightsDay" + i).append(`<h3><em>${data[i].weightDay}</em></h3>`)
            $("#weightExercise" + i).append(`<li class="list-group-item"><strong>Name of Exercise:</strong> <em>${data[i].name}</em></li>`)
            $("#weightExercise" + i).append(`<li class="list-group-item"><strong>Type of Body Exercise:</strong> <em>${data[i].type}</em></li>`)
            $("#weightExercise" + i).append(`<li class="list-group-item"><strong>Number of Sets:</strong> <em>${data[i].sets} Sets</em></li>`)
            $("#weightExercise" + i).append(`<li class="list-group-item"><strong>Number of Repetitions:</strong>  <em>${data[i].reps} Reps</em></li>`)
            $("#weightExercise" + i).append(`<li class="list-group-item"><strong>Duration of Work-Out:</strong> <em>${data[i].weightDur} Minutes</em></li>`)
            $("#weightCard" + i).append(`<div class="card-footer"><button class="updateBtn">Update</button><button class="deleteBtn" data-id=${data[i]._id}>Delete</button></div>`)
            $("#weightCard" + i).append(`<br>`)
        }
    })
}

function displayCardioExercise() {
    $.getJSON("/cardio", function(data) {
        for(let i=0; i<data.length; i++){
            $(".cardioCards").append(`<div class="cardioInput" id="cardioCard${i}"></div>`)
            $("#cardioCard" + i).append(`<div class="" id="cardiosCard${i}"></div>`)
            $("#cardiosCard" + i).append(`<div class="card cardioFitnessCard"><div class="card-header" id="cardioDay${i}"></div></div>`)
            $("#cardiosCard" + i).append(`<ul class="list-group list-group-flush" id="cardioExercise${i}"></ul>`)
            $("#cardioDay" + i).append(`<h3><em>${data[i].cardioDay}</em></h3>`)
            $("#cardioExercise" + i).append(`<li class="list-group-item"><strong>Duration of Cardio:</strong> <em>${data[i].cardioDur} Minutes</em></li>`)
            $("#cardioExercise" + i).append(`<li class="list-group-item"><strong>Distance Traveled:</strong> <em>${data[i].distance} Miles</em></li>`)
            $("#cardioCard" + i).append(`<div class="card-footer"><button class="updateBtn">Update</button><button class="deleteBtn" data-id=${data[i]._id}>Delete</button></div>`)
            $("#cardioCard" + i).append(`<br>`)
        }
    })
}

$(document).on("click", ".deleteBtn", function(event) {
    event.preventDefault();
    let deleteId = $(this).attr("data-id")
    let deleteCard = ($(this).parent().parent())
    $.ajax({
        type: "DELETE",
        url: "/delete/" + deleteId,
        
        success: function(response) {
            deleteCard.remove()
        }
    })
})

displayWeightExercise();
displayCardioExercise();