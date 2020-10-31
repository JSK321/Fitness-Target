// Click Events

// Click event to add exercise
$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "/submit",
        dataType: "json",
        data: {
            day: $("#day").val(),
            name: $("#name").val(),
            type: $("#type").val(),
            sets: $("#sets").val(),
            reps: $("#reps").val(),
            duration: $("#duration").val()
        }
    }).then (function(data) {
        displayExercise();
        // $("#day").val("")
        // $("#name").val("")
        // $("#type").val("")
        // $("#sets").val("")
        // $("#reps").val("")
        // $("#duration").val("")
    })
  
})

function displayExercise() {
    $.getJSON("/exercise", function(data){
        for(let i = 0; i < data.length; i++){
            $(".userCard").append(`<div class="card fitnessCard"><div class="card-header day"></div></div>`)
            $(".userCard").append(`<ul class="list-group list-group-flush exercise"></ul>`)
            $(".day").append(`<h3>${data[i].day}</h3>`)
            $(".exercise").append(`<li class="list-group-item">${data[i].name}</li>`)
            $(".exercise").append(`<li class="list-group-item">${data[i].type}</li>`)
            $(".exercise").append(`<li class="list-group-item">${data[i].sets}</li>`)
            $(".exercise").append(`<li class="list-group-item">${data[i].reps}</li>`)
            $(".exercise").append(`<li class="list-group-item">${data[i].duration}</li>`)
        }
    })
}

displayExercise();