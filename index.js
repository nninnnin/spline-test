import { Application } from "@splinetool/runtime";

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
app
  .load("https://prod.spline.design/6XLjUAxXlYDobklF/scene.splinecode")
  .then(() => {
    const objects = app.getAllObjects();

    const characters = objects.filter((object) =>
      object.name.includes("Character")
    );

    requestAnimationFrame(function render() {
      characters.forEach((character) => {
        character.rotation.y += 0.01;
      });

      requestAnimationFrame(render);
    });

    addButtonClickHandler();
  });

const addButtonClickHandler = () => {
  const buttons = document.querySelectorAll("button");

  const characters = app
    .getAllObjects()
    .filter((object) => object.name.includes("Character"));

  console.log(characters);

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const character =
        characters.find((character) =>
          character.name.includes(e.target.dataset.characterid)
        ) ?? characters[2];

      console.log(character);

      animate();

      if (character) {
        character.scale.set(1.5, 1.5, 1.5);

        characters
          .filter((char) => char !== character)
          .forEach((char) => {
            char.scale.set(1, 1, 1);
          });
      }
    });
  });
};

let elapsed = 0;

const animate = () => {
  if (elapsed > 1) {
    elapsed = 0;
    return;
  }

  requestAnimationFrame(animate);

  elapsed += 0.01;

  console.log("animated..");
};

const animateScale = (object, startScale, endScale, duration) => {
  return;
};
