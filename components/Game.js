AFRAME.registerComponent("game-play", {
    schema: {
        elementId: {
            type: "string",
            default: "#ring1"
        }
    },
    init:function() {
        var duration = 120
        var timerEl = document.querySelector("#timer")
        this.startTimer(duration,timerEl)
    },
    update:function() {
        this.isCollided(this.data.elementId)
    },
    isCollided:function(elementId) {
        element.addEventListener("collide", (e)=>{
            if(elementId.includes("#ring")) {
                element.setAttribute("visibile", false)
                this.targetsRemaining()
                this.updateScore()
            } else {
                this.gameOver()
            }
        })
    },
    startTimer:function(duration, timerEl) {
        setInterval(() => {
            var minutes, seconds
            if(duration >= 0) {
                minutes = parseInt(duration/60)
                seconds = parseInt(duration%60)
                if(minutes < 10) {
                    minutes = "0" + minutes
                }
                if(seconds < 10) {
                    seconds = "0" + seconds
                }
                timerEl.setAttribute("text", {
                    value: minutes + ":" + seconds,
                })
                duration -=1;
            } else {
                this.gameOver()
            }
        }, 1000)
    },
    targetsRemaining:function() {
        const element = document.querySelector("#targets-remaining")
        var count = element.getAttribute("text").value
        let currentTargets = parceInt(count)
        currentTargets -= 1

        element.setAttribute("text", {
            value: currentTargets
        })
    },
    updateScore:function() {
        const element = document.querySelector("#score")
        var count = element.getAttribute("text").value
        let currentScore = parceInt(count)
        currentScore += 50

        element.setAttribute("text", {
            value: currentScore
        })
    },
    gameOver:function() {
        var planeEl = document.querySelector("#plane_model")
        var element = document.querySelector("#gameOverText")

        element.setAttribute("visible", true)
        planeEl.setAttribute("dynamic-body", {
            mass: 1
        })
    }
})