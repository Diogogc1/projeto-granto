async function uploadDocumentToServer(event) {
    try {
        const file = document.querySelector("input").files[0];
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch("http://localhost:5000/post", {
            method: "post",
            body: formData
        });

        event.preventDefault();

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

document.querySelector(".button-test").addEventListener("click", async (event) => {
    await uploadDocumentToServer(event);
});
