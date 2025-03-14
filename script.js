document.addEventListener("DOMContentLoaded", () => {
  const imageUpload = document.getElementById("imageUpload");
  const topText = document.getElementById("topText");
  const bottomText = document.getElementById("bottomText");
  const fontSelect = document.getElementById("fontSelect");
  const generateMeme = document.getElementById("generateMeme");
  const downloadMeme = document.getElementById("downloadMeme");
  const canvas = document.getElementById("memeCanvas");
  const ctx = canvas.getContext("2d");
  const placeholder = document.getElementById("placeholder");
  const memeCanvasContainer = document.getElementById("memeCanvasContainer");

  let image = new Image();

  memeCanvasContainer.addEventListener("click", () => {
    imageUpload.click();
  });

  imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      image.src = e.target.result;
      image.onload = () => {
        const maxWidth = 400;
        const maxHeight = 250;
        let width = image.width;
        let height = image.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height *= maxWidth / width;
            width = maxWidth;
          } else {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);
        placeholder.style.display = "none";

        topText.value = "";
        bottomText.value = "";
      };
    };

    reader.readAsDataURL(file);
  });

  generateMeme.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const selectedFont = fontSelect.value;
    ctx.font = "40px " + selectedFont;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.textAlign = "center";

    ctx.fillText(topText.value.toUpperCase(), canvas.width / 2, 40);
    ctx.strokeText(topText.value.toUpperCase(), canvas.width / 2, 40);

    ctx.fillText(
      bottomText.value.toUpperCase(),
      canvas.width / 2,
      canvas.height - 20
    );
    ctx.strokeText(
      bottomText.value.toUpperCase(),
      canvas.width / 2,
      canvas.height - 20
    );
  });

  downloadMeme.addEventListener("click", () => {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    const downloadWidth = canvas.width * 1.5;
    const downloadHeight = canvas.height * 1.5;

    tempCanvas.width = downloadWidth;
    tempCanvas.height = downloadHeight;

    tempCtx.drawImage(image, 0, 0, downloadWidth, downloadHeight);

    const selectedFont = fontSelect.value;
    tempCtx.font = "60px " + selectedFont;
    tempCtx.fillStyle = "white";
    tempCtx.strokeStyle = "black";
    tempCtx.lineWidth = 3;
    tempCtx.textAlign = "center";

    tempCtx.fillText(topText.value.toUpperCase(), downloadWidth / 2, 60);
    tempCtx.strokeText(topText.value.toUpperCase(), downloadWidth / 2, 60);

    tempCtx.fillText(
      bottomText.value.toUpperCase(),
      downloadWidth / 2,
      downloadHeight - 30
    );
    tempCtx.strokeText(
      bottomText.value.toUpperCase(),
      downloadWidth / 2,
      downloadHeight - 30
    );

    const link = document.createElement("a");
    link.download = "jokesnap.png";
    link.href = tempCanvas.toDataURL();
    link.click();
  });
});
