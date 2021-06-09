/// <reference path="/Users/elliotkantor/Documents/Coding/javascript/p5js/TSDef/p5.global-mode.d.ts" />

"use strict";

let block;
let clickSound;
function preload() {
    clickSound = loadSound("./click.wav");
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    block = new Block();
}

function draw() {
    background(0);
    block.update();
    block.draw();
}

function keyPressed() {
    // console.log(keyCode);
    // console.log(key);
    if (key === " ") {
        if (block.velocity == 0) {
            block.velocity = block.magnitude;
        } else {
            block.velocity = 0;
        }
    }
    if (key == "R") {
        block.direction[0] *= -1;
        block.direction[1] *= -1;
    }
}

class Block {
    constructor() {
        this.w = 150;
        this.h = 100;
        this.x = random(width - this.w);
        this.y = random(height - this.h);

        this.direction = [this.randomDirection(), this.randomDirection()];
        this.magnitude = 5;
        this.velocity = this.magnitude;
        this.colorSequence = [
            "red",
            "purple",
            "yellow",
            "blue",
            "green",
            "orange",
        ];
        this.color = random(this.colorSequence);
    }

    update() {
        this.x += this.velocity * this.direction[0];
        this.y += this.velocity * this.direction[1];

        //  check for collisions
        if (this.x < 0) {
            this.x = 0;
            this.direction[0] *= -1;
            this.color = this.changeColor(this.color);
            clickSound.play();
        } else if (this.x + this.w > width) {
            this.x = width - this.w;
            this.direction[0] *= -1;
            this.color = this.changeColor(this.color);
            clickSound.play();
        }

        if (this.y < 0) {
            this.y = 0;
            this.direction[1] *= -1;
            this.color = this.changeColor(this.color);
            clickSound.play();
        } else if (this.y + this.h > height) {
            this.y = height - this.h;
            this.direction[1] *= -1;
            this.color = this.changeColor(this.color);
            clickSound.play();
        }
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.w, this.h);
    }

    randomDirection() {
        if (random(0, 1) == 1) {
            return 1;
        }
        return -1;
    }

    changeColor(currentColor) {
        let newOptions = [];
        for (let color of this.colorSequence) {
            if (color != currentColor) {
                newOptions.push(color);
            }
        }
        return random(newOptions);
    }
}
